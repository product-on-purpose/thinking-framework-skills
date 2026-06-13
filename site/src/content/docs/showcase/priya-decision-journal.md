---
title: "Priya records a decision before a public commitment"
description: A policy analyst locks in her reasoning, confidence, and disconfirming signals the day before publishing an on-the-record recommendation, so a later review can calibrate rather than rationalize.
sidebar:
  label: "Priya -> decision journal"
---

> **Priya**, policy analyst at a government agency. The decision: recommend a 12-month phased rollout of the new small-business permit-fee waiver rather than an immediate agency-wide launch, in a memo that will be published and on the record. Prompting style: detailed.

Framework: [Decision Journal](../../frameworks/think-decision-journal/). For the cast and the other journeys, see the [Showcase index](../).

## The situation

Tomorrow Priya files a recommendation memo that goes into the public record and will be cited by the agency, advocacy groups, and the press long after the vote. The honest problem is not the recommendation itself - it is that in six months, when early numbers arrive, she knows she will be tempted to read whatever happened as what she "always expected." Before she signs it, she wants her real reasoning, her actual confidence, and the specific results that would prove her wrong fixed in place where no later rationalization can reach them.

## The prompt

```
/think-decision-journal

Record a decision journal entry for me before I publish, because this memo goes on
the public record and I want my reasoning fixed in place before any results arrive.

DECISION: Recommend a 12-month phased rollout of the small-business permit-fee waiver
(three quarterly cohorts by business size and county) rather than an immediate
agency-wide launch. Owner: me (Policy & Evaluation), with the Deputy Director's sign-off;
goes to the Commission as a published recommendation memo on 2026-06-15.

CONTEXT: The legislature funded the waiver and wants visible relief fast. The agency's
operations team is at capacity and our permit system has a known backlog. Advocacy
groups (Main Street Coalition) want immediate universal access and will read "phased"
as foot-dragging. The Budget Office wants cost control and a clean audit trail.

ALTERNATIVES I CONSIDERED: immediate agency-wide launch; indefinite pilot in one county;
no waiver / direct grants instead.

WHY IT IS HARD: the equity argument (don't make small businesses wait) cuts against the
delivery argument (a botched universal launch helps no one). I am genuinely split.

Please force me to state an explicit confidence and the specific results that would tell
me I was wrong, and set a real review date. Reference docs: the fiscal note (FN-2026-114)
and the operations capacity assessment (OPS-CAP-Q2).
```

The whole decision is front-loaded: the call, the owner, the stakeholders and their interests, the alternatives, the real tension, and the document references. The framework supplies the discipline - an explicit confidence, named assumptions, disconfirming signals, and a fixed review date.

## The output

> **Decision Journal Entry - Permit-fee waiver rollout recommendation**

## Entry header

- **Date recorded:** 2026-06-12 (three days before the memo is filed; recorded before any rollout data exists)
- **Decision:** Recommend a 12-month phased rollout of the small-business permit-fee waiver - three quarterly cohorts sequenced by business size and county - rather than an immediate agency-wide launch.
- **Decided by / owner:** Priya, Policy & Evaluation, with Deputy Director sign-off. Goes to the Commission as a published recommendation memo on 2026-06-15.
- **Reversibility:** One-way door in practice. Once the recommendation is on the public record and the Commission acts on it, reversing to an immediate universal launch would mean publicly contradicting a published memo and re-opening a settled vote.

## Situation and rationale

The legislature funded the waiver and wants visible relief for small businesses quickly; the Main Street Coalition is pressing for immediate universal access and will read a phased plan as the agency slow-walking relief. Against that, the operations capacity assessment (OPS-CAP-Q2) shows the permit team already at capacity with a documented backlog, and the fiscal note (FN-2026-114) flags that an uncontrolled universal launch makes the spend hard to track for the Budget Office's audit.

I am recommending the phased rollout because I judge that a botched universal launch - long waits, errors, uneven access - would damage the same small businesses faster than a deliberately sequenced one, and would hand critics a failure rather than a delivery. Phasing buys an operational margin and a clean per-cohort audit trail while still delivering relief inside 12 months. It is a hard call: the equity argument (do not make any eligible business wait) genuinely cuts against the delivery argument (capacity is real and finite), and I am split on it, not certain.

## Options considered and not taken

| Option | Why set aside |
|---|---|
| 12-month phased rollout in three quarterly cohorts (chosen) | Delivers relief within the year while staying inside operations capacity and giving the Budget Office a clean per-cohort audit trail; lowest risk of a visible delivery failure |
| Immediate agency-wide launch | Operations is already at capacity with a known backlog (OPS-CAP-Q2); high risk of waits and errors that harm the businesses the waiver is meant to help and hand critics a failure |
| Indefinite single-county pilot | Too slow and too narrow; reads as inaction to the legislature and advocates, and delays relief for most eligible businesses with no committed end date |
| Direct grants instead of a fee waiver | Out of scope for the funded program and a heavier administrative lift; reopens a settled policy question rather than implementing the one the legislature funded |

## Prediction

- **Predicted outcome:** By the 2026-12-31 review, cohorts 1 and 2 are processed within the published service-level target with no backlog spike traceable to the waiver, take-up among eligible businesses in those cohorts is at or above 50%, and the Budget Office signs off on a clean spend reconciliation for the cohorts launched so far.
- **Confidence:** 65%. The number reflects real disagreement, not a placeholder; the equity-versus-delivery split is genuine and I could be talked toward 55% on a worse day.
- **What would surprise me:** Take-up in cohorts 1-2 coming in well below 50%, which would mean the phasing (or the application process) is itself a barrier to relief, not a protection of it - and would make the advocates' "phased equals foot-dragging" critique correct rather than rhetorical.

## Assumptions this rests on

1. The operations team can clear each cohort within the published service-level target without the backlog from OPS-CAP-Q2 compounding across quarters.
2. Eligible small businesses will apply when their cohort opens rather than waiting, dropping out, or being deterred by the staged eligibility windows.
3. The Main Street Coalition's objection is to perceived delay, not to phasing as such, so transparent cohort dates and published progress will hold their support rather than harden opposition.
4. The cohort sequencing (by size and county) does not itself create an equity problem - i.e., no cohort that ends up last is also the one with the greatest need.
5. The fiscal note's cost assumptions hold per cohort, so a clean audit trail is achievable and the Budget Office's sign-off is realistic.

## Review

- **Review date:** 2026-12-31, after cohorts 1 and 2 have run. Reopen this entry via an after-action review.
- **Signals to check then:** per-cohort processing time against the service-level target; backlog trend attributable to the waiver; take-up rate among eligible businesses in cohorts 1-2; whether the last-sequenced cohort skews toward the highest-need businesses; Budget Office reconciliation status; and the Main Street Coalition's public posture (supportive, neutral, or hardened).

**Field notes:**
- **Confidence** is what makes the entry calibratable. Over many entries, comparing stated confidence to actual hit rate is the calibration signal; this single 65% cannot give it to me alone.
- **Review date** is what turns the entry from a diary note into a tool. An entry that is never reopened delivers no calibration. Pair this with `think-after-action-review` when 2026-12-31 arrives.
- Do not edit the prediction, confidence, or assumptions after the outcome is known. The point of the record is that it is fixed; rewriting it reintroduces the hindsight bias this entry exists to defeat.

## Why this prompt worked

Priya front-loaded the whole decision - the call, the owner, the publication date, every stakeholder's interest, the alternatives, the real equity-versus-delivery tension, and the source documents - so the framework had a genuine prediction to pin down rather than a vague intention. Her explicit ask for a stated confidence, disconfirming signals, and a real review date is exactly what the method enforces: an honest 65%, five checkable assumptions, and a December date fixed in place before any number exists. The detailed style did not buy a longer entry, it bought a calibratable one.

## What happened next

Priya filed the memo with the entry saved alongside it, unpublished and unedited. The disconfirming signal did real work immediately: writing "take-up below 50% would prove me wrong" made her add a take-up dashboard to the operations plan so the signal would actually be observable in December. The entry is meant to be reopened, not admired - when the review date arrives she will run `think-after-action-review` against it and compare what happened to the 65% and five assumptions she fixed today, calibrating her judgment instead of quietly rewriting it. If she had not been sure which framework to record this with, she could have described the situation to the [framework advisor](../../tools/think-framework-advisor/) and run the plan it returned.
