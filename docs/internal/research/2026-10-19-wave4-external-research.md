# Wave-4 external deep research: synthesis, dedup and admissions (2026-10-19)

**Status: decided on 2026-10-19.** The maintainer delegated decisions D1 to D8 ("D1 to D8 use your best judgement"), and the recommended option was taken for each. The decisions section at the end records each one and how to reverse it. The registry now holds 149 methods, up from 135: three build candidates, two documentation candidates and nine folds. Nothing ships, and there is no new family.

The brief is [`2026-10-17-wave4-research-brief.md`](2026-10-17-wave4-research-brief.md). It was pasted with the 135-method dedup appendix into three deep-research tools. The raw outputs stay gitignored at `_local/research/2026-10-19_2.35-wave4/`, under the [research-corpus convention](README.md).

## The three runs

| Run | Platform | What it proposed | Reliability read |
|---|---|---|---|
| A | Claude deep research (164 KB) | 9 builds, 6 document-only items, more than 40 folds, chains and rejects. It covered all 8 held-over leads and all 7 lower-priority leads. | The most thorough run. Its grades are honest and self-critical, and every figure checked first-hand matched its source. It made one factual error: it called Targeted Experience Narratives untraceable, but Shaffer et al. (2016) defines the term in its title. It leans toward building (9 builds against run B's 2). Its shared budget of 200 searches ran out partway through every track. |
| B | ChatGPT deep research (67 KB) | 16 full records: 2 builds, 7 folds, 6 document-only items and 1 reject. It screened 5 lower-priority leads without grading them. | The most conservative run. Every figure checked matched the paper, and it carries its own source-status table. It proposes a "Learning and knowledge testing" family, which run A explicitly rejects. |
| C | Gemini deep research (36 KB) | 9 builds, covering all 8 held-over leads and 6 of the 7 lower-priority leads. | A lead generator again, as in wave 3. It grades pedigree and the existence of a bias as outcome evidence: S for Value-Focused Thinking, moral foundations and causal DAGs, and M for Linear Sequential Unmasking. It names few sources. Two of its claims checked out where run A erred or was silent: a 2025 moral-appeals meta-analysis (d = .22) and the Shaffer narratives paper. |

**Agreement is counted by distinct runs, not by volume.** Run A is 4.5 times the size of run C, and its length does not make its calls count twice.

**The admission rule is wave 3's.** A lead needs two or more runs to propose it, a clean dedup against the registry, and a maintainer decision. An admitted method enters the registry as `cand`, marked "Preliminary; pending deep-research vetting", and the `think-research-framework` engine vets it before anything is built.

## Dedup against the registry

The appendix was regenerated on 2026-10-19 with `npm run research:appendix`, and it holds 135 methods. No candidate's name or alias matches an entry. The registry's reasoning text, which the appendix omits, raised five points that the decisions below have to account for.

1. **Causal DAGs and the counterfactual-reasoning fold.** The `counterfactual-reasoning` entry says that "the formal Pearl SCM counterfactual is an algorithm over a model, out of lightweight scope". The DAG candidate is a different operation. It reads a graph's structure to decide what to adjust for (Pearl's second rung, intervention), and it needs no structural equations, no numbers and no computation. The counterfactual exclusion is about the third rung, which does need a fully specified model. The candidate stays distinct only if the skill never computes a counterfactual.
2. **Value-Focused Thinking and the MCDA fold.** Keeney appears in the registry only through Keeney and Raiffa (1976), inside the `multi-criteria-decision-analysis` fold into Decision Option Review. That fold covers weighting criteria. Value-Focused Thinking elicits objectives before options exist, and Decision Option Review's own "When NOT to use" says "To generate options (use an ideation skill)". So the MCDA fold does not cover it, and a fold into Decision Option Review would change that skill's scope.
3. **Draft-blind verification and the unrecorded Structured Self-Critique fold.** Wave 3 judged Structured Self-Critique a fold into Red Team / Blue Team but never recorded it. Runs A and B draw the same boundary. The new move is that the verifying pass structurally cannot see the draft, and a check that can see the draft is the fold.
4. **Analogical comparison and Far-analogy ideation.** Far-analogy ideation carries the alias "analogical ideation". Run A estimates the overlap at a quarter to a third, which is near the one-fifth threshold.
5. **The stakeholder power-interest grid and the Stakeholder Lens Review fold.** The grid prioritizes parties by power and interest, while the folded lens review takes their perspectives. The grid is a single-source document-only item, so this needs no decision now.

Two live-page findings came out of the runs. Both were checked.

- **The process-tracing dossier calls QCA "rejected here for fit".** Run B noticed it. The sentence is stale: the dossier was last edited on 2026-06-12, and QCA shipped as a contested lens on 2026-06-19 (v0.11.0). It is a one-line fix, listed under D7.
- **The Ladder of Inference Check page does not name Socratic self-questioning,** although the registry folds that method into it. Run A noticed it. This matches the backlog recommendation of 2026-10-17, which says fold targets need not name what folds into them, because the registry is the source of truth. No action is proposed.

## Every lead, mapped across the runs

The runs name the same method differently. Each row below is one method, after mapping. "Not searched" means the run listed the lead as unsearched, and "absent" means the run did not mention it. The last column is the disposition as drafted for the decisions. Where D5 was carried out differently, the decisions section says how.

| Method (proposed library name) | Run A | Run B | Run C | Runs proposing | Recommended disposition |
|---|---|---|---|---|---|
| **Causal DAG adjustment check** | build, P | build, C (agent line M) | build, S | 3 | **Admit as `cand`, build, P** (D1) |
| **Objectives-first alternative generation** (Value-Focused Thinking) | build, M narrow | fold into Decision Option Review, M | build, S | 3 | **Admit as `cand`, build, M** (D2) |
| **Draft-blind claim verification** (Independent factored verification; Blind re-derivation check) | build, provisional, human C | build, human C, agent M | absent | 2 | **Admit as `cand`, build, C, agent-first** (D3) |
| Distanced self-reflection (self-distancing) | build, M low end | fold into Parallel Perspectives Review, M | absent | 2 | Split; maintainer decision (D4) |
| Lookahead search with backtracking (Tree of Thoughts) | document only, C | document only, C (agent M) | build, P (agent S) | 3 | Document only; record (D5) |
| Linear Sequential Unmasking (LSU-E) | fold into Belief-update routine, C | document only, C | build, M | 3 | Fold into Belief-update routine (D5) |
| Sequential Evaluation / segmented testimony | fold into Belief-update routine | fold into Evidence vs Inference Sort | fold into LSU-E | 3 | Fold into Belief-update routine (D5) |
| Peer Instruction | fold into Belief-update routine (solo form) | reject as solo skill | reject | 3 | Reject; solo residue to Belief-update routine (D5) |
| Moral Foundations deliberation | fold lens into Ethical Matrix; reframing document only | fold into Ethical Matrix | build, S | 3 | Fold into Ethical Matrix (D5) |
| Robust Decision Making | fold into Scenario planning | document only | fold into Scenario planning | 3 | Fold into Scenario planning (D5) |
| Necessary Condition Analysis | fold into QCA | document only | document only | 3 | Note in QCA's entry (D5) |
| Most Significant Change | fold into Affinity Mapping | fold into After Action Review | reject | 3 | Reject as a solo skill (D5) |
| Cross-Impact Analysis | fold into Morphological analysis, P low | document only (CIB variant) | build, P | 3 | Fold into Morphological analysis (D5) |
| Targeted Experience Narratives | reject as untraceable (wrong) | fold into Reference class forecasting, M narrow | document only | 3 | Fold note on Reference class forecasting (D5) |
| Immunity to Change (Hidden competing-commitments map) | document only, A | absent | build, M | 2 | Document only, A, TM-annotated (D5) |
| Tetralemma | fold into Contradiction / Tension Mapping, A | not searched | build, P | 2 | Fold into Contradiction / Tension Mapping (D5) |
| E-Prime translation | fold into Evidence vs Inference Sort, A | not searched | build, C (agent M) | 2 | Fold into Evidence vs Inference Sort (D5) |
| Prompted self-explanation | reject (study technique) | fold into Concept Mapping | absent | 2 | Not admitted; no build (D5) |
| Algorithmic Impact Assessment | reject (governance instrument) | screened only | reject | 2 | Reject (D5) |
| Cognitive Walkthrough (Novice action walkthrough) | build, provisional, C | screened only | reject (UX domain) | 2 | Split, one build vote; hold (D6) |
| Ritual Dissent | reject, V | screened only | not searched | 1 | Reject (group-only, vendor-originated) |
| Lateral source check (lateral reading, SIFT) | build, M for online sources | absent | absent | 1 | Single-source; maintainer decision (D6) |
| Analogical comparison of cases | build, M borrowed | absent | absent | 1 | Hold for wave 5 (D6) |
| Split-the-space next test | build, P scoped | absent | absent | 1 | Hold for wave 5 (D6) |
| Paradigm-case line-drawing | build, P | absent | absent | 1 | Hold for wave 5 (D6) |
| Retrieval practice | absent | document only, S for learning | absent | 1 | Hold |
| Stakeholder power-interest grid; Ecocycle; Polya's "specialize"; moral reframing | document only | absent | absent | 1 | Hold |

**No new family is recommended.** Run B proposes "Learning and knowledge testing", run A argues against it, and run C proposes none. One run is not consensus.

## Grade conflicts, adjudicated at the honest floor

- **Value-Focused Thinking: run C's S does not hold.** Its outcomes are proximal: counts of objectives and alternatives, and self-rated importance. Runs A and B both grade the objective-elicitation move M, and both say the claim that it improves decisions is not shown. It is governed at **M, narrow**. Run C's figures of 5.9 objectives unprompted against 14.3 recognized are not in the Bond, Carlson and Keeney (2008) abstract and were not verified, and its Morningstar figure is a vendor figure.
- **Causal DAGs: run C's S is pedigree, and run B's C is too strict for the library's P.** P means widely used and defensible without strong controlled evidence. DAGs are widely used: 234 applied health articles in Tennant et al. (2021). The formal rules are proven. No controlled study shows that DAG reasoning improves a person's causal judgment, and novices get it wrong often: in Ellison (2021), 50 of 66 models built from students' DAGs, or 76.8%, would have produced biased estimates. Wave 3 governed QCA and process tracing at P on the same reasoning. It is governed at **P**, with the CLadder result as a separate, labelled agent line.
- **Draft-blind verification: both runs agree on C for people.** No human study tests a reasoner checking claims blind to their own draft. Run A shows that the nearest human evidence, independent double checking in medication safety, is null or negative. It is governed at **C**. The agent line, which by the brief's rule cannot raise the human grade, is M for narrow factual tasks.
- **Linear Sequential Unmasking: run C's M is evidence that the bias exists, not that the protocol fixes it.** Dror and Kukucka (2021) is a protocol article with no outcome test. It is governed at **C**.
- **Moral foundations: run C's S is borrowed from persuasion research.** The moral-appeals meta-analysis it cites is real. Xu, Mulder, Leliveld and Bijmolt pooled 62 papers and 368 effect sizes and found "a small-sized, positive effect on changing behavioral intentions and behaviors (d = .22)" (AOM Proceedings 2025; a 2026 PSPB version exists). That measures persuasion, not the quality of moral deliberation. The lens is governed at **C**.
- **E-Prime: run C's agent claim fails on mechanism.** Jehu-Appiah (2026, preprint) ran an active-control replication across six models. E-Prime beat the control by 3.7 points, but it was the weakest of four constraints, and a ban on filler words such as "very" and "just" did best (+6.7 points). "Every prediction from the cognitive restructuring hypothesis was disconfirmed."
- **Tree of Thoughts: run C's S for agents ignores the independent test.** Yao et al. (2023) report 74% against 4% on Game of 24. Chen et al. (ACL 2024) found that tree search needs a discriminator that is at least 90% accurate to beat simple re-ranking, and current models fall short. It is governed at **C** for people and M, narrow, for agents.
- **Targeted Experience Narratives: run A's "untraceable" is wrong.** Shaffer, Focella, Scherer and Zikmund-Fisher (2016), "Debiasing affective forecasting errors with targeted, but not representative, experience narratives", *Patient Education and Counseling* 99(10):1611-1619, defines the term. Runs B and C cite it. Its scope is narrow: patients predicting their own discomfort from a medical procedure, using narratives that researchers wrote.

## First-hand checks (2026-10-19)

Every source that a recommended admission's grade rests on was checked against CrossRef and OpenAlex, or Semantic Scholar where OpenAlex had no abstract. Table figures were checked against the paper's arXiv full text. Each source's CrossRef record was read for retraction and correction links, and none had any. The Bond, Carlson and Keeney (2010) record notes a corrected figure heading, which changes no result.

| Candidate | Source | What was checked | Result |
|---|---|---|---|
| Objectives-first | Bond, Carlson and Keeney (2008), *Management Science* 54(1):56-70 | "consistently omitted nearly half of the objectives"; omitted objectives "almost as important" | Both in the abstract |
| Objectives-first | Bond, Carlson and Keeney (2010), *Decision Analysis* 7(3):238-255 | Which prompts helped | Abstract: category names and direct challenges with a warning raised quantity "without impacting their quality"; sample objectives gave less improvement. Run A's 9.2 against 12.7 is from the full text, not checked |
| Objectives-first | Siebert and Keeney (2015), *Operations Research* 63(5):1144-1158 | "less than half" of alternatives; objectives raise "number and quality" | Both in the abstract |
| Objectives-first | Haag, Zürcher and Lienert (2019), *EJOR* 279(3):912-928 | Independent replication; N = 71 stakeholders; master list | In the abstract: a master list was the only intervention that substantially helped, and category cues did not |
| Objectives-first | Simon and Siebert (2025), *Decision Analysis* | Model-generated objective sets | Abstract: "most of the GenAI objectives are viable individually, but the sets as a whole are highly flawed", with means objectives included "even when explicitly instructed not to" |
| Causal DAG | Jin et al. (2023), CLadder, NeurIPS (arXiv 2312.04350) | GPT-4 62.03% against 70.40% with CausalCoT; random 49.27% | All three figures in the paper's main results table |
| Causal DAG | Ellison (2021), *Journal of Statistics and Data Science Education* 29(2):202-213 | 85 medical undergraduates; 76.8% biased | In the abstract: 84.5% misclassified at least one covariate, and 50 of 66 models (76.8%) would have been biased |
| Causal DAG | Tennant et al. (2021), *International Journal of Epidemiology* 50(2):620-632 | 234 articles reviewed | In the abstract |
| Draft-blind | Dhuliawala et al. (2024), *Findings of ACL* | Llama 65B Wikidata precision: few-shot 0.17, joint 0.29, two-step 0.36, factored 0.32. Biographies: few-shot 55.9, joint 60.8, factored 63.7, factor and revise 71.4 | All figures in Tables 1 and 3. Jason Weston is a co-author |
| Draft-blind | Weston and Sukhbaatar (2023), System 2 Attention (arXiv preprint) | 62.8% to 80.3%; oracle 82.0%; instruction to ignore 71.7%; rewrite plus original context 74.5% | All in the paper |
| Draft-blind | Wilf et al. (2024), SimToM, ACL | GPT-3.5 ToMI 67.25 to 81.0; single-prompt variant 58.75 | All in the paper |
| Draft-blind | Huang et al. (2024), ICLR, "Large Language Models Cannot Self-Correct Reasoning Yet" | GPT-3.5 CommonSenseQA 75.8 to 41.8 after self-correction | In the paper (round 2) |
| Draft-blind | George and Stuhlmüller (2023), WIESP | HaluEval evaluation; Elicit affiliation | Record and abstract confirmed. Vendor-affiliated |
| Draft-blind | Steblay et al. (2006), *Law and Human Behavior* 30(4):469-492 | Instructions to disregard evidence, 48 studies | In the abstract |
| Distanced self-reflection | Grossmann and Kross (2014), *Psychological Science* 25(8):1571-1580 | N = 693; self-distancing "eliminated this asymmetry" | Both in the abstract |
| Distanced self-reflection | Grossmann et al. (2021), *Psychological Science* 32(3):381-394 | N = 555; diary method | In the abstract. Run A's quotation calling for "independent replication" is not in the abstract and was not checked |
| Distanced self-reflection | Xu, Zhang and Wang (2022), *Frontiers in Psychology* 13 | N = 399 | The abstract confirms the self-other asymmetry replicated. It tests the asymmetry, not the self-distancing intervention. "Significantly smaller" is not in the abstract |
| Distanced self-reflection | Murdoch et al. (2023), *Stress and Health* 39(2):255-271 | Pooled g = 0.19 | In the abstract. Emotional outcomes, not reasoning |
| Lateral source check | McGrew et al. (2019), *British Journal of Educational Psychology* 89(3):485-500 | Four randomized sections, n = 67 | In the abstract |
| Lateral source check | Aslett et al. (2024), *Nature* 625:548-556 | Searching "actually increases the probability of believing" false news | In the abstract |
| Adjudication | Jehu-Appiah (2026), arXiv preprint | E-Prime replication | In the abstract, as above |
| Adjudication | Xu, Mulder, Leliveld and Bijmolt (2025), AOM Proceedings | d = .22 for moral appeals | In the abstract |
| Adjudication | Shaffer et al. (2016), *Patient Education and Counseling* 99(10):1611-1619 | Exists, with this title | Record confirmed. No abstract available, so run B's Study 2 N = 196 was not checked |
| Adjudication | Chen et al. (2024), ACL | Discriminator accuracy of at least 90% | In the abstract |
| Fold lead | Fox and Clemen (2005), *Management Science* 51(9):1417-1432 | Partition dependence | Record and abstract confirmed |
| Fold lead | Gong et al. (2017), *Environmental Modelling and Software* 91:135-155 | Scenarios against forecasts | Record confirmed. No abstract; a summary says participants explored options similarly "but chose differently" |
| Reference | Alfieri, Nokes-Malach and Schunn (2013), *Educational Psychologist* 48(2):87-113 | Case-comparison meta-analysis | Record confirmed |
| Reference | Dror and Kukucka (2021), *Forensic Science International: Synergy* 3:100161 | A protocol, not a trial | The abstract describes an approach, with no outcome test |

**Not checked:** Brugman (2024)'s abandoned meta-analysis ("too much diversity" is not in the abstract, which confirms 114 experiments), any sample size quoted only from a full text, and every single-source lead's secondary sources.

## Admitted (5 candidates and 9 folds, no new family)

Every row below is in `frameworks/registry.mjs`, in the block headed "WAVE-4 CANDIDATES, ADMITTED 2026-10-19". Each row's reasoning ends with "Preliminary; pending deep-research vetting", and each carries the sources that were checked first-hand as its bibliography seed.

**Build candidates (`cand`, verdict `build`).** The `think-research-framework` engine vets each one before anything is built.

| Slug | Family | Tier | Verdict | Consensus | Why |
|---|---|---|---|---|---|
| `causal-dag-adjustment-check` | systems-and-consequences | P | build (preliminary) | A + B + C, all build | The most clearly distinct move found: deciding what to adjust for, and what not to (a collider or a mediator), before trusting an observational causal claim. No shipped method has the collider rule. Distinctness is high in runs A and B. |
| `objectives-first-alternative-generation` | decision-and-option-evaluation | M | build (preliminary) | A + C build; B fold | The only held-over lead with replicated controlled evidence on its own move, including an independent replication (Haag et al. 2019). Decision Option Review excludes option generation by design. |
| `draft-blind-verification` | assumption-and-belief-challenge | C | build (preliminary, agent-first) | A + B, both build | Three ablations, from two research groups, isolate the same active ingredient: the checking pass must not see the draft. It would be the library's first skill whose main evidence is agent evidence, and its "When NOT to use" must say that blinding adds no knowledge the model lacks. |

**Documentation candidates (`cand`, verdict `reject`).** Verdict reject means document only, which is the wave-3 pattern: the dossier is the product, and no skill is planned.

| Slug | Family | Tier | Consensus | Why |
|---|---|---|---|---|
| `lookahead-search-with-backtracking` (Tree of Thoughts) | synthesis-and-reasoning-clarity | C | A + B document only; C build | The agent result (74% against 4% on the Game of 24) did not survive an independent test of the discriminator it needs (Chen et al. 2024). |
| `hidden-competing-commitments-map` (Immunity to Change) | self-and-team-awareness | A | A document only; C build | The competing-commitment move is new to the library, but the evidence is anecdotal. The Minds at Work page marks the name with a TM symbol (checked 2026-10-19), and the row is branded on that basis. Its owner and registration status were not verified. |

**Folds (`fold`, with `foldInto`).** Each one is its own row, pointing at the shipped skill that covers it. That is the registry's form for a named method judged to be covered by a shipped skill, and 35 rows already used it. The research appendix lists folds by name and target, so a later wave is told not to propose them again. No step of any target skill has changed. Where a fold names a candidate enrichment, it is a backlog item (D7).

| Slug | Family | Tier | Folds into |
|---|---|---|---|
| `linear-sequential-unmasking` (Sequential Evaluation; Peer Instruction's solo form noted) | assumption-and-belief-challenge | C | `belief-update-routine` |
| `moral-foundations-deliberation` | ethics-values-deliberation | C | `ethical-matrix` |
| `robust-decision-making` | strategy-and-opportunity | C | `scenario-planning` |
| `necessary-condition-analysis` | systems-and-consequences | C | `qualitative-comparative-analysis` |
| `cross-impact-analysis` | systems-and-consequences | P | `morphological-analysis` |
| `targeted-experience-narratives` | risk-failure-and-resilience | M | `reference-class-forecasting` |
| `tetralemma` | problem-framing-and-reframing | A | `contradiction-tension-mapping` |
| `e-prime-translation` | assumption-and-belief-challenge | A | `evidence-vs-inference-sort` |
| `distanced-self-reflection` (D4) | self-and-team-awareness | M | `parallel-perspectives-review` |

**Not admitted, recorded here only:** Peer Instruction as a group teaching method, Most Significant Change, prompted self-explanation, Algorithmic Impact Assessment and Ritual Dissent. These follow wave 3's precedent, under which a rejected lead goes in the record and not in the registry.

Registry: 135 to 149 methods; `cand` 0 to 5; `fold` 35 to 44; families unchanged at 13. Nothing ships. `why-not.md` gains the nine fold rows, and the shipped skills' entries are byte-unchanged.

## Fold-enrichment leads (edits to shipped skills, queued under D7)

These are edits to shipped skills or to registry entries. Tier changes happen only through the research engine, never by hand.

1. **Belief-update routine: a commit-first guard.** Three held-over leads fold here. Peer Instruction's solo form, Linear Sequential Unmasking and cognitive forcing all seal an answer and confidence before exposure to advice, a counter-view or context, then allow a change only for a named new reason. Run A's "Are you sure?" evidence (Laban et al., preprint; 46% of answers flipped) supports the "named new reason" rule for agents, but that was not checked.
2. **Issue Trees and Fermi estimation: a pruning-bias caution.** Fischhoff, Slovic and Lichtenstein (1978) also found that "the perceived importance of a particular branch was increased by presenting it in pieces". The 2026-10-19 session parked that finding, and run A surfaced it independently, along with Fox and Clemen (2005) on partition dependence. The proposal is an explicit, separately estimated "everything not listed" branch, and a warning that splitting a branch inflates its weight.
3. **A library-wide execution rule: hand set-aside material to a fresh context.** Wherever a skill tells an agent to set something aside, such as an anchor, an opinion or its own draft, the skill should delegate the judgment to a fresh context that never saw it. An instruction to ignore reached 71.7% against 80.3% for a separate pass in System 2 Attention. A single combined prompt reached 58.75 against 81.0 in SimToM. For people, instructions to disregard evidence do not remove its influence (Steblay et al. 2006). All three results were checked. This holds whether or not D3 admits draft-blind verification.
4. **Scenario planning:** add Gong et al. (2017) as a second controlled study, and Robust Decision Making's strategy-first vulnerability scan as an optional step after step 7.
5. **Ethical Matrix:** an optional moral-foundations column set (MFQ-2), with the measurement caveats run A gives.
6. **Process-tracing dossier:** replace "QCA's territory, rejected here for fit" with a pointer to the shipped contested lens `think-qualitative-comparative-analysis`.
7. **Red Team / Blue Team: record the Structured Self-Critique fold.** The backlog has carried this since 2026-10-17. Runs A and B both strengthen it with the self-correction literature, and Huang et al. (2024) was checked.

## Single-source leads, held

Run A alone proposed four builds. Lateral source check has the best-checked evidence of the four: randomized course sections (McGrew et al. 2019), a preregistered experiment with 5,387 people (Panizza et al. 2022, not checked), and a prominent negative result (Aslett et al. 2024). Wave 3 admitted `consider-the-unknowns` from one run on the strength of its controlled line, so there is a precedent for an exception. Analogical comparison of cases (M, borrowed from learning studies), Split-the-space next test (P) and Paradigm-case line-drawing (P) are held for wave 5. Novice action walkthrough has one build vote and one reject, so it is held as well.

## What none of the runs searched

Run A lists its unsearched leads by track in its section 5. Several are worth a wave-5 brief: the universalization test, critical ignoring, source-reliability grading, affective-forecasting debiasing, and any controlled study of a person running a library method with and without an AI partner. Run B did not grade E-Prime, Tetralemma, Cognitive Walkthrough, Ritual Dissent or Algorithmic Impact Assessment. Run C did not search Ritual Dissent. No run made a systematic retraction check, which is why this synthesis read every load-bearing DOI's CrossRef record.

## Decisions (2026-10-19)

The maintainer delegated all eight decisions on 2026-10-19 ("D1 to D8 use your best judgement"). The recommended option was taken for each one, as recorded below. A one-row or one-section PR reverses any of them, and none of them ships anything.

- **D1. Admit `causal-dag-adjustment-check` as `cand` (P, build, systems-and-consequences)?** Options: A, admit; B, admit as document only; C, hold. **Decided A.** Confidence is high on distinctness and medium on the tier.
- **D2. Admit Value-Focused Thinking as `objectives-first-alternative-generation` (M, build, decision-and-option-evaluation)?** Options: A, admit as its own `cand`; B, fold into Decision Option Review as an objectives-first stage, which widens that skill's scope; C, hold. **Decided A,** at medium confidence.
- **D3. Admit `draft-blind-verification` as `cand` (C, build, agent-first, assumption-and-belief-challenge)?** Options: A, admit; B, fold into Evidence vs Inference Sort as an optional agent-only final step; C, hold. **Decided A,** at medium confidence. The evidence is real, but the human line is C, and the distinctness rests on one step.
- **D4. Distanced self-reflection: build or fold?** Options: A, fold into Parallel Perspectives Review as an observer lens for personally involving problems; B, admit as `cand` (M, build) in the empty self-and-team-awareness family; C, hold. **Decided A,** at medium confidence, and recorded as the fold row `distanced-self-reflection`. The consensus count decided it, not the evidence. For D1 and D2, three runs engaged and two or more said build, while here two runs engaged and split. An untested agent analog is true of all three, and filling an empty family is not a reason on its own.
- **D5. Record the dispositions of the other held-over and lower-priority leads?** Options: A, record each fold in the registry, admit Tree of Thoughts and Immunity to Change as document-only `cand` rows, and list the rejects in this record only; B, record nothing in the registry. **Decided A, carried out with fold rows instead of aliases.** As drafted, option A put each fold's name on its target entry as an alias, on the premise that aliases reach only the research appendix. They also reach the public agent-discovery files: `catalog.json` lists each shipped skill's aliases, and `llms-full.txt` prints them as "Also known as". The belief-update routine would have been published as "also known as Linear Sequential Unmasking", which is false. So each fold became its own `fold` row with `foldInto`, the registry's existing form, and no shipped entry changed. The count is 149, not the 140 the draft estimated. Confidence is high on the premise, because the generated diff showed it.
- **D6. Single-source leads?** Options: A, hold all of them for wave 5 and name them in the wave-5 brief; B, admit Lateral source check with a single-source flag, as `consider-the-unknowns` was admitted, and hold the rest. **Decided A,** at medium confidence. The rule exists because one run can be wrong, and a second run can be sought cheaply in wave 5. The held leads are listed in the wave-4 section of [`../backlog.md`](../backlog.md).
- **D7. The fold-enrichment edits (items 1 to 7 above)?** Options: A, queue them in the backlog as dated decision items, one PR each after a first-hand check; B, do them now. **Decided A.** Items 2, 3 and 7 are the highest value, and item 6 is a one-line fix. They are in the section "From the wave-4 synthesis (2026-10-19)" of [`../backlog.md`](../backlog.md), together with the smaller enrichments that four of the fold rows name.
- **D8. Commit this record?** Options: A, commit it with the decided rows as one PR, then run the trigger eval with the `anti_triggers`-only arm; B, commit the record before the decisions. **Decided A.** The same PR updated every hand-written count of evaluated methods that no gate layer checks, from 135 to 149. Those are `AGENTS.md`, `README.md` (the `frameworks/` row), `docs/architecture.md` (three places), `site/README.md`, the site's *Build with the library* page and the registry's header comment. Historical entries and the committed brief keep 135, because they record what was true then. #177 (the 47-skills fix) corrected this same kind of drift. The trigger eval waits for the maintainer to opt in to a Workflow run. The admissions do not change its inputs: the advisor's recommendable set is generated from the shipped skills' own files, not from the registry, and it regenerated unchanged.
