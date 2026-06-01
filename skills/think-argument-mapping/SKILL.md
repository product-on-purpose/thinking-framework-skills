---
name: think-argument-mapping
description: Produces an argument map by laying out a claim's supporting reasons, the co-premises each silently depends on, and the objections against it as an explicit structure, then flags the weakest links and unsupported premises. Use when an argument or recommendation must be evaluated for soundness, or when a fluent case may be hiding a broken inference.
license: Apache-2.0
metadata:
  id: thinking-framework-skills.argument-mapping
  family: reasoning-clarity
  evidence-tier: "S"
  version: 0.1.0
  standard: "0.8"
---
<!-- thinking-framework-skills | https://github.com/product-on-purpose/thinking-framework-skills | Apache-2.0 -->
# Argument Mapping

In prose, an argument's structure is hidden: the main claim, the reasons for it, the unstated co-premises each reason needs, and the objections against it are blended into fluent text where a broken inference reads as smoothly as a sound one. Argument mapping makes the structure explicit: the contention, the reasons that support it, the co-premises each reason depends on, and the objections and rebuttals, laid out as a tree so every link is visible. The output is an **argument map**. Important boundary: a valid structure does not make the premises true; the map shows structure, not truth.

## When to Use

- An argument or recommendation must be evaluated for soundness before it is trusted.
- A fluent, persuasive case may be hiding a broken inference or an unstated assumption.
- A debate needs its logical structure made explicit so people argue the same point.

## When NOT to Use

- Simple claims with no real argumentative structure to map.
- To judge how persuasive something is (this analyzes logical structure, not rhetoric).
- To generate ideas or options (wrong tool).
- As proof an argument is sound: a tidy map can still rest on false premises.

## Instructions

When asked to map an argument, follow these steps:

1. **State the contention.** The single main claim the argument is trying to establish.
2. **Lay out the reasons.** For each, give the premise that directly supports the contention.
3. **Surface co-premises.** For each reason, make explicit the unstated assumption it silently needs to actually support the contention. This is where most hidden weakness lives.
4. **Add objections and rebuttals.** The strongest objections to the contention or to specific reasons, and any rebuttals.
5. **Flag the weak links.** Mark the inferences that do not hold and the premises that are load-bearing but unsupported.
6. **Emit the argument map** per `references/TEMPLATE.md`.

## Output Format

Use the template in `references/TEMPLATE.md`. The deliverable is the structured map with flagged weak links, not prose.

## Quality Checklist

Before finalizing, verify:

- [ ] The contention is a single, clearly stated claim.
- [ ] Each reason has its co-premises made explicit, not left unstated.
- [ ] Objections and rebuttals are included, not only supporting reasons.
- [ ] The weakest links and unsupported load-bearing premises are flagged.
- [ ] The output distinguishes valid structure from true premises (it does not claim soundness from structure alone).
- [ ] The output is the argument-map artifact, not prose.

## Evidence

Tier **S**, with a scope caveat. Argument-mapping-based instruction produces among the largest measured critical-thinking gains in the field (van Gelder, effect sizes ~0.7-0.85). That evidence is for sustained practice (course-length), not for a single map fixing one argument, so the strong claim is "learning to map improves reasoning," not "this one map carries that effect." Evidence is transferred from human contexts, not AI-validated. Full grading: `evidence/dossier.md`.

## Examples

See `references/EXAMPLE.md` for a completed argument map.
