---
title: Prompt gallery
description: Real prompts, learn by example. The same frameworks run from a one-line casual prompt, a structured block, or by letting the advisor choose. The lesson - your messy prompt is fine; the framework does the structuring.
sidebar:
  order: 2
---

The best prompt is the one you will actually type. These are real invocations in three styles. The point: **a sparse prompt produces the same complete artifact as a polished one** - the framework structures the output, not the prompt. You just supply the situation.

## The three ways to ask

| Style | Who it fits | What it looks like |
|---|---|---|
| **Casual** | you know the move and want it now | one or two sentences, the decision and the worry |
| **Organized** | higher stakes, you front-load context | situation, constraints, what you already tried |
| **Advisor-routed** | you do not know which framework | describe the mess; let the advisor sequence it |

The recurring names below (Mira, Daniel, Priya) are the [cast](../../showcase/): a founder, an engineer, and a policy analyst, so you can see each style in its natural voice.

## Advisor-first: when you do not know the move

Lead here when you are unsure. Describe the situation in plain language to the [Framework Advisor](../../tools/think-framework-advisor/) and run the plan it returns.

```
/think-framework-advisor "we keep arguing about whether to rebuild the billing
service or patch it. high stakes, hard to reverse, and honestly I think we're
each defending a position we picked months ago. help me think about it."
```

> Returns a short Thinking Plan: typically frame the real question first, then compare the options, then stress-test the choice - with the one or two frameworks for each step and what to skip.

```
/think-framework-advisor "stuck on pricing for the new tier. not even sure
pricing is the actual problem."
```

> The advisor will often tell you the framing is the problem before the pricing is - and route you to restate it first.

## Premortem

[think-premortem](../../frameworks/think-premortem/) - a ranked risk register with tripwires and kill criteria.

**Casual (Mira)**
```
/think-premortem "launching a free tier in 6 weeks, nervous it cannibalizes paid
and swamps support"
```

**Organized (Daniel)**
```
/think-premortem "
Decision: cut over the payments service to the new provider in one weekend.
Constraints: 3-engineer team, no rollback once funds route, Q3 freeze starts in 4 weeks.
Already considered: dual-running both providers (too expensive).
Stress-test this plan before we commit."
```

**Advisor-routed**
```
/think-framework-advisor "about to commit to a risky migration, want to know how
it could go wrong before we pull the trigger"
```

## Problem Restatement

[think-problem-restatement](../../frameworks/think-problem-restatement/) - several reframings of the problem, with one chosen working frame.

**Casual (Mira)**
```
/think-problem-restatement "I can't decide who to hire for the first eng role"
```

**Detailed (Priya)**
```
/think-problem-restatement "
We are framing this as 'how do we increase form completion rates.' Stakeholders:
applicants (mostly mobile, time-poor), caseworkers, the audit team. I suspect the
real problem is upstream of the form. Restate it before we redesign anything."
```

## Comparing options

[think-linear-model-aggregation](../../frameworks/think-linear-model-aggregation/) (weighted scoring) and [think-pairwise-comparison](../../frameworks/think-pairwise-comparison/) (head-to-head when you cannot score).

**Organized (Daniel), weighted**
```
/think-linear-model-aggregation "
Options: migrate to Postgres, stay on MySQL, move to cloud-hosted.
Criteria: operational cost (high weight), team familiarity (medium), migration
risk (high), query flexibility (low).
Context: 18-month runway, 3-person backend team, no dedicated DBA.
Ruled out: NoSQL (compliance)."
```

**Casual (Mira), head-to-head**
```
/think-pairwise-comparison "three names for the product and I keep flip-flopping.
help me rank them, I don't trust my gut here"
```

## Reasoning through an ethical trade-off

[think-ethical-matrix](../../frameworks/think-ethical-matrix/) - a grid of affected parties against principles, read for the trade-off pattern.

**Detailed (Priya), by hand**
```
/think-ethical-matrix "
Feature: mandatory approval gates on shared documents. Affected: document authors,
approvers, downstream readers, and people who are never consulted but are affected
by what ships. Principles: wellbeing, autonomy, fairness. Surface the trade-offs;
I will run this on paper for the review."
```

## Diagnosing a recurring problem

[think-causal-loop-diagrams](../../frameworks/think-causal-loop-diagrams/) (feedback loops) and [think-process-tracing](../../frameworks/think-process-tracing/) (rival causes of a single case).

**Organized (Daniel)**
```
/think-causal-loop-diagrams "
The approval queue keeps growing no matter how many reviewers we add. Reviewers
say more reviewers means more context-switching means slower reviews. Map the
loops so I can find what actually drives the backlog."
```

## Key takeaway

All three styles, and the advisor route, produce a complete, on-spec artifact. The only difference is **how much you front-load** and **whether you let the advisor choose the sequence**. So do not polish - describe the real situation, name the stakes, and run it. To see these prompts produce full artifacts end to end, read the [Showcase](../../showcase/).
