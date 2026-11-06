# Trigger eval scorecard

Cases: 3 (1 trigger, 2 anti; 1 of the anti cases name a specific alternative) across 1 skills. Unrouted: 0.

- **Trigger accuracy (top1): 100%** (1/1); soft (in top3): 100%.
- **Anti no-false-fire: 100%** (2/2) - the skill did NOT grab a wrong-tool / no-tool situation. This is the metric that matters.
- Anti right-alternative: 100% (1/1) - of the anti cases naming a specific alternative, how many routed there (the rest mostly answered "none" on a genuinely trivial prompt, still not a false-fire).
- Anti cases with no named alternative: 1. The router declined 1 and picked another tool on 0. The key names no right answer for these, so neither outcome is scored.

| Skill | trigger top1 | top3 | anti no-fire | anti right-alt |
|---|---|---|---|---|
| premortem | 100% (1/1) | 100% | 100% | 100% (1/1) |

## False-fires (a skill grabbed a wrong-tool situation - the real failure mode): 0

_None. No skill triggered on a situation meant for another tool or no tool._

## Other-tool picks on anti cases with no named alternative: 0

These are not misses. `none` in the key means the case names no tool with a `think-` slug, not that no tool should fire, so many of these picks are correct redirects. No figure above counts them. Compare this list between runs to see where a router's choice moved.

_None. Every such case was declined, left unrouted or taken by its authoring skill._

## Other misses (trigger top1 wrong, or anti routed to "none"/another instead of the named alternative)

