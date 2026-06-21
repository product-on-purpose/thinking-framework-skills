# Spec + plan: the `think-theory-of-constraints` skill (Build, tier P)

> **STATUS: SPEC (build pending).** Part of the v0.5.0 catalog-expansion tranche. Source of truth for
> the research is [`skills/think-theory-of-constraints/SKILL.md`](../../../../skills/think-theory-of-constraints/SKILL.md) (skill shipped; the proposed dossier was merged into the skill);
> this spec turns that BUILD / tier-P verdict into a shippable skill. Build template mirrored:
> `skills/think-stocks-and-flows-reasoning/` (the nearest family sibling, six-file shape) - and the
> Fishbone registry entry as the model for a freshly-admitted, dossier-promoted entry. Do NOT edit
> `frameworks/registry.mjs` or `library.json` from this spec; both are listed here only as the fields a
> later admit-PR will add.

This document has two parts. **Part A** is the SPEC (the durable move, the SKILL.md description, the
procedure, the when-NOT wall, the distinctness claim, the evidence grade, and acceptance criteria).
**Part B** is the IMPLEMENTATION PLAN (the six files to author, the registry + library fields, the regen
and verify steps, and the gotchas).

---

# PART A - SPEC

## A1. The durable cognitive move and the named artifact

**The move.** Treat the throughput of a whole system as governed by **one binding constraint** - its
rate-limiting step - and deliberately concentrate effort there while *subordinating* (not optimizing)
everything else. This inverts the ordinary improvement instinct (make every part faster, cheaper, more
utilized). Two halves are the distinct part and neither is owned by any shipped skill: the
**anti-coverage stance** (improving a non-constraint is waste, because a non-bottleneck working harder
just piles inventory in front of the bottleneck) and the **flow / capacity selection criterion** (the
binding step is the one whose capacity caps the whole, found by comparing capacity versus demand per
step). The single question the move forces is: *what one step limits the throughput of the whole, and is
our effort aimed there or scattered?*

**The named artifact: a constraint-intervention plan.** A single-point plan, not a coverage map and not
a causal descent. It carries:

- the **named binding constraint** (one step), stated as a hypothesis;
- the **capacity-versus-demand test** that this step is genuinely the rate-limiter, not the loudest step
  (each step's capacity against the demand placed on it; the constraint is where demand meets or exceeds
  capacity and downstream starves);
- the **exploit** decision (wring maximum throughput from that step with resources already on hand,
  before spending a cent);
- the **subordinate** decision (run every non-constraint at the pace the constraint can absorb, not at
  its own local maximum);
- the **elevate** decision (add capacity to the constraint only once exploitation is exhausted);
- the **re-check** note (when the constraint moves, the plan is stale - return to identify; do not let
  inertia keep optimizing yesterday's bottleneck).

This is the Five Focusing Steps (identify / exploit / subordinate / elevate / repeat) reduced to its
working core. The deliverable is the plan, not prose, and not the full Goldratt operational systems
(Drum-Buffer-Rope, Critical Chain, Throughput Accounting) - the scoping to the bare bottleneck move is
load-bearing for the evidence grade in A6.

## A2. The SKILL.md description (drafted, rubric-compliant)

This is the `description:` value for the SKILL.md frontmatter. It is drafted to pass the U5/U3
description-score gate (`.agent-skills-toolkit/scripts/checks/description-score.mjs`, threshold 0.70):
it opens with an allowed action verb (`Produces`), contains "Use when", contains no first-person
(`I` / `you` / `we`), contains no colon-space (": ") anywhere in the value, contains no `<` `>` and no
all-caps run of 4+ letters, and is well under 1024 characters.

> Produces a constraint-intervention plan that names the single binding constraint capping a system's
> throughput and attaches its exploit, subordinate, and elevate decisions, after testing capacity
> versus demand at each step to confirm that step is genuinely the rate-limiter rather than the loudest
> one. Use when a system has a clear flow (a pipeline, a funnel, a queue, an approval chain, a
> production line) whose output is capped by one step and improvement effort is being spread evenly
> across all steps instead of aimed at the bottleneck. Not for coverage questions (route to
> think-issue-tree), recurring deep-cause questions (route to think-iceberg-model), or
> accumulation-trajectory questions (route to think-stocks-and-flows-reasoning).

Scorer arithmetic (for the author, so a later edit does not regress it): action verb +0.35, "Use when"
+0.35, length and substance +0.20, no first-person +0.10, no anti-pattern phrase and no caps/`<>`
penalty = **1.00**, well above 0.70. The verb `Produces` is on the allowed list. "rate-limiter" and
"think-*" tokens contain no 4+ uppercase run. Keep the value free of ": " on every edit (the gen-site
description check and the toolkit's structured-description rule both read this).

## A3. The procedure outline (the numbered steps SKILL.md implements)

The Instructions section of SKILL.md implements these steps; they map one-to-one onto the artifact
fields in A1 and the Five Focusing Steps.

1. **Confirm there is a flow with a plausible single rate-limiter.** State the system as a sequence of
   steps that something passes through (work items, candidates, tickets, units). If there is no flow, or
   several co-equal limiters, or an unstable/shifting constraint, stop and route out (see A4) - do not
   manufacture a bottleneck.
2. **Identify the candidate binding constraint - as a hypothesis.** Name the one step that appears to cap
   downstream output. Resist naming the loudest, most-complained-about, or most-visible step by reflex.
3. **Test it with capacity versus demand, per step.** For each step, state its capacity (how much it can
   process per unit time) against the demand placed on it. The binding constraint is the step where
   demand meets or exceeds capacity and the steps after it sit starved or idle. If the data does not
   single out one step, say the constraint is unproven and stop short of the exploit sequence.
4. **Exploit the constraint.** List how to get maximum useful throughput from that step with resources
   already on hand, before any spend (remove idle time, stop it doing work that is not throughput, feed
   it only good inputs, offload non-essential tasks).
5. **Subordinate everything else.** State how each non-constraint should run at the pace the constraint
   can absorb, not at its own local maximum. Name the local-efficiency habits that must be deliberately
   given up (a non-bottleneck running flat-out just builds queue in front of the constraint).
6. **Elevate the constraint - only if still binding after exploit.** State what added capacity would
   raise the constraint (hire, buy, parallelize, redesign the step), explicitly gated behind exploitation
   being exhausted.
7. **Re-check.** Note that elevating or exploiting can move the constraint to a new step; record the
   trigger to return to step 2, and the warning not to keep optimizing the old bottleneck out of inertia.
8. **Emit the constraint-intervention plan** per `references/TEMPLATE.md`. The deliverable is the plan,
   not prose.

## A4. The when-NOT-to-use wall

The skill MUST enforce this wall (it goes in the "When NOT to Use" section of SKILL.md and the "Should
NOT trigger" section of `eval/cases.md`):

- **Do not invent a single bottleneck when none binds, or the constraint is unstable or non-flow.** TOC
  assumes one dominant, reasonably stable bottleneck governs the system. With several co-equal limiters,
  a constraint that shifts faster than you can act on it, or no flow at all (a one-off decision, a design
  question, a values trade-off), forcing a single-constraint frame manufactures a rate-limiter that is
  not really binding and aims effort at the wrong place.
- **Route coverage / "have we considered every part?" questions to `think-issue-tree`.** If the question
  is exhaustive decomposition (every category of cause or option, nothing left out), that is the inverse
  move - coverage is TOC's failure mode, not its goal.
- **Route recurring or deep-structural-cause questions to `think-iceberg-model`.** If the question is
  "why does this keep recurring, and where structurally do we intervene?", that is leverage by causal
  depth (event to pattern to structure to mental model), which TOC does not provide.
- **Route accumulation-trajectory ("is the stock rising or falling?") questions to
  `think-stocks-and-flows-reasoning`.** If the question is whether a quantity is accumulating up or down,
  that is a net-flow reading, a different error from locating a rate-limiter.
- **Treat the identified constraint as a hypothesis to test against each step's capacity-versus-demand,
  never as found.** A wrongly named bottleneck - the loudest step rather than the binding one - sends the
  whole exploit / subordinate / elevate sequence at the wrong target. The method does not itself prove
  which step is binding; the capacity-versus-demand test does.
- **Do not subordinate healthy parts to a step that was never the true limiter.** "Subordinate everything
  to the constraint" is correct only when one constraint really governs. Applied where it does not, it
  starves working parts of the system to feed a step that was never the rate-limiter.

## A5. The distinctness statement (vs neighbors)

TOC clears the ~20% overlap ceiling on a distinct **selection principle** - "where do we act?" answered
by *single-point throughput focus* - that no shipped skill owns. The Build burden is to show no shipped
skill, and no chain of them, yields the binding-constraint / anti-coverage / capacity-governance move.

- **vs `think-issue-tree` (breadth):** inverse moves. Issue-tree maximizes MECE coverage so that nothing
  is left out; TOC deliberately ignores everything but the one binding step (coverage is its failure
  mode, not its goal). Issue-tree has no concept of a binding constraint, of capacity versus demand, or
  that effort on a non-constraint yields zero system gain. Shared machinery is minimal (both reason over
  "the parts of a system"); well under the ceiling because exhaustive coverage and deliberate single-point
  focus are opposite selection rules.
- **vs `think-iceberg-model` (nearest neighbor; already absorbed the Meadows leverage-points fold):**
  this is the real test, because iceberg already owns "find the high-leverage place to act." They use a
  **different criterion for where to intervene.** Iceberg locates leverage by causal *depth* (event ->
  pattern -> structure -> mental model). TOC locates it by *flow* (the capacity-limiting step), which is
  frequently a shallow, visible operational thing - a slow review gate, one overloaded engineer, a single
  machine - with no causal-depth or mental-model story at all, and therefore invisible to iceberg's four
  levels. Iceberg has no notion of throughput, capacity, subordination, or exploit-before-elevate; the
  artifacts differ (a four-level causal descent versus a named binding step plus exploit/subordinate/
  elevate decisions). Honestly ~20-25% (both answer "where to act"), but the depth-ladder versus
  single-rate-limiter mechanism and the artifacts are genuinely different. The hard wall: a recurring
  problem with a deep structural cause goes to `think-iceberg-model`; a flow capped by one rate-limiting
  step goes here.
- **vs `think-stocks-and-flows-reasoning` (the other flow tool):** both reason about flow, but the move
  differs. Stocks-and-flows corrects an accumulation-direction misjudgment (inferring a stock's direction
  from one flow's direction) by reading the net flow. TOC does not reason about accumulation trajectory
  at all; it locates the single rate-limiting step that caps throughput. Different error, different move;
  low-to-medium overlap.
- **Not a recipe:** there is no chain of shipped skills that produces "rank the steps by which one caps
  system throughput and subordinate the rest." The library has no constraint, capacity, or throughput
  primitive to chain from, so the move is not assembled from existing parts.
- **Not a fold:** folding into `think-iceberg-model` would destroy exactly the distinct part, because
  iceberg selects leverage by causal depth and cannot represent the binding-constraint / anti-coverage /
  capacity-governance move (a pure throughput bottleneck has no causal-depth or mental-model story).

## A6. Evidence grade (honest)

**Governing tier: P (practitioner).** This is the honest floor and ceiling, per the dossier, and the
split underneath it is the point:

- The **bottleneck principle** is durable, broadly taught, and endorsed even by its critics (Mukherjee &
  Chatterjee 2007 separate "criticism of Goldratt's rigour" from "criticism of the bottleneck
  approach"). The operational record is large and consistently positive (Mabin & Balderstone's review of
  80-plus reported applications; Bacelar-Silva, Cox & Rodrigues 2020, a systematic review of 42
  healthcare implementations).
- But none of it is controlled, comparative effectiveness evidence for the *cognitive move*. Two cautions
  cap the grade. **Selection bias:** Mabin & Balderstone report finding *no documented failures* - a
  literature of self-reported winners, not an unbiased effect estimate. **The move under test is not the
  move shipped:** almost all operational evidence measures the full apparatus (Drum-Buffer-Rope, Critical
  Chain, Throughput Accounting) as a management system, not the bare identify-and-exploit reasoning step;
  the part closest to a standalone thinking method (the Thinking Processes / Evaporating Cloud) has the
  *weakest* evidence (Kim, Mabin & Davies 2008).
- **Transferred-evidence flag is true.** Every result is from human teams in manufacturing, projects, and
  healthcare; none studies a constraint analysis produced by or with an AI agent. The transfer is a
  second, independent reason the grade is capped at P.

Grading above P would borrow the operational system's case-review record for a reasoning step those
studies did not isolate; grading below P would understate that the bottleneck principle has real,
repeated operational backing and near-universal endorsement. The widely-circulated impression that "TOC
always works" is an artifact of the no-failures-reported literature and must be excluded from any claim.
The registry governing tier MUST be `P` and MUST match the SKILL.md `evidence-tier: "P"` (the registry
tier is a token of the SKILL.md evidence-tier; see the tier-consistency check in A7).

## A7. Acceptance criteria

- **AC1 - conformance gate green (advanced, 0/0).** `node scripts/check.mjs` reports 0 errors / 0
  warnings against the pinned toolkit ref with the new skill present (this includes the U5/U3
  description-score, the structured-description rule, frontmatter, and the per-skill file-presence
  checks).
- **AC2 - eval-cases well-formed and name-safe.** `eval/cases.md` passes `validateCasesDoc` (sections
  "Should trigger" >= 3 bullets, "Should NOT trigger" >= 3 bullets, "Output checks" >= 1, no
  TODO/TBD/FIXME) and `findUnknownThinkNames` returns empty - every `think-*` token references a skill
  that is actually shipped (`think-issue-tree`, `think-iceberg-model`, `think-stocks-and-flows-reasoning`
  only).
- **AC3 - registry tier-consistency.** The registry governing tier for `theory-of-constraints` is `P`
  and equals the SKILL.md frontmatter `evidence-tier`; `node scripts/check-registry.mjs` passes its
  tier-drift, schema, drift, referential, completeness, IP, and eval-coupling checks for the new entry.
- **AC4 - description-score >= 0.7.** The drafted A2 description scores >= 0.70 (it scores 1.00 by the
  arithmetic in A2); no first-person, no ": ", no all-caps 4+ run, under 1024 chars.
- **AC5 - no em/en dashes anywhere** in any authored file (SKILL.md, dossier, template, example, cases,
  meta) - the repo `.gitattributes` is `eol=lf` and the global no-dash hook applies.

---

# PART B - IMPLEMENTATION PLAN

The skill lives at `skills/think-theory-of-constraints/`. Mirror the file shapes of
`skills/think-stocks-and-flows-reasoning/` exactly (same six files, no `CONCEPT.md` - that matches
`think-issue-tree`'s shape, which is the leaner of the two sibling templates and is what this task
specifies).

## B1. The six-file anatomy to author

### B1.1 `SKILL.md`

Frontmatter (copy the stocks-and-flows shape; change the values):

```yaml
---
name: think-theory-of-constraints
description: <the A2 value, single line, no ": " anywhere>
license: Apache-2.0
metadata:
  id: thinking-framework-skills.theory-of-constraints
  family: systems-and-consequences
  evidence-tier: "P"
  version: 0.1.0
  standard: "0.8"
---
```

Body sections, in this order (mirror stocks-and-flows): an opening paragraph (the move from A1, naming
the constraint-intervention plan and the anti-coverage inversion, and stating the scope honestly - the
bare bottleneck move, not Drum-Buffer-Rope / Critical Chain / Throughput Accounting); **When to Use**;
**When NOT to Use** (the A4 wall, naming the three sibling skills by their `think-*` names);
**Instructions** (the eight steps from A3); **Output Format** (points at `references/TEMPLATE.md`, says
the deliverable is the constraint-intervention plan, not prose); **Quality Checklist** (a checkbox list
derived from A3 + A4 - the constraint is named as a hypothesis, capacity-versus-demand was tested per
step, exploit precedes elevate, non-constraints are subordinated not optimized, the re-check trigger is
recorded, no overclaim beyond P, the output is the plan artifact); **Evidence** (the A6 summary -
tier P, the operational backing, the selection-bias and not-the-move-under-test caveats, the transferred
flag, pointer to `evidence/dossier.md`); **Examples** (points at `references/EXAMPLE.md`).

Carry the provenance comment line under the frontmatter, exactly as the sibling does:
`<!-- thinking-framework-skills | https://github.com/product-on-purpose/thinking-framework-skills | Apache-2.0 -->`

### B1.2 `evidence/dossier.md` (promoted from the `_proposed` dossier into the shipped format)

Promote `frameworks/_proposed/theory-of-constraints/dossier.md` into the shipped evidence-dossier shape
(the stocks-and-flows `evidence/dossier.md` is the model). Do **not** keep the `_proposed` site
frontmatter (`title/slug/generated_status` + the STATUS:GENERATED markers) - the shipped dossier opens
with a `# Evidence Dossier: Theory of Constraints` heading and a one-line "single source of truth" note,
then a small identity table (Skill / Family / Evidence tier P / Confidence / Status), then numbered
sections mapped from the `_proposed` body:

1. **The mechanism** (from "What it is" - the bottleneck principle, the Five Focusing Steps reduced to
   the move, the anti-coverage inversion, the explicit scope note that the full operational toolkits are
   out of scope).
2. **Lineage** (from "Lineage and who to read" - Goldratt 1947-2011; *The Goal* 1984 with Jeff Cox; the
   Thinking Processes 1990; the descriptive/attribution note - "Theory of Constraints"/"bottleneck
   analysis" used generically with attribution to Goldratt, not handled as a trademark).
3. **What the evidence shows, and what it does NOT show** (from "What the evidence says" - the supported
   operational claim; the not-supported part - no controlled comparative trial, selection bias / no
   failures reported, the apparatus-not-the-move gap, the Thinking-Processes weakness).
4. **Transferred-evidence flag** (true; human teams only, not AI-validated; why the AI value still holds
   - forcing the explicit capacity-versus-demand test and an inspectable plan is a direct counter to
   naming the loudest step).
5. **When it works / when it fails** (from "When it helps / when it misleads" - the poor-fit and
   anti-pattern list).
6. **Output artifact** (the constraint-intervention plan, fields per A1).
7. **Sources** (a `## Sources` section - the six named sources from the `_proposed` dossier's "Named
   sources", each with author, year, and what it shows; plus the exclusion note that "TOC always works"
   and any implied success rate trace to a self-selected body of success cases and are not counted toward
   the grade).

Close with a one-line verification-status note in the sibling's style (the bottleneck principle and the
no-failures-reported caveat are well-attested; confirm the Mabin & Balderstone and Bacelar-Silva
citation specifics before any public quantified claim).

### B1.3 `references/TEMPLATE.md`

The fill-in constraint-intervention plan. Model the header note on the sibling ("Fill this in. The
deliverable is the plan, not prose."). Sections (the A1 artifact, as fillable fields):

- **System / flow** - the sequence of steps the work passes through.
- **Capacity vs demand per step** - a table: `Step | Capacity (per unit time) | Demand placed on it |
  Starved or saturated?`.
- **Binding constraint (hypothesis)** - the one step the table singles out, stated as a hypothesis, with
  the evidence that demand >= capacity here and downstream starves.
- **Exploit** - get max throughput from it with current resources, before spend.
- **Subordinate** - run non-constraints at the constraint's pace; local-efficiency habits to give up.
- **Elevate (only if still binding after exploit)** - added capacity, gated behind exploit being
  exhausted.
- **Re-check trigger** - what would move the constraint, and the note not to keep optimizing the old one.

### B1.4 `references/EXAMPLE.md` (the shared Northwind scenario)

A completed run on the same Northwind scenario the sibling examples use, so the catalog stays coherent.
Frame it as a flow problem (Northwind is a B2B SaaS; reuse a Northwind sub-system that is genuinely a
flow - e.g. the Northwind onboarding/activation pipeline, or the support-ticket queue, or the
sales-qualification funnel). Show the capacity-versus-demand table singling out one step (e.g. a single
solutions-engineer review gate that every new account must pass, saturated while the steps after it sit
idle), then exploit (stop routing low-value tasks through that engineer; batch reviews) before elevate
(hire a second reviewer). End with the value note in the sibling's style: the worth is refusing to
spread effort evenly and refusing to name the loudest step - the plan aims the whole exploit/subordinate/
elevate sequence at the one step that actually caps throughput, and flags that fixing it may move the
constraint downstream. Keep it distinct from the iceberg and stocks-and-flows Northwind runs (this is a
rate-limiter, not a causal descent and not an accumulation).

### B1.5 `eval/cases.md` (name-safe)

Mirror the sibling's four sections.

- **Should trigger** (>= 3; aim for 5-6): flow-capped-by-one-step prompts - "our onboarding takes 6
  weeks and everything waits on the security review; where do we actually unblock throughput?"; "the CI
  pipeline is the slowest part of every release - is making the other stages faster even worth it?"; "we
  keep adding salespeople but revenue is flat, the bottleneck seems to be the demo team"; "the hiring
  funnel is jammed at the onsite-interview stage"; "support tickets pile up even though we hired more
  L1 agents".
- **Should NOT trigger (wrong tool / near-miss)** (>= 3): the routing cases, each naming the correct
  shipped skill - a coverage question -> `think-issue-tree`; a recurring deep-cause question ->
  `think-iceberg-model`; an accumulation-trajectory question -> `think-stocks-and-flows-reasoning`; plus
  a no-flow case (a one-off decision or a values trade-off, no single binding constraint) and a plain
  summarization request.
- **Output checks** (>= 1; a short checkbox list): names one binding constraint as a hypothesis; includes
  a capacity-versus-demand test per step; exploit precedes elevate; non-constraints subordinated not
  optimized; records the re-check trigger; is the constraint-intervention plan artifact, not prose; no
  overclaim beyond P.
- **Value vs unaided baseline**: a short paragraph - asked "where do we unblock throughput?", an unaided
  model tends to suggest improving several steps at once or fixing the loudest-complained-about step;
  this skill forces the capacity-versus-demand test that singles out the one binding step and the
  subordinate decision that stops wasting effort on non-constraints.

**Name-safety is load-bearing**: the only `think-*` tokens allowed in this file are
`think-issue-tree`, `think-iceberg-model`, and `think-stocks-and-flows-reasoning` (all shipped).
`findUnknownThinkNames` must return empty. Do not write `think-theory-of-constraints` itself into a
"should NOT trigger" line and do not reference any unshipped sibling.

### B1.6 `skill.meta.yml`

Mirror the sibling sidecar. Key values: `slug: theory-of-constraints`; `name:
think-theory-of-constraints`; `display_name: Theory of Constraints`; `primary_family:
systems-and-consequences`; `thinking_modes` includes `systems` and `analytical`; `primary_artifact_type:
constraint-intervention-plan`; `evidence_tier: "P"`; `transferred_evidence: true`; `attribution_required:
true` (attribute Goldratt) and `trademark: none` (documented descriptively, not branded - the dossier is
explicit that "Theory of Constraints"/"bottleneck analysis" are used generically with attribution, not
as a trademark); `lineage.derived_from` includes Goldratt / *The Goal* / Five Focusing Steps;
`complements` lists `thinking-framework-skills.iceberg-model` and
`thinking-framework-skills.stocks-and-flows-reasoning`; `source_dossier: evidence/dossier.md`; the four
`implementation` paths pointed at this skill dir. Keep every value free of ": " collisions inside YAML
scalars (quote any value that contains a colon).

## B2. The registry shipped-entry fields (for the admit-PR; do NOT edit `registry.mjs` from this spec)

Add to `frameworks/registry.mjs`, in the `systems-and-consequences` family block (next to `iceberg-model`
and `stocks-and-flows-reasoning`). Model: the Fishbone entry (the most complete freshly-admitted shape,
with `dossierPath` + `sources` + `aliases`). Fields:

- `slug`: `theory-of-constraints`
- `name`: `Theory of Constraints`
- `family`: `systems-and-consequences`
- `tier`: `P` (governing; must equal SKILL.md `evidence-tier`)
- `status`: `shipped`
- `verdict`: `shipped`
- `oneLine`: a short gloss with no ": ", e.g. `find and exploit the one binding constraint`
- `reasoning`: one line - built and validated; owns single-point throughput focus (the binding-constraint
  / anti-coverage / capacity selection principle) that breadth (issue-tree), depth (iceberg), and
  accumulation (stocks-and-flows) do not provide; honest tier P (operationally backed, no controlled
  trial of the move, transferred).
- `evalCases`: `skills/think-theory-of-constraints/eval/cases.md`
- `attribution`: `Eliyahu M. Goldratt (Theory of Constraints; The Goal, 1984)`
- `aliases`: `['TOC', 'Five Focusing Steps', 'bottleneck analysis', 'constraint analysis']`
- `sources`: array of `{ title, url, kind }` objects (each title non-empty, each url a real http URL) -
  *The Goal* (1984), *What Is This Thing Called TOC* (1990), Mabin & Balderstone (2003 IJOPM / 2000
  book), Bacelar-Silva, Cox & Rodrigues (2020), Kim, Mabin & Davies (2008), Mukherjee & Chatterjee
  (2007) - taken from the dossier's Named sources. The registry source-url check is stricter than the
  single-entry validator (it wants real http URLs), so supply resolvable links.
- `dossierPath`: optional once the skill ships (the shipped `evidence/dossier.md` is the live copy); if
  kept, point it at the promoted dossier. Follow whatever the other shipped systems entries do at admit
  time (iceberg/stocks omit `dossierPath`; Fishbone, a non-shipped admit, carries one). For a *shipped*
  entry, omit `dossierPath` to match iceberg/stocks.

Note: `evalDate` is used by re-vetting entries (e.g. Fishbone). A first-ship entry follows the sibling
shipped entries, which omit it; add it only if the admit-PR convention at that time calls for it.

### The `library.json` component (for the admit-PR; do NOT edit `library.json` from this spec)

Add one object to `components.skills` (same shape as every sibling):

```json
{ "name": "think-theory-of-constraints", "path": "skills/think-theory-of-constraints/SKILL.md", "version": "0.1.0", "tier": "universal", "status": "active" }
```

## B3. Regen + verify steps (run in order)

After authoring the six files and (in the admit-PR) adding the registry entry + library component:

1. **`node scripts/gen-registry.mjs`** - regenerates the catalog and the why-not surfaces from
   `registry.mjs` (catalog and why-not are GENERATED and drift-checked; never hand-edit them).
2. **`node scripts/gen-recommendable.mjs`** - regenerates the advisor corpus (pulls anti_triggers /
   not_use / overlaps from the new SKILL.md "When NOT to Use" and `eval/cases.md` via cases-lib).
3. **`node scripts/gen-site.mjs`** - regenerates the site pages (the Framework Library dossier/index
   entries and the generated SKILL surfaces).
4. **`node .agent-skills-toolkit/scripts/generators/gen-manifest.mjs`** - regenerates
   `manifest.generated.json` (a new skill is a manifest component; per-target presence must stay 0/0).
5. **`node .agent-skills-toolkit/scripts/generators/gen-index.mjs`** - regenerates `INDEX.md` so the new
   skill is listed (the index-drift check is in the gate).
6. **`node scripts/check.mjs`** - the required conformance gate; must be advanced, 0 errors / 0 warnings
   (includes description-score, eval-cases, the engine-copy drift check, registry checks where wired,
   and index/manifest drift).
7. **`npm test`** (`node --test "tests/**/*.test.mjs"`) - unit tests green.
8. **Site build + link/route guards** - build the Astro site and run the rendered-link and route-parity
   guards (`scripts/check-rendered-links.mjs`, `scripts/check-route-parity.mjs`; route manifest at
   `scripts/route-manifest.txt`) so the new dossier route is present and no link is broken.
9. **`node scripts/check-registry.mjs`** - the registry-specific pass (schema / drift / referential /
   completeness / IP / eval-coupling / tier / recommendable); confirms tier-consistency for the new
   entry.

The exact generator paths can drift; if a `gen:*` npm alias exists for any of the above, prefer it. The
authoritative invariant is: **regenerate everything generated, then the gate + tests + site guards must
be 0/0 with the new skill present.**

## B4. Gotchas

- **The U5 description rubric.** The `description:` must open with an allowed action verb, contain "Use
  when", carry no first-person, and avoid the anti-pattern phrases and any `<` `>` / all-caps-4+ run.
  Threshold is 0.70; the A2 draft scores 1.00. Re-score after any edit (see `description-score.mjs`).
- **No colon-space (": ") in YAML or in the description value.** A ": " inside an unquoted YAML scalar
  can be parsed as a key/value split and breaks frontmatter; the structured-description rule and the
  task's U5/U3 gate also forbid ": " in the description. Quote any YAML value that legitimately needs a
  colon, and write the description without ": " (use " - " or restructure).
- **Eval-case name-safety.** Only reference *shipped* `think-*` skills in `eval/cases.md` (and in the
  SKILL.md "When NOT to Use"): `think-issue-tree`, `think-iceberg-model`,
  `think-stocks-and-flows-reasoning`. `findUnknownThinkNames` flags any unknown token. Also keep >= 3
  bullets each in "Should trigger" and "Should NOT trigger", >= 1 in "Output checks", and no
  TODO/TBD/FIXME (placeholders fail `validateCasesDoc`).
- **No em-dashes or en-dashes anywhere.** U+2014 and U+2013 are banned in every authored file (prose,
  comments, tables, the dossier promoted from `_proposed`). Sweep the promoted dossier specifically - the
  `_proposed` source may contain dashes that must be converted to " - " or restructured on promotion. The
  repo is `eol=lf`; keep LF endings.
- **Do not hand-edit generated files.** The catalog, why-not surfaces, recommendable corpus,
  `manifest.generated.json`, `INDEX.md`, and the generated site pages are all produced by the generators
  in B3; edit the sources (SKILL.md, registry entry, dossier) and regenerate.
- **Tier is single-sourced by intent but checked in two places.** Set `evidence-tier: "P"` in SKILL.md
  AND `tier: 'P'` in the registry entry; the registry tier-drift check fails if they disagree.
