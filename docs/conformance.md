# Conformance: how this plugin reaches advanced (Gold) tier

`thinking-framework-skills` is built to the [agent-skills-toolkit](https://github.com/product-on-purpose/agent-skills-toolkit) **Advanced Skill Library Standard** ([`STANDARD.md`](https://github.com/product-on-purpose/agent-skills-toolkit/blob/main/STANDARD.md)). This page is the check-by-check breakdown behind the one-line claim in the README: *validates at advanced (Gold), 0 errors / 0 warnings.*

If you only want to verify it yourself, skip to [Reproduce it locally](#reproduce-it-locally).

## The three tiers

The Standard grades a plugin (a "skill library") on three tiers. The tiers are cumulative: each one includes every requirement below it.

| Tier | Toolkit name | What it certifies | Audience |
|---|---|---|---|
| 🥉 Bronze | `universal` | The skills are **portable**: valid frontmatter, `name` equals the directory, descriptions meet the quality bar, references one level deep, an `AGENTS.md` at the root, and a minimal `library.json`. The identical files run on any agentskills.io-compatible agent (around 50 of them). | beginner on-ramp |
| 🥈 Silver | `convergent` | The plugin declares its **agent targets** and emits each higher-order component (slash commands, workflows, subagents, chain contracts) in the correct format for both Claude Code and Codex. Chain contracts are valid (no orphans or phantoms), the manifest matches what is on disk, and versions follow semver. | intermediate |
| 🥇 Gold | `advanced` | The plugin **proves itself**: it ships CI that runs the Standard's own validators against it and passes (self-hosting), generates its `INDEX.md` and native manifests from one authored source, and maintains release notes plus a deprecation policy. A Gold plugin is, by construction, a self-proving example of the Standard. | advanced |

A plugin declares its tier in [`library.json`](../library.json) (`"tier": "advanced"`) and the toolkit's evaluator verifies the highest tier it actually satisfies, reporting any requirement that blocks the next tier up.

## The Gold checks (G1-G7), and how this plugin meets each

The Standard freezes the Gold requirements as G1 through G7. Here is each one and how `thinking-framework-skills` satisfies it.

| # | Gold requirement | Status here | How |
|---|---|---|---|
| **G1** | Every hook documents its event, trigger, matcher, scope, and failure behavior. | **N/A (vacuous)** | This plugin ships **no hooks**, so there is nothing to document. The check passes because there is nothing to fail. |
| **G2** | Self-hosting CI that runs the full tier-applicable check suite and passes. | **Met** | [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) runs [`scripts/check.mjs`](../scripts/check.mjs) on every PR and push to `main`. `check.mjs` locates a toolkit checkout and runs the toolkit's `evaluate.mjs` against this repo - it holds **no validation logic of its own**, so the rules cannot drift from the Standard. `check` is a **required status check** on `main`. |
| **G3** | Each chain contract and each hook has at least one eval/regression case, executed in CI. | **N/A (vacuous)** | This plugin ships **no hooks and no runtime chain contracts**. Its recipes are workflow components that chain *independent* skills (each runnable alone), not `chain:` contracts between coupled components, so the contract is empty (`agents/_chain-permitted.yaml` is `{}`). Nothing to cover. Note: every skill still ships its own `eval/cases.md` (triggers, anti-triggers, output checks) as a quality practice, even though the Standard does not require it here. |
| **G4** | `INDEX.md`, the native plugin manifests, and `manifest.generated.json` are **generated** from the authored `library.json` + component frontmatter, and drift-checked. A hand-edited generated file is an error. | **Met** | [`INDEX.md`](../INDEX.md), [`.claude-plugin/plugin.json`](../.claude-plugin/plugin.json), the Codex manifest, and [`manifest.generated.json`](../manifest.generated.json) are produced by the toolkit's `gen-index` / `gen-manifest` from the authored [`library.json`](../library.json) and checked for drift in CI. |
| **G5** | The plugin maintains `RELEASE-NOTES.md` (curated, user-facing), distinct from `CHANGELOG.md`. | **Met** | [`RELEASE-NOTES.md`](../RELEASE-NOTES.md) (curated highlights) and [`CHANGELOG.md`](../CHANGELOG.md) (Keep a Changelog, technical) are both maintained and kept distinct. |
| **G6** | A deprecation policy: `status` / `deprecated-by` / `remove-in` handling, recognized by tooling. | **Met** | Component frontmatter carries `status` (every skill is `active`), and the manifest pipeline handles the deprecation fields. No component is deprecated today; the policy and handling are in place for when one is. |
| **G7** | All Bronze + Silver requirements, by inclusion. | **Met** | Bronze (portable skills, `AGENTS.md`, manifest) and Silver (`agent-targets: [claude, codex]`, per-target manifests, a valid chain contract, manifest-matches-disk) all pass. |

The honest part of this table is the two **N/A** rows. G1 and G3 are not "skipped" or waived - they have no surface to apply to, because the library deliberately ships no hooks and no coupled chains. The toolkit's evaluator treats them as satisfied, and a future version of this plugin that *did* add a hook or a chain contract would have to satisfy them for real.

## Why "self-hosting" matters

The defining move of Gold is **G2**: the plugin does not just claim conformance, it runs the conformance checker against itself in CI and blocks merges that fail. Two design choices make that trustworthy here:

- **No second source of truth.** `scripts/check.mjs` is a thin locator that shells out to the toolkit's `evaluate.mjs`. The checks live in the toolkit, not vendored into this repo where they could quietly diverge.
- **Reproducible by anyone.** CI clones the toolkit at a pinned commit and runs the same command a contributor runs locally, so a green check is something you can re-derive, not take on faith.

## Reproduce it locally

```bash
# 1. Clone this repo and the toolkit side by side
git clone https://github.com/product-on-purpose/thinking-framework-skills.git
git clone https://github.com/product-on-purpose/agent-skills-toolkit.git

# 2. From the plugin, run the gate (same command CI runs)
cd thinking-framework-skills
node scripts/check.mjs
```

Expected: `Tier: advanced` with `0 error(s), 0 warning(s)`. `check.mjs` finds the toolkit via `AGENT_SKILLS_TOOLKIT`, a sibling `../agent-skills-toolkit`, or a local `./.agent-skills-toolkit` checkout (the path CI uses).

## See also

- [`docs/architecture.md`](architecture.md) - how the skills become the generated docs site.
- [`docs/contributing.md`](contributing.md) - the selection bar and authoring loop for new skills.
- [agent-skills-toolkit / STANDARD.md](https://github.com/product-on-purpose/agent-skills-toolkit/blob/main/STANDARD.md) - the full Standard, including the frozen Gold criteria (Section 2.6).
