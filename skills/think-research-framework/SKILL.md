---
name: think-research-framework
description: Researches a thinking framework end to end and produces a schema-valid proposed registry entry plus a learning dossier, grading the evidence on the seven-tier model and assessing overlap against the shipped catalog. Use when you need an honest evidence grade and a build-or-fold verdict for a candidate method before turning it into a skill, when reproducing the evidence-and-overlap vetting on a method the catalog already judged, or when you need a ranked shortlist of new candidate methods in a family.
license: Apache-2.0
metadata:
  id: thinking-framework-skills.research-framework
  family: meta-thinking-and-reflection
  version: 0.1.0
  standard: "0.8"
---
<!-- thinking-framework-skills | https://github.com/product-on-purpose/thinking-framework-skills | Apache-2.0 -->
# Research Framework

This meta-skill is the entry point to the framework-research engine. It is not a thinking method and ships no registry entry of its own; it delegates the bounded research role to the `think-research-framework` subagent so the work runs in its own context with web search.

## When to use

- You have a candidate thinking method and need an honest evidence grade, an overlap call against the shipped catalog, a learning dossier, and a proposed registry entry before deciding whether to build it.
- You want to reproduce the evidence-and-overlap vetting on a method the catalog already judged.
- You want a ranked shortlist of new candidate methods in a given family.

## When NOT to use

- You already know the verdict and just want to author the skill. Go straight to the skill-authoring flow.
- The request is a product or domain question rather than a thinking-method evaluation. That belongs in the sibling pm-skills library.
- You want a framework executed on your own problem. That is what the individual `think-` skills (and the advisor's plan) are for.

## What it does

Dispatch the work to the `think-research-framework` subagent: invoke the Task tool with subagent_type `think-research-framework`, passing the framework name (or the "discover N in family X" brief) the user supplied. Do not run the research inline in this context; the subagent holds the honesty discipline and runs the web research in its own window.

In name mode the subagent researches the method, grades it on the seven-tier model (S, M, P, V, A, C, X) using the conservative governing grade when the evidence is split or transferred, assesses overlap (distinct only above the roughly 20 percent ceiling, else fold, recipe, reject, or out-of-scope), writes the dossier body to a staging path (`frameworks/_proposed/<slug>/dossier.md` for a not-yet-shipped method; a shipped method keeps its record at `skills/think-<slug>/evidence/dossier.md`), validates a proposed registry entry against the schema with `scripts/check-proposed-entry.mjs`, and prints that entry for human paste plus a one-screen verdict. It never writes `frameworks/registry.mjs`. In discovery mode it returns a ranked shortlist of real, named candidate methods, each with a distinctness hypothesis.
