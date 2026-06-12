# Eval cases: think-ethical-matrix

> Trigger and output evaluation, derived from `SKILL.md` and `evidence/dossier.md`. No runner yet (a harness is deferred); these are the cases to check by hand, or to wire into evals later.

## Should trigger

- "We're about to ship a default-on clause that trains our models on free-tier users' data. Map out who this helps and who it burdens across wellbeing, autonomy, and fairness - and make sure the people whose data flows through but never agreed get represented."
- "This policy affects farmers, consumers, animals, and the environment differently, and the debate keeps jumping between groups and principles. Build me a grid that crosses every affected party against a fixed set of ethical principles so the trade-offs stop hiding."
- "I want an ethical analysis of this feature that doesn't just pick a side - lay out, cell by cell, how it affects each stakeholder on each principle, including future generations, and show me where one group's benefit is paid for by another group's cost."
- "Give me an ethical matrix for this siting decision: rows for the affected communities and the ecosystem, columns for wellbeing, autonomy, and fairness, each cell marked factual or contested, and a read of who bears which burden."
- "There's a real moral trade-off here and some of the affected parties (future users, the broader ecosystem) have nobody speaking for them. Structure the impacts so we can argue about specific cells instead of vague unease, but don't hand me a verdict."
- "Cross-reference the parties this AI system affects against fairness, autonomy, and wellbeing, tag the contested cells, and tell me which trade-offs the whole judgment turns on - I'll do the weighing myself."

## Should NOT trigger (wrong tool / near-miss)

- "We've filled in the ethical matrix - now score each cell, weight the principles, and tell me whether to ship." (near-miss: the matrix maps the terrain and does NOT weigh it; it emits no score and no verdict. Schroeder and Palmer, 2003 show it is helpful for fact-finding but "much less helpful" for weighing. Produce the trade-off pattern and the contested cells; do not aggregate to a recommendation.)
- "Score these three vendor options against our weighted criteria - cost, security, integration - and recommend the best one." (this is option-versus-criteria scoring aggregated to a recommendation, which is `think-decision-option-review`, not a one-proposal impact map across affected parties against impartial principles.)
- "We can't even agree on who counts as a stakeholder here - half the team says the gig workers are affected and half says they aren't. Settle that first." (when frame membership is the live dispute, audit the boundary with `think-boundary-critique` first; the matrix takes its row roster as given and evaluates impacts on it.)
- "What would our small-business customers actually say about this change if we asked them?" (voicing each included party's perspective is the stakeholder-lens mode of `think-parallel-perspectives-review`; the matrix types the option's impact on each party against fixed principles - including parties that cannot be role-played - rather than voicing perspectives.)
- "Just tell me if launching the free tier is the right strategic call." (no concrete proposal with a moral trade-off across affected parties to map; if it is a strategic-robustness question use `think-scenario-planning`, and the matrix issues no verdict in any case.)
- "Summarize what the team shipped this quarter for the board update." (unrelated.)

## Output checks (a good output must)

- [ ] State the **option under analysis in one line** - a single concrete proposal, not a set of options to score.
- [ ] List **affected-party rows** that explicitly include any **voiceless parties** (non-human, future, or absent), each marked - not only the parties present to speak.
- [ ] State the **principle columns** (wellbeing, autonomy, fairness by default), with any adaptation made **deliberate and justified**, never silent.
- [ ] Fill **every cell** with a concrete **impact specification** (how the option affects THIS party on THIS principle), not a perspective voicing and not a blank.
- [ ] Tag **every cell** **[factual]** or **[contested]**, so the value judgments surface instead of hiding in cell wording.
- [ ] Include a **trade-off pattern read-out** naming which groups bear which burdens and where one party's benefit is paid for by another's burden.
- [ ] Close with an explicit **no-verdict footer** - the matrix maps and does not weigh, with no score, no ranking, and no recommendation.
- [ ] **Not overclaim:** carry the **evidence caveat** (tier P, practitioner-grade, transferred from human deliberation, no controlled study, none on agents) into the artifact; claim a trade-off-mapping aid, not a measure of how ethical the option is and not a verdict.

## Value vs unaided baseline

Asked the same question, a strong model tends to write a balanced ethical essay that names some stakeholders and gestures at some principles, then quietly slides toward a recommendation ("on balance this seems acceptable if you add an opt-out"). It rarely holds both axes at once, so it misses the specific trade-offs - a benefit to one party paid for by a burden on another, on a different principle - that only the cross-referencing surfaces. It almost never gives a row to parties who have no voice (the end-customers whose data flows through, the future users who inherit the norm), and it tends to blur factual claims and contested value judgments together in fluent prose. This skill forces that discipline: a real affected-party roster including voiceless rows, an explicit and stated principle set, a checkable impact specification in every cell tagged factual or contested, a trade-off pattern read-out that names who pays for whose benefit, and a hard refusal to aggregate to a score or a verdict. It converts a balanced-sounding essay that hides its judgments into a grid whose judgments are visible and contestable cell by cell - and stops at mapping, leaving the weighing to the people who must decide.
