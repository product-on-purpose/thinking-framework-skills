---
name: think-pdca-a3
description: Run the Plan-Do-Check-Act improvement loop as a chain of shipped moves, taking a performance gap through root-cause and countermeasure choice, then a structured review of actual versus expected, then a standardize-or-iterate decision.
steps:
  - think-issue-tree
  - think-decision-option-review
  - think-after-action-review
metadata:
  version: 0.1.0
---
<!-- thinking-framework-skills | https://github.com/product-on-purpose/thinking-framework-skills | Apache-2.0 -->
# Recipe: pdca-a3 (workflow)

PDCA (Plan-Do-Check-Act, the Shewhart/Deming improvement cycle; Deming preferred Plan-Do-Study-Act) and Toyota's A3 are not a separate skill here: the reflective heart of the loop already ships as after-action-review, the forward half is execution plus a "repeat" instruction, and the A3 one-page layout is a document convention. This recipe chains the shipped moves rather than duplicating after-action-review under a more famous industrial name.

Run the steps in order, carrying forward only the compressed artifact between them:

1. `think-issue-tree` (Plan, root cause) -> carry the **root cause of the performance gap**. Swap in `think-iceberg-model` when the gap is systemic (events down to structures and mental models) rather than a decomposable deviation.
2. `think-decision-option-review` (Plan, countermeasure) -> carry the **chosen countermeasure** to test.
3. *(Do - run the change in the world; this emits no thinking artifact and the library does not own it.)*
4. `think-after-action-review` (Check) -> carry **expected versus actual, the why, and what to sustain or change**.
5. *(Act - standardize if it worked, adjust and re-run if not; a control-flow wrapper, then loop back to step 1.)*

Composite artifact: an improvement-cycle record - the root cause, the countermeasure tested, the actual-versus-expected review, and the standardize-or-iterate decision. Full prose and rationale: `recipes/pdca-a3.md`.
