# Deep research brief: new thinking methods for an evidence-graded skill library (wave 4)

The appendix at the end of this document lists every method the library has already evaluated. It is part of this brief, so read all of it before you start.

---

## Who this research is for

You are researching for thinking-framework-skills, an open library of thinking methods. Each method is written as a skill that an AI agent can execute, and the humans who work with those agents use the methods too. Every method in the library carries an honest grade of its evidence. It also produces a concrete artifact, and it states when not to use it.

The library is public at https://thinking-framework-skills.productonpurpose.com. A machine-readable list of the same evaluated methods, with each one's disposition, is at https://thinking-framework-skills.productonpurpose.com/evaluated.json. That file omits aliases, so the appendix after this brief is the authoritative copy.

## Your task

Find thinking methods, and whole families of methods, that the library has not yet evaluated. Grade the evidence for each one honestly. Then judge whether it adds a cognitive move that the library does not already have. The appendix lists all 135 methods already evaluated, and nothing on it counts as new.

This is the library's fourth search. The first three took the obvious picks and the picks that several researchers agreed on, so expect a thinner field. A short list of well-evidenced, genuinely distinct methods is a better result than a long list of near-duplicates. "This family has nothing new" is a valid finding.

## What counts as a thinking method here

- It is a repeatable cognitive move that one reasoner, a person or an AI agent, can carry out on a problem in a single working session.
- It produces a concrete artifact, such as a matrix, a ranked list, a map, a register or an estimate.
- It works across domains. A method tied to one profession, such as clinical diagnosis, UX evaluation or legal procedure, is out of scope unless its core move transfers. Product-management methods belong to a sibling library and are out of scope here.
- It is not a personality instrument, a software tool, or a group ritual that needs several live people. Group-only facilitation methods have folded or been excluded every time so far, because an agent cannot run a room. Propose one only if a single reasoner can perform its core move.

## Where to look first

1. **Eight leads held over from the last search.** Each came from a single source, so each needs an independent second look. Give every one a disposition, even when it is "fold into" an existing method or "reject".
   - Peer Instruction (commit to an answer, discuss, recommit)
   - Sequential Evaluation, also called segmented testimony
   - Value-Focused Thinking (Ralph Keeney)
   - Causal mapping with directed acyclic graphs (Judea Pearl)
   - Robust Decision Making (Robert Lempert and colleagues, RAND)
   - Necessary Condition Analysis (Jan Dul)
   - Most Significant Change
   - Moral Foundations deliberation
2. **Lower-priority leads from the last search.** One researcher proposed these with grades the library did not trust. Research them only if your budget allows: Cross-Impact Analysis, E-Prime translation, Tetralemma, Cognitive Walkthrough, Targeted Experience Narratives, Ritual Dissent, and Algorithmic Impact Assessment.
3. **Families the library covers thinly.** Facilitation and group structures has no shipped method. Ethics and values deliberation has four methods, all added in one pass. Self and team awareness has no shipped method. Look for single-reasoner methods in these areas.
4. **Methods developed for, or tested on, language-model agents.** Look for structured prompting and reasoning protocols that have controlled evaluations. Expect most of them to fold into an existing method. For example, step-back prompting is a form of abstraction laddering. Propose one only if its move is distinct.
5. **Any family the appendix does not cover.** Name the gap and justify it.

## Already judged in the last search, so do not re-propose

The last search proposed each of these, and the library judged that each folds into an existing method:

- Pre-Parade (catastrophic success mapping)
- SAST (strategic assumption surfacing and testing)
- QOC (questions, options and criteria) and design rationale capture
- Cone of Plausibility
- Structured Self-Critique
- Principlism (the four principles of biomedical ethics)
- Consider-the-Opposite, and Multiple-Explanation (consider-an-alternative)
- Mutual Gains Approach and ZOPA mapping
- Indicators and Signposts
- Formal Dialectical Inquiry

Re-argue one of these only if you found evidence the last search did not have. Put it in the section for re-arguing a disposition.

## How to grade evidence

Use this seven-tier scale. Grade the evidence for the method's actual move, not for a related method.

| Tier | Meaning |
|---|---|
| S | Strong research: replicated experimental or meta-analytic support. |
| M | Moderate: real evidence, but narrower, correlational, or field-based. |
| P | Practitioner: widely used and defensible, without strong controlled evidence. |
| V | Vendor or commercial: originates from a consultancy or a branded methodology. |
| A | Anecdotal: case reports and testimonials. |
| C | Conceptually plausible but under-tested: reasonable, not yet demonstrated. |
| X | Poor or contradictory: the evidence cuts against it. |

Apply these rules. The last search's weakest output broke the first three.

- **Pedigree is not outcome evidence.** A famous author, a long history or philosophical centrality does not raise a grade. Neither does use by militaries, intelligence agencies or large firms.
- **Methodological standing is not outcome evidence.** A method that is rigorous as a research method has not thereby been shown to improve a reasoner's judgment.
- **"A language model can follow it easily" is not evidence.** Programmability says nothing about whether the method improves the reasoning.
- **Split or borrowed evidence takes the lower grade.** Evidence can be split, or borrowed from a related method or from studies of people. Either way, give the lower grade and say why.
- **Name every source.** Give the authors, year and venue, plus what was measured, the sample size and the effect. Quote the abstract or the result word for word where you can.
- **Never give an untraceable statistic.** If a number has no named primary source, say that it is untraceable instead of using it.
- **Report negative results as prominently as positive ones.** That covers null results, failed replications, retractions and corrections. Check whether each paper you cite has been retracted or corrected.
- **Label vendor numbers.** Mark any figure that comes from a company selling the method or training in it.

## Evidence for language-model agents (new this round)

For each candidate, report separately whether any study tests the method when a language-model agent performs it, or when people use it with one. Give the study, the model, the task, the comparison condition and the result. A preprint counts, but label it as a preprint. If you find nothing, write "no language-model study found" rather than leaving the line out.

Keep the two kinds of evidence apart. Agent evidence must not raise the human-evidence grade, and human evidence must not raise the agent line.

## How to judge distinctness

The library ships a method only if it adds a move that no existing method makes. As a rule of thumb, a candidate counts as distinct only if it shares no more than about a fifth of its working mechanism with any single existing method. For each candidate:

- Name the closest one or two methods from the appendix.
- State the single move the candidate adds. Then say why the closest methods cannot produce that move, even when used together or in sequence.
- Give your confidence in the distinctness call as high, medium or low.

If you cannot name the added move, the right disposition is "fold into" the closest method. A fold is a useful finding, not a failure.

## Intellectual property

Say whether the method's name is generic, academic, or a trademark or brand. For a branded method, name the owner. The library documents branded methods under a descriptive name.

## Output format

1. **Summary.** Give five to eight bullets covering the strongest candidates, any proposed new family, and the overall yield.
2. **Candidates, ranked by evidence and distinctness together.** Give each candidate these fields, in this order:
   1. Name, and its aliases.
   2. Family: one from the appendix, or a proposed new family with a one-sentence rationale.
   3. Mechanism: the move in two or three sentences, and the artifact it produces.
   4. Human evidence: the tier, then the named sources, as described above.
   5. Language-model evidence: as described above, or "no language-model study found".
   6. Distinctness: the closest existing methods, the added move, and your confidence.
   7. IP: generic, academic, or branded (with the owner).
   8. Disposition: build, fold into (name the method), document only (worth a library page, not a skill), or reject. Add a one-sentence reason.
3. **The eight held-over leads.** Give each one a disposition in the same fields, even when the entry is brief.
4. **Re-arguing a disposition** (optional). Use this section only for a method in the appendix whose disposition your evidence says should change. Give the evidence.
5. **What you could not search.** List every lead you ran out of time or search budget for. Say so plainly, and do not grade it.
6. **Caveats.** Say where your grading or your distinctness calls are weakest.

Write in full sentences. Do not inflate a grade to make a candidate look stronger. A candidate graded P, with an honest statement of when not to use it, is more useful than one graded S without support.
