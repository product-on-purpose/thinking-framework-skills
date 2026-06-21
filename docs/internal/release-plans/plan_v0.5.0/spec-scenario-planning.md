# Spec + plan: the `think-scenario-planning` skill (Scenario planning, 2x2)

> **STATUS: SPEC (build pending).** Part of the v0.5.0 catalog tranche. The research verdict is
> **Build at tier P**, from [`skills/think-scenario-planning/SKILL.md`](../../../../skills/think-scenario-planning/SKILL.md) (skill shipped; the proposed dossier was merged into the skill)
> (the research, and the source of truth for this spec). This document has two parts: **Part A** is
> the build spec (the durable move, the SKILL.md description, the procedure, the when-NOT-to-use wall,
> the distinctness statement, the evidence grade, and acceptance criteria); **Part B** is the
> implementation plan (the six-file anatomy, the registry shipped-entry flip, the regen + verify
> steps, and the gotchas).
>
> The build mirrors the file shapes of an existing shipped skill (`skills/think-futures-wheel/` is the
> nearest neighbor and the working template; `think-backcasting` and `think-premortem` are the two
> other neighbors whose evals show the distinctness wording). Scenario planning is already a registry
> candidate (`slug: scenario-planning`, currently `tier: M / status: cand / verdict: build`); this
> work flips it to a shipped, tier-P entry. The dossier promoted into the shipped skill carries the
> grade down from the candidate's stale `M` to the honest `P`.

---

## PART A - SPEC

### A1. The durable cognitive move and the named artifact

**The durable cognitive move** is not drawing a grid. It is **constructing multiple alternative states
of an uncontrollable external environment at once, organized by the two axes of uncertainty that most
change the strategic choice, and judging a strategy against the whole set rather than against a single
forecast.** Two properties make the move what it is, and both must survive into the skill:

1. **The object is the external world the planner does not control** (regulation, technology adoption,
   demand, geopolitics), not the planner's own plan and not the consequences of the planner's own
   action.
2. **The output is a set of divergent futures held in parallel**, not one prediction and not one
   preferred endpoint.

**The named artifact** is a **scenario set**: 2-4 contrasting, internally consistent short narratives
of alternative external futures, named by the two critical-uncertainty axes, plus a **robustness read**
of the strategy across them. The robustness read names which moves survive every world, which signals
indicate which world is arriving, and which options to keep open. The artifact is explicitly **not a
prediction and not a single preferred path.** The 2x2 is the dominant packaging because two
high-impact / high-uncertainty axes cross into four contrasting worlds, which is enough variety to
break single-future thinking without overwhelming a group.

### A2. The SKILL.md description (drafted, rubric-compliant)

This is the U5/U3 gate value (the `description` frontmatter). It is checked by
`.agent-skills-toolkit/scripts/checks/description-score.mjs` (threshold 0.7) and by the toolkit's
description-shape checks. The draft below was authored against the rubric: it starts with an allowed
action verb (`constructs` is not on the allowed list, so it leads with **`produces`**), contains the
exact phrase `Use when`, has no first person (`I` / `you` / `we`), contains **no colon-space (": ")**
anywhere in the value, and is well under 1024 chars.

> Draft `description` (single line in frontmatter):

```
Produces a scenario set, 2-4 contrasting and internally consistent short narratives of alternative external futures named by two critical-uncertainty axes, plus a robustness read of the strategy across the worlds (which moves survive every world, which early signals show which world is arriving, which options to keep open). Use when the planning horizon is long and the decisive forces are outside control and not reliably predictable, and a single implicit forecast is driving the strategy. Not forecasting and not a single preferred path.
```

Rubric self-check against `description-score.mjs` (heuristic 0-1, threshold 0.70):

- `+0.35` ACTION - opens with `Produces` (allowed verb).
- `+0.35` WHEN - contains `Use when`.
- `+0.20` substance - many 4+ letter words and well over 8 tokens.
- `+0.10` no first person - no `I` / `you should` / `you can` / `we`.
- `-0.00` no ANTI phrase (`helps with`, `handles`, `deals with`, etc.) present.
- `-0.00` no `<`/`>` and no all-caps run of 4+ (`2x2` is mixed-case digits, not a caps run; the
  value avoids tokens like `PESTLE`). 

  Estimated score **1.00 >= 0.70 PASS.** Note the literal score is computed at check time; the design
  intent is comfortable margin, not a borderline pass. Keep the value free of colon-space and of
  all-caps acronyms when it is finalized in the SKILL.md frontmatter.

A short prose lede in the SKILL.md body (the `## What it is` paragraph) restates the move in plain
terms and is allowed first-person-free narrative; only the frontmatter `description` is rubric-gated.

### A3. The procedure outline (numbered steps the SKILL.md implements)

The SKILL.md `## Instructions` section implements these steps. They are the intuitive-logics / 2x2
build, reduced to the working mechanism and made artifact-first:

1. **Frame the focal decision and horizon.** State, in one line, the strategic choice under pressure
   and the time horizon over which the external future matters. The scenario set exists to serve this
   decision; with no decision, stop (this is the ritual anti-pattern).
2. **Scan the driving forces.** List the forces shaping the domain the planner does not control
   (regulation, technology adoption, demand, competitive structure, macro/geopolitics, social).
   Span categories; do not stop at the obvious one.
3. **Sort by impact and by uncertainty.** Rate each force on how much it would change the strategic
   choice (impact) and how unpredictable it is (uncertainty). The target is the high-impact AND
   high-uncertainty corner: the critical uncertainties. Predictable forces are noted as
   predetermined elements, not axes.
4. **Select two critical-uncertainty axes.** Pick the two forces that are both high-impact and
   high-uncertainty and are genuinely independent of each other. Each axis is a spectrum with two
   contrasting poles. Resist collapsing a rich field to two axes for neatness; if the two best
   candidates are not independent, say so and reselect.
5. **Cross the axes into the 2x2 and name the four worlds.** Cross the two axes; each of the four
   quadrants is the seed of one plausible external future. Give each quadrant a short, evocative name
   drawn from its pole combination.
6. **Construct each world as a divergent, internally consistent narrative.** For each quadrant, write
   a short narrative of that future: how the two poles and the predetermined elements play out
   together. The worlds must genuinely contrast (not four mild variations of the present) and each
   must hang together internally. (2-4 worlds; the 2x2 yields four, a smaller set may be defensible
   when two quadrants collapse into implausibility.)
7. **Test the strategy for robustness across all worlds.** Run the focal decision / candidate moves
   against each world. Identify: the **robust moves** that survive every world; the moves that win in
   one world but lose in another (the bets); and the gaps no current move covers.
8. **Name the early signals and the options to keep open.** For each world, name the leading
   indicators that would tell the planner that world is arriving (the watch-list). Name the options
   worth keeping open precisely because the worlds diverge.
9. **Emit the scenario set artifact** per `references/TEMPLATE.md`: the two named axes, the four named
   worlds with their narratives, and the robustness read (robust moves, bets, signal watch-list,
   options to keep open). Frame the worlds as structured speculation, never as ranked probabilities.

### A4. The When-NOT-to-use wall

This is the hard wall the skill must carry verbatim in spirit. It has two halves: do not misuse it
as a neighboring tool, and do not run it as a hollow ritual.

**Do NOT use it as forecasting.** The quadrants are structured speculation, not probabilities.
Assigning likelihoods to the worlds, or acting on "the most likely quadrant," reintroduces exactly
the single-future thinking the method exists to break. This is the most common and most damaging
misuse, and even sophisticated users slip here.

**Do NOT use it to validate or path to one desired endpoint.** That is backcasting (fix one desired
future, derive the path back). Scenario planning refuses to pick a single future and derives no path.

**Do NOT use it to trace the ripples of one decision being made.** That is the futures-wheel (one
consequence map radiating outward from one change), not a set of alternative external worlds.

**Do NOT use it to imagine one specified failure.** That is the premortem (assume one plan failed,
reason to causes). Scenario planning is multi-future and not failure-anchored.

**Do NOT reduce a rich force field to two axes for neatness.** Forcing two orthogonal axes can discard
the very interactions that matter and produce tidy quadrants with little content (Ramirez and
Wilkinson, 2014).

**Do NOT produce four mild variations of the present.** Four near-identical worlds, or one obvious
utopia/dystopia pair, give the comfort of "having done scenarios" with none of the cognitive benefit.

**Do NOT run it as ritual with no strategy ever tested against the worlds.** Narratives that no
strategy is stress-tested against are theater. The payoff is the robustness read and the signal
watch-list, not the stories.

### A5. The distinctness statement (vs neighbors, clearing the ~20% overlap ceiling)

Scenario planning clears the overlap ceiling against all three near neighbors on **object + geometry +
output**, and is not a recipe of shipped moves.

- **vs `think-futures-wheel`** (the nearest "futures" tool): futures-wheel radiates first/second/
  third-order **consequences** outward from **one** change the user is making (object =
  consequences-of-my-action; geometry = one outward-radiating tree; output = one radial consequence
  map). Scenario planning builds **multiple** alternative external **worlds** the planner does not
  control and tests strategy against each (object = states-of-the-world; geometry = parallel
  alternative worlds; output = a set of 2-4 divergent narratives). Different object, different
  geometry, different deliverable. Overlap well under ~20%.
- **vs `think-backcasting`** (near-opposite): backcasting fixes **one** desired endpoint and derives a
  backward path to a next step (goal-first / single-future / path-producing). Scenario planning
  refuses to pick a single future, holds several at once (including undesirable ones), and derives no
  path - it yields robustness, not a route (environment-first / multi-future / path-agnostic).
- **vs `think-premortem`**: premortem assumes **one** plan has already failed and reasons back to the
  causes (single-future, failure-anchored risk tool). Scenario planning is multi-future and not
  failure-focused; it explores a range of environments, good and bad, rather than imagining one
  specified failure. Different number of futures, different purpose.

**Not a recipe of shipped moves.** Producing the 2x2 requires a driving-force scan, then
critical-uncertainty **axis selection**, then **crossing**, then **divergent-world construction**. No
shipped skill performs axis-selection-and-crossing or alternative-environment construction (the
closest macro-scan candidate, `pestle`, is itself unbuilt, and a force scan alone is not the
axis-selection-and-crossing move). futures-wheel and backcasting do not compose into the matrix: one
runs forward from a decision, the other backward from a goal, and neither constructs alternative
environments. So there is a separable, distinct mechanism: it is a Build, not a fold and not a recipe.

**Also distinct from the three new problem-framing skills** under consideration in this catalog window
(contradiction-resolution / boundary-critique / frame-creation), which reframe a **single problem
statement** rather than constructing **multiple external futures**. No object overlap.

### A6. Evidence grade: P (honest)

The governing grade is **P (practitioner)**, deliberately overturning the candidate `M` tag, which was
too generous. The honest split is "M on a single student-subject de-biasing experiment (Meissner and
Wulf, 2013) / P-or-weaker once the field-expert evidence (Phadnis et al., 2015), the contrary
judgmental-forecasting findings, and the most-cited scholar's own 'anecdotal' verdict (Schoemaker,
2004) are weighted in." Per this library's conservative rule, the governing grade is the lower half:
**P**. There is no robust, replicated S/M body on the actual move (multi-future construction improving
real decisions) to launder upward.

**Transfer caveat (required, and an independent cap at P):** every study is on human subjects
(students or human experts) in workshop, lab, and field settings. None studies a scenario set produced
by or with an AI agent, nor whether an agent-produced 2x2 improves a human's decision. Evidence is
transferred from human contexts and not validated for AI-augmented use. The AI value is mechanical and
modest: an agent makes the method cheap to run, forces the discipline (real driving-force scan,
genuinely uncertain and independent axes, divergent and internally consistent worlds, an explicit
robustness test), and produces a durable, inspectable artifact. The skill ships honestly as a P-tier
divergence-and-robustness aid with a hard "this is not forecasting" wall, never as a predictor.

### A7. Acceptance criteria

- **AC1 - conformance gate green.** `node scripts/check.mjs` passes at **advanced, 0 errors / 0
  warnings (0/0)** against the pinned toolkit ref, with the new skill present.
- **AC2 - evals well-formed and name-safe.** `skills/think-scenario-planning/eval/cases.md` is a
  well-formed eval-cases doc (Should trigger / Should NOT trigger / Output checks / Value vs baseline)
  and is **name-safe**: any `think-*` skill it references exists as a shipped skill directory (the
  name-safety universe in `scripts/check-registry.mjs` lines ~146-168). The near-miss cases reference
  only `think-futures-wheel`, `think-backcasting`, and `think-premortem`.
- **AC3 - registry tier-consistency.** The registry's **governing tier** for `scenario-planning` is a
  token of the SKILL.md `evidence-tier`. Both must read **P** (`scripts/check-registry.mjs` tier-
  consistency check, lines ~172+). The shipped flip sets `tier: 'P'`.
- **AC4 - description score.** The SKILL.md `description` scores **>= 0.7** under
  `scripts/checks/description-score.mjs` (target: comfortable margin, see A2), with no colon-space and
  no all-caps acronym in the value.
- **AC5 - referential + completeness.** The shipped entry's `evalCases` exists and equals exactly
  `skills/think-scenario-planning/eval/cases.md` (check-registry referential check, lines ~108-109);
  the shipped slug maps to a real `skills/think-scenario-planning/` directory (completeness check);
  generated catalog / recommendable / site / index / manifest are regenerated and drift-clean.

---

## PART B - IMPLEMENTATION PLAN

### B1. The six-file anatomy to author

All under `skills/think-scenario-planning/`, mirroring `skills/think-futures-wheel/` file shapes.

1. **`SKILL.md`** - frontmatter (`name: think-scenario-planning`; the A2 `description`;
   `license: Apache-2.0`; `metadata.id: thinking-framework-skills.scenario-planning`;
   `metadata.family: strategy-and-opportunity`; `metadata.evidence-tier: "P"`;
   `metadata.version: 0.1.0`; `metadata.standard: "0.8"`) followed by the source-credit HTML comment
   line, then the body: `# Scenario Planning (2x2)`, `## What it is` (A1 lede), `## When to Use`,
   `## When NOT to Use` (A4 wall, condensed to bullets), `## Instructions` (the A3 nine steps),
   `## Output Format` (points at `references/TEMPLATE.md`), `## Quality Checklist`, `## Evidence`
   (tier P, the transfer caveat, pointer to `evidence/dossier.md`), `## Examples` (points at
   `references/EXAMPLE.md`). No first person in the frontmatter description; body narrative is fine.
2. **`evidence/dossier.md`** - the `frameworks/_proposed/scenario-planning/dossier.md` research
   **promoted into the shipped dossier format** used by `skills/think-futures-wheel/evidence/dossier.md`:
   the title + identity table (Skill / Family / Evidence tier P / Confidence / Status), then numbered
   sections (1. The mechanism / 2. Lineage / 3. What the evidence shows and does NOT show / 4.
   Transferred-evidence flag / 5. When it works / when it fails / 6. Output artifact / 7. **Sources**).
   The `## Sources` section carries the named sources verbatim from the proposed dossier (Wack 1985 x2;
   Schwartz 1991; Schoemaker 1995; Meissner and Wulf 2013; Phadnis et al. 2015; Ramirez and Wilkinson
   2014; Cordova-Pozo and Rouwette 2023; Wright/Goodwin/Cairns 2020) with each one's grade and the
   evidence-rule exclusion note. Do **not** drop the dominant-form prose; carry the "intuitive logics /
   2x2" framing and the honest "M-down-to-P" reasoning into section 3.
3. **`references/TEMPLATE.md`** - the blank scenario-set artifact to fill: a **Focal decision +
   horizon** line; the **Two axes** (axis A with its two poles, axis B with its two poles); the
   **2x2 / four named worlds** (a 2-col x 2-row layout or a four-item list), each world with a short
   narrative slot; the **Robustness read** as a small table (Move | survives which worlds | robust? /
   bet?); the **Signal watch-list** (per world, the leading indicators); the **Options to keep open**.
   A header note: the worlds are structured speculation, not probabilities; do not rank by likelihood.
4. **`references/EXAMPLE.md`** - a completed run on the **shared Northwind scenario** (the same B2B
   SaaS used in `think-futures-wheel`/`think-backcasting` examples, for cross-skill consistency). A
   good fit: Northwind faces a long-horizon platform bet, with two genuinely uncontrollable critical
   uncertainties (for example: **buyer consolidation** [fragmented buyers <-> consolidated platform
   buyers] x **AI-native disruption pace** [incremental <-> step-change]). Cross into four named
   worlds, write a short narrative each, then the robustness read (which Northwind moves survive every
   world, which are one-world bets, the signal watch-list, the options to keep open). Close with a note
   contrasting it against the futures-wheel example (consequences of one move) and the backcasting
   example (path to one chosen future) to make the distinctness visible at the example level.
5. **`eval/cases.md`** - **name-safe** eval cases mirroring the futures-wheel/backcasting shape:
   `## Should trigger` (5-6 prompts that want a multi-future, robustness-across-worlds read on a
   long-horizon, uncontrollable environment); `## Should NOT trigger (wrong tool / near-miss)` (the
   forecasting / probability misuse; a backcasting case; a futures-wheel case; a premortem case; an
   unsettled-decision case; an unrelated case) - each near-miss may **only** name shipped skills
   (`think-futures-wheel`, `think-backcasting`, `think-premortem`); `## Output checks` (the artifact
   must contain two named axes, four contrasting internally-consistent worlds, the robustness read,
   the signal watch-list, no likelihood ranking); `## Value vs unaided baseline`.
6. **`skill.meta.yml`** - the rich sidecar, mirroring `think-futures-wheel/skill.meta.yml`:
   `identity` (id, slug `scenario-planning`, name `think-scenario-planning`, display_name
   `Scenario Planning (2x2)`, version 0.1.0, status draft, maturity alpha); `classification`
   (primary_family `strategy-and-opportunity`; thinking_modes e.g. divergent/strategic/foresight;
   problem_contexts high-uncertainty/high-stakes/long-horizon; use_cases; poor_fit_cases mirroring the
   A4 wall); `interface` (required input: a focal strategic decision + horizon + the uncontrollable
   domain; primary_artifact_type `scenario-set`); `execution`; `relationships` (complements
   `think-backcasting`, `think-premortem`, `think-futures-wheel`; no overlaps_with); `quality`;
   `evidence` (evidence_tier "P", transferred_evidence true, lineage Wack/Shell, source_dossier);
   `implementation` paths.

### B2. The registry shipped-entry flip (DO NOT edit `registry.mjs` in this work; this is the target)

`scenario-planning` already exists in `frameworks/registry.mjs` (currently `tier: 'M' / status:
'cand' / verdict: 'build'`, lines ~986-997). The build flips it to the **shipped** shape below. This
spec **documents** the target fields; the registry edit is performed in the build PR, not here, and
the catalog / why-not / recommendable are **generated** from it (never hand-edited).

Target shipped entry fields:

- `slug: 'scenario-planning'`
- `name: 'Scenario planning'` (display string; the SKILL display name is "Scenario Planning (2x2)")
- `family: 'strategy-and-opportunity'`
- `tier: 'P'`  (governing tier; **must** match the SKILL.md `evidence-tier` token)
- `status: 'shipped'`
- `verdict: 'shipped'`
- `oneLine: 'construct multiple plausible external futures (2x2) and test strategy for robustness'`
- `reasoning:` a one-line shipped note, e.g. `'Built and validated. Distinct move (axis-selection +`
  `crossing + alternative-world construction) vs futures-wheel (consequences) and backcasting (path);`
  `tier corrected M -> P on the field-expert and review evidence.'`
- `evalCases: 'skills/think-scenario-planning/eval/cases.md'`  (must equal exactly this path)
- `attribution: 'Pierre Wack / Royal Dutch Shell (scenario planning)'`
- `aliases: ['Scenario analysis', '2x2 scenarios', 'Scenario planning (2x2)', 'Intuitive logics']`
- `sources:` the named-source list promoted from the dossier (if the registry schema carries a
  per-entry `sources` field; otherwise the sources live only in `evidence/dossier.md` `## Sources`
  and the registry keeps `attribution`). Confirm against `registry.schema.json` at build time and do
  not add a field the schema rejects.

**The `library.json` component:** add one entry to `components.skills` (DO NOT hand-edit if a generator
owns it; otherwise add):
`{ "name": "think-scenario-planning", "path": "skills/think-scenario-planning/SKILL.md", "version": "0.1.0", "tier": "universal", "status": "active" }`.

### B3. Regen + verify steps (in order)

Run from the repo root. The local npm scripts cover registry / recommendable / site; index +
manifest are generated by the pinned toolkit generators.

1. **`npm run gen:registry`** - regenerate the generated catalog + why-not surfaces from
   `registry.mjs` (after the shipped flip lands in the build PR).
2. **`npm run gen:recommendable`** - regenerate the advisor's recommendable set
   (`gen-recommendable.mjs`) so the advisor can surface the now-shipped skill.
3. **`npm run gen`** - regenerate the site (`gen-site.mjs`): the Framework Library index + the
   scenario-planning dossier page.
4. **gen-manifest** - regenerate the per-target (claude + codex) manifests via the toolkit generator
   (`.agent-skills-toolkit/scripts/generators/gen-manifest.mjs`) so the new skill appears in each
   agent target; keeps `per-target-presence` and `manifest-drift` at 0/0.
5. **gen-index** - regenerate `INDEX.md` via the toolkit generator
   (`.agent-skills-toolkit/scripts/generators/gen-index.mjs`) so the new skill's frontmatter
   description appears as a navigation bullet; keeps `index-drift` clean.
6. **`node scripts/check.mjs`** - the conformance gate. Must be **advanced 0/0**.
7. **`npm test`** - `node --test "tests/**/*.test.mjs"`. Must pass (includes registry + eval-case
   validation).
8. **Site build + link/route guards** - build the Astro docs site and run the rendered-link +
   route-parity guards so the new dossier page and its edit link resolve and the route manifest stays
   in parity (the v0.2.1 conformance arc made these guards part of the build).

### B4. Gotchas

- **The U5 description rubric.** The `description` must start with an allowed action verb
  (`constructs` is **not** allowed - lead with `Produces`), contain the literal `Use when`, carry no
  first person, and score >= 0.7. Re-run `description-score.mjs` after any wording change; a slip below
  0.70 is a WARN that breaks the 0/0 gate.
- **No colon-space in YAML values.** The frontmatter `description` (and any `oneLine`/`reasoning`
  string) must contain **no `": "`** (colon followed by space). Use a comma, a dash with spaces
  (" - "), or parentheses instead. This is both the rubric expectation and a YAML-safety habit; the
  drafted A2 value already avoids it.
- **Eval-case name-safety.** `eval/cases.md` may reference only `think-*` skills that exist as shipped
  skill directories (the name-safety universe). Reference only `think-futures-wheel`,
  `think-backcasting`, `think-premortem` in the near-miss section. Do **not** name unbuilt candidates
  (e.g. `think-pestle`, `think-three-horizons`, the unbuilt problem-framing trio) - that fails
  check-registry's eval name-safety check.
- **`evalCases` path is exact.** The shipped registry entry's `evalCases` must equal exactly
  `skills/think-scenario-planning/eval/cases.md` (check-registry referential check). No variant path.
- **Registry tier == SKILL.md evidence-tier.** Both must be `P`. The candidate entry's stale `M` is
  the thing being corrected; do not leave the registry at `M` while the SKILL says `P` (tier-drift
  fails the gate, per the Codex-caught hole from the SP3 work).
- **No em-dashes or en-dashes** anywhere in any authored file (SKILL.md, dossier, template, example,
  eval, sidecar, this spec). Use " - " (space hyphen space) or restructure. Plain hyphens for numeric
  ranges (e.g. "2-4 worlds"). This is a hard repo + global rule, enforced by a PreToolUse hook.
- **Do not hand-edit generated artifacts.** The catalog, why-not, recommendable JSON, site pages,
  INDEX.md, and the per-target manifests are generated. Edit the sources (`registry.mjs`, frontmatter,
  `library.json`) and regenerate; never edit between the `STATUS:GENERATED` markers.
- **Shared Northwind scenario.** Use the same Northwind B2B SaaS framing as the futures-wheel and
  backcasting examples so the three neighbor examples read as one consistent world and the
  distinctness is visible side by side.
