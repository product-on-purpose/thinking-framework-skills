# Spec: contested lenses - shipping the famous-but-weak frameworks, caveat-first

**Status:** approved in principle (brainstormed 2026-06-19), **revised after codex adversarial review** (findings in `_agent-context/v0.11.0-spec-codex-review.md`), **membership FINALIZED 2026-06-19** after a Phase 0 dry-run found the strict three-test gate self-contradictory (see "The admission rule"). Locked at **7 contested-lens skills**; the rest stay documented. Execution plan: `docs/internal/release-plans/plan_v0.11.0/`.
**One line:** ship the seven rejected frameworks that are genuinely *agent-runnable and in-charter* (SWOT, five-whys, and peers) as honest, low-tier, **caveat-first** skills - five run the lens caveat-first, two (tested-and-harmful) warn-and-redirect without reproducing the discredited artifact. The famous-but-unrunnable instruments (MBTI and friends) and the pure overlaps stay **documented dossiers** - no thin redirect-skills. Help a user through a lens they asked for while teaching its deficiency, instead of a flat refusal.

## Problem

A famous framework the library deliberately did not ship (SWOT, MBTI, five-whys, ...) gets a flat "no" plus a why-not dossier, yet users ask for these by name. The honest-grading brand should let us *run the lens and tell the truth about it* rather than refuse. The library already documents all of them (75 dossiers); the gap is that they are not **runnable**.

## Decision

Ship the seven rejected frameworks that are **agent-runnable AND in-charter** as low-tier skills, built **caveat-first** (the deficiency leads the SKILL.md and the artifact). Two postures:

- **Run-caveat-first** (5): the lens has a caveated mode that still produces a real artifact; the deficiency leads, then the artifact follows. (SWOT, five-whys, eisenhower-moscow-pareto, cynefin, reflective-equilibrium.)
- **Warn-and-redirect** (2): the lens is *tested and found harmful* - running it produces a worse decision (overconfidence), not merely a low-value one. The skill owns the famous name, leads with the controlled-evidence caveat, and routes to the evidence-based alternative *without reproducing the discredited artifact as if valid*. (analysis-of-competing-hypotheses, qualitative-comparative-analysis.)

Everything else stays a **documented dossier**, not a skill: the pure overlaps (their runnable move is already a shipped skill - shipping an alias earns nothing) and the person-profiling instruments (MBTI/DISC/Enneagram/... are not agent-runnable - they need a proprietary inventory, norm tables, or human data the agent cannot supply). A by-name request for one of these returns its honest dossier (why-not + evidence-based alternative), which is not a flat refusal. **No separate cautionary applicator** - that object is itself a thin redirect, the shape we are deliberately not shipping.

`caveat_first` is **not a second evidence tier** - the S/M/P/V/A/C/X tier already encodes evidential strength. It is a separate, first-class **posture marker** (an execution + routing policy): it controls how the generators render the skill, how the advisor may route to it, and what the gate enforces. (Resolves IC-01: tier = evidence; `caveat_first` = posture; `recommendation_policy` = routing.)

## The admission rule (Phase 0 dry-run finalized this 2026-06-19)

A Phase 0 dry-run applied the original strict gate (distinct AND agent-runnable AND in-charter) and found its intersection **empty**: the registry-distinct rejects (ACH, QCA, reflective-equilibrium, C-K) are not honestly runnable, while the runnable, by-name-demanded rejects (SWOT, five-whys, ...) overlap a shipped skill. "Distinct AND honestly-runnable" is empty for this domain. The gate was self-contradictory; the corrected rule below replaces it.

A rejected framework ships as a contested-lens skill iff it passes ALL of:

1. **Agent-runnable with a recognizable, distinct-in-form artifact** - a procedure an agent executes that produces a reusable artifact the user recognizes as *that named method* and distinct in form from any shipped skill's output. A lens whose entire runnable output is identical to a shipped skill's is a **thin alias** and stays a dossier. (This is why six-thinking-hats [= parallel-perspectives-review], cognitive-bias-checklist, devils-advocacy [= authentic-dissent], key-assumptions-check / double-crux [= what-would-have-to-be-true], disney-creative-strategy, ice-rice-wsjf, and insight-statement-generation stay documented: their artifact IS a shipped skill's artifact. A five-whys ladder and a SWOT grid are recognizably their own methods and pass.)
2. **In-charter** - not pm-domain (porters-five-forces, jobs-to-be-done, blue-ocean-tools, wardley-mapping route to pm-skills), not human-only facilitation/group dynamics (dot-voting, note-and-vote, scaled-participation-formats, estimate-talk-estimate), not agent-architecture (ooda-loop), not a non-method label (sensemaking-matrix), not un-operationalizable in a single session (concept-knowledge-theory).
3. **Honestly presentable** - EITHER a caveated mode that still produces a real (if weak) artifact [**run-caveat-first**], OR, for a method *tested and found harmful*, a posture that does not reproduce the discredited artifact [**warn-and-redirect**]. Person-profiling instruments fail this AND test 1 - MBTI/DISC/Enneagram/learning-styles/strong-interest/belbin/cliftonstrengths/tuckman are not agent-runnable (they need a proprietary inventory, norm tables, observer ratings, or human data) and their "valid form" does not exist; they stay documented.

**NOT a test: distinctness from shipped-skill routing.** That was imported from *core-skill* admission, where it matters because core skills are auto-recommended. Contested lenses are `recommendation_policy: explicit_request_only` + non-recommendable (DS-02), so they never compete with a shipped skill in the advisor; the routing harm DO-01 guards against is handled at the *recommendation* layer, not admission. **This deliberately overrides codex finding DO-01's fix** (route overlaps to the shipped skill as a note rather than ship a skill). The override is safe because (a) DS-02 neutralizes the routing harm, (b) BR-01 cohort framing neutralizes the padding harm, and (c) test 1's distinct-in-form requirement still keeps every *thin alias* out. Test 1 keeps "no thin/empty skills"; dropping the routing-distinctness test is what lets the famous-but-overlapping-in-domain ones (five-whys) ship honestly.

## The finalized membership (7 skills)

**Run-caveat-first (5)** - ship, lead with the deficiency, then the artifact:

| slug | tier | leading caveat (from its dossier) | naming |
|---|---|---|---|
| `swot` | X | weak/contradictory evidence the 2x2 improves decisions (Hill & Westbrook 1997) | clean |
| `five-whys` | X | reliable only for simple linear single-cause failures (Card 2017); for multi-cause use issue-tree | clean |
| `eisenhower-moscow-pareto` | P | a bundle of three operations, not one move; false-rigor risk | clean (descriptive) |
| `cynefin` | C | under-tested, cargo-cult risk | **branded -> descriptive name** + attributed alias |
| `reflective-equilibrium` | C | tends to rubber-stamp the priors it starts from | clean |

**Warn-and-redirect (2)** - ship, own the famous name, lead with the controlled-evidence caveat, route to the evidence-based alternative, do NOT reproduce the discredited artifact as if valid:

| slug | tier | the harm |
|---|---|---|
| `analysis-of-competing-hypotheses` | X | raises confidence with no accuracy gain (Otzipka 2025; Karvetski & Mandel 2020) |
| `qualitative-comparative-analysis` | P | certifies configurations from random data at session scale (Lucas & Szatrowski 2014) |

**Documented dossiers, NOT shipped** (the other 27 excl/flag): thin overlaps (six-thinking-hats, disney-creative-strategy, key-assumptions-check, double-crux, devils-advocacy, cognitive-bias-checklist, ice-rice-wsjf, insight-statement-generation); person-profiling instruments (mbti, disc-profile, enneagram, cliftonstrengths, belbin-team-roles, strong-interest-inventory, learning-styles-inventory, tuckman-group-development); pm-domain (porters-five-forces, jobs-to-be-done, blue-ocean-tools, wardley-mapping); facilitation (note-and-vote, dot-voting, scaled-participation-formats, estimate-talk-estimate); and ooda-loop, sensemaking-matrix, concept-knowledge-theory. A by-name request for any of these returns its honest dossier (why-not + evidence-based alternative) - not a flat refusal, and not a thin skill.

## The mechanism: caveat-first, as a checked contract

Caveat-first is **enforced by a validator**, not left to authoring discipline (resolves DS-01):

- **Registry:** `excl`/`flag` -> `shipped` at its unchanged low tier; a `caveat_first: true` marker, a `posture: run_caveat_first | warn_redirect`, and `recommendation_policy: explicit_request_only` in `skill.meta.yml` (the schema location is fixed in Phase 1).
- **A new `scripts/check-contested.mjs` validator, wired into `check.mjs`,** identifies contested skills by the marker and asserts the contract per posture:
  - **run_caveat_first:** the `SKILL.md` has a leading limitation section *before* the procedure; `references/TEMPLATE.md` opens with a required caveat block; `references/EXAMPLE.md` and the site sample open with the caveat; `eval/cases.md` Output checks include a "leads with the caveat, does not overclaim" item.
  - **warn_redirect:** the artifact does NOT reproduce the discredited output as if valid; the SKILL.md leads with the controlled-evidence caveat and names an evidence-based alternative; the eval Output checks include a "does not produce the discredited artifact, redirects honestly" item.
  - **both:** (for branded ones) the leading caveat carries the attribution + trademark text. A batch can no longer pass structural checks with a late/missing caveat or a warn-redirect skill that quietly produces the harmful artifact.
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

The framing is not "we now ship 63 skills." It is: **56 evidence-graded core skills, plus 7 contested, explicit-request lenses we grade honestly and hand you caveat-first.** Count and report the cohorts **separately** (the headline eval numbers stay the 56-core numbers; the 7 contested lenses get their own column). Counting a small, honest, clearly-marked contested cohort separately is the honest expression of "honest grading, not breadth"; folding them into a "63 skills, all graded" headline would read as catalog padding, which the narrow admission rule + cohort framing prevent.

## Integration (the gate-breaking steps the plan must include)

- **`library.json` registration (PC-01):** every new `think-<slug>` must be appended to `library.json` (path, version, tier, status) - `gen-recommendable`/`gen-site`/`gen-catalog` read from it, and `gen-catalog` throws if the library skill count != the registry shipped count.
- **Route manifest (PC-02):** new framework pages are dead to `gen-catalog` until `scripts/route-manifest.txt` includes `/frameworks/think-<slug>/`; the ordered step is build -> `check-route-parity --update` -> `gen-catalog` -> rebuild + guards.
- **Samples path (PC-03):** samples live at `site/src/content/docs/samples/<slug>.md` (not a root `samples/`); each new shipped skill gets a caveat-first sample; do NOT run `check-example-coverage --update` to grandfather them.
- **Eval thresholds (PC-04):** 0 false-fires is hard-blocking; a contested lens must not route a generic prompt away from a stronger shipped skill; every caveat output-check must pass; core-56 and contested scores reported separately.

## Definition of done

- The 7-skill membership is locked (above); the marker schema (`caveat_first` + `posture` + `recommendation_policy`), the advisor policy, the site rendering, and the eval-reporting posture are decided in Phase 1, not "discovered" during the batch.
- `scripts/check-contested.mjs` exists and is a gate layer, enforcing BOTH postures (run_caveat_first and warn_redirect); the advisor is policy-aware; `cynefin` ships descriptively named with artifact-level attribution.
- Each of the 5 run-caveat-first lenses: `excl/flag -> shipped` at its honest tier; caveat-first by the validator; registered in `library.json`; a caveat-first sample; `eval/cases.md` with the caveat output-check; route-manifest updated.
- Each of the 2 warn-and-redirect lenses (ACH, QCA): shipped at its honest tier; the validator confirms it does NOT reproduce the discredited artifact and redirects to an evidence-based alternative; registered + sampled + routed like the rest.
- No cautionary applicator and no thin overlap-aliases ship; the other 27 excl/flag entries stay documented dossiers.
- Gate 0/0 (now 9 layers incl. check-contested); recommendable-drift clean (policy-aware); npm tests; site build + link/route guards.
- Both evals run; the thresholds above hold; the 56 core and 7 contested cohorts reported separately (headline stays the core-56 numbers, not a merged 63).
- A codex (or inline) adversarial pass confirms the caveats honestly represent each framework's deficiency, no laundering/overclaim/false-endorsement, IP posture correct, and no lens competes with a shipped skill in routing.
- Released as a minor (v0.11.0) per `release-process.md`, with the cohort framing in RELEASE-NOTES.
