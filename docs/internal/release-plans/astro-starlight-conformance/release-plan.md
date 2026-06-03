# Release plan: Astro Starlight site conformance

> The executable checklist for the conformance target in [`spec.md`](./spec.md). The agent
> owns this file and ticks boxes as it executes. Started 2026-06-02 on branch
> `chore/astro-site-conformance`. Lands in CHANGELOG `[Unreleased]`.

## Decision updated: 14.11 implemented locally (2026-06-02 follow-up - reverses the deferral)

14.11 was initially **deferred** to Astro standard ROADMAP Phase 1.3 (the shared `workflow_call`
pilot). The post-rollout family learning **reversed that default**: the other three repos
implemented 14.11 locally and each caught real shipped breakage (a family-wide favicon 404;
sixteen live 404s in writing-style-catalog), and the shared workflow is still unbuilt, so
deferring left a MUST unmet for an unbounded time. So the two load-bearing guards (rendered-link
+ route-parity) are now **implemented locally**, ported from the hardened agent-skills-toolkit
versions; `verify-edit-links` + `remark-resolve-links` are skipped with cause (2 of 4, per the
ADR 0026 rationale). On its first run the rendered-link guard surfaced 43 pre-existing live
broken links, now all fixed. Full reversal rationale is in [`spec.md`](./spec.md). The local
guards are the standard's sanctioned bridge - they migrate to the shared workflow as a swap when
it ships.

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

## Follow-up checklist: 14.11 local guards (2026-06-02, reverses the deferral)

- [x] Single-source the base (clause 14.7): `scripts/site-base.mjs` exports `BASE`; `site/astro.config.mjs` and the rendered-link guard both import it (literal consumed only in `site-base.mjs`).
- [x] Port the two load-bearing guards from the hardened agent-skills-toolkit versions into `scripts/`: `check-rendered-links.mjs` (F2 bare-relative via `new URL()`, F3 both quote styles, F4 defensive decode, empty-dist hard-fail, STRICT_ANCHORS) and `check-route-parity.mjs` (base-agnostic, empty-dist hard-fail).
- [x] Fix the 43 pre-existing broken links the guard surfaced: bibliography depth, `explore/` index + `by-context` links (`gen-site.mjs`), two `.mdx` start pages, and the three 404 hero links (base hardcoded - a sanctioned 14.7 exception for the catch-all page).
- [x] Generated-page Edit links: `gen-site.mjs` sets each page's `editUrl` to its source (per-framework -> `SKILL.md`) or `false`; verified no `editUrl` 404s in `dist`.
- [x] Generate + commit `scripts/route-manifest.txt` from a clean build (78 routes); verify tracked.
- [x] Add the guard unit test (`tests/check-rendered-links.test.mjs`, 10 cases) + `npm test` script; green.
- [x] Wire both guards after `npm run build` in the PR build (`ci.yml` `site-build`) AND the deploy build (`deploy-pages.yml` `build`), gated on the build outcome; add a `guard-tests` CI job.
- [x] Record the reversal (this file + `spec.md`); add a CHANGELOG `[Unreleased]` entry.
- [ ] Open PR; CI green; await maintainer review (do not merge without confirmation).

## Notes (kept honest as it runs)

- 2026-06-02: Branch cut from `main` @ 0673399; baseline conformance gate green (`advanced`, 0/0).
- 2026-06-02: 14.10 + both P2s executed. Verified on the branch: 7 sidecars gone (grep empty); `site` build green (78 pages, sitemap emitted); all 4 CI jobs read `.nvmrc` (no hardcoded `node-version` left); hand-authored Edit links resolve to `.../edit/main/site/src/content/docs/...` in `dist`; conformance gate `advanced` 0/0; advisor drift in sync; no em/en-dashes; no tracked build output.
- 2026-06-02: Observation for the Phase 1.3 pilot (out of scope now): generated pages (gitignored) still emit Edit links to their on-disk generated path, so those links 404. `verify-edit-links` will flag this; the systematic fix (set `editUrl: false` for generated pages, or disable editLink on generated dirs) belongs with the 14.11 adoption.
- 2026-06-02 (follow-up): the 14.11 deferral is **reversed** - the two load-bearing guards are implemented locally (see the decision above). The generated-page Edit-link 404 noted directly above is now **fixed**: `gen-site.mjs` sets each generated page's `editUrl` to its true source (per-framework -> its `SKILL.md`) or `false`, verified in `dist`. On its first run the rendered-link guard (STRICT_ANCHORS=1) surfaced 43 pre-existing live broken links, all fixed; both guards are now green against a fresh `dist` (0 broken, 0 anchors, parity equal), `scripts/route-manifest.txt` (78 routes) is committed and tracked, and the guard unit test (10 cases) is green. The maintainer chose to hardcode the base in the 404 hero links (a sanctioned 14.7 exception, documented in `404.md` and `site-base.mjs`) over converting the 404 to `.astro`.
