# Spec: Astro Starlight site conformance to the family standard

> A cross-cutting conformance effort (not a version line). It brings this repo's
> existing Astro Starlight docs site into compliance with the Product on Purpose
> family Astro site standard. Work lands in CHANGELOG `[Unreleased]` and ships with
> the next tag. Execution and checkboxes live in [`release-plan.md`](./release-plan.md).

## Target

Full compliance with the family Astro site standard, clauses 14.1 - 14.11
(`agent-plugins/standards/domains/astro-sites/SITE-STANDARD.md`). The site is already
Pattern S, fully Node, with the cleanest generator pipeline and a wired drift `--check`;
this is conformance hardening, not a rebuild.

## Source traceability

- Contract: `standards/domains/astro-sites/SITE-STANDARD.md` (clauses 14.1 - 14.11, decisions A-1..A-6).
- Conformance packet (scorecard + corrections): `standards/domains/astro-sites/rollout/thinking-framework-skills.md`.
- Sequencing: `standards/domains/astro-sites/ROADMAP.md` (Phase 0 item 0.1; Phase 1.3 pilot) and `ci-standard.md` (the four build-aware validators).
- Audit snapshot: tfs `main` @ 0673399, 2026-06-02.

## Scorecard at start (2026-06-02)

| Clause | Status at start | This effort |
|---|---|---|
| 14.1 Pattern S | PASS | - |
| 14.2 Framework | PASS | - |
| 14.3 Generate from source | PASS | - |
| 14.4 Drift guard | PASS | - |
| 14.5 No committed build output | PASS | - |
| 14.6 Deploy + PR build + pins | PASS (P2 nit) | P2 fixed (see 14.8) |
| 14.7 Base single source | PASS | - |
| 14.8 Versions + Node | PARTIAL (P2) | **Fixed:** align the `check` job to `.nvmrc` |
| 14.9 Search + SEO | PASS | - |
| 14.10 No config sidecars | **FAIL (P1)** | **Fixed:** delete the 7 repo-level sidecars |
| 14.11 Link/route integrity | **FAIL (P1)** | **Implemented locally** (rendered-link + route-parity; 2 of 4 per the ADR 0026 rationale) - see the reversal below |
| 14.11 detail (editLink) | P2 | **Fixed:** add the `/site/` segment to `editLink.baseUrl` |
| 14.11 detail (generated Edit links) | follow-up | **Fixed:** generated pages set `editUrl` to source (per-framework -> its `SKILL.md`) or `false`, so no Edit link 404s |

## Decision: 14.11 implemented locally (2026-06-02 follow-up - reverses the initial deferral)

**Reversal (2026-06-02 follow-up).** The two load-bearing build-aware guards (rendered-link
+ route-parity) are now **implemented locally**, reversing the deferral recorded below. The
post-rollout family learning flipped the default: the other three family repos implemented
14.11 locally and each caught real shipped breakage (a family-wide favicon 404; sixteen live
404s in writing-style-catalog), and the shared workflow is still unbuilt, so deferring left a
MUST unmet for an unbounded time. tfs already shipped a favicon (no favicon 404), but its pages
had no rendered-link guard - and on its first run the guard surfaced **43 pre-existing live
broken links** (a generator depth bug in the bibliography, an over-deep `explore/` link, a
`by-context` sibling link, two `.mdx` start-page links, and the three base-less 404 hero links),
now all fixed. Two of the four validators are ported (rendered-link + route-parity) from the
hardened agent-skills-toolkit versions; `verify-edit-links` and `remark-resolve-links` are
skipped with cause, per the ADR 0026 two-of-four rationale (the edit-link floor is meaningless
at this scale, and there are no relative `.md` links to repair). The one defect `verify-edit-links`
would have caught, the generated-page Edit-link 404, is fixed at the generator instead
(`gen-site.mjs` sets each generated page's `editUrl` to its true source or `false`). The guards
run on both the PR build and the deploy build; the base is single-sourced in `scripts/site-base.mjs`.
Migration to the shared workflow remains a swap when it ships.

### Superseded: the initial deferral decision (2026-06-02)

The four build-aware link/route validators (14.11) were initially **deferred to Astro standard
ROADMAP Phase 1.3** (the shared `workflow_call` pilot), reasoning that thinking-framework-skills
is the **designated pilot** and would gain all four guards via the shared workflow / preset,
shipping **no throwaway local scripts**. That reasoning is superseded by the reversal above
(the local guards are the standard's own sanctioned bridge, not throwaway: they migrate to the
shared workflow as a swap, and leaving a MUST unmet until the unbuilt infra lands was the worse
trade). Original rationale, retained for the record:

- The standard's own sequencing puts the four validators in a shared reusable workflow
  (`ci-standard.md` Step 0; ROADMAP Phase 1), with this repo named as the Phase 1.3 pilot
  that adopts them. The ROADMAP's Phase 0 for this repo (item 0.1) is the sidecar deletion
  only - the guards are explicitly a later phase.
- A repo-local port is the packet's *fallback* ("if proceeding before [the shared workflow]
  lands"). Porting now would create per-repo validators the shared workflow supersedes within
  weeks, and would do the `BASE` / edit-base-URL extraction here instead of in pm-skills (the
  donor), inverting the relationship the standard sets up.
- Neither the shared `product-on-purpose/.github` workflow nor the `astro-docs-preset` exists
  yet; Phase 1 is gated on pm-skills' base single-source extraction (ROADMAP 0.2).

This is "flag, don't diverge": the gap is **tracked and assigned**, not dropped.

Two guardrails on the deferral, both handled in this effort:

1. The editLink `/site/` segment is fixed by hand now. That latent 404 is the one thing
   `verify-edit-links` would have caught, so deferring the validator must not hide it.
2. No `route-manifest.txt` baseline is committed now: its format is owned by the shared
   `check-route-parity`, so the baseline is captured at pilot time to avoid a reformat.

## Acceptance criteria (done = all true)

1. `git ls-files | grep -E '\.(mjs|json|yml|yaml)\.md$'` returns nothing (the 7 sidecars gone).
2. Rationale from the deleted sidecars is preserved in `docs/internal/AUTHORING.md` and the
   generators' own header comments; no load-bearing fact is lost.
3. Every CI job resolves Node from `.nvmrc` (= 24); no hardcoded `node-version` remains in `ci.yml`.
4. Hand-authored page Edit links resolve to a real `.../edit/main/site/src/content/docs/...`
   path (the `/site/` segment present), verified against the built `dist`.
5. `cd site && npm run build` is green; no tracked build output (`.gitignore` intact).
6. The conformance gate (`node scripts/check.mjs`) stays green at `advanced`, 0/0.
7. The 14.11 deferral is recorded in this spec and in `release-plan.md`, dated.
8. CHANGELOG `[Unreleased]` records the changes. PR(s) prepared, not merged without maintainer confirmation.

## Follow-up acceptance (14.11 local guards, 2026-06-02)

9. `check-rendered-links` (STRICT_ANCHORS=1) and `check-route-parity` both pass against a fresh
   `site/dist`: 0 broken links, 0 broken anchors, route-parity equal.
10. `scripts/route-manifest.txt` is committed and tracked; both guards run in the PR build
    (`ci.yml` `site-build`) AND the deploy build (`deploy-pages.yml` `build`), gated on the build
    step's outcome.
11. The base literal is a consumed value only in `scripts/site-base.mjs` (consumed by
    `astro.config.mjs` and the rendered-link guard); the test value-pin, the `robots.txt` sitemap
    URL, and the 404 hero links are the sanctioned exceptions.
12. Generated-page Edit links resolve (`editUrl` set to source or `false`); no `editUrl` 404s.
13. The guard unit test (`npm test`) is green; no tracked build output; conformance gate green.

## Out of scope (by clause and by instruction)

- `verify-edit-links` and `remark-resolve-links` (the other two of the four 14.11 validators):
  skipped with cause per the ADR 0026 two-of-four rationale. The rendered-link + route-parity
  guards and the committed `route-manifest.txt` baseline are now IN scope and implemented (see
  the reversal above); the one `verify-edit-links` defect is fixed at the generator.
- Anything outside Astro site conformance (the packet's scope rule). The root
  `package.json` Node floor is a Standard Section 4.1 / core concern, not a 14.x site clause,
  and the conformance gate already passes - left untouched.
