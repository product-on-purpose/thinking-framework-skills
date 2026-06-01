# Evidence Dossier: Evidence vs Inference Sort

> Single source of truth for the `evidence-vs-inference-sort` skill. The SKILL.md, sidecar, and evals derive from this. If a claim is not here, it does not belong in the skill.

| | |
|---|---|
| **Skill** | `thinking-framework-skills.evidence-vs-inference-sort` (installable name `think-evidence-vs-inference-sort`) |
| **Family** | reasoning-clarity |
| **Evidence tier** | **P** (practitioner; the underlying critical-thinking competence has broader support) |
| **Confidence** | High that the distinction matters; the specific sort is a practitioner technique |
| **Status** | draft (authored 2026-05-31 from the discovery corpus) |

## 1. The mechanism (what actually does the work)

Reasoning degrades when **evidence** (what is actually observed or verifiable) is silently blended with **inference** (what is deduced) and **assumption** (an unstated premise taken for granted). Language models are especially prone to this: they are probabilistic generators that present fluent inference in the same confident register as fact. The skill forces a separation: take a body of claims (a prompt, a document, or a proposed conclusion) and label each unit as evidence, inference, or assumption, record the basis for each, attach a confidence level to inferences, and flag uncited or unsupported claims. The work is done by making the leaps visible, so they can be challenged before they are built on.

Important boundary: this skill classifies *claim type*, it does not verify that the evidence is *true*. It separates "this is presented as fact" from "this is a deduction"; confirming the facts is a different job.

## 2. Lineage

- Facione's critical-thinking consensus (the 1990 Delphi Report) defines **evaluation** (judging the credibility of statements and the strength of inferential relationships) and **inference** (drawing reasonable conclusions from evidence) as distinct core skills. This skill operationalizes that distinction.
- The intelligence-analysis tradition (structured analytic techniques) similarly insists on separating evidence from judgment and surfacing assumptions.

No trademark. Named descriptively.

## 3. What the evidence shows, and what it does NOT show

**Supported:** distinguishing evidence from inference is a foundational critical-thinking competence, and explicit critical-thinking instruction shows moderate gains in reasoning broadly (the strongest related result is for argument mapping, effect sizes around 0.7-0.85; that is adjacent, not this exact technique).

**NOT shown:** there is no controlled evidence that this specific "sort into a ledger" technique improves decisions or that an AI performing it improves a human's judgment. Grade the *technique* as practitioner, not as a proven intervention. Do not imply the sort verifies truth.

## 4. Transferred-evidence flag

Evidence is from human critical-thinking and analysis contexts, not AI-augmented use. Transferred, not AI-validated. The AI value is concrete: a model blends fact and inference by default, so an explicit sort is a direct counter, and the ledger is an inspectable artifact a reviewer can challenge.

## 5. When it works / when it fails

**Works best when:** a conclusion or proposal needs to be trusted; in legal, medical, financial, safety, or architecture-planning contexts; when auditing the reasoning behind a recommendation (this skill's own or another's).

**Fails or misleads when (poor-fit / anti-patterns):**
- The reader mistakes it for fact-checking. It labels claim *type*; it does not confirm the evidence is true.
- Applied to creative or exploratory work where rigor is not the point.
- Over-applied to trivial claims, producing noise.
- Confident inference is mislabeled as evidence (the central failure mode), or plausibility is treated as verification.

## 6. Output artifact

An **evidence / inference ledger**: a table where each claim is tagged Evidence | Inference | Assumption, with its basis or source, a confidence level for inferences, and a flag for anything uncited or unsupported, followed by a short list of the load-bearing unsupported claims that most need verification.

## 7. Sources

1. Facione, P. A. (1990). *Critical Thinking: A Statement of Expert Consensus* (the Delphi Report) - evaluation vs inference as distinct skills.
2. Structured analytic techniques literature (intelligence analysis) - separating evidence from judgment; key-assumptions checks.
3. (Adjacent) van Gelder and others on argument mapping effect sizes - supports the broader critical-thinking competence, not this exact technique.

> **Verification status:** the Facione/Delphi distinction is well-attested. The argument-mapping effect sizes are adjacent evidence and should not be presented as evidence *for this technique* in any public claim; they support the family, not the sort.
