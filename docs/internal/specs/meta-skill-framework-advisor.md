# Spec: `tfs-framework-advisor` (the meta-skill recommender)

> **Type:** build spec (a contract for a future skill, not a built skill).
> **Status:** proposed, ready to author. Decisions inside are settled-but-revisable; open questions are listed in section 14.
> **Author:** product-on-purpose · **Drafted:** 2026-06-01 · **Target tier:** convergent (Silver), Claude + Codex.
> **Models on:** `pm-skills/skills/foundation-prioritized-action-plan` (the recently shipped PM "prioritized action plan" skill).

---

## 1. Purpose and positioning

`tfs-framework-advisor` is the **front door** to the library. A user describes a real situation in their own words - a decision they are stuck on, a problem that keeps recurring, a plan they are nervous about, a pile of notes they cannot make sense of - and the skill returns a **Thinking Plan**: a short, prioritized sequence of the *specific frameworks in this library* to apply, in order, each with the reason it fits, its evidence tier, the artifact it will produce, and a filled-in copy/paste invocation. It also says, explicitly, what **not** to use and why.

The library today is 30 method-skills plus 4 recipes. Method-skills are **executors**: each applies one framework to one problem. The advisor is a **router**: it reads a messy context and selects, sequences, and hands off to the right executors. Without it, a 30-skill library asks the user to already know which thinking move they need - the exact knowledge a non-expert lacks. The advisor turns "here are 30 tools" into "for *your* situation, do these three, in this order, here's why."

This skill is the operational core of the "guidance / help" and "exploration" goals in `docs/internal/research/documentation-and-site-plan.md`. The docs site teaches frameworks one at a time; the advisor is the interactive, context-first entry point that the site links to first.

**One-line positioning:** *Describe your situation; get a prioritized, evidence-graded plan of which thinking frameworks to use and why.*

## 2. What it is modeled on, and what changes

The PM skill `foundation-prioritized-action-plan` solves the same shape of problem for PM delivery work: take messy input, diagnose the situation, find the one thing that matters most, produce a ranked plan, and hand off to downstream skills with filled prompts. We deliberately reuse its proven structure so the two libraries feel consistent. The table is the full translation; the rest of this spec elaborates.

| pm-skill element | What it does there | `tfs-framework-advisor` analog |
|---|---|---|
| Source ledger (exact quotes first) | Cite-or-don't-claim grounding | **Same, kept verbatim.** Build a ledger of exact quotes before diagnosing. |
| Input mirror | Reflect input back before it carries weight | **Same.** |
| Cynefin classifier | Caps plan confidence by how knowable the situation is | **Stakes x reversibility calibrator** (section 6.2). Caps how *heavy* a plan to prescribe; reuses the one-way/two-way-door logic already shipped. |
| Theory of Constraints | Finds the one binding constraint -> P1 | **Cognitive-job diagnosis** (section 6.1). Finds the dominant thinking job, then the minimal corrective sequence; the job that unblocks the most is step 1. |
| Ranked action plan (P1-P5) | The deliverable | **The Thinking Plan** (section 9): a sequence of framework recommendations. |
| Recommend downstream pm-skills, filled prompts, name-safety | Route to executors without inventing names | **Same**, routing into the 30 `tfs-` skills + 4 recipes, with build-time name-safety (section 8). |
| Cynefin caps confidence; refuse High in Complex/Chaotic | Honesty governor | **Stakes calibrator caps plan heft + evidence tier caps per-framework confidence** (section 6.3). |
| Evidence map (Section 8) | Audit of inline sources | **Same.** |

**The two engines that differ are the heart of this skill**, so they get their own section (6). Everything else is house-style reuse.

## 3. Name and artifact

- **Skill name (installable):** `tfs-framework-advisor` (carries the library `tfs-` prefix; satisfies S2).
- **Skill ID:** `thinking-framework-skills.framework-advisor`.
- **Artifact it produces:** a **Thinking Plan** - one saveable markdown document.
- **Classification:** meta / router. It is the only skill in the library that recommends *other skills*; every other skill executes a method.

Naming rationale: "advisor" names the function (it advises which frameworks); "Thinking Plan" names the artifact (parallel to the PM skill's "action plan"). Alternative names considered and why not: `tfs-method-finder` (too search-like; it sequences, not just finds), `tfs-thinking-coach` (implies ongoing coaching/state, which a single-turn skill does not do), `tfs-recommend-frameworks` (verb-y but loses the artifact framing). See open question 14.1 if the user prefers a different label.

## 4. Identity

- Meta/router skill; produces a reusable working-document the user saves and reuses.
- Single-turn; one Thinking Plan per invocation.
- Read-only tools (Read, Grep); produces markdown output. It **recommends and hands off**; it never invokes another skill inline.
- Recommends only from the library's own components (the 30 `tfs-` skills and the 4 recipes), by exact name, from a build-time-generated recommendable set (section 8).

## 5. Core principle

**Match the thinking move to the thinking job, and prescribe the fewest moves that do the work.** A library is not a checklist; running more frameworks is not better thinking. The advisor's discipline is *subtraction*: diagnose the one or two cognitive jobs the situation actually needs, recommend the minimal sequence that addresses them, and explicitly defer the rest. This is the direct analog of the PM skill's "one constraint binds; everything else is noise until it is lifted," adapted to cognition: at any moment a small number of thinking moves unblock the most, and the calibrator (stakes x reversibility) sets how many moves are even warranted.

Two honesty commitments carry over unchanged from the library's four commitments and from the PM model:

1. **Evidence is structural, not decorative.** Every recommended framework is tagged with its catalog evidence tier (S/M/P/V/A/C/X). A practitioner-tier (P) framework is still recommendable, but it is labeled P, never dressed up as settled science. The advisor never inflates a tier to make a recommendation sound stronger.
2. **Cite or do not claim.** Build a source ledger of exact quotes from the user's input first; every diagnosis and recommendation references a ledger entry or is tagged `Inferred (Low confidence)`. An inferred claim may not be the sole justification for the top recommendation.

## 6. The two engines

### 6.1 Engine 1 - Cognitive-job diagnosis (the routing engine)

This replaces Theory of Constraints. The library's `framework-catalog.md` is already organized into **11 cognitive-operation families**; each family *is* a thinking job. The advisor classifies the situation into one or more jobs, identifies the **dominant job** (the one that unblocks the most right now), and selects the minimal corrective sequence.

The routing table (the catalog families, as jobs, with the strongest shipped skill[s] for each). The built skill carries this as a reference file generated from the catalog + manifest (section 8); it is reproduced here as the design contract:

| Cognitive job (catalog family) | Telltale signals in the user's input | Primary shipped skills | Tier |
|---|---|---|---|
| **Reframe the problem** (fam 3) | "the real problem is...", solving the wrong thing, fuzzy or solution-shaped problem statement | `tfs-problem-restatement`, `tfs-abstraction-laddering` | M/P, P |
| **Expand options / diverge** (fam 2) | "only two choices", stuck, premature convergence, need fresh ideas | `tfs-brainwriting` (**S**), `tfs-far-analogy-ideation` (**S**), `tfs-scamper`, `tfs-assumption-reversal`, `tfs-question-burst` | S-P |
| **Shift perspective** (fam 1) | one-sided view, "are we missing something", stakeholder blind spots | `tfs-parallel-perspectives-review`, `tfs-red-team-light` (flag) | P |
| **Challenge assumptions / beliefs** (fam 4) | over-confident claim, "everyone agrees", reasoning that may not hold, probability confusion | `tfs-argument-mapping` (**S**), `tfs-authentic-dissent` (**S**), `tfs-natural-frequency-bayesian` (**S**), `tfs-evidence-vs-inference-sort`, `tfs-ladder-of-inference-check`, `tfs-what-would-have-to-be-true` | S-P |
| **Stress-test for risk / failure** (fam 5) | "what could go wrong", nervous about a plan, optimistic estimate, history of overruns | `tfs-premortem` (S/M), `tfs-reference-class-forecasting` (**S**), `tfs-woop` (**S**), `tfs-backcasting` | S-P |
| **Reason about the system** (fam 6) | recurring problem, fixes that backfire, "why does this keep happening", accumulation/delay dynamics | `tfs-stocks-and-flows-reasoning` (**S**), `tfs-futures-wheel`, `tfs-iceberg-model` | S, P |
| **Evaluate options / decide** (fam 7) | multiple defined options to choose among, "which should we pick", reversibility unclear | `tfs-decision-option-review`, `tfs-one-way-vs-two-way-door`, `tfs-linear-model-aggregation` (**S**), `tfs-decision-journal` | P, S |
| **Synthesize / clarify reasoning** (fam 9) | "I can't make sense of all this", scattered notes, unstructured argument, need an answer-first memo | `tfs-issue-tree`, `tfs-affinity-mapping`, `tfs-pyramid-principle` | P |
| **Reflect / learn** (fam 11) | after the fact, "what did we learn", recurring mistakes, want to calibrate | `tfs-after-action-review` (S/M), `tfs-decision-journal` | S/M, P |

(Families 8 strategy, 10 facilitation are intentionally thin in this library - 8 mostly defers to `pm-skills`, 10 is human-social. The advisor says so when a situation lands there, rather than forcing a poor-fit recommendation. See refusal protocol 11.6.)

**Diagnosis rules (by evidence, not by topic):**
- Classify by the *thinking failure or job present*, not the subject matter. "Should we launch the free tier" is not automatically a "decide" job; if the user has not framed the problem or generated options yet, the dominant job is reframe or diverge, and decide comes later.
- Most situations have a **dominant job plus a natural follow-on** (diverge then converge; reframe then diverge; decide then stress-test). The advisor sequences these. It does not list one framework per family.
- When a recognized **multi-step job** matches a shipped recipe, recommend the recipe/workflow, not a hand-stitched chain (section 7).

### 6.2 Engine 2 - Stakes x reversibility calibrator (the heft governor)

This replaces Cynefin as the confidence/rigor cap. It answers: *how much thinking apparatus is this situation worth?* It directly reuses the logic of the shipped `tfs-one-way-vs-two-way-door` skill.

| Reversibility | Stakes | Recommended plan heft | Confidence ceiling on the plan |
|---|---|---|---|
| Two-way door (easily reversible) | Low | 1 framework, fast. Often "just decide and watch." | Medium-High |
| Two-way door | High | 1-2 frameworks. | Medium-High |
| One-way door (hard to reverse) | Low | 1-2 frameworks. | Medium |
| One-way door | High | 2-4 frameworks, the fuller gauntlet (diverge -> stress-test -> decide -> record). | Medium (never asserted as High) |

**The calibrator is the anti-framework-overload mechanism.** Its default posture is *minimal*. Prescribing four frameworks for a reversible, low-stakes call is the signature failure mode of a "framework library" and the advisor must refuse to do it. If the input does not reveal stakes or reversibility, the advisor asks one clarifying question (protocol 11.2) or defaults to the lighter plan and says so.

### 6.3 How the two engines combine into confidence

- **Engine 1** sets *which* frameworks and *in what order*.
- **Engine 2** sets *how many* and *how rigorous*.
- **The catalog evidence tier** sets the *per-framework* confidence label, carried straight from the catalog. The advisor never recommends a framework above its tier, and prefers higher-tier frameworks when two would do the same job (e.g., for "diverge," lead with `tfs-brainwriting` (S) before `tfs-scamper` (P), unless the input specifically calls for transformation prompts).
- **Overall plan confidence** is capped by Engine 2 and demoted one notch if the dominant-job diagnosis rests on `Inferred` (unquoted) signal.

## 7. Recipe- and workflow-level recommendations

When the diagnosed job is a known multi-step sequence, the advisor recommends a shipped **recipe/workflow** rather than re-deriving the chain (parallel to the PM skill recommending a Sprint family entry point instead of stitching sub-steps). The current mapping:

| Diagnosed multi-step job | Recommend |
|---|---|
| "My problem is fuzzy and I need a better frame and fresh angles" | `reframe-problem` recipe (restate -> evidence-sort -> perspectives) |
| "I'm out of ideas / stuck on two options" | `expand-options` recipe (restate -> scamper -> assumption-reversal) |
| "I have a plan/decision and want to pressure-test it before committing" | `stress-test-decision` recipe (option-review -> WWHTBT -> premortem -> reference-class) |
| "I want to check whether my reasoning actually holds" | `audit-reasoning` recipe (evidence-sort -> ladder -> perspectives) |

If no recipe matches, the advisor composes an ad-hoc sequence from individual skills and labels it as such.

## 8. Name-safety and the build-time recommendable set

The advisor may name a skill or recipe **only if its exact name exists in the library**. It must never invent or approximate a name. Mechanism (reuses the repo's existing generation discipline - the same pattern as `gen-manifest.mjs` reading `library.json`):

- A build step generates `references/recommendable.json` (and a human-readable `references/recommendable.md`) from `library.json` `components` (the source of truth for what is installed) joined with each skill's `framework-catalog.md` row (family + evidence tier + one-line mechanism + use-when). This file is the *only* source the skill may name from.
- The generator is a small script (`scripts/gen-recommendable.mjs`) run at author time and re-run whenever skills are added/removed, so names never drift. It is the advisor's analog of the PM skill's "build-time catalog generator emits Tier 1/2."
- If the generated set is unavailable at runtime for any reason, the skill falls back to an embedded exact-name list of the 30 skills + 4 recipes (committed in the skill), and where no listed component maps cleanly, it gives the next step in **plain language** rather than guessing a name.
- **Never recommended:** the advisor itself (no self-reference), and any `[flag]` skill is recommended only with its caveat surfaced (e.g., `tfs-red-team-light`'s "engineered not authentic dissent" note).

## 9. Output structure - the Thinking Plan

One markdown document. Sections in order (the executive summary is the fast-skim layer; nothing is dropped to save words):

0. **Source ledger** - exact quotes from the input (IDs S1, S2, ...), built before anything else.
1. **Executive summary** (120-180 words) - the situation in one line, the diagnosed dominant job, the recommended sequence named, and the single most important move to make first.
2. **Input mirror** - what you told me (restated), what you appear to be trying to accomplish (inferred intent + confidence), adjacent intents noticed but not assumed. The user confirms this before the plan carries weight.
3. **Diagnosis** - (a) the cognitive job(s) present and the **dominant** one, with `Source:` citations; (b) the stakes x reversibility read and therefore the plan heft. This is where Engine 1 and Engine 2 are shown and made auditable.
4. **The Thinking Plan** - the prioritized sequence of 1-4 framework recommendations. Each recommendation is a block with all of:
   - **Framework / skill name** (exact, from the recommendable set) and whether it is a single skill or a recipe.
   - **The job it does here** - which cognitive job, tied to the diagnosis.
   - **Why this one** - why this framework over near-neighbors (the overlap logic; e.g., "brainwriting over scamper because you need volume of fresh options, not transformation of an existing one").
   - **Evidence tier** - S/M/P/V/A/C/X, carried from the catalog, with a one-line honest read.
   - **Expected artifact** - what running it produces (the risk register, the option matrix, the reframed problem set).
   - **Filled invocation** - a ready-to-run prompt with the user's actual context inserted, not a placeholder.
   - **When to stop / what "done" looks like** - so the user does not over-run the tool.
   - **Sequence position** - step 1..N, with what each step feeds into.
5. **What NOT to use, and why** - 2-4 explicit non-recommendations (frameworks a naive reading might suggest but that do not fit, including any tempting framework cut by the stakes calibrator). Defer is half the value.
6. **If this goes deeper** (optional) - a pointer to the docs-site page for the recommended frameworks for the user who wants to learn, not just execute. Ties to the documentation plan.
7. **Evidence and source map** - consolidate the ledger; confirm the dominant-job diagnosis and the top recommendation each cite a non-Inferred source; state gaps honestly.

**Length tiers** (soft target / hard max), mirroring the PM skill: simple 700-1,100 / 1,300; medium 1,100-1,800 / 2,000; complex 1,800-2,600 / 2,800. If shortening, cut framework explanation first, then the lowest-priority step-N blocks; never drop the diagnosis (3) or the evidence map (7).

## 10. Evidence requirements for the built skill (its own dossier)

Per the library's first commitment, the built skill needs `evidence/dossier.md` grounding *its own* method - the practice of matching a thinking tool to a thinking situation. This is meta-cognitive evidence, distinct from any one framework's evidence. The dossier should honestly grade and cite:

- **Tool-task fit / "law of the instrument."** The risk of a favored tool being over-applied (Maslow 1966; Kaplan 1964). Supports the subtraction principle.
- **Decision-by-reversibility.** Matching deliberation to reversibility/stakes (Bezos's one-way/two-way doors as a practitioner frame; the underlying real-options intuition). This is Engine 2's basis - tier P, labeled as such.
- **Cognitive load and choice overload.** That offering more options/tools can degrade rather than improve decisions (Iyengar & Lepper 2000; the contested follow-up literature - cite the contest honestly, do not overstate).
- **Decision-tool selection / contingency views.** Work arguing the right method depends on the decision type rather than one method dominating (e.g., Cynefin's contingency claim - tier C; classical vs naturalistic decision making, Klein). Cite as orienting, not settled.
- **The empirical-core honesty itself.** That this library's own frameworks span S to P tiers, so an advisor must label tiers rather than flatten them - sourced to the catalog and its meta-analyses.

The dossier's honest conclusion is likely: *the act of routing is practitioner-tier (P) - defensible, useful, not a hard science - while the individual frameworks it routes to carry their own (often stronger) evidence.* The skill must not claim more for itself than that.

> **Build-decision note (2026-06-01, added when the skill shipped):** a primary-source verification pass *downgraded* the routing claim below this spec's anticipated P. The shipped skill grades itself **M/C (split)**: applying a *fitting structured method* is M (with an S core for mechanical/linear combination on repeated predictive judgments - Grove 2000, Dawes 1979, Meehl 1954), but whether *this router picks the right method* is **C** - its accuracy has never been measured, in humans or AI. The "P for routing" line above is the pre-verification estimate; the authoritative grade is the shipped `evidence/dossier.md` (section 3). This divergence is deliberate (the build is more honest than the spec guessed), not an oversight.

## 11. Refusal and honesty protocols

1. **Not a thinking task.** If the input is a factual lookup, a coding request, or otherwise not a reasoning/decision situation, redirect in one line: "This skill recommends thinking frameworks for a decision or problem. For other tasks, use a general assistant."
2. **Insufficient signal.** If the input is under ~40 words and lacks specific signal, ask **one** clarifying question (usually: what is at stake, and how reversible is it?) before producing the plan. Do not interrogate.
3. **Cite or do not claim.** Every diagnosis and recommendation references a ledger ID or is tagged `Inferred (Low confidence)`; an Inferred claim may not be the sole basis for the dominant-job call or the step-1 recommendation.
4. **No tier inflation.** Never present a framework above its catalog tier. If the only fitting framework is P-tier, say P-tier.
5. **No framework-overload.** Respect the stakes calibrator. If tempted to recommend more than the calibrator warrants, cut to the calibrated number and move the rest to "what NOT to use (yet)."
6. **Honest about thin families.** If the situation lands in a family this library serves poorly (most of strategy fam 8 -> `pm-skills`; facilitation fam 10 -> human-social), say so and point outward rather than forcing a poor-fit `tfs-` recommendation.
7. **Name safety.** Name only components confirmed in the recommendable set; otherwise describe the step in plain language. Never invent a name.

## 12. Packaging and tier implications

- Adds one skill directory `skills/tfs-framework-advisor/` with the standard 6-file unit (`SKILL.md`, `evidence/dossier.md`, `references/TEMPLATE.md`, `references/EXAMPLE.md`, `eval/cases.md`, and the generated `references/recommendable.{json,md}`), authored via `docs/internal/AUTHORING.md`.
- Adds `scripts/gen-recommendable.mjs` (author-time generator) and a note in `AGENTS.md`.
- Registered in `library.json` `components.skills`; re-run `gen-manifest.mjs` so the native manifests pick it up. The plugin stays at convergent (Silver), claude + codex; this skill introduces no new tier requirement.
- The advisor itself ships **no** chain in frontmatter and invokes nothing inline, so `agents/_chain-permitted.yaml` stays `{}` and S4 stays clean.
- **Validation gate:** must pass `evaluate.mjs` at convergent, 0/0, like every other component.

## 13. Behavioral guardrails (for `SKILL.md`)

1. **Subtract, don't stack.** The default is the fewest frameworks that do the job; the calibrator sets the ceiling.
2. **Diagnose the job, not the topic.** Classify by the thinking move needed, by evidence from the input.
3. **One dominant job, one first move.** Name the move that unblocks the most; sequence the rest behind it.
4. **Label every tier honestly.** Carry the catalog tier; never inflate.
5. **Mirror first, recommend second.**
6. **Name only what exists.** Recommend from the generated set; plain-language otherwise.
7. **Recommend, never run.** The Thinking Plan is the artifact; hand off with filled invocations.
8. **Defer is half the value.** Always populate "what NOT to use, and why."

## 14. Open decisions (for the user)

1. **Skill name.** `tfs-framework-advisor` (recommended) vs `tfs-thinking-plan` (artifact-named) vs another. Cosmetic; the prefix and ID convention hold either way.
2. **Front-door prominence.** Should the advisor also be surfaced as a slash-command once the toolkit wires command->skill resolution, so users can type `/tfs-framework-advisor`? (Skills are invocable directly today; this is about a friendlier entry point and is deferrable.)
3. **Docs-site coupling.** How tightly should section 6 of the Thinking Plan link into the docs site - deep links per framework page (needs the site live) vs a generic "see the catalog" pointer until then.

## 15. Build plan (how to author it)

This is a normal pass through the existing authoring loop, with one extra generator step:

1. Write `evidence/dossier.md` first (section 10) - source of truth; grade the meta-method honestly at tier P.
2. Write `scripts/gen-recommendable.mjs`; generate `references/recommendable.{json,md}` from `library.json` + `framework-catalog.md`.
3. Write `SKILL.md` (the U5-scoring description, the two engines, the protocols, the output contract, the guardrails).
4. Write `references/TEMPLATE.md` (the Thinking Plan fill-in scaffold) and `references/EXAMPLE.md` (one fully worked plan on the shared Northwind scenario - e.g., "should we launch a free tier" diagnosed as reframe -> diverge -> stress-test, two-way-door-ish, medium heft).
5. Write `eval/cases.md` (should-trigger, should-not-trigger incl. a near-miss like "is this PRD any good" -> not this skill, and "what's the capital of France" -> refuse; output checks; value-vs-unaided baseline - the baseline being that an unaided model will name plausible-sounding frameworks but will not tier them, will over-stack, and may invent framework names this library does not have).
6. Register in `library.json`, re-run `gen-manifest.mjs`, validate at convergent 0/0, ship as a PR.

---

## Sources

> Per the library's documentation standard, every doc carries a source list. These ground the advisor's design and its forthcoming dossier; web-sourced references are scoped as such and are primary-verified at authoring time before the dossier cites them.

**The model and internal foundations**
- `pm-skills/skills/foundation-prioritized-action-plan/SKILL.md` - the structural template (source ledger, mirror, classify, prioritize, route with filled prompts, evidence map, name-safety, tiered recommendable set).
- `docs/internal/research/framework-catalog.md` (this repo) - the 11-family taxonomy, the 7-tier evidence model, and the per-framework tiers that the routing table and tier labels are taken from.
- `docs/internal/research/documentation-and-site-plan.md` (this repo) - the guidance/help and exploration goals this skill operationalizes.
- `docs/internal/AUTHORING.md` and the library's four commitments - the authoring loop and the evidence/honesty discipline.
- The discovery meta-analyses (`_local/initial-discovery/meta-analysis_claude-opus_*`, kept private per `docs/internal/research/README.md`) - the empirical-core-vs-practitioner-ring framing that justifies tier-labeling rather than flattening.

**Meta-method evidence (for the dossier; tiers to be confirmed at authoring)**
- Maslow, A. H. (1966). *The Psychology of Science.* - the "law of the instrument" / over-application of a favored tool.
- Kaplan, A. (1964). *The Conduct of Inquiry.* - earlier statement of the instrument-bias principle.
- Iyengar, S. & Lepper, M. (2000). "When Choice is Demotivating." *JPSP.* - choice overload; cite with its contested replication record (Scheibehenne et al. 2010 meta-analysis), not as settled.
- Bezos, J. (2015/2016 Amazon shareholder letters). - one-way vs two-way door decisions; practitioner-tier basis for Engine 2.
- Snowden, D. & Boone, M. (2007). "A Leader's Framework for Decision Making." *HBR* (Cynefin). - contingency view of decision methods; tier C, cited as orienting only.
- Klein, G. (1998). *Sources of Power.* - naturalistic decision making; that the right approach is contingent on the situation.
- Kahneman, D. (2011). *Thinking, Fast and Slow.* - tool-to-task and the limits of intuition vs structured method; general grounding.
