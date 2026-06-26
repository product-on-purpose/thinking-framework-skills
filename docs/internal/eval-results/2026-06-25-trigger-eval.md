# Trigger eval scorecard

Cases: 755 (376 trigger, 379 anti; 128 of the anti cases name a specific alternative) across 63 skills. Unrouted: 0.

- **Trigger accuracy (top1): 99%** (373/376); soft (in top3): 100%.
- **Anti no-false-fire: 100%** (379/379) - the skill did NOT grab a wrong-tool / no-tool situation. This is the metric that matters.
- Anti right-alternative: 96% (123/128) - of the anti cases naming a specific alternative, how many routed there (the rest mostly answered "none" on a genuinely trivial prompt, still not a false-fire).

| Skill | trigger top1 | top3 | anti no-fire | anti right-alt |
|---|---|---|---|---|
| abstraction-laddering | 100% (6/6) | 100% | 100% | 100% (1/1) |
| affinity-mapping | 100% (6/6) | 100% | 100% | n/a |
| after-action-review | 100% (6/6) | 100% | 100% | n/a |
| analysis-of-competing-hypotheses | 100% (5/5) | 100% | 100% | 100% (3/3) |
| argument-mapping | 100% (6/6) | 100% | 100% | n/a |
| assumption-reversal | 100% (6/6) | 100% | 100% | n/a |
| authentic-dissent | 100% (6/6) | 100% | 100% | n/a |
| backcasting | 100% (6/6) | 100% | 100% | n/a |
| belief-update-routine | 100% (6/6) | 100% | 100% | 100% (3/3) |
| boundary-critique | 100% (6/6) | 100% | 100% | 100% (4/4) |
| brainwriting | 100% (6/6) | 100% | 100% | n/a |
| causal-layered-analysis | 100% (6/6) | 100% | 100% | 100% (6/6) |
| causal-loop-diagrams | 100% (6/6) | 100% | 100% | n/a |
| complexity-domain-sort | 100% (6/6) | 100% | 100% | 100% (5/5) |
| concept-mapping | 100% (6/6) | 100% | 100% | n/a |
| consider-the-unknowns | 100% (6/6) | 100% | 100% | 100% (4/4) |
| contradiction-resolution | 100% (6/6) | 100% | 100% | 100% (3/3) |
| contradiction-tension-mapping | 100% (6/6) | 100% | 100% | 100% (5/5) |
| decision-journal | 100% (6/6) | 100% | 100% | 100% (2/2) |
| decision-option-review | 100% (6/6) | 100% | 100% | n/a |
| dialectical-bootstrapping | 100% (6/6) | 100% | 100% | 100% (2/2) |
| eisenhower-moscow-pareto | 100% (6/6) | 100% | 100% | 100% (6/6) |
| ethical-matrix | 100% (6/6) | 100% | 100% | 75% (3/4) |
| evidence-vs-inference-sort | 100% (6/6) | 100% | 100% | n/a |
| expected-value-decision-tree | 100% (5/5) | 100% | 100% | 50% (2/4) |
| far-analogy-ideation | 100% (6/6) | 100% | 100% | n/a |
| fermi-estimation | 100% (6/6) | 100% | 100% | 100% (5/5) |
| five-whys | 100% (6/6) | 100% | 100% | 80% (4/5) |
| frame-creation | 100% (6/6) | 100% | 100% | 100% (4/4) |
| futures-wheel | 100% (6/6) | 100% | 100% | n/a |
| iceberg-model | 100% (6/6) | 100% | 100% | n/a |
| interest-based-negotiation | 100% (6/6) | 100% | 100% | 100% (1/1) |
| interval-calibration-check | 100% (6/6) | 100% | 100% | 100% (2/2) |
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
| process-tracing | 100% (6/6) | 100% | 100% | 100% (3/3) |
| pyramid-principle | 83% (5/6) | 83% | 100% | 100% (2/2) |
| qualitative-comparative-analysis | 100% (6/6) | 100% | 100% | 100% (5/5) |
| question-burst | 100% (6/6) | 100% | 100% | n/a |
| red-team-light | 100% (6/6) | 100% | 100% | n/a |
| reference-class-forecasting | 100% (6/6) | 100% | 100% | n/a |
| reflective-equilibrium | 100% (6/6) | 100% | 100% | 100% (6/6) |
| role-storming | 100% (6/6) | 100% | 100% | 100% (6/6) |
| scamper | 100% (6/6) | 100% | 100% | n/a |
| scenario-planning | 100% (6/6) | 100% | 100% | 100% (3/3) |
| speculative-harms-anti-goals | 100% (6/6) | 100% | 100% | 100% (2/2) |
| stocks-and-flows-reasoning | 100% (6/6) | 100% | 100% | n/a |
| swot | 100% (6/6) | 100% | 100% | 100% (5/5) |
| theory-of-constraints | 100% (6/6) | 100% | 100% | 100% (3/3) |
| three-horizons | 100% (6/6) | 100% | 100% | 100% (4/4) |
| veil-of-ignorance-reasoning | 100% (6/6) | 100% | 100% | 100% (2/2) |
| walton-argumentation-schemes | 100% (6/6) | 100% | 100% | 100% (4/4) |
| what-would-have-to-be-true | 100% (6/6) | 100% | 100% | n/a |
| woop | 100% (6/6) | 100% | 100% | n/a |

## False-fires (a skill grabbed a wrong-tool situation - the real failure mode): 0

_None. No skill triggered on a situation meant for another tool or no tool._

## Other misses (trigger top1 wrong, or anti routed to "none"/another instead of the named alternative)

**ethical-matrix**
- (anti-soft) want `scenario-planning`, got `none` - "Just tell me if launching the free tier is the right strategic call."

**expected-value-decision-tree**
- (anti-soft) want `one-way-vs-two-way-door`, got `none` - "Deploy the hotfix now or wait for the morning window? Pretty obvious, fu"
- (anti-soft) want `reference-class-forecasting`, got `none` - "Just multiply some made-up odds by some made-up payoffs and give me a nu"

**five-whys**
- (anti-soft) want `red-team-light`, got `premortem` - "What could go wrong with this launch?"

**issue-tree**
- (trigger) want `issue-tree`, got `what-would-have-to-be-true` - "Should we launch a self-serve free tier? It's too big a question - help "

**morphological-analysis**
- (anti-soft) want `decision-option-review`, got `none` - "Just tell me the single best pricing model for us."

**premortem**
- (trigger) want `premortem`, got `authentic-dissent` - "I have a nagging feeling about this acquisition but nobody will say anyt"

**pyramid-principle**
- (trigger) want `pyramid-principle`, got `none` - "I've decided we should consolidate onto one cloud provider. Help me writ"

