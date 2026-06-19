---
title: "SCAMPER - quick sample"
description: SCAMPER on a stalled onboarding flow whose only proposed fixes are minor tweaks to the same wizard.
sidebar:
  label: scamper
---

> A compact worked example of [SCAMPER](../../frameworks/think-scamper/) on a realistic situation. For full end-to-end narratives see the [Showcase](../../showcase/); for the evidence behind the method see its [framework page](../../frameworks/think-scamper/).

## Situation

Mira's seed-stage app has a five-step setup wizard that new users hit on first login. Activation is stuck: about 60 percent of signups never finish the wizard, and every idea the team has floated is a tweak to the same flow - shorter copy, a progress bar, one fewer field. Mira wants to push the wizard idea past those obvious incremental edits before the team commits a sprint to polishing it.

## Prompt

```text
/think-scamper "Our 5-step onboarding wizard. ~60% of signups bail before finishing. Every fix we've come up with is just tweaks to the same wizard - shorter copy, a progress bar. Run it through SCAMPER so I get options that aren't just polishing the thing we already have. Shortlist what's worth trying."
```

## The artifact

# SCAMPER Expansion Sheet

## Seed

- **What is being transformed:** The five-step first-login setup wizard that new users must complete before reaching the product.

## Expansion

| Lens | Prompt | Variations generated |
|---|---|---|
| Substitute | swap a component, material, rule, or person | Replace the upfront wizard with sensible defaults the user can change later; or have an onboarding specialist do the setup live for the first cohort of high-intent signups |
| Combine | merge with another idea, feature, or step | Fold setup into the first real task so configuration happens as a side effect of doing useful work; or pair each step with a sample dataset so the user sees payoff before finishing |
| Adapt | borrow a solution from another domain | Adopt the game-tutorial pattern: drop the user straight into a working sandbox and surface setup as just-in-time tooltips, the way games teach controls mid-play |
| Modify | magnify or minify an attribute | Minify to a single required step (collect only what blocks first value, defer the rest); or magnify the payoff by front-loading a visible "aha" result before any setup is asked for |
| Put to other use | a different user, job, or context | Repurpose the wizard as an optional admin-settings page for power users who want full control, rather than a mandatory gate for everyone |
| Eliminate | remove a part, step, or assumption | Eliminate the wizard entirely: let users explore a pre-populated demo workspace immediately, and ask for their own data only when they try to act on it |
| Reverse | invert order, roles, or direction | Reverse the order: let users use the product first and configure last, prompting for each setting at the moment it first matters instead of all upfront |

## Shortlist (carry forward)

The three to five most promising variations, and why:

1. **Defer setup, lead with value (Eliminate + Reverse)** - drop users into a pre-populated demo workspace and ask for their own data only when they act. Directly attacks the 60 percent drop-off by removing the gate that produces it; the cheapest hypothesis to test against the current funnel. Run it as an A/B against the existing wizard.
2. **Progressive, just-in-time config (Adapt + Modify)** - one required step, the rest surfaced as tooltips at the moment each setting first matters. Keeps necessary configuration but spreads it across real usage instead of one upfront wall. Prototype on the two settings that genuinely block first value.
3. **Setup-as-first-task (Combine)** - fold configuration into completing the user's first real task so it never feels like a separate wizard. Higher build cost, but turns setup from a tax into progress; worth scoping after the cheaper two are measured.

*Note: the value here is that Eliminate and Reverse produced the option that best fits the real constraint - users bail because value comes after the work, so move the value first - which the team's "polish the wizard" framing never reached. These are candidates, not decisions. Carry the shortlist into a decision skill, then test the chosen option against the live funnel before committing a sprint.*

## Why this framework fits

The team was fixated on incremental edits to one artifact, so SCAMPER's job here is to force structurally different moves (remove it, reverse it, fold it in) that "shorten the copy" thinking never surfaces. The expansion sheet gives Mira a shortlist of testable, structurally distinct options with reasons, instead of another round of polishing the wizard she already doubts.
