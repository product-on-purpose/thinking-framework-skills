---
title: Objectives-first alternative generation
slug: objectives-first-alternative-generation
generated_status: true
---

<!-- STATUS:GENERATED (gen-site.mjs from frameworks/registry.mjs) - do not edit between these markers -->
<!-- /STATUS:GENERATED -->

## What it is

Most decisions start from the options already on the table. Ralph Keeney (1992) calls this default "alternative-focused thinking": a person notices two or three options, then picks criteria to compare them. Objectives-first alternative generation reverses the order. The decision maker states what they want from the decision before any option is considered, and the objectives then produce the options.

The move has five steps.

1. **Unaided list.** The decision maker lists everything they want to achieve with this decision, with no options in view.
2. **Completeness challenge.** The list is challenged on the assumption that it is incomplete. The challenge is a direct warning ("people usually miss several important objectives; add more"), followed by a recognition check against category names or a master list of objectives for this kind of decision. Every objective the check recovers is added and marked as recovered.
3. **Means-ends sort.** Each objective gets one question: "why does this matter?" If the answer is another objective on the list, the first one is a means objective, a way of getting the second. The fundamental objectives, the ones valued for their own sake, become the objective set. The means objectives are kept as links, because they are useful seeds in the next step.
4. **Per-objective generation.** Each fundamental objective is taken in turn, alone. The question is "what alternative would serve this objective best, if it were the only one?" Each alternative is tagged with the objective that produced it.
5. **Hand-off.** The alternatives are deduplicated, and the expanded list is handed on with the objective set, which becomes the criteria for a separate comparison step. Nothing is scored or chosen here.

The output is an **objectives-to-alternatives sheet**. It holds the fundamental objectives, the means-ends links, a log of what the completeness challenge added, and the expanded alternatives, each tagged with its source objective.

The durable cognitive move is the order and the cueing, not the hierarchy diagram. Two parts carry it: a completeness challenge on objectives before any option exists, and the use of each objective as a separate generator of alternatives.

**How an agent should run it.** People and models fail at this task in different ways, so the skill needs a different guard for each. The human failure that Bond, Carlson and Keeney (2008) measured is omission: people leave out objectives they hold and later recognize. The model failure that Simon and Siebert (2025) measured is over-inclusion: model-generated sets carry means objectives, redundant objectives and nonessential ones. The completeness challenge answers the first failure. A separate critique pass, which strips means objectives and duplicates from any model-proposed set, answers the second. The decision maker's own list comes first. An agent's suggested objectives come afterwards, as a recognition list, and never as starting examples, because sample objectives were among the weaker prompts in Bond, Carlson and Keeney (2010).

## When it helps / when it misleads

It helps when a consequential decision's option set came from whatever was at hand. A choice that feels like "the least bad of two" is the typical signal. It also helps when a decision opportunity, rather than a problem, is on the table, and when several stakeholders must state what they want before planning starts. The strongest field test is a public-planning case of that kind (Haag, Zürcher and Lienert 2019).

It misleads or wastes effort in these cases, which are the skill's "When NOT to use" walls.

- **The options are genuinely fixed.** A ratification vote or a forced binary choice leaves no room to create alternatives. Use `think-decision-option-review` to compare, or `think-one-way-vs-two-way-door` to set the depth of deliberation.
- **The task is to score or choose.** This skill never weighs, scores or picks. Comparison is `think-decision-option-review`, which runs afterwards and can take the objective set as its criteria.
- **The real question is the problem's altitude or framing.** Climbing one "why" chain to choose a working level is `think-abstraction-laddering`. Generating rival framings is `think-problem-restatement`. This skill takes the decision as framed and asks what the decision maker wants from it.
- **The solution is a configuration.** Keeney's strategy tables combine one choice per dimension, which is a morphological box. Combining the per-objective alternatives into packages is `think-morphological-analysis`, and this skill hands off to it.
- **The decision is trivial or cheaply reversible.** The ceremony costs more than a missed objective.
- **The real issue is a conflict of values between parties.** Separating positions from interests is `think-interest-based-negotiation`, and weighing duties to several parties is `think-ethical-matrix`.
- **An agent would supply the objectives in place of the decision maker.** Model-generated objective sets are individually plausible but flawed as sets (Simon and Siebert 2025). The objectives belong to the person deciding, and a model's list is a prompt for their recognition, not a substitute.
- **The claim is better decisions.** No study shows that the move improves final decisions or their outcomes. The skill can claim a more complete objective set and a wider option set, and nothing more.
- **The goal is volume.** One independent study found that the value-focused condition produced fewer ideas, though they were rated more creative and innovative (Selart and Johansen 2011). The skill should not be sold as a quantity booster.

## What the evidence says

**Governing grade: M, narrow.** The honest read is split by step, and the split is stated here in full. The checks made on 2026-10-20 read abstract and publisher-release text as web search returned it; no full text was read, and no page was opened directly.

| Step or claim | Honest read | Basis |
|---|---|---|
| Objectives are incomplete, and a challenge recovers them | M, independently replicated | Bond, Carlson and Keeney 2008 and 2010; Haag, Zürcher and Lienert 2019; León 1999 |
| Objectives used as cues widen the alternatives | M, leaning lower; the quantity effect is not uniform | Siebert and Keeney 2015; Butler, Scherer and Reiter-Palmon 2003; Selart and Johansen 2011 (contrary on quantity) |
| The means-ends sort, as a step on its own | C | No study isolates its benefit; it is Keeney's normative structure |
| Better final decisions | Not shown | Arvai, Gregory and McDaniels 2001 is too small and too coarse to carry it |
| An agent running the move | One direct study, cautionary | Simon and Siebert 2025 |

**Objective completeness (M).** Bond, Carlson and Keeney (2008) ran three studies on consequential personal decisions. Participants "consistently omitted nearly half of the objectives" they later identified as personally relevant. The omitted objectives were rated "almost as important" as the ones participants generated on their own. A case study of strategic decision making at a high-tech firm replicated the result. Bond, Carlson and Keeney (2010) tested ways to fix the omission in three experiments. Category names, and a direct challenge paired with a warning that important objectives are missing, helped most. Both raised the number of objectives without lowering their quality, and sample objectives helped less. Haag, Zürcher and Lienert (2019) is the independent field replication, with stakeholders in real wastewater-planning decisions. Its abstract concludes that most decision makers need help to generate their objectives, and that adding a master list to plain brainstorming is a low-effort improvement. The 2026-10-19 wave-4 record reports from the same abstract that the study had 71 stakeholders, and that the master list was the only intervention that helped substantially. The abstract names category cues as one of the tested interventions and says a master list was the only one that substantially increased the objectives. That implies, without stating it, that category cues did not, which partly conflicts with Bond, Carlson and Keeney (2010). León (1999) is a second independent line: value-focused thinking produced a more inclusive representation of the decision than thinking that started from alternatives. That finding is seen here only through Bond, Carlson and Keeney's (2008) summary.

**Objective-cued alternative generation (M, leaning lower).** Siebert and Keeney (2015) ran five empirical studies of important personal decisions. In the first, participants identified fewer than half of the alternatives available to them. The alternatives they missed were, on average, as good as the ones they found. In the other four, using objectives to stimulate the search raised both the number and the quality of the alternatives created. The abstract does not say whether the participants or independent judges rated the quality. Butler, Scherer and Reiter-Palmon (2003) is independent support from creativity research. Presenting two conflicting objectives one after the other produced more solutions, more solution categories and more effective solutions than presenting them together or not at all. The same study adds a qualification: effective solutions may be generated more efficiently by considering the objectives together. The prompt helped most for people low in need for cognition. Selart and Johansen (2011) is the contrary result. In an idea-management study with employees, the value-focused condition produced fewer ideas, but those ideas were rated higher for creativity and innovativeness. So the quality direction holds across three groups, and the quantity direction does not.

**The means-ends sort (C).** No study located isolates the benefit of separating fundamental objectives from means objectives. The rule comes from Keeney's normative account of a good objective set, which should be essential, non-redundant and decomposable (Keeney 1992, 1996). The step stays in the skill for a structural reason, not an empirical one: without it, the per-objective generation step generates from means as if they were ends, and the hand-off would give the comparison step overlapping criteria.

**Decision quality (not shown).** Arvai, Gregory and McDaniels (2001) compared eight value-focused workshop groups with six conventional, alternative-focused groups on a salmon-habitat risk decision. The abstract reports "more thoughtful and better informed" decisions in the value-focused groups. It does not describe how decision quality was measured, and fourteen groups cannot carry a general claim. No other study located tests final decisions or outcomes.

**Why M and not S.** Run C of the wave-4 research graded the move S, and that grade does not hold. The outcomes are counts of objectives and alternatives, with rated importance or quality. Most samples are students making personal decisions. Most of the controlled line comes from one author network, Keeney with Bond, Carlson and Siebert. The quantity effect on alternatives is contested by an independent study, and no study shows better decisions.

**Why M and not P.** The outcomes are proximal, but they are the move's own claimed effect. The artifact is a list of objectives and alternatives, so the completeness and quality of that list is the direct outcome, not a proxy for it. The evidence comes from controlled experiments on the actual move, not on a cousin, and the core omission finding replicates outside the originating network. The library shipped `think-consider-the-unknowns` at M on the same footing: all-human, mostly student evidence on the move's own proximal outcome, which in that case is confidence calibration.

**Demotion trigger.** The grade drops to P if the 2015 quality ratings turn out to be participants' self-ratings and no judge-rated quality gain exists elsewhere. In that case the generation half is P, and the governing grade follows it. The rating method could not be determined from the abstract on 2026-10-20. Butler, Scherer and Reiter-Palmon (2003) and Selart and Johansen (2011) report judged effectiveness or creativity, which supports the quality direction, but neither tests Keeney's full procedure.

**Transfer caveat (required).** Every human study above measured people. The human failure is retrieval: people do not recall objectives they hold, and a warning plus a recognition list recovers them. An agent's bottleneck is different, as Simon and Siebert (2025) show. They compared objective sets from four commercial models (GPT-4o, Claude 3.7, Gemini 2.5 and Grok-2, as the INFORMS release names them) with expert sets from six published decision analyses, scored on nine value-focused-thinking criteria. The 2026-10-19 record checked two quotations in the abstract: "most of the GenAI objectives are viable individually, but the sets as a whole are highly flawed", and the sets include means objectives "even when explicitly instructed not to". Prompting best practice combined with decision-analysis expertise produced smaller, more focused and better-structured sets. The agent line does not raise the human grade, and it does not lower it either. It does define the agent guard, and it shows that the human evidence transfers to agents only for the elicitation step's purpose, not for its failure mode. No study tests an agent running objective-cued alternative generation.

**Excluded figures (required).** The following figures appear in the research runs but were not checked against a primary source on 2026-10-20, so they are excluded as fact and did not influence the grade.

- Run C's "5.9 objectives unprompted against 14.3 recognized" is not in the Bond, Carlson and Keeney (2008) abstract.
- Run C's Morningstar figure is a vendor figure.
- The figures of 37 percent of alternatives identified and a 53 percent rise come from a University of Bayreuth press release, not from the paper's tables.
- Bond, Carlson and Keeney (2010)'s means of 9.2 against 12.7 objectives, the N of 158, and 10.8 against 7.9 missed objectives come from the full text as runs A and B report it.
- Simon and Siebert (2025)'s median completeness of 2.75 of 7, and a Cliff's delta of 0.386 for critique and revision, come from the full text as run A reports it.

## Why it is / is not a skill here

**Verdict: Build, as a candidate.** The distinctness burden is met by mechanism, not by scope.

**The move it adds.** It adds a completeness challenge on the decision's objectives before options exist, then uses each fundamental objective, alone, as a generator of alternatives. No shipped skill contains either half.

**Overlap with the closest shipped skills.**

| Shipped skill | Overlap | Why |
|---|---|---|
| `think-abstraction-laddering` | High on one step, a fifth to a quarter overall | The means-ends sort asks "why does this matter?", which is the ladder's upward question. The ladder climbs one chain from one entry rung to choose a working altitude, and its "When NOT to use" says it does not generate solutions. |
| `think-decision-option-review` | Medium, about a sixth | Both list what matters, and the objective set becomes its criteria downstream. It starts from existing options at step 1, has no objectives step before options, and excludes generating options. |
| `think-problem-restatement` | Medium-low | Its goal-versus-implementation move is one of five reframing moves, and it converges on a problem frame, not on objectives or alternatives. |
| `think-consider-the-unknowns` | Low | Its "list what is missing" prompt is the nearest analogue of the completeness challenge, but it applies to evidence behind a judgment, not to objectives. |
| `think-morphological-analysis` | Low, with one real adjacency | Keeney's strategy tables are a morphological box. This skill never combines alternatives into configurations; it hands off. |
| `think-question-burst`, `think-what-would-have-to-be-true` | Low | One produces ranked questions; the other lists conditions for an option that already exists. |

**Why not a fold into Decision Option Review.** One of three wave-4 research runs said fold. The prior registry row answered that a fold "would change that skill's scope". That is a statement about where the boundary sits, not a distinctness argument, and this vetting replaces it. The mechanism argument is that Decision Option Review has no step that elicits objectives before options, and no step that generates options. Folding the move in would graft a generation stage onto an evaluation skill. The library rejected that bundle shape for Kepner-Tregoe, which became a recipe because its parts belong to different skills. The order matters too. Keeney's point is that objectives come before options, while Decision Option Review lists options first, by design.

**Why not a recipe.** The candidate chain is Abstraction Laddering, then Decision Option Review. It yields one purpose chain from one entry rung, and criteria attached to options that already existed. Neither the completeness challenge nor per-objective generation appears anywhere in it. Adding Question Burst or Brainwriting adds ideation that no objective cues. No chain of shipped skills produces the move.

**Design constraint that keeps it under the ceiling.** The means-ends sort must stay one "why does this matter?" test per listed objective. It must not grow into a built ladder. A question about the decision's altitude routes to `think-abstraction-laddering`. With that constraint, the largest overlap sits at about a fifth, at the edge of the ceiling.

**The hard wall against the nearest skill.** Abstraction Laddering moves one problem along one vertical axis and selects one rung. Objectives-first alternative generation enumerates many objectives, challenges the set for completeness, sorts means from ends with one question each, and generates alternatives from each end. It never selects an altitude, and the ladder never generates alternatives.

**Not a pm-skills method.** Decision analysis is cross-domain. The evidence spans personal decisions (Bond, Carlson and Keeney; Siebert and Keeney), a corporate strategy case (Bond, Carlson and Keeney 2008), public planning (Haag, Zürcher and Lienert 2019) and environmental risk (Arvai, Gregory and McDaniels 2001). Nothing ties it to product work, so it stays in this library.

**Proposed artifact and walls.** The artifact is the objectives-to-alternatives sheet described above. The "When NOT to use" walls are the nine listed in the section on when it misleads. Two of them carry the evidence: the skill makes no claim of better decisions, and an agent's objectives never replace the decision maker's.

**An enrichment lead, separate from this verdict.** Bond, Carlson and Keeney (2008, 2010) apply to any list of criteria, including step 2 of Decision Option Review, where the criteria are defined. A completeness challenge there would be a modest enrichment of that skill. It belongs in the backlog as its own dated decision item, whatever happens to this candidate.

## Lineage and who to read

**Ralph L. Keeney** set out the method in *Value-Focused Thinking: A Path to Creative Decisionmaking* (Harvard University Press, 1992). He restated its procedures for identifying decision opportunities and creating alternatives in a 1996 *European Journal of Operational Research* article, with a BC Hydro application. The method builds on the multi-attribute foundation of Keeney and Raiffa's *Decisions with Multiple Objectives* (1976). Its popular form is the PrOACT sequence in Hammond, Keeney and Raiffa's *Smart Choices* (1999). The controlled line comes from **Samuel D. Bond and Kurt A. Carlson** with Keeney (2008, 2010), and from **Johannes Ulrich Siebert** with Keeney (2015). Siebert also co-wrote the first peer-reviewed test of model-generated objectives, with **Jay Simon** (2025). The independent replications come from **Orfelio G. León** (1999) and from **Fridolin Haag, Sara Zürcher and Judit Lienert** at Eawag (2019). **Joseph Arvai, Robin Gregory and Timothy McDaniels** carried the method into deliberative risk communication. For the creativity-research side, read **Adam Butler, Lisa Scherer and Roni Reiter-Palmon** (2003), and for the contrary result on quantity, **Marcus Selart and Svein Tvedt Johansen** (2011).

**IP.** "Value-Focused Thinking" is Keeney's academic term. A Justia record of USPTO data shows a service-mark registration, VALUE-FOCUSED THINKING (Reg. No. 1748989, Class 41, training seminars in management), with Ralph L. Keeney as correspondent. The record shows it registered on 1993-01-26 and cancelled on 1999-08-02 under Section 8. Justia is a third-party aggregator, and the USPTO's own record was not read on 2026-10-20. No live mark is known, so the entry is documented under a descriptive name and is not flagged as branded.

### Named sources

- Ralph L. Keeney, *Value-Focused Thinking: A Path to Creative Decisionmaking* (Harvard University Press, 1992). The method's founding statement. Foundational, normative. (P)
- Ralph L. Keeney, "Value-focused thinking: Identifying decision opportunities and creating alternatives," *European Journal of Operational Research* 92(3) (1996): 537-549. The procedures for creating alternatives from values, with a BC Hydro case. Conceptual, no outcome test. (P)
- Samuel D. Bond, Kurt A. Carlson and Ralph L. Keeney, "Generating Objectives: Can Decision Makers Articulate What They Want?" *Management Science* 54(1) (2008): 56-70. Three studies and a field case; people omit nearly half of the objectives they later recognize. Experimental. (M)
- Samuel D. Bond, Kurt A. Carlson and Ralph L. Keeney, "Improving the Generation of Decision Objectives," *Decision Analysis* 7(3) (2010): 238-255. Three experiments on prompts; category names and a challenge with a warning help most. Experimental. (M)
- Orfelio G. León, "Value-Focused Thinking versus Alternative-Focused Thinking: Effects on Generation of Objectives," *Organizational Behavior and Human Decision Processes* 80(3) (1999): 213-227. Independent; value-focused thinking yields a more inclusive representation, seen here through a secondary summary only. Experimental. (M, unread)
- Fridolin Haag, Sara Zürcher and Judit Lienert, "Enhancing the elicitation of diverse decision objectives for public planning," *European Journal of Operational Research* 279(3) (2019): 912-928. Independent field replication with stakeholders; a master list helps. Experimental. (M)
- Johannes Ulrich Siebert and Ralph L. Keeney, "Creating More and Better Alternatives for Decisions Using Objectives," *Operations Research* 63(5) (2015): 1144-1158. Five studies; people find fewer than half of their alternatives, and objectives raise number and quality. Experimental; quality-rating method unknown from the abstract. (M, lower end)
- Adam B. Butler, Lisa L. Scherer and Roni Reiter-Palmon, "Effects of Solution Elicitation Aids and Need for Cognition on the Generation of Solutions to Ill-Structured Problems," *Creativity Research Journal* 15(2-3) (2003): 235-244. Independent; objectives presented one after the other yield more and more effective solutions. Experimental. (M, adjacent procedure)
- Marcus Selart and Svein Tvedt Johansen, "Understanding the role of value-focused thinking in idea management," *Creativity and Innovation Management* 20(3) (2011): 196-206. Independent; fewer ideas, rated more creative and innovative. Experimental, contrary on quantity. (M, mixed)
- Joseph L. Arvai, Robin Gregory and Timothy L. McDaniels, "Testing a Structured Decision Approach: Value-Focused Thinking for Deliberative Risk Communication," *Risk Analysis* 21(6) (2001): 1065-1076. Eight value-focused groups against six conventional groups. Small group comparison; quality measure not described in the abstract. (P)
- Jay Simon and Johannes Ulrich Siebert, "ChatGPT vs. Experts: Can GenAI Develop High-Quality Organizational and Policy Objectives?" *Decision Analysis* (published online 2025-11-11). Model objective sets against expert sets on six cases. Peer-reviewed agent study, cautionary. (M for the narrow claim that unaided model sets are flawed)

> Excluded under the evidence rule: run C's 5.9 against 14.3 objectives, run C's Morningstar vendor figure, the press-release 37 percent and 53 percent figures, and the full-text figures for Bond, Carlson and Keeney (2010) and Simon and Siebert (2025) that runs A and B report. None was checked against its primary source on 2026-10-20, and none counts toward the grade. Butler and Scherer (1997, *Organizational Behavior and Human Decision Processes* 72(2): 184-202) was located but its abstract was not seen, so it is not cited as evidence.
