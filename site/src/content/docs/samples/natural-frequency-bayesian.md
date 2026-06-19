---
title: "Natural-Frequency Bayesian Framing - quick sample"
description: Natural-Frequency Bayesian Framing on a security team deciding how much to trust an anomaly-detection alert.
sidebar:
  label: natural-frequency-bayesian
---

> A compact worked example of [Natural-Frequency Bayesian Framing](../../frameworks/think-natural-frequency-bayesian/) on a realistic situation. For full end-to-end narratives see the [Showcase](../../showcase/); for the evidence behind the method see its [framework page](../../frameworks/think-natural-frequency-bayesian/).

## Situation

Daniel's team ships an internal anomaly detector that flags employee logins as "likely account takeover." The on-call rotation has started treating every flagged login as a near-certain compromise, locking accounts and paging the user at 2am. Daniel wants to know what a flag actually means before the team builds an auto-lockout on top of it, so he pulls the real rates from the last quarter's validation data.

## Prompt

```text
/think-natural-frequency-bayesian "Our login anomaly detector flags ~true account-takeover with 90% sensitivity and a 3% false-positive rate. Real takeovers are about 1 in 500 logins. When it flags a login, what's the actual chance the account is compromised? On-call treats every flag as real."
```

## The artifact

## Question

- **Posterior asked:** P(account compromised | login flagged) = ?
- (Note: this is NOT P(login flagged | account compromised), the detector's 90% sensitivity. On-call is confusing the two.)

## Inputs (real, with source - or flagged missing)

- **Base rate** P(compromised): 0.2% (1 in 500) - source: confirmed account-takeover incidents over total logins, last quarter's incident log.
- **True-positive (hit) rate** P(flagged | compromised): 90% - source: detector validation set against labeled takeover cases.
- **False-positive rate** P(flagged | not compromised): 3% - source: same validation set, flagged rate on confirmed-clean logins.

## Frequency tree (per 1,000 logins)

- Of 1,000: 2 are truly compromised; 998 are not.
  - Of the 2 compromised: ~1.8 are flagged (90%).
  - Of the 998 not compromised: ~30 are also flagged (3%).
- Total flagged: 1.8 + 30 = ~32.

## Posterior

- P(compromised | flagged) = 1.8 / 32 = **~6%.**

## What it means / the wrong intuition it corrects

- Plain language: when the detector flags a login, the account is actually compromised only about **6%** of the time, so roughly 19 of every 20 flags are false alarms.
- Common wrong answer: ~90% (people read the flag as the sensitivity). Wrong because real takeovers are very rare (0.2% base rate), so the small 3% false-positive rate applied to the huge clean-login pool produces far more false flags than there are true ones. This is base-rate neglect.

---

*Note: the value is converting "the detector is 90% accurate" into "a flag is right ~6% of the time," which changes the design - auto-lockout on a single flag would lock ~19 innocent users for every real catch, so the flag belongs in a triage queue (step-up auth, not a hard lock). The honest constraint held: all three rates came from real validation and incident data, not invented numbers - without them the right output would have been "we cannot compute this yet."*

## Why this framework fits

The team had a probability in percentage form (90% sensitivity) and was treating it as the answer to a different question (chance a flag is real). Re-expressing the same facts as counts over 1,000 logins keeps the rare base rate visible and turns "the detector is 90% accurate" into the actionable "~6% of flags are real," which is the number the auto-lockout decision actually hinges on.
