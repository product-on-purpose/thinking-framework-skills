---
title: "scripts - folder guide"
---

# scripts

The portable Node tooling behind this plugin's conformance gate, generators, and site build: every script a contributor or CI runs directly, plus the two subfolders (`eval/`, `lib/`) it delegates to. Each hand-authored `.mjs` carries a four-field `what-it-is` / `what-it-does` / `why` / `used-by` header (G9); read that header before reading the body.

## Inventory

- `check-canonical-links.mjs` - check.mjs layer 12: fails any committed page whose internal link targets a redirect source rather than the canonical destination.
- `check-changelog.mjs` - check.mjs layer 14: CHANGELOG.md parses to at least one released version and stays shape-consistent with the declared release version (D4).
- `check-contested.mjs` - check.mjs layer 10: the caveat-first conformance layer for contested lenses (DS-01) - every `caveatFirst: true` framework must lead with its deficiency.
- `check-counts.mjs` - check.mjs layer 7: verifies the hand-authored README.md count surfaces (badges, lifecycle map, catalog totals) against the machine-readable sources.
- `check-eval-results.mjs` - gate layer 15: walks `docs/internal/eval-results/` and asserts every scorecard is a paired, well-formed `.md`/`.json` that does not overclaim what the sidecars record.
- `check-example-coverage.mjs` - the example-coverage ratchet (check.mjs layer 8): fails if any newly shipped skill has no worked example referencing its slug.
- `check-mermaid.mjs` - check.mjs layer 11: structurally validates every fenced ` ```mermaid ` block in the given files or directories.
- `check-proposed-entry.mjs` - SP5 C3: pre-validates one proposed framework-registry entry before review, used by the `think-research-framework` research subagent.
- `check-registry.mjs` - the strong CI guard around `frameworks/registry.mjs` (SP3 C3): the required check gate over the frameworks catalog.
- `check-rendered-links.mjs` - the site's rendered-link guard (Astro-site-standard clause 14.11(a)): asserts a built `site/dist/` has zero browser-broken internal links.
- `check-repo-links.mjs` - the repo-browser analog of `check-rendered-links.mjs`: asserts every relative markdown link in the repo-side docs resolves to a real file.
- `check-route-parity.mjs` - clause 14.11(b): guards against silently removing a published route, run against a built `site/dist/`.
- `check.mjs` - the repo's single CI conformance gate entry point (G2 self-hosting CI); the one command a contributor or CI runs to validate this plugin against the Standard.
- `eval-cases.mjs` - the deterministic, non-model half of the eval-cases contract (SP1): walks every skill's `eval/cases.md` and checks its shape.
- `eval/` - the behavioral eval harness (trigger, output, skill-selection, and dispatch evals) - a periodic model-executed measurement, distinct from the static `eval-cases.mjs` gate layer above. See [`eval/README.md`](./eval/README.md).
- `example-coverage-baseline.txt` - the grandfathered skill-slug list `check-example-coverage.mjs` exempts from the ratchet.
- `gen-agents.mjs` - generates the drift-checked Skills and Recipes tables inside the repo's `AGENTS.md`.
- `gen-catalog.mjs` - generates the public machine-readable catalog and the `llms.txt` discovery index, so other agents can discover and route to these skills.
- `gen-engine.mjs` - the drift guard and copier that mirrors the shared applicator engine document to its second skill.
- `gen-recipe-commands.mjs` - turns each `_workflows/<name>.md` recipe source into `commands/<name>.md`, and each allowlisted recipe into `agents/<name>.md` as well.
- `gen-recommendable.mjs` - derives `think-framework-advisor`'s name-safety "recommendable set" by joining `library.json` against each skill's own metadata.
- `gen-registry.mjs` - renders `frameworks/registry.mjs` into its generated views, including the family tables spliced into the research catalog doc.
- `gen-site.mjs` - builds the Astro Starlight site's content collection from `library.json` plus each skill's `SKILL.md` / `evidence/dossier.md` / `references/`.
- `lib/` - the shared, mostly pure library these check and generator scripts import. See [`lib/README.md`](./lib/README.md).
- `research-appendix.mjs` - a maintainer tool (not a gate layer): writes the dedup appendix for an external research wave to the gitignored `_local/`.
- `route-manifest.txt` - the committed route baseline `check-route-parity.mjs` compares a freshly built site against.
- `setup-toolkit.mjs` - the first-run setup step that puts the conformance validators on disk at exactly the commit CI grades against, so `npm run check` works on a fresh clone.
- `site-base.mjs` - the single exported `BASE` constant naming the site's deployed base path; `astro.config` and the link guards import it rather than redeclaring the literal.
- `site-redirects.mjs` - the single source for the site's redirect map (clause 14.7): old published URL to its current destination.
- `sweep-crossref.mjs` - a maintainer tool (not a gate layer, needs the network): asks CrossRef about every DOI the library cites, run before a research wave admits new sources.

## Relation to parent

This is the one FIXED_ROOTS folder most contributors touch directly: it is where `npm run check`, `npm test`, and the site build all resolve to, and `.github/workflows/ci.yml` invokes `check.mjs` from here rather than duplicating any of its logic.
