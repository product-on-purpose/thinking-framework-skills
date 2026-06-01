# recommendable.json

The machine-readable name-safety set that the Framework Advisor reads so it only recommends skills and recipes that actually exist.

## What is in it

A single JSON object with two arrays:

- `skills`: one entry per installable skill, each with its install `name` (the `think-` prefixed form), full `id` (`thinking-framework-skills.<method>`), `family`, evidence `tier`, and `description`.
- `recipes`: one entry per composable chain, each with `name`, `slug`, `recipe_doc` path, `description`, and the ordered `steps` (the skill names it runs).

Top-level fields record provenance: a `$note`, the `generated_from` sources, and `skill_count` / `recipe_count`.

## Why it matters

The Framework Advisor turns a user's situation into a Thinking Plan that names specific skills to run. This file is the closed set it draws from. Without it the advisor could hallucinate a plausible-sounding method that has no skill behind it, or recommend a renamed or removed skill. Constraining recommendations to this set keeps every suggestion real and runnable.

## Produced by / consumed by

- Produced by: `scripts/gen-recommendable.mjs`, which reads `library.json`, each skill's `SKILL.md` frontmatter, and the `_workflows` recipes.
- Consumed by: the `think-framework-advisor` skill at recommendation time.

## Do not hand-edit

This file is generated. Editing it by hand will drift it from the skills, which are the source of truth, and the next regeneration will overwrite your changes. When skills or recipes are added, renamed, or removed, regenerate it by running `scripts/gen-recommendable.mjs`.
