# plan_v0.12.0 - Docs platform: site changelog, CI guards, audit-fixes, diagrams

**Status:** **SHIPPED 2026-06-20 (v0.12.0).** All 5 phases complete: Plan 1 (site changelog, #86), Plan 2 (CI guards + gate 9 -> 13, #87), Plan 3 (docs audit-fixes + this release plan, #88), Plan 4 (8 mermaid diagrams, #89), and Plan 5 (the v0.12.0 cut). No new skills; the catalog stays 56 core + 7 contested.
**Theme:** make the docs site more legible, accurate, and self-maintaining - a generated changelog, a documentation audit acted on, clarifying diagrams, all locked in by new CI guards so the same drift cannot recur. Grew out of a user request (add a changelog, audit the docs, add mermaid diagrams) plus the CI guards adopted to keep the result honest.
**Spec:** `docs/internal/specs/2026-06-20-changelog-docs-audit-diagrams.md` (the four workstreams A/B/C/D, the codex adversarial review and its 9 resolved findings, and the Release contract). Audit record: `_local/audit/2026-06-20_docs-audit.md` (local). Codex spec review: `_agent-context/2026-06-20-spec-codex-review.md` (local).
**Version:** minor, **v0.12.0**. No new skills; the catalog stays 56 core + 7 contested. The headline is the docs platform + the gate generation (9 -> 13 layers).

De-risk by sequencing: each phase ships as its own PR, recorded in `CHANGELOG.md [Unreleased]`, with per-task + whole-branch + codex adversarial review and the full gate green before merge. The version bump and RELEASE-NOTES wait for the deliberate Phase-5 cut, so every build-phase PR stays green against the new version-consistency lint (`[Unreleased]` is exempt).

## The five phases (each its own plan doc + PR)

| Phase | Plan doc | PR | Status | End-user value |
|---|---|---|---|---|
| 1. Site changelog | `plans/2026-06-20-changelog-site.md` | #86 | **Merged** | "What's new" (with a release timeline) + the full changelog on the site, generated from the SSOT |
| 2. CI guards + gate (9 -> 13) | `plans/2026-06-20-ci-guards-gate.md` | #87 | **Merged** | keeps the docs/site correct as the library grows: no broken diagrams, redirect-hop links, or stale version numbers |
| 3. Docs audit-fixes | `plans/2026-06-20-docs-audit-fixes.md` | - | Pending | accurate, non-contradictory docs (trust page at 63, contested-lens FAQ, compound grades, builder surfaces) |
| 4. Mermaid diagrams (9) | `plans/2026-06-20-mermaid-diagrams.md` | - | Pending | comprehension: the eval harness, recipe handoff, decision stack, gate, tier landscape made visual |
| 5. v0.12.0 cut | `plans/2026-06-20-v0.12.0-release.md` | - | Pending | the whole effort published as one coherent versioned release |

Sequence: 1 -> 2 -> (3 || 4) -> 5. Plan 4's conformance-gate diagram cites Plan 2's settled 13-layer count, so 4 follows 2.

## Guardrails (carried from the spec + the v0.11.0 lessons)

- **Build phase only until the cut.** Each phase records its work in `CHANGELOG.md [Unreleased]`; no version bump, no `RELEASE-NOTES.md` content edit before Phase 5. The version-consistency lint (`check-changelog.mjs`, added in Phase 2) keeps `package.json` = `library.json` = top released CHANGELOG = top RELEASE-NOTES; `[Unreleased]` is exempt.
- **No em-dashes / en-dashes** anywhere (the hook does not catch `fs.writeFileSync` from a node script - keep generated content clean and scan after).
- **Generated surfaces stay generated.** Do not hand-edit `INDEX.md` (gen-index, G4-drift-checked), the generated site pages, or the other drift-checked views - edit the source and regenerate.
- **Diagrams (Phase 4):** repo docs render via GitHub native mermaid (inline `%%{init}%%` theme); site pages via astro-mermaid (no inline theme). Validate each with the Mermaid MCP at authoring time; the `check-mermaid` gate is the regression guard.
- **The conformance gate is 13 layers.** Any doc stating the count must agree (or point at `docs/conformance.md`); a count change sweeps every surface atomically.

## Phase-5 cut checklist (per `docs/internal/release-process.md`; v0.11.0 Phase 6 is the worked precedent)

1. `CHANGELOG.md [Unreleased]` -> `[0.12.0]` + milestone line + fresh `[Unreleased]`; rebase the `[unreleased]` compare-link to `v0.12.0...HEAD` and add the `[0.12.0]` compare-link.
2. Version `0.11.0` -> `0.12.0` in `library.json` + `package.json`; regenerate manifests + `INDEX.md` (diff = version only; no roster change this release).
3. `RELEASE-NOTES.md` v0.12.0 entry - lead with the user-facing value (a changelog on the site, clearer docs + diagrams, a self-maintaining gate); no new skills.
4. `README.md` version badge + status + current-version + history row (no catalog-count change).
5. Reconcile this `release-plans/README.md` row (In flight -> Shipped) + this plan's Status.
6. **Codex review of the cut** (version/count consistency, CHANGELOG/RELEASE-NOTES accuracy); inline-fallback if not retrievable.
7. Gated (user authorized): tag `v0.12.0` + push + GitHub release; **marketplace re-pin** on `product-on-purpose/agent-plugins` (git worktree off `origin/main`; update the tfs `sha` + `version`, bump `metadata.version`; `validate-registry.mjs` with `GITHUB_TOKEN`). Verify the deploy + the live "What's new" page shows v0.12.0.

## Definition of done (gates the tag)

- All four build-phase PRs merged; `node scripts/check.mjs` 0 errors (13 layers); `npm test` green; site build + the 3 post-build guards clean.
- The four versions agree at `0.12.0`; `CHANGELOG.md [0.12.0]` + `RELEASE-NOTES.md` v0.12.0 describe the shipped work; README + this record reconciled.
- Tag pushed, GitHub release cut, marketplace re-pinned, deploy verified.
