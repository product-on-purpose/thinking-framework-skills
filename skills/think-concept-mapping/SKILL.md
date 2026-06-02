---
name: think-concept-mapping
description: Builds a concept map - a non-hierarchical network of concept nodes joined by directed, labeled linking phrases so each node-link-node reads as an explicit proposition, with cross-links across clusters - then surfaces gaps, missing links, and questionable propositions. Use when a domain has many interrelated concepts and the goal is to externalize and inspect how they relate, forcing every relationship to be named rather than left as a vague association.
license: Apache-2.0
metadata:
  id: thinking-framework-skills.concept-mapping
  family: synthesis
  evidence-tier: "M/P"
  version: 0.1.0
  standard: "0.8"
---
<!-- thinking-framework-skills | https://github.com/product-on-purpose/thinking-framework-skills | Apache-2.0 -->
# Concept Mapping

When a domain is described in prose or sketched as a diagram, the relationships between its concepts stay vague: a line is drawn between two boxes, or two ideas are called "related", and how they actually relate is never specified. Concept mapping refuses the unlabeled link. It builds a non-hierarchical semantic network in which every connection is a **directed, labeled linking phrase**, so each node-link-node triple reads as an explicit **proposition** ("free tier - increases - signup volume"), and clusters are joined by **cross-links** that connect concepts across different parts of the map. The load-bearing move is forcing every relationship to be named, which externalizes how the domain interrelates and makes gaps, missing links, and false propositions visible. The output is a **concept map** plus a list of surfaced gaps. It externalizes and inspects how concepts relate; it does not claim to improve learning, retention, or decisions.

## When to Use

- A domain has many interrelated concepts and the goal is to make how they relate explicit and inspectable.
- You suspect hidden gaps or misconceptions in how a space is understood and want them surfaced as checkable propositions.
- Integration across sub-areas matters, so the cross-links between clusters carry the value (for example linking a pricing concept to a support-cost concept).

## When NOT to Use

- To evaluate whether one argument or recommendation is **sound** - use **argument-mapping**. Both produce "maps" and this is the easiest confusion: argument mapping has a claim, reasons, co-premises, and objections and judges soundness; a concept map is a network of propositions and judges nothing.
- To decompose one big question **top-down into MECE parts** - use **issue-tree**. A concept map is a non-hierarchical network, not a decomposition tree, and does not aim for mutual exclusivity.
- To cluster many raw notes **bottom-up with no named relationships** - use **affinity-mapping** (the KJ method). Affinity mapping groups items into themes and deliberately does not name the relationship between them; if you only need themes, not propositions, use it.
- To move a problem down **fixed event / pattern / structure / mental-model levels** - use **iceberg-model**. The iceberg has prescribed causal levels; a concept map has none.
- If you drop the labeled-link / proposition constraint, you are doing free-association mind-mapping with unlabeled branches (the Buzan method), which this library **excludes (X-tier; Farrand 2002)**. The named-relationship discipline is the skill; without it this collapses into the excluded method.

## Instructions

When asked to map how the concepts in a domain relate, follow these steps:

1. **List the concepts.** Pull out the key concept terms in the domain (nouns / noun phrases). Aim for a focused set, not everything.
2. **Connect with labeled, directed links.** For each genuine relationship, draw a directed link and **name it with a linking phrase** (a verb or short phrase: "causes", "is a type of", "constrains", "increases", "depends on", "trades off against"). Never leave a link unlabeled. Each link must make `source - link - target` read as a true sentence.
3. **Read every link back as a proposition.** Write the node-link-node triple out as a sentence. If the sentence is vague, false, or one you cannot defend, fix the label or cut the link. This is where misconceptions surface.
4. **Add cross-links across clusters.** Find concepts in different clusters that should be connected and add labeled cross-links between them. These integrative links are the highest-value part of the map.
5. **Surface gaps and missing links.** Flag concepts with few or no links (under-connected), pairs of concepts that obviously relate but were never linked (missing links), and any propositions that look questionable.
6. **Emit the concept map** per `references/TEMPLATE.md`: the labeled-proposition network, the cross-links, and the explicit gaps / missing-links / questionable-propositions list.

## Output Format

Use the template in `references/TEMPLATE.md`. The deliverable is the network of labeled propositions plus cross-links and the surfaced-gaps list, not prose.

## Quality Checklist

Before finalizing, verify:

- [ ] Every link is a named, directed linking phrase; there are no unlabeled associations.
- [ ] Each node-link-node triple reads as a complete, defensible proposition (a sentence).
- [ ] At least one cross-link connects concepts across different clusters.
- [ ] Gaps (under-connected concepts), missing links, and questionable propositions are listed explicitly.
- [ ] The structure is a non-hierarchical network, not an argument tree or a MECE decomposition.
- [ ] No overclaim: it externalizes and inspects how concepts relate; it does not claim to improve learning, retention, or decisions (see `evidence/dossier.md`).
- [ ] The output is the concept-map artifact, not prose.

## Evidence

Tier **M/P**, with a deliberate scope caveat. Concept mapping has a large human meta-analytic base (Nesbit & Adesope 2006: 55 studies, n=5,818; Schroeder et al. 2018: 142 effect sizes, n=11,814, overall g=0.58, constructing g=0.72 > studying g=0.43) - but those studies measure **human knowledge retention**, a memory-encoding outcome that does **not** transfer to an AI agent. That is why this skill is M/P and not S even though its base is larger than the S-graded argument-mapping: tier is set by whether the measured outcome transfers (reasoning quality does; retention does not), not by sample size. The transferable, practitioner-grade claim (Novak & Canas 2008; Davies 2011) is narrow: externalizing how concepts interrelate and forcing every relationship to be named surfaces gaps during construction. Evidence is transferred from human studies, not AI-validated. Full grading: `evidence/dossier.md`.

## Examples

See `references/EXAMPLE.md` for a completed concept map.
