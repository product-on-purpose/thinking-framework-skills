# Spec: changelog on the site + documentation audit-fixes + mermaid diagrams + CI guards

**Status:** approved in principle (brainstormed 2026-06-20), **revised after codex adversarial review 2026-06-20** (9 findings, all accepted; full review in `_agent-context/2026-06-20-spec-codex-review.md`). Approved 2026-06-20; release decided as **v0.12.0** (two-phase: build into `[Unreleased]`, then cut). Execution plans (sequenced, via writing-plans): `docs/internal/plans/2026-06-20-{changelog-site, ci-guards-gate, docs-audit-fixes, mermaid-diagrams, v0.12.0-release}.md`. Plan 1 (changelog-site) implemented + PR'd from `feat/changelog-site` (subagent-driven; per-task + whole-branch reviews clean; gate 0 errors). Audit record: `_local/audit/2026-06-20_docs-audit.md` (local).
**One line:** add a generated, SSOT-derived changelog to the docs site (a curated "What's new" + the full changelog), act on a full documentation audit (staleness, gaps, duplication), add nine mermaid diagrams across the GitHub-rendered repo docs and the astro-mermaid site, and lock the lot in with four new CI guards so the same drift cannot recur.

## Problem

Three user-requested gaps, plus what an audit surfaced while scoping them:

1. **No changelog on the site.** The canonical history lives at the repo root (`CHANGELOG.md`, `RELEASE-NOTES.md`) but a site visitor never sees it. The site is a generated view, so a hand-authored changelog page would immediately drift from the SSOT.
2. **Documentation has drifted in spots.** A read-only audit found real staleness (a contradictory tier line in AGENTS.md, a trust page lagging the v0.11.0 catalog, a stale site/README status), redirect-hop internal links, content gaps (contested lenses absent from the FAQ and contributing gate; compound grades undefined; builder discovery surfaces unlinked), and one fact (the conformance gate) described three inconsistent ways.
3. **Sparse diagrams.** Dense pipelines (the conformance gate, the eval harness, the recipe handoff, the decision stacks) are prose-only. `astro-mermaid` is already wired up and the repo docs render mermaid on GitHub, so the cost of adding diagrams is content, not infrastructure.
4. **The current CI did not catch any of the above.** The 9-layer gate guards generated-view drift and counts, but not: broken/unvalidated mermaid, internal links that lean on a compat redirect, broken relative links in repo-browser docs, or changelog/version skew. The audit is, in effect, a list of things CI should have caught.

## Decision

Four workstreams, all obeying the repo invariant: **sources are SSOT; downstream surfaces are generated and drift-checked.**

### Workstream A - Changelog on the site (two generated pages)

Generate two pages from the root SSOT files, never hand-authored:

- **"What's new"** at `site/src/content/docs/changelog/whats-new.md` from `RELEASE-NOTES.md` (curated, reader-facing). Opens with a generated mermaid release `timeline`.
- **"Changelog"** at `site/src/content/docs/changelog/full.md` from `CHANGELOG.md` (full Keep-a-Changelog detail).

Mechanics:

- **New pure module `scripts/lib/changelog-lib.mjs`** (zero-dep, explicit UTF-8, LF), used by `gen-site.mjs` and unit-tested:
  - `rewriteLinks(md, { selfLinks, repoBlobBase })` - a **markdown-aware** scanner (not a blanket regex; codex Major-6): it skips fenced code blocks (``` and ~~~), ignores image syntax `![alt](src)`, and handles BOTH inline links `[text](target)` and reference definitions `[label]: target` (CHANGELOG.md uses 14 of the latter for its version-compare footer, e.g. `[0.11.0]: ...compare/...`). For each rewritable `target`:
    - leave unchanged if `target` matches `^(https?:|mailto:|tel:|#|//)` (so the external compare-URL reference definitions are preserved verbatim);
    - if `target` (sans `#frag`) is `RELEASE-NOTES.md` / `./RELEASE-NOTES.md` -> `selfLinks.whatsNew` (+frag); if `CHANGELOG.md` -> `selfLinks.full` (+frag);
    - otherwise (any other repo-relative path or repo-relative reference definition) -> `repoBlobBase + normalizedPath` (+frag), i.e. a GitHub `blob/main/<path>` URL.
    - self-link `#frag` anchors are advisory (site heading ids may differ from GitHub's).
  - `extractReleaseTimeline(releaseNotesMd)` - parse `^## (v?\d+\.\d+\.\d+)` headings + the first following bold `**...**` theme line; emit a mermaid `timeline` (sanitize labels: strip `:`/newlines, collapse whitespace, truncate ~60 chars). Return `''` if zero versions parse (never emit an empty diagram).
  - `transformChangelog(md, opts)` - strip the H1, run `rewriteLinks`, return the body.
- **New block in `gen-site.mjs`** (codex Major-5 - exact placement matters): add `BASE` to the imports (`import { BASE } from './site-base.mjs';` - the script does not currently import it); add `changelog: join(DOCS, 'changelog')` to the `OUT` map so the existing `for (const d of Object.values(OUT)) fresh(d)` sweep creates it clean; and call the new `emitChangelog()` **after** that fresh sweep (emitting before it would have the sweep delete the pages). It reads `../RELEASE-NOTES.md` + `../CHANGELOG.md`, calls the lib with `BASE`-derived self-links (`${BASE}/changelog/whats-new/`, `${BASE}/changelog/full/`) and `repoBlobBase = https://github.com/product-on-purpose/thinking-framework-skills/blob/main/`, and wraps each with frontmatter + the standard `GENERATED by` banner. Frontmatter: `title`, `description`, `editUrl: false` (generated; instead the body opens with a "Source of truth:" GitHub link), and for the full page `tableOfContents: { maxHeadingLevel: 2 }` so the right-rail ToC lists versions, not every subheading.
- **`site/astro.config.mjs` sidebar**: add a `Changelog` group with explicit ordered items `['changelog/whats-new', 'changelog/full']`, placed after `About`.
- **`site/.gitignore`**: add `src/content/docs/changelog/`.
- **`scripts/route-manifest.txt`**: refresh via `check-route-parity.mjs --update` after the first successful build (added routes do not fail the guard, but the manifest should reflect reality).

### Workstream B - Documentation audit-fixes (the full ranked list)

Correctness / staleness:

1. **Repoint the 5 advisor links to the canonical `/tools/think-framework-advisor/`** in `site/src/content/docs/index.mdx`, `start/getting-started.mdx`, `learn/index.mdx`, `learn/build-with-the-library.md`, `about/faq.md`. (They currently resolve via the `astro.config` compat redirect - redirect-hops, not 404s - but internal links should target the canonical URL; the redirect stays for external bookmarks.)
2. **`AGENTS.md:122`**: "Bronze/Universal tier today" -> advanced (Gold). Hand-authored prose (outside the gen-agents markers); direct edit.
3. **`start/does-this-work.mdx`**: reframe the headline numbers as the 56 evidence-graded **core** skills, and add the already-measured **contested-lens cohort** (scorecards `docs/internal/eval-results/2026-06-19-contested-{trigger,output}-eval.*`: 0 false-fires, 40/40 output), with one sentence on how explicit-request-only lenses are consistent with "0 false-fires." Update the "all 56 shipped skills" framing to name the 63-skill catalog. No fresh eval run.
4. **`site/README.md`**: refresh the stale `:43` S2/S3/S4 "remaining" status and the `:30` "hand-authored = only start/" inventory (learn/, about/, explore/, samples/, showcase/ all ship now).
5. **Reconcile the "how many checks" story**: update `docs/contributing.md:30` (lists 4 of the gate layers) to the full current count, and add a cross-reference in `docs/conformance.md` and `docs/architecture.md` clarifying that the `check.mjs` layers are the repo gate and the toolkit's G1-G7 are the frozen Gold requirements - not the same list. (This count is updated to the post-Workstream-D total; see "Gate count ripple".)

Gaps:

6. **Contested-lens coverage**: a new FAQ entry in `about/faq.md` ("Why do you now ship SWOT / Five Whys if the evidence is weak?"), and a line in `docs/contributing.md` + `about/contributing.md` about the caveat-first requirement (`check-contested.mjs`) for low-tier proposals.
7. **Compound/split grades**: define `M/P`, `S/M` etc. in `start/evidence-model.md` (and `docs/concepts.md`).
8. **Builder discovery surfaces**: link `catalog.json` / `evaluated.json` / `llms.txt` / `llms-full.txt` from `learn/build-with-the-library.md` (and a builder line in `AGENTS.md`).
9. **Vocabulary**: add "recipe", "tool / meta-skill", and "contested lens" definitions to `docs/concepts.md` (which `docs/README.md:12` already claims it covers); add a qualitative mention of the conformance gate to `README.md` (link to `docs/conformance.md`, no new hard-count denormalization).
10. **`gen-registry.mjs` tweak** so the generated `about/why-not.md` distinguishes "documented-only" from "shipped caveat-first" (one note line). Drift-checked by the existing registry layer.

Restraint calls (decided):

- **Four commitments (6-way duplication)**: a **consistency pass** (make all six copies state the same four with identical names) + a "canonical: philosophy" pointer. NOT full centralization (it would harm each surface's readability).
- **`INDEX.md` "Skills (67)"**: leave as-is (generated by the external agent-skills-toolkit `gen-index`, not editable from this repo). Note only.
- **`site/src/README.md`**: does not exist and nothing references it; no action.

### Workstream C - Mermaid diagrams (both render paths)

Repo docs render via GitHub's native mermaid (carry an inline `%%{init}%%` theme matching `docs/architecture.md`'s existing diagram: `primaryColor #eef2ff`, `lineColor #6366f1`). Site pages render via `astro-mermaid` and inherit the global theme (no inline block). **Every diagram is validated with the Mermaid MCP at authoring time** (semantic correctness); the Workstream-D guard is the ongoing structural regression gate.

| # | File | Concept | Type | Path |
|---|---|---|---|---|
| 1 | `docs/conformance.md` | the gate layers + the toolkit G1-G7 relationship (also the fix for B5) | flowchart | repo |
| 2 | `start/does-this-work.mdx` | the blind eval harness (nothing grades itself) | sequence | site |
| 3 | `README.md` | situation -> advisor -> Thinking Plan -> skill(s) -> artifact (with Top-3 / Random branches) | flowchart | repo |
| 4 | `learn/composing.md` | recipe handoff - the named compressed artifact crossing each boundary | flowchart | site |
| 5 | `start/how-to-read-a-page.mdx` | the four progressive-disclosure layers (stop anywhere) | flowchart | site |
| 6 | `docs/architecture.md` | the registry <-> skills bidirectional integrity contract (a 2nd diagram) | graph | repo |
| 7 | `docs/concepts.md` (canonical; README links to it, not a duplicate) | the evidence-tier landscape (small core, large ring) - grouped subgraphs, not literal rings | graph | repo |
| 8 | `learn/decide-under-uncertainty.md` | the decision stack with the one-way/two-way reversibility branch | flowchart | site |
| 9 | `changelog/whats-new` | the release timeline (generated, Workstream A) | timeline | site |

### Workstream D - CI guards (the approved Tier 1 + 2 set)

The repo's guard pattern: pure logic in `scripts/lib/*.mjs`, a `scripts/check-*.mjs` runner wired as a `check.mjs` layer, unit-tested in `tests/*.test.mjs` (run by the `guard-tests` job). Four new guards:

- **D1 - Mermaid validity.** `scripts/lib/mermaid-lint.mjs` + `scripts/check-mermaid.mjs` + `tests/mermaid-lint.test.mjs`. Hard failures (v1, zero-dep, low false-positive): an unclosed ` ```mermaid ` fence, an empty block, or a **first content token** that is not a recognized diagram keyword. **First content token** is defined (codex Minor-7) as the first nonblank line that is NOT a `%%{...}%%` init directive or a `%%` comment - so the existing `docs/architecture.md` and `README.md` diagrams, which open with `%%{init...}%%`, are not false-flagged. Recognized keywords: graph, flowchart, sequenceDiagram, stateDiagram[-v2], classDiagram, erDiagram, journey, gantt, pie, timeline, mindmap, quadrantChart, gitGraph, requirementDiagram, block-beta, sankey-beta, xychart-beta, C4Context. Semantic correctness of the nine authored diagrams is covered at authoring time by the Mermaid MCP; a full headless `mermaid.parse()` is a documented future upgrade, deliberately not v1. Scan globs include `*.md` **and `*.mdx`** (planned site diagrams live on `.mdx` pages). Wiring: a `check.mjs` layer over repo docs (`README.md`, `AGENTS.md`, `docs/**/*.md`) + committed site content (`*.md`/`*.mdx`); plus a post-build step over `site/src/content/docs` to cover generated diagrams, added to **both** `.github/workflows/ci.yml` (the `site-build` job) **and `.github/workflows/deploy-pages.yml`** (codex Major-3 - the deploy artifact must be guarded too), with both "two guards" comments updated to "three".
- **D2 - Canonical-link (no redirect-hop).** Extract the `astro.config` `redirects` map into a new SSOT module `scripts/site-redirects.mjs` (mirroring `scripts/site-base.mjs`, imported as `../scripts/site-redirects.mjs`); `site/astro.config.mjs` and the guard both import it. `scripts/check-canonical-links.mjs` scans committed hand-authored site pages, resolves each internal link to its served path, and fails any link whose target matches a redirect *source* key, naming the canonical target. **The served-URL resolver must replicate Starlight's slug rules accurately (codex Major-4): a wrong rule is a silent false-negative that would miss the very redirect-hop the guard exists to catch.** Rules: root `index.mdx` -> `/`; a directory `index.md`/`index.mdx` -> that directory's path (the `index` segment normalizes to empty, NOT `/index/`); a leaf page -> its path; a frontmatter `slug:` overrides the derived path. Relative links resolve against the page's served URL via `new URL()`. Unit-tested (`tests/check-canonical-links.test.mjs` or a shared link-lib test) across all five: root `index.mdx`, directory `index.md`, `.mdx` leaf, normal leaf, and `slug:` override - the root case specifically pinning that the existing root advisor link resolves to `/frameworks/think-framework-advisor/` (the redirect source), not `/index/frameworks/...`. Wiring: `check.mjs` layer. **Ordering: B1 (fix the 5 links) must land with or before this guard, or CI reds.**
- **D3 - Repo-markdown relative links.** `scripts/check-repo-links.mjs` (sharing a small link-extraction helper with D2 where natural) over the repo-browser docs (`README.md`, `AGENTS.md`, `INDEX.md`, `CHANGELOG.md`, `RELEASE-NOTES.md`, `docs/**/*.md`; excludes `node_modules`, generated dirs, `docs/internal/eval-results/*.json`). Resolves every relative link against the file's dir and asserts the target exists; `#anchors` advisory. Scope v1 = repo-browser docs only (not `skills/**`). May surface pre-existing breaks to fix as part of B. Wiring: `check.mjs` layer.
- **D4 - Changelog lib tests + version-consistency lint.** `tests/changelog-lib.test.mjs` covers `changelog-lib.mjs`: link-rewrite of inline links, self-links (`RELEASE-NOTES.md`/`CHANGELOG.md`) with and without `#anchor`, repo-relative paths -> blob URLs, and the four markdown-aware cases (codex Major-6) - fenced code left untouched, images `![](...)` ignored, external reference definitions preserved, repo-relative reference definitions rewritten - plus timeline parse and empty input. `scripts/check-changelog.mjs` asserts `CHANGELOG.md` parses to >=1 `## [x.y.z]` section, has `## [Unreleased]`, and its top *released* version (the `[Unreleased]` section is exempt) equals `package.json` `version`, `library.json` `version` (codex Major-1 - `library.json` is the version `gen-site.mjs` reads for site metadata, so a guard on `package.json` alone could pass while the plugin/site version drifts), and the top `## vX.Y.Z` in `RELEASE-NOTES.md` (normalizing `v`/brackets). No git tags (avoids the `actions/checkout` shallow-fetch foot-gun). Wiring: `check.mjs` layer + the test in the existing `guard-tests` job.

## Cross-cutting: the gate count ripple (9 -> 13 layers)

Adding D1-D4 takes `check.mjs` from **9 to 13 layers**, and the post-build site guards from two to three (rendered-links, route-parity, generated-mermaid). Every place that states the count must move together, in the same change as Workstream D, so no doc is momentarily wrong:

- `scripts/check.mjs` header ("It runs nine layers" + the enumerated list -> thirteen, enumerate 10-13).
- `docs/architecture.md:100` ("nine layers in order") + the numbered list (add 10-13) + `:112` ("two build-time guards" -> three).
- `docs/conformance.md` - becomes the canonical layer enumeration (and the home of diagram #1), reconciled against G1-G7.
- `docs/contributing.md:30` (the "4 layers" list).
- `README.md` - the new qualitative gate mention links here rather than restating a number.
- `CHANGELOG.md [Unreleased]` - a new entry for the four guards and the changelog feature during the build phase; the capstone promotes it to `[0.12.0]` and adds the matching `RELEASE-NOTES.md` entry (see Release contract). (The historical "check-contested.mjs, the 9th" note in v0.11.0 stays accurate and is not rewritten.)

Diagram #1 (conformance flowchart) and the B5 reconciliation text both render the final 13-layer list, so they are authored *after* D lands.

## Release contract (codex Major-2; decided 2026-06-20: ship as v0.12.0)

The D4 version lint requires `package.json` = `library.json` = top *released* CHANGELOG version = top RELEASE-NOTES version. The work is sequenced in two phases so this invariant always holds:

- **Build phase: land everything in `CHANGELOG.md [Unreleased]`.** No version bump, no `RELEASE-NOTES.md` edit while building - the four versions stay `0.11.0` and agree, so D4 passes on every intermediate PR. The Full changelog page renders `[Unreleased]`, so the work is visible on the site immediately. This is also forced-correct: a bumped version sitting above an unpromoted `[Unreleased]` would red D4, so the bump cannot precede promotion.
- **Capstone phase (final, gated, deliberate): cut v0.12.0.** Once all build PRs are merged and the 13-layer gate is green, the LAST step promotes `[Unreleased]` -> `[0.12.0]` (with its compare-link reference definition + the `[unreleased]` compare link rebased to `v0.12.0...HEAD`), bumps `package.json` + `library.json` to `0.12.0`, adds a `## v0.12.0` `RELEASE-NOTES.md` entry, then tags, cuts the GitHub release, and re-pins the marketplace (agent-plugins metadata) per the standard release ritual. All four versions move together in this one commit so D4 stays green throughout. Triggered on user go, not entangled with the build.

Rationale: this clears the repo's release bar (v0.8.0 / v0.9.0 / v0.10.0 were all no-new-skill docs/infra releases; this adds the changelog feature, a docs quality pass, nine diagrams, and a gate generation 9 -> 13), and the new "What's new" page debuts already showing v0.12.0 rather than a stale prior release.

## Sequencing / dependencies (for the plan)

1. Workstream D first (it fixes the layer count) - but D2 requires B1 (link fixes) in the same change.
2. B5 reconciliation text + diagram #1 after D (they cite the final count).
3. A (changelog) before the `route-manifest.txt` refresh and before D4's version lint can be exercised end to end.
4. Each plan ships as its own PR and adds its own `CHANGELOG.md [Unreleased]` bullet(s) as it lands (so a merged feature is always recorded in the canonical changelog, and the Full changelog page renders it immediately). The bullets accumulate under `[Unreleased]`; the capstone promotes them to `[0.12.0]`. `RELEASE-NOTES.md` is untouched until the capstone.
5. Run `npm run gen` + `cd site && npm run build` + `node scripts/check.mjs` + the site guards before claiming the build phase done.
6. Capstone (final, gated, user go): cut v0.12.0 - promote `[Unreleased]` -> `[0.12.0]`, bump `package.json` + `library.json`, add the `RELEASE-NOTES.md` v0.12.0 entry, tag, GitHub release, marketplace re-pin (see Release contract).

## Out of scope

- Re-running the behavioral evals across all 63 skills (we cite the existing measured contested-lens cohort).
- Full centralization of the four commitments (consistency pass only).
- Editing the toolkit-generated `INDEX.md`.
- A real headless mermaid semantic parser in CI (structural v1 + authoring-time MCP).
- `skills/**` in the repo-link checker (repo-browser docs only in v1).
- Delivery mechanics (branch/PR shape) - decided when the plan is ready.
- Bundling other deferred work (e.g. the GA4 content-vs-acquisition decision) into v0.12.0 - this release is the docs/changelog/CI scope only.

## Risks and mitigations

- **D3 surfaces a backlog of pre-existing repo-doc broken links.** Mitigate: run it early to get the baseline; fix what it finds as part of B; if the set is large, fix the human-facing ones and grandfather the rest with a logged note rather than silently scoping down.
- **D1 false positives erode trust in the gate.** Mitigate: v1 hard-checks are only fence/empty/type; bracket-balance and semantics are out (authoring-time MCP covers semantics). Negative-test the lint.
- **Changelog link rewriting mis-handles an edge case** (anchored self-links, nested relative paths). Mitigate: unit tests (D4) cover self-links, anchors, and non-link code spans; self-link `#frag` anchors are advisory (site heading ids may differ from GitHub's).
- **The 62KB full changelog is a heavy page.** Mitigate: `tableOfContents` capped at version headings; it carries no diagram of its own (the only changelog diagram, the release timeline, lives on the lighter What's new page).
- **Count drift while editing** (9 vs 13 mid-change). Mitigate: the ripple list above is updated atomically in the D change.
- **Generated changelog pages get an `editUrl` to a gitignored file.** Mitigate: `editUrl: false` + an explicit "Source of truth" GitHub link in the body.

## Acceptance criteria (Definition of Done)

1. `/changelog/whats-new/` and `/changelog/full/` build, appear in the sidebar under "Changelog", render the SSOT content with rewritten links (no on-site 404s, no raw repo-relative links), and What's new opens with a valid release timeline. Both are gitignored and reproduced by `npm run gen`.
2. All 10 audit fixes landed; the 5 advisor links point at `/tools/`; `AGENTS.md` no longer self-contradicts on tier; `does-this-work` reflects the 63-skill catalog with the contested cohort; the conformance gate is described one consistent way at the post-D count.
3. Nine mermaid diagrams render (repo diagrams on GitHub, site diagrams via astro-mermaid), each validated by the Mermaid MCP.
4. Four CI guards live and wired: `check.mjs` runs 13 layers; `npm test` includes the changelog-lib and mermaid-lint suites; the `site-build` job validates generated diagrams. Each guard fails red on a planted violation and passes on the fixed tree.
5. `node scripts/check.mjs`, `npm test`, `npm run build`, `check-rendered-links.mjs`, and `check-route-parity.mjs` all pass locally; `route-manifest.txt` includes the two changelog routes.
6. Build phase: `CHANGELOG.md [Unreleased]` describes the changelog feature and the four new guards; versions stay `0.11.0` and D4 passes (`package.json` = `library.json` = top released CHANGELOG = top RELEASE-NOTES).
7. Capstone: v0.12.0 cut - `[Unreleased]` promoted to `[0.12.0]`, `package.json` + `library.json` at `0.12.0`, a `## v0.12.0` `RELEASE-NOTES.md` entry, tag + GitHub release + marketplace re-pin; D4 still green (all four = `0.12.0`); the live "What's new" page shows v0.12.0.

## Appendix: file-change inventory

**New files:** `scripts/lib/changelog-lib.mjs`, `scripts/lib/mermaid-lint.mjs`, `scripts/site-redirects.mjs`, `scripts/check-mermaid.mjs`, `scripts/check-canonical-links.mjs`, `scripts/check-repo-links.mjs`, `scripts/check-changelog.mjs`, `tests/changelog-lib.test.mjs`, `tests/mermaid-lint.test.mjs`, two generated pages under `site/src/content/docs/changelog/` (gitignored).

**Edited - generators / config / CI:** `scripts/gen-site.mjs` (import BASE; OUT.changelog; emit after fresh sweep), `scripts/gen-registry.mjs` (why-not note), `scripts/check.mjs` (4 layers, header), `site/astro.config.mjs` (import site-redirects; sidebar group), `site/.gitignore`, `scripts/route-manifest.txt`, `.github/workflows/ci.yml` + `.github/workflows/deploy-pages.yml` (generated-mermaid post-build step in both; "two guards" comments -> "three").

**Edited - docs (repo):** `README.md`, `AGENTS.md`, `docs/architecture.md`, `docs/concepts.md`, `docs/conformance.md`, `docs/contributing.md`, `CHANGELOG.md` (`[Unreleased]` in build; promoted to `[0.12.0]` in capstone), `RELEASE-NOTES.md` (capstone only), `package.json` + `library.json` (capstone version bump).

**Edited - docs (site authored):** `index.mdx`, `start/getting-started.mdx`, `start/does-this-work.mdx`, `start/evidence-model.md`, `start/how-to-read-a-page.mdx`, `learn/index.mdx`, `learn/build-with-the-library.md`, `learn/composing.md`, `learn/decide-under-uncertainty.md`, `about/faq.md`, `about/contributing.md`, `about/philosophy.md` (canonical commitments), `site/README.md`.
