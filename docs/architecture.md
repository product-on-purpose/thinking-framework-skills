# Architecture

How this repo is built. The short version: the skills are the only thing you edit, and everything else - the plugin manifests, the docs site - is a pure function of them.

## The single source of truth: the skills

Each framework lives in `skills/<name>/` and is self-contained:

- `SKILL.md` - the agent-executable mechanism, with frontmatter (name, description, metadata: id, family, evidence-tier) and the numbered procedure.
- `evidence/dossier.md` - the graded sources and the honest "what the research does and does not show" note.
- `references/EXAMPLE.md` - a full worked run on the shared scenario, plus a `TEMPLATE.md` for the artifact.
- `skill.meta.yml` - the routing sidecar (primary artifact type, problem contexts, thinking modes).
- `eval/cases.md` - the eval cases for the skill.

There are 31 skills across 10 cognitive-operation families, plus 4 recipes (composable chains) under `_workflows/` with their prose in `recipes/`. `library.json` is the manifest that lists every skill, its path, and its version. The skills install with a `think-` prefix and carry IDs of the form `thinking-framework-skills.<method>`.

## The generated-view principle: no second store

Nothing about a skill is hand-duplicated anywhere else. The docs site is not a copy of the skills that someone keeps in sync; it is regenerated from the skills on every build, so it cannot drift.

`scripts/gen-site.mjs` reads `library.json`, then for each skill reads its `SKILL.md` + `evidence/dossier.md` + `references/EXAMPLE.md` + `skill.meta.yml`, plus the `_workflows/` recipes and the hand-authored `site/intros/families/` intros. From those it emits the Starlight pages under `site/src/content/docs/{frameworks,families,recipes,evidence}` and the `explore/` lens pages (by job, by evidence, by artifact, by situation, the map), plus the chooser data in `site/src/generated/`. Every generated page carries a `do-not-hand-edit` banner. The output is gitignored: you edit the skill and regenerate, never the page.

This is the same idea applied to packaging: the native plugin manifests are generated from `library.json` by the `agent-skills-toolkit`, not maintained by hand.

```mermaid
%%{init: {'theme':'base','themeVariables':{'primaryColor':'#eef2ff','primaryBorderColor':'#c7d2fe','lineColor':'#6366f1'}}}%%
graph LR
  src["skills/ + library.json + _workflows/"]:::source
  gen["scripts/gen-site.mjs"]:::build
  site["Starlight site<br/>(frameworks, families, recipes, explore)"]:::site
  pages["GitHub Pages"]:::deploy
  src --> gen --> site --> pages
  classDef source fill:#eef2ff,stroke:#c7d2fe,color:#3730a3;
  classDef build fill:#ddd6fe,stroke:#a78bfa,color:#4c1d95;
  classDef site fill:#e0f2fe,stroke:#7dd3fc,color:#075985;
  classDef deploy fill:#dcfce7,stroke:#86efac,color:#166534;
```

The skills, `library.json`, and recipes feed `gen-site.mjs`, which emits the Starlight site (frameworks, families, recipes, explore), which deploys to GitHub Pages.

## The hand-authored learning layer

The only hand-written content is the connective tissue that the skills cannot generate: the learning layer under `site/src/content/docs/{start,learn,about,explore}` (getting-started, the evidence model, how-to-read-a-page, philosophy, FAQ, the interactive chooser) and the per-family intros in `site/intros/families/`, which `gen-site.mjs` weaves into each domain page. The split is deliberate: generated content is reference, hand-authored content is teaching. See [the documentation and site plan](./internal/research/documentation-and-site-plan.md) for the full information architecture.

## Where this `docs/` folder fits

This `docs/` folder is the repo-browser and contributor layer - what you read when you are working in the repository rather than visiting the site. It covers how the library is built and how to add to it, and points at the authoring guide ([AUTHORING.md](./internal/AUTHORING.md)) and the skills themselves (in [`../skills/`](../skills/)). The polished, reader-facing version of the same material lives on the [live docs site](https://product-on-purpose.github.io/thinking-framework-skills/), generated from the same skills.
