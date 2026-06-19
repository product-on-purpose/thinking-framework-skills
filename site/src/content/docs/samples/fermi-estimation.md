---
title: "Fermi Estimation - quick sample"
description: Fermi Estimation sizing the peak write load a new activity-feed feature must survive on launch day, with no production data to look up.
sidebar:
  label: fermi-estimation
---

> A compact worked example of [Fermi Estimation](../../frameworks/think-fermi-estimation/) on a realistic situation. For full end-to-end narratives see the [Showcase](../../showcase/); for the evidence behind the method see its [framework page](../../frameworks/think-fermi-estimation/).

## Situation

Daniel is the staff engineer about to launch an activity feed across his company's product. Every user action (comment, edit, status change) fans out a write into the feed store, and he needs a peak writes-per-second figure to size the queue and pick a database tier before the launch review on Friday. The feature has never run in production, there is no comparable existing service to borrow a rate from, and the load depends on usage patterns nobody has measured yet. So he has to build the number from factors rather than look it up.

## Prompt

```
/think-fermi-estimation "Sizing peak write load for our new activity feed before launch. Every user action fans out one write to the feed store. ~120k daily active users, no production traffic for this feature yet and nothing comparable to copy a rate from. I need a peak writes/sec figure to size the queue and DB tier for Friday's review. Give me a point estimate plus an honest range."
```

## The artifact

# Fermi Decomposition Worksheet

## Target quantity

- **What is being estimated:** peak sustained write rate to the activity-feed store at the busiest minute of the day - **unit:** writes / second.
- **Why Fermi (not a lookup):** the feature has never run in production and there is no comparable existing service whose write rate could be borrowed, so there is no dataset and no genuine reference class - the number is built from factors.

## Factor chain

The target = product of the factors below:

`peak writes/sec = daily active users x feed-generating actions per active user per day x average-to-peak concentration factor / seconds per day`

## Per-factor bands

| Factor | Low | Best | High | Basis for the guess |
|---|---|---|---|---|
| Daily active users | 90,000 | 120,000 | 150,000 | Current product analytics show ~120k DAU; band covers a launch bump and normal day-to-day swing |
| Feed-generating actions per active user per day | 3 | 8 | 20 | Analogy: a typical engaged user does a handful of comment/edit/status actions per day; wide band because power users and integrations can fan out far more, and this is not measured for this feature |
| Average-to-peak concentration (peak-minute rate vs flat-day average) | 4x | 8x | 15x | Traffic clusters in business hours and time zones; observed peak-to-average for our existing API sits near 8x, band allows a spikier or flatter profile |
| Seconds per day | 86,400 | 86,400 | 86,400 | Fixed constant, not a source of uncertainty (used as a divisor) |

## Independence check

- Do any two factors share a driver (move together)? **Yes - partially.** Actions-per-user and the peak-concentration factor both rise with overall engagement: a highly engaged user base tends to act more *and* cluster those actions into the same active hours, so the two factors are positively correlated. That means the naive low-times-low / high-times-high band slightly *understates* the true spread at the high end, because both factors swing the same way rather than offsetting. DAU is effectively independent of both; seconds-per-day is a constant.
- Action: keep the band, but read the high end as the more dangerous side to plan against, since the two correlated factors reinforce rather than cancel near the ceiling. Do not treat actions-per-user and peak-concentration as freely independent when reasoning about the worst case.

## Combined estimate

- **Point estimate** (multiply the best-guesses): 120,000 x 8 x 8 / 86,400 = **~89 writes/sec** (call it ~90).
- **Low** (multiply the lows): 90,000 x 3 x 4 / 86,400 = **~12.5 writes/sec** (call it ~13).
- **High** (multiply the highs): 150,000 x 20 x 15 / 86,400 = **~520 writes/sec** (call it ~520).
- So the answer is roughly **~90 writes/sec at peak**, plausibly between **~13 and ~520** - and, per the independence check, the high end is the side to respect because the two engagement-driven factors reinforce rather than offset near the ceiling.

## Dominant uncertainty

- The factor whose band most widens the range is **feed-generating actions per active user per day** (a ~7x span from 3 to 20, and the factor least anchored to any measured datum for this feature). Tightening this one guess - by instrumenting a small internal rollout to count real actions per user, or pulling action counts from a comparable existing surface - would shrink the range far more than refining DAU or the peak factor. That, not the headline ~90, is the worksheet's most useful output: it says to provision headroom toward the high end and measure actions-per-user first.

---

*This is an order-of-magnitude build-from-factors estimate, not a forecast. It gives directional sizing under an independence condition, not a precise or proven number. If real usage data or a true comparable service turns up, switch to that and stop inventing factors. The value is not the ~90: it is that every assumption is challengeable, the number never ships without its ~13-to-520 band, the correlated factors are flagged so the high end is not read as naively independent, and actions-per-user is named as the thing to measure before betting the DB tier.*

## Why this framework fits

The job here is to produce a defensible load number when there is nothing to look up, and Fermi Estimation does it by factoring the unknown into engagement quantities Daniel can each guess to within a band, then compounding those bands into an honest range. Unaided, he would have anchored on one round guess and hidden its uncertainty; the worksheet instead exposes every assumption, refuses to report a point without its range, and tells him to provision for the high end and measure actions-per-user before Friday.
