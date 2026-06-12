# Phase-2 fold-enrichment adjudication (v0.7.0)

Adjudicates the seven fold-enrichment leads proposed in
[docs/internal/research/2026-06-11-wave3-external-research.md](../../research/2026-06-11-wave3-external-research.md),
section "Fold-enrichment leads". These leads attach S-tier-claimed citations to
EXISTING registry entries (mostly shipped skills) rather than creating new rows.

Adjudication rule applied per lead:

1. Verify the primary source exists and measures what is claimed (author, year, venue, finding) by web search.
2. Read the target's registry entry in `frameworks/registry.mjs` and, where a shipped skill exists, its evidence dossier at `skills/think-<slug>/evidence/dossier.md`.
3. Decide apply (the citation honestly belongs on the target) or skip (it does not).
4. For each applied lead, write the exact proposed `sources`-array additions ({title, url, kind}) plus a one-sentence reasoning addendum.

Tier-change discipline: a tier change is warranted ONLY by direct evidence on the target's OWN move. Default is NO tier change. None of the seven leads clears that bar (the strongest, consider-the-opposite, measures an adjacent operation, not the target's exact artifact). One is flagged below as a candidate the research engine could revisit, NOT a hand-applied bump.

Note on the shipped targets' current `sources` arrays: four of the five shipped targets (red-team-light, premortem, what-would-have-to-be-true, decision-option-review) predate the sources-bearing registry convention and carry NO `sources` array in the registry today (their citations live only in the evidence dossier). scenario-planning already carries a five-entry `sources` array. So "apply" for the first four means SEEDING a `sources` array on the registry entry; for scenario-planning it means appending one entry. Each applied lead also adds a one-sentence reasoning addendum and a corresponding dossier note. The dossier is the single source of truth for each shipped skill, so the dossier addendum is the load-bearing change; the registry `sources` seed is the bibliography mirror.

Summary: 6 apply, 1 skip. No tier changes. One flagged for engine revisit (red-team-light, on the consider-the-opposite + multiple-explanation evidence).

---

## APPLY (6)

### 1. Consider-the-Opposite + Multiple-Explanation into `red-team-light`

Sources verified:

- Lord, Lepper and Preston (1984), "Considering the Opposite: A Corrective Strategy for Social Judgment," Journal of Personality and Social Psychology 47(6):1231-1243. VERIFIED. Two experiments; inducing a consider-the-opposite strategy had a GREATER corrective effect on biased assimilation and biased hypothesis testing than demand-laden "be fair and unbiased" instructions. Strong, well-cited debiasing evidence.
- Mussweiler, Strack and Pfeiffer (2000), "Overcoming the Inevitable Anchoring Effect: Considering the Opposite Compensates for Selective Accessibility," Personality and Social Psychology Bulletin 26(9):1142-1150. VERIFIED. Generating reasons an anchor is inappropriate (consider-the-opposite) reduces the anchoring effect.
- Hirt and Markman (1995), "Multiple Explanation: A Consider-an-Alternative Strategy for Debiasing Judgments," Journal of Personality and Social Psychology 69(6):1069-1086. VERIFIED. Explaining any plausible alternative outcome (not only the opposite) debiases likelihood judgments; debiasing occurred in all multiple-explanation conditions.

Decision: APPLY. red-team-light's mechanism is "deliberately suspend the cooperative stance and construct the strongest case AGAINST the thesis." Consider-the-opposite (deliberately generate the case for the contrary possibility to correct a one-sided default) and consider-an-alternative (generate a plausible alternative to one's first read) are the same family of move: forcing the mind off its first, agreeable framing by generating the contrary case. This is genuinely strong (S-leaning) controlled human evidence for the CLASS of intervention red-team-light embodies, and it is materially stronger than the lone Nemeth caveat the dossier currently leans on. The registry already half-acknowledges this: the `inversion` fold reasoning names "consider-the-opposite (the one flavor with M-tier evidence: Lord et al. 1984, Mussweiler et al. 2000)" and routes it to red-team-light - this lead simply makes that routing explicit on the target.

Honest caveat carried into the addendum: these studies measure a debiasing operation on one's OWN judgment (correcting biased assimilation, anchoring, likelihood estimation), not red-team-light's exact artifact (the ranked strongest-objections critique of a proposal, including a real-vs-constructed-dissent note). The overlap is at the mechanism level, not the artifact level, so the citations strengthen the evidence base WITHOUT licensing a hand-applied tier bump (see Tier section).

Proposed `sources` additions to the registry entry (seed a new `sources` array - the entry has none today):

```js
sources: [
  { title: "Charles G. Lord, Mark R. Lepper and Elizabeth Preston (1984) - Considering the Opposite: A Corrective Strategy for Social Judgment, Journal of Personality and Social Psychology 47(6): 1231-1243", url: "https://doi.org/10.1037/0022-3514.47.6.1231", kind: "experimental-study" },
  { title: "Thomas Mussweiler, Fritz Strack and Tim Pfeiffer (2000) - Overcoming the Inevitable Anchoring Effect: Considering the Opposite Compensates for Selective Accessibility, Personality and Social Psychology Bulletin 26(9): 1142-1150", url: "https://doi.org/10.1177/01461672002611010", kind: "experimental-study" },
  { title: "Edward R. Hirt and Keith D. Markman (1995) - Multiple Explanation: A Consider-an-Alternative Strategy for Debiasing Judgments, Journal of Personality and Social Psychology 69(6): 1069-1086", url: "https://doi.org/10.1037/0022-3514.69.6.1069", kind: "experimental-study" },
  { title: "Charlan J. Nemeth, Keith Brown and John Rogers (2001) - Devil's advocate versus authentic dissent: Stimulating quantity and quality, European Journal of Social Psychology 31(6): 707-720", url: "https://doi.org/10.1002/ejsp.58", kind: "experimental-study" },
]
```

(The Nemeth row is the dossier's existing honesty-flag citation, surfaced into the registry `sources` for completeness alongside the new debiasing evidence.)

Reasoning addendum (one sentence, for the registry `reasoning` field and the dossier section 7): "Consider-the-opposite (Lord, Lepper and Preston 1984; Mussweiler, Strack and Pfeiffer 2000) and consider-an-alternative / multiple-explanation (Hirt and Markman 1995) supply strong controlled debiasing evidence for red-team-light's core move - forcing the mind off its first agreeable framing to generate the contrary case - while the Nemeth (2001) authentic-vs-role-played-dissent finding remains the load-bearing honesty flag, so the evidence base strengthens at the mechanism level without a tier change at the artifact level."

### 2. Pre-Parade / catastrophic-success into `premortem`

Source status: the lead proposes an OPTIONAL success-anchor parameter, not a new citation. "Pre-parade" / "catastrophic success" is the inverse-anchor variant of the same prospective-hindsight mechanism premortem already implements (assert a definite outcome, reason backward to causes), with the anchor flipped from failure to runaway success (the plan succeeded beyond capacity - now explain the strains that broke it). No standalone controlled outcome study exists for the success-anchor variant; its evidential warrant is exactly premortem's own prospective-hindsight evidence (Mitchell, Russo and Pennington 1989; Veinott, Klein and Wiggins 2010), which the dossier already carries.

Decision: APPLY as a dossier/skill enrichment (an optional parameter), NOT as a new citation row and NOT as a tier change. premortem is S-tier shipped; the success-anchor is a documented optional mode that reuses the same mechanism and the same evidence. No new `sources` row is warranted (no new primary source); the enrichment is a one-line mechanism note.

Proposed `sources` additions: NONE (no new primary source; the variant rides premortem's existing prospective-hindsight evidence).

Reasoning addendum (for the dossier section 1 / "When it works", optional-parameter note): "An optional success-anchor variant (pre-parade / catastrophic success) runs the same prospective-hindsight move with the anchor flipped from failure to runaway success - assert the plan succeeded beyond capacity and reason back to the strains that broke it - surfacing scaling and second-order risks a failure-only premortem can miss; it inherits premortem's evidence (Mitchell, Russo and Pennington 1989; Veinott, Klein and Wiggins 2010) and carries no independent outcome study, so it is a mode, not a tier change."

### 3. SAST importance x certainty 2x2 into `what-would-have-to-be-true`

Source verified:

- Mason and Mitroff (1981), "Challenging Strategic Planning Assumptions: Theory, Cases, and Techniques," Wiley. VERIFIED (book; method first detailed in Mitroff and Emshoff 1979, Academy of Management Review). The importance x certainty 2x2 is a confirmed, specific SAST artifact: each surfaced assumption is rated for importance (to success/failure) and certainty, plotted on a four-quadrant graph, and the assumptions that are BOTH important AND uncertain are the ones to retain and test.

Decision: APPLY. what-would-have-to-be-true's output is an "assumption ledger" that ends by "naming the one or two killer conditions that are both most load-bearing and least certain, which should be tested before committing." That is precisely the SAST important-and-uncertain quadrant, prose-form. The SAST 2x2 is the canonical prior-art structure for exactly WWHTBT's prioritization step (load-bearing x uncertain), so it belongs as a lineage/structure citation. The skill's tier (P, practitioner) is unchanged: SAST is itself a practitioner method with no controlled outcome study, so it reinforces the P grade rather than lifting it.

Proposed `sources` additions to the registry entry (seed a new `sources` array - the entry has none today):

```js
sources: [
  { title: "A. G. Lafley and Roger L. Martin (2013) - Playing to Win: How Strategy Really Works, Harvard Business Review Press", url: "https://www.hbs.edu/faculty/Pages/item.aspx?num=44831", kind: "foundational" },
  { title: "Richard O. Mason and Ian I. Mitroff (1981) - Challenging Strategic Planning Assumptions: Theory, Cases, and Techniques, Wiley", url: "https://www.google.com/books/edition/Challenging_Strategic_Planning_Assumptio/EmaQAAAAIAAJ", kind: "foundational" },
]
```

(The Lafley and Martin row is the skill's existing primary attribution, surfaced into the registry `sources`; the Mason and Mitroff row is the new lead.)

Reasoning addendum (one sentence): "The prioritization step - rank conditions by load-bearing x uncertain and test the killer few - is the prose form of the SAST importance x certainty 2x2 (Mason and Mitroff 1981; plot each surfaced assumption by importance and certainty, retain the important-and-uncertain quadrant), which is the canonical prior-art structure for this move and, being itself a practitioner method with no controlled outcome study, reinforces the P grade rather than lifting it."

### 4. QOC criteria-link rationale into `decision-option-review`

Source verified:

- MacLean, Young, Bellotti and Moran (1991), "Questions, Options, and Criteria: Elements of Design Space Analysis," Human-Computer Interaction 6(3-4):201-250. VERIFIED. QOC is a design-rationale notation: Questions identify the issue, Options are candidate answers, and Criteria assess and compare the Options, with explicit links recording WHY each option does or does not satisfy each criterion.

Decision: APPLY. decision-option-review's move is "list options, define and weight the criteria that matter, score each option against each criterion, surface the tradeoffs." QOC is the canonical design-rationale formalization of exactly that options x criteria structure, and its distinctive contribution - capturing the RATIONALE on each option-criterion link rather than only a number - directly supports the dossier's load-bearing caveat against false precision (show WHY a cell scores as it does, not just a total). It belongs as a lineage citation alongside the existing UK MCDA guidance. Tier unchanged (P): QOC is a notation/method with no controlled decision-outcome study; it strengthens the lineage and the false-precision caveat, not the grade.

Proposed `sources` additions to the registry entry (seed a new `sources` array - the entry has none today):

```js
sources: [
  { title: "Allan MacLean, Richard M. Young, Victoria M. E. Bellotti and Thomas P. Moran (1991) - Questions, Options, and Criteria: Elements of Design Space Analysis, Human-Computer Interaction 6(3-4): 201-250", url: "https://doi.org/10.1080/07370024.1991.9667168", kind: "foundational" },
]
```

Reasoning addendum (one sentence): "The options x criteria structure is the design-rationale move formalized as QOC (MacLean, Young, Bellotti and Moran 1991), whose distinctive contribution - recording the rationale on each option-criterion link rather than only a score - directly reinforces this skill's false-precision caveat (show why a cell scores as it does, not just a total), as a lineage citation that does not change the P grade."

### 5. Cone of Plausibility into `scenario-planning`

Source verified:

- C. W. (Charles) Taylor (1990), "Alternative World Scenarios for Strategic Planning," US Army War College / Strategic Studies Institute. VERIFIED. The cone of plausibility defines a range of plausible futures fanning out over an explicit timeframe (the further out, the wider the cone), built by extrapolating driving-force trends; widely used in futures/scenario work. It is a structuring device, not a tested intervention - no controlled outcome study.

Decision: APPLY as an appended `sources` row (scenario-planning already has a five-entry `sources` array). The cone of plausibility is a recognized, citeable lineage device for the scenario-construction step: it formalizes the "fan of divergent futures widening with horizon" intuition that the 2x2 critical-uncertainties method operationalizes. It belongs as supplementary lineage. Tier unchanged (P, already conservatively governed): the cone is a structuring device with no outcome evidence, so it cannot lift the grade and the dossier's "this is not forecasting / evidence is thin and contested" wall stands.

Proposed `sources` addition (append to the existing array):

```js
{ title: "Charles W. Taylor (1990) - Alternative World Scenarios for Strategic Planning, US Army War College / Strategic Studies Institute (the 'cone of plausibility')", url: "https://apps.dtic.mil/sti/citations/ADA224093", kind: "practitioner-reference" },
```

Reasoning addendum (one sentence): "The cone of plausibility (Taylor 1990) is supplementary lineage for the scenario-construction step - it formalizes the fan of divergent plausible futures widening with the planning horizon that the 2x2 critical-uncertainties method operationalizes - and, being a structuring device with no controlled outcome study, it adds lineage without disturbing the conservatively governed P grade or the not-forecasting wall."

### 6. Principlism (Beauchamp and Childress) into `ethical-matrix`

Candidate survival check: `frameworks/_proposed/ethical-matrix/entry.json` confirms ethical-matrix SURVIVED vetting (status cand, verdict build, tier P, evalDate 2026-06-11). The lead's precondition is met.

Source verified:

- Beauchamp and Childress, "Principles of Biomedical Ethics" (1st ed. 1979, Oxford University Press; now in its 8th edition). VERIFIED. The four principles - respect for autonomy, nonmaleficence, beneficence, and justice - are the dominant principlist framework in biomedical ethics. The ethical-matrix candidate's own `reasoning` field already states the principle columns (wellbeing, autonomy, fairness) are "adapted from Beauchamp and Childress - principlism is this method's column set, not a separate candidate," and the `attribution` field already credits them.

Decision: APPLY. The candidate already names Beauchamp and Childress as the column-set source in prose but its `sources` array has NO standalone Beauchamp and Childress entry. Adding the primary reference closes that gap so the dossier (when the skill is built) cites the column set's origin directly. This is a candidate enrichment, not a shipped-skill change, and not a tier change - it confirms the existing P grade by sourcing the column set that is already attributed.

Proposed `sources` addition to `frameworks/_proposed/ethical-matrix/entry.json` (append to the existing seven-entry array):

```js
{ title: "Tom L. Beauchamp and James F. Childress (1979) - Principles of Biomedical Ethics, Oxford University Press (the four principles: respect for autonomy, nonmaleficence, beneficence, justice - the matrix's principle-column set)", url: "https://global.oup.com/academic/product/principles-of-biomedical-ethics-9780197832639", kind: "foundational" },
```

Reasoning addendum (one sentence): "Beauchamp and Childress (1979), Principles of Biomedical Ethics - the four principles (autonomy, nonmaleficence, beneficence, justice) - is the documented origin of the matrix's principle-column set already named in the candidate's attribution, so seeding it as a standalone source closes the bibliography gap and confirms (does not change) the P grade."

---

## SKIP (1)

### 7. Structured Self-Critique into `red-team-light`

The research doc lists "Structured Self-Critique into red-team-light" in the same line as the citation-bearing leads, but it proposes NO primary source and NO S-tier (or any) citation for it. It is a mechanism-mapping note ("this method's move is already red-team-light's move"), not a citation-enrichment lead. There is nothing to verify and nothing to add to the `sources` array.

Decision: SKIP as an enrichment. "Structured self-critique" is a generic descriptor for the family of self-adversarial review red-team-light already implements; absorbing it is a fold/dedup observation for the candidate-queue ledger, not a citation that strengthens red-team-light's evidence. If a specific named method and primary source surface later (the doc cites none), re-evaluate then. No registry change.

---

## Tier-change assessment

Default holds: NO tier changes from any of the seven leads.

The only lead with a colorable tier argument is consider-the-opposite + multiple-explanation into red-team-light (the research doc itself says it "may legitimately raise red-team-light's grade"). Adjudicated answer: do NOT hand-apply a bump now, and FLAG it for the research engine.

Why no hand bump: a tier change requires direct evidence on the target's OWN move. Lord et al. (1984), Mussweiler et al. (2000), and Hirt and Markman (1995) are strong controlled studies of a DEBIASING operation on one's own judgment - correcting biased assimilation, anchoring, and likelihood estimation by generating the contrary or an alternative possibility. red-team-light's actual move and artifact are adjacent but not identical: construct and RANK the strongest objections an intelligent adversary would raise against a specific proposal, including a real-vs-constructed-dissent note. The evidence overlaps at the mechanism level (force the mind off its first agreeable framing) but does not measure red-team-light's exact artifact, and the registry's own `inversion` fold already classes consider-the-opposite as measuring "a different operation" that is "explicitly not counted toward the grade." Hand-applying a bump would launder adjacent-claim evidence, the exact pattern this library polices (see the ACH and reflective-equilibrium adjudications in the wave-3 doc). The honest move is to strengthen the `sources` and `reasoning` (done above) and let `think-research-framework` re-grade red-team-light against this evidence if and when it is re-vetted - a tier change comes via the engine, never by hand.

Flag recorded: red-team-light is a genuine engine re-grade candidate (P -> possibly M) once the consider-the-opposite / consider-an-alternative evidence is weighed against its actual artifact; queue it for a NAME-mode re-vet, do not bump by hand.

---

## Apply/skip ledger

| # | Lead | Target | Decision | New source rows | Tier change |
|---|---|---|---|---|---|
| 1 | Consider-the-Opposite + Multiple-Explanation | red-team-light | APPLY | Lord 1984; Mussweiler 2000; Hirt and Markman 1995 (+ Nemeth 2001 surfaced) | No (flag for engine re-grade) |
| 2 | Pre-Parade / catastrophic success | premortem | APPLY (mode note, no source) | none | No |
| 3 | SAST importance x certainty 2x2 | what-would-have-to-be-true | APPLY | Mason and Mitroff 1981 (+ Lafley and Martin surfaced) | No |
| 4 | QOC criteria-link rationale | decision-option-review | APPLY | MacLean, Young, Bellotti and Moran 1991 | No |
| 5 | Cone of Plausibility | scenario-planning | APPLY | Taylor 1990 | No |
| 6 | Principlism (Beauchamp and Childress) | ethical-matrix (cand) | APPLY | Beauchamp and Childress 1979 | No |
| 7 | Structured Self-Critique | red-team-light | SKIP | none (no source proposed) | No |
