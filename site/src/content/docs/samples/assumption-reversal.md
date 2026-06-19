---
title: "Assumption Reversal - quick sample"
description: Assumption Reversal on an on-call team drowning in pager noise from a flaky data pipeline.
sidebar:
  label: assumption-reversal
---

> A compact worked example of [Assumption Reversal](../../frameworks/think-assumption-reversal/) on a realistic situation. For full end-to-end narratives see the [Showcase](../../showcase/); for the evidence behind the method see its [framework page](../../frameworks/think-assumption-reversal/).

## Situation

Daniel's team runs a nightly ETL pipeline that loads ~40 source feeds into the analytics warehouse. Roughly one feed a night arrives late or malformed, and the job pages whoever is on call to babysit a retry. Every fix the team has proposed - better retries, smarter alerting, a bigger timeout window - assumes the pipeline must process all feeds in one synchronous nightly run that has to fully succeed. The on-call rotation is burning out, and Daniel wants options that are not just "tune the same machine."

## Prompt

```text
/think-assumption-reversal "Our nightly ETL pages on-call whenever any of ~40 feeds is late or malformed. Every fix we've floated assumes one synchronous all-or-nothing nightly run. Surface the assumptions under that and reverse them so I get non-obvious options, not more retry-tuning."
```

## The artifact

# Assumptions-and-Reversals Sheet

## Subject

- How we run the nightly ETL so that one late or malformed feed stops paging on-call.

## Assumptions and reversals

| # | Foundational assumption | Reversed | Ideas the reversal provokes |
|---|---|---|---|
| 1 | All 40 feeds load in one synchronous nightly run | Each feed loads on its own independent schedule | Per-feed pipelines that succeed or fail in isolation; a bad feed never blocks the other 39 or the run as a whole |
| 2 | The run must fully succeed before data is usable | Partial success is a valid, publishable state | Publish the warehouse with whatever arrived, mark each table with a freshness/completeness stamp; consumers decide if "39 of 40" is good enough |
| 3 | A late or malformed feed is an incident | It is an expected, routine event | No page at all: route stragglers to a self-healing backfill queue that retries on the next window and only escalates after N misses |
| 4 | A human must intervene to recover a feed | Recovery is automatic and the human only reviews | Quarantine the bad payload, auto-retry on a backoff, and open a low-priority ticket with the diff instead of paging a person at 3am |
| 5 | We control the source feeds' timing | The sources are unreliable by default and we design around it | Treat every feed as eventually-arriving: a continuous "land when ready" ingest replaces the fixed nightly deadline entirely |
| 6 | On-call exists to keep the pipeline running | On-call exists only for genuinely novel failures | Demote all known failure modes to automation; the rotation shrinks to true unknowns, which may be near zero |

## Shortlist (carry forward)

The most promising non-obvious ideas, with the condition each would need to be viable:

1. **Per-feed isolated pipelines (reverse of #1)** - would have to be true: the feeds have no hard cross-dependencies that force a single transaction, and the warehouse can ingest tables independently. Highest payoff, because it kills the all-or-nothing blast radius that every current fix works around. Testable on a few feeds first.
2. **Partial-success publishing with freshness stamps (reverse of #2)** - would have to be true: downstream consumers can tolerate "39 of 40 loaded" if the gap is labeled, rather than needing a guaranteed-complete snapshot. Cheap to prototype as a metadata column; mostly a consumer-expectations conversation, not an infra rebuild.
3. **Self-healing backfill queue, no page on first miss (reverse of #3 and #4)** - would have to be true: most late/malformed feeds do recover on a later window without human action (worth measuring from existing logs before building). Directly targets the on-call burnout, and the data to validate it already exists in the pager history.

*Note: reversing assumptions #1 and #2 dissolves the framing the team has been stuck in - the question stops being "how do we make the one big run more reliable" and becomes "why is it one run at all." These are candidates, not decisions. Feed the shortlist into a design review or a decision skill before committing; a reversed assumption is a prompt for ideas, not evidence that the idea is viable.*

## Why this framework fits

The team's fixes were all trapped inside an unspoken premise - that the pipeline must be one synchronous, all-or-nothing run - so they kept tuning the same machine. Assumption Reversal names that premise out loud and negates it, surfacing options (per-feed isolation, partial-success publishing) that unaided "make it more reliable" thinking never reaches because it never questions the run itself.
