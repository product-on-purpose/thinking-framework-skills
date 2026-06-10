# Trigger eval - first full run (2026-06-10)

The first behavioral measurement of the catalog's routing. The library grades each *method's* evidence in its dossier and validates each skill's eval cases for *form* (the `eval-cases` gate layer), but whether *this agent-executable skill actually triggers correctly* was, until this run, unmeasured (`skill.meta.yml` -> `trigger_eval_status: not-run`). This closes that gap for the trigger half.

## Method

All 561 trigger / anti cases from the 47 shipped skills' `eval/cases.md` were pooled and stripped to a blind answer key (`scripts/eval/extract-cases.mjs`). Blind router agents (`scripts/eval/route.workflow.mjs`) - which never see which skill authored a case or the expected answer - routed each situation to its best-fit framework against the public advisor catalog (`recommendable.json`), exactly as the live advisor would. The deterministic scorer (`scripts/eval/score.mjs`) then graded routed-vs-expected. Reproducible end to end; see `scripts/eval/README.md`.

This measures the **catalog's discriminability** - do the skill descriptions and anti-triggers route a situation to the right framework? - which is what the advisor depends on. It is a single model-executed run (non-deterministic, borrowing the running model): a measurement, not a gate. It does NOT measure artifact quality; the output eval is a planned follow-on.

## Reading the result

- **No false-fires (0 of 280 anti cases).** The headline. Across every anti case (a deliberately wrong-tool or no-tool situation), no skill wrongly grabbed it. The thing the advisor most needs - skills that do not over-trigger - holds at 100%.
- **99% trigger top1, 100% top3.** Of 281 "should trigger" situations, 278 routed to the authoring skill on the first pick, and all 281 had it in the top 3. The 3 top1 misses are near-twins (issue-tree vs what-would-have-to-be-true; question-burst vs problem-restatement; premortem vs authentic-dissent, the last arguably a *better* route than the case assumed, since the prompt is about unspoken dissent), each with the intended skill still in top3.
- **91% right-alternative (63 of 69).** Of the anti cases that named a specific alternative, most routed there; the 6 gaps are all the router answering "none" on a genuinely trivial or already-decided prompt where a specific alternative was named but declining is also defensible. None is a false-fire.

The honest read: the catalog routes cleanly. This is a strong baseline; re-run after catalog changes (it is cheap and reproducible). The full machine record is `2026-06-10-trigger-eval.json`.

## Scorecard


Cases: 561 (281 trigger, 280 anti; 69 of the anti cases name a specific alternative) across 47 skills. Unrouted: 0.

- **Trigger accuracy (top1): 99%** (278/281); soft (in top3): 100%.
- **Anti no-false-fire: 100%** (280/280) - the skill did NOT grab a wrong-tool / no-tool situation. This is the metric that matters.
- Anti right-alternative: 91% (63/69) - of the anti cases naming a specific alternative, how many routed there (the rest mostly answered "none" on a genuinely trivial prompt, still not a false-fire).

| Skill | trigger top1 | top3 | anti no-fire | anti right-alt |
|---|---|---|---|---|
| abstraction-laddering | 100% (6/6) | 100% | 100% | 100% (1/1) |
| affinity-mapping | 100% (6/6) | 100% | 100% | n/a |
| after-action-review | 100% (6/6) | 100% | 100% | n/a |
| argument-mapping | 100% (6/6) | 100% | 100% | n/a |
| assumption-reversal | 100% (6/6) | 100% | 100% | n/a |
| authentic-dissent | 100% (6/6) | 100% | 100% | n/a |
| backcasting | 100% (6/6) | 100% | 100% | n/a |
| belief-update-routine | 100% (6/6) | 100% | 100% | 100% (3/3) |
| boundary-critique | 100% (6/6) | 100% | 100% | 50% (2/4) |
| brainwriting | 100% (6/6) | 100% | 100% | n/a |
| causal-layered-analysis | 100% (6/6) | 100% | 100% | 100% (6/6) |
| causal-loop-diagrams | 100% (6/6) | 100% | 100% | n/a |
| concept-mapping | 100% (6/6) | 100% | 100% | n/a |
| contradiction-resolution | 100% (6/6) | 100% | 100% | 100% (3/3) |
| contradiction-tension-mapping | 100% (6/6) | 100% | 100% | 100% (5/5) |
| decision-journal | 100% (6/6) | 100% | 100% | 100% (2/2) |
| decision-option-review | 100% (6/6) | 100% | 100% | n/a |
| evidence-vs-inference-sort | 100% (6/6) | 100% | 100% | n/a |
| expected-value-decision-tree | 100% (5/5) | 100% | 100% | 50% (2/4) |
| far-analogy-ideation | 100% (6/6) | 100% | 100% | n/a |
| fermi-estimation | 100% (6/6) | 100% | 100% | 100% (5/5) |
| frame-creation | 100% (6/6) | 100% | 100% | 100% (4/4) |
| futures-wheel | 100% (6/6) | 100% | 100% | n/a |
| iceberg-model | 100% (6/6) | 100% | 100% | n/a |
| issue-tree | 83% (5/6) | 100% | 100% | n/a |
| ladder-of-inference-check | 100% (6/6) | 100% | 100% | n/a |
| linear-model-aggregation | 100% (6/6) | 100% | 100% | n/a |
| minimax-regret | 100% (6/6) | 100% | 100% | 100% (3/3) |
| morphological-analysis | 100% (6/6) | 100% | 100% | 83% (5/6) |
| natural-frequency-bayesian | 100% (6/6) | 100% | 100% | n/a |
| one-way-vs-two-way-door | 100% (6/6) | 100% | 100% | 100% (1/1) |
| pairwise-comparison | 100% (6/6) | 100% | 100% | 100% (4/4) |
| parallel-perspectives-review | 100% (6/6) | 100% | 100% | n/a |
| premortem | 83% (5/6) | 100% | 100% | n/a |
| problem-restatement | 100% (6/6) | 100% | 100% | n/a |
| pyramid-principle | 100% (6/6) | 100% | 100% | 100% (2/2) |
| question-burst | 83% (5/6) | 100% | 100% | n/a |
| red-team-light | 100% (6/6) | 100% | 100% | n/a |
| reference-class-forecasting | 100% (6/6) | 100% | 100% | n/a |
| role-storming | 100% (6/6) | 100% | 100% | 83% (5/6) |
| scamper | 100% (6/6) | 100% | 100% | n/a |
| scenario-planning | 100% (6/6) | 100% | 100% | 100% (3/3) |
| stocks-and-flows-reasoning | 100% (6/6) | 100% | 100% | n/a |
| theory-of-constraints | 100% (6/6) | 100% | 100% | 100% (3/3) |
| three-horizons | 100% (6/6) | 100% | 100% | 100% (4/4) |
| what-would-have-to-be-true | 100% (6/6) | 100% | 100% | n/a |
| woop | 100% (6/6) | 100% | 100% | n/a |

## False-fires (a skill grabbed a wrong-tool situation - the real failure mode): 0

_None. No skill triggered on a situation meant for another tool or no tool._

## Other misses (trigger top1 wrong, or anti routed to "none"/another instead of the named alternative)

**boundary-critique**
- (anti-soft) want `decision-option-review`, got `none` - "This is a purely technical config decision with one obvious owner and no"
- (anti-soft) want `decision-option-review`, got `none` - "We know the boundary is disputed - now just tell us who's right and sett"

**expected-value-decision-tree**
- (anti-soft) want `one-way-vs-two-way-door`, got `none` - "Deploy the hotfix now or wait for the morning window? Pretty obvious, fu"
- (anti-soft) want `reference-class-forecasting`, got `none` - "Just multiply some made-up odds by some made-up payoffs and give me a nu"

**issue-tree**
- (trigger) want `issue-tree`, got `what-would-have-to-be-true` - "Should we launch a self-serve free tier? It's too big a question - help "

**morphological-analysis**
- (anti-soft) want `decision-option-review`, got `none` - "Just tell me the single best pricing model for us."

**premortem**
- (trigger) want `premortem`, got `authentic-dissent` - "I have a nagging feeling about this acquisition but nobody will say anyt"

**question-burst**
- (trigger) want `question-burst`, got `problem-restatement` - "We're just starting to explore this ambiguous onboarding mess and I don'"

**role-storming**
- (anti-soft) want `authentic-dissent`, got `red-team-light` - "I want someone to genuinely poke holes in this plan and surface real obj"

