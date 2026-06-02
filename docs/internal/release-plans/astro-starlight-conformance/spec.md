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
| 14.11 Link/route integrity | **FAIL (P1)** | **Deferred** to ROADMAP Phase 1.3 (see decision below) |
| 14.11 detail (editLink) | P2 | **Fixed:** add the `/site/` segment to `editLink.baseUrl` |

## Decision: 14.11 is deferred to the shared-workflow pilot (2026-06-02)

The four build-aware link/route validators (14.11) are **deferred to Astro standard
ROADMAP Phase 1.3** (the shared `workflow_call` pilot). thinking-framework-skills is the
**designated pilot** and gains all four guards via the shared workflow / preset, so it
ships **no throwaway local scripts**.

Rationale:

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

## Out of scope (by clause and by instruction)

- The four 14.11 validators and a `route-manifest.txt` baseline (deferred, above).
- Anything outside Astro site conformance (the packet's scope rule). The root
  `package.json` Node floor is a Standard Section 4.1 / core concern, not a 14.x site clause,
  and the conformance gate already passes - left untouched.
