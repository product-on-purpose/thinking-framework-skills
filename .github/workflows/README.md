---
title: ".github/workflows - folder guide"
---

# .github/workflows

The CI workflows that self-host the Standard against this plugin and publish its docs site. Both are thin: per Standard sec 4.4, neither file carries validation logic of its own, only invocations of the portable scripts under [`../../scripts/`](../../scripts/README.md).

## Inventory

- `ci.yml` - the conformance-gate workflow (G2, self-hosting CI): runs `node scripts/check.mjs` (and `npm test`) against this plugin on every pull request and push to `main`.
- `deploy-pages.yml` - builds the Astro Starlight docs site (`npm run build`, which runs `scripts/gen-site.mjs` then `astro build`) and deploys the result to GitHub Pages.

## Relation to parent

This folder sits at the repo root (`.github/workflows/`, GitHub's fixed convention), as a sibling of `scripts/`, `docs/`, and `skills/` rather than a child of any of them. It is what makes the conformance claims published in the root `README.md` and `docs/conformance.md` verifiable on every change instead of merely asserted.
