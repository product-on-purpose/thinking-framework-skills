---
title: "Qualitative Comparative Analysis (QCA) - quick sample"
description: A by-name QCA request from a program-evaluation steering group, handled honestly - warn with the simulation evidence, then redirect to the move the job actually needs.
sidebar:
  label: qualitative-comparative-analysis
---

:::caution[QCA is a contested lens (warn-and-redirect)]
QCA is tier P: established research practice, not a session-sized move. At the casual scale a single reasoner can reach, simulations show it certifies configurations from noise (Krogslund, Choi and Poertner 2015; Lucas and Szatrowski 2014 recovered the correct story 3 times across 70 solutions). This skill does not build the truth table as if valid; it warns and routes to an evidence-based move. It fires only because QCA was asked for by name, and it is explicit-request-only.
:::

> A compact worked example of [Qualitative Comparative Analysis](../../frameworks/think-qualitative-comparative-analysis/) handled honestly. For full end-to-end narratives see the [Showcase](../../showcase/); for the evidence behind the method see its [framework page](../../frameworks/think-qualitative-comparative-analysis/).

## Situation

Priya is a policy analyst at a state workforce agency, asked to compare seven county-run job-training program sites that all ran the same grant-funded curriculum but posted very different placement outcomes - three sites cleared the placement target, four fell short. The steering group's documents (the Q3 site-visit memos, the grantee self-reports, and the placement dashboard) gesture at the usual suspects: whether a site had an employer-partnership coordinator, whether it ran a paid work-experience component, and whether it was urban or rural. At the last meeting the steering-group chair said, in front of the program director and two grantee representatives: "Run a QCA across the seven sites and tell us which combination of conditions is necessary for a site to hit the placement target." Priya runs frameworks by hand and documents every step, and she has read enough of the QCA methods debate to know that coding seven loosely-described sites into a truth table tends to manufacture confidence rather than accuracy. The request is explicit and public, so she wants to answer it honestly and on the record rather than refuse.

## Prompt

```text
/think-qualitative-comparative-analysis "Steering-group chair wants a QCA across seven county job-training sites (3 hit the placement target, 4 missed) to find which combination of conditions - employer-partnership coordinator, paid work-experience component, urban vs rural - is necessary for hitting the target. Conditions come from Q3 site-visit memos and grantee self-reports. I have to defend the method to grantees in the room."
```

## The artifact

> **Evidence caveat (read first):** QCA is tier P established research practice, but it does not fit a single-reasoner session. Simulations show it certifies configurations from noise at the casual scale a session can reach (Krogslund, Choi and Poertner 2015; Lucas and Szatrowski 2014 recovered the correct story 3 times across 70 solutions). This brief does not build the truth table as if valid.

### What was asked

- A QCA across seven county job-training sites to find a configuration of conditions necessary for hitting the placement target. The real decision: where the agency should direct grant conditions and technical assistance so more sites hit the target next cycle - and a finding Priya can defend to grantees in the room.

### Why not the QCA truth table

- Seven sites coded across three or more conditions is the limited-diversity, casual-calibration regime where the simulation literature shows QCA stamps "necessary" or "sufficient" onto noise. With three conditions a truth table has eight rows, and seven cases cannot populate them; most rows stay empty and the minimized solution rides on counterfactual assumptions about combinations no site actually ran. Krogslund and colleagues certified random variables as sufficient; Lucas and Szatrowski recovered the true story 3 times in 70. A truth table here would hand the steering group a confident "an employer-partnership coordinator is necessary" verdict built from site-visit memos, which is exactly the false confidence to avoid - and the kind a grantee could rightly contest. Proper QCA is a research program (calibration justification, robustness tests, negated-outcome analysis, within-case triangulation), not a meeting deliverable.

### Is the input even there?

- No. Priya has seven sites described in narrative memos and self-reports, not a calibrated medium-N population, and no defensible coding of "hit the target" against each condition's membership across sites. The calibration thresholds she would have to set ("did this site really have a coordinator, fully or partly?") are exactly the choices the sensitivity literature shows the result flips on. The input precondition fails before any conditions are coded.

### The evidence-based move instead

- A set of comparable sites, and you want a base rate (an outcome distribution) rather than coded configurations: `think-reference-class-forecasting`.
- One site you want to causally explain (why did this one underperform): within-case process tracing in prose.

- **Chosen move:** `think-reference-class-forecasting`. The honest question behind "which combination is necessary" is "across sites like these seven, how often does a site hit the placement target, and how does that base rate shift among sites that had an employer-partnership coordinator versus those that did not?" Reference-class forecasting treats the comparable sites as an outcome distribution and yields a defensible base rate Priya can put in front of grantees, instead of certifying a necessary configuration from seven memos. If the steering group later wants to understand why one specific underperforming site missed, that is within-case process tracing in prose - rival explanations weighed against that site's record - not a cross-case truth table.

## Why this framework fits

The chair asked for QCA by name, in a room with grantees, so refusing would not help and would read as the agency dodging. Handled honestly, the skill leads with the simulation record, names the real decision behind the request, checks whether the input even exists, declines to manufacture a necessary-configuration verdict from seven site memos, and hands Priya a concrete, better-grounded next move she can defend on the record: a base rate from the comparable sites she actually has, with a within-case option for the single-site "why" question. Unaided, "run a QCA" produces a necessary configuration that feels rigorous, would not survive a grantee's challenge, and is not; the redirect produces an actual, defensible, accountable step.
