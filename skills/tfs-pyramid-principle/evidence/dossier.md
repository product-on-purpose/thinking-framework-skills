# Evidence Dossier: Pyramid Principle

> The single source of truth for the `pyramid-principle` skill. The `SKILL.md`, the
> sidecar (`skill.meta.yml`), and the eval cases all derive from this file. If a claim
> is not here, it does not belong in the skill.

| | |
|---|---|
| **Skill** | `thinking-framework-skills.pyramid-principle` (installable name `tfs-pyramid-principle`) |
| **Family** | synthesis |
| **Evidence tier** | **P** (practitioner; limited controlled evidence - see section 3) |
| **Confidence** | High that the structure makes a recommendation easier to follow; low that any controlled study has measured it |
| **Status** | draft (authored 2026-05-31 from the discovery corpus) |

---

## 1. The mechanism (what actually does the work)

Most recommendations are delivered the way they were discovered: context, then analysis, then (eventually) the conclusion, so the reader has to hold a pile of facts in working memory and wait to learn what they add up to. The pyramid principle inverts that. The single conclusion - the **governing thought**, the one thing the reader should do or believe - goes first. Beneath it sit a small set of **key arguments** (typically three to five) that, taken together, justify the governing thought. Beneath each key argument sits the **supporting evidence**. The result is a top-down tree the reader can descend exactly as far as their trust requires and stop.

Three constraints do the actual work:

1. **Answer first.** Leading with the conclusion lets the reader evaluate everything below it against a known claim, instead of reverse-engineering the point from the evidence. This is the load-bearing move.
2. **A small, MECE set of key arguments.** The supports for the governing thought should be **M**utually **E**xclusive (no overlap, so the reader is not re-reading the same point) and **C**ollectively **E**xhaustive (nothing material to the claim is missing). MECE plus "small" is what keeps the case both complete and followable.
3. **Vertical and horizontal logic.** Vertically, each level answers the question the level above provokes ("why do you say that?"). Horizontally, the key arguments are ordered by a single intelligible logic (importance, time, or structure), not dumped in the order they occurred to the author.

An optional **SCQA** opening (**S**ituation the reader accepts, **C**omplication that disturbs it, **Q**uestion it raises, **A**nswer = the governing thought) gives the introduction a hook that lands on the conclusion rather than wandering toward it.

The mechanism we implement is: state the answer, decompose it into a small MECE set of ordered arguments, attach evidence to each, and pressure-test the structure. The branded "Minto Pyramid Principle" is the packaging; the durable move is answer-first, grouped, ordered communication of a conclusion.

## 2. Lineage

- **The Pyramid Principle**: Minto, B. (1987). *The Pyramid Principle: Logic in Writing and Thinking.* Originated at McKinsey in the 1970s as house guidance for structuring consulting recommendations; it remains the dominant convention for executive communication in management consulting.
- **MECE** (mutually exclusive, collectively exhaustive): a grouping discipline popularized alongside the pyramid in the same consulting lineage.
- **SCQA** (situation-complication-question-answer): Minto's introduction pattern, widely taught as a standalone framing device.

"Pyramid Principle" is a book title and a widely used generic phrase for the technique; "Minto" is a personal name and an informal label for the method. We name the skill descriptively (`pyramid-principle`) and cite Minto in the lineage rather than branding the skill. No attribution is required for the generic technique.

## 3. What the evidence shows, and what it does NOT show

This is the honest core of the dossier. The skill must not overclaim.

**What is reasonably supported (the practitioner case):**
- The method is **widely and durably adopted** in management consulting, corporate strategy, and executive communication - decades of practitioner use across firms, which is real signal that it is useful for its job (communicating a recommendation to a busy reader).
- Its core move - **state the conclusion first** - is consistent with well-established reading-comprehension findings that an explicit topic/thesis stated up front (an "advance organizer") helps readers comprehend and recall structured expository text. The broad direction ("tell readers the point first") is supported by comprehension research even though that research did not test the pyramid method itself.

**What is NOT shown (the caveats that keep the skill honest):**
- There is **no body of controlled studies on the Pyramid Principle as a named method.** It is practitioner doctrine, not an experimentally validated intervention. We grade it **P**, not S or M, for exactly this reason.
- The comprehension research that supports "answer first" is **adjacent, not direct**: it studied advance organizers and thesis-first prose in general, not Minto's pyramid, not business recommendations, and not AI-generated ones. Treat it as a plausibility anchor, not proof.
- The method improves **communication of a conclusion the author already holds.** It does **not** test whether the conclusion is correct, and it can make a weak argument *sound* more authoritative by dressing it in confident structure. A clean pyramid is not a sound argument; that is a job for argument analysis, not for this skill.

**Net grade: P.** Useful, heavily field-tested practitioner method with a comprehension-research direction behind its central move, but no controlled validation of the method as such. Claim the communication benefit; disclaim any claim that it makes the recommendation correct.

## 4. Transferred-evidence flag (required honesty for this library)

All of the support above comes from **human practice and human-subject comprehension research**, none of it from AI-augmented use. There is **no study** of a pyramid built by, or with, an AI agent, nor of whether an agent-produced pyramid improves a human reader's decision. The evidence is therefore **transferred from human contexts, not validated for AI-augmented use.** This skill must say so.

The realistic AI value does not depend on the unproven claims: a model defaults to narrating its reasoning (context first, conclusion buried, supports in discovery order). This skill makes the agent **invert that default** - lead with the governing thought, force the supports into a small MECE set, order them deliberately, attach evidence, and surface the structure as an inspectable artifact a human can challenge. That is a reliable, mechanical improvement to how a recommendation is communicated, independent of whether anyone has measured the method in a lab.

## 5. When it works / when it fails (drives the eval negative cases and "When NOT to Use")

**Works best when:**
- There is already a **conclusion or recommendation** to communicate (the thinking is done; this is the write-up).
- The reader is busy or senior and needs the headline first, with the option to descend for detail.
- The supports can be grouped into a small, non-overlapping set and put in a deliberate order.

**Fails or misleads when (poor-fit / anti-patterns):**
- **There is no conclusion yet.** Early exploratory thinking, where the answer is genuinely unknown, is the wrong place for an answer-first structure - it forces a premature headline. (Anti-trigger.)
- **The task is to test whether an argument holds**, not to communicate one. Auditing reasons, co-premises, and objections for soundness is argument analysis (use **tfs-argument-mapping**); the pyramid composes a clear case, it does not check it. (Near-miss anti-trigger.)
- **The task is to decompose a question for analysis**, breaking a problem into MECE sub-questions to investigate. That is an issue tree (use **tfs-issue-tree**); it structures the *question* for the analyst, whereas the pyramid structures the *answer* for the reader. The two look similar (both are MECE trees) and are easily confused. (Near-miss anti-trigger.)
- **Run as ritual** - slapping a one-line headline on top of unchanged, ungrouped prose, with supports that overlap or leave gaps, and key lines that do not actually sum to the governing thought. A pyramid whose levels do not hold together is cargo-cult structure. The skill must enforce MECE and the "do the key lines justify the top?" check.
- **Used to make a thin case look strong.** Confident structure can lend false authority to weak evidence. The skill must not imply that a tidy pyramid is a validated argument.

## 6. Output artifact

The skill must emit a **pyramid**, not prose: a governing thought at the top, a small ordered set of key-argument lines beneath it, and the supporting evidence under each key line, plus (optionally) an SCQA intro framing. Represent it as an explicit outline/tree (indented levels or a small table), preceded by a one-line statement of the governing thought so a reader who stops at the top still has the recommendation. The structure is the deliverable; a flowing essay is not.

## 7. Sources

1. Minto, B. (1987). *The Pyramid Principle: Logic in Writing and Thinking.* - the method, MECE grouping, and SCQA introduction; originated as McKinsey house guidance.
2. Reading-comprehension / advance-organizer literature (e.g. Ausubel's advance-organizer work and thesis-first expository-text studies) - the general finding that stating the main point up front aids comprehension and recall of structured text. Cited as an adjacent plausibility anchor for the "answer first" move, not as a test of the pyramid method.

> **Verification status:** Minto (citation 1) is the well-attested primary source for the method and its components. The comprehension/advance-organizer link (citation 2) is drawn from secondary synthesis and is deliberately framed as adjacent support, not direct validation; confirm the specific studies against primary sources before any public-facing claim, and never upgrade this from a plausibility anchor to evidence that the pyramid method itself was tested. The "no controlled studies of the named method" statement in section 3 is the honest default and should stand unless a primary study is found.
