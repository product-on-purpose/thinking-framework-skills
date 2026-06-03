# v0.2.1 release plan

> **STATUS: IN FLIGHT (cutting 2026-06-03).** A maintenance release that tags the docs-site
> conformance work already merged to `main` since `v0.2.0`. No catalog changes. Canonical history:
> [`CHANGELOG.md`](../../../../CHANGELOG.md) and [`RELEASE-NOTES.md`](../../../../RELEASE-NOTES.md);
> folder purpose in [`../README.md`](../README.md).

## Why a release, and why a patch

Three site/CI conformance PRs landed on `main` after the `v0.2.0` tag and were never cut into a
release - they sat in `CHANGELOG [Unreleased]`. They include real user-facing bug fixes (43 live
broken links on the docs site), so they deserve a tagged line rather than only living on `main`.

**Version: `0.2.1` (patch).** The change set is site/CI conformance plus bug fixes. There are **no
new skills, no catalog changes, and no behavior change to any skill or to the plugin's API** - so
under semver this is a patch, not a minor. (`library.json` is the version source of truth; the U9
`version-match` check requires `package.json` to equal it.)

## What it tags (the `[Unreleased]` arc since v0.2.0)

| PR | Commit | What |
|---|---|---|
| #28 | `1148bc5` | Docs-site CI/deploy converged to the family Astro site standard (Pages artifact flow `@v5`, `.nvmrc` Node pin, `robots.txt`, advisor drift guard). |
| #30 | `53992c9` | 14.10 closed (7 repo-level `.md` config sidecars deleted) + two P2s (`check` job to `.nvmrc`; `editLink` `/site/` segment). |
| #31 | `53fd49e` | **14.11 reversal:** two local link/route guards (rendered-link + route-parity) ported from the hardened agent-skills-toolkit versions; single-sourced base (14.7); **43 pre-existing live broken links fixed**; generated-page `editUrl` fixed; guards wired in the PR + deploy builds + a `guard-tests` job. |

## Cut steps

1. **Version bump (done):** `library.json` + `package.json` `0.2.0 -> 0.2.1`; regenerate `INDEX.md`,
   `.claude-plugin/plugin.json`, `.codex-plugin/plugin.json`, `manifest.generated.json` via the
   toolkit `gen-index` / `gen-manifest`. Verified the regen diff is version-only, so it matches the
   CI-pinned toolkit ref's drift check.
2. **Notes (done):** `CHANGELOG` `[Unreleased] -> [0.2.1] - 2026-06-03` (+ fresh empty `[Unreleased]`,
   compare links); `RELEASE-NOTES` gains a curated `v0.2.1` section.
3. **PR + gate:** branch `chore/release-v0.2.1`; conformance gate green (`advanced`, 0/0, no drift);
   open PR; all CI checks green; squash-merge.
4. **Tag + release:** annotated tag `v0.2.1` on the merged commit; push; GitHub release with the body
   from the `RELEASE-NOTES` `v0.2.1` section.
5. **Marketplace:** in `product-on-purpose/agent-plugins`, re-pin the `thinking-framework-skills`
   entry (`sha` + `version 0.2.0 -> 0.2.1`) to the tagged commit and bump `metadata.version`; PR + merge.

## Acceptance (done = all true)

- `library.json` = `package.json` = the three native manifests = `INDEX.md` all read `0.2.1`.
- Conformance gate `advanced`, 0/0 (no manifest/index drift) locally and in CI.
- `CHANGELOG` has a dated `[0.2.1]`; `RELEASE-NOTES` has a `v0.2.1` section; both links resolve.
- Tag `v0.2.1` pushed; GitHub release published.
- Marketplace `thinking-framework-skills` pinned to the `v0.2.1` commit at `version 0.2.1`.

## Notes for next time

- This is a record-style plan written at cut time (the work was already merged). Per `README.md`,
  a release line ideally gets its `plan_vX/` folder when planning starts; this one is a tag-the-arc
  release, so the folder and the work coincide.
- The local 14.11 guards tagged here are the **bridge**, not the destination: the Astro standard
  ROADMAP Phase 1.3 names this repo as the shared-workflow pilot, which will later swap the local
  guards for the shared `workflow_call`. That is a future release, gated on infra in `agent-plugins`.
