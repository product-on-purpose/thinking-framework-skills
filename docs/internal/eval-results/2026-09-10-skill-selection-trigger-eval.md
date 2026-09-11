# Skill-selection eval scorecard

Cases: 793 (393 trigger, 400 anti; 141 of the anti cases name a specific alternative) across 67 skills. Unrouted: 0.

## What this scorecard measures (and what it does not)

Corpus: the **installed roster** - 67 skills + 10 commands (`manifest.generated.json`), each presented to the router as name + description only, which is all an agent actually sees.

This is NOT the framework-routing eval. That one routes against `recommendable.json` (the 63 shipped frameworks) and answers "which framework fits this situation?". This one answers "which installed skill would an agent invoke?" - the question the meta-skills' trigger contracts actually make, and the only one that can see command interference.

Model: `claude-opus-5`. Sampling: complete corpus - every case from all 67 skills, no sampling. Cases supplied: 794.

### Command interference (guardrail 6): 2 command pick(s)

The nine recipe commands plus `think-research-framework` are always-loaded description surface. Guardrail 6 asks whether adding them degraded skill selection; the framework trigger eval **cannot** answer that, because it routes against a corpus the commands never touched. Here they compete directly.

- On trigger cases (a skill was the right answer): **1**
- On anti cases: **1**

- `c248` (anti) wanted `none`, got `command:stress-test-decision`
- `c351` (trigger) wanted `framework-advisor`, got `command:stress-test-decision`

### Excluded from every figure above: 1 gate case(s)

- `c358` (framework-advisor): "We're stuck on this problem. Which of your thinking tools would actually help, and in what"

A gate case is one where the authoring skill IS the right tool but its correct behavior is not a normal run (e.g. ask exactly one clarifying question). That is an output-level contract a routing eval cannot judge in either direction, so it is excluded rather than scored. Counting one as an anti-case would report correct behavior as a false fire.

- **Trigger accuracy (top1): 99%** (391/393); soft (in top3): 100%.
- **Anti no-false-fire: 100%** (399/400) - the skill did NOT grab a wrong-tool / no-tool situation. This is the metric that matters.
- Anti right-alternative: 89% (126/141) - of the anti cases naming a specific alternative, how many routed there (the rest mostly answered "none" on a genuinely trivial prompt, still not a false-fire).

| Skill | trigger top1 | top3 | anti no-fire | anti right-alt |
|---|---|---|---|---|
| abstraction-laddering | 100% (6/6) | 100% | 100% | 100% (1/1) |
| affinity-mapping | 100% (6/6) | 100% | 100% | n/a |
| after-action-review | 100% (6/6) | 100% | 100% | n/a |
| analysis-of-competing-hypotheses | 100% (5/5) | 100% | 100% | 67% (2/3) |
| argument-mapping | 100% (6/6) | 100% | 100% | n/a |
| assumption-reversal | 100% (6/6) | 100% | 100% | n/a |
| authentic-dissent | 100% (6/6) | 100% | 100% | n/a |
| backcasting | 100% (6/6) | 100% | 100% | n/a |
| belief-update-routine | 100% (6/6) | 100% | 100% | 100% (3/3) |
| boundary-critique | 100% (6/6) | 100% | 100% | 50% (2/4) |
| brainwriting | 100% (6/6) | 100% | 100% | n/a |
| causal-layered-analysis | 100% (6/6) | 100% | 100% | 100% (6/6) |
| causal-loop-diagrams | 100% (6/6) | 100% | 100% | n/a |
| complexity-domain-sort | 100% (6/6) | 100% | 100% | 60% (3/5) |
| concept-mapping | 100% (6/6) | 100% | 100% | n/a |
| consider-the-unknowns | 100% (6/6) | 100% | 100% | 100% (4/4) |
| contradiction-resolution | 100% (6/6) | 100% | 100% | 100% (3/3) |
| contradiction-tension-mapping | 100% (6/6) | 100% | 100% | 100% (5/5) |
| decision-journal | 100% (6/6) | 100% | 100% | 100% (2/2) |
| decision-option-review | 100% (6/6) | 100% | 100% | n/a |
| dialectical-bootstrapping | 100% (6/6) | 100% | 100% | 100% (2/2) |
| eisenhower-moscow-pareto | 100% (6/6) | 100% | 100% | 100% (6/6) |
| ethical-matrix | 100% (6/6) | 100% | 100% | 50% (2/4) |
| evidence-vs-inference-sort | 100% (6/6) | 100% | 100% | n/a |
| expected-value-decision-tree | 100% (5/5) | 100% | 100% | 50% (2/4) |
| far-analogy-ideation | 100% (6/6) | 100% | 100% | n/a |
| fermi-estimation | 100% (6/6) | 100% | 100% | 100% (5/5) |
| five-whys | 100% (6/6) | 100% | 100% | 80% (4/5) |
| frame-creation | 100% (6/6) | 100% | 100% | 100% (4/4) |
| framework-advisor | 80% (4/5) | 80% | 100% | 100% (3/3) |
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
| pairwise-comparison | 100% (6/6) | 100% | 83% | 100% (4/4) |
| parallel-perspectives-review | 100% (6/6) | 100% | 100% | n/a |
| premortem | 100% (6/6) | 100% | 100% | n/a |
| problem-restatement | 100% (6/6) | 100% | 100% | n/a |
| process-tracing | 100% (6/6) | 100% | 100% | 100% (3/3) |
| pyramid-principle | 100% (6/6) | 100% | 100% | 100% (2/2) |
| qualitative-comparative-analysis | 100% (6/6) | 100% | 100% | 100% (5/5) |
| question-burst | 100% (6/6) | 100% | 100% | n/a |
| random-frameworks | 100% (4/4) | 100% | 100% | 80% (4/5) |
| red-team-light | 100% (6/6) | 100% | 100% | n/a |
| reference-class-forecasting | 100% (6/6) | 100% | 100% | n/a |
| reflective-equilibrium | 100% (6/6) | 100% | 100% | 100% (6/6) |
| research-framework | 100% (4/4) | 100% | 100% | 100% (2/2) |
| role-storming | 100% (6/6) | 100% | 100% | 100% (6/6) |
| scamper | 100% (6/6) | 100% | 100% | n/a |
| scenario-planning | 100% (6/6) | 100% | 100% | 100% (3/3) |
| speculative-harms-anti-goals | 100% (6/6) | 100% | 100% | 100% (2/2) |
| stocks-and-flows-reasoning | 100% (6/6) | 100% | 100% | n/a |
| swot | 100% (6/6) | 100% | 100% | 60% (3/5) |
| theory-of-constraints | 100% (6/6) | 100% | 100% | 100% (3/3) |
| three-horizons | 100% (6/6) | 100% | 100% | 100% (4/4) |
| top3 | 100% (4/4) | 100% | 100% | 100% (3/3) |
| veil-of-ignorance-reasoning | 100% (6/6) | 100% | 100% | 50% (1/2) |
| walton-argumentation-schemes | 100% (6/6) | 100% | 100% | 100% (4/4) |
| what-would-have-to-be-true | 100% (6/6) | 100% | 100% | n/a |
| woop | 100% (6/6) | 100% | 100% | n/a |

## False-fires (a skill grabbed a wrong-tool situation - the real failure mode): 1

- **pairwise-comparison** grabbed `c502` (got `pairwise-comparison`) - "I have twenty candidates to rank by forced pairwise comparison."

## Other misses (trigger top1 wrong, or anti routed to "none"/another instead of the named alternative)

**analysis-of-competing-hypotheses**
- (anti-soft) want `evidence-vs-inference-sort`, got `process-tracing` - "Which of these three explanations for the churn spike is right?"

**boundary-critique**
- (anti-soft) want `decision-option-review`, got `none` - "This is a purely technical config decision with one obvious owner and no"
- (anti-soft) want `decision-option-review`, got `none` - "We know the boundary is disputed - now just tell us who's right and sett"

**complexity-domain-sort**
- (anti-soft) want `issue-tree`, got `top3` - "Help me think through whether to launch a free tier."
- (anti-soft) want `red-team-light`, got `premortem` - "What could go wrong if we ship this?"

**ethical-matrix**
- (anti-soft) want `parallel-perspectives-review`, got `none` - "What would our small-business customers actually say about this change i"
- (anti-soft) want `scenario-planning`, got `none` - "Just tell me if launching the free tier is the right strategic call."

**expected-value-decision-tree**
- (anti-soft) want `one-way-vs-two-way-door`, got `none` - "Deploy the hotfix now or wait for the morning window? Pretty obvious, fu"
- (anti-soft) want `reference-class-forecasting`, got `none` - "Just multiply some made-up odds by some made-up payoffs and give me a nu"

**five-whys**
- (anti-soft) want `red-team-light`, got `premortem` - "What could go wrong with this launch?"

**framework-advisor**
- (trigger) want `framework-advisor`, got `command:stress-test-decision` - "Should we launch a free tier? I'm nervous we're committing because it's "

**issue-tree**
- (trigger) want `issue-tree`, got `what-would-have-to-be-true` - "Should we launch a self-serve free tier? It's too big a question - help "

**morphological-analysis**
- (anti-soft) want `decision-option-review`, got `none` - "Just tell me the single best pricing model for us."

**random-frameworks**
- (anti-soft) want `far-analogy-ideation`, got `none` - "Give me one random-stimulus prompt to spark ideas."

**swot**
- (anti-soft) want `issue-tree`, got `framework-advisor` - "Help me think through whether to launch a free tier."
- (anti-soft) want `red-team-light`, got `premortem` - "What could go wrong if we expand into the EU?"

**veil-of-ignorance-reasoning**
- (anti-soft) want `parallel-perspectives-review`, got `none` - "Walk this pricing proposal through each affected customer segment's eyes"

