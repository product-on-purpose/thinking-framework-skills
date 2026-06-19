---
title: "Minimax Regret - quick sample"
description: Minimax Regret choosing a municipal flood-defense investment across climate futures that cannot be defensibly probabilized.
sidebar:
  label: minimax-regret
---

> A compact worked example of [Minimax Regret](../../frameworks/think-minimax-regret/) on a realistic situation. For full end-to-end narratives see the [Showcase](../../showcase/); for the evidence behind the method see its [framework page](../../frameworks/think-minimax-regret/).

## Situation

Priya is a policy analyst at a coastal city's resilience office, sizing the next decade's flood-defense investment for a low-lying river district. The capital plan can fund one of three levels of protection, and how much protection the district actually needs depends on how the regional climate trends over the planning horizon - which the latest projections bracket across stable, moderate, and severe futures with no consensus distribution behind them. The council wants a recommendation that will not look reckless or wasteful whichever future arrives, and she has to choose without pretending to know the odds.

## Prompt

```
/think-minimax-regret "We're picking a flood-defense level for the Riverside district for the next 10 years: minimal upgrades, a mid-level barrier-plus-drainage package, or a full sea-wall-and-pumps build. The benefit depends on whether the climate stays stable, trends moderate, or turns severe, and the projections genuinely don't agree enough to put numbers on those futures. Net public value figures (benefit minus capital and maintenance cost) are in our capital appraisal. Which level minimizes worst-case regret, and which future does that turn on?"
```

## The artifact

> **Regret (Opportunity-Loss) Matrix**

> No probabilities go on the states. The columns are not ranked or weighted by likelihood. The whole point of this criterion is to choose *without* a probability distribution. If you can defensibly probabilize the states, this is the wrong tool - use an expected-value decision tree instead.

---

## Focal decision and no-probability precondition

- **Decision:** Choose the Riverside district's flood-defense level for the next 10-year capital cycle - among **(A) minimal upgrades** (patch and maintain existing levees), **(B) mid-level package** (raised barriers plus expanded drainage), and **(C) full build** (sea wall plus pumping stations).
- **Why no probabilities:** This is a one-shot, decade-horizon decision into a climate future the regional projections bracket but do not agree on. The stable / moderate / severe trajectories are offered as plausible scenarios, not a calibrated distribution, and there is no base rate for this district's specific exposure. Expected value cannot legitimately run on guessed odds, so a no-probability criterion is appropriate. (If credible probabilities over the climate trajectories did exist, the right tool would be `think-expected-value-decision-tree`, not this.)
- **Payoff unit and sign convention:** 10-year net public value in $M - quantified avoided flood damage and continuity benefit, net of capital and maintenance cost. Higher is better.

## Options (rows) - frozen set

- **Option A: Minimal upgrades** - maintain and lightly reinforce existing levees; lowest cost, lowest protection.
- **Option B: Mid-level package** - raised barriers plus expanded drainage; moderate cost, handles moderate trends well, partially overwhelmed in a severe future.
- **Option C: Full build** - sea wall plus pumping stations; highest cost, protects against the severe future, heavily over-built and costly to maintain if the climate stays stable.

(Set frozen at these three. A fourth idea - "phased build with a re-decision gate in year 5" - was dropped to a separate options study for the next planning round; naming it here because, under this criterion, padding the option list could move the column maxima and steer the pick.)

## States of nature (columns) - uncontrollable, un-probabilized

- **State 1: Stable** - regional climate and storm intensity hold near the historical baseline; existing defenses are rarely stressed.
- **State 2: Moderate** - storm frequency and surge heights trend upward within the mid-range projection; defenses are stressed but not routinely overtopped.
- **State 3: Severe** - surge and rainfall trend to the high end; minimal and mid-level defenses are overtopped in major events.

(Discrete, mutually exclusive, and outside the city's control - the city sets the defense level, not how the climate trends. Enumerable, so the matrix holds at step one.)

## Payoff matrix

10-year net public value, $M, net of capital and maintenance. Figures are the resilience office's capital-appraisal estimates; no cell is invented to force a result, and each is a real planning input.

- **Payoff provenance:** analyst estimates from the district capital appraisal (avoided-damage modeling net of build and maintenance cost), used as given planning inputs - not figures fabricated for this matrix.

| Option \ State | State 1: Stable | State 2: Moderate | State 3: Severe |
|---|---|---|---|
| A: Minimal upgrades | 9 | 4 | -10 |
| B: Mid-level package | 6 | 12 | 2 |
| C: Full build | -2 | 8 | 18 |
| **Column best** | **9 (A)** | **12 (B)** | **18 (C)** |

(Read the rows: A is cheap and best in the Stable future but suffers a large net loss in Severe, where unmitigated damage swamps the savings. B is the all-rounder - solid in Moderate, modestly positive even in Severe, gives up some value in Stable to its higher cost. C swings hardest - biggest payoff in Severe, but a net loss in Stable where a sea wall plus pumps is heavily over-built and costly to maintain.)

## Regret matrix

For each column, regret = (column-best payoff) minus (this cell's payoff). Column-best gets 0; every other cell is a positive opportunity loss. Then take each row's maximum regret.

| Option \ State | State 1: Stable | State 2: Moderate | State 3: Severe | **Max regret (row)** |
|---|---|---|---|---|
| A: Minimal upgrades | 0 | 8 | 28 | **28** |
| B: Mid-level package | 3 | 0 | 16 | **16** |
| C: Full build | 11 | 4 | 0 | **11** |

(Worked: in Severe the best is C at 18, so A's regret is 18 minus (-10) = 28 and B's is 18 minus 2 = 16. In Stable the best is A at 9, so C's regret is 9 minus (-2) = 11. Each row's max is its single worst opportunity loss across the three futures.)

## Minimax pick and binding state

- **Minimax pick: Option C, the full build** - its maximum regret is 11, the smallest of the three max-regret values (28, 16, 11).
- **Binding state: Stable** - C's worst-case regret of 11 occurs in the Stable future, where minimal upgrades (A) would have delivered 11 more $M of net value for a fraction of the cost. That is the opportunity loss the full build accepts in exchange for never being badly exposed in a severe future.
- **What this means:** choosing the full build guarantees the district's opportunity loss never exceeds 11 $M whatever the climate does. Mid-level (B) has a *higher* ceiling on regret (16, in Severe) despite being the best all-rounder, and minimal upgrades (A) has the highest regret of all (28, in Severe) because an overtopped district forfeits enormous avoided-damage value. C is the worst-case-opportunity-loss hedge.

## Sibling-criterion and IIA check (honesty rail)

- **What maximin would pick (best worst-payoff):** Option B. Its worst payoff is 2 (in Severe), versus A's worst of -10 (Severe) and C's worst of -2 (Stable). Pure maximin protects the floor and picks the mid-level package. Minimax regret disagrees: it judges that B's higher worst-case opportunity loss (16, in Severe, where a full build would have delivered far more) outweighs its safer floor, and prefers C. The two criteria pointing at different options is exactly why this pick is reported as a hedge, not as the one rational answer.
- **Where the criteria disagree:** maximin says B (protect the floor), minimax regret says C (limit the worst opportunity loss), and a maximax optimist would also say C (chase the 18 in Severe). Maximin and minimax regret split here, which is the signal to surface the trade-off to the council rather than present a single number.
- **IIA fragility:** the pick is sensitive to the option set. If the dropped "phased build with a year-5 re-decision gate" were added and it beat C in the Severe column (a staged build can sometimes match late protection at lower cost), C's regret in Severe could rise and the ranking could shift, even though nothing about C itself changed. This is the Chernoff (1954) independence-of-irrelevant-alternatives flaw in action, and the reason the option set was frozen and the dropped phased option was named rather than silently included.

## Why this framework fits

The cognitive job here is to commit to one flood-defense level across climate futures Priya genuinely cannot probabilize, without letting a guessed distribution smuggle in false confidence; Minimax Regret does it by scoring opportunity loss instead of raw payoff and picking the option whose worst regret is smallest. Unaided, she would likely have anchored on the safe-looking mid-level package or argued the futures' odds in circles; the matrix instead names the full build as the worst-case-opportunity-loss hedge, surfaces that maximin would disagree, and pins the recommendation to the Stable future it turns on.
