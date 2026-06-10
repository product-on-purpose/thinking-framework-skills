# Evidence Dossier: Pairwise Comparison

> The single source of truth for the `pairwise-comparison` skill. The `SKILL.md`, the sidecar
> (`skill.meta.yml`), and the eval cases all derive from this file. If a claim is not here, it does
> not belong in the skill. Promoted from `frameworks/_proposed/pairwise-comparison/dossier.md` and
> admitted as a Build at tier P.

| | |
|---|---|
| **Skill** | `thinking-framework-skills.pairwise-comparison` (installable name `think-pairwise-comparison`) |
| **Family** | decision-and-option-evaluation |
| **Evidence tier** | **P** governing (a recognised practitioner technique with a real psychometric core for *scaling*, but no clean controlled evidence that an agent who runs it *decides better*, and its strongest evidence belongs to assessment reliability and is partly deflated by its own field - see "What the evidence shows") |
| **Confidence** | Moderate that forced binary comparison yields a more stable signal than holistic scoring and surfaces intransitivity; low that any decision-quality effect transfers to an agent |
| **Status** | draft (admitted as a guarded Build at tier P; scoped to the rank-without-a-scale reading only) |

---

## 1. The mechanism (what actually does the work)

Pairwise comparison replaces one hard holistic ranking with a series of isolated two-item judgments. Instead of "rank these six options from best to worst" or "score each option from 1 to 10," it asks, for every pair, the single easier question "which of these two is better?" - then tallies each item's wins into a comparison matrix and reads a ranking (or a set of relative weights) off the matrix.

The durable claim is psychophysical: humans hold a far more stable signal for "A beats B" than for "A is a 7," because the binary judgment needs no fixed internal scale and no memory of how earlier items were scored. The matrix also exposes its own quality - a cycle (A beats B, B beats C, C beats A) is a visible inconsistency to revisit rather than a hidden error.

The honest description has to separate two operations that share the binary-judgment core but land on different artifacts and different verdicts:

1. **Rank-the-options-with-no-usable-scale** (the Thurstone / comparative-judgement sense): there are items to order - candidate essays, design submissions, shortlisted bids, options whose merit resists any agreed rubric - and no defensible way to score them absolutely. Judge pairs and derive the order. The product is a ranking (and a derived interval scale) built without criteria.
2. **Weight-the-criteria-by-pairwise-voting** (the AHP / PAPRIKA sense): a criteria-and-options decision already exists, and pairwise comparison is used only to set the relative importance of the criteria (and sometimes of options within a criterion), feeding a weighted scoring model. The product is a vector of criterion weights for a decision matrix.

That split is the central fact for this library: reading (2) is a sub-procedure of a method the catalog already ships, while reading (1) is the one separable move. **This skill ships only reading (1).** It emits a binary-vote comparison matrix, a derived ranking, and a consistency check, with no criteria axis and no absolute scoring.

## 2. Lineage

The psychometric foundation is **Louis Leon Thurstone**, "A Law of Comparative Judgment," *Psychological Review* 34 (1927) - the result that paired comparisons yield an interval scale - extended by the **Bradley-Terry (1952)** and **Luce** choice models. The decision-analytic popularisation is **Thomas L. Saaty**'s Analytic Hierarchy Process (from the 1970s), which uses ratio-scaled pairwise comparison matrices and a consistency ratio to derive criterion weights; it is read alongside its critics on rank reversal and consistency (Triantaphyllou; Dyer's 1990 critique). For the modern decision-software lineage, **Hansen and Ombler (2008)** describe the PAPRIKA method (commercialised as 1000minds), which elicits weights through pairwise trade-off questions. For the assessment revival and its reliability debate, **Alastair Pollitt**, "Let's stop marking exams" (2004), and the counter-weight of **Tom Bramley** (Cambridge Assessment, 2015; Bramley and Vitello 2019) on reliability inflation, plus **Verhavert et al. (2022)** on the rationales. For the necessity argument and its failure to replicate, **Amos Tversky**, "Intransitivity of Preferences" (1969), against the modern transitivity literature (Regenwetter, Dana and Davis-Stober 2011).

"Pairwise comparison" and "paired comparison analysis" are generic descriptive terms in common use - no trademark or attribution required beyond crediting Thurstone and Saaty - so this entry is documented descriptively and is not flagged as branded. Specific commercial implementations (AHP toolchains, 1000minds / PAPRIKA) are their owners' products and are cited as lineage, not shipped.

## 3. What the evidence shows, and what it does NOT show

The honest governing grade is **P (practitioner)**, and this entry has to be unusually careful, because pairwise comparison is a case where genuinely strong-looking research exists but measures an *adjacent* claim - the reliability of psychometric scaling, not the quality of a decision - and is itself contested.

**What the record supports.** Pairwise comparison has a real, deep lineage and a robust psychometric core for *scaling*. Thurstone's Law of Comparative Judgment (1927) established that a series of paired comparisons can place stimuli on an interval scale, and it is mathematically related to the Bradley-Terry-Luce model. In educational assessment, Pollitt's comparative-judgement programme (from 2004) reports high scale-separation reliability (commonly above 0.80, reaching the mid-0.90s) for ranking open-ended work such as essays - higher than conventional marking in several reported studies. For weight elicitation specifically, the practitioner and decision-analysis literatures hold that pairwise judgments are cognitively easier than ranking or scoring a full list and discriminate well between many criteria. As a stance and a scaling tool, this is well attested.

**What the record does NOT support, and the laundering traps.** The strong evidence is for *reliability of scaling artifacts*, not for *better decisions by an agent that runs the method*, and the assessment evidence is contested:

- Bramley (Cambridge Assessment, simulation work 2015; Bramley and Vitello 2019) showed that the adaptivity in Adaptive Comparative Judgement *inflates* the reported reliability statistic - in one GCSE-English study a reported 0.97 deflated to 0.84, and spurious separation appeared even on random data. Verhavert and colleagues' 2022 "call for clarity" questions the rationales offered for comparative judgement outright. So even the headline reliability numbers cannot be taken at face value, and they are reliability of a *ranking of essays*, not decision quality.
- The often-quoted weight-elicitation result - that test-retest weights reproduced the same chosen alternative 88 percent of the time versus 74 percent - is **Bottomley, Doyle and Green (2000), and it compares Direct Rating against Point Allocation; it does not test pairwise comparison at all.** It is frequently mis-cited as evidence *for* pairwise weighting; counted honestly it does not bear on this move and is excluded from the grade.
- In the AHP tradition, the pairwise apparatus is empirically criticised on its own terms: the consistency ratio rejects judgments that are reasonable and non-random, and rank reversal can occur even under strictly consistent comparisons (Triantaphyllou and others). This is contra-evidence on the weighting reading, not support.
- The classic case for the *necessity* of pairwise (Tversky 1969, systematic intransitivity of preference) has substantially failed to replicate; the contemporary consensus is that true preference cycles are vanishingly rare and earlier data are compatible with noisy-but-transitive responses. The strongest argument for "you must compare pairs because holistic preference is intransitive" is therefore weaker than its reputation.

Borrowing the Thurstone / Pollitt scaling reliability, or the Bottomley DR-vs-PA result, to lift this method to M would be laundering an adjacent claim's robustness onto a move neither one tested. The conservative governing grade is therefore **P**: a recognised, well-lineaged practitioner technique with a real psychometric core for scaling, but no clean controlled evidence that an agent who runs pairwise comparison *decides better*, and with its strongest-looking evidence belonging to assessment reliability and partly deflated by its own field.

## 4. Transferred-evidence flag (required honesty for this library)

Every result above is from human subjects - psychophysics, exam marking, weight-elicitation surveys, and preference experiments. None studies a ranking produced by or with an AI agent. The nearest agent-relevant evidence is the LLM-as-judge literature, which finds pairwise evaluation approximates human preference better than pointwise scoring but suffers position bias that must be corrected by running both orders and aggregating (for example the 2024 "Judging the Judges" position-bias study). That is about an agent *evaluating outputs*, not a decider *running a decision*, and even there pairwise is not unambiguously better. The evidence is **transferred from human contexts and not validated for AI-augmented decision-making**, which independently caps the grade at P. The AI value is mechanical and modest: an agent makes the full pairwise pass cheap to run, forces the discipline (one fixed comparative question, every pair judged, a real consistency check), and produces a durable, inspectable artifact - benefits that do not depend on any contested outcome claim. The skill ships honestly as a P-tier ranking aid for the no-scale case, never as an objective scorer.

## 5. When it works / when it fails (drives the eval negative cases and "When NOT to Use")

**Works best when:**
- Absolute scoring is the bottleneck: the criteria are subjective, vague, or competing, and no one can defend a 1-to-10 scale, but any two items can be compared head-to-head.
- The items are qualitative artifacts (writing, designs, proposals) where holistic marking is noisy, and a defensible *order* is what is needed.
- The set is small enough to compare every pair by hand (roughly up to 6-8 items).
- Surfacing intransitivity is useful: a cycle is a prompt to re-examine, not a defect to hide.

**Fails or misleads when (poor-fit / anti-patterns):**
- **The criteria are nameable and a scale is defensible.** A criteria-weighted matrix is then faster and more inspectable; this is `think-decision-option-review`'s job, and pairwise voting on its criteria is just an elaborate way to fill one weight column. Reaching for standalone pairwise here buys process cost for no new artifact.
- **The task is to weight criteria for a scoring model.** That folds into `think-decision-option-review` as an optional weight-elicitation; it produces no separate artifact here.
- **A repeatable formula over named cues is wanted.** Fixing a weighted rule applied to many future cases is `think-linear-model-aggregation`; it needs the cues and scale pairwise comparison refuses.
- **A number is wanted from a base rate.** Anchoring an estimate on a reference class is `think-reference-class-forecasting`; pairwise comparison orders a fixed set, it does not estimate a quantity.
- **The item count is large.** A full set is n(n-1)/2 judgments - 45 for ten, 120 for sixteen - which collapses under its own combinatorics without adaptive or incomplete-design tooling a markdown-only agent cannot run by hand.
- **The matrix is treated as objective output.** A passing consistency check does not make a manufactured preference correct, and a near-duplicate option added to the set can flip the others' ranking (rank reversal) - a structural artifact, not a judgment error. Pairwise comparison launders subjective inputs into a clean-looking scale; the cleanliness is presentational.

## 6. Distinctness (why this is a Build, and the wall that earns it)

The verdict is **Build, narrowly, at tier P** - scoped to the reading the easy reading is *not*. The Build survives on a wall that one specific shipped skill draws for it; the more obvious reading folds.

The closest shipped skill is **`think-decision-option-review`** (the criteria-weighted option matrix, which the registry records as having absorbed Multi-Criteria Decision Analysis).

- **The criteria-weighting reading folds into `think-decision-option-review`.** "Compare two criteria at a time to set their relative importance" (AHP, PAPRIKA) is exactly that skill's step "define the criteria that actually matter, and weight them," performed with a more elaborate elicitation. It produces no new artifact: it fills the weight vector of a matrix `think-decision-option-review` already owns, and that skill already absorbed MCDA, of which AHP is a member. This reading is not a separable mechanism; it belongs *inside* `think-decision-option-review` as an optional weighting technique.

- **The rank-without-a-scale reading clears the wall, and it is `think-decision-option-review` that draws it.** That skill's own "When NOT to use" excludes the case "when the criteria genuinely cannot be articulated," and its procedure requires an absolute scale ("score each option against each criterion ... say what a high score means"). Pairwise comparison's distinct move is precisely the disclaimed case: order items when you cannot name criteria and cannot defend an absolute score, by eliciting only binary "A beats B" judgments and deriving the scale (and its consistency check) from the matrix. There is no criteria axis and no absolute scoring - the mechanism is different in kind, not degree.

No other shipped skill produces it either:
- **`think-linear-model-aggregation`** fixes a formula over named cues for a *repeated* prediction - it needs the cues and the scale pairwise comparison refuses, and it builds a reusable model, not a one-off ranking.
- **`think-reference-class-forecasting`** anchors a number on a base rate (an outside-view quantity), not an order derived from internal head-to-head votes.

So the move that earns a place is narrow: **rank when you cannot score, by forced binary comparison, emitting a pairwise comparison matrix and the ranking derived from it.** That is a real artifact `think-decision-option-review` explicitly will not produce.

Why Build rather than Fold or Recipe. It is not a clean fold: the one shipped skill it is nearest to defines itself *against* the exact situation this move owns, so subsuming it would contradict that skill's stated boundary. It is not a recipe: deriving a scale from a consistency-checked comparison matrix is a single integrated mechanism, not a fixed chain of existing moves. It is Build, but a *guarded* Build - P-tier, on transferred and contested evidence, scoped to the no-scale case. The learning value of this entry is the discipline it models: a famous, genuinely useful technique whose headline reliability evidence is real but measures an adjacent claim (essay-scaling reliability, not decision quality) and is partly deflated by its own field, and whose most-advertised use (criteria weighting) is already owned. The library documents all of that and ships only the thin, honest remainder.

## 7. Sources

- Louis L. Thurstone, "A Law of Comparative Judgment," *Psychological Review* 34(4) (1927): 273-286. Foundational: established that a series of paired comparisons places stimuli on an interval scale (the discriminal-process model). Measures scaling, not decision quality. (M, for scaling - not for decisions)
- Alastair Pollitt, "Let's Stop Marking Exams" (IAEA, 2004) and subsequent comparative-judgement work. Introduced comparative judgement to assessment; reports high scale-separation reliability (commonly >0.80) for ranking open-ended work versus conventional marking. Reliability of a ranking of artifacts, not of a decision. (M, contested - see Bramley)
- Tom Bramley, "Investigating the Reliability of Adaptive Comparative Judgment" (Cambridge Assessment, 2015); Bramley and Vitello (2019). Showed by simulation that adaptivity inflates the scale-separation reliability statistic (e.g. reported 0.97 deflating to 0.84; spurious separation on random data). The key contra-evidence on the assessment reading. (M, critical)
- Paul A. Bottomley, John R. Doyle and Rodney H. Green, "Testing the Reliability of Weight Elicitation Methods: Direct Rating versus Point Allocation," *Journal of Marketing Research* 37(4) (2000): 508-513. The source of the often-quoted 88% vs 74% test-retest figure - but it compares Direct Rating to Point Allocation, NOT pairwise comparison. Cited to show the figure does not measure this move; excluded from the grade. (M, for an adjacent method - excluded)
- Thomas L. Saaty, *The Analytic Hierarchy Process* (McGraw-Hill, 1980). The decision-analytic apparatus: ratio-scaled pairwise comparison matrices, eigenvector weights, consistency ratio. Practitioner / foundational for the weighting reading; empirically criticised for rank reversal and consistency paradoxes. (P)
- Franz Ombler and Paul Hansen, "A new method for scoring additive multi-attribute value models using pairwise rankings of alternatives" (PAPRIKA), *Journal of Multi-Criteria Decision Analysis* (2008). The pairwise-trade-off weight-elicitation method behind 1000minds; the canonical modern criteria-weighting (folds into `think-decision-option-review`). Practitioner. (P)
- Amos Tversky, "Intransitivity of Preferences," *Psychological Review* 76(1) (1969): 31-48. The classic case that holistic preference can be intransitive (motivating pairwise methods); subsequently largely failed to replicate (Regenwetter et al. 2011 find cycles vanishingly rare). Cited to show the necessity argument is weaker than its reputation. (M, but substantially non-replicated)
- "Judging the Judges: A Systematic Investigation of Position Bias in Pairwise Comparative Assessments by LLMs" (arXiv 2406.07791, 2024). The agent-relevant transfer: pairwise LLM evaluation approximates human preference better than pointwise but suffers position bias requiring order-swapping. About agents evaluating outputs, not deciding; not validation of the decision move. (P, transferred to agents)

> Excluded under the evidence rule: the "88% versus 74%" reliability figure is real but belongs to Direct Rating versus Point Allocation (Bottomley, Doyle and Green 2000), not pairwise comparison, and does not move this grade; and no free-floating "pairwise comparison improves decisions by N percent" statistic with a nameable primary source was located. Any such figure is excluded.
