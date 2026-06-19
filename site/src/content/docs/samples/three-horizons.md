---
title: "Three Horizons - quick sample"
description: Three Horizons mapping a platform team's drift from a shared monolith toward an internal developer platform.
sidebar:
  label: three-horizons
---

> A compact worked example of [Three Horizons](../../frameworks/think-three-horizons/) on a realistic situation. For full end-to-end narratives see the [Showcase](../../showcase/); for the evidence behind the method see its [framework page](../../frameworks/think-three-horizons/).

## Situation

Daniel is a staff engineer on the platform team at a ~200-person company. The org runs on a shared Rails monolith that every product team deploys into, and it is straining: deploys queue behind each other, one team's slow migration stalls everyone, and on-call pages cross team boundaries nobody owns. Leadership keeps framing it as "stabilize the monolith" versus "rewrite everything as microservices," and the two camps are talking past each other in every architecture review.

## Prompt

```
/think-three-horizons "Our shared Rails monolith is buckling - coupled deploys, cross-team
pages, slow migrations blocking everyone. Leadership has us stuck between 'just harden the
monolith' and 'go full microservices.' I'm on the platform team and I want to map the actual
transition, not pick a side in that binary. What carries us forward versus what just props
up the monolith?"
```

## The artifact

# Three-Horizons Transition Map

> The axis is **degree of transformation**, not calendar time. Do NOT equate H3 with "5+ years out" or H1 with "now"; an H3 disruption can ship as fast as an H1 product. The map is a shared orientation for dialogue, not a forecast and not a defended decision. The three horizons need different metrics - do not apply H1 governance to H2 or H3 work.

---

## System in transition and actor

- **System / domain in transition:** how the engineering org ships software - the shift from a single shared monolith that every team deploys into toward an internal developer platform of independently owned, independently deployable services.
- **Actor (vantage point):** Daniel and the platform team, who own the shared build/deploy substrate and are deciding where to put their capacity.
- **Axis reminder:** H1, H2, and H3 below are degrees of transformation away from the current "one shared monolith" logic, NOT time bands. The H3 future could land fast or slow; the first self-service service template could ship next sprint.

## H1 - the declining present (dominant now, losing fit)

- **The dominant system today:** one Rails monolith. Every product team writes into the same codebase, shares one deploy pipeline, one database, and one on-call rotation for the shared core. This is how the company ships today, and it has carried it from 10 engineers to 200.
- **What is failing in it / losing fit:** coupled deploys serialize the whole org behind the slowest change; a single team's long migration blocks everyone else's releases; production pages cross team boundaries that nobody clearly owns; and onboarding a new engineer means learning the entire monolith before they can ship anything safely. The core still runs the business, but its single-shared-surface logic fits the org worse every quarter as headcount and team count grow.

## H3 - the emerging desired future (faint now, growing)

- **The desired future system:** an internal developer platform where each team owns one or more independently deployable services behind clear contracts, ships on its own cadence without coordinating with everyone else, owns its own on-call surface, and self-serves new services from a paved-road template. The platform team's job changes from gatekeeping one shared pipeline to providing paved roads. This is a different operating logic, not a faster monolith.
- **Pockets of the future in the present:** the billing service was already extracted last year and now deploys on its own cadence without touching the monolith pipeline; one team runs its own on-call for a service it fully owns; a paved-road scaffold script that stands up a new service with logging, metrics, and CI baked in already exists and two teams have used it. These are H3 already alive inside H1.

## H2 - the contested transition zone (the messy middle, read in two directions)

The moves available to bridge the shared monolith and the team-owned platform future - classified by which horizon each actually serves. A move can look like progress and still be H2-minus.

| H2 move (disruption / venture / innovation) | Classification | Why it serves that horizon |
|---|---|---|
| Extract the two highest-traffic, clearly-bounded domains into team-owned services behind the paved-road template, with their own deploy + on-call | **H2-plus** (carries H3) | Grows the "team-owned, independently deployable" seed directly and proves the paved road on real load; each extraction shrinks the shared surface. |
| Carve the monolith into namespaced modules but keep one shared deploy pipeline and one shared on-call ("modular monolith, ship together") | **H2-minus** (captured by H1) | Looks like decomposition but preserves the coupled-deploy and shared-ownership logic that is the actual H1 failure; tidier code, same blocking. |
| Build the paved-road service template into a real self-service platform (one command to a production-ready service: CI, observability, secrets, runbook) | **H2-plus** (carries H3) | Turns the one-off scaffold script into the H3 acquisition engine - teams can leave the monolith without the platform team hand-holding each migration. |
| Add more environments and a heavier release-coordination process to make the shared monolith deploy "safer" | **H2-minus** (captured by H1) | Invests in making the single shared pipeline more elaborate; entrenches the coordination tax instead of removing the need to coordinate. |
| Stand up shared platform primitives (auth, eventing, service discovery) that any extracted service can adopt | **H2-plus** (carries H3) | Lowers the cost of being a standalone service, so extraction stops being all-or-nothing; keeps the path to many team-owned services open. |

- **H2-plus moves (genuinely carry the H3 future):** extracting bounded domains into team-owned services on the paved road; building the service template into a real self-service platform; standing up shared primitives that make standalone services cheap.
- **H2-minus moves (captured by H1):** a modular monolith that still ships together on one pipeline; more release-coordination ceremony to make the shared deploy "safer." Both feel like engineering progress and quietly re-entrench the coupled-shipping logic that is failing.

## The actor located on the canvas

- **Where the actor is standing:** the platform team is standing in H1 - it owns and runs the shared monolith pipeline, and that is where its mandate, its tickets, and its reputation currently live - while it has built genuine H3 seeds (the paved-road script, the billing extraction) on the side.
- **Where attention and energy actually go right now:** almost all of the team's day goes to keeping the shared H1 pipeline alive - unblocking stuck deploys, firefighting cross-team pages, adding the next bit of release coordination. The paved-road platform work is real but happens in the cracks. The mismatch to name: Daniel and the team *say* the future is team-owned services, but their staffing, their on-call load, and their roadmap weight all flow to hardening the shared pipeline - which is exactly the gravity that turns "let's decompose" into the H2-minus modular monolith that ships together.

## Governance implication (orientation note, not a decision)

The three horizons need different metrics, and the sharpest point on this map is that the platform team is at risk of governing its H2 platform bet with H1 rules. If the paved-road and extraction work is judged by H1 metrics - shared-pipeline uptime, this quarter's deploy throughput, monolith page count - it will lose every time to the urgent work of keeping the monolith breathing, and the H2-plus moves will look like distractions. The H2-plus scorecard is different: number of services successfully self-served off the template, teams that own their own deploy and on-call, monolith surface area shrinking. The dialogue this map should open is not "monolith versus microservices" but "are we willing to protect platform capacity and measure it on different metrics than the shared pipeline, so the paved road actually gets built before the H1 gravity well swallows it." That is an orientation for the team's conversation, not a recommendation this map makes for them.

## Evidence caveat

> This map is a sensemaking scaffold that surfaces transition dynamics. The method's evidence is tier C (conceptual, transferred from human facilitation practice); it is not a foresight or outcome method, and the map is not a forecast.

## Why this framework fits

Three Horizons does the cognitive job of breaking the monolith-versus-microservices binary into three simultaneous curves and forcing the H2-plus / H2-minus read, so a move that looks like decomposition (the modular monolith that still ships together) gets named as H1 capture rather than progress. Unaided, the team would keep arguing about the endpoint; the map instead shows where their energy actually flows and which transition moves carry the future.
