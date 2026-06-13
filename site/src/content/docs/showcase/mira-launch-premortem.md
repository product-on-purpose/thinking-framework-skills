---
title: "Mira runs a premortem on a launch"
description: A seed-stage founder stress-tests a free-tier launch with a casual one-line prompt and gets a ranked risk register with tripwires and kill criteria.
sidebar:
  label: "Mira -> premortem"
---

> **Mira**, solo founder of an 8-person seed-stage startup. The decision: launch a free tier in six weeks to drive signups. Prompting style: casual.

This is a complete run, prompt to artifact. Framework: [Premortem](../../frameworks/think-premortem/). For the cast and the other journeys, see the [Showcase index](../).

## The situation

Mira's board wants signup growth. A free tier is the obvious lever, and the team is excited, which is exactly when she gets nervous. She does not write a brief; she types what is in her head.

## The prompt

```
/think-premortem "launching a free tier in 6 weeks to drive signups. nervous it
just cannibalizes our paid plan and that support gets swamped. small team."
```

That is the whole prompt. Casual, one situation, the two worries on her mind. The framework supplies the rest.

## The output

> **Premortem Risk Register - Free-tier launch**

**Decision:** Launch a self-serve free tier in 6 weeks to drive top-of-funnel signups.
**Intended outcome:** A step-change in qualified signups that converts to paid, without starving the paid plan or the support queue.
**Horizon:** 4 months after launch.
**Reversibility:** One-way door in practice - pulling a free tier after launch is public and damages trust.

**The failure, declared.** *It is four months after launch. The free tier shipped and the plan failed badly: signups tripled but paid net-new revenue went flat, two of our four engineers are now full-time on free-tier support and abuse, and the board read the signup chart as success while the cash chart said otherwise.*

**Top risks and what we will do.** The three most likely ways this fails: (1) the free tier **cannibalizes paid** because the free plan is too generous - we will gate the two features paying customers value most and instrument the free-to-paid path before launch; (2) **support and abuse swamp an 8-person team** - we will cap free usage and ship self-serve docs before opening the doors; (3) **vanity signups hide flat revenue** - we will report free-to-paid conversion, not raw signups, from week one.

| # | Cause of failure | Likelihood | Impact | Leading signal / tripwire | Mitigation | Owner | Kill criterion |
|---|---|---|---|---|---|---|---|
| 1 | Free plan is generous enough that paying customers downgrade | H | H | >5% of active trials choose free over paid in weeks 1-2; paid net-new flat while signups climb | Gate the top 2 paid-value features; instrument the free-to-paid funnel pre-launch | Mira | Paid net-new revenue below the pre-launch trend for 3 straight weeks, attributable to downgrades |
| 2 | Support + abuse load swamps the 8-person team | H | H | Support tickets per 100 free users above threshold by week 2; eng pulled onto abuse triage | Hard usage caps; self-serve onboarding + docs; basic rate-limiting at sign-up | Eng lead | More than one engineer-week per week on free support for a month with no path down |
| 3 | Raw-signup vanity metric masks flat revenue | M | H | Board deck leads with signups; conversion not yet instrumented at launch | Define and ship the free-to-paid conversion metric before launch; lead every update with it | Mira | Launch slips if conversion tracking is not live (it is a launch gate, not a follow-up) |
| 4 | The 6-week timeline forces an insecure self-serve flow | M | H | Auth/billing edge cases open in QA week 5; no security pass by week 4 | Cut scope to a thin, secure path; freeze features at week 2; security gate at launch-minus-1-week | Eng lead | Security review not green by the launch-minus-1-week gate |
| 5 | "Free" attracts users with no fit, who never convert | M | M | Free cohort looks nothing like paying customers; week-4 activation low among good-fit users | Light qualification at sign-up; track activation by fit, not raw count | Mira | After 8 weeks, good-fit free-to-paid conversion is below the breakeven the model needs |

**Watch list.** Brand read ("they went freemium, must be struggling") - monitor sentiment, low likelihood. Free tier used for spam - standard rate-limiting likely sufficient.

## Why this prompt worked

It named the **decision**, a **horizon was implied** by "6 weeks," and it surfaced the **two real worries** (cannibalization, support). That was enough for the framework to do its job - declare the failure in the past tense, generate causes beyond the two she named, and force each into a tripwire and a kill criterion. No structure or polish was required of Mira.

## What happened next

Mira did not run the launch off this; she ran the launch *better*. Risk #3 changed the plan immediately: conversion tracking became a launch gate, so the board would never again read signups as success. She carried the register into the launch doc, gave each top risk an owner, and re-read the kill criteria the week of launch, when momentum is highest and judgment is worst. Next in her thread: she could not choose between two pricing models for the new tier, so she ran the [stress-test-a-decision recipe](../mira-pricing-decision/).
