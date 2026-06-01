# Evidence Dossier: Abstraction Laddering

> The single source of truth for the `abstraction-laddering` skill. The `SKILL.md`, the sidecar
> (`skill.meta.yml`), and the eval cases all derive from this file. If a claim is not
> here, it does not belong in the skill.

| | |
|---|---|
| **Skill** | `thinking-framework-skills.abstraction-laddering` (installable name `think-abstraction-laddering`) |
| **Family** | problem-framing |
| **Evidence tier** | **P** (practitioner; useful, limited controlled evidence - see "What the evidence shows") |
| **Confidence** | Moderate that the move helps locate the working altitude; low that any specific effect size is established |
| **Status** | draft (first authored 2026-05-31, against discovery corpus) |

---

## 1. The mechanism (what actually does the work)

A problem is always stated at *some* altitude, and the altitude is usually accidental: it is wherever the person happened to be standing when they noticed the problem. Solve at too low an altitude and you optimize a detail that does not matter ("make the button blue"); reason at too high an altitude and you produce a true but useless aspiration ("delight the customer"). Abstraction laddering is a deliberate act of **moving the problem up and down a single vertical axis of abstraction to find the altitude at which it is actually workable.**

Two complementary moves do the work:

1. **Up the ladder - "why? / to what end?"** Each "why" replaces the current statement with the broader purpose it serves. Climbing reveals the goal the current framing is only one means to, and exposes whether the stated problem is really a presupposed solution.
2. **Down the ladder - "how? / what specifically?"** Each "how" replaces the current statement with a more concrete instance or sub-problem. Descending turns an abstraction into something observable and actionable, and multiplies the options at a given level (there is usually more than one "how").

The output is not a discussion; it is an **abstraction ladder**: an ordered set of rungs from most abstract (top) to most concrete (bottom), with the entry rung marked and one rung explicitly chosen as the working altitude, plus a one-line rationale. The mechanism is locating altitude, nothing more. It does not pick a solution and it does not generate the other framing moves (stakeholder, inversion); those belong to broader reframing.

## 2. Lineage

- **Abstraction as a vertical dimension of meaning:** Hayakawa, S. I. (1939, and later editions). *Language in Thought and Action* - the "ladder of abstraction," from concrete referents up to abstract terms. This is the conceptual root and is descriptive, not trademarked.
- **As a design / problem-framing practice:** the "abstraction laddering" exercise popularized in UX and facilitation practice (for example, the Interaction Design Foundation and various design-sprint and facilitation toolkits), framed as asking "why" to go up and "how" to go down to find the right level for a "How Might We" question.
- **Adjacent engineering lineage:** value engineering's function analysis and TRIZ "why-stop" / S-field abstraction use the same up-the-ladder move to separate the function wanted from the current implementation.

No trademark. "Ladder of abstraction" (Hayakawa) and "abstraction laddering" (design practice) are generic descriptive terms; no attribution is required and none is claimed. The skill is named descriptively after the mechanism.

## 3. What the evidence shows, and what it does NOT show

This is the honest core of the dossier. The skill must not overclaim.

**What is reasonably supported:**
- That **how a problem is framed - including at what level of abstraction - affects the solutions found** has moderate support in the problem-finding and problem-framing literature (Getzels & Csikszentmihalyi on problem finding; Nutt on decisions that fail from poor problem definition; reframing practice such as Wedell-Wedellsborg, HBR 2017). Altitude is one well-attested lever inside that larger, supported claim.
- That abstraction is a real, navigable dimension of language and concepts (the Hayakawa ladder) is uncontroversial as a descriptive model.

**What is NOT shown (the caveats that keep the skill honest):**
- There is **no controlled study** isolating "abstraction laddering" as a named technique and measuring its effect on decision or solution quality against a baseline. It is a **practitioner method**: widely taught and used in design facilitation, with face validity and a clear mechanism, but thin direct empirical support of its own.
- The supportive framing evidence in the bullet above is about **framing in general**, not about this specific "why-up / how-down" exercise. It is suggestive, not confirmatory, for this skill. Do not present general framing research as if it validated the ladder technique itself.
- The method does **not** guarantee a better solution or a correct altitude. It makes the altitude choice *explicit and deliberate* rather than accidental; the judgment about which rung to work at remains a human call.

**Net grade: P (practitioner).** Clear mechanism and strong adoption in practice, supported indirectly by framing research, but lacking technique-specific controlled evidence. Claim "makes altitude explicit and helps locate a workable level"; do not claim measured improvement in outcomes.

## 4. Transferred-evidence flag (required honesty for this library)

All of the supporting evidence is from **human practice and human-subject framing research**, in design, facilitation, and decision settings. There is **no study** of abstraction laddering run by or with an AI agent, and none of whether an agent-built ladder improves a human's framing. The evidence is therefore **transferred from human practice, not validated for AI-augmented use.** The skill must say so. Treat the AI value as: the agent makes the up/down interrogation cheap and fast, resists stopping at the accidental entry rung, enforces a clean vertical ladder (not a sideways pile of related ideas), and produces a durable artifact that names the chosen working altitude - benefits that do not depend on any unproven outcome claim.

## 5. When it works / when it fails (drives the eval negative cases and "When NOT to Use")

**Works best when:**
- A problem or request is stated at a suspicious altitude: a bare solution ("add a dashboard") whose purpose is unstated, or a vague aspiration ("improve engagement") with no concrete handle.
- The team is arguing past each other and may simply be working at different levels.
- You need to decide, explicitly, at what level to attack a problem before committing effort.

**Fails or misleads when (poor-fit / anti-patterns):**
- **Altitude is not the issue.** If the problem needs a different *kind* of reframing - a stakeholder shift, an inversion, an is/is-not boundary, or weighing several rival framings - use **problem-restatement**, which generates those moves and converges on a chosen frame. Abstraction laddering only moves up and down one axis. (Near-miss anti-trigger against the neighboring skill.)
- **The right level is already clear and agreed.** Building a ladder for a well-located problem manufactures motion and wastes effort.
- **Used to generate solutions.** Going "down" lists more concrete *sub-problems and options to consider*, not a chosen solution; it is not ideation (use Question Burst / SCAMPER) and not a decision tool (use Decision Option Review).
- **Laddering to infinity.** Endlessly climbing to ever-grander purpose ("...to make the world better") or descending into ever-finer detail without ever marking a working rung produces a tall ladder and no decision. The skill must force selection of one rung.
- **Confused with a decomposition tree.** A ladder is a single vertical line (one why/how chain), not a branching breakdown of all parts; if the task is to decompose a problem into its components, use an issue tree.

## 6. Output artifact

The skill must emit an **abstraction ladder**, not prose: an ordered, top-to-bottom set of rungs (most abstract to most concrete), each rung a one-line restatement of the problem at that altitude, with the original entry rung marked, the "why?" relationship going up and the "how?" relationship going down made explicit, and exactly one rung selected as the working altitude with a one- or two-sentence rationale. A short summary sits above the ladder. The artifact is the deliverable; the conversation is not.

## 7. Sources

1. Hayakawa, S. I. (1939). *Language in Thought and Action* - the ladder of abstraction (conceptual root).
2. Getzels, J. W., & Csikszentmihalyi, M. (1976). *The Creative Vision: A Longitudinal Study of Problem Finding in Art* - problem finding and how problem formulation shapes outcomes.
3. Nutt, P. C. (work on decision-making failures, e.g. *Why Decisions Fail*, 2002) - decisions that fail from poor problem definition / premature framing.
4. Wedell-Wedellsborg, T. (2017). "Are You Solving the Right Problems?" *Harvard Business Review* - reframing practice; framing precedes good solutions.
5. Interaction Design Foundation and design-facilitation toolkits - "abstraction laddering" as the why-up / how-down exercise to find the right altitude for a problem statement.

> **Verification status:** Hayakawa (1) and Wedell-Wedellsborg (4) are well-attested. The problem-finding and decision-failure citations (2, 3) support framing *in general* and are drawn from secondary synthesis; they should be confirmed against the primary works before any public-facing claim, and they must not be presented as validating the ladder technique specifically. Citation 5 is practitioner literature, not peer-reviewed evidence. These are safe to use inside this dossier because the dossier's job is to be honest about exactly this gap.
