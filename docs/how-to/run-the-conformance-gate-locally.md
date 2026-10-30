---
title: "Run the conformance gate locally"
description: "Reproduces the CI conformance check on your own machine before opening a PR, for a contributor who has already read the contributing gate"
audience: engineer
level: intermediate
---

# How to run the conformance gate locally

CI runs `node scripts/check.mjs` on every PR and push to `main`. This holds no validation logic of its own; it runs the pinned `agent-skills-toolkit` validators plus this repo's own extra layers (counts, registry, recipe/command drift, and the rest - see [Architecture, "The conformance gate"](../architecture.md#the-conformance-gate) for the full fifteen-layer list). Reproduce the same run locally before pushing, so a red CI run is never the first time you see it.

## 1. Fetch the pinned toolkit, in one command

`scripts/check.mjs` runs the Standard's validators rather than vendoring a copy, so the gate does not work on a fresh clone until a second repo is present at the exact commit CI grades against. `scripts/setup-toolkit.mjs` does that step: it parses the pinned ref straight out of `.github/workflows/ci.yml` (never re-typed, so it cannot drift from what CI actually checks out), clones or fetches `.agent-skills-toolkit/` at that ref, and runs `npm ci` inside it.

```bash
npm run setup
```

It refuses rather than clobbers: if `.agent-skills-toolkit/` already exists but is not a checkout of the expected remote, it stops and tells you to move or remove it first.

## 2. Run the gate

```bash
npm run check
```

`scripts/check.mjs` looks for the toolkit at `.agent-skills-toolkit/` next to this repo by default (also checking `AGENT_SKILLS_TOOLKIT` if you set it, and a couple of sibling-checkout locations), so no environment variable is needed after step 1. If it cannot find a valid toolkit checkout anywhere, it prints every path it looked in and exits immediately (code 2) without running any other layer - that message also tells you to run `npm run setup`.

## 3. Read the result

The run ends with a line of exactly `N error(s), M warning(s).`. **Errors gate; warnings do not.** A nonzero error count fails the exit code and CI. A warning count above zero is expected and is not a failure by itself - see [Conformance](../conformance.md) for what the current warnings are and why they are held at `warn` rather than `error`.

If the headline total or the per-requirement breakdown disagrees with what `docs/conformance.md` currently states, `scripts/check.mjs` fails on that disagreement too (the counts layer) - the published prose is asserted against a live run, not re-typed, so a change that moves the number without updating the prose is caught here rather than in review.

## 4. Also run the unit suite

The gate script's own extra layers (registry, recipe/command drift, counts, and the rest) are covered end to end by running against the real tree. The rules each layer wraps are also covered directly, with synthetic fixtures, by the unit suite:

```bash
npm test
```

## If something fails

See [Troubleshooting, "The conformance gate"](../troubleshooting.md#the-conformance-gate-npm-run-check) for the specific error text and its fix - it is organized by the exact string the gate prints, not by layer number.
