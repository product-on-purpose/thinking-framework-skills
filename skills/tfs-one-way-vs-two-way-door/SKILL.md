---
name: tfs-one-way-vs-two-way-door
description: Produces a reversibility classification that triages a decision before any analysis - labeling it a reversible two-way door or a hard-to-reverse one-way door - and matches the deliberation and sign-off level to that verdict, so reversible calls are made fast and irreversible ones get real rigor. Use when it is unclear how much process a decision deserves, when a team is about to rubber-stamp something irreversible or convene a committee over something trivially reversible, or when a chronically slow org needs a defensible reason to move fast or slow down.
license: Apache-2.0
metadata:
  id: thinking-framework-skills.one-way-vs-two-way-door
  family: decision-and-option-evaluation
  evidence-tier: "P"
  version: 0.1.0
  standard: "0.8"
---
<!-- thinking-framework-skills | https://github.com/product-on-purpose/thinking-framework-skills | Apache-2.0 -->
# One-Way vs Two-Way Door

This is a meta-decision tool: a triage that runs *before* any option comparison and asks one question - how reversible is this decision? - then matches the deliberation and sign-off to the answer. A **two-way door** is reversible (walk back cheaply), so decide it fast, low, and light. A **one-way door** is hard or expensive to reverse, so give it real rigor and senior sign-off. The load-bearing move is separating the reversibility judgment from the decision itself, which routes scarce deliberation toward the irreversible few and licenses speed on the reversible many. The output is a **reversibility classification plus a matched deliberation level** - it says how much machinery the choice deserves, never which option to pick.

## When to Use

- A decision is on the table and it is unclear how much process it deserves.
- Someone is about to rubber-stamp something irreversible, or convene a committee over something trivially reversible.
- A team or org is chronically slow, applying the same heavyweight approval to everything regardless of stakes.
- You want an explicit, defensible reason - decided before deliberation starts - to either move fast or slow down.

## When NOT to Use

- **When the decision is already known to be high-stakes and is being analyzed.** Triage already happened; you are past this tool. Use a risk tool (premortem) or an option comparison, not a classifier that confirms what you know.
- **When you need to actually compare options against criteria.** That is `tfs-decision-option-review` (a criteria-weighted option matrix). This skill triages *before* any comparison how much analysis the decision warrants; it never scores or recommends an option.
- **As a license for speed alone.** If the irreversible-but-inconvenient consequences (trust, legal, path-dependence) get waved away, the classification is motivated, not honest.
- **As theater to bless a fast decision** by labeling a one-way door a two-way door. The verdict has to be defensible.
- **For a routine, obviously reversible call with no meaningful reversibility question.** Just decide; classifying it is its own small over-process.

## Instructions

When asked to triage a decision by reversibility, follow these steps:

1. **State the decision in one line.** Name the specific choice being made. If it is already known to be high-stakes and under analysis, or if the request is to compare options, say so and point to the right tool (premortem or `tfs-decision-option-review`) instead of classifying.
2. **Test reversibility against named dimensions.** For each, state what it would cost to walk the decision back: money, time, trust/reputation, legal/contractual, and foreclosed future options (path-dependence). Do not accept the convenient label; a decision that feels reversible can carry one-way consequences.
3. **Render the verdict.** One-way door or two-way door. For borderline cases, state which way it *leans* and the single dimension that decides it. The verdict follows from step 2, not from how fast someone wants to move.
4. **Match the deliberation level.** Two-way door: who can decide it now, with what light analysis, and why slowing it is the real cost. One-way door: the rigor and sign-off it warrants, and a pointer to the heavier tool it should go to next (option comparison, premortem).
5. **Emit the classification artifact and a one-line summary.** Produce the artifact in `references/TEMPLATE.md`. It routes the decision; it does not make it.

## Output Format

Use the template in `references/TEMPLATE.md`. The deliverable is the filled classification (verdict, reversibility dimensions, matched deliberation level) plus a one-line summary, not a prose essay and not a recommendation about which option to choose.

## Quality Checklist

Before finalizing, verify:

- [ ] Reversibility was tested against multiple named dimensions (cost, time, trust, legal, path-dependence), not asserted from the convenient label.
- [ ] The verdict follows from those dimensions, and borderline cases say which way they lean and why.
- [ ] The matched deliberation level is concrete: who decides, how much analysis, what sign-off.
- [ ] A one-way door points to the heavier tool it should now go to (option comparison, premortem); the triage does not pretend to be the analysis.
- [ ] The output recommends a *level of process*, never which option to pick.
- [ ] No overclaiming: the skill claims better-calibrated effort, not a better outcome (see `evidence/dossier.md`).

## Evidence

Tier **P** (practitioner). The framing comes from Bezos / Amazon shareholder letters and broad management practice; it is internally coherent and targets a real pathology (uniform heavyweight process applied to reversible decisions). There is **no controlled evidence** that the two-bucket classification improves decision outcomes, speed, or quality versus any other rule, and reversibility is often misjudged. The evidence is transferred from human practice, not AI-validated; the AI value is making the triage cheap, forcing the reversibility question explicit, and producing a durable classification. Full grading, sources, and caveats: `evidence/dossier.md`.

## Examples

See `references/EXAMPLE.md` for a completed classification on a real decision.
