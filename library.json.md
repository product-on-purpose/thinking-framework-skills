# library.json

The hand-authored manifest for the thinking-framework-skills library and plugin. It is the single source of truth for the library's identity and contents.

## What it does

It declares the plugin identity (`name`, `version`, `displayName`, `description`, `category`, `keywords`, `license`) and its build/distribution settings: the `standard` version it targets, its `tier` (`convergent`), the install `prefix` (`think-`), and the `agent-targets` it generates native manifests for (`claude`, `codex`). The `components.skills` array lists all 31 skills by name, with each skill's `path` to its `SKILL.md`, plus its `version`, `tier`, and `status`. It closes with `repository` and `homepage` URLs.

The skill `path` entries are the wiring that ties this manifest to the actual skill files under `../skills/`. The `prefix` is what turns a `name` like `think-premortem` into its installed command.

## Why it matters

Without this file there is no library: nothing knows which skills belong, where their `SKILL.md` files live, what version or evidence tier each carries, or how to address the plugin. A stale or wrong entry here means a skill silently drops out of the docs site and the generated native manifests, even though its files exist on disk.

## Produced and consumed by

Hand-authored. Edit it directly when you add, rename, retire, or re-grade a skill. See the authoring guide at [docs/internal/AUTHORING.md](./docs/internal/AUTHORING.md).

It is read by `scripts/gen-site.mjs` (which walks `components.skills` plus the `_workflows` recipes to generate the Starlight docs pages), by the agent-skills-toolkit generators and evaluator, and it is the input from which the native per-agent manifests are generated. The skills themselves remain the source of truth for their own content; this file is the source of truth for the roster.

The generated docs view is published at https://product-on-purpose.github.io/thinking-framework-skills/ .
