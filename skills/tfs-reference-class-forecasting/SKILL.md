---
name: tfs-reference-class-forecasting
description: Produces a reference-class estimate by defining a class of similar past cases, taking their base-rate distribution of outcomes, and anchoring the forecast on that outside view rather than the optimistic inside view, with a conservative adjustment for specifics. Use when forecasting cost, time, or odds of success for a project prone to optimism or the planning fallacy.
license: Apache-2.0
metadata:
  id: thinking-framework-skills.reference-class-forecasting
  family: risk-and-resilience
  evidence-tier: "S"
  version: 0.1.0
  standard: "0.8"
---
<!-- thinking-framework-skills | https://github.com/product-on-purpose/thinking-framework-skills | Apache-2.0 -->
# Reference Class Forecasting

People forecast from the inside view, building an estimate from their own plan's details, which invites optimism and the planning fallacy. This skill replaces that with the outside view: find a reference class of similar past cases, take the base-rate distribution of how they actually turned out, and anchor the forecast on that, adjusting only cautiously for genuine specifics. The output is a **reference-class estimate**. The honest constraint: it requires real base-rate data; inventing a distribution is worse than admitting uncertainty.

## When to Use

- Forecasting cost, time, or odds of success for something with comparable precedents.
- The inside-view estimate is likely optimistic.
- High-stakes commitments prone to the planning fallacy.

## When NOT to Use

- Genuinely novel undertakings with no comparable reference class.
- When you have no real base-rate data and would have to invent it.
- When the specifics genuinely dominate and no class is comparable.
- When a point certainty is expected (this produces a distribution).

## Instructions

When asked to forecast with the outside view, follow these steps:

1. **State what is being forecast** (cost, duration, success odds) and the inside-view estimate if one exists.
2. **Define the reference class.** Identify the set of genuinely comparable past cases, and say why they are comparable. Resist a class that is too narrow or too flattering.
3. **Get the base rates.** State the distribution of outcomes for that class - typical and worst-case - with the data source. If real data is unavailable, say so explicitly and stop or downgrade to a clearly-flagged rough estimate; do not fabricate numbers.
4. **Anchor on the outside view.** Set the estimate from the base-rate distribution, not the plan's details.
5. **Adjust conservatively.** Only then adjust for genuine specifics, in small amounts, and resist sliding back to the optimistic inside view.
6. **Emit the reference-class estimate** per `references/TEMPLATE.md`.

## Output Format

Use the template in `references/TEMPLATE.md`. The deliverable is the reference class, base rates, and the outside-anchored estimate as a range, not a single optimistic number.

## Quality Checklist

Before finalizing, verify:

- [ ] The reference class is genuinely comparable, not narrow or flattering.
- [ ] Base rates come with a data source, or missing data is flagged (not invented).
- [ ] The estimate is anchored on the distribution, then adjusted only conservatively.
- [ ] The result is a range/distribution, not a point certainty.
- [ ] The inside-view estimate did not sneak back in as the answer.
- [ ] The output is the reference-class estimate artifact, not prose.

## Evidence

Tier **S**. The planning fallacy is robustly demonstrated and the outside view measurably reduces forecast error (Kahneman & Lovallo 1993; Kahneman 2011). Bent Flyvbjerg's reference class forecasting for infrastructure documented systematic overruns and has been adopted by institutions (e.g. UK guidance) - real-world validation, not only lab results. The strong evidence is from human forecasting; the AI use transfers the method, with the firm constraint that base rates must be real, not invented. Full grading: `evidence/dossier.md`.

## Examples

See `references/EXAMPLE.md` for a completed reference-class estimate.
