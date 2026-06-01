# Reversibility Classification - Worked Example

A completed run of the `tfs-one-way-vs-two-way-door` skill on a real decision. This is the quality bar a generated classification should meet.

> Uses the shared recurring scenario (Northwind, a B2B SaaS weighing a self-serve free-tier launch) so examples across skills read as one coherent product. This skill runs *first*: it triages how much process the decision deserves, before any option comparison or premortem.

---

## Decision being triaged

- **Decision:** Launch a self-serve free tier of Northwind's B2B SaaS to accelerate top-of-funnel growth.

## Summary (top of the artifact)

One-way door. A public free tier is cheap to ship but expensive to retract - pulling it later damages trust and is path-dependent on pricing - so this gets full rigor and senior sign-off before committing, not a quick call. Route it next to an option comparison and a premortem.

## Reversibility test

| Dimension | Cost to walk it back | Reversible on this dimension? (Y / N / partial) |
|---|---|---|
| Money (spend / refunds / write-offs) | Build cost is sunk but modest; infra spend stops if the tier is killed | Y |
| Time (how long to undo) | Turning the tier off is fast technically; communicating a withdrawal is slow | Partial |
| Trust / reputation (customers, market, team) | Withdrawing a launched free tier reads as "they are struggling" and burns trust with users who adopted it; competitors cite it | N |
| Legal / contractual (commitments, regulation) | Free users on month-to-month terms are low-risk; any data-retention or migration promises made at sign-up could bind | Partial |
| Path-dependence (future options foreclosed, learning sunk) | A free tier reframes the market's price expectation and the sales motion; unwinding the freemium position is very hard once set | N |

## Verdict

- **Classification:** One-way door.
- **For borderline cases - leans:** Not borderline. The money and time are reversible, but trust and path-dependence are not - and on this kind of decision the irreversible dimensions dominate. The "we can just turn it off" framing is exactly the convenient label this test exists to reject.

## Matched deliberation level

- **Who decides:** CEO + VP Sales + Head of Growth jointly, not the growth team alone.
- **How much analysis:** Full. Compare the free-tier launch against alternatives (extended trial, sales-assisted PLG, no change) and stress-test the chosen path before committing budget.
- **Sign-off:** Executive sign-off required before any external announcement; cross-functional alignment with Sales on comp and lead-routing first.
- **Next tool (one-way doors only):** `tfs-decision-option-review` to compare free tier vs the alternatives against weighted criteria, then `tfs-premortem` to stress-test the chosen path before commit.
- **Why this level:** Because the decision is hard to reverse on trust and pricing position, the cost of being wrong is high and durable. Speed here is a false economy; the rigor is warranted. (Contrast: the *pricing copy* on the free-tier page is a two-way door - let Growth A/B test it without sign-off.)

---

*Note: the value is the routing decision made before any work starts. A naive prompt would jump straight to analyzing or even recommending the free tier; this skill first establishes that the decision is irreversible on the dimensions that matter, so it earns full rigor - and just as importantly, it flags the reversible sub-decisions (the page copy) that should stay fast.*
