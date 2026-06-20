---
title: "Analysis of Competing Hypotheses (ACH) - quick sample"
description: A by-name ACH request handled honestly - warn with the controlled evidence, then redirect to the move the incident actually needs.
sidebar:
  label: analysis-of-competing-hypotheses
---

:::caution[ACH is a contested lens (warn-and-redirect)]
ACH is tier X: tested and found wanting. Randomized trials found it raises confidence with no accuracy gain (Otzipka 2025) and no debiasing or judgment-quality gain (Dhami et al. 2019; Karvetski and Mandel 2020). This skill does not build the disconfirmation matrix as if valid; it warns and routes to an evidence-based move. It fires only because ACH was asked for by name.
:::

> A compact worked example of [Analysis of Competing Hypotheses](../../frameworks/think-analysis-of-competing-hypotheses/) handled honestly. For full end-to-end narratives see the [Showcase](../../showcase/); for the evidence behind the method see its [framework page](../../frameworks/think-analysis-of-competing-hypotheses/).

## Situation

Daniel, a staff engineer at a ~200-person company, is leading the postmortem on a p99 latency spike that started Tuesday afternoon on the checkout API. Three explanations are on the table: a release that shipped that morning, a downstream payments-vendor dependency whose own dashboards looked slow, and a traffic-pattern shift from a marketing push that hit the same window. In the review, the VP of Engineering says: "Run ACH across the three causes and tell us the most likely one." Daniel has read the literature and knows the matrix tends to manufacture confidence rather than accuracy, but the request is explicit and named, so he wants to answer it honestly rather than refuse.

## Prompt

```text
/think-analysis-of-competing-hypotheses "Situation: p99 spike on checkout started Tue PM, still elevated. Constraints: VP asked for ACH by name on three candidate causes (morning deploy, slow payments vendor, marketing traffic shift); decision is where to dig next. Already tried: eyeballed the deploy timeline and the vendor status page, both look plausible, neither is conclusive. Reference: incident #4821 timeline in the postmortem doc."
```

## The artifact

> **Controlled-evidence caveat (read first):** ACH was tested and found wanting; it raised confidence with no accuracy gain (Otzipka 2025) and did not reduce confirmation bias in randomized trials (Dhami et al. 2019). This brief does not build the matrix as if valid.

### What was asked

- An ACH across the three candidate causes of the checkout latency spike, to name the most likely one. The real decision: where to focus the next hour of incident dig-in.

### Why not the ACH matrix

- The controlled record on ACH is null-to-negative, and scoring shared signals (the same latency graph, the same time window) against each candidate cause would treat correlated evidence as independent, manufacturing a confident "most likely" cause from entangled telemetry. The deploy, the vendor, and the traffic push all overlap the same window, so a tidy least-inconsistent verdict would read as rigor it has not earned.

### The evidence-based move instead

- Attack the leading thesis to find where it breaks: `think-red-team-light`.
- Separate evidence from inference in the claim set: `think-evidence-vs-inference-sort`.
- Test a named option's load-bearing conditions: `think-what-would-have-to-be-true`.

- **Chosen move:** `think-evidence-vs-inference-sort`, because most "it was the deploy / the vendor / the traffic" claims are inferences from the same latency graph, not independent evidence. Sorting them shows which candidate has any non-shared signal (a deploy diff that touches the hot path, vendor-side error rates, a request-mix change), then `think-red-team-light` on whichever lead survives.

### If you still need rival-cause discrimination

- The better-grounded move is per-item necessity/sufficiency testing within this one incident (process tracing): for each candidate cause, what telemetry would be necessary or sufficient if it were the driver - a correlated rollback recovery for the deploy, vendor latency leading the spike for the dependency, a request-mix shift preceding it for traffic - checked against the actual timeline. Do not present a matrix verdict as valid.

## Why this framework fits

The VP asked for ACH by name, so refusing would not help. Handled honestly, the skill leads with the controlled record, declines to manufacture a confident matrix from entangled incident telemetry, and hands Daniel a concrete, better-grounded next move. Unaided, "run ACH" produces a most-likely-cause verdict that feels rigorous and is not; the redirect produces an actual investigative step.
