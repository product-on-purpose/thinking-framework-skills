<!-- thinking-framework-skills | https://github.com/product-on-purpose/thinking-framework-skills | Apache-2.0 -->
# Example run: think-top3

A compressed worked run. The real artifacts would be fully filled from each framework's own template; they are abbreviated here to show the shape.

## Topic
"We are deciding whether to sunset our free tier next quarter. It is hard to reverse once existing free users are migrated or churned, the team is split, and a wrong call costs us months and goodwill."

## Selected frameworks (ranked)

| # | Framework | Why it ranked | Tier |
|---|---|---|---|
| 1 | think-one-way-vs-two-way-door | The topic flags irreversibility ("hard to reverse once migrated"); the dominant job is calibrating how much rigor the decision deserves | P |
| 2 | think-premortem | A stakes-bearing, contested call with a real downside; surfacing failure modes before committing is a direct fit | S/M |
| 3 | think-decision-option-review | The team is split across options (sunset, keep, restructure); a structured option comparison does a distinct job from the other two | P |

> Recipe note: the stress-test-decision recipe also fits a chosen option; here no option is chosen yet, so the three individual frameworks are used instead.

## Applied artifacts (abbreviated)

### 1. think-one-way-vs-two-way-door
Classification: **one-way door** (migrating or churning free users is not cleanly reversible). Implication: this warrants the heavier, slower decision process, not a quick call. Pre-commit test named: a reversible pilot (sunset for new signups only) would convert it toward a two-way door.

### 2. think-premortem
Imagined failure ("it is 6 months later and this was a disaster"): top failure modes - free-to-paid conversion assumption was wrong; goodwill and word-of-mouth loss exceeded modeled churn; a competitor's free tier absorbed the leavers. Leading indicators and a kill-criterion attached to each.

### 3. think-decision-option-review
Options scored against weighted criteria (revenue lift, churn risk, reversibility, team capacity): keep-as-is, full-sunset, restructure-to-trial. Restructure-to-trial scores highest on reversibility while capturing most of the revenue case.

## Cross-framework synthesis
- **Converge:** all three point away from a clean full-sunset now: door analysis says go slow, premortem says the conversion and goodwill assumptions are the fragile load-bearing beliefs, and the option review favors the reversible restructure.
- **Conflict:** the option review's revenue case pulls toward acting soon; the door and premortem pull toward a reversible pilot first.
- **Load-bearing conclusion:** the decision hinges on one untested belief - that free users convert rather than churn - and there is a reversible way to test it before the one-way move.
- **Next move:** run a time-boxed trial-tier pilot for new signups, instrument conversion vs churn, and revisit the full sunset with real data.

> Tiers carried honestly: P, S/M, P. The ranking and the fixed-three contract are tier C; the per-framework conclusions carry the frameworks' own tiers.
