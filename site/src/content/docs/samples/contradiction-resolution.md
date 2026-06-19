---
title: "Contradiction Resolution (Ideal Final Result) - quick sample"
description: Contradiction Resolution applied to a fast-vs-safe database migration that had hardened into a forced either/or.
sidebar:
  label: contradiction-resolution
---

> A compact worked example of [Contradiction Resolution (Ideal Final Result)](../../frameworks/think-contradiction-resolution/) on a realistic situation. For full end-to-end narratives see the [Showcase](../../showcase/); for the evidence behind the method see its [framework page](../../frameworks/think-contradiction-resolution/).

## Situation

Daniel's team has to move a 400-million-row orders table to a new schema. The migration has to be safe, which the team reads as "take a maintenance window and run a single verified cutover," but it also has to be fast, meaning near-zero downtime because the orders service is the revenue path and an hour offline is unacceptable to the business. Every planning meeting collapses into the same argument: a long, safe window versus a risky online migration, and the team keeps trying to settle on how much downtime is "acceptable."

## Prompt

```
/think-contradiction-resolution "We have to migrate the orders table to a new schema. Safe says take a maintenance window and do one verified cutover; fast says near-zero downtime because orders is the revenue path. We keep arguing over how many minutes of downtime is acceptable and it feels like a forced trade-off. Is it?"
```

## The artifact

> **Contradiction-Resolution Worksheet**

## Problem under resolution

- **Problem as given:** "We have to migrate the orders table to a new schema. Safe says take a maintenance window and do one verified cutover; fast says near-zero downtime because orders is the revenue path. We keep arguing over how many minutes of downtime is acceptable and it feels like a forced trade-off. Is it?"
- **The user's actual goal:** Land the schema change on the orders table with full data integrity and without taking the revenue path offline.

## Summary (top of the artifact)

The team framed this as one dial - how long a downtime window to accept - where every minute toward "safe and verified" is a minute away from "fast and online." That is a physical contradiction: the migration must run with the service stopped (for a clean, verified cutover) and with the service running (for near-zero downtime) at the same time. Stating the Ideal Final Result ("the new schema is live and verified with no window in which orders cannot be taken") and running the separation principles dissolves it: **separate in time, and separate by condition.** Do the heavy, risky work (backfill and verification) online and ahead of time against a shadow copy that dual-writes, and reduce the actual cutover to a sub-second metadata flip. Safe and fast then apply to different phases rather than competing for one window. (Had the new and old schemas been impossible to dual-write - for example a destructive, irreversible column rewrite with no shadow representation - no such split would exist and the worksheet would have declared a real trade-off; see the exit note.)

## The contradiction

- **Opposing pair (A vs B):** to get more of **A: safety and verified integrity** (argues for a *stopped* service and a single careful cutover) we must accept less of **B: availability of the revenue path** (argues for a *running* service and near-zero downtime).
- **Type:** **Physical.** A single parameter - the *state of the orders service during the migration* - is required to be both stopped (so the cutover is clean and verifiable) and running (so orders keep flowing). That single-parameter, two-opposite-values shape is what makes the separation principles the right menu.
- **Why it has felt inevitable:** everyone pictured the migration as one atomic event - stop, transform, verify, start - so all the risk and all the work landed inside one window, and shortening the window meant cutting safety.

## Ideal Final Result (IFR)

The orders table is on the new schema, fully verified against the old data, and at no point is there a moment in which an order cannot be taken or is at risk of loss - the migration completes without the service ever needing to be unavailable, and without a human watching a window. (Note there is no "how" here: no maintenance window, no cutover script, no downtime budget - just the end-state, so the apparatus we assumed, the window itself, is exposed as optional.)

## Dissolution attempts

| Operator | Attempt (how the requirements might be separated) | Result |
|---|---|---|
| Separate in **time** | Run the slow, risky part - copy 400M rows and verify them - online and ahead of the cutover against a shadow table, then make the cutover itself trivially fast. | **Dissolves** - the verification that needs "safe" happens days early while the service runs; only a tiny, already-validated switch happens at cutover. |
| Separate in **space** | Migrate on a replica and promote it, keeping the primary serving reads. | Partial - removes read risk but the write path still needs a consistent cutover moment; helps, does not fully dissolve on its own. |
| Separate by **scale / system level** | Push the cutover down to the metadata level (a view or table-rename swap) rather than moving rows at switch time. | **Dissolves** - the switch becomes a sub-second metadata operation because the new rows already exist, so there is no window to argue about. |
| Separate by **condition** | Dual-write to old and new schema during the backfill, gated by a feature flag, so reads can be cut over per-segment and rolled back instantly. | **Dissolves** - "safe" (old path still authoritative, instant rollback) and "fast" (new path live) hold under different flag states at the same wall-clock time. |

## Outcome

- **Resolution (dissolved):** Separate in **time and by condition**, with the cutover pushed down a **system level**. Stand up the new-schema table, dual-write to both schemas behind a flag, and backfill plus verify the 400M rows online over days while the service keeps serving from the old schema. When verification passes, flip reads to the new schema per-segment behind the flag (instant rollback if a check fails), then retire the old writes with a sub-second metadata swap. The "safe vs fast" trade-off dissolves because safety now lives in the long online verification phase and speed lives in the metadata-only cutover - the two requirements no longer touch the same parameter, so there is no downtime window left to negotiate. The earlier argument ("how many minutes is acceptable?") was solving a contradiction that did not have to exist.

  > **Exit note (when this would NOT dissolve):** the resolution depends on the new and old schemas being able to coexist and dual-write. If the change were a destructive, irreversible in-place rewrite with no shadow representation - so the data physically cannot exist in both forms at once - there would be no time or condition axis to separate on, and none of the four principles would split the service-state parameter. The worksheet would then declare a **genuine trade-off** between integrity and availability and route it to `think-decision-option-review` to choose a deliberate downtime window under it - rather than manufacturing a separation the data model cannot support.

## Evidence caveat

> This worksheet tests whether the trade-off is real and often dissolves it. The method's evidence is practitioner-grade (tier P) and transferred from human engineering practice, and the classical contradiction matrix is contested; matrix prompts here are heuristics, not lookups.

## Why this framework fits

The skill's job here is to refuse the "how much downtime is acceptable" compromise and test whether the safe-vs-fast tension is real before settling it; naming the physical contradiction, stating an implementation-free ideal, and running the separation menu turned a one-window negotiation into a phased design where verification and cutover stop competing - an answer an unaided pass, anchored on splitting the difference, would not have reached.
