// =============================================================================
// route.workflow.mjs - the blind router for the behavioral TRIGGER eval.
//
// what-it-is:   the Workflow-tool script that drives the TRIGGER half of the behavioral
//               eval harness (the OUTPUT half is output.workflow.mjs; the sibling that
//               routes against the installed roster instead is
//               skill-selection.workflow.mjs).
// what-it-does: shards eval-case situations into batches, fans out BLIND router agents
//               (never told which skill authored a case or what the expected answer is)
//               in throttle-safe serial groups of 5 against the advisor's framework
//               catalog (recommendable.json), and returns { count, routed, routes:[{id,
//               top1, top3}] }.
// why:          if a router could see which skill authored a case, it could "defend" the
//               skill under test and the score would reflect self-agreement, not the
//               catalog's real discriminability. The blind/answer-key split (scoring
//               happens separately, in score.mjs) is what makes the trigger numbers
//               trustworthy.
// used-by:      the Workflow tool (scriptPath); scored by scripts/eval/score.mjs and
//               scripts/eval/finalize.mjs; documented in scripts/eval/README.md
// =============================================================================
//
// Run via the Workflow tool: Workflow({ scriptPath: "scripts/eval/route.workflow.mjs", args: { model, blindPath, count, batchSize, corpusPath, agentType, interleave } }).
//
//   model      : REQUIRED. The tier every eval agent runs on (haiku | sonnet | opus | fable),
//                returned as modelTier so finalize.mjs records what actually ran.
//   blindPath  : absolute path to a JSON array of {id, prompt} situations (ids c1..cN),
//                the BLIND copy (no answer key) written from scripts/eval/extract-cases.mjs.
//   count      : N (the number of situations).
//   batchSize  : situations per router agent (default 25).
//   corpusPath : the catalog to route against (default: the shipped recommendable.json).
//                Overridable ONLY so a controlled experiment can vary the corpus while holding
//                everything else fixed - see the note below. A run against a non-default corpus
//                must never be finalized as a scorecard: it would stamp 63 sidecars off a
//                catalog that does not ship.
//   agentType  : optional subagent type for the routers, returned in the result. Leave it out to
//                use the default Workflow subagent. See "WHAT THE ROUTERS SEE" below.
//   interleave : optional. true deals prompts across routers instead of cutting contiguous batches,
//                and is returned in the result. This changes the router prompt's wording, so a run
//                with it is a different instrument from one without, and the two do not compare.
//
// WHAT THE ROUTERS SEE (measured 2026-11-05, docs/internal/experiments/2026-11-05-eval-router-context-audit.md):
// these routers run as the default Workflow subagent, so they also receive the project's AGENTS.md
// and the auto-memory index, which an installed user's agent does not get. Neither holds an eval
// prompt. Pass agentType to run routers without that context, and confirm from the transcripts
// that it worked. Figures from different agent types do not compare, because their system prompts
// differ too.
//
// THE ROUTER PROMPT IS DELIBERATELY CORPUS-AGNOSTIC. It says each entry has a name and
// description and that SOME entries also carry anti_triggers / not_use / overlaps, rather than
// asserting all five fields are present. That phrasing is true of the enriched shipped catalog and
// of a stripped variant alike, which is what makes a single-variable A/B possible at all: if the
// prompt advertised fields the corpus lacked, the router would hunt for them or invent them, and
// the prompt itself would become a second variable in an experiment designed to have one.

export const meta = {
  name: 'tfs-trigger-eval-router',
  description: 'Behavioral trigger-eval router: blind agents route each eval-case situation to its best-fit framework against the advisor catalog, so routed-vs-expected can be scored for trigger accuracy.',
  phases: [{ title: 'Route', detail: 'blind router agents route each situation to a best-fit framework (top1 + top3)' }],
}

const A = typeof args === 'string' ? JSON.parse(args) : (args || {})
const blindPath = A.blindPath
const count = A.count
const batchSize = A.batchSize || 25
const corpusPath = A.corpusPath || 'skills/think-framework-advisor/references/recommendable.json'
const agentType = A.agentType
const interleave = A.interleave === true
if (!blindPath || !count) throw new Error('route.workflow.mjs requires args { model, blindPath, count, batchSize?, corpusPath?, agentType?, interleave? }')

// The model every eval agent below runs on (roadmap C2-1). Required, so a run's model is a
// deliberate choice rather than whatever the session inherits, and returned as modelTier so
// finalize.mjs records the tier that actually ran instead of one an operator retypes.
const MODEL_TIERS = ['haiku', 'sonnet', 'opus', 'fable']
const modelTier = A.model
if (!MODEL_TIERS.includes(modelTier)) {
  throw new Error(`route.workflow.mjs requires args.model, one of ${MODEL_TIERS.join(' | ')} (got ${JSON.stringify(modelTier)}): the model the run measures, which the scorecard records.`)
}

const ROUTE_SCHEMA = {
  type: 'object', additionalProperties: false, required: ['routes'],
  properties: {
    routes: {
      type: 'array',
      items: {
        type: 'object', additionalProperties: false, required: ['id', 'top1', 'top3'],
        properties: {
          id: { type: 'string' },
          top1: { type: 'string', description: "best-fit framework slug, or 'none'" },
          top3: { type: 'array', items: { type: 'string' }, description: 'up to 3 slugs, best first' },
        },
      },
    },
  },
}

function routePrompt(startN, endN, ids) {
  const scope = ids ? `one of ${ids.map((n) => `c${n}`).join(', ')}` : `c${startN} through c${endN} inclusive`
  const cover = ids ? 'listed above' : `in c${startN}..c${endN}`
  return `You are the routing core of a thinking-framework advisor: given a user's situation, you name the SINGLE framework whose mechanism most directly addresses it - or decline when none fits.

Read these two files (use the Read tool):
- ${blindPath} - a JSON array of {id, prompt} situations.
- ${corpusPath} - the catalog of frameworks. Each entry has a \`name\` and a \`description\`; some entries also carry \`anti_triggers\`, \`not_use\` and \`overlaps\`. Judge on whatever fields are present and do not assume a field exists. The framework SLUG is its \`name\` with the \`think-\` prefix removed (e.g. name "think-premortem" -> slug "premortem").

Process ONLY the situations whose id is ${scope}. For each, judge fit purely on the match between the situation and each framework's mechanism + its when-NOT / anti-trigger notes:
- top1: the single best-fit framework slug, OR the literal "none" if the situation is trivial, unrelated, already-decided, after-the-fact when the tool is for before (or vice versa), or genuinely better handled without any thinking framework. Do NOT force a fit - many situations are deliberately wrong-tool or no-tool, and "none" is often the right answer.
- top3: up to three framework slugs in rank order, best first; [] if nothing fits.

You do NOT know which framework (if any) authored a situation, and you must not assume one does. Judge fit only. Return {routes: [{id, top1, top3}]} covering every id ${cover}.`
}

function chunkRanges(total, size) {
  const out = []
  for (let s = 1; s <= total; s += size) out.push([s, Math.min(s + size - 1, total)])
  return out
}
// Deals the ids out one at a time, so prompts that sit next to each other never share a router. The
// prompts for one skill are adjacent in the blind file, so a contiguous batch lets one router move
// a whole skill's cases (2026-11-04, c529 c531 c533). No randomness, so a run's batches reproduce.
function interleavedBatches(total, size) {
  const n = Math.ceil(total / size)
  const out = Array.from({ length: n }, () => [])
  for (let i = 1; i <= total; i++) out[(i - 1) % n].push(i)
  return out
}
function groupz(arr, n) { const o = []; for (let i = 0; i < arr.length; i += n) o.push(arr.slice(i, i + n)); return o }

phase('Route')
const ranges = chunkRanges(count, batchSize)
const GROUP = 5
const batches = interleave
  ? interleavedBatches(count, batchSize).map((ids, i) => ({ label: `route:batch-${i + 1}`, prompt: routePrompt(0, 0, ids) }))
  : ranges.map(([a, b]) => ({ label: `route:c${a}-c${b}`, prompt: routePrompt(a, b) }))
const groups = groupz(batches, GROUP)
log(`Routing ${count} blind eval situations in ${batches.length} ${interleave ? 'interleaved ' : ''}batches (<=${batchSize} each), ${groups.length} serial groups of <=${GROUP} (throttle-safe), against ${corpusPath}.`)

const parts = []
for (let g = 0; g < groups.length; g++) {
  const got = await parallel(groups[g].map(({ label, prompt }) => () =>
    agent(prompt, { label, phase: 'Route', schema: ROUTE_SCHEMA, model: modelTier, ...(agentType ? { agentType } : {}) })
      .then((r) => (r && r.routes) || [])
      .catch(() => [])
  ))
  parts.push(...got)
  log(`Group ${g + 1}/${groups.length} routed - ${parts.flat().length}/${count} situations so far.`)
}

const routes = parts.flat()
log(`Routing complete: ${routes.length}/${count} situations routed.`)
return { modelTier, ...(agentType ? { agentType } : {}), ...(interleave ? { interleave } : {}), count, routed: routes.length, corpusPath, routes }
