# Output eval scorecard

Skills evaluated: 56. Output checks: 389.

**Overall: 99% of checks passed** (386/389). Skills passing every check: 53/56.

| Skill | checks passed | artifact chars |
|---|---|---|
| abstraction-laddering | 100% (6/6) | 5451 |
| affinity-mapping | 100% (6/6) | 7937 |
| after-action-review | 100% (6/6) | 6465 |
| argument-mapping | 100% (6/6) | 9006 |
| assumption-reversal | 100% (6/6) | 6600 |
| authentic-dissent | 100% (6/6) | 7578 |
| backcasting | 100% (6/6) | 10076 |
| belief-update-routine | 100% (7/7) | 11842 |
| boundary-critique | 100% (7/7) | 10145 |
| brainwriting | 100% (6/6) | 6846 |
| causal-layered-analysis | 88% (7/8) | 8427 |
| causal-loop-diagrams | 100% (7/7) | 8644 |
| concept-mapping | 100% (6/6) | 7779 |
| consider-the-unknowns | 100% (8/8) | 9551 |
| contradiction-resolution | 100% (7/7) | 8695 |
| contradiction-tension-mapping | 100% (8/8) | 12310 |
| decision-journal | 100% (6/6) | 7962 |
| decision-option-review | 100% (6/6) | 7362 |
| dialectical-bootstrapping | 100% (9/9) | 7684 |
| ethical-matrix | 100% (8/8) | 11363 |
| evidence-vs-inference-sort | 100% (6/6) | 8599 |
| expected-value-decision-tree | 100% (8/8) | 9295 |
| far-analogy-ideation | 100% (5/5) | 11106 |
| fermi-estimation | 100% (7/7) | 8288 |
| frame-creation | 100% (8/8) | 13024 |
| futures-wheel | 100% (6/6) | 7097 |
| iceberg-model | 100% (7/7) | 8029 |
| interest-based-negotiation | 100% (9/9) | 11755 |
| interval-calibration-check | 100% (7/7) | 8509 |
| issue-tree | 100% (6/6) | 11323 |
| ladder-of-inference-check | 100% (6/6) | 4512 |
| linear-model-aggregation | 100% (7/7) | 5933 |
| minimax-regret | 90% (9/10) | 9110 |
| morphological-analysis | 100% (8/8) | 12231 |
| natural-frequency-bayesian | 100% (6/6) | 4182 |
| one-way-vs-two-way-door | 100% (6/6) | 6313 |
| pairwise-comparison | 88% (7/8) | 6162 |
| parallel-perspectives-review | 100% (6/6) | 6238 |
| premortem | 100% (6/6) | 9584 |
| problem-restatement | 100% (6/6) | 5483 |
| process-tracing | 100% (9/9) | 15962 |
| pyramid-principle | 100% (6/6) | 8191 |
| question-burst | 100% (6/6) | 3359 |
| red-team-light | 100% (7/7) | 7115 |
| reference-class-forecasting | 100% (6/6) | 6415 |
| role-storming | 100% (8/8) | 10070 |
| scamper | 100% (6/6) | 8204 |
| scenario-planning | 100% (8/8) | 12888 |
| speculative-harms-anti-goals | 100% (8/8) | 14501 |
| stocks-and-flows-reasoning | 100% (6/6) | 4316 |
| theory-of-constraints | 100% (8/8) | 11675 |
| three-horizons | 100% (10/10) | 9502 |
| veil-of-ignorance-reasoning | 100% (8/8) | 11041 |
| walton-argumentation-schemes | 100% (8/8) | 9478 |
| what-would-have-to-be-true | 100% (6/6) | 6405 |
| woop | 100% (6/6) | 2025 |

## Failed checks (3)

**causal-layered-analysis** (7/8)
- FAIL: "Not overclaim: keep to a reframing aid; the evidence is conceptually-plausible-but-unteste" - The artifact stays modest and claims only a reframing aid (no measured-outcome claim), but it never ships the specified evidence caveat - nowhere does it state the evidence is conceptually-plausible-but-untested, transferred, and without a measured outcome effect.

**minimax-regret** (9/10)
- FAIL: "Show the payoff matrix with real inputs (unknown cells flagged, not fabricated) and the pe" - The prompt supplied no cell payoffs, yet the artifact fabricates a complete numeric matrix of illustrative placeholders and derives a concrete pick from it; this check guards against exactly that, asking unknown cells to be flagged rather than fabricated. The honest disclosure is strong but the cells are invented, not flagged as unknown. Per-column best is present.

**pairwise-comparison** (7/8)
- FAIL: "Not overclaim: keep to an easier-and-more-stable ranking aid; the evidence is practitioner" - The artifact keeps to a 'stable aid for choosing, not proof' and avoids any measured-gain claim, but it never characterizes the evidence as practitioner-grade and transferred, so the evidence-provenance portion of the check is not satisfied.

