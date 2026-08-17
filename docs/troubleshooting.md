# Troubleshooting

Every entry starts with the **actual text you will see**, so you can match on the error rather than guess which section applies. Search this page for a fragment of your output.

If something here is wrong or missing, that is a bug worth filing: an error a user cannot resolve from the docs is the same class of defect as an error with no message.

---

## Install and invocation

### The plugin installed, but `/think-premortem` does not appear

Claude Code exposes plugin skills after the plugin is installed **and** the session has picked it up. In order:

1. Confirm the marketplace and plugin are both added:
   ```bash
   /plugin marketplace add product-on-purpose/agent-plugins
   /plugin install thinking-framework-skills@product-on-purpose
   ```
2. **Restart the session.** A newly installed plugin is not always visible to an already-running session.
3. Confirm the name. Every framework is prefixed `think-` (`think-premortem`, not `premortem`). The prefix exists to avoid collisions with other plugins.

If it still does not appear, list what the plugin actually registered: `INDEX.md` in this repo is the generated roster of everything shipped.

### A recipe does not run as one command

Recipes are `think-<name>` commands too (`/think-stress-test-decision`). If a recipe command is missing while individual skills work, you are on a version before recipe commands shipped. Check `CHANGELOG.md` for "make the nine recipes runnable"; before that release the recipes were documentation only, and you run their steps by hand from `_workflows/<name>.md`.

### The skill fires but the output is prose, not an artifact

Every skill is supposed to emit a concrete artifact. If you get an essay:

- Say what you want explicitly: *"run the premortem and give me the risk register table"*.
- The artifact shape is in the skill's `references/TEMPLATE.md`, and a worked example is in `references/EXAMPLE.md`. Pasting the template into your prompt is a legitimate fallback.
- If a skill reliably produces prose instead of its artifact, that is a real bug. File it with the prompt you used.

---

## The conformance gate (`npm run check`)

### `Conformance gate: agent-skills-toolkit (the validators) not found.`

```
Conformance gate: agent-skills-toolkit (the validators) not found.
Clone it next to this repo, or set AGENT_SKILLS_TOOLKIT:
  git clone https://github.com/product-on-purpose/agent-skills-toolkit.git ../agent-skills-toolkit
Looked in:
  ...
```

The gate holds no validation logic of its own; it runs the toolkit's validators so the rules cannot drift. You need a toolkit checkout.

**Grade against the ref CI uses, not whatever you have.** The Standard moves faster than this repo re-pins, so an arbitrary toolkit checkout will report whole check families CI does not. Clone the pinned ref into the path CI uses:

```bash
# the ref is in .github/workflows/ci.yml
git clone https://github.com/product-on-purpose/agent-skills-toolkit.git .agent-skills-toolkit
git -C .agent-skills-toolkit checkout <the ref from ci.yml>
cd .agent-skills-toolkit && npm ci && cd ..
node scripts/check.mjs
```

`.agent-skills-toolkit/` is gitignored. If you skip `npm ci` you will get `Cannot find package 'yaml'` instead.

### The gate reports 128 warnings

Expected, and not a failure. **Errors gate; warnings do not.** The pinned toolkit is deliberately newer than the Standard version this library declares (`library.json` `"standard"`), so findings from rules introduced after that version are held at `warn` by a version ceiling. See [`conformance.md`](conformance.md) for the full breakdown of what those warnings are.

If you see **errors**, read on.

### `check-counts: N problem(s)` ... `README shows X, canonical is Y`

A hand-authored count in `README.md` (or `docs/getting-started.md`, `docs/README.md`) no longer matches the registry. The message names the surface and both numbers. Fix the *document*, not the source, unless you genuinely added a skill.

A variant worth knowing: `expected a match for /.../ in README.md, found none` means the count phrase was reworded so the pattern no longer finds it. That is a failure by design, because a surface the pattern cannot find is a surface that silently left the gate's coverage.

### `Registry conformance: N problem(s)`

Each line names its own fix. The common ones:

- `ref: shipped <slug> has no skills/think-<slug>/ directory` - the registry says a skill ships but the directory is absent.
- `lifecycle: ... identity.status is "draft" but the skill ships` - promote the sidecar to `status: active`.
- `workflows: _workflows/<name>.md is on disk but not declared in library.json components.workflows` - declare it.
- `drift: generated views are stale` - run `npm run gen:registry`.

### `stale: <files> - run: node scripts/gen-catalog.mjs`

A generated artifact drifted from its source. This class of failure always resolves by regenerating, never by hand-editing the generated file. The generators:

```bash
npm run gen:registry          # catalog + why-not views
npm run gen:recommendable     # the advisor corpus
npm run gen:catalog           # catalog.json, evaluated.json, llms.txt, llms-full.txt
npm run gen:recipe-commands   # one command per recipe
node scripts/gen-agents.mjs   # the AGENTS.md roster tables
node scripts/gen-engine.mjs   # the shared applicator engine copy
```

Each supports `--check` (what CI runs) and no flag (write).

### `example-coverage: N shipped skill(s) have NO worked example and are NOT grandfathered`

You added a skill without an example. Add a Showcase appearance or a sample under `site/src/content/docs/`. Deferring is possible but deliberate:

```bash
node scripts/check-example-coverage.mjs --update   # and say why in the PR
```

### `Contested-lens conformance: N problem(s)`

A contested lens broke the caveat-first contract. The message names the surface and the rule. The most common: the caveat is not the first `##` section, the caveat carries no evidence signal, or the preamble before it exceeds 3 lines. See [`contributing.md`](contributing.md) for the contributor obligation these rules encode.

### `check-eval-results: N problem(s)`

A behavioral-eval scorecard is unpaired or malformed. Every scorecard is a `.md` **and** a `.json`; writing one without the other is what this catches. Regenerate through the scorer rather than hand-writing either half.

---

## The docs site

### `route-parity: FAIL: N baseline route(s) removed`

A published URL disappeared, which would 404 for anyone with an existing link. Either restore the route, add a redirect (a redirect source still renders as a page, so the route stays present), or - if the removal is intentional - regenerate the baseline and say why:

```bash
node scripts/check-route-parity.mjs --update
```

### `route-parity: <dist> exists but has no .html routes`

The build failed and emptied its output directory. The message is deliberately distinct from "you deleted everything", because that is what an empty build otherwise looks like. Rebuild and read the build output.

### The site build fails on a dependency

`site/` carries known-vulnerable build-time dependencies whose fixes require major version bumps (tracked in `docs/internal/backlog.md`). Do not run `npm audit fix --force` casually: the site is a generated view of `skills/`, so a broken build is a broken product surface.

---

## Still stuck

- The gate's own source is readable and each layer explains itself: [`scripts/check.mjs`](../scripts/check.mjs) documents all fifteen layers in its header.
- For contribution mechanics, see [`contributing.md`](contributing.md) and [`internal/AUTHORING.md`](internal/AUTHORING.md).
- If none of the above matches, open an issue with the **exact output** and the command you ran.
