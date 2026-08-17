---
title: Troubleshooting
description: What to do when a skill does not fire, the output is prose instead of an artifact, or the conformance gate reports something you have not seen before. Keyed to the actual error text.
sidebar:
  order: 5
---

Every entry starts with the **actual text you will see**, so you can match on the error rather than guess which section applies. Search this page for a fragment of your output.

If something here is wrong or missing, that is a bug worth filing: an error a user cannot resolve from the docs is the same class of defect as an error with no message.

## The plugin installed, but `/think-premortem` does not appear

In order:

1. Confirm the marketplace and plugin are both added:
   ```bash
   /plugin marketplace add product-on-purpose/agent-plugins
   /plugin install thinking-framework-skills@product-on-purpose
   ```
2. **Restart the session.** A newly installed plugin is not always visible to an already-running session.
3. Check the name. Every framework is prefixed `think-` (`think-premortem`, not `premortem`). The prefix exists so this library cannot collide with another plugin's skill names.

## A recipe does not run as one command

Recipes are commands too: `/think-stress-test-decision` runs the whole chain. If individual skills work but a recipe command is missing, you are on a version from before recipe commands shipped. Until then, the recipes are documentation: open the recipe page and run its steps yourself, carrying forward only what each handoff names.

## The skill fires, but I got prose instead of an artifact

Every skill is supposed to hand back something concrete: a risk register, an option matrix, an argument map. If you get an essay:

- Ask for the artifact by name: *"run the premortem and give me the risk register table"*.
- Every framework page on this site shows the artifact shape and a worked example. Pasting that structure into your prompt is a perfectly legitimate fallback, and it is also how you run any of these by hand with no agent at all.
- If a skill reliably produces prose instead of its artifact, that is a real bug rather than a prompting problem. Please report it with the prompt you used.

## The recommendation felt wrong

The [Framework Advisor](/tools/think-framework-advisor/) is a router, and its own routing accuracy is the part of this library with the least evidence behind it. It says so on its page. Treat a Thinking Plan as a starting hypothesis you can argue with, not a verdict. If it recommended something that plainly did not fit, that is useful signal and worth reporting.

Two specific behaviours that are **intended**, in case they look like faults:

- **It sometimes recommends nothing.** For a reversible, low-stakes decision you have effectively already made, "just decide and move on" is the correct output.
- **It will not lead with SWOT, Five Whys or the other contested lenses** unless you name them. Those ship [caveat-first and by explicit request only](/explore/by-evidence/) because their evidence is weak; a generic prompt routes to something better supported.

## Contributing: the conformance gate fails locally

The gate runs the Standard's validators rather than holding its own copy, so it needs a toolkit checkout. If you see `agent-skills-toolkit (the validators) not found`, clone the ref that CI pins (it is in `.github/workflows/ci.yml`) into `.agent-skills-toolkit/` and run `npm ci` inside it.

**Grade against the pinned ref, not an arbitrary checkout.** The Standard grows faster than this library re-pins, so a newer toolkit reports whole check families CI does not, and the run will look alarming for no reason.

A run reporting **warnings** is not a failure: errors gate, warnings do not. See [conformance](https://github.com/product-on-purpose/thinking-framework-skills/blob/main/docs/conformance.md) for what the current warnings are and why they are carried deliberately.

The full contributor-facing version of this page, including every gate-layer failure and its fix, lives in [`docs/troubleshooting.md`](https://github.com/product-on-purpose/thinking-framework-skills/blob/main/docs/troubleshooting.md).
