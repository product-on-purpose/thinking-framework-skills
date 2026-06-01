# package.json

The npm manifest for the Astro Starlight docs site that lives under `site/`.

## What it is

A hand-authored npm package manifest. It declares the docs site's name, Node engine requirement (Node >= 22.12.0), build/dev scripts, and the dependencies needed to generate and build the static site.

## What is in it

- **Scripts.** `gen` runs the site generator (`node ../scripts/gen-site.mjs`), which reads `library.json`, each skill's files, and the `_workflows` recipes to emit the Starlight pages. `dev` runs the generator and then `astro dev`; `build` runs the generator and then `astro build`. `start`, `preview`, and `astro` are thin passthroughs to the Astro CLI.
- **Dependencies.** `astro` and `@astrojs/starlight` (the docs framework), `astro-mermaid` (renders the mermaid diagrams, which follow the pm-skills house style), and `sharp` (image processing for Astro's asset pipeline).
- **overrides.** Forces specific transitive `mermaid` and `devalue` versions, pinning known-good versions instead of letting them float to an incompatible release. (Reproducibility across installs is the lockfile's job; see `package-lock.json.md`.)

## Why it matters

Without this file there is no docs site build: `npm install` in `site/` has nothing to resolve, and `npm run build` cannot regenerate pages or compile the site. The `gen`-before-`build` wiring is what keeps the published site in sync with the skills, which are the source of truth.

## Produces and consumes

Hand-authored and maintained by a person. It is consumed by `npm` (to install dependencies) and by the `gen` / `dev` / `build` scripts, which in turn invoke `scripts/gen-site.mjs` and the Astro CLI. The pages those scripts emit are generated and gitignored; this manifest is not.
