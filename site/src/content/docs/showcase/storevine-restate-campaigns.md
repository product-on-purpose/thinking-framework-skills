---
title: "Storevine reframes a build request"
description: An ecommerce platform turns "build native Campaigns" into the actual problem before committing a quarter of eng.
sidebar:
  label: "Storevine -> restate"
---

> **Dana Okafor**, Group PM for Growth at Storevine (B2B ecommerce, 70 staff, 15K merchants). The decision: whether to build "Campaigns," a native email/SMS feature, this quarter. Prompting style: organized.

This is a complete run, prompt to artifact. Framework: [Problem Restatement](../../frameworks/think-problem-restatement/). For the cast and the other journeys, see the [Showcase index](../).

## The situation

About 40% of Storevine's merchants export their contact lists to a third-party ESP (Klaviyo or Mailchimp) to send email and SMS, because Storevine has no native way to do it. The asks have piled up, and the obvious move is "build the feature they keep requesting." Dana runs the Growth pod (herself, three engineers, and one designer), and the budget on the table is roughly one quarter of that pod, about 13 weeks. The CEO's stated priority this year is merchant retention. Before she lets the team scope "Campaigns," she wants to be sure they are solving the merchant's actual problem and not just defaulting to the solution someone named in a ticket. So she writes a tight, structured prompt.

## The prompt

```
/think-problem-restatement "Situation: merchants keep exporting contact lists to Mailchimp
because we have no native email/SMS. Proposal on the table: build 'Campaigns' natively this
quarter. Constraints: 70-person team, 15K merchants, ~one quarter of eng capacity, deliverability
is a hard requirement. Considered so far: native build vs deep integration with an ESP. Before we
scope, restate the problem so we aren't just defaulting to 'build the feature they named.'"
```

Organized and complete: the situation, the proposal, the constraints, and what has already been considered, all front-loaded. The framework supplies the reframings.

## The output

> **Problem Frame Set - Campaigns**

## Problem as given

- **Stated problem (verbatim):** "Merchants keep exporting contact lists to Mailchimp because we have no native email/SMS. Build 'Campaigns' natively this quarter."
- **Framed by:** Dana Okafor, Group PM for Growth (carrying the accumulated merchant requests).
- **Flags:** Names a presupposed solution ("build Campaigns natively") for an unstated goal. The export behavior is a symptom, not the problem. The infra/deliverability viewpoint (Leah Chen) and the margin viewpoint are absent from the framing; so is the CEO's actual objective, retention.

## Restatements

| # | Restated problem | Move used | Why this might be the real problem |
|---|---|---|---|
| 1 | How do we increase merchant retention by making Storevine the place merchants run their whole business from? | altitude up (goal) | The CEO's stated goal is retention; "Campaigns" is one lever toward it, not the objective. Solving for retention may not require a full native ESP. |
| 2 | Why do 40% of merchants leave Storevine to reach their own buyers, and what does that export step actually cost them? | altitude down (concrete) | The concrete failure is a broken workflow (export, re-import, manage two tools), not the absence of a feature called Campaigns. |
| 3 | What is the lowest-risk way to give merchants owned reach to their buyers from inside Storevine, with deliverability we can stand behind? | goal vs implementation | "Build native email/SMS" is an implementation. The job-to-be-done is reliable owned reach plus attribution, which an ESP integration could also deliver. |
| 4 | How do we add Campaigns without Leah's team owning a sender reputation that one bad merchant could wreck for all 15K? | stakeholder shift (infra / deliverability) | Surfaces the hard constraint the original framing buries: deliverability is shared infrastructure, and a native build makes Storevine the sender of record for every merchant. |
| 5 | How would we guarantee Campaigns ships, gets adopted, and still loses us money and merchants? | inversion | Exposes the buried assumptions: that merchants want to switch tools, that per-message cost is bearable, that we can run deliverability at ESP quality inside one quarter. |
| 6 | This is a problem of merchants needing owned reach and attribution inside Storevine; it is NOT necessarily a problem of Storevine needing to be its own ESP. | is / is not | Bounds scope and challenges the leap from "merchants export to Mailchimp" to "we must build a native ESP." |

## How Might We angles

- How might we keep merchants' buyer relationships inside Storevine without owning ESP-grade deliverability ourselves?
- How might we give merchants owned reach and attribution at the lowest irreversible cost this quarter?
- How might we test whether merchants will actually switch off Mailchimp before we build for it?
- How might we serve both the long-tail SMB (wants it easy) and the mid-market (wants data control) with one approach?

## Chosen working frame

- **Working frame:** "What is the lowest-risk way to give merchants owned reach and attribution to their buyers from inside Storevine, with deliverability we can stand behind, this quarter?"
- **Why:** It keeps the real goal (retention through owned reach) central, demotes "build native Campaigns" from a given to one testable option, and pulls the deliverability constraint and the build-vs-integrate question into the frame instead of leaving them downstream. It does not foreclose the native build; it refuses to assume it.
- **Hands off to:** option generation and then a decision skill to choose among native build, ESP integration, and partner/white-label, then a premortem on the chosen option.

*Note on evidence: that how a problem is framed affects the quality of the solution has moderate support transferred from human problem-finding and design research, not AI-validated; this skill sharpens the problem, it does not guarantee a better solution. Full grading: the [dossier](../../frameworks/think-problem-restatement/).*

## Why this prompt worked

Dana front-loaded the four things the framework needs to do real work: the **situation** (the export behavior), the **proposed solution** (build Campaigns natively), the **constraints** (team size, one quarter, deliverability), and **what had already been considered** (build vs integrate). That let the framework separate the goal from the named implementation, state the problem from the infra and margin viewpoints she had left out, and bound the scope with an explicit is/is-not, rather than reword "build Campaigns" into a synonym. The organized style did not produce a better artifact than a casual prompt would have; it just meant fewer assumptions had to be guessed.

## The handoff to pm-skills

The chosen working frame is the input the delivery layer needs. It feeds pm-skills' `define-problem-statement`, where Dana's team turns the framed problem into the canonical, one-page problem statement that anchors the rest of the build. What crosses the boundary is the decision (solve for owned reach and attribution, not for "a native ESP"), the constraints that must survive scoping (one quarter of the Growth pod, deliverability as a hard requirement, the mid-market data-control concern), and the open risk the inversion surfaced (merchants may not actually switch off Mailchimp). tfs framed the problem; pm-skills writes it down and carries it forward.

## Next in the thread

With the problem reframed as "owned reach at the lowest risk," the three real options are in play. Next, Dana runs a weighted option matrix on build vs buy vs partner: [Build vs buy vs partner](../storevine-build-vs-buy/).
