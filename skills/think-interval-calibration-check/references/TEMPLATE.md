# Calibration Scorecard - Template

Fill this in. The deliverable is the calibration scorecard - the focal claims, each stated interval with its nominal confidence, the equivalent-bet verdict, the adjusted interval at indifference, and the hit-rate-versus-nominal diagnosis wherever outcomes resolve - not a prose essay.

> **Evidence caveat (ships with this artifact by construction).** This method is graded **P (practitioner)**, governing. The phenomenon it targets - interval overprecision - is strongly established, but the controlled evidence for this specific fix (equivalent-bet plus scored feedback on intervals) is partial and largely transferred from sibling formats; the equivalent-bet device itself has no controlled outcome evidence. All evidence is **transferred from human studies, not agent-validated**. Expect **partial correction, not calibrated certainty**. This scorecard calibrates a **human's stated intervals only** - never the agent's own confidence. It resizes the **width** of stated uncertainty; it does **not** relocate the central estimate (a wrong number, well calibrated, is still wrong). See `evidence/dossier.md`.

---

## Focal claim and why its uncertainty matters

- **Claim / quantity:** [the estimate under audit, in one line]
- **Stated interval and nominal confidence:** [e.g. "8 to 11 weeks, 90 percent sure"]
- **What rides on it:** [the plan, forecast, or commitment that takes this number literally]
- **Genuine uncertainty confirmed:** [not lookupable; the worry is WIDTH (overprecision), not a wrong central number - if it is the central number, route to reference-class-forecasting or fermi-estimation and stop]
- **Human judge:** [name / role of the person whose stated confidence is being calibrated - this is never the agent's own confidence]

## Equivalent-bet test (the width adjustment)

For each interval, offer the choice: bet that the truth falls inside the stated interval, versus a reference lottery paying at exactly the nominal probability (a wheel with a winning region the size of the nominal confidence). Wheel-preferred means felt confidence is below the stated number - overconfident, widen. Interval-preferred means above - narrow. Iterate to genuine indifference.

| # | Claim | Stated interval | Nominal conf. | Bet verdict | Direction | Adjusted interval (at indifference) |
|---|---|---|---|---|---|---|
| 1 | [claim] | [low - high] | [e.g. 90%] | [wheel-preferred / interval-preferred / indifferent] | [widen / narrow / hold] | [low - high] |
| 2 | | | | | | |

- **Bet verdict legend:** wheel-preferred = overconfident (widen the interval); interval-preferred = underconfident (narrow it); indifferent = held at its stated confidence.

## Hit-rate scoring (the track record, where outcomes resolve)

Score the judge's intervals on items whose answers have arrived - a battery of known-answer questions, or the judge's own resolved predictions. Score the hit rate against the nominal confidence and diagnose over- or underprecision.

| Nominal confidence band | Items in band | Items where truth fell inside | Actual hit rate | Diagnosis |
|---|---|---|---|---|
| [e.g. 90%] | [n] | [k] | [k/n] | [overprecise / well-calibrated / underprecise] |
| [e.g. 70%] | | | | |

- **Overall diagnosis:** [e.g. "stated 90s historically hit ~55 percent - systematic overprecision; widen future intervals"]
- **Feedback to carry into the next round:** [the one-line correction the judge takes forward]

> **If no items resolve, this scorecard is ONE-LEGGED.** Only the equivalent-bet half ran, and the bet device is the least-evidenced part of the protocol. State this plainly and do not present a bet-only result as a verified calibration.

## Corrected intervals (the output to use downstream)

| Claim | Original interval / conf. | Corrected interval / conf. | Note |
|---|---|---|---|
| [claim] | [low - high @ X%] | [low - high @ X%] | [what changed and why - width only, location unchanged] |

## Honest summary

[One paragraph: what was overprecise, what was widened, what the track record (if any) showed, and the residual - the correction is partial, the central estimate was not touched, and the confidence numbers are now closer to honest but not certified accurate.]
