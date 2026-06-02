# Evidence Dossier: Concept Mapping

> The single source of truth for the `concept-mapping` skill. The `SKILL.md`, the
> sidecar, and the eval cases all derive from this file. If a claim is not here, it does
> not belong in the skill.

| | |
|---|---|
| **Skill** | `thinking-framework-skills.concept-mapping` (installable name `think-concept-mapping`) |
| **Family** | synthesis |
| **Evidence tier** | **M/P** (moderate-to-practitioner for the transferable claim; see the scope note below) |
| **Confidence** | High that the construction move works and that a large human meta-analytic base exists; the catch is that the base measures the wrong outcome for transfer |
| **Status** | draft (authored 2026-06-01 from the discovery corpus) |

---

## 1. The mechanism (what actually does the work)

Concept mapping builds a **non-hierarchical semantic network**: concept nodes joined by **directed, labeled linking phrases**, so that each `node - link - node` triple reads as an explicit **proposition** (for example "free tier - increases - signup volume", "support load - constrains - margin"). Clusters of related concepts are then joined by **cross-links** that connect concepts across different clusters, which is where the integrative insight lives.

The load-bearing move is **forcing every relationship to be named**. An ordinary diagram lets you draw a line between "free tier" and "conversion" and move on; concept mapping refuses the unlabeled line and demands a verb: does the free tier *increase*, *cannibalize*, *delay*, or *gate* conversion? Naming the relationship is what externalizes how a domain actually interrelates, and it is what surfaces **gaps** (a concept with no links), **missing links** (two concepts that obviously relate but were never connected), and **misconceptions** (a labeled proposition that, once written as a sentence, is plainly false or unsupported).

The work is done by the labeled-proposition constraint, not by drawing a picture. Drop the constraint and the technique collapses into free-association mind-mapping with unlabeled branches (the excluded Buzan method, below).

## 2. Lineage

- **Novak & Canas (2008), "The Theory Underlying Concept Maps and How to Construct Them" (IHMC Technical Report).** The canonical definition: concepts in labeled nodes, connected by labeled linking words/phrases to form propositions; cross-links across map regions as the marker of integrative understanding. This is the source of the labeled-link / proposition constraint that this skill implements.
- **Davies (2011), "Concept mapping, mind mapping and argument mapping: what are the differences and do they matter?" *Higher Education* 62(3).** Establishes concept mapping, mind mapping, and argument mapping as three *distinct* techniques with different structures and purposes - the basis for the hard walls in "When NOT to Use".
- **Nesbit & Adesope (2006), "Learning With Concept and Knowledge Maps: A Meta-Analysis." *Review of Educational Research* 76(3).** 55 studies, 67 effect sizes, n = 5,818.
- **Schroeder, Nesbit, Anguiano & Adesope (2018), "Studying and Constructing Concept Maps: a Meta-Analysis." *Educational Psychology Review* 30.** 142 effect sizes, n = 11,814; overall g = 0.58, with **constructing** maps (g = 0.72) outperforming **studying** pre-made maps (g = 0.43).

No trademark on "concept mapping"; it is a generic descriptive term, named descriptively here, lineage cited.

## 3. What the evidence shows, and what it does NOT show

This is the crux of the honest grade, so it gets stated plainly.

**What the large meta-analyses actually measure:** Nesbit & Adesope (2006) and Schroeder et al. (2018) pool studies of **human knowledge retention and learning** - how much a *person* remembers or understands after building or studying a map, versus reading text or other study conditions. The reported numbers (Schroeder overall g = 0.58; constructing g = 0.72 > studying g = 0.43) are **memory-encoding / learning-transfer outcomes in human students.**

**Why that does NOT transfer to an AI agent:** an AI agent does not have the human memory-encoding bottleneck these studies measure. "Building a map helps a student *remember and learn* the material better" is precisely the outcome that does not carry over to a model that already has the material in context. So the large effect sizes - although real and well-powered - are evidence for the **wrong outcome** for an AI use case. They cannot be borrowed to claim the skill makes an agent reason or decide better.

**The honest comparison (why this is M/P and not S):** the shipped `argument-mapping` skill is graded **S**, even though its meta-analytic base (van Gelder and successors) is *smaller* than concept mapping's. The reason is outcome, not sample size: argument mapping's studies measure **reasoning quality**, which is the outcome that *does* transfer to an agent. Concept mapping's much larger base measures **knowledge retention**, which does not. Tier here is set by whether the measured outcome transfers, not by how big the meta-analysis is. A bigger study of the wrong outcome does not earn a higher grade. This is the discipline the library exists to enforce, so the grade is **M/P, not S**.

**The transferable claim (what this skill may honestly claim):** the construction move itself - **externalizing how concepts interrelate and forcing every relationship to be named** - has practitioner and construct-validity support (Novak & Canas; Davies) independent of the retention outcome. The act of naming each link, demanding cross-links, and reading each triple as a proposition is a structural discipline that surfaces gaps, missing links, and questionable propositions *during construction*. That gap-surfacing is inspectable and does not depend on a memory mechanism, so it transfers. The claim is scoped to exactly that and no further.

**NOT shown / explicitly disclaimed:**
- No claim that running this skill improves an agent's **learning, retention, decisions, or downstream answer quality**. The retention meta-analyses do not support that for an agent and are not cited for it.
- No borrowing of g = 0.58 / 0.72 / 0.43 as evidence of agent benefit. Those numbers are reported here only to describe what the human literature found, and to make the transfer failure explicit.
- No claim of an effect size for the gap-surfacing benefit; that benefit is practitioner-grade and directional, not quantified.

## 4. Transferred-evidence flag (required honesty)

All cited evidence is from **human learners**, and the strongest, largest results measure **human knowledge retention** - a memory-encoding outcome that does not apply to an AI agent. **Evidence is transferred from human studies, not AI-validated**, and for this skill the transfer is *partial by design*: the retention finding does NOT transfer, and only the construction-discipline / gap-surfacing aspect is claimed to. The AI value that survives the transfer test: a model asked to relate a set of concepts will happily emit unlabeled adjacency ("X and Y are related") or a fluent paragraph that hides which relationships it never actually specified. Forcing every link to be a named proposition, and requiring cross-links, is a direct counter to that vagueness and yields a durable, inspectable artifact in which a false or missing proposition is visible.

## 5. When it works / when it fails (drives "When NOT to Use" and eval anti-cases)

**Works best when:**
- A domain has **many interrelated concepts** and the goal is to externalize and inspect *how they relate*, not to answer one question.
- You suspect **hidden gaps or misconceptions** in how a space is understood, and want them surfaced as explicit, checkable propositions.
- Integration across sub-areas matters, so **cross-links** between clusters carry the value (for example connecting a pricing concept to a support-cost concept).

**Fails or misleads when (poor-fit / anti-patterns):**
- **Evaluating whether one argument or recommendation is sound** - that is `argument-mapping`. Both produce "maps", so this is the easiest confusion: argument mapping has claims, reasons, co-premises, and objections and judges soundness; concept mapping is a semantic network of propositions and judges nothing. Route soundness work to `argument-mapping`.
- **Top-down decomposition of one question into MECE parts** - that is `issue-tree`. A concept map is a non-hierarchical network, not a decomposition tree, and does not aim for mutual exclusivity.
- **Bottom-up clustering of many raw notes with no named relationships** - that is `affinity-mapping` (the KJ method). Affinity mapping groups items into themes; it deliberately does *not* name the relationship between items. If you only need themes, not propositions, use affinity mapping.
- **Fixed event / pattern / structure / mental-model causal levels** - that is `iceberg-model`. The iceberg has prescribed levels; a concept map has none.
- **Dropping the labeled-link / proposition constraint.** Unlabeled branches radiating from a center is free-association **mind-mapping** (the Buzan method), which is **excluded from this library (X-tier; Farrand, Hussain & Hennessy 2002 found minimal and possibly motivation-offsetting benefit).** Without the named-relationship/proposition discipline this skill *becomes* that excluded method. The constraint is the skill.

## 6. Output artifact

A **concept map**: a non-hierarchical network of concept nodes connected by **directed, labeled linking phrases**, where each `node - link - node` triple is written as a readable proposition; **cross-links** that connect concepts across different clusters; and an explicit list of **surfaced gaps** (under-connected concepts), **missing links** (relationships that should exist but were not drawn), and **questionable propositions** (named links that, written out, look false or unsupported). The deliverable is the network of propositions plus that gap/issue list, not prose.

## 7. Sources

1. Novak, J. D., & Canas, A. J. (2008). *The Theory Underlying Concept Maps and How to Construct Them.* IHMC Technical Report (Florida Institute for Human and Machine Cognition). - definition: labeled nodes, labeled linking phrases forming propositions, cross-links as the integrative marker.
2. Davies, M. (2011). "Concept mapping, mind mapping and argument mapping: what are the differences and do they matter?" *Higher Education*, 62(3), 279-301. - the three techniques are distinct.
3. Nesbit, J. C., & Adesope, O. O. (2006). "Learning With Concept and Knowledge Maps: A Meta-Analysis." *Review of Educational Research*, 76(3), 413-448. - 55 studies, 67 effect sizes, n = 5,818; outcome = human learning/retention.
4. Schroeder, N. L., Nesbit, J. C., Anguiano, C. J., & Adesope, O. O. (2018). "Studying and Constructing Concept Maps: a Meta-Analysis." *Educational Psychology Review*, 30, 431-455. - 142 effect sizes, n = 11,814; overall g = 0.58; constructing g = 0.72 > studying g = 0.43; outcome = human learning/retention.
5. Farrand, P., Hussain, F., & Hennessy, E. (2002). "The efficacy of the mind map study technique." *Medical Education*, 36(5), 426-431. - cited only to mark the *excluded* unlabeled mind-mapping (Buzan) method as X-tier.

> **Verification status:** The Novak & Canas definition and the Davies distinction are well-attested and safe to cite. The Nesbit & Adesope and Schroeder et al. study/effect-size figures (counts, n, g = 0.58 / 0.72 / 0.43) are reported as the published meta-analytic values; confirm the exact figures against the primary articles before any public-facing quantified claim, and **note that they are cited here as human-retention findings that do NOT transfer to an AI agent, never as evidence of agent benefit.** The core caveat - large base, wrong outcome for transfer, therefore M/P not S - is the load-bearing honesty of this dossier.
