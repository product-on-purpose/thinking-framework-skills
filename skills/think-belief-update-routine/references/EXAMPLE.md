# Belief-Update Ledger - Worked Example

A completed run of the `belief-update-routine` skill on a real set of open beliefs. This continues the
shared Northwind thread: the `think-decision-journal` example locked in the free-tier launch decision on
2026-05-31 at 60% confidence with five named assumptions. This ledger is the **first quarterly re-score**
of those still-open beliefs, three months post-launch - before the final outcome is in, which is the
point (the final resolved review is an after-action review, not this). It shows a small move, a large
move, a moderate move, and an honest no-change. This is the quality bar a generated ledger should meet.

---

## Ledger header

- **Review date:** 2026-08-31
- **Cadence:** Quarterly, or earlier on a forcing signal (a metric crossing a pre-set line)
- **Owner:** VP Product
- **Beliefs tracked:** 4 open · 0 resolved-this-cycle

## Belief portfolio (at-a-glance)

| # | Belief (one line) | Prior | Revised | Delta | Next review |
|---|---|---|---|---|---|
| 1 | Free tier feeds paid rather than cannibalizing it | 60% | 55% | -5 | 2026-11-30 (Q4 AAR) |
| 2 | Support/infra cost per free user stays within the modeled ceiling | 70% | 35% | -35 | 2026-09-30 (cost review) |
| 3 | Free attracts ICP-fit users, not a never-converting segment | 65% | 45% | -20 | 2026-11-30 |
| 4 | Sales comp + lead-routing redesign prevents rep resentment | 75% | 75% | no change | 2026-11-30 |

---

## Belief entries (the detail)

### 1. The free tier feeds paid (net-new paid conversions lift) rather than cannibalizing it

- **Prior confidence:** 60% (scored 2026-05-31, at launch commitment)
- **Evidence accrued since last review:**
  - *For:* Sign-up volume is tracking ~3x as predicted (2026-07); sales-led paid MRR has held flat, not declined (2026-08), so the feared cannibalization has not shown up yet.
  - *Against:* Free-to-paid conversion among ICP-fit users is running below the model (2026-08), so the "feeds paid" half is unproven and slower than hoped.
- **Revised confidence:** 55% - **down 5 points**
- **Reason for the size of the move:** Small on purpose. The big downside risk (cannibalization of paid) has *not* materialized, which is mild good news; the conversion shortfall is real but the data is early and noisy (one quarter, small paid-cohort). Under-updating guard: is -5 too small (am I clinging to the 60%)? No - the evidence genuinely cuts both ways and is thin, so a small net move is honest, not sticky. A bigger move would over-react to one noisy quarter.
- **Next-review trigger:** 2026-11-30 Q4 after-action review (the decision-journal review date), when the conversion cohort is large enough to score.
- **Status:** open

### 2. Support and infra cost per free user stays within the modeled ceiling

- **Prior confidence:** 70% (assumption confidence at launch, 2026-05-31)
- **Evidence accrued since last review:**
  - *Against:* Support tickets from free users ran ~2x the model in month 1 (2026-07); measured cloud cost per free user is ~1.6x the modeled ceiling (2026-08).
  - *For:* none material.
- **Revised confidence:** 35% - **down 35 points**
- **Reason for the size of the move:** Large, and warranted. This is direct, consistent, against-evidence on the exact quantity the assumption was about, two months running. Under-updating guard: the temptation is to soften it ("it's early, costs will optimize") and stay near 70% - that would be exactly the conservatism this routine exists to catch. The data is clear enough to move hard; a -35 is the honest size.
- **Next-review trigger:** 2026-09-30 dedicated cost review (pulled earlier than the quarterly cadence because this belief crossed a pre-set cost line - the forcing signal).
- **Status:** open

### 3. "Free" attracts ICP-fit users, not a different, never-converting segment

- **Prior confidence:** 65% (assumption confidence at launch)
- **Evidence accrued since last review:**
  - *Against:* ~50% of free sign-ups are outside the ICP (students, evaluators, tire-kickers) per the 2026-08 cohort analysis.
  - *For:* the ICP-fit half is engaging at expected depth.
- **Revised confidence:** 45% - **down 20 points**
- **Reason for the size of the move:** Moderate. The off-ICP share is a real, measured signal against the assumption, but the cohort is early and acquisition targeting is still being tuned, so some of the off-ICP mix may be fixable rather than structural. A -20 reflects a genuine update without over-committing to "free attracts the wrong crowd" on one quarter's cohort.
- **Next-review trigger:** 2026-11-30, after a quarter of tuned acquisition targeting.
- **Status:** open

### 4. The sales comp and lead-routing redesign prevents rep resentment of the motion

- **Prior confidence:** 75% (assumption confidence at launch)
- **Evidence accrued since last review:** No material new evidence. The redesign shipped before launch; there have been no rep escalations or pipeline complaints, but it is too early and too quiet to read as confirmation.
- **Revised confidence:** 75% - **no change**
- **Reason for the size of the move:** Honest no-update. Nothing material has arrived for or against, so the confidence stays put. This is *not* stickiness - it is the absence of evidence, stated as such rather than dressed up as a small confirming bump.
- **Next-review trigger:** 2026-11-30, or sooner if a rep escalation lands.
- **Status:** open

---

*Value added: three months after the launch decision was locked, this ledger re-scores the open beliefs against what has actually come in - and it does the two things an unaided "how's it going?" review usually skips. It states an explicit delta and direction on every belief (so you can see it moved 1 small, 1 hard, 1 moderate, 1 not at all), and on the cost belief it applies the under-updating guard to force a large move the prior would have resisted. It pairs with the decision journal (which fixed the priors at commitment) and points forward to the Q4 after-action review (which will score the resolved outcome). The ledger makes no claim that re-scoring made the launch succeed; its value is keeping the belief portfolio honest against the evidence, and the calibration trail it builds over many such cycles.*
