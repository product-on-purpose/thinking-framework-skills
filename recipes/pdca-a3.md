# Recipe: pdca-a3

**Job:** improve a process against a performance gap with the Plan-Do-Check-Act loop (and Toyota's A3 storyboard) - find the root cause, choose and run a countermeasure, review actual versus expected, then standardize or iterate - using shipped moves rather than a standalone cycle.

**Use when:** a process is underperforming against a target and you want a disciplined improvement loop that tests a change and learns from the result, rather than a one-shot decision.

**Why a recipe, not a skill:** PDCA has no separable mechanism of its own. Plan (find the gap's root cause, choose a countermeasure) is root-cause plus option work the library ships (issue-tree or iceberg-model, then decision-option-review). Do is execution - running the change in the world - which a library of thinking methods does not own. Check (compare actual to expected, diagnose the gap, decide what to sustain or change) is almost exactly after-action-review. Act (standardize or adjust and re-run) plus the loop back to Plan is a control-flow wrapper, not an artifact-emitting move. After-action-review does not subsume the loop (it is purely retrospective, with no forward experiment-design step and no iteration - it is one of PDCA's four steps), which is why this is a recipe and not a fold. A3 adds a one-page storyboard, which is packaging (close to pyramid-principle plus issue-tree), the same reasoning that sent decision-brief-pr-faq to reject. PDCA, PDSA, and A3 are generic terms (Shewhart and Deming; Toyota) with no trademark.

## Chain

1. **`think-issue-tree`** (`skills/think-issue-tree/SKILL.md`) - Plan, root cause
   - Decompose the performance gap to its root cause.
   - Carry forward: the **root cause**.
   - Swap in `think-iceberg-model` when the gap is systemic (events, patterns, structures, mental models) rather than a clean decomposable deviation.
2. **`think-decision-option-review`** (`skills/think-decision-option-review/SKILL.md`) - Plan, countermeasure
   - Choose the countermeasure to test against weighted objectives.
   - Carry forward: the **chosen countermeasure** framed as a change to test.
   - *Do:* run the change in the world (no thinking artifact; execution the library does not own).
3. **`think-after-action-review`** (`skills/think-after-action-review/SKILL.md`) - Check
   - Compare the actual result to the prediction, diagnose the gap, and decide what to sustain or change.
   - Carry forward: **expected-versus-actual, the why, and the sustain or change call**.
   - *Act:* standardize if it worked, adjust and re-run if not, then loop back to step 1.

## Composite artifact

An improvement-cycle record: the root cause of the gap, the countermeasure tested, the actual-versus-expected review with its diagnosis, and the standardize-or-iterate decision - the PDCA loop assembled from shipped moves, with the A3 layout as an optional one-page presentation of the same content.

## When NOT to use

When the work is finished and you only need to learn from it, use `think-after-action-review` alone - that is the retrospective half, and most "do a PDCA" moments are really just a review. When you need root cause only, use `think-issue-tree` or `think-iceberg-model` alone. Do not invoke the full loop for a one-shot decision with no change to test and no intention to iterate.

## Token discipline

Pass only the compressed artifact between steps - the root cause, then the countermeasure, then the review. Do not re-feed each step's full output into the next.
