---
title: Silent writing before discussion
slug: silent-writing-before-discussion
generated_status: true
---

<!-- STATUS:GENERATED (gen-site.mjs from frameworks/registry.mjs) - do not edit between these markers -->
<!-- /STATUS:GENERATED -->

## What it is

Silent writing before discussion is the rule that everyone writes their own ideas down independently, in silence, before anyone speaks. Only after the private generation is complete does the group share, discuss, or vote. The durable cognitive move is **independence before exposure**: each contributor commits to their own thinking while it is still uncontaminated by anyone else's, so the room ends up with several genuinely separate inputs instead of one input that everyone else converged on.

The mechanism is best understood by what it prevents. In an open discussion the first thing said becomes an anchor, the loudest or highest-status voice sets the frame, and people who have not yet spoken quietly revise toward what they have already heard. A short silent-writing step closes that window. By the time anyone speaks, the divergent material already exists on paper and cannot be retroactively narrowed by the first speaker.

The real underlying move and the popular packaging are easy to confuse. The move is just "generate privately, then expose." The packaging is a family of named rituals that all start with it: the silent-generation first step of **Nominal Group Technique** (write alone, then round-robin share one idea at a time, then rank), the silent-sketch and "work alone together" steps of the **design sprint**, and the "everyone writes before anyone talks" opener used in countless meeting playbooks. Those rituals add their own machinery (round-robin sharing, dot-voting, a Decider) on top of the same one-line opener. This entry is about the opener itself, not the rituals built on it.

## When it helps / when it misleads

It helps when a group needs breadth and is at risk of premature convergence: early divergent generation, problem identification, brainstorming a slate of options, or any moment where the first voice would otherwise set the frame for everyone else. It is most valuable precisely when anchoring, status pressure, or conformity would narrow the inputs - the larger or more hierarchical the room, the more the silent step buys.

It misleads or simply does not apply in a few cases. It is a **generation** move, not a selection or decision move; the silent step produces independent inputs but does not by itself converge, rank, or choose, and treating "everyone wrote something" as a decision is the common misread. It adds little when the task genuinely needs one expert's deep sequential reasoning rather than breadth, or when the group is small and non-hierarchical enough that anchoring was never the threat. And the mechanism is fundamentally a **multi-participant** intervention: its entire purpose is to keep N human contributors from contaminating each other before they commit. A solo thinker, or a single AI agent, has no other voices in the room to be anchored by, so the literal protocol has nothing to act on. That mismatch is what decides where this entry lands in the library.

## What the evidence says

The governing grade for this entry is **M (moderate)**, and the honest reading is that the move is well-evidenced as a component but is graded conservatively here because of where it ships and how it transfers.

**What the record supports.** The "write independently first" step is one of the better-evidenced components in group-process research, because it is the active ingredient of the methods that beat ordinary brainstorming. Diehl and Stroebe (1987) ran four experiments and found that interactive brainstorming groups produced roughly half as many ideas as equivalent nominal groups, and traced the loss principally to **production blocking** - the structural fact that only one person can speak at a time, so waiting members forget, suppress, or abandon their own nascent ideas. The fix is to let generation happen in parallel and in private first, which is exactly silent writing before discussion. Delbecq and Van de Ven (1971), who codified Nominal Group Technique, made the same point structurally: requiring individuals to write silently before the group talks increased the number of solutions generated, by giving time to think and by removing interruption, status, and conformity pressure during generation.

**What the record does NOT support.** None of this is evidence for silent writing as a standalone, brandable protocol with its own measured effect size. The findings are about the **components** (silent parallel generation, independence before discussion) inside larger methods; they do not isolate "the silent-writing step, alone" against a clean control. The widely-repeated practitioner claim from the design-sprint world that note-and-vote style silent steps deliver large meeting-time savings (a frequently quoted figure on the order of several-fold) traces to a self-reported practitioner survey with no nameable primary source, and is excluded here rather than counted toward the grade. The strongest defensible statement is narrow: independence-before-exposure is a real, replicated component effect in human groups.

**Transferred-evidence flag (required).** Every study above is human, in groups, measured on humans - not agent-validated, and largely not agent-applicable. The whole point of the move is to stop N humans from anchoring on each other before they commit; a single agent has no co-participants to be anchored by, so there is no clean way for the agent to "run" this protocol on itself. The mechanism is therefore best transferred into the AI context indirectly, by deliberately generating several independent idea streams before any cross-contamination - which is what the shipped skill does. The grade is M, not S, on this transferred-and-repackaged basis; the full S-tier human evidence is held under the skill that actually ships the mechanism, to avoid restating a grade that could drift. See `skills/think-brainwriting/evidence/dossier.md`.

## Why it is / is not a skill here

Verdict: **Fold into `brainwriting`** (shipped as `think-brainwriting`). The registry records the reason in one line - "Subsumed: the mechanism is in brainwriting" - and the rest of this section is why that is the honest call and not a near-miss.

The Build burden of proof is to name a distinct, durable cognitive move that no shipped skill already produces. Silent writing before discussion cannot meet it, because its move - generate independently, in parallel, before exposing anyone to anyone else's output - **is** the load-bearing step of brainwriting. `think-brainwriting`'s whole design is to "produce several genuinely independent idea streams (distinct angles, generated without contaminating each other), then run a build-on round and consolidate," and its own instructions warn that "collapsing into one stream throws away the mechanism that does the work." That mechanism is silent-writing-before-discussion. There is no separable remainder to ship: once you remove "generate independently first," nothing distinct is left of this entry. It is not a sibling of brainwriting; it is the first half of it.

Fold, specifically, and not Build or Reject:

- **Not Build.** A standalone skill would duplicate brainwriting's core step under a second name, importing none of its own distinct capability. That is the textbook over-overlap case the catalog folds rather than ships.
- **Not Reject.** The mechanism is real and well-evidenced, so excluding it on the merits would be wrong. It is not out of scope; it is already in scope, inside brainwriting.
- **Why brainwriting and not a facilitation skill.** This entry's family is facilitation-and-group-structures, where most members describe human social dynamics an agent cannot reproduce. But silent-writing's value is not the facilitation ritual; it is the independence-before-exposure that improves generation. The library captures that value as a generation move (brainwriting), not as a meeting ritual, which is why the fold target is the ideation skill rather than a group-structures entry.

This fold also explains a neighbor. **Note-and-vote** (registry `note-and-vote`) is rejected partly because its generation half is exactly this move - the registry notes that "the generation half (each person silently writes candidates before anyone speaks) is the NGT / silent-writing-before-discussion mechanism, already absorbed by brainwriting." So this entry's fold is load-bearing twice: it is where the silent-generation step lives, and it is why note-and-vote's generation half has nowhere new to go.

The learning value: a famous, genuinely effective group-process rule can still be a fold, because its fame is the rule and the rule is already a step in something the library ships. Naming it separately would split one mechanism across two skills and tempt a user to run "silent writing" as if it were a complete method, when on its own it only generates and never converges.

## Lineage and who to read

The move predates any of its brand names; the cleanest origins are the structured group-process methods built on it.

- **Andre Delbecq and Andrew Van de Ven (1971)**, "A Group Process Model for Problem Identification and Program Planning," *Journal of Applied Behavioral Science* 7(4): 466-492. The founding paper for Nominal Group Technique, whose defining first step is silent independent writing before any group discussion. The clearest primary source for the move as a deliberate protocol.
- **Michael Diehl and Wolfgang Stroebe (1987)**, "Productivity Loss in Brainstorming Groups: Toward the Solution of a Riddle," *Journal of Personality and Social Psychology* 53(3): 497-509. The experimental case for why independence-before-discussion helps: interactive groups produced about half as many ideas as nominal groups, primarily through production blocking. The mechanism evidence.
- **Bernd Rohrbach (1968)**, Method 6-3-5 (brainwriting). The practitioner protocol that turns silent parallel writing into a repeatable round-based format; the direct ancestor of the shipped `brainwriting` skill.
- **Brian Mullen, Craig Johnson and Eduardo Salas (1991)**, meta-analysis of brainstorming productivity. Nominal and brainwriting groups reliably out-produce interacting verbal groups in quantity and quality - the aggregate result that anchors the S-tier human evidence held under the brainwriting skill.
- **Jake Knapp, John Zeratsky and Braden Kowitz (2016)**, *Sprint* (Simon and Schuster), and the Google Ventures Design Sprint Kit. The popular modern packaging: "work alone together," silent sketching, and note-and-vote all open with silent writing before discussion, explicitly to defeat anchoring and the HiPPO effect. Read for the practitioner framing, but note the design-sprint time-savings claims are self-reported and uncited; the controlled evidence lives with Delbecq/Van de Ven and Diehl/Stroebe, not the sprint literature.

"Silent writing before discussion," "silent writing," and "write-before-talk" are generic descriptive terms in common use - no trademark, no attribution required beyond crediting the NGT and design-sprint authors above - which is why this entry is documented descriptively and is not flagged as branded.

Where the mechanism lives in this repo: the shipped skill `think-brainwriting` and its evidence dossier at `skills/think-brainwriting/evidence/dossier.md`.
