# Concept Map - Worked Example

A completed run of `think-concept-mapping`, on the shared Northwind scenario. This is the quality bar a generated map should meet.

> Northwind is a B2B SaaS weighing a self-serve free-tier launch. The team has a pile of beliefs about how the free tier connects to growth, cost, and sales, but nobody has laid out how those concepts actually relate. This map externalizes the relationships and tests each one as a proposition.

---

## Focus question (optional)

- How does a self-serve free tier relate to Northwind's growth, costs, and sales motion?

## Concepts

- **Cluster A (Acquisition / growth):** free tier, signup volume, activation, paid conversion, customer base, word-of-mouth
- **Cluster B (Cost / capacity):** support load, infrastructure cost, gross margin, free-user count
- **Cluster C (Sales motion):** self-serve, sales-assisted motion, enterprise deals, sales team capacity

## Propositions (labeled links)

| Source concept | Linking phrase (named) | Target concept | Reads as a sentence |
|---|---|---|---|
| free tier | increases | signup volume | The free tier increases signup volume. |
| signup volume | feeds | activation | Signup volume feeds activation. |
| activation | drives | paid conversion | Activation drives paid conversion. |
| paid conversion | grows | customer base | Paid conversion grows the customer base. |
| free tier | grows | free-user count | The free tier grows the free-user count. |
| free-user count | increases | support load | A larger free-user count increases support load. |
| free-user count | increases | infrastructure cost | More free users increase infrastructure cost. |
| support load | erodes | gross margin | Support load erodes gross margin. |
| free tier | enables | self-serve | The free tier enables a self-serve motion. |
| self-serve | reduces reliance on | sales-assisted motion | Self-serve reduces reliance on the sales-assisted motion. |
| customer base | generates | word-of-mouth | The customer base generates word-of-mouth. |
| word-of-mouth | increases | signup volume | Word-of-mouth increases signup volume (a loop back into Cluster A). |

## Cross-links (across clusters)

| Source (cluster) | Linking phrase | Target (cluster) | Why this cross-link matters |
|---|---|---|---|
| free-user count (B) | dilutes | paid conversion (A) | Names a tension the rosy growth chain hid: a flood of free users can lower the *conversion rate* even as raw signups rise. |
| support load (B) | competes for | sales team capacity (C) | If support is partly staffed by the same people, free-tier load steals capacity from enterprise deals - links cost to the sales motion. |
| self-serve (C) | weakens | enterprise deals (C->A) | A strong self-serve path can cannibalize higher-ACV sales-assisted enterprise deals, not just add to them. |

## Surfaced gaps, missing links, and questionable propositions

- **Under-connected concepts (gaps):** "gross margin" connects only inward (support load erodes it) and nothing downstream - the map never links margin to a decision or to runway, so the cost side is described but its consequence is not. "enterprise deals" is barely connected, which means the map under-represents the high-value sales motion the free tier might threaten.
- **Missing links:** there is no link from "paid conversion" or "customer base" back to "gross margin" or revenue - the map traces how the free tier creates *cost* but never closes the loop on how it creates *value*, so any read of net effect is currently unsupported. Add a "paid conversion -> increases -> revenue -> supports -> gross margin" path before concluding.
- **Questionable propositions:** "free tier - increases - signup volume" is safe, but the *implied* chain "free tier therefore grows customer base" rests on "activation - drives - paid conversion", and the cross-link "free-user count - dilutes - paid conversion" directly contests it. That contested junction (does the free tier net-grow paid customers, or just inflate free signups and conversion drag?) is the real open question, and it was invisible until every link had to be named.

---

*Note: the value is not a prettier diagram. Forcing each line to be a named proposition turned a vague "the free tier will grow us" belief into a network with a contested junction (dilution vs conversion) and an unclosed value loop (cost is mapped, value is not). Those two findings are the gap list, and they hand the team a sharper next question than the prose ever did. The map judges nothing about whether to launch - that decision work routes to a decision skill; this only makes the relationships inspectable.*
