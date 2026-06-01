# Assumption Ledger - Worked Example

A completed run of `tfs-what-would-have-to-be-true`, on the shared Northwind scenario. This is the quality bar a generated ledger should meet.

> Northwind is a B2B SaaS weighing a self-serve free-tier launch. Here the skill tests the option "launch a free tier" by surfacing what would have to be true for it to be the best growth move.

---

## Option or claim under examination

- **The choice:** Launching a self-serve free tier is the best way to hit Northwind's Q3 growth target.

## Conditions that would have to be true

| # | Condition that must hold | Why it is load-bearing | Confidence | How to test it |
|---|---|---|---|---|
| 1 | Free-to-paid conversion among ICP-fit free users is high enough to cover the free tier's cost | If conversion is too low, the free tier is pure cost and does not produce paid growth | low | Cohort analysis of current self-serve conversion; a small gated pilot measuring ICP-fit free-to-paid |
| 2 | The free tier attracts ICP-fit users, not mostly tire-kickers | Growth in non-ICP signups does not convert and inflates cost | low | Light qualification at signup; measure firmographic fit of free cohort in a pilot |
| 3 | The free tier does not materially cannibalize paid plans | Downgrades would offset or exceed new growth | medium | Limited rollout; monitor downgrade rate and trial-to-free vs trial-to-paid |
| 4 | Support and infrastructure cost per free user stays within budget | Cost overrun breaks unit economics regardless of growth | medium | Cost model + a usage-capped pilot with a cost-per-free-user ceiling |
| 5 | Sales cooperates (comp and lead-routing realigned before launch) | Reps steering away from free suppresses the whole motion | medium | Written rules of engagement and sign-off from sales leadership |
| 6 | No cheaper path hits the Q3 target with less irreversible commitment | If a cheaper option exists, the free tier is not the *best* choice | low | Quick comparison against 2-3 alternatives (funnel fix, outbound, partnerships) |

## Killer conditions (test these before committing)

- **Condition 1 (ICP-fit conversion economics)** - confidence low - cheapest test: a gated pilot to ~100 ICP-fit free users measuring conversion and cost. If it fails, the free tier produces cost without paid growth and the whole case collapses.
- **Condition 6 (no cheaper path)** - confidence low - cheapest test: a one-day comparison of alternatives. If a funnel fix or outbound hits the target cheaper, the free tier is not the best choice even if it works.

---

*Note: the value is forcing conditions 1 and 6 into the open. The original proposal asserted growth; this ledger shows the bet rests on two low-confidence conditions that a small pilot and a one-day comparison could de-risk before committing engineering to a one-way door. From here, run `tfs-premortem` on the chosen plan.*
