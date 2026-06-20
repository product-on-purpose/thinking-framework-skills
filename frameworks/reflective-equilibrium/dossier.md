---
title: Reflective equilibrium
slug: reflective-equilibrium
generated_status: true
---

> **Update (v0.11.0):** now shipped as a contested lens, caveat-first and explicit-request-only - see `think-reflective-equilibrium`. The evidence grade and the caveats below are unchanged; they are exactly why it ships caveat-first rather than as a default skill. Any "documented, not shipped" / "reject" wording below predates this decision.

<!-- STATUS:GENERATED (gen-site.mjs from frameworks/registry.mjs) - do not edit between these markers -->
<!-- /STATUS:GENERATED -->

## What it is

Reflective equilibrium is a method of justification by mutual adjustment. You hold two kinds of commitments at once: judgments about particular cases ("this layoff plan is unfair to the night-shift crew") and general principles ("treat equal contributors equally"). When they conflict, the method refuses to give either side automatic priority. You revise whichever member of the conflicting pair has less credibility on reflection - sometimes the principle bends to the case, sometimes the case judgment is overruled by the principle - and you iterate until the whole set of judgments and principles coheres. The state of coherence is the justification: nothing in the set is foundational, everything is revisable, and a belief is warranted by its fit with everything else you accept on reflection.

The wide variant (the one philosophers actually defend) adds a third tier: relevant background theories (about persons, procedural fairness, how judgments are formed), so that the principles are not merely an accidental summary of the starting intuitions but are pressure-tested against independent theory.

The durable cognitive move, named plainly: bidirectional revisability. The particular case is allowed to overrule the general rule, and the general rule is allowed to overrule the particular case, with the looser-fitting commitment giving way - as opposed to rule-following (the principle always wins) and ad hoc casuistry (the case always wins).

## When it helps / when it misleads

It helps as a stance more than as a procedure. When a stated value, policy, or principle collides with a strong judgment about a concrete case, the reflective-equilibrium stance blocks two failure modes at once: rigid rule-worship ("the policy says X, so X, however perverse the result") and unprincipled exception-making ("this case feels different, so ignore the policy"). It also names an honest truth about values work: principles are earned from cases as much as cases are judged by principles. In philosophy it is the de facto method of normative theorizing, and that is exactly the setting it fits: a years-long, community-checked construction of a theory, where peer critique substitutes for an external stopping rule.

It misleads in a bounded decision session, for three compounding reasons:

1. **No checkable termination condition.** "Equilibrium" has no external test. Nothing distinguishes "my commitments now cohere" from "I stopped looking for conflicts." An agent (human or LLM) running the method can always declare coherence, and the artifact would carry no evidence that the declaration is earned.
2. **Garbage in, equilibrium out.** The output is only as credible as the starting considered judgments. Richard Brandt's classic objection is that the method "may be no more than a reshuffling of moral prejudices" (Brandt 1979: 22); Peter Singer (2005) sharpened it with evolutionary debunking - if the intuitions are biological and cultural residue, polishing them into coherence does not make them evidence. For an LLM, whose "considered judgments" are training-distribution intuitions, the objection bites harder, not softer.
3. **License to rationalize.** Because the method permits revising principles to fit case judgments, a motivated reasoner can launder any preferred case outcome by quietly demoting the principle that forbids it, then report the result as a principled equilibrium. The method's own literature treats this as the central worry, and the method supplies no internal guard against it.

Even on its own idealized terms, convergence is not promised: Freivogel's (2023) simulations of the formal model found that different starting points reach identical equilibria only rarely (about 27 percent of pairs in his ensembles), although agreement improves (compatibility of positions roughly quadrupled, from 7 to 31 percent).

## What the evidence says

**Honest grade: C - conceptually plausible, philosophically central, empirically untested as a procedure.**

What exists:

- **Foundational and survey literature (not outcome evidence).** Nelson Goodman (1955) introduced the mutual-adjustment justification for rules of inductive logic; John Rawls (1971) named "reflective equilibrium" and made it the method of A Theory of Justice; Norman Daniels (1979, Journal of Philosophy 76(5): 256-282) developed the wide variant and later the standard survey (Daniels' Stanford Encyclopedia of Philosophy entry, 2003, revised). This establishes centrality and articulation, not effectiveness.
- **Formal models and simulations (in silico, not human or agent outcomes).** Beisbart, Betz and Brun (2021, Ergo 8(15): 441-472) built a formal model of the equilibration process and showed by computer simulation that it can be specified consistently and behaves plausibly. Freivogel (2023, Synthese 202) ran tens of thousands of simulation setups on that model and found rare full convergence with moderate agreement gains (figures above). This is the strongest empirical-adjacent work, and it tests the model, not people or working agents.
- **Case application (existence proof, n=1, no comparison).** Rechnitzer (2022, Springer) is the first explicit, step-by-step book-length application of the method, using it to justify a precautionary principle; it demonstrates the method can be operationalized by a trained philosopher over a book's length, which is itself a warning about session-scale use.
- **Process literature in empirical bioethics.** De Vries and van Leeuwen (2010, Bioethics) discuss integrating third-person empirical data into reflective equilibrium for medical ethics; methodological argument, no controlled outcomes.
- **AI-adjacent conceptual work (no outcome evidence).** Betz and Richardson (2022, Frontiers in Artificial Intelligence) frame neural language models as doxastic agents that could self-improve by equilibration; Brophy (2025, arXiv 2506.00415) argues wide reflective equilibrium is the right lens for LLM alignment processes such as Constitutional AI. Both are position pieces.
- **The critique line.** Brandt (1979) and Singer (2005) attack the credibility of the inputs; this critique is itself philosophy, but it has never been answered with empirical evidence that the procedure improves judgments.

What the evidence does NOT support: any claim that performing reflective equilibrium improves decision quality, moral judgment, consistency, or convergence in humans or AI agents. No controlled study of the procedure as an intervention was found in this run. There is no transferred evidence to flag because there are no adjacent human-subject outcome trials either; the grade is a clean C, not a capped split.

A grading note recorded for the registry's audit trail: one wave-3 external research run graded this method S by citing Rawls. That is the laundering pattern this library exists to prevent - philosophical centrality is pedigree, not outcome evidence. The adjudicated grade of C is confirmed by this run.

## Why it is / is not a skill here

**Verdict: Reject (document-only). The dossier is the product.** This confirms the preliminary registry verdict (cand/reject, evalDate 2026-06-11) and the wave-3 consensus (one run document-only, one run reject).

Honesty about distinctness first: this is NOT a fold. The bidirectional revise-the-weaker-commitment move is genuinely absent from the shipped catalog. The preliminary registry reasoning named overlap risk with double-crux and described belief-update-routine as folded; on inspection, double-crux is status excl (rejected, not shipped, so not a fold target), and belief-update-routine is in fact a shipped skill - but it is evidence-driven and one-directional (new evidence re-scores standing beliefs on a cadence) with no principle-case axis and no coherence target. What-would-have-to-be-true tests one position's load-bearing conditions; it does not adjudicate between a principle and a case. The overlap is real but moderate; none of it is decisive.

The rejection rests on evidence and operability, where the method fails the bar three ways:

1. **Tier C with the in-silico results mixed on the method's own promise.** The library ships honest-C skills when the mechanism is operational and the artifact is checkable; here the only empirical-adjacent work simulates an idealized formal agent, and even there full convergence is rare.
2. **No externally checkable termination test.** Every shipped skill emits an artifact a reviewer can audit. A reflective-equilibrium skill's artifact would terminate at "the set now coheres," which an agent can declare at will. The most likely behavior of an LLM running this skill is performing the ritual and rubber-stamping its starting intuitions - automating exactly Brandt's reshuffling objection. That is a harm vector, not just a quality gap: the output would look principled while being unconstrained.
3. **The usable kernel is one sentence, not a skill.** The genuinely valuable move - "a strong case judgment may legitimately revise the principle, not only the other way around" - is a stance that fits in a prompt line or another skill's guidance. It does not support a multi-step procedure with distinct intermediate artifacts. Within its family, the operational ethics work is carried by the build candidates: veil-of-ignorance-reasoning supplies the impartiality constraint, ethical-matrix supplies the parties-by-principles audit, and shipped belief-update-routine already covers disciplined revision over time on the epistemic side.

Family note (batch flag): reflective equilibrium is a general theory of justification - Goodman's original application was inductive logic, not ethics - so it could defensibly sit in meta-thinking-and-reflection. It is kept under ethics-values-deliberation because that is its canonical modern home and because this dossier serves as the new family's epistemological backbone: it explains why the family's working methods (veil-of-ignorance, ethical-matrix) impose external constraints rather than trusting coherence alone. The maintainer may re-home it without changing the verdict.

Proposed registry transition: cand -> excl (excluded on the merits, with the published dossier as the learning artifact), the cognitive-bias-checklist pattern for famous-but-unoperational methods.

## Lineage and who to read

The mutual-adjustment idea is Nelson Goodman's (Fact, Fiction, and Forecast, 1955), offered to justify rules of induction: rules and accepted inferences are corrected against each other. John Rawls (A Theory of Justice, 1971) coined "reflective equilibrium" and made it the working method of the century's most influential political philosophy; the term "considered judgments" is his. Norman Daniels (1979, and Justice and Justification, 1996) distinguished narrow from wide equilibrium and is the method's principal elaborator and defender; his Stanford Encyclopedia of Philosophy entry ("Reflective Equilibrium," 2003, revised) is the standard survey and the right first read.

The critics to read alongside: Richard Brandt (A Theory of the Good and the Right, 1979) for the input-credibility objection, and Peter Singer ("Ethics and Intuitions," The Journal of Ethics 9(3-4): 331-352, 2005) for the evolutionary-debunking attack on the considered judgments themselves.

The modern formal turn is the Bern-Karlsruhe group: Claus Beisbart, Gregor Betz and Georg Brun ("Making Reflective Equilibrium Precise: A Formal Model," Ergo 8(15): 441-472, 2021; simulation code published), Andreas Freivogel ("Does reflective equilibrium help us converge?", Synthese 202, 2023), and Tanja Rechnitzer (Applying Reflective Equilibrium, Springer 2022, open access), the first explicit end-to-end case application. For the AI-adjacent line, Gregor Betz and Kyle Richardson ("Judgment aggregation, discursive dilemma and reflective equilibrium: Neural language models as self-improving doxastic agents," Frontiers in Artificial Intelligence 5: 900943, 2022) and Matthew Brophy ("Wide Reflective Equilibrium in LLM Alignment," arXiv 2506.00415, 2025).
