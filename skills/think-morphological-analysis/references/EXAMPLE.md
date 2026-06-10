# Morphological Field (Zwicky Box) - Worked Example

A completed run of the `morphological-analysis` skill on a real, consequential decision. This is the quality bar a generated morphological field should meet.

> Uses the shared recurring scenario (Northwind, a B2B SaaS weighing a self-serve free-tier launch). Northwind fits this method well because the free-tier offering itself is genuinely a CONFIGURATION - the team must take a position on several semi-independent dimensions (what to gate, how conversion is triggered, how free users are supported, where they sign up) and tends to default to one familiar combination. Where `think-scenario-planning` models the uncontrollable external worlds the bet lands in, this skill maps the internal design space of the offer and prunes it to the internally consistent shapes. See `docs/internal/AUTHORING.md`.

> The configurations below are GENERATED and pruned for consistency, not ranked by value. Choosing among the survivors is a separate downstream step (`think-decision-option-review`).

---

## Focal problem

- **What is being configured:** the shape of Northwind's self-serve free-tier offering - the concrete design of the free product and its path to paid, not whether to launch it.
- **What a complete solution must specify:** what the free tier gives away (the gate), what triggers the upgrade to paid (the conversion lever), how free users are supported (the support model), and where/how users first land (the acquisition surface).
- **Why a field and not a single answer:** the offer genuinely factorizes into these semi-independent dimensions, and Northwind keeps defaulting to one familiar combination ("free-forever seat-limited, upgrade when you add seats, community-only support, website signup"). Laying out the space forces the unobvious corners into view.

## Parameters (the independent dimensions)

| Parameter | Why it is a real, independent dimension |
|---|---|
| **P1: Gate (what free gives away)** | The core "free vs paid" boundary; the most consequential design choice and orthogonal to how users arrive or are supported. |
| **P2: Conversion lever (what triggers paid)** | How a free user becomes a paying one; independent of the gate (the same gate can convert on seats, usage, or features). |
| **P3: Support model (how free users are helped)** | The cost-and-experience choice for the free population; independent of gate and conversion. |
| **P4: Acquisition surface (where users first land)** | The top-of-funnel entry; independent of the product's internal shape. |

## The morphological field (the box)

| P1: Gate | P2: Conversion lever | P3: Support model | P4: Acquisition surface |
|---|---|---|---|
| Free forever, seat-limited | Add seats (per-seat upgrade) | Community / docs only | Website self-signup |
| Free forever, feature-limited | Hit a usage cap (metered) | In-app self-serve + email | Product-led (in-product invite/share) |
| Time-limited full trial | Unlock a premium feature | Assisted (human onboarding) | Marketplace / integration listing |

- **Raw configuration count:** 3 x 3 x 3 x 3 = **81** full configurations before pruning.

## Cross-consistency assessment (the reduction step)

Incompatible value pairs (cannot coexist in a sensible offer) and why:

| Value | Incompatible with | Why they cannot coexist |
|---|---|---|
| P1: Time-limited full trial | P2: Add seats (per-seat upgrade) | A trial converts on the clock running out, not on seat growth; pairing them sends contradictory upgrade signals. |
| P1: Time-limited full trial | P2: Hit a usage cap (metered) | A full trial intentionally removes caps; a metered cap contradicts "full." |
| P1: Time-limited full trial | P3: Community / docs only | A short trial that must convert fast cannot rely on slow community support to get users to value in time. |
| P1: Free forever, feature-limited | P2: Unlock a premium feature | Redundant/circular: the gate already withholds premium features, so "unlock a premium feature" IS the gate, not a separable lever. |
| P3: Assisted (human onboarding) | P1: Free forever, seat-limited | Human onboarding for an unbounded free-forever population is economically incoherent at self-serve scale (cost grows with free users who may never pay). |
| P4: Marketplace / integration listing | P2: Add seats (per-seat upgrade) | Marketplace acquisition lands single users/integrations, not teams; a seat-growth conversion lever has nothing to act on at entry. |

(Note how the cross-consistency pass does real work here: the "time-limited full trial" gate is incompatible with three of the other column's values, which collapses a large share of the 81.)

## Internally consistent configurations (the pruned set)

Surviving configurations (one value per parameter, no incompatible pair). Showing the representative residual after exclusion:

| # | P1 Gate | P2 Conversion lever | P3 Support model | P4 Acquisition surface | Note |
|---|---|---|---|---|---|
| C1 | Free forever, seat-limited | Add seats | Community / docs only | Website self-signup | The familiar default - team-expansion PLG. |
| C2 | Free forever, seat-limited | Add seats | In-app self-serve + email | Product-led (in-product invite) | Default, but viral entry + lighter-touch support. |
| C3 | Free forever, feature-limited | Hit a usage cap | Community / docs only | Website self-signup | Usage-metered freemium; converts on consumption. |
| C4 | Free forever, feature-limited | Hit a usage cap | In-app self-serve + email | Product-led | Metered freemium with assisted self-serve and viral entry. |
| C5 | Free forever, feature-limited | Hit a usage cap | In-app self-serve + email | Marketplace / integration listing | The unobvious corner - acquire via an integration, convert on usage. |
| C6 | Time-limited full trial | Unlock a premium feature | In-app self-serve + email | Website self-signup | A trial-led shape (kept consistent: no seat/metered lever, no community-only support). |
| C7 | Free forever, feature-limited | Unlock a premium feature - EXCLUDED | - | - | (Struck by CCA: circular with the feature-limited gate.) |

- **Pruned count vs raw:** the cross-consistency pass removes the large majority of the 81 raw configurations; roughly a dozen survive as internally coherent, of which the six above (C1-C6) are the meaningfully distinct families.
- **Unobvious corners surfaced:** **C5** (marketplace acquisition + usage-metered conversion) is a coherent shape a forward search starting from the seat-limited default would almost certainly have missed - it lets Northwind ride an integration partner's distribution while still converting on consumption.

## Hand-off (not a ranking)

These six consistent configurations (C1-C6) are the candidate set, not a recommendation. The field has done its job: it took the 81-cell space, struck the internally incompatible combinations, and surfaced both the familiar default (C1) and an unobvious-but-coherent corner (C5). Scoring them against Northwind's criteria - expected conversion, support cost, time-to-value, fit with the buyer structure - is the separate downstream step (`think-decision-option-review`). Morphological analysis chooses none of them.

---

*Note how this differs from its neighbors on the same Northwind decision. `think-scenario-planning` builds the uncontrollable EXTERNAL worlds the free-tier bet lands in and asks which moves survive all of them. `think-issue-tree` would decompose one question (for example "why is self-serve conversion low?") top-down into a MECE diagnostic tree. `think-assumption-reversal` would negate a premise ("what if the free tier gave away the whole product?") to provoke ideas. This skill does none of those: it decomposes the OFFER into parallel parameters, enumerates their cross-product, and prunes it to the internally consistent configurations. The deliverable is a consistency-pruned field, not a set of external futures, a diagnostic tree, or a provoked list.*
