# plan_v0.11.0 - Contested lenses (the famous-but-weak frameworks, caveat-first)

**Status:** **build-ready.** Membership FINALIZED 2026-06-19 (a Phase 0 dry-run found the strict three-test gate self-contradictory; the admission rule was corrected and the set locked at **7 skills**). The contract (marker schema, advisor policy, rendering, eval posture) is still built-and-proven in Phase 1 before any batch. For a fresh session to execute agentically.
**Theme:** ship the seven rejected frameworks that are genuinely *agent-runnable and in-charter* (SWOT, five-whys, and peers) as honest, low-tier, caveat-first skills. The famous-but-unrunnable instruments (MBTI etc.) and the pure overlaps stay documented dossiers - no thin redirect-skills. Honest-grading made stronger, not diluted.
**Spec (the contract):** `docs/internal/specs/2026-06-19-contested-lenses.md`. Read it first - it carries the finalized 7-skill membership, the corrected admission rule, and the two postures (run-caveat-first / warn-and-redirect).
**Version:** minor, **v0.11.0**. Catalog 56 core -> 56 core + 7 contested (reported as separate cohorts, not a single "63").

De-risk before scale: prove the caveat-first contract (the validator + two exemplars, one per posture) and get it adversarially reviewed before any batch fan-out.

## The locked membership (7)

- **Run-caveat-first (5):** `swot` (X), `five-whys` (X), `eisenhower-moscow-pareto` (P), `cynefin` (C, branded -> descriptive name), `reflective-equilibrium` (C). Lead with the deficiency, then produce the artifact.
- **Warn-and-redirect (2):** `analysis-of-competing-hypotheses` (X), `qualitative-comparative-analysis` (P). Own the famous name, lead with the controlled-evidence caveat, route to the evidence-based alternative, do NOT reproduce the discredited artifact as if valid.
- **Documented dossiers, NOT shipped (the other 27):** thin overlaps, person-profiling instruments, pm-domain, facilitation, ooda/sensemaking/C-K. See the spec's membership table.

## Guardrails

- **Caveat-first is a CHECKED contract, not a style** - `scripts/check-contested.mjs` (new, Phase 1) enforces caveat placement for run-caveat-first AND no-discredited-artifact for warn-redirect; a build that puts the caveat late, omits it from the template, or quietly produces the harmful artifact is a red gate.
- **The honest low tier never changes** (`check-registry` enforces registry tier == frontmatter evidence-tier). `caveat_first` is a posture marker, not a second tier.
- **No thin/empty skills.** The admission rule keeps every thin alias out: a lens whose entire runnable output equals a shipped skill's stays a dossier. Do NOT add any of the documented-only 27 to the build set.
- **No separate cautionary applicator** - that object is itself a thin redirect; a by-name request for a documented framework returns its dossier, not an invokable redirect-skill.
- **Do not build any skill until Phase 1's validator + two exemplars pass codex review.** The brand risk is a caveat that overclaims or launders, replicated by a batch.
- **No em-dashes / en-dashes** (the hook does not catch `fs.writeFileSync` from a node script - keep script-written content clean and scan after).

## Phase 0 - FINALIZED (recorded, not re-run)

Membership and the admission rule are locked (above + the spec). Phase 0's remaining live task is the **IP screen for the one branded survivor, `cynefin`**: pick a descriptive slug/name (NOT `think-cynefin`), keep "Cynefin" as an attributed alias in the caveat prose, with `attribution` + `trademark` in the registry and the artifact. If a defensible descriptive name cannot be found, drop `cynefin` to documented-only (the release is then 6).

Do NOT re-open the membership cut in a build session: the strict "distinct" test was found self-contradictory and was deliberately replaced; the routing harm it guarded is handled by the explicit-request-only advisor policy (Phase 1), not by re-excluding overlaps.

## Phase 1 - Build the contract + two exemplars (the de-risking gate; one PR, codex-reviewed)

Goal: the enforcement + posture infra, proven on ONE skill of EACH posture, before any batch.

1. **`scripts/check-contested.mjs`** (new gate layer, wired into `check.mjs` - the gate becomes 9 layers): identifies contested skills by the marker; for `posture: run_caveat_first` asserts the leading-caveat contract on SKILL.md / TEMPLATE / EXAMPLE / sample / eval-cases; for `posture: warn_redirect` asserts the artifact does NOT reproduce the discredited output and the SKILL.md leads with the controlled-evidence caveat + an evidence-based alternative; for branded, the attribution + trademark in the leading caveat block. Negative-test both (a late caveat, and a warn-redirect skill that produces the harmful artifact, must each red the gate).
2. **Advisor policy plumbing:** `skill.meta.yml` marker schema (`caveat_first`, `posture`, `recommendation_policy: explicit_request_only`); `gen-recommendable.mjs` carries the policy + caveat; `check-registry.mjs` shipped==recommendable becomes policy-aware; the advisor SKILL.md + its eval cases enforce explicit-request-only for contested lenses.
3. **Generators:** `gen-site.mjs` renders the "use with caution" admonition + badge from the marker; `gen-catalog.mjs` carries the marker.
4. **Hand-author TWO exemplars end to end, one per posture:**
   - **SWOT** (run-caveat-first, tier X): full caveat-first anatomy passing `check-contested` (SKILL.md deficiency-leads, TEMPLATE pre-printed caveat, EXAMPLE, `skill.meta.yml` markers, `eval/cases.md` caveat output-check); register in `library.json`; registry `swot: excl/X -> shipped/X`; `scripts/route-manifest.txt` for `/frameworks/think-swot/`; a caveat-first sample at `site/src/content/docs/samples/swot.md`.
   - **ACH** (warn-and-redirect, tier X): the SKILL.md leads with the controlled-evidence caveat (Otzipka 2025; Karvetski & Mandel 2020), names the evidence-based alternative, and does NOT emit the disconfirmation matrix as if valid; full anatomy + `library.json` + registry `analysis-of-competing-hypotheses: excl/X -> shipped/X` + route-manifest + sample, passing the warn-redirect branch of `check-contested`.
   Regenerate everything; gate 0/0 (incl. check-contested); build + link/route guards.
5. **Codex adversarial review of the validator + both exemplars** before any batch: is the SWOT caveat honest (Hill & Westbrook 1997) and leading? Does ACH redirect honestly without laundering the discredited matrix? Does the validator actually bite on both postures? Write findings to `_agent-context/` + confirm; inline-fallback. Resolve. Merge Phase 1 as its own PR.

## Phase 2 - Batch-build the remaining 5 survivors (agentic Workflow)

- A `Workflow` over the locked list minus the two exemplars = **5 skills**: `five-whys`, `eisenhower-moscow-pareto`, `cynefin`, `reflective-equilibrium` (run-caveat-first) and `qualitative-comparative-analysis` (warn-redirect). One serial group (well under the ~4-5 throttle). One `general-purpose` subagent per lens, primed with: the matching **exemplar** (SWOT for run-caveat-first, ACH for warn-redirect - the format that passes `check-contested`), the framework's **dossier** (caveat source), the registry reasoning + tier + posture + (cynefin) the Phase 0 descriptive name, the **caveat-first + IP rules**, `CONTENT-STYLE.md`, and the eval-cases caveat requirement. Each writes ONLY its own `skills/think-<slug>/` anatomy + a caveat-first `site/src/content/docs/samples/<slug>.md`. Registry + `library.json` + route-manifest edits are applied CENTRALLY (Phase 3) to avoid write races.
- Gotchas: Workflow result is under `.result` in the task `.output` file (the notification truncates); `agentType: 'general-purpose'` to Write; `resumeFromRunId` recovers rate-limited stragglers.

## Phase 3 - Integrate + regenerate + gate

1. **Register every new skill in `library.json`** (path, version, tier, status) - BEFORE the generators (PC-01; `gen-catalog` throws if library skill count != registry shipped count).
2. Apply all `excl/flag -> shipped` registry status changes centrally (surgical text-replace keeps other entries byte-identical).
3. **Update `scripts/route-manifest.txt`** for the new `/frameworks/think-<slug>/` routes (PC-02): build -> `node scripts/check-route-parity.mjs --update` (or hand-add) -> then `gen-catalog`.
4. Regenerate: `gen-registry`, `gen-recommendable` (policy-aware), `gen-site`, `gen-agents`, `gen-catalog`; `gen-manifest` + `gen-index` at the cut.
5. **Example coverage:** each new skill has its caveat-first sample at `site/src/content/docs/samples/<slug>.md` (PC-03). Do NOT `--update` to grandfather; a deferral needs a written exception.
6. Sweep the **un-gated count/prose surfaces**: README's count surfaces + prose, `docs/architecture.md` (shipped count 56 -> 56+7, the new contested posture, the check-contested gate layer 8 -> 9), `docs/getting-started.md`, `docs/README.md`, catalog headers, gen-site family intros. Keep the **cohort framing** ("56 core + 7 contested"), not a merged 63.
7. Gate green: `node scripts/check.mjs` 0/0 (9 layers incl. check-contested); `gen-recommendable.mjs --check`; `npm test`; site build + `check-rendered-links.mjs` (STRICT) + `check-route-parity.mjs`.

## Phase 4 - Evals (the caveat-enforcing measurement, with release thresholds)

- Run both evals on the 7 new skills (`scripts/eval/`), one serial group; `resumeFromRunId` for stragglers.
- **Release-blocking thresholds (PC-04):** **0 false-fires is hard-blocking**; no contested lens may route a generic strategy/people/prioritization prompt away from a stronger shipped skill (verify the advisor explicit-only policy holds in the trigger eval); **every caveat output-check must pass** (run-caveat-first: caveat leads; warn-redirect: no discredited artifact); the core-56 routing/output numbers must not regress.
- **Report cohorts separately** (core-56 vs the 7 contested) in the scorecard; the public headline stays the core-56 numbers. Stamp the meta; write dated scorecards.

## Phase 5 - Adversarial review (codex, brand-critical)

- `codex:codex-rescue` (and/or a per-skill reviewer Workflow) reviews the batch for: evidence-honesty (each caveat honestly represents the deficiency per its dossier, no laundering/overclaim/false-endorsement, no famous deficiency understated; the two warn-redirect skills do not launder the discredited move); no-thin-alias (each shipped lens has a recognizable, distinct-in-form artifact, not a shipped skill's output); IP (cynefin -> descriptive name + attribution/TM in the artifact, not only the registry); caveat-first construction (every artifact leads with the deficiency, passing `check-contested`).
- Write findings to `_agent-context/v0.11.0-batch-review.md` + confirm; inline-fallback if not retrievable (do not claim a review that produced no findings). Resolve blockers/majors.

## Phase 6 - Release cut v0.11.0

Per `release-process.md` (the v0.10.0 cut in `plan_v0.10.0` is the worked precedent):
1. CHANGELOG `[Unreleased]` -> `[0.11.0]` + milestone + fresh `[Unreleased]`; footer.
2. Version 0.10.0 -> 0.11.0 (`library.json` + `package.json`); regen manifests + INDEX (diff = version + the 7 new roster only).
3. RELEASE-NOTES v0.11.0 - lead with the honest **cohort framing**: "56 evidence-graded core skills, plus 7 contested explicit-request lenses we grade honestly and hand you caveat-first," and that the famous-but-unrunnable instruments stay documented dossiers.
4. README: version badge + status + current-version + history row; sweep the count surfaces with cohort framing (not a merged 63).
5. Reconcile `release-plans/README.md` (this row Planned -> Shipped) + this plan's status.
6. **Codex review of the cut** (count/version consistency, CHANGELOG/RELEASE-NOTES accuracy, cohort framing, the count-surface sweep); inline-fallback.
7. Gated (human authorizes): tag `v0.11.0` + push + GitHub release; **marketplace re-pin** on `product-on-purpose/agent-plugins` (git worktree off `origin/main`; tfs `sha`+`version`, bump `metadata.version`; `validate-registry.mjs` with `GITHUB_TOKEN`). Verify the deploy + footer.

## Reusable lessons carried in (2026-06-19 session)

- **A strict "distinct" admission test was wrong for this feature** - it was imported from core-skill admission (where it matters because core skills auto-recommend) and its intersection with "honestly runnable" is empty. The routing harm is handled at the recommendation layer (explicit-request-only), not admission; admission keeps a weaker "distinct-in-form artifact" test purely to bar thin aliases.
- Batch agentic fan-outs into serial groups of ~4-5 (a >20-way Opus fan-out trips a server-side burst throttle); `resumeFromRunId` recovers stragglers; Workflow output is under `.result` in the task `.output` file (notification truncates).
- **codex:codex-rescue results are often not retrievable** - have codex write findings to a repo file AND confirm it; else review inline. Never claim a review that produced no findings. (This plan's spec was itself fixed by a codex review that DID land a file - worth the attempt.)
- A per-page/per-skill reviewer Workflow catches dishonest/overclaiming content that structural checks + spot-reads miss.
- Prose-doc drift is not gated (architecture.md had a stale 6-layer / 105-method count); sweep hand-authored docs by hand on a count change.
- `gen-manifest` is not per-PR (catches up at the cut); `recommendable-drift` is a separate CI job; the native-manifest diff at the cut is version + roster only.
- The generators read `library.json`, not `skills/` or the registry alone; `gen-catalog` throws on a library/registry shipped-count mismatch; it validates URLs against `route-manifest.txt`. Register + route-manifest BEFORE regenerating.
- Samples live at `site/src/content/docs/samples/<slug>.md`; the coverage ratchet scans `showcase/` + `samples/`; `--update` grandfathers (avoid for new skills).
- IP lint enforces branded -> attribution + trademark in the REGISTRY only; skill/artifact-level IP and descriptive naming need the new `check-contested` validator.

## Continuation prompt (paste into the new session)

```
Build plan_v0.11.0: ship SEVEN rejected frameworks as honest, low-tier, CAVEAT-FIRST skills. Repo: E:/Projects/product-on-purpose/thinking-framework-skills. Read FIRST: docs/internal/specs/2026-06-19-contested-lenses.md (the contract, with the finalized 7-skill membership) and docs/internal/release-plans/plan_v0.11.0/README.md (this plan). Codex findings: _agent-context/v0.11.0-spec-codex-review.md.

MEMBERSHIP IS LOCKED - do NOT re-open the cut. Run-caveat-first (5): swot (X), five-whys (X), eisenhower-moscow-pareto (P), cynefin (C, branded -> descriptive name), reflective-equilibrium (C). Warn-and-redirect (2): analysis-of-competing-hypotheses (X), qualitative-comparative-analysis (P). Everything else (instruments like MBTI/DISC/Enneagram, pm-domain like porters/JTBD, facilitation, ooda, the thin overlaps like six-thinking-hats/devils-advocacy) stays a DOCUMENTED DOSSIER - no thin redirect-skills, NO cautionary applicator.

Two postures: run-caveat-first leads with the deficiency then produces the artifact; warn-and-redirect owns the famous name, leads with the controlled-evidence caveat, routes to the evidence-based alternative, and does NOT reproduce the discredited artifact as if valid. check-contested.mjs (new 9th gate layer) enforces BOTH before any batch.

Do-not-regress: the advisor must NOT auto-recommend weak lenses - make gen-recommendable + check-registry policy-aware (recommendation_policy: explicit_request_only). cynefin gets a DESCRIPTIVE name (no think-cynefin) + artifact-level attribution; if no defensible name, drop it to documented (release becomes 6). Register every new skill in library.json AND update scripts/route-manifest.txt BEFORE regenerating (gen-catalog throws otherwise). Samples go to site/src/content/docs/samples/<slug>.md; do not --update the coverage baseline. Eval thresholds: 0 false-fires hard-block, no contested lens routes a generic prompt away from a shipped skill, every caveat output-check passes; report core-56 and the 7 contested as SEPARATE cohorts (do not headline a merged 63).

Order: Phase 0 IP-screen cynefin only (membership is locked) -> Phase 1 build the validator + advisor policy + TWO codex-reviewed exemplars (SWOT run-caveat-first, ACH warn-redirect), BEFORE any batch -> Phase 2 batch the remaining 5 (one Workflow group) -> Phase 3 register in library.json + route-manifest + regen all + sweep un-gated prose counts + caveat-first samples + gate 0/0 (9 layers) -> Phase 4 evals with the thresholds above -> Phase 5 codex evidence-honesty/no-thin-alias/IP review (write-to-file or inline) -> Phase 6 cut v0.11.0 (cohort framing) + codex-review the cut + gated tag/push/release + agent-plugins re-pin (worktree off origin/main). Do NOT build until Phase 1's two exemplars + validator pass codex review.
```
