# Reference-Class Estimate - Worked Example

A completed run of `think-reference-class-forecasting`, on the shared Northwind scenario. This is the quality bar a generated estimate should meet.

> Northwind is a B2B SaaS. The team estimates the free-tier build will take 6 weeks. Here the skill checks that with the outside view.

---

## What is being forecast

- **Quantity:** time to ship the self-serve free tier (build + billing + onboarding).
- **Inside-view estimate:** 6 weeks (built up from the team's task list).

## Reference class

- **The class:** Northwind's last several "new self-serve surface" launches (billing/auth/onboarding changes of similar scope), plus comparable launches the team has data on.
- **Why comparable:** all involved new billing states, auth edge cases, and onboarding flows under a deadline - the same risk profile, not cherry-picked easy projects.

## Base rates

- **Data source:** Northwind's last 5 comparable launches (internal delivery records). [If those records did not exist, the honest move would be to flag "no real base-rate data" and treat the 6-week figure as an untested inside estimate, not to invent a multiplier.]
- **Typical outcome:** comparable launches ran ~1.5x the initial estimate (so ~9 weeks for a "6-week" plan).
- **Worst-case / tail:** the two launches that touched billing most heavily ran ~2x (~12 weeks), usually from billing/security rework discovered late.

## Outside-anchored estimate

- **Anchored estimate (range):** 9 to 12 weeks, centered on ~1.5x.
- **Conservative adjustment for specifics:** the team is slightly more experienced with this billing system now; nudge the center down modestly, not back to 6. Resisted the inside-view pull to "but this time it is simpler."
- **Final forecast:** ~8 to 11 weeks (median ~9), with the main uncertainty in the billing/auth path. Implication: a 6-week, fixed-date commitment is likely to slip or ship rough; either move the date or cut scope now.

---

*Note: the value is refusing the 6-week inside estimate and anchoring on what comparable launches actually took (~1.5x). The honesty rule is load-bearing here: if Northwind had no real delivery records, the right output is "we lack a reference class" - not a fabricated multiplier. This pairs naturally with a premortem on the slip risk.*
