# Framework Catalog (master, prioritized)

A single, simplified, complete, and prioritized list of every thinking framework in scope, synthesized from the discovery meta-analyses (`_local/initial-discovery/meta-analysis_claude-opus_*`) and the README candidate universe, then **expanded** with methods the meta-analyses did not cover.

- **Taxonomy:** the 11 cognitive-operation families (Claude Opus's landscape, the recommended foundation).
- **Evidence tiers (7-tier model):** **S** strong research · **M** moderate · **P** practitioner · **V** vendor/commercial · **A** anecdotal · **C** conceptually plausible, under-tested · **X** poor/contradictory.
- **Status legend:**
  - `[shipped]` - built and validated (34 skills, Tier advanced 0/0).
  - `[next]` - strongest unbuilt candidates (build these first; S/M evidence or cross-LLM consensus, and distinct).
  - `[recipe]` - ships as a workflow chaining existing skills, not a standalone skill (no separable mechanism).
  - `[cand]` - candidate (clears the bar but lower priority / P-tier coverage).
  - `[fold]` - subsumed: ship as a mode/sub-skill of an existing skill, not standalone.
  - `[flag]` - include only with explicit "when not to use" / trademark / false-precision caveats.
  - `[pm]` - defer to `pm-skills` (PM/domain-specific, not cross-domain cognitive).
  - `[excl]` - exclude or workshop-reference only (weak evidence, social-only, or redundant).

The honest core (from the meta-analyses): the field is a small **empirical core** surrounded by a large **practitioner ring** and a weak **outer ring**. The catalog labels which is which rather than flattening them.

---

## Priority summary (what to build next, in order)

The skill build-out is at 34 skills + 6 recipes. **2026-06-03 truth-up** (multi-agent vetting + v0.2.0 reconciliation) resolved the old `[next]` list:

1. **Shipped since (v0.2.0):** `concept-mapping`, `causal-loop-diagrams`, `fermi-estimation` are built; `first-principles` shipped as a **recipe**. The two S-tier empirical-core stragglers (stocks-and-flows, linear-model-aggregation) are shipped - the empirical core is complete (11/11).
2. **Vetted-closed:** `key-assumptions-check` and `double-crux` were **rejected** (both reduce to `what-would-have-to-be-true`); `idea-quality-audit` is a **`[recipe]`** (decision-option-review + red-team-light over a shortlist); `leverage-points` re-vetted `[cand]` -> **`[fold]`** (owned by `iceberg-model`, which already cites its Meadows source).
3. **Shipped:** `belief-update-routine` cleared the bar (**Build**, P) and shipped as `think-belief-update-routine` - it completes the meta-thinking-and-reflection family's over-time-belief corner.
4. **P-tier coverage `[cand]`:** the remaining `[cand]` rows below, as demand warrants.
5. **Never (this repo):** the `[fold]`, `[flag]`, `[pm]`, and `[excl]` rows - documented so each exclusion is deliberate.

> This catalog is now a generated view of `frameworks/registry.mjs` (SP3): the family tables below are emitted by `scripts/gen-registry.mjs` and byte-compared in CI. Edit the registry, not the tables. The narrative above and the expansion note + exclusions + sources below stay hand-authored. Tier shows the single governing grade; the registry records the full reasoning.

The empirical core (the evidence anchor): premortem, brainwriting/NGT, reference-class-forecasting, argument-mapping, WOOP/MCII, authentic-dissent, after-action-review, natural-frequency-bayesian, far-analogy-ideation, stocks-and-flows-reasoning, and mechanical/linear-model aggregation. **All 11 are now shipped - the empirical core is complete.**

---

<!-- BEGIN GENERATED FRAMEWORK TABLES (scripts/gen-registry.mjs) - do not hand-edit below this line -->

## 1. Perspective-shifting and multi-lens

| Framework | Mechanism | Tier | Status |
|---|---|---|---|
| Parallel Perspectives Review | examine a decision through separated lenses (facts/upside/risk/intuition/alternatives/process) | P | `[shipped]` |
| Red Team / Blue Team | construct the strongest adversarial case against a thesis | P | `[shipped]` |
| Stakeholder Lens Review | walk a proposal through each affected party's eyes | P | `[fold]` -> Parallel Perspectives Review |
| Steelmanning | state the strongest version of an opposing view before responding | P | `[fold]` -> Red Team / Blue Team |
| Six Thinking Hats | branded parallel-thinking ritual | X | `[flag]` (branded) |
| Role-storming | generate ideas while adopting another identity | P | `[cand]` |
| Outside-in / Inside-out framing | alternate market view and capability view | P | `[cand]` |
| Disney Creative Strategy | dreamer/realist/critic cycle | A | `[excl]` (branded) |

## 2. Divergent ideation and idea expansion

| Framework | Mechanism | Tier | Status |
|---|---|---|---|
| Brainwriting 6-3-5 / NGT | silent parallel written generation + build-on | S | `[shipped]` |
| Far-analogy ideation | transfer deep structure from distant domains | S | `[shipped]` |
| SCAMPER | seven transformation prompts on a seed idea | P | `[shipped]` |
| Question Burst | rapid questions-only burst, then rank + pick | P | `[shipped]` |
| Assumption Reversal | negate foundational premises to generate options | P | `[shipped]` |
| Morphological analysis | enumerate the solution space by parameter combination | P | `[cand]` |
| Worst possible idea / reverse brainstorming | generate bad ideas, then invert | P | `[cand]` |
| Crazy 8s | eight sketches in eight minutes | P | `[fold]` -> Brainwriting 6-3-5 / NGT |
| Lotus Blossom | expand a center into 8 sub-themes, recurse | P | `[cand]` |
| Forced connections / Random stimulus | pair the problem with an unrelated stimulus | P | `[fold]` -> Far-analogy ideation |
| Alternate uses / Constraint insertion-removal | loosen functional fixedness; add/strip a constraint | P | `[cand]` |

## 3. Problem framing and reframing

| Framework | Mechanism | Tier | Status |
|---|---|---|---|
| Problem Restatement | rewrite the problem several ways, pick a better frame | M | `[shipped]` |
| Abstraction Laddering | move up (why) and down (how) to the right altitude | P | `[shipped]` |
| First Principles Thinking | decompose to fundamental truths, reason up | P | `[recipe]` (ships as a workflow) |
| How Might We | turn an insight into an opportunity question | P | `[fold]` -> Problem Restatement |
| Is / Is Not analysis | sharpen scope by what the problem is and is not | P | `[fold]` -> Problem Restatement |
| Frame storming | brainstorm the framing, not the solution | P | `[fold]` -> Problem Restatement |
| Five Whys | iterative why to trace a cause | X | `[flag]` |

## 4. Assumption and belief challenge

| Framework | Mechanism | Tier | Status |
|---|---|---|---|
| Argument Mapping | diagram claim, reasons, co-premises, objections | S | `[shipped]` |
| Authentic Dissent | engineer for genuine minority dissent (not role-played) | S | `[shipped]` |
| Natural-frequency Bayesian framing | re-express conditional probabilities as frequencies | S | `[shipped]` |
| Evidence vs Inference Sort | label claims evidence / inference / assumption | P | `[shipped]` |
| Ladder of Inference Check | reconstruct the climb from data to conclusion | P | `[shipped]` |
| What Would Have to Be True | turn a claim into testable conditions | P | `[shipped]` |
| Key Assumptions Check / Assumption Mapping | inventory and rank a plan's assumptions | P | `[excl]` |
| Cognitive bias checklist | run a decision against relevant biases | P | `[cand]` |
| Inversion | ask how to guarantee failure, then avoid it | P | `[cand]` |
| Counterfactual reasoning | examine 'what if X had been different' | P | `[cand]` |
| Devil's Advocacy | assign someone to argue against | X | `[flag]` |
| Double-crux | find the single belief whose change would flip each side of a disagreement | C | `[excl]` |

## 5. Risk, failure, and resilience

| Framework | Mechanism | Tier | Status |
|---|---|---|---|
| Premortem | imagine the plan failed, work back to causes | S | `[shipped]` |
| Reference Class Forecasting | anchor an estimate on the base rate of comparable cases | S | `[shipped]` |
| WOOP / MCII | wish-outcome-obstacle-plan with an if-then | S | `[shipped]` |
| Backcasting | from a desired future, work back to the path | P | `[shipped]` |
| FMEA-lite | list failure modes by likelihood x severity x detection | P | `[cand]` |
| Kill criteria / Tripwires | pre-decided stop signals and conditions | P | `[fold]` -> Premortem |
| Regret minimization | choose the least-future-regret option | P | `[cand]` |
| Pre-commitment / Ulysses contract | bind future behavior in advance against known weakness | P | `[cand]` |

## 6. Systems and consequences

| Framework | Mechanism | Tier | Status |
|---|---|---|---|
| Futures Wheel | map first/second/third-order consequences outward | P | `[shipped]` |
| Iceberg Model | events -> patterns -> structures -> mental models | P | `[shipped]` |
| Stocks and Flows reasoning | reason about accumulations and rates | S | `[shipped]` |
| Causal Loop Diagrams | diagram reinforcing/balancing feedback loops | M | `[shipped]` |
| Second-Order Effects | lightweight 'and then what?' prompt | P | `[fold]` -> Futures Wheel |
| Systems map / Leverage points | sketch elements/relationships; find intervention points | C | `[fold]` -> Iceberg Model |
| Three Horizons | present / transition / emerging future | C | `[cand]` |
| Causal Layered Analysis | litany / system / worldview / myth layers | C | `[cand]` |
| Theory of Constraints | find and exploit the system bottleneck | P | `[cand]` |
| Fishbone / Ishikawa | structured multi-cause diagram | P | `[cand]` |

## 7. Decision and option evaluation

| Framework | Mechanism | Tier | Status |
|---|---|---|---|
| Decision Option Review | compare options against weighted criteria | P | `[shipped]` |
| One-way vs Two-way Door | classify by reversibility, match deliberation | P | `[shipped]` |
| Decision Journal | record decision + expectation + confidence for calibration | P | `[shipped]` |
| Multi-Criteria Decision Analysis | weighted scoring across criteria | P | `[fold]` -> Decision Option Review |
| Decision Brief / PR-FAQ | force a decision into a short structured memo | P | `[cand]` |
| Pairwise comparison | compare two at a time to rank fuzzy criteria | P | `[cand]` |
| Expected-value / decision-tree | weigh outcomes by probability x magnitude | M | `[cand]` |
| Minimax regret | minimize worst-case regret | P | `[cand]` |
| Fermi estimation | structured order-of-magnitude estimate from decomposition | M | `[shipped]` |
| Eisenhower / MoSCoW / Pareto | urgent-important triage; vital-few focus | P | `[cand]` |
| Kepner-Tregoe | structured situation / problem / decision / potential-problem analysis | P | `[cand]` (branded) |
| Cynefin | sort clear / complicated / complex / chaotic | C | `[flag]` (branded) |
| ICE / RICE / WSJF | prioritization scores | V | `[flag]` (branded) |
| OODA Loop | observe-orient-decide-act | P | `[excl]` |
| Mechanical / linear-model aggregation | combine cues with a simple fixed formula instead of holistic judgment | S | `[shipped]` |

## 8. Strategy and opportunity

| Framework | Mechanism | Tier | Status |
|---|---|---|---|
| Opportunity-Solution Tree | outcome -> opportunities -> solutions | P | `[pm]` |
| Value proposition contrast | sharpen vs the next-best alternative | P | `[pm]` |
| White-space / adjacent-possible / 10x-vs-incremental | locate uncontested or reachable opportunity | P | `[cand]` |
| Moat / defensibility lens | test what stops a competitor copying you | P | `[cand]` |
| Scenario planning | construct multiple plausible futures (2x2) | M | `[cand]` |
| PEST(LE) | scan macro-environmental forces | P | `[cand]` |
| Jobs To Be Done | frame demand as progress sought | P | `[flag]` |
| Wardley Mapping | value chain vs evolution | C | `[flag]` (branded) |
| Blue Ocean tools | strategy canvas / four actions | V | `[flag]` (branded) |
| Porter's Five Forces | competitive-structure scan | V | `[flag]` (branded) |
| SWOT | strengths / weaknesses / opportunities / threats | X | `[excl]` |

## 9. Synthesis and reasoning clarity

| Framework | Mechanism | Tier | Status |
|---|---|---|---|
| Issue Trees | decompose a question into a MECE tree | P | `[shipped]` |
| Affinity Mapping | cluster many notes into emergent themes (bottom-up) | P | `[shipped]` |
| Pyramid Principle | answer-first governing thought + grouped support | P | `[shipped]` |
| MECE decomposition | mutually-exclusive, collectively-exhaustive split | P | `[fold]` -> Issue Trees |
| Concept Mapping | diagram concepts and labeled relationships | M | `[shipped]` |
| Dialectical synthesis | hold thesis/antithesis to a stronger synthesis | C | `[cand]` |
| Contradiction / tension mapping | surface central tensions rather than smoothing | C | `[cand]` |
| Insight statement generation | turn observations into sharp transferable insights | P | `[cand]` |
| Sensemaking matrix | organize conflicting signals for interpretation | C | `[cand]` |

## 10. Facilitation and group structures

| Framework | Mechanism | Tier | Status |
|---|---|---|---|
| Silent writing before discussion | write independently first to prevent anchoring | M | `[fold]` -> Brainwriting 6-3-5 / NGT |
| Note-and-vote / Decider supervote | individual notes, then vote / weighted decider | P | `[cand]` |
| Dot voting | allocate limited votes | P | `[flag]` |
| 1-2-4-All / Round-robin / Lean Coffee / World Cafe / Open Space | scaled-participation group formats | P | `[excl]` |

## 11. Meta-thinking and reflection

| Framework | Mechanism | Tier | Status |
|---|---|---|---|
| After Action Review | expected vs actual -> why -> sustain/change | S | `[shipped]` |
| Belief-update routine | periodically revisit and update key beliefs vs new evidence | P | `[shipped]` |
| Idea-quality audit | score and pressure-test a batch of ideas (solo + AI) | P | `[recipe]` (ships as a workflow) |
| What / So What / Now What | observation -> meaning -> action | P | `[cand]` |
| PDCA / A3 | plan-do-check-act improvement loop | P | `[cand]` |
| Socratic self-questioning | disciplined self-interrogation of a belief | P | `[cand]` |
| Plus/Delta, Start/Stop/Continue, Rose/Thorn/Bud | fast retro formats | P | `[fold]` -> After Action Review |

<!-- END GENERATED FRAMEWORK TABLES -->

---

## Expansion: frameworks the meta-analyses did not cover

The discovery meta-analyses missed some methods; they were added to the registry and now appear in their family tables above with current status. Only two were genuinely net-new to the catalog: **Double-crux** (excluded - it reduces to What Would Have to Be True's killer conditions) and **Mechanical / linear-model aggregation** (shipped as `think-linear-model-aggregation`). The rest - Fermi estimation, Theory of Constraints, Fishbone/Ishikawa, Scenario planning, Pre-commitment/Ulysses contract, Expected-value/decision trees, Eisenhower/Pareto/MoSCoW, PEST(LE), Kepner-Tregoe, and PDCA/A3 - are listed under their families above.

> Note: **mechanical/linear-model aggregation** and **stocks-and-flows reasoning** were the last two unbuilt members of the named empirical core; both are now shipped (`think-linear-model-aggregation`, `think-stocks-and-flows-reasoning`). **The empirical core is complete (11/11).**

---

## Deliberate exclusions (with reasons)

Documented so the absence is a decision, not an oversight:

- **SWOT** - weak/contradictory evidence (Hill & Westbrook 1997); legacy reference only.
- **MBTI-style perspective frames** - psychometric validity critiques (Pittenger).
- **Unstructured verbal brainstorming** - ~40 years of replication failure vs nominal/brainwriting groups.
- **Buzan-brand mind mapping** - brain-hemisphere claims unsupported (Farrand 2002).
- **Generic 2x2 strategy matrices** - low distinctiveness, false rigor.
- **Most Liberating Structures rituals** (1-2-4-All, Open Space, Lean Coffee, World Cafe) - value is social; AI cannot reproduce it; workshop-reference track only.
- **OODA Loop as a user skill** - more useful as the agent's own loop architecture.
- **Opportunity-Solution Tree, JTBD, Value-Prop tools, Porter** - PM/business-domain; belong in `pm-skills` per the sibling split.

---

*Sources: `_local/initial-discovery/meta-analysis_claude-opus_{1-validation,2-landscape,3-architecture,4-portfolio,5-naming}.md` (the landscape file is the ~110-method master catalog + 7-tier model + named empirical core), the README candidate universe, and the shipped `skills/` tree. The raw corpus is kept private (see this folder's README); this catalog is the synthesized, committable view.*
