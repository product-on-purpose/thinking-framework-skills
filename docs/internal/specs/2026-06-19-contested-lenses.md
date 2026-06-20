# Spec: contested lenses - shipping the famous-but-weak frameworks, caveat-first

**Status:** approved (brainstormed 2026-06-19), not started. Execution plan: `docs/internal/release-plans/plan_v0.11.0/`.
**One line:** ship the distinct-but-weak rejected frameworks (SWOT, MBTI, OODA, Cynefin, ...) as honest, low-tier, **caveat-first** skills, so the plugin helps a user through a lens they asked for while teaching its deficiency - instead of a flat refusal.

## Problem

Today a famous framework the library deliberately did not ship (SWOT, MBTI, five-whys, six-thinking-hats, ...) gets a flat "no" plus a why-not dossier. But users ask for these by name. The honest-grading brand says we should be able to *run the lens and tell the truth about it* rather than refuse. The library already documents every one of them (75 dossiers); the gap is that they are not **runnable**.

## Decision

Ship the **distinct-but-weak** subset of the rejected set as low-tier skills, built **caveat-first** (the deficiency leads the SKILL.md and the artifact). This was chosen over (a) a single meta-skill applicator (rejected: these are genuinely distinct procedures, a meta-skill would do each shallowly), (b) a separate "contested" class (rejected: the existing S/M/P/V/A/C/X tier system already encodes "low tier = weak evidence"; a second label is redundant), and (c) shipping all 34 excl/flag (rejected: ~half overlap a shipped skill and would re-introduce routing ambiguity).

## Scope

**In:** excl/flag frameworks that are (1) **distinct** from every shipped skill (no shipped skill performs the same core move) AND (2) rejected on **evidence / efficacy / branding**, not on overlap.

Working candidate list (~18-22; finalize per-framework in plan Phase 0 by reading each registry `reasoning`): **swot, mbti, disc-profile, enneagram, learning-styles-inventory, cliftonstrengths, strong-interest-inventory, belbin-team-roles, tuckman-group-development, ooda-loop, cynefin, wardley-mapping, porters-five-forces, blue-ocean-tools, jobs-to-be-done, ice-rice-wsjf, disney-creative-strategy, dot-voting, analysis-of-competing-hypotheses, reflective-equilibrium, qualitative-comparative-analysis** (and a per-framework call on the remaining borderline excl: eisenhower-moscow-pareto, note-and-vote, sensemaking-matrix, insight-statement-generation, concept-knowledge-theory, estimate-talk-estimate, scaled-participation-formats).

**Out:** the ~18 **overlap-with-shipped** frameworks (six-thinking-hats -> parallel-perspectives-review; five-whys -> issue-tree; devils-advocacy -> authentic-dissent; key-assumptions-check / double-crux -> what-would-have-to-be-true; cognitive-bias-checklist -> several) - they stay documented-only, because the shipped skill already performs the move and adding them would degrade routing. Also out: the 35 **folds** (subsumed), the 5 **pm** (charter), the 5 **recipes** (already runnable as chains).

## The mechanism: caveat-first

A normal skill leads with its mechanism. A contested lens **inverts that** - the honest limitation leads, and the user cannot get the lens without it:

- **Status / tier:** registry `excl`/`flag` -> `shipped` at its honest low tier (X / V / C / A / P, unchanged from its current grade).
- **A `contested` marker** in `skill.meta.yml` (e.g. `quality.caveat_first: true`) so the generators can give it a distinct "use with caution" treatment and the advisor can surface the caveat.
- **SKILL.md opens with the deficiency** (sourced from the existing why-not dossier): what the evidence actually shows, where it misleads, and the stronger shipped skill to prefer when one exists - *then* the mechanism and procedure.
- **The artifact carries the caveat.** Its `references/TEMPLATE.md` pre-prints a leading caveat block (like the evidence-caveat element the v0.7.0 tightening added), so a produced SWOT grid opens with "SWOT has weak, contradictory evidence (Hill & Westbrook 1997); this organizes thinking, it does not validate the strategy." Caveat-first by construction.
- **Reuse the dossier.** The critique is already written (the Framework Library why-not page); the skill consumes it rather than re-researching.
- Branded lenses (MBTI, Cynefin, Wardley, Porter's, ...) ship **descriptively named + attributed + TM-flagged**, per the open-IP-gate policy (the IP lint already enforces branded -> attribution + trademark).

## Why this strengthens the brand (not dilutes it)

The framing is not "the honest library now ships MBTI." It is: **every skill is evidence-graded - including the famous-but-weak ones, which we grade honestly and hand you caveat-first instead of pretending they do not exist.** That is the purest expression of "honest grading, not breadth." The catalog becomes ~74 skills, *all graded*, the weak ones openly marked. Refusing to run a lens a user explicitly wants is paternalistic; running it with the truth attached is the honest service.

## Integration

- **Evals (a feature, not a cost).** The new skills go through the same trigger + output evals. The output-eval "Output checks" for a contested lens **must include "leads with the caveat and does not overclaim"** - which makes the eval *enforce* the caveat-first design by construction. Routing stays clean because the set is distinct (each routes to itself; the trigger eval should hold 0 false-fires).
- **Advisor.** The recommendable corpus already weights tier (prefer-higher tie-break), so a weak lens surfaces only when genuinely the best fit or explicitly requested; when it does, the caveat must surface. The `contested` marker lets the advisor say "you asked for X; it is weak, here is why, here it is."
- **Counts / generators.** `excl/flag -> shipped` changes the shipped count (56 -> ~74). Every count surface updates (README's four surfaces, architecture.md, the catalog headers, getting-started/docs-README, the gen-* outputs). `check-counts.mjs` must accept the new shipped total; the catalog families gain the contested members.
- **Example coverage.** Each new shipped skill needs a worked example (a Showcase appearance or a sample) or a grandfather entry; the samples corpus already gives every shipped skill a sample, so the new ones each get a (caveat-first) sample.

## Definition of done

- Each contested lens: `excl/flag -> shipped` at its honest tier; caveat-first SKILL.md (deficiency leads); `references/TEMPLATE.md` pre-prints the caveat; the artifact cannot be produced without it; `skill.meta.yml` carries the `contested`/`caveat_first` marker; branded ones attributed + TM-flagged; a sample (caveat-first) for example coverage; `eval/cases.md` whose Output checks include "caveat leads, no overclaim".
- Gate 0/0 (all 8 layers, incl. the registry tier/IP/eval-coupling checks); recommendable-drift clean; npm tests; site build + link/route guards.
- Both evals run on the new skills: routing holds (0 false-fires, top-1 unharmed); output checks pass (the caveat ships).
- A codex adversarial pass confirms the caveats honestly represent each framework's deficiency per its dossier (no laundering, no overclaim, no false endorsement) and that none competes with a shipped skill in routing.
- Released as a minor (v0.11.0): the catalog-expansion cut per `release-process.md`, with the brand framing in RELEASE-NOTES.

## Open questions for Phase 0 (resolved during execution, not blockers)

1. **Final membership** - the per-framework distinctness call on the ~6 borderline excl entries.
2. **The exact `skill.meta.yml` marker name** and how `gen-site.mjs` renders the "use with caution" treatment (a badge variant / a leading admonition).
3. **Eval reporting** - whether to report the contested lenses' eval scores in a separate column from the graded-56 headline, or as one combined number with the tier visible (recommend: combined, since they are honestly graded skills, but call out the contested subset in the scorecard).
