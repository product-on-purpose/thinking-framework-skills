# Core concepts

Orientation for a reader of this repo. Four ideas hold the library together. This page summarizes each and links the canonical, fuller version on the docs site. Read the site pages when you want the full argument; read this when you want the shape.

## 1. Honest evidence grading

The field of thinking tools is a small empirical core wrapped in a large practitioner ring and a weak outer ring. Most collections flatten that into uniform confidence. This one labels which is which, on every skill and every claim. Each skill carries one of seven tiers:

| Tier | Meaning |
|---|---|
| S | Strong research - replicated experimental or meta-analytic support. |
| M | Moderate - real evidence, but narrower, correlational, or field-based. |
| P | Practitioner - widely used and defensible, without strong controlled evidence. |
| V | Vendor / commercial - originates from a consultancy or branded methodology. |
| A | Anecdotal - case reports and testimonials. |
| C | Conceptually plausible, under-tested - reasonable, not yet demonstrated. |
| X | Poor or contradictory - the evidence cuts against it (excluded, documented). |

A "P, useful anyway, here is when not to use it" is more trustworthy than a dressed-up "S". The grade reflects the evidence for the framework's mechanism, and most of that evidence comes from human-subject studies rather than tests of an AI agent running the method, so pages flag transferred evidence where it applies. Honest grading is the product, not a footer disclaimer. Full version: [The evidence model](https://product-on-purpose.github.io/thinking-framework-skills/start/evidence-model/).

## 2. Mechanism over ritual

Each skill implements a durable cognitive move and is named for what the move does, not for the trademark wrapped around it. Parallel Perspectives Review is the move of examining a decision through separated lenses; Six Thinking Hats is one branded ritual on top of it. Naming the mechanism keeps the catalog small enough to choose from, lets one move absorb its near-duplicates instead of spawning a card per brand, and makes the evidence question answerable: you grade a mechanism, not a logo. The branded method is lineage, not the headline.

## 3. Artifact, not prose

Every skill emits a named, structured, reusable deliverable: a ranked risk register, a weighted option matrix, an assumption ledger, an argument map. The artifact is the point, not a feeling that you thought carefully. The agent makes the mechanism cheap to run and enforces the structure; the output is something you can carry into the next decision.

## 4. The "when NOT to use" commitment

Every skill states explicitly where its method misleads or wastes effort. This guards against cargo-cult execution, running a framework because it is there rather than because the move fits the problem. A skill that knows its own limits is more useful than one that claims to fit everything.

These four are the authoring commitments behind every skill. The full argument, including the empirical-core anchor skills, is in [Philosophy](https://product-on-purpose.github.io/thinking-framework-skills/about/philosophy/). To author a skill that meets all four, see [./internal/AUTHORING.md](./internal/AUTHORING.md); the skills themselves live in [../skills/](../skills/) and are the source of truth the docs site is generated from.
