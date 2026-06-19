# Spec: the samples corpus (one quick worked example per framework)

**Status:** in progress (this is the as-built record).
**One line:** a `samples/` section with a compact worked example for every shipped skill, so the example layer covers the whole catalog (56/56), not just the curated Showcase.

## Problem

Every framework page already carries the Northwind worked example (its `references/EXAMPLE.md`), but the cross-cutting *example layer* the example-coverage ratchet tracks - Showcase journeys and samples - reached only 21/56 after Track B. The other 35 shipped skills have no quick, browsable example outside their own page, and no second scenario beyond Northwind. The content plan flagged a "samples" corpus as the way to broaden the example layer without bloating the curated Showcase.

## Design

A new `site/src/content/docs/samples/` section, one page per skill, deliberately lighter than a Showcase journey:

- **Format (per page):** a one-line intro linking the framework page, then `## Situation` (2-4 sentences, a *fresh* scenario - not Northwind), `## Prompt` (a real `/think-<slug>` prompt), `## The artifact` (the full filled `references/TEMPLATE.md`), `## Why this framework fits` (1-2 sentences). Frontmatter `title` / `description` / `sidebar.label`.
- **Fresh scenarios:** each sample uses a different situation from the framework page's Northwind example - a cast member (Mira / Daniel / Priya) or a small invented scenario in the skill's domain - so the corpus adds variety, not duplication.
- **Sidebar:** a collapsed "Samples" group (`autogenerate` over the directory), placed after Showcase. Collapsed because it is a reference shelf (35+ entries), not a guided path.
- **Index:** `samples/index.md`, grouped by family, linking every sample (generated once from the directory so no entry is missed).
- **Coverage:** the example-coverage ratchet scans `samples/` for `think-<slug>` tokens, so each sample covers its skill. After this corpus the baseline is empty (56/56 covered).

## Build

This first corpus is **hand-authored by subagents** (a Workflow: one agent per uncovered skill, primed with the skill's `SKILL.md` / `TEMPLATE.md` / `EXAMPLE.md` + the cast + CONTENT-STYLE + the format, each writing `samples/<slug>.md` on a fresh scenario). The longer-term evolution the content plan describes - sample files as registry-adjacent *data* with generated "Real-World Examples" blocks - can replace the hand-authored pages later; this corpus establishes the surface and the format.

## Verification / DoD

- Per page: the four-part structure; the artifact matches the skill's `TEMPLATE.md` and is concrete; a non-Northwind scenario; links only to `../../frameworks/think-<slug>/` and `../../showcase/`; no dashes; frontmatter complete.
- Build + guards: `npm --prefix site run build`; `STRICT_ANCHORS=1 check-rendered-links.mjs` 0 broken; `check-route-parity.mjs` PASS (new routes additive).
- `node scripts/check-example-coverage.mjs --update` drops the baseline to 0 (56/56); `node scripts/check.mjs` 0/0.
- Site content only - no skill/registry change, no version bump.
