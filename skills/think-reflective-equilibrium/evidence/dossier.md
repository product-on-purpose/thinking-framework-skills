# Evidence Dossier: Reflective Equilibrium (contested lens)

> Single source of truth for the `reflective-equilibrium` skill. The SKILL.md, sidecar, and evals derive from this. The full catalog dossier (why reflective equilibrium is document-only at the catalog level) lives at `frameworks/reflective-equilibrium/dossier.md`; this is the skill-facing grounding for the explicitly-requested, caveat-first run.

| | |
|---|---|
| **Skill** | `thinking-framework-skills.reflective-equilibrium` (installable name `think-reflective-equilibrium`) |
| **Family** | ethics-values-deliberation |
| **Evidence tier** | **C** (conceptually plausible, philosophically central, empirically untested as a procedure) |
| **Posture** | contested lens, run-caveat-first, explicit-request-only |
| **Confidence** | Low that running the method as a bounded procedure improves judgments; the added discipline (an explicit revision ledger and honest stopping) is what carries value |

## 1. The mechanism (what actually does the work)

Reflective equilibrium is justification by mutual adjustment across three tiers: considered judgments about particular cases (tier a), general principles (tier b), and, in the wide variant philosophers actually defend, relevant background theories (tier c). When a case judgment and a principle conflict, you revise whichever has less credibility on reflection. The move is bidirectional: sometimes the principle bends to the case, sometimes the case is overruled. The durable cognitive kernel is bidirectional revisability, as opposed to rigid rule-following (the principle always wins) and ad hoc casuistry (the case always wins). This skill runs it caveat-first and adds the one thing a bare run omits: a revision ledger that records which commitment gave way and why, plus an honest statement of residual disagreements, instead of a bare declaration of coherence.

## 2. Lineage

- Nelson Goodman (*Fact, Fiction, and Forecast*, 1955) introduced the mutual-adjustment justification, originally to justify rules of inductive logic, not ethics.
- John Rawls (*A Theory of Justice*, 1971) coined "reflective equilibrium" and made it the working method of the century's most influential political philosophy; "considered judgments" is his term.
- Norman Daniels (1979, and *Justice and Justification*, 1996) distinguished narrow from wide equilibrium and is the method's principal elaborator; his Stanford Encyclopedia of Philosophy entry (2003, revised) is the standard survey.
- "Reflective equilibrium" is a generic descriptive term in philosophy; no trademark, no owner.

## 3. What the evidence shows, and what it does NOT show

**Honest grade: C - conceptually plausible, philosophically central, empirically untested as a procedure.** What exists is foundational and survey literature (Goodman 1955; Rawls 1971; Daniels 1979) that establishes centrality and articulation, not effectiveness; and formal models simulated in silico (Beisbart, Betz and Brun 2021; Freivogel 2023), which test an idealized model, not people or working agents. Freivogel's (2023) simulations found different starting points reach identical equilibria only rarely (about 27 percent of pairs), with compatibility of positions improving from roughly 7 to 31 percent.

**NOT shown:** there is no controlled study that performing reflective equilibrium improves decision quality, moral judgment, consistency, or convergence in humans or AI agents. Three failure modes bite in a bounded session: no externally checkable termination test ("equilibrium" cannot be told from "I stopped looking"); garbage in, equilibrium out (Brandt 1979: the method may be "no more than a reshuffling of moral prejudices"; Singer 2005's evolutionary debunking sharpens this); and a license to rationalize (a motivated reasoner can demote the principle that forbids a preferred outcome and call the result principled). Any "reflective equilibrium improves outcomes by N%" claim is unsupported and must never be reproduced.

## 4. Transferred-evidence flag

Evidence is from human philosophy (and idealized in-silico models), not AI-augmented use. Transferred, not AI-validated. For an LLM whose "considered judgments" are training-distribution intuitions, the Brandt/Singer input-credibility objection bites harder, not softer. The honest AI value is narrow: forcing an explicit revision ledger and honest stopping turns a method that can rubber-stamp its starting intuitions into an auditable artifact, with the deficiency stated up front.

## 5. When it works / when it fails

**Works best when:** the user asks for reflective equilibrium by name, a stated principle collides with a strong concrete-case judgment, and you add the discipline (three tiers, bidirectional revision, a recorded ledger).

**Fails or misleads when (poor-fit / anti-patterns):**
- Used to declare "coherence reached" with no ledger of what was traded away (the documented failure mode).
- Treated as a stand-in for an external constraint: for an impartial rule under uncertainty use `think-veil-of-ignorance-reasoning`; for a parties-by-principles audit use `think-ethical-matrix`.
- Used for evidence-driven revision of standing beliefs over time, which is one-directional and cadence-based: use `think-belief-update-routine`.

## 6. Output artifact

A **three-tier coherence set plus revision ledger**: considered case judgments (tier a), general principles (tier b), and background theories (tier c); the conflicts found; a revision ledger recording, per conflict, which commitment gave way, in which direction, and why it was the weaker member; and an honest statement of residual unresolved disagreements rather than a global declaration of coherence.

## 7. Sources

1. Rawls, J. (1971), *A Theory of Justice*, Harvard University Press. (coined "reflective equilibrium"; the method's central modern home)
2. Goodman, N. (1955), *Fact, Fiction, and Forecast*, Harvard University Press. (the original mutual-adjustment justification, for inductive logic)
3. Daniels, N. (1979), "Wide Reflective Equilibrium and Theory Acceptance in Ethics," *Journal of Philosophy* 76(5): 256-282; and the Stanford Encyclopedia of Philosophy entry "Reflective Equilibrium" (2003, revised). (the wide variant and the standard survey)
4. Brandt, R. (1979), *A Theory of the Good and the Right*, Oxford University Press. (the input-credibility objection: a possible "reshuffling of moral prejudices")
5. Singer, P. (2005), "Ethics and Intuitions," *The Journal of Ethics* 9(3-4): 331-352. (evolutionary debunking of the considered judgments)
6. Beisbart, C., Betz, G. and Brun, G. (2021), "Making Reflective Equilibrium Precise: A Formal Model," *Ergo* 8(15): 441-472. (formal model; simulation code published)
7. Freivogel, A. (2023), "Does reflective equilibrium help us converge?", *Synthese* 202. (simulations: full convergence rare, about 27 percent)

> **Verification status:** Rawls 1971 and the Brandt/Singer critique line are well-attested anchors; the ~27 percent convergence figure is Freivogel's (2023) in-silico result, not a human or agent outcome. Treat the method's value as a stance rather than a validated procedure; the skill exists to run an explicitly-requested lens honestly, with a revision ledger, not to endorse it.
