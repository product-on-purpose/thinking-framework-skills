# Release process - cutting a version

The repeatable steps to cut a release. This is the hygiene checklist; the [authoring loop](./AUTHORING.md) covers adding a single skill, this covers turning a batch of merged work into a tagged, published version. Keep it in sync with what actually happens; if a step changes, edit it here.

## What a release is

`main` is always green and deployable: every merged PR ships to the live docs site on push (see `.github/workflows/deploy-pages.yml`). A **release** is the separate act of stamping a version on the current `main` - bumping the version, consolidating the changelog, tagging, and re-pinning the marketplace so installers get the new build. Releases happen when a milestone is complete, not on a schedule.

## Versioning (semver)

The version lives in **two files that must match**: `library.json` and `package.json`. Pick the bump by what changed:

- **patch** (`0.3.0 -> 0.3.1`): conformance, docs, or bug fixes; no catalog change. (v0.2.1 was a patch.)
- **minor** (`0.3.0 -> 0.4.0`): new skills, new tools, new platform capability, or a user-visible site change. (v0.2.0, v0.3.0, v0.4.0 were minors.)
- **major** (`0.x -> 1.0`): a breaking change to the install surface or a deliberate 1.0 milestone.

## The gate must be green first

A release may only be cut from a state where the full gate passes. Run, from the repo root, **against the toolkit ref pinned in `.github/workflows/ci.yml`** (`.agent-skills-toolkit` - clone it next to the repo as a worktree if absent):

> **Grade against the pinned ref, not whatever toolkit you happen to have.** This repo pins Standard 0.8 (`library.json` `"standard"`), and the Standard grows faster than the pin moves. A newer toolkit checkout will report whole check families the pinned run does not (G7-G10 arrived at Standard 0.10, U13 at 0.12, U14 at 0.13), so grading against an unpinned sibling checkout produces a scary number that has nothing to do with what CI will say. If you see findings you do not recognise, check `git -C ../agent-skills-toolkit log -1` before investigating anything else.

```
node scripts/check.mjs          # advanced tier AT STANDARD 0.8, 0 errors (7 known U5 warnings, the contested lenses)
npm test                        # the node --test suites
npm --prefix site run build     # gen-site + astro build
node scripts/check-rendered-links.mjs site/dist   # no browser-broken internal links
node scripts/check-route-parity.mjs site/dist     # no dropped published route
```

These are the same checks CI runs (`.github/workflows/ci.yml`: `check`, `recommendable-drift`, `site-build`, `guard-tests`). If any is red, fix before cutting.

### Standard re-pin review (once per release, a decision not a task)

Because the tier claim is scoped to a Standard version, the pin is a thing to look at deliberately rather than drift past. At each cut, spend two minutes on:

1. `git -C ../agent-skills-toolkit log --oneline -5` and the `STANDARD.md` version header: how far ahead is the Standard?
2. Is anything in the gap **gating** rather than warning? A check that graduates from `warn` to `error` at a future version is a scheduled cliff, not a surprise.
3. Decide: hold the pin, or re-pin and budget the debt. **Record the decision** in the release's CHANGELOG entry either way, so the next cutter inherits a reason rather than a mystery.

**Current posture (decided 2026-08-14):** hold at Standard 0.8. Revisit at Standard 0.15, when the `S3` workflow mirror graduates from warn to error (toolkit ADR 0047) and this repo's nine undeclared `_workflows/` recipes would become nine gating errors. Declaring those recipes as real components is the fix, and it is worth doing for product reasons before it is forced for conformance reasons.

## Cut steps (to the gated line)

These steps are safe to do on a release branch and land in the cutting PR. An agent may prepare all of them; a human authorizes the tag and the marketplace re-pin (the last two steps).

1. **Complete `CHANGELOG.md` `[Unreleased]`.** Every merged-but-unreleased change must have a bullet under Added / Changed / Fixed / Removed, with its `[SP#, #PR]` tag. This is the most-missed step: entries are easy to forget when a PR merges, so reconcile `[Unreleased]` against `git log` since the last tag before cutting.
2. **Bump the version** in `library.json` and `package.json` (they must match).
3. **Regenerate the native manifests + index** via the pinned toolkit, then confirm the diff is **version-only**:
   ```
   node .agent-skills-toolkit/scripts/generators/gen-manifest.mjs . --target=all --write   # manifest.generated.json + .claude-plugin/plugin.json + .codex-plugin/plugin.json
   node .agent-skills-toolkit/scripts/generators/gen-index.mjs . --write                   # INDEX.md
   ```
   (`--target=all` requires `--write`.) A diff with anything other than the version string means the roster drifted - investigate before continuing.
4. **Consolidate the changelog.** Rename `## [Unreleased]` to `## [X.Y.Z] - YYYY-MM-DD`, add a one-line milestone summary under it, leave a fresh empty `## [Unreleased]` above, and update the compare-link footer (`[unreleased]: .../compare/vX.Y.Z...HEAD` and a new `[X.Y.Z]: .../compare/vPREV...vX.Y.Z`).
5. **Write the `RELEASE-NOTES.md` entry** - curated, user-facing highlights for the version (one short section, accessible language, not the technical changelog).
6. **Open the cutting PR.** Title `chore(release): vX.Y.Z - <milestone>`. Re-run the gate; merge when green.

## Gated steps (human authorizes - outward-facing, hard to reverse)

7. **Tag + GitHub release.** After the cutting PR merges to `main`: `git tag vX.Y.Z` (on the merge commit), push the tag, and create the GitHub release from the `RELEASE-NOTES.md` entry.
8. **Re-pin the marketplace.** Open a cross-repo PR on `product-on-purpose/agent-plugins` updating the `thinking-framework-skills` pinned ref to the new release commit and bumping the marketplace metadata version. Installers get the new build only after this merges.
9. **Verify the deploy.** Confirm the docs site redeployed from `main` (the deploy workflow) and the new version shows in the site footer.

## Post-release

- Update `docs/internal/release-plans/` (mark the shipped workstreams done; move the "Now" pointer).
- Record the release in the session log / memory if the project tracks one.

## Notes and footguns

- **Windows line endings.** `.gitattributes` pins LF repo-wide so the byte-exact drift guards compare identically; if a `git checkout` smudges a generated file to CRLF, regenerate to restore LF rather than committing the churn.
- **Pinned toolkit.** The manifests and the gate are generated/validated by the toolkit at the CI-pinned ref. Bump that ref deliberately (in `ci.yml` and your local worktree) when adopting toolkit changes; do not let a drifted local sibling toolkit silently change manifest bytes.
- **The version-only diff rule** (step 3) is the cheap guard that the manifests stayed in sync between releases; if the diff is larger, a skill was added/renamed without regenerating during normal development.
