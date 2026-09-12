# Output eval scorecard

Skills evaluated: 63. Output checks: 429.

**Overall: 98.8% of checks passed** (424/429). Skills passing every check: 58/63.

| Skill | checks passed | artifact chars |
|---|---|---|
| abstraction-laddering | 100% (6/6) | 4943 |
| affinity-mapping | 83.3% (5/6) | 14924 |
| after-action-review | 100% (6/6) | 6470 |
| analysis-of-competing-hypotheses | 100% (5/5) | 6571 |
| argument-mapping | 100% (6/6) | 5832 |
| assumption-reversal | 100% (6/6) | 7767 |
| authentic-dissent | 100% (6/6) | 10562 |
| backcasting | 100% (6/6) | 11395 |
| belief-update-routine | 100% (7/7) | 10514 |
| boundary-critique | 100% (7/7) | 11030 |
| brainwriting | 100% (6/6) | 7430 |
| causal-layered-analysis | 100% (8/8) | 9658 |
| causal-loop-diagrams | 100% (7/7) | 10507 |
| complexity-domain-sort | 100% (6/6) | 7025 |
| concept-mapping | 100% (6/6) | 10267 |
| consider-the-unknowns | 100% (8/8) | 12351 |
| contradiction-resolution | 100% (7/7) | 11243 |
| contradiction-tension-mapping | 100% (8/8) | 14364 |
| decision-journal | 100% (6/6) | 9463 |
| decision-option-review | 100% (6/6) | 10146 |
| dialectical-bootstrapping | 100% (9/9) | 14215 |
| eisenhower-moscow-pareto | 100% (5/5) | 7919 |
| ethical-matrix | 100% (8/8) | 15896 |
| evidence-vs-inference-sort | 100% (6/6) | 8611 |
| expected-value-decision-tree | 100% (8/8) | 17784 |
| far-analogy-ideation | 100% (5/5) | 8522 |
| fermi-estimation | 100% (7/7) | 8398 |
| five-whys | 100% (6/6) | 5833 |
| frame-creation | 100% (8/8) | 18347 |
| futures-wheel | 100% (6/6) | 10264 |
| iceberg-model | 100% (7/7) | 7877 |
| interest-based-negotiation | 88.8% (8/9) | 20249 |
| interval-calibration-check | 85.7% (6/7) | 12893 |
| issue-tree | 100% (6/6) | 16402 |
| ladder-of-inference-check | 100% (6/6) | 5356 |
| linear-model-aggregation | 100% (7/7) | 7918 |
| minimax-regret | 100% (10/10) | 12474 |
| morphological-analysis | 100% (8/8) | 18071 |
| natural-frequency-bayesian | 100% (6/6) | 7929 |
| one-way-vs-two-way-door | 100% (6/6) | 8000 |
| pairwise-comparison | 100% (8/8) | 6684 |
| parallel-perspectives-review | 100% (6/6) | 6741 |
| premortem | 100% (6/6) | 13154 |
| problem-restatement | 100% (6/6) | 4839 |
| process-tracing | 100% (9/9) | 24529 |
| pyramid-principle | 83.3% (5/6) | 10136 |
| qualitative-comparative-analysis | 83.3% (5/6) | 5924 |
| question-burst | 100% (6/6) | 2504 |
| red-team-light | 100% (7/7) | 8574 |
| reference-class-forecasting | 100% (6/6) | 12284 |
| reflective-equilibrium | 100% (6/6) | 14911 |
| role-storming | 100% (8/8) | 11894 |
| scamper | 100% (6/6) | 7358 |
| scenario-planning | 100% (8/8) | 15340 |
| speculative-harms-anti-goals | 100% (8/8) | 18683 |
| stocks-and-flows-reasoning | 100% (6/6) | 6264 |
| swot | 100% (6/6) | 8007 |
| theory-of-constraints | 100% (8/8) | 16445 |
| three-horizons | 100% (10/10) | 12112 |
| veil-of-ignorance-reasoning | 100% (8/8) | 18304 |
| walton-argumentation-schemes | 100% (8/8) | 11412 |
| what-would-have-to-be-true | 100% (6/6) | 6906 |
| woop | 100% (6/6) | 1585 |

## Failed checks (5)

**affinity-mapping** (5/6)
- FAIL: "Cluster the items before naming any theme, so the themes emerge from the items rather than" - The artifact narrates deferral ("Clustering ran on the ledger before any theme had a name", "Naming came last") but its own Appendix A ledger contradicts it: item IDs land in contiguous theme blocks (N01-N05 T1, N06-N10 T2, N11-N15 T1, N16-N20 T3, N21-N25 T4, N26-N30 T6, N31-N34 T9, N36-N37 T10, N38-N41 T8, N44-N50 T5, N51-N53 T7, N54-N55 T4, N56-N57 T10, N58-N60 parking lot), with only N02/N35/N43/N46 crossing blocks - the fingerprint of items generated FROM buckets, and the narrated "about twenty notes first landed together" is exactly N01-N20 = themes 1+2+3 (9+6+5=20). No notes were supplied, so per skills/think-affinity-mapping/SKILL.md step 1 the move was to gather them or label the corpus illustrative; instead a bottom-up process narrative is asserted over a bucket-ordered invented pile and written in findings voice ("What did new users actually experience").

**interest-based-negotiation** (8/9)
- FAIL: "Name a **best alternative away from the table, value it, and derive a reservation point**;" - The alternative is correctly named-but-unpriced with "price the alternative" as the first action and a clean walk-vs-fallback split (A1 descope / A2 bridge rightly excluded because both still need the vendor's signature), but the section headed "Withheld - and deliberately so ... This map will not emit one" then emits exactly that: "Above the walk line, **or if they refuse both a measured support commitment and an uplift cap, your alternative is the better decision**" is a walk trigger no priced alternative supports (the artifact itself calls A4 "usually the worst option"), alongside "renewal at or under the walk line, press to close" and the asymmetry branch's "accept a market-rate renewal" - breaching the skill's hard wall "Do not emit an accept-or-walk recommendation without a named, valued best alternative" (skills/think-interest-based-negotiation/SKILL.md, When NOT to Use and step 3).

**interval-calibration-check** (6/7)
- FAIL: "Run the **equivalent-bet test** on each interval and record the original interval, the bet" - Only the original interval is recorded: the verdict cell says "Rung 1 posed; verdict not yet returned" and the adjusted-interval cell says "Not yet recorded - awaiting the judge's stop point," while the direction ("widen expected") is pre-filled from a population prior rather than derived from a verdict - so two of the four required recordings, including the width adjustment the check exists to capture, are absent by the artifact's own statement; the rung ladder and decision rule are an instrument that was set up, not a run and recorded test (contrast references/EXAMPLE.md, where verdict, direction and 2-7% at indifference are all filled). The deferral is methodologically correct under the skill's no-self-administered-bet wall, but check 3, unlike check 4, carries no fallback branch for an unreturned verdict.

**pyramid-principle** (5/6)
- FAIL: "Make the key arguments MECE - no two overlap, and nothing material to the claim is missing" - Mutual exclusivity and support placement hold (verified no dollar claim under 2, no engineer-time claim under 1; sequencing/rollback/lock-in under 3, renewal date and overlap cost under 4), but exhaustiveness fails on the governing thought's own provider-specific edge: KA1 and KA2 are symmetric between the two estates and no key line argues why [chosen provider] is the target, while the artifact asserts the exec's real objections 'are all answered on the page' and names only lock-in, migration risk and why-now - the why-this-one question behind a provider-specific CUA signature is neither answered nor scoped out.

**qualitative-comparative-analysis** (5/6)
- FAIL: "Redirect to a specific evidence-based shipped skill (think-reference-class-forecasting) fo" - The primary redirect holds - think-reference-class-forecasting exists (skills/think-reference-class-forecasting/SKILL.md, tier S, in recommendable.json) and the claims about it match its steps - but the one-case branch declines to route on a false premise: "Process tracing is a method, not a shipped skill; run it by hand" is wrong, since skills/think-process-tracing/SKILL.md ships (tier P, built for exactly that single-case rival-explanation job) and "think-process-tracing" is listed in skills/think-framework-advisor/references/recommendable.json; the falsehood is inherited verbatim from the QCA skill's own references/TEMPLATE.md (and echoed in its SKILL.md as "not a shipped skill here"), so the fix belongs upstream in that template.

