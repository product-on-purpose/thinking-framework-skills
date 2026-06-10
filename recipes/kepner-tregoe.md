# Recipe: kepner-tregoe

**Job:** take a bounded operational problem through the full Kepner-Tregoe rational process - find the cause of a deviation, choose among defined options, and de-risk the rollout - using shipped moves rather than the branded four-worksheet bundle.

**Use when:** something has broken against a known standard and you want the canonical "what caused it, what do we do, what could go wrong with the fix" loop on a single well-bounded operational problem (an incident, a line fault, a service failure).

**Why a recipe, not a skill:** "Kepner-Tregoe" is not one cognitive move - it is four named procedures run in sequence under a triage front-end, and each is already owned. Problem Analysis is cause decomposition (ship: issue-tree; its IS/IS-NOT grid is a worksheet convention). Decision Analysis is weighted multi-criteria choice (ship: decision-option-review; a MUST is just a veto-weighted criterion, which is why full MCDA already folds there). Potential Problem Analysis is a forward risk register that KT itself calls "a simplified FMEA" (ship: premortem, where FMEA-lite already folds). Situation Appraisal is routing - the advisor's job, not an artifact. Only the standardized worksheets and the fixed sequence are unique to KT, and a fixed sequence of shipped moves with no separable mechanism is a recipe. (Kepner-Tregoe and KT are registered trademarks of Kepner-Tregoe, Inc.; this recipe documents the de-branded chain with attribution.)

## Chain

1. **`think-issue-tree`** (`skills/think-issue-tree/SKILL.md`) - Problem Analysis
   - Decompose the deviation (the object plus what is wrong) to its most-probable cause. The KT IS/IS-NOT specification grid (where the deviation IS versus where it could be but IS NOT) is a structured comparison axis for this decomposition.
   - Carry forward: the **most-probable cause**, not the whole tree.
   - Skip this step when the cause is already known and you only need to choose a fix.
2. **`think-decision-option-review`** (`skills/think-decision-option-review/SKILL.md`) - Decision Analysis
   - Score the defined alternatives against weighted objectives; model KT MUSTs as pass/fail veto columns that knock out any option failing them, and WANTs as the weighted criteria.
   - Carry forward: the **chosen option** and the dealbreakers it cleared.
3. **`think-premortem`** (`skills/think-premortem/SKILL.md`) - Potential Problem Analysis
   - For the chosen plan, enumerate what could go wrong, rate by probability and seriousness, and attach preventive actions to the causes plus contingent actions and triggers to the effects.
   - Carry forward: the **risk register with preventive and contingent actions**.

## Composite artifact

A rational-process record: the most-probable cause backed by the specification contrast, the chosen option with its cleared dealbreakers, and a preventive/contingent action plan - the full "what caused it, what do we do, what could go wrong" loop assembled from shipped moves.

## When NOT to use

When you only need one part, use that one skill: `think-issue-tree` alone to find a cause, `think-decision-option-review` alone to choose, `think-premortem` alone to de-risk a plan. The bundle is heavy; do not import three worksheets where one does the work. When the problem is not a deviation from a known standard (a novel or generative problem with no baseline), the specification grid has nothing to grip - that is framing or ideation territory, not this recipe.

## Token discipline

Pass only the compressed artifact between steps - the cause, then the chosen option, then the risk register. Do not re-feed each step's full output into the next.
