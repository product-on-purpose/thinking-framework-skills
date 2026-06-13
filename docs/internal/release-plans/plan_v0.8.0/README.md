# plan_v0.8.0 - Learn by example

**Status:** shipped (cut prepared; tag + marketplace re-pin are the human-authorized steps).
**Theme:** add the learn-by-example layer the catalog was missing - a Showcase, an operating guide, a prompt gallery, and a trust page that publishes the behavioral-eval numbers. No new frameworks; the catalog stays at 56 / 4 tools / 9 recipes.

## Context

The catalog and the Framework Library are complete (v0.7.1). The gap analysis in `_local/content-plan/` (the aggregated plan) found tfs is ahead of the pm-skills comparator on the catalog layer and behind only on the **learn-by-example layer**: no Showcase, no prompt gallery, no browsable worked examples beyond the single Northwind anchor. This release closes the highest-leverage part of that gap (the "five-things shortlist," minus the getting-started fix already shipped in the hygiene PR).

## What shipped

1. **Recurring cast** (`docs/internal/SCENARIO_PROFILES.md`) - Track A: Mira (founder, casual), Daniel (engineer, organized), Priya (policy analyst, detailed/by-hand). The keystone asset the Showcase and gallery reuse.
2. **Showcase** (`site/src/content/docs/showcase/`, new sidebar section) - 16 worked journeys + an index, each prompt-to-artifact: Mira x5 (incl. the stress-test-a-decision recipe and an advisor-first entry), Daniel x6 (incl. the audit-reasoning recipe), Priya x5 (incl. by-hand runs and the issue-position-argument recipe).
3. **"Does this actually work?"** (`start/does-this-work`) - the trigger and output eval numbers as a trust page, with honest limits.
4. **"Using the frameworks"** (`learn/using-the-frameworks`) - the flagship operating guide (beginner-to-advanced ladder, the SOFT context check, power-user patterns).
5. **Prompt Gallery** (`learn/prompt-gallery`) - real prompts in three styles, advisor-first.
6. **Discoverability** - Showcase card on the landing; the two guides surfaced on the Learn index.
7. **Reference** - `docs/internal/CONTENT-STYLE.md` (style guide + per-page definition of done).
8. **Metadata hygiene (the preceding PR, folded into this release):** stale catalog counts fixed in the repo-facing docs and the README caught up to current reality; `check-counts.mjs` extended so the drift class is a red build.

## Method note

The Showcase pages were authored by priming parallel subagents with the exemplar page (`showcase/mira-launch-premortem.md`, hand-authored), each protagonist's profile, the target skill's own `SKILL.md` / `TEMPLATE.md` / `EXAMPLE.md`, and strict link rules. The full site build + rendered-link guard + route-parity guard verified every page renders with zero broken links.

## Deferred (next waves, per the aggregated plan)

- **Track B Showcase** - the pm-skills company threads (Storevine / Brainshelf / Workbench) expanded into the decision layer, with the tfs -> pm-skills handoff. Cross-library; the highest-value follow-on.
- **Generation of the example layer from data** - sample files as registry-adjacent data, generated "Real-World Examples" blocks on each framework page, a generated samples index, and `llms.txt` / machine-readable discovery. v0.8.0 ships the pages hand-authored; generation is the scale follow-up.
- **A surfaced Reference section, the situation guides, per-platform quickstarts, the positioning and concepts pages, and the measurement loop** (analytics + "was this helpful?"). See the aggregated plan, sections 5-10.
- **A full-catalog eval re-run** across the current 56 skills (the published numbers are the 47-skill run).

## Cut checklist (this release)

- [x] Gate green (`check.mjs`, `npm test`, site build, rendered-links, route-parity).
- [x] Version bumped 0.7.1 -> 0.8.0 (`library.json` + `package.json`).
- [x] Manifests + INDEX regenerated; diff is version-only.
- [x] `CHANGELOG.md` `[0.8.0]` consolidated; footer compare-links updated; fresh `[Unreleased]`.
- [x] `RELEASE-NOTES.md` v0.8.0 entry (two audiences: for everyone / for builders).
- [x] README version badge, project status, and release-history updated.
- [ ] Tag `v0.8.0` + GitHub release (human-authorized).
- [ ] Marketplace re-pin on `product-on-purpose/agent-plugins` (human-authorized).
- [ ] Verify deploy + footer version.
