# Output eval - targeted re-run after skill tightening (2026-06-17)

A 3-skill re-run of the output eval, not a full pass: the 2026-06-17 full run (`2026-06-17-output-eval.md`) found 3 of 56 skills failing exactly one check each - `causal-layered-analysis` and `pairwise-comparison` dropped the evidence caveat from the artifact, and `minimax-regret` fabricated a numeric payoff matrix when the prompt supplied no figures. The fix was structural, not exhortative: `causal-layered-analysis` and `pairwise-comparison` now carry a pre-printed evidence-caveat element in their `references/TEMPLATE.md` (the artifact contains it by construction), and `minimax-regret`'s TEMPLATE + procedure now force a payoff-provenance line and model flagged/assumed cell notation, so unsupplied inputs are flagged rather than invented. This run re-measures only those three; the other 53 keep their 2026-06-17 measurement. Same produce-then-judge method, same caveat: model-executed and non-deterministic, a measurement, not a gate.

# Output eval scorecard

Skills evaluated: 3. Output checks: 26.

**Overall: 100% of checks passed** (26/26). Skills passing every check: 3/3.

| Skill | checks passed | artifact chars |
|---|---|---|
| causal-layered-analysis | 100% (8/8) | 8494 |
| minimax-regret | 100% (10/10) | 7605 |
| pairwise-comparison | 100% (8/8) | 5862 |

## Failed checks (0)

_None. Every artifact satisfied every one of its skill's output checks._
