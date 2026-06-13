# Scenario profiles (the recurring cast)

The recurring cast for the Showcase, the Prompt Gallery, and worked examples. One source of truth so the same people and situations recur across the docs (the analog of pm-skills' `THREAD_PROFILES.md`). When you author a worked example, pull the protagonist's facts and voice from here.

Two tracks, by reader entry point:

- **Track A - invented thinkers** (primary, non-PM breadth): Mira, Daniel, Priya. For the reader who has a hard problem and found the library.
- **Track B - reused pm-skills companies** (cross-library, deferred to a later wave): Storevine, Brainshelf, Workbench. For the reader who uses pm-skills and wants to see what tfs adds upstream. Mirrored from pm-skills' `library/skill-output-samples/THREAD_PROFILES.md`; content reuse only, no technical coupling.

Plus **Northwind** (B2B SaaS weighing a free-tier launch), the neutral worked-example anchor already baked into every framework page's deep-dive. Do not disturb it.

---

## Track A

### Mira - startup founder
- **Who:** founder of an 8-person, seed-stage product company.
- **Situation:** recurring high-stakes decisions under genuine uncertainty (pivot, pricing, the first key hire), usually alone, usually under time pressure.
- **Prompt style:** **casual** - a sentence or two, first person, abbreviations, partial context. She reaches for a single tool before a recipe.
- **Family bias:** problem-framing, decision-and-option-evaluation, risk-and-resilience, assumption-and-belief-challenge.
- **Voice:** plain, fast, slightly anxious, allergic to ceremony. "we're about to..."

### Daniel - senior engineer
- **Who:** senior/staff engineer at a ~200-person company.
- **Situation:** technical and architectural decisions with cross-team consequences (a recurring bug, an underperforming system, an architecture choice, a migration).
- **Prompt style:** **organized** - a short structured block: situation, constraints, what he already tried, references to prior context.
- **Family bias:** systems-and-consequences, reasoning-clarity, assumption-and-belief-challenge, decision-and-option-evaluation.
- **Voice:** precise, evidence-first, names tradeoffs explicitly.

### Priya - policy analyst
- **Who:** analyst at a government agency.
- **Situation:** decisions with ethical dimensions, contested stakeholder interests, and public accountability. Often **runs frameworks by hand**, on paper, and documents every step.
- **Prompt style:** **detailed** - rich context, an explicit stakeholder list, references to documents.
- **Family bias:** ethics-values-deliberation, perspective-and-multi-lens, problem-framing, synthesis, reasoning-clarity.
- **Voice:** deliberate, fair-minded, careful to name whose interests are at stake. Demonstrates the "you do not need an agent" promise.

## Track B (mirrored from pm-skills; deferred wave)

Mirrored on 2026-06-12 from pm-skills `THREAD_PROFILES.md`. tfs adds the *decision layer* upstream of each company's pm-skills delivery work; each handoff is a narrative reference, never a build-validated link.

- **Storevine** - B2B ecommerce, Series A, 70 staff, 15K merchants, building "Campaigns" (native email/SMS). **Organized** style.
- **Brainshelf** - consumer PKM, post-seed, 20 staff, 22K MAU, building "Resurface" (morning digest). **Casual** style.
- **Workbench** - enterprise collaboration, Series B, 200 staff, 500 customers, building "Blueprints" (templates + approval gates). **Enterprise** style.

The tfs -> pm-skills handoff map (which reasoning artifact feeds which delivery artifact) lives in `_local/content-plan/2026-06-12_content-plans_aggregated.md`, section 3.5.

## The three prompt styles (teach once, reuse everywhere)

| Style | Track-A thinker | What the prompt looks like |
|---|---|---|
| Casual / sparse | Mira | one or two sentences, the decision and the worry, nothing else |
| Organized | Daniel | a short structured block: situation, constraints, what was tried |
| Detailed | Priya | full context, stakeholder list, document references |
| Advisor-routed (overlay) | any | describe the situation to the advisor, run the returned plan |

The lesson every gallery and showcase page reinforces: all styles produce a complete artifact; the difference is how much you front-load and whether you let the advisor sequence.
