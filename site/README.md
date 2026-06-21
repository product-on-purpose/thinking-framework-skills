# Docs site (Astro Starlight)

The public documentation site for `thinking-framework-skills`. It is a **generated view** of the skills library, not a second copy: `scripts/gen-site.mjs` reads `library.json` and each skill's `SKILL.md` / `evidence/dossier.md` / `references/EXAMPLE.md` / `skill.meta.yml` plus the `_workflows/` recipes, and emits the pages under `src/content/docs/{frameworks,families,recipes,evidence}`. Those generated pages are gitignored; the skills are the source of truth.

## Develop

```bash
cd site
npm install
npm run dev      # runs gen-site.mjs, then astro dev
```

## Build

```bash
npm run build    # runs gen-site.mjs, then astro build -> dist/
npm run preview  # serve the built dist/
```

`npm run gen` regenerates the content pages without building.

## Dependencies and build wiring

- **gen-before-build.** `dev` and `build` run `../scripts/gen-site.mjs` first, then the Astro CLI. Running the generator before Astro is what keeps the published site in sync with the skills (the skills are the source of truth; the site is a view).
- **Pinned overrides.** `package.json` overrides `mermaid` (`^11.15.0`) and `devalue` (`^5.8.1`) to known-good transitive versions so an incompatible release cannot float in. Exact, reproducible installs are the lockfile's job (`npm ci`).
- **Node.** `engines.node` is `>=22.12.0` (Astro 6's floor). The repo-root `.nvmrc` pins Node `24` (Active LTS) for local dev and CI.

## What is hand-authored vs generated

- **Hand-authored** (committed under `src/content/docs/`): the landing page (`index.mdx`), `start/` (getting-started, evidence model, how-to-read-a-page, does-this-work), `learn/` (build-with-the-library, composing, learning tracks), `about/` (FAQ, philosophy, contributing, why-not), `explore/` (the framework chooser), `samples/` (worked-example corpus), `showcase/` (real-world application stories), and `changelog/` (the human-readable release log).
- **Generated** (gitignored; produced by `gen-site.mjs`): `frameworks/` (one layered page per skill), `families/` (one page per domain), `recipes/`, and `evidence/` (the aggregated bibliography). Do not hand-edit these; edit the skill and regenerate.

## Per-framework page layers (progressive disclosure)

Each framework page renders four layers so a reader can stop at any depth: a quick-facts card, the mechanism + procedure (the skill body), a collapsible worked example, and a collapsible full evidence dossier with graded sources. See `docs/internal/research/documentation-and-site-plan.md` for the full plan.

## Deploy

GitHub Pages via `.github/workflows/deploy-pages.yml` (manual `workflow_dispatch` until the go-public flip enables Pages and adds the push trigger). Base path: `/thinking-framework-skills`.

## Status

The site ships as of v0.11.0. All planned content layers are live:

- **S0 + S1 (scaffold + generated pages):** frameworks (63 skills, 7 contested lenses), families (13), recipes (9), bibliography - generated and drift-gated.
- **Learning layer:** getting-started, evidence model, how-to-read-a-page, does-this-work, build-with-the-library, composing skills, learning tracks.
- **About / philosophy:** FAQ, philosophy, contributing, why-not index.
- **Explore:** framework chooser (by job, by tier, explore lenses).
- **Samples + Showcase:** worked-example corpus (63 skill samples), real-world application stories.
- **Changelog:** human-readable release log auto-generated from the registry.
- **Machine-readable surfaces at the site root:** `llms.txt`, `llms-full.txt`, `catalog.json` (63 invokable entries), `evaluated.json` (135 evaluated methods) - all generated + drift-gated.

Deploy is via GitHub Pages (`deploy-pages.yml`), triggered on push to `main`.
