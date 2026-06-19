---
title: "Brainwriting - quick sample"
description: Brainwriting on a flaky end-to-end test suite, generating independent fix angles before converging.
sidebar:
  label: brainwriting
---

> A compact worked example of [Brainwriting](../../frameworks/think-brainwriting/) on a realistic situation. For full end-to-end narratives see the [Showcase](../../showcase/); for the evidence behind the method see its [framework page](../../frameworks/think-brainwriting/).

## Situation

Daniel's team owns a 900-case end-to-end test suite that has become flaky: about 6 percent of runs fail on a green commit, so engineers now rerun CI reflexively and have started ignoring red. A "stabilize the suite" ticket has stalled because every standup converges on the same first idea - add retries - and the conversation never gets past it. Daniel wants a broad pool of fix angles before the team commits to one.

## Prompt

```
/think-brainwriting "Ways to stop our end-to-end suite from being flaky (6% false-fail rate, ~900 cases, runs on every PR). Don't just say add retries - I want independent angles before we pick."
```

## The artifact

> **Idea Pool (Brainwriting)**

## Prompt

- Ways to cut the end-to-end suite's false-fail rate (6 percent on green commits, ~900 cases, per-PR) without just masking it.

## Independent streams (generated as if blind to each other)

**Stream A (angle/persona): the test-infrastructure engineer)**
- Pin and freeze all external clock, network, and randomness sources behind a deterministic test harness.
- Run each case in an isolated, fresh database transaction so cross-test state cannot leak.
- Add explicit wait-for-condition helpers and ban fixed `sleep()` timeouts across the suite.

**Stream B (angle/persona): the data scientist)**
- Instrument every run and rank cases by individual flake rate; most flake usually concentrates in a few cases.
- Quarantine the top-flake cases into a separate non-blocking lane until they are fixed.
- Correlate failures with CI host, time of day, and concurrency to find environmental causes.

**Stream C (angle/persona): the product engineer who feels the pain)**
- Cut suite size: delete redundant cases and push coverage down to faster unit/integration layers.
- Make a red suite block merge again, but only after the flakiest cases are quarantined so the gate is trusted.
- Add a one-click "this failure is flake" report so triage data is captured at the moment of pain.

## Build-on round (combine and extend across streams)

- Rank cases by flake rate (B) and feed that ranking into the test-pyramid push (C) - rewrite the worst offenders at a lower layer first, instead of stabilizing them in place.
- Quarantine the top-flake lane (B) and only then re-arm the merge-blocking gate (C), so the blocking suite is trustworthy from day one rather than after a long stabilization.
- Pair the deterministic harness (A) with per-case instrumentation (B) so each determinism fix is verified by a measured drop in that case's flake rate, not by vibes.

## Consolidated shortlist

The strongest distinct ideas (duplicates merged), with why:

1. **Measure-then-quarantine (B):** rank cases by flake rate and move the top offenders to a non-blocking lane. Cheapest, reversible, and it restores a trustworthy green gate this week. Do now.
2. **Re-arm the merge gate behind the quarantine (B+C):** with flakes quarantined, make red block merge again so the team stops ignoring failures. Low risk once step 1 lands.
3. **Determinism harness, instrumented (A+B):** fix the quarantined cases against pinned clock/network/state, each verified by a measured flake-rate drop. The durable fix; sequence it after the gate is trusted.
4. **Push worst cases down the pyramid (B+C):** for offenders that are slow and redundant at the e2e layer, rewrite as faster lower-layer tests instead of stabilizing them. Run in parallel with step 3.

---

*Evidence caveat: the strong evidence for brainwriting is from human groups, where silent parallel generation outproduces verbal brainstorming by removing production blocking and anchoring. The solo-plus-AI adaptation transfers the mechanism (independent streams plus a build-on round) but does not inherit a measured AI effect size. The value here is breadth: three independent streams surfaced "measure first" and "push down the pyramid," which the standing "just add retries" brainstorm had anchored away from.*

## Why this framework fits

Brainwriting's job here is to break the anchoring that kept every standup collapsing onto "add retries" - by generating distinct angles before anyone reacts, it surfaces the measure-first and quarantine moves a single thread would have skipped. The artifact gives Daniel a ranked, build-on shortlist with a clear first move, instead of one anchored option dressed up as consensus.
