# Output eval scorecard

Run: 2026-10-20 | model: `claude-opus-5-5` (tier `opus`) | cases: `52ac650e7bdd` (fingerprint of 63 skills' eval/cases.md)

Skills evaluated: 63. Output checks: 429.

**Overall: 99.3% of checks passed** (426/429). Skills passing every check: 60/63.

| Skill | checks passed | artifact chars |
|---|---|---|
| abstraction-laddering | 100% (6/6) | 4702 |
| affinity-mapping | 100% (6/6) | 17610 |
| after-action-review | 100% (6/6) | 8997 |
| analysis-of-competing-hypotheses | 100% (5/5) | 5916 |
| argument-mapping | 100% (6/6) | 7972 |
| assumption-reversal | 100% (6/6) | 6455 |
| authentic-dissent | 100% (6/6) | 8293 |
| backcasting | 100% (6/6) | 11829 |
| belief-update-routine | 100% (7/7) | 10939 |
| boundary-critique | 100% (7/7) | 8536 |
| brainwriting | 100% (6/6) | 8578 |
| causal-layered-analysis | 100% (8/8) | 11090 |
| causal-loop-diagrams | 100% (7/7) | 9839 |
| complexity-domain-sort | 100% (6/6) | 6893 |
| concept-mapping | 100% (6/6) | 9835 |
| consider-the-unknowns | 100% (8/8) | 9429 |
| contradiction-resolution | 100% (7/7) | 9145 |
| contradiction-tension-mapping | 100% (8/8) | 12383 |
| decision-journal | 100% (6/6) | 9777 |
| decision-option-review | 100% (6/6) | 8430 |
| dialectical-bootstrapping | 100% (9/9) | 10072 |
| eisenhower-moscow-pareto | 100% (5/5) | 7757 |
| ethical-matrix | 100% (8/8) | 14092 |
| evidence-vs-inference-sort | 100% (6/6) | 6950 |
| expected-value-decision-tree | 100% (8/8) | 13849 |
| far-analogy-ideation | 100% (5/5) | 5972 |
| fermi-estimation | 100% (7/7) | 9325 |
| five-whys | 83.3% (5/6) | 7609 |
| frame-creation | 100% (8/8) | 12479 |
| futures-wheel | 100% (6/6) | 7686 |
| iceberg-model | 100% (7/7) | 7809 |
| interest-based-negotiation | 100% (9/9) | 16391 |
| interval-calibration-check | 100% (7/7) | 10308 |
| issue-tree | 100% (6/6) | 17065 |
| ladder-of-inference-check | 100% (6/6) | 4763 |
| linear-model-aggregation | 100% (7/7) | 7079 |
| minimax-regret | 100% (10/10) | 10184 |
| morphological-analysis | 100% (8/8) | 17366 |
| natural-frequency-bayesian | 100% (6/6) | 6009 |
| one-way-vs-two-way-door | 83.3% (5/6) | 7942 |
| pairwise-comparison | 87.5% (7/8) | 7109 |
| parallel-perspectives-review | 100% (6/6) | 4803 |
| premortem | 100% (6/6) | 13112 |
| problem-restatement | 100% (6/6) | 5125 |
| process-tracing | 100% (9/9) | 16712 |
| pyramid-principle | 100% (6/6) | 11391 |
| qualitative-comparative-analysis | 100% (6/6) | 6414 |
| question-burst | 100% (6/6) | 3517 |
| red-team-light | 100% (7/7) | 7417 |
| reference-class-forecasting | 100% (6/6) | 10253 |
| reflective-equilibrium | 100% (6/6) | 14341 |
| role-storming | 100% (8/8) | 8591 |
| scamper | 100% (6/6) | 8014 |
| scenario-planning | 100% (8/8) | 17443 |
| speculative-harms-anti-goals | 100% (8/8) | 16299 |
| stocks-and-flows-reasoning | 100% (6/6) | 5461 |
| swot | 100% (6/6) | 7625 |
| theory-of-constraints | 100% (8/8) | 12193 |
| three-horizons | 100% (10/10) | 10737 |
| veil-of-ignorance-reasoning | 100% (8/8) | 16063 |
| walton-argumentation-schemes | 100% (8/8) | 10321 |
| what-would-have-to-be-true | 100% (6/6) | 7344 |
| woop | 100% (6/6) | 2257 |

## Failed checks (3)

**five-whys** (5/6)
- FAIL: "Aim one countermeasure at the terminal node when the chain is single-cause; when it branch" - The chain branched, yet the artifact names a countermeasure twice. The Countermeasure section says 'A run-duration alert would address the step 5 node... probably a sensible improvement', and next-step 3 names 'a run-duration and headroom alert'. Hedging it is not the same as naming none, which the out-cases.json line 256 wording requires; SKILL.md line 62 uses the softer 'not forced' wording.

**one-way-vs-two-way-door** (5/6)
- FAIL: "Render a verdict (one-way / two-way door) that follows from those dimensions, and for bord" - The verdict is 'Borderline, pending the one-hour test', so neither one-way nor two-way is rendered. The artifact names the deciding dimension (path-dependence) but never says which way the case leans, and it explicitly declines to lean. A conservative default such as 'treat as one-way until the test clears it' was available without inventing facts. Path-dependence is also a general prior about the dimension, not a finding from testing this decision.

**pairwise-comparison** (7/8)
- FAIL: "State the single comparative question once and apply it identically to every pair." - The question is stated once, and its wording stays fixed. But the artifact claims it 'is asked identically of all 15 pairs', and then its own record says pairs 4 and 15 were judged for the individual visitor while pair 5 was judged for the buying team lead. All 15 votes are the artifact's own stand-ins, so it controlled the frame and still let it drift. SKILL.md line 57 treats reader-frame drift as the question shifting ('a shifting question is what manufactures cycles'), so the claim of identical application is contradicted by the artifact itself.

