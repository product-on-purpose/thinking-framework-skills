# Evidence Dossier: Ethical Matrix

> The single source of truth for the `ethical-matrix` skill. The `SKILL.md`, the sidecar
> (`skill.meta.yml`), and the eval cases all derive from this file. If a claim is not here, it does
> not belong in the skill. Promoted from `_local/proposed-builds/ethical-matrix/dossier.md` and
> admitted as a Build at tier P (confirming the candidate's preliminary P grade).

| | |
|---|---|
| **Skill** | `thinking-framework-skills.ethical-matrix` (installable name `think-ethical-matrix`) |
| **Family** | ethics-values-deliberation |
| **Evidence tier** | **P** governing (practitioner; no controlled outcome study exists - see "What the evidence shows") |
| **Confidence** | Moderate that principled cross-referencing surfaces trade-offs a single-axis analysis hides; low-to-none that any decision-quality effect transfers to agents (no controlled study exists, and none is on agents) |
| **Status** | draft (admitted from the v0.7.0 ethics-values-deliberation tranche; this is the family's anchor artifact-producer) |

---

## 1. What it is (the mechanism that does the work)

The ethical matrix is a two-axis impact grid for moral trade-offs. The rows are the affected parties - deliberately including parties who cannot speak for themselves, such as animals, ecosystems, and future generations. The columns are a small, fixed set of prima facie ethical principles: wellbeing (beneficence and non-maleficence collapsed into one), autonomy, and fairness (justice). Each cell answers one concrete question: how does the option under consideration affect THIS party on THIS principle. The filled grid is then read as a pattern, not summed as a score: which group bears burdens on which principle, where a benefit to one group is paid for by a different group on a different principle, which cells state checkable facts and which encode contested value judgments.

The durable cognitive move is **principled cross-referencing**: forcing an impact specification at every party-by-principle intersection so that the trade-offs a single-axis analysis hides (stakeholders alone, principles alone, or a decision-maker's own criteria) become visible and individually contestable. The column set is Beauchamp and Childress's biomedical principlism, adapted by Ben Mepham in the mid-1990s for judging agri-food biotechnologies; principlism is therefore this method's column apparatus, not a separate candidate method.

Two design choices matter and are frequently misunderstood. First, **the matrix maps the moral terrain; it does not weigh it.** Mepham and the subsequent methodological literature are explicit that the grid is not an algorithm and emits no verdict - the weighing happens in deliberation over the filled grid. Second, **the cells are impact specifications** ("how does the option affect the wellbeing of small producers"), not perspective voicings ("what would small producers say"). That distinction is what separates it from stakeholder perspective-taking.

The output is an **ethical matrix**: a party-by-principle impact grid, each cell tagged factual or contested, a trade-off pattern read-out naming which groups bear which burdens on which principles, and an explicit no-verdict footer. The point is not a filled grid that looks rigorous; it is the trade-off pattern the grid makes visible and contestable.

## 2. Lineage

Ben Mepham, a bioethicist at the University of Nottingham's Centre for Applied Bioethics and a founder of the UK Food Ethics Council, developed the matrix in the mid-1990s as a tool for public and policy deliberation on food and bioscience technologies; the canonical journal statement is Mepham (2000). The column apparatus descends directly from Tom Beauchamp and James Childress, *Principles of Biomedical Ethics* (first edition 1979), whose four prima facie principles (respect for autonomy, beneficence, non-maleficence, justice) Mepham collapsed and renamed for affected-party analysis - wellbeing folds beneficence and non-maleficence together, autonomy is retained, and fairness stands in for justice.

The Norwegian line - Matthias Kaiser and Ellen-Marie Forsberg at the National Committee for Research Ethics - took the matrix into participatory practice (fisheries, GM fish), and the EU FP5 "Ethical Bio-TA Tools" project produced the 2006 *Ethical Matrix Manual*. Doris Schroeder and Clare Palmer wrote the standard critique (2003); Matthew Cotton evaluated it in deliberative practice (2009); Forsberg's "Pluralism, the Ethical Matrix, and Coming to Conclusions" (2007) addresses the weighing problem head-on. The modern revival is Cathy O'Neil and Hanna Gunn's adaptation for algorithmic auditing (2020), used commercially by O'Neil's audit firm ORCAA.

The method name "ethical matrix" is generic and descriptive; it is documented descriptively with the lineage credited here rather than branded, and the attribution string credits Ben Mepham (with the principle columns credited to Beauchamp and Childress and the AI-audit adaptation to O'Neil and Gunn).

## 3. When it helps and when it misleads (drives the eval cases and "When NOT to Use")

**Helps when** a concrete proposal, technology, policy, or feature has multiple affected parties and a genuine moral trade-off among them: who gains, who pays, and on what dimension. It is strongest where some affected parties have no voice (non-human, future, or absent groups get a row whether or not anyone in the room represents them), where an "is this ethical?" debate keeps sliding between groups and principles without anyone noticing the slide, and where a group needs a shared, inspectable structure so that disagreement attaches to specific cells rather than to vague unease. The documented uses run from GM crops and fisheries policy to radioactive-waste siting and algorithmic audits, which is good evidence the apparatus travels across domains.

**Misleads, and should not be used, when:**

- **It is presented as a decision calculator.** The matrix cannot weigh the problems it uncovers; Schroeder and Palmer (2003) showed it is helpful for unpacking and fact-finding but "much less helpful" for weighing. A filled grid presented as an answer is the method's signature abuse. This is the central wall.
- **The choice is an optimization among options scored on the decider's own criteria.** That is a weighted option matrix (`think-decision-option-review`), a structurally different tool: options by criteria, aggregated to a recommendation. The ethical matrix maps one proposal's impacts on affected parties against impartial principles and deliberately refuses to aggregate.
- **The membership of the frame is itself the contested question.** The matrix takes its row roster as given; if who counts as affected is the live dispute, audit the boundary first (`think-boundary-critique`), then populate the rows.
- **The fixed principle columns are imposed unreflectively.** Cotton (2009) found in deliberative settings that the top-down principlist columns can crowd out the values participants actually hold; the columns may be adapted (Schroeder and Palmer propose solidarity and a future-generations row), but adaptation should be deliberate and stated.
- **It is run as completeness theater.** A fully populated grid looks rigorous while the substantive judgments hide inside cell wording; the cells must be read as claims to challenge, not boxes ticked.

## 4. What the evidence shows, and what it does NOT show

The honest grade is **P (practitioner)**, and the preliminary registry grade of P is confirmed. The method has roughly twenty-five years of documented professional application across multiple domains, a peer-reviewed methodological literature including critical evaluations, an EU-project practitioner manual, and current commercial use in algorithmic auditing.

What the evidence does **NOT** contain is any controlled outcome study. No experiment measures whether matrix users produce better, more complete, or more defensible ethical assessments than non-users, and no effect size exists to quote (none is quoted here). The case literature also documents real friction: Kaiser and Forsberg (2001) report an inherent tension between the participatory use of the matrix and its top-down theoretical structure, and Cotton (2009) documents the top-down principle-imposition problem in a deliberative setting.

**Why not M:** every source is a definition, case application, manual, critique, or adaptation; moderate-tier evidence would require at least one controlled or comparative outcome study of the matrix's effect on judgment quality, and none exists. **Why not C:** the method is well past conceptually-plausible-but-untested; it has a sustained, multi-domain, peer-reviewed application record and survived twenty years of critical methodological literature. P is the honest single grade, with no split to cap.

## 5. Transferred-evidence flag (required honesty for this library)

All of the evidence above is human group-deliberation practice - workshops, participatory assessments, and manuals run by and for people. **None of it has been validated on AI agents**, so the transfer to an agent-run skill is an explicit, untested assumption. The AI value is mechanical and modest: an agent makes the apparatus cheap to run, forces the discipline (a real affected-party roster including voiceless rows, an explicit principle set, a checkable impact specification in every cell, a factual-versus-contested tag, and a refusal to aggregate), and produces a durable, inspectable artifact - benefits that do not depend on any contested outcome claim. The skill ships honestly as a P-tier trade-off-mapping aid with a hard "the matrix maps, deliberation weighs" wall, never as a verdict machine.

## 6. Why it is a skill here (not a fold, not a recipe)

**Verdict: Build**, confirming the preliminary cand/build registry entry. The single durable move it adds: specify an option's impact at every affected-party-by-ethical-principle intersection, including parties with no voice, and read the resulting grid as a trade-off pattern. No shipped skill produces this artifact. The burden-of-proof comparison:

- **Closest shipped skill: `think-parallel-perspectives-review`** (P, shipped), specifically its folded stakeholder-lens mode. Shared mechanism: enumerating affected parties, roughly the row axis - and no more than about a fifth of the working whole. The wall: the stakeholder mode VOICES each included party's perspective (what they would say about the proposal); the matrix TYPES the option's impact on each party against fixed impartial principles, cell by cell, and requires rows for parties that have no perspective to voice (the biotic environment cannot be role-played, but its wellbeing cell can be filled). Perspective voicing and impact typing are different operations with different failure modes, and the matrix's value lives in the column axis and the grid read-out, neither of which any parallel-perspectives mode contains.
- **`think-decision-option-review`** (P, shipped, absorbs multi-criteria decision analysis): surface-similar because both are matrices, structurally disjoint. That tool scores OPTIONS against the DECISION-MAKER'S own weighted criteria and aggregates to a recommendation; this tool maps ONE proposal's impacts on AFFECTED PARTIES against IMPARTIAL principles and deliberately refuses to aggregate. Different rows, different columns, different output, opposite stance on weighing.
- **`think-boundary-critique`** (C, shipped): adjacent on naming the affected-but-excluded, but upstream and complementary. Boundary-critique audits who is inside the frame (is/ought boundary judgments); the matrix takes the roster as given and evaluates a concrete option's impacts on it. The natural sequence is boundary-critique to populate the rows, then the matrix to type the impacts; neither subsumes the other.

**Not a recipe:** a chain of existing skills cannot assemble it. The stakeholder mode of parallel-perspectives could supply rows, but no shipped skill contributes the prima facie principle columns, the voiceless-party row requirement, or the cell-pattern read-out; those are one apparatus, not a sequence of existing moves.

**Family note:** ethics-values-deliberation is the right home, and this method is the family's anchor artifact-producer - the structural gap the family names is exactly "take a values trade-off as input, emit a defensible position across affected parties," and the matrix is the member that emits the structured artifact. It would not stand sensibly in an existing family: the decision-and-option-evaluation family misdescribes it (it does not evaluate options against the decider's criteria and refuses to score), and the perspective-shifting family misdescribes it (it does not shift the evaluator's perspective; it types impacts).

## 7. Output artifact

The skill must emit an **ethical matrix**, not prose: the option under analysis stated in one line; the affected-party rows (explicitly including any voiceless parties - non-human, future, or absent); the principle columns stated (wellbeing, autonomy, fairness by default) with any adaptation justified; a filled grid where each cell is a checkable impact specification tagged **[factual]** or **[contested]**; a **trade-off pattern read-out** naming which groups bear which burdens on which principles and where a benefit to one group is paid for by another; and an explicit **no-verdict footer** stating that the matrix maps the terrain and the weighing is left to deliberation. A short summary may sit above the grid.

## 8. Sources

1. Ben Mepham, "A Framework for the Ethical Analysis of Novel Foods: The Ethical Matrix," *Journal of Agricultural and Environmental Ethics* 12(2):165-176 (2000). The canonical statement of the method (the framework dates from Mepham's mid-1990s food-ethics work): adapts Beauchamp and Childress's principles to interest groups affected by food biotechnologies, worked through a GM-maize example. Foundational and conceptual; defines the method, measures nothing. (Foundational, P.)
2. Matthias Kaiser and Ellen-Marie Forsberg, "Assessing Fisheries - Using an Ethical Matrix in a Participatory Process," *Journal of Agricultural and Environmental Ethics* 14:191-200 (2001). Documented participatory application: a Norwegian ethical assessment of fisheries toward 2020 using matrix-structured value workshops. Reports feasibility and the participation-versus-theory tension; no outcome measurement. (Case application, P.)
3. Doris Schroeder and Clare Palmer, "Technology assessment and the 'ethical matrix'," *Poiesis and Praxis* 1(4):295-307 (2003). Critical philosophical evaluation: finds the matrix useful for fact-finding and structuring ethical debate but weak at weighing the problems it uncovers; proposes modifications (future generations as stakeholders, solidarity in place of justice). The method's most-cited limitation and the source of this skill's hardest wall. (Critique, P.)
4. Ben Mepham, Matthias Kaiser, Erik Thorstensen, Sandy Tomkins and Kate Millar, *Ethical Matrix Manual*, LEI, The Hague (2006; EU FP5 "Ethical Bio-TA Tools" project). Practitioner manual standardizing the method for decision-makers; records that the matrix had by then been applied, often adapted, across fishery, waste management, and medicine. (Practitioner manual / adoption evidence, P.)
5. Matthias Kaiser, Kate Millar, Erik Thorstensen and Sandy Tomkins, "Developing the ethical matrix as a decision support framework: GM fish as a case study," *Journal of Agricultural and Environmental Ethics* 20:65-80 (2007). Method-development case study refining matrix use as decision support. (Case application, P.)
6. Matthew Cotton, "Evaluating the 'Ethical Matrix' as a Radioactive Waste Management Deliberative Decision-Support Tool," *Environmental Values* 18(2):153-176 (2009). The closest thing to an empirical evaluation: assesses the matrix inside a UK analytic-deliberative process, documenting strengths and limitations (including the top-down principle-imposition problem) and motivating alternative tools. Qualitative evaluation, not a controlled study. (Evaluation, P.)
7. Cathy O'Neil and Hanna Gunn, "Near-Term Artificial Intelligence and the Ethical Matrix," in S. Matthew Liao (ed.), *Ethics of Artificial Intelligence*, Oxford University Press (2020). Adapts the matrix to algorithmic systems (stakeholders crossed against concerns such as fairness and accuracy); the framework O'Neil's audit firm ORCAA uses commercially. Demonstrates modern transfer to AI contexts. (Adaptation, P.)
8. Tom L. Beauchamp and James F. Childress, *Principles of Biomedical Ethics* (1st ed. 1979, Oxford University Press). The four prima facie principles (respect for autonomy, non-maleficence, beneficence, justice) that supply the matrix's principle-column set. (Foundational - the column apparatus.)

> Excluded on the evidence rule: no decision-quality or completeness effect size for the ethical matrix is asserted as fact in this dossier, because no controlled outcome study of the method exists. Adoption, multi-domain application, and serious methodological scrutiny set the governing grade at P; the absence of any controlled study is the reason it is not M, and the absence of any agent study is why the grade is also a transferred-evidence grade.
