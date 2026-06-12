# Evidence Dossier: Consider the Unknowns

> The single source of truth for the `consider-the-unknowns` skill. The `SKILL.md`, the sidecar
> (`skill.meta.yml`), and the eval cases all derive from this file. If a claim is not here, it does
> not belong in the skill. Promoted from `frameworks/_proposed/consider-the-unknowns/dossier.md` and
> admitted as a Build at tier M.

| | |
|---|---|
| **Skill** | `thinking-framework-skills.consider-the-unknowns` (installable name `think-consider-the-unknowns`) |
| **Family** | assumption-and-belief-challenge |
| **Evidence tier** | **M** governing (moderate; see "What the evidence shows" for what holds it at M and not S, and what keeps it from dropping to P) |
| **Confidence** | Moderate that listing the relevant unknowns before stating confidence reduces overconfidence selectively (where the judge is overconfident); low that any specific human-subject effect transfers unchanged to AI agents |
| **Status** | cand (admitted from the v0.7.0 phase-2 reconciliation; the flagged single-source publication record verified real and citable, so the M tier holds) |

---

## 1. The mechanism (what actually does the work)

Before committing to a judgment, explicitly enumerate the relevant evidence you do NOT have - the variables that bear on the question but are unknown, unobserved, or unobtainable - then weigh the gap that absence leaves and re-rate your confidence against it. The mechanism rests on a robust finding: confidence tracks the strength and coherence of the evidence actually considered, and people systematically neglect what is missing (the consumer-psychology literature names the bias omission neglect). A judgment built on three observations feels as solid as one built on thirty if the three cohere. The corrective move is to make the absence itself an object of attention: list the relevant unknowns, classify each as resolvable (obtainable, and at what cost) or genuinely unobservable, rate each unknown's bearing on the judgment, and then re-state confidence against the mapped gap.

The durable cognitive move is not the worksheet. It is **turning attention onto the absent evidence** - the variables outside the material in front of you that would change the call if you had them - and letting the size and obtainability of that gap discipline the confidence you report. Two things distinguish it from every other belief-challenge move: the object is material that is ABSENT (not claims made, assumptions held, counterarguments available, or failures imaginable), and the output is a re-rated confidence justified by a mapped gap rather than a stronger argument or a defended conclusion.

The output is a **known-unknowns ledger**: the judgment under consideration; the relevant unknown variables, each with its bearing on the judgment and its obtainability; a flag on the unknowns worth resolving before committing; and a re-rated confidence with the delta and the reason its size is what it is.

## 2. Lineage

The phrase "known unknowns" is generic, popularized by Donald Rumsfeld's February 2002 Department of Defense briefing, with earlier engineering and project-risk usage; the method name used here is the descriptive prompt drawn from the research line itself, not a brand. The measured, debiasing content of the term comes from three threads:

- The core: Daniel J. Walters (INSEAD), Philip M. Fernbach, Craig R. Fox and Steven A. Sloman, "Known Unknowns: A Critical Determinant of Confidence and Calibration," Management Science (2017). The INSEAD Knowledge piece "How Managers Can Curb Overconfidence" is the practitioner gloss. Walters and Fernbach (2021), "Investor Memory of Past Performance Is Positively Biased and Predicts Overconfidence," PNAS, continues the overconfidence line in the field.
- The independent mechanism line: David M. Sanbonmatsu, Frank R. Kardes and colleagues on omission neglect, from the early 1990s through Kardes et al. (2006), "Debiasing Omission Neglect," Journal of Business Research.
- The antecedent: Koriat, Lichtenstein and Fischhoff (1980), "Reasons for Confidence," the original demonstration that what you list before judging changes calibration.
- The neighboring tradition this is NOT: consider-the-opposite (Lord, Lepper and Preston 1984) and multiple-explanation (Hirt and Markman 1995), the consider-an-alternative family that the Walters studies used as the comparison arm; in this library that move lives in red-team-light.

Attribution: Daniel J. Walters, Philip M. Fernbach, Craig R. Fox and Steven A. Sloman (2017, Management Science); the mechanism line via the Sanbonmatsu-Kardes omission-neglect program. Not branded; no trademark.

## 3. What the evidence shows, and what it does NOT show

The honest grade is **M (moderate)**, verified 2026-06-11. This candidate was admitted on a single external-research source with the publication record explicitly flagged for verification; that record verifies as real and citable, and on inspection it is stronger than its single-run provenance suggested.

**What the record supports.**

- Daniel J. Walters, Philip M. Fernbach, Craig R. Fox and Steven A. Sloman (2017), "Known Unknowns: A Critical Determinant of Confidence and Calibration," Management Science 63(12): 4298-4307 (published online December 2016). Three studies. Study 1 (correlational): participants who spontaneously thought about unknowns while answering two-alternative trivia questions were less overconfident. Studies 2 and 3 (experimental): prompting participants to list unknowns before stating confidence reduced overconfidence substantially, outperformed the classic consider-the-alternative debiasing technique in a head-to-head comparison, and selectively reduced confidence in domains where participants were overconfident while leaving well-calibrated and underconfident domains unaffected. Grade: M. Controlled, top-journal, and measured on the actual move this skill proposes, including the comparison arm that establishes its distinctness from counterargument generation.
- Frank R. Kardes, Steven S. Posavac, David H. Silvera, Maria L. Cronley, David M. Sanbonmatsu, Paul Herr and Murali Chandrashekaran (2006), "Debiasing Omission Neglect," Journal of Business Research 59: experiments showing judges form overly extreme, confident evaluations from limited evidence and that sensitivity to missing information can be increased (considering judgment criteria before receiving information; rating presented and missing attributes before evaluating). Grade: M for the mechanism. This is an independent second research program (the Sanbonmatsu and Kardes omission-neglect line, running from the early 1990s) confirming that neglect of missing information inflates judgment extremity and confidence, and that surfacing the missing information moderates it.
- Asher Koriat, Sarah Lichtenstein and Baruch Fischhoff (1980), "Reasons for Confidence," Journal of Experimental Psychology: Human Learning and Memory 6(2): 107-118. Listing reasons contradicting one's chosen answer improved calibration; listing supporting reasons did not. Adjacent rather than direct: it operates on known counter-reasons, not on unknowns, so it frames the tradition but is NOT counted toward this grade.

**What the record does NOT support.**

- No named independent direct replication of the exact consider-the-unknowns prompt was found, so the intervention's controlled record remains a single research line (one author team, one paper, multiple experiments). The "more effective than consider-the-alternative" claim comes from that same paper, not from a meta-analysis.
- The samples are the usual student and online-panel populations on trivia and general-knowledge domains, not field decisions.
- It is NOT interval-width medicine. The nearest controlled test of post-estimate reasoning prompts in interval elicitation found them largely ineffective; mechanical widening plus re-elicitation and calibration training did better - Silvia Ferretti, Gilberto Montibeller and Detlof von Winterfeldt (2023), "Testing the Effectiveness of Debiasing Techniques to Reduce Overprecision in the Elicitation of Subjective Continuous Probability Distributions," European Journal of Operational Research 304(2): 661-675. Consider-the-unknowns was not itself tested there, but this caps the claim: the M grade applies to item- and domain-level confidence judgments, not to the width of a numeric interval. Do not sell this move as interval-width repair.

These caps are exactly what hold the grade at M rather than S; the existence of the independent omission-neglect mechanism line is what keeps it from dropping to P.

Excluded-claims check: no numeric effect size is restated in this dossier, because the published abstract reports direction and substantiality without a portable single number and no independent quantification was found; every named finding above maps to an author-and-year source.

## 4. Transferred-evidence flag (required honesty for this library)

Every study above is on human subjects - students and online panels answering trivia and general-knowledge questions - in lab settings. None studies a known-unknowns ledger produced by or with an AI agent, nor whether an agent-produced ledger improves a human's calibration. The evidence is **transferred from human contexts and not validated for AI-augmented use**. The AI value is mechanical and modest: an agent makes the move cheap to run, forces the discipline (a real enumeration of relevant absent variables, an obtainability classification, an honest re-rate rather than a reflexive confidence), and produces a durable, inspectable artifact - benefits that do not depend on the human-subject effect transferring unchanged. The skill ships honestly as an M-tier calibration aid for thin-evidence one-off judgments, with hard walls against the cases where the evidence does not reach (a real reference class exists; interval-width repair; unknowns cheap to resolve; an already-calibrated or underconfident judge).

## 5. When it works / when it fails (drives the eval negative cases and "When NOT to Use")

**Works best when:**
- A one-off, consequential judgment is being made from thin or partial evidence where no usable base-rate class exists: a competitive read, a market-entry call, a diagnosis from incomplete data, a hiring or vendor judgment where the file is mostly silence.
- The judge is plausibly overconfident, and it is worth knowing how much of the confidence rests on evidence actually held versus on not having looked at what is missing. The controlled evidence shows the effect is usefully selective - it reduced confidence where people were overconfident and left well-calibrated domains alone, closer to targeted medicine than to a blanket confidence tax.

**Fails or misleads when (poor-fit / anti-patterns):**
- **A genuine reference class exists.** Base rates beat introspective gap-mapping; route to reference-class-forecasting.
- **The task is a numeric interval that is too narrow.** Post-estimate reasoning prompts are largely ineffective for interval overprecision (Ferretti, Montibeller and von Winterfeldt 2023); mechanical widening, re-elicitation, and calibration training do better. Do not sell this as interval-width repair.
- **The unknowns are cheap to resolve.** Go get the information. Cataloging resolvable unknowns instead of resolving them is procrastination with a worksheet.
- **The judge is already well calibrated or underconfident.** The evidence shows little effect there, and on an anxious, underconfident call the ledger only feeds doubt.
- **The decision is low-stakes and reversible.** An unknowns audit on a two-way door is process for its own sake; triage one-way-vs-two-way-door first, and time-box the ledger when you do run it - the space of things you do not know is unbounded, so the ledger covers RELEVANT unknowns, not all unknowns.
- **The real task is something a sibling skill owns.** Testing a specific named assumption is what-would-have-to-be-true; imagining how a plan fails is premortem; generating the strongest known case against a favored view is red-team-light.

## 6. Why it is a skill here (distinctness)

The distinct durable move: enumerate the absent. Every shipped neighbor in this family operates on PRESENT material, which is the wall in each case:

- **evidence-vs-inference-sort** (medium overlap, the closest shipped skill): classifies the claims you HAVE into evidence, inference, and assumption, and flags uncited claims inside the material under audit. It never generates the list of relevant variables OUTSIDE the material. The shared mechanism is only the re-rate-confidence ending, well under the overlap ceiling.
- **what-would-have-to-be-true** (medium): backward-chains from a favored option to the conditions required for it to be best, then tests the named conditions. Direction-committed and proposition-based; consider-the-unknowns is direction-agnostic and absence-based, run before a favored conclusion hardens.
- **red-team-light** (low-medium): generates the strongest KNOWN case against the focal view. The distinctness experiment exists in print - Walters and colleagues ran consider-the-alternative as their comparison arm and found the unknowns prompt both different in mechanism and stronger in effect. Counterargument generation and absence inventory are different operations.
- **premortem** (low): imagines concrete failure events; an unknown is an unobserved variable, not an imagined outcome.
- **ladder-of-inference-check, decision-journal, reference-class-forecasting, fermi-estimation, linear-model-aggregation** (low): audit the climb on data you used, record the prediction for later review, substitute the outside view, decompose a number, or mechanize a repeated judgment. None enumerates absence.

No sequence of shipped skills produces the artifact: chaining evidence-vs-inference-sort into what-would-have-to-be-true still only processes stated claims and a favored option's conditions; the unknowns ledger requires the enumerate-the-absent move itself.

Hard walls against the estimation/calibration cluster siblings vetted alongside it:

- **dialectical-bootstrapping**: a numeric device - estimate, assume the estimate is wrong, re-estimate, average the two numbers. It produces a better point estimate; consider-the-unknowns produces no number and no average. Disjoint artifacts; both can run on the same judgment without redundancy.
- **interval-calibration-check**: trains the confidence scale itself across many items via equivalent bets and scored feedback. Consider-the-unknowns is a per-judgment, qualitative audit with no betting device and no feedback cadence; and the Ferretti boundary result keeps their lanes separate in the literature itself.
- **estimate-talk-estimate**: a multi-judge social protocol behind the facilitation wall. Consider-the-unknowns is single-judge and fully agent-executable; it does not touch that wall.

## 7. Sources

1. Daniel J. Walters, Philip M. Fernbach, Craig R. Fox and Steven A. Sloman, "Known Unknowns: A Critical Determinant of Confidence and Calibration," Management Science 63(12): 4298-4307 (2017, online December 2016). https://doi.org/10.1287/mnsc.2016.2580 . Three studies; studies 2-3 are controlled tests of the exact prompt, showing listing unknowns before stating confidence substantially reduced overconfidence, beat the consider-the-alternative arm head-to-head, and acted selectively where judges were overconfident. The single most direct controlled support. Experimental study. (M; student and online-panel subjects, single research line.)
2. Frank R. Kardes, Steven S. Posavac, David H. Silvera, Maria L. Cronley, David M. Sanbonmatsu, Paul Herr and Murali Chandrashekaran, "Debiasing Omission Neglect," Journal of Business Research 59 (2006). https://www.sciencedirect.com/science/article/abs/pii/S0148296306000324 . Independent omission-neglect program showing limited evidence inflates judgment extremity and confidence and that surfacing missing information moderates it. The second, independent mechanism line. Experimental study. (M for the mechanism.)
3. Asher Koriat, Sarah Lichtenstein and Baruch Fischhoff, "Reasons for Confidence," Journal of Experimental Psychology: Human Learning and Memory 6(2): 107-118 (1980). https://iipdm.haifa.ac.il/images/publications/Asher_Koriat/1980-Koriat-Lichtenstein-Fischhoff-JEPHLM.pdf . The antecedent: listing contradicting reasons improved calibration, listing supporting reasons did not. Adjacent (operates on known counter-reasons, not unknowns); frames the tradition, NOT counted toward the grade. Experimental study.
4. Silvia Ferretti, Gilberto Montibeller and Detlof von Winterfeldt, "Testing the Effectiveness of Debiasing Techniques to Reduce Overprecision in the Elicitation of Subjective Continuous Probability Distributions," European Journal of Operational Research 304(2): 661-675 (2023). https://www.sciencedirect.com/science/article/pii/S0377221722003046 . Boundary evidence: in interval elicitation, post-estimate reasoning-style debiasers were not very effective; mechanical range-stretching worked better. Caps the claim to item/domain confidence, not interval width. Experimental study.
5. INSEAD Knowledge, "How Managers Can Curb Overconfidence" (practitioner gloss on the known-unknowns line). https://knowledge.insead.edu/marketing/how-managers-can-curb-overconfidence . Practitioner-popular.

> Excluded on the evidence rule: no numeric effect size or single quantified result is asserted as fact in this dossier, because the published record reports direction and substantiality without a portable single figure and no independent quantification was found. Every named finding maps to an author-and-year source. The "more effective than consider-the-alternative" claim is reported as coming from the same single paper, not from a meta-analysis, and the move is explicitly NOT claimed for interval-width repair.
