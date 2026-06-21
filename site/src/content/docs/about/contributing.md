---
title: Contributing
description: The selection bar a new framework must clear to ship here - the four commitments, the overlap ceiling, and how to propose one.
---

This library grows slowly and on purpose. A method ships only when it clears a real bar, so the catalog stays a curated set of distinct cognitive moves rather than a pile of overlapping rituals. If you want to suggest a framework, here is exactly what it has to clear.

## The four commitments

Every skill here meets all four. A proposal that cannot meet one of them is not a fit, no matter how popular the method is.

1. **Mechanism over ritual.** Implement the durable cognitive move, named descriptively for what it does, not a brand. We ship "parallel perspectives review", not a trademarked hat ceremony. The branded version is lineage, cited in the dossier, never the headline.
2. **Honest evidence grading.** The method carries an evidence tier and a dossier that states what the research does and does *not* support, and flags evidence transferred from human studies rather than tested on an AI agent. No laundered statistics: a figure appears only where a primary source backs it. See [the evidence model](../../start/evidence-model/).
3. **Artifact, not prose.** The skill emits a named, structured, reusable output - a risk register, an option matrix, an assumption ledger - not a paragraph of advice.
4. **Explicit "When NOT to Use".** The skill states where it misleads, so it cannot be run as a cargo cult.

A "practitioner tier, useful anyway, here is when not to use it" method is welcome. A dressed-up method that overclaims its evidence is not.

The canonical statement of all four commitments lives in [Philosophy](../../about/philosophy/).

## The overlap ceiling

Clearing the four commitments is necessary, not sufficient. A new method must also be **distinct**: it cannot substantially duplicate a framework already in the [catalog](../../frameworks/). If the move is mostly a mode, a timebox, or a rename of an existing skill, it ships as a mode of that skill or not at all. The catalog records these decisions explicitly - subsumed methods are marked as folds, and near-duplicates note the skill they overlap with - so an absence reads as a deliberate call, not an oversight.

**Contested lenses.** A low-tier famous-but-weak method may ship only as a **contested lens** under the caveat-first contract (`check-contested.mjs`): the deficiency must lead every surface the skill touches (it is not a footnote); the skill is explicit-request-only and never recommended by the advisor on a generic prompt; branded lenses carry attribution to the originating work. The gate enforces this contract on every CI run. A method that cannot meet the caveat-first contract does not ship here in any form.

## How to propose one

Open an issue on the repository describing:

- the **mechanism** in one line (what cognitive move it performs), and the descriptive, kebab-case name you would give it;
- the **evidence**: the strongest sources, your honest tier estimate, and what the research does *not* show;
- the **artifact** it would emit;
- the **nearest existing skill** and why your method is distinct rather than a fold of it.

That last point is the one most proposals miss, so lead with it. If the method clears the four commitments and the overlap ceiling, it joins the build queue.
