# Release plan: Astro Starlight site conformance

> The executable checklist for the conformance target in [`spec.md`](./spec.md). The agent
> owns this file and ticks boxes as it executes. Started 2026-06-02 on branch
> `chore/astro-site-conformance`. Lands in CHANGELOG `[Unreleased]`.

## Decision recorded: 14.11 deferred (2026-06-02)

14.11 (the four build-aware link/route validators) is **deferred to Astro standard ROADMAP
Phase 1.3** (the shared `workflow_call` pilot). thinking-framework-skills is the designated
pilot and gains all four guards via the shared workflow / preset - **no throwaway local
scripts**. Full rationale and the two deferral guardrails (editLink fix now, no
`route-manifest.txt` baseline yet) are in [`spec.md`](./spec.md). This is "flag, don't
diverge": the gap is tracked and assigned, not dropped.

## Checklist

- [x] Create `spec.md` + `release-plan.md` under `docs/internal/release-plans/astro-starlight-conformance/`.
- [x] **P1 (14.10)** Relocate the JSON sidecars' rationale into `docs/internal/AUTHORING.md` (one consolidated section). The two generator `.mjs.md` are already covered by the scripts' own header comments.
- [x] **P1 (14.10)** Delete the 7 repo-level `.md` sidecars: `library.json.md`, `manifest.generated.json.md`, `scripts/gen-site.mjs.md`, `scripts/gen-recommendable.mjs.md`, `skills/think-framework-advisor/references/recommendable.json.md`, `.claude-plugin/plugin.json.md`, `.codex-plugin/plugin.json.md`.
- [x] **P1 (14.10)** Confirm `git ls-files | grep -E '\.(mjs|json|yml|yaml)\.md$'` is empty.
- [x] **P2 (14.8)** Set the `ci.yml` `check` job to `node-version-file: .nvmrc` (drop the hardcoded `node-version: '22'`); no hardcoded `node-version` remains.
- [x] **P2 (14.11 detail)** Add the `/site/` segment to `editLink.baseUrl` in `site/astro.config.mjs`, with the explanatory comment (mirror pm-skills).
- [x] **14.11** Record the deferral in `spec.md` + `release-plan.md` (done above).
- [x] Build green: `cd site && npm run build`; spot-check a hand-authored page's Edit link in `dist` resolves to `.../edit/main/site/src/content/docs/...`.
- [x] Conformance gate green: `node scripts/check.mjs` at `advanced`, 0/0.
- [x] No tracked build output; no em/en-dashes introduced.
- [x] CHANGELOG `[Unreleased]` updated (Removed sidecars, Changed node pin, Fixed editLink).
- [ ] Open PR; CI green; await maintainer review (do not merge without confirmation).

## Notes (kept honest as it runs)

- 2026-06-02: Branch cut from `main` @ 0673399; baseline conformance gate green (`advanced`, 0/0).
- 2026-06-02: 14.10 + both P2s executed. Verified on the branch: 7 sidecars gone (grep empty); `site` build green (78 pages, sitemap emitted); all 4 CI jobs read `.nvmrc` (no hardcoded `node-version` left); hand-authored Edit links resolve to `.../edit/main/site/src/content/docs/...` in `dist`; conformance gate `advanced` 0/0; advisor drift in sync; no em/en-dashes; no tracked build output.
- 2026-06-02: Observation for the Phase 1.3 pilot (out of scope now): generated pages (gitignored) still emit Edit links to their on-disk generated path, so those links 404. `verify-edit-links` will flag this; the systematic fix (set `editUrl: false` for generated pages, or disable editLink on generated dirs) belongs with the 14.11 adoption.
