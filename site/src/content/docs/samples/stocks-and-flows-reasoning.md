---
title: "Stocks and Flows Reasoning - quick sample"
description: Stocks and Flows Reasoning checking whether a platform team's bug backlog is actually shrinking after a "bug bash" sprint.
sidebar:
  label: stocks-and-flows-reasoning
---

> A compact worked example of [Stocks and Flows Reasoning](../../frameworks/think-stocks-and-flows-reasoning/) on a realistic situation. For full end-to-end narratives see the [Showcase](../../showcase/); for the evidence behind the method see its [framework page](../../frameworks/think-stocks-and-flows-reasoning/).

## Situation

Daniel is a staff engineer on a 200-person company's platform team. Last sprint they ran a focused "bug bash" and closed 90 open defects, the most in a single sprint all year, and the engineering lead is telling leadership the backlog is finally getting under control. Daniel is not so sure: new bugs keep arriving from three product teams shipping fast, and he wants to know whether the open-bug count is genuinely falling or just being out-resolved more loudly than it is being filed.

## Prompt

```
/think-stocks-and-flows-reasoning "Our open-bug backlog is sitting around 620. Last sprint we closed 90 bugs in a bug bash and leadership now thinks we're getting on top of it. But three product teams are filing new bugs constantly and our normal close rate isn't that high. Is the backlog actually shrinking, or did one big sprint just mask the trend? Numbers are in Jira if you need a frame."
```

## The artifact

# Stock-Flow Map

> Daniel's platform team closed a record 90 bugs in one sprint and leadership concluded the backlog is shrinking. This skill checks whether the open-bug count is actually falling or just being out-resolved for one sprint.

---

## Stock

- **The accumulating quantity:** open (unresolved) bugs in the backlog - **current level:** ~620.

## Flows

| Inflows (add to the stock) | Rate / trend |
|---|---|
| New bugs filed per sprint (three product teams shipping continuously) | ~70/sprint, trending up slightly as feature velocity rises |

| Outflows (drain the stock) | Rate / trend |
|---|---|
| Bugs closed per sprint - normal capacity | ~55/sprint, steady (one engineer's worth of triage-and-fix time) |
| Bugs closed in the one-off bug-bash sprint | 90 that sprint only; not a sustained rate |

## Net flow

- Inflow vs outflow right now: in a normal sprint, ~70 filed in, ~55 closed out = **net +15/sprint** (the backlog grows). In the bug-bash sprint, 70 in, 90 out = net -20 for that one sprint.
- Is the net flow itself trending up or down? The sustainable net flow is **positive and slowly worsening** (inflow drifting up while close capacity holds flat). The bug bash was a one-time outflow spike, not a change in the steady-state rate.

## Corrected trajectory

- The backlog **rises ~15/sprint in steady state**, because new bugs arrive faster than normal capacity closes them. The bug bash bought a single -20 dip (620 down to ~600), but with normal flows resuming the backlog climbs back through 620 within two sprints and keeps growing. It only actually shrinks if sustained closes exceed ~70/sprint or filing drops below ~55/sprint - neither of which the one bash changed.

## Naive intuition it corrects

- "We closed a record 90 bugs, so the backlog is shrinking." Wrong: the 90 was a one-sprint outflow spike, not the sustained close rate. The open-bug count is the stock; closes are a flow. A single big drain lowers the level for one sprint but does not reverse the trend while the steady inflow (~70) still exceeds steady outflow (~55). Leadership would have declared victory while the backlog quietly resumed growing.

---

*Note: evidence tier S. The accumulation error this corrects is robustly demonstrated; the skill makes the structure explicit on this problem, it does not claim broad systems-thinking transfer. See the [framework page](../../frameworks/think-stocks-and-flows-reasoning/) for the dossier.*

## Why this framework fits

The cognitive job here is to separate the stock (open-bug count) from the flows (filing and closing) so the trajectory is read off the sustained net flow, not off one dramatic sprint; unaided, Daniel's team would have inferred a falling backlog from a record close count. The map instead shows steady-state net flow is +15/sprint, names the bug bash as a one-time dip, and reframes the real target: lift sustained closes above filing or slow the inflow, not run another heroic sprint.
