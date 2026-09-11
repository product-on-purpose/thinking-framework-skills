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

## The skill-selection eval (a different question, a different corpus)

The trigger eval above routes against `skills/think-framework-advisor/references/recommendable.json` - the **63 shipped frameworks**, enriched with `anti_triggers` / `not_use` / `overlaps`. That corpus is the advisor's list of things to *recommend*. It correctly contains no meta-skills.

Which means a blind router reading it **can never return `think-framework-advisor` as a pick**. The four meta-skills (`framework-advisor`, `top3`, `random-frameworks`, `research-framework`) are not failing that eval - they are invisible to it. Running it over their cases would publish "the front door triggers 0% of the time", a number measuring only the advisor's absence from its own corpus.

So there are two questions, and until now only one had an instrument:

| Question | Corpus | Instrument |
|---|---|---|
| Which of the 63 **frameworks** fits this situation? | `recommendable.json` (enriched) | `route.workflow.mjs` |
| Which **installed tool** would an agent invoke? | `manifest.generated.json` - 67 skills + 10 commands, name + description only | `skill-selection.workflow.mjs` |

The second is the question the meta-skills' trigger contracts actually make, and it is also the only one that can see **guardrail 6**: the nine recipe commands added always-loaded description surface, but the trigger eval routes against a corpus the commands never touched, so it cannot detect command interference at all.

Three properties make it the right instrument rather than a second copy of the first:

- **The roster is the installed surface.** It comes from `manifest.generated.json` (what an installer loads), not `SKILL.md` frontmatter (what authors write), and each entry is reduced to `name` + `description` - the whole of what an agent sees. Passing the enriched fields would quietly turn it back into the framework eval.
- **The persona is an agent choosing a tool**, not "the routing core of an advisor". An advisor persona structurally never selects itself, which would bake in the exact blindness being removed.
- **Commands are kind-qualified** (`command:<slug>`), so a command pick is a distinct string from a skill pick and strict-equality scoring surfaces interference for free. The one genuine collision - `think-research-framework` ships as both a skill and a command - is normalized, because there the two ids are the same capability.

### Gate cases

A "Should NOT trigger" bullet tagged `[gate]` before its quoted prompt means: the authoring skill **is** the right tool, but its correct behavior is not a normal run (the advisor's insufficient-signal case, where the right move is exactly one clarifying question). That is an output-level contract a routing eval cannot judge in either direction. Such a case is emitted as `type: "gate"`, **excluded from every figure**, and reported in the scorecard - never scored as an anti-case, where a correct pick would read as a false fire.

### Running it

```
node scripts/eval/extract-roster.mjs --corpus > roster.json     # the 77-tool corpus
node scripts/eval/extract-cases.mjs --roster > cases.json        # answer key, roster resolution
# write a blind copy ([{id,prompt}] only), then:
#   Workflow scriptPath: scripts/eval/skill-selection.workflow.mjs
#            args: {blindPath, rosterPath, count, batchSize}
node scripts/eval/score-selection.mjs <YYYY-MM-DD> cases.json routed.json --model <id>
```

`score-selection.mjs` reuses `finalize.buildArtifacts` (so the paired `.md`/`.json` cannot drift) and adds what this eval owns: provenance (model, corpus, sampling, gate exclusions), the guardrail-6 command-pick tally, and stamping **only** the skills the run measured. That last point matters: `finalize.mjs`'s default walks the 63 registry frameworks, so finalizing a selection run through it would re-stamp 63 sidecars off a run that never looked at them.

Scorecards land as `<date>-skill-selection-trigger-eval.{md,json}` with `generated: "SKILL-SELECTION eval"` - a distinct kind, so a reader holding both scorecards can tell which question each answers. Gate layer 15 requires `provenance.model` and `provenance.corpus` for this kind (the older trigger runs genuinely carry none, which is why their numbers can only be re-measured, not reproduced).

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
- **Meta-skill coverage**: 3 of 4 fully measured (trigger + output, 2026-09-10). `think-research-framework` is output-unmeasurable by the generic produce-then-judge harness - it dispatches to a subagent with web search and its SKILL.md forbids inline research - so it keeps `maturity: alpha` with the gap recorded in `docs/internal/backlog.md`.
- **Skill-selection eval**: implemented - the sibling instrument that routes against the installed roster (67 skills + 10 commands) instead of the framework catalog. It is the only instrument that can measure the four meta-skills, and the only one that can answer guardrail 6's command-interference question.
- **Scorecard pairing guard**: implemented - `check-eval-results.mjs` is the 14th `check.mjs` layer; reds CI if any committed scorecard is missing its `.md`/`.json` twin or is malformed.
