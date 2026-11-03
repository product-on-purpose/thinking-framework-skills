# Tiered descriptions: pre-registration (roadmap C2-4)

**Status: pre-registered on 2026-10-20, amended on 2026-11-03 before any description was written, not run.** This file fixes the design, the cohorts and the thresholds before any compressed description is written or measured, so the decision cannot move to fit the data. It implements SPEC-07 (the tiered-discovery experiment, in the 2026-07-10 audit plan) with three corrections, given below. The one amendment, option B for the tail rule, is recorded under "Open design question", and the original text is kept beside it.

**Next step, and why it waits:** run-order steps 1 and 2 are done. The 47 tail descriptions are on the `experiment/tiered-descriptions` branch as draft PR #222, written under the amended rule. The maintainer approved them on 2026-11-03, after reviewing the 8 descriptions flagged as possibly narrower. Two use cases were restored: `think-pyramid-principle` regained "a write-up buries its point", and `think-boundary-critique` regained contested multi-party cases. The footprint is now 19,937 characters, a cut of 40.01 percent, which leaves 4 characters of margin. Next come the same-day eval runs (step 3), which wait for the maintainer's explicit go-ahead to run a Workflow. SPEC-07 names the honesty review as the experiment's main cost, because a compressed description that claims less scope than its skill has is the one failure the eval cannot see. The review looked closely at the flagged 8, and each draft was checked against its own original description, not against its full `SKILL.md`.

## Why run it

Every session that has the plugin installed loads every skill description, whether or not a skill fires. On 2026-10-20 the 67 `SKILL.md` descriptions came to 33,235 characters, about 8,300 tokens at four characters per token. The cost grows with every new skill, and three build candidates passed vetting on 2026-10-20.

## The three corrections to SPEC-07

1. **The primary instrument is the skill-selection eval, not the framework trigger eval.** An agent sees the installed roster: 67 skills and 10 commands, each as a name and a description and nothing else. That is exactly the skill-selection eval's corpus (`extract-roster.mjs`, built from `manifest.generated.json`). The framework trigger eval routes against `recommendable.json` instead, which adds `anti_triggers`, `not_use` and `overlaps`. SPEC-07 step 4 adds a `routing_description` field that keeps the full text for the advisor if `gen-recommendable.mjs` takes its descriptions from the frontmatter, and it does (`description: fm.description`). So the advisor's corpus should not move at all, and the framework trigger eval is checked by a byte comparison of `recommendable.json`, not by a re-run.
2. **The false-fire bar uses closed-book figures only.** SPEC-07 gates on the framework trigger eval's "0 false-fires". That figure is open-book, because the eval's anti cases are published into the catalog as `anti_triggers` (the 2026-10-14 correction in `scripts/eval/README.md`). The skill-selection eval is closed-book, so its `falseFires` count carries the bar.
3. **The comparison is against a same-day control, not against a recorded run.** The skill-selection eval disagrees with itself on about 2 percent of top-1 picks with nothing changed ([the 2026-09-13 noise-band run](2026-09-13-skill-selection-noise-band.md)). Its rule is to run a same-day control rather than compare against another day's run. So the control arm re-runs the shipped descriptions on the day the compressed arm runs. The recorded 2026-10-20 run is a reference, not the baseline.

## Cohorts (fixed here, derived mechanically)

- **Head, 13 skills, descriptions unchanged.** The four tools: `think-framework-advisor`, `think-top3`, `think-random-frameworks` and `think-research-framework`. Plus the nine skills that the framework trigger corpus names as the right alternative in five or more anti cases, counted from `extract-cases.mjs` on `main` at `004c484`: `decision-option-review` (21), `premortem` (16), `issue-tree` (15), `reference-class-forecasting` (10), `scenario-planning` (7), `red-team-light` (6), `futures-wheel` (6), `parallel-perspectives-review` (5) and `problem-restatement` (5).
- **Contested lenses, 7 skills, descriptions unchanged.** `five-whys`, `eisenhower-moscow-pareto`, `complexity-domain-sort`, `swot`, `reflective-equilibrium`, `qualitative-comparative-analysis` and `analysis-of-competing-hypotheses`. Their caveat-first descriptions route requests away, and the contested-lens contract governs their wording. They are scored as their own cohort.
- **Tail, the other 47 skills, compressed.** Each tail description becomes one honest sentence: the artifact first, then the scope, with no trigger clauses. An example is "Builds an abstraction ladder to find the right altitude for a problem." A compressed description must never claim less scope than the skill has, and the skill stays invocable by its exact name. **Amended 2026-11-03 (option B, below):** after that sentence comes one short use-when clause, so the description still passes U5.
- **The 10 commands are unchanged.** Nine are the recipe commands generated from `_workflows/`, and the tenth is `think-research-framework`. The experiment is about skill descriptions.

## Open design question (found 2026-10-20, before any description was written)

The tail rule above says "no trigger clauses". That conflicts with Standard requirement U5, which the gate checks with the toolkit's `scripts/checks/description-score.mjs`. U5 scores a description out of 1.00 against a 0.70 bar: 0.35 for a concrete action verb, 0.35 for a use-when clause, 0.20 for length and 0.10 for avoiding the first person. A description with no use-when clause therefore scores at most 0.65 and cannot pass. All 47 compressed descriptions would raise a U5 warning. The gate's warning count would rise from 89 to 136, so the recorded baseline in `docs/internal/gate-warning-count.txt` would have to move on the branch.

The maintainer chooses one of two ways:

- **A. Keep the rule as registered.** The branch carries 47 new U5 warnings. If the experiment ships, the library either keeps them or records an exception to U5.
- **B. Amend the rule before step 1:** one sentence for the artifact and the scope, then a short use-when clause, such as "Builds an abstraction ladder to find the right altitude for a problem. Use when a problem seems stated too broadly or too narrowly." That passes U5. It also fits the budget: a 40 percent cut leaves the tail 10,333 characters, about 219 per skill, against about 503 now. The cost is that B tests a milder compression, so a positive result claims less.

**Recommendation: B**, because it keeps the library inside its own Standard while the footprint threshold stays reachable. The cohorts, the thresholds and the run order stay the same under either choice. The U5 weights were read from the scorer source (confidence high). That each skill fits a two-clause description in about 219 characters is an estimate from one worked example (confidence medium).

### Amendment, 2026-11-03: the maintainer chose B

The maintainer chose B on 2026-11-03, before any tail description was written. The tail rule is now one sentence for the artifact and the scope, then one short use-when clause. The cohorts, the thresholds and the run order do not change. Three facts were re-measured on 2026-11-03 rather than carried forward:

- **The U5 weights are unchanged at the toolkit commit CI now grades against** (`49a03e0`, set in `.github/workflows/ci.yml`): 0.35, 0.35, 0.20 and 0.10, read from `scripts/checks/description-score.mjs`.
- **The footprint is still 33,235 characters** across the 67 descriptions: 5,801 for the head, 3,807 for the contested lenses and 23,627 for the tail. A 40 percent cut therefore leaves the tail 10,333 characters, about 220 per skill.
- **The gate on `main` reports 7 warnings, all U5, all on the contested lenses.** The gate on the experiment branch should report the same 7.

The amendment also settles where the full descriptions live, which run-order step 1 left open. Each tail `SKILL.md` keeps its full text in a frontmatter field, `metadata.routing-description`, and its `description` field carries the compressed text. `gen-recommendable.mjs`, `gen-catalog.mjs` and `gen-site.mjs` all read `fm.description` today, and each one reads `routing-description` first when it is present. So `recommendable.json` keeps its full `description` text and gains no new field, which meets threshold 5 strictly: the file must be byte-identical to the control. The `routing_description` output field that SPEC-07 and threshold 5 anticipate is therefore not needed. The site and the agent-discovery files (`llms.txt`, `llms-full.txt`, `catalog.json`) also keep the full text, because none of them is always loaded. Only the installed roster, which `manifest.generated.json` and the skill-selection eval read, carries the compressed text. The one other exception is `INDEX.md`, which the toolkit generates from `description` directly.

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
