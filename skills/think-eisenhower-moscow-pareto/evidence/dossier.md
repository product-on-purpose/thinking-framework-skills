# Evidence Dossier: Eisenhower / MoSCoW / Pareto (contested lens)

> Single source of truth for the `eisenhower-moscow-pareto` skill. The SKILL.md, sidecar, and evals derive from this. The full catalog dossier (why this bundle is not a core skill) lives at `frameworks/eisenhower-moscow-pareto/dossier.md`; this is the skill-facing grounding.

| | |
|---|---|
| **Skill** | `thinking-framework-skills.eisenhower-moscow-pareto` (installable name `think-eisenhower-moscow-pareto`) |
| **Family** | decision-and-option-evaluation |
| **Evidence tier** | **P** (practitioner heuristic; no controlled effectiveness evidence) |
| **Posture** | contested lens, run-caveat-first, explicit-request-only |
| **Confidence** | Low that any of the three presets improves decisions as a procedure; the added discipline (justify, rank, measure, name the limit) is what carries value |

## 1. The mechanism

This entry is not one method but a bundle of three lightweight prioritization presets that share only the abstract goal "prioritize cheaply", not a mechanism. Made concrete, each is a different operation with a different artifact: the **Eisenhower matrix** is categorical triage that routes each task by a fixed two-axis (urgent x important) grid to a canned action (do / schedule / delegate / delete); **MoSCoW** is ordinal bucketing of items against an implicit single priority scale into Must / Should / Could / Won't, usually under a timebox; **Pareto** is a descriptive concentration observation (a small share of inputs accounts for most of an effect) turned into a focus-on-the-few instruction, with a ranked contribution chart and a cut line. This skill runs whichever one was named, caveat-first, and adds the discipline the bare template omits: for Eisenhower, naming where the assumed axes are the wrong ones; for MoSCoW, justifying every Must against the timebox and ranking within the bucket to beat category inflation; for Pareto, stating the real measured concentration and flagging that concentration is not causation.

## 2. Lineage

- **Eisenhower matrix:** descends from a line in Dwight D. Eisenhower's 1954 address quoting an unnamed former college president ("I have two kinds of problems, the urgent and the important"); the 2x2 and four-quadrant discipline were built and popularized by Stephen R. Covey in *The 7 Habits of Highly Effective People* (1989, the "Time Management Matrix," Quadrant II).
- **MoSCoW:** created by Dai Clegg at Oracle in 1994 for rapid application development, donated to the DSDM consortium; the Agile Business Consortium's DSDM handbook is the authoritative description.
- **Pareto:** traces to Vilfredo Pareto's 1896 observation of land and income concentration, named and generalized by Joseph M. Juran as the "vital few and trivial many" in quality management.
- The three are generic descriptive terms in common use - Eisenhower (a historical attribution), MoSCoW (an acronym), Pareto (an eponym), with the DSDM packaging of MoSCoW the only quasi-branded element - so this entry is documented descriptively and is not flagged as branded.

## 3. What the evidence shows, and what it does NOT show

**What the record supports.** All three are real, named, long-lived, and widely taught. Pareto is more than a heuristic at the descriptive level: Kim, Singh and Winer (2017) measured a Pareto ratio averaging about 0.73 across 22 consumer-packaged-goods categories on a ~100,000-household panel, and the Sharp and Romaniuk (Ehrenberg-Bass) tradition reports closer to 60-20 to 70-20. So "a minority of inputs produces most of the output" is a documented regularity in some domains. That is the extent of the directly supported claim about Pareto: a real, domain-dependent distributional fact whose ratio is usually not the famous 80-20.

**What the record does NOT support, and the laundering trap.** There is no controlled or comparative study locatable that measures the Eisenhower matrix, MoSCoW, or Pareto-as-a-prioritization-procedure against any alternative on decision quality or outcomes. The study repeatedly attached to the Eisenhower matrix - Zhu, Yang and Hsee (2018), five experiments in the *Journal of Consumer Research* - is genuinely strong (M-tier), but it establishes the **mere urgency effect**: people pursue tasks with urgency cues over objectively more valuable tasks, even violating dominance. That is evidence the *problem* the matrix names is real; it says nothing about whether sorting tasks into an urgent-important 2x2 fixes it. Counting that grade toward the matrix would launder a finding about the disease onto a claim about the cure. For MoSCoW, the requirements-prioritization literature (Achimugu and colleagues, 2014, and the systematic reviews that follow) centers its controlled comparison on AHP and cumulative voting; MoSCoW appears as an enduringly popular practitioner method with documented weaknesses (no objective intra-bucket ranking, won't-have ambiguity, category inflation), not as a method with controlled effectiveness evidence. The conservative governing grade across all three is therefore **P**.

**Excluded figures (under the evidence rule).** (1) The survey claim that "50% of people who use the Eisenhower strategy feel in control of their work" traces to a vendor/productivity site, not a primary study, and is excluded. (2) The universal "80/20" ratio is excluded as an empirical law: where measured the concentration is domain-dependent and typically 73-20 or 60-20, and strict Pareto fits are rejected in income data. Only the descriptive existence of a concentration is counted, never the 80-20 number.

## 4. Transferred-evidence flag

Every nameable result here is from human subjects - the urgency-effect experiments, the CPG panel data, the requirements-engineering studies. None studies any of the three methods performed by or with an AI agent. The evidence is transferred from human contexts and not validated for AI-augmented use. The honest AI value is narrow: forcing one preset to be run with its discipline added (justified Musts, a real measured concentration, a named limit) instead of a face-value template, with the deficiency stated up front.

## 5. When it works / when it fails

**Works best when:** a prioritization needs to happen fast and the cost of getting it slightly wrong is low - Eisenhower as a jolt when urgent noise crowds out the important, MoSCoW as a shared vocabulary for cutting scope to a timebox, Pareto as a check before spreading effort evenly.

**Fails or misleads when (poor-fit / anti-patterns):**
- The canned axis is treated as the analysis instead of a prompt (Eisenhower's urgency-importance when the real driver is cost, reversibility, dependency, or value) - use `think-one-way-vs-two-way-door` for deliberation-level triage.
- The buckets hide the ranking that matters (MoSCoW's category inflation, no intra-bucket ranking) - use `think-decision-option-review` to name the criteria honestly.
- The 80-20 figure is mistaken for a law and a non-vital "vital few" is manufactured; Pareto shows concentration but not causation - use `think-theory-of-constraints` for the capacity-versus-demand test that proves which few are actually binding.

## 6. Output artifact

Exactly one of three (the one asked for), produced with its discipline added and the caveat leading: an **Eisenhower 2x2** (urgent x important, one canned action per quadrant, the wrong-axes risk named); or a **MoSCoW four-bucket list** against a timebox (every Must justified, the Must bucket ranked, category inflation guarded); or a **Pareto ranked-contribution chart** (shares plus a cumulative total and a vital-few cut line, the real measured concentration stated, concentration-not-causation flagged).

## 7. Sources

1. Covey, S.R. (1989), *The 7 Habits of Highly Effective People* (Free Press), the "Time Management Matrix" (Quadrant II). Canonical articulation of the urgent-important 2x2 as a discipline; practitioner, no controlled evaluation of the matrix itself. (P)
2. Zhu, M., Yang, Y. and Hsee, C.K. (2018), "The Mere Urgency Effect," *Journal of Consumer Research* 45(3): 673-690. Strong evidence for the *problem* the Eisenhower matrix targets, NOT for the matrix as a remedy. (M, for the urgency effect - not for the matrix)
3. Clegg, D. and Barker, R. (1994), *Case Method Fast-Track: A RAD Approach* (Addison-Wesley). Origin of MoSCoW (Must/Should/Could/Won't), later adopted by DSDM. (P)
4. Agile Business Consortium, *DSDM Project Framework Handbook* - "MoSCoW Prioritisation." Authoritative practitioner description; documents the timebox pairing and won't-have semantics. (P)
5. Achimugu, P., Selamat, A., Ibrahim, R. and Mahrin, M.N. (2014), "A systematic literature review of software requirements prioritization research," *Information and Software Technology* 56(6): 568-585. Controlled comparison centers on AHP and cumulative voting; MoSCoW noted as popular but not the subject of effectiveness trials. (P, review)
6. Kim, B., Singh, V. and Winer, R.S. (2017), "The Pareto rule for frequently purchased packaged goods: an empirical generalization," *Marketing Letters* 28(4): 491-507. Across 22 CPG categories (~100,000 households), the Pareto ratio averages about 0.73, not 0.80. Strongest measured Pareto evidence, and it disconfirms the 80-20 number. (M, for the distributional fact - not for a prioritization procedure)
7. Sharp, B. and Romaniuk, J. (Ehrenberg-Bass tradition), "The Pareto rule in marketing revisited: is it 80/20 or 70/20?" (*Marketing Letters*, 2019). Reports a marketing Pareto closer to 60-20 to 70-20; the concentration exists but the ratio is domain-dependent. (P/M, descriptive)
8. Juran, J.M. (1951), *Quality Control Handbook* (McGraw-Hill), the "vital few and trivial many" / Pareto principle. Origin of Pareto as a prioritization heuristic; no controlled effectiveness study of the heuristic as a method. (P)

> **Verification status:** Zhu, Yang and Hsee (2018) and Kim, Singh and Winer (2017) are the well-attested anchors, and both attach to something other than the prioritization procedure (the urgency bias and the distributional fact, respectively). Treat all three presets' value as unproven; the skill exists to run an explicitly-requested preset honestly, not to endorse it. Never reproduce the excluded "50% feel in control" survey figure or assert a universal 80-20 law.
