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

> **Corrected 2026-10-14: that holds for trigger cases, not for anti cases.** The catalog the router reads (`recommendable.json`) publishes each skill's `anti_triggers`, and `gen-recommendable.mjs` builds them from the same "Should NOT trigger" bullets that the eval turns into anti cases. So every anti case's prompt is in the catalog, verbatim, listed as an anti-trigger of the skill it must not fire. For the 144 anti cases that name a correct alternative, the bullet's annotation names that alternative too, as in `(near-miss: this is think-problem-restatement)`. The router is not told the answer key, but it can read most of an anti case's answer in the catalog.
>
> - **Closed-book, unaffected:** trigger top-1 and top-3, because "Should trigger" prompts appear nowhere in the catalog. The skill-selection eval is also closed-book, because its roster is name plus description only.
> - **Open-book:** the framework trigger eval's two anti-case figures. "No false fire" is exposed to the exclusion ("not this skill"). "Right alternative" is exposed to the answer itself.
> - **How much it inflates them, bounded by a run that already exists:** the 2026-09-11 enrichment A/B stripped `anti_triggers`, `not_use` and `overlaps` together and scored 378/379 and 113/128 against 379/379 and 122/128. The inflation is therefore at most 1 false fire and 9 right-alternatives on that run, and part of those 9 is the legitimate `not_use` / `overlaps` signal. A third arm that strips `anti_triggers` alone would settle it. Build that arm with `node scripts/eval/strip-corpus.mjs <out.json> --fields anti_triggers`, which keeps the same proof that no other field moved, and pass it to `route.workflow.mjs` as `corpusPath`. Never finalize a run against it.
> - **Consequence for closing the loop:** never cure a miss by adding a "Should NOT trigger" case. It would be published into the very catalog it is scored against. The fix options (a hold-out split in `cases.md`, or anti-triggers sourced from somewhere other than the eval cases) are a design decision, recorded in `docs/internal/backlog.md`.
>
> **Decided 2026-10-17:** the maintainer kept the qualifier (option 4) and chose to run the `anti_triggers`-only A/B arm (option 1) the next time a trigger eval runs anyway, rather than as a run of its own.
>
> **Ran 2026-10-20:** with `anti_triggers` removed, the anti cases still drew **0 false fires on 379 of 379**, so the zero-false-fire figure is not an artifact of the leak. Right-alternatives fell from 141/144 to 137/144. Scored on the same answer key, two runs of the shipped corpus differ by one case (140/144 on 2026-09-13, 141/144 on 2026-10-20), so the leak probably supplies about three right-alternative answers, and 137/144 is the closed-book figure. The record is [`docs/internal/experiments/2026-10-20-anti-triggers-closed-book.md`](../../docs/internal/experiments/2026-10-20-anti-triggers-closed-book.md).

### Widening an answer key

An anti case scores against the first `think-<slug>` named after its prompt. When the maintainer decides that a second answer is also right, the bullet says so explicitly, after the primary redirect:

    - "What could go wrong with this launch?" (risk surfacing, not root-cause tracing; route to think-red-team-light; also accept think-premortem)

`extract-cases.mjs` then emits `accept: ["red-team-light", "premortem"]`, and `score-lib.mjs` credits either pick as the right alternative. Only the phrase `also accept think-<slug>` widens a key (`resolveAccepted` in `scripts/lib/selection-lib.mjs`). A bare "think-a or think-b" already appears in authored bullets and still scores against the first slug alone, so no existing key moved when this rule arrived. Widening is the maintainer's decision, never a loop step. The phrase is part of the bullet, so it is also published to the catalog as an `anti_trigger`, like the rest of the annotation.

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
#            args: {model, blindPath, rosterPath, count, batchSize}
node scripts/eval/score-selection.mjs <YYYY-MM-DD> cases.json routed.json --model <resolved model id>
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

2. **Route the blind prompts** with the router workflow (via the Workflow tool, `scriptPath: scripts/eval/route.workflow.mjs`), passing `args = {model, blindPath, count, batchSize}`. It shards the prompts into batches, fans out blind router agents (serial groups, throttle-safe), and returns `{routes:[{id,top1,top3}]}`.

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
2. **Produce, then judge** (via the Workflow tool, `scriptPath: scripts/eval/output.workflow.mjs`, `args = {model, casesPath, skills}`). For each skill: a PRODUCE agent invokes the skill on its trigger prompt and emits the full artifact; a **separate** JUDGE agent grades that artifact against the skill's output checks (so the producer never grades itself). Throttle-safe serial groups. Returns `{results:[{skill, perCheck, passed, total}]}`.
3. **Score (ad-hoc inspection only).**
   ```
   node scripts/eval/score-output.mjs <results.json>
   ```
   Prints the per-skill + overall check-pass scorecard and every failed check with the judge's reason; writes `output-scorecard.json`. To commit the run, use `finalize.mjs` instead (see below).

## Close the loop: every miss ends in a decision (roadmap C2-2)

The eval found routing seams for months, and nothing turned them into a decision. So the last step of every run is a miss review:

    node scripts/eval/list-misses.mjs docs/internal/eval-results/<date>-trigger-eval.json docs/internal/eval-results/<date>-output-eval.json

Every row it prints ends in exactly one of two places.

1. **A write-back to the skill's documented boundary.** Add a line to the "When NOT to Use" section of the skill that grabbed or missed, naming the right sibling by its slug. That section feeds `not_use` and `overlaps` in `recommendable.json`. Describe the general near-miss shape, never the eval prompt.
2. **An entry in the known-ambiguities note below**, with the reason.

**Never cure a miss by adding a "Should NOT trigger" case.** That case would be published into the catalog it is scored against (see the correction above). Widening an answer key, as #132 did, is the maintainer's decision, not a loop step.

After a write-back, re-run only the touched skills and their confusion partners, under `--prefix`. `npm run eval:freshness` will not flag a write-back, because it fingerprints `eval/cases.md` and a write-back changes `SKILL.md`. Name the skills whose boundary moved in the commit.

### Known ambiguities (from the 2026-09-13 trigger run)

`list-misses` reports 7 misses, all anti cases that named an alternative. None warranted a write-back. The reasons fall into two groups.

- **The router's pick is arguably better than the key.** These three were answer-key widening candidates, the maintainer's call under the #132 precedent. **Widened 2026-10-17** with `also accept`, together with `swot`'s matching case. The widened keys first apply at the next trigger run; the 2026-09-13 scorecard stays as measured.
  - *"Which of these three explanations for the churn spike is right?"* (an anti case of `analysis-of-competing-hypotheses`). The key says `evidence-vs-inference-sort`; the router picked `process-tracing`, whose artifact is a rival-explanation evidence ledger.
  - *"What could go wrong if we ship this?"* and *"What could go wrong with this launch?"* (anti cases of `complexity-domain-sort` and `five-whys`). The key says `red-team-light`; the router picked `premortem` both times. Both readings are defensible: "before launch, what could make this fail" is premortem's own trigger. The skill-selection run repeats it on `swot`'s *"What could go wrong if we expand into the EU?"*.
- **The router declined a "just tell me" prompt.** These four were judged reasonable declines, not misses to cure.
  - *"Just tell me if launching the free tier is the right strategic call."* The key says `scenario-planning`.
  - *"Deploy the hotfix now or wait for the morning window? Pretty obvious..."* The key says `one-way-vs-two-way-door`.
  - *"Just multiply some made-up odds by some made-up payoffs..."* The key says `reference-class-forecasting`.
  - *"Just tell me the single best pricing model for us."* The key says `decision-option-review`.

The premortem / authentic-dissent seam that the 2026-06-25 run found (SPEC-04, B-02) does not recur in the 2026-09-13 run, so it needed no write-back.

### Known ambiguities (from the 2026-10-20 trigger run)

`list-misses` reports 3 misses, and all three recur from the 2026-09-13 list above. None warranted a write-back.

- **The three widened keys now pass.** The router picked `process-tracing`, `red-team-light` and `premortem` for the three cases, and each answer is in the key widened on 2026-10-17.
- **Three of the four "just tell me" declines recur.** These are the `scenario-planning`, `one-way-vs-two-way-door` and `decision-option-review` prompts listed above, and each answered "none" again. The fourth, *"Just multiply some made-up odds..."*, routed to `reference-class-forecasting` this time, so that case moves between runs.

### Output misses (from the 2026-10-20 output run)

`list-misses` reports 3 failed checks out of 429. The run is the first on `claude-opus-5-5`, for both the producer and the judge. Each failed check passed in every earlier output run of its skill, and each `SKILL.md` instructs the checked behaviour, so all three are recorded here. No `SKILL.md` edit came out of this review.

- **`five-whys`, "name no countermeasure when the chain branched".** The artifact flagged branches and redirected to `think-issue-tree`, then still offered a hedged countermeasure twice. `SKILL.md` step 6 says to name one "only if the chain held as `[single cause]` throughout". Passed 3 of 3 earlier runs. The judge noted that the skill's own quality checklist is softer: it says no countermeasure is "forced", where the eval check says "name no countermeasure". Aligning the two wordings is a maintainer edit, not a loop step.
- **`one-way-vs-two-way-door`, "for borderline cases name which way it leans".** The artifact named the deciding dimension but declined to lean. `SKILL.md` step 3 instructs both, in those words. Passed 4 of 4 earlier runs.
- **`pairwise-comparison`, "apply the question identically to every pair".** The artifact stated the question once, then judged two pairs for one reader and a third for another. `SKILL.md` step 1 and its quality checklist both instruct one question for every pair. Passed this check in 4 of 4 earlier runs; a different check failed on 2026-06-17.

**No output check has failed twice.** Across every output scorecard from 2026-06-10 to 2026-10-20, 16 distinct checks failed, and none failed in a second run. Every 2026-09-12 failure passed on 2026-10-20, including the two whose check wording changed on 2026-10-17. The failures scatter across skills from run to run, which is what run-to-run variation looks like. The match is on each check's wording, so a reworded check could hide a repeat.

### Output misses: the same rule, with a different write-back

An output miss is a failed output check, not a routing error, so its write-back target is the procedure, not the boundary. Every output miss ends in one of three places.

1. **A procedure fix in `SKILL.md`**, when the procedure does not instruct the checked behaviour or buries it. The fix is unmeasured until the skill is re-run.
2. **A check or prompt change**, when the check asks for something the eval prompt cannot supply. That is the maintainer's call, like widening an answer key.
3. **This note**, when the procedure clearly instructs the behaviour and the check passed in earlier runs.

The discriminator is recurrence: list the skill's result in every earlier output scorecard before classifying.

### Output misses (from the 2026-09-12 output run)

`list-misses` reports 5 failed checks out of 429. That run was the first with the verifying judge from #126, which opens any file an artifact makes a claim about. All four skills below other than QCA passed the same check on the same prompt in every earlier run (2026-06-10, 2026-06-17 and 2026-06-25, as each applies). One run cannot separate run-to-run noise from the stricter judge.

- **A procedure defect, already fixed: `qualitative-comparative-analysis`.** The artifact said process tracing "is a method, not a shipped skill", a falsehood inherited from the skill's own `references/TEMPLATE.md`. #133 tightened the check, #136 fixed the template and dossier, and #137 fixed the description. The 2026-09-13 re-run scored 6/6.
- **The check asks for something the prompt cannot supply.** Both were check-wording decisions for the maintainer. **Decided 2026-10-17:** `affinity-mapping` check 1 now accepts an explicitly labelled illustrative corpus, and `interval-calibration-check` check 3 now passes a bet marked pending when no human answers it. Both apply from the next output run.
  - `affinity-mapping`, "cluster before naming". The trigger prompt describes 60 interview notes without supplying them, so the producer invents the corpus and the clusters in one pass. The judge read the invented items' ordering as bucket-first. `SKILL.md` step 2 already says "Cluster before naming".
  - `interval-calibration-check`, "record the bet verdict and the adjusted interval". A one-shot eval has no human to answer the equivalent bet. The artifact correctly refused to self-administer it, and the judge called the deferral "methodologically correct". Check 4 has a fallback for missing data; check 3 does not.
- **Recorded only: the procedure instructs it twice.**
  - `interest-based-negotiation`. The artifact quoted its own rule against an accept-or-walk call without a valued alternative, then made one in different words. `SKILL.md` states the rule at line 30 and again in step 3.
  - `pyramid-principle`. The judge found one missing "why this provider" key line, a materiality call on one generated memo. `SKILL.md` steps 3 and 6 both instruct the exhaustiveness test.

No `SKILL.md` edit came out of this review.

## The dispatch output eval (a dispatcher cannot be measured by the generic runner)

`output.workflow.mjs` asks a producer to read `SKILL.md` plus `references/TEMPLATE.md` and emit the
artifact inline. For `think-research-framework` that is measuring the skill doing the opposite of
its documented procedure, for three independent reasons - each sufficient on its own:

- its `SKILL.md` says, in those words, *"do not run the research inline in this context"*, because
  the honesty discipline lives in the subagent;
- it ships **no `references/` directory**, so there is no `TEMPLATE.md` for the produce prompt to
  read - it is a dispatcher, not an artifact-emitting method;
- its output checks demand 3 to 6 real sources with a traceable primary for every statistic, and an
  inline producer is never told to research anything. A judge passing fabricated citations returns a
  number that **rewards** the single failure this library exists to prevent.

So the instrument changes rather than the skill.

| | generic output eval | dispatch output eval |
|---|---|---|
| producer | an agent reading `SKILL.md` + `TEMPLATE.md` | the **shipped subagent prompt**, read off disk and injected verbatim |
| isolation | none | a git worktree, so the agent's real Write scope stays real |
| captured | one `artifact` string | `dossier`, `proposedEntry` (an object), `verdict`, `sources` |
| who decides each check | the judge | the judge, **except** schema validity, which a validator decides |

### The two-decider split, and why it needs its own lib

One of the research engine's own checks is *"emit a proposed registry entry that passes
`scripts/check-proposed-entry.mjs`"*. That is a decidable fact, and the producer is instructed to
self-validate until it passes - so asking a model judge to grade it would be grading the producer's
claim about itself against a check a machine can settle. The judge therefore grades the other checks
and never sees that one; `resolve-dispatch-checks.mjs` runs the named validator as a real subprocess
and splices the verdict back in.

Splitting one checklist between two deciders creates a failure mode the generic harness does not
have: **an off-by-one in the merge attributes a grade to the wrong check while `passed/total` still
looks correct**. That is a corrupted scorecard whose corruption is invisible downstream. So the merge
is a pure function - `scripts/lib/dispatch-checks-lib.mjs` `spliceChecks()` - which walks the
authoritative checklist once and throws rather than merging on any mismatch (a leftover grade, a
missing grade, a run with nothing deterministic to resolve). Its tests are mismatch-first.

### A noted substitution, recorded rather than glossed

The producer is **not** the host's registered subagent type. This library is normally not installed
as a plugin in the session that runs its own eval, so there is no `think-research-framework`
`agentType` to dispatch to. The harness reads `agents/think-research-framework.md` and injects its
body verbatim instead. That is strictly *more* reproducible - it measures the file in the repo rather
than whatever an installed copy happens to hold - but it is a substitution, and the scorecard
provenance says so.

### Running it

```
node scripts/eval/extract-output.mjs research-framework > rf-cases.json
#   Workflow scriptPath: scripts/eval/dispatch-output.workflow.mjs
#            args: {model, casesPath, agentPath, skill}
node scripts/eval/resolve-dispatch-checks.mjs rf-wf.json rf-cases.json --out rf-results.json
node scripts/eval/finalize.mjs <YYYY-MM-DD> --model <resolved model id> --output rf-results.json \
  --prefix research-framework --stamp research-framework
```

**`--stamp` takes BARE slugs, not `think-` prefixed ones.** `stampMeta` builds the path as
`skills/think-<slug>/skill.meta.yml`, so `--stamp think-research-framework` resolves to
`skills/think-think-research-framework/` - which does not exist, and the function **silently counts
it as `skipped`** rather than failing. The result is the worst shape available: a committed scorecard
that says `measured` beside a sidecar that still says `authored`, with nothing red. Check the
`stamped` count in the output, not just the exit code.

`maturity` is NOT stamped by any script - it carries a hand-written justification comment, so it is a
deliberate manual edit. The lifecycle guard in `check-registry.mjs` will red the gate if both eval
stamps read `measured-*` while `maturity` does not say `measured`, so the gate catches a forgotten
edit; it cannot catch a wrong reason, which is why the comment is written by hand.

It emits the standard `OUTPUT` scorecard kind deliberately, rather than inventing a new one: gate
layer 15 validates scorecard shapes per kind, so a new kind would red CI until
`eval-results-lib.mjs` learned it. The `--stamp` is scoped for the same reason the selection eval's
is - `finalize.mjs`'s default walks the 63 registry frameworks and would re-date every one of them
off a run that measured a single tool.

## Finalizing a run (one command, guaranteed paired artifacts)

`score.mjs` / `score-output.mjs` still print a scorecard for ad-hoc inspection, but to COMMIT a run use `finalize.mjs` - it writes BOTH the `.md` and the `.json` straight into `docs/internal/eval-results/` (so the `.json` sidecar can never be dropped) and stamps each shipped skill's `skill.meta.yml`:

    node scripts/eval/finalize.mjs <YYYY-MM-DD> --model <resolved model id> \
      --trigger <routed.json> <cases.json> \
      --output <results.json>

Add `--prefix contested` for a cohort run (writes `<date>-contested-<kind>-eval.*`).

### A full pass: three commands

`eval.workflow.mjs` runs both halves in one Workflow call, so a pass is **extract -> the combined Workflow -> `finalize`**:

    node scripts/eval/extract-cases.mjs > cases.json     # + write the blind [{id,prompt}] copy
    node scripts/eval/extract-output.mjs > out-cases.json

    # Workflow scriptPath: scripts/eval/eval.workflow.mjs
    #   args: { model, blindPath, count, casesPath, skills, batchSize?, corpusPath? }
    #   returns { modelTier, count, routed, corpusPath, routes, evaluated, of, results }

    node scripts/eval/finalize.mjs <YYYY-MM-DD> --model <resolved model id> \
      --trigger <routed.json> <cases.json> \
      --output <results.json>

Each half of the return matches what the standalone runner emits, so `finalize` consumes them unchanged and the two paths cannot diverge in what they write.

**Run the halves separately when you want them separate** - re-measuring only routing after a description change, say, or only the output half after a check is tightened. `route.workflow.mjs` and `output.workflow.mjs` stay the primary tools; the combined runner is for a full pass.

Its prompts are **verbatim copies** of the two runners' (a Workflow script cannot import), and `tests/eval-workflow-prompts.test.mjs` asserts they stay byte-identical. A prompt is the instrument: #126 tightened the judge and moved the published output figure, and a copy that missed that edit would emit an identical-looking scorecard from a laxer judge. Edit a prompt in one place and the suite reds until both agree.

The committed scorecards are guarded: `scripts/check-eval-results.mjs` (a `check.mjs` layer) reds CI if any scorecard is missing its `.md`/`.json` twin, is malformed, **or claims a measurement its skills' sidecars do not carry** - the last of those catches a stamping step that silently stamped nothing.

## Reproducibility: which model, which cases (roadmap C2-1)

A scorecard that records only a date can be re-measured but not reproduced. When the model behind a published figure changes, or a skill's cases are edited after it was measured, the figure moves and nothing says why. So every run now records both.

- **The model is a run parameter, never inherited.** Every eval workflow requires `args.model` (`haiku`, `sonnet`, `opus` or `fable`), hands it to every `agent()` call, and refuses to start without it. The dispatch eval's file reader is the one exception: it stays `haiku`, because it only copies text. `tests/eval-workflow-model.test.mjs` runs each workflow against a stubbed runtime and asserts that no eval agent runs on any other model.
- **The tier is recorded by construction; the version by the operator.** Each workflow returns `modelTier`, and `finalize.mjs` reads it from the run output. A tier alone cannot tell Opus 5 from Opus 5.5, so `finalize.mjs` and `score-selection.mjs` also require `--model <resolved model id>`, for example `claude-opus-5-5`. They refuse when the ID does not name the tier the run used, when two sources disagree on the tier, or when no source names one. `--model-tier` exists only for run output from before the workflows returned it.
- **What lands in the scorecard.** The `.json` records `provenance.model`, `modelTier`, `casesSha` and `skillCasesSha`, and the `.md` carries a `Run:` line under its title. `skillCasesSha` holds one fingerprint per measured skill: sha256 of its `eval/cases.md`, line endings normalized, first 12 hex characters. `casesSha` is a fingerprint over those, so it means the same thing for every scorecard kind.
- **One known gap, kept narrow on purpose.** The fingerprints are taken from the tree when `finalize` runs, not when the cases were extracted. An edit between those two steps would record cases the run never saw, so run extract, the Workflow and finalize together.
- **The gate holds new scorecards to it.** Gate layer 15 requires `model`, `modelTier` and `casesSha` on every TRIGGER, OUTPUT and SKILL-SELECTION scorecard dated `2026-10-14` or later. Older scorecards genuinely carry none. They stay valid, and no model is guessed for them.
- **Only like-for-like runs are comparable.** A run on a different model or tier starts a new baseline; compare it against the old figure only to describe the change, not to claim one.

### Which skills need re-measuring?

    npm run eval:freshness

For every skill the committed scorecards measured, this compares the newest scorecard's recorded `eval/cases.md` fingerprint with the file as it is now, and lists the skills whose cases changed since they were measured: a re-eval queue. It is advisory and always exits 0, because the eval is offline and a re-run is paid spend. Skills last measured before fingerprints were recorded are counted as `measured before fingerprints were recorded` until the next run.

## Status / roadmap

- **Trigger eval**: implemented (routing accuracy). First full run under `docs/internal/eval-results/`.
- **Output eval**: implemented (artifact quality, produce -> judge). First full run under `docs/internal/eval-results/`.
- **Finalize-driven flow**: implemented. `finalize.mjs` is the canonical commit path; `score.mjs` / `score-output.mjs` are now ad-hoc inspection tools only.
- **Meta-skill coverage**: **all 4 fully measured** (trigger + output). `think-research-framework` is output-unmeasurable by the *generic* produce-then-judge harness - it dispatches to a subagent with web search and its SKILL.md forbids inline research - so the **dispatch output eval** above was built for it and scored it **6/6 on 2026-09-11** (`docs/internal/eval-results/2026-09-11-research-framework-output-eval.*`). It reads `maturity: measured`; no tool in the library is `alpha` in `docs/internal/backlog.md`.
- **Dispatch output eval**: implemented - a faithful-dispatch producer in an isolated worktree, a judge that grades only what a model may decide, and a deterministic validator pass for the one check a model must not decide.
- **Skill-selection eval**: implemented - the sibling instrument that routes against the installed roster (67 skills + 10 commands) instead of the framework catalog. It is the only instrument that can measure the four meta-skills, and the only one that can answer guardrail 6's command-interference question.
- **Combined run (Task 8)**: implemented - `eval.workflow.mjs` runs both halves in one Workflow call, making a full pass three commands. Its prompts are verbatim copies of the two single-half runners (a Workflow script cannot import) and `tests/eval-workflow-prompts.test.mjs` asserts they stay byte-identical, because a prompt is the instrument.
- **Scorecard pairing guard**: implemented - `check-eval-results.mjs` is the 14th `check.mjs` layer; reds CI if any committed scorecard is missing its `.md`/`.json` twin or is malformed.
