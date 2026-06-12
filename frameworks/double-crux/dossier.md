---
title: Double-crux
slug: double-crux
generated_status: true
---

<!-- STATUS:GENERATED (gen-site.mjs from frameworks/registry.mjs) - do not edit between these markers -->
<!-- /STATUS:GENERATED -->

## What it is

Double-crux is a protocol for resolving an entrenched disagreement between two people. Each side states the belief that is actually doing the work, then hunts for a **crux**: a single underlying fact such that, if that person came to believe the opposite about it, they would change their top-level conclusion. A **double-crux** is a fact that is a crux for *both* parties at once - the one node where the disagreement genuinely lives. Once found, the conversation stops arguing the conclusion and turns to investigating that one shared node, because both sides have pre-committed that resolving it will move them.

The durable cognitive move underneath the brand is **locating the load-bearing belief**: instead of trading conclusions, you ask "what specific fact, if it flipped, would flip my answer?", surface it explicitly, and make the disagreement testable by reducing it to that fact. The popular packaging adds two things on top of that move: it is **bilateral** (the search runs symmetrically across two minds and the payoff is the *intersection* - a fact that is decisive for each), and it is **collaborative rather than adversarial** (the parties cooperate to map where they diverge instead of trying to win). Those two additions are the whole point of the brand, and they are exactly what does not survive when a single reasoner runs it alone. The honest description has to hold the underlying move (find the belief whose change would flip your conclusion) apart from the two-party packaging (find the *shared* such belief, together), because the verdict below turns on that split.

## When it helps / when it misleads

It helps when two reasonably skilled, good-faith people are stuck on a disagreement that keeps recycling the same conclusions, both can articulate their real models rather than slogans, and the disagreement plausibly hinges on a small number of facts that could in principle be checked. In that setting, reducing "you are wrong" to "we both agree it comes down to whether X" is a real service: it depersonalizes the fight and points the next step at evidence instead of rhetoric.

It misleads or simply does not apply when:

- **There is only one party.** The method's payoff is the *double* - the fact that is a crux for both sides simultaneously. A solo reasoner has no second model to intersect with, so the bilateral machinery has nothing to bite on; what is left is the unilateral move (find my own crux), which is not what makes double-crux famous.
- **The disagreement is not about facts but about frames.** The community's own write-ups flag this directly: when the two sides disagree about what frame to even use to evaluate truth, the search recurses all the way down to basic epistemology and usually is not worth the effort.
- **Good faith or skill is missing.** Double-crux assumes both parties will name their real cruxes honestly and update when one resolves. A motivated participant can offer a disingenuous "crux" they do not actually hold, and the protocol has no defense against that. Its advocates describe it less as an algorithm to follow rigidly and more as a pointer at a productive way of arguing, which is an admission that the steps alone do not carry the result.
- **The belief is not reducible to a checkable node.** If no single fact would flip either conclusion - the disagreement is genuinely about values, taste, or many entangled small factors - there is no crux to find.

## What the evidence says

The honest grade is **C (conceptual)**. Double-crux is a reasoned, internally coherent protocol with a clear logic, but the support for it is community practice and self-report, not controlled evidence.

**What the record supports.** There is a clear, named origin and a substantial body of practitioner writing (CFAR's own description and a long thread of LessWrong posts and rebuttals). As a piece of conceptual design - reduce a disagreement to the belief whose change would flip the conclusion, then check that belief - the logic is sound and the technique is genuinely used in the rationality community.

**What the record does NOT support.** I can locate **no controlled or comparative study** showing that double-crux resolves disagreements faster, more accurately, or more durably than ordinary discussion or any other method. The evidence is entirely: (1) CFAR's instructional material, (2) first-person community accounts of sessions (for example Sarah Constantin's write-up of a specific double-crux), and (3) critical community posts (the "Contra double crux" and "Musings on Double Crux" threads) that catalog failure modes from experience rather than from measurement. None of this is an effect size. There is **no traceable primary source for any quantified success-rate claim**, so none is repeated here; any "double-crux resolves N% of disagreements" framing would be laundered and is excluded under the evidence rule.

**Transfer caveat (required).** All of the above is human practice in a hobbyist-rationalist context - two people in a room. None of it studies double-crux performed by or with an AI agent, and the single most load-bearing precondition (two distinct minds to intersect) is the one an AI agent running solo does not have. The evidence is transferred from human two-party use and is not validated for AI-augmented use; the conservative governing grade is **C** on its own merits, with no higher-tier research to borrow from.

## Why it is / is not a skill here

Verdict: **Excluded (reject), 2026-06-03.** Documented here with full attribution, not shipped as a skill.

The Build burden is to name a distinct, durable cognitive move that no shipped skill produces. Double-crux fails that burden in the specific context this library ships into - a single AI reasoner, usually with no second party in the loop. Strip away the bilateral packaging that an AI cannot use, and the move that remains is "find the belief whose change would flip the conclusion, then test it." That is precisely the **killer-conditions** step that `think-what-would-have-to-be-true` (registry slug `what-would-have-to-be-true`) already ships: WWHTBT converts a contested option or claim into the explicit conditions that would have to hold, rates each condition's confidence, and ends by naming the one or two conditions that are both most load-bearing and least certain - the conditions to test before committing. A "killer condition" is a crux by another name: the assumption whose truth value decides the verdict. So a solo double-crux reduces to a WWHTBT ledger run on one claim, with the killer conditions standing in for the cruxes. The overlap on the load-bearing operation is essentially total, which is why this is an exclusion and not a separate build.

What double-crux adds beyond WWHTBT is the part that does not transfer: the *symmetry* (running the crux-search across two parties and taking the intersection) and the *facilitation* (a collaborative two-person ritual). Those are real features of the human method, but they require a genuine second mind with its own model, which is the one ingredient a solo agent does not have. Simulating a second party - having the model argue both sides - is not double-crux; it is the model talking to itself, and the community's own "internal double crux" variant is explicitly a different, introspective practice, not the bilateral protocol. So the part of double-crux that is distinctive is the part that is unavailable, and the part that is available is already shipped.

Why exclude rather than fold. A fold points the reader to where the move lives; that is already done above - the killer-conditions step of `what-would-have-to-be-true` is the home for "find and test the belief that decides this." But double-crux is not merely a preset of that move the way a category checklist is a preset of issue-tree; its defining asset is an interpersonal facilitation protocol that this single-agent library is not the right place to host, and that this library has no controlled evidence for at all. Calling it a fold would overstate how much of double-crux actually transfers. The honest verdict is the narrower one: the transferable core is already covered, the non-transferable remainder is a two-party human practice graded C, and so double-crux is documented and excluded rather than shipped. The learning value of the NO is the distinction between a *unilateral* crux move (which an AI can do, and which WWHTBT already ships) and a *bilateral* crux protocol (which is what makes double-crux famous, and which a solo reasoner structurally cannot run).

## Lineage and who to read

- **Origin:** the **Center for Applied Rationality (CFAR)**. The canonical write-up, "Double Crux - A Strategy for Resolving Disagreement," was authored by then-CFAR instructor **Duncan Sabien**, published on CFAR's site in 2016 and cross-posted to LessWrong (the LessWrong version is dated January 2, 2017). CFAR describes double-crux as one of its newer concepts that quickly became part of the organization's practice.
- **Contributors:** CFAR's account credits experimentation and development to **Julia Galef, Kenzi Amodei, Andrew Critch, Eli Tyre, Anna Salamon**, and Sabien, among others. It is a community-developed technique rather than a single-author framework.
- **Trademark / attribution:** "double crux" is a descriptive term originating with CFAR; it is attributed here to CFAR and Sabien, with no trademark claim relied on.
- **For the critical read:** the LessWrong threads **"Contra double crux"** and **"Musings on Double Crux (and 'Productive Disagreement')"** collect the failure modes from practice (frame disagreements that recurse to epistemology; reliance on good faith and skill; the technique as a pointer at a productive mode rather than a rigid algorithm). Sarah Constantin's "Gleanings from Double Crux" is a concrete first-person session account. Read these alongside the CFAR description rather than taking the original write-up at face value, and treat every effectiveness claim as community self-report, not measured outcome.

### Named sources

- Duncan Sabien / Center for Applied Rationality, "Double Crux - A Strategy for Resolving Disagreement" (rationality.org, 2016; LessWrong cross-post 2017). The foundational write-up; defines crux and double-crux and the protocol. Practitioner / foundational. (C)
- Center for Applied Rationality, "Double Crux - A Strategy for Resolving Disagreement" (rationality.org resources). CFAR's institutional description and the contributor credits (Galef, Amodei, Critch, Tyre, Salamon). Practitioner. (C)
- "Contra double crux" (LessWrong). A critical thread cataloging failure modes and the technique's dependence on good faith and shared frames. Critical / community. (C)
- "Musings on Double Crux (and 'Productive Disagreement')" (LessWrong). Community reflection on when the method works and when it recurses to epistemology. Critical / community. (C)
- Sarah Constantin, "Gleanings from Double Crux on 'The Craft is Not The Community'" (2017). A first-person account of an actual double-crux session; illustrative, not evidentiary. Practitioner case. (C)

> Excluded under the evidence rule: no nameable primary source supports any quantified double-crux success rate, so no effectiveness figure is stated or counted toward this entry's grade. Where the transferable core (find and test the belief whose change flips the conclusion) lives in this repo: the killer-conditions step of `think-what-would-have-to-be-true` and its dossier at `skills/think-what-would-have-to-be-true/evidence/dossier.md`.
