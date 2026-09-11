// skill-selection.workflow.mjs - the blind router for the SKILL-SELECTION eval.
// Run via the Workflow tool:
//   Workflow({ scriptPath: "scripts/eval/skill-selection.workflow.mjs",
//              args: { blindPath, rosterPath, count, batchSize } })
//
//   blindPath  : absolute path to a JSON array of {id, prompt} situations (ids c1..cN),
//                the BLIND copy (no answer key) written from extract-cases.mjs --roster.
//   rosterPath : absolute path to the roster corpus from extract-roster.mjs --corpus:
//                [{id, kind, description}] for every installed skill and command.
//   count      : N (the number of situations).
//   batchSize  : situations per router agent (default 25).
//
// HOW THIS DIFFERS FROM route.workflow.mjs, and why both exist:
//
//   route.workflow.mjs  routes against recommendable.json - the 63 shipped FRAMEWORKS,
//                       enriched with anti_triggers / not_use / overlaps. It answers
//                       "which framework fits this situation?".
//   this workflow       routes against the INSTALLED ROSTER - 67 skills + 10 commands,
//                       name + description only. It answers "which tool would an agent
//                       actually invoke?".
//
// Three consequences that are the whole point:
//   1. The four meta-skills are IN this corpus. They are deliberately absent from
//      recommendable.json (which is the advisor's list of things to recommend, not a
//      roster of installed skills), so the framework eval can never return
//      `framework-advisor` as a pick - it is the wrong instrument, not a failing skill.
//   2. The persona is an AGENT CHOOSING A TOOL, not "the routing core of an advisor".
//      An advisor persona structurally never selects itself, which would bake in exactly
//      the blindness this eval exists to remove.
//   3. Only name + description are shown - the surface an agent really sees. Passing the
//      enriched fields would quietly turn this back into the framework eval.
//
// Commands are kind-qualified (`command:<slug>`) so a command pick is a distinct string
// from a skill pick; that is what makes guardrail-6 interference countable at scoring time.
// Score with scripts/eval/score-selection.mjs. See scripts/eval/README.md.

export const meta = {
  name: 'tfs-skill-selection-eval-router',
  description: 'Behavioral skill-selection router: blind agents choose which installed skill or command they would invoke for each eval-case situation, against the roster an agent actually sees, so skill selection (not framework routing) can be scored.',
  phases: [{ title: 'Select', detail: 'blind agents pick the one installed skill or command they would invoke (top1 + top3)' }],
}

const A = typeof args === 'string' ? JSON.parse(args) : (args || {})
const blindPath = A.blindPath
const rosterPath = A.rosterPath
const count = A.count
const batchSize = A.batchSize || 25
if (!blindPath || !rosterPath || !count) throw new Error('skill-selection.workflow.mjs requires args { blindPath, rosterPath, count, batchSize? }')

const SELECT_SCHEMA = {
  type: 'object', additionalProperties: false, required: ['routes'],
  properties: {
    routes: {
      type: 'array',
      items: {
        type: 'object', additionalProperties: false, required: ['id', 'top1', 'top3'],
        properties: {
          id: { type: 'string' },
          top1: { type: 'string', description: "the id you would invoke, or 'none'" },
          top3: { type: 'array', items: { type: 'string' }, description: 'up to 3 ids, best first' },
        },
      },
    },
  },
}

function selectPrompt(startN, endN) {
  return `You are an AI agent with a library of thinking-framework tools installed. For each user prompt below, decide which SINGLE installed tool you would invoke to handle it - or decline when none of them is the right response.

Read these two files (use the Read tool):
- ${rosterPath} - the tools installed, as a JSON array of {id, kind, description}. This is the whole of what you know about each tool: its id and its description.
- ${blindPath} - a JSON array of {id, prompt} user situations.

The roster contains two kinds of tool:
- kind "skill" (id is a bare slug like \`premortem\`) - runs ONE thinking method and emits its artifact.
- kind "command" (id is prefixed, like \`command:stress-test-decision\`) - runs a CHAIN of several methods end to end as a single pre-built sequence.
A command is the right pick only when the situation genuinely calls for the whole chain; a skill is the right pick when one method does the job. Return the id EXACTLY as it appears in the roster, including the \`command:\` prefix when you pick a command.

Process ONLY the situations whose id is c${startN} through c${endN} inclusive. For each, judge purely on the match between the user's prompt and each tool's description:
- top1: the id of the single tool you would invoke, OR the literal "none" if the situation is trivial, unrelated to structured thinking, already-decided, a plain factual or coding request, or genuinely better handled with no tool at all. Do NOT force a fit - many of these situations are deliberately wrong-tool or no-tool, and "none" is often the right answer.
- top3: up to three ids in rank order, best first; [] if nothing fits.

You do NOT know which tool (if any) authored a situation, and you must not assume one did. Judge fit only. Return {routes: [{id, top1, top3}]} covering every id in c${startN}..c${endN}.`
}

function chunkRanges(total, size) {
  const out = []
  for (let s = 1; s <= total; s += size) out.push([s, Math.min(s + size - 1, total)])
  return out
}
function groupz(arr, n) { const o = []; for (let i = 0; i < arr.length; i += n) o.push(arr.slice(i, i + n)); return o }

phase('Select')
const ranges = chunkRanges(count, batchSize)
const GROUP = 5
const groups = groupz(ranges, GROUP)
log(`Selecting for ${count} blind situations in ${ranges.length} batches (<=${batchSize} each), ${groups.length} serial groups of <=${GROUP} (throttle-safe), against the installed roster.`)

const parts = []
for (let g = 0; g < groups.length; g++) {
  const got = await parallel(groups[g].map(([a, b]) => () =>
    agent(selectPrompt(a, b), { label: `select:c${a}-c${b}`, phase: 'Select', schema: SELECT_SCHEMA })
      .then((r) => (r && r.routes) || [])
      .catch(() => [])
  ))
  parts.push(...got)
  log(`Group ${g + 1}/${groups.length} done - ${parts.flat().length}/${count} situations selected so far.`)
}

const routes = parts.flat()
log(`Selection complete: ${routes.length}/${count} situations selected.`)
return { count, routed: routes.length, routes }
