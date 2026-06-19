---
title: "Morphological Analysis - quick sample"
description: Morphological Analysis mapping the design space of a new telemetry pipeline before a team defaults to the obvious build.
sidebar:
  label: morphological-analysis
---

> A compact worked example of [Morphological Analysis](../../frameworks/think-morphological-analysis/) on a realistic situation. For full end-to-end narratives see the [Showcase](../../showcase/); for the evidence behind the method see its [framework page](../../frameworks/think-morphological-analysis/).

## Situation

Daniel's team at a 200-person company is replacing an aging, hand-rolled telemetry path that drops events under load. Everyone has quietly assumed the answer is "ship the SDK straight to a managed SaaS backend" because that is what the last team did. Before anyone writes a design doc, Daniel wants the whole design space laid out so the team picks a shape on purpose rather than re-defaulting to the familiar one.

## Prompt

```
/think-morphological-analysis "We're rebuilding our telemetry pipeline. A full design has to take a position on how the app emits events, how they're transported, where they're stored/queried, and what backend owns it. Everyone's assuming SDK -> managed SaaS. Map the space and prune to the internally consistent shapes before we commit."
```

## The artifact

> **Morphological Field (Zwicky Box)**

> The box GENERATES and prunes for consistency. It does NOT rank configurations by value. Do not pick a "winner" here; hand the surviving configurations to a separate evaluation step (for example `think-decision-option-review`).

---

## Focal problem

- **What is being configured:** the shape of the replacement telemetry pipeline - how events are emitted, moved, stored, and owned - not whether to replace the old one.
- **What a complete solution must specify:** how the application emits events (the instrumentation surface), how those events are transported off the host (the transport), where they land for storage and query (the storage/query layer), and who operates the backend (the ownership model).
- **Why a field and not a single answer:** the pipeline genuinely factorizes into these four semi-independent dimensions, and the team keeps defaulting to one familiar combination ("vendor SDK, direct push, managed SaaS columnar store, fully vendor-operated"). Laying out the space forces the unobvious corners into view before a design doc locks one in.

## Parameters (the independent dimensions)

| Parameter | Why it is a real, independent dimension |
|---|---|
| **P1: Instrumentation surface (how the app emits)** | The boundary where application code produces telemetry; orthogonal to how events later travel or where they rest. The same code can emit via a vendor SDK or an open standard. |
| **P2: Transport (how events leave the host)** | How emitted events get off the machine and to storage; independent of what produced them and where they end up. Direct push, a local agent, or a durable queue are all pluggable under any emitter. |
| **P3: Storage and query layer (where events land)** | The store that holds events and answers queries; independent of emission and transport. A given transport can feed a columnar warehouse, a time-series store, or object storage plus a query engine. |
| **P4: Ownership model (who operates the backend)** | Who runs and is on call for the storage/query layer; a cost-control-and-responsibility axis orthogonal to the technical shape above it. |

(Keep these genuinely independent and few. Adding parameters to feel thorough multiplies the space toward the unmanageable.)

## The morphological field (the box)

| P1: Instrumentation surface | P2: Transport | P3: Storage and query layer | P4: Ownership model |
|---|---|---|---|
| Vendor SDK (proprietary) | Direct push from app | Managed columnar SaaS | Fully vendor-operated |
| OpenTelemetry (open standard) | Local collector/agent | Self-hosted time-series store | Self-hosted on our infra |
| In-house thin client | Durable queue (Kafka/Kinesis) | Object storage + query engine | Hybrid (vendor query over our storage) |

- **Raw configuration count:** 3 x 3 x 3 x 3 = **81** full configurations before pruning.

## Cross-consistency assessment (the reduction step)

Incompatible value pairs (cannot coexist in a sensible pipeline) and why:

| Value | Incompatible with | Why they cannot coexist |
|---|---|---|
| P1: Vendor SDK (proprietary) | P3: Object storage + query engine | A proprietary SDK emits into the vendor's own ingestion/format; it has no path to write to neutral object storage you query yourself. |
| P1: Vendor SDK (proprietary) | P4: Self-hosted on our infra | The vendor SDK assumes the vendor's backend; you cannot self-host a backend you do not control the format or ingestion of. |
| P2: Direct push from app | P3: Object storage + query engine | A raw object store has no ingestion endpoint; landing events there needs a collector or queue to batch and write files, so direct push has nothing to push to. |
| P2: Durable queue (Kafka/Kinesis) | P4: Fully vendor-operated | A fully vendor-operated backend ingests directly; standing up and operating your own Kafka/Kinesis contradicts "the vendor operates everything." |
| P3: Managed columnar SaaS | P4: Self-hosted on our infra | "Managed SaaS" means the vendor runs it; you cannot simultaneously self-host that same managed store. |
| P3: Self-hosted time-series store | P4: Fully vendor-operated | If you stand up and run the time-series store yourself, the backend is by definition not fully vendor-operated. |

(Note how the cross-consistency pass does real work here: the proprietary vendor SDK is incompatible with two of the other columns' values, and the ownership axis conflicts with two storage values - which collapses a large share of the 81.)

## Internally consistent configurations (the pruned set)

Surviving configurations (one value per parameter, no incompatible pair). Showing the representative residual after exclusion:

| # | P1 Surface | P2 Transport | P3 Storage/query | P4 Ownership | Note (what kind of pipeline this is) |
|---|---|---|---|---|---|
| C1 | Vendor SDK | Direct push from app | Managed columnar SaaS | Fully vendor-operated | The familiar default - turnkey vendor pipeline. |
| C2 | OpenTelemetry | Local collector/agent | Managed columnar SaaS | Hybrid (vendor query over our storage) | Open emit, vendor-backed query - portable but managed. |
| C3 | OpenTelemetry | Local collector/agent | Self-hosted time-series store | Self-hosted on our infra | Fully open, fully self-operated - no vendor lock-in. |
| C4 | OpenTelemetry | Durable queue (Kafka/Kinesis) | Object storage + query engine | Self-hosted on our infra | The unobvious corner - queue-buffered, cheap object storage, query-on-read. |
| C5 | In-house thin client | Local collector/agent | Self-hosted time-series store | Self-hosted on our infra | Minimal custom emitter feeding an owned store. |
| C6 | In-house thin client | Durable queue (Kafka/Kinesis) | Object storage + query engine | Self-hosted on our infra | Custom emit, durable buffer, lake-style storage - maximum control. |

- **Pruned count vs raw:** the cross-consistency pass removes the large majority of the 81 raw configurations; roughly a dozen survive as internally coherent, of which the six above (C1-C6) are the meaningfully distinct families.
- **Unobvious corners surfaced:** **C4** (OpenTelemetry emit, durable queue, object storage plus a query engine, self-hosted) is a coherent shape the SDK-to-SaaS default would never reach - it trades managed convenience for a durable buffer that solves the original drop-under-load problem at low storage cost.

## Hand-off (not a ranking)

These six consistent configurations (C1-C6) are the candidate set, not a recommendation. The field has done its job: it took the 81-cell space, struck the internally incompatible combinations, and surfaced both the familiar default (C1) and an unobvious-but-coherent corner (C4). Scoring them against the team's criteria - ingestion durability under load, query latency, run cost, on-call burden, lock-in risk - is the separate downstream step (`think-decision-option-review`). Morphological analysis chooses none of them.

*Evidence caveat: morphological analysis is a practitioner-grade (tier P) coverage-and-consistency aid, not a guaranteed exhaustive search. The controlled studies cover the lighter morphological chart, results are mixed, and in practice designers explore only a fraction of the space; the parameterization is only as good as the analyst, and the box does not evaluate. See the [framework page](../../frameworks/think-morphological-analysis/).*

## Why this framework fits

The pipeline is a true configuration - a position on each of four semi-independent axes - and the team was about to re-default to one familiar combination without seeing the rest. The field lays out all 81, prunes to the internally consistent shapes, and surfaces a durable queue-plus-object-storage corner (C4) that directly answers the drop-under-load problem and that unaided forward search from the SDK-to-SaaS default would never have reached.
