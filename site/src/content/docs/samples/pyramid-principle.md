---
title: "Pyramid Principle - quick sample"
description: Structure a finished migration recommendation answer-first for a busy engineering leadership review.
sidebar:
  label: pyramid-principle
---

> A compact worked example of [Pyramid Principle](../../frameworks/think-pyramid-principle/) on a realistic situation. For full end-to-end narratives see the [Showcase](../../showcase/); for the evidence behind the method see its [framework page](../../frameworks/think-pyramid-principle/).

## Situation

Daniel, a staff engineer at a 200-person company, has finished a two-week spike on the team's flaky checkout service. The analysis is done and the call is made: split the monolithic payment module into a separate service, but only after a read-only shadow period proves parity. Now he has a 20-minute slot in the architecture review and a memo to write, and his draft currently opens with three paragraphs of incident history before it reaches the recommendation.

## Prompt

```
/think-pyramid-principle "I've decided we should extract the payment module into its own service, but gated behind a shadow-traffic parity check first. I need to write this up for the architecture review - the VP of Eng and two principals will skim it. Structure it answer-first so the recommendation leads."
```

## The artifact

## Subject

- **Recommendation being communicated:** Extract the payment module from the checkout monolith into a standalone service, but only after a read-only shadow period demonstrates response parity; if parity fails, hold the extraction. (The spike is finished and the decision is made; this is the write-up, not the analysis.)
- **Reader:** The VP of Engineering and two principal engineers on the architecture review board - skim-readers who want the call first and the option to descend into the tradeoffs.
- **Ordering logic for the key arguments:** Importance. The board's first question is "why split this at all?", so the arguments run the problem the split solves, then the gate that makes it safe, then the cost of leaving it alone.

## Governing thought (top of the pyramid)

**Extract the payment module into its own service this quarter, but gate the cutover behind a two-week read-only shadow period that must prove response parity; if shadow parity fails, hold the extraction and reassess.**

## Optional SCQA intro

- **Situation:** Checkout is a single deployable monolith, and any change to it - including unrelated features - has to ship through the payment code's release train.
- **Complication:** Payment is now the top source of checkout incidents and the slowest part of the release train, so every team's velocity is coupled to its most fragile component.
- **Question:** Should we extract payment into its own service now, and how do we do it without risking live revenue?
- **Answer:** Yes, extract it this quarter, but only after a shadow period proves parity (= the governing thought).

## The pyramid

```
GOVERNING THOUGHT: Extract payment into its own service this quarter, gated behind a two-week
                   read-only shadow period that must prove parity; if parity fails, hold.

  KEY ARGUMENT 1: Extraction is the only change that removes the coupling now slowing every team.
    - support: Payment owns 6 of the last 8 checkout incidents (Sev1/Sev2 over the last quarter), yet ships on the shared monolith train.
    - support: Three feature teams blocked a release in the last month waiting on a payment hotfix they did not author.
    - support: The spike confirmed payment has a clean call boundary already; the coupling is in deploy and ownership, not in the data model.

  KEY ARGUMENT 2: It is only safe if cutover is gated, so the shadow period is a condition, not a nice-to-have.
    - support: Parity risk - subtle behavior drift on live payments costs real revenue; gate = mirror production traffic read-only to the new service for two weeks and diff every response before any write traffic moves.
    - support: Rollback risk - a bad cutover must be reversible in minutes; gate = keep the monolith path warm behind a flag, with a one-flag revert and a named on-call owner for the window.
    - support: Pass/fail must be pre-agreed - "looks fine" is not a gate; gate = a written parity threshold (response diff rate and p99 latency) agreed with the board before shadow starts, with hold as the default on failure.

  KEY ARGUMENT 3: Leaving payment in the monolith costs more each quarter than the gated extraction risks.
    - support: Every quarter of delay keeps all checkout teams on the slowest, most incident-prone release train, so the coupling tax compounds.
    - support: The shadow gate makes the downside bounded and reversible (read-only mirror, warm rollback, kill criteria), whereas a recurring payment Sev1 is an unbounded live-revenue event.
    - support: The extraction work is already scoped from the spike; deferring it does not reduce the work, it only delays the relief and lets the boundary erode.
```

## Structure check

- **Vertical:** each key argument answers "why extract now behind a shadow gate?" - because extraction removes the coupling that slows everyone (1), because it is safe only if the cutover is gated (2), and because waiting costs more than the gated move risks (3). Each support backs its own key line.
- **Horizontal (MECE):** the three key lines do not overlap - the problem being solved, the safety condition, and the cost of delay are distinct concerns. Together they answer the board's three real questions - is it worth doing, is it safe, and why now - leaving no material gap before an extraction decision.
- **Sum:** the three key arguments justify exactly the governing thought, including its "if parity fails, hold" condition (argument 2 is what makes the shadow gate non-negotiable). They do not claim the extraction is guaranteed to succeed, only that it is the right gated bet.

**Column / element notes:**
- **Governing thought:** the answer and its single hard condition land first; a reader who stops here has the call.
- **Key argument:** each is a claim in its own right (not a heading like "background"), and each answers the question the line above provokes.
- **Support:** the evidence layer holds the incident counts, the gate mechanics, and the thresholds, so the top of the pyramid stays scannable.

> This pyramid makes the recommendation clearer to follow and surfaces an inspectable structure; it does not, on its own, prove the extraction is the right call. The skill's evidence is tier P (practitioner): the answer-first convention is durable in executive communication, but there is no body of controlled studies on the named method for AI-augmented use. See the [framework page](../../frameworks/think-pyramid-principle/) for the full grading and caveats.

## Why this framework fits

Daniel already had the decision, so the cognitive job was not analysis but ordering - putting the call and its one hard condition in the first line so skim-readers get the recommendation before the incident history. The pyramid gives him an inspectable answer-first tree where unaided drafting would have buried the gated cutover under context, leaving the board to reconstruct the point themselves.
