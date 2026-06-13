---
title: "Daniel chooses between three architectures"
description: A senior engineer who does not trust his gut on a datastore migration hands the criteria and weights to the framework and gets a scored comparison of three options with an honest sensitivity note on what would flip it.
sidebar:
  label: "Daniel -> weighted scoring"
---

> **Daniel**, senior engineer at a ~200-person company. The decision: pick the datastore for the Orders service among migrate to Postgres, stay on MySQL, or move to a managed cloud datastore. Prompting style: organized.

This is a complete run, prompt to artifact. Framework: [Linear Model Aggregation](../../frameworks/think-linear-model-aggregation/). For the cast and the other journeys, see the [Showcase index](../).

## The situation

The Orders service is outgrowing its current MySQL instance, and three teams keep relitigating the fix in Slack. Daniel does not trust his gut here, partly because he is the one who picked MySQL three years ago and knows that loyalty is a bias, not a criterion. He wants the criteria named and weighted up front, the options scored against them the same way, and the result to say plainly what assumption would have to change for a different option to win.

## The prompt

He writes a short structured block: the options, the weighted criteria, the context, and what he already ruled out.

```
/think-linear-model-aggregation

Decision: datastore for the Orders service. Score these three options against weighted criteria.

Options:
  A. Migrate to self-managed Postgres (new instance, we run it)
  B. Stay on MySQL (current, scale it vertically + read replicas)
  C. Move to a managed cloud datastore (Aurora-class, vendor-run)

Criteria + weights (mine, argue if they're wrong):
  - Operational burden on our 4-person platform team .... weight 3 (this is the real pain today)
  - Migration risk / cutover effort ...................... weight 3 (orders = revenue path, no downtime)
  - Query + transaction fit for our workload ............. weight 2 (heavy relational, some JSON)
  - 3-year total cost (infra + people) .................. weight 2
  - Lock-in / exit cost ................................. weight 1

Context: ~4k orders/min peak, strong consistency required, team knows MySQL well,
weak on Postgres ops, no Kubernetes. Already ruled out: NoSQL (we need joins +
transactions) and sharding MySQL (ops cost we can't staff).

Give me a scored table, a winner and runner-up, and tell me what would flip it.
```

## The output

> **Scoring Model - Orders service datastore**

## Judgment

- **The recurring judgment:** which datastore option best fits the Orders service, scored against named, weighted criteria rather than gut or incumbency.
- **Outcome it predicts:** the option that minimizes operational pain and cutover risk over a 3-year horizon while meeting the workload's consistency and query needs.

A note on fit: this is a single architecture choice, not a judgment you repeat hundreds of times, so it sits at the edge of this framework's sweet spot (a recurring screen). What transfers cleanly is the mechanical core - fix the criteria and weights *before* scoring, score every option the same way, and refuse to override the total on a hunch. That is exactly the discipline you asked for, so the model is built that way below.

## Criteria (few, weighted)

| Criterion | Why it plausibly predicts the better choice | Weight | How it is scored (rubric) |
|---|---|---|---|
| Operational burden on the 4-person platform team | The stated pain today is ops load, and a 4-person team is the binding constraint | 3 | 2 = low ongoing ops, 1 = moderate, 0 = high / needs skills we lack |
| Migration risk / cutover effort | Orders is the revenue path; a risky cutover is the most expensive way to fail | 3 | 2 = low (stay/minimal change), 1 = managed cutover, 0 = high-risk rewrite |
| Query + transaction fit for the workload | Heavy relational with some JSON and strong-consistency needs; a poor fit shows up as rewrites later | 2 | 2 = excellent fit, 1 = good with caveats, 0 = forces workarounds |
| 3-year total cost (infra + people) | The decision is paid in both dollars and headcount over the horizon | 2 | 2 = clearly lowest, 1 = middle, 0 = clearly highest |
| Lock-in / exit cost | A one-way door deserves weight, but less than the day-one pains above | 1 | 2 = portable / open, 1 = some coupling, 0 = hard to exit |

(Weights are Daniel's, on a 1-3 scale reflecting stated priority; ops burden and migration risk dominate by design. Equal weights were the default; these were raised only where the context gave a real reason.)

## Formula and decision rule

- **Combine:** weighted total = sum of (criterion weight x option score). Max possible = (3+3+2+2+1) x 2 = 22.
- **Decision rule:** highest weighted total wins; report the runner-up and the margin so a close call is visible rather than hidden.

## Scored options

| Criterion (weight) | A. Postgres (self-managed) | B. Stay on MySQL | C. Managed cloud datastore |
|---|---|---|---|
| Ops burden (3) | **1** - capable engine, but the team is weak on Postgres ops and has no K8s; new on-call surface = 3 | **2** - team knows it cold; least new ops = 6 | **2** - vendor runs the database; lowest ops for a small team = 6 |
| Migration risk (3) | **0** - full data + app migration to a new engine on the revenue path = 0 | **2** - no engine change; scale in place = 6 | **1** - same MySQL dialect (Aurora-class), managed cutover, real but bounded = 3 |
| Query / txn fit (2) | **2** - excellent relational + native JSONB + strong consistency = 4 | **1** - fine today, but the vertical-scale ceiling is the reason we are here = 2 | **2** - MySQL-compatible, scales reads/writes, strong consistency = 4 |
| 3-year cost (2) | **2** - lowest infra; but people-cost of new ops skills offsets it = 4 | **1** - cheap now, but the next scale wall arrives inside the window = 2 | **0** - highest infra spend (managed premium) = 0 |
| Lock-in (1) | **2** - open-source, portable = 2 | **2** - open-source, portable = 2 | **0** - vendor-coupled, real exit cost = 0 |
| **Weighted total (of 22)** | **13** | **18** | **13** |

**Winner: B. Stay on MySQL (18 of 22).** It wins not because it is exciting but because it scores high on the two heaviest criteria - the team already operates it (ops burden) and there is no engine cutover (migration risk). The weights you set made the incumbent's familiarity decisive, which is the honest result of your own priorities.

**Runner-up: tie at 13 between A. Postgres and C. Managed cloud datastore.** They lose for opposite reasons: Postgres has the best raw fit but the worst migration risk and an ops-skills gap; the managed datastore removes ops but pays for it in cost and lock-in.

## Sensitivity - what would flip this

- **The result rests on one bet:** that scaling MySQL in place actually buys enough runway. The model scores migration-risk avoidance highly, but if MySQL's vertical-scale ceiling is closer than assumed, criterion "query/txn fit" for B is really a 0, not a 1 - and B's total falls to 16 while the real question becomes A vs C, not whether to move at all. **Confirm the headroom before trusting this.**
- **Drop migration risk from weight 3 to weight 1** (i.e. if a clean dual-write cutover path existed) and C. managed datastore climbs to 17 and A. Postgres to 13 - the managed option becomes competitive with the incumbent. Migration risk is doing most of the work keeping B ahead.
- **If the platform team grows or gains Postgres ops depth,** A's ops-burden score moves from 1 to 2 (+3) and A reaches 16, making the fit-vs-familiarity call genuinely close.
- **What does *not* flip it:** lock-in (weight 1) is too light to change the order; even zeroing it out leaves B ahead.

## Mandate and caveats

- **Apply consistently:** the weights and rubric were fixed before scoring. Re-scoring a cell because the answer feels wrong reintroduces exactly the bias this was built to remove. If a score feels wrong, fix the *criterion or its weight* and re-run the whole table - do not nudge one cell.
- **Only as good as its inputs:** the model is honest arithmetic over Daniel's weights and one scale assumption. It does not validate that "stay on MySQL" buys real runway - the sensitivity note flags that as the load-bearing check.
- **Boundary:** this is a one-off architecture call, so the model is a decision aid, not a rule to run repeatedly. The value here is forcing the criteria and weights into the open before the scores, not standardizing a recurring screen.

## Why this prompt worked

Daniel front-loaded the three parts the framework needs most: the **options**, the **criteria with explicit weights**, and the **context and exclusions** that let each cell be scored honestly. Because the weights were committed before any score was written, the framework could not be steered toward his old MySQL pick or away from it - it just ran the arithmetic and reported the margin. The organized prompt did not make the answer; it made the answer auditable.

## What happened next

Daniel did not merge the verdict; he merged the *check it surfaced*. The model said stay on MySQL, but the sensitivity note said the whole result hangs on whether scaling MySQL in place buys real runway, so he spent a week proving the headroom with a load test before committing - and the test, not the table, became the decision. He pasted the scored table and the "what would flip it" section straight into the architecture decision record so the next engineer would see the weights, not just the winner. When a second, fuzzier question came up - whether the criteria themselves were the right ones - he described it to the [framework advisor](../../tools/think-framework-advisor/) and let it sequence the next move.
