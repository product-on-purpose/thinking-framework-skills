# Evidence Dossier: Expected Value Decision Tree

> The single source of truth for the `expected-value-decision-tree` skill. The `SKILL.md`, the sidecar
> (`skill.meta.yml`), and the eval cases all derive from this file. If a claim is not here, it does not
> belong in the skill. Research verdict: Build at governing tier P, a deliberate downgrade from the
> catalog's M prior.

| | |
|---|---|
| **Skill** | `thinking-framework-skills.expected-value-decision-tree` (installable name `think-expected-value-decision-tree`) |
| **Family** | decision-and-option-evaluation |
| **Evidence tier** | **P** governing (honest read **S/P**, capped at P; flags: false-precision risk, single-shot-ruin) |
| **Confidence** | Moderate that an explicit EV tree makes the probability assumptions inspectable and the arithmetic checkable; low that any specific decision-outcome gain transfers to agents |
| **Status** | draft (admitted from the v0.5.0 discovery shortlist) |

---

## 1. The mechanism (what actually does the work)

Most consequential choices turn on outcomes the decider does not control. The default response is to argue the options in prose and decide on a hunch. Expected-value (EV) analysis refuses that: it **prices the uncertainty**. EV weighs each possible outcome by its probability and its magnitude, then sums - EV = sum over outcomes of (probability times value). A **decision tree** is the structure that makes this tractable when the outcome depends on a sequence of choices and chance events.

The move has two named parts:

1. **Lay out choice nodes and chance nodes.** The tree alternates two kinds of node: **choice nodes** (drawn as a square - branches the decider controls) and **chance nodes** (drawn as a circle - branches nature controls, each carrying a probability that sums to one across the fan). Values sit at the leaves. The **chance node** is the defining, load-bearing ingredient: an explicit, probability-weighted representation of outcomes the decider does not control. That is what separates this move from every deterministic comparison - a plain pros-and-cons list or a weighted-criteria matrix scores options on attributes you can assert, while a decision tree forces you to say "with probability p the world does X, worth v" and lets those probabilities, not just your preferences, drive the choice.
2. **Roll back (fold back), right to left.** At each chance node, replace the fan with its expected value; at each choice node, keep the branch with the best expected value and prune the rest. What survives the rollback is the option with the highest expected value and the path that produces it.

The output is a **decision tree with rolled-back expected values, the chosen branch, and a what-flips-it (sensitivity) note** that names the single probability or value which, if it moved past a stated threshold, would reverse the decision. The deliverable is the tree plus the rollback plus the sensitivity note, never a bare EV number presented as the answer. Soft or sourced-by-guess inputs are flagged at the node where they enter, not laundered into the arithmetic. Its durable virtue is auditability: the tree exposes exactly which probability and which value drove the answer.

A second, optional layer is **expected utility**: replacing raw value with a utility function that bends the value scale to capture risk attitude (the painfulness of a large loss, the diminishing worth of a large gain). EV maximization is the risk-neutral special case of expected-utility maximization. The skill-level move is the EV tree; the utility layer is the principled extension for when variance and ruin matter, not just the average - and the variance / risk-of-ruin dimension is exactly what the "when it fails" walls below protect.

## 2. Lineage

- **The normative spine:** John von Neumann and Oskar Morgenstern, *Theory of Games and Economic Behavior* (1944), which axiomatized expected-utility maximization, and Leonard J. Savage, *The Foundations of Statistics* (1954), which extended it to subjective probability. If you accept the rationality axioms, expected-utility maximization follows.
- **The applied decision-tree tradition:** Ronald A. Howard coined "decision analysis" in 1966; Howard Raiffa's *Decision Analysis: Introductory Lectures on Choices under Uncertainty* (1968) is the accessible founding text for the trees and the rollback; Keeney and Raiffa, *Decisions with Multiple Objectives* (1976) extended it to multi-attribute utility. In medicine, Stephen Pauker and Jerome Kassirer brought decision trees into clinical practice (the threshold approach, NEJM 1980).
- **The descriptive counter-tradition (the limits):** Maurice Allais (1953), whose paradox is the best-known violation of the expected-utility independence axiom, and Daniel Kahneman and Amos Tversky, "Prospect Theory" (*Econometrica*, 1979), which models the systematic ways people depart from EV.
- **Naming and IP:** "decision tree", "expected value", and "decision analysis" are generic descriptive terms in common use. No trademark and no attribution required beyond crediting the originators above. This entry is documented descriptively and is **not** flagged as branded.

## 3. What the evidence shows, and what it does NOT show

The honest read is **split, S/P, and capped at the conservative governing grade of P.** The catalog's prior **M** tag is overturned here on a conservative read of what the strong research actually covers. Both the split and the cap matter.

**The split, stated plainly.** There are two very different evidentiary claims hiding under "expected-value / decision-tree", and they grade differently:

1. *EV / expected-utility maximization is the normatively correct decision rule given coherent probabilities and utilities.* This is genuinely strong - it rests on the axiomatic foundations of von Neumann and Morgenstern (1944) and Savage (1954), among the most consequential results in decision theory. That is an S-tier *mathematical* result.
2. *Building a decision tree and computing EV makes a real decider's decisions better than the alternative they would otherwise use.* This is the claim a *skill* actually makes, and the support for it is **practitioner-level and transferred**, not strong. The richest application base is clinical decision analysis (Howard, 1966; Raiffa, 1968; Pauker and Kassirer, 1980). That base is a respected modeling *methodology* with candidly stated limits, not a body of controlled evidence that *using the tool* beats *not using it*.

**Why the governing grade is the conservative half (P), not the optimistic half (S/M).** The S-tier work measures the wrong thing for this skill: it establishes that EV-maximization is the right rule *given* the inputs, and (via Allais and prospect theory) that humans deviate from it. Neither is evidence that an agent who draws an EV tree decides better than one who uses, say, a weighted-criteria matrix or a base-rate anchor. The one nameable *comparative* finding is mixed and indirect: Mhaskar et al. (2014) found decision-analysis results concorded with matching systematic reviews of RCTs in 73% of cases (27/37), and with single RCTs in only 50% - the *model* tracked the trial evidence only when fed comprehensive inputs, and even then disagreed a quarter of the time. That bounds the move's reliability; it does not lift it to S. Per this library's rule, when the honest read is split and the strong evidence is for a sibling claim (the normative axioms) rather than for this move improving an agent's decisions, the tier emitted is the conservative one: **P, capped from an S/P split.** Calling it M or S would launder the axioms' robustness into a claim about the tool's effectiveness that the record does not make.

**What the record does NOT support, and the excluded number.** No controlled study locatable shows that constructing an EV tree improves decision *outcomes* versus a cheaper rule, for humans or for AI agents. No specific effect-size figure for "decision-tree analysis improves decisions by N%" traces to a nameable primary source; none is asserted here. The Mhaskar concordance figures (73% / 50%) are the only quantitative claims in this dossier and both are sourced to that paper. The clinical-decision-analysis literature is itself explicit that models oversimplify and that outputs "should only be used as a reference... and are not guaranteed as absolute" (Bae 2014).

## 4. Transferred-evidence flag (required honesty for this library)

**Transferred-evidence is true.** Every effectiveness datum above is from human deciders - clinicians, traders, experimental subjects. None studies an EV tree produced by or with an AI agent. The evidence is transferred from human contexts and not validated for AI-augmented use; for an agent the realistic value is **mechanical** - force the probabilities to be named, compute the rollback without arithmetic slips, run sensitivity - and even that is unproven, which is a second reason the conservative P stands. Treat the AI value as: the agent makes the price-the-uncertainty pass cheap and disciplined, refuses to launder guessed inputs, holds the chance-node probabilities to a stated source, and enforces the ruin / risk-attitude check - benefits that do not depend on any unproven outcome claim.

## 5. When it works / when it fails (drives the eval negative cases and "When NOT to Use")

**Works best when:**
- A decision genuinely hinges on uncertain outcomes you can put rough, sourceable probabilities on (investing under uncertain payoffs, go/no-go on a project with a real failure probability, clinical "treat / test / wait" choices).
- The structure is sequential - a choice now opens chance events that open later choices ("test first or commit?").
- The stakes justify making the probability assumptions explicit and inspectable, so a disagreement becomes a disagreement about a named number rather than a clash of intuitions.

**Fails or misleads when (poor-fit / anti-patterns):**
- **The probabilities and values are guessed and then trusted.** A tree renders fabricated inputs in the authoritative grammar of arithmetic - the central failure mode: **false precision**. A number with no defensible source does not become trustworthy by being multiplied. Where the probability is the hard part, source a base rate with `think-reference-class-forecasting` instead of inventing one inside the tree.
- **The decision is a one-shot with intolerable downside.** EV is an average over many independent repetitions; the law of large numbers guarantees convergence across many bets, not on the single bet in front of you. A positive-EV gamble that includes a small probability of ruin is the wrong call for a one-time decision. The criterion there is risk of ruin or a risk-averse utility, not raw EV; treating the average as the answer is a category error. The worksheet must run the ruin check before recommending.
- **It is mistaken for descriptive truth.** EV is *normative* (what a coherent decider should do given those numbers), not a description of good judgment. People predictably violate it (Allais 1953; prospect theory, Kahneman and Tversky 1979) via the certainty effect and nonlinear probability weighting, and some of those deviations are real risk preferences the tree must **surface, not override**.
- **The outcome space cannot be enumerated or priced.** Deep uncertainty (you cannot list the outcomes, let alone probability them) and incommensurable values that resist a common scale both break the rollback and produce tidy-but-fictional EVs.
- **The call is reversible and low-stakes.** A two-way door does not need a tree; building one is its own small over-process. Triage with `think-one-way-vs-two-way-door` first.

## 6. Output artifact

The skill must emit a **decision tree with rolled-back expected values**, not prose: the decision in one line; the options; the tree with choice nodes (square) and chance nodes (circle), each chance fan's probabilities summing to one with a source per probability; the outcome values in a common unit (incommensurables noted); the rollback shown right to left with explicit arithmetic (chance node to EV, choice node to best branch); the recommendation (chosen option, its EV, and the path that produces it); the **what-flips-it** note (the single probability or value plus the threshold at which the choice flips); and a **ruin / risk** flag line. A short summary sits above the tree. The deliverable is never a bare EV number presented as the answer.

## 7. Sources

1. John von Neumann and Oskar Morgenstern, *Theory of Games and Economic Behavior* (Princeton University Press, 1944). The axiomatic foundation of expected-utility maximization. Foundational; S-tier *mathematics* (normative, not effectiveness evidence for the tool).
2. Leonard J. Savage, *The Foundations of Statistics* (Wiley, 1954). Subjective expected utility; the normative case for acting on personal probabilities. Foundational.
3. Howard Raiffa, *Decision Analysis: Introductory Lectures on Choices under Uncertainty* (Addison-Wesley, 1968). The founding applied text for decision trees and rollback. Practitioner / foundational.
4. Jong-Myon Bae, "The clinical decision analysis using decision tree," *Epidemiology and Health* 36 (2014): e2014025. Describes the four-stage tree method and states the limits explicitly - oversimplification (e.g. QALY indices), unquantifiable factors (harm, cost, patient preference), and that results "are not guaranteed as absolute." Teaching article; P. https://pmc.ncbi.nlm.nih.gov/articles/PMC4251295/
5. Rahul Mhaskar et al., "Concordance between decision analysis and matching systematic review of randomized controlled trials in assessment of treatment comparisons: a systematic review," *BMC Medical Informatics and Decision Making* (2014). Decision-analysis results concorded with matching RCT systematic reviews in 73% (27/37) of cases, and with single RCTs in only 50% - the one nameable comparative finding, and it bounds reliability. Survey / comparative; P. https://pmc.ncbi.nlm.nih.gov/articles/PMC4107557/
6. Maurice Allais (1953), "Le comportement de l'homme rationnel devant le risque" (*Econometrica*); the Allais paradox - systematic violation of the expected-utility independence axiom. The canonical evidence that EV is normative, not descriptive. Foundational (descriptive critique).
7. Daniel Kahneman and Amos Tversky, "Prospect Theory: An Analysis of Decision under Risk," *Econometrica* 47 (1979): 263-291. Models the certainty effect and nonlinear probability weighting - the predictable ways people depart from EV. S-tier descriptive research; bounds the tool's normative claim.
8. Stephen G. Pauker and Jerome P. Kassirer, "The Threshold Approach to Clinical Decision Making," *New England Journal of Medicine* 302 (1980): 1109-1117. Foundational application of decision-tree reasoning to clinical choice. Practitioner / foundational.

> **Verification status:** The mechanism descriptions (von Neumann and Morgenstern, Savage, Raiffa, Bae) and the normative-vs-descriptive split (Allais; Kahneman and Tversky) are well-attested and mutually consistent. The Bae (4) and Mhaskar et al. (5) findings were read via the PMC-hosted articles; the Mhaskar concordance figures (73% / 50%) are reported as that paper's results, not an independently audited constant. None of these gaps changes the conservative governing grade of P.

> **Excluded on the evidence rule:** no specific "decision-tree analysis improves decisions by N%" figure traces to a nameable primary source; none is counted toward the grade. The only quantitative claims used are Mhaskar et al.'s 73% / 50% concordance figures.
