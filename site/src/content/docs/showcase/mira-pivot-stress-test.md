---
title: "Mira stress-tests a possible pivot"
description: A seed-stage founder considering a pivot stops arguing about whether it is right and instead lists what would have to be true, then sorts those conditions by which she can test cheaply this month.
sidebar:
  label: "Mira -> what would have to be true"
---

> **Mira**, solo founder of an 8-person seed-stage startup. The decision: pivot from a horizontal scheduling tool to a vertical product built only for med-spa clinics. Prompting style: casual.

This is a complete run, prompt to artifact. Framework: [What Would Have to Be True](../../frameworks/think-what-would-have-to-be-true/). For the cast and the other journeys, see the [Showcase index](../).

## The situation

Mira's horizontal scheduling tool grows slowly, but the handful of med-spa clinics on it are the happiest users by far and keep asking for clinic-specific features. The team is split: half want to bet the company on going vertical, half think it throws away every other market. Instead of letting the loudest voice win, she asks what would have to be true for the pivot to be the right move, and which of those she could test cheaply before betting anything.

## The prompt

```
/think-what-would-have-to-be-true "thinking about pivoting from our horizontal
scheduling tool to a med-spa-only vertical product. team's split and it's
turning into an argument. what would have to be true for this to be the right
move, and which of those can i actually test cheap/soon?"
```

That is the whole prompt. One option, the worry that it is becoming an argument, and the one thing she actually wants: conditions she can test fast. The framework supplies the rest.

## The output

> **Assumption Ledger (What Would Have to Be True) - Med-spa vertical pivot**

## Option or claim under examination

- **The choice:** Pivoting from the horizontal scheduling tool to a med-spa-only vertical product is the best way to break out of slow growth.

## Conditions that would have to be true

| # | Condition that must hold | Why it is load-bearing | Confidence (H/M/L) | How to test it | Testable cheap/soon? |
|---|---|---|---|---|---|
| 1 | The med-spa segment is big enough that owning it beats serving everyone a little | If the niche is too small, a focused win still caps the company below its current trajectory | L | One day of market sizing: number of US med-spas x realistic ACV x reachable share | Yes - 1 day, desk research |
| 2 | Med-spa clinics will pay a clear premium for clinic-specific features over a generic tool | The whole pivot thesis is that vertical depth commands more than horizontal breadth | L | Take the pricing+feature ask to 8-10 current clinic users; offer a paid design-partner slot at the higher price | Yes - 1 week, calls we can book now |
| 3 | We can win med-spa clinics faster than we win generic customers (a real channel exists) | A vertical with no concentrated channel just trades one slow funnel for another | M | Test one channel for 2 weeks: a med-spa industry list, association, or directory; measure reply and demo rate | Yes - 2 weeks, one channel |
| 4 | The clinic-specific features are buildable by an 8-person team in a quarter, not a rebuild | If the vertical product needs intake forms, compliance, and payments we cannot staff, the bet stalls mid-pivot | M | Half-day scoping of the top 5 requested features against current architecture | Yes - half a day, internal |
| 5 | No incumbent already owns med-spa software well enough to crush a newcomer | Walking into a category a funded specialist already locked up is a losing fight | M | Half-day competitive scan: who the clinics we talk to already evaluated or rejected, and why | Yes - half a day, folded into the user calls |
| 6 | Walking away from the horizontal base does not sink revenue before the vertical replaces it | The pivot is close to a one-way door; a cash gap mid-transition can end the company | M | Model the runway: current horizontal revenue, churn if we stop investing in it, months to vertical break-even | Yes - 1 day, internal model |
| 7 | The team can actually commit to the niche, not hedge by serving both | A half-pivot gets the cost of focus with none of the benefit | H | A single alignment session: would we say no to a great non-med-spa customer next quarter? | Yes - 1 meeting, free |

## Killer conditions (test these before committing)

The one or two conditions that are both most load-bearing and least certain:

- **Condition 2 (clinics pay a premium for vertical depth)** - confidence L - cheapest test: 8-10 calls with current clinic users this week, offering a paid design-partner slot at the higher price. If nobody bites at the new price, the pivot's core economic thesis is false and going vertical just renames slow growth.
- **Condition 1 (the segment is big enough to matter)** - confidence L - cheapest test: one day of market sizing. If the reachable med-spa market caps below where the horizontal tool could already go, then even a total niche win is not the best move, no matter how well it executes.

---

*Note: the value is the right-hand column. Every condition that would have to be true is testable cheap and soon, so there is nothing here to argue about for another month. The two killer conditions - does the niche pay a premium, and is it big enough - together cost about one week and one day. The pivot does not need a vote; it needs those two tests. From here, run `think-premortem` on the pivot plan if both killer conditions clear.*

## Why this prompt worked

It named the **option** (the vertical pivot), flagged that the decision had become an **argument**, and asked the one question the framework is built for: not "is this right?" but "what would have to be true, and which can I test cheaply?" That was enough for the skill to convert two camps' opinions into seven testable conditions, rate each one's confidence honestly, and sort them by how fast Mira could get an answer. No brief or structure was required of her.

## What happened next

Mira stopped the argument by changing the question on the table: the team was no longer debating the pivot, they were dividing up six cheap tests. She ran the two killer conditions first because they were both load-bearing and least certain - a week of clinic pricing calls and a day of market sizing. The pricing calls came back strong and the sizing came back marginal, which turned a yes-or-no fight into a sharper question about reachable share. She carried the ledger into a [premortem](../mira-launch-premortem/) on the scoped pivot, so the plan she eventually committed to was stress-tested from both directions before any code moved.
