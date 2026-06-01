# thinking-framework-skills

**A curated, evidence-graded library of thinking tools for AI agents and the humans who work with them.**

> Most "thinking framework" collections are catalogs of named rituals. This one is built the other way around: every method is reduced to its working mechanism, graded by how strong its evidence actually is, and shipped as an agent-executable skill that produces a concrete artifact. Library and plugin name: `thinking-framework-skills`; skills install with a `tfs-` prefix (for example `tfs-premortem`).

> Status: early and aspirational. This README documents the vision, the candidate library, and the proposed conventions. Almost nothing here is locked yet, and the catalog below is a candidate universe ("will, or could, be included"), not a shipped product.

---

## Why this exists

AI agents are extremely good at producing fluent output and surprisingly weak at the moves that make thinking actually good: reframing a problem before solving the wrong one, separating evidence from inference, imagining how a plan fails before it does, and stress-testing a decision from more than one angle. Humans are not much better under time pressure. Both tend to converge too early.

`thinking-framework-skills` is an attempt to package the best of the structured-thinking tradition (creativity research, decision science, systems thinking, design, foresight, critical thinking, facilitation) as small, composable, agent-ready skills. Each one helps a person or an agent generate better options, reframe a problem, challenge an assumption, map a consequence, or stress-test a decision, and then hand back a usable artifact rather than a wall of prose.

<details>
<summary><strong>The fuller thesis (expand)</strong></summary>

The field of "thinking methods" has three uneven layers:

1. A small **empirical core** of methods with replicated study evidence.
2. A large **practitioner ring** of long-standing heuristics with real-world traction but limited formal validation.
3. A noisy **outer ring** where popularity, branding, and weak evidence are routinely conflated.

Most libraries flatten all three into one shiny catalog. The bet here is the opposite: be explicit about which layer each method lives in, separate the durable **mechanism** from the brandable **ritual**, and design first for the **solo-operator-plus-AI** mode that existing facilitator-first toolkits (Liberating Structures, IDEO Design Kit, Gamestorming, d.school Bootleg) do not serve well.

That honesty is the product. A method graded "weak evidence, useful anyway, here is when not to use it" is more trustworthy than one dressed up as science.

</details>

---

## What it is, and what it is not

| It is | It is not |
|---|---|
| A mechanism-first library (the durable cognitive move, not the trademarked packaging) | A museum of named frameworks |
| Evidence-graded and honest about uncertainty | A confident claim that every method is "proven" |
| Agent-executable: clear inputs, bounded steps, a concrete output artifact | A set of vibes-y prompts |
| Composable into multi-step workflows | A pile of unrelated one-offs |
| Designed for solo-plus-AI first, teams second | A facilitator-only workshop kit |

**Relationship to `pm-skills`:** sibling library, no technical coupling. A useful one-line split: `thinking-framework-skills` helps decide *what* to work on and *why* it is sound; `pm-skills` helps execute *how*. They are designed to compose, not to depend on each other.

<details>
<summary><strong>Honesty commitments we intend to keep (expand)</strong></summary>

- **Grade evidence transparently.** Every skill carries an evidence tier (see the taxonomy section). Strong-evidence methods are labeled as such; practitioner heuristics are labeled as such.
- **Do not launder statistics.** Example we will not repeat: the often-cited "premortems surface ~30% more reasons" measures the *number of reasons identified*, not a 30% improvement in decision quality. Claims will be scoped to what the studies actually measured.
- **Name the cargo-cult risk.** Rote execution of a framework is not thinking. Skills will say so and guide against ritualistic use.
- **Respect trademarks and licenses.** Some named methods are registered marks or carry specific licenses (for example Six Thinking Hats, Cynefin, Blue Ocean, Wardley Mapping, IDEO Design Kit). The library favors descriptive, generic skill names with lineage and attribution noted in documentation.
- **Flag transferred evidence.** Direct studies of AI-augmented use of these methods barely exist yet. Where we lean on human-subject evidence to justify an agent skill, we will say that the evidence is transferred, not direct.

</details>

---

## The library: frameworks, models, and tools

This is the candidate universe drawn from the discovery research. The primary organization below is by **cognitive operation** (what the method actually does to your thinking). Each family has a short description; expand it for the individual methods, each with a one-line summary.

**Reading the tags:**
- `[MVP]` = on the current first-release shortlist.
- `[core]` = part of the named empirical core (replicated study evidence).
- `[flag]` = include with explicit "when not to use" guidance (weak evidence, trademark, or cargo-cult risk).
- Evidence tiers referenced: **S** strong research, **M** moderate, **P** practitioner, **V** vendor/commercial, **A** anecdotal, **C** conceptually plausible but under-tested, **X** poor or contradictory.

A note on scope: the discovery catalog ran to roughly 110 methods. The list here is a comprehensive working subset, not the final portfolio. Many "named tools" turn out to be packaging variants of a smaller set of mechanisms, so the shipped library will be smaller and de-duplicated.

### 1. Perspective-shifting and multi-lens
Look at the same thing through deliberately separated viewpoints so that optimism, risk, facts, and feelings do not blur together.

<details>
<summary>Methods (expand)</summary>

- **Parallel Perspectives Review** `[MVP]` - Examine a decision through several separated lenses in turn (facts, upside, risks, feelings, alternatives, process); the generic mechanism behind Six Thinking Hats without the trademark.
- **Six Thinking Hats** `[flag]` - The branded version of parallel-perspectives review; evidence is mixed (P/X) and the name is registered, so prefer the generic mechanism.
- **Disney Creative Strategy** `[flag]` - Cycle through Dreamer, Realist, and Critic roles; largely redundant with parallel-perspectives review, included as a variant only.
- **Role-storming** - Generate ideas while adopting another person's role or identity to escape your default frame.
- **Stakeholder Lens Review** - Walk a proposal through the eyes of each affected stakeholder to surface blind spots and conflicts.
- **Outside-in / Inside-out framing** - Alternate between the market/customer view and the internal/capability view of a problem.
- **Steelmanning** - State the strongest possible version of an opposing position before responding to it.
- **Red Team / Blue Team** - Split into an attacking team and a defending team to pressure-test a plan adversarially.

</details>

### 2. Divergent ideation and idea expansion
Increase the quantity, range, and originality of options before judging any of them.

<details>
<summary>Methods (expand)</summary>

- **SCAMPER** `[MVP]` - Run an idea through seven prompts (Substitute, Combine, Adapt, Modify, Put to other use, Eliminate, Reverse) to force structured variation.
- **Question Burst** `[MVP]` - Generate a rapid burst of questions about a problem, then rank them and pick the most catalytic one to pursue.
- **Brainwriting 6-3-5 / Nominal Group Technique** `[core]` - Silent, parallel, written idea generation that reliably outperforms verbal group brainstorming (S).
- **Far-analogy ideation** `[core]` - Transfer solutions from distant domains; distant analogies produce more original ideas than near ones (S, Gentner and Smith).
- **Crazy 8s** - Sketch eight ideas in eight minutes to push past the obvious first few.
- **Lotus Blossom** - Expand a central theme into eight sub-themes, then expand each again, for systematic breadth.
- **Morphological analysis** - Break a problem into parameters and combine options across them to enumerate the solution space.
- **Forced connections** - Pair the problem with an unrelated object or word to provoke unexpected associations.
- **Random stimulus** - Inject a random word or image as a deliberate jolt out of fixed thinking.
- **Worst possible idea / reverse brainstorming** - Generate deliberately bad ideas, then invert them to reveal good ones and hidden assumptions.
- **Alternate uses** - List many unconventional uses for an object or asset to loosen functional fixedness.
- **Constraint insertion / removal** - Add or strip a constraint (budget, time, channel) to shift the option space.

</details>

### 3. Problem framing and reframing
Make sure you are solving the right problem, stated at the right altitude, before you generate solutions.

<details>
<summary>Methods (expand)</summary>

- **Problem Restatement** `[MVP]` - Rewrite the problem several ways to expose hidden framing choices and pick a more useful one; the "gateway" thinking move.
- **Assumption Reversal** `[MVP]` - Surface the assumptions baked into the problem, negate them, and generate non-obvious reframes (distinct from generic inversion).
- **How Might We** - Convert a problem or insight into an open, opportunity-shaped question that invites solutions.
- **Abstraction Laddering** - Move up ("why") and down ("how") the abstraction ladder to find the right level to attack.
- **Is / Is Not analysis** - Define a problem by what it explicitly is and is not to sharpen its boundaries.
- **Five Whys** `[flag]` - Ask "why" repeatedly to trace a cause; works for simple linear failures, degrades on complex multi-cause problems (cite Card 2017).
- **First Principles Thinking** - Decompose a problem to its fundamental truths and reason up from there; scope tightly so it does not become "think harder."
- **Frame storming** - Brainstorm the framing of the problem itself rather than its solutions.

</details>

### 4. Assumption and belief challenge
Find the load-bearing beliefs under a plan and test whether they survive contact with evidence.

<details>
<summary>Methods (expand)</summary>

- **Evidence vs Inference Sort** `[MVP]` - Separate what is actually known from what is being inferred or assumed, and label each.
- **Ladder of Inference Check** `[MVP]` - Trace how you climbed from raw data to conclusion to catch where selection and interpretation crept in.
- **What Would Have to Be True** `[MVP]` - Turn a strategic claim into the specific conditions that would have to hold for it to work, then test them.
- **Assumption Mapping / Key Assumptions Check** - Inventory the assumptions a plan rests on and rank them by importance and uncertainty.
- **Inversion** - Ask how to guarantee failure, then avoid those moves.
- **Counterfactual reasoning** - Examine "what if X had been different" to expose causal beliefs and contingencies.
- **Authentic Dissent** `[core]` - Cultivate genuine minority disagreement, which improves group reasoning where role-played devil's advocacy does not (S, Nemeth).
- **Devil's Advocacy** `[flag]` - Assign someone to argue against; useful culturally but role-played dissent does not replicate the gains of authentic dissent.
- **Argument Mapping** `[core]` - Diagram the structure of claims, reasons, and objections; improves reasoning with effect sizes around 0.7 to 0.85 (S, mostly course-length studies).
- **Natural-frequency Bayesian framing** `[core]` - Express probabilities as natural frequencies (3 in 1,000) to make conditional-probability reasoning tractable (S).
- **Cognitive bias checklist** - Run a decision against a curated list of relevant biases as an interception step.

</details>

### 5. Risk, failure, and resilience
Imagine and pre-empt failure while you can still do something about it.

<details>
<summary>Methods (expand)</summary>

- **Premortem** `[MVP]` `[core]` - Imagine the plan has already failed and work backward to surface causes that normal risk review misses (S/M).
- **What Would Have to Be True** - (see Assumptions) doubles as a forward-looking risk frame for strategic bets.
- **Reference Class Forecasting** `[core]` - Estimate using the track record of similar past projects rather than inside-view optimism (S, Flyvbjerg).
- **WOOP / MCII** `[core]` - Wish, Outcome, Obstacle, Plan: mental contrasting plus implementation intentions, the strongest-evidenced personal commitment method (S, 25+ RCTs).
- **Backcasting** - Start from a desired future state and work backward to the steps required to reach it.
- **FMEA-lite** - Lightweight failure-modes-and-effects pass: list what can break, how likely, how bad, what to do.
- **Kill criteria** - Define in advance the conditions under which you will stop or abandon the effort.
- **Tripwires** - Pre-commit to specific signals that trigger a pre-decided action, countering slow drift.
- **Regret minimization** - Choose by imagining which option you would least regret from a future vantage point.

</details>

### 6. Systems and consequences
Trace effects beyond the obvious first order, including feedback and delay.

<details>
<summary>Methods (expand)</summary>

- **Futures Wheel** `[MVP]` - Map first-, second-, and third-order consequences of a change radiating outward from the center.
- **Second-Order Effects** - The lightweight prompt version of consequence mapping ("and then what happens?"), proposed as a sub-skill of Futures Wheel.
- **Iceberg Model** - Move from events down to patterns, structures, and mental models that produce them.
- **Causal Loop Diagrams** - Diagram reinforcing and balancing feedback loops in a system (M; transfer to real systems thinking is mixed).
- **Stocks and Flows reasoning** `[core]` - Reason explicitly about accumulations and rates; people systematically misjudge these (S, Sterman).
- **Systems map** - Sketch the elements and relationships of a system to locate intervention points.
- **Leverage points** - Identify where a small, well-placed change produces outsized system effects.
- **Consequence laddering** - Step a single decision forward through successive downstream effects.
- **Three Horizons** - Frame the present, the transition, and the emerging future to balance near and long term.
- **Causal Layered Analysis** - Peel an issue through litany, system, worldview, and myth layers (foresight method).

</details>

### 7. Decision and option evaluation
Compare options and commit, with the right amount of rigor for the stakes.

<details>
<summary>Methods (expand)</summary>

- **Decision Option Review** `[MVP]` - Compare a set of options against weighted criteria with explicit tradeoffs; the portfolio's convergent decision skill.
- **One-way vs Two-way Door** - Classify a decision by reversibility and match deliberation cost to it.
- **Multi-Criteria Decision Analysis** - Score options across several weighted dimensions (with caveats about false precision).
- **Pairwise comparison** - Compare options two at a time to build a robust ranking when criteria are fuzzy.
- **Expected-value intuition** - Weigh outcomes by rough probability and magnitude as a lightweight sanity check.
- **Minimax regret** - Choose the option whose worst-case regret is smallest.
- **Decision Brief / PR-FAQ** - Force a decision into a short structured memo (or a future press release plus FAQ) to expose gaps.
- **Decision Journal** - Record the decision, rationale, and expectations now to enable honest later calibration.
- **Cynefin** `[flag]` - Sort a situation into clear, complicated, complex, or chaotic to pick a response style; powerful but easy to misapply (C, cargo-cult risk).
- **OODA Loop** - Observe, Orient, Decide, Act; arguably more useful as an architectural pattern for the agent loop than as a user-facing skill.
- **ICE / RICE / WSJF** `[flag]` - Prioritization scores; useful for triage but prone to false precision, present with that warning.

</details>

### 8. Strategy and opportunity
Find and frame where the real, defensible opportunity is.

<details>
<summary>Methods (expand)</summary>

- **Opportunity-Solution Tree** - Connect a desired outcome to opportunities and then to candidate solutions, keeping strategy and delivery linked.
- **White-space mapping** - Map where competitors are absent or weak to locate uncontested opportunity.
- **Value proposition contrast** - Sharpen an offering by contrasting it against the next-best alternative from the customer's view.
- **Moat / defensibility lens** - Test what would stop a competitor from copying the advantage.
- **Adjacent possible** - Identify the nearest reachable expansions from current capabilities.
- **10x vs incremental** - Force a choice between order-of-magnitude reframing and incremental improvement.
- **Jobs To Be Done** `[flag]` - Frame demand around the progress a customer is trying to make; specify which school (Christensen, Ulwick, Moesta, others) because they are not interchangeable.
- **Wardley Mapping** `[flag]` - Map a value chain against evolution to reason about strategic movement (CC BY-SA; cargo-cult risk).
- **Blue Ocean tools** `[flag]` - Strategy canvas and four-actions framework to create uncontested space (V, registered marks).
- **SWOT** `[flag]` - Strengths, weaknesses, opportunities, threats; include only as a legacy reference with a health warning (Hill and Westbrook critique).

</details>

### 9. Synthesis and reasoning clarity
Turn a pile of inputs into a clear, defensible structure.

<details>
<summary>Methods (expand)</summary>

- **Affinity mapping** - Cluster many raw notes into emergent themes from the bottom up.
- **MECE decomposition** - Break a topic into mutually exclusive, collectively exhaustive parts.
- **Concept Mapping** - Diagram concepts and their labeled relationships to externalize and clarify understanding (consensus first-class).
- **Pyramid Principle** - Structure communication as a governing claim supported by grouped, ordered arguments.
- **Issue trees** - Decompose a question into a logical tree of sub-questions to make analysis tractable.
- **Insight statement generation** - Convert observations into sharp, transferable insight statements.
- **Contradiction / tension mapping** - Surface the central tensions in a situation rather than smoothing them over.
- **Sensemaking matrix** - Organize conflicting signals into a structure that supports interpretation.
- **Dialectical synthesis** - Hold thesis and antithesis together to reach a more robust synthesis.

</details>

### 10. Facilitation and group structures
Run a group's thinking so that the loudest voice does not win by default.

<details>
<summary>Methods (expand)</summary>

> Many of these depend on social dynamics that an AI cannot reproduce. They are likely to live as references or a workshop track rather than as first-class agent skills, with the agent supporting prep, capture, and synthesis.

- **Silent writing before discussion** - Everyone writes independently first to prevent anchoring on the first speaker.
- **1-2-4-All** - Scale a question from individual to pair to small group to whole room to surface more ideas.
- **Note-and-vote** - Individuals note ideas, then the group votes, balancing generation and convergence.
- **Dot voting** - Allocate limited votes across options for fast prioritization (with known herding caveats).
- **Round-robin** - Take input from each participant in turn to equalize airtime.
- **Lean Coffee** - Run a structured, agenda-less discussion driven by participant-proposed topics and voting.
- **World Cafe / Open Space** - Large-group formats for parallel, self-organized conversation (Liberating Structures lineage).
- **Decider supervote** - A designated decider casts a weighted vote to break deadlock after group input.

</details>

### 11. Meta-thinking and reflection
Learn from what just happened and improve the next loop.

<details>
<summary>Methods (expand)</summary>

- **After Action Review** `[core]` - Structured review of what was expected, what happened, why, and what to change; works when actually structured (S/M).
- **What / So What / Now What** - Three-step reflection from observation to meaning to action.
- **Plus / Delta** - Capture what worked (plus) and what to change (delta) in a fast retro.
- **Start / Stop / Continue** - Sort behaviors into start, stop, and continue for actionable change.
- **Rose / Thorn / Bud** - Note the positive, the difficult, and the emerging-potential parts of an experience.
- **Decision Journal review** - Compare earlier recorded expectations against outcomes to calibrate judgment.
- **Belief-update routine** - A periodic solo practice of revisiting and updating key beliefs against new evidence.
- **Idea-quality audit** - A solo-plus-AI pass that scores and pressure-tests a batch of ideas before committing.

</details>

---

<details>
<summary><strong>Alternative categorization models (expand)</strong></summary>

The cognitive-operation grouping above is the proposed primary taxonomy, but it is not the only useful lens. The same library can be re-sorted by any of these, and the repo may expose more than one as navigation aids.

**A. By primary purpose (verb-first):** Generate, Reframe, Analyze, Evaluate, Decide, Stress-test, Anticipate, Synthesize, Facilitate, Reflect. Closest to how a user states intent ("I need to decide").

**B. By thinking mode:** divergent, convergent, lateral, systems, critical, strategic, creative, reflective, counterfactual, consequential. Useful conceptually, weak as a primary entry point because users rarely pick a tool by mode alone.

**C. Bipartite "Cognitive Capability Matrix" (for agent routing):** a grid of Problem Context (High-Ambiguity, High-Friction, High-Stakes, High-Complexity, High-Conflict) by Cognitive Operation (Deconstruct, Invert, Project, Shift, Synthesize). Designed so an agent can route ("High-Conflict plus Deconstruct, use Ladder of Inference") rather than for human browsing.

**D. By output artifact:** idea list, reframed problem, assumption register, risk register, decision brief, consequence map, option matrix, perspective review, opportunity map, prioritized recommendation. Strong for "I need to produce X."

**E. By facilitation form:** solo, pair, small group, cross-functional, async, workshop, AI-human collaborative. Sorts the facilitator-first methods cleanly from the solo-plus-AI ones.

**F. Five bundled "parent skills" (user-facing simplification):** Reframe a problem, Challenge assumptions, Generate options, Stress-test a plan, Converge and decide. A clean five-door entry point that hides the long catalog behind a small menu.

**G. By maturity tier:** Tier 1 ship-now, Tier 2 next, Tier 3 later. A prioritization view rather than a conceptual one.

The likely design: cognitive operation for the catalog, the five parent skills for the human entry point, and the bipartite matrix behind the scenes for agent routing. No single taxonomy has to win.

</details>

---

## The meta-skills: the build-and-maintain pipeline

The library does not just contain thinking skills; it contains the skills that **build and maintain** thinking skills. The goal is a self-executing pipeline so that creating a high-quality, evidence-graded skill is a repeatable operation rather than an act of discipline. Names below are working proposals.

| Stage | Meta-skill (proposed) | What it does |
|---|---|---|
| Ideate / triage | `ideate` | Capture a candidate method, classify it (skill, sub-skill, reference, or exclude), assign a rigor tier, and check it for overlap with what already exists. |
| Research | `research-method` | Produce a standardized **Evidence Dossier** for a method: evidence base and tier, lineage and trademark, when to use and when not to, overlap with siblings, the canonical step procedure, known failure modes, and cited sources. A deep tier adds a structured cross-LLM adversarial review. |
| Author | `author-skill` | Generate the skill artifacts (the skill file, the metadata sidecar, and references) directly from the dossier, against the repo's schema. Purpose-built for this repo. |
| Evaluate | `eval-skill` | Build and run trigger, output, and negative-case evaluations, deriving the negative cases from the dossier's documented failure modes. |
| Release | `release-skill` | Flip status, regenerate the catalog and any plugin distribution, update the changelog, and close the tracking item. |
| Improve | `improve-skill` | Eval-driven iteration plus a scheduled evidence-refresh and trademark re-check, so a shipped skill stays honest over time. |

<details>
<summary><strong>How the pipeline stays low-effort (expand)</strong></summary>

The design principle is **self-executing, not self-disciplined**: the process lives inside skills and automation, not in conventions a human has to remember.

- **One source of truth per skill.** The Evidence Dossier is authored once; the skill file, the metadata sidecar, the references, and the eval cases are all derived from it, so they cannot drift apart.
- **Tracking that maintains itself.** A single board (a GitHub Project) carries each method as a card with its pipeline status and metadata, updated as a side effect of running the pipeline rather than by hand. A work-in-progress limit of one plus a per-item checklist always names the single next action.
- **A three-zone document lifecycle.** Raw and throwaway research stays local; the live working dossier is versioned in the repo; only concise, stable outcomes are promoted to the published skill and its evidence doc. Archiving is a filter or git history, and git is the backup.
- **Tiered rigor.** Flagship and contested methods get the deep cross-LLM treatment; most methods get a standard single pass; backlog methods get a light triage. Depth scales with how load-bearing the method is.

</details>

---

## Frontmatter and metadata taxonomy (proposed ideas)

A layered metadata model is proposed so that each concern has one clean home: a portable skill file for discovery and activation, a richer sidecar for governance and evidence, and generated catalogs for distribution. None of this is final.

**Layer 1: portable `SKILL.md` frontmatter** (minimal, standards-compliant, travels across agents):

```yaml
---
name: tfs-premortem
description: >
  Generates a ranked risk register that stress-tests a planned decision by imagining
  it has already failed, surfacing the likely causes and pairing each with a
  mitigation, tripwire, and kill criterion. Use when about to commit to a launch,
  hire, investment, migration, or any risky, hard-to-reverse decision.
license: Apache-2.0
metadata:
  id: thinking-framework-skills.premortem
  family: risk-and-resilience
  evidence-tier: "S/M"
  version: 0.1.0
  standard: "0.8"
---
```

**Layer 2: rich `skill.meta.yml` sidecar** (governance, taxonomy, evidence, relationships) with these proposed domains:

- **Identity and lifecycle:** id, slug, display name, version, `status` (experimental, active, deprecated, archived), `maturity` (draft, alpha, beta, stable).
- **Classification:** primary family, secondary families, thinking modes, problem contexts, use cases, and `poor_fit_cases` (the anti-pattern artifact).
- **Interface:** required and optional inputs, primary artifact type, supported output formats.
- **Execution:** inline vs forked, subagent suitability, recipe suitability, likely companion skills.
- **Relationships:** overlaps_with, complements, often_precedes, often_follows, variants, subsumes / subsumed_by.
- **Quality:** trigger and output eval status, known failure modes, quality checks.
- **Evidence:** `evidence_tier` (S/M/P/V/A/C/X), confidence, lineage, source files, and attribution / trademark notes.
- **Implementation:** paths to the skill, references, examples, and evals.

<details>
<summary><strong>Taxonomy building blocks (expand)</strong></summary>

- **IDs:** human-readable namespace-dot syntax (`thinking-framework-skills.premortem`), not opaque UUIDs, so relationship references stay legible. The installable skill name additionally carries the `tfs-` prefix (`tfs-premortem`).
- **Families:** the eleven cognitive-operation buckets above are the candidate `family` values; a method may carry one primary and several secondary families.
- **Evidence tiers:** the seven-tier model (S strong, M moderate, P practitioner, V vendor, A anecdotal, C conceptually plausible, X poor or contradictory). The V-versus-P and A-versus-C distinctions are deliberate: they separate "has a book and case studies but no independent validation" from "long-standing practice," and "popular but unrigorous" from "sound but under-tested."
- **Risk flags:** binary overrides for trademark exposure, cargo-cult risk, and "popular but evidence-X," surfaced in metadata and honored by the quality gate.
- **What stays out of the portable frontmatter:** governance and Claude-specific fields (version, status, maturity, relationships, eval scores, and runtime-only keys) belong in the sidecar or in generated overlays, keeping the portable layer small and cross-agent friendly.

</details>

---

## Roadmap (early and subject to change)

- **Showcase slice:** a handful of high-confidence skills proven end to end (likely Problem Restatement, Premortem, Evidence vs Inference Sort, What Would Have to Be True, SCAMPER) plus one or two composed workflows.
- **First portfolio:** roughly a dozen skills spanning reframing, ideation, assumption-challenge, risk, systems, and decision, with the metadata and evidence model exercised for real.
- **Composed workflows:** a small set of multi-step "recipes" (for example reframe a problem, expand options, stress-test a decision, audit reasoning) that chain skills and compress their outputs.
- **Quality and orchestration:** evals, validators, and selective review agents added only as concrete pains demand them.

The discipline: ship one real skill before building scaffolding, and let every later piece earn its place.

---

## License and attribution

License to be confirmed. Method names that are trademarks or carry specific licenses remain the property of their owners; this library implements the underlying cognitive mechanisms, names them descriptively, and notes lineage and attribution in each skill's references rather than claiming the brands.
