---
title: Fishbone / Ishikawa
slug: fishbone-ishikawa
generated_status: true
---

<!-- STATUS:GENERATED (gen-site.mjs from frameworks/registry.mjs) - do not edit between these markers -->
<!-- /STATUS:GENERATED -->

## What it is

The fishbone diagram (Ishikawa diagram, cause-and-effect diagram, herringbone diagram) takes one observed effect - a defect, a failure, a recurring problem - writes it at the "head" of the fish, and branches candidate causes off a spine. The defining move is not the fish picture; it is that the cause-brainstorm is scaffolded by a **fixed checklist of cause categories** so the team enumerates contributing factors by category instead of free-associating. The canonical category sets are domain templates: the manufacturing **6Ms** (Manpower/Mindpower, Machine, Material, Method, Measurement, Milieu/Environment), the marketing/service **8Ps** (Product, Price, Place, Promotion, People, Process, Physical evidence, Performance), and the service **4-5Ss** (Surroundings, Suppliers, Systems, Skill, Safety). Each major bone is a category; sub-bones are the specific causes under it; the analyst can drill a bone further to push toward a root cause. The deliverable is a labeled branching diagram of one effect decomposed into candidate causes grouped by category.

Structurally this is a tree: one root (the effect, phrased as "what causes X?") split top-down into a set of category branches, recursed until the leaves are specific enough to test. The element that distinguishes it from a generic decomposition is the **pre-supplied, domain-standard split axis** (6M / 8P) - a recall prompt that nudges coverage of categories a free brainstorm tends to forget (people remember "Method" and "Machine," forget "Measurement" and "Milieu").

## When it helps / when it misleads

It helps when a team faces one well-defined effect and wants a broad, category-organized sweep of candidate causes before narrowing - a structured alternative to unstructured cause-brainstorming, and a deliberate widening of the linear Five-Whys when more than one cause may be at work. It is most useful in or near its origin domain (manufacturing, operations, quality, incident review) where the 6M / 8P categories actually map to the system.

It misleads or wastes effort when:

- **The categories are taken as the analysis rather than a prompt.** The 6M list is manufacturing-shaped; forced onto a non-operational problem it manufactures tidy-but-empty branches. The diagram generates relevant *and* irrelevant causes (the PMC tutorial flags this directly), and acting on a plausible-looking but untested branch is the core failure mode.
- **The problem is genuinely systemic with interacting causes.** A fishbone shows causes as independent parallel branches; it cannot represent feedback or interaction between causes. The broader root-cause-analysis critique (Peerally et al.; Card) - that RCA tools favor a reductionist narrative over a systems view - applies: where causes loop or compound, a feedback model is the right tool, not a fan of independent bones.
- **It is treated as having found "the" root cause.** It surfaces *candidate* causes; it does not test or rank them. Value emerges only when branches are checked against data, which the diagram itself does not do.
- **Replicability matters.** The bone structure depends on the investigator's knowledge; different teams produce different diagrams of the same problem (a documented weakness), so the output is a hypothesis-generation aid, not a reliable diagnosis.

## What the evidence says

The honest grade is **P (practitioner)**, and the dossier is deliberate about how thin the effectiveness base is.

**What the record supports.** Fishbone is one of the most widely taught and widely adopted tools in quality management - it is one of Ishikawa's seven basic quality tools and is carried by ASQ, the IHI, CMS, and standard Six Sigma curricula. As a *structured idea-generation and organization* aid for causes, its mechanism is plausible and its adoption is real and long-standing. That is the whole of the well-supported claim: it is a useful, durable practitioner method for organizing a cause-brainstorm.

**What the record does NOT support.** There is **no controlled or comparative study** I can locate showing that drawing a fishbone improves the accuracy of cause identification or problem-solving outcomes versus unstructured brainstorming, a plain list, or any other tool. The teaching literature is exactly that - tutorials and uncontrolled single-site case studies (for example the PMC article's needlestick case: 11 cases in 2018 to 2 in 2021, with no control, no baseline modeling, and no way to attribute the change to the diagram). A widely-repeated claim that fishbone use yields "~30% fewer repeat nonconformities" surfaced in search aggregation with **no nameable primary source**; per this library's evidence rule it is excluded and may not influence the tier - stated here so the absence is on the record, not laundered into a number. The one rigorous, nameable finding cuts *against* over-reliance: Antony, McDermott and Sony's global survey of quality professionals found roughly 40% reported having applied the seven basic tools incorrectly, and under a quarter believed the seven tools could solve more than 95% of quality problems - i.e., the tool is frequently misapplied and is not a general solver.

**Transfer caveat (required).** Every bit of this evidence is from human practitioners in manufacturing, quality, and healthcare settings. None of it studies a fishbone produced by or with an AI agent. The evidence is transferred from human contexts and not validated for AI-augmented use; the conservative governing grade is therefore **P**, not higher. There is no S- or M-tier research on this move to borrow from, so there is not even an optimistic half to cap - the grade is P on its own merits.

## Why it is / is not a skill here

Verdict: **Fold into `issue-tree`.** This overturns the catalog's prior `cand / build / P` tag (which framed fishbone as "the recommended multi-cause upgrade to Five-Whys"); the concrete reason for the overturn follows.

The Build burden of proof is to name a distinct, durable cognitive move that no shipped skill produces. Fishbone's move is "decompose one observed effect, top-down, into a labeled branching set of candidate causes, then drive to the material ones." That is, mechanically, **issue-tree** with the root fixed to "what causes effect X?" The shared working machinery - one root, a top-down split into labeled branches, recursion to testable leaves, prune to what matters - is essentially identical; this is far above the ~20% overlap ceiling, not below it. `think-issue-tree` already claims exactly this use case in its own description ("multi-cause to answer as posed, for example 'why is churn rising?'") and its instructions explicitly allow splitting "by cause type" and adding an explicit remainder branch for coverage.

The only genuinely fishbone-specific ingredient is the **canned category axis** (6M / 8P). But issue-tree's step 2 already asks the user to *choose and justify the top-level split axis*; fishbone simply hard-codes that axis to a domain-standard checklist. A preset for an existing parameter is a mode of a skill, not a new skill: a fishbone with a custom axis just *is* an issue-tree on causes, and a fishbone with the 6M axis is an issue-tree run with a preset whose categories are often a poor fit outside manufacturing. The category checklist's value - reducing omission - is the same value issue-tree's MECE-plus-remainder discipline already targets, so it does not even add an orthogonal benefit. Fold the 6M/8P category-checklist as an optional cause-decomposition preset of issue-tree rather than shipping a near-twin.

Why `issue-tree` and not the other neighbors:

- **vs `iceberg-model` (the other causation tool):** different geometry. Iceberg descends *vertically* through four fixed depth-levels (event -> pattern -> structure -> mental model) to find leverage; fishbone fans *laterally* across parallel cause categories at one level. Fishbone has no depth-ladder and no mental-models rung; iceberg has no category breadth. The mechanical match for a lateral branching cause-tree is issue-tree, not iceberg.
- **vs `five-whys` (the obvious relative):** five-whys is a *linear single-chain* cause trace and is the opposite of fishbone's lateral breadth - but it is `flag / not shipped`, so it is ineligible as a fold target regardless. The registry's "multi-cause upgrade to Five-Whys" framing is accurate as a relationship but does not by itself earn a standalone skill; the upgrade it describes (breadth over a single chain) is what issue-tree already provides.
- **vs `causal-loop-diagrams`:** CLD models feedback between causes; fishbone treats causes as independent. They are complementary, not duplicative, but that distinctness is CLD's, not fishbone's.

The learning value of this decision: a famous, ubiquitous, genuinely useful tool can still be a fold. Fishbone's fame is its packaging (the fish, the 6M mnemonic), not a distinct cognitive move - the move is branching cause-decomposition, which the library already ships as issue-tree. Folding it keeps the catalog honest and lets issue-tree absorb the one transferable asset (the category checklist) as a preset.

## Lineage and who to read

The diagram is **Kaoru Ishikawa**'s (1915-1989), professor at the University of Tokyo, father of the quality-circle movement, and one of the founders of modern quality management. He first used cause-and-effect diagrams to analyze factory problems in the 1940s-1960s (commonly traced to Kawasaki / shipbuilding-era quality work) and codified the diagram as one of the seven basic quality tools in his *Guide to Quality Control* (Japanese 1968; English translation Asian Productivity Organization, 1976/1986). For the practice, read Ishikawa directly and the ASQ reference; for the honest limits, read Antony, McDermott and Sony (2021) on how often the seven tools are misapplied, and Card (2017) plus Peerally et al. (2017) on why temporally- and reductively-framed root-cause tools understate systemic, interacting causes. "Ishikawa diagram," "fishbone diagram," and "cause-and-effect diagram" are generic descriptive terms in common use - no trademark, no attribution required beyond crediting Ishikawa - which is why this entry is documented descriptively and is not flagged as branded.

### Named sources

- Kaoru Ishikawa, *Guide to Quality Control* (Asian Productivity Organization; Japanese orig. 1968), the codification of the cause-and-effect diagram as one of the seven basic quality tools. Practitioner/foundational.
- ASQ, "What is a Fishbone Diagram? (Ishikawa / Cause-and-Effect Diagram)." Practitioner reference; documents the 6M categories and standard use. (P)
- Wong, K.C. et al., "Cause-and-Effect (Fishbone) Diagram: A Tool for Generating and Organizing Quality Improvement Ideas," PMC11077513 (2024). Teaching article with one uncontrolled case study; explicitly notes the diagram can generate irrelevant as well as relevant causes. No comparative evidence. (P)
- Jiju Antony, Olivia McDermott and Michael Sony, "Revisiting Ishikawa's Original Seven Basic Tools of Quality Control: A Global Study and Some New Insights," *IEEE Transactions on Engineering Management* (2021). Global survey: ~40% of quality professionals reported applying the seven tools incorrectly; under 25% believed they could solve >95% of quality problems. The nameable evidence, and it bounds over-reliance. (P, survey)
- Alan J. Card, "The problem with '5 whys'," *BMJ Quality & Safety* 26 (2017): 671-677. Argues temporally/linearly framed root-cause tools impose a flawed single-cause narrative; context for why fishbone's lateral breadth is an "upgrade" to five-whys but still not a systems model. (Critical literature)
- M.A. Peerally, S. Carr, J. Waring, M. Dixon-Woods, "The problem with root cause analysis," *BMJ Quality & Safety* 26 (2017): 417-422. RCA tools conflict with systems thinking by seeking a small number of root causes; bounds fishbone's claim to find "the" cause. (Critical literature)

> Excluded on the evidence rule: the widely-quoted "~30% reduction in repeat nonconformities" figure traces to no primary source and is not counted toward the grade.
