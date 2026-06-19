---
title: "Abstraction Laddering - quick sample"
description: Abstraction Laddering on a real engineering request that arrived as a pre-baked solution.
sidebar:
  label: abstraction-laddering
---

> A compact worked example of [Abstraction Laddering](../../frameworks/think-abstraction-laddering/) on a realistic situation. For full end-to-end narratives see the [Showcase](../../showcase/); for the evidence behind the method see its [framework page](../../frameworks/think-abstraction-laddering/).

## Situation

Daniel is a staff engineer at a 200-person company. A product manager has filed a ticket titled "Add a Redis cache to the search endpoint" after users complained that the in-app search feels slow. The ticket reads as a settled solution, but nobody has stated what "slow" means or why Redis in particular. Before Daniel scopes a sprint around a cache, he wants to know what altitude this problem actually lives at.

## Prompt

```text
/think-abstraction-laddering "Ticket says 'add a Redis cache to the search endpoint' because search feels slow. Before I build a cache I want to find the level this problem actually sits at."
```

## The artifact

## Problem under laddering

- **Problem as given (entry rung):** "Add a Redis cache to the search endpoint."
- **Who framed it / how it arrived:** Filed by a product manager as a pre-baked solution after user complaints about slow search. The altitude is accidental: it names one mechanism (caching one endpoint), not the goal, and not the only mechanism. "Slow" is undefined.
- **The user's actual goal:** Make in-app search feel fast enough that users stop complaining, without taking on caching complexity that is not warranted by the actual bottleneck.

## Summary (top of the artifact)

The problem arrived two rungs too low: "add a Redis cache to the search endpoint" is a specific implementation, not the problem. Climbing reveals the real goal is "users experience search as fast and trustworthy," for which a cache is only one of several "hows" (fix slow queries, add an index, paginate results, debounce the client). Climbing higher to "users succeed in the product" is too broad to act on this quarter, and "grow retention" is uselessly universal. We choose to work at **"reduce the time-to-first-result for a typical search, where the bottleneck actually is"** as the working altitude: high enough that a cache competes against cheaper fixes instead of being assumed, low enough to scope and measure now. A Redis cache may still win, but it has to earn it against a profiler trace.

## The ladder (most abstract at top, most concrete at bottom)

| Rung | Altitude | Statement of the problem at this level | Note |
|---|---|---|---|
| ^ why? | Highest | Grow retention by making the product feel reliable | too high: true of almost any project, not workable |
| | Higher | Users succeed at the tasks search supports | a goal, not a problem to solve; still too broad to act on |
| | High | Users experience search as fast and trustworthy | the user's actual goal - several "hows" live below it |
| | **Working** | **Reduce the time-to-first-result for a typical search, where the bottleneck actually is** | **chosen working altitude** - leaves real options open, still actionable |
| | Lower | Cut the latency of the slow path the search request spends most time on | more than one "how" here -> add a DB index, rewrite the query, cache results, paginate, debounce the client |
| | (entry) | Add a Redis cache to the search endpoint | <- problem as given; one mechanism among several |
| v how? | Lowest | Stand up a Redis instance and cache full result sets keyed by query string with a 60s TTL | too low: a single implementation detail of one mechanism |

**Working altitude (chosen rung):** "Reduce the time-to-first-result for a typical search, where the bottleneck actually is."

**Rationale:** This rung serves the actual goal (search feels fast) while refusing to assume the answer is a cache. At this altitude the work starts with a profiler trace, so a cache competes against a missing index, a query rewrite, and client-side debouncing on cost, correctness, and operational load - the comparison the ticket skipped by naming a solution. It is concrete enough to scope and measure this sprint.

*Evidence caveat: Abstraction Laddering makes the altitude choice explicit and deliberate; it does not guarantee a better solution or a provably correct level. It is a widely taught design-facilitation method with face validity and a clear mechanism, not one measured against a baseline (tier P, practitioner). See the [framework page](../../frameworks/think-abstraction-laddering/).*

## Why this framework fits

The ticket inherited an accidental altitude (one mechanism on one endpoint) and the ladder relocates the work to a level where a cache is one competing option rather than the foregone conclusion. Unaided, Daniel would have started provisioning Redis; the artifact instead hands him a level whose first move is to find the real bottleneck, which is where the cheaper, correct fix usually hides.
