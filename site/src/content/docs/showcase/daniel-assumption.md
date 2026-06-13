---
title: "Daniel challenges a load-bearing assumption"
description: A senior engineer suspects the team's "the cache is causing the latency spikes" claim is an inference, not an observation, and uses an organized prompt to get the reasoning chain traced from raw data to conclusion before anyone rips anything out.
sidebar:
  label: "Daniel -> ladder of inference"
---

> **Daniel**, senior engineer at a ~200-person company. The decision: rip out the caching layer because it is "causing the latency spikes." Prompting style: organized.

This is a complete run, prompt to artifact. Framework: [Ladder of Inference Check](../../frameworks/think-ladder-of-inference-check/). For the cast and the other journeys, see the [Showcase index](../).

## The situation

The team has converged on a plan to tear out the read-through cache, and the justification has hardened into a fact in standup: "the cache is causing the p99 latency spikes." Daniel has watched a load-bearing claim like this calcify before, and he suspects this one is an interpretation that got promoted to an observation somewhere between the dashboard and the decision. He wants the chain from raw data to conclusion laid out before anyone touches production.

## The prompt

```
/think-ladder-of-inference-check

Conclusion the team has reached: "our read-through cache is causing the p99
latency spikes, so we should rip it out."

What we actually observed:
- p99 on the orders API jumped from ~180ms to ~900ms two weeks ago
- the spikes correlate with our cache layer being in the request path
- one engineer saw cache evictions climbing in the same window
- a thread-dump during a spike showed threads parked on the cache client

Constraints: the cache absorbs ~70% of read load off the primary DB. Ripping
it out is hard to reverse under our current traffic.
Already tried: nothing yet, this is pre-decision. I want the inference chain
traced before we commit.
```

A short structured block: the conclusion under examination, the raw observations, the constraint that makes the call expensive, and what he has not yet done. He hands the framework the data, not the verdict.

## The output

> **Reasoning Trace (Ladder of Inference) - Orders API p99 spikes**

## Conclusion under examination

- "Our read-through cache is causing the p99 latency spikes, so we should remove it."

## The ladder, reconstructed

| Rung | Content |
|---|---|
| Observable data available | p99 on the orders API rose from ~180ms to ~900ms two weeks ago; the cache sits in the request path, so it is present in every slow trace by construction; cache evictions are climbing; a thread-dump during a spike showed threads parked on the cache client; a config change shipped ~two weeks ago that lowered the cache max-entries; the primary DB connection pool has been near saturation during the same windows; the spikes are bursty, not constant; deploy frequency and traffic are both up quarter-over-quarter. |
| Data actually selected | Only three signals: the cache is in the path during every spike, evictions are climbing, and threads were parked on the cache client. |
| Meaning added | The cache client is the thing stalling requests, so the cache is the source of the latency rather than a victim of something downstream. |
| Assumptions | That "present in every slow trace" means "cause" and not "always in the path"; that threads parked on the cache client are blocked *by the cache* and not blocked *waiting on the DB read the cache is trying to fill on a miss*; that rising evictions are the disease and not a symptom of the shrunk cache size; that the config change and the saturated DB pool in the same window are coincidence. |
| Conclusion | Remove the cache to remove the spikes. |

## Riskiest rung

- **Data actually selected.** The selection quietly dropped two signals sitting in the same data that point the other way: a config change two weeks ago cut the cache size (which would *raise* evictions and miss rate on its own), and the DB connection pool is saturating in the same windows. On a cache miss, a parked cache-client thread is a thread waiting on the *database* read behind it, so the thread-dump is equally consistent with "the cache is starved and falling through to an overloaded DB" as with "the cache is the bottleneck." The conclusion treats the cache's mere presence in every trace as causation, when an in-path component is in every trace whether it is the cause or not.

## Alternative interpretation

- A credible different reading of the same data: the cache is not the cause, it is the early-warning light. The config change shrank the cache, the hit rate fell, more reads fell through to a DB pool that is already near saturation, and the p99 spikes are DB-bound time showing up *through* the cache client. Removing the cache would push 70% of read load straight onto that same primary and likely make p99 worse, not better.
- What it would imply: do not rip it out. First test the cheap, reversible cause - revert the cache-size change and watch the hit rate and p99 together, and graph cache hit rate against DB pool wait time during a spike. The observation that would actually decide it: if p99 tracks DB pool saturation and cache *misses* (not the cache's presence), the cause is downstream and removing the cache is exactly the wrong move. (This hands off cleanly to `think-evidence-vs-inference-sort` and `think-what-would-have-to-be-true`.)

## Why this prompt worked

Daniel separated the conclusion from the raw observations and listed the observations as data rather than as proof, which is precisely what lets the framework rebuild the ladder underneath the claim. Naming the constraint ("the cache absorbs 70% of read load, hard to reverse") told the trace what was at stake in the leap, so the riskiest rung and the test-it-cheaply alternative landed where the cost was highest. The organized block front-loaded the work the framework would otherwise have to guess at.

## What happened next

The trace did not settle the debate by argument; it replaced the argument with a measurement. Daniel took the "observation that would actually decide it" back to the team: before anyone removed anything, they reverted the cache-size config change and graphed hit rate against DB pool wait time during the next spike. p99 fell as the hit rate recovered, and the remaining spikes tracked DB saturation, not the cache. The load-bearing assumption had been an inference all along, and the team kept the cache and chased the database pool instead. When a later spike looked genuinely ambiguous between two subsystems, he reached for the [advisor](../../tools/think-framework-advisor/) to sequence the next few checks.
