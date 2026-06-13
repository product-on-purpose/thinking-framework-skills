---
title: "Daniel maps the consequences of a migration"
description: A senior engineer maps the first, second, and third order effects of moving from a monolith deploy to per-service deploys, with an organized prompt, and gets a consequence map that flags the non-obvious downstream branches to act on.
sidebar:
  label: "Daniel -> futures wheel"
---

> **Daniel**, senior engineer at a ~200-person company. The decision: move the org from one monolithic deploy to independent per-service deploys. Prompting style: organized.

This is a complete run, prompt to artifact. Framework: [Futures Wheel](../../frameworks/think-futures-wheel/). For the cast and the other journeys, see the [Showcase index](../).

## The situation

The platform team has the green light to break the monolith's single deploy pipeline into per-service deploys so teams can ship independently. The first-order story is easy and everyone is already telling it: faster, more autonomous releases. Daniel's worry is the second- and third-order story nobody is mapping, the on-call load, the data-contract drift, the cost of running twelve pipelines instead of one. So he writes the change down and hands it to the framework before the rollout plan hardens.

## The prompt

```
/think-futures-wheel

Change: move from a single monolith deploy to independent per-service deploys
(~12 services), each team owning its own pipeline and release cadence.

Constraints: ~200-person org, 6 platform engineers, one shared Postgres today,
a single on-call rotation, releases currently gated by one staging environment.

Already considered: faster, more autonomous releases (the obvious first-order win).
What I want: the second- and third-order effects we are NOT talking about, across
on-call, data, cost, and team behavior, and which branches to actually act on
before rollout.
```

Organized, not casual: the change in one line, the constraints that shape the ripples, the first-order effect he has already named so the framework spends its effort past it, and an explicit ask for the downstream branches and which to act on.

## The output

> **Consequence Map (Futures Wheel) - Monolith deploy to per-service deploys**

## Center

- **Change / decision:** Replace the single monolith deploy pipeline with independent per-service deploys (~12 services, each team owning its cadence).

## Consequence map

- **First order: each team ships on its own cadence** (team)
  - Second order: release coordination moves from one pipeline to many human handoffs
    - Third order: cross-service features ship out of order, integration breaks surface in production not staging
  - Second order: "who deployed what when" is no longer answerable from one place
    - Third order: incident triage slows because the change that broke prod is harder to locate
- **First order: ~12 independent pipelines replace one** (technical)
  - Second order: CI/CD config, secrets, and deploy tooling fragment across teams
    - Third order: the 6-person platform team maintains 12 divergent pipelines, drift becomes the new toil
  - Second order: a shared "deploy the monolith" rollback no longer exists
    - Third order: partial-deploy states (service A new, service B old) become a normal failure mode nobody designed for
- **First order: services version and release independently** (technical)
  - Second order: API and event contracts between services can drift between releases
    - Third order: a backward-incompatible change ships before its consumer updates, silent data corruption or 500s in production
- **First order: one shared Postgres now has many independent deployers** (technical)
  - Second order: schema migrations are no longer serialized by a single pipeline
    - Third order: two services run conflicting migrations, or one ships a migration the other is not ready for, the shared DB becomes the un-decoupled coupling
- **First order: on-call ownership fragments by service** (team)
  - Second order: pressure to move from one rotation to per-team rotations
    - Third order: small teams owning a 24/7 rotation burn out or quietly route pages back to the platform team, re-centralizing what the migration tried to distribute
- **First order: infrastructure footprint grows per service** (financial)
  - Second order: each service wants its own staging/preview environment and runners
    - Third order: cloud and CI spend climbs roughly with service count, not with shipped value, until someone is asked why the bill grew
- **First order: teams gain release autonomy** (competitive / org)
  - Second order: shipping speed becomes uneven across teams
    - Third order: the slowest service gates every cross-cutting feature, the bottleneck moves rather than disappears

## Flagged branches (high-impact or non-obvious)

| Branch | Why it matters | Watch or do about it |
|---|---|---|
| Independent deploys -> contract drift -> incompatible change ships before its consumer | The decoupling that enables speed also removes the single pipeline that used to catch contract breaks, the failure is silent and lands in production | Add consumer-driven contract tests and a compatibility gate per service before rollout, not after the first incident |
| Many deployers -> un-serialized migrations -> shared Postgres conflicts | The "shared Postgres today" is the one thing per-service deploys do NOT decouple, it stays a single coupling point with many uncoordinated writers | Pick a migration-ownership model first (per-service schemas, or a serialized migration lane) before any team gets independent deploy rights |
| On-call fragments -> small teams own 24/7 -> pages route back, re-centralizing | A second-order people effect that quietly reverses the migration's intent without anyone deciding to | Decide the on-call model up front and staff for it, treat rotation design as part of the migration, not a follow-up |
| One pipeline -> twelve -> platform team maintains divergent toil | The 6 platform engineers absorb the hidden cost, drift across 12 pipelines becomes the new monolith | Ship a paved-path pipeline template + a small set of golden defaults so independence does not mean divergence |
| No monolith rollback -> partial-deploy states become normal | Nobody designed for "service A new, service B old", yet it is now the steady state during every multi-service change | Make partial-deploy and roll-forward/back per service an explicit, tested design requirement, define the safe ordering |

*Note: the value is the second- and third-order branches. A first-order-only view ("teams ship faster, good") misses that the same move can ship silent contract breaks, leave the shared database as an un-decoupled coupling, re-centralize on-call by accident, and convert one pipeline's toil into twelve. These are possible ripples to watch and design against, not predictions. This map feeds directly into the rollout plan and a per-branch owner list.*

## Why this prompt worked

Daniel named the **change** in one line, gave the **constraints** that actually shape the ripples (6 platform engineers, one shared Postgres, a single on-call rotation), and explicitly **retired the first-order win** so the framework would spend its effort downstream of it. That let the map skip the obvious "faster releases" branch and push into the second- and third-order effects, the un-serialized migrations, the re-centralizing on-call, the divergent-pipeline toil, that linear thinking and the rollout doc were both missing.

## What happened next

Daniel did not relitigate the migration; he made it survivable. Two flagged branches became gates rather than follow-ups: a migration-ownership model for the shared Postgres had to be chosen before any team got independent deploy rights, and a paved-path pipeline template had to exist before the second service onboarded. He pasted the consequence map into the rollout RFC, gave each flagged branch an owner, and added contract tests and an on-call staffing decision to the sequencing. Next in his thread: with the downstream risks mapped, he still had to choose between two rollout sequencings, so he handed the map to a decision skill, the consequence map's natural next step. When he is unsure which framework to reach for first, he describes the situation to the [framework advisor](../../tools/think-framework-advisor/) and runs the plan it returns.
