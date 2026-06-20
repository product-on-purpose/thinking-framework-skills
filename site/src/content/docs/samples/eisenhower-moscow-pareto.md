---
title: "Eisenhower / MoSCoW / Pareto - quick sample"
description: An explicitly-requested prioritization preset run caveat-first - one of the three (here a Pareto chart), with the real measured concentration and the limit named.
sidebar:
  label: eisenhower-moscow-pareto
---

:::caution[Eisenhower / MoSCoW / Pareto is a contested lens]
These are tier P practitioner presets, not one method but three different operations stapled by the word "prioritization", each weakly evidenced. The strong study attached to the Eisenhower matrix (Zhu, Yang and Hsee 2018) measures the urgency bias the matrix targets, not the matrix as a remedy; Pareto concentration is usually not 80-20 (about 0.73 in Kim, Singh and Winer 2017). This sample runs only the preset asked for, leads with the caveat, and names the limit. For the rigorous vital-few move prefer [theory of constraints](../../frameworks/think-theory-of-constraints/); this fires only because a Pareto chart was asked for by name.
:::

> A compact worked example of [Eisenhower / MoSCoW / Pareto](../../frameworks/think-eisenhower-moscow-pareto/) on a realistic situation. For full end-to-end narratives see the [Showcase](../../showcase/); for the evidence behind the methods see its [framework page](../../frameworks/think-eisenhower-moscow-pareto/).

## Situation

Mira runs support for a mid-size SaaS and is drowning in ticket volume. A board deck asks her to "apply the 80-20 rule and show the vital few drivers." She has heard the 80-20 figure is more slogan than law, so she wants the Pareto chart run honestly with the real measured split, not a tidy 80-20 she would have to defend later.

## Prompt

```text
/think-eisenhower-moscow-pareto "Apply the 80-20 rule to our last quarter's support tickets and show me the vital few drivers, honestly - I don't want a made-up 80-20 split."
```

## The artifact

> **Pareto caveat (read first):** Pareto is a tier P practitioner preset. The concentration is a real distributional fact in some domains but domain-dependent and usually not 80-20 (about 0.73 in Kim, Singh and Winer 2017). A Pareto chart shows concentration, not causation - it does not prove the vital few are causally binding. What follows uses the actual measured shares, not an assumed 80-20.

### What this prioritization is about

- Where last quarter's support tickets concentrate, so effort goes to the vital few drivers. The board asked for Pareto by name, so that is the one preset run here.

### Pareto (vital few)

| Rank | Ticket driver | Contribution (share) | Cumulative |
|---|---|---|---|
| 1 | Login / SSO failures | 31% | 31% |
| 2 | Billing and invoice questions | 22% | 53% |
| 3 | Data import errors | 14% | 67% |
| --- cut line: vital few above (67% from 3 of 9 drivers) --- | | | |
| 4 | Permissions / role confusion | 9% | 76% |
| 5 | Export / reporting bugs | 7% | 83% |
| 6-9 | Long tail (UI, mobile, integrations, misc) | 17% | 100% |

- **Measured concentration:** three of nine drivers account for 67% of tickets - a real concentration, but not the assumed 80-20. Reaching 80% takes the top five, not the top three.
- **Limit named:** this chart shows where tickets concentrate, not why. It does not prove that fixing SSO is the highest-leverage move - login failures may be a symptom of an upstream auth change, not the binding constraint. To test which few are actually causally binding on throughput, `think-theory-of-constraints` adds the capacity-versus-demand step a bare Pareto chart lacks.

### What to do next

- The vital few are SSO, billing, and import (67% of volume). Verify the one thing the chart cannot: before pouring effort into SSO, confirm it is a root cause and not a downstream symptom. Run that check (or `think-theory-of-constraints`) on the top driver; the cut line tells you where to look, not what to fix.

## Why this framework fits

The board asked for the 80-20 rule by name, so a flat refusal would not help. Run caveat-first, the lens still earns its keep: it uses the real measured shares (67% from three drivers, not a manufactured 80-20), draws an honest cut line, and names the one thing a Pareto chart cannot do - tell causation from concentration. Unaided, "apply the 80-20 rule" produces a confident 80-20 split and a vital few that may not be vital; the honest version produces a defensible focus and the verification step that gates it.
