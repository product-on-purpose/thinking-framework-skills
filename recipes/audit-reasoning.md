# Recipe: audit-reasoning

**Job:** check whether a conclusion or recommendation is actually sound before trusting it.

**Use when:** a conclusion feels confident but consequential, or you want to audit the reasoning behind a recommendation (the agent's own or someone else's). This recipe operationalizes the library's epistemic positioning.

## Chain

1. **`tfs-evidence-vs-inference-sort`** (`skills/tfs-evidence-vs-inference-sort/SKILL.md`)
   - Sort the claims behind the conclusion into evidence, inference, and assumption; flag the uncited.
   - Carry forward: the **load-bearing unknowns** (unsupported claims doing the heavy lifting).
2. **`tfs-ladder-of-inference-check`** (`skills/tfs-ladder-of-inference-check/SKILL.md`)
   - Reconstruct how the conclusion was reached; flag the riskiest leap; test an alternative interpretation.
   - Carry forward: the **riskiest rung** and the alternative interpretation.
3. **`tfs-parallel-perspectives-review`** (`skills/tfs-parallel-perspectives-review/SKILL.md`)
   - Review the conclusion through separated lenses to surface what a single viewpoint missed.
   - Carry forward: the **synthesis** and the central tension.

## Composite artifact

A reasoning audit: which claims are actually supported, where the inferential leaps and alternative readings are, and a rounded verdict on whether the conclusion can be trusted or needs more before it is acted on.

## Token discipline

Carry only the flagged items between steps (unknowns -> riskiest rung -> synthesis), not the full ledgers and traces.
