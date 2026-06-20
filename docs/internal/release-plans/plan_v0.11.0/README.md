# plan_v0.11.0 - Contested lenses (the famous-but-weak frameworks, caveat-first)

**Status:** planned, build-ready (not started). Intended for a fresh session to execute agentically.
**Theme:** ship the distinct-but-weak rejected frameworks (SWOT, MBTI, OODA, Cynefin, ...) as honest, low-tier, caveat-first skills. The plugin helps a user through a lens they asked for while teaching its deficiency, instead of a flat refusal. The honest-grading brand made stronger, not diluted.
**Spec (the contract):** `docs/internal/specs/2026-06-19-contested-lenses.md`. Read it first.
**Version:** minor, **v0.11.0** (new skills). Catalog ~56 -> ~74 shipped.

This plan is written to be run by a new session via dynamic agentic Workflows, with `codex:codex-rescue` adversarial reviews at the brand-critical gates. The phases are ordered to **de-risk before scaling**: prove the caveat-first construction on one hand-authored exemplar and get it adversarially reviewed before any batch fan-out.

## Guardrails (read before any phase)

- **Do not start building skills until Phase 0 finalizes membership and Phase 1's exemplar passes codex review.** The brand-critical risk is a caveat that overclaims or launders; one bad exemplar would replicate across the batch.
- **The honest tier never changes.** A contested lens keeps its current low grade (X / V / C / A / P). `check-registry.mjs` enforces registry tier == SKILL.md frontmatter evidence-tier; do not "round up."
- **Caveat-first is the whole feature.** Every SKILL.md leads with the deficiency; every `references/TEMPLATE.md` pre-prints a leading caveat block; every produced artifact opens with it. A lens you can run without seeing its weakness is a failed build.
- **Reuse the dossier.** Each framework's critique already exists as its Framework Library why-not page (`frameworks/<slug>/dossier.md` or the registry `dossierPath`). Consume it; do not re-research from scratch.
- **No em-dashes / en-dashes anywhere** (the PreToolUse hook enforces it on Edit/Write; it does NOT catch `fs.writeFileSync` from a node script, so keep script-written content dash-clean and scan after).

## Phase 0 - Finalize membership (deterministic + one classification pass)

Goal: the exact list of contested lenses to build, each with its dossier (the caveat source).

1. For every `excl`/`flag` framework, read its registry `reasoning`. Classify **distinct-but-weak** (no shipped skill performs its core move; rejected on evidence/efficacy/branding) vs **overlap-with-shipped** (the reasoning names a shipped skill as the home of the move). The working split is in the spec; the heuristic is rough, so the borderline excl entries (eisenhower-moscow-pareto, note-and-vote, sensemaking-matrix, insight-statement-generation, concept-knowledge-theory, estimate-talk-estimate, scaled-participation-formats, analysis-of-competing-hypotheses, reflective-equilibrium, qualitative-comparative-analysis) get a per-framework call.
2. **Codex review (light):** hand codex the candidate list + each one's reasoning and ask it to challenge the distinctness call - is any "distinct" lens actually a near-twin of a shipped skill (which would re-introduce routing ambiguity)? Resolve disputes by dropping the contested entry to documented-only.
3. Output: `plan_v0.11.0/membership.md` - the final list (~18-22), each with slug, current tier, dossierPath, branded?(TM), and the one-line deficiency the caveat must lead with.

## Phase 1 - Infra + the exemplar (the de-risking gate; one PR, codex-reviewed)

Goal: establish the contested-lens posture and prove it on ONE hand-authored skill before any batch.

1. **The `skill.meta.yml` marker:** add `quality.caveat_first: true` (final name TBD here). Decide how `gen-site.mjs` renders the "use with caution" treatment (a badge variant + a leading admonition on the framework page); decide how the advisor (`gen-recommendable.mjs`) carries the marker so it can surface the caveat.
2. **The generators + gate accept the new posture:** `excl/flag -> shipped` at low tier; `check-counts.mjs` accepts the higher shipped total; `check-registry.mjs` still passes (tier consistency, IP lint for branded ones, eval-coupling). Update `check-counts` FAMILIES / surfaces as needed.
3. **Hand-author ONE exemplar end to end:** `think-swot` (distinct, famous, tier X, well-documented deficiency). Full caveat-first anatomy: SKILL.md (deficiency leads), `references/TEMPLATE.md` (pre-printed caveat block), `references/EXAMPLE.md`, `skill.meta.yml` (marker), `eval/cases.md` (Output checks include "leads with the caveat, does not overclaim"); registry `swot: excl/X -> shipped/X`; a caveat-first sample under `samples/`. Regenerate everything; gate 0/0; build + guards.
4. **Codex adversarial review of the exemplar + infra:** does the caveat honestly represent SWOT's deficiency (Hill & Westbrook 1997) without overclaiming or laundering? Does the artifact lead with it? Does the site "use with caution" treatment read honestly? Have codex WRITE findings to `_agent-context/` + confirm the file exists; fall back to inline review if not retrievable. Resolve.
5. Merge Phase 1 as its own PR. **This is the template + the proven posture the batch copies.**

## Phase 2 - Batch-build the rest (agentic Workflow)

Goal: author the remaining ~17-21 contested lenses from the exemplar pattern.

- A `Workflow` over the Phase 0 list (minus the exemplar), in serial groups of ~4-5 (the burst-throttle rule; a >20-way fan-out trips a server-side limit). One `general-purpose` subagent per lens, primed with, and only with:
  - the **exemplar** `think-swot` skill (the caveat-first format to match),
  - the framework's **dossier** (the deficiency source - do not re-research),
  - the registry **reasoning** + its tier + branded?(TM),
  - the **caveat-first rules** (deficiency leads SKILL.md; TEMPLATE pre-prints the caveat; the artifact opens with it; branded -> descriptive name + attribution + TM),
  - `docs/internal/CONTENT-STYLE.md` (voice, no-dash, links) and the eval-cases requirement (Output checks include the caveat check).
  - Each subagent writes ONLY its own `skills/think-<slug>/` anatomy + a caveat-first `samples/<slug>.md`. The registry status changes are applied CENTRALLY after the batch (avoid a write race on registry.mjs).
- Workflow gotchas: the result is wrapped under `.result` in the task output file (the notification truncates - parse the output file); `agentType: 'general-purpose'` so the agent can Write; `resumeFromRunId` recovers any rate-limited stragglers from cache.

## Phase 3 - Integrate + regenerate + gate

- Apply all `excl/flag -> shipped` registry status changes centrally (a surgical text-replace keeps the other entries byte-identical; the em-dash hook does not catch a node script).
- Regenerate every derived surface: `gen-registry`, `gen-recommendable`, `gen-site`, `gen-agents`, `gen-catalog`; then `gen-manifest` + `gen-index` (at the cut).
- Sweep the **count surfaces** (not all gated): README's four surfaces + the prose, `docs/architecture.md` (shipped count + the new contested posture + add to the generators if needed), `docs/getting-started.md`, `docs/README.md`, the catalog-table headers, the gen-site family intros. (This session found architecture.md prose drift the gate does not catch - sweep it deliberately.)
- Example coverage: each new shipped skill has its caveat-first sample (or grandfather it, with reason). `check-example-coverage.mjs --update`.
- Gate green: `node scripts/check.mjs` 0/0 (8 layers); `gen-recommendable.mjs --check` (separate CI job); `npm test`; `npm --prefix site run build` + `check-rendered-links.mjs` (STRICT) + `check-route-parity.mjs`.

## Phase 4 - Evals (the caveat-enforcing measurement)

- Run the existing harness (`scripts/eval/`) on the new skills, both evals:
  - **Trigger:** confirms routing stays clean - the distinct lenses route to themselves; **0 false-fires must hold** (a contested lens must not over-grab a situation meant for a stronger shipped skill). Batch serial groups of ~4 (throttle); `resumeFromRunId` for stragglers.
  - **Output:** the per-skill "Output checks" include **"leads with the caveat and does not overclaim"** - so the output eval *enforces* the caveat-first design. The misses (if any) are the precise skills to tighten.
- Write dated scorecards under `docs/internal/eval-results/`; stamp `trigger_eval_status` / `output_eval_status`. Report the contested subset's numbers distinctly in the scorecard (so the graded-skills headline stays legible), but they are honestly-graded skills, so they are part of the run.

## Phase 5 - Adversarial review (codex, brand-critical)

- `codex:codex-rescue` reviews the built batch for: (1) **evidence-honesty** - does each caveat honestly represent the framework's deficiency per its dossier, with no laundering, no overclaim, no false endorsement? (2) **distinctness** - does any lens compete with a shipped skill in routing? (3) **IP** - branded ones attributed + TM-flagged? (4) **caveat-first construction** - does every artifact lead with the deficiency? (5) any famous framework whose deficiency is *understated*.
- Retrievability lesson: instruct codex to WRITE findings to `_agent-context/v0.11.0-codex-review.md` and confirm the file exists; if it does not (the known codex-rescue sandbox limitation), do the review **inline and deterministically** instead (do not claim a codex review happened if no findings landed). Resolve all blockers/majors.
- Consider a parallel **reviewer Workflow** (one reviewer per built skill) as this session used for the 44-page content - it catches dishonest or overclaiming caveats that structural checks and spot-reads miss.

## Phase 6 - Release cut v0.11.0

Per `docs/internal/release-process.md` (the v0.10.0 cut in `plan_v0.10.0` is the worked precedent):
1. CHANGELOG `[Unreleased]` -> `[0.11.0]` + a milestone line + fresh `[Unreleased]`; compare-link footer.
2. Version 0.10.0 -> 0.11.0 (`library.json` + `package.json`); regen manifests + INDEX (the diff is version + the new roster - confirm only the contested lenses changed, not unexpected drift).
3. RELEASE-NOTES v0.11.0 - lead with the **brand framing**: "every skill is evidence-graded, including the famous-but-weak ones we now hand you caveat-first." For-everyone + for-builders.
4. README: version badge + project-status + current-version + a release-history row; sweep the shipped count (~74) across the four count surfaces.
5. Reconcile `release-plans/README.md` (this row Planned -> Shipped) and this plan's status.
6. **Codex review of the cut** (counts/version consistency across all surfaces, CHANGELOG/RELEASE-NOTES accuracy, the new-count sweep) - inline-fallback if not retrievable.
7. Gated steps (human authorizes): tag `v0.11.0` on the merge commit + push + GitHub release; **marketplace re-pin** on `product-on-purpose/agent-plugins` (use a git worktree off `origin/main`; update the tfs `sha` + `version` + bump `metadata.version`; `validate-registry.mjs` with `GITHUB_TOKEN`). Verify the deploy + footer.

## Reusable lessons carried in (from the 2026-06-19 session)

- **Batch agentic fan-outs into serial groups of ~4-5**; a >20-way Opus fan-out trips a server-side burst throttle ("not your usage limit"). `resumeFromRunId` recovers stragglers from cache.
- **Workflow output is wrapped** (`{summary, logs, result}`) in the task `.output` file; the notification truncates - read the file and parse `.result`.
- **codex:codex-rescue results are often not retrievable** (encrypted rollout / sandbox); have codex write findings to a repo file AND confirm it exists, or do the review inline. Never claim a review that produced no retrievable findings.
- **A reviewer Workflow catches what structural checks miss** - it found fabricated arithmetic on a page that passed sections/dashes/links/build. Run an adversarial verify on the built artifacts (here: dishonest/overclaiming caveats).
- **Prose-doc drift is not gated.** architecture.md had a stale gate-layer count (6, actually 8) and method count (105, actually 135) despite the count gate. Sweep the hand-authored docs by hand on a count change.
- **gen-manifest is not per-PR**; it catches up the roster at the cut. **recommendable-drift is a separate CI job** (`gen-recommendable --check`). The native-manifest diff at the cut should be version + the new roster only.
- **Showcase/sample link rules:** sibling showcase links use `../<slug>/` (a page is served at `/showcase/<slug>/`); samples link `../../frameworks/think-<slug>/` and `../../showcase/`.
- **IP lint:** branded -> attribution + trademark required; descriptive naming.

## Continuation prompt (paste into the new session)

```
Build plan_v0.11.0: ship the distinct-but-weak rejected frameworks as honest, low-tier, CAVEAT-FIRST skills (the "contested lenses"). Repo: E:/Projects/product-on-purpose/thinking-framework-skills. Read FIRST: docs/internal/specs/2026-06-19-contested-lenses.md (the contract) and docs/internal/release-plans/plan_v0.11.0/README.md (this plan). This is an agentic build via dynamic Workflows with codex:codex-rescue adversarial reviews at the brand-critical gates.

Hard rules: caveat-first is the whole feature (deficiency leads the SKILL.md AND the artifact; reuse each framework's existing why-not dossier as the caveat source). The honest low tier never changes. No em-dashes. Distinct-only (anything that overlaps a shipped skill stays documented-only - it would degrade routing).

Order (de-risk before scaling): Phase 0 finalize membership (per-framework distinctness call + a light codex challenge) -> Phase 1 infra + ONE hand-authored exemplar (think-swot) + codex review of it BEFORE any batch (this is the template the batch copies) -> Phase 2 batched authoring Workflow (serial groups of ~4-5, one general-purpose subagent per lens, primed with the exemplar + the dossier + the caveat-first rules; registry changes applied centrally) -> Phase 3 integrate + regen all generators + sweep the count surfaces (incl. the un-gated prose docs) + example coverage + gate 0/0 -> Phase 4 run both evals (the output eval ENFORCES the caveat; trigger must hold 0 false-fires) -> Phase 5 codex evidence-honesty + distinctness + IP review of the batch (write findings to a file + confirm, or inline) -> Phase 6 cut v0.11.0 per release-process.md (CHANGELOG/version/manifests/RELEASE-NOTES/README/reconcile), codex-review the cut, then the gated tag + push + GitHub release + agent-plugins marketplace re-pin (worktree off origin/main).

Do NOT start building skills until Phase 0 membership is final and Phase 1's exemplar passes codex review. Gate mechanics: node scripts/check.mjs (8 layers) + gen-recommendable.mjs --check (separate) + npm test + site build + rendered-links (STRICT_ANCHORS=1) + route-parity. Throttle: batch ~4-5; resumeFromRunId recovers stragglers; Workflow output is under .result in the task .output file.
```
