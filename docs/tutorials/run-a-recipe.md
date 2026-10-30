---
title: "Run a recipe end to end"
description: "Walks through chaining three skills with a recipe, carrying one compressed artifact between them, for a reader who has already run a single skill"
audience: both
level: beginner
---

# Run a recipe end to end

[Getting started](../getting-started.md) runs one skill, `think-premortem`, and stops. This tutorial goes one step further: it runs a **recipe**, a composable chain of several skills that solves one recurring job end to end, carrying a compressed artifact from each step into the next. Follow it with the `expand-options` recipe and your own real problem; the worked example below shows the shape so you can tell a good run from a vague one.

You need the plugin installed (see [Getting started](../getting-started.md#install)). No agent is required - every step is also a numbered procedure you can run by hand with a pen and the skill's `references/TEMPLATE.md`.

## 1. Pick a recipe and read its chain

Recipes live two places: `_workflows/think-<name>.md` carries the chain as data, and `recipes/<name>.md` carries the fuller prose. Open [`_workflows/think-expand-options.md`](../../_workflows/think-expand-options.md):

```
steps:
  - think-problem-restatement
  - think-scamper
  - think-assumption-reversal
```

Three skills, in order: restate the problem into a chosen frame, generate variations on it with SCAMPER, then reverse its foundational assumptions to find assumption-breaking alternatives. Each step's output is not thrown away - it is compressed and carried into the next.

## 2. Pick a real decision

Use something you actually have a stake in. For this walkthrough: *"Our onboarding email sequence has a 40% open rate and a 4% activation rate. We want more people to activate."*

## 3. Run the first skill and carry its output forward

```
/think-problem-restatement "our onboarding email sequence has a 40% open rate and a 4% activation rate, we want more people to activate"
```

The recipe tells you what to carry forward: the **chosen working frame**. A real run might settle on: *"The problem is not open rate, it is that the email asks people to read before they act; reframe as: get a first successful action inside the email itself."*

## 4. Run the second skill against that frame

```
/think-scamper "get a first successful action inside the onboarding email itself"
```

Carry forward the **SCAMPER shortlist** - the handful of variations that survived, not the full worked table. For example: *(1) Substitute the CTA link for an inline one-click action, (2) Combine the welcome email with the first setup step, (3) Eliminate the second email entirely and front-load everything into email one.*

## 5. Run the third skill against the shortlist

```
/think-assumption-reversal "get a first successful action inside the onboarding email itself, candidates: inline one-click action / combine welcome with setup / front-load into email one"
```

This reverses the assumptions baked into those three candidates (for instance: *assumes the user has already created an account before email one arrives* - what if they haven't?) and returns the **combined shortlist**, flagged as candidates, not decisions.

## 6. What you should have at the end

A de-duplicated shortlist of options spanning incremental variations (step 2's SCAMPER moves) and assumption-breaking alternatives (step 3's reversals), ready to hand to a decision skill such as `think-decision-option-review`. If your run instead produced three separate essays with no shortlist at the end, the recipe did not do its job of carrying a compressed artifact between steps - see [Troubleshooting](../troubleshooting.md#the-skill-fires-but-the-output-is-prose-not-an-artifact) and ask explicitly for the named artifact at each step.

## Where to go next

- Run the same chain on your own problem, start to finish, before trying a second recipe.
- [`recipes/`](../../recipes/) lists all nine; each page names its composite artifact and what it hands off to.
- [How to run the conformance gate locally](../how-to/run-the-conformance-gate-locally.md) if you are about to contribute a change rather than just use the library.
