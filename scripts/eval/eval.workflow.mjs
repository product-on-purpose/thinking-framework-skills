// =============================================================================
// eval.workflow.mjs - both behavioral evals in one Workflow call (eval-harness Task 8).
//
// what-it-is:   the combined runner for the TRIGGER and OUTPUT evals, so a full pass is three
//               operator commands instead of four.
// what-it-does: routes the blind situations against the advisor catalog (Route), then runs each
//               skill and grades its artifact with a separate judge (Produce -> Judge), and
//               returns both halves in one result for a single finalize.mjs call.
// why:          the two halves were always run back to back and then finalized together; making
//               that one call removes a step where an operator can finalize half a pass, which
//               is the failure finalize.mjs itself was introduced to end.
// used-by:      the Workflow tool (scriptPath); scored by scripts/eval/finalize.mjs;
//               tests/eval-workflow-prompts.test.mjs asserts its prompts have not drifted
// =============================================================================
//
// Run via the Workflow tool:
//   Workflow({ scriptPath: "scripts/eval/eval.workflow.mjs",
//              args: { blindPath, count, casesPath, skills, batchSize?, corpusPath? } })
//
//   blindPath  : absolute path to the blind [{id, prompt}] situations (no answer key).
//   count      : N, the number of situations.
//   casesPath  : absolute path to the {cases:[{skill,prompt,checks}]} from extract-output.mjs.
//   skills     : array of skill slugs to run the output half on.
//   batchSize  : situations per router agent (default 25).
//   corpusPath : the routing corpus (default: the shipped recommendable.json).
//
// THE PROMPTS BELOW ARE COPIES, AND THAT IS A HAZARD THIS FILE OWNS.
//
// A Workflow script cannot import - the tool executes it standalone - so `routePrompt`,
// `producePrompt` and `judgePrompt` are duplicated verbatim from route.workflow.mjs and
// output.workflow.mjs. Duplicated prompts are not a style problem here: a prompt IS the
// instrument. #126 tightened the judge to verify claims about other skills rather than trust
// them, and that single change moved the published output figure. A copy that missed it would
// keep measuring against the laxer judge and emit a scorecard that looks identical.
//
// So the copies are ASSERTED, not trusted: tests/eval-workflow-prompts.test.mjs extracts each
// function's source from this file and from its origin and requires them byte-identical. Edit a
// prompt in one place and the suite reds until both agree. If you are here because that test
// failed: copy the origin's version verbatim, do not reconcile by hand.
// =============================================================================

export const meta = {
  name: 'tfs-eval-combined',
  description: 'Both behavioral evals in one call: blind routing against the advisor catalog, then produce-then-judge over the skills, returned together for a single finalize.',
  phases: [
    { title: 'Route', detail: 'blind agents route each situation to its best-fit framework' },
    { title: 'Produce', detail: 'an agent invokes each skill on its trigger prompt and emits the artifact' },
    { title: 'Judge', detail: 'a separate agent grades each artifact against the skill\'s own output checks' },
  ],
}

const A = typeof args === 'string' ? JSON.parse(args) : (args || {})
const blindPath = A.blindPath
const count = A.count
const batchSize = A.batchSize || 25
const corpusPath = A.corpusPath || 'skills/think-framework-advisor/references/recommendable.json'
const casesPath = A.casesPath
const skills = A.skills || []
if (!blindPath || !count || !casesPath || !skills.length) {
  throw new Error('eval.workflow.mjs requires args { blindPath, count, casesPath, skills:[...], batchSize?, corpusPath? }')
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

const PRODUCE_SCHEMA = {
  type: 'object', additionalProperties: false, required: ['skill', 'artifact'],
  properties: { skill: { type: 'string' }, artifact: { type: 'string', description: 'the complete artifact, as markdown' } },
}
const JUDGE_SCHEMA = {
  type: 'object', additionalProperties: false, required: ['skill', 'perCheck', 'passed', 'total'],
  properties: {
    skill: { type: 'string' },
    perCheck: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['check', 'pass', 'reason'], properties: { check: { type: 'string' }, pass: { type: 'boolean' }, reason: { type: 'string' } } } },
    passed: { type: 'integer' }, total: { type: 'integer' },
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

function producePrompt(slug) {
  return `You are an agent invoking the think-${slug} thinking skill on a real situation, exactly as a user would. Do NOT grade or critique - just run the skill and produce its deliverable.

Read (use the Read tool): skills/think-${slug}/SKILL.md (the mechanism + numbered procedure) and skills/think-${slug}/references/TEMPLATE.md (the artifact structure). Then read ${casesPath} and find the object whose "skill" equals "${slug}"; use its "prompt" as the situation to work on.

Follow the skill's procedure and produce the skill's ARTIFACT for that situation, filling the template structure. Output the COMPLETE, filled artifact (the structured deliverable the skill specifies) as markdown - not a summary, not a description of what you would do. Return { skill: "${slug}", artifact: <the full artifact> }.`
}

function judgePrompt(slug, artifact) {
  return `You are grading an artifact that the think-${slug} skill produced, against that skill's OWN quality checklist. Be strict but fair: a check passes only if the artifact genuinely and concretely satisfies it - not if it merely gestures at it.

Read ${casesPath}, find the object whose "skill" equals "${slug}", and use its "checks" array as the checklist (each entry is one requirement a good artifact must meet).

VERIFY CLAIMS ABOUT THIS REPOSITORY, DO NOT TRUST THEM. You have Read, Grep and Glob. Whenever the artifact makes a factual claim about another skill, recipe or framework in this repo - what it presupposes, what its steps are, what it requires, whether it exists - open that file and check before accepting it:

- a skill is at \`skills/think-<slug>/SKILL.md\`
- a recipe is at \`_workflows/think-<slug>.md\`, and its step list is right there
- the routable catalog is \`skills/think-framework-advisor/references/recommendable.json\`

A claim that is FALSE about the thing it describes fails the check it sits under, however fluent it reads. This applies with particular force to DECLINES: "I am not recommending X because it presupposes Y" is only a valid decline if X actually presupposes Y. Read X's steps and see. A decline resting on a false premise is a wrong answer wearing the costume of a careful one, and it is exactly the failure a judge that grades only the artifact's shape will wave through.

The artifact to grade:
---
${artifact}
---

For each check in order, decide pass (true or false) and give a one-line reason grounded in what the artifact actually does (or fails to do) - and where you verified a claim against a file, say which file. Return { skill: "${slug}", perCheck: [{check, pass, reason}], passed: <how many passed>, total: <number of checks> }.`
}

function chunkRanges(total, size) {
  const out = []
  for (let s = 1; s <= total; s += size) out.push([s, Math.min(s + size - 1, total)])
  return out
}
function groupz(arr, n) { const o = []; for (let i = 0; i < arr.length; i += n) o.push(arr.slice(i, i + n)); return o }

// --- half 1: routing -------------------------------------------------------------------
phase('Route')
const ranges = chunkRanges(count, batchSize)
const GROUP = 5
const routeGroups = groupz(ranges, GROUP)
log(`Routing ${count} blind eval situations in ${ranges.length} batches (<=${batchSize} each), ${routeGroups.length} serial groups of <=${GROUP} (throttle-safe), against ${corpusPath}.`)

const parts = []
for (let g = 0; g < routeGroups.length; g++) {
  const got = await parallel(routeGroups[g].map(([a, b]) => () =>
    agent(routePrompt(a, b), { label: `route:c${a}-c${b}`, phase: 'Route', schema: ROUTE_SCHEMA })
      .then((r) => (r && r.routes) || [])
      .catch(() => [])
  ))
  parts.push(...got)
  log(`Group ${g + 1}/${routeGroups.length} routed - ${parts.flat().length}/${count} situations so far.`)
}
const routes = parts.flat()
log(`Routing complete: ${routes.length}/${count} situations routed.`)

// --- half 2: produce -> judge ----------------------------------------------------------
// Deliberately AFTER routing rather than alongside it. The two halves are independent, so
// overlapping them would finish sooner - and would also double the concurrent agent count
// against the same rate limit that the serial grouping inside each half exists to respect.
phase('Produce')
const skillGroups = groupz(skills, 4)
log(`Output eval: ${skills.length} skills in ${skillGroups.length} serial groups of <=4 (produce -> judge, throttle-safe).`)

const results = []
for (let g = 0; g < skillGroups.length; g++) {
  const part = await pipeline(
    skillGroups[g],
    (slug) => agent(producePrompt(slug), { label: `produce:${slug}`, phase: 'Produce', schema: PRODUCE_SCHEMA }),
    (prod, slug) => {
      if (!prod || !prod.artifact) return null
      return agent(judgePrompt(slug, prod.artifact), { label: `judge:${slug}`, phase: 'Judge', schema: JUDGE_SCHEMA })
        .then((j) => j && ({ skill: slug, artifactChars: prod.artifact.length, perCheck: j.perCheck, passed: j.passed, total: j.total }))
        .catch(() => null)
    }
  )
  results.push(...part.filter(Boolean))
  log(`Group ${g + 1}/${skillGroups.length} done - ${results.length}/${skills.length} skills judged.`)
}

// Both halves in one result, shaped so each half matches what the standalone runners return -
// so finalize.mjs consumes them unchanged and the two paths cannot diverge in what they emit.
return {
  count,
  routed: routes.length,
  corpusPath,
  routes,
  evaluated: results.length,
  of: skills.length,
  results,
}
