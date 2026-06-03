# SP1 spec: advisor credibility (eval runner + corpus signal enrichment) -> v0.3.0

> **STATUS: SPEC, pending maintainer review.** Part of [`PLAN.md`](./PLAN.md). Build first, independent of the platform work.

## Why

Two verified gaps undercut the `think-framework-advisor`, the plugin's keystone skill:

1. **The authored eval cases are dormant.** Every skill ships `eval/cases.md` (Should-trigger / Should-NOT-trigger / Output-checks / Value-vs-baseline), but each file says *"No runner yet... wire into evals later."* `scripts/check.mjs` runs only the toolkit's **structural** `evaluate.mjs`. Nothing executes the behavioral cases, so the advisor's own `evidence/dossier.md` honestly grades its routing **C (never measured)**, and Gold-tier "behavioral eval" is vacuous.
2. **The recommendable corpus has no negative signal.** `gen-recommendable.mjs` emits only `name / id / family / tier / description`. But the advisor's `eval/cases.md` (L29-30) **requires** every recommendation to carry "why-this-over-its-nearest-neighbor" and a non-empty "what NOT to use, and why." The corpus the advisor reads carries neither, so its single most differentiated output rests on improvisation.

SP1 closes both. They are one workstream: the enriched corpus is exactly what the runner validates (does the stated anti-trigger actually fire?).

## Design overview: the eval runner is two layers

Judging whether a skill *triggers* on a prompt, or whether a Thinking Plan "names exactly one dominant job," is a **model** judgment, not a string match. But a real subset of the checks is **deterministic given the artifacts**. So SP1 builds two layers with different costs and CI postures:

| Layer | What it does | Cost | CI posture |
|---|---|---|---|
| **Static** (`scripts/eval-cases.mjs`) | Validates every `eval/cases.md` is well-formed + enforces name-safety (no case or corpus entry references a framework that does not exist) + no placeholders | free, pure Node | folded into `check.mjs`; runs every PR; **required** |
| **Behavioral** (`scripts/eval-run.mjs`) | Runs routing + output-check cases against a judge model; emits a routing scorecard that retires the "C" grade | tokens; needs `ANTHROPIC_API_KEY` | `npm run eval`; separate **non-blocking**, secret-gated workflow |

This is the honest decomposition: the free layer hardens the gate and makes the cases first-class enforced artifacts now; the paid layer produces the measured routing grade.

## Components

### C1. Static eval-case validator - `scripts/eval-cases.mjs`

Deterministic checks (with a `--check` mode for CI, matching the `gen-recommendable` convention):

1. **Well-formed cases.** Every skill registered in `library.json` has `eval/cases.md` containing the four sections, with Should-trigger and Should-NOT-trigger each having >= 3 bullets and Output-checks >= 1 checkbox.
2. **Name-safety.** Every framework `name` in `recommendable.json`, and every `think-*` name referenced in the advisor's `cases.md`, resolves to a registered skill or recipe. (Mechanizes the advisor's "never invent a framework name" check.)
3. **No placeholders.** No `TODO`/`TBD`/`<...>`/`FIXME` in any `eval/cases.md`.
4. **Enrichment coverage** (couples to C3): every skill has a non-empty derived `anti_triggers` and `not_use`, or is explicitly listed as exempt.

Proven by fixtures: a deliberately malformed case file and a case naming a non-existent framework each make `--check` exit 1; the clean tree exits 0.

### C2. Behavioral runner - `scripts/eval-run.mjs`

- For each skill's Should-trigger / Should-NOT-trigger prompt: ask a judge model, given the recommendable corpus (descriptions + the new anti-triggers), which framework should handle the prompt, and assert it matches (should-trigger -> this skill; should-NOT -> not this skill / the indicated neighbor). Measures **routing**.
- For the advisor: run it on the Should-trigger prompts, then judge the produced Thinking Plan against the 8 output-checks.
- Emits `eval/results/scorecard.json` (+ a readable `.md`): per-skill trigger/anti-trigger pass rate and advisor routing accuracy, dated, with the model id.
- Uses the Anthropic SDK with **prompt caching** (cache the corpus + rubric across cases). Follows the `claude-api` skill.
- **Keyless safety:** with no `ANTHROPIC_API_KEY`, it prints a skip notice and exits 0, so it never breaks keyless CI or contributors without a key.

The advisor's `evidence/dossier.md` is then updated to cite the measured routing grade instead of "C, never measured" (the grade moves only as far as the evidence earns; honesty preserved).

### C3. Corpus signal enrichment - extend `gen-recommendable.mjs`

Add to each skill entry, **derived from existing authored content** (no hand-maintained duplication):
- `anti_triggers`: the cleaned bullets from that skill's `eval/cases.md` "Should NOT trigger" list.
- `not_use`: the "When NOT to use" section of `SKILL.md` (the prose + the named nearest-neighbor skill it defers to).

These are registry-shaped (SP3's `registry.yaml` will own the same fields), so SP1 does not get rebuilt - it forward-fits the schema. The `--check` drift guard extends to the new fields (both `recommendable.json` and `.md`). The site's interactive **browser chooser** is pointed at the same enriched `recommendable.json`, so advisor and chooser share one signal source (unification).

### C4. Gate wiring + worktree portability

- `scripts/check.mjs` invokes the C1 static validator after the toolkit evaluator; `npm run check` runs both. `ci.yml`'s required `check` job covers it.
- The behavioral layer gets `npm run eval` + a separate `eval.yml` workflow (manual dispatch / nightly, `ANTHROPIC_API_KEY` from secrets, non-blocking).
- **Fix `check.mjs` worktree portability:** today it probes `resolve(cwd, '..', 'agent-skills-toolkit')`, which from `.claude/worktrees/<x>/` points at `.claude/worktrees/agent-skills-toolkit` and misses. Add resolution relative to the **main repo root** (derived from `git rev-parse --git-common-dir`, whose parent is the main checkout), so `npm run check` works from any worktree.

## Acceptance criteria

- **AC1** `node scripts/eval-cases.mjs --check` exits 0 on the current tree; exits 1 on a malformed-case fixture and on a non-existent-framework-name fixture.
- **AC2** `gen-recommendable.mjs` emits non-empty `anti_triggers` + `not_use` for all 33 recommendable skills; `--check` fails on drift of either new field.
- **AC3** advisor and browser chooser both read the single enriched `recommendable.json`.
- **AC4** `npm run eval` produces `scorecard.json` with routing accuracy when keyed; prints skip + exits 0 when keyless.
- **AC5** static layer runs inside the required `check`; behavioral layer runs only in the separate non-blocking workflow.
- **AC6** `npm run check` is green (Tier advanced, 0/0) from a `.claude/worktrees/` worktree.
- **AC7** `npm test` green; advisor dossier updated to a measured grade; version 0.2.1 -> 0.3.0 with CHANGELOG + RELEASE-NOTES entries.

## Out of scope (later sub-projects)

`registry.yaml` and its full CI (SP3); per-framework dossiers + the Framework Library (SP4); `research-framework` (SP5); new skills (SP2/SP7/SP8). SP1 uses registry-shaped fields in `recommendable.json` but does not build the registry.

## Open decision for review

**CI posture for the behavioral layer.** Recommendation: keep the paid LLM-eval **out** of the blocking PR gate (separate, secret-gated, non-blocking workflow + local `npm run eval`), because it costs tokens and needs a key, while the free static layer carries the every-PR enforcement. Alternative: block PRs on a small fixed routing suite (predictable cost, requires a CI key and a token budget). Defaulting to the recommendation unless you prefer blocking.
