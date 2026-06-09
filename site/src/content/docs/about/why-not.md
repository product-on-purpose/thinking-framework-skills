---
title: Why not Six Thinking Hats, SWOT, ...
description: The popular methods this library deliberately leaves out, and the reason for each - mechanism over ritual, the overlap ceiling, branded-and-documented, and excluded X-tier evidence.
---

A library that grades honestly has to be willing to say no. Most "thinking tools" collections grow by addition: every named method gets a card. This one keeps a selection bar, so a method earns its place or it does not ship. The list below is generated from the framework registry, so it can never drift from the verdicts: each method appears under the reason it is not a standalone skill here.

<!-- BEGIN GENERATED (scripts/gen-registry.mjs from frameworks/registry.mjs) - do not hand-edit below this line -->

## Folded into a shipped skill

The durable cognitive move already ships inside another skill, named descriptively. A second card would add a name, not a capability, so we ship the move and fold the ritual in.

- **Stakeholder Lens Review** - walk a proposal through each affected party's eyes. Folds into [Parallel Perspectives Review](../../frameworks/think-parallel-perspectives-review/).
- **Steelmanning** - state the strongest version of an opposing view before responding. Folds into [Red Team / Blue Team](../../frameworks/think-red-team-light/).
- **Crazy 8s** - eight sketches in eight minutes. Folds into [Brainwriting 6-3-5 / NGT](../../frameworks/think-brainwriting/).
- **Forced connections / Random stimulus** - pair the problem with an unrelated stimulus. Folds into [Far-analogy ideation](../../frameworks/think-far-analogy-ideation/).
- **How Might We** - turn an insight into an opportunity question. Folds into [Problem Restatement](../../frameworks/think-problem-restatement/).
- **Is / Is Not analysis** - sharpen scope by what the problem is and is not. Folds into [Problem Restatement](../../frameworks/think-problem-restatement/).
- **Frame storming** - brainstorm the framing, not the solution. Folds into [Problem Restatement](../../frameworks/think-problem-restatement/).
- **Inversion** - ask how to guarantee failure, then avoid it. Folds into [Premortem](../../frameworks/think-premortem/).
- **FMEA-lite** - list failure modes by likelihood x severity x detection. Folds into [Premortem](../../frameworks/think-premortem/).
- **Kill criteria / Tripwires** - pre-decided stop signals and conditions. Folds into [Premortem](../../frameworks/think-premortem/).
- **Second-Order Effects** - lightweight 'and then what?' prompt. Folds into [Futures Wheel](../../frameworks/think-futures-wheel/).
- **Systems map / Leverage points** - sketch elements/relationships; find intervention points. Folds into [Iceberg Model](../../frameworks/think-iceberg-model/).
- **Fishbone / Ishikawa** - decompose one observed effect into candidate causes grouped under a fixed category checklist (6M/8P). Folds into [Issue Trees](../../frameworks/think-issue-tree/).
- **Multi-Criteria Decision Analysis** - weighted scoring across criteria. Folds into [Decision Option Review](../../frameworks/think-decision-option-review/).
- **MECE decomposition** - mutually-exclusive, collectively-exhaustive split. Folds into [Issue Trees](../../frameworks/think-issue-tree/).
- **Silent writing before discussion** - write independently first to prevent anchoring. Folds into [Brainwriting 6-3-5 / NGT](../../frameworks/think-brainwriting/).
- **Plus/Delta, Start/Stop/Continue, Rose/Thorn/Bud** - fast retro formats. Folds into [After Action Review](../../frameworks/think-after-action-review/).

## Documented, not shipped

Included only with explicit caveats - a trademark, a narrow valid range, or a false-precision warning. The IP gate is open (branded methods are documented with attribution); the evidence and distinctness gates are not, so these stay out of the shippable set.

- **Six Thinking Hats** - branded parallel-thinking ritual. (Branded: Six Thinking Hats (de Bono method; "Six Thinking Hats" is a trademark of the de Bono estate / IP holders).)
- **Five Whys** - iterative why to trace a cause.
- **Devil's Advocacy** - assign someone to argue against.
- **Cynefin** - sort clear / complicated / complex / chaotic. (Branded: Cynefin (The Cynefin Co. / formerly Cognitive Edge).)
- **ICE / RICE / WSJF** - prioritization scores. (Branded: SAFe and WSJF are trademarks of Scaled Agile, Inc.; RICE originates at Intercom.)
- **Jobs To Be Done** - frame demand as progress sought.
- **Wardley Mapping** - value chain vs evolution. (Branded: Wardley Mapping (licensed CC BY-SA 4.0 by Simon Wardley).)
- **Blue Ocean tools** - strategy canvas / four actions. (Branded: Blue Ocean Strategy / Strategy Canvas (registered marks of the authors / Blue Ocean Global Network).)
- **Porter's Five Forces** - competitive-structure scan. (Branded: Porter's Five Forces (associated with Michael E. Porter / Harvard Business School).)
- **Dot voting** - allocate limited votes.

## Excluded on the merits

Weak or contradictory evidence, or redundant with a shipped skill. Excluded after honest grading, not for being unfashionable - and we say why.

- **Disney Creative Strategy** - dreamer/realist/critic cycle. (Branded: Disney Method (Dilts); "Disney" is a trademark of The Walt Disney Company.)
- **Key Assumptions Check / Assumption Mapping** - inventory and rank a plan's assumptions.
- **Cognitive bias checklist** - run a decision against relevant biases.
- **Double-crux** - find the single belief whose change would flip each side of a disagreement.
- **OODA Loop** - observe-orient-decide-act.
- **SWOT** - strengths / weaknesses / opportunities / threats.
- **1-2-4-All / Round-robin / Lean Coffee / World Cafe / Open Space** - scaled-participation group formats.

## Out of scope (a sibling library)

Sound PM and business-domain methods whose home is pm-skills, not a cross-domain cognitive library.

- **Decision Brief / PR-FAQ** - force a decision into a short structured memo.
- **Opportunity-Solution Tree** - outcome -> opportunities -> solutions.
- **Value proposition contrast** - sharpen vs the next-best alternative.

Candidates that clear the bar but are not yet built, and methods that ship as a recipe rather than a standalone skill, are catalogued in the Framework Library. The full selection bar, and how to propose a method that clears it, lives in [contributing](../contributing/).

<!-- END GENERATED (scripts/gen-registry.mjs) -->
