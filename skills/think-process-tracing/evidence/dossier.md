# Evidence Dossier: Process Tracing

> The single source of truth for the `process-tracing` skill. The `SKILL.md`, the sidecar
> (`skill.meta.yml`), and the eval cases all derive from this file. If a claim is not here, it does
> not belong in the skill. Reformatted from `_local/proposed-builds/process-tracing/dossier.md` and
> admitted as a Build at tier P (the candidate's preliminary verdict is upheld; the external
> wave-3 S-on-pedigree grade is rejected and stays rejected).

| | |
|---|---|
| **Skill** | `thinking-framework-skills.process-tracing` (installable name `think-process-tracing`) |
| **Family** | systems-and-consequences |
| **Evidence tier** | **P** governing (deep peer-reviewed methodology, no controlled reasoning-outcome trial - see "What the evidence shows") |
| **Confidence** | Moderate that per-item diagnosticity typing against rival mechanism chains discriminates causal stories better than an evidence tally; low that any reasoning-accuracy effect transfers to agents (there is no such study, for humans or agents) |
| **Status** | cand (the v0.7.0 phase-2 reconciliation upheld Build at P; built as a skill here) |

---

## 1. The mechanism (what actually does the work)

Process tracing adjudicates rival causal explanations of a single case by weighing each piece of within-case evidence by its diagnosticity - its power to eliminate or confirm an explanation - rather than by how much evidence piles up on each side. The move has two coupled steps.

First, make each rival explanation concrete as a causal mechanism: the step-by-step chain that explanation claims links cause to outcome in this case, and the observable fingerprints each step would have left if it actually operated (logs, timestamps, documents, who knew what when). The fingerprints are stated before the evidence is weighed.

Second, type each piece of evidence by two questions (Van Evera 1997): certainty (if the explanation is true, must we see this?) and uniqueness (could the rivals also produce it?). The combinations give the four classic tests:

- **Hoop test** (certain, not unique): an explanation that fails it is eliminated; passing keeps the explanation alive without confirming it.
- **Smoking gun** (unique, not certain): finding it strongly confirms the explanation; not finding it only mildly weakens it.
- **Straw in the wind** (neither): a weak nudge either way, never decisive.
- **Doubly decisive** (both): one observation that confirms an explanation and eliminates its rivals - rare, but what the search is aimed at.

Belief in each rival is updated item by item, with the decisive items doing the work; a single failed hoop removes a rival no matter how much straw-in-the-wind support it has accumulated. The Bayesian formalization (Fairfield and Charman 2017) treats the four tests as limiting cases of likelihood-ratio reasoning: how much more probable is this observation under one explanation than under the others.

The durable cognitive move is **eliminating or confirming rival causal explanations of one case by typing each piece of within-case evidence by its diagnosticity - its necessity and its sufficiency - against each rival's implied mechanism chain, rather than by tallying how much evidence supports each side.** Two things distinguish it from ordinary evidence-weighing: the object is a single case with genuinely rival stories about why it happened (not a cross-case generalization, not a single accepted story), and the operation is per-item diagnosticity typing with elimination (not a consistency tally across hypotheses).

The output is a **rival-explanation evidence ledger**: the rivals, each rival's implied mechanism chain, each evidence item typed per rival (hoop / smoking gun / straw-in-the-wind / doubly decisive), the surviving explanation with its residual uncertainty, and the single most decisive observation still missing.

## 2. Lineage

The term entered social science from the cognitive psychology of decision making: Alexander George imported it for within-case analysis of decision processes (George and McKeown 1985, "Case Studies and Theories of Organizational Decision Making"), and **George and Bennett (2005)**, *Case Studies and Theory Development in the Social Sciences*, made it the centerpiece of qualitative causal inference. **Stephen Van Evera (1997)** named the four tests (certainty by uniqueness). **David Collier (2011)** turned them into the standard teaching framework as a necessity-by-sufficiency two-by-two. **James Mahoney (2012)** formalized their logic set-theoretically. **Bennett and Checkel (2015)** codified best-practice criteria. **Derek Beach and Rasmus Brun Pedersen (2013; 2nd ed. 2019)** split the method into theory-testing, theory-building, and outcome-explaining variants and operationalized mechanism evidence. The Bayesian turn runs through **Fairfield and Charman (2017; 2022)**, with Sherry Zaks's "Updating Bayesian(s)" as the sharpest internal critique. The method has substantial applied uptake in program and impact evaluation (for example Befani and Mayne 2014 on combining process tracing with contribution analysis).

The terms "process tracing," "hoop test," "smoking gun," "straw in the wind," and "doubly decisive" are generic and descriptive within the methodological literature; the durable move is named for what it does, and the skill ships documented descriptively with the lineage credited here rather than branded. The attribution string credits Van Evera (the four tests), Collier, Beach and Pedersen, and the Bayesian formalization by Fairfield and Charman.

Start with Collier (2011) for the tests in an afternoon; read Beach and Pedersen (2019) to do it properly; read Fairfield and Charman (2017) to understand what the tests really are underneath.

## 3. What the evidence shows, and what it does NOT show

The honest grade is **P (practitioner)**. The methodological literature is deep, peer-reviewed, and actively self-critical, but it concerns inferential validity in case-study research - whether and when this logic licenses causal conclusions - not controlled human-reasoning outcomes. No randomized or controlled trial tests whether using process tracing improves judgment accuracy, for humans or agents.

**What the record supports.** The logic of the four diagnosticity tests is rigorously worked out and formally grounded.

- **Stephen Van Evera (1997), *Guide to Methods for Students of Political Science* (Cornell University Press).** Coined the four-test typology (certainty by uniqueness). Methodological prescription; grade P.
- **Alexander George and Andrew Bennett (2005), *Case Studies and Theory Development in the Social Sciences* (MIT Press).** The canonical statement of process tracing as within-case inference on causal mechanisms. Methodology; grade P.
- **David Collier (2011), "Understanding Process Tracing," *PS: Political Science and Politics* 44(4), 823-830.** Systematized the four tests as a necessity-by-sufficiency two-by-two with teaching exercises; the standard accessible exposition. Grade P.
- **James Mahoney (2012), "The Logic of Process Tracing Tests in the Social Sciences," *Sociological Methods and Research* 41(4), 570-597.** Set-theoretic formalization of what each test can and cannot establish. Formal methodology; grade P.
- **Andrew Bennett and Jeffrey T. Checkel, eds. (2015), *Process Tracing: From Metaphor to Analytic Tool* (Cambridge University Press).** Best-practice criteria for rigorous application across domains. Grade P.
- **Derek Beach and Rasmus Brun Pedersen (2013; 2nd ed. 2019), *Process-Tracing Methods: Foundations and Guidelines* (University of Michigan Press).** Distinguishes theory-testing, theory-building, and outcome-explaining variants and operationalizes mechanism evidence. Grade P.
- **Tasha Fairfield and Andrew Charman (2017), "Explicit Bayesian Analysis for Process Tracing," *Political Analysis* 25(3), 363-380.** Formalizes the method as explicit Bayesian updating, and doubles as an internal critique: outside deductive limiting cases the four-test classification does not always sensibly classify evidence, so reason in likelihood ratios. Their 2022 book (*Social Inquiry and Bayesian Inference*, Cambridge) extends this; Sherry Zaks's critical evaluation of Bayesian process tracing contests parts of the practice. Formal methodology plus live debate; grade P.

**What the record does NOT support.** Any claim that the procedure measurably improves reasoning outcomes. There is no randomized or controlled human study, and none for agents. One wave-3 external research run graded process tracing S on methodological pedigree; that grade was rejected in the registry adjudication and stays rejected here - pedigree is not outcome evidence. The governing grade is P, and it is honest: the literature establishes that the logic is valid, not that running the procedure makes a reasoner more accurate.

## 4. Transferred-evidence flag (required honesty for this library)

There is no on-target evidence in either direction, so the only nearby controlled evidence is **negative and belongs to a cousin method**, not to this one.

The cousin is Analysis of Competing Hypotheses (ACH), which scores every evidence item against every hypothesis in a consistency matrix and selects the least-inconsistent by tally. A randomized study with professional intelligence analysts (Dhami, Belton and Mandel 2019, *Applied Cognitive Psychology*) found trained analysts skip steps and showed mixed-to-negative effects, and Mandel, Karvetski and Dhami (2018, *Judgment and Decision Making* 13(6)) found ACH failed to improve analysts' probabilistic judgments, with slightly worse coherence and accuracy than no method. That record attaches to ACH's matrix-tally procedure - a different operand and a different operation - and per this library's rules transferred evidence sets no tier in either direction. It is recorded here as a documented caution for the whole structured rival-hypothesis genre and as the reason the built skill enforces a hard anti-ACH wall (no consistency matrix, no least-inconsistent tally; the move lives in the mechanism chains and the per-item necessity/sufficiency typing). The ACH X does not transfer onto process tracing's P, and process tracing's P does not rescue ACH.

All of the methodological evidence in section 3 is on human case-study research practice; none studies a process-tracing ledger produced by or with an AI agent. The evidence is **transferred from human methodological contexts and not validated for AI-augmented use**, which independently caps the grade at P. The AI value is mechanical and modest: an agent makes the discipline cheap to run (state each rival's mechanism chain and its expected fingerprints before weighing evidence, type each item by certainty and uniqueness, let a single failed hoop eliminate a rival) and produces a durable, inspectable ledger - benefits that do not depend on any contested outcome claim.

**Name collision, not evidence.** In judgment-and-decision-making psychology, "process tracing" names laboratory data-collection methods (eye tracking, information boards, think-aloud protocols) for studying how people decide (see the handbook edited by Schulte-Mecklenbeck, Kuhberger and Ranyard). That literature is a homonym and lends this method no support.

## 5. When it works / when it fails (drives the eval negative cases and "When NOT to Use")

**Works best when:**
- There is exactly one case, genuinely rival stories about why it happened, and mechanism-level evidence available to discriminate them: an incident postmortem with three competing root-cause theories, a churn spike with rival explanations (a pricing change versus a competitor launch versus an onboarding regression), a lost deal, a metric anomaly, a contested historical decision.
- The question is "what would I expect to see if THIS story were true that the others would not produce?" - converting a shouting match between narratives into a search for discriminating observations.

**Fails or misleads when (poor-fit / anti-patterns):**
- **There are no rivals on the table.** With a single causal story, there is nothing to discriminate; use a level-descent diagnosis (iceberg-model) or a coverage decomposition (issue-tree) instead.
- **The question is cross-case** ("does X generally cause Y?", "which combination of conditions produces success across our markets?"). That is the comparative and configurational space (QCA's territory, rejected here for fit); process tracing's jurisdiction is one case, N equals one.
- **The evidence pool is all straw-in-the-wind.** When nothing available is diagnostic, running the ritual anyway produces false confidence; the honest output is "non-diagnostic - here is the observation that would discriminate," not a manufactured winner.
- **It degenerates into a generic evidence-by-hypothesis tally matrix.** Scoring every item against every hypothesis for consistency and picking the least-inconsistent is Analysis of Competing Hypotheses, whose controlled record with professional analysts is negative. Process tracing's value lives in the mechanism chains and the per-item necessity/sufficiency typing, not in a tally. If there is no single case and no mechanism chain, decline rather than becoming an ACH matrix under another name.
- **Test types are assigned after seeing the evidence.** Grading a found item as a "smoking gun" post hoc inflates its diagnosticity; the typology invites motivated grading unless the expected fingerprints are stated before the evidence is weighed (the caution in Fairfield and Charman 2017, and the thrust of Zaks's critique).

## 6. Output artifact

The skill must emit a **rival-explanation evidence ledger**, not prose: the focal outcome and case; the rival explanations, each made concrete as a causal mechanism chain with the observable fingerprints each step would leave; every evidence item typed per rival (hoop / smoking gun / straw-in-the-wind / doubly decisive) with its expected-fingerprint stated before the find; the running elimination/confirmation per rival; the surviving explanation with its residual uncertainty; and the single most decisive observation still missing. When the available evidence is all non-diagnostic, the honest ledger says "non-diagnostic" and names the discriminating observation to seek, rather than declaring a winner.

## 7. Sources

1. Stephen Van Evera, *Guide to Methods for Students of Political Science* (Cornell University Press, 1997). Coined the four-test typology (certainty by uniqueness). Methodological prescription. (P)
2. Alexander L. George and Andrew Bennett, *Case Studies and Theory Development in the Social Sciences* (MIT Press, 2005). The canonical statement of process tracing as within-case inference on causal mechanisms. (P)
3. David Collier, "Understanding Process Tracing," *PS: Political Science and Politics* 44(4):823-830 (2011). Systematizes the four tests as a necessity-by-sufficiency two-by-two; the standard accessible exposition. (P)
4. James Mahoney, "The Logic of Process Tracing Tests in the Social Sciences," *Sociological Methods and Research* 41(4):570-597 (2012). Set-theoretic formalization of what each test can and cannot establish. (P)
5. Andrew Bennett and Jeffrey T. Checkel, eds., *Process Tracing: From Metaphor to Analytic Tool* (Cambridge University Press, 2015). Best-practice criteria across domains. (P)
6. Derek Beach and Rasmus Brun Pedersen, *Process-Tracing Methods: Foundations and Guidelines*, 2nd ed. (University of Michigan Press, 2019). Distinguishes theory-testing, theory-building, and outcome-explaining variants. (P)
7. Tasha Fairfield and Andrew Charman, "Explicit Bayesian Analysis for Process Tracing," *Political Analysis* 25(3):363-380 (2017). Formalizes the four tests as likelihood-ratio limiting cases, and is itself an internal critique of mechanical test-typing. (P)
8. Barbara Befani and John Mayne, "Process Tracing and Contribution Analysis: A Combined Approach to Generative Causal Inference for Impact Evaluation," *IDS Bulletin* 45(6) (2014). Applied uptake in program and impact evaluation. (Practitioner application.)

> **Adjacent evidence, transferred, sets no tier here:** Mandel, Karvetski and Dhami, "Boosting intelligence analysts' judgment accuracy: What works, what fails?," *Judgment and Decision Making* 13(6) (2018), and Dhami, Belton and Mandel (2019), *Applied Cognitive Psychology*. These are the controlled, randomized, null-to-negative results on ACH's matrix-tally procedure. They attach to ACH's entry (a different operand and operation), not to process tracing, and motivate the anti-ACH wall here without setting or laundering a grade in either direction.
>
> Excluded on the evidence rule: no decision-accuracy or reasoning-improvement effect size for process tracing is asserted as fact in this dossier, because no such controlled study exists. The external wave-3 S-on-pedigree grade is recorded as rejected: a deep methodological pedigree is not outcome evidence.
