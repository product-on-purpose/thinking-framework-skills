---
title: "Analysis of Competing Hypotheses (ACH) - quick sample"
description: A by-name ACH request handled honestly - warn with the controlled evidence, then redirect to the move the job actually needs.
sidebar:
  label: analysis-of-competing-hypotheses
---

:::caution[ACH is a contested lens (warn-and-redirect)]
ACH is tier X: tested and found wanting. Randomized trials found it raises confidence with no accuracy gain (Otzipka 2025) and no debiasing or judgment-quality gain (Dhami et al. 2019; Karvetski and Mandel 2020). This skill does not build the disconfirmation matrix as if valid; it warns and routes to an evidence-based move. It fires only because ACH was asked for by name.
:::

> A compact worked example of [Analysis of Competing Hypotheses](../../frameworks/think-analysis-of-competing-hypotheses/) handled honestly. For full end-to-end narratives see the [Showcase](../../showcase/); for the evidence behind the method see its [framework page](../../frameworks/think-analysis-of-competing-hypotheses/).

## Situation

Raj leads a small security team. After a data-exfiltration alert, a senior stakeholder says: "Run ACH across our suspect list and tell us the least-inconsistent hypothesis." Raj has read the literature and knows the matrix tends to manufacture confidence rather than accuracy, but the request is explicit, so he wants to answer it honestly rather than refuse.

## Prompt

```text
/think-analysis-of-competing-hypotheses "Stakeholder wants an ACH across our suspect list for the exfil incident to pick the least-inconsistent hypothesis."
```

## The artifact

> **Controlled-evidence caveat (read first):** ACH was tested and found wanting; it raised confidence with no accuracy gain (Otzipka 2025) and did not reduce confirmation bias in randomized trials (Dhami et al. 2019). This brief does not build the matrix as if valid.

### What was asked

- An ACH across the suspect list for the exfiltration incident, to pick the least-inconsistent hypothesis. The real decision: where to focus the investigation next.

### Why not the ACH matrix

- The controlled record on ACH is null-to-negative, and scoring shared log signals against each suspect would treat correlated evidence (one compromised credential touching several systems) as independent, manufacturing a confident "least-inconsistent" suspect from entangled data.

### The evidence-based move instead

- Attack the leading thesis to find where it breaks: `think-red-team-light`.
- Separate evidence from inference in the claim set: `think-evidence-vs-inference-sort`.
- Test a named option's load-bearing conditions: `think-what-would-have-to-be-true`.

- **Chosen move:** `think-evidence-vs-inference-sort`, because most "suspect X did it" claims are inferences from the same log, not independent evidence. Sorting them shows which suspect has any non-shared evidence at all, then `think-red-team-light` on that lead.

### If you still need rival-hypothesis discrimination

- The better-grounded move is per-item necessity/sufficiency testing within this one case (process tracing): for each suspect, what evidence would be necessary or sufficient if they were responsible, checked against the actual record. Do not present a matrix verdict as valid.

## Why this framework fits

The stakeholder asked for ACH by name, so refusing would not help. Handled honestly, the skill leads with the controlled record, declines to manufacture a confident matrix from entangled logs, and hands Raj a concrete, better-grounded next move. Unaided, "run ACH" produces a least-inconsistent verdict that feels rigorous and is not; the redirect produces an actual investigative step.
