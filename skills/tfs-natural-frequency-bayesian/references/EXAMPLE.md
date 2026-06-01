# Natural-Frequency Breakdown - Worked Example

A completed run of `tfs-natural-frequency-bayesian`, on the shared Northwind scenario. This is the quality bar a generated breakdown should meet.

> Northwind is a B2B SaaS. Sales treats every account its new model flags as "high-intent" as if it almost certainly is. This skill checks what a flag actually means.

---

## Question

- **Posterior asked:** P(truly high-intent | flagged "high-intent") = ?
- (This is NOT the model's 80% sensitivity, which is P(flagged | truly high-intent). Sales is confusing the two.)

## Inputs (real, with source)

- **Base rate** P(high-intent): 5% - source: historical share of accounts that became opportunities.
- **True-positive (hit) rate** P(flagged | high-intent): 80% - source: model validation set.
- **False-positive rate** P(flagged | not high-intent): 10% - source: model validation set.

## Frequency tree (per 1,000 accounts)

- Of 1,000: 50 are truly high-intent; 950 are not.
  - Of the 50 high-intent: 40 are flagged (80%).
  - Of the 950 not high-intent: ~95 are also flagged (10%).
- Total flagged: 40 + 95 = 135.

## Posterior

- P(high-intent | flagged) = 40 / 135 = **~30%.**

## What it means / the wrong intuition it corrects

- Plain language: when the model flags an account, it is truly high-intent only about **30%** of the time - so roughly 2 of every 3 flagged accounts are not.
- Common wrong answer: ~80% (people read the flag as the sensitivity). Wrong because it ignores that high-intent accounts are rare (5% base rate), so the many false positives from the large low-intent pool swamp the true positives.

---

*Note: the value is converting "the model is 80% accurate" into "a flag is right ~30% of the time," which completely changes how Sales should treat flags (triage, not trust). The honest constraint held: the three input rates came from real validation data, not invented numbers - without them the right output would have been "we cannot compute this yet."*
