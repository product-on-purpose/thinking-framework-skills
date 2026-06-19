---
title: "WOOP (Mental Contrasting with Implementation Intentions) - quick sample"
description: WOOP turns a decided goal into a follow-through card on a realistic engineering situation - closing a flaky-test backlog that keeps getting deferred.
sidebar:
  label: woop
---

> A compact worked example of [WOOP (Mental Contrasting with Implementation Intentions)](../../frameworks/think-woop/) on a realistic situation. For full end-to-end narratives see the [Showcase](../../showcase/); for the evidence behind the method see its [framework page](../../frameworks/think-woop/).

## Situation

Daniel, a staff engineer, has committed to fixing the team's flaky integration tests. The retry-and-rerun habit has crept into the CI pipeline, and three known-flaky suites get silently re-run on red rather than fixed. He has the time blocked and the root-cause list ready, but every sprint the work slides because shipping features always feels more urgent in the moment. The goal is decided and feasible; the follow-through is what keeps failing.

## Prompt

```text
/think-woop "I've committed to fixing our three flaky integration suites this sprint. Time is blocked, root causes are scoped. But every sprint this slips because feature work always wins in standup. Help me actually do it this time."
```

## The artifact

> **WOOP Card**

## W - Wish

- Land the three flaky integration suites at zero retries-on-red, with the auto-rerun-on-failure CI hack removed, by the end of this sprint. (Specific, challenging, feasible.)

## O - Outcome

- A red build means a real failure again, so the team stops ignoring CI and we catch regressions the day they ship instead of a week later.

## O - Obstacle

- Internal: in standup I feel the pull to volunteer for whatever feature is on fire, and my impulse is to quietly reslot the test work to "next sprint" so I look like I am moving the roadmap rather than cleaning up.

## P - Plan (if-then)

- If I feel the urge to trade the flaky-test block for feature work in standup, then I will say out loud "the test-stability work is committed for this sprint" and leave the calendar block untouched rather than reslotting it.
- If a teammate asks me to pick up an urgent feature mid-sprint, then I will offer the next sprint or another owner instead of giving up the test block, and say so in the same message.

## Feasibility note

- The wish is feasible: the root causes are already scoped and the time is blocked. If it were not - say a fourth suite turned out to depend on an external service we cannot stabilize this sprint - WOOP would surface that the honest choice is to descope to the two suites we control, not to pretend all three will land. Naming that is the result, not a failure.

---

*Note: the value is the obstacle step. A motivational version ("imagine how clean green CI will feel!") would, per the evidence, actually make follow-through less likely. Naming the internal obstacle (the standup pull to look like a roadmap mover) and pre-binding the if-then response is what protects the commitment. This card reflects evidence for humans running WOOP on their own goals, transferred to AI-assisted use, not AI-validated.*

## Why this framework fits

The decision was already made; the failure mode is the gap between intention and the moment of friction in standup. WOOP does the cognitive job unaided thinking skips: it names the specific internal obstacle and pre-binds a concrete if-then response to its trigger, so the choice is already made before the pressure arrives.
