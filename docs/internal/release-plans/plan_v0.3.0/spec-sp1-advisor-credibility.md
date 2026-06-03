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
| **Behavioral** (agent-executed; optional headless) | Routing + output-check cases judged by the **invoking model**; emits a routing scorecard that retires the "C" grade | session tokens; **no key** in the normal case | run on demand by the agent; optional non-blocking scheduled workflow for unattended runs |

This is the honest decomposition: the free layer hardens the gate and makes the cases first-class enforced artifacts now; the behavioral layer produces the measured routing grade.

## Components

### C1. Static eval-case validator - `scripts/eval-cases.mjs`

Deterministic checks (with a `--check` mode for CI, matching the `gen-recommendable` convention):

1. **Well-formed cases.** Every skill registered in `library.json` has `eval/cases.md` containing the four sections, with Should-trigger and Should-NOT-trigger each having >= 3 bullets and Output-checks >= 1 checkbox.
2. **Name-safety.** Every framework `name` in `recommendable.json`, and every `think-*` name referenced in the advisor's `cases.md`, resolves to a registered skill or recipe. (Mechanizes the advisor's "never invent a framework name" check.)
3. **No placeholders.** No `TODO`/`TBD`/`<...>`/`FIXME` in any `eval/cases.md`.
4. **Enrichment coverage** (couples to C3): every skill has a non-empty derived `anti_triggers` and `not_use`, or is explicitly listed as exempt.

Proven by fixtures: a deliberately malformed case file and a case naming a non-existent framework each make `--check` exit 1; the clean tree exits 0.

### C2. Behavioral eval - agent-executed (uses the invoking model; no key required)

The behavioral cases need a *model* to judge, but not a separate Anthropic key in the common case: the eval is normally invoked BY a model (Claude Code), so it borrows that invoking model rather than opening a second, separately-billed API path.

**Primary mode - agent-executed (default, no key).** An internal eval workflow/skill the agent runs on demand:
- It reads each skill's `eval/cases.md`, performs the routing decision (given the recommendable corpus + the new anti-triggers, which framework should handle this prompt?) and the advisor output-check judgments with its **own inference**, optionally fanning out one subagent per skill for parallelism and independent judgment.
- It writes `eval/results/scorecard.json` (+ a readable `.md`): per-skill trigger/anti-trigger pass rate and advisor routing accuracy, dated, stamped with the model id it ran under.
- No API key, no SDK dependency, no metered second bill - it piggybacks on the session already running, and matches the plugin's identity (every other capability here is agent-executed).
- Because the judging model can vary by who runs it, this is a periodic **measurement** (a fresh routing grade on demand), not a deterministic per-commit gate. That is its correct role; every-PR enforcement is the free static layer (C1).

**Optional mode - headless automation (only for unattended/scheduled runs).** A scheduled GitHub Action has no ambient LLM to borrow, so it must authenticate to one - via headless Claude Code or a small Anthropic-SDK script (prompt-cached, per the `claude-api` skill). That credential is incidental to "run a model with no agent present," not to the eval itself. Same case format + rubric + scorecard shape; model-agnostic if desired (env-configured endpoint). Not built unless the maintainer wants a nightly grade.

Either way, the advisor's `evidence/dossier.md` is updated to cite the measured routing grade instead of "C, never measured" (the grade moves only as far as the evidence earns; honesty preserved).

### C3. Corpus signal enrichment - extend `gen-recommendable.mjs`

Add to each skill entry, **derived from existing authored content** (no hand-maintained duplication):
- `anti_triggers`: the cleaned bullets from that skill's `eval/cases.md` "Should NOT trigger" list.
- `not_use`: the "When NOT to use" section of `SKILL.md` (the prose + the named nearest-neighbor skill it defers to).

These are registry-shaped (SP3's `registry.yaml` will own the same fields), so SP1 does not get rebuilt - it forward-fits the schema. The `--check` drift guard extends to the new fields (both `recommendable.json` and `.md`). The site's interactive **browser chooser** is pointed at the same enriched `recommendable.json`, so advisor and chooser share one signal source (unification).

### C4. Gate wiring + worktree portability

- `scripts/check.mjs` invokes the C1 static validator after the toolkit evaluator; `npm run check` runs both. `ci.yml`'s required `check` job covers it.
- The behavioral eval is agent-executed on demand (no blocking-CI wiring needed). The optional headless `eval.yml` (manual dispatch / nightly, credential from secrets, non-blocking) is added only if the maintainer wants unattended runs.
- **Fix `check.mjs` worktree portability:** today it probes `resolve(cwd, '..', 'agent-skills-toolkit')`, which from `.claude/worktrees/<x>/` points at `.claude/worktrees/agent-skills-toolkit` and misses. Add resolution relative to the **main repo root** (derived from `git rev-parse --git-common-dir`, whose parent is the main checkout), so `npm run check` works from any worktree.

## Acceptance criteria

- **AC1** `node scripts/eval-cases.mjs --check` exits 0 on the current tree; exits 1 on a malformed-case fixture and on a non-existent-framework-name fixture.
- **AC2** `gen-recommendable.mjs` emits non-empty `anti_triggers` + `not_use` for all 33 recommendable skills; `--check` fails on drift of either new field.
- **AC3** advisor and browser chooser both read the single enriched `recommendable.json`.
- **AC4** the agent-executed eval produces `scorecard.json` (routing accuracy + advisor output-check pass rate) using the invoking model, **no API key**; the optional headless mode yields the same scorecard shape when given a credential.
- **AC5** the static layer (C1) runs inside the required `check` on every PR; the behavioral eval runs on demand (agent) or via the optional non-blocking scheduled workflow, never as a blocking PR gate.
- **AC6** `npm run check` is green (Tier advanced, 0/0) from a `.claude/worktrees/` worktree.
- **AC7** `npm test` green; advisor dossier updated to a measured grade; version 0.2.1 -> 0.3.0 with CHANGELOG + RELEASE-NOTES entries.

## Out of scope (later sub-projects)

`registry.yaml` and its full CI (SP3); per-framework dossiers + the Framework Library (SP4); `research-framework` (SP5); new skills (SP2/SP7/SP8). SP1 uses registry-shaped fields in `recommendable.json` but does not build the registry.

## Open decision for review

**Do you also want the optional unattended (headless) eval workflow, or is agent-executed-on-demand enough?** The behavioral eval is agent-executed by default (judged by the invoking model, no key, not a blocking gate). The only reason to add a credential is a scheduled, no-human run in CI, which has no ambient model to borrow. Recommendation: ship agent-executed only for v0.3.0; add the optional scheduled workflow later if you want a nightly routing grade without running it yourself. The free static layer (C1) is the every-PR gate either way.
