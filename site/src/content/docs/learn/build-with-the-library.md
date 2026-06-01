---
title: Build with the library
description: How agent and plugin builders install, invoke, compose, and route these thinking skills, and what each one ships for programmatic use.
sidebar:
  order: 6
---

Each framework here is a real skill: a bounded procedure plus a named, saveable artifact. If you build agents or plugins, you can install the library, call any skill directly, chain skills into recipes, and route a situation to the right skill from one front door. This page is the builder's path through all four.

## The path

**1. Install and first run.** Follow [Getting started](../../start/getting-started/) to install the library and run your first skill end to end. Confirm a skill activates and emits its artifact before you wire anything around it.

**2. Invoke one skill.** In Claude Code a skill runs as a slash command, `/<skill-name>`, for example `/think-premortem "we're about to migrate billing"`. The skill executes its procedure and returns a structured artifact, here a ranked risk register, not loose prose. Every skill is the same shape: a procedure in, a named artifact out. That uniformity is what makes them composable.

**3. Compose with recipes.** A [recipe](../../recipes/) is a fixed chain that solves one recurring job, treating skills as workflow components: it runs them in order and passes a compressed artifact at each handoff, never the full transcript. The flagship [stress test decision](../../recipes/stress-test-decision/) runs four skills in sequence. To build your own chains, see [Composing skills](../composing/).

**4. The front door.** When you do not know which skill a situation needs, route through the [Framework Advisor](../../frameworks/think-framework-advisor/). It reads a plain-language situation and returns a short plan: the one or two skills worth running, in order, and what to skip. It is the recommender layer over the catalog, useful as an entry point for an agent that holds the whole library.

**5. For builders: the sidecar and evals.** Every skill ships two machine-readable companions beside its `SKILL.md`:

- A sidecar, `skill.meta.yml`, that carries the skill's identity (id, slug, version, status), its classification (family, thinking modes, problem contexts, use cases, poor-fit cases), its interface (required and optional inputs, primary artifact type, output formats), execution and relationship hints (likely companions, what it often follows), and an evidence block (tier, transferred-evidence flag, source dossier). You can read these fields to filter, group, or route skills programmatically.
- An `eval/` folder of cases, for example `cases.md`, listing should-trigger and should-not-trigger prompts plus output checks, so you can verify activation and artifact quality.

A note on scope: the sidecar shape is still marked draft, and there is no runner shipping yet, the eval cases are written to be checked by hand or wired into a harness later. Treat the sidecar and eval files as a stable place to read structured metadata, not as a finished API.
