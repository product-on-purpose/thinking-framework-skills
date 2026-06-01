# Iceberg - Worked Example

A completed run of `tfs-iceberg-model`, on the shared Northwind scenario. This is the quality bar a generated iceberg should meet.

> Northwind is a B2B SaaS weighing a self-serve free-tier launch. Here the skill is pointed at a problem that keeps recurring in the run-up to that launch: newly signed accounts keep churning fast, and reacting account-by-account has not stopped it. The iceberg moves that event downward to its systemic causes, rather than forward to consequences (that is the futures wheel's job).

---

## Problem under examination

- **Event:** Three enterprise accounts signed in the last two quarters churned within 90 days, the latest one this month after a single escalation.
- **Why now:** It keeps happening, and the reactive fix (a manager jumps on a save call) is not landing. Leadership is about to add a self-serve free tier, which will pour even more new accounts into the same funnel.
- **One-off check:** Not a one-off. This is the latest instance of a repeating pattern, so the iceberg is the right tool.

## What is really going on, and where to intervene (summary)

The churned account is the visible tip; the pattern is that fast enterprise churn has crept up every quarter for a year. Beneath it sits the load-bearing structure: onboarding is owned by Sales, who are comped on new logos and not on retention, so accounts are handed off at signature with no success plan and no owner for the first 90 days. Holding that structure in place is the mental model that "growth comes from new logos, and retention is Customer Success's problem, not ours." Reacting to each churn (the save call) is the lowest-leverage move and explains why nothing changes. The highest-leverage intervention is structural: give the first 90 days a named owner and tie part of Sales comp to retained revenue, not just bookings - and do it before the free tier multiplies the inflow.

## The iceberg

| Level | What is going on at this level | Intervention it implies | Leverage |
|---|---|---|---|
| **Event** (what just happened) | An enterprise account churned within 90 days after one unresolved escalation | Run a save call; fix that customer's specific complaint | Reactive / low |
| **Pattern** (what has been happening over time) | Fast (<90-day) enterprise churn has risen every quarter for a year; saves rarely stick | Track 90-day churn as a standing metric; staff a recovery playbook | Managerial / medium |
| **Structures** (policies, incentives, resource flows, feedback loops) | Onboarding owned by Sales; reps comped on new logos, not retention; no owner for the first 90 days; CS engages only after a ticket escalates | Give the first 90 days a named owner; tie part of Sales comp to retained revenue; trigger CS at signature, not at escalation | Higher / slower |
| **Mental models** (beliefs and assumptions holding the structures in place) | "Growth comes from new logos." "Retention is Customer Success's problem, not Sales's." "A signed contract means the deal is won." | Reframe the goal as retained revenue, not bookings; treat signature as the start of the sale, not the end; make retention a shared accountability | Highest / slowest |

**Highest-leverage intervention:** Restructure ownership and incentives for the first 90 days - a named owner plus Sales comp tied to retained revenue - so accounts are not handed off into a vacuum. This is slower than a save call but is the only level that stops the pattern from recurring, and it must land before the free tier multiplies the number of new accounts entering the same broken handoff.

---

*Note: the value is the descent. A naive pass reacts at the event level (fix this customer's complaint) and never asks why churn keeps happening; the iceberg exposes a comp-and-ownership structure and a "retention is not our job" mental model as the real causes, and points to a higher-leverage fix than another save call - which a forward-looking consequence map would have missed entirely.*
