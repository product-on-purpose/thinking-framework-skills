# Evidence Dossier: Scenario Planning (2x2)

> The single source of truth for the `scenario-planning` skill. The `SKILL.md`, the sidecar
> (`skill.meta.yml`), and the eval cases all derive from this file. If a claim is not here, it does
> not belong in the skill. Promoted from `frameworks/_proposed/scenario-planning/dossier.md` and
> admitted as a Build at tier P (correcting the candidate's stale `M`).

| | |
|---|---|
| **Skill** | `thinking-framework-skills.scenario-planning` (installable name `think-scenario-planning`) |
| **Family** | strategy-and-opportunity |
| **Evidence tier** | **P** governing (honest read M-down-to-P, capped at P - see "What the evidence shows") |
| **Confidence** | Moderate that multi-future construction breaks single-forecast anchoring and surfaces robust moves; low that any specific decision-outcome effect transfers to agents |
| **Status** | draft (admitted from the v0.5.0 catalog tranche; tier corrected M -> P on the field-expert and review evidence) |

---

## 1. The mechanism (what actually does the work)

Scenario planning, in its dominant "intuitive logics" / 2x2-matrix form, builds a small SET of internally consistent, deliberately divergent stories about the external future an organization will have to operate in but cannot control. The procedure: scan the driving forces shaping the domain; sort them by impact and by uncertainty; pick the two forces that are both high-impact and high-uncertainty (the "critical uncertainties"); cross them as the axes of a 2x2 grid; and treat each of the four quadrants as the seed of one plausible future, fleshed out into a short narrative. Strategy is then stress-tested against all four worlds, and the planner looks for moves that are robust (survive every quadrant), the early signals that would tell you which world is arriving, and the options worth keeping open.

The durable cognitive move is not the grid drawing. It is **constructing multiple alternative states of an uncontrollable environment at once, organized by the two axes of uncertainty that most change the strategic choice, and then judging strategy against the whole set rather than against a single forecast.** Two things distinguish it from ordinary planning: the object is the external world the planner does not control (not the planner's own plan or its consequences), and the output is a set of divergent futures held in parallel (not one prediction and not one preferred endpoint). The 2x2 is the most common packaging because two axes yield four contrasting worlds, which is enough variety to break single-future thinking without overwhelming a group.

The output is a **scenario set**: 2-4 contrasting, internally consistent short narratives of alternative external futures, named by the two critical-uncertainty axes, plus a **robustness read** of the strategy across them - which moves survive every world, which early signals indicate which world is arriving, and which options to keep open. The point is not the stories; it is the robustness read and the signal watch-list the stories make possible.

## 2. Lineage

Scenario planning's modern lineage runs through the RAND / Hudson Institute work of **Herman Kahn** in the 1950s-60s and, decisively, through **Royal Dutch / Shell**, where **Pierre Wack** and Edward Newland built the corporate scenario method beginning in the late 1960s and early 1970s; Wack's two 1985 Harvard Business Review articles, "Scenarios: Uncharted Waters Ahead" and "Scenarios: Shooting the Rapids," are the most-quoted papers in the field. **Peter Schwartz**, who led Shell's scenario team in the 1980s, founded the **Global Business Network (GBN)** in 1987 and popularized the practical method - including the 2x2 critical-uncertainties matrix - in his 1991 book *The Art of the Long View*. **Paul Schoemaker**'s 1995 *Sloan Management Review* article gives the canonical step-by-step build. Shell's preparedness for the 1973 oil shock is the founding anecdote.

The terms "scenario planning," "scenario analysis," and "2x2 scenario matrix" are generic and descriptive; the durable move is named for what it does (multi-future construction and robustness testing), and the skill ships documented descriptively with the lineage credited here rather than branded. The attribution string credits Pierre Wack / Royal Dutch Shell.

## 3. What the evidence shows, and what it does NOT show

The honest grade is **P (practitioner)**, and this dossier deliberately overturns the candidate **M** tag, which was too generous. The reason is that the controlled evidence is thin, contested, and partly cuts against the method's own marketing.

**What the record supports.** Scenario planning is a genuinely established, half-century-old practitioner method, taught widely and used across business and government, with a coherent rationale (counter single-future anchoring; test for robustness). There is one reasonably supportive controlled study: Meissner and Wulf (2013), an experiment with 252 graduate management students, found that scenario planning "reduces the framing bias" and "has a more positive effect on decision quality than tools traditionally used in strategic planning." That is real, nameable support for a cognitive (de-biasing) benefit - but the subjects were students, and the authors themselves frame the result cautiously, concluding only that such tools "may in fact alter biases and decision quality."

**What the record does NOT support.** The field's own most-cited author, Paul Schoemaker, calls the evidence of scenario planning's usefulness "anecdotal" (2004). The strongest empirical examination on real experts - Phadnis, Caplice, Sheffi and Singh (2015), three field experiments with transportation-infrastructure professionals - reports that their "extensive literature review unearthed only three experimental studies - all conducted with student subjects," that two of those (Kuhn and Sniezek 1996; Schoemaker 1993) "tested the effect of scenarios on subjects' confidence and reached contrary conclusions," and that "none of these studies definitively answer whether the use of scenarios affects managerial judgment in the ill-defined long-range planning problems faced in real-world situations." Phadnis et al.'s own finding is cautionary rather than confirmatory: scenarios did **not** uniformly raise or lower experts' confidence; instead "expert judgment changes in accordance with how an investment fares in a given scenario" - i.e. the scenario you show shifts the judgment toward itself - and experts ended up preferring "more flexible options." That is a behavioral / framing effect, not a demonstrated improvement in decision quality or accuracy. A separate strand of judgmental-forecasting research has even found that providing scenarios can worsen forecast accuracy under some conditions. The 2023 review of reviews (Cordova-Pozo and Rouwette) concludes the field "suffers from several methodological shortcomings," with no accepted definition and many divergent approaches; the realist-synthesis literature (Wright, Goodwin and Cairns) likewise finds academic evidence on the mechanisms and outcomes of scenario planning "notably lacking, despite a substantive practitioner evidence base."

A related design caution: Ramirez and Wilkinson (2014) show the 2x2 has hardened into a "somewhat simplistic, off-the-shelf tool" in which planners "compile a list of uncertain factors, from which only the two most important are selected" - a step that can discard the very interactions that matter and produce tidy quadrants with little content. This is why the procedure insists the two axes be genuinely independent and the worlds genuinely divergent.

Netting it out: the honest split is "M on a single student-subject de-biasing experiment / P-or-weaker once you weight the field-expert evidence, the contrary studies, and the most-cited scholar's 'anecdotal' verdict." Per this library's conservative rule, the governing grade is the lower half: **P**, not M. There is no robust, replicated S/M body on the actual move (multi-future construction improving real decisions) to launder upward; the one M-leaning study is outweighed by contrary and null findings on the population that matters.

## 4. Transferred-evidence flag (required honesty for this library)

Every study above is on human subjects - students or human experts - in workshop, lab, and field settings. None studies a scenario set produced by or with an AI agent, nor whether an agent-produced 2x2 improves a human's decision. The evidence is **transferred from human contexts and not validated for AI-augmented use**, which independently caps the grade at P. The AI value is mechanical and modest: an agent makes the method cheap to run, forces the discipline (a real driving-force scan, genuinely uncertain and independent axes, divergent and internally consistent worlds, an explicit robustness test), and produces a durable, inspectable artifact - benefits that do not depend on any contested outcome claim. The skill ships honestly as a P-tier divergence-and-robustness aid with a hard "this is not forecasting" wall, never as a predictor.

## 5. When it works / when it fails (drives the eval negative cases and "When NOT to Use")

**Works best when:**
- The planning horizon is long, the environment is genuinely turbulent, and the main forces (regulation, technology adoption, demand, geopolitics) are outside the planner's control and not reliably predictable.
- A strategy is quietly riding on a single implicit forecast, and it is worth knowing which moves hold up if that forecast is wrong.
- A high-stakes, hard-to-reverse bet needs stress-testing against more than one plausible future before commitment.

**Fails or misleads when (poor-fit / anti-patterns):**
- **It is treated as forecasting.** The four narratives are structured speculation, not probabilities; assigning likelihoods or acting on "the most likely quadrant" reintroduces exactly the single-future thinking the method exists to break. Even sophisticated users slip here. This is the central wall.
- **It is used to validate or path to one desired endpoint.** That is backcasting (fix one desired future, derive the path back), not multi-future construction; scenario planning refuses to pick a single future and derives no path.
- **It is used to trace one decision's ripples.** That is the futures-wheel (one consequence map radiating outward from one change), not a set of alternative external worlds.
- **It is used to imagine one specified failure.** That is the premortem (assume one plan failed, reason to causes); scenario planning is multi-future and not failure-anchored.
- **The two axes are chosen badly or for neatness.** Reducing a rich field of forces to two orthogonal axes can force a false structure (Ramirez and Wilkinson, 2014) and discard the interactions that matter.
- **The scenarios are not divergent or not plausible.** Four mild variations on the present, or one obvious utopia / dystopia pair, give the comfort of "done scenarios" with none of the benefit.
- **It is run as ritual with no link to a decision.** Producing narratives that no strategy is ever tested against is theater; the payoff is the robustness read and the watch-list of signals, not the stories.

## 6. Output artifact

The skill must emit a **scenario set**, not prose: the focal decision and horizon; the two named critical-uncertainty axes, each with its two contrasting poles; the 2x2 of named worlds (2-4), each a short, divergent, internally consistent narrative; and the **robustness read** - the robust moves that survive every world, the one-world bets, the gaps no move covers, the per-world signal watch-list, and the options worth keeping open. The worlds are framed as structured speculation, never ranked by likelihood. A short summary may sit above the set.

## 7. Sources

1. Pierre Wack, "Scenarios: Uncharted Waters Ahead," *Harvard Business Review* 63(5):73-89 (1985), and "Scenarios: Shooting the Rapids," *Harvard Business Review* 63(6):139-150 (1985). The foundational Shell account; most-cited in the field. Practitioner / foundational.
2. Peter Schwartz, *The Art of the Long View* (1991). Popularized the intuitive-logics / 2x2 critical-uncertainties method via GBN. Practitioner / foundational.
3. Paul J. H. Schoemaker, "Scenario Planning: A Tool for Strategic Thinking," *Sloan Management Review* 36(2):25-40 (1995). The canonical step-by-step build. Practitioner reference. (P) (See also Schoemaker's later "anecdotal"-evidence admission, 2004.)
4. Philip Meissner and Torsten Wulf, "Cognitive benefits of scenario planning: Its impact on biases and decision quality," *Technological Forecasting and Social Change* 80(4):801-814 (2013). Experiment, 252 graduate management students; found reduced framing bias and a more positive effect on decision quality than traditional planning tools, with the authors' own cautious hedge. The single most supportive controlled study; student subjects. (M-leaning experiment, student population.)
5. Shardul Phadnis, Chris Caplice, Yossi Sheffi and Mahender Singh, "Effect of scenario planning on field experts' judgment of long-range investment decisions," *Strategic Management Journal* 36(9):1401-1411 (2015). Three field experiments with real infrastructure experts; documents that prior empirical evidence was limited to three student-subject studies with contrary results, and finds scenarios shift judgment toward the scenario shown and toward flexible options rather than uniformly improving it. The strongest real-expert evidence, and cautionary. (Field experiments.)
6. Rafael Ramirez and Angela Wilkinson, "Rethinking the 2x2 scenario method: Grid or frames?," *Technological Forecasting and Social Change* 86:254-264 (2014). Critique of how the 2x2 matrix has become an oversimplified off-the-shelf tool and what reducing to two axes loses. (Critical literature.)
7. Kathya Lorena Cordova-Pozo and Etienne A. J. A. Rouwette, "Types of scenario planning and their effectiveness: A review of reviews," *Futures* 149:103153 (2023). Finds convergence on a definition but persistent methodological shortcomings and many divergent approaches; bounds claims of established effectiveness. (Review of reviews.)
8. George Wright, Paul Goodwin and George Cairns (and colleagues), realist-synthesis and critical work on scenario planning (e.g. "Opening the 'black box' of scenario planning through realist synthesis," *Technological Forecasting and Social Change*, 2020). Finds academic evidence on mechanisms and outcomes "notably lacking" despite a substantive practitioner base. (Critical literature.)

> Excluded on the evidence rule: no specific decision-quality or forecast-accuracy effect size for scenario planning is asserted as fact in this dossier, because no robust, replicated, primary-sourced figure exists on the actual move. The one nameable controlled effect (Meissner and Wulf's de-biasing result) is reported with its student-subject limitation, and the field-expert and review evidence are weighted against it to set the conservative governing grade of P.
