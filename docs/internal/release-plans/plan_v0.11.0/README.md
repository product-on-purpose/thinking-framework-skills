# plan_v0.11.0 - Contested lenses (the famous-but-weak frameworks, caveat-first)

**Status:** approved in principle; **revised after codex adversarial review** (`_agent-context/v0.11.0-spec-codex-review.md`). NOT build-ready until Phase 0 finalizes the contract (membership, the marker, the advisor policy, the site rendering, the eval-reporting posture). For a fresh session to execute agentically.
**Theme:** ship the small set of rejected frameworks that are genuinely *agent-runnable but weak* (SWOT and a few peers) as honest, low-tier, caveat-first skills; handle the famous-but-unrunnable instruments (MBTI and friends) with a single cautionary redirect. Honest-grading made stronger, not diluted.
**Spec (the contract):** `docs/internal/specs/2026-06-19-contested-lenses.md`. Read it first - it was tightened by the review and the buildable set is much smaller than the first draft implied (~5-12, SWOT the worked example).
**Version:** minor, **v0.11.0**. Catalog 56 core -> 56 core + N contested (reported as separate cohorts, not a single "74").

De-risk before scale: prove the caveat-first contract (the validator + one exemplar) and get it adversarially reviewed before any batch fan-out. The review confirmed this ordering is right; it also found the contract itself was under-built (no validator, no advisor policy, missing registration steps) - all folded in below.

## Guardrails

- **Do not build any skill until Phase 0 produces the final list AND Phase 1's validator + exemplar pass codex review.** The brand risk is a caveat that overclaims or launders, replicated by a batch.
- **Caveat-first is a CHECKED contract, not a style** - `scripts/check-contested.mjs` (new, Phase 1) enforces caveat placement; a build that puts the caveat late or omits it from the template is a red gate.
- **The honest low tier never changes** (`check-registry` enforces registry tier == frontmatter evidence-tier). `caveat_first` is a posture marker, not a second tier.
- **Three-test admission** (Phase 0): distinct AND agent-runnable (procedure + reusable artifact + a caveated mode that does not reproduce the falsified claim) AND in-charter. Anything failing any test stays documented-only or goes to the cautionary applicator. SWOT is the model.
- **No em-dashes / en-dashes** (the hook does not catch `fs.writeFileSync` from a node script - keep script-written content clean and scan after).

## Phase 0 - Finalize the contract (membership + the decisions, not "discovered")

Goal: the final qualifying list AND the contract decisions Phase 1 will implement.

1. **Three-bucket classification, per framework, from the registry's own reasoning** (not a heuristic): `distinct-runnable-weak` (ships as a contested-lens skill) / `overlap-with-shipped` (documented-only) / `out-of-charter-or-not-agent-runnable` (documented-only or the cautionary applicator). Record a one-line pass/fail on each of the three tests for every excl/flag entry. Expect the ships-as-skill set to be small (~5-12). SWOT passes; MBTI/DISC/Enneagram/learning-styles/strong-interest/belbin/cliftonstrengths fail (instrument / overlap); porters/jtbd/blue-ocean/ice-rice-wsjf fail (pm-domain); dot-voting/note-and-vote/scaled-participation fail (human-only); ooda fails (agent-architecture).
2. **IP screen** for any branded survivor: pick a descriptive slug/name (no `think-mbti`/`think-cynefin`/`think-porters-five-forces`); keep the branded term as an attributed alias in caveat prose, or exclude if the trademarked name is inseparable from the skill.
3. **Decide the contract** (these were "open questions"; resolve them now, not while authoring): the exact `skill.meta.yml` marker (`quality.caveat_first` + `quality.recommendation_policy: explicit_request_only`); how `gen-site.mjs` renders the "use with caution" admonition + non-green badge; how `gen-recommendable.mjs` + `check-registry.mjs` become policy-aware so a contested lens is in the corpus but never a default recommendation; the eval-reporting posture (core-56 and contested reported as separate cohorts).
4. **Codex review (light):** challenge the distinctness + runnability calls - is any "ships" candidate actually a near-twin of a shipped skill or not agent-runnable? Drop disputed ones.
5. Output: `plan_v0.11.0/membership.md` (final list + per-framework three-test record + chosen descriptive names + dossierPath) and a short `contract.md` (the marker schema, the advisor policy, the rendering, the eval posture).

## Phase 1 - Build the contract + the exemplar (the de-risking gate; one PR, codex-reviewed)

Goal: the enforcement + posture infra, proven on ONE skill, before any batch.

1. **`scripts/check-contested.mjs`** (new gate layer, wired into `check.mjs` - the gate becomes 9 layers): identifies contested skills by the marker; asserts the leading-caveat contract on SKILL.md / TEMPLATE / EXAMPLE / sample / eval-cases, and (branded) the attribution + trademark in the leading caveat block. Negative-test it (a late caveat must red the gate).
2. **Advisor policy plumbing:** `skill.meta.yml` marker schema; `gen-recommendable.mjs` carries `recommendation_policy` + `caveat_first`; `check-registry.mjs` shipped==recommendable becomes policy-aware; the advisor SKILL.md + its eval cases enforce explicit-request-only for contested lenses.
3. **Generators:** `gen-site.mjs` renders the "use with caution" admonition + badge from the marker; `gen-catalog.mjs` carries the marker.
4. **Hand-author ONE exemplar end to end: SWOT** (distinct, agent-runnable, tier X). Full caveat-first anatomy passing `check-contested`: SKILL.md (deficiency leads), TEMPLATE (pre-printed caveat block), EXAMPLE, `skill.meta.yml` (markers), `eval/cases.md` (caveat output-check); **register it in `library.json`**; registry `swot: excl/X -> shipped/X`; update `scripts/route-manifest.txt` for `/frameworks/think-swot/`; a caveat-first sample at `site/src/content/docs/samples/swot.md`. Regenerate everything; gate 0/0 (incl. check-contested); build + link/route guards.
5. **The cautionary applicator** (for the famous-but-unrunnable instruments): a single, non-recommendable, explicit-request-only skill that, when a user names a debunked instrument (MBTI, ...), states the limits and redirects to an evidence-based alternative. Build it here as part of the posture (it is the honest answer for the failed-the-gate famous names).
6. **Codex adversarial review of the validator + exemplar + applicator** before any batch: is the SWOT caveat honest (Hill & Westbrook 1997) and leading? Does the validator actually bite? Does the applicator redirect honestly without administering the instrument? Write findings to `_agent-context/` + confirm; inline-fallback. Resolve. Merge Phase 1 as its own PR.

## Phase 2 - Batch-build the remaining survivors (agentic Workflow)

- A `Workflow` over the Phase 0 list minus SWOT, serial groups of ~4-5 (throttle). One `general-purpose` subagent per lens, primed with: the **SWOT exemplar** (the caveat-first format that passes `check-contested`), the framework's **dossier** (caveat source), the registry reasoning + tier + branded?(descriptive name from Phase 0), the **caveat-first + IP rules**, `CONTENT-STYLE.md`, and the eval-cases caveat requirement. Each writes ONLY its own `skills/think-<slug>/` anatomy + a caveat-first `site/src/content/docs/samples/<slug>.md`. Registry + `library.json` + route-manifest edits are applied CENTRALLY (Phase 3) to avoid write races.
- Gotchas: Workflow result is under `.result` in the task `.output` file (the notification truncates); `agentType: 'general-purpose'` to Write; `resumeFromRunId` recovers rate-limited stragglers.

## Phase 3 - Integrate + regenerate + gate

1. **Register every new skill in `library.json`** (path, version, tier, status) - BEFORE the generators (PC-01; `gen-catalog` throws if library skill count != registry shipped count).
2. Apply all `excl/flag -> shipped` registry status changes centrally (surgical text-replace keeps other entries byte-identical).
3. **Update `scripts/route-manifest.txt`** for the new `/frameworks/think-<slug>/` routes (PC-02): build -> `node scripts/check-route-parity.mjs --update` (or hand-add) -> then `gen-catalog`.
4. Regenerate: `gen-registry`, `gen-recommendable` (policy-aware), `gen-site`, `gen-agents`, `gen-catalog`; `gen-manifest` + `gen-index` at the cut.
5. **Example coverage:** each new skill has its caveat-first sample at `site/src/content/docs/samples/<slug>.md` (PC-03). Do NOT `--update` to grandfather; a deferral needs a written exception.
6. Sweep the **un-gated count/prose surfaces** (the review and this session both flag these): README's four count surfaces + prose, `docs/architecture.md` (shipped count + the new contested posture + the check-contested gate layer + the cautionary applicator), `docs/getting-started.md`, `docs/README.md`, catalog headers, gen-site family intros. Keep the **cohort framing** ("56 core + N contested"), not a merged 74.
7. Gate green: `node scripts/check.mjs` 0/0 (9 layers incl. check-contested); `gen-recommendable.mjs --check`; `npm test`; site build + `check-rendered-links.mjs` (STRICT) + `check-route-parity.mjs`.

## Phase 4 - Evals (the caveat-enforcing measurement, with release thresholds)

- Run both evals on the new skills (`scripts/eval/`), serial groups of ~4; `resumeFromRunId` for stragglers.
- **Release-blocking thresholds (PC-04):** **0 false-fires is hard-blocking**; no contested lens may route a generic strategy/people/prioritization prompt away from a stronger shipped skill (verify the advisor explicit-only policy holds in the trigger eval); **every caveat output-check must pass** (the output eval enforces the caveat-first design); the core-56 routing/output numbers must not regress.
- **Report cohorts separately** (core-56 vs contested) in the scorecard; the public headline stays the core-56 numbers. Stamp the meta; write dated scorecards.

## Phase 5 - Adversarial review (codex, brand-critical)

- `codex:codex-rescue` (and/or a per-skill reviewer Workflow) reviews the batch for: evidence-honesty (each caveat honestly represents the deficiency per its dossier, no laundering/overclaim/false-endorsement, no famous deficiency understated); distinctness (none competes with a shipped skill in routing); IP (branded -> descriptive name + attribution/TM in the artifact, not only the registry); caveat-first construction (every artifact leads with the deficiency, passing `check-contested`).
- Write findings to `_agent-context/v0.11.0-batch-review.md` + confirm; inline-fallback if not retrievable (do not claim a review that produced no findings). Resolve blockers/majors.

## Phase 6 - Release cut v0.11.0

Per `release-process.md` (the v0.10.0 cut in `plan_v0.10.0` is the worked precedent):
1. CHANGELOG `[Unreleased]` -> `[0.11.0]` + milestone + fresh `[Unreleased]`; footer.
2. Version 0.10.0 -> 0.11.0 (`library.json` + `package.json`); regen manifests + INDEX (diff = version + the new roster only).
3. RELEASE-NOTES v0.11.0 - lead with the honest **cohort framing**: "56 evidence-graded core skills, plus N contested explicit-request lenses we grade honestly and hand you caveat-first," and the cautionary applicator for the famous-but-unrunnable.
4. README: version badge + status + current-version + history row; sweep the count surfaces with cohort framing (not a merged 74).
5. Reconcile `release-plans/README.md` (this row Planned -> Shipped) + this plan's status.
6. **Codex review of the cut** (count/version consistency, CHANGELOG/RELEASE-NOTES accuracy, cohort framing, the count-surface sweep); inline-fallback.
7. Gated (human authorizes): tag `v0.11.0` + push + GitHub release; **marketplace re-pin** on `product-on-purpose/agent-plugins` (git worktree off `origin/main`; tfs `sha`+`version`, bump `metadata.version`; `validate-registry.mjs` with `GITHUB_TOKEN`). Verify the deploy + footer.

## Reusable lessons carried in (2026-06-19 session)

- Batch agentic fan-outs into serial groups of ~4-5 (a >20-way Opus fan-out trips a server-side burst throttle); `resumeFromRunId` recovers stragglers; Workflow output is under `.result` in the task `.output` file (notification truncates).
- **codex:codex-rescue results are often not retrievable** - have codex write findings to a repo file AND confirm it; else review inline. Never claim a review that produced no findings. (This very plan was fixed by a codex review that DID land a file - it is worth the attempt.)
- A per-page/per-skill reviewer Workflow catches dishonest/overclaiming content that structural checks + spot-reads miss.
- Prose-doc drift is not gated (architecture.md had a stale 6-layer / 105-method count); sweep hand-authored docs by hand on a count change.
- `gen-manifest` is not per-PR (catches up at the cut); `recommendable-drift` is a separate CI job; the native-manifest diff at the cut is version + roster only.
- The generators read `library.json`, not `skills/` or the registry alone; `gen-catalog` throws on a library/registry shipped-count mismatch; it validates URLs against `route-manifest.txt`. Register + route-manifest BEFORE regenerating.
- Samples live at `site/src/content/docs/samples/<slug>.md`; the coverage ratchet scans `showcase/` + `samples/`; `--update` grandfathers (avoid for new skills).
- IP lint enforces branded -> attribution + trademark in the REGISTRY only; skill/artifact-level IP and descriptive naming need the new `check-contested` validator.

## Continuation prompt (paste into the new session)

```
Build plan_v0.11.0: ship the rejected frameworks that are genuinely AGENT-RUNNABLE BUT WEAK (SWOT and a few peers) as honest, low-tier, CAVEAT-FIRST skills, and handle the famous-but-unrunnable instruments (MBTI etc.) with a single cautionary redirect. Repo: E:/Projects/product-on-purpose/thinking-framework-skills. Read FIRST: docs/internal/specs/2026-06-19-contested-lenses.md (the contract, revised after a codex review) and docs/internal/release-plans/plan_v0.11.0/README.md (this plan). The codex findings are in _agent-context/v0.11.0-spec-codex-review.md.

CRITICAL corrections from the review (do not regress): the buildable set is SMALL (~5-12, not ~18-22) - a framework ships only if it passes a THREE-TEST gate: distinct (registry's own verdict) AND agent-runnable (procedure + reusable artifact + a caveated mode that does not reproduce the falsified claim) AND in-charter (not pm-domain, not human-only facilitation, not agent-architecture). MBTI/DISC/Enneagram/learning-styles/cliftonstrengths/belbin FAIL (instrument/overlap) -> cautionary applicator, not skills. Porters/JTBD/blue-ocean/ICE-RICE-WSJF FAIL (pm-domain). dot-voting/note-and-vote/scaled-participation FAIL (human-only). ooda FAILS (agent-architecture). SWOT is the exemplar.

Caveat-first must be a CHECKED contract: build scripts/check-contested.mjs (new 9th gate layer) before any batch. The advisor must NOT auto-recommend weak lenses: make gen-recommendable + check-registry policy-aware (recommendation_policy: explicit_request_only). Branded survivors get DESCRIPTIVE names (no think-mbti) + artifact-level attribution. Register every new skill in library.json AND update scripts/route-manifest.txt BEFORE regenerating (gen-catalog throws otherwise). Samples go to site/src/content/docs/samples/<slug>.md; do not --update the coverage baseline. Eval thresholds: 0 false-fires hard-block, no contested lens routes a generic prompt away from a shipped skill, every caveat output-check passes; report core-56 and contested as SEPARATE cohorts (do not headline a merged 74).

Order: Phase 0 finalize membership + the contract decisions (codex challenge) -> Phase 1 build the validator + advisor policy + ONE codex-reviewed exemplar (SWOT) + the cautionary applicator, BEFORE any batch -> Phase 2 batched authoring Workflow (serial groups ~4-5) -> Phase 3 register in library.json + route-manifest + regen all + sweep un-gated prose counts + caveat-first samples + gate 0/0 (9 layers) -> Phase 4 evals with the thresholds above -> Phase 5 codex evidence-honesty/IP/distinctness review (write-to-file or inline) -> Phase 6 cut v0.11.0 (cohort framing) + codex-review the cut + gated tag/push/release + agent-plugins re-pin (worktree off origin/main). Do NOT build until Phase 0 is final and Phase 1's exemplar + validator pass codex review.
```
