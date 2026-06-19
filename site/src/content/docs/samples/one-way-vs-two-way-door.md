---
title: "One-Way vs Two-Way Door - quick sample"
description: Triaging how much process a database-migration decision deserves before any analysis begins, by testing reversibility.
sidebar:
  label: one-way-vs-two-way-door
---

> A compact worked example of [One-Way vs Two-Way Door](../../frameworks/think-one-way-vs-two-way-door/) on a realistic situation. For full end-to-end narratives see the [Showcase](../../showcase/); for the evidence behind the method see its [framework page](../../frameworks/think-one-way-vs-two-way-door/).

## Situation

Daniel's team runs a 200-person company's core service on a single managed Postgres instance that is starting to strain under write load. An architect has proposed sharding the primary table across tenants and moving tenant routing into the application layer. The team is split: some want to just do it next sprint, others want a quarter of design review. Before anyone argues the merits, Daniel wants to know how much process this choice actually deserves.

## Prompt

```text
/think-one-way-vs-two-way-door "We're considering sharding our core tenants table across multiple Postgres instances and moving tenant routing into the app layer. Some folks want to ship it next sprint, others want a full quarter of review. How much process does this decision actually warrant before we commit?"
```

## The artifact

> **Reversibility Classification**

## Decision being triaged

- **Decision:** Shard the core tenants table across multiple Postgres instances and move tenant routing into the application layer.

## Summary (top of the artifact)

One-way door. The data migration and the routing scheme are cheap to start but very hard to walk back once tenant data is physically split and the app encodes the sharding contract, so this earns full design rigor and senior sign-off before commit, not a next-sprint call. Route it next to an option comparison and a premortem.

## Reversibility test

| Dimension | Cost to walk it back | Reversible on this dimension? (Y / N / partial) |
|---|---|---|
| Money (spend / refunds / write-offs) | Extra instance and migration-tooling spend is real but modest; can be wound down if abandoned early | Y |
| Time (how long to undo) | Re-merging sharded tenant data and unwinding app-layer routing is a multi-week migration on its own, with downtime risk during the reversal | N |
| Trust / reputation (customers, market, team) | A botched shard or a reversal that corrupts or loses tenant rows burns customer trust hard and is hard to recover; internal trust in the platform team takes a hit too | N |
| Legal / contractual (commitments, regulation) | Tenant data-isolation and residency commitments in contracts constrain where shards can live; a reversal must preserve those guarantees | Partial |
| Path-dependence (future options foreclosed, learning sunk) | Once the app encodes the sharding contract, future schema changes, cross-tenant queries, and any later re-architecture all inherit it; the routing decision becomes load-bearing everywhere | N |

**Column notes:**

- The "we can just migrate back" framing is the convenient label this test exists to reject. The money comes back; the data movement, the encoded routing contract, and the trust hit from a failed reversal do not come back cheaply.

## Verdict

- **Classification:** One-way door.
- **For borderline cases - leans:** Not borderline. Spend is reversible, but time-to-undo, trust, and path-dependence are all one-way, and on a data-layer decision those dimensions dominate.

## Matched deliberation level

- **Who decides:** Eng lead plus the platform/architecture owner jointly, not the implementing team alone, with a data-safety reviewer in the loop.
- **How much analysis:** Full design review. Compare sharding against the alternatives (vertical scale-up, read replicas, table partitioning within one instance, no change yet) and validate the migration and rollback path before any production change.
- **Sign-off:** Architecture sign-off required before the migration touches production data; a tested, rehearsed rollback plan is a precondition, not a follow-up.
- **Next tool (one-way doors only):** `think-decision-option-review` to compare sharding against the scaling alternatives on weighted criteria, then `think-premortem` to stress-test the chosen migration before commit.
- **Why this level:** The decision is hard to reverse on time, trust, and path-dependence, so the cost of being wrong is high and durable. Moving fast here is a false economy. (Contrast: the choice of which load-testing tool to benchmark with first is a two-way door - let the team pick and swap it freely.)

> Evidence caveat (tier P, practitioner): the reversibility framing is internally coherent and targets a real pathology, but there is no controlled evidence that the two-bucket classification improves decision outcomes, speed, or quality, and reversibility is often misjudged. The value here is forcing the reversibility question explicit and matching effort to stakes, not guaranteeing a better outcome. See the [framework page](../../frameworks/think-one-way-vs-two-way-door/) for the full dossier.

## Why this framework fits

The cognitive job here is triage, not analysis: deciding how much machinery the choice deserves before the team burns a sprint arguing or a quarter over-deliberating. Unaided, the team would have defaulted to its loudest instinct (ship it, or review everything); the artifact gives Daniel a defensible reversibility verdict that routes the irreversible core decision to full rigor while explicitly licensing speed on the reversible sub-choices around it.
