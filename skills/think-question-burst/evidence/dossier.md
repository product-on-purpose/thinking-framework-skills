# Evidence Dossier: Question Burst

> Single source of truth for the `question-burst` skill. The SKILL.md, sidecar, and evals derive from this.

| | |
|---|---|
| **Skill** | `thinking-framework-skills.question-burst` (installable name `think-question-burst`) |
| **Family** | divergent-ideation |
| **Evidence tier** | **P** (practitioner; MIT Sloan reports participant benefits) |
| **Confidence** | Moderate that questioning shifts framing; for AI the value is curation, not generation |
| **Status** | draft (authored 2026-05-31 from the discovery corpus) |

## 1. The mechanism (what actually does the work)

Stuck thinking is often stuck on the wrong question. A question burst generates many questions about a problem in a short, constrained burst - questions only, no answers, no preamble - to break attachment to the current framing, then ranks them for which would most change the approach and picks the single most catalytic one to pursue. The discipline (questions only, a quota, a time box) suppresses the reflex to answer prematurely.

**Critical adaptation for AI:** a model can produce hundreds of questions instantly, so raw generation is worthless here. The value is entirely in the **ranking and selection** - identifying the few questions that would actually shift the problem. This skill therefore requires a ranked output and one chosen next question, not a bulk dump.

## 2. Lineage

- Hal Gregersen (MIT Sloan), "Better Brainstorming" / the question-burst method: generate at least ~15-20 questions in a few minutes under a strict questions-only rule, then study them for the catalytic ones.

No trademark. Named descriptively.

## 3. What the evidence shows, and what it does NOT show

**Supported (practitioner):** MIT Sloan reports that participants who run a question burst commonly leave with a better emotional state, a broader view of the problem, or the recognition that they are themselves part of the issue. The questions-only constraint is the active ingredient.

**NOT shown:** no controlled evidence that it improves decision outcomes. And for AI specifically, the generation half has near-zero value (the well-known critique: LLMs generate questions trivially; the challenge is curation). Grade P, and design the skill around the curation, not the volume.

## 4. Transferred-evidence flag

Evidence is from human workshop contexts, not AI-augmented use. Transferred, not AI-validated. The honest AI value is narrow but real: forcing a ranked, selected output (not a bulk list) turns cheap question generation into a genuine reframing aid.

## 5. When it works / when it fails

**Works best when:** stuck, over-attached to one framing, or at the very start of exploring an ambiguous problem; when a better question is needed before any answer.

**Fails or misleads when (poor-fit / anti-patterns):**
- Used to dump a bulk list of questions with no ranking or selection (the central AI failure mode; low signal-to-noise).
- Answering instead of questioning during the burst.
- When the issue needs answers and convergence, not more questions.
- When the catalytic question is already known.

## 6. Output artifact

A **ranked question set**: the raw burst (kept brief), then the questions ranked by how much they would change the approach, and the single chosen "next question" to pursue with a one-line reason.

## 7. Sources

1. Gregersen, H. (MIT Sloan), "Better Brainstorming" (HBR) and the Question Burst method.

> **Verification status:** Gregersen/MIT Sloan attribution is well-attested. Treat participant benefits as practitioner-reported, not a measured decision-quality effect.
