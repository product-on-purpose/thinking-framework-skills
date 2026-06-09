# Scenario Set (2x2) - Worked Example

A completed run of the `scenario-planning` skill on a real, consequential decision. This is the quality bar a generated scenario set should meet.

> Uses the shared recurring scenario (Northwind, a B2B SaaS weighing a self-serve free-tier launch) so examples across skills read as one coherent product. Where `think-futures-wheel` traces the ripples of *launching* the free tier, and `think-backcasting` maps a path back from one chosen future, this skill builds several *uncontrollable external* futures and asks which free-tier moves survive all of them. See `docs/internal/AUTHORING.md`.

> The four worlds below are structured speculation, not probabilities. They are not ranked by likelihood. The value is the robustness read at the end, not the stories.

---

## Focal decision and horizon

- **Focal decision:** Commit to a self-serve free tier as Northwind's primary growth motion over the next 3-4 years (the platform bet), versus staying sales-led.
- **Horizon:** 3-4 years - long enough that the external environment, not the launch mechanics, decides whether the bet pays off.
- **Uncontrollable domain:** how B2B software is bought and built around Northwind - the structure of its buyers and the pace of AI-native disruption. Northwind controls its product and pricing; it does not control either of these.

## Driving forces and predetermined elements

- **Predetermined elements (high impact, low uncertainty):** continued shift to cloud and remote work; ongoing data-privacy regulation tightening; buyers' growing expectation of "try before you buy." These shape every world and are not in contention.
- **Critical uncertainties (high impact, high uncertainty):** (1) whether Northwind's buyers stay fragmented (many independent teams choosing their own tools) or consolidate behind a few platform vendors and procurement gatekeepers; (2) whether AI-native entrants disrupt the category incrementally (AI as a feature on top of today's workflows) or with a step-change (AI agents that collapse the workflow Northwind sells). Two macro forces (regulation tightening, demand growth) were high impact but more predictable, so they are predetermined elements, not axes. A third candidate (funding climate) was set aside as not independent of the AI-disruption axis.

## The two axes

- **Axis A: Buyer structure** - spectrum from **fragmented** (bottom-up, many independent team buyers; the self-serve sweet spot) to **consolidated** (top-down platform buyers and procurement gatekeepers).
- **Axis B: AI-native disruption pace** - spectrum from **incremental** (AI augments the existing workflow Northwind owns) to **step-change** (AI-native agents collapse or replace that workflow).

These two are genuinely independent: how buying is organized does not determine how fast the technology frontier moves, and vice versa.

## The 2x2 - four named worlds

|  | **Axis B = incremental AI** | **Axis B = step-change AI** |
|---|---|---|
| **Axis A = fragmented buyers** | **World 1: Land Rush** | **World 2: Agent Swarm** |
| **Axis A = consolidated buyers** | **World 3: Platform Gatekeepers** | **World 4: Suite Eats the Workflow** |

- **World 1: Land Rush** (fragmented x incremental) - The friendly world. Teams keep choosing their own tools bottom-up, and AI stays an enhancement to the workflow Northwind already owns. Self-serve free tiers are the dominant motion; the winner is whoever lands the most individual users and converts them. Northwind's free-tier bet is directly in its element, and the fight is on activation, breadth of integrations, and conversion craft.

- **World 2: Agent Swarm** (fragmented x step-change) - Buyers are still fragmented and self-serve, but AI-native agents now do much of the job Northwind's workflow used to do. Individual users still sign up bottom-up, but they increasingly arrive expecting an agent to do the work, not a UI to do it in. A free tier still acquires users cheaply, but the product behind it has to become AI-native fast or the funnel fills with users who churn to an agent-first competitor. Distribution is intact; the product thesis is under attack.

- **World 3: Platform Gatekeepers** (consolidated x incremental) - The technology frontier is calm, but buying has moved up to procurement, platform standards, and a few preferred-vendor suites. Bottom-up free signups still happen but rarely convert, because the real purchase decision sits with a gatekeeper who wants SSO, governance, security review, and a master agreement. A free tier here is a top-of-funnel and advocacy tool, not a closing motion; the deal is won (or lost) on enterprise readiness and platform fit.

- **World 4: Suite Eats the Workflow** (consolidated x step-change) - The hardest world. Buying has consolidated AND a step-change in AI lets the big platform suites absorb Northwind's workflow as a native AI capability inside a bundle the gatekeeper already pays for. Standalone self-serve has the weakest pull here: individual enthusiasm does not move a procurement decision, and the incumbent suite is "good enough and already approved." Survival depends on a defensible wedge the suite cannot quickly copy and on being where the gatekeepers already are.

## Robustness read

How Northwind's free-tier and platform moves fare across the four worlds.

| Move | World 1 Land Rush | World 2 Agent Swarm | World 3 Gatekeepers | World 4 Suite | Verdict |
|---|---|---|---|---|---|
| Ship a free tier generous on individual-value features | wins | survives (acquisition still cheap) | survives (funnel + advocacy, not closing) | weak (does not move procurement) | **robust-ish** - useful in 3 of 4, never actively harmful |
| Bet the whole company on self-serve as the *primary* closing motion | wins | risky | loses | loses | **bet** - wins only in Land Rush |
| Invest early in an AI-native rebuild of the core workflow | neutral cost | wins | neutral | partially wins | **robust** under any step-change risk |
| Build enterprise readiness (SSO, governance, security, admin) | low value | low value | wins | necessary-to-survive | **bet that pays in the consolidated column** |
| Keep the architecture modular / embeddable (be where buyers already are) | helps | helps | helps | wins | **robust** - the one move that survives every world |

- **Robust moves (survive every world):** keep the product **modular and embeddable** so Northwind can be adopted bottom-up, integrated into a platform, or surfaced inside an AI agent; and **ship the free tier generous on individual-value features** (it helps in three worlds and never hurts). These are committed regardless of which future arrives.
- **Bets (win in one world, lose in another):** betting the company on self-serve as the *primary closing* motion is a bet on Land Rush (World 1); going heavy on enterprise readiness is a bet on the consolidated column (Worlds 3-4). Make each consciously, not by default.
- **Gaps (no current move covers):** none of the moves above gives Northwind a defensible wedge in **World 4** (consolidated + step-change) if the suite copies the workflow as a native AI feature. That gap is the strategic exposure to watch and to fund an option against.

## Signal watch-list (which world is arriving)

| World | Leading indicators that this world is arriving |
|---|---|
| World 1: Land Rush | Self-serve conversion stays healthy; competitors compete on activation and integrations; procurement rarely appears in deals |
| World 2: Agent Swarm | Free signups stay strong but retention drops as users leave for agent-first tools; "can it just do it for me?" dominates feedback |
| World 3: Platform Gatekeepers | Win rate increasingly gated on SSO / security review / master agreements; more deals routed through procurement and preferred-vendor lists |
| World 4: Suite Eats the Workflow | The major suites ship the workflow as a bundled native AI feature; standalone evaluations shorten or vanish; "we already have it in [suite]" objections rise |

## Options to keep open

Because the worlds diverge, three options are worth holding even though committing to any one now would be premature: (1) an **AI-native core rebuild** kept ready to accelerate the moment step-change signals appear (Worlds 2 and 4); (2) an **enterprise / platform-fit track** (SSO, governance, embeddability) staged so it can be pulled forward if buying consolidates (Worlds 3 and 4); and (3) a **partner / embed path** to sit inside the very suites that could otherwise eat the workflow, as a hedge against World 4. Keeping these open is the payoff of having modeled four futures instead of betting on one.

---

*Note how this differs from its neighbors on the same Northwind decision. The `think-futures-wheel` example traces the consequences of one move Northwind makes (launching the free tier ripples into support load, MRR, comp). The `think-backcasting` example fixes one desired future and maps the path back to today. This scenario set does neither: it constructs four alternative external worlds Northwind does not control, holds them in parallel without ranking them, and asks which free-tier moves survive all of them. The deliverable is robustness (and a watch-list), not a consequence map and not a route.*
