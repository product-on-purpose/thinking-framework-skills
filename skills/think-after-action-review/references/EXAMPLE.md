# After Action Review - Worked Example

A completed run of `think-after-action-review`, on the shared Northwind scenario. This is the quality bar a generated AAR should meet.

> Northwind is a B2B SaaS. They ran the two-week ICP free-to-paid conversion pilot (the one the decision skills called for and WOOP committed them to). Here the skill reviews it.

---

## Event

- The two-week gated free-tier conversion pilot, run before deciding whether to build the full free tier.

## What was expected

- Going in (recorded in the WWHTBT ledger): the pilot would show ICP free-to-paid conversion at or above the breakeven the cost model needed (~5%), telling us cleanly whether to build.

## What actually happened

- ICP free-to-paid came in at ~3% - below breakeven. But unexpectedly, the onboarding fixes shipped *for* the pilot lifted the existing **paid-trial** conversion by 4 points - a bigger near-term win than the free tier would have been. The pilot also ran a few days late.

## Why the gaps (both directions)

| Difference (expected vs actual) | Why it happened (real cause, blameless) |
|---|---|
| Free-to-paid lower than expected (3% vs 5%) | The free cohort skewed less ICP-fit than the gating assumed; the value gate was too loose |
| Paid-trial conversion rose (not predicted) | The onboarding work done to support the pilot fixed friction that was the actual constraint all along |
| Pilot ran late | Billing edge cases took longer than scoped, as the reference-class estimate had warned |

## Sustain (what worked, repeat it)

- Running a cheap, time-boxed pilot before a one-way-door build - it changed the decision and cost two weeks, not a quarter.
- Instrumenting ICP fit on signups from day one.

## Change (specific and owned)

| Change for next time | Owner |
|---|---|
| Default to fixing the funnel before assuming a packaging gap; the pilot showed packaging was not the constraint | PM (Growth) |
| Tighten the ICP value gate before any future free-access test | PM (Growth) |
| Budget billing/auth work at the reference-class rate (~1.5x), not the inside estimate | Eng lead |

---

*Note: the value is the expected-vs-actual structure. A "how did the pilot go?" retro would have recorded "free tier didn't convert, oh well." The AAR caught the more important, unexpected result - the onboarding fix was the real win - and turned it into an owned change of strategy.*
