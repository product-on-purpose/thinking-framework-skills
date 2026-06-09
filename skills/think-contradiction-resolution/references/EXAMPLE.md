# Contradiction-Resolution Worksheet - Worked Example

A completed run of the `contradiction-resolution` skill on a real, consequential decision. This is the quality bar a generated worksheet should meet.

> Uses the shared recurring scenario (Northwind, a B2B SaaS weighing a self-serve free-tier launch) so examples across skills read as one coherent product. Where `abstraction-laddering` relocated *what altitude* to work the free-tier problem at, this skill takes the trade-off that surfaces once a free tier is on the table and tests whether it can be dissolved. See `docs/internal/AUTHORING.md`.

---

## Problem under resolution

- **Problem as given:** "The free tier has to be generous enough to actually drive self-serve adoption, but limited enough that it doesn't cannibalize paid conversion. We keep arguing about where to draw the line."
- **The user's actual goal:** Grow qualified pipeline and product advocacy from the free tier without eroding paid revenue.

## Summary (top of the artifact)

The team framed this as one dial - "how generous is the free tier" - to be set at a compromise point, where every step toward adoption is a step away from conversion. That is a physical contradiction: generosity must be both high (for adoption) and low (for conversion). Stating the Ideal Final Result ("the free tier sells the paid tier by itself, at near-zero cost") and running the separation principles dissolves it: **separate by condition / scale.** Make the free tier fully generous on *individual-value* features (which drive adoption and advocacy) while gating the *team, admin, and scale* features that define paid value. Generosity and limitation then apply to different feature axes, so they stop trading against each other - there is no single dial to compromise. (Had Northwind's product delivered value only at team scale, no such split would exist and the worksheet would have declared a real trade-off; see the exit note.)

## The contradiction

- **Opposing pair (A vs B):** to get more of **A: free-tier adoption and advocacy** (argues for a *generous* free tier) we must accept less of **B: paid conversion and protected revenue** (argues for a *limited* free tier).
- **Type:** **Physical.** A single parameter - the *generosity of the free tier* - is required to be both high (to win A) and low (to win B). That single-parameter, two-opposite-values shape is what makes the separation principles the right menu.
- **Why it has felt inevitable:** everyone pictured generosity as one global slider on the whole product, so more of it necessarily meant giving away more of what people pay for.

## Ideal Final Result (IFR)

Every prospect who could get value from Northwind reaches full first value for free and becomes an advocate, at near-zero acquisition cost, **with zero loss of paid conversion and no new sales effort** - the free experience does the qualifying and the selling by itself. (Note there is no "how" here: no plan limits, no trial length, no feature gates - just the end-state, so the apparatus we assumed is exposed as optional.)

## Dissolution attempts

| Operator | Attempt (how the requirements might be separated) | Result |
|---|---|---|
| Separate in **time** | Generous for a window, then limited: a 14-day full-feature trial that downgrades. | Partial - recovers conversion pressure but loses the always-on, top-of-funnel advocacy a free tier exists for; it becomes a trial, not a free tier. |
| Separate in **space** | Generous in a sandbox / sample-data workspace, limited on real production data. | Partial - good for evaluation, weak for genuine adoption and advocacy (people advocate for tools they really use, not demos). |
| Separate by **scale / system level** | Generous at single-user scale; limited at team / org scale (seats, volume). | **Dissolves** - solo usage is exactly where adoption and advocacy form; scale is exactly what enterprises pay for. |
| Separate by **condition** | Generous for *individual-value* use cases; gate the *collaboration, admin/SSO, and scale* features that define paid value. | **Dissolves** - generosity and limitation now apply to different feature axes, not one slider. |

## Outcome

- **Resolution (dissolved):** Separate by **condition and scale**. Ship a free tier that is *fully generous on individual-value features* (the complete single-user workflow, real data, no time limit - so it drives adoption and creates advocates) while *gating the features that define paid value*: team collaboration, admin/SSO/governance, and scale (seats, volume, throughput). The "generous vs limited" trade-off dissolves because the two requirements no longer touch the same parameter - you are generous on the adoption axis and limited on the monetization axis at the same time. The free tier now grows the funnel and *demonstrates* exactly what the paid tier adds, which is what makes it sell the paid tier "by itself." The earlier argument ("where do we draw the one line?") was solving a contradiction that did not have to exist.

  > **Exit note (when this would NOT dissolve):** the resolution depends on Northwind having real value at the individual scale. If the product only delivered value once a whole team was on it (value emerges at collaboration, not solo), there would be no individual-vs-team axis to separate on, and none of the four principles would split the generosity dial. The worksheet would then declare a **genuine trade-off** between free-tier reach and paid revenue and route it to `think-decision-option-review` to choose a deliberate point under it - rather than manufacturing a separation that the product cannot support.

---

*Note how the value is in refusing the compromise first: the problem arrived as "set the generosity dial," and an unaided pass would have proposed a middle setting (some features free, some paid, argue over which). The skill named the contradiction, stated an implementation-free ideal, and ran the separation menu - turning a one-dial compromise into a two-axis design where adoption and monetization stop competing.*
