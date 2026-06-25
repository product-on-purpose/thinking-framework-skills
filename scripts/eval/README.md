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

3. **Score (ad-hoc inspection only).**
   ```
   node scripts/eval/score.mjs <full-cases.json> <routed.json>
   ```
   Prints the markdown scorecard and writes `scorecard.json` next to the routed file. To commit the run, use `finalize.mjs` instead (see below).

## Running the output eval (three steps)

The output eval measures **artifact quality**: run each skill and check whether the deliverable it produces satisfies the skill's own "Output checks".

1. **Extract the prompt + checks per skill.**
   ```
   node scripts/eval/extract-output.mjs              # all shipped skills (or pass slugs for a pilot)
   ```
   Prints `{ summary, cases:[{skill, prompt, checks:[...]}] }`. Save it; the workflow reads it.
2. **Produce, then judge** (via the Workflow tool, `scriptPath: scripts/eval/output.workflow.mjs`, `args = {casesPath, skills}`). For each skill: a PRODUCE agent invokes the skill on its trigger prompt and emits the full artifact; a **separate** JUDGE agent grades that artifact against the skill's output checks (so the producer never grades itself). Throttle-safe serial groups. Returns `{results:[{skill, perCheck, passed, total}]}`.
3. **Score (ad-hoc inspection only).**
   ```
   node scripts/eval/score-output.mjs <results.json>
   ```
   Prints the per-skill + overall check-pass scorecard and every failed check with the judge's reason; writes `output-scorecard.json`. To commit the run, use `finalize.mjs` instead (see below).

## Finalizing a run (one command, guaranteed paired artifacts)

`score.mjs` / `score-output.mjs` still print a scorecard for ad-hoc inspection, but to COMMIT a run use `finalize.mjs` - it writes BOTH the `.md` and the `.json` straight into `docs/internal/eval-results/` (so the `.json` sidecar can never be dropped) and stamps each shipped skill's `skill.meta.yml`:

    node scripts/eval/finalize.mjs <YYYY-MM-DD> \
      --trigger <routed.json> <cases.json> \
      --output <results.json>

Add `--prefix contested` for a cohort run (writes `<date>-contested-<kind>-eval.*`). A full run is now: extract -> the route + output Workflows -> `finalize` (4 commands; 3 once the combined run Workflow lands). The committed scorecards are guarded: `scripts/check-eval-results.mjs` (a `check.mjs` layer) reds CI if any scorecard is missing its `.md`/`.json` twin or malformed.

## Status / roadmap

- **Trigger eval**: implemented (routing accuracy). First full run under `docs/internal/eval-results/`.
- **Output eval**: implemented (artifact quality, produce -> judge). First full run under `docs/internal/eval-results/`.
- **Finalize-driven flow**: implemented. `finalize.mjs` is the canonical commit path; `score.mjs` / `score-output.mjs` are now ad-hoc inspection tools only.
- **Scorecard pairing guard**: implemented - `check-eval-results.mjs` is the 14th `check.mjs` layer; reds CI if any committed scorecard is missing its `.md`/`.json` twin or is malformed.
