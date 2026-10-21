# Tiered descriptions: pre-registration (roadmap C2-4)

**Status: pre-registered on 2026-10-20, not run.** This file fixes the design, the cohorts and the thresholds before any compressed description is written or measured, so the decision cannot move to fit the data. It implements SPEC-07 (the tiered-discovery experiment, in the 2026-07-10 audit plan) with three corrections, given below.

**Next step, and why it waits:** the maintainer reviews the compressed tail descriptions for honesty before the eval runs. SPEC-07 names that review as the experiment's main cost. A compressed description that claims less scope than its skill has is the one failure the eval cannot see.

## Why run it

Every session that has the plugin installed loads every skill description, whether or not a skill fires. On 2026-10-20 the 67 `SKILL.md` descriptions came to 33,235 characters, about 8,300 tokens at four characters per token. The cost grows with every new skill, and three build candidates passed vetting on 2026-10-20.

## The three corrections to SPEC-07

1. **The primary instrument is the skill-selection eval, not the framework trigger eval.** An agent sees the installed roster: 67 skills and 10 commands, each as a name and a description and nothing else. That is exactly the skill-selection eval's corpus (`extract-roster.mjs`, built from `manifest.generated.json`). The framework trigger eval routes against `recommendable.json` instead, which adds `anti_triggers`, `not_use` and `overlaps`. SPEC-07 step 4 adds a `routing_description` field that keeps the full text for the advisor if `gen-recommendable.mjs` takes its descriptions from the frontmatter, and it does (`description: fm.description`). So the advisor's corpus should not move at all, and the framework trigger eval is checked by a byte comparison of `recommendable.json`, not by a re-run.
2. **The false-fire bar uses closed-book figures only.** SPEC-07 gates on the framework trigger eval's "0 false-fires". That figure is open-book, because the eval's anti cases are published into the catalog as `anti_triggers` (the 2026-10-14 correction in `scripts/eval/README.md`). The skill-selection eval is closed-book, so its `falseFires` count carries the bar.
3. **The comparison is against a same-day control, not against a recorded run.** The skill-selection eval disagrees with itself on about 2 percent of top-1 picks with nothing changed ([the 2026-09-13 noise-band run](2026-09-13-skill-selection-noise-band.md)). Its rule is to run a same-day control rather than compare against another day's run. So the control arm re-runs the shipped descriptions on the day the compressed arm runs. The recorded 2026-10-20 run is a reference, not the baseline.

## Cohorts (fixed here, derived mechanically)

- **Head, 13 skills, descriptions unchanged.** The four tools: `think-framework-advisor`, `think-top3`, `think-random-frameworks` and `think-research-framework`. Plus the nine skills that the framework trigger corpus names as the right alternative in five or more anti cases, counted from `extract-cases.mjs` on `main` at `004c484`: `decision-option-review` (21), `premortem` (16), `issue-tree` (15), `reference-class-forecasting` (10), `scenario-planning` (7), `red-team-light` (6), `futures-wheel` (6), `parallel-perspectives-review` (5) and `problem-restatement` (5).
- **Contested lenses, 7 skills, descriptions unchanged.** `five-whys`, `eisenhower-moscow-pareto`, `complexity-domain-sort`, `swot`, `reflective-equilibrium`, `qualitative-comparative-analysis` and `analysis-of-competing-hypotheses`. Their caveat-first descriptions route requests away, and the contested-lens contract governs their wording. They are scored as their own cohort.
- **Tail, the other 47 skills, compressed.** Each tail description becomes one honest sentence: the artifact first, then the scope, with no trigger clauses. An example is "Builds an abstraction ladder to find the right altitude for a problem." A compressed description must never claim less scope than the skill has, and the skill stays invocable by its exact name.
- **The 10 commands are unchanged.** Nine are the recipe commands generated from `_workflows/`, and the tenth is `think-research-framework`. The experiment is about skill descriptions.

## Thresholds (the decision gate)

Ship the tiered descriptions only if all five hold. Every comparison is between the two same-day arms. A total that moves by one case or less is inside the measured noise band and counts as no change.

| # | Measure | Threshold |
|---|---|---|
| 1 | Always-loaded footprint (the 67 skill descriptions, in characters) | cut by at least 40 percent from 33,235 |
| 2 | Tail cohort, skill-selection top-1 on its trigger cases | falls by no more than 2 percentage points |
| 3 | Head cohort, skill-selection top-1 on its trigger cases | changes by no more than one case |
| 4 | Skill-selection `falseFires` (anti cases where the authoring skill took the top pick) | no more than the control count plus one |
| 5 | `recommendable.json` | byte-identical to the control, apart from the added `routing_description` field |

The cohort figures come from the `perSkill` block of each arm's scored JSON. Each skill's trigger cases are summed within its cohort.

**If any threshold fails, the result is negative.** It is published in `docs/internal/` and on the trust page: "we measured description compression and it cost X, so we keep paying the tokens". The branch is kept as evidence. A negative result is a valid outcome of this experiment, not a failure of it.

## Run order

1. Write the 47 tail descriptions on a branch named `experiment/tiered-descriptions`, and add `routing_description` to `gen-recommendable.mjs` (threshold 5).
2. **The maintainer reviews the 47 descriptions for honesty.** Nothing runs before this.
3. Regenerate every view. Then run the skill-selection eval twice on the same day, once on `main` (the control) and once on the branch, with the same model and the same cases. Each run costs about 3.4 million tokens and 32 agents, at the 2026-10-20 estimate.
4. Score both arms with `scripts/eval/score-lib.mjs` from a script under `_local/`. Do not run `score-selection.mjs` without `--dry-run` on either arm: it writes a dated scorecard and stamps the meta-skill sidecars, which would publish an experiment arm as a shipped baseline.
5. Score against the thresholds above, and write a one-page decision memo in `docs/internal/experiments/`.
6. If it ships: add a description-budget ratchet to the gate, update the trust page, and record the two-tier authoring rule and the head-cohort rule in `docs/internal/AUTHORING.md`.

## Known limit

The eval prompts are authored per skill, not drawn from real traffic. A compressed description could pass the eval and still miss phrasings real users write. The decision memo states that limit, whatever the result.
