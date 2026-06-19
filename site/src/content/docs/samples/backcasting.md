---
title: "Backcasting - quick sample"
description: Backcasting on a realistic situation - a senior engineer maps the route back from a fully decomposed monolith to the next step today.
sidebar:
  label: backcasting
---

> A compact worked example of [Backcasting](../../frameworks/think-backcasting/) on a realistic situation. For full end-to-end narratives see the [Showcase](../../showcase/); for the evidence behind the method see its [framework page](../../frameworks/think-backcasting/).

## Situation

Daniel is a staff engineer at a 200-person company whose core billing logic lives inside a 9-year-old monolith. Leadership has committed to extracting billing into its own service so two teams can ship independently and an upcoming enterprise contract's audit requirements can be met. Forward planning keeps producing a timid roadmap that just chips at the edges of the current schema, and Daniel wants the route mapped back from the actual end state so the real first move is obvious.

## Prompt

```text
/think-backcasting "We've committed to pulling billing out of the monolith into its own service - this is decided, not up for debate. Goal is roughly 12 months out. Map it backward from 'billing is a standalone service' to what I should actually do first, because our forward roadmap just keeps nibbling at the existing schema."
```

## The artifact

## Goal under backcast

- **Desired future state:** It is 12 months from now. Billing runs as a standalone service with its own datastore and API. The monolith calls it over a versioned interface and holds no billing logic or billing tables. Two teams deploy billing and the monolith independently, and the service emits the immutable audit log the enterprise contract requires.
- **Horizon:** 12 months from now.
- **Goal status:** Chosen and validated. The decision to extract billing was made upstream and weighed against keeping it in-monolith; this backcast maps the route to it and does not re-open it.

## Success conditions (what is true in that future)

- All billing reads and writes go through the billing service API; the monolith contains no direct billing-table access.
- Billing and the monolith deploy on independent pipelines, with no shared release train.
- The billing service owns its datastore; no other service reads its tables directly.
- Every billing state change emits an append-only, queryable audit event that satisfies the enterprise audit requirement.

## Summary (top of the artifact)

The desired future is a standalone billing service that owns its data, deploys independently, and emits an audit log the monolith never could. Working backward, the path turns on three milestones: a **fully cut-over service that owns all billing reads and writes** (B-1), which requires the **service running in production behind a dual-write-and-shadow-read bridge so traffic moves with a rollback** (B-2), which requires a **clean billing domain boundary and a stable interface contract extracted from the monolith before any service is built** (B-3). The single most important next move now is to instrument the monolith to map every current caller of billing logic and tables, because the interface contract in B-3 cannot be drawn honestly without that real call map and every later milestone depends on it.

## Backcast path (future -> now)

Ordered backward: row 1 is closest to the goal, the last row is the next step today. Each milestone names the preconditions that had to be true just before it.

| Step (back) | Milestone (state reached) | Preconditions that had to be true first | Depends on | Owner |
|---|---|---|---|---|
| Future | Billing is a standalone service: owns its data, deploys independently, emits the required audit log | - | - | - |
| B-1 | Full cut-over complete: service is the source of truth for all billing reads and writes; monolith billing tables retired | Shadow reads matched the monolith for a sustained burn-in window; dual writes reconciled to zero drift; rollback path exercised and then retired | B-2 | Daniel (billing tech lead) |
| B-2 | Service live in production behind a dual-write and shadow-read bridge; no user-visible behavior change | Service deployed with its own datastore and pipeline; bridge dual-writes both stores and shadow-reads for comparison; the audit event stream is emitting and queryable | B-3 | Billing team + Daniel |
| B-3 | Billing domain boundary and a stable interface contract extracted from the monolith, agreed before any service build | A complete map of every caller of billing logic and tables; an agreed API contract and data-ownership line; the entangled cross-domain reads that block extraction identified and a de-tangling plan signed off | B-4 | Daniel + monolith owners |
| B-4 | Team, ownership, and the audit requirement made explicit and committed | A named billing team and on-call owner; the enterprise audit spec translated into concrete event requirements; the 12-month goal and its success conditions agreed with leadership | Now | Eng director |
| Now | **Next concrete step (do now):** instrument the monolith to log every read and write of billing logic and tables, and produce the caller map | The monolith's request logging and a one-sprint instrumentation pass are available today; no new infrastructure is needed to start | - | Daniel |

**Column notes:**
- **Preconditions that had to be true first:** the load-bearing column. Note that B-2 cannot start until B-3's interface contract and de-tangling plan exist, which is why a forward roadmap that began with "stand up the new service" would invert the real dependency and discover the entangled reads mid-migration.
- **Depends on:** each milestone points to the earlier (lower) milestone that produces its preconditions; the chain closes only because B-4 lands on an action available now.

## Open gaps and assumptions

- **Assumes the goal is right.** This backcast does not test whether extracting billing is the correct call; that was decided upstream. If it is wrong, this is a confident route to the wrong place.
- **Open gap:** B-3 assumes the cross-domain reads into billing tables can be cleanly de-tangled, but the depth of that entanglement is unknown until the B-4-to-now caller map exists - flagged so it is fixed, not buried. If the entanglement is deeper than expected, B-3 grows and the horizon slips.
- **Sequencing risk:** the real starting constraint is the call map and interface contract, not the service build; if the team's instinct is to start writing the new service first, the path will stall when an unmapped caller surfaces after cut-over begins.
- The path is a plausible route, not a forecast. Backcasting builds a structured hypothesis, not a guarantee that the future arrives in this order; revise the chain as milestones land or slip.

## Why this framework fits

Backcasting does the job a forward roadmap could not here: by fixing the standalone-service end state and reasoning backward, it surfaces that the caller map and interface contract (B-3) are the true first constraint, not the service build the team's instinct reaches for. The artifact gives Daniel an ordered chain with named preconditions and dependencies that turns a 12-month aspiration into a concrete next sprint, and exposes the entanglement risk before it can derail a half-finished migration.
