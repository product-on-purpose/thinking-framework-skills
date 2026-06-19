---
title: "Speculative Harms and Anti-Goals - quick sample"
description: An anti-goals register for a city's smart-streetlight sensor program, assuming the rollout succeeds and asking who that success harms outside the customer relationship.
sidebar:
  label: speculative-harms-anti-goals
---

> A compact worked example of [Speculative Harms and Anti-Goals](../../frameworks/think-speculative-harms-anti-goals/) on a realistic situation. For full end-to-end narratives see the [Showcase](../../showcase/); for the evidence behind the method see its [framework page](../../frameworks/think-speculative-harms-anti-goals/).

## Situation

Priya, a policy analyst at a city agency, is reviewing a "smart streetlight" program: streetlights fitted with cameras, microphones, and pedestrian-and-vehicle-counting sensors, marketed as a way to time traffic signals, detect outages, and plan transit. The vendor's risk review is entirely about uptime, budget, and procurement. Nobody has asked who gets hurt if the network works exactly as sold and reaches every block, or who would repurpose a city-wide sensor grid on purpose. The contract is hard to unwind once signed, so Priya wants the third-party harms surfaced and bound into the requirements before the council votes.

## Prompt

```
/think-speculative-harms-anti-goals "We're about to approve a city-wide smart-streetlight network -
cameras, mics, and people-counting sensors on every pole, sold for traffic timing and outage
detection. Our risk review only covers uptime and budget. Assume it works and covers the whole city.
Who outside the program gets harmed, who would weaponize it on purpose, and what must this system
never be allowed to do? Give me anti-goals I can bind into the procurement requirements."
```

## The artifact

> **Anti-Goals Register - Smart-Streetlight Sensor Network**

> **Evidence caveat (ships with the artifact by construction).** This register is the output of an anecdotal-tier (A) design-ethics practice. There is no controlled or comparative evidence that dystopian narration improves harm anticipation, for this method or any of its genre siblings; the strongest study measures instructor perceptions of a teaching exercise, not whether teams ship safer products. All evidence is transferred from human classrooms and workshops - nothing studies an AI agent running the move. Treat this register as a structured elicitation that forces a discipline (assume success, cast the victims and the exploiters, convert each harm to a constraint), NOT as a complete harm inventory and NOT as a security-coverage guarantee. The value is in the bound constraints, not in a count of harms found.

---

## Focal design and success anchor

- **Focal design:** A city-wide smart-streetlight network - cameras, microphones, and pedestrian-and-vehicle-counting sensors on every pole, feeding a central platform sold for traffic-signal timing, outage detection, and transit planning.
- **Success anchor:** It works. The sensors are reliable, coverage reaches every block including residential streets, the data platform is rich and queryable, and the city and its partners come to depend on it. The harms below arrive *because* the grid is complete and the data is good, not because the rollout stalls.
- **Why this method (not a premortem):** The worry is not whether the deployment runs over budget or the sensors fail - that is a premortem. The worry is that a complete, reliable, city-wide sensing grid becomes a tool for harm against residents and passers-by who never opted in and were never the customer. A premortem cannot see this, because the plan did not fail.

## Anti-goals register

| # | Harm narrative (a concrete near-future scene) | Harmed parties (incl. non-users) | Misuse actor and pathway | Anti-goal (the design must never ...) | Design implication (requirement / default / gate) |
|---|---|---|---|---|---|
| 1 | A detective with a hunch, no warrant, queries the platform for every camera that saw a particular face near a protest, then reconstructs where that person went all evening and who they walked with. The grid built for traffic timing is now a retroactive movement-tracking tool for anyone with a login. | Protesters, journalists, and ordinary residents whose movements are reconstructed; anyone who walked past a pole and never consented to be a customer of the city. | Hostile or overreaching law enforcement / internal user. Pathway: ad-hoc face-or-plate query across the retained footage archive with no warrant gate and no audit. | ...let any operator reconstruct an identifiable person's movement history across the network, or retain raw footage long enough for retroactive tracking. | Raw video/audio purged within a short fixed window (e.g. 72 hours); only aggregate counts retained long-term; identity queries require a logged warrant and are technically gated. Lands as a data-retention requirement + a query-access review gate in the procurement spec. |
| 2 | A domestic-violence offender works for a city contractor with platform access and uses live camera and presence data to learn his ex-partner's daily route to the shelter, then intercepts her. The system made a vulnerable person's real-time location free and invisible to her. | A named non-user being surveilled (never a "user" of the streetlights); residents of shelters and clinics whose patterns are exposed. | Abusive ex / insider with access. Pathway: live feed and location query available to a broad pool of city and contractor staff with no need-to-know scoping or access logging. | ...expose any individual's real-time location or live feed to a broad internal pool, or operate without per-access logging and need-to-know scoping. | Live access restricted to a small audited role, every access logged and reviewable, geofenced sensitive sites (shelters, clinics) excluded from identity-level query. Lands as an access-control requirement + an insider-misuse review gate. |
| 3 | The microphones, added for "gunshot detection," are quietly capable of capturing speech on sidewalks and front porches. A future administration enables transcription and starts flagging keywords, turning every block into an open-air listening post that residents cannot opt out of. | Every resident and passer-by within mic range; people having private conversations on public sidewalks and their own porches. | Authoritarian / mission-creep administration. Pathway: a latent audio-capture capability re-purposed by policy change with no hardware or contractual limit preventing it. | ...deploy a microphone capable of capturing or transcribing human speech, or build any capability whose later activation needs only a policy change rather than a hardware change. | Acoustic sensors limited by hardware to non-speech detection; no general audio retention; any speech-capture capability requires physical hardware change plus public council approval. Lands as a hardware-specification requirement + a contractual capability ceiling. |
| 4 | A data broker buys or pries loose the "anonymized" pedestrian-count feeds and re-identifies individuals by joining the fine-grained movement patterns with other datasets, selling location profiles of people who never touched the system. The platform's richness is the supply. | Residents re-identified from "anonymous" counts; non-users whose patterns are inferred and sold. | Data broker / re-identification attacker. Pathway: bulk export or breach of fine-grained spatiotemporal data that is re-identifiable when joined with external sources. | ...produce or export movement data fine-grained enough to re-identify individuals when joined with outside datasets, or permit bulk export to third parties. | Spatial/temporal aggregation coarse enough to defeat re-identification, no third-party data sharing without public review, contractual ban on vendor resale of any derived data. Lands as a data-minimization requirement + a sharing-prohibition clause in the contract. |
| 5 | To "optimize" deployment, the platform's analytics steer more cameras and police attention to neighborhoods that already generate the most sensor activity, hardening a feedback loop that over-surveils the same low-income and minority blocks across the whole city. | Residents of over-surveilled neighborhoods, disproportionately low-income and minority; non-users subjected to heavier scrutiny by where they live. | Non-adversarial externality (no bad actor; the harm is the optimization target and the feedback loop itself at scale). | ...allocate sensing or enforcement attention by a metric that reinforces existing surveillance disparities across neighborhoods. | Deployment and analytics audited for geographic and demographic disparity before and after rollout; an equity criterion in the allocation spec. Lands as an acceptance criterion on the analytics platform + a pre-deployment equity audit. |

## Anti-goals (consolidated)

The standing design constraints this register commits the city to, regardless of how the rollout performs:

- **Anti-goal 1:** The system must never let an operator reconstruct an identifiable person's movement history, and must never retain raw footage long enough to make retroactive tracking possible.
- **Anti-goal 2:** The system must never expose an individual's real-time location or live feed to a broad internal pool, or operate without per-access logging and need-to-know scoping.
- **Anti-goal 3:** The system must never deploy a microphone capable of capturing human speech, or build a capability whose later activation needs only a policy change rather than a hardware change.
- **Anti-goal 4:** The system must never produce or export movement data fine-grained enough to re-identify individuals, and must never permit bulk export or vendor resale.
- **Anti-goal 5:** The system must never allocate sensing or enforcement attention by a metric that reinforces existing surveillance disparities across neighborhoods.

## Binding line (where these live - not theater)

Each anti-goal is carried forward into the procurement package, not left beside it: anti-goals 1 and 4 become data-retention and data-minimization requirements in the technical spec with the retention window and aggregation level written as testable acceptance criteria; anti-goal 2 becomes an access-control requirement with mandatory logging; anti-goal 3 becomes both a hardware-specification requirement and a contractual capability ceiling the vendor signs. Anti-goal 5 becomes an acceptance criterion on the analytics platform plus a pre-deployment equity audit. A standing surveillance-and-privacy review gate is the single checkpoint where all five are verified before any pole goes live and at each capability change. If the council cannot bind these into the contract, that is a signal the program is not ready to approve, not a detail to settle later.

## What this register is not

- **Not a premortem.** It did not look for ways the rollout fails to deliver; it assumed the grid works city-wide and found who that success harms outside the program.
- **Not an incident analysis.** Every harm here is speculative and forward-looking. If the city already had a documented misuse incident, that belongs in incident analysis and remediation, not in this fiction.
- **Not a security threat model.** Five narrated harms are an elicitation, not an enumeration of the abuse surface. A structured decomposition would find more (Opdahl and Sindre, 2009); this register is the warm-up that motivates building one for the highest-stakes anti-goals.

## Why this framework fits

The cognitive job here is to break out of a project-centric risk review that only sees uptime and budget, and force the question that risk review is structurally blind to: when this grid works perfectly and covers every block, who outside the program gets hurt and who weaponizes it on purpose. The artifact converts those speculated harms into standing design refusals bound into the procurement contract - constraints unaided "what could go wrong" thinking rarely produces, because it stays focused on the plan rather than the people the successful plan harms.
