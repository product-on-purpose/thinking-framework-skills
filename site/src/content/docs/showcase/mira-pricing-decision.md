---
title: "Mira can't choose between two pricing models"
description: A seed-stage founder runs the stress-test recipe on a pricing decision, chaining what-would-have-to-be-true, a head-to-head comparison, and a premortem on the winner.
sidebar:
  label: "Mira -> stress-test recipe"
---

> **Mira**, solo founder of an 8-person seed-stage startup. The decision: price the new tier as flat per-seat or usage-based, and stop second-guessing it. Prompting style: casual.

Recipe: [stress-test-decision](../../recipes/stress-test-decision/), chaining What-Would-Have-to-Be-True, Pairwise Comparison, then Premortem. For the cast and the other journeys, see the [Showcase index](../).

## The situation

The new tier is built and Mira has to pick a pricing model: flat per-seat or usage-based. Each has a story she half-believes, and her gut flips depending on which customer call she had last. So she stops trusting the gut and runs the recipe: surface what each model needs to be true, force a head-to-head choice, then premortem the winner before she commits.

## Step 1 - What Would Have to Be True

She does not argue for either model. She asks what each one needs to be true to be the right call, so the debate stops being a clash of opinions.

**The prompt**

```
/think-what-would-have-to-be-true "pricing the new tier. torn between flat
per-seat and usage-based. usage-based feels right for our power users but
scares me on predictability. what would have to be true for each?"
```

**The artifact**

> **Assumption Ledger - Pricing model for the new tier**

**The choice:** Price the new tier as **usage-based** (metered on actions processed) rather than flat per-seat, on the bet that it captures more value from heavy users and lowers the entry price for everyone else.

**Conditions that would have to be true**

| # | Condition that must hold | Why it is load-bearing | Confidence (H/M/L) | How to test it |
|---|---|---|---|---|
| 1 | Usage tracks the value customers actually get (more actions = more value to them) | If usage and value diverge, customers feel taxed for using the product and ration their own usage | M | Pull 90 days of account data; correlate actions-processed against retention and expansion |
| 2 | We can meter actions accurately and bill them without a metering/billing rebuild | A usage model with flaky metering produces disputed invoices and churn; we are an 8-person team | L | Spike the meter against last quarter's event log; check for gaps, double-counts, and timezone drift |
| 3 | Customers will accept a variable monthly bill (the buyer can defend an unpredictable line item internally) | If finance buyers reject unpredictability, usage-based loses the deals per-seat would have won | L | Ask the 10 most engaged trials and 5 lost deals directly whether a variable bill is a blocker |
| 4 | Our heavy users are heavy enough that metered revenue beats a flat seat price from them | The whole upside case is "capture more from power users"; if the top accounts are not that heavy, there is no gain | M | Model metered revenue vs per-seat revenue on the actual top-20 accounts' usage |
| 5 | A low metered entry price pulls in more new logos than a flat per-seat price would scare off | The downside-protection story is "cheaper to start"; it only pays if it actually lifts top-of-funnel | M | Compare quoted-to-closed rates on the two models with a small pricing test on inbound |

**Killer conditions (test these before committing)**

The two that are both most load-bearing and least certain:

- **Metering and billing can ship without a rebuild (condition 2)** - confidence L - cheapest test: spike the meter against last quarter's event log this week. If it fails, usage-based fails because an 8-person team cannot run disputed invoices, and the model collapses on operational cost, not on strategy.
- **Customers accept a variable monthly bill (condition 3)** - confidence L - cheapest test: ask 10 engaged trials and 5 lost deals directly. If finance buyers treat unpredictability as a blocker, usage-based loses exactly the deals per-seat would have won, and the upside never materializes.

That ledger does not pick a winner. It hands the next step a sharper question than "which feels right?": which model survives a forced head-to-head once you know usage-based carries two low-confidence killer conditions.

## Step 2 - Pairwise Comparison

There is no defensible 1-to-10 pricing scale here and the criteria genuinely will not hold still, so Mira does not score the models. She forces head-to-head votes on the small set she is actually weighing, carrying the ledger's killer conditions in as the lens for the judgments.

**The prompt**

```
/think-pairwise-comparison "rank our pricing options for the new tier by which
i'd actually bet the next year on. options: flat per-seat, pure usage-based,
and a hybrid (small per-seat base + usage on top). can't score these, just
tell me which beats which."
```

**The artifact**

> This is a forced-choice ranking, not an absolute score. There is deliberately no criteria column and no 1-to-10 scale.

**Ranking question and items**

- **Ranking question:** which of these two pricing models would I more confidently bet the next year of revenue on, given the two low-confidence killer conditions on usage-based (metering risk, bill-predictability risk)?
- **Why no scale:** the models trade off on incommensurate axes (revenue upside, billing risk, buyer acceptance, build cost) that cannot be collapsed into one defensible number this early, so a scored matrix would manufacture false precision.
- **Items to rank (n = 3):**
  - A: Flat per-seat
  - B: Pure usage-based
  - C: Hybrid (small per-seat base + usage on top)

**Item-count check**

- **Pairs to judge: n(n-1)/2 = 3.** Small enough to judge every pair by hand.

**The comparison matrix (binary A-beats-B votes)**

Read each cell as "does the ROW item beat the COLUMN item?" Each off-diagonal pair is one win (W) and one loss (L).

|        | vs A | vs B | vs C | **Wins** |
|--------|------|------|------|----------|
| **A** (flat per-seat) |  -   | L | L | 0 |
| **B** (pure usage-based) | W |  -   | L | 1 |
| **C** (hybrid) | W | W |  -   | 2 |

The judgments, each answering the one question:
- **A vs B:** B wins. Pure usage-based beats flat per-seat on the bet, because per-seat leaves the power-user value on the table that the whole tier exists to capture.
- **A vs C:** C wins. The hybrid keeps per-seat's predictable floor while still capturing usage upside, so it dominates plain per-seat.
- **B vs C:** C wins. The hybrid neutralizes usage-based's biggest weakness (the variable-bill killer condition) by giving the buyer a predictable base, while keeping most of the metered upside. The small per-seat base also de-risks the metering condition, because a billing error no longer zeroes out the whole invoice.

**Derived ranking**

| Rank | Item | Wins | Tie-break note (if any) |
|------|------|------|--------------------------|
| 1 | Hybrid (small per-seat base + usage on top) | 2 | |
| 2 | Pure usage-based | 1 | |
| 3 | Flat per-seat | 0 | |

**Consistency check**

- **Result:** Transitive - no cycles found. C beats both A and B; B beats A; the order C > B > A is clean.
- **Action on any cycle:** none required.

**Honest framing**

This order is a forced-choice ranking derived from head-to-head votes, not an objective measurement. A passing consistency check does not make the hybrid correct; it makes the preference internally consistent. The win that decided it (hybrid over pure usage) rests directly on the two killer conditions from Step 1, so if those conditions resolve well, pure usage-based could close the gap.

The ranking gives the premortem a single thing to stress-test: the **hybrid model** won, largely because it defuses the two killer conditions rather than betting against them. So the premortem assumes the hybrid shipped and failed anyway.

## Step 3 - Premortem

One model survived the head-to-head. Before she commits, Mira assumes it has already failed and works backward, so the worries become tripwires and kill criteria instead of a feeling.

**The prompt**

```
/think-premortem "we're going with the hybrid pricing model for the new tier:
small per-seat base plus usage on top. assume it's a year later and it flopped.
why? give me the risks with tripwires and when to pull the plug."
```

**The artifact**

> **Premortem Risk Register - Hybrid pricing for the new tier**

**Decision:** Launch the new tier on a hybrid model - a small flat per-seat base plus metered usage on top.
**Intended outcome:** Predictable revenue floor from the base, plus upside captured from heavy users, without the variable-bill objection that scared us off pure usage-based.
**Horizon:** 12 months after the pricing goes live.
**Reversibility:** One-way door in practice - repricing existing customers a second time burns trust and invites churn, so we effectively get one move.

**The failure, declared.** *It is twelve months after launch. The hybrid model shipped and it failed badly: the metering disputes we feared on pure usage-based showed up anyway, support spent a quarter reconciling invoices by hand, and two mid-market accounts churned citing "we can't predict the bill." Worse, the per-seat base plus usage read as "more expensive than the old flat plan" to small accounts, so new-logo growth stalled, and the power-user upside never appeared because the heavy accounts negotiated usage caps into their contracts.*

**Top risks and what we will do.** The three most likely ways this fails: (1) **metering is still wrong**, because the hybrid did not actually remove the metering killer condition, it only softened its blast radius - we will spike the meter against last quarter's event log and gate launch on a clean reconciliation; (2) **the variable-usage portion still reads as unpredictable** to finance buyers despite the base - we will cap usage variability with a billing ceiling and publish a worst-case monthly number per plan; (3) **the base-plus-usage total prices small accounts out**, stalling top-of-funnel - we will model the all-in price against the old flat plan for the bottom quartile before launch.

| # | Cause of failure | Likelihood | Impact | Leading signal / tripwire | Mitigation | Owner | Kill criterion |
|---|---|---|---|---|---|---|---|
| 1 | Metering is inaccurate; invoices get disputed (the killer condition the hybrid only softened, did not remove) | H | H | More than 1 in 20 invoices disputed in month 1; support time on billing reconciliation climbing week over week | Spike the meter on last quarter's event log; gate launch on a clean reconciliation; ship a usage dashboard customers can self-audit | Mira | Dispute rate above 5% of invoices for two consecutive months with no downward trend |
| 2 | Variable usage portion still reads as unpredictable; finance buyers balk | M | H | Lost-deal notes cite "unpredictable bill"; usage-line questions dominate sales calls in weeks 1-4 | Add a per-plan billing ceiling; publish a worst-case monthly figure; offer an annual usage prepay | Mira | More than 1 in 4 lost deals in the first quarter name bill-predictability as the blocker |
| 3 | Base + usage prices the bottom quartile out; new-logo growth stalls | M | H | Quoted-to-closed rate on small inbound drops below the old flat-plan rate by week 4 | Model all-in price vs the old flat plan for the bottom quartile pre-launch; tune the base so small accounts are not worse off | Mira | Small-account close rate below the pre-launch flat-plan baseline for 6 straight weeks |
| 4 | Power users negotiate usage caps into contracts, so the metered upside never lands | M | M | First three enterprise renewals all request a usage cap; metered revenue per top account flat vs the per-seat equivalent | Hold a floor on the per-seat base so a capped account still clears the old price; limit how low caps can go in deal desk | Mira | Metered revenue from the top 20 accounts below the per-seat-equivalent after two renewal cycles |
| 5 | Two pricing axes confuse customers and slow the sales cycle | L | M | Sales cycle length grows vs the old single-axis plan; "how does this bill?" recurs in every demo | One-page pricing explainer; a calculator on the pricing page; rehearse the 30-second pricing pitch | Mira | Average sales cycle 25% longer than the old plan after 8 weeks, attributable to pricing confusion |

**Watch list.** Existing customers read the new tier's pricing as a signal their plan will be repriced next - monitor support sentiment, low likelihood. Competitor undercuts on a simpler flat price - track win/loss reason codes, standard monitoring sufficient.

## Why the chain worked

Each step handed the next a sharper input than Mira could have written by hand. What-Would-Have-to-Be-True turned "which feels right?" into two named killer conditions (metering risk, bill predictability), and those conditions became the single lens the Pairwise Comparison judged every pair with - which is why a third option, the hybrid, won by defusing them rather than betting against them. The Premortem then assumed that winner had failed anyway, and its sharpest risk (#1) is the same metering condition the comparison thought it had neutralized, now caught as a launch gate instead of a surprise.

## What happened next

Mira did not commit to the hybrid off the deck; she committed to the two tests first. She ran the metering spike against last quarter's event log that week (killer condition 2 from Step 1, risk #1 in the premortem), found a double-count on retried actions, and fixed it before a single customer saw a wrong invoice. She set the billing ceiling and published a worst-case monthly number so the variable line could never become the lost-deal reason. The risk register went into the launch doc with the kill criteria written down while she was calm, so a year of optimistic momentum could not quietly talk her out of them. If she wants to sanity-check the revenue estimate against how comparable pricing changes have actually landed, the next move is the [stress-test-decision recipe's](../../recipes/stress-test-decision/) outside-view step, or she can describe the situation to the [framework advisor](../../tools/think-framework-advisor/) and run whatever it sequences.
