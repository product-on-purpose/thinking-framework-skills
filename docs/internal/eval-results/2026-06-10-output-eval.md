# Output eval - first full run (2026-06-10)

The companion to the trigger eval (`2026-06-10-trigger-eval.md`): where that measured whether the catalog routes to the right skill, this measures whether each skill, once run, produces an artifact that meets its OWN quality bar. It closes the `output_eval_status: not-run` half.

## Method

For each of the 47 shipped skills, `extract-output.mjs` pulls a triggering prompt and the skill's "Output checks" checklist from its `eval/cases.md`. A PRODUCE agent (`output.workflow.mjs`) then invokes the skill on the prompt and emits the full artifact; a SEPARATE JUDGE agent grades that artifact against the checklist, check by check, so the producer never grades itself. `score-output.mjs` aggregates. Reproducible end to end; see `scripts/eval/README.md`.

It is a single model-executed run (non-deterministic): a measurement, not a gate. Each check is a judgment, so the number is a snapshot of artifact quality, not a fixed property.

## Reading the result

- **99% of checks passed (311/315); 43 of 47 skills satisfied every check.** Across 47 freshly-produced artifacts, the skills overwhelmingly produce what their own checklists demand - structured, on-spec deliverables, not prose.
- **The 4 failures cluster on one element.** Three of the four (boundary-critique, contradiction-resolution, three-horizons) are the same miss: the artifact omitted the *evidence caveat* its "do not overclaim" check requires (a note that the method's evidence is practitioner / tier-C and transferred from human practice). The fourth (premortem) is the producer framing causes prospectively rather than the skill's signature definite-past declaration ("it has already failed, eight weeks out, because...").
- **The actionable read.** The evidence-honesty caveat is the element most likely to be dropped when an agent runs a skill cold - a precise place to tighten those skills' procedures (prompt the producer to carry the caveat into the artifact), or to accept as run-variance: the eval is non-deterministic, and role-storming failed a different check in the pilot but passed every check here. Either way it surfaced a specific, recurring gap, not a vague score.

A strong baseline. Re-run after skill edits, and pair with the trigger eval for the full behavioral picture. Machine record: `2026-06-10-output-eval.json`.

## Scorecard


Skills evaluated: 47. Output checks: 315.

**Overall: 99% of checks passed** (311/315). Skills passing every check: 43/47.

| Skill | checks passed | artifact chars |
|---|---|---|
| abstraction-laddering | 100% (6/6) | 5525 |
| affinity-mapping | 100% (6/6) | 13453 |
| after-action-review | 100% (6/6) | 8844 |
| argument-mapping | 100% (6/6) | 10908 |
| assumption-reversal | 100% (6/6) | 8849 |
| authentic-dissent | 100% (6/6) | 8443 |
| backcasting | 100% (6/6) | 11134 |
| belief-update-routine | 100% (7/7) | 14180 |
| boundary-critique | 86% (6/7) | 9123 |
| brainwriting | 100% (6/6) | 8776 |
| causal-layered-analysis | 100% (8/8) | 11460 |
| causal-loop-diagrams | 100% (7/7) | 8864 |
| concept-mapping | 100% (6/6) | 9486 |
| contradiction-resolution | 86% (6/7) | 11352 |
| contradiction-tension-mapping | 100% (8/8) | 11473 |
| decision-journal | 100% (6/6) | 8064 |
| decision-option-review | 100% (6/6) | 8807 |
| evidence-vs-inference-sort | 100% (6/6) | 9864 |
| expected-value-decision-tree | 100% (8/8) | 8590 |
| far-analogy-ideation | 100% (5/5) | 10416 |
| fermi-estimation | 100% (7/7) | 7475 |
| frame-creation | 100% (8/8) | 14267 |
| futures-wheel | 100% (6/6) | 6985 |
| iceberg-model | 100% (7/7) | 7294 |
| issue-tree | 100% (6/6) | 13066 |
| ladder-of-inference-check | 100% (6/6) | 4248 |
| linear-model-aggregation | 100% (7/7) | 6188 |
| minimax-regret | 100% (10/10) | 8430 |
| morphological-analysis | 100% (8/8) | 12922 |
| natural-frequency-bayesian | 100% (6/6) | 4016 |
| one-way-vs-two-way-door | 100% (6/6) | 7543 |
| pairwise-comparison | 100% (8/8) | 7665 |
| parallel-perspectives-review | 100% (6/6) | 5530 |
| premortem | 83% (5/6) | 8356 |
| problem-restatement | 100% (6/6) | 6347 |
| pyramid-principle | 100% (6/6) | 9210 |
| question-burst | 100% (6/6) | 3709 |
| red-team-light | 100% (7/7) | 7419 |
| reference-class-forecasting | 100% (6/6) | 6646 |
| role-storming | 100% (8/8) | 11119 |
| scamper | 100% (6/6) | 7450 |
| scenario-planning | 100% (8/8) | 14686 |
| stocks-and-flows-reasoning | 100% (6/6) | 4852 |
| theory-of-constraints | 100% (8/8) | 14288 |
| three-horizons | 90% (9/10) | 10100 |
| what-would-have-to-be-true | 100% (6/6) | 6835 |
| woop | 100% (6/6) | 2157 |

## Failed checks (4)

**boundary-critique** (6/7)
- FAIL: "Not overclaim: keep to "surfaces who the frame illegitimately includes or excludes, descri" - Scope is well-hedged (repeatedly disclaims adjudicating and notes it cannot compel a wider boundary), but the artifact never states the second required part - that the method's evidence is conceptual/tier-C and transferred from human practice - so this two-part check is only half met.

**contradiction-resolution** (6/7)
- FAIL: "Not overclaim: keep to "tests whether the trade-off is real and often dissolves it"; the e" - It avoids the worst overclaim (honestly bounds the dissolution) but never states the required method-level caveats - that the evidence is practitioner-grade and transferred, and that the matrix is contested; the matrix is only called flavor, not contested, and no evidence-calibration note appears.

**premortem** (5/6)
- FAIL: "Declare the failure in the definite past with a concrete, specific scenario anchored to a " - Horizon is stated (eight weeks post-cutover) and the failure scenarios are concrete and specific, but the artifact never performs the signature past-tense declaration - it frames causes prospectively/conditionally ("most likely to kill this," "Migration is wrong") rather than "it is eight weeks out and the launch has already failed because..."

**three-horizons** (9/10)
- FAIL: "Not overclaim: keep to a sensemaking scaffold that surfaces transition dynamics; the evide" - The artifact disclaims being a forecast/decision and frames itself as orientation, but it never states the epistemic-honesty element the check requires - that the evidence is tier C and transferred from human practice - so the overclaim guard is only partly met.

