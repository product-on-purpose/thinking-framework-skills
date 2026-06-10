# Behavioral eval harness

The repo already validates eval cases for **form** (`scripts/eval-cases.mjs`, a gate layer: every `skills/*/eval/cases.md` is well-formed and name-safe). This harness measures **behavior**: does the catalog actually route a situation to the right framework? It is the missing half of the library's honesty claim - the **method's** evidence is graded in each dossier, but whether *this agent-executable skill triggers correctly* was, until now, `not-run` (see `skill.meta.yml` -> `quality.trigger_eval_status`).

It is **model-executed** (the routing is a judgment a model makes, borrowing the running model, no API key), so it is a periodic **measurement that produces a scorecard**, not a deterministic gate layer. The gate keeps the static form check; the behavioral number lives under `docs/internal/eval-results/`.

## What the trigger eval measures

For each skill, `eval/cases.md` carries "Should trigger" prompts (the right answer is that skill) and "Should NOT trigger" prompts (each names the correct alternative `think-<slug>`, or is a deliberate no-tool / wrong-tool case). The harness pools all cases, has blind router agents route each one against the public advisor catalog, then scores routed-vs-expected:

- **trigger case** (expected = the authoring skill): pass if the router's top1 pick is that skill (soft variant: it appears in top3).
- **anti case naming an alternative**: pass if top1 is that named alternative (routed to the right other skill).
- **anti case with no named alternative** (expected `none`): pass if top1 is *not* the authoring skill (it correctly did not over-grab a wrong-tool situation).

The number measures the **catalog's discriminability** - whether the skill descriptions + anti-triggers route correctly - which is exactly what the advisor depends on.

## The blind / answer-key split (why it is trustworthy)

The router agents never see which skill authored a case or what the expected answer is. They only route `prompt -> best-fit framework` against the catalog, exactly as the live advisor would. The deterministic scorer (`score.mjs`) holds the answer key and grades afterward. This removes the failure mode where an agent "defends" the skill under test, and means the score reflects the catalog, not an agent agreeing with itself.

## Running it (three steps)

1. **Extract the answer key + the blind prompts.**
   ```
   node scripts/eval/extract-cases.mjs                 # all shipped skills
   node scripts/eval/extract-cases.mjs slugA slugB     # a subset (a pilot)
   ```
   Prints `{ summary, cases:[{id,prompt,expected,type,source}] }`. Save it (the full key), and write a blind copy (`[{id,prompt}]` only) for the router to read.

2. **Route the blind prompts** with the router workflow (via the Workflow tool, `scriptPath: scripts/eval/route.workflow.mjs`), passing `args = {blindPath, count, batchSize}`. It shards the prompts into batches, fans out blind router agents (serial groups, throttle-safe), and returns `{routes:[{id,top1,top3}]}`.

3. **Score.**
   ```
   node scripts/eval/score.mjs <full-cases.json> <routed.json>
   ```
   Prints the markdown scorecard (overall + per-skill top1 / top3 / anti, and the misses), and writes `scorecard.json` next to the routed file. Commit the scorecard under `docs/internal/eval-results/<date>-trigger-eval.{md,json}`.

## Status / roadmap

- **Trigger eval**: implemented (this harness). First full run recorded under `docs/internal/eval-results/`.
- **Output eval** (`output_eval_status`): not yet - it would run each skill on a prompt and score its artifact against the "Output checks" already written in each `eval/cases.md`. A planned follow-on.
