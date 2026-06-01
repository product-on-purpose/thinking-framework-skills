# Natural-Frequency Breakdown - Template

Fill this in. The deliverable is the frequency tree, posterior, and plain-language meaning, not a bare percentage. Use real input rates; if any is unknown, flag it - do not invent.

---

## Question

- **Posterior asked:** P([condition] | [positive signal]) = ?
- (Note: this is NOT P([positive signal] | [condition]); state both to avoid the common confusion.)

## Inputs (real, with source - or flagged missing)

- **Base rate** P(condition): [x%] - source: [...]
- **True-positive (hit) rate** P(positive | condition): [x%] - source: [...]
- **False-positive rate** P(positive | no condition): [x%] - source: [...]

## Frequency tree (per 1,000)

- Of 1,000: [N] have the condition; [1000-N] do not.
  - Of the [N] with it: [a] test positive.
  - Of the [1000-N] without it: [b] also test positive.
- Total positives: [a + b].

## Posterior

- P(condition | positive) = [a] / [a + b] = **[~Z%]**.

## What it means / the wrong intuition it corrects

- Plain language: [a positive result means the condition is present only ~Z% of the time].
- Common wrong answer: [usually near the hit rate], wrong because [base-rate neglect].
