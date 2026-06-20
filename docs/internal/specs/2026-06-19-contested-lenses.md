# Spec: contested lenses - shipping the famous-but-weak frameworks, caveat-first

**Status:** approved in principle (brainstormed 2026-06-19), **revised after codex adversarial review** (findings in `_agent-context/v0.11.0-spec-codex-review.md`). Phase 0 must finalize the contract before any build. Execution plan: `docs/internal/release-plans/plan_v0.11.0/`.
**One line:** ship the small set of rejected frameworks that are genuinely *agent-runnable but weak* (SWOT and a few peers) as honest, low-tier, **caveat-first** skills - and handle the famous-but-unrunnable instruments (MBTI and friends) with a single cautionary redirect rather than pretending they are skills. Help a user through a lens they asked for while teaching its deficiency, instead of a flat refusal.

## Problem

A famous framework the library deliberately did not ship (SWOT, MBTI, five-whys, ...) gets a flat "no" plus a why-not dossier, yet users ask for these by name. The honest-grading brand should let us *run the lens and tell the truth about it* rather than refuse. The library already documents all of them (75 dossiers); the gap is that they are not **runnable**.

## Decision

Ship the rejected frameworks that pass a **three-test admission gate** (below) as low-tier skills, built **caveat-first** (the deficiency leads the SKILL.md and the artifact). For the famous frameworks that fail the gate because they are not agent-runnable (the person-profiling instruments), ship instead a single **cautionary applicator** that names the limits and redirects to an evidence-based alternative - so we still do not flatly refuse, without pretending a debunked instrument is a runnable skill.

`caveat_first` is **not a second evidence tier** - the S/M/P/V/A/C/X tier already encodes evidential strength. It is a separate, first-class **posture marker** (an execution + routing policy): it controls how the generators render the skill, how the advisor may route to it, and what the gate enforces. (Resolves IC-01: tier = evidence; `caveat_first` = posture.)

## The three-test admission gate (Phase 0 applies this per framework)

A rejected framework ships as a contested-lens skill only if it passes ALL three:

1. **Distinct** - no shipped skill performs its core move. Use the registry's OWN distinctness verdict, not a keyword heuristic. (Excludes six-thinking-hats -> parallel-perspectives-review, five-whys -> issue-tree, devils-advocacy -> authentic-dissent, key-assumptions-check / double-crux -> what-would-have-to-be-true, cognitive-bias-checklist, disney-creative-strategy, cliftonstrengths, belbin-team-roles, ice-rice-wsjf, and any other entry whose reasoning names a shipped home.)
2. **Agent-runnable** - it has a procedure an agent can actually execute, produces a **reusable artifact**, and has a **caveated mode in which the claim does not reproduce the falsified part**. (Excludes the person-profiling/team instruments that require a proprietary inventory, norm tables, observer ratings, or real human data the agent cannot supply, and whose "valid form" does not exist: MBTI, DISC, Enneagram, learning-styles-inventory, strong-interest-inventory, and the team-stage instruments. These go to the cautionary applicator, not a skill.)
3. **In charter** - not a pm-domain method (those route to pm-skills: porters-five-forces, jobs-to-be-done, blue-ocean-tools, moat-defensibility, ...) and not a human-only facilitation/group protocol whose value is social dynamics an AI cannot reproduce (dot-voting, note-and-vote, scaled-participation-formats), and not an agent-architecture pattern miscast as a user skill (ooda-loop).

**Consequence:** the qualifying set is small - likely ~5-12, not ~18-22. SWOT is the clear, worked example (distinct, agent-runnable 2x2 artifact, weak/contradictory evidence). Phase 0 produces the final list with a one-line pass/fail on each test; everything else stays documented-only or routes to the cautionary applicator.

## The mechanism: caveat-first, as a checked contract

Caveat-first is **enforced by a validator**, not left to authoring discipline (resolves DS-01):

- **Registry:** `excl`/`flag` -> `shipped` at its unchanged low tier; a `caveat_first: true` marker (and `recommendation_policy: explicit_request_only`, below) in `skill.meta.yml` (the schema location is fixed in Phase 0).
- **A new `scripts/check-contested.mjs` validator, wired into `check.mjs`,** identifies contested skills by the marker and asserts: the `SKILL.md` has a leading limitation section *before* the procedure; `references/TEMPLATE.md` opens with a required caveat block; `references/EXAMPLE.md` and the site sample open with the caveat; `eval/cases.md` Output checks include a "leads with the caveat, does not overclaim" item; and (for branded ones) the leading caveat carries the attribution + trademark text. A batch can no longer pass structural checks with a late or missing caveat.
- **Generators render the marker:** `gen-site.mjs` shows a "use with caution" admonition + a distinct (non-green) badge from the marker; `gen-catalog.mjs` carries the marker so an agent reading the catalog sees the posture.
- **Reuse the dossier** as the caveat source; do not re-research.

## Advisor: explicit-request-only (resolves DS-02)

Today `check-registry.mjs` requires the advisor's `recommendable.json` to exactly equal the `shipped` set, and `gen-recommendable.mjs` emits every non-meta shipped skill - so a shipped weak lens would automatically become a default advisor recommendation. That is unacceptable for the brand. Phase 1 changes this:

- `gen-recommendable.mjs` carries `recommendation_policy` + `caveat_first` per entry; contested lenses are marked **explicit-request-only**.
- `check-registry.mjs`'s shipped == recommendable invariant becomes **policy-aware** (a contested lens is in the corpus but flagged, not a default candidate).
- The advisor prompt + its eval cases enforce that a contested lens **cannot be Step 1 for a generic strategy/people/prioritization prompt** unless the user names the lens or no stronger shipped skill fits; and when it does surface, the caveat surfaces with it.

## IP: descriptive naming + artifact-level attribution (resolves IP-01, IP-02)

The registry IP lint only checks registry fields. For branded contested lenses:

- **Descriptive slug/name** - do NOT ship `think-mbti` / `think-cynefin` / `think-porters-five-forces`. Use a generic descriptive name (e.g. a SWOT-style grid ships descriptively; a branded term survives only as an attributed alias in the caveat prose), or exclude the method if its trademarked name is inseparable from the user-facing skill.
- The `check-contested.mjs` validator requires the **attribution + trademark notice in the leading caveat block** of the SKILL.md, TEMPLATE, EXAMPLE, sample, and the rendered page - not only the registry entry.

## Why this strengthens the brand (with honest cohort framing - resolves BR-01)

The framing is not "we now ship 74 skills." It is: **56 evidence-graded core skills, plus N contested, explicit-request lenses we grade honestly and hand you caveat-first.** Count and report the cohorts **separately** (the headline eval numbers stay the 56-core numbers; the contested lenses get their own column). Counting a small, honest, clearly-marked contested cohort separately is the honest expression of "honest grading, not breadth"; folding them into a "74 skills, all graded" headline would read as catalog padding, which the narrow admission gate + cohort framing prevent.

## Integration (the gate-breaking steps the plan must include)

- **`library.json` registration (PC-01):** every new `think-<slug>` must be appended to `library.json` (path, version, tier, status) - `gen-recommendable`/`gen-site`/`gen-catalog` read from it, and `gen-catalog` throws if the library skill count != the registry shipped count.
- **Route manifest (PC-02):** new framework pages are dead to `gen-catalog` until `scripts/route-manifest.txt` includes `/frameworks/think-<slug>/`; the ordered step is build -> `check-route-parity --update` -> `gen-catalog` -> rebuild + guards.
- **Samples path (PC-03):** samples live at `site/src/content/docs/samples/<slug>.md` (not a root `samples/`); each new shipped skill gets a caveat-first sample; do NOT run `check-example-coverage --update` to grandfather them.
- **Eval thresholds (PC-04):** 0 false-fires is hard-blocking; a contested lens must not route a generic prompt away from a stronger shipped skill; every caveat output-check must pass; core-56 and contested scores reported separately.

## Definition of done

- Phase 0 produces the final qualifying list with a per-framework three-test pass record; the marker schema, the advisor policy, the site rendering, and the eval-reporting posture are all decided (not "discovered" during the build).
- `scripts/check-contested.mjs` exists and is a gate layer; the advisor is policy-aware; branded lenses ship descriptively named with artifact-level attribution.
- Each contested lens: `excl/flag -> shipped` at its honest tier; caveat-first by the validator; registered in `library.json`; a caveat-first sample; `eval/cases.md` with the caveat output-check; route-manifest updated.
- The cautionary applicator handles the famous-but-unrunnable instruments (explicit-request-only, non-recommendable, redirects to an evidence-based alternative).
- Gate 0/0 (now 9 layers incl. check-contested); recommendable-drift clean (policy-aware); npm tests; site build + link/route guards.
- Both evals run; the thresholds above hold; cohorts reported separately.
- A codex (or inline) adversarial pass confirms the caveats honestly represent each framework's deficiency, no laundering/overclaim/false-endorsement, IP posture correct, and no lens competes with a shipped skill in routing.
- Released as a minor (v0.11.0) per `release-process.md`, with the cohort framing in RELEASE-NOTES.
