---
title: "Interval Calibration Check - quick sample"
description: An equivalent-bet audit of an engineer's stated confidence on a database migration cutover window and rollback window.
sidebar:
  label: interval-calibration-check
---

> A compact worked example of [Interval Calibration Check](../../frameworks/think-interval-calibration-check/) on a realistic situation. For full end-to-end narratives see the [Showcase](../../showcase/); for the evidence behind the method see its [framework page](../../frameworks/think-interval-calibration-check/).

## Situation

Daniel, a senior engineer, is leading a Postgres-to-Aurora migration for a 200-person company's billing service. The cutover plan rests on three numbers he stated in the runbook review: the read-only maintenance window, the time to replay the change-data-capture backlog, and how long a rollback would take if validation fails. Leadership has approved a 90-minute customer-facing maintenance banner on the strength of those numbers, so if any interval is tighter than Daniel's real knowledge warrants, the company commits to a window it cannot keep. The worry is overprecision in the stated confidence, not that the central estimates are anchored on the wrong systems.

## Prompt

```text
/think-interval-calibration-check "I'm running the cutover for our billing DB migration. In the runbook I committed to three numbers, each 90% sure: read-only window 35-45 min, CDC backlog replay 10-20 min, rollback if validation fails 15-25 min. Leadership signed off a 90-min maintenance banner on these. Audit the WIDTH of my confidence, don't re-estimate the numbers - I have a track record of past cutover estimates that resolved."
```

## The artifact

> **Calibration Scorecard**

> **Evidence caveat (ships with this artifact by construction).** This method is graded **P (practitioner)**, governing. The phenomenon it targets - interval overprecision - is strongly established, but the controlled evidence for this specific fix (equivalent-bet plus scored feedback on intervals) is partial and largely transferred from sibling formats; the equivalent-bet device itself has no controlled outcome evidence. All evidence is **transferred from human studies, not agent-validated**. Expect **partial correction, not calibrated certainty**. This scorecard calibrates a **human's stated intervals only** - never the agent's own confidence. It resizes the **width** of stated uncertainty; it does **not** relocate the central estimate (a wrong number, well calibrated, is still wrong). See `evidence/dossier.md`.

---

### Focal claim and why its uncertainty matters

- **Claim / quantity:** Three timing estimates in the billing-DB migration runbook - the read-only maintenance window, the change-data-capture (CDC) backlog replay time, and the rollback time if post-cutover validation fails.
- **Stated interval and nominal confidence:** Daniel states (1) "read-only window 35 to 45 minutes, 90 percent sure"; (2) "CDC backlog replay 10 to 20 minutes, 90 percent sure"; (3) "rollback if validation fails 15 to 25 minutes, 90 percent sure."
- **What rides on it:** Leadership approved a 90-minute customer-facing maintenance banner by summing these. The read-only and replay windows set the banner duration; the rollback window sets the abort decision point. If any band is too tight, the team commits publicly to a window it can miss, and the abort plan is built on a rollback time that may not hold.
- **Genuine uncertainty confirmed:** Yes - none is lookupable (this exact cutover has not run on this dataset's current size), and the worry is that Daniel's stated 90s are too tight to trust (overprecision), not that a number is anchored on the wrong system. (If the worry were "10 to 20 min is based on the wrong comparable cutover," that would route to `think-reference-class-forecasting`, not here.)
- **Human judge:** Daniel, the senior engineer who owns the runbook and stated the numbers. The agent plays the encoding analyst and the scorer; it never substitutes its own confidence for Daniel's.

### Equivalent-bet test (the width adjustment)

For each interval the agent offered Daniel the choice: bet that the true value lands inside his stated interval, versus a reference lottery paying at exactly his stated confidence (a wheel with a winning region the size of the nominal confidence). Wheel-preferred means felt confidence is below the stated number (overconfident, widen). Interval-preferred means above (narrow). Iterated to genuine indifference.

| # | Claim | Stated interval | Nominal conf. | Bet verdict | Direction | Adjusted interval (at indifference) |
|---|---|---|---|---|---|---|
| 1 | Read-only maintenance window | 35 - 45 min | 90% | wheel-preferred (Daniel would rather take the 90% wheel than bet on 35-45) | widen | 30 - 60 min |
| 2 | CDC backlog replay | 10 - 20 min | 90% | wheel-preferred, strongly (Daniel admits replay "balloons when the backlog is large, and I have not load-tested at current volume") | widen | 8 - 40 min |
| 3 | Rollback if validation fails | 15 - 25 min | 90% | interval-preferred (Daniel would rather bet on his interval than spin the 90% wheel - rollback is a rehearsed, scripted path) | narrow | 16 - 24 min |

- **Bet verdict legend:** wheel-preferred = overconfident (widen the interval); interval-preferred = underconfident (narrow it); indifferent = held at its stated confidence.
- **Reading it:** Two of Daniel's three intervals were too narrow - classic overprecision - and badly so on the CDC replay, where 10 to 20 minutes ignored the fat right tail of a replay against an unmeasured backlog volume. The rollback band was, unusually, a touch too wide because the rollback is a scripted, rehearsed path Daniel has actually timed, so the test narrowed it. The width moved in both directions; the central numbers did not move.

### Hit-rate scoring (the track record, where outcomes resolve)

Daniel keeps a migration log, so he has a track record of past cutover-timing estimates stated at 90 and 80 percent that have since resolved against measured cutover durations. The agent scored them.

| Nominal confidence band | Items in band | Items where truth fell inside | Actual hit rate | Diagnosis |
|---|---|---|---|---|
| 90% | 11 | 6 | 55% | overprecise - 90s historically land near 55 percent |
| 80% | 7 | 5 | 71% | mildly overprecise - 80s land near 71 percent |
| 50% | 6 | 3 | 50% | well-calibrated at the wide end |

- **Overall diagnosis:** Daniel is systematically overprecise on his high-confidence timing bands (his 90s behave like 55s) and well-calibrated only when he lets an interval get genuinely wide. This is the most common calibration signature and it confirms the bet-test reading on claims 1 and 2: his tight 90 percent windows need widening, especially anything dependent on data volume he has not measured.
- **Feedback to carry into the next round:** "When you say 90 percent on a cutover timing, your log says treat it as roughly 55 percent - widen the band until it feels slightly uncomfortable before you call it 90, and widen extra on any step gated by an unmeasured volume."

### Corrected intervals (the output to use downstream)

| Claim | Original interval / conf. | Corrected interval / conf. | Note |
|---|---|---|---|
| Read-only maintenance window | 35 - 45 min @ 90% | 30 - 60 min @ 90% | width only; the ~40-min center of mass is unchanged, the band now honestly reflects a real 90% |
| CDC backlog replay | 10 - 20 min @ 90% | 8 - 40 min @ 90% | width only; the long right tail of a large unmeasured backlog is now inside the band |
| Rollback if validation fails | 15 - 25 min @ 90% | 16 - 24 min @ 90% | narrowed; the rehearsed, scripted rollback supports a tighter band |

### Honest summary

Daniel's cutover plan rested on two timing windows that were tighter than his own knowledge - and his own migration log - could support: the read-only window (35 to 45 minutes) and especially the CDC replay (10 to 20 minutes), both stated at 90 percent but behaving like 55 percent. The equivalent-bet test and his 55-percent historical hit rate on 90s both pointed the same way, so the bands were widened to 30 to 60 minutes and 8 to 40 minutes; the rollback band was nudged tighter where his rehearsed script justified it. Crucially, none of the central estimates moved - this was a width correction, not a re-estimate. The corrected intervals show the maintenance banner could plausibly run well past 90 minutes if the replay hits its right tail, which is exactly the honest signal leadership needed before committing publicly. The residue is real - calibration training corrects partially, not completely, so Daniel's next round of windows will still skew a little tight - and these numbers are now closer to honest, not certified accurate.

## Why this framework fits

The cognitive job here is overprecision detection: leadership took Daniel's "90 percent sure" at face value, and the method interrogates the width of those stated bands without ever touching where the numbers sit. The artifact converts a vague "I'm pretty sure" into a concrete bet plus a scored track record, surfacing that two windows behaved like coin flips and that the public banner needed a wider, more honest commitment - a correction unaided estimation, which tends to restate the same tight numbers, would have missed.
