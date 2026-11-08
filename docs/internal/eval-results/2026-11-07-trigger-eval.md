# Trigger eval scorecard

Run: 2026-11-07 | model: `claude-opus-5-5` (tier `opus`) | cases: `f6699d389afc` (fingerprint of 63 skills' eval/cases.md) | routers: `Explore` agent, interleaved batches, whole-file reads

Cases: 755 (376 trigger, 379 anti; 169 of the anti cases name a specific alternative) across 63 skills. Unrouted: 0.

- **Trigger accuracy (top1): 100%** (376/376); soft (in top3): 100%.
- **Anti no-false-fire: 100%** (379/379) - the skill did NOT grab a wrong-tool / no-tool situation. This is the metric that matters.
- Anti right-alternative: 97.6% (165/169) - of the anti cases naming a specific alternative, how many routed there (the rest mostly answered "none" on a genuinely trivial prompt, still not a false-fire).
- Anti cases with no named alternative: 210. The router declined 144 and picked another tool on 66. The key names no right answer for these, so neither outcome is scored.

| Skill | trigger top1 | top3 | anti no-fire | anti right-alt |
|---|---|---|---|---|
| abstraction-laddering | 100% (6/6) | 100% | 100% | 100% (2/2) |
| affinity-mapping | 100% (6/6) | 100% | 100% | 100% (3/3) |
| after-action-review | 100% (6/6) | 100% | 100% | 100% (1/1) |
| analysis-of-competing-hypotheses | 100% (5/5) | 100% | 100% | 100% (3/3) |
| argument-mapping | 100% (6/6) | 100% | 100% | 100% (2/2) |
| assumption-reversal | 100% (6/6) | 100% | 100% | 100% (1/1) |
| authentic-dissent | 100% (6/6) | 100% | 100% | 100% (2/2) |
| backcasting | 100% (6/6) | 100% | 100% | 100% (3/3) |
| belief-update-routine | 100% (6/6) | 100% | 100% | 100% (3/3) |
| boundary-critique | 100% (6/6) | 100% | 100% | 100% (4/4) |
| brainwriting | 100% (6/6) | 100% | 100% | n/a |
| causal-layered-analysis | 100% (6/6) | 100% | 100% | 100% (6/6) |
| causal-loop-diagrams | 100% (6/6) | 100% | 100% | 100% (2/2) |
| complexity-domain-sort | 100% (6/6) | 100% | 100% | 100% (5/5) |
| concept-mapping | 100% (6/6) | 100% | 100% | 100% (4/4) |
| consider-the-unknowns | 100% (6/6) | 100% | 100% | 100% (4/4) |
| contradiction-resolution | 100% (6/6) | 100% | 100% | 100% (3/3) |
| contradiction-tension-mapping | 100% (6/6) | 100% | 100% | 100% (5/5) |
| decision-journal | 100% (6/6) | 100% | 100% | 100% (3/3) |
| decision-option-review | 100% (6/6) | 100% | 100% | n/a |
| dialectical-bootstrapping | 100% (6/6) | 100% | 100% | 100% (2/2) |
| eisenhower-moscow-pareto | 100% (6/6) | 100% | 100% | 100% (6/6) |
| ethical-matrix | 100% (6/6) | 100% | 100% | 75% (3/4) |
| evidence-vs-inference-sort | 100% (6/6) | 100% | 100% | n/a |
| expected-value-decision-tree | 100% (5/5) | 100% | 100% | 50% (2/4) |
| far-analogy-ideation | 100% (6/6) | 100% | 100% | 100% (3/3) |
| fermi-estimation | 100% (6/6) | 100% | 100% | 100% (5/5) |
| five-whys | 100% (6/6) | 100% | 100% | 100% (5/5) |
| frame-creation | 100% (6/6) | 100% | 100% | 100% (4/4) |
| futures-wheel | 100% (6/6) | 100% | 100% | n/a |
| iceberg-model | 100% (6/6) | 100% | 100% | 100% (3/3) |
| interest-based-negotiation | 100% (6/6) | 100% | 100% | 100% (1/1) |
| interval-calibration-check | 100% (6/6) | 100% | 100% | 100% (3/3) |
| issue-tree | 100% (6/6) | 100% | 100% | 100% (2/2) |
| ladder-of-inference-check | 100% (6/6) | 100% | 100% | n/a |
| linear-model-aggregation | 100% (6/6) | 100% | 100% | 100% (2/2) |
| minimax-regret | 100% (6/6) | 100% | 100% | 100% (3/3) |
| morphological-analysis | 100% (6/6) | 100% | 100% | 83.3% (5/6) |
| natural-frequency-bayesian | 100% (6/6) | 100% | 100% | 100% (1/1) |
| one-way-vs-two-way-door | 100% (6/6) | 100% | 100% | 100% (2/2) |
| pairwise-comparison | 100% (6/6) | 100% | 100% | 100% (4/4) |
| parallel-perspectives-review | 100% (6/6) | 100% | 100% | n/a |
| premortem | 100% (6/6) | 100% | 100% | n/a |
| problem-restatement | 100% (6/6) | 100% | 100% | n/a |
| process-tracing | 100% (6/6) | 100% | 100% | 100% (3/3) |
| pyramid-principle | 100% (6/6) | 100% | 100% | 100% (3/3) |
| qualitative-comparative-analysis | 100% (6/6) | 100% | 100% | 100% (6/6) |
| question-burst | 100% (6/6) | 100% | 100% | n/a |
| red-team-light | 100% (6/6) | 100% | 100% | 100% (1/1) |
| reference-class-forecasting | 100% (6/6) | 100% | 100% | 100% (1/1) |
| reflective-equilibrium | 100% (6/6) | 100% | 100% | 100% (6/6) |
| role-storming | 100% (6/6) | 100% | 100% | 100% (6/6) |
| scamper | 100% (6/6) | 100% | 100% | n/a |
| scenario-planning | 100% (6/6) | 100% | 100% | 100% (3/3) |
| speculative-harms-anti-goals | 100% (6/6) | 100% | 100% | 100% (2/2) |
| stocks-and-flows-reasoning | 100% (6/6) | 100% | 100% | 100% (3/3) |
| swot | 100% (6/6) | 100% | 100% | 100% (5/5) |
| theory-of-constraints | 100% (6/6) | 100% | 100% | 100% (3/3) |
| three-horizons | 100% (6/6) | 100% | 100% | 100% (4/4) |
| veil-of-ignorance-reasoning | 100% (6/6) | 100% | 100% | 100% (2/2) |
| walton-argumentation-schemes | 100% (6/6) | 100% | 100% | 100% (4/4) |
| what-would-have-to-be-true | 100% (6/6) | 100% | 100% | 100% (1/1) |
| woop | 100% (6/6) | 100% | 100% | n/a |

## False-fires (a skill grabbed a wrong-tool situation - the real failure mode): 0

_None. No skill triggered on a situation meant for another tool or no tool._

## Other-tool picks on anti cases with no named alternative: 66

These are not misses. `none` in the key means the case names no tool with a `think-` slug, not that no tool should fire, so many of these picks are correct redirects. No figure above counts them. Compare this list between runs to see where a router's choice moved.

- `c129` (authored by **abstraction-laddering**) got `brainwriting` - "We've settled on the right problem. Now give me a bunch of creative solu"
- `c130` (authored by **abstraction-laddering**) got `decision-option-review` - "We have three framings on the table and need to pick which one to fund."
- `c595` (authored by **after-action-review**) got `decision-option-review` - "Should we do A or B for the next launch?"
- `c596` (authored by **after-action-review**) got `brainwriting` - "Brainstorm improvements to onboarding."
- `c91` (authored by **assumption-reversal**) got `decision-option-review` - "We've narrowed to three pricing models and need to pick one. Score them "
- `c95` (authored by **assumption-reversal**) got `decision-option-review` - "Give me your top three recommendations for which growth channel to inves"
- `c198` (authored by **authentic-dissent**) got `red-team-light` - "Just play devil's advocate on my idea."
- `c200` (authored by **authentic-dissent**) got `premortem` - "Run a premortem on the reorg."
- `c202` (authored by **authentic-dissent**) got `parallel-perspectives-review` - "Give a balanced multi-lens review of this decision."
- `c296` (authored by **backcasting**) got `decision-option-review` - "Should we even build a self-serve free tier, or double down on sales-led"
- `c43` (authored by **brainwriting**) got `decision-option-review` - "I have 12 product ideas already - help me rank them and pick the one to "
- `c44` (authored by **brainwriting**) got `decision-option-review` - "Score these 8 vendors against our criteria and recommend one."
- `c46` (authored by **brainwriting**) got `affinity-mapping` - "We have 40 sticky notes from a brainstorm. Cluster into themes and decid"
- `c341` (authored by **causal-loop-diagrams**) got `stocks-and-flows-reasoning` - "We cut churn in half - is our customer base actually growing?"
- `c692` (authored by **consider-the-unknowns**) got `interval-calibration-check` - "My estimate is 40 to 60 thousand users in year one - help me set the rig"
- `c138` (authored by **contradiction-resolution**) got `contradiction-tension-mapping` - "The tension between centralizing and decentralizing the org is one we ha"
- `c388` (authored by **decision-option-review**) got `brainwriting` - "Brainstorm fresh ideas for improving activation - I have no options yet."
- `c390` (authored by **decision-option-review**) got `premortem` - "We're considering an irreversible migration off our DB vendor - I need a"
- `c391` (authored by **decision-option-review**) got `premortem` - "Run a premortem on the launch plan."
- `c392` (authored by **decision-option-review**) got `after-action-review` - "Write the postmortem for last week's outage."
- `c670` (authored by **dialectical-bootstrapping**) got `decision-option-review` - "Should we launch the free tier at all? Help me make the call."
- `c671` (authored by **dialectical-bootstrapping**) got `what-would-have-to-be-true` - "Our whole revenue number hinges on one assumption - that enterprise rene"
- `c226` (authored by **evidence-vs-inference-sort**) got `premortem` - "Run a premortem on the migration plan."
- `c57` (authored by **far-analogy-ideation**) got `decision-option-review` - "Pick the best of these five growth options."
- `c305` (authored by **futures-wheel**) got `after-action-review` - "The free-tier launch went sideways last quarter. Run a postmortem on wha"
- `c310` (authored by **futures-wheel**) got `reference-class-forecasting` - "Forecast next quarter's MRR with a probability range for the board deck."
- `c718` (authored by **interest-based-negotiation**) got `decision-option-review` - "Should we even launch the self-serve free tier at all? Just help me make"
- `c536` (authored by **issue-tree**) got `after-action-review` - "The free-tier launch shipped and went badly. Help me run a postmortem on"
- `c237` (authored by **ladder-of-inference-check**) got `premortem` - "Run a premortem on our Q3 launch plan."
- `c497` (authored by **linear-model-aggregation**) got `issue-tree` - "Should we enter the European market?"
- `c212` (authored by **natural-frequency-bayesian**) got `reference-class-forecasting` - "Forecast next quarter's revenue with a range."
- `c402` (authored by **one-way-vs-two-way-door**) got `decision-option-review` - "Score these three onboarding-redesign approaches on the criteria that ma"
- `c404` (authored by **one-way-vs-two-way-door**) got `premortem` - "Run a premortem on the free-tier launch plan."
- `c7` (authored by **parallel-perspectives-review**) got `red-team-light` - "Tear apart my argument that we should drop the on-prem line - the strong"
- `c8` (authored by **parallel-perspectives-review**) got `premortem` - "Run a premortem on the Q3 launch."
- `c9` (authored by **parallel-perspectives-review**) got `after-action-review` - "Write up the postmortem for last night's incident."
- `c257` (authored by **premortem**) got `after-action-review` - "The migration shipped last quarter and it went badly. Help me run a post"
- `c259` (authored by **premortem**) got `brainwriting` - "I need fresh ideas for features we could add next quarter. Brainstorm op"
- `c260` (authored by **premortem**) got `decision-option-review` - "We have three vendors on the shortlist. Help me build a scorecard and pi"
- `c115` (authored by **problem-restatement**) got `brainwriting` - "We've already validated the problem and it's well-defined and agreed. No"
- `c116` (authored by **problem-restatement**) got `decision-option-review` - "We've narrowed it to three options for the checkout redesign - help me p"
- `c118` (authored by **problem-restatement**) got `after-action-review` - "The launch already failed. Run a postmortem."
- `c706` (authored by **process-tracing**) got `analysis-of-competing-hypotheses` - "Score each of our eight hypotheses against every piece of evidence for c"
- `c556` (authored by **pyramid-principle**) got `decision-option-review` - "I'm not sure yet whether we should build, buy, or wait - help me think i"
- `c559` (authored by **pyramid-principle**) got `premortem` - "Run a premortem on the free-tier launch before we commit."
- `c79` (authored by **question-burst**) got `issue-tree` - "I already know the real question is 'why does activation drop after day "
- `c81` (authored by **question-burst**) got `decision-option-review` - "We've explored enough. I need a decision on which pricing tier to ship."
- `c82` (authored by **question-burst**) got `after-action-review` - "Write a postmortem of last week's outage."
- `c84` (authored by **question-burst**) got `brainwriting` - "Brainstorm 20 feature ideas and group them by theme."
- `c19` (authored by **red-team-light**) got `after-action-review` - "The free-tier launch flopped last quarter. Walk us through what went wro"
- `c21` (authored by **red-team-light**) got `parallel-perspectives-review` - "Give me a rounded view of this pricing decision from customer, sales, fi"
- `c269` (authored by **reference-class-forecasting**) got `after-action-review` - "The project finished 4 months late and 60% over budget. Run a postmortem"
- `c270` (authored by **reference-class-forecasting**) got `fermi-estimation` - "We're inventing a genuinely new category - no one has shipped anything l"
- `c67` (authored by **scamper**) got `brainwriting` - "Blank page, no product idea yet - help me brainstorm what we could build"
- `c68` (authored by **scamper**) got `after-action-review` - "Our launch failed last quarter. Walk me through what went wrong."
- `c69` (authored by **scamper**) got `decision-option-review` - "We have eight expansion options and need to pick one - help me decide wh"
- `c70` (authored by **scamper**) got `problem-restatement` - "I don't think we're solving the right problem. Help me restate and refra"
- `c71` (authored by **scamper**) got `premortem` - "Run a premortem on our Q3 launch plan."
- `c512` (authored by **scenario-planning**) got `decision-option-review` - "We haven't decided whether to do the self-serve motion at all yet - just"
- `c332` (authored by **stocks-and-flows-reasoning**) got `decision-option-review` - "Should we launch the free tier or fix the funnel?"
- `c380` (authored by **theory-of-constraints**) got `decision-option-review` - "We have to choose between two vendors for a one-off platform decision - "
- `c245` (authored by **what-would-have-to-be-true**) got `after-action-review` - "We shut down the free-tier launch after six months and it flopped. Run a"
- `c246` (authored by **what-would-have-to-be-true**) got `brainwriting` - "Brainstorm a wide list of growth strategies for next year, nothing decid"
- `c247` (authored by **what-would-have-to-be-true**) got `decision-option-review` - "Build me a scorecard comparing four vendor proposals so I can pick one."
- `c281` (authored by **woop**) got `decision-option-review` - "Should I learn Spanish or French this year? Help me decide which."
- `c285` (authored by **woop**) got `premortem` - "Run a premortem on whether my fitness plan will fail."

## Other misses (trigger top1 wrong, or anti routed to "none"/another instead of the named alternative)

**ethical-matrix**
- (anti-soft) want `scenario-planning`, got `none` - "Just tell me if launching the free tier is the right strategic call."

**expected-value-decision-tree**
- (anti-soft) want `one-way-vs-two-way-door`, got `none` - "Deploy the hotfix now or wait for the morning window? Pretty obvious, fu"
- (anti-soft) want `reference-class-forecasting`, got `none` - "Just multiply some made-up odds by some made-up payoffs and give me a nu"

**morphological-analysis**
- (anti-soft) want `decision-option-review`, got `none` - "Just tell me the single best pricing model for us."

