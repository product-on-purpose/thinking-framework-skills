# Three-Horizons Transition Map - Worked Example

A completed run of the `three-horizons` skill on a real, consequential decision. This is the quality bar a generated transition map should meet.

> Uses the shared recurring scenario (Northwind, a B2B SaaS weighing a self-serve free-tier launch). Where `think-scenario-planning` builds several uncontrollable external futures and asks which free-tier moves survive all of them, and `think-backcasting` fixes one desired future and maps the path back, this skill does neither: it holds Northwind's declining sales-led present, a contested transition middle, and an emerging product-led-plus-AI-native future as three curves at once, and reads whether each transition move carries the future or merely props up the incumbent. See `docs/internal/AUTHORING.md`.

> The axis below is degree of transformation, not calendar time. The map is a shared orientation for the team's dialogue, not a forecast and not a decision. The three horizons need different metrics.

---

## System in transition and actor

- **System / domain in transition:** how Northwind acquires, converts, and retains customers - the shift from a sales-led, seat-licensed software business toward a product-led, increasingly AI-native one.
- **Actor (vantage point):** Northwind's leadership team, deciding whether and how to launch a self-serve free tier.
- **Axis reminder:** H1, H2, and H3 below are degrees of transformation away from Northwind's current sales-led logic, NOT time bands. The H3 future could arrive fast or slow; an AI-native competitor could collapse the workflow overnight.

## H1 - the declining present (dominant now, losing fit)

- **The dominant system today:** Northwind sells top-down. Account executives run demos, procurement negotiates annual seat licenses, and revenue is booked as multi-seat contracts. This is how the company makes its money now, and it works.
- **What is failing in it / losing fit:** Buyers increasingly expect to try before they buy; bottom-up adoption is bypassing the AE motion in Northwind's category; sales-led CAC is rising as deals get more scrutinized; and the seat-license logic fits poorly with usage-based, AI-assisted workflows that do not map cleanly to "a person at a desk." The core still pays the bills but is losing fit with how software is now bought and used.

## H3 - the emerging desired future (faint now, growing)

- **The desired future system:** a product-led, AI-native Northwind where the product itself acquires and expands accounts - users self-serve in, value lands before any human conversation, and the workflow is increasingly done *by* the product (agents doing the job) rather than *in* it (a UI a person operates). Monetization follows usage and outcomes, not seats. This is a different logic, not a faster version of the sales motion.
- **Pockets of the future in the present:** a handful of inbound users already sign up, configure themselves, and reach value with zero sales touch; the most-loved part of the product is already an automation that does work for the user; a small cohort expands usage on its own and only later talks to sales. These faint signals are H3 already alive inside H1.

## H2 - the contested transition zone (the messy middle, read in two directions)

The moves available to bridge the sales-led present and the product-led, AI-native future - classified by which horizon each actually serves. A move can look like progress and still be H2-minus.

| H2 move (disruption / venture / innovation) | Classification | Why it serves that horizon |
|---|---|---|
| A self-serve free tier built as a true product-led on-ramp (real time-to-value with no human, instrumented activation, self-serve upgrade path) | **H2-plus** (carries H3) | Builds the product-led acquisition and expansion muscle the H3 future needs; the free tier is the wedge that grows the pocket of the future. |
| The "same" free tier built as a lead-gen funnel for the AE team (signups become SQLs, no real self-serve value, sales still closes everything) | **H2-minus** (captured by H1) | Looks like product-led growth but only feeds the existing sales machine; it props up H1 and builds no new capability, while consuming the brand and roadmap budget a real PLG bet would need. |
| Rebuild the core workflow to be AI-native (agentic, outcome-priced) | **H2-plus** (carries H3) | Directly grows the "done by the product" seed of H3 and hedges the step-change risk that an AI-native entrant collapses the workflow. |
| Bolt AI features onto the existing seat-licensed UI as upsell line-items | **H2-minus** (captured by H1) | Monetizes AI inside the seat-license logic; reinforces H1's pricing and packaging rather than moving toward usage/outcome-based H3. |
| Make the product modular and embeddable (be where buyers already are) | **H2-plus** (carries H3) | Keeps the path to a product-led, agent-surfaced future open regardless of how buying organizes. |

- **H2-plus moves (genuinely carry the H3 future):** a free tier built as a real product-led on-ramp; an AI-native rebuild of the core workflow; a modular, embeddable architecture.
- **H2-minus moves (captured by H1, prop up the incumbent):** a free tier run as AE lead-gen with no self-serve value; AI features sold only as seat-license upsells. Both feel like motion and quietly entrench the declining system.

## The actor located on the canvas

- **Where the actor is standing:** Northwind's leadership is standing firmly in H1 - the sales-led system is where the revenue, the headcount, and the quarterly targets live - while debating an H2 move (the free tier) and gesturing at an H3 future.
- **Where attention and energy actually go right now:** almost all energy goes to defending and hitting the H1 number (AE pipeline, this quarter's bookings). The free-tier conversation is real but under-resourced, and the AI-native rebuild is "next year." The mismatch to name: the team *says* it wants the product-led future, but its attention, comp plans, and roadmap weight all flow to H1 - which is exactly the gravitational field that turns an H2-plus free tier into an H2-minus lead-gen funnel.

## Governance implication (orientation note, not a decision)

The three horizons need different metrics, and the most important sensemaking point on this map is that Northwind is at risk of governing its H2 free-tier bet with H1 rules. If the free tier is measured by SQLs handed to AEs and by this quarter's bookings (H1 metrics), it will be steered toward H2-minus regardless of the intent stated in the strategy deck - activation, self-serve conversion, and product-qualified expansion are the H2-plus metrics, and they will look like failures against an H1 scorecard for a while. The dialogue this map should open is not "should we launch a free tier" but "are we prepared to govern it - and the AI-native rebuild - on different metrics than the core, and to protect that energy from the H1 gravity well." That is an orientation for the team's conversation, not a recommendation this map makes for them.

---

*Note how this differs from its neighbors on the same Northwind decision. The `think-scenario-planning` example constructs four alternative external worlds Northwind does not control and asks which free-tier moves survive all of them (parallel futures, robustness). The `think-backcasting` example fixes one desired future and maps the milestone path back to today (one route). This three-horizons map does neither: it holds the declining sales-led present, the contested transition middle, and the emerging product-led future as three simultaneous curves, classifies each transition move as carrying the future or propping up the incumbent, and locates where the team's energy actually flows. The deliverable is a shared orientation on the transition and its H2-plus / H2-minus dynamics, not a set of worlds and not a path.*
