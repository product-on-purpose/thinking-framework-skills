---
title: "Qualitative Comparative Analysis (QCA) - quick sample"
description: A by-name QCA request handled honestly - warn with the simulation evidence, then redirect to the move the job actually needs.
sidebar:
  label: qualitative-comparative-analysis
---

:::caution[QCA is a contested lens (warn-and-redirect)]
QCA is tier P: established research practice, not a session-sized move. At the casual scale a single reasoner can reach, simulations show it certifies configurations from noise (Krogslund, Choi and Poertner 2015; Lucas and Szatrowski 2014 recovered the correct story 3 times across 70 solutions). This skill does not build the truth table as if valid; it warns and routes to an evidence-based move. It fires only because QCA was asked for by name, and it is explicit-request-only.
:::

> A compact worked example of [Qualitative Comparative Analysis](../../frameworks/think-qualitative-comparative-analysis/) handled honestly. For full end-to-end narratives see the [Showcase](../../showcase/); for the evidence behind the method see its [framework page](../../frameworks/think-qualitative-comparative-analysis/).

## Situation

Daniel runs operations at a mid-size agency. After a string of mixed client-onboarding results, his head of delivery says: "Run a QCA across our last dozen onboardings and tell us which combination of conditions - dedicated PM, kickoff workshop, fixed scope - is sufficient for a smooth onboarding." Daniel has read enough to know that coding a dozen loosely-remembered projects into a truth table tends to manufacture confidence rather than accuracy, but the request is explicit, so he wants to answer it honestly rather than refuse.

## Prompt

```text
/think-qualitative-comparative-analysis "Head of delivery wants a QCA across our last dozen client onboardings to find which combination of conditions is sufficient for a smooth onboarding."
```

## The artifact

> **Evidence caveat (read first):** QCA is tier P established research practice, but it does not fit a single-reasoner session. Simulations show it certifies configurations from noise at the casual scale a session can reach (Krogslund, Choi and Poertner 2015; Lucas and Szatrowski 2014 recovered the correct story 3 times across 70 solutions). This brief does not build the truth table as if valid.

### What was asked

- A QCA across the last dozen onboardings to find a configuration of conditions sufficient for a smooth onboarding. The real decision: where to invest to make the next onboarding go well.

### Why not the QCA truth table

- A dozen loosely-remembered onboardings across three or more conditions is the limited-diversity, casual-calibration regime where the simulation literature shows QCA stamps "sufficient" onto noise. Krogslund and colleagues certified random variables as sufficient; Lucas and Szatrowski recovered the true story 3 times in 70. A truth table here would hand Daniel a confident "dedicated PM plus kickoff workshop is sufficient" verdict built from memory, which is exactly the false confidence to avoid. Proper QCA is a research program, not a session move.

### Is the input even there?

- No. Daniel has a dozen projects, not a calibrated medium-N population, and no defensible coding of "smooth" or of each condition's membership. The input precondition fails before any conditions are coded.

### The evidence-based move instead

- A set of comparable past cases, and you want a base rate (an outcome distribution), not coded configurations: `think-reference-class-forecasting`.
- One case, and you want a causal account: within-case process tracing in prose.

- **Chosen move:** `think-reference-class-forecasting`. The honest question behind "which configuration is sufficient" is "given onboardings like ours, how often do they go smoothly, and what is the base rate when a dedicated PM is assigned?" Reference-class forecasting takes the comparable past onboardings as an outcome distribution and gives a defensible base rate, instead of certifying a sufficient configuration from a dozen anecdotes. If Daniel later wants to understand why one specific onboarding went badly, that is within-case process tracing in prose, not a cross-case truth table.

## Why this framework fits

The head of delivery asked for QCA by name, so refusing would not help. Handled honestly, the skill leads with the simulation record, checks whether the input even exists, declines to manufacture a sufficient-configuration verdict from a dozen memories, and hands Daniel a concrete, better-grounded next move: a base rate from the comparable cases he actually has. Unaided, "run a QCA" produces a sufficient configuration that feels rigorous and is not; the redirect produces an actual, defensible step.
