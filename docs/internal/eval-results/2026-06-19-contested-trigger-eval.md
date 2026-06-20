<!-- The 7 CONTESTED LENSES cohort (v0.11.0), reported SEPARATELY from the core-56 (measured 2026-06-17). Headline library numbers remain the core-56 numbers. -->

# Trigger eval scorecard

Cases: 82 (41 trigger, 41 anti; 35 of the anti cases name a specific alternative) across 7 skills. Unrouted: 0.

- **Trigger accuracy (top1): 100%** (41/41); soft (in top3): 100%.
- **Anti no-false-fire: 100%** (41/41) - the skill did NOT grab a wrong-tool / no-tool situation. This is the metric that matters.
- Anti right-alternative: 100% (35/35) - of the anti cases naming a specific alternative, how many routed there (the rest mostly answered "none" on a genuinely trivial prompt, still not a false-fire).

| Skill | trigger top1 | top3 | anti no-fire | anti right-alt |
|---|---|---|---|---|
| analysis-of-competing-hypotheses | 100% (5/5) | 100% | 100% | 100% (3/3) |
| complexity-domain-sort | 100% (6/6) | 100% | 100% | 100% (5/5) |
| eisenhower-moscow-pareto | 100% (6/6) | 100% | 100% | 100% (6/6) |
| five-whys | 100% (6/6) | 100% | 100% | 100% (5/5) |
| qualitative-comparative-analysis | 100% (6/6) | 100% | 100% | 100% (5/5) |
| reflective-equilibrium | 100% (6/6) | 100% | 100% | 100% (6/6) |
| swot | 100% (6/6) | 100% | 100% | 100% (5/5) |

## False-fires (a skill grabbed a wrong-tool situation - the real failure mode): 0

_None. No skill triggered on a situation meant for another tool or no tool._

## Other misses (trigger top1 wrong, or anti routed to "none"/another instead of the named alternative)

