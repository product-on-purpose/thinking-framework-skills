# Negotiation Preparation Map - Worked Example

A completed run of the `interest-based-negotiation` skill on a real, consequential decision. This is the quality bar a generated preparation map should meet.

> Uses the shared recurring scenario (Northwind, a B2B SaaS weighing a self-serve free-tier launch) so examples across skills read as one coherent product. Where `think-scenario-planning` builds the uncontrollable external futures the free-tier bet must survive, and `think-futures-wheel` traces the ripples of launching it, THIS skill prepares a specific negotiation that the free-tier strategy depends on: Northwind needs a cloud-infrastructure partner to underwrite the cost of a generous free tier, and that partner's agreement is required. See `docs/internal/AUTHORING.md`.

> **Evidence caveat (ships with the artifact).** This map is a P-tier (practitioner) preparation aid. Its component moves - separating interests from positions, anchoring on a best alternative, creating value across differently-valued issues - rest on moderate-grade evidence from human-dyad studies; the five-element package as a whole has no controlled validation, and none of it is validated for AI-produced preparation. Treat this as a structuring aid that improves the decision, not a guarantee of a better outcome. See `evidence/dossier.md`.

---

## The deal in one line

- **Deal / decision under pressure:** Northwind needs a 2-year committed-spend agreement with a cloud-infrastructure vendor ("Cirrus") to underwrite the compute and storage cost of a generous free tier, at terms that make the free-tier unit economics survivable.
- **Parties (whose agreement is required):** Northwind (buyer of infrastructure) and Cirrus (the infrastructure vendor). Cirrus's agreement is required - Northwind cannot launch a generous free tier at the list rates.
- **Issues in play:** price per unit of compute/storage, committed-spend floor, contract term, overage / burst pricing, free-tier "credits" for non-paying users, co-marketing, and a ramp schedule. Multiple issues - this is integrative, not a single-issue haggle.
- **Is this single-issue and distributive?** No. Several issues are in play and the parties value them differently - the full map applies.

## Positions and interests (both sides)

| Party | Stated position | Underlying interests | Rank / confidence | Disclose or hold |
|---|---|---|---|---|
| **Northwind** | "We want 40 percent off list and no minimum commit." | (1) Survivable free-tier cost per non-paying user; (2) protection against a cost spike if a free-tier launch goes viral before it monetizes; (3) not locking into a large fixed commit before the free-tier conversion rate is proven; (4) keeping the option to multi-cloud later. | 1 and 2 top; 3 high; 4 lower | 1-2 safe to disclose (they explain the ask); 3 HOLD (revealing low confidence in conversion weakens us); 4 HOLD (leverage) |
| **Cirrus** | "Standard enterprise pricing is 15 percent off list with a 2-year, high-floor commit." | (1) Predictable committed revenue and a reference logo in a hot category; (2) growth in Northwind's consumption over time (land-and-expand); (3) avoiding a deep per-unit discount that resets their internal price book; (4) a multi-year lock to amortize onboarding. | (1) and (4) high confidence; (2) high; (3) medium | n/a (inferred) |

(Each Cirrus interest is an inference, flagged. Northwind's interest 3 - low confidence in its own conversion rate - is the most dangerous to disclose: it both weakens the price ask and invites a higher floor. Held.)

## Best alternative and reservation point

- **Northwind's best alternative away from the table:** sign a 1-year, lower-commit deal with a second-tier cloud vendor ("Nimbus") at roughly 25 percent off list, accepting weaker regional coverage and a migration cost later. This is real and quoteable, not "walk away."
- **Value of the alternative:** acceptable but inferior - Nimbus's coverage gaps would degrade the free-tier experience in two key regions, and a later migration to Cirrus would cost an estimated quarter of engineering time.
- **Northwind's reservation point:** any Cirrus deal worse, all-in, than the Nimbus alternative (roughly: worse than ~25 percent effective discount once burst protection and the migration-avoidance value are priced in) is a walk.

## The zone of possible agreement

- **Cirrus's estimated alternative:** lose the deal and the reference logo to Nimbus or to a hyperscaler's startup program; their alternative is weak because the category reference matters to them (medium-high confidence).
- **Cirrus's estimated reservation point:** they will not go below a discount that resets their price book publicly, but they can give value through credits, burst caps, and ramped commits that do not touch headline per-unit price (medium confidence).
- **Zone of possible agreement:** likely positive. Northwind walks below ~25 percent effective value; Cirrus resists headline discounts past ~15 percent but has room on non-price terms. The overlap lives in the NON-price issues - credits, burst protection, a ramped commit - which is exactly where value creation happens. Headline-price-only, the zone is thin; widened by the issues below, it opens.

## Options for mutual gain (value creation)

| Option / trade | What Northwind gives (cheap for it) | What Northwind gets (dear to it) | Why it is mutual gain |
|---|---|---|---|
| Ramped commit | A 2-year term and a commit floor that STEPS UP as conversion proves out (cheap once conversion is real; protects Cirrus's lock interest) | Avoids a large fixed commit before conversion is proven (interest 3) and gets a better effective rate at the higher tier | Cirrus gets the multi-year lock and land-and-expand; Northwind avoids the early over-commit |
| Free-tier credits, not discount | Accepts headline price near Cirrus's price book | A pool of low-cost "free-tier credits" that absorb non-paying-user cost without resetting Cirrus's public price | Cirrus protects its price book (interest 3); Northwind protects free-tier unit economics (interest 1) - the same dollar, different ledger |
| Burst cap | A modest annual minimum | A hard cap on overage pricing if a launch goes viral pre-monetization | Cheap for Cirrus to grant (tail risk), high-value for Northwind (interest 2) |
| Co-marketing | A joint case study and a conference logo | A small additional discount or credit top-up | Cheap for Northwind, valuable to Cirrus's reference interest |

## Objective criteria for dividing value

- Published cloud list pricing and standard enterprise discount bands (market rate).
- A comparable committed-spend deal at Northwind's stage and volume (precedent / comparable).
- A third-party cloud-cost benchmark for the workload profile (independent benchmark).
- The Nimbus quote as a concrete reference point for effective rate (legitimate alternative-based standard).

## Follow-through (so "yes" survives contact with reality)

- **Monitoring / milestones:** quarterly consumption review against the ramp; conversion-rate checkpoint at month 6 that gates the next commit step.
- **Dispute-handling:** a named escalation path and a true-up mechanism if actual usage diverges sharply from the ramp.
- **Review / renegotiation triggers:** a re-pricing window if Northwind's volume crosses a defined threshold early, and a coverage-SLA review if a new region is needed for the free tier.

## The accept-or-walk read

Press for a deal in the zone, but win it on the non-price terms, not the headline discount: a ramped commit plus a free-tier-credit pool plus a burst cap delivers Northwind's real interests (survivable free-tier cost, spike protection, no premature over-commit) while leaving Cirrus's price book and lock interests intact. Hold the conversion-confidence and multi-cloud interests. If Cirrus refuses both burst protection and credits, the Nimbus alternative is genuinely better all-in - walk to it rather than signing a high-floor, full-price commit that puts the free-tier economics underwater. A named, valued best alternative (Nimbus) is in hand, so this accept-or-walk call is grounded.

---

*Note how this differs from its neighbors on the same Northwind decision. The `think-scenario-planning` example builds four alternative external futures Northwind does not control and asks which free-tier moves survive all of them - no counterparty is modeled. The `think-decision-option-review` family scores options Northwind alone chooses among. This skill is the only one that models another party: it surfaces Cirrus's interests and alternatives, anchors Northwind's accept-or-walk on a named alternative (Nimbus), maps the zone where a deal beats no deal for both, and constructs trades from the fact that the two sides value the issues differently. The deliverable is a preparation map for a two-party decision, not a solo evaluation and not a forecast.*
</content>
