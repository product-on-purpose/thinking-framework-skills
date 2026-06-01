# scripts/gen-site.mjs

The site generator: a hand-authored, dependency-free Node script that builds the Astro Starlight docs site from the skills library.

## What it does

It reads the source of truth - `library.json` plus each skill's files (`SKILL.md`, `evidence/dossier.md`, `references/EXAMPLE.md`, `skill.meta.yml`), the `_workflows` recipes (with prose from `recipes/`), and the hand-authored family intros under `site/intros/families/` - and emits the Starlight content pages under `site/src/content/docs/`:

- `frameworks/` - one page per skill (quick-facts card, mechanism and procedure, collapsible worked example, collapsible evidence dossier) plus an index.
- `families/` - one page per cognitive-operation domain, with the framework table and woven intro, plus an index.
- `recipes/` - one page per recipe chain, with a mermaid flow diagram and the step list.
- `evidence/` - the aggregated `bibliography.md` (graded sources pulled from every dossier) and an index.
- `explore/` - the five lens views (by-job, by-evidence, by-artifact, by-context, map) plus the Explore landing. The hand-authored `chooser.mdx` lives here too, so this directory is not wiped on each run.

It also writes two data files under `site/src/generated/`: `frameworks.json` (consumed by the interactive `Chooser.astro` component) and `site-meta.json` (version and counts, consumed by the footer).

## Why it matters

This is what makes the site a generated view rather than a second copy to maintain. The skills stay the single source of truth; the script keeps the docs in lockstep, including the evidence grading that is the product's whole point. Without it, every page would drift from its skill by hand.

## Produced and consumed by

Hand-authored, no dependencies. Run by `npm run gen`, and automatically before `astro build` (so `npm run build` regenerates first). It reads UTF-8 in and out, which matters on Windows where cp1252 would corrupt the content.

The pages it emits are gitignored. Do not hand-edit any generated page (each carries a `GENERATED ... do not hand-edit` banner); edit the underlying skill, recipe, or intro and regenerate. See the authoring guide at [../docs/internal/AUTHORING.md](../docs/internal/AUTHORING.md) and the skills directory at [../skills/](../skills/).
