# scripts/gen-recommendable.mjs

A hand-authored Node script that generates the Framework Advisor's name-safety set: the list of components the advisor is allowed to recommend.

## What it does

It reads `library.json` (the registration source of truth), joins each registered skill with its own `SKILL.md` frontmatter (name, id, family, evidence-tier, description), and gathers the recipes from `_workflows/*.md`. From that it emits two files into the advisor skill so they travel with it:

- `skills/think-framework-advisor/references/recommendable.json` - the machine-readable authoritative set.
- `skills/think-framework-advisor/references/recommendable.md` - a readable table of the same.

The advisor itself (`think-framework-advisor`) is excluded; it never recommends itself. The script has no dependencies and reads/writes UTF-8 explicitly so Windows cp1252 cannot corrupt the output. It ships a tiny tolerant frontmatter reader rather than pulling in a YAML library.

## Why it matters

The advisor is a router, and its one unforgivable bug is naming a skill that does not exist. This script makes that bug structurally hard: the advisor may only recommend names from the generated set, and the set is derived from what is actually registered. Without it, the advisor's name list would be hand-maintained and would drift the moment a skill or recipe is added, renamed, or removed.

## Produced and consumed by

- Produced: this script is hand-authored Node. Run `node scripts/gen-recommendable.mjs` from the repo root.
- The two `recommendable.*` files are GENERATED. Do not hand-edit them; regenerate after any skill or recipe is added, renamed, or removed.
- Consumed: `think-framework-advisor` reads the generated set at recommend time.
- CI guard: `node scripts/gen-recommendable.mjs --check` exits 1 if the output is stale, so a forgotten regenerate fails the build instead of shipping a drifted name set.

See the authoring guide for how skills register and what frontmatter the reader expects: [../docs/internal/AUTHORING.md](../docs/internal/AUTHORING.md). Skills live in [../skills/](../skills/).
