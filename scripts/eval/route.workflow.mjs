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
// Run via the Workflow tool: Workflow({ scriptPath: "scripts/eval/route.workflow.mjs", args: { blindPath, count, batchSize, corpusPath } }).
//
//   blindPath  : absolute path to a JSON array of {id, prompt} situations (ids c1..cN),
//                the BLIND copy (no answer key) written from scripts/eval/extract-cases.mjs.
//   count      : N (the number of situations).
//   batchSize  : situations per router agent (default 25).
//   corpusPath : the catalog to route against (default: the shipped recommendable.json).
//                Overridable ONLY so a controlled experiment can vary the corpus while holding
//                everything else fixed - see the note below. A run against a non-default corpus
//                must never be finalized as a scorecard: it would stamp 63 sidecars off a
//                catalog that does not ship.
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
if (!blindPath || !count) throw new Error('route.workflow.mjs requires args { blindPath, count, batchSize?, corpusPath? }')

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

function routePrompt(startN, endN) {
  return `You are the routing core of a thinking-framework advisor: given a user's situation, you name the SINGLE framework whose mechanism most directly addresses it - or decline when none fits.

Read these two files (use the Read tool):
- ${blindPath} - a JSON array of {id, prompt} situations.
- ${corpusPath} - the catalog of frameworks. Each entry has a \`name\` and a \`description\`; some entries also carry \`anti_triggers\`, \`not_use\` and \`overlaps\`. Judge on whatever fields are present and do not assume a field exists. The framework SLUG is its \`name\` with the \`think-\` prefix removed (e.g. name "think-premortem" -> slug "premortem").

Process ONLY the situations whose id is c${startN} through c${endN} inclusive. For each, judge fit purely on the match between the situation and each framework's mechanism + its when-NOT / anti-trigger notes:
- top1: the single best-fit framework slug, OR the literal "none" if the situation is trivial, unrelated, already-decided, after-the-fact when the tool is for before (or vice versa), or genuinely better handled without any thinking framework. Do NOT force a fit - many situations are deliberately wrong-tool or no-tool, and "none" is often the right answer.
- top3: up to three framework slugs in rank order, best first; [] if nothing fits.

You do NOT know which framework (if any) authored a situation, and you must not assume one does. Judge fit only. Return {routes: [{id, top1, top3}]} covering every id in c${startN}..c${endN}.`
}

function chunkRanges(total, size) {
  const out = []
  for (let s = 1; s <= total; s += size) out.push([s, Math.min(s + size - 1, total)])
  return out
}
function groupz(arr, n) { const o = []; for (let i = 0; i < arr.length; i += n) o.push(arr.slice(i, i + n)); return o }

phase('Route')
const ranges = chunkRanges(count, batchSize)
const GROUP = 5
const groups = groupz(ranges, GROUP)
log(`Routing ${count} blind eval situations in ${ranges.length} batches (<=${batchSize} each), ${groups.length} serial groups of <=${GROUP} (throttle-safe), against ${corpusPath}.`)

const parts = []
for (let g = 0; g < groups.length; g++) {
  const got = await parallel(groups[g].map(([a, b]) => () =>
    agent(routePrompt(a, b), { label: `route:c${a}-c${b}`, phase: 'Route', schema: ROUTE_SCHEMA })
      .then((r) => (r && r.routes) || [])
      .catch(() => [])
  ))
  parts.push(...got)
  log(`Group ${g + 1}/${groups.length} routed - ${parts.flat().length}/${count} situations so far.`)
}

const routes = parts.flat()
log(`Routing complete: ${routes.length}/${count} situations routed.`)
return { count, routed: routes.length, corpusPath, routes }
