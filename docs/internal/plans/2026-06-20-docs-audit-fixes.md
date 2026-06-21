# Documentation Audit-Fixes Implementation Plan (Plan 3 of 5)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Act on the remaining documentation-audit findings (Workstream B) - the staleness, gaps, and inconsistencies the audit surfaced - so the docs are accurate, complete, and non-contradictory.

**Architecture:** Mostly targeted edits to hand-authored docs, plus one generator tweak (`gen-registry.mjs`). No code logic beyond the generator. The "test" for each doc edit is that the conformance gate (count/link guards) and the site build stay green; for the generator edit it is the registry drift-check.

**Tech Stack:** Markdown/MDX docs, Astro Starlight, the zero-dep generators + 13-layer gate.

**Spec:** `docs/internal/specs/2026-06-20-changelog-docs-audit-diagrams.md` (Workstream B). Audit record: `_local/audit/2026-06-20_docs-audit.md`. Release plan: `docs/internal/release-plans/plan_v0.12.0/`.

## Global Constraints

- **No em-dashes or en-dashes** anywhere (plain hyphen only).
- Ground truth: **63 shipped (56 core + 7 contested), 4 tools, 9 recipes, 135 registry methods / 13 families, 13 gate layers, `think-` prefix, latest release v0.11.0.** Every count an edit introduces must match this.
- Do NOT hand-edit generated files (`INDEX.md`, the generated site pages, `why-not.md` output - edit `gen-registry.mjs` instead). `AGENTS.md` prose is hand-authored *outside* the `BEGIN/END GENERATED` markers (the tables are generated - do not touch those).
- Build phase: record the work in `CHANGELOG.md [Unreleased]`; no version bump.
- Already done in Plan 2 (do NOT redo): the 5+ advisor links repointed to `/tools/`; the gate-count reconciliation across architecture/conformance/contributing/README; the README qualitative gate mention.
- Commit messages end with the two trailers (`Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>` / `Claude-Session: https://claude.ai/code/session_01Re4ykqK5GHaeVvvS5P7boj`).

---

### Task 1: AGENTS.md - fix the contradictory tier line + add the builder discovery line

**Files:** Modify `AGENTS.md` (hand-authored prose only, outside the generated table markers).

- [ ] **Step 1: Fix the tier contradiction (B2).** Find the line in the Conventions section that reads `Plugin and skill standards align to `agent-skills-toolkit` (Bronze/Universal tier today).` It contradicts the same file's "validates at advanced (Gold) tier" and every other doc. Change "(Bronze/Universal tier today)" to "(advanced / Gold tier)".
- [ ] **Step 2: Add a builder discovery-surfaces line (B8, agent-facing half).** In the agent-facing guidance (near where the catalog/components are described), add one line pointing agents at the machine-readable discovery surfaces: `For machine consumption, the generated agent-discovery surfaces live at the site root: `llms.txt` (index), `llms-full.txt` (full inline catalog), `catalog.json` (invokable components), and `evaluated.json` (all 135 evaluated methods).` Match the file's existing prose style. Do not duplicate if already present.
- [ ] **Step 3: Verify + commit.** Run `node scripts/gen-agents.mjs --check` (the generated tables must still be in sync - your prose edits are outside the markers) and `node scripts/check.mjs` (0 errors). Commit `AGENTS.md`.

```bash
git add AGENTS.md && git commit -m "docs(agents): fix the stale Bronze/Universal tier line (-> Gold); link the agent-discovery surfaces"
```

---

### Task 2: does-this-work.mdx - the trust page reflects the 63-skill catalog (B3)

**Files:** Modify `site/src/content/docs/start/does-this-work.mdx`.

**Context:** The page currently presents the eval as the whole catalog at 56 ("53 of 56 skills", "2026-06-17 across all 56 shipped skills", "99% of 389 checks"). v0.11.0 added 7 contested lenses *after* that run; they were eval'd separately. The fix reframes the headline as the 56 evidence-graded **core** skills and adds the measured contested-lens cohort, so the page matches the 63-skill catalog and a skeptic sees no unexplained 56-vs-63 gap.

- [ ] **Step 1: Reframe the core numbers.** Make clear the headline numbers are the **56 evidence-graded core skills**: trigger eval 99% top-1, 0 false-fires across 673 cases; output 386 of 389 checks, 53 of 56 skills perfect; measured 2026-06-17. Keep the honest limits already on the page.
- [ ] **Step 2: Add the contested-lens cohort.** Add a short subsection: the 7 contested lenses (added v0.11.0) were evaluated as a separate cohort (scorecards `docs/internal/eval-results/2026-06-19-contested-{trigger,output}-eval.*`): **trigger 100% top-1 with 0 false-fires** (no contested lens grabs a generic prompt - it routes to the stronger core skill, which is exactly how explicit-request-only is supposed to behave) and **output 100% (40/40 caveat + artifact checks)**. State that the catalog is 63 (56 core + 7 contested), reported as separate cohorts, and the public headline stays the core-56 numbers.
- [ ] **Step 3: Update the `description` frontmatter** if it states a bare "56"/"389" in a way that now reads as the whole catalog - keep it accurate to the core-56 framing.
- [ ] **Step 4: Verify + commit.** `npm run gen` (the page is hand-authored, but confirm the site still generates) then `cd site && npm run build` + `STRICT_ANCHORS=1 node ../scripts/check-rendered-links.mjs dist` (the page's links/anchors resolve). Confirm no number on the page contradicts another. Commit.

```bash
git add site/src/content/docs/start/does-this-work.mdx && git commit -m "docs(trust): reflect the 63-skill catalog - core-56 headline + the measured 7-contested-lens cohort"
```

---

### Task 3: evidence-model.md + concepts.md - compound grades + missing vocabulary (B7, B9)

**Files:** Modify `site/src/content/docs/start/evidence-model.md` and `docs/concepts.md`.

- [ ] **Step 1: Define compound/split grades (B7).** In `start/evidence-model.md`, after the seven-tier ladder, add a short note defining compound grades (e.g. `M/P`, `S/M`): they record a method whose evidence spans two tiers (the governing/lead tier first), which is why catalog entries show two letters. Mirror the same definition in `docs/concepts.md` where it presents the tiers.
- [ ] **Step 2: Add the missing vocabulary to concepts.md (B9).** `docs/README.md` claims `concepts.md` covers "recipes, IDs ... and the evidence tiers," but `concepts.md` does not define "recipe", "tool / meta-skill", or "contested lens". Add concise definitions of those three terms (a recipe = a composable chain of skills under `_workflows/`; a tool / meta-skill = a skill that operates over the library rather than being a graded method, e.g. the advisor; a contested lens = a famous-but-weak framework shipped caveat-first, graded honestly low, explicit-request-only).
- [ ] **Step 2b: Verify the docs/README claim.** Re-read `docs/README.md:12`; if it still over-claims relative to the now-expanded concepts.md, tighten the claim to match. (Either concepts.md now covers it, or the claim is scoped.)
- [ ] **Step 3: Verify + commit.** `node scripts/check.mjs` (0 errors; check-counts + repo-links still green). Commit both files.

```bash
git add site/src/content/docs/start/evidence-model.md docs/concepts.md docs/README.md && git commit -m "docs(concepts): define compound grades + the recipe/tool/contested-lens vocabulary"
```

---

### Task 4: Contested-lens coverage in the FAQ + the contributing gates (B6)

**Files:** Modify `site/src/content/docs/about/faq.md`, `docs/contributing.md`, `site/src/content/docs/about/contributing.md`.

- [ ] **Step 1: FAQ entry.** In `about/faq.md`, add a Q&A near the top of the evidence-related questions: "Why do you now ship SWOT / Five Whys if the evidence is weak?" Answer: they ship as **contested lenses** - explicit-request-only, graded honestly low, and **caveat-first** (the deficiency leads the skill and the artifact); the advisor never reaches for one on a generic prompt; the headline is still the 56 evidence-graded core skills. Link to `why-not.md` and the contested-lens framing.
- [ ] **Step 2: Contributing caveat-first requirement.** In BOTH `docs/contributing.md` and `about/contributing.md`, add a line to the selection/authoring bar: a low-tier famous-but-weak method may ship only as a **contested lens** under the caveat-first contract (`check-contested.mjs` - the deficiency must lead every surface; branded lenses carry attribution); this is enforced by the gate.
- [ ] **Step 3: Verify + commit.** `node scripts/check.mjs` (0 errors). `cd site && npm run build` + rendered-link guard (faq.md links resolve). Commit the three files.

```bash
git add site/src/content/docs/about/faq.md docs/contributing.md site/src/content/docs/about/contributing.md && git commit -m "docs(contested): add a contested-lens FAQ + the caveat-first requirement to the contributing gates"
```

---

### Task 5: Builder discovery surfaces + site/README status refresh (B8, B4)

**Files:** Modify `site/src/content/docs/learn/build-with-the-library.md` and `site/README.md`.

- [ ] **Step 1: Builder discovery surfaces (B8).** In `learn/build-with-the-library.md`, add a section pointing builders at the machine-readable surfaces served at the site root: `llms.txt` (the llmstxt.org index), `llms-full.txt` (the whole catalog inlined), `catalog.json` (the invokable skills/tools/recipes with routing + chaining fields), and `evaluated.json` (all 135 evaluated methods). Note they are generated + drift-gated.
- [ ] **Step 2: site/README status refresh (B4).** In `site/README.md`, fix the stale status: the "hand-authored = only `start/`" inventory and the "Remaining: S2/S3/S4 ..." list predate the build-out. Update the hand-authored inventory to include `start/`, `learn/`, `about/`, `explore/` (chooser), `samples/`, `showcase/`, and `changelog/` (the generated changelog, Plan 1), and replace the S2/S3/S4 "remaining" list with the current state (the learning layer, FAQ, philosophy, learning tracks, the explore lenses, samples, showcase, and the changelog all ship).
- [ ] **Step 3: Verify + commit.** `cd site && npm run build` + rendered-link guard. Commit both files.

```bash
git add site/src/content/docs/learn/build-with-the-library.md site/README.md && git commit -m "docs(builders): link the machine-readable surfaces; refresh the stale site/README status"
```

---

### Task 6: Four-commitments consistency pass (the restraint-call item)

**Files:** Modify `site/src/content/docs/about/philosophy.md` (canonical), and reconcile the copies in `docs/concepts.md`, `docs/contributing.md`, `site/src/content/docs/about/contributing.md`, `AGENTS.md`, `site/src/content/docs/index.mdx`.

**Context:** The four authoring commitments are stated in ~6 places with drift risk. This is a **consistency pass**, NOT a de-duplication: make all copies state the same four commitments with identical names; designate `about/philosophy.md` as canonical and add a "canonical statement: philosophy" pointer in the others where natural. Do not gut the per-surface phrasing.

- [ ] **Step 1: Establish the canonical four** in `about/philosophy.md` (read its current statement; treat it as the source of the canonical names/wording).
- [ ] **Step 2: Reconcile the copies** so each of the other 5 surfaces names the same four commitments identically; add a brief "see philosophy for the canonical statement" pointer where it reads naturally. Touch only the commitments block in each file (leave the other content alone - some of these files were edited in earlier tasks; edit only the commitments here).
- [ ] **Step 3: Verify + commit.** `node scripts/check.mjs` (0 errors) + `cd site && npm run build` + rendered-link guard. Commit the touched files.

```bash
git add -A && git commit -m "docs(commitments): consistency pass on the four authoring commitments (canonical in philosophy)"
```

---

### Task 7: gen-registry.mjs - distinguish documented-only from shipped-caveat-first in why-not.md (B10)

**Files:** Modify `scripts/gen-registry.mjs`; regenerate `site/src/content/docs/about/why-not.md` (generated - via the generator, then drift-checked).

**Context:** `why-not.md` (generated from the registry) lists deliberately-excluded methods, but the now-shipped contested lenses (SWOT, Five Whys, ...) appear there too; a reader could wonder why they are both "shipped caveat-first" and in the why-not index. Add a one-line distinction.

- [ ] **Step 1: Read `scripts/gen-registry.mjs`** to find where it emits the why-not index, and how it already knows each entry's status / `caveatFirst` marker.
- [ ] **Step 2: Add the distinction.** For entries that are shipped contested lenses (status shipped + `caveatFirst`), render a short note/label distinguishing them ("shipped caveat-first - see its page") from the documented-only exclusions, OR add a one-line explainer at the top of the why-not index that some famous methods now ship as contested lenses. Keep it generated (no hand-edit of `why-not.md`).
- [ ] **Step 3: Regenerate + drift-check.** Run `node scripts/gen-registry.mjs` (writes `why-not.md`), then `node scripts/check.mjs` - the registry layer's generated-view drift-check must pass (committed `why-not.md` == fresh generation). Commit `gen-registry.mjs` + the regenerated `why-not.md`.

```bash
git add scripts/gen-registry.mjs site/src/content/docs/about/why-not.md && git commit -m "docs(why-not): distinguish documented-only exclusions from shipped contested lenses (generator)"
```

---

### Task 8: CHANGELOG [Unreleased] entry + full verification

**Files:** Modify `CHANGELOG.md`.

- [ ] **Step 1: Record the audit-fixes** in the `### Added`/`### Changed`/`### Fixed` subsections under `## [Unreleased]` (a `### Fixed` bullet for the staleness fixes - the AGENTS tier line, the does-this-work 63-catalog reframe, the site/README status; a `### Added`/`### Changed` bullet for the new FAQ/contributing/concepts/builder coverage + the why-not distinction). Keep it accurate; no version bump.
- [ ] **Step 2: Full verification** (capture each output): `npm test` (all pass); `node scripts/check.mjs` (13 layers, 0 errors); `cd site && npm run build` + `STRICT_ANCHORS=1 node ../scripts/check-rendered-links.mjs dist` (0 broken) + `node ../scripts/check-route-parity.mjs dist` (no removed routes) + `node ../scripts/check-mermaid.mjs src/content/docs` (0 issues). All must pass.
- [ ] **Step 3: Commit.**

```bash
git add CHANGELOG.md && git commit -m "docs: record the documentation audit-fixes in CHANGELOG [Unreleased]"
```

---

## Self-Review

- **Spec coverage (Workstream B remaining):** B2 (Task 1), B3 (Task 2), B7+B9 (Task 3), B6 (Task 4), B8+B4 (Tasks 1+5), B10 (Task 7), four-commitments (Task 6), CHANGELOG (Task 8). B1/B5/README-gate-mention were done in Plan 2 (not redone). INDEX.md "(67)" left alone (generated, external toolkit).
- **No code logic** except the `gen-registry.mjs` tweak (Task 7), which is drift-checked.
- **Count discipline:** every introduced count matches the ground truth (63 = 56+7, 4 tools, 9 recipes, 135 methods, 13 layers); the trust page (Task 2) is the one most at risk - it must be internally consistent (core-56 vs the contested cohort vs the 63 total).
- **Placeholders:** none; each task names the file + the exact finding + the target outcome.

## Execution Handoff

Plan 3 of 5. After it merges (recorded in `[Unreleased]`), Plan 4 (mermaid diagrams) is the last build phase, then Plan 5 cuts v0.12.0. Plan 4's conformance diagram cites the 13-layer count settled in Plan 2.
