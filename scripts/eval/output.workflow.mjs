// output.workflow.mjs - the produce->judge runner for the behavioral OUTPUT eval. Run via
// the Workflow tool: Workflow({ scriptPath: "scripts/eval/output.workflow.mjs", args: { casesPath, skills } }).
//
//   casesPath : absolute path to the {cases:[{skill,prompt,checks}]} from extract-output.mjs.
//   skills    : array of skill slugs to evaluate.
//
// For each skill it runs two stages, pipelined and in throttle-safe serial groups:
//   PRODUCE - an agent invokes the skill on its trigger prompt and emits the full artifact.
//   JUDGE   - a SEPARATE agent grades that artifact against the skill's own output checks
//             (so the producer never grades itself). Returns per-check pass/fail.
// Returns { results:[{skill, artifactChars, perCheck, passed, total}] }. Aggregate with
// scripts/eval/score-output.mjs. See scripts/eval/README.md.

export const meta = {
  name: 'tfs-output-eval',
  description: 'Behavioral output eval: run each skill on a trigger prompt to produce its artifact, then a separate judge scores that artifact against the skill\'s own output checks.',
  phases: [
    { title: 'Produce', detail: 'an agent invokes each skill on its trigger prompt and emits the artifact' },
    { title: 'Judge', detail: 'a separate agent grades each artifact against the skill\'s output checks' },
  ],
}

const A = typeof args === 'string' ? JSON.parse(args) : (args || {})
const casesPath = A.casesPath
const skills = A.skills || []
if (!casesPath || !skills.length) throw new Error('output.workflow.mjs requires args { casesPath, skills:[...] }')

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

function producePrompt(slug) {
  return `You are an agent invoking the think-${slug} thinking skill on a real situation, exactly as a user would. Do NOT grade or critique - just run the skill and produce its deliverable.

Read (use the Read tool): skills/think-${slug}/SKILL.md (the mechanism + numbered procedure) and skills/think-${slug}/references/TEMPLATE.md (the artifact structure). Then read ${casesPath} and find the object whose "skill" equals "${slug}"; use its "prompt" as the situation to work on.

Follow the skill's procedure and produce the skill's ARTIFACT for that situation, filling the template structure. Output the COMPLETE, filled artifact (the structured deliverable the skill specifies) as markdown - not a summary, not a description of what you would do. Return { skill: "${slug}", artifact: <the full artifact> }.`
}

function judgePrompt(slug, artifact) {
  return `You are grading an artifact that the think-${slug} skill produced, against that skill's OWN quality checklist. Be strict but fair: a check passes only if the artifact genuinely and concretely satisfies it - not if it merely gestures at it.

Read ${casesPath}, find the object whose "skill" equals "${slug}", and use its "checks" array as the checklist (each entry is one requirement a good artifact must meet).

The artifact to grade:
---
${artifact}
---

For each check in order, decide pass (true or false) and give a one-line reason grounded in what the artifact actually does (or fails to do). Return { skill: "${slug}", perCheck: [{check, pass, reason}], passed: <how many passed>, total: <number of checks> }.`
}

function groupz(arr, n) { const o = []; for (let i = 0; i < arr.length; i += n) o.push(arr.slice(i, i + n)); return o }
const groups = groupz(skills, 4)

phase('Produce')
log(`Output eval: ${skills.length} skills in ${groups.length} serial groups of <=4 (produce -> judge, throttle-safe).`)

const results = []
for (let g = 0; g < groups.length; g++) {
  const part = await pipeline(
    groups[g],
    (slug) => agent(producePrompt(slug), { label: `produce:${slug}`, phase: 'Produce', schema: PRODUCE_SCHEMA }),
    (prod, slug) => {
      if (!prod || !prod.artifact) return null
      return agent(judgePrompt(slug, prod.artifact), { label: `judge:${slug}`, phase: 'Judge', schema: JUDGE_SCHEMA })
        .then((j) => j && ({ skill: slug, artifactChars: prod.artifact.length, perCheck: j.perCheck, passed: j.passed, total: j.total }))
        .catch(() => null)
    }
  )
  results.push(...part.filter(Boolean))
  log(`Group ${g + 1}/${groups.length} done - ${results.length}/${skills.length} skills judged.`)
}

return { evaluated: results.length, of: skills.length, results }
