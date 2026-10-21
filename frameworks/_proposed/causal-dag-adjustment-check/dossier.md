---
title: Causal DAG adjustment check
slug: causal-dag-adjustment-check
generated_status: true
---

<!-- STATUS:GENERATED (gen-site.mjs from frameworks/registry.mjs) - do not edit between these markers -->
<!-- /STATUS:GENERATED -->

## What it is

A causal DAG adjustment check tests whether an observational comparison can carry the causal claim someone makes from it. "Observational" means nobody assigned the exposure: people or units ended up exposed by their own routes. The check has two halves. The first half finds what the comparison must adjust for. The second half finds what the comparison must not adjust for, and the library's interest in the method rests on that second half.

The move runs in four steps.

1. **Name the claim and the comparison as it was actually made.** State the exposure, the outcome, and everything the comparison filtered on or controlled for.
2. **Draw the assumed causal graph.** The graph is a directed acyclic graph (DAG). Each arrow says "this directly influences that", and no chain of arrows loops back to its start.
3. **Give every other variable its structural role.** A *confounder* is a common cause of the exposure and the outcome. It opens a "back-door" path that the comparison must block. A *mediator* lies on the path from the exposure to the outcome, so adjusting for it removes part of the very effect being estimated. A *collider* is a common effect of two variables on a path. Adjusting for a collider, or selecting the sample on one, opens a path that was closed and manufactures an association that is not causal.
4. **Choose the adjustment set.** The set must block every back-door path, leave the causal path open, and open no collider path. Pearl (1995) proved that a set meeting this "back-door criterion" is sufficient to identify the effect, provided the graph is correct.

An everyday case shows why the collider half matters. A team reports that, among customers who renewed, heavy users of a feature were no more satisfied than light users. Renewal plausibly depends on both feature use and satisfaction. Restricting the sample to renewers therefore conditions on a common effect of the two, which can create or hide an association between them. Nothing in the data reveals this problem. Only the graph does.

The move needs no structural equations, no numbers and no computation, because it reads the graph's shape. Pearl describes a three-rung ladder of causation: association, intervention and counterfactual. This check reasons about the second rung. It asks what a comparison would need in order to estimate the effect of intervening on the exposure. It never computes that effect, and it never computes a third-rung counterfactual.

## When it helps / when it misleads

It helps in four situations.

- **Someone draws a causal conclusion from data nobody randomized.** Typical claims are "users who adopt X retain better", "regions with the program had fewer incidents" and "patients on the drug lived longer".
- **An analysis "controls for" a list of variables, and you need to know whether each one belongs there.** The intuitive default of controlling for everything available is exactly what the mediator and collider rules correct.
- **The sample was filtered.** Only survivors, only hires, only renewers or only respondents were kept, and the filter may itself be a common effect of the exposure and the outcome.
- **Two people disagree about a causal claim.** Drawing the graph shows which arrow they disagree about. Digitale, Martin and Glymour (2022) recommend checking whether conclusions shift across several plausible graphs.

It misleads or wastes effort in the following cases. These are the walls a built skill must enforce.

- **The graph is an assumption, not a finding.** Every arrow is a claim about the world, drawn from domain knowledge. A correct adjustment set on a wrong graph is still wrong. Different analysts can defensibly draw different graphs, so the output must give each arrow's basis and say whether a plausible alternative graph changes the adjustment set.
- **No drawing removes an unmeasured confounder.** If a common cause was never measured, the honest output is "not identifiable from this comparison", together with what would be needed. Drawing the graph never licenses the claim on its own.
- **The "do not adjust" half is where people err.** In Ellison's (2021) teaching study, medical students rarely misclassified confounders but often misclassified mediators and competing exposures. A built skill must therefore state, for every mediator or collider it names, the exact path that makes the variable one.
- **An agent's own recall is not a reliable source of arrows.** Language models performed "mediocrely" at naming confounders against an expert answer key (Huntington-Klein and Murray 2024, preprint), and model-drafted DAGs could not replace a domain expert (Aziz and Brookhart 2025). The arrows must come from the user's stated knowledge, or be written down as explicit, flagged assumptions. The skill must never present a graph it generated as a finding.
- **The exposure was randomized.** Random assignment answers the back-door question by design. When an experiment is cheap, run one instead; the sibling pm-skills library covers that path (`measure-experiment-design`, `measure-experiment-results`). After randomization, the only residual check is not to condition on anything the treatment could have affected.
- **The situation feeds back on itself.** A DAG cannot contain a loop. Use `think-causal-loop-diagrams` for feedback, or unroll the loop over time and accept the extra assumptions that brings.
- **The question is about one case.** "Why did this particular outage happen?" belongs to `think-process-tracing`, not to an adjustment check.
- **The task is estimation.** The check says what a comparison needs. It does not compute an effect, a probability or a counterfactual, and it does not discover the graph from data.

## What the evidence says

The honest grade is **P (practitioner)**. The agent line is labelled separately below. It is mixed, and it does not count toward the tier.

**What is strong, and why it does not set the tier.** The graphical rules are mathematically proven. Pearl (1995) gave the back-door criterion as a sufficient condition for identifying a causal effect from observational data, given a correct graph. The methods literature also documents the harms that the second half prevents. Adjusting for a mediator biases an estimate of the total effect, which Schisterman, Cole and Platt (2009) named overadjustment bias. Conditioning on a collider creates spurious associations, which Elwert and Winship (2014) reviewed as endogenous selection bias. This work proves validity and documents real biases. It does not show that a person or an agent who runs the check reaches better causal judgments. Grading on it would launder pedigree into outcome evidence, which is the failure this library exists to prevent. For that reason the S grade from one external research run does not hold.

**What sets the tier: wide use, and no outcome trial.** DAGs are widely used to choose confounders in applied health research. Tennant and colleagues (2021) reviewed 234 health-research articles that reported using DAGs. Only a fifth of them (48 articles) stated their target estimand, and about half reported the adjustment set their DAG implied. The authors found substantial variation in how DAGs were used and reported. This run found no controlled study that tests whether drawing a DAG improves a person's causal judgment against a comparison group. The library's P means a method that is widely used, codified and defensible, without strong controlled evidence. The library has governed three neighbors at P on the same footing. Process-tracing explicitly rejected an S on methodological pedigree. Qualitative comparative analysis and causal-loop-diagrams were also governed at P without a controlled outcome trial.

**The one asymmetry, and which way it cuts.** Those three neighbors have an absence of outcome evidence. This method also has affirmative, cautionary evidence about novice execution. Ellison (2021) taught 85 medical undergraduates to classify covariates by their order in time and then to draw a DAG. Of the students who completed the classification task, 84.5% misclassified at least one covariate. Confounders were rarely misclassified, at roughly 3 to 4%. Mediators were misclassified at roughly 49 to 57%, and competing exposures at roughly 62 to 68%. Of the models the students' DAGs would have informed, 50 of 66 would have produced biased estimates of the total effect. The abstract prints this as 76.8%, but 50 of 66 is 75.8%. The study is uncontrolled and single-site, and its author ran it as a teaching exercise.

The earlier preprint of the same study (Ellison 2020) holds the one data point in the method's favor. Fewer than 15% of students classified every covariate correctly before drawing a DAG, and more than 35% did so afterward. Every DAG still contained at least one substantive technical error. The comparison is a same-subjects before-and-after measure without a control group. It shows, at most, that drawing the graph did not make classification worse.

This evidence does not push the grade down to C. C means conceptually plausible but undertested. This move has been tested in use. It is correct in principle and error-prone in execution, and the errors concentrate in one identifiable half. That reads as a P with a hard wall, not as a C. One external research run graded C because no controlled outcome study exists. That condition holds for every P in the library, so it cannot be the line between P and C. Nor does the evidence reach X: nothing contradicts the rules, and the evidence shows people applying them badly.

**The failure the check targets is real in people.** Rehder and Waldmann (2017) found that people reasoning about causal networks often deviate from explaining away and screening off. These are the inferences that govern colliders and blocked paths. The deviations were larger when a scenario was described in words than when it was learned from data. This is descriptive evidence about the error, like the misperception-of-feedback studies behind causal-loop-diagrams. It does not show that drawing a DAG corrects the error. It matters for agents too, because agents receive causal claims as prose.

**The agent line.** It is labelled separately because it cannot raise the human grade, and here it is mixed.

- **CLadder (Jin et al. 2023).** The benchmark poses formal causal questions and supplies the graph and the numbers in the prompt. A prompt that makes GPT-4 extract the graph and formalize the estimand first (CausalCoT) reached 70.40%, which the paper states is 8.37 points above plain GPT-4 (so plain GPT-4 scored 62.03%). The figures vary by paper version: an earlier arXiv version reported 66.64%, which was 2.36 points above plain GPT-4. The 2026-10-19 wave-4 record also reports a random baseline of 49.27%, which this run could not reconfirm. The task is a cousin of this move, not the move itself. It requires numeric computation and includes third-rung counterfactual questions, and this skill excludes both.
- **Corr2Cause (Jin et al. 2024).** The benchmark asks models to infer causal structure from statements of correlation. The seventeen models evaluated performed close to random.
- **Huntington-Klein and Murray (2024, preprint).** The ground truth was a published trial analysis's expert-chosen confounders. Language models performed only "mediocrely" at naming them, and some labelled very high shares of variables as confounders.
- **Aziz and Brookhart (2025).** Model-drafted DAGs for a cardiovascular case study omitted variables and cited hallucinated sources. The authors concluded that current models cannot replace a domain expert, though they may help as a brainstorming tool.

Taken together, the agent line says two things. Structured, graph-first reasoning can help when the graph is supplied. A model's own recall is an unreliable source for the graph. This finding shapes the skill's wall. The user supplies the structure, or the skill records each arrow as a flagged assumption, and the skill then applies the rules.

**Transfer flag (required).** All the human evidence comes from trained analysts and students in health research. None of it tests the lightweight, no-numbers check run by or with an AI agent, or applied to a business or policy claim. The evidence is transferred from human contexts and not validated for AI-augmented use. By the library's rule, transfer caps the grade at P, which is already where the human evidence sits. A P/C split was considered and rejected: the method is tested in use, so "undertested" does not describe it. The agent-assisted use is untested as a method, and the wall above exists for that reason.

**Excluded under the evidence rule.** No claim of the form "DAG-guided adjustment reduces bias by N%" or "DAG use improves causal judgment by N%" appears here, because this run found no primary source that measures either. Figures that could not be confirmed are labelled where they appear.

## Why it is / is not a skill here

Verdict: **Build.** This confirms the prior `cand / build / P` tag. Status stays `cand`, because promotion to `next` is a priority call across candidates, not a vetting call.

**The durable move.** Assign each variable in an observational comparison its structural role on an explicit acyclic graph. Then derive both what the comparison must adjust for and what it must not: mediators, colliders, and a sample selected on a collider. Stop at the adjustment set and the assumptions it rests on.

**The burden of proof: why this is not a fold.** Each neighbor is checked below, from the most overlap to the least.

- **`think-causal-loop-diagrams` (closest by surface; medium overlap).** Both methods draw directed causal arrows between variables. That shared drawing step is roughly a tenth to a fifth of the mechanism. Everything read off the drawing differs. A causal loop diagram must close loops, signs every link, and reads dynamics from loop dominance; its own "When NOT to use" excludes a genuinely linear chain. A DAG must not loop, needs no polarity, and reads identifiability from path structure. The collider rule has no counterpart in a causal loop diagram. A DAG mode inside that skill would contradict that skill's own wall.
- **`think-walton-argumentation-schemes` (medium-low overlap).** The shipped skill names "argument from cause to effect" in its scheme catalog, but its own files list no critical questions for that scheme. Walton's published catalog, which was not re-checked in this run, gives causal schemes a critical question asking whether some other factor produces the effect. That is the confounder question, and it is the whole overlap, at most roughly a tenth. The shipped skill judges one argument's presumption, routes statistical results out by its own wall, and carries no mediator rule and no collider rule.
- **`think-process-tracing` (low overlap).** It adjudicates rival mechanism chains for one case by evidence diagnosticity. Its own "When NOT to use" excludes cross-case generalization, which is this check's entire jurisdiction.
- **`think-evidence-vs-inference-sort` (low overlap).** It would label "X causes Y" as an inference and give it a confidence. It has no rule for which comparison would license the inference.
- **`think-iceberg-model` (low overlap).** It descends levels of causation to find leverage. It has no identification logic.
- **The `counterfactual-reasoning` fold (a wall, not an overlap).** That fold's exclusion covers the formal Pearl counterfactual, the third rung, which needs a fully specified model. This check is second-rung reasoning about structure. The candidate stays distinct only if the skill never computes an effect, a probability or a counterfactual.

**Why not a recipe.** No chain of shipped skills applies path-blocking rules, so no sequence of them yields the collider or mediator verdict.

**Why not out of scope (`pm`).** The pm-skills library owns randomized experiments through `measure-experiment-design` and `measure-experiment-results`. Its `measure-survey-analysis` skill forbids causal claims from cross-sectional data, but it gives no adjustment logic. The DAG check is domain-general: it applies to health, policy, operations and product analytics alike. It handles exactly the claims that the pm-skills skills set aside. It belongs here, with a handoff to pm-skills whenever an experiment is feasible.

**Why it belongs for a non-statistician agent user.** The check needs no statistics. The user states the structure in plain language, for example "does renewal depend on satisfaction?", and the skill applies three rules. Its value is highest exactly where intuition fails: "control for everything", and "look only at the ones that made it".

**The named artifact: a causal adjustment audit.** It holds seven parts.

1. The claim, and the comparison as actually made, including its filters and controls.
2. The assumed DAG as an edge list, each edge tagged with its basis: user-stated, cited, or assumed.
3. A role table that labels each variable as confounder, mediator, collider, descendant of the exposure, or other, with the path that gives it that role.
4. The adjust-for set and the must-not-adjust list, each entry with its reason.
5. A selection check on every filter applied to the sample.
6. The open problems: unmeasured common causes, and any plausible alternative graph that changes the adjustment set.
7. A verdict: the comparison as made is likely biased (and how), adequate under the stated graph, or not identifiable from the measured variables.

**The hard "When NOT to use" wall, in four parts.**

1. The skill never invents an arrow and never presents a graph it generated as a finding.
2. It never computes an effect, a probability or a counterfactual.
3. It does not apply to a randomized experiment, to a feedback system, or to a single case.
4. No adjustment set certifies a causal claim. Unmeasured confounding stays an open problem, and an alternative plausible graph that changes the set is reported, not hidden.

## Lineage and who to read

The method comes from Judea Pearl's work on causal diagrams. Start with Pearl's 1995 *Biometrika* paper "Causal diagrams for empirical research", which states the back-door criterion. Pearl's *Causality* (2nd edition, 2009) is the full treatment. *The Book of Why* (Pearl and Dana Mackenzie, 2018) explains the ladder of causation for a general reader. Sander Greenland, Judea Pearl and James Robins brought causal diagrams into epidemiology in "Causal diagrams for epidemiologic research" (*Epidemiology*, 1999). Miguel Hernán and James Robins's textbook *Causal Inference: What If* teaches the graphical approach alongside estimation. Julia Rohrer's "Thinking clearly about correlations and causation" (*Advances in Methods and Practices in Psychological Science*, 2018) is a plain-language tutorial for researchers outside epidemiology. The bibliographic details of the books, the 1999 paper and the Rohrer tutorial were not re-checked in this run.

For the harms behind the "do not adjust" half, read Schisterman, Cole and Platt (2009) on mediators and Elwert and Winship (2014) on colliders. For how DAGs are used in practice, read Tennant and colleagues (2021). For the honest limits, read Ellison (2021) on novice errors and Digitale, Martin and Glymour (2022) on testing several plausible graphs. "Causal DAG" and "back-door criterion" are generic academic terms. The method is documented descriptively, credited to Pearl, and not flagged as branded.

### Named sources

Provenance note: this run read no abstract or full text first-hand. Each figure below was displayed in a web-search result summary, and the source it was attributed to is named. Where a result showed only surnames, the author first names and initials were completed from prior knowledge.

1. Judea Pearl, "Causal diagrams for empirical research," *Biometrika* 82(4) (1995): 669-688. Foundational and formal: it states the back-door criterion and proves that it suffices for identification, given a correct graph. It establishes validity, not better judgment. (Foundational; not outcome evidence. Bibliographic details not re-checked in this run.)
2. Enrique F. Schisterman, Stephen R. Cole and Robert W. Platt, "Overadjustment bias and unnecessary adjustment in epidemiologic studies," *Epidemiology* 20(4) (2009): 488-495. A methods paper that uses causal diagrams, an example and simulations to define overadjustment bias: adjusting for an intermediate variable on the causal path. It documents the harm the mediator rule prevents. (Methodological; establishes the bias, not the method's outcome.)
3. Felix Elwert and Christopher Winship, "Endogenous selection bias: the problem of conditioning on a collider variable," *Annual Review of Sociology* 40 (2014): 31-53 (some citations give 31-51). A review of collider bias, also known as M-bias, selection bias or Berkson's bias. It documents the harm the collider rule prevents. (Methodological review; not outcome evidence.)
4. Peter W. G. Tennant and colleagues, "Use of directed acyclic graphs (DAGs) to identify confounders in applied health research: review and recommendations," *International Journal of Epidemiology* 50(2) (2021): 620-632. A review of 234 applied health articles that used DAGs. A fifth stated their target estimand, and about half reported their implied adjustment set; use and reporting varied substantially. (P: adoption evidence.)
5. George T. H. Ellison, "Might temporal logic improve the specification of directed acyclic graphs (DAGs)?," *Journal of Statistics and Data Science Education* 29(2) (2021): 202-213. An uncontrolled teaching study of 85 medical undergraduates. Confounders were rarely misclassified, while mediators and competing exposures often were, and 50 of 66 DAG-informed models would have been biased (printed as 76.8%; the ratio is 75.8%). The preprint (medRxiv, 2020) reports a before-and-after improvement in full classification accuracy, from under 15% to over 35%. (Cautionary evidence on novice execution; uncontrolled.)
6. Bob Rehder and Michael R. Waldmann, "Failures of explaining away and screening off in described versus experienced causal learning scenarios," *Memory & Cognition* 45(2): 245-260 (2017). Experiments showing that people often deviate from explaining away and screening off, more so for verbally described scenarios. It is descriptive evidence of the failure the check targets, not a test of the check. (M for the failure as a phenomenon; the journal volume and pages were not re-checked in this run.)
7. Zhijing Jin and colleagues, "CLadder: Assessing causal reasoning in language models," NeurIPS 2023 (arXiv 2312.04350). In a benchmark of formal causal questions with the graph and numbers supplied, graph-first prompting (CausalCoT) reached 70.40%, 8.37 points above plain GPT-4; an earlier version reported 66.64% and a 2.36-point gain. It is a cousin task that requires computation and includes counterfactuals. (Agent line; transferred task.)
8. Zhijing Jin and colleagues, "Can large language models infer causation from correlation?," ICLR 2024 (arXiv 2306.05836). The Corr2Cause benchmark: seventeen models performed close to random at inferring causal structure from correlation statements. (Agent line; capability, negative.)
9. Nick Huntington-Klein and Eleanor J. Murray, "Do LLMs act as repositories of causal knowledge?," arXiv 2412.10635 (2024, preprint). Models performed "mediocrely" at naming confounders against expert-chosen ground truth, and some over-designated confounders. (Agent line on the move's input step; negative.)
10. Maryam Aziz and M. Alan Brookhart, "Can contemporary large language models provide the domain knowledge needed for causal inference? Evaluating automated causal graph discovery through an ASCVD case study," *Clinical Epidemiology* 17 (2025): 863-873. GPT-4o and o1 drafted DAGs for a statins case. The authors report omissions and hallucinated sources, and they conclude that the models cannot replace a domain expert but may help with brainstorming. (Agent line; case study.)
11. Jean C. Digitale, Jeffrey N. Martin and M. Maria Glymour, "Tutorial on directed acyclic graphs," *Journal of Clinical Epidemiology* 142: 264-267 (2022; PubMed 34371103). A tutorial noting that DAGs are fallible because prior knowledge is limited, and advising analysts to check whether results shift across several plausible DAGs. (Practitioner guidance.)

> Excluded under the evidence rule: no "DAGs reduce bias by N%" or "DAG use improves causal judgment by N%" figure appears in this dossier, because no primary source measuring either was found. The CLadder random baseline (49.27%) is carried from the 2026-10-19 wave-4 record and was not reconfirmed in this run. The plain-GPT-4 score (62.03%) is computed from the gap the paper states, not read from its table.
