# docs/

This folder is for people working **with the repo**: anyone browsing the source and anyone contributing to it. It covers install, architecture, contributing, the core concepts, and the per-file sidecars that sit next to code and config.

It is not the learning experience. The rendered guide for end users (quick-facts cards, worked examples, evidence dossiers) lives on the **[live site](https://product-on-purpose.github.io/thinking-framework-skills/)**, and the frameworks themselves are the skills in [`../skills/`](../skills/). The site is a generated view of those skills; it is the source of truth for using the library. This folder deliberately does **not** duplicate the site. It holds the material that has no other home.

## Map

- [getting-started.md](./getting-started.md) - install the plugin, run your first framework, and the cross-agent / clone paths.
- [architecture.md](./architecture.md) - how a skill is laid out, how `library.json` and the `_workflows` recipes feed `scripts/gen-site.mjs`, and why the skills (not the site) are canonical.
- [contributing.md](./contributing.md) - how to propose or change a skill, plus the evals and checks a change has to pass.
- [concepts.md](./concepts.md) - the vocabulary: cognitive-operation families, recipes, IDs (`thinking-framework-skills.<method>`), and the evidence tiers (S/M/P/V/A/C/X).
- [conformance.md](./conformance.md) - what advanced (Gold) tier means, the G1-G7 checks, and how this plugin meets (or vacuously passes) each.
- [internal/](./internal/) - **internal** specs, plans, research, and the authoring guide ([internal/AUTHORING.md](./internal/AUTHORING.md)). Working notes, not polished docs; expect churn.

## Per-file sidecars

Many code and config files have a `<name>.md` sidecar next to them (for example `gen-site.mjs.md` beside `scripts/gen-site.mjs`; the sidecar keeps the full filename including extension). The sidecar explains what that one file does, its inputs and outputs, and the gotchas. When you open an unfamiliar file, check for its sidecar first.

## Pointers off this folder

- The frameworks: [`../skills/`](../skills/) - 34 skills across 10 families, plus 5 composable recipes.
- The live docs site: <https://product-on-purpose.github.io/thinking-framework-skills/> - the reading experience, generated from the skills.
- The advisor (front door): pick a framework by describing your situation at <https://product-on-purpose.github.io/thinking-framework-skills/frameworks/think-framework-advisor/>.
