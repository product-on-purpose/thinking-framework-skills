// =============================================================================
// dispatch-output.workflow.mjs - the produce->judge runner for a DISPATCHER skill's output half.
//
// what-it-is:   the output-eval harness for think-research-framework, the one meta-skill the
//               generic produce-then-judge runner structurally cannot measure.
// what-it-does: reads the shipped subagent system prompt off disk and runs it as the producer in
//               an isolated git worktree (so its real Write scope stays real), captures the
//               dossier AND the proposed registry entry as separate fields, then has a separate
//               judge grade only the checks a model may legitimately decide - the entry's
//               schema validity is deliberately left for a deterministic pass outside the model.
// why:          scripts/eval/output.workflow.mjs asks a producer to read SKILL.md plus
//               references/TEMPLATE.md and emit the artifact inline. think-research-framework has
//               no references/ directory, and its SKILL.md explicitly says "do not run the
//               research inline in this context" because the honesty discipline lives in the
//               subagent. Running the generic harness would measure the skill doing the opposite
//               of its documented procedure, and would grade citations against a producer that
//               was never told to research anything - a judge passing fabricated sources returns
//               a number that REWARDS the single failure this library exists to prevent. So the
//               instrument changes rather than the skill: dispatch faithfully, then grade.
// used-by:      the Workflow tool (scriptPath); scripts/eval/resolve-dispatch-checks.mjs consumes
//               its output; docs/internal/backlog.md records why it was needed
//
//   Workflow({ scriptPath: "scripts/eval/dispatch-output.workflow.mjs",
//              args: { casesPath, agentPath, skill } })
//
//   casesPath : absolute path to {cases:[{skill,prompt,checks}]} from extract-output.mjs.
//   agentPath : repo-relative path to the subagent file whose body becomes the producer's
//               instructions (agents/think-research-framework.md).
//   skill     : the bare slug (research-framework).
//
// A NOTED SUBSTITUTION, recorded rather than glossed: the producer is not the host's registered
// subagent type (this library is not installed as a plugin in the session that runs the eval, so
// there is no `think-research-framework` agentType to dispatch to). Instead the shipped agent
// file is read from disk and injected verbatim. That is strictly MORE reproducible - it measures
// the file in the repo rather than whatever an installed copy happens to contain - but it is a
// substitution, and the scorecard provenance must say so.
// =============================================================================

export const meta = {
  name: 'tfs-dispatch-output-eval',
  description: 'Output eval for the research dispatcher: run the shipped subagent prompt as the producer in an isolated worktree, then judge the dossier and proposed entry it returns.',
  phases: [
    { title: 'Produce', detail: 'the shipped subagent prompt, injected verbatim, runs the bounded research brief in an isolated worktree' },
    { title: 'Judge', detail: 'a separate agent grades only the checks a model may decide; schema validity is left to a deterministic pass' },
  ],
}

const A = typeof args === 'string' ? JSON.parse(args) : (args || {})
const casesPath = A.casesPath
const agentPath = A.agentPath || 'agents/think-research-framework.md'
const skill = A.skill || 'research-framework'
if (!casesPath) throw new Error('dispatch-output.workflow.mjs requires args { casesPath, agentPath?, skill? }')

// The check the model does NOT get to decide. Matched on the validator's name so the split
// survives a reworded check, and asserted by resolve-dispatch-checks.mjs on the way back.
const DETERMINISTIC_CHECK_MARKER = 'check-proposed-entry'

const PRODUCE_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['dossier', 'proposedEntry', 'verdict', 'sources'],
  properties: {
    dossier: { type: 'string', description: 'the full dossier body as markdown' },
    proposedEntry: { type: 'object', description: 'the proposed registry entry, as a JSON object - exactly what would be pasted', additionalProperties: true },
    verdict: { type: 'string', description: 'Build | Fold | Recipe | Reject | out-of-scope, with the decisive reason' },
    sources: {
      type: 'array',
      description: 'each source actually cited: author, year, what it measured, and the grade it supports',
      items: {
        type: 'object', additionalProperties: false, required: ['author', 'year', 'measured'],
        properties: { author: { type: 'string' }, year: { type: 'string' }, measured: { type: 'string' } },
      },
    },
  },
}

const JUDGE_SCHEMA = {
  type: 'object', additionalProperties: false, required: ['skill', 'perCheck'],
  properties: {
    skill: { type: 'string' },
    perCheck: {
      type: 'array',
      items: {
        type: 'object', additionalProperties: false, required: ['check', 'pass', 'reason'],
        properties: { check: { type: 'string' }, pass: { type: 'boolean' }, reason: { type: 'string' } },
      },
    },
  },
}

function producePrompt(agentBody, brief) {
  // The producer is given the shipped system prompt and the brief, and NOTHING about the checks
  // it will be graded on. Showing a producer its rubric measures compliance with the rubric
  // rather than the behaviour the rubric is a proxy for.
  return `${agentBody}

---

You are running now, as that agent, on this brief:

${brief}

Operating notes for this run:
- You are in an isolated checkout of the repository. Your documented Write scope applies normally:
  frameworks/_proposed/<slug>/ for a new dossier, an existing skills/think-<slug>/evidence/dossier.md
  for an already-shipped method, and one temporary JSON file for validation. Do not write anywhere else.
- You need web search for the literature. If a WebSearch tool is not already available to you, load
  it first with ToolSearch (query: "select:WebSearch"), then use it. Your REAL SOURCES hard rule is
  in force: a statistic with no nameable primary source may not appear as fact and must not move the
  tier. If the literature is thin, the honest output is a low tier and a short source list, not a
  padded one.
- Keep the run bounded: this is a single-method brief, not a survey. A handful of targeted searches
  is the intended budget.

Return:
  dossier       - the full dossier body you wrote, as markdown.
  proposedEntry - the proposed registry entry as a JSON OBJECT (not a string), exactly as it would
                  be pasted. Validate it with \`node scripts/check-proposed-entry.mjs <tempfile>\`
                  as your procedure requires, and return the validated object.
  verdict       - Build / Fold / Recipe / Reject / out-of-scope, with the decisive reason.
  sources       - every source you actually cited: author, year, what it measured.`
}

function judgePrompt(brief, prod, checks) {
  return `You are grading a framework-research run against the research engine's OWN quality checklist. Be strict but fair: a check passes only if the output genuinely and concretely satisfies it, not if it gestures at it.

The brief the run was given:
${brief}

THE CHECKLIST (grade each, in order):
${checks.map((c, i) => `${i + 1}. ${c}`).join('\n')}

VERIFY CLAIMS, DO NOT TRUST THEM. You have Read, Grep and Glob. Where a check concerns this repository's own state, go and look:
- Overlap and fold claims: read frameworks/registry.mjs and INDEX.md. If the run says "the closest shipped skill is X", confirm X actually ships and that the stated hard wall is real. If it claims distinctness, look for the near-twin it should have found.
- If the run names a shipped skill or a recipe, read that skill's SKILL.md or the recipe under _workflows/ before accepting a claim about what it presupposes or what its steps are. A claim about another skill that is false must fail the check it sits under, however fluent it reads.
- Source honesty: you cannot re-run the web searches, so judge what IS checkable - is each source named with author, year and what it measured? Is any numeric claim floating without a source attached? Does a stated tier match the evidence described, or is a P being argued as an M on a cousin method's strength? A confident citation you cannot evaluate is not automatically a pass; an unnameable statistic presented as fact is a definite fail.

THE VERDICT THE RUN REACHED: ${prod.verdict}

THE SOURCES IT CITED:
${JSON.stringify(prod.sources, null, 2)}

THE PROPOSED REGISTRY ENTRY:
${JSON.stringify(prod.proposedEntry, null, 2)}

THE DOSSIER:
---
${prod.dossier}
---

Grade the ${checks.length} checks above and nothing else. Do not grade the entry's schema validity even if you have an opinion about it - that is decided by running the validator, outside your judgment, and it is deliberately not on your list.

Return { skill: "${skill}", perCheck: [{check, pass, reason}] } with one entry per check, in order.`
}

phase('Produce')
log(`Dispatch output eval for think-${skill}: reading the shipped subagent prompt from ${agentPath} and running it in an isolated worktree.`)

const READER_SCHEMA = {
  type: 'object', additionalProperties: false, required: ['agentBody', 'brief', 'checks'],
  properties: {
    agentBody: { type: 'string', description: 'the subagent file body BELOW the frontmatter' },
    brief: { type: 'string', description: 'the trigger prompt for this skill from the cases file' },
    checks: { type: 'array', items: { type: 'string' }, description: 'the output checks, in order' },
  },
}

// A cheap read-only step, because the workflow sandbox has no filesystem access of its own and
// the producer must be handed the shipped prompt rather than a paraphrase of it.
const src = await agent(`Read two files in the thinking-framework-skills repo and return their contents, verbatim, with no commentary.

1. ${agentPath} - return everything BELOW the closing \`---\` of the YAML frontmatter as \`agentBody\`. Do not include the frontmatter itself (the name/description/tools block); the body is the system prompt. Do not summarise, reformat or fix anything - byte-faithful.

2. ${casesPath} - a JSON file shaped {cases:[{skill,prompt,checks}]}. Find the case whose "skill" equals "${skill}". Return its "prompt" as \`brief\` and its "checks" array as \`checks\`, in the original order.

Return {agentBody, brief, checks}.`, { label: 'read:shipped-prompt', phase: 'Produce', schema: READER_SCHEMA, model: 'haiku' })

if (!src || !src.agentBody || !src.brief || !src.checks || !src.checks.length) {
  throw new Error('dispatch-output: could not read the shipped subagent prompt / brief / checks')
}
log(`Read the shipped prompt (${src.agentBody.length} chars) and ${src.checks.length} output checks.`)

// Split the checklist: the model grades what a model may decide; the validator decides the rest.
const modelChecks = src.checks.filter((c) => !c.includes(DETERMINISTIC_CHECK_MARKER))
const deterministicChecks = src.checks.filter((c) => c.includes(DETERMINISTIC_CHECK_MARKER))
log(`Checks split: ${modelChecks.length} judged by the model, ${deterministicChecks.length} left for the deterministic validator pass.`)

const prod = await agent(producePrompt(src.agentBody, src.brief), {
  label: `produce:${skill}`,
  phase: 'Produce',
  schema: PRODUCE_SCHEMA,
  isolation: 'worktree',
})

if (!prod || !prod.dossier) {
  return { evaluated: 0, of: 1, results: [], error: 'producer returned no dossier' }
}
log(`Producer returned: ${prod.dossier.length} chars of dossier, verdict "${prod.verdict}", ${(prod.sources || []).length} sources.`)

phase('Judge')
const judged = await agent(judgePrompt(src.brief, prod, modelChecks), {
  label: `judge:${skill}`,
  phase: 'Judge',
  schema: JUDGE_SCHEMA,
  effort: 'high',
})

if (!judged || !judged.perCheck) {
  return { evaluated: 0, of: 1, results: [], error: 'judge returned no per-check grades' }
}

const passed = judged.perCheck.filter((c) => c.pass).length
log(`Judge graded ${judged.perCheck.length} model-decidable checks: ${passed} passed. The deterministic check is still unresolved by design - run scripts/eval/resolve-dispatch-checks.mjs next.`)

return {
  evaluated: 1,
  of: 1,
  // Shaped for resolve-dispatch-checks.mjs, which folds in the deterministic verdict and emits
  // the standard {results:[{skill,perCheck,passed,total}]} that finalize.mjs consumes.
  results: [{
    skill,
    artifactChars: prod.dossier.length,
    perCheck: judged.perCheck,
    passed,
    total: judged.perCheck.length,
    pendingDeterministic: deterministicChecks,
    proposedEntry: prod.proposedEntry,
    verdict: prod.verdict,
    sources: prod.sources,
    dossier: prod.dossier,
  }],
  provenance: {
    producer: `shipped subagent prompt injected from ${agentPath} (no registered agentType available in the running session)`,
    isolation: 'git worktree',
    checksJudgedByModel: modelChecks.length,
    checksDeferredToValidator: deterministicChecks.length,
  },
}
