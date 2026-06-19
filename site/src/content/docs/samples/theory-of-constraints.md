---
title: "Theory of Constraints - quick sample"
description: Theory of Constraints on a CI/CD pipeline where merges stall and the team is about to optimize every stage at once.
sidebar:
  label: theory-of-constraints
---

> A compact worked example of [Theory of Constraints](../../frameworks/think-theory-of-constraints/) on a realistic situation. For full end-to-end narratives see the [Showcase](../../showcase/); for the evidence behind the method see its [framework page](../../frameworks/think-theory-of-constraints/).

## Situation

Daniel's platform team owns the CI/CD pipeline for a 200-engineer monolith. A pull request takes about 95 minutes from "ready to merge" to "deployed", the merge queue is backed up most afternoons, and developers are idle waiting on green checks. Leadership has approved a quarter of work and the team is about to split it four ways: faster Docker builds, a bigger artifact cache, parallelized linting, and a rewrite of the flaky integration suite. Daniel wants to know where the time actually goes before that effort scatters.

## Prompt

```text
/think-theory-of-constraints "Our CI/CD pipeline is the bottleneck. PRs take ~95 min from ready-to-merge to deployed and the merge queue backs up every afternoon. We have a quarter approved and we're about to spread it across faster builds, a bigger cache, parallel lint, and rewriting the integration tests. Here are rough per-stage timings: lint ~6 min, unit tests ~9 min, Docker build ~12 min (cached) / 28 min (cold), integration tests ~40 min on 2 runners, deploy ~8 min. Where do we actually unblock throughput before we scatter the quarter?"
```

## The artifact

# Constraint-Intervention Plan

## Problem under analysis

- **Problem as given:** "Our CI/CD pipeline is the bottleneck. PRs take ~95 min from ready-to-merge to deployed and the merge queue backs up every afternoon. We have a quarter approved and we're about to spread it across faster builds, a bigger cache, parallel lint, and rewriting the integration tests. Where do we actually unblock throughput before we scatter the quarter?"
- **The user's actual goal:** Get more merged PRs through to production per hour - and shrink the afternoon queue - by aiming the approved quarter at the one stage that caps pipeline throughput, instead of spreading it across four stages at once.

## Summary (top of the artifact)

The merge-to-deploy pipeline is a clear flow, and the team is about to fund four stages in parallel. The capacity-versus-demand table singles out one binding constraint: the **integration test stage**, which runs about 40 minutes on 2 shared runners and clears roughly 3 PRs per hour against the 5-6 that arrive at peak - while deploy sits idle waiting. The plan is to **exploit** that stage before spending (split the suite so only impacted tests run per PR, quarantine the flaky tests that force reruns, and stop integration runs on draft and docs-only PRs) and only **elevate** (add runners) if it still binds afterward. Funding faster builds, a bigger cache, and parallel lint would have poured the quarter into stages that are already starved or idle and changed throughput by almost nothing. The plan also flags that exploiting integration will likely move the constraint to the Docker build stage on cold-cache runs.

## System / flow

A PR that is ready to merge passes through, in order:

1. **Lint** - style and static checks run on the diff.
2. **Unit tests** - the unit suite runs.
3. **Docker build** - the service image is built and pushed.
4. **Integration tests** - the cross-service suite runs against a spun-up environment on shared runners.
5. **Deploy** - the merged commit is rolled out to production.

## Capacity vs demand per step

| Step | Capacity (per unit time) | Demand placed on it | Starved or saturated? |
|---|---|---|---|
| Lint | ~10 PRs/hr (6 min, runs concurrently) | ~5-6 PRs/hr at peak | Matched (under-loaded) |
| Unit tests | ~6-7 PRs/hr (9 min, parallel shards) | ~5-6 PRs/hr at peak | Matched, slight queue |
| Docker build | ~5 PRs/hr warm (12 min) / ~2 PRs/hr cold (28 min) | ~5-6 PRs/hr at peak | Saturated only on cold-cache runs |
| **Integration tests** | **~3 PRs/hr (40 min, 2 runners, reruns on flake)** | **~5-6 PRs/hr at peak** | **Saturated - the merge queue builds here** |
| Deploy | ~7 PRs/hr (8 min) | ~3 PRs/hr (only what clears integration) | Starved (idle, waiting) |

Demand meets or exceeds capacity decisively at integration tests (5-6 arriving, ~3 cleared). Deploy downstream sits starved, idle while the merge queue in front of integration grows - the signature of the binding constraint. The Docker build, the loudest target ("our builds are slow"), only saturates on cold-cache runs and is otherwise matched; it is not the system constraint.

## Binding constraint (hypothesis)

- **The constraint:** the **integration test stage** (step 4).
- **Evidence it binds:** it is the one step where demand (~5-6 PRs/hr) exceeds capacity (~3 PRs/hr); the deploy step after it is starved and idle, waiting on green integration runs; the afternoon merge queue and the bulk of the 95-minute lead time are time spent waiting for a runner and re-running flaky tests at this stage. Faster builds and parallel lint act on steps that are already matched or under-loaded.
- **If unproven:** here the table singles out one step cleanly, so the analysis proceeds. (Had both Docker build and integration been saturated with deploy starved between them, the plan would have declared the constraint unproven and stopped before exploit.)

## Exploit (before any spend)

Get maximum throughput from the existing 2 integration runners before adding hardware:

- **Run only the tests a PR can affect.** Map test suites to code paths and run the impacted subset per PR instead of the full suite every time. Most PRs touch one service; full cross-service runs should be the exception, not the default.
- **Quarantine the flaky tests.** A large share of runtime is reruns triggered by known-flaky tests. Move them to a non-blocking lane immediately, so a flake never re-occupies a runner in the blocking path.
- **Stop integration runs on draft and docs-only PRs.** Gate the stage so work that cannot break integration never enters the queue, removing demand the constraint should never have seen.
- **Reset the test environment in parallel, not inline.** If runners sit idle tearing down and spinning up environments between PRs, pre-warm a pool so a runner starts testing the moment it frees up.

## Subordinate (everything else)

- Run lint, unit tests, Docker build, and deploy at the **pace the integration stage can absorb**, not flat-out. There is no value in shaving 3 minutes off the Docker build or running lint faster while PRs sit in the integration queue - it only moves the wait earlier and piles more inventory in front of integration.
- **Local-efficiency habits to give up:** stop measuring the build and lint stages on their own wall-clock time as if it were the headline metric (a faster non-constraint is not faster delivery while integration caps it); pause the "bigger artifact cache" and "parallel lint" initiatives - they act on stages that are already matched or starved and cannot lift system throughput.

## Elevate (only if still binding after exploit)

Only if integration is *still* the binding constraint after the exploit moves above:

- Add a third and fourth integration runner, raising clearance capacity.
- Invest in making the integration environment cheaper to spin up so more runs fit on the same hardware.

Do not start here. If running only impacted tests and quarantining flakes cuts integration demand to within the existing 2 runners, no new runners are needed and the spend is avoided.

## Re-check trigger

Once integration is exploited (impacted-tests-only plus flake quarantine), the constraint will likely **move to the Docker build stage on cold-cache runs** (capacity ~2 PRs/hr cold), which becomes the new rate-limiter as more PRs reach it per hour. Trigger: when the integration queue stops growing and PRs start backing up waiting on cold builds, return to identify and re-run capacity versus demand. Do not keep adding integration runners out of inertia once integration is no longer the binding step.

---

*Evidence caveat: the bottleneck principle is operationally well-backed (Mabin and Balderstone's review of 80-plus applications; a systematic review of 42 healthcare implementations) but has no controlled trial of this specific cognitive move, and the record is transferred from human teams in manufacturing, projects, and healthcare, not AI-validated. The "no documented failures" literature reflects selection bias, not certainty. See the [framework page](../../frameworks/think-theory-of-constraints/) for the full grading and caveats.*

## Why this framework fits

The cognitive job here is to refuse the spread-the-quarter reflex and locate the single stage that actually caps merges per hour, rather than the loudest one. The capacity-versus-demand test gives Daniel a defensible reason to fund integration first and shelve three approved initiatives that would have changed throughput by almost nothing - and it warns him the win will shift the constraint to cold Docker builds rather than end the problem.
