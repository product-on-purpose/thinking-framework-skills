<a id="readme-top"></a>

# Thinking Framework Skills

**An evidence-graded library of agent-executable thinking-method skills.**

Every method is reduced to its working mechanism, graded honestly on how strong its evidence actually is, and shipped as a skill that produces a concrete artifact, not prose.

[**What it is**](#-what-this-is) &nbsp;·&nbsp; [**Install**](#-quick-start) &nbsp;·&nbsp; [**Frameworks**](#-the-catalog) &nbsp;·&nbsp; [**Evidence**](#-the-evidence-model) &nbsp;·&nbsp; [**Recipes**](#-recipes) &nbsp;·&nbsp; [**Live site**](https://thinking-framework-skills.productonpurpose.com/)

<p>
  <img src="https://img.shields.io/badge/status-active-success?style=flat-square" alt="Status: Active">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-Apache--2.0-blue?style=flat-square" alt="License: Apache-2.0"></a>
  <img src="https://img.shields.io/badge/version-0.12.0-blue?style=flat-square" alt="Version 0.12.0">
  <a href="#-conformance-what-advanced-gold-tier-means"><img src="https://img.shields.io/badge/tier-advanced%20(Gold)-B8860B?style=flat-square" alt="Conformance tier: advanced (Gold)"></a>
  <a href="#-the-catalog"><img src="https://img.shields.io/badge/frameworks-63-brightgreen?style=flat-square" alt="Frameworks: 63"></a>
  <a href="#-tools-meta-skills"><img src="https://img.shields.io/badge/tools-4-brightgreen?style=flat-square" alt="Tools: 4"></a>
  <a href="#-recipes"><img src="https://img.shields.io/badge/recipes-9-brightgreen?style=flat-square" alt="Recipes: 9"></a>
  <a href="https://agentskills.io/specification"><img src="https://img.shields.io/badge/spec-agentskills.io-orange?style=flat-square" alt="Agent Skills Spec"></a>
  <img src="https://img.shields.io/badge/evidence-graded-purple?style=flat-square" alt="Evidence-graded">
</p>

---

<details>
<summary><strong>Table of Contents</strong></summary>

- [What this is](#-what-this-is)
- [Quick start](#-quick-start)
- [What makes it different](#-what-makes-it-different)
- [The library at a glance](#-the-library-at-a-glance)
- [The evidence model](#-the-evidence-model)
- [The catalog](#-the-catalog)
- [How a skill works](#-how-a-skill-works)
- [Recipes](#-recipes)
- [Find your way in](#-find-your-way-in)
- [Documentation](#-documentation)
- [Conformance: what advanced (Gold) tier means](#-conformance-what-advanced-gold-tier-means)
- [Project status](#-project-status)
  - [At a glance](#at-a-glance) · [Repo structure](#repo-structure) · [Changelog](#changelog)
- [Contributing](#-contributing)
- [License](#-license)
- [About the maintainer](#-about-the-maintainer)

</details>

---

## 🧠 What this is

AI agents are fluent and fast, and surprisingly weak at the moves that make thinking actually good: reframing a problem before solving the wrong one, separating evidence from inference, imagining how a plan fails before it does, stress-testing a decision from more than one angle. Humans are not much better under time pressure. Both converge too early.

`thinking-framework-skills` packages the durable core of the structured-thinking tradition (decision science, creativity research, systems thinking, foresight, critical thinking) as small, composable, agent-ready skills. Each one helps a person or an agent reframe a problem, generate options, challenge an assumption, trace a consequence, or stress-test a decision, and hands back a usable artifact.

Three things make it different from a list of mental models:

| It is | It is not |
|---|---|
| **Mechanism-first** - the durable cognitive move, named for what it does | A museum of trademarked frameworks |
| **Evidence-graded** - an honest tier (S/M/P/V/A/C/X) on every skill, including "weaker than people think" | A confident claim that every method is "proven" |
| **Artifact-producing** - a risk register, an option matrix, an argument map, a Thinking Plan | A set of vibes-y prompts |
| **Composable** - skills chain into recipes, passing a compressed artifact at each step | A pile of unrelated one-offs |
| **Honest about misuse** - every skill names where it misleads ("when NOT to use this") | A cargo-cult checklist |

**Relationship to [`pm-skills`](https://github.com/product-on-purpose/pm-skills):** sibling library, no technical coupling. `thinking-framework-skills` helps decide *what* to work on and *why* it is sound; `pm-skills` helps execute *how*. They compose; neither depends on the other.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## ⚡ Quick start

**Claude Code (recommended):**

```bash
/plugin marketplace add product-on-purpose/agent-plugins
/plugin install thinking-framework-skills@product-on-purpose
```

All 63 frameworks (plus the 4 tools and 9 recipes) become available immediately, invocable by name (for example `/think-premortem`).

**Cross-agent (Cursor, Copilot, Cline, and others via the open [skills CLI](https://github.com/vercel-labs/skills)):**

```bash
npx skills add product-on-purpose/thinking-framework-skills
```

**Clone or download:**

```bash
git clone https://github.com/product-on-purpose/thinking-framework-skills.git
```

**Your first run.** Pick a real decision you are about to commit to, then:

```bash
/think-premortem "we're about to launch a free tier to drive signups"
```

You get a ranked **risk register**: for each top risk, a leading signal, a mitigation, an owner, and a kill criterion. That artifact, not a feeling of caution, is the point. You do not need an agent - every skill is a procedure you can run by hand with the template on its page.

**Not sure which framework you need?** Start with the **[Framework Advisor](https://thinking-framework-skills.productonpurpose.com/tools/think-framework-advisor/)**: describe your situation in plain language and it returns a prioritized *Thinking Plan* of which skills to run, in order, and what to skip. It is the front door to everything else.

How the Framework Advisor fits into your workflow:

```mermaid
%%{init: {'theme':'base','themeVariables':{'primaryColor':'#eef2ff','primaryBorderColor':'#c7d2fe','lineColor':'#6366f1'}}}%%
flowchart LR
  sit["Your situation<br/>(a prompt)"]:::in --> adv{"Framework Advisor<br/>(the front door)"}:::router
  adv --> plan["Thinking Plan<br/>(prioritized, evidence-graded)"]:::plan
  plan --> s1["run skill 1"]:::skill
  plan --> s2["run skill 2"]:::skill
  s1 --> art["Artifact(s):<br/>risk register, option matrix,<br/>argument map"]:::art
  s2 --> art
  sit -. "or apply directly" .-> top3["think-top3 /<br/>think-random-frameworks"]:::skill
  top3 --> art
  classDef in fill:#dcfce7,stroke:#86efac,color:#166534;
  classDef router fill:#ddd6fe,stroke:#a78bfa,color:#4c1d95;
  classDef plan fill:#fef9c3,stroke:#fde047,color:#854d0e;
  classDef skill fill:#eef2ff,stroke:#c7d2fe,color:#3730a3;
  classDef art fill:#e0f2fe,stroke:#7dd3fc,color:#075985;
```

> 📖 Full walkthrough: [`docs/getting-started.md`](docs/getting-started.md) · Explore the whole library: the [**live site**](https://thinking-framework-skills.productonpurpose.com/).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## 🔬 What makes it different

The field of "thinking methods" has three uneven layers: a small **empirical core** with replicated study evidence, a large **practitioner ring** of long-standing heuristics with real traction but limited formal validation, and a noisy **outer ring** where popularity and weak evidence get conflated. Most libraries flatten all three into one shiny catalog.

This one does the opposite, and that honesty is the product:

- **Grade evidence transparently.** Every skill carries a tier, and its dossier states what the research does and does *not* show. A practitioner-tier method labeled honestly is more trustworthy than one dressed up as science.
- **Do not launder statistics.** The often-cited "premortems surface ~30% more reasons" measures the *number of reasons*, not a 30% gain in decision quality. Claims are scoped to what the studies actually measured.
- **Mechanism over ritual.** The skill implements the durable move and names the branded ritual as lineage, never the reverse. (So the library ships *Parallel Perspectives Review*, not the trademarked Six Thinking Hats.)
- **Flag transferred evidence.** Almost no studies test an *AI agent* running these methods. Where evidence comes from human-subject research, the page says so.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## 🗺️ The library at a glance

63 frameworks across 12 cognitive-operation families (56 core plus 7 contested lenses), arranged as a thinking lifecycle. (Four [tools](#-tools-meta-skills) and nine [recipes](#-recipes) ride on top.) You rarely run all twelve; the Framework Advisor picks the few that fit your situation.

```mermaid
%%{init: {'theme':'base','themeVariables':{'primaryColor':'#eef2ff','primaryBorderColor':'#c7d2fe','lineColor':'#6366f1','fontFamily':'system-ui, sans-serif'}}}%%
flowchart TB
    classDef frame fill:#e0e7ff,stroke:#6366f1,color:#1e1b4b,font-weight:bold
    classDef gen fill:#dcfce7,stroke:#16a34a,color:#14532d,font-weight:bold
    classDef analyze fill:#fef9c3,stroke:#ca8a04,color:#713f12,font-weight:bold
    classDef decide fill:#ffedd5,stroke:#ea580c,color:#7c2d12,font-weight:bold
    classDef reflect fill:#f3e8ff,stroke:#9333ea,color:#581c87,font-weight:bold

    PF["1. Problem Framing (6) - frame the real problem"]:::frame
    DI["2. Divergent Ideation (6) - generate options"]:::gen
    PM["3. Perspective & Multi-Lens (2) - see it from other angles"]:::gen
    SC["4. Systems & Consequences (9) - trace consequences"]:::analyze
    AB["5. Assumption & Belief Challenge (5) - challenge assumptions"]:::analyze
    RC["6. Reasoning Clarity (5) - clarify the reasoning"]:::analyze
    DO["7. Decision & Option Evaluation (12) - decide between options"]:::decide
    SO["8. Strategy & Opportunity (2) - test strategy against alternative futures"]:::decide
    EV["9. Ethics & Values Deliberation (4) - weigh the moral trade-off"]:::decide
    RR["10. Risk & Resilience (4) - anticipate what could go wrong"]:::decide
    SY["11. Synthesis (4) - turn inputs into a message"]:::reflect
    MR["12. Meta-Thinking & Reflection (4) - learn and route"]:::reflect

    PF --> DI --> PM --> SC --> AB --> RC --> DO --> SO --> EV --> RR --> SY --> MR
```

*In text: frame the problem, generate options, see it from other angles, trace consequences, challenge assumptions, clarify the reasoning, decide between options, test strategy against alternative futures, weigh the moral trade-off, anticipate what could go wrong, synthesize, then reflect.* See the full color-coded map (by evidence tier) on the [live site](https://thinking-framework-skills.productonpurpose.com/explore/map/).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## 🔬 The evidence model

Honest grading is the differentiator, so the key comes **before** the catalog: every skill and every claim is labeled with one of seven tiers, from strongest to weakest.

| Tier | Meaning |
|---|---|
| `S` | **Strong** - replicated experimental or meta-analytic support |
| `M` | **Moderate** - real evidence, but narrower, correlational, or field-based |
| `P` | **Practitioner** - widely used and defensible, without strong controlled evidence |
| `V` | **Vendor** - originates from a consultancy or branded methodology |
| `A` | **Anecdotal** - case reports and testimonials |
| `C` | **Conceptual** - reasonable, not yet demonstrated |
| `X` | **Poor/contradictory** - the evidence cuts against it (excluded, documented) |

A few skills carry a **split grade** (for example `M/P` or `S/M`): the mechanism rests on one tier while a specific claim about it rests on another. Where a grade leans on **human-subject** research that has not been tested on an AI agent, the skill's dossier flags that transfer explicitly rather than overclaiming.

A strong-evidence core anchors the library; everything else is honestly labeled around it. The [bibliography](https://thinking-framework-skills.productonpurpose.com/evidence/bibliography/) aggregates the graded sources so a skeptic can trace any claim to its grounding. See [`docs/concepts.md`](docs/concepts.md) for the short version.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## 📚 The catalog

All 63 frameworks, by family. **Seven are contested lenses** (SWOT, ACH, Five Whys, Eisenhower/MoSCoW/Pareto, Complexity Domain Sort, Reflective Equilibrium, QCA): famous-but-weak methods graded honestly and shipped caveat-first, explicit-request-only, marked *Contested lens* in their rows. The `Tier` column is the [evidence grade](#-the-evidence-model) defined just above. **Each name links to its full page** - mechanism, numbered procedure, worked example, and graded sources - on the live site. (The routers and applicators are listed under [Tools](#-tools-meta-skills); the chains under [Recipes](#-recipes).)

### Problem Framing - frame the real problem (6)

| Skill | Tier | What it does |
|---|---|---|
| [**Problem Restatement**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-problem-restatement/) | `M/P` | Rewrite the problem several ways to expose hidden framing, then pick a more useful one |
| [**Abstraction Laddering**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-abstraction-laddering/) | `P` | Move up ("why") and down ("how") the ladder to find the altitude where the problem is workable |
| [**Contradiction Resolution**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-contradiction-resolution/) | `M/P` | Reframe a trade-off as a contradiction to dissolve via separation in time / space / scale / condition, with an honest exit when it is genuinely real |
| [**Boundary Critique**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-boundary-critique/) | `C/P` | Audit the boundary judgments behind a frame (who benefits, decides, counts, has standing) in is vs ought, naming who is affected but excluded |
| [**Frame Creation**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-frame-creation/) | `C/P` | Distil themes and the core paradox, then abduce a new "as if it were Y" standpoint and reason forward to solutions |
| [**Five Whys**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-five-whys/) | `X` | *Contested lens (caveat-first, explicit-request-only).* Reliable only for simple linear single-cause failures and misleading beyond them (Card 2017); leads with that caveat, flags where a problem is multi-cause, and points multi-cause analysis to issue-tree |

### Divergent Ideation - generate options (6)

| Skill | Tier | What it does |
|---|---|---|
| [**Morphological Analysis**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-morphological-analysis/) | `P` | Lay out a solution's independent parameters and their possible values as a Zwicky box, then cross-combine and prune to internally consistent configurations |
| [**Brainwriting**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-brainwriting/) | `S` | Silent, parallel, written idea generation that reliably outperforms verbal brainstorming |
| [**Far-Analogy Ideation**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-far-analogy-ideation/) | `S` | Transfer solutions from distant domains, which produce more original ideas than near ones |
| [**SCAMPER**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-scamper/) | `P` | Run an idea through seven transformation prompts to force structured variation |
| [**Question Burst**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-question-burst/) | `P` | Generate a rapid burst of questions, rank them, and pursue the most catalytic one |
| [**Assumption Reversal**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-assumption-reversal/) | `P` | Surface the assumptions baked into a problem, negate them, and generate non-obvious reframes |

### Perspective & Multi-Lens - see it from other angles (2)

| Skill | Tier | What it does |
|---|---|---|
| [**Role-Storming**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-role-storming/) | `P` | Generate ideas while inhabiting a chosen non-self persona, using the assumed identity to lower self-censorship and shift associations |
| [**Parallel Perspectives Review**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-parallel-perspectives-review/) | `P` | Examine a decision through several separated lenses in turn, then synthesize a balanced read |

### Systems & Consequences - trace consequences (9)

| Skill | Tier | What it does |
|---|---|---|
| [**Three Horizons**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-three-horizons/) | `C` | Hold three time-horizon curves at once - declining present, contested transition, emerging future - and locate the actor in the transition zone |
| [**Process Tracing**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-process-tracing/) | `P` | Test rival causal explanations of a single case by each piece of evidence's diagnosticity (hoop, smoking-gun, straw-in-the-wind, doubly-decisive tests) |
| [**Causal Layered Analysis**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-causal-layered-analysis/) | `C` | Read an issue down four layers (litany, system, worldview, myth) and reconstruct a preferred future back up each, anchored by a deliberately changed metaphor |
| [**Stocks and Flows Reasoning**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-stocks-and-flows-reasoning/) | `S` | Reason explicitly about accumulations and rates, which people systematically misjudge |
| [**Causal Loop Diagrams**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-causal-loop-diagrams/) | `M/P` | Close and sign the feedback loops (reinforcing or balancing) to read why a system spirals, settles, or oscillates |
| [**Futures Wheel**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-futures-wheel/) | `P` | Map first-, second-, and third-order consequences radiating from a change |
| [**Iceberg Model**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-iceberg-model/) | `P` | Move from events down to the patterns, structures, and mental models that produce them |
| [**Theory of Constraints**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-theory-of-constraints/) | `P` | Find the single binding constraint capping throughput and attach its exploit / subordinate / elevate decisions (the five focusing steps) |
| [**Qualitative Comparative Analysis (QCA)**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-qualitative-comparative-analysis/) | `P` | *Contested lens (warn-and-redirect, explicit-request-only).* Certifies configurations from noise at session scale (Lucas and Szatrowski 2014); does not build the truth table, it warns and routes to reference-class-forecasting |

### Assumption & Belief Challenge - challenge assumptions (5)

| Skill | Tier | What it does |
|---|---|---|
| [**Authentic Dissent**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-authentic-dissent/) | `S` | Cultivate genuine minority disagreement, which improves reasoning where role-played dissent does not |
| [**Consider the Unknowns**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-consider-the-unknowns/) | `M` | Before committing to a judgment, explicitly list the relevant variables you cannot observe and weigh the gap they leave |
| [**Ladder of Inference Check**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-ladder-of-inference-check/) | `P` | Trace how you climbed from raw data to conclusion to catch where interpretation crept in |
| [**Red Team Light**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-red-team-light/) | `P` | A lightweight adversarial pass that attacks a plan to surface its weak points |
| [**Analysis of Competing Hypotheses (ACH)**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-analysis-of-competing-hypotheses/) | `X` | *Contested lens (warn-and-redirect, explicit-request-only).* Controlled trials found ACH raises confidence without accuracy, so it does not build the matrix as if valid; it leads with that evidence and routes to a better-grounded move |

### Reasoning Clarity - clarify the reasoning (5)

| Skill | Tier | What it does |
|---|---|---|
| [**Argument Mapping**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-argument-mapping/) | `S` | Diagram the structure of claims, reasons, and objections to expose where it is weak |
| [**Argumentation Schemes**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-walton-argumentation-schemes/) | `P` | Identify which stereotyped argument pattern is in play, then test it with that scheme's standard critical questions |
| [**Natural-Frequency Bayesian Framing**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-natural-frequency-bayesian/) | `S` | Express probabilities as natural frequencies (3 in 1,000) to make conditional reasoning tractable |
| [**Evidence vs Inference Sort**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-evidence-vs-inference-sort/) | `P` | Separate what is actually known from what is being inferred, and label each |
| [**Issue Tree**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-issue-tree/) | `P` | Decompose a question into a logical tree of sub-questions to make analysis tractable |

### Decision & Option Evaluation - decide between options (12)

| Skill | Tier | What it does |
|---|---|---|
| [**Pairwise Comparison**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-pairwise-comparison/) | `P` | Rank options with no absolute scale by judging every pair head-to-head, deriving the order from the win-counts with a consistency check |
| [**Dialectical Bootstrapping**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-dialectical-bootstrapping/) | `M` | Make an estimate, assume it is wrong and list why, estimate again from those changed assumptions, then average the two numbers |
| [**Interest-Based Negotiation**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-interest-based-negotiation/) | `P` | Separate interests from positions, decide against your BATNA inside the mapped ZOPA, and invent options for mutual gain before dividing value |
| [**Minimax Regret**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-minimax-regret/) | `P` | Choose under deep uncertainty with no probabilities by minimizing the worst-case regret across the states of nature |
| [**Linear-Model Aggregation**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-linear-model-aggregation/) | `S` | Score options on a simple weighted model that tends to beat holistic judgment |
| [**Fermi Estimation**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-fermi-estimation/) | `M/P` | Estimate an unknown by decomposing it into order-of-magnitude factors, then multiplying back to a number with a low/high band |
| [**What Would Have to Be True**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-what-would-have-to-be-true/) | `P` | Turn a claim into the specific conditions that must hold, then test them |
| [**Decision Option Review**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-decision-option-review/) | `P` | Compare options against weighted criteria with explicit tradeoffs |
| [**One-Way vs Two-Way Door**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-one-way-vs-two-way-door/) | `P` | Classify a decision by reversibility and match the deliberation cost to it |
| [**Expected-Value Decision Tree**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-expected-value-decision-tree/) | `P` | Price the uncertainty: a tree of choice and chance nodes, rolled back to an expected value per option, with a what-flips-it note |
| [**Eisenhower / MoSCoW / Pareto**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-eisenhower-moscow-pareto/) | `P` | *Contested lens (caveat-first, explicit-request-only).* A bundle of three weakly-evidenced prioritization presets; runs the requested one and leads with the laundering caveat (Zhu, Yang and Hsee 2018 measures the urgency bias, not the matrix as a remedy) |
| [**Complexity Domain Sort**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-complexity-domain-sort/) | `C` | *Contested lens (caveat-first, explicit-request-only).* The descriptively-named Cynefin sort; no controlled validity evidence (PMC 2021) and cargo-cult risk; leads with that caveat plus the Cynefin trademark and names what to do per domain |

### Strategy & Opportunity - test strategy against alternative futures (2)

| Skill | Tier | What it does |
|---|---|---|
| [**Scenario Planning**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-scenario-planning/) | `P` | Construct a set of divergent, internally consistent external futures (2x2 critical-uncertainty axes), then robustness-test strategy across them |
| [**SWOT**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-swot/) | `X` | *Contested lens (caveat-first, explicit-request-only).* Leads with SWOT's weak evidence (Hill and Westbrook 1997), then forces the discipline a bare grid lacks, namely evidence-tagged and prioritized factors plus a TOWS matching step into options |

### Ethics & Values Deliberation - weigh the moral trade-off (4)

| Skill | Tier | What it does |
|---|---|---|
| [**Veil-of-Ignorance Reasoning**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-veil-of-ignorance-reasoning/) | `M` | Decide a values trade-off as if you had an equal chance of being any affected party, then return to the actual decision and confront the gap |
| [**Ethical Matrix**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-ethical-matrix/) | `P` | Grid affected parties (including voiceless ones) against prima facie principles (wellbeing, autonomy, fairness) and read the cell-level pattern of trade-offs |
| [**Reflective Equilibrium**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-reflective-equilibrium/) | `C` | *Contested lens (caveat-first, explicit-request-only).* Philosophically central but empirically untested as a procedure, with no checkable termination test (Brandt 1979); runs it with an explicit revision ledger and leads with the failure modes |
| [**Speculative Harms & Anti-Goals**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-speculative-harms-anti-goals/) | `A` | Assume the design succeeds at scale, narrate how it harms third parties and is exploited in bad faith, then convert each harm into an explicit anti-goal |

### Risk & Resilience - anticipate what could go wrong (4)

| Skill | Tier | What it does |
|---|---|---|
| [**Premortem**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-premortem/) | `S/M` | Imagine the plan has already failed and work backward to causes, tripwires, and kill criteria |
| [**Reference Class Forecasting**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-reference-class-forecasting/) | `S` | Estimate from the track record of similar past projects, not inside-view optimism |
| [**WOOP**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-woop/) | `S` | Wish, Outcome, Obstacle, Plan: mental contrasting plus implementation intentions |
| [**Backcasting**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-backcasting/) | `P` | Start from a desired future state and work backward to the steps to reach it |

### Synthesis - turn inputs into a message (4)

| Skill | Tier | What it does |
|---|---|---|
| [**Contradiction / Tension Mapping**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-contradiction-tension-mapping/) | `C` | Map an interdependent polarity as a both/and - two poles, their upsides and downsides, a greater purpose, warning signs, and action steps - to manage rather than resolve it |
| [**Concept Mapping**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-concept-mapping/) | `M/P` | Build a labeled-relationship concept network so each link reads as an explicit proposition, surfacing gaps and missing links |
| [**Affinity Mapping**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-affinity-mapping/) | `P` | Cluster many raw notes into emergent themes from the bottom up |
| [**Pyramid Principle**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-pyramid-principle/) | `P` | Structure communication as a governing claim over grouped, ordered support |

### Meta-Thinking & Reflection - learn and route (4)

| Skill | Tier | What it does |
|---|---|---|
| [**After Action Review**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-after-action-review/) | `S` | Structured review of expected vs actual, and what to change, to improve the next loop |
| [**Interval Calibration Check**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-interval-calibration-check/) | `P` | Test a stated confidence interval against an equivalent bet, widen until indifferent, then score stated confidence against the actual hit rate |
| [**Decision Journal**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-decision-journal/) | `P` | Record the decision, rationale, and prediction now to calibrate your judgment later |
| [**Belief-Update Routine**](https://thinking-framework-skills.productonpurpose.com/frameworks/think-belief-update-routine/) | `P` | Re-score a standing inventory of open beliefs against new evidence on a cadence, with an explicit confidence delta and an under-updating guard |

> Browse them five other ways - by job, by evidence, by artifact, by situation, or on the map - in the site's [Explore](https://thinking-framework-skills.productonpurpose.com/explore/) section. The skills themselves live in [`skills/`](skills/).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## 🛠️ Tools (meta-skills)

Four skills are **tools**, not thinking methods: they operate *over* the library - routing you to the right framework, applying several at once, or researching new ones. They carry no evidence tier of their own (any grade in a tool's dossier is about the tool's behavior, not a method), and they live under [`/tools/`](https://thinking-framework-skills.productonpurpose.com/tools/) on the site.

| Tool | What it does |
|---|---|
| [**Framework Advisor**](https://thinking-framework-skills.productonpurpose.com/tools/think-framework-advisor/) | **Router**, the front door. Describe a situation, get a prioritized Thinking Plan of which frameworks to run, in order, and what to skip. Use it when you do not know which method fits. |
| [**Top-3**](https://thinking-framework-skills.productonpurpose.com/tools/think-top3/) | **Applicator**. Rank the most relevant frameworks for your topic, apply the top three so each emits its artifact, then cross-synthesize. Use it when you want worked output now, not a plan. |
| [**Random Frameworks**](https://thinking-framework-skills.productonpurpose.com/tools/think-random-frameworks/) | **Applicator**. Draw three frameworks at random and apply each regardless of fit, to break a frozen or fixated framing. Use it when the obvious lenses are not working. |
| [**Research Framework**](https://thinking-framework-skills.productonpurpose.com/tools/think-research-framework/) | **Engine**. Research a candidate method, grade its evidence conservatively, and propose a catalog entry for review. This is how the library grows; it never auto-admits. |

**Frameworks, tools, and recipes, in one line:** a *framework* is a single graded thinking method (the 63 in the catalog above); a *tool* helps you choose or apply frameworks (the 4 here); a *recipe* is a fixed chain of frameworks for a recurring job (the 9 below).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## ⚙️ How a skill works

Each skill is a self-contained unit: a portable `SKILL.md` (the mechanism and procedure), an `evidence/dossier.md` (the graded sources and honest caveats), a `references/EXAMPLE.md` (a worked example that sets the quality bar), and a `skill.meta.yml` sidecar (governance, taxonomy, relationships).

```mermaid
%%{init: {'theme':'base','themeVariables':{'primaryColor':'#eef2ff','primaryBorderColor':'#c7d2fe','lineColor':'#6366f1','fontFamily':'system-ui, sans-serif'}}}%%
flowchart LR
    classDef you fill:#1e293b,stroke:#0f172a,color:#fff,font-weight:bold
    classDef skill fill:#4f46e5,stroke:#3730a3,color:#fff,font-weight:bold
    classDef art fill:#166534,stroke:#14532d,color:#fff,font-weight:bold

    U["You<br/>a messy situation"]:::you
    S["A think- skill<br/>mechanism + procedure"]:::skill
    A["A concrete artifact<br/>risk register, option matrix,<br/>argument map, Thinking Plan"]:::art

    U -- invoke --> S -- produces --> A
```

When you run `/think-premortem "..."`, the agent loads the skill, follows its numbered procedure, mirrors the worked example, and produces the artifact. No prompt engineering required. The docs site is a **generated view** of these files; see [`docs/architecture.md`](docs/architecture.md) for how the skills become the site.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## 🧩 Recipes

Recipes chain several skills into one end-to-end job, passing a compressed artifact at each handoff. Nine ship today:

| Recipe | What it does |
|---|---|
| **Kepner-Tregoe** | Find a deviation's cause, choose among defined options, and de-risk the rollout - the rational-process bundle run as a chain of shipped moves |
| **PDCA / A3** | Root-cause a performance gap, choose and run a countermeasure, then review actual versus expected and standardize or iterate |
| **Reframe a problem** | Restate the problem, sharpen the question, and check the framing before you build |
| **Expand options** | Reframe, then generate genuinely new options before judging any |
| **Stress-test a decision** | Surface what must be true, weigh options, calibrate reversibility, and premortem the plan |
| **Audit reasoning** | Separate evidence from inference, map the argument, and pressure-test it |
| **First principles** | Decompose a problem to its fundamentals, then strip the inherited assumptions to rebuild from what is necessary |
| **Idea-quality audit** | Score a batch of ideas on explicit quality dimensions, then pressure-test the strongest few before committing |
| **Issue-Position-Argument mapping** | Turn a tangled multi-question deliberation or transcript into a typed map - the open issues, the rival positions on each, and the arguments for and against |

Browse them on the [live site](https://thinking-framework-skills.productonpurpose.com/recipes/) or in [`_workflows/`](_workflows/).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## 🧭 Find your way in

| If you want to... | Start here |
|---|---|
| Get unstuck or decide, now | The [**Framework Advisor**](https://thinking-framework-skills.productonpurpose.com/tools/think-framework-advisor/) - describe your situation, get a plan |
| See real decisions worked prompt-to-artifact (incl. the cross-library tfs -> pm-skills handoff) | The [**Showcase**](https://thinking-framework-skills.productonpurpose.com/showcase/) |
| See one quick worked example of every framework | The [**Samples**](https://thinking-framework-skills.productonpurpose.com/samples/) shelf |
| Browse by the job you need done | [Explore by job](https://thinking-framework-skills.productonpurpose.com/explore/by-job/) |
| See only the strong-evidence methods | [Explore by evidence](https://thinking-framework-skills.productonpurpose.com/explore/by-evidence/) |
| Filter by your situation, live | The [interactive chooser](https://thinking-framework-skills.productonpurpose.com/explore/chooser/) |
| Learn good thinking, beginner to advanced | The [learning tracks](https://thinking-framework-skills.productonpurpose.com/learn/) |
| Check the claims | The [evidence and bibliography](https://thinking-framework-skills.productonpurpose.com/evidence/bibliography/) |
| Build with or extend the library | [`docs/`](docs/) and [`docs/contributing.md`](docs/contributing.md) |

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## 📖 Documentation

- **[Live site](https://thinking-framework-skills.productonpurpose.com/)** - the full, searchable, interactive experience (per-framework pages, learning tracks, explorers, the bibliography, the [Showcase](https://thinking-framework-skills.productonpurpose.com/showcase/) and per-framework [Samples](https://thinking-framework-skills.productonpurpose.com/samples/)). This is the home for *using* the library.
- **[`docs/`](docs/)** - the repo-browser and contributor layer: [architecture](docs/architecture.md), [concepts](docs/concepts.md), [contributing](docs/contributing.md), [conformance](docs/conformance.md), the [authoring loop](docs/internal/AUTHORING.md), and the [release process](docs/internal/release-process.md).
- **[`skills/`](skills/)** - the frameworks themselves (the source of truth the site renders).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## 🥇 Conformance: what advanced (Gold) tier means

This plugin is built to the [agent-skills-toolkit](https://github.com/product-on-purpose/agent-skills-toolkit) **Advanced Skill Library Standard**, which grades a skill library on three tiers. Each tier includes everything below it:

| Tier | Name | What it certifies |
|---|---|---|
| 🥇 | **Advanced (Gold)** | The plugin proves itself - it ships CI that runs the Standard's own validators against it and passes (self-hosting), generates its `INDEX.md` and native manifests from a single authored source, and maintains release notes and a deprecation policy. |
| 🥈 | **Convergent (Silver)** | The plugin declares its agent targets and emits each higher-order component (commands, workflows, chain contracts) correctly for both Claude Code and Codex, with a manifest that matches what is on disk. |
| 🥉 | **Universal (Bronze)** | The skills are portable - valid frontmatter, an `AGENTS.md`, a manifest, references one level deep - so the identical files run on any agentskills.io-compatible agent. |

`thinking-framework-skills` validates at **advanced (Gold) with 0 errors and 0 warnings** against the pinned toolkit. Concretely, it earns Gold through:

- **Self-hosting CI that passes.** Every pull request runs [`scripts/check.mjs`](scripts/check.mjs) (the Standard's validators) via [`.github/workflows/ci.yml`](.github/workflows/ci.yml), and `check` is a required status check on `main`. The same one command reproduces the result locally.
- **Generated INDEX and manifests.** [`INDEX.md`](INDEX.md), `.claude-plugin/plugin.json`, the Codex manifest, and `manifest.generated.json` are all generated from the authored [`library.json`](library.json) and drift-checked; a hand-edit is a CI error.
- **Curated release notes.** [`RELEASE-NOTES.md`](RELEASE-NOTES.md) is maintained separately from the technical [`CHANGELOG.md`](CHANGELOG.md).
- **Deprecation policy** and all Bronze and Silver requirements, by inclusion.

Two Gold checks are **not applicable** here, and the library says so rather than papering over it: **hook documentation** and **chain/hook eval coverage** apply only to plugins that ship hooks or chained components. This library ships neither - its recipes are workflow chains of independent skills, not runtime chain contracts - so those checks pass vacuously. Every skill still carries its own `eval/cases.md`.

> Full breakdown, check by check: [`docs/conformance.md`](docs/conformance.md) (also the canonical list of all `check.mjs` gate layers and how they relate to the Standard's G1-G7 Gold requirements). The Standard itself: [agent-skills-toolkit / STANDARD.md](https://github.com/product-on-purpose/agent-skills-toolkit/blob/main/STANDARD.md).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## 📊 Project status

`v0.12.0` - **public and growing.** The library grows additively, and evidence grades are refreshed as the research does. User-facing highlights live in [`RELEASE-NOTES.md`](RELEASE-NOTES.md); the full technical history is in [`CHANGELOG.md`](CHANGELOG.md).

### At a glance

|  |  |
|---|---|
| **Current version** | [v0.12.0](https://github.com/product-on-purpose/thinking-framework-skills/releases/tag/v0.12.0) |
| **Frameworks** | 63, across 12 cognitive-operation families (56 core + 7 contested lenses) |
| **Tools** | 4 meta-skills (a router, two applicators, the research engine) |
| **Recipes** | 9 (skill chains shipped as workflow components) |
| **Conformance** | [advanced (Gold)](#-conformance-what-advanced-gold-tier-means) - 0 errors / 0 warnings, self-hosting CI |
| **Evidence** | 11 skills at `S` / `S-M` tier; every skill graded and sourced |
| **Spec** | [agentskills.io](https://agentskills.io/specification) |
| **License** | [Apache-2.0](LICENSE) |
| **Docs site** | [thinking-framework-skills.productonpurpose.com](https://thinking-framework-skills.productonpurpose.com/) |
| **Install** | `/plugin install thinking-framework-skills@product-on-purpose` |

### Repo structure

```
thinking-framework-skills/
├── skills/                  # 63 frameworks + 4 tools (the source of truth)
├── frameworks/              # registry.mjs (the catalog) + per-method dossiers
│   └── think-<method>/      #   SKILL.md, evidence/dossier.md, references/, eval/cases.md, skill.meta.yml
├── _workflows/              # Recipe definitions (multi-skill chains) as workflow components
├── recipes/                 # Human-readable recipe write-ups
├── scripts/                 # gen-site, gen-manifest, gen-recommendable, and the check.mjs gate
├── site/                    # Astro Starlight docs site (a generated view of skills/)
├── docs/                    # Contributor and build docs
│   └── internal/            #   AUTHORING.md, specs/, release-plans/, research/
├── .github/workflows/       # CI: the self-hosting conformance gate + Pages deploy
├── library.json             # Authored manifest (the canonical component index)
├── INDEX.md                 # Generated catalog index (drift-checked)
├── CHANGELOG.md             # Technical version history
├── RELEASE-NOTES.md         # Curated, user-facing release highlights
└── AGENTS.md                # Universal agent-discovery file
```

| Path | What's in it |
|---|---|
| [`skills/`](skills/) | All 63 frameworks + 4 tools, each a self-contained unit (the site renders from these) |
| [`frameworks/`](frameworks/) | `registry.mjs` (the single-source-of-truth catalog of 135 evaluated methods) + per-method dossiers |
| [`_workflows/`](_workflows/) | The 9 recipes as workflow components - ordered skill chains with handoffs |
| [`scripts/`](scripts/) | Generators (site, manifests, name-safety set) and [`check.mjs`](scripts/check.mjs), the conformance gate |
| [`docs/`](docs/) | [Getting started](docs/getting-started.md), [architecture](docs/architecture.md), [concepts](docs/concepts.md), [contributing](docs/contributing.md), [conformance](docs/conformance.md) |
| [`docs/internal/`](docs/internal/) | The [authoring loop](docs/internal/AUTHORING.md), specs, [release plans](docs/internal/release-plans/), and research |

### Changelog

Full detail in [`CHANGELOG.md`](CHANGELOG.md); curated highlights in [`RELEASE-NOTES.md`](RELEASE-NOTES.md).

<details>
<summary><strong>Release history</strong></summary>

| Version | Highlights |
|---|---|
| [**0.12.0**](https://github.com/product-on-purpose/thinking-framework-skills/releases/tag/v0.12.0) | Docs platform: a changelog on the site (What's new + full history), the documentation audit acted on (trust page at 63 skills, a contested-lens FAQ, compound grades defined), eight comprehension diagrams, and four new CI guards taking the conformance gate from 9 to 13 layers. No new skills; catalog stays 56 core + 7 contested. |
| [**0.11.0**](https://github.com/product-on-purpose/thinking-framework-skills/releases/tag/v0.11.0) | Contested lenses: seven famous-but-weak frameworks (SWOT, ACH, Five Whys, Eisenhower/MoSCoW/Pareto, a descriptively-named Cynefin sort, Reflective Equilibrium, QCA) ship as low-tier, caveat-first, explicit-request-only skills, enforced by a new 9th gate layer (`check-contested.mjs`); catalog 56 -> 63 (56 core + 7 contested, separate cohorts). Trigger eval 0 false-fires, output 100%. |
| [**0.10.0**](https://github.com/product-on-purpose/thinking-framework-skills/releases/tag/v0.10.0) | Learn-by-example depth + agent discovery: a worked example for every framework (the samples shelf, coverage 56/56), a cross-library Showcase that hands off to pm-skills (tfs decides, pm-skills delivers), `llms.txt` linked + `llms-full.txt` added, both behavioral evals refreshed across the full 56-skill catalog, and `red-team-light` re-graded P -> M. No new frameworks; catalog stays 56. |
| [**0.9.0**](https://github.com/product-on-purpose/thinking-framework-skills/releases/tag/v0.9.0) | Discoverable by agents: a generated, drift-gated `llms.txt` index plus `catalog.json` (the 69 invokable skills/tools/recipes with routing and chaining fields) and `evaluated.json` (all 135 graded methods) at the site root, so other agents can find and route to the library; bundles the post-v0.8.0 measurement loop and example-coverage ratchet. No new skills; catalog stays 56. |
| [**0.8.0**](https://github.com/product-on-purpose/thinking-framework-skills/releases/tag/v0.8.0) | Learn by example: a Showcase of 16 real decisions worked prompt-to-artifact (a founder, an engineer, a policy analyst), an operating guide, a prompt gallery, and a "Does this actually work?" page publishing the behavioral-eval numbers (99% routing with 0 false-fires; 99% of output checks). Documentation and trust; catalog unchanged at 56. |
| [**0.7.1**](https://github.com/product-on-purpose/thinking-framework-skills/releases/tag/v0.7.1) | Framework Library complete: every documented-not-shipped method now has a published dossier (45 -> 75), documenting settled verdicts with honest sourced research. Documentation-only patch; no catalog count change. |
| [**0.7.0**](https://github.com/product-on-purpose/thinking-framework-skills/releases/tag/v0.7.0) | Behavioral evals land (routing: 99% top-1, 0 false-fires; artifact quality: 99% checks pass); the four flagged skills tightened by construction; catalog grows 47 -> 56 with a new Ethics & Values Deliberation family (9 Build / 7 Fold / 1 Recipe / 13 Reject from 30 candidates). |
| [**0.6.0**](https://github.com/product-on-purpose/thinking-framework-skills/releases/tag/v0.6.0) | Catalog grows 40 -> 47 with 7 survivors of a 26-candidate research sweep; `AGENTS.md` roster tables generated and drift-checked; published Framework Library grows 8 -> 25 dossiers. |
| [**0.5.0**](https://github.com/product-on-purpose/thinking-framework-skills/releases/tag/v0.5.0) | Catalog grows 37 -> 40 (Theory of Constraints, Expected-Value Decision Tree, Scenario Planning); 7-candidate shortlist fully reconciled; Strategy & Opportunity family intro added. |
| [**0.4.0**](https://github.com/product-on-purpose/thinking-framework-skills/releases/tag/v0.4.0) | The Framework Library platform: registry as single source of truth with strong CI, the research-framework engine, Top-3 and Random-Frameworks applicators, published Framework Library dossiers, a `/tools/` section separating meta-skills from graded frameworks, and the advisor's calibrated routing gate. |
| [**0.3.0**](https://github.com/product-on-purpose/thinking-framework-skills/releases/tag/v0.3.0) | The advisor-credibility milestone: behavioral eval cases enforced in CI, and advisor corpus enrichment (anti-triggers, when-not, overlaps). Plus the Belief-Update Routine framework and an idea-quality-audit recipe. |
| [**0.2.0**](https://github.com/product-on-purpose/thinking-framework-skills/releases/tag/v0.2.0) | Catalog grows 31 to 34; Gold-tier hardening with a self-hosting conformance gate in CI, a generated `INDEX.md`, and `RELEASE-NOTES.md`. Tier declared `advanced`. |
| [**0.1.0**](https://github.com/product-on-purpose/thinking-framework-skills/releases/tag/v0.1.0) | First public release: 31 evidence-graded, agent-executable skills + 4 composable recipes, validating at convergent (Silver). The `think-framework-advisor` front-door router. A full Astro Starlight docs site. Listed in the Product on Purpose marketplace. |

</details>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## 🤝 Contributing

Contributions, ideas, and framework proposals are welcome. The bar is deliberately high - it is what keeps the library trustworthy.

**A new framework must clear the selection bar.** It has to:

1. Add a **distinct, durable cognitive move** - not duplicate one already shipped. The overlap ceiling is real: candidates that reduce to an existing skill are rejected or become recipes.
2. Carry an **honest evidence grade** with a dossier of graded sources, including what the research does *not* show.
3. Produce a **concrete artifact**, not prose.
4. State **when *not* to use it.**

**To propose or build one:**

1. Open an issue describing the move and its evidence - the fastest way to get feedback before you build.
2. Read [`docs/contributing.md`](docs/contributing.md) and the per-skill authoring loop in [`docs/internal/AUTHORING.md`](docs/internal/AUTHORING.md).
3. Mirror an existing skill's 5-file structure (`SKILL.md`, `evidence/dossier.md`, `references/`, `eval/cases.md`, `skill.meta.yml`).
4. Run the conformance gate locally (`node scripts/check.mjs`) before opening a PR; CI runs the same gate.

Diagrams follow the pm-skills `utility-mermaid-diagrams` house style. Commit with [Conventional Commits](https://www.conventionalcommits.org/).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## 📄 License

Distributed under the **[Apache License 2.0](LICENSE)**. In short: you may use this library commercially, modify and redistribute it, use it privately, and include it in proprietary software. The only requirements are attribution and including the license notice.

**On method names and trademarks.** Names that are trademarks or carry specific licenses remain the property of their owners. This library implements the underlying cognitive *mechanisms*, names them descriptively, and notes lineage and attribution in each skill's references rather than claiming the brands.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## 👋 About the maintainer

<a href="https://github.com/jprisant"><img src="https://img.shields.io/badge/Maintained_by-Jonathan_Prisant-blue?style=for-the-badge&logo=github" alt="Maintained by Jonathan Prisant"></a>

Built and maintained by **Jonathan Prisant** ([@jprisant](https://github.com/jprisant)), a product leader who thinks in systems and gets unreasonably excited about understanding and solving problems. `thinking-framework-skills` is the reasoning sibling to [`pm-skills`](https://github.com/product-on-purpose/pm-skills): one helps you decide *what* to work on and *why* it is sound, the other helps you execute *how*.

*If this library has sharpened a decision, or saved you from a bad one, consider starring the repo and sharing it with your team.*

<p align="center">
  <strong>Built with purpose by <a href="https://github.com/product-on-purpose">Product on Purpose</a></strong><br>
  <sub>Evidence-graded thinking, packaged as skills your agent can actually run</sub>
</p>

<div align="right"><a href="#readme-top">Back to top ↑</a></div>
