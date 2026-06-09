# Frame Proposal - Worked Example

A completed run of the `frame-creation` skill on a real, consequential decision. This is the quality bar a generated frame proposal should meet.

> Uses the shared recurring scenario (Northwind, a B2B SaaS weighing a self-serve free-tier launch) so examples across skills read as one coherent product. Where `abstraction-laddering` relocated *what altitude* to work the free-tier problem at, and `contradiction-resolution` tried to dissolve the generous-vs-limited trade-off, this skill steps back further: it treats the stuck framing of the free tier itself as the obstacle and abduces a new standpoint for what the free tier *is*. See `docs/internal/AUTHORING.md`.

---

## Problem under reframing

- **Problem as given:** "We're launching a self-serve free tier and we keep fighting about it. Marketing wants it big to drive signups, sales wants it small to protect deals, finance wants to model the conversion rate. Every plan we draw up is a worse version of the paid product, and nobody's excited by any of them."
- **How it arrived / who framed it:** Brought by leadership as a growth lever, and framed by everyone since as an **acquisition funnel** - a free plan whose job is to capture signups and convert a percentage to paid. The fight is over the dial settings of that funnel.
- **What solving inside that frame has already tried (and how it failed):** Three rounds of "where do we draw the line" - feature gates, usage caps, trial lengths. Each round produces a cut-down paid product and a fresh argument about cannibalisation. Conversion projections swing wildly because nobody can say why a stripped-down tool would make anyone want the full one. The symptom (a joyless, contested plan that excites no one) persists across every version. The acquisition-funnel frame is the obstacle, not the dial settings.

## Summary (top of the artifact)

The team has framed the free tier as an acquisition funnel and is stuck arguing about its dials. Exploring the broader context - what actually makes someone champion a B2B tool internally - the themes are that adoption is social (a person who loves a tool drags their team onto it), that trust is earned by being useful before being paid, and that the free users who matter are not "leads" but *future hosts* of the product inside their org. The core paradox the funnel frame can't resolve: the free tier must give away real value (to create advocates) yet withhold value (to protect revenue). The value actually sought is **a population of internal champions who pull Northwind into their companies**. Reframe: **approach the free tier as if it were the hospitality of a great host welcoming a guest**, not a funnel metering a lead. That standpoint *generates* its own directions - make the solo user genuinely successful and proud, equip them to bring others in, and earn the upgrade as the natural next step of a relationship rather than a paywall. This is a standpoint to develop and test, not a proven plan; the smallest test is whether early free users actually invite teammates.

## Broader context explored

Looked around the problem rather than at the dial. How do B2B tools actually get into companies? Overwhelmingly bottom-up: one person tries something, succeeds with it, and becomes the person who advocates for it in meetings, onboards colleagues, and defends the renewal. The "buyer" is often downstream of that champion. What makes someone a champion is not that they were converted by a feature gate - it is that the tool made them look good and feel capable, and that bringing others in was easy and rewarding. Northwind's own best paid accounts, asked how they started, mostly trace back to one early enthusiast. Meanwhile the free tier had been designed entirely around the *company's* funnel metrics and not at all around that one enthusiast's experience.

## Themes distilled

- **Adoption is social, not transactional.** Value spreads through a person who loves the tool and pulls their team in, not through a conversion event. The unit that matters is a future host, not a captured lead.
- **Trust is earned by being useful before being paid.** People champion tools that helped them first; a relationship that starts by metering and withholding starts on the wrong foot.
- **The withholding instinct is fighting the growth instinct.** Designing the free tier to *protect* revenue makes it worse at the very thing (creating advocates) that produces revenue.
- **Pride and capability travel.** The free user advocates because the tool made them effective and made them look good - not because they hit a wall.

## Core paradox and value sought

- **Core paradox:** the free tier must **give away real value** (to create genuine advocates) and **withhold value** (to protect paid conversion) at the same time. Inside the funnel frame these pull against each other on a single dial, which is why every "where's the line" round reproduces the fight. (Used here as the signal that the funnel frame has failed, not as the thing to solve head-on.)
- **Value actually sought:** a growing population of **internal champions** who succeed with Northwind and pull their teams and companies onto it. Signups and conversion rate are downstream proxies; the real prize is advocacy that originates inside target accounts.

## The new frame (abduced working principle)

- **Reconception:** approach the free tier **as if it were the hospitality of a great host welcoming a guest** - not an acquisition funnel metering a lead. A good host makes the guest genuinely comfortable and capable first, makes it natural and delightful to bring friends, and lets the deeper relationship (paying, scaling) grow from a good first experience rather than from a barrier.
- **IF / THEN:** **IF** we treat the free tier as hospitality - a host making a guest successful and equipped to bring others - **THEN** we create the population of internal champions who pull Northwind into their companies (the value actually sought).
- **What this changes:** this is **not** a funnel-tuning problem ("how stingy is the free plan"), it is a **hospitality** problem ("how do we make a solo user successful, proud, and eager to bring their team"). The question stops being *where to draw the line* and becomes *what makes a great first stay and a natural invitation*. The generous-vs-limited dial that `contradiction-resolution` wrestled with largely dissolves, because withholding is no longer the lever - a host does not win by rationing.

> Check: Y ("hospitality / great host") is earned by the distilled themes (social adoption, trust-before-payment, pride-that-travels), not free-associated. It changes the *problem* (funnel -> hospitality), not just the solution. And it is adoptable: "make free users successful and bring their teams" is a standpoint marketing, sales, and finance can all get behind far more readily than a contested dial. Frame is ready to develop.

## Solution directions the frame unlocks

Derived *forward* from the hospitality frame - what becomes obvious once a free user is a guest to be made successful, not a lead to be metered. (Note these are generated by the frame; they are not "things festivals/hotels do" copied across.)

- **Design the free tier around one person's complete success, not a cut-down product.** The solo workflow should reach real first value with real data and no time bomb - because a guest who succeeds is the entire engine. "Limited" stops meaning "crippled" and starts meaning "scoped to one person."
- **Make bringing the team in the marquee feature, not the paywall.** Invitations, shared workspaces, and "show a colleague" should be the easiest, most rewarding actions in the product - the host helping the guest bring friends. Team and admin/scale capabilities become what you grow *into* together, which is also what gets paid for.
- **Earn the upgrade as the next step of a relationship.** Prompt to paid at the moment the champion is succeeding and wants to bring their org along (the natural "your whole team should be here"), not at an artificial gate. Conversion becomes the continuation of hospitality, not its interruption.
- **Re-instrument success metrics around advocacy.** Track "did this free user invite a teammate / champion internally," not just "did they convert," because the frame says champions are the asset. This also gives sales a warm signal (an active internal advocate) instead of a cold lead list.

## Status

**This is a standpoint to develop and test, not a proven answer.** The hospitality frame is a promising reconception, not a validated plan, and it could fail two ways the skill warns about: a *frame-failure* if finance will not fund a genuinely generous solo tier (then the funnel frame reasserts itself), and *goal-reformulation drift* if "delight the guest" quietly replaces "create paying champions" as the goal. The smallest thing that would confirm or break the frame: ship a generous solo tier to a small cohort and measure whether free users actually invite teammates and champion internally - if they do, the frame is generating the value sought; if they don't, the hospitality reconception is wrong for this product and the team should fall back to a deliberately-chosen funnel via `think-decision-option-review`.

---

*Note how the value is in re-seeing the problem, not optimising it: the problem arrived as "tune the free-tier funnel," and an unaided pass - like the three rounds the team already ran - would have proposed another set of gates and caps. Frame creation explored the broader context, distilled why B2B tools really spread, named the value (champions) and the paradox (give away vs withhold), and abduced a standpoint ("as if it were hospitality") that redefined the problem and generated solution directions native to it - directions a funnel frame structurally cannot produce. It is distinct from listing solution analogies: nothing here was copied from how hotels or hosts operate; the frame changed what the free tier IS, and the directions fell out of that.*
