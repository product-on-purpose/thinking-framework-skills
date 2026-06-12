# Recipe: issue-position-argument-mapping

**Job:** turn a tangled multi-question deliberation or transcript into an inspectable typed map - the open issues, the rival positions answering each, and the arguments for and against each position - using shipped moves rather than a standalone notation.

**Use when:** a discussion (a design debate, a strategy meeting, a long comment thread) has sprawled across several entangled questions and you want to see its structure: what is actually being asked, what answers are on the table, and what supports or attacks each. Especially useful on a transcript after the fact.

**Why a recipe, not a skill:** IBIS (Issue-Based Information System; Kunz and Rittel, 1970) has exactly three node types, and each is a move the library already ships. Issues (the open questions) are `think-issue-tree`'s decomposition with the MECE constraint relaxed. Positions (rival answers to a question) are the option-enumeration front of `think-decision-option-review` - the same place QOC, IBIS's design-rationale sibling, already folds. Arguments (the pro/con layer) are a strict subset of `think-argument-mapping` (tier S), which additionally excavates co-premises and flags weak links that the flat IBIS argument layer does not. The only residue no shipped skill owns is the link grammar itself - positions may only answer issues, arguments may only attach to positions - and that is the wiring diagram of a chain, not a separable cognitive move. A sequence of existing skills produces the IBIS artifact, which is the definition of a recipe here, on the pattern of kepner-tregoe and pdca-a3. (It is not a fold, because no single shipped skill's mode covers all three node types - argument-mapping has no issues or positions, issue-tree has no positions or arguments - so any single foldInto would misrepresent the method. The standalone-notation case is also where the instrument literature, Isenmann and Reuter 1997 and Shipman and Marshall 1999, documents IBIS tools failing; the positive evidence is all facilitated group practice, the facilitation wall this library has never shipped through.)

## Chain

1. **`think-issue-tree`** (`skills/think-issue-tree/SKILL.md`) - Issues
   - Surface the open questions the deliberation is contesting. Relax MECE: IBIS issues need not partition the space, they just need to be the real questions in play. On a raw transcript, pull them out by question rather than by clean decomposition.
   - Carry forward: the **set of open issues**, not a full partition tree.
2. **`think-decision-option-review`** (`skills/think-decision-option-review/SKILL.md`) - Positions
   - For each issue, enumerate the rival candidate answers. Use the option-enumeration front of the skill; you are listing positions, not yet scoring to a single winner (though you may, if the deliberation has reached a decision).
   - Carry forward: the **positions answering each issue**.
3. **`think-argument-mapping`** (`skills/think-argument-mapping/SKILL.md`) - Arguments
   - For each position, map the pro and con arguments and their inference structure. Argument-mapping does strictly more than the flat IBIS pro/con layer - it surfaces co-premises and flags weak inferences - so take that as added rigor.
   - Carry forward: the **arguments for and against each position**.
   - Recurse: where an argument itself raises a new open question, add it as an issue and loop.

## Composite artifact

A typed deliberation map: the issues, the positions answering each, and the arguments supporting or attacking each position - assembled from shipped moves, navigable where the raw debate was tangled. The map makes the structure of a sprawling discussion inspectable: which questions are still open, which answers have support, where the disagreement actually sits.

## When NOT to use

When the deliberation is really one argument whose inference structure you want to test, use `think-argument-mapping` alone - you do not need the issue and position layers. When you are deciding among options on a single question, use `think-decision-option-review` alone. The recipe earns its weight only when there are several entangled questions to untangle at once. And it maps a deliberation; it does not adjudicate it - reaching a verdict on any one issue is the decision skill's job, run on that issue.

## Token discipline

Carry only the compressed artifact between steps - the issue list into the position step, the positions into the argument step - never the full working notes of the prior skill. On a long transcript, surface the top few issues first and map those; do not attempt an exhaustive node-by-node capture, which is the documented failure mode of IBIS tools (the capture overhead exceeds the value).
