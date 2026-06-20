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

Daniel is a staff engineer at a 200-person company whose API gateway has started returning intermittent 503s under no obvious load pattern - a new class of failure the team has never seen, surfacing maybe twice a day with no reproduction and no clean trigger. The team has split: half want to write a fixed remediation runbook now so on-call has something to follow, half want to stop guessing and run safe-to-fail experiments against the live path. The ops lead, tired of the standoff, asked Daniel for "a Cynefin sort on this incident class" to settle which camp is right. Daniel knows the sort has a reputation for producing satisfying labels nobody acts on, so he wants it run with the discipline that ends in actions.

## Prompt

```text
/think-complexity-domain-sort "Ops asked for a Cynefin sort on a new class of intermittent 503s on the API gateway.
Situation: no reproduction, no clean trigger, ~2 events/day under no obvious load pattern.
Constraint: half the team wants a fixed runbook now, half want safe-to-fail experiments.
Tried so far: scaled the gateway tier (no change), grepped logs around each event (nothing consistent).
Run it honestly and tell us what to actually do, not just which box we're in."
```

## The artifact

> **Evidence caveat (read first):** This sort is descriptively named; the framework it derives from is Cynefin, a trademark of The Cynefin Co. (Dave Snowden, 1999). It is tier C (conceptual); the 2021 PMC review found "scientific proof of its validity has yet to be provided." The placement is a judgment, not a fact. What follows is worth reading only because each domain ends in a concrete next action - the labels alone would not be.

### Situation

- Is this new class of intermittent 503s something to handle with a fixed runbook, with safe-to-fail experiments, or a mix - and which parts are which?

### The sort

| Domain | Why here (and how confident) | Response posture | Concrete next action (the deliverable) |
|---|---|---|---|
| **Clear** | On-call hygiene during a 503 spike (page the right owner, check the gateway dashboard, capture a trace) is a known, runnable checklist. Confident. | sense - categorize - respond | Write the short triage checklist the runbook camp wants - but only for the known response steps, not for the cause. |
| **Complicated** | "Did scaling the tier or a recent config change move the rate?" is knowable with expert analysis of the metrics. Confident. | sense - analyze - respond | Have the gateway owner diff config and capacity changes against the 503 timeline before anyone theorizes further. |
| **Complex** | The root cause itself - intermittent, no reproduction, no clean trigger under no obvious load - is coherent only in hindsight. Confident this is the contested core. | probe - sense - respond | Run a safe-to-fail probe: add high-cardinality tracing on the gateway path, force one controlled fault (e.g. throttle one upstream), watch whether the signature changes. |
| **Chaotic** | A full gateway outage cascading across services would be chaotic, but the current failure is intermittent, not a meltdown. | act - sense - respond | n/a now; pre-write the "shed load and fail open" stabilizing action so a cascade can be contained fast if it escalates. |
| **Confusion** | Whether the 503s are even one failure class or several unrelated faults lumped together is unplaced. | break it into parts you can place | Cluster the existing 503 events by route and upstream first; confirm it is one class before treating it as one. |

### The danger to name

- The team's comfort zone is the runbook (Clear/Complicated): a documented remediation feels like progress. That default is wrong for the root cause, which is Complex - a runbook there codifies a guess as procedure and gives on-call false confidence, where a tracing-and-fault probe gives a real signal about what is actually firing.

### What to do next

- The standoff dissolves once the parts are placed: write the runbook camp's checklist for the known response steps (triage hygiene, the config/capacity diff), and treat the root cause as a Complex probe rather than a procedure - instrument the path and force one controlled fault. Confirm it is one failure class first. The placement was right if the probe reveals a signature no runbook could have predicted. That probe, not the label "this is complex," is where the decision turns.

## Why this framework fits

The ops lead asked for the sort by name, so a flat refusal would not help. Run caveat-first, the lens still earns its keep: placing the parts separately settles a circular "runbook vs experiment" fight by showing it is both, naming the comfort-zone default as the trap, and turning each domain into an action - the triage checklist, the config diff, and above all the safe-to-fail tracing probe. Unaided, "do a Cynefin sort" produces the confident label dump the critics condemn; the disciplined version produces a decision.
