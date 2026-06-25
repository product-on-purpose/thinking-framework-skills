# Spec: eval-harness orchestration (one run, guaranteed paired artifacts)

**Status:** DRAFT, written 2026-06-23 from the in-session design discussion (2026-06-22/23); the four open decisions were **resolved 2026-06-23** (see Decisions below: hard gate, WS4 included lowest-priority, ride the next cut, explicit `finalize` args). **Adversarially reviewed 2026-06-24** (inline; full record `_agent-context/2026-06-24-eval-orchestration-spec-codex-review.md`): 3 Major + 3 Minor + 2 Nits, all accepted and folded in below (the broken byte-match gate, the guard-vs-pre-existing-gap sequencing bug, and the advisor-routing shape-scope bug were the Majors). No execution plan yet. Supersedes the standalone deferred issues **#95 (contested-output eval `.json` sidecar)** and **#96 (one-pass eval across all 63 skills)** by addressing their root cause rather than each symptom.
**One line:** collapse the behavioral eval harness from a 7-command manual flow into a single deterministic finalize step that writes BOTH the `.md` and the `.json` scorecard straight into `docs/internal/eval-results/` and stamps the per-skill meta, add a deterministic gate layer that makes a missing scorecard sidecar impossible to reintroduce (13 -> 14 layers), and retro-fix the one missing contested-output `.json` by regenerating it through the harness (not by hand).

## Problem

The behavioral eval harness (`scripts/eval/`) is the evidence behind the public trust page's central claim: *"every number above traces to a scorecard file you can audit"* (`site/src/content/docs/start/does-this-work.mdx`). Today that claim has a visible crack, and the harness's shape is why.

1. **Running an eval is a 7-command manual procedure across two execution contexts.** Per `scripts/eval/README.md`, a full run is: `extract-cases` -> route Workflow -> `score` -> `extract-output` -> output Workflow -> `score-output` -> `stamp-meta`. The `node` steps and the `Workflow` steps cannot call each other (the Workflow tool is only invokable from the agent loop; a Workflow script cannot shell out or write files), and the operator hand-manages the intermediate file paths between every step.

2. **The scorers do not write to the canonical location; the operator does.** `score.mjs:96` and `score-output.mjs:46` print the `.md` to stdout and write the `.json` to a scratch sibling of the input file. The operator then manually places BOTH into `docs/internal/eval-results/<date>-<kind>-eval.{md,json}`. Two hand-placed files per run, captured from two different channels (stdout for the `.md`, a regex-derived sibling for the `.json`).

3. **That manual placement is exactly where #95 happened.** The 2026-06-19 contested-OUTPUT run committed `2026-06-19-contested-output-eval.md` but not its `.json` twin. Every other run in the directory is a `.md`+`.json` pair; this one is the lone asymmetry, so the trust page has to say "scorecard file" generically where it could link the machine-readable record.

4. **Nothing guards the pairing.** There is no gate layer asserting each `*-eval.md` has a sibling `*-eval.json`. A dropped sidecar is invisible until a human notices, and the same class of error can recur on the next run.

5. **The friction also explains why #96 (a full 63-skill re-run) keeps not happening.** `MEASUREMENT.md` section 4 already calls a full-catalog re-run "the natural next measurement," but a 7-command, two-context, hand-placed procedure is too heavy to run casually on cadence.

The honest framing: this is not a measurement bug (the numbers are correct and current). It is a **provenance and ergonomics** problem. Fix the ergonomics and the provenance gaps stop being possible.

## Decision

Four workstreams, obeying the repo's pattern: **pure logic in exported functions, thin CLIs as wrappers, a deterministic gate layer, unit-tested.** The model-executed middle (routing, produce/judge) is left as-is; only the deterministic spine and the guard change.

### Workstream 1 - a single deterministic `finalize` step

**Goal:** replace the four trailing manual steps (`score`, `score-output`, the two file placements, `stamp-meta`) with one command that writes the canonical artifacts itself.

- **Refactor the scoring core out of the CLIs into pure exported functions** (mirroring `scripts/lib/*`): extract `scoreTrigger(cases, routed) -> { md, json }` and `scoreOutput(results) -> { md, json }`. House them in `scripts/eval/lib/score-lib.mjs` (new) or as named exports from the existing `score.mjs` / `score-output.mjs`. The existing CLIs become thin wrappers that call the function and keep their current stdout + sibling-write behavior, so nothing downstream breaks (backward compatible).
- **New `scripts/eval/finalize.mjs`.** Usage: `node scripts/eval/finalize.mjs <YYYY-MM-DD> [--trigger <routed.json> <cases.json>] [--output <results.json>] [--prefix <name>]`. For each kind supplied it:
  - calls the pure scorer to get `{ md, json }`;
  - writes **both** `docs/internal/eval-results/<date>[-<prefix>]-<kind>-eval.md` AND `...-<kind>-eval.json` directly into the canonical directory (no scratch sibling, no manual copy: the file that can be dropped is never produced as a loose intermediate), with explicit `'utf8'` encoding and LF (`\n`) newlines so the artifacts are byte-deterministic on Windows (review m5);
  - runs the `stamp-meta` logic for the supplied kind(s) only. **`stamp-meta.mjs` currently executes at module top-level** (it parses `process.argv` and writes files on import, lines 13-33), so finalize cannot import it as-is. The refactor must extract a pure `stampMeta(date, which, root)` function and add a CLI main-guard to `stamp-meta.mjs` so importing it has no side effect (review m4); finalize imports the function rather than shelling out;
  - prints a one-line manifest of every path it wrote.
  - `--prefix` supports cohort runs (e.g. `contested`) so the filename matches the existing `2026-06-19-contested-output-eval.*` convention.
- **Net effect:** a full run goes from 7 commands to **3** - `extract` (1 command, both kinds), the run Workflow (Workstream 4, or the two existing sub-Workflows), then `finalize` (1 command). The `.json` can no longer be dropped because finalize emits the pair atomically into the canonical location.

### Workstream 2 - a deterministic pairing + shape guard (the durable fix)

**Goal:** make #95's class of error impossible to reintroduce, enforced in CI, with no API key.

- **New `scripts/lib/eval-results-lib.mjs`** (pure) + **`scripts/check-eval-results.mjs`** (runner) + **`tests/check-eval-results.test.mjs`**. The guard scans `docs/internal/eval-results/` with **two checks of different scope** (review M3 - the older files predate the scorer contract and would false-red a blanket shape check):
  1. **Pairing - over ALL `*.md`/`*.json` in the directory.** Every `.md` has a sibling `.json` and every `.json` has a sibling `.md`. This covers the trigger/output scorecards, the `-rerunN` files, AND the older `*-advisor-routing*.{md,json}` files (which already pair, so they pass) - pairing is schema-agnostic.
  2. **Shape / contract - ONLY over `.json` files that carry a `generated` eval-kind field.** A file qualifies if `generated` is `"TRIGGER eval"` or `"OUTPUT eval"`; for those, assert the kind-appropriate `totals` keys exist (trigger: `triggerTop1Pct`, `falseFires`; output: `passPct`, `failedChecks`). This auto-includes the trigger/output scorecards and `-rerunN` files and **auto-excludes** the `advisor-routing` JSONs, whose schema is entirely different (`{ eval:"advisor-routing", routing_accuracy, name_safety, ... }`, no `generated`/`totals` - verified in `2026-06-03-advisor-routing.json`). Do NOT apply the shape check to them.
- **Wire as a `check.mjs` layer** (the 14th): add the `spawnSync` block AND a `|| (evalResults.status ?? 1)` term to the exit-status OR-chain at `check.mjs:133` (review m6 - adding the block without the exit term silently ignores its failures). **No CI yaml change is needed** (review n7): `ci.yml` already runs `node scripts/check.mjs`, and the new `tests/*.test.mjs` are auto-discovered by the existing `guard-tests` job. It is deterministic, fast, and runs offline - a correct gate layer, unlike the model-executed eval itself which stays a periodic measurement, not a gate.
- This guard, not the finalize refactor, is what permanently closes #95: even if a future operator bypasses finalize, CI reds on a missing or malformed sidecar.

### Workstream 3 - retro-fix the missing contested-output `.json` (through the harness, not by hand)

The 2026-06-19 contested-OUTPUT run's raw `results.json` was a scratch artifact under `_agent-context/` (gitignored) and is gone, so the literal "re-run the scorer over the saved input" path is unavailable. Two ways to produce the missing sidecar; this spec chooses the one that uses the harness and requires no model run:

- **Chosen path - reconstruct the scorer input from the committed `.md`, then run the real scorer.** `2026-06-19-contested-output-eval.md` records, per skill, `passed/total` and `artifactChars`, with **zero failed checks** for all 7 skills. The scorer's emitted `.json` only carries `{ passed, total, fails: [] }` per skill plus derived totals; because `fails` is empty for every skill, no individual check *text* is needed to reproduce the `.json` exactly. So: build the minimal `{ results: [...] }` input (7 skills, `passed === total`, `perCheck` = that many passing entries, `artifactChars` from the table), run it through `scoreOutput` / `finalize --output`, and commit the emitted `2026-06-19-contested-output-eval.json`.
- **Verification gate (corrected per review M1):** a naive byte-match against the raw committed file would ALWAYS fail, because `2026-06-19-contested-output-eval.md:1` carries a **hand-added leading HTML comment** (`<!-- The 7 CONTESTED LENSES cohort ... -->`) that `score-output.mjs` does not emit (its output begins at `# Output eval scorecard`). So the verification compares the scorer's returned `md` string against the committed file with (a) the leading HTML-comment block stripped and (b) newlines normalized (`\r\n` -> `\n`) and trailing whitespace tolerated (review m5). Equivalently: assert `committed == cohortComment + "\n\n" + scorerBody`. If it matches, the reconstruction was faithful and the emitted `.json` is provably consistent with the published record; if not, stop and reassess (do not commit a divergent artifact). The committed `.md` is left as-is (it keeps its cohort comment); only the `.json` is newly committed, and it carries no cohort marker - consistent with the already-committed `2026-06-19-contested-trigger-eval.json`, which has none.
- **Why this satisfies the "do not hand-author" principle:** the `.json` is emitted by the scorer, not typed; the only hand-built object is the scorer *input*, and it is mechanically derived from and verified against the committed `.md`. The drift risk the backlog flagged is eliminated by the byte-match check.
- **Then update the trust page** (`does-this-work.mdx`): the contested-cohort link can now point at `2026-06-19-contested-output-eval.{md,json}` symmetrically (the page already links the directory; this removes the lone generic "scorecard file" phrasing if present).

### Workstream 4 - optional: a single combined run Workflow

**Lower priority; the value of Workstreams 1-3 does not depend on it.** Add `scripts/eval/eval.workflow.mjs` that runs BOTH the routing and the produce/judge passes in one Workflow invocation (calling or inlining the two existing sub-flows) and returns `{ routed, results }`. This collapses the two model-executed steps into one, so the operator flow becomes literally `extract` -> one Workflow -> `finalize`. The two existing sub-Workflows (`route.workflow.mjs`, `output.workflow.mjs`) stay for pilots / single-kind runs. If this lands separately or later, Workstreams 1-3 still deliver the full provenance fix.

## Cross-cutting: the gate count ripple (13 -> 14 layers)

Workstream 2 adds one `check.mjs` layer. Per the established discipline (the v0.12.0 spec's "gate count ripple"), every surface stating the count moves in the same change so no doc is momentarily wrong:

- `scripts/check.mjs` header + the enumerated layer list (-> fourteen; enumerate the new layer).
- `docs/architecture.md` ("thirteen layers in order" + the numbered list).
- `docs/conformance.md` (the canonical layer enumeration; add the eval-results guard with a one-line description and where it sits relative to the toolkit's frozen G1-G7).
- `docs/contributing.md` (if it states a layer count).
- `scripts/eval/README.md` - rewrite the "Running it" sections to the new 3-step flow and document `finalize.mjs` + the pairing guard; update the Status/roadmap.
- `CHANGELOG.md [Unreleased]` - one entry covering the orchestration + guard + the retro-fixed sidecar.

Do NOT touch `docs/architecture.md`'s "**three** build-time guards run after `astro build`" line (review n8): that is the SITE post-build set (mermaid, rendered-links, route-parity). The new guard is a `check.mjs` layer, not a site post-build guard, so that count stays three.

## Sequencing / dependencies (review M2)

1. **Workstream 3 (create the missing `.json`) must land in the same PR as, or before, Workstream 2 (the guard).** The contested-output `.json` does not exist yet (that IS #95); the moment the pairing guard is wired into `check.mjs`, the PR's own `node scripts/check.mjs` run detects the unpaired `.md` and reds. The guard cannot merge against the current tree. (This mirrors the v0.12.0 "B1 link-fixes must land with the D2 canonical-link guard" constraint.)
2. Workstream 1 (the score-core refactor + finalize) is independent and can land first; the golden-file test pins the refactor as behavior-preserving before anything depends on it.
3. Workstream 4 (combined run Workflow) is last and droppable; it depends on nothing in 1-3 beyond `finalize` existing.
4. The 13 -> 14 count ripple lands atomically in the same change as Workstream 2 (the layer that changes the count), so no doc is momentarily wrong.
5. Suggested PR shape: **PR A** = WS1 (finalize + refactor + golden test); **PR B** = WS3 + WS2 + the count ripple together (the retro-fix and its guard, co-sequenced); **PR C** (optional) = WS4. All under `[Unreleased]`.

## Out of scope

- **Making the model-executed middle push-button.** Routing and produce/judge are model judgments invoked via the Workflow tool from the agent loop; a `node` script cannot invoke them. The deliverable is "3 commands with guaranteed artifacts," not "1 command, zero agent steps."
- **Changing what the evals measure.** Same metrics, same blind-router / separate-judge methodology. This is plumbing and provenance only.
- **Actually running the full 63-skill eval (#96).** This spec *enables* #96 (3-command run) but does not mandate it. A behavioral re-run is the right move when skills change or before a behavior-affecting release, not as part of this infra work. #96 stays open, now cheap to execute.
- **The eval-staleness guard** (a CI check that flags a skill whose description / anti-triggers changed since its last `stamp-meta` date). A natural companion, but its own spec - keeping this one tightly scoped to orchestration + the pairing guarantee.
- **Re-scoring the existing core-56 or contested-trigger runs.** They already pair correctly; only the contested-output sidecar is missing.

## Decisions (resolved 2026-06-23)

1. **Pairing guard is a HARD gate layer.** A `check.mjs` layer (the 14th) that reds CI on any unpaired or malformed eval scorecard. It is deterministic and offline, and the entire point is to make the dropped sidecar impossible - an advisory warning would not. Consistent with the repo's binary-gate philosophy.
2. **Workstream 4 (combined run Workflow) is IN, as the last and lowest-priority task**, droppable without affecting the provenance fix. If the build is time-boxed or WS4 proves fiddly, ship Workstreams 1-3 and leave 4 as a follow-on.
3. **Land under `CHANGELOG.md [Unreleased]`; ride the next cut** (no dedicated v0.12.1). Following the repo's build-into-Unreleased-then-cut contract; gate goes 13 -> 14, no user-facing skill change, and the only externally visible change (the trust-page link) deploys from `main` on merge regardless of a tag. The version lint (`check-changelog.mjs`) stays green because `[Unreleased]` is exempt.
4. **`finalize` takes explicit input paths** (`--trigger <routed> <cases>`, `--output <results>`). No auto-discovery in v1 - predictable, with no chance of silently scoring a stale rerun file (`rerun3`/`rerun4` exist in the directory). A convenience discovery mode can come later if the explicit form proves annoying.

## Risks and mitigations

- **The score-core refactor changes scorer output subtly.** Mitigate: extract the pure function with NO behavior change; add a unit test that the refactored `scoreTrigger` / `scoreOutput` reproduce the exact `.json` of an existing committed run (golden-file test against, e.g., `2026-06-17-output-eval.json`). The existing CLIs keep their current output.
- **The #95 reconstruction is unfaithful.** Mitigate: the byte-match verification gate (regenerated `.md` must equal the committed `.md`) is a hard stop. Because every contested skill passed every check, the reconstruction is information-complete; if the bytes match, the `.json` is provably correct.
- **The pairing guard false-reds on a legitimately solo file** (e.g. a future non-eval artifact dropped in the directory). Mitigate: scope the guard to the `*-eval.{md,json}` naming family; document the convention in the README; negative-test a planted unpaired file (must red) and a planted malformed `.json` (must red).
- **Scope creep into a full headless eval runner.** Mitigate: Workstream 4 is explicitly optional and the model-executed middle is out of scope; the must-have is finalize + guard + retro-fix.

## Acceptance criteria (Definition of Done)

1. **Finalize works.** `node scripts/eval/finalize.mjs <date> --trigger <routed> <cases> --output <results>` writes all four canonical files (`<date>-trigger-eval.{md,json}`, `<date>-output-eval.{md,json}`) into `docs/internal/eval-results/`, stamps the per-skill `skill.meta.yml` for both kinds, and prints the written paths. A `--prefix contested` run produces the `*-contested-*` filenames.
2. **Scoring refactor is behavior-preserving.** `scoreTrigger` / `scoreOutput` are pure exported functions; the existing `score.mjs` / `score-output.mjs` CLIs still produce their current stdout + sibling output; a golden-file test confirms the refactored core reproduces an existing committed scorecard `.json` byte-for-byte.
3. **The pairing guard is live and wired.** `check.mjs` runs **14 layers**; `scripts/check-eval-results.mjs` passes on the current tree and reds on (a) a planted `*-eval.md` with no `.json`, (b) a planted `*-eval.json` with no `.md`, and (c) a planted malformed/empty `.json`. The guard test is in the `guard-tests` job.
4. **#95 is closed.** `docs/internal/eval-results/2026-06-19-contested-output-eval.json` exists, was emitted by the scorer (not hand-typed), and the regenerated scorer body matches the committed `.md` after stripping its leading cohort HTML comment and normalizing newlines (review M1). The directory has no unpaired `.md`/`.json` file (pairing guard green). The trust page links the contested-output record symmetrically.
5. **Counts reconciled.** Every surface that states the gate layer count reads 14, in one change; `scripts/eval/README.md` documents the 3-step flow and `finalize.mjs`.
6. **Gate green.** `node scripts/check.mjs`, `npm test`, and `cd site && npm run build` all pass locally; `CHANGELOG.md [Unreleased]` records the work and `check-changelog.mjs` stays green.
7. **#96 enabled.** The README's "Running it" section shows that a full 63-skill run is now `extract` -> run -> `finalize` (3 commands), and #96 remains an open, now-cheap, deliberately-deferred issue.

## Appendix: file-change inventory

**New files:** `scripts/eval/finalize.mjs`, `scripts/eval/lib/score-lib.mjs` (or named exports added to the two score scripts; pick one in the plan), `scripts/lib/eval-results-lib.mjs`, `scripts/check-eval-results.mjs`, `tests/check-eval-results.test.mjs`, `tests/score-lib.test.mjs` (golden-file), `docs/internal/eval-results/2026-06-19-contested-output-eval.json` (regenerated). Optional (Workstream 4): `scripts/eval/eval.workflow.mjs`.

**Edited:** `scripts/eval/score.mjs` + `scripts/eval/score-output.mjs` (refactor core into exported pure fn; CLIs become wrappers), `scripts/eval/stamp-meta.mjs` (extract its registry-walk core for finalize to import), `scripts/eval/README.md` (3-step flow + finalize + guard + roadmap), `scripts/check.mjs` (new layer + header), `docs/architecture.md`, `docs/conformance.md`, `docs/contributing.md` (layer count 13 -> 14), `site/src/content/docs/start/does-this-work.mdx` (symmetric contested-output link), `CHANGELOG.md` (`[Unreleased]`).
