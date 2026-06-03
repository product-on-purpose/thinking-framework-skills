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

The skill build-out is at 34 skills + 5 recipes. **2026-06-03 truth-up** (multi-agent vetting + v0.2.0 reconciliation) resolved the old `[next]` list:

1. **Shipped since (v0.2.0):** `concept-mapping`, `causal-loop-diagrams`, `fermi-estimation` are built; `first-principles` shipped as a **recipe**. The two S-tier empirical-core stragglers (stocks-and-flows, linear-model-aggregation) are shipped - the empirical core is complete (11/11).
2. **Vetted-closed:** `key-assumptions-check` and `double-crux` were **rejected** (both reduce to `what-would-have-to-be-true`); `idea-quality-audit` is a **`[recipe]`** (decision-option-review + red-team-light over a shortlist); `leverage-points` re-vetted `[cand]` -> **`[fold]`** (owned by `iceberg-model`, which already cites its Meadows source).
3. **Building now:** `belief-update-routine` cleared the bar (**Build**, P) - the one new skill from the round; it completes the meta-thinking-and-reflection family's over-time-belief corner.
4. **P-tier coverage `[cand]`:** the remaining `[cand]` rows below, as demand warrants.
5. **Never (this repo):** the `[fold]`, `[flag]`, `[pm]`, and `[excl]` rows - documented so each exclusion is deliberate.

> This catalog becomes a generated view of `frameworks/registry.yaml` (SP3); the above is the interim hand truth-up. Row tags below updated to match.

The empirical core (the evidence anchor): premortem, brainwriting/NGT, reference-class-forecasting, argument-mapping, WOOP/MCII, authentic-dissent, after-action-review, natural-frequency-bayesian, far-analogy-ideation, stocks-and-flows-reasoning, and mechanical/linear-model aggregation. **All 11 are now shipped - the empirical core is complete.**

---

## 1. Perspective-shifting and multi-lens

| Framework | Mechanism (one line) | Tier | Status |
|---|---|---|---|
| Parallel Perspectives Review | examine a decision through separated lenses (facts/upside/risk/intuition/alternatives/process) | P | `[shipped]` |
| Red Team / Blue Team | construct the strongest adversarial case against a thesis | P | `[shipped]` (as `red-team-light`) |
| Stakeholder Lens Review | walk a proposal through each affected party's eyes | P | `[fold]` -> stakeholder mode of parallel-perspectives |
| Steelmanning | state the strongest version of an opposing view before responding | P | `[fold]` -> core move of red-team-light |
| Six Thinking Hats | branded parallel-thinking ritual | P/X | `[flag]` mechanism shipped as parallel-perspectives; trademark, weak branded evidence |
| Role-storming | generate ideas while adopting another identity | P | `[cand]` |
| Outside-in / Inside-out framing | alternate market view and capability view | P | `[cand]` |
| Disney Creative Strategy | dreamer/realist/critic cycle | A | `[excl]` redundant with parallel-perspectives |

## 2. Divergent ideation and idea expansion

| Framework | Mechanism | Tier | Status |
|---|---|---|---|
| Brainwriting 6-3-5 / NGT | silent parallel written generation + build-on | **S** | `[shipped]` |
| Far-analogy ideation | transfer deep structure from distant domains | **S** | `[shipped]` |
| SCAMPER | seven transformation prompts on a seed idea | P | `[shipped]` |
| Question Burst | rapid questions-only burst, then rank + pick | P | `[shipped]` |
| Assumption Reversal | negate foundational premises to generate options | P | `[shipped]` |
| Morphological analysis | enumerate the solution space by parameter combination | P | `[cand]` |
| Worst possible idea / reverse brainstorming | generate bad ideas, then invert | P | `[cand]` (relates to inversion) |
| Crazy 8s | eight sketches in eight minutes | P | `[fold]` -> a timeboxed mode of brainwriting/scamper |
| Lotus Blossom | expand a center into 8 sub-themes, recurse | P | `[cand]` (spatial; markdown-limited) |
| Forced connections / Random stimulus | pair the problem with an unrelated stimulus | P | `[fold]` -> a mode of far-analogy ideation |
| Alternate uses / Constraint insertion-removal | loosen functional fixedness; add/strip a constraint | P | `[cand]` |

## 3. Problem framing and reframing

| Framework | Mechanism | Tier | Status |
|---|---|---|---|
| Problem Restatement | rewrite the problem several ways, pick a better frame | M/P | `[shipped]` |
| Abstraction Laddering | move up (why) and down (how) to the right altitude | P | `[shipped]` |
| First Principles Thinking | decompose to fundamental truths, reason up | P/C | `[shipped]` as the `first-principles` recipe (v0.2.0; abstraction-laddering + assumption-reversal) |
| How Might We | turn an insight into an opportunity question | P | `[fold]` -> output of problem-restatement |
| Is / Is Not analysis | sharpen scope by what the problem is and is not | P | `[fold]` -> a problem-restatement move |
| Frame storming | brainstorm the framing, not the solution | P | `[fold]` -> problem-restatement |
| Five Whys | iterative why to trace a cause | P/X | `[flag]` simple linear failures only (Card 2017) |

## 4. Assumption and belief challenge

| Framework | Mechanism | Tier | Status |
|---|---|---|---|
| Argument Mapping | diagram claim, reasons, co-premises, objections | **S** | `[shipped]` |
| Authentic Dissent | engineer for genuine minority dissent (not role-played) | **S** | `[shipped]` |
| Natural-frequency Bayesian framing | re-express conditional probabilities as frequencies | **S** | `[shipped]` |
| Evidence vs Inference Sort | label claims evidence / inference / assumption | P | `[shipped]` |
| Ladder of Inference Check | reconstruct the climb from data to conclusion | P | `[shipped]` |
| What Would Have to Be True | turn a claim into testable conditions | P | `[shipped]` (also family 5/7) |
| Key Assumptions Check / Assumption Mapping | inventory and rank a plan's assumptions | P | `[excl]` rejected 2026-06-03: same assumption-ledger as what-would-have-to-be-true |
| Cognitive bias checklist | run a decision against relevant biases | P | `[cand]` |
| Inversion | ask how to guarantee failure, then avoid it | P | `[cand]` (overlaps assumption-reversal + premortem) |
| Counterfactual reasoning | examine "what if X had been different" | P | `[cand]` |
| Devil's Advocacy | assign someone to argue against | P/X | `[flag]` role-played dissent underperforms (Nemeth); shipped intent via authentic-dissent |

## 5. Risk, failure, and resilience

| Framework | Mechanism | Tier | Status |
|---|---|---|---|
| Premortem | imagine the plan failed, work back to causes | S/M | `[shipped]` |
| Reference Class Forecasting | anchor an estimate on the base rate of comparable cases | **S** | `[shipped]` |
| WOOP / MCII | wish-outcome-obstacle-plan with an if-then | **S** | `[shipped]` |
| Backcasting | from a desired future, work back to the path | P | `[shipped]` |
| FMEA-lite | list failure modes by likelihood x severity x detection | P | `[cand]` (overlaps premortem) |
| Kill criteria / Tripwires | pre-decided stop signals and conditions | P | `[fold]` -> inside premortem's register |
| Regret minimization | choose the least-future-regret option | P | `[cand]` |
| Pre-commitment / Ulysses contract | bind future behavior in advance | P | `[cand]` (expansion; relates to WOOP/tripwires) |

## 6. Systems and consequences

| Framework | Mechanism | Tier | Status |
|---|---|---|---|
| Futures Wheel | map first/second/third-order consequences outward | P | `[shipped]` |
| Iceberg Model | events -> patterns -> structures -> mental models | P | `[shipped]` |
| Stocks and Flows reasoning | reason about accumulations and rates | **S** | `[shipped]` (Sterman) |
| Causal Loop Diagrams | diagram reinforcing/balancing feedback loops | M/C | `[shipped]` (v0.2.0) |
| Second-Order Effects | lightweight "and then what?" prompt | P | `[fold]` -> mode of futures-wheel |
| Systems map / Leverage points | sketch elements/relationships; find intervention points | P/C | `[fold]` -> iceberg-model (Meadows leverage-ladder mode; re-vetted 2026-06-03) |
| Three Horizons | present / transition / emerging future | C | `[cand]` (foresight) |
| Causal Layered Analysis | litany / system / worldview / myth layers | C | `[cand]` (foresight) |
| Theory of Constraints | find and exploit the system bottleneck | P | `[cand]` (expansion) |
| Fishbone / Ishikawa | structured multi-cause diagram | P | `[cand]` (expansion; the meta-analysis's recommended why-chain upgrade) |

## 7. Decision and option evaluation

| Framework | Mechanism | Tier | Status |
|---|---|---|---|
| Decision Option Review | compare options against weighted criteria | P | `[shipped]` |
| One-way vs Two-way Door | classify by reversibility, match deliberation | P | `[shipped]` |
| Decision Journal | record decision + expectation + confidence for calibration | P | `[shipped]` (also family 11) |
| Multi-Criteria Decision Analysis | weighted scoring across criteria | P | `[fold]` == decision-option-review |
| Decision Brief / PR-FAQ | force a decision into a short structured memo | P | `[cand]` (overlaps pyramid-principle) |
| Pairwise comparison | compare two at a time to rank fuzzy criteria | P | `[cand]` |
| Expected-value / decision-tree | weigh outcomes by probability x magnitude | M | `[cand]` (expansion: formal EV/decision trees) |
| Minimax regret | minimize worst-case regret | P | `[cand]` |
| Fermi estimation | structured order-of-magnitude estimate from decomposition | P/M | `[shipped]` (v0.2.0) |
| Eisenhower / MoSCoW / Pareto | urgent-important triage; vital-few focus | P | `[cand]` (expansion; prioritization) |
| Kepner-Tregoe | structured problem + decision analysis | P | `[cand]` (expansion) |
| Cynefin | sort clear/complicated/complex/chaotic | C | `[flag]` cargo-cult risk; trademark |
| ICE / RICE / WSJF | prioritization scores | V/P | `[flag]` false-precision warning |
| OODA Loop | observe-orient-decide-act | P | `[excl]` better as agent loop architecture than a skill |

## 8. Strategy and opportunity

> This family is the weakest fit for a cross-domain cognitive library; most entries are PM/business-domain and defer to `pm-skills`.

| Framework | Mechanism | Tier | Status |
|---|---|---|---|
| Opportunity-Solution Tree | outcome -> opportunities -> solutions | P | `[pm]` (Teresa Torres; product discovery) |
| Value proposition contrast | sharpen vs the next-best alternative | P | `[pm]` |
| White-space / adjacent-possible / 10x-vs-incremental | locate uncontested or reachable opportunity | P/C | `[cand]` |
| Moat / defensibility lens | test what stops a competitor copying you | P | `[cand]` |
| Scenario planning | construct multiple plausible futures (2x2) | C/M | `[cand]` (expansion; foresight; evidence thin) |
| PEST(LE) | scan macro-environmental forces | P | `[cand]` (expansion) |
| Jobs To Be Done | frame demand as progress sought | P | `[flag]` multi-school ambiguity; `[pm]` |
| Wardley Mapping | value chain vs evolution | C | `[flag]` CC BY-SA; cargo-cult |
| Blue Ocean tools | strategy canvas / four actions | V | `[flag]` registered marks |
| Porter's Five Forces | competitive-structure scan | V/P | `[flag]` (expansion) `[pm]` |
| SWOT | strengths/weaknesses/opportunities/threats | X | `[excl]` legacy reference only (Hill & Westbrook critique) |

## 9. Synthesis and reasoning clarity

| Framework | Mechanism | Tier | Status |
|---|---|---|---|
| Issue Trees | decompose a question into a MECE tree | P | `[shipped]` |
| Affinity Mapping | cluster many notes into emergent themes (bottom-up) | P | `[shipped]` |
| Pyramid Principle | answer-first governing thought + grouped support | P | `[shipped]` |
| MECE decomposition | mutually-exclusive, collectively-exhaustive split | P | `[fold]` -> principle inside issue-tree |
| Concept Mapping | diagram concepts and labeled relationships | M/P | `[shipped]` (v0.2.0) |
| Dialectical synthesis | hold thesis/antithesis to a stronger synthesis | C | `[cand]` |
| Contradiction / tension mapping | surface central tensions rather than smoothing | C | `[cand]` |
| Insight statement generation | turn observations into sharp transferable insights | P | `[cand]` |
| Sensemaking matrix | organize conflicting signals for interpretation | C | `[cand]` |

## 10. Facilitation and group structures

> Mostly NOT first-class agent skills: their value is in human social dynamics an AI cannot reproduce. A future "workshop-support" track could let the agent help with prep, capture, and synthesis.

| Framework | Mechanism | Tier | Status |
|---|---|---|---|
| Silent writing before discussion | write independently first to prevent anchoring | M | `[fold]` -> the mechanism is in brainwriting |
| Note-and-vote / Decider supervote | individual notes, then vote / weighted decider | P | `[cand]` (agent can support capture) |
| Dot voting | allocate limited votes | P | `[flag]` herding caveats |
| 1-2-4-All / Round-robin / Lean Coffee / World Cafe / Open Space | scaled-participation group formats | P | `[excl]` workshop-reference (social dynamics) |

## 11. Meta-thinking and reflection

| Framework | Mechanism | Tier | Status |
|---|---|---|---|
| After Action Review | expected vs actual -> why -> sustain/change | S/M | `[shipped]` |
| Decision Journal | record now for honest later calibration | P | `[shipped]` |
| Belief-update routine | periodically revisit and update key beliefs vs new evidence | P | `[next]` Build approved (2026-06-03 vetting); authoring as `think-belief-update-routine` |
| Idea-quality audit | score and pressure-test a batch of ideas (solo + AI) | P | `[recipe]` decision-option-review + red-team-light over a shortlist (vetted 2026-06-03; no separable mechanism) |
| What / So What / Now What | observation -> meaning -> action | P | `[cand]` |
| PDCA / A3 | plan-do-check-act improvement loop | P | `[cand]` (expansion; overlaps AAR) |
| Socratic self-questioning | disciplined self-interrogation of a belief | P | `[cand]` (expansion) |
| Plus/Delta · Start/Stop/Continue · Rose/Thorn/Bud | fast retro formats | A/P | `[fold]` -> retro modes (one skill or AAR variants) |

---

## Expansion: frameworks the meta-analyses did not cover

Added here as genuinely additive (not folds of existing skills). Provisional tiers; each still has to clear the four commitments + the ~20% overlap ceiling before it ships.

| Framework | Family | Mechanism | Tier | Note |
|---|---|---|---|---|
| Fermi estimation | decision | decompose an unknown into estimable factors for an order-of-magnitude answer | P/M | `[shipped]` as `think-fermi-estimation` (v0.2.0) |
| Double-crux | assumption-challenge | find the single belief whose change would flip each side of a disagreement | C/P | `[excl]` rejected 2026-06-03: solo-reduces to what-would-have-to-be-true's killer conditions |
| Theory of Constraints | systems | find the binding bottleneck and exploit/elevate it | P | distinct systems-intervention lens |
| Fishbone / Ishikawa | systems | structured multi-cause diagram (the meta-analysis's recommended Five-Whys upgrade) | P | fills the multi-cause gap Five-Whys leaves |
| Scenario planning | strategy/foresight | construct 2-4 plausible distinct futures and stress strategy across them | C/M | distinct from futures-wheel (consequences) and backcasting (path); evidence thin |
| Pre-commitment / Ulysses contract | risk | bind future behavior in advance against known weakness | P | complements WOOP and premortem tripwires |
| Expected-value / decision trees | decision | formal probability x magnitude over branches | M | the quantitative complement to decision-option-review |
| Eisenhower / Pareto / MoSCoW | decision | urgent-important and vital-few prioritization triage | P | simple, high-frequency; could be one "prioritization" skill |
| PEST(LE) | strategy | scan macro forces (political/economic/social/technological/legal/environmental) | P | macro complement; partly `[pm]` |
| Kepner-Tregoe | decision | structured situation/problem/decision/potential-problem analysis | P | comprehensive but heavy |
| PDCA / A3 | reflection | structured improvement loop / one-page problem-solving | P | overlaps AAR; consider as AAR variants |
| Mechanical / linear-model aggregation | decision | combine cues with a simple fixed formula instead of holistic judgment | **S** | `[shipped]` as `think-linear-model-aggregation` (Meehl/Dawes) |

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
