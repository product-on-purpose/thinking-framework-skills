# Wave-3 external deep research: provenance, dedup, and admissions (2026-06-11)

The portable deep-research prompt from the 2026-06-10 queue-reopen session was run on three platforms against the full 121-method dedup appendix. This is the committed synthesis; the raw outputs stay gitignored at `_local/ingest/` per the [research-corpus convention](README.md).

| Run | Platform | Candidates proposed | Reliability read |
|---|---|---|---|
| A | Claude deep research (2026-06-11) | 22, ranked, with fold/reject calls | Strongest: honest grading, named distinctness neighbors, self-reported unsearched leads |
| B | Gemini deep research | 25, build-heavy (19 builds) | Lead generator only: systematically inflates evidence grades (grades pedigree and "LLM programmability" as outcome evidence) |
| C | ChatGPT deep research (2026-06-10) | 9 | Compact subset of the consensus set; build-leaning but consistent |

**Admission rule applied:** cross-model consensus (2+ runs) plus a clean dedup against the live registry. Single-source leads are listed below, not admitted. Every admitted row carries `Preliminary; pending deep-research vetting` and must pass `think-research-framework` NAME mode before anything is built, per the standing guardrail.

## Dedup findings against the live registry

The runs could not see inside `frameworks/registry.mjs`; the local dedup caught what they missed:

1. **Dialectical bootstrapping** (the #1 pick of runs A and C) was already in the registry as an alias of `dialectical-synthesis` (fold, C). The fold reasoning itself calls it "a separate estimation trick" and explicitly declined to count its robustness toward the fold, so the alias placement had buried an already-acknowledged separate method. **Unbundled** into its own `cand` row (reversible; the maintainer can re-fold).
2. **Formal Dialectical Inquiry** (run B) is a pure duplicate: "dialectical inquiry" is an existing alias of `dialectical-synthesis`, Schweiger studies already cited there. Not admitted.
3. **Mutual Gains Approach / ZOPA** (runs A, B) folds into the existing `interest-based-negotiation` cand row; recorded there as a reasoning note, not a new entry.
4. **Catastrophic Success Mapping / Pre-Parade** (run B) folds into shipped `premortem` (same backcast mechanism, inverted anchor). Fold-enrichment lead, below.
5. **SAST** (run B) reduces to an importance x certainty 2x2 over assumption surfacing; nearest shipped home is `what-would-have-to-be-true` (`key-assumptions-check` is excl and cannot be a target). Fold-enrichment lead.
6. **QOC / Design Rationale** (run A) folds into shipped `decision-option-review`. **Cone of Plausibility** (run A) folds into shipped `scenario-planning`. **Structured Self-Critique** (run A) folds into shipped `red-team-light`. **Indicators and Signposts** (run A) targets `kill-criteria-tripwires`, itself a fold, so document-only at best.
7. **Tetralemma** (run B) carries high distinctness risk against shipped `contradiction-resolution` + `contradiction-tension-mapping` (the both/and quadrant is polarity mapping's core move). Not admitted as a single-source lead with a likely fold outcome.
8. **Facilitation wall:** every entry in `facilitation-and-group-structures` is fold/excl/flag with zero shipped. Run B's Peer Instruction, Ritual Dissent, Sequential Evaluation (as a group protocol) and the Delphi family walk into that precedent. Estimate-talk-estimate was still admitted as a documentation candidate (famous; the dossier is the product), verdict reject preliminary.

## Admitted (14 entries + 1 family)

New family: **`ethics-values-deliberation`** (13th, candidate-only). The structural gap the runs agree on: no existing method takes a moral or values trade-off as input and emits a defensible position across affected parties. Zero ethics methods existed in the registry before this wave.

| Slug | Family | Tier | Verdict | Consensus |
|---|---|---|---|---|
| `veil-of-ignorance-reasoning` | ethics-values-deliberation | M | build | A + C |
| `ethical-matrix` | ethics-values-deliberation | P | build | A + B + C |
| `speculative-harms-anti-goals` | ethics-values-deliberation | A | build | A + C |
| `reflective-equilibrium` | ethics-values-deliberation | C | reject (doc) | A (doc-only) + B (reject) |
| `dialectical-bootstrapping` | decision-and-option-evaluation | M | build | A + C (#1 of both); unbundled alias |
| `interval-calibration-check` | meta-thinking-and-reflection | M | build | A + B + C |
| `consider-the-unknowns` | assumption-and-belief-challenge | M | build | B only, but claimed-controlled line; verify first in vetting |
| `analysis-of-competing-hypotheses` | assumption-and-belief-challenge | X | reject (doc) | A (doc-only, M/X) vs B (build, M); admitted at the honest floor |
| `process-tracing` | systems-and-consequences | P | build | A + B + C |
| `issue-position-argument-mapping` | synthesis-and-reasoning-clarity | P | build | A + B + C; Dialogue Mapping TM flagged |
| `walton-argumentation-schemes` | synthesis-and-reasoning-clarity | P | build | A + C; three-way collision watch with argument-mapping + toulmin |
| `qualitative-comparative-analysis` | systems-and-consequences | P | reject (doc) | A (doc-only) + B (build-inflated) |
| `concept-knowledge-theory` | divergent-ideation-and-idea-expansion | C | reject (doc) | A (doc-only) + B (build-inflated) |
| `estimate-talk-estimate` | facilitation-and-group-structures | M | reject (doc) | B + C; facilitation wall |

Registry: 121 -> 135 methods; cand 16 -> 30; families 12 -> 13. Nothing shipped; `why-not.md` byte-unchanged (cand entries do not render there).

## Evidence-grade conflicts adjudicated

- **ACH:** run B argued build because "its structural artifact is unparalleled" despite acknowledging mixed human evidence. That is adjacent-claim laundering; the randomized record (Dhami, Belton and Mandel 2019; later null and layout studies) governs. Admitted at X / reject preliminary, the MBTI modeling pattern.
- **Reflective equilibrium:** run B graded "S" by citing Rawls. Philosophical centrality is not outcome evidence. Governed at C.
- **QCA / process tracing:** run B graded "S" on methodological pedigree. Pedigree is not human-reasoning outcome evidence. Governed at P.
- **Calibration:** the overconfidence phenomenon and feedback-trainability are strong, but the equivalent-bet device's specific contribution is weaker and the headline hit rates are vendor-adjacent (Hubbard). Governed at M.

## Fold-enrichment leads (no new entries; vetting-stage work)

These carry genuinely strong evidence that belongs inside existing entries, not new rows. Tier changes only via the research engine, never by hand:

- **Consider-the-Opposite** (Lord, Lepper and Preston 1984; Mussweiler, Strack and Pfeiffer 2000) and **Multiple-Explanation / Consider-an-Alternative** (Hirt and Markman 1995): S-tier debiasing evidence whose move is already the core of shipped `red-team-light` (and the premortem-side `inversion` fold). Cite into those entries; this may legitimately raise red-team-light's grade.
- **Pre-Parade / catastrophic success** into `premortem` (an optional success-anchor parameter).
- **SAST's importance x certainty 2x2** into `what-would-have-to-be-true`.
- **QOC's criteria-link rationale capture** into `decision-option-review`.
- **Cone of Plausibility** into `scenario-planning`; **Structured Self-Critique** into `red-team-light`.
- **Principlism (Beauchamp-Childress)** into `ethical-matrix` (it is the column set).

## Single-source leads, NOT admitted (second research pass before any admission)

From run B (grades distrusted, mechanisms possibly real): Consider-the-Unknowns was admitted (see above) but the rest hold: Peer Instruction (commit-discuss-recommit), Sequential Evaluation / segmented testimony, Value-Focused Thinking (Keeney), DAG causal mapping (Pearl; likely capability-mismatched for a prose agent artifact), Cross-Impact Analysis, E-Prime translation, Tetralemma, Cognitive Walkthrough (domain-specific UX), Targeted Experience Narratives, Ritual Dissent, Algorithmic Impact Assessment (domain-specific governance artifact, likely `pm`/`excl`).

From run A's self-reported unsearched leads: Robust Decision Making (Lempert/RAND), Necessary Condition Analysis (Dul), Most Significant Change, Moral Foundations deliberation.

## Next

Per [`plan_v0.7.0`](../release-plans/plan_v0.7.0/README.md): NAME-mode vetting of the full 30-cand queue in serial batches of about 4, expecting the phase-1/2 survival pattern (roughly half of build verdicts survive; documentation candidates resolve to flag/excl dossiers).
