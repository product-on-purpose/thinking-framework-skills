---
name: tfs-stress-test-decision
description: Pressure-test a consequential decision before committing, by comparing options, surfacing the conditions that must hold, imagining failure, and sanity-checking the estimate against base rates.
steps:
  - tfs-decision-option-review
  - tfs-what-would-have-to-be-true
  - tfs-premortem
  - tfs-reference-class-forecasting
metadata:
  version: 0.1.0
---
<!-- thinking-framework-skills | https://github.com/product-on-purpose/thinking-framework-skills | Apache-2.0 -->
# Recipe: stress-test-decision (workflow, marquee)

The flagship chain. Run in order, carrying forward only the compressed artifact at each handoff (this is the longest chain, so compression matters most):

1. `tfs-decision-option-review` -> carry the **recommended option** and what would flip it.
2. `tfs-what-would-have-to-be-true` -> carry the **killer conditions**.
3. `tfs-premortem` -> carry the **top risks with tripwires and kill criteria**.
4. `tfs-reference-class-forecasting` -> carry the **outside-view estimate range**.

Optional adds when stakes justify the tokens: `tfs-red-team-light` after step 2, `tfs-futures-wheel` after step 3.

Composite artifact: a decision brief - recommended option, the conditions it depends on, its top risks with pre-decided responses, and an honest outside-view estimate. Full prose: `recipes/stress-test-decision.md`.
