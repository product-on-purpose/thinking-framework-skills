# Scoring Model - Worked Example

A completed run of `tfs-linear-model-aggregation`, on the shared Northwind scenario. This is the quality bar a generated model should meet.

> Northwind is a B2B SaaS. Reps decide which inbound leads are "worth pursuing" by gut, inconsistently. (This is the recurring judgment behind the lead-scoring signal that natural-frequency-bayesian examined.) This skill replaces the gut call with a simple consistent rule.

---

## Judgment

- **The recurring judgment:** is an inbound lead worth a rep's time to pursue?
- **Outcome it predicts:** the lead becomes a closed-won opportunity within 90 days.

## Cues (few, predictive)

| Cue | Why it plausibly predicts the outcome | Weight | How it is scored (rubric) |
|---|---|---|---|
| ICP firmographic fit (size, segment) | Closed-won rate is far higher inside the ICP | 1 (equal) | 2 = strong fit, 1 = partial, 0 = outside ICP |
| Engagement depth (key-action completed in trial) | Activated trials convert far more often | 1 | 2 = key action done, 1 = logged in, 0 = neither |
| Budget/authority signal (named buyer, stated budget) | Deals without a buyer rarely close in 90 days | 1 | 2 = both, 1 = one, 0 = neither |
| Inbound source quality (referral/demo-request vs cold list) | Higher-intent sources close more | 1 | 2 = referral/demo, 1 = content, 0 = cold |

(Equal weights, per the evidence that simple weights capture most of the benefit. Revisit weights only if outcome data justifies it.)

## Formula and decision rule

- **Combine:** sum of the four cue scores (range 0-8).
- **Threshold / rule:** score >= 5 -> rep pursues now; 3-4 -> nurture queue; <= 2 -> auto-decline.

## Mandate and caveats

- **Apply consistently:** every lead scored the same way; no overriding the score on a hunch ("I have a good feeling") - that gut override is exactly the inconsistency this removes.
- **Only as good as its cues:** check quarterly whether high-scoring leads actually closed more than low-scoring ones; drop a cue that shows no predictive signal.
- **Fairness / ethics:** this scores accounts, not protected individual attributes; keep it to firmographic/behavioral cues and review for proxy bias before any automation.

---

*Note: the value is consistency, not cleverness. The reps' holistic "good lead?" call varied day to day; a flat 4-cue rule, applied the same every time, will match or beat that gut judgment per Meehl/Dawes - and it is auditable. This is the right tool because the judgment recurs hundreds of times; a one-off "which of these 3 deals to chase" would instead use decision-option-review.*
