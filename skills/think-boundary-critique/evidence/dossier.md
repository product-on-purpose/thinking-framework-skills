# Evidence Dossier: Boundary Critique

> The single source of truth for the `boundary-critique` skill. The `SKILL.md`, the sidecar
> (`skill.meta.yml`), and the eval cases all derive from this file. If a claim is not here, it does
> not belong in the skill. Drafted by the `think-research-framework` engine and admitted as a Build.

| | |
|---|---|
| **Skill** | `thinking-framework-skills.boundary-critique` (installable name `think-boundary-critique`) |
| **Family** | problem-framing |
| **Evidence tier** | **C** governing (honest read **C/P**, capped at C - see "What the evidence shows") |
| **Confidence** | Moderate that the is/ought boundary interrogation surfaces real exclusions on contested frames; low that any outcome benefit transfers to agents |
| **Status** | draft (admitted from the SP6 discovery shortlist) |

---

## 1. The mechanism (what actually does the work)

Boundary critique is the central operation of Critical Systems Heuristics (CSH), developed by Werner Ulrich. Its durable cognitive move is to interrogate the **boundary judgments** that silently define a problem frame - the prior decisions about what and who count as relevant, and what and who are left out - rather than to reason inside the frame as given. In Ulrich's terms, boundary judgments "determine which empirical observations and value considerations count as relevant and which others are left out," and they "condition both facts and values": the facts you collect and the values you weigh both depend on where you drew the line first.

The move is operationalized as a checklist of **twelve boundary questions** grouped under four sources of influence over any design or intervention:

1. **Motivation (who benefits):** who is the client/beneficiary; what is the purpose; what is the measure of improvement or success.
2. **Power/control (who decides):** who is the decision-maker; what resources and conditions are under their control; what is outside their control (the decision environment).
3. **Knowledge (whose expertise counts):** who is treated as expert/professional; what relevant expertise actually applies; what is assumed to guarantee success (and whether those are false guarantors).
4. **Legitimacy (who has standing):** who witnesses for those affected but not involved; where the affected draw emancipation from the premises of the involved; what worldview is treated as authoritative, and how competing worldviews are reconciled.

The decisive structural feature is that every question is asked twice, in two modes: the **"is" mode** (descriptive - how the frame currently draws the boundary) and the **"ought" mode** (normative - how it should draw it). The gap between the is-boundary and the ought-boundary is the finding. The fourth group, legitimacy, contains the move the rest of the library does not have: it forces an explicit account of **those affected but not involved** - parties with a stake in the consequences who hold no seat, no voice, and no expertise-standing inside the frame - and asks who, if anyone, witnesses for them.

The deliverable is a **boundary-judgment audit**: the categories answered in both is and ought modes, the is-vs-ought gaps named, and an explicit list of the affected-but-excluded the current frame omits. The point is not to round up stakeholders; it is to test whether the frame's membership - whom it includes and excludes - is legitimate, descriptively versus normatively, before the frame is acted on.

## 2. Lineage

- **Critical Systems Heuristics (CSH) and boundary critique:** Werner Ulrich, first set out in *Critical Heuristics of Social Planning: A New Approach to Practical Philosophy* (Haupt, 1983) and condensed in his 1987 *European Journal of Operational Research* paper "Critical heuristics of social systems design." The framework is grounded in practical philosophy - Kant's regulative ideas, C. West Churchman's systems approach, and Jurgen Habermas's theory of communicative action.
- **Later elaboration:** developed with **Martin Reynolds** (the CSH chapter in *Systems Approaches to Managing Change*, and Reynolds's work on CSH-based evaluation), which is the standard teaching reference for the four sources and twelve questions in is/ought form.
- **Naming and IP:** "Critical Systems Heuristics" and "boundary critique" are generic academic terms in common scholarly use, **not** trademarks. This skill credits Ulrich (and Reynolds) as lineage but is not branded and needs no trademark string; the attribution-not-branding treatment applies. It ships under a mechanism-over-brand name, `boundary-critique`, per the library's first commitment.

## 3. What the evidence shows, and what it does NOT show

The honest read is **C/P, capped at the conservative governing grade of C.** Both the read and the cap matter.

**What the record supports.** CSH is an influential, well-developed framework in systems thinking, operational research, and evaluation practice, with a forty-year literature and a clear, teachable apparatus (the twelve questions, the four sources, the is/ought pairing). A 2024 systematic review by Hutcheson, Morton and Blair (*Systemic Practice and Action Research* 37(4): 499-514; epub 29 Nov 2023) examined 77 peer-reviewed papers and found a real body of applied case work across multiple problem domains, with CSH's "utility ... best exemplified in an action research context." The review also credits CSH's distinctive reach: it "surpasses soft systems frameworks in its potential to provide insights into coercion" and enables "deep reflection on a problem through the lens of negatively impacted groups." Ulrich himself frames CSH as "a critical methodology for identifying and debating boundary judgements" rooted in "practical philosophy and systems thinking" - that is, an explicitly philosophical, reflective-practice heuristic, not a technique making an effect-size claim.

**What the record does NOT support, and why the grade caps at C.** There is **no controlled, comparative, or outcome study** of boundary critique. The same systematic review reports that "several of the papers reviewed are not practical applications of the framework but contributions to theoretical and methodological discussions," contains no randomized trials, comparison groups, or quantified effectiveness metrics, and characterizes CSH as a "relatively underutilised method" whose outcomes are largely unmeasured. So there is no demonstration that running a boundary critique produces better decisions, frames, or interventions than not running one. The evidence is the existence and reasoned application of the method, not evidence that it works. That is the line between C and P: there is no practitioner-*outcome* base to anchor a P, only theory plus applied cases - hence C governs.

**No laundered statistics.** No effect size or success-rate figure is cited for boundary critique, because there is no nameable primary source for one. None is invented or implied here. A famous, deeply-cited framework can clear the distinctness bar while still grading only C, because influence and a deep literature are not the same thing as evidence that the method works.

**Net grade: C (governing), honest read C/P.** Claim "surfaces who the frame illegitimately includes or excludes, descriptively versus normatively, and names the affected-but-excluded"; do not claim a measured improvement in decisions, frames, or interventions.

## 4. Transferred-evidence flag (required honesty for this library)

The entire literature is **human practitioners** in policy, evaluation, operational research, and action-research settings. None studies a boundary critique produced by or with an AI agent. The evidence is **transferred from human contexts and not validated for AI-augmented use** - a second reason the conservative governing grade is C, not higher. There is no S- or M-tier research on this move to borrow from, so there is no optimistic half to inflate from. Treat the AI value as: the agent makes the twelve-question, is/ought pass cheap and disciplined, resists the reason-inside-the-frame reflex, holds the descriptive and normative modes distinct, and enforces the affected-but-excluded accounting that a stakeholder walk-through structurally cannot reach - benefits that do not depend on any unproven outcome claim.

## 5. When it works / when it fails (drives the eval negative cases and "When NOT to Use")

**Works best when:**
- The *frame itself* is the suspect object - a plan, metric, proposal, or "solution" already encodes who matters and who does not, and the risk is solving a tidy problem for the people inside the line while externalizing harm onto people outside it.
- An "improvement" claim rests on an unexamined judgment about *whose* improvement.
- The situation is contested, value-laden, or multi-party (policy, programme and intervention design, evaluation) - the place the review marks as CSH's reviewed strength, for its reach into coercion and negatively-impacted groups.

**Fails or misleads when (poor-fit / anti-patterns):**
- **The frame is genuinely settled and uncontested.** If the stakeholder set and the success measure are agreed and legitimate, auditing the boundary manufactures doubt and stalls execution - the same failure as reframing a correct problem. This is the central wall.
- **The problem is technical or single-party.** One obviously-correct beneficiary and no excluded affected parties produces empty "ought" columns - ritual, not insight.
- **It is mistaken for a method that resolves the disputed boundary.** Boundary critique *surfaces and debates* the is-vs-ought gap; it does not adjudicate it. The systematic review is blunt that CSH "is predicated on reflective debate" and "may be insufficient in uncovering the cause-and-effect relationships" behind a coercive situation. It exposes the boundary question; it does not settle who is right or compel a powerful actor to widen the line. Route a real gap onward to a decision skill.
- **It is run as a stakeholder round-up.** If it degrades into "list the parties and voice each," it collapses into the move the library already ships (`think-parallel-perspectives-review` stakeholder mode, or `think-problem-restatement`'s stakeholder shift) and loses its distinct contribution - the is/ought interrogation and the affected-but-excluded.

## 6. Output artifact

The skill must emit a **boundary-judgment audit**, not prose: the frame under audit captured verbatim with its claimed improvement; the four sources (who benefits, who decides, whose knowledge counts, who has standing) each answered in *both* is and ought modes; the is-vs-ought gap named for each source (or an honest "no gap - legitimate boundary"); and a distinct, explicit list of the affected-but-excluded - parties outside the line with a stake but no voice, each with a note on who, if anyone, witnesses for them. The artifact closes by stating what it does NOT do (surfaces the boundary question, does not adjudicate it) and, where a real gap exists, the onward route for deciding under it. A short summary sits above the audit.

## 7. Sources

1. Werner Ulrich, *Critical Heuristics of Social Planning: A New Approach to Practical Philosophy* (Haupt, 1983). The foundational statement of CSH and boundary critique. Foundational.
2. Werner Ulrich, "Critical heuristics of social systems design," *European Journal of Operational Research* 31 (1987): 276-283. The condensed OR-facing formulation of the twelve boundary questions and the is/ought modes. Foundational. (C - theoretical/methodological.)
3. Werner Ulrich, "A Brief Introduction to Critical Systems Heuristics (CSH)" (2005), and the mini-primer of boundary critique on his homepage. The clearest first-person account of boundary judgments conditioning facts and values, and of those affected-but-not-involved. Author's primer. (C.)
4. Werner Ulrich and Martin Reynolds, "Critical Systems Heuristics," ch. 6 in *Systems Approaches to Managing Change: A Practical Guide* (Reynolds and Holwell eds., Springer/Open University, 2010/2020). The standard teaching reference; the four sources and twelve questions in is/ought form. Practitioner/teaching reference. (P-as-pedagogy, not outcome.)
5. Mark Hutcheson, Alec Morton and Susan Blair, "Critical Systems Heuristics: a Systematic Review," *Systemic Practice and Action Research* 37(4) (2024): 499-514 (epub 29 Nov 2023). 77 peer-reviewed papers; documents the applied-case-and-theory base, the absence of controlled/outcome evidence, and CSH's underutilisation - the source that bounds the grade at C. Systematic review.
6. Better Evaluation and Integration and Implementation Insights (i2insights, 2022) primers on CSH for evaluation and research practice. Used here only to corroborate the mechanism (the twelve questions, the four sources, the witness/affected-but-not-involved role), not as evidence of effect. Practitioner reference.

> **Verification status:** The mechanism descriptions (Ulrich 1983/1987/2005, the Reynolds teaching chapter, and the practitioner primers) are well-attested and mutually consistent, as is the generic-term / no-trademark status of "Critical Systems Heuristics" and "boundary critique." The Hutcheson, Morton and Blair systematic review (5) is the source for the 77-paper count, the theory-versus-application split, the action-research utility note, and the "relatively underutilised" and coercion-reach characterizations; its quoted phrases are reported from the review's summary rather than an independently audited full read. No effect-size or success-rate figure exists for boundary critique, so none is cited; the absence is itself the reason the governing grade is C. None of these gaps changes the conservative governing grade.
