---
title: "Complexity Domain Sort - quick sample"
description: An explicitly-requested complexity domain sort run caveat-first - each part placed as a judgment, with a response posture and a concrete next action.
sidebar:
  label: complexity-domain-sort
---

:::caution[The Complexity Domain Sort is a contested lens]
This sort is descriptively named; the framework it derives from is Cynefin, a trademark of The Cynefin Co. (Dave Snowden, 1999). It is tier C (conceptual): no controlled study shows that classifying a problem this way improves decisions, and the 2021 PMC internal-medicine review found "scientific proof of its validity has yet to be provided." The dominant failure is the cargo cult - stopping at the label ("this is complex") instead of deciding. This sample runs it honestly: the caveat leads, each placement is a stated judgment, and every domain ends in a concrete next action. For cause decomposition prefer [issue trees](../../frameworks/think-issue-tree/); this fires only because the sort was asked for by name (explicit-request-only).
:::

> A compact worked example of [Complexity Domain Sort](../../frameworks/think-complexity-domain-sort/) on a realistic situation. For full end-to-end narratives see the [Showcase](../../showcase/); for the evidence behind the method see its [framework page](../../frameworks/think-complexity-domain-sort/).

## Situation

Daniel runs delivery for a mid-size logistics firm. The ops lead has asked for "a Cynefin sort on our peak-season plan" because half the team wants a detailed playbook and half wants to "just run experiments," and the argument is going in circles. Daniel knows the sort has a reputation for producing satisfying labels nobody acts on, so he wants it run with the discipline that ends in actions.

## Prompt

```text
/think-complexity-domain-sort "Ops asked for a Cynefin sort on our peak-season plan. Half want a full playbook, half want to experiment. Run it honestly and tell us what to actually do."
```

## The artifact

> **Evidence caveat (read first):** This sort is descriptively named; the framework it derives from is Cynefin, a trademark of The Cynefin Co. (Dave Snowden, 1999). It is tier C (conceptual); the 2021 PMC review found "scientific proof of its validity has yet to be provided." The placement is a judgment, not a fact. What follows is worth reading only because each domain ends in a concrete next action - the labels alone would not be.

### Situation

- Should the peak-season plan be a detailed playbook, a set of experiments, or some mix - and which parts are which?

### The sort

| Domain | Why here (and how confident) | Response posture | Concrete next action (the deliverable) |
|---|---|---|---|
| **Clear** | Warehouse staffing ramp is a known annual pattern with a working runbook. Confident. | sense - categorize - respond | Apply last year's staffing runbook; do not re-litigate it. |
| **Complicated** | Carrier capacity allocation needs expert routing analysis, but the answer is knowable. Confident. | sense - analyze - respond | Have the logistics analyst model carrier mix at projected volume before locking contracts. |
| **Complex** | How customers respond to a new same-day promise is coherent only in hindsight. Confident this is the contested part. | probe - sense - respond | Pilot same-day in two cities, instrument demand and cost, then decide on rollout. |
| **Chaotic** | A major carrier outage during peak would be chaotic, but it has not happened. | act - sense - respond | n/a now; pre-stage a fallback carrier so an outage can be stabilized fast. |
| **Confusion** | Whether the same-day demand is even large enough to matter is unplaced. | break it into parts you can place | Size the same-day demand signal before letting it drive the plan. |

### The danger to name

- The team's comfort zone is Complicated: they want one analysis-heavy playbook for everything. That default is wrong for the same-day promise, which is Complex - a playbook there manufactures false confidence where a two-city pilot gives a real signal.

### What to do next

- The argument dissolves once the parts are placed: run the known parts as playbooks (staffing runbook, carrier model), and run the same-day promise as a two-city probe rather than planning it upfront. Size the same-day demand first. The placement was right if the pilot tells you something no plan could. That pilot, not the label "this is complex," is where the decision turns.

## Why this framework fits

The ops lead asked for the sort by name, so a flat refusal would not help. Run caveat-first, the lens still earns its keep: placing the parts separately settles a circular "plan vs experiment" fight by showing it is both, naming the comfort-zone default as the trap, and turning each domain into an action - the runbook, the carrier model, and above all the two-city probe. Unaided, "do a Cynefin sort" produces the confident label dump the critics condemn; the disciplined version produces a decision.
