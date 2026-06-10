# Morphological Field (Zwicky Box) - Template

Fill this in. The deliverable is the morphological field - the parameter-by-value box, the cross-consistency assessment, and the pruned set of internally consistent configurations - not a prose essay.

> The box GENERATES and prunes for consistency. It does NOT rank configurations by value. Do not pick a "winner" here; hand the surviving configurations to a separate evaluation step (for example `think-decision-option-review`).

---

## Focal problem

- **What is being configured:** [the solution whose space you are mapping, in one line]
- **What a complete solution must specify:** [the dimensions any candidate has to take a position on - this previews the parameters]
- **Why a field and not a single answer:** [confirm the solution genuinely factorizes into independent dimensions; if the answer is one insight, reframe, or number, stop]

## Parameters (the independent dimensions)

List a small set (typically 3-6) of orthogonal parameters. Justify each - the decomposition is the whole ballgame, and arbitrary axes give a space that only looks systematic.

| Parameter | Why it is a real, independent dimension |
|---|---|
| **P1: [name]** | [why this dimension is necessary and orthogonal to the others] |
| **P2: [name]** | [...] |
| **P3: [name]** | [...] |
| **P4: [name]** (optional) | [...] |

(Keep these genuinely independent and few. Adding parameters to feel thorough multiplies the space toward the unmanageable.)

## The morphological field (the box)

Each parameter is a column; its discrete possible values are the cells. Values should be meaningfully distinct and reasonably exhaustive for that dimension.

| P1: [name] | P2: [name] | P3: [name] | P4: [name] |
|---|---|---|---|
| [value 1a] | [value 2a] | [value 3a] | [value 4a] |
| [value 1b] | [value 2b] | [value 3b] | [value 4b] |
| [value 1c] | [value 2c] | [value 3c] | [value 4c] |

- **Raw configuration count:** [product of the value counts, for example 3 x 3 x 3 x 2 = 54] - the full cross-product before pruning.

## Cross-consistency assessment (the reduction step)

Pair every value with every other value ACROSS parameters and judge each pair compatible or incompatible. Record only the **incompatible** pairs (the ones that cannot coexist in a sensible solution) and why - this is "inference by exclusion."

| Value (from one parameter) | Incompatible with (value from another) | Why they cannot coexist |
|---|---|---|
| [P1: value] | [P3: value] | [technical conflict / contradiction / mutual exclusion] |
| [P2: value] | [P4: value] | [...] |
| ... | ... | ... |

(If almost nothing is incompatible, the parameters may not be doing real work - reconsider the decomposition. If almost everything is incompatible, the values may be too coarse.)

## Internally consistent configurations (the pruned set)

Keep only the configurations (one value per parameter) that contain NO incompatible pair. These are the surviving candidates worth examining - including the unobvious corners, not just the familiar starting combination.

| # | P1 | P2 | P3 | P4 | Note (what kind of solution this is) |
|---|---|---|---|---|---|
| C1 | [value] | [value] | [value] | [value] | [one-line characterization] |
| C2 | [value] | [value] | [value] | [value] | [...] |
| C3 | [value] | [value] | [value] | [value] | [...] |

- **Pruned count vs raw:** [for example 9 consistent of 54 raw] - shows the cross-consistency pass did real work.
- **Unobvious corners surfaced:** [name the surviving configurations a forward search would likely have missed]

## Hand-off (not a ranking)

[State that these consistent configurations are the candidate set for a separate evaluation step. Do NOT score them by value here - the box generates and prunes for consistency; choosing among the survivors is downstream, for example `think-decision-option-review`.]
