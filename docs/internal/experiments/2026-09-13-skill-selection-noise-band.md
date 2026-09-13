# The skill-selection instrument has a measured noise band, and the QCA description change sits inside it

**Date:** 2026-09-13
**Status:** answered.
**Why this is not a scorecard:** the two runs it compares *are* committed as scorecards (`2026-09-13-skill-selection-trigger-eval` and `2026-09-13-trigger-eval`). What is written up here is the **control** - a null comparison whose only purpose was to size this instrument's day-to-day variance - plus the attribution argument that uses it. Same reasoning as [the catalog-enrichment A/B](2026-09-11-catalog-enrichment-ab.md): an experiment with two arms and no single headline is the wrong shape for `eval-results/`, and finalizing the control arm would re-stamp 67 sidecars off a run that measured nothing new.

## The question

`think-qualitative-comparative-analysis`'s frontmatter description said it routes a single-case causal account to *"process tracing in prose"*. This library **ships** `think-process-tracing` at tier P. Fixing that sentence changes a **routing surface**, and this one is in **two** corpora:

| surface | reaches |
|---|---|
| `SKILL.md:3` description | `recommendable.json` **and** `manifest.generated.json` -> the installed roster |
| `SKILL.md:38` When-NOT-to-Use | `recommendable.json` `not_use` |

So: does naming a sibling skill inside a description pull other skills' cases toward it?

## The control: what this instrument does when NOTHING changes

Before measuring the change, the same 794 prompts were routed against the same roster, two days after the committed 2026-09-10 run, with **nothing altered**. The framework corpus already had this evidence (the A/B's arm A reproduced 2026-09-10 exactly). This corpus did not.

It does not reproduce exactly:

| | 2026-09-10 | null re-run | |
|---|---|---|---|
| `triggerTop1` | 391/393 | **392/393** | +1 |
| `antiNoFire` | 399/400 | 399/400 | - |
| `falseFires` | 1 | 1 | - |
| `antiRightAlt` | 142/157 | 142/157 | - |

**15 of 794 top-1 picks disagreed (1.9%) with nothing changed**, one of them flipping correctness (`c410`, an `issue-tree` trigger case: `what-would-have-to-be-true` -> `issue-tree`).

**So the published 99.5% carries a ±1-case day-over-day noise band.** Without this run, the post-change comparison below would have been read against 2026-09-10, and a one-case delta credited to the description.

The 14 non-flipping disagreements are all **anti** cases, and all are about *which alternative* got named, never whether the source skill wrongly fired - which is exactly why `antiNoFire` and `falseFires` are rock-stable while `antiRightAlt` is the soft metric.

## The decision rule, fixed before the results landed

Written into `post-compare.mjs` before either post run finished, so the reading could not be fitted to the numbers:

- totals moving by **<= 1 case** -> inside the measured noise band, not attributable;
- **QCA's own 12 rows** changing -> attributable, its description is the variable;
- **a new case routing to `qca`** -> third-party pull, the specific risk of naming a sibling;
- **`process-tracing` / `reference-class-forecasting` rows** changing -> the other half of that risk.

## The result: no measurable effect, on either corpus

### Skill selection (roster, 794 cases), against the same-day control

| | control | post | |
|---|---|---|---|
| `triggerTop1` | 392/393 | 392/393 | - |
| `antiNoFire` | 399/400 | 399/400 | - |
| `falseFires` | 1 | 1 | - |
| `antiNamed` | 157 | 157 | - |
| `antiRightAlt` | 142 | **141** | -1, inside the band |

- Watch list: `qualitative-comparative-analysis` **12/12 -> 12/12**, `process-tracing` **12/12 -> 12/12**, `reference-class-forecasting` **12/12 -> 12/12**.
- Cases routing **to** `qca`: identical, and exactly its own six trigger cases. **Zero third-party pull.**
- The -1 is `c115` (`boundary-critique`, expected `parallel-perspectives-review`, a stakeholder-perspectives prompt) - unrelated to any of the three skills involved.

### Framework routing (recommendable, 755 cases), against arm A re-scored on the corrected key

| | arm A | post | |
|---|---|---|---|
| `triggerTop1` | 376/376 (100%) | 376/376 (100%) | - |
| `antiNoFire` | 379/379 (100%) | 379/379 (100%) | - |
| `falseFires` | 0 | 0 | - |
| `antiRightAlt` | 138/144 | **137/144** | -1 |

Only **6 disagreements in 755**. Cases routing to `qca` identical (its own six triggers). The -1 is `c488` (`complexity-domain-sort`, expected `red-team-light`, got `premortem`).

**Caveat, stated rather than buried:** this comparison carries **two** corpus changes, not one - the QCA description *and* the 16 `anti_trigger` slug additions from #132. Neither shows an effect, and the two are separable by locality: none of the six disagreeing cases has a source skill among the thirteen #132 touched, and none is QCA-adjacent.

## The strongest argument is structural, not arithmetic

The post run disagrees with its control on **8 of 794** cases. The **null** comparison - nothing changed at all - disagreed on **15**.

A real effect would produce *more* disagreement than the null, concentrated on cases related to the change. There is **less**, and none of it lands on QCA, `process-tracing`, or `reference-class-forecasting`. Seven of the eight are cases the null run had already shown to be unstable.

## What to reuse

1. **Do not compare a skill-selection run against a different day's run and call a ±1 delta a finding.** This instrument's floor is about 2% of top-1 picks and roughly one correctness flip per 794 cases. Run a same-day control, or restrict the claim to totals that moved by more than one.
2. **`antiNoFire` and `falseFires` are the stable metrics; `antiRightAlt` is the noisy one.** Every observed instability is about *which* alternative was named, never about a skill wrongly firing. Headline trust claims should lean on the former.
3. **The framework corpus is more stable than the roster corpus.** Arm A reproduced 2026-09-10 exactly; the roster corpus did not. The framework eval shows 63 enriched entries; the roster shows 77 name+description pairs, and the thinner surface appears to leave more room for a coin-flip between near-neighbours.
4. **Naming a sibling skill inside a description did not pull that sibling's cases.** One data point, on one description, with the sibling named as a *redirect target* rather than as a capability. It is evidence, not a licence.
