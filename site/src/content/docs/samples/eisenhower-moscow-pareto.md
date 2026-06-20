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

Mira is six weeks out from a seed raise and buried in asks - feature requests from customers, a "you need this for the deck" list from her advisor, and the team's own pile of things they want to fix before the round. There are too many to do all of them with eight people. Her advisor told her to "just 80-20 it - run a Pareto on what's actually driving churn and build to that." She has heard the 80-20 figure is more slogan than law, so she wants the Pareto chart run honestly with the real measured split, not a tidy 80-20 she would have to defend in a partner meeting.

## Prompt

```text
/think-eisenhower-moscow-pareto "My advisor says to 80-20 the pre-raise asks - run a Pareto on what's actually driving our churn and build to that. Give me the vital few drivers honestly, no made-up 80-20 split I'll have to defend to investors."
```

## The artifact

> **Pareto caveat (read first):** Pareto is a tier P practitioner preset. The concentration is a real distributional fact in some domains but domain-dependent and usually not 80-20 (about 0.73 in Kim, Singh and Winer 2017). A Pareto chart shows concentration, not causation - it does not prove the vital few are causally binding. What follows uses the actual measured shares, not an assumed 80-20.

### What this prioritization is about

- Where churn-driving complaints concentrate, so the eight people build to the vital few before the raise instead of spreading thin across every ask. The advisor asked for Pareto by name, so that is the one preset run here.

### Pareto (vital few)

| Rank | Churn driver (cited reason on cancel + exit interviews) | Contribution (share) | Cumulative |
|---|---|---|---|
| 1 | Onboarding stalls - never reached first value | 33% | 33% |
| 2 | Missing integration with their existing stack | 21% | 54% |
| 3 | Pricing too steep for the value seen so far | 13% | 67% |
| --- cut line: vital few above (67% from 3 of 9 drivers) --- | | | |
| 4 | Performance / reliability complaints | 9% | 76% |
| 5 | Mobile gaps | 7% | 83% |
| 6-9 | Long tail (reporting, UI nits, SSO, misc) | 17% | 100% |

- **Measured concentration:** three of nine drivers account for 67% of cited churn - a real concentration, but not the assumed 80-20. Reaching 80% takes the top five, not the top three.
- **Limit named:** this chart shows where churn complaints concentrate, not why. It does not prove that fixing onboarding is the highest-leverage move - "never reached first value" may be a symptom of the wrong customers signing up, not the binding constraint on retention. To test which few are actually causally binding on retention, `think-theory-of-constraints` adds the capacity-versus-demand step a bare Pareto chart lacks.

### What to do next

- The vital few are onboarding, the missing integration, and pricing (67% of cited churn). Verify the one thing the chart cannot: before pointing the team at onboarding for six weeks, confirm it is a root cause and not a downstream symptom of who you sold to. Run that check (or `think-theory-of-constraints`) on the top driver; the cut line tells you where to look, not what to fix.

## Why this framework fits

The advisor asked for the 80-20 by name, and with six weeks and eight people Mira does need a focus, so a flat refusal would not help. Run caveat-first, the lens still earns its keep: it uses the real measured shares (67% from three drivers, not a manufactured 80-20), draws an honest cut line, and names the one thing a Pareto chart cannot do - tell causation from concentration. Unaided, "just 80-20 it" produces a confident 80-20 split and a vital few that may not be vital; the honest version gives Mira a defensible pre-raise focus and the verification step that gates it before she commits the team.
