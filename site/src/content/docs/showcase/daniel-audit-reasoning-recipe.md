---
title: "Daniel audits the reasoning in a proposal"
description: A senior engineer takes a convincing RFC that argues to adopt a new document datastore and runs the audit-reasoning recipe on it - first sorting evidence from inference, then mapping the argument structure to find the load-bearing claims and the unsupported leaps before sign-off.
sidebar:
  label: "Daniel -> audit recipe"
---

> **Daniel**, senior engineer at a ~200-person company. The decision: approve or reject an RFC that proposes migrating the primary relational store to a document datastore. Prompting style: organized.

Recipe: [audit-reasoning](../../recipes/audit-reasoning/), chaining Evidence-vs-Inference Sort then Argument Mapping. For the cast and the other journeys, see the [Showcase index](../).

## The situation

An RFC has circulated proposing the team migrate the primary store from Postgres to a document datastore, and it reads convincingly: clean prose, a confident conclusion, a few numbers. Daniel is a required sign-off, and a smooth memo is exactly when he slows down, because a fluent case can hide a broken inference as easily as a sound one. He wants to separate what the RFC actually observed from what it merely deduced, then see the argument's load-bearing joints laid bare before he approves a one-way migration.

## Step 1 - separate evidence from inference

**The prompt**

```
/think-evidence-vs-inference-sort

Sort the reasoning in this RFC before I sign off on it.

Proposed conclusion: "We should migrate the primary store from Postgres to a
document datastore (MongoDB) this quarter."

The RFC's claims, as written:
- "Our query latency is too high and Postgres can't scale with our growth."
- "A document model fits our data better - most of our reads are single-document
  by id, and we keep fighting the relational schema."
- "MongoDB will cut p95 read latency roughly in half."
- "Two teams we respect migrated off Postgres last year and are happy."
- "The migration is a one-quarter effort."

Constraints: this is a one-way door under our data volume; rollback after cutover
is effectively a second migration. I want the claims sorted - what's observed vs
inferred vs assumed - before we evaluate the argument itself.
```

A short structured block: the conclusion under audit, the RFC's claims quoted verbatim, and the constraint that makes the call expensive. He hands the framework the memo's claims, not a verdict.

**The artifact**

> **Evidence / Inference Ledger - RFC: migrate primary store to a document datastore**

## Subject

- **What was sorted:** the RFC proposing "We should migrate the primary store from Postgres to MongoDB this quarter," with its five supporting claims.

## Ledger

| # | Claim | Type | Basis or source | Confidence (inferences) | Flag |
|---|---|---|---|---|---|
| 1 | Query latency is too high | Evidence (claimed) | No dashboard, query, or threshold cited | - | uncited - "too high" against no stated target |
| 2 | Postgres cannot scale with our growth | Inference | Generalized from the latency complaint in claim 1 | low - no load test, no scaling ceiling identified | unexamined - treats a current symptom as an engine limit |
| 3 | Most reads are single-document by id | Evidence (verifiable) | Stated from the team's read patterns; checkable in query logs | - | uncited - plausible but not yet pulled from logs |
| 4 | A document model fits our data better | Inference | Deduced from claim 3 plus "fighting the schema" | medium - rests on claim 3 being true and on relations not mattering elsewhere | - |
| 5 | MongoDB will cut p95 read latency ~in half | Inference | Extrapolated; no benchmark on our data or workload | low - no comparable test cited | uncited - a specific number with no measurement behind it |
| 6 | Two respected teams migrated and are happy | Evidence (claimed) | Hearsay; their data shape, scale, and outcome not given | - | uncited - imitation, not a result for our workload |
| 7 | The migration is a one-quarter effort | Inference | Estimate; no dual-write, backfill, or cutover plan attached | low - no breakdown supports the duration | unexamined - load-bearing on the cost side of the decision |

## Load-bearing unknowns

The few unsupported or low-confidence claims that most need verification before the conclusion is trusted:

- **The latency cause (claims 1-2):** the whole case opens on "latency is too high," but no profile shows whether the slow path is the datastore or our own unindexed queries; verify by profiling the actual slow queries against a target p95 before blaming the engine.
- **The ~50% latency win (claim 5):** a precise number with no measurement; verify with a benchmark on our real read mix and data volume, not a vendor figure.
- **The relational dependency (claim 4):** "single-document reads" ignores the writes and reports that may still need joins/transactions; verify by auditing the cross-document and transactional paths a document store would not serve.
- **The one-quarter estimate (claim 7):** load-bearing on cost and unbacked; verify with a real dual-write + backfill + cutover plan before the duration is trusted.

---

*The sort did not verify a single fact. It exposed that the two pillars of the case - "Postgres can't scale" and "MongoDB halves latency" - are both low-confidence inferences wearing the register of measurement, and that the cheapest alternative (fix the queries on the current store) was never even named.*

## Step 2 - map the argument

The handoff carries forward the **load-bearing unknowns** from the ledger - the latency cause, the unmeasured 50% win, the unaudited relational dependency, and the unbacked one-quarter estimate. The sort told Daniel *which claims* are doing the heavy lifting; the map now shows *how they connect* into the contention, so he can see whether the structure actually holds once those props are pulled.

**The prompt**

```
/think-argument-mapping

Map the argument in the RFC so I can see whether it holds together, using the
sort I just ran.

Contention: "Migrate the primary store from Postgres to MongoDB this quarter."

Carry forward the load-bearing unknowns the sort flagged:
- the latency cause was never profiled (is it the datastore or our queries?)
- the "~50% latency cut" is an unmeasured inference
- "single-document reads" ignores the writes/reports that may still need joins
- the "one-quarter" effort estimate has no plan behind it

Lay out the reasons, the co-premises each silently needs, the strongest
objections, and flag the load-bearing-but-unsupported links.
```

**The artifact**

> **Argument Map - RFC: migrate the primary store to a document datastore**

## Contention

- Migrate the primary store from Postgres to MongoDB this quarter.

## Map

- **Reason 1:** Postgres cannot scale with our growth (current latency is too high).
  - *Co-premise (unstated):* The latency comes from a Postgres limit, not from our own unindexed queries or schema.
  - *Objection:* No profile was run, so the slow path is unknown; the same symptom is fully consistent with fixable queries on the current store. -> *Rebuttal:* None offered in the RFC.
- **Reason 2:** A document model fits our data better, because most reads are single-document by id.
  - *Co-premise (unstated):* Our writes and reporting paths do not need the joins, transactions, and constraints we would give up.
  - *Objection:* "Most reads" is not "all access"; the cross-document and transactional paths still have to live somewhere. -> *Rebuttal:* None; the RFC only counts reads.
- **Reason 3:** MongoDB will cut p95 read latency roughly in half.
  - *Co-premise (unstated):* The measured win on our workload and data volume matches the projected one.
  - *Objection:* The number has no benchmark behind it; it is a projection, not a result.
- **Reason 4:** Two respected teams migrated off Postgres and are happy.
  - *Co-premise (unstated):* Their data shape, scale, and access patterns resemble ours, so their outcome transfers.
  - *Objection:* Imitation is not an argument; their workload is unstated and may be nothing like ours.
- **Objection to the contention:** The latency problem may be a query/index problem on the current store, in which case the migration adds a one-way, one-quarter cost without fixing the cause - and the cheaper fix was never compared. -> *Rebuttal:* None offered in the RFC.

## Weak links and unsupported premises

| Link or premise | Problem | What it would need to hold |
|---|---|---|
| Co-premise of Reason 1 (latency is a Postgres limit) | Load-bearing and unsupported; the entire "must migrate" case rests on it, yet nothing was profiled | A profile showing the slow path is the datastore engine, not our queries or indexes, measured against a target p95 |
| Co-premise of Reason 3 (projected 50% win = real win) | A specific number with no measurement; the headline benefit is unverified | A benchmark on our real read mix and data volume reproducing the win |
| Co-premise of Reason 2 (no relational paths matter) | Counts reads only; silently assumes away the writes, reports, and transactions a document store would not serve | An audit of cross-document and transactional access showing none is load-bearing |
| Reason 4 -> contention | Imitation dressed as logic; assumes comparable workloads | Evidence the other teams' data and scale resemble ours and their migration actually paid off |
| Unaddressed objection (queries vs engine) | The argument never rules out the cheaper alternative explanation, which would void the whole migration | Data showing the engine, not fixable queries, drives the latency |

## Verdict

The structure is not yet valid. The contention follows only if the Reason-1 co-premise holds - that the latency is a Postgres limit rather than our own queries - and the RFC neither profiles that nor answers the objection that the cheaper query fix was never tried. The single most load-bearing claim is the unprofiled latency cause: if it is a query problem, every other reason collapses, because a migration would pay a one-way cost without touching the actual bottleneck. Reason 4 is imitation, not logic. The case is currently fluent but unsound; it needs the latency profile and the relational-path audit before it can be approved.

## Why the chain worked

The sort and the map did different jobs on the same memo, and the handoff is what made the second sharp. The ledger isolated the four claims doing the heavy lifting and labeled the two pillars as low-confidence inferences, so the map did not waste structure on the parts that were already sound - it went straight to wiring those load-bearing unknowns into the argument and testing whether the contention still followed once they were exposed. Sort first to find *which* claims carry the weight, map second to see *whether the weight is actually supported*: the chain turns a convincing memo into a short list of measurements that decide it.

## What happened next

Daniel did not reject the RFC; he replaced the debate with a gate. He took the verdict back to the author with two asks before sign-off: profile the slow queries against a target p95 to settle whether the bottleneck is the engine or our own indexes, and audit the transactional and reporting paths the "single-document reads" claim had quietly skipped. The profile came back showing two unindexed hot queries on the current store; fixing them recovered most of the p95 budget, and the migration was deferred rather than approved on a fluent case. When the next architecture proposal arrived with the same confident tone, he reached for the [advisor](../../tools/think-framework-advisor/) to sequence the right checks before reading a word of it.
