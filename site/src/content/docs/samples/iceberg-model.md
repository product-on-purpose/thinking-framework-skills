---
title: "Iceberg Model - quick sample"
description: The Iceberg Model on a team whose payments service keeps paging at 2am despite repeated hotfixes.
sidebar:
  label: iceberg-model
---

> A compact worked example of [Iceberg Model](../../frameworks/think-iceberg-model/) on a realistic situation. For full end-to-end narratives see the [Showcase](../../showcase/); for the evidence behind the method see its [framework page](../../frameworks/think-iceberg-model/).

## Situation

Daniel is a staff engineer on a 200-person product team. The payments service has paged on-call four times in the last quarter, each time a different failure, each time closed with a same-day hotfix and a "fixed" Slack message. This week it paged again at 2am, took down checkout for 19 minutes, and the postmortem was the third one to land on "add more monitoring" as the action item. Leadership wants reliability for an upcoming enterprise contract, and Daniel suspects the team keeps fixing symptoms instead of the thing generating them.

## Prompt

```text
/think-iceberg-model "Our payments service has paged on-call 4 times this quarter, each a
different failure, each closed with a hotfix. Latest one took down checkout for 19 minutes.
Every postmortem action item is basically 'add more monitoring' and it keeps happening.
Why does this keep recurring and where should we actually intervene? We need it solid before
an enterprise deal closes."
```

## The artifact

## Problem under examination

- **Event:** The payments service threw an unhandled timeout at 2am, took checkout down for 19 minutes, and was closed with a same-day hotfix and a "fixed" note in the incident channel.
- **Why now:** Fourth payments page this quarter, each a different failure, each hotfixed; the postmortem action item is again "add more monitoring," and an enterprise contract that demands reliability is about to close.
- **One-off check:** Not a one-off. Four distinct failures in one service in one quarter, all closed the same way, is a repeating pattern, so the iceberg is the right tool.

## What is really going on, and where to intervene (summary)

The 2am timeout is the visible tip; the pattern is that payments incidents have recurred all quarter with different proximate causes but an identical response - hotfix, close, move on. Beneath it sits the load-bearing structure: incidents are closed when service is restored rather than when the cause is removed, postmortems have no owner for follow-through, and on-call rewards the fastest restore, so deeper fixes are never funded against feature work. Holding that structure in place is the mental model that "an incident is over when the alert clears" and "reliability is on-call's job, not the roadmap's." Adding more monitoring is the lowest-leverage move and explains why each new failure is novel but the cycle is not. The highest-leverage intervention is structural: make incidents closeable only on a tracked, owned, prioritized cause fix, and carve reliability work into the roadmap - before the enterprise deal multiplies both load and the cost of an outage.

## The iceberg

| Level | What is going on at this level | Intervention it implies | Leverage |
|---|---|---|---|
| **Event** (what just happened) | An unhandled timeout in the payments service took checkout down for 19 minutes at 2am; closed with a same-day hotfix | Ship the hotfix; restore checkout; post "fixed" in the incident channel | Reactive / low |
| **Pattern** (what has been happening over time) | Four payments incidents this quarter, each a different proximate cause, each closed the same way; "add more monitoring" recurs as the action item | Track payments incidents as a standing reliability metric; review the cluster, not each page in isolation | Managerial / medium |
| **Structures** (policies, incentives, resource flows, feedback loops) | Incidents close on service-restored, not cause-removed; postmortem action items have no owner and no roadmap slot; on-call is measured on time-to-restore; reliability work competes with features and loses | Redefine incident closure to require a tracked, owned, prioritized cause fix; give postmortem items roadmap capacity; measure recurrence, not just restore time | Higher / slower |
| **Mental models** (beliefs and assumptions holding the structures in place) | "An incident is over when the alert clears." "Reliability is on-call's job, not the roadmap's." "Monitoring is the fix because it tells us sooner." | Reframe done as cause-removed, not alarm-cleared; treat reliability as roadmap work with an owner; treat monitoring as detection, never as a remedy | Highest / slowest |

**Highest-leverage intervention:** Change what "incident closed" means and where the follow-up lives - closure requires a tracked, owned, prioritized cause fix, and that work gets explicit roadmap capacity instead of competing with features and losing. This is slower than another hotfix, but it is the only level that stops a different failure from recurring next month, and it must land before the enterprise deal raises both the traffic and the cost of the next 2am page.

**Column notes:**
- **Pattern:** the trend, not the latest page - four incidents in a quarter, all closed identically.
- **Structures:** the closure rule, the missing owner for follow-up, the time-to-restore incentive, and the feature-versus-reliability resource contest that generate the pattern. This is the load-bearing level.
- **Mental models:** the beliefs that make the structures feel normal, including the uncomfortable "monitoring counts as a fix."
- **Leverage:** a judgment for argument, not a measured value. Hotfixes are quick but recur; redefining closure and funding the follow-up is slower but addresses the cause.

*Note: leverage here is a judgment for argument, not a measured or proven effect. The iceberg is an established systems-thinking tool whose value is qualitative and pedagogical; it does not guarantee a better outcome than ordinary root-cause analysis. See the [framework page](../../frameworks/think-iceberg-model/) for the evidence and caveats.*

## Why this framework fits

The recurring-incident-despite-fixes pattern is exactly the cognitive job the iceberg does: it forces the descent past the event ("fix this timeout") to the structure (closure rules and incentives) and the mental model ("monitoring is the fix") that keep regenerating new failures. Unaided, the team would have shipped a fifth hotfix and a fifth "add monitoring" action item; the artifact names the comp-and-closure structure as the actual cause and points to a higher-leverage fix before the enterprise deal raises the stakes.
