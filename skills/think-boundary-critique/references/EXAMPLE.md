# Boundary-Judgment Audit - Worked Example

A completed run of the `boundary-critique` skill on a real, consequential decision. This is the quality bar a generated audit should meet.

> Uses the shared recurring scenario (Northwind, a B2B SaaS weighing a self-serve free-tier launch) so examples across skills read as one coherent product. Where `abstraction-laddering` relocated *what altitude* to work the free-tier problem at, and `contradiction-resolution` tested whether the generous-vs-limited trade-off could be dissolved, this skill audits *whose* decision the free-tier launch is - who the frame counts, and who it leaves outside the line. See `docs/internal/AUTHORING.md`.

---

## Frame under audit

- **Frame as given:** "Should we launch a self-serve free tier? The model says it lifts top-of-funnel signups and our PLG growth metric; we're optimizing the free-tier design to maximize qualified conversions."
- **Improvement it claims:** A "better" measured almost entirely as *new-logo growth and qualified pipeline* - the company's PLG funnel metric.
- **The user's actual goal:** Grow durable, profitable revenue without quietly trading it away elsewhere.

## Summary (top of the artifact)

The free-tier frame is drawn tightly around one beneficiary (the company's growth team) and one measure (top-of-funnel conversion). Audited in is/ought terms, three boundary judgments show real gaps: the beneficiary is the funnel metric, not the people the product is for (motivation); the decision sits with growth, while the support and existing-customer-success functions who absorb the consequences are outside the decision environment (power); and the worldview treated as authoritative is "users are a funnel," which has no standing for the free-tier users themselves or for existing paying customers (legitimacy). The most consequential affected-but-excluded parties are existing paying customers, whose support and roadmap attention degrade as free-tier volume floods in, and free-tier users, who are framed as conversion fuel rather than people getting a job done. **This audit surfaces those boundary questions; it does not decide whether to launch the free tier.** It hands the growth-versus-existing-revenue and the user-as-funnel gaps to a decision step, with the excluded parties now on the table.

## The four sources (is vs ought)

| Source (boundary question) | Is (how the frame draws it now) | Ought (how it should) | Gap |
|---|---|---|---|
| **Motivation - who benefits** | The beneficiary is the *growth team's PLG metric*; the purpose is more signups; success is qualified-conversion rate. The "improvement" is the company's funnel, full stop. | The beneficiary should include the *people the product serves* - free-tier users getting real value, and existing customers whose experience funds the company. Success should be measured net of harm to them, not just funnel lift. | **Large.** The frame optimizes the company's growth number and silently treats users (free and paying) as inputs to it, not as parties whose improvement is the point. |
| **Power/control - who decides** | The growth/PLG team decides; pricing and funnel design are under their control. Support capacity, existing-customer success, and infra cost-to-serve are treated as the *environment* - outside the decision. | The functions who absorb the consequences (support, customer success, finance/cost-to-serve) should have a real seat, because the decision spends *their* capacity and budget, not only growth's. | **Large.** The people who decide are not the people who bear the cost; the decision externalizes load onto functions with no vote. |
| **Knowledge - whose expertise counts** | Growth-modeling and conversion-analytics expertise is authoritative. The assumed guarantor of success is "the model says signups go up." | Front-line support knowledge (what flood-of-free-users actually does to response times) and existing-customer-success knowledge (what attention shifts away from renewals) should count. The model is a *false guarantor* if it omits cost-to-serve and churn of paying accounts. | **Moderate-to-large.** The expertise admitted is the expertise that supports the launch; the expertise that would surface its costs is outside the frame. |
| **Legitimacy - who has standing** | The authoritative worldview is "users are a funnel; more top-of-funnel is better." Standing belongs to whoever moves the growth metric. | Free-tier users (as people doing a job, not leads) and existing paying customers (whose service quality is at stake) should have standing. Someone must witness for both, since neither is in the room. | **Large.** No one currently witnesses for the affected-but-excluded; the funnel worldview has no category for "a free user who is treated as fuel" or "a paying customer who quietly gets worse service." |

## Affected-but-excluded

| Affected-but-excluded party | Stake in the consequences | Who (if anyone) witnesses for them now |
|---|---|---|
| **Existing paying customers** | Support response times and roadmap attention degrade as free-tier volume floods in; they fund the company but were never part of the free-tier decision. | No one - the frame counts new logos, not the experience of current ones. (Customer success could, if given a seat.) |
| **Free-tier users (as people, not leads)** | Framed as conversion fuel; their actual job-to-be-done and their experience are instrumental to the metric, not an end. | No one - the funnel worldview has no standing for them except as a conversion rate. |
| **The support / on-call team** | Absorbs the load the decision creates (ticket volume, off-hours pressure) with no vote and no budget adjustment in the frame. | No one in the decision; their capacity is treated as free environment. |
| **Finance / cost-to-serve owner** | Infra and support cost-to-serve of a large free base hits a budget the growth metric does not see. | Partially - only if cost-to-serve is forced into the model rather than left in the environment. |

## What this audit does NOT do

- **It surfaces the boundary question; it does not adjudicate it.** Whether Northwind *should* launch the free tier is still open. What the audit establishes is that the current frame answers "whose improvement, decided by whom, on whose knowledge, with whose standing" in a way that excludes the parties who bear the cost - so a launch decision made inside this frame would optimize the funnel while externalizing harm onto existing customers, free users, and support.
- **Onward route:** take the widened frame to `think-decision-option-review` - compare "launch as framed", "launch with a cost-to-serve and existing-customer-experience guardrail", and "do not launch" *with the excluded parties' stakes now scored*, so the choice is made under the real boundary rather than the tidy one. The audit informs that decision; it is not the decision.

---

*Note how the value is in auditing the frame's membership rather than reasoning inside it: an unaided pass would have helped *design* the free tier to maximize the PLG metric - accepting the frame's beneficiary (the funnel) and its measure (conversions) as given. The skill took the stakeholder set itself as the suspect object, contrasted who the frame counts (is) against who it ought to, and surfaced the parties outside the line - existing paying customers, free users-as-people, support - whom a stakeholder walk-through of the in-scope team could never have reached. It did not decide the launch; it made sure the launch would not be decided for a tidy problem at the excluded parties' expense.*
