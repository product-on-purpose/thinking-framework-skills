<!--
Keep the summary short and say WHY, not just what. The changelog entry carries the detail.
Delete any section that genuinely does not apply - an honest "n/a, no skills touched" is fine,
a checked box that was not actually run is not.
-->

## What and why

## Verification

Paste the real output, not a claim that it passed. "Evidence before assertions" is the house rule
the gate exists to enforce, and it applies to PR descriptions too.

- [ ] `node scripts/check.mjs` - the 15-layer conformance gate, **0 errors** (non-gating warnings
      are expected; `docs/conformance.md` carries the current count, and the gate now asserts it)
- [ ] `npm test` - the guard and pure-lib unit suites
- [ ] Site-affecting change: `npm --prefix site run build`, then
      `node scripts/check-rendered-links.mjs site/dist` and
      `node scripts/check-route-parity.mjs site/dist`

## Regeneration

The generated views drift silently if you skip one, and missing a generator is the most common
first-PR failure. Run the ones your change touches:

- [ ] `npm run gen:registry` - catalog + why-not views (after any `frameworks/registry.mjs` edit)
- [ ] `npm run gen:recommendable` - the advisor routing corpus (after a `SKILL.md` description,
      `eval/cases.md` or `skill.meta.yml` edit)
- [ ] `npm run gen:catalog` - `llms.txt`, `llms-full.txt`, `catalog.json`, `evaluated.json`
- [ ] `node scripts/gen-agents.mjs` - the generated tables in `AGENTS.md`
- [ ] `npm run gen:recipe-commands` - only if you touched `_workflows/`
- [ ] n/a - this change touches no generated source

## Changelog

- [ ] A bullet under `## [Unreleased]` in `CHANGELOG.md`, in the right section
      (Added / Changed / Fixed / Removed / Security), carrying this PR's number as `(#NNN)`
- [ ] n/a - not a user-visible or maintainer-visible change

## If this adds or changes a skill

- [ ] Dossier written **first**, and the evidence tier is the conservative grade where the honest
      read is split or the evidence is transferred
- [ ] `eval/cases.md` carries should-trigger, should-NOT-trigger (each naming the correct
      alternative), and output checks
- [ ] A new command, recipe or subagent records its always-loaded description footprint and its
      routing effect (guardrail 6) - the instrument is
      `scripts/eval/skill-selection.workflow.mjs`
- [ ] A contested lens leads with its own deficiency on every surface it touches, and is
      explicit-request-only

## If this adds a guard or a check

- [ ] Demonstrated **RED before GREEN**: the guard was shown to fail on the defect it targets
      before the fix landed. Say which case you planted and what it printed.
