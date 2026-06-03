---
name: think-idea-quality-audit
description: Decide which of a batch of candidate ideas are worth committing to, by scoring them on explicit quality dimensions and then adversarially stress-testing the strongest few.
steps:
  - think-decision-option-review
  - think-red-team-light
metadata:
  version: 0.1.0
---
<!-- thinking-framework-skills | https://github.com/product-on-purpose/thinking-framework-skills | Apache-2.0 -->
# Recipe: idea-quality-audit (workflow)

Separates the genuinely strong ideas from the merely fluent before you invest in any. Run in order, carrying forward only the top-ranked ideas:

1. `think-decision-option-review` -> score the batch on idea-quality dimensions (novelty, feasibility, value, specificity); carry the **top few** (and where the scoring was soft).
2. `think-red-team-light` -> adversarially pressure-test the top-ranked ideas; carry the **survivors and their open weaknesses**.

Composite artifact: an idea-quality audit - a scored, ranked shortlist of the batch with the strongest few stress-tested, so commitment goes to ideas that survive scrutiny, not the ones that read best on first pass. Full prose: `recipes/idea-quality-audit.md`.
