# Calibration Scorecard - Worked Example

A completed run of the `interval-calibration-check` skill on a real, consequential decision. This is the quality bar a generated calibration scorecard should meet.

> Uses the shared recurring scenario (Northwind, a B2B SaaS weighing a self-serve free-tier launch) so examples across skills read as one coherent product. Where `think-scenario-planning` stress-tests the free-tier strategy against external futures and `think-reference-class-forecasting` relocates an estimate onto a base rate, this skill takes the confidence numbers Northwind's team is *already stating* about the free-tier launch and asks whether those numbers mean what they claim - it resizes the WIDTH of stated uncertainty and never touches the central estimate. See `docs/internal/AUTHORING.md`.

> **Evidence caveat (ships with this artifact by construction).** This method is graded **P (practitioner)**, governing. The phenomenon it targets - interval overprecision - is strongly established, but the controlled evidence for this specific fix (equivalent-bet plus scored feedback on intervals) is partial and largely transferred from sibling formats; the equivalent-bet device itself has no controlled outcome evidence. All evidence is **transferred from human studies, not agent-validated**. Expect **partial correction, not calibrated certainty**. This scorecard calibrates a **human's stated intervals only** - never the agent's own confidence. It resizes the **width** of stated uncertainty; it does **not** relocate the central estimate. See `evidence/dossier.md`.

---

## Focal claim and why its uncertainty matters

- **Claim / quantity:** The free-to-paid conversion rate of Northwind's planned self-serve free tier, and the time to reach 1,000 activated free accounts.
- **Stated interval and nominal confidence:** The PM, Dana, states three numbers feeding the go/no-go: (1) "free-to-paid conversion will be 3 to 5 percent, 90 percent sure"; (2) "we hit 1,000 activated free accounts in 8 to 11 weeks, 90 percent sure"; (3) "incremental support load is at most 1.5 extra tickets per 100 free users, 80 percent sure."
- **What rides on it:** These three numbers are inputs to the free-tier business case. The conversion interval feeds an expected-value model that the board will see; the activation-time interval sets the launch milestone; the support-load interval sizes the support hire. If any interval is narrower than Dana's real knowledge warrants, the business case looks more certain than it is.
- **Genuine uncertainty confirmed:** Yes - none of the three is lookupable (the free tier has not launched), and the worry is that Dana's stated 90s and 80 are too tight to trust (overprecision), not that her central numbers are in the wrong place. (If the worry were "3 to 5 percent is anchored on the wrong comparable," that would route to `think-reference-class-forecasting`, not here.)
- **Human judge:** Dana, Northwind's PM who owns the free-tier business case. The agent plays the encoding analyst and the scorer; it never substitutes its own confidence for Dana's.

## Equivalent-bet test (the width adjustment)

For each interval the agent offered Dana the choice: bet that the true value lands inside her stated interval, versus a reference lottery paying at exactly her stated confidence (a wheel with a winning region the size of the nominal confidence). Wheel-preferred means her felt confidence is below the stated number (overconfident, widen). Interval-preferred means above (narrow). Iterated to genuine indifference.

| # | Claim | Stated interval | Nominal conf. | Bet verdict | Direction | Adjusted interval (at indifference) |
|---|---|---|---|---|---|---|
| 1 | Free-to-paid conversion | 3 - 5% | 90% | wheel-preferred (Dana would rather take the 90% wheel than bet on 3-5%) | widen | 2 - 7% |
| 2 | Weeks to 1,000 activated accounts | 8 - 11 wks | 90% | wheel-preferred, strongly (Dana admits she would "obviously rather spin the wheel") | widen | 7 - 16 wks |
| 3 | Incremental support load (tickets / 100 users) | up to 1.5 | 80% | interval-preferred (Dana would rather bet on her interval than spin the 80% wheel) | narrow | up to 1.2 |

- **Bet verdict legend:** wheel-preferred = overconfident (widen the interval); interval-preferred = underconfident (narrow it); indifferent = held at its stated confidence.
- **Reading it:** Two of Dana's three intervals were too narrow - classic overprecision - and badly so on the activation timeline, where 8 to 11 weeks ignored the fat right tail of a launch that under-delivers. The support-load interval was, unusually, a touch too wide (Dana had padded it defensively), so the test narrowed it. The width moved in both directions; the central numbers did not move at all.

## Hit-rate scoring (the track record, where outcomes resolve)

Northwind keeps a decision journal, so Dana has a track record of past 90 percent intervals on resolved launches and forecasts. The agent scored them.

| Nominal confidence band | Items in band | Items where truth fell inside | Actual hit rate | Diagnosis |
|---|---|---|---|---|
| 90% | 12 | 7 | 58% | overprecise - 90s historically land near 58 percent |
| 80% | 9 | 6 | 67% | overprecise - 80s land near 67 percent |
| 50% | 8 | 4 | 50% | well-calibrated at the wide end |

- **Overall diagnosis:** Dana is systematically overprecise on her high-confidence intervals (her 90s behave like 58s, her 80s like 67s) and well-calibrated only when she lets an interval get genuinely wide. This is the most common calibration signature and it confirms the bet-test reading on claims 1 and 2: her tight high-confidence bands need widening.
- **Feedback to carry into the next round:** "When you say 90 percent, your history says treat it as roughly 60 percent - widen the band by enough to feel slightly uncomfortable before you call it 90."

## Corrected intervals (the output to use downstream)

| Claim | Original interval / conf. | Corrected interval / conf. | Note |
|---|---|---|---|
| Free-to-paid conversion | 3 - 5% @ 90% | 2 - 7% @ 90% | width only; the 3-5% center of mass is unchanged, the band now honestly reflects a real 90% |
| Weeks to 1,000 activated accounts | 8 - 11 wks @ 90% | 7 - 16 wks @ 90% | width only; the long right tail of a slow launch is now inside the band |
| Incremental support load | up to 1.2 @ 80% (was up to 1.5) | up to 1.2 @ 80% | narrowed; Dana's defensive padding removed |

## Honest summary

Dana's free-tier business case rested on two confidence numbers that were tighter than her own knowledge - and her own track record - could support: the conversion band (3 to 5 percent) and especially the activation timeline (8 to 11 weeks), both stated at 90 percent but behaving like 60 percent. The equivalent-bet test and her 58-percent historical hit rate on 90s both pointed the same way, so the bands were widened to 2 to 7 percent and 7 to 16 weeks; the support-load band was nudged tighter where she had over-hedged. Crucially, none of the central estimates moved - this was a width correction, not a re-estimate. The corrected intervals make the expected-value model and the launch milestone honest about how much is genuinely unknown, which is the point: the board now sees a business case that does not pretend to a precision Northwind does not have. The residue is real - calibration training corrects partially, not completely, so Dana's next round of intervals will still skew a little tight - and these numbers are now closer to honest, not certified accurate.

---

*Note how this differs from its neighbors on the same Northwind decision. The `think-reference-class-forecasting` example would attack the LOCATION of the conversion estimate (is 3-5% the right base rate for comparable free tiers?). The `think-fermi-estimation` example would BUILD the activation number bottom-up from traffic, signup, and activation factors. This scorecard does neither: it leaves Dana's central numbers where they are and asks only whether the stated confidence around them is worth its face value, resizing the width and scoring the track record. The deliverable is honesty about uncertainty (and a corrected set of intervals to feed downstream), not a new estimate.*
