---
name: think-linear-model-aggregation
description: Builds a simple mechanical scoring model - a few weighted predictive cues combined by a fixed formula and applied consistently - for a repeated predictive judgment, because consistent simple rules reliably match or beat holistic expert intuition. Use when the same kind of evaluative judgment recurs (screening candidates, scoring leads, triaging) and gut calls are inconsistent or overconfident.
license: Apache-2.0
metadata:
  id: thinking-framework-skills.linear-model-aggregation
  family: decision-and-option-evaluation
  evidence-tier: "S"
  version: 0.1.0
  standard: "0.8"
---
<!-- thinking-framework-skills | https://github.com/product-on-purpose/thinking-framework-skills | Apache-2.0 -->
# Linear-Model Aggregation

For a judgment you make over and over - screening candidates, scoring leads, triaging tickets - holistic expert intuition is unreliable mainly because it is inconsistent: the same expert scores the same case differently on different days. A simple mechanical rule removes that: pick a few predictive cues, weight them (even equal weights work), score each case, combine by a fixed formula, and apply it identically every time. The robust, counterintuitive result is that such rules match or beat holistic judgment, because consistency beats brilliance applied erratically. The output is a **scoring model**. Two honest limits: it is for *repeated* judgments (not one-off strategic choices), and it is only as good as its cues.

## When to Use

- The same kind of evaluative/predictive judgment recurs (screening, lead/deal scoring, triage, prioritizing a queue).
- Gut calls on these are inconsistent or overconfident.
- A few cues with real predictive signal exist.

## When NOT to Use

- A genuinely one-off decision among a few options (use `decision-option-review`).
- No real predictive cues or data exist - do not invent cues and weights (false precision).
- High-stakes judgments about individuals (hiring, lending, justice) where mechanical scoring raises fairness/legal/ethical issues - flag these, do not silently automate.
- When the point is a single strategic call, not a repeatable rule.

## Instructions

When asked to build a scoring model, follow these steps:

1. **State the recurring judgment** and the outcome it predicts (and confirm the outcome is eventually measurable). If it is a one-off, stop and route to a decision review.
2. **Choose a few predictive cues.** 3 to 6 cues that plausibly carry real signal; say why each. Resist adding cues that feel thorough but lack validity.
3. **Assign weights.** Default to equal weights unless real data justifies otherwise - the evidence says simple/equal weights capture most of the benefit; do not fake precision.
4. **Define the per-cue rubric.** How each cue is scored, so two people would score a case the same way.
5. **Set the formula and threshold.** How the cue scores combine, and the decision rule (e.g. above X -> advance).
6. **Mandate consistency, and flag the caveats.** State that the model must be applied the same way every time (overriding it on a hunch reintroduces the noise it removes), that it is only as good as its cues, and any fairness/ethical caveat for judgments about people.
7. **Emit the scoring model** per `references/TEMPLATE.md`.

## Output Format

Use the template in `references/TEMPLATE.md`. The deliverable is the scoring model (cues, weights, rubric, formula, threshold, caveats), not prose.

## Quality Checklist

Before finalizing, verify:

- [ ] The judgment is genuinely repeated with a (measurable) outcome, not a one-off.
- [ ] Cues are few and each has a stated reason to be predictive.
- [ ] Weights default to equal/simple unless data justifies otherwise (no fake precision).
- [ ] The per-cue rubric is concrete enough for consistent scoring.
- [ ] The model includes the "apply consistently" mandate and the cue-validity caveat.
- [ ] Fairness/legal/ethical caveats are flagged for judgments about individuals.
- [ ] The output is the scoring-model artifact, not prose.

## Evidence

Tier **S**. Across decades and many domains, mechanical/actuarial combination of cues equals or beats holistic expert judgment in the large majority of studies (Meehl 1954; Grove et al. 2000 meta-analysis), and even equal-weight "improper" models capture most of the benefit (Dawes 1979); the driver is reduced inconsistency/noise (Kahneman, *Noise*, 2021). It applies to repeated judgments, is only as good as its cues, and raises fairness considerations for judgments about people. Evidence is from human expert-vs-model studies, transferred to AI use, not AI-validated. Full grading: `evidence/dossier.md`.

## Examples

See `references/EXAMPLE.md` for a completed scoring model.
