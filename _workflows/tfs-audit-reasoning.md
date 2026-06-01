---
name: tfs-audit-reasoning
description: Check whether a conclusion is sound before trusting it, by sorting evidence from inference, reconstructing the inferential climb, and reviewing through separated lenses.
steps:
  - tfs-evidence-vs-inference-sort
  - tfs-ladder-of-inference-check
  - tfs-parallel-perspectives-review
metadata:
  version: 0.1.0
---
<!-- thinking-framework-skills | https://github.com/product-on-purpose/thinking-framework-skills | Apache-2.0 -->
# Recipe: audit-reasoning (workflow)

Operationalizes the library's epistemic positioning. Run in order, carrying forward only the flagged items:

1. `tfs-evidence-vs-inference-sort` -> carry the **load-bearing unknowns**.
2. `tfs-ladder-of-inference-check` -> carry the **riskiest rung** and the alternative interpretation.
3. `tfs-parallel-perspectives-review` -> carry the **synthesis and central tension**.

Composite artifact: a reasoning audit - which claims are actually supported, where the leaps and alternative readings are, and a verdict on whether the conclusion can be trusted. Full prose: `recipes/audit-reasoning.md`.
