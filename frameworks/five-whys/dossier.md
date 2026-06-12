---
title: Five Whys
slug: five-whys
generated_status: true
---

<!-- STATUS:GENERATED (gen-site.mjs from frameworks/registry.mjs) - do not edit between these markers -->
<!-- /STATUS:GENERATED -->

## What it is

Five Whys is a root-cause-tracing heuristic: starting from an observed problem, ask "why did this happen?", take the answer, ask "why?" again of that answer, and repeat - five times is the rule of thumb - on the theory that each "why" peels back one layer of symptom until you reach a cause worth fixing rather than a surface effect worth patching. The deliverable is a single linear chain - problem, then cause, then cause-of-cause, down to a terminal "root cause" - and a countermeasure aimed at that terminal node instead of at the original symptom.

The durable cognitive move underneath the brand is **iterative causal descent along one chain**: refuse to stop at the first explanation, and keep interrogating each explanation as itself an effect with a prior cause. That move is real and worth naming. The popular packaging adds two things the move does not need and that turn out to be its liabilities: the fixed count ("five") and the implicit promise of a single root cause at the bottom. The number five is a stopping cue, not a finding - Ohno used it as a shop-floor rule of thumb, not a claim that causes come in chains of exactly five. The deeper commitment is the single-chain shape: Five Whys, by construction, follows one "why" at each step and so traces one path through what is usually a branching web of contributing causes.

## When it helps / when it misleads

It helps for **simple, linear, deterministic failures** - the kind it was born to handle on a factory floor. When a problem really does have one dominant chain of physical or procedural cause (the machine stopped because a fuse blew because it was overloaded because the lubrication pump failed because the shaft was worn because no filter was fitted), walking the chain quickly and asking "why" of each step is a fast, cheap, low-ceremony way to get from symptom to a fixable cause. As a teaching device for the habit of not stopping at the first answer, and as a five-minute prompt in a retro or a quick incident triage, it earns its keep.

It misleads - sometimes dangerously - the moment the problem stops being a single chain:

- **Multi-cause problems get flattened into one path.** Most real failures have several contributing causes that interact; Five Whys forces a choice of one "why" at each branch and silently discards the others. The output looks like *the* cause when it is one cause among many. This is the central limitation documented across the critical literature and even in the method's own Wikipedia entry: a tendency to isolate a single root cause when each "why" could legitimately branch into several.
- **The chain is only as good as the questioner.** The method cannot surface a cause the investigator does not already know, and different investigators applying it to the same problem routinely reach different "root causes" depending on experience, framing, and bias. It is not reproducible, and it offers no test of whether the chain it produced is the right one.
- **It invites stopping too early - or chasing too far.** "Five" is arbitrary: complex problems often need more than five whys, and the count tempts teams to stop at a convenient symptom and call it a root cause. There is no built-in criterion for when you have actually reached a cause worth fixing.
- **In complex socio-technical systems it can do harm.** Where human and organizational factors interact, the single backward "why" chain tends to terminate at a person ("operator error") and a counterfactual ("should have done X"), which is the "Bad Apple" trap: it assigns blame instead of describing the conditions that made the failure make sense at the time. This is the core of John Allspaw's critique - that the technique's causal oversimplification can make learning harder, not easier.

The honest boundary: use it for simple linear failures and as a teaching prompt; reach for a branching cause tool the moment more than one cause may be in play.

## What the evidence says

The governing grade for Five Whys in this library is **X** - poor or absent evidence for the method as a reliable root-cause instrument - and the entry is **flagged**, not shipped, on that basis.

**What the record supports.** Five Whys is genuinely useful and genuinely durable inside its origin niche: simple, linear, deterministic problems, and the *pedagogy* of not stopping at the first explanation. Its adoption is enormous (the Toyota Production System, Lean, Six Sigma, agile retrospectives, incident management), and that adoption is real evidence of practitioner utility for shallow problems. As Alan Card puts it, the technique has real value as a teaching tool.

**What the record does NOT support.** There is no controlled or comparative study I can locate showing that Five Whys produces more accurate root-cause identification than a plain causal discussion, a fishbone, or any branching tool - for any class of problem. The substantive named evidence is *critical* and cuts against using it as the analysis:

- **Alan J. Card, "The problem with '5 whys'," *BMJ Quality & Safety* 26 (2017): 671-677**, argues that for root-cause analysis (his context is healthcare safety) Five Whys is misguided: it oversimplifies complex problems, follows a single causal chain when failures are multi-causal, and limits understanding of how processes actually fail. Card's prescription is to move to branching, systems-oriented diagramming - a causal/cause-effect tree rather than a single line of whys.
- **John Allspaw, "The Infinite Hows (or, the Dangers of the Five Whys)" (2014)**, drawing on Dekker, Conklin, and Leveson, argues the technique's reliance on a linear causal chain ignores the complexity of socio-technical systems and tends toward "who" and blame; he proposes asking "how" (what conditions allowed this) over "why" (what single prior cause) to recover the richer, multi-contributor picture.
- The documented practitioner limitations - non-reproducibility across investigators, the tendency to isolate a single root cause, stopping too soon at symptoms, and the inability to find causes the investigator does not already know - are consistently catalogued (including in the method's own Wikipedia entry, which lists exactly these) and are not seriously contested even by defenders.

**No laundered numbers.** Five Whys attracts the same uncited-percentage folklore as other famous methods; this entry carries none. No "fixes N% of problems" or "reduces recurrence by N%" figure is repeated here, because none traces to a nameable primary source. The only thing the record robustly establishes is the *critique*, and the durable-niche utility for linear problems.

**Transfer caveat (required).** All of the above - the practitioner adoption and the critical findings alike - comes from human investigators in manufacturing, healthcare, and software-operations settings. None of it studies Five Whys performed by or with an AI agent. The evidence is transferred from human contexts and is not validated for AI-augmented use; the conservative governing grade is **X** regardless, because even the human evidence does not support it as a reliable instrument beyond simple linear cases.

## Why it is / is not a skill here

Vetting verdict: **Flag, not shipped (verdict: reject as a standalone skill).** The method is documented here with full attribution, because the IP gate is open and a famous method's honest limits are part of this library's product - but documentation is not shipping.

Two reasons keep Five Whys off the catalog as a skill of its own.

First, **evidence and reliability.** The grade is X: reliable only for simple, linear, deterministic failures, and actively misleading beyond them. A thinking-framework-skills skill has to clear an evidence-and-honesty bar, and a tool whose own defenders concede it flattens multi-cause problems, is not reproducible across investigators, and in complex systems drifts toward blame does not clear it. Shipping it as a recommendable move would be putting the library's name behind an instrument whose well-documented failure mode is to produce a confident, single-cause answer to a many-cause problem.

Second, **the better move already ships.** The genuinely valuable part - iterative causal descent that refuses to stop at the first symptom - is preserved and improved by `think-issue-tree`, which is `status: shipped`. An issue tree does what Five Whys does (decompose a problem toward causes you can act on) but without the two liabilities: it **branches** at each node instead of committing to one "why," so several contributing causes survive instead of one; and it carries MECE-plus-remainder discipline, so coverage is explicit instead of accidental. Where a problem genuinely is a single chain, an issue tree degenerates gracefully into that chain; where it is not - which is most of the time - the tree keeps the branches Five Whys throws away. This is the same reasoning that folded **Fishbone / Ishikawa** into `issue-tree`: Fishbone is the lateral, multi-category cause sweep, issue-tree is the general branching cause decomposition, and Five Whys is the degenerate single-path special case of the same family. The catalog routes all of them to the one shipped move.

So the decision is: keep Five Whys documented with its X-grade and single-chain caveats, point users who reach for it toward `think-issue-tree` for any problem that might have more than one cause, and do not ship a standalone skill whose defining packaging is precisely what the evidence flags. The learning value of this NO: the most famous root-cause technique in the world earns a place in the library as a cautionary, well-bounded entry, not as a recommendable skill, because its fame is the linear chain, and the linear chain is the bug, not the feature, the moment a problem has more than one cause.

## Lineage and who to read

Five Whys originates with **Sakichi Toyoda** (1867-1930), founder of Toyota Industries and an inventor of automatic looms, who built a shop-floor discipline of asking "why" repeatedly to get past a symptom to the underlying machine fault before fixing it. The technique was carried into and formalized by **Taiichi Ohno** (1912-1990), the architect of the Toyota Production System, who treated repeated "why" as the basis of Toyota's scientific approach to problems and used "five" as a practical stopping rule of thumb (his canonical illustration is the chain from a stopped machine through an overloaded fuse, a worn bearing shaft, inadequate lubrication, and finally a missing filter). From the Toyota Production System it spread into Lean, Six Sigma, agile retrospectives, and modern incident management. "Five Whys" / "5 Whys" is a generic descriptive term in common use - no trademark and no owner - so it is documented here descriptively with attribution to Toyoda and the Toyota Production System.

For the practice, read Ohno directly; for the limits, read the critical literature, which is where the real evidence lives.

### Named sources

- Taiichi Ohno, *Toyota Production System: Beyond Large-Scale Production* (Diamond, Japanese orig. 1978; English, Productivity Press, 1988). The primary practitioner source; presents repeated "why" as Toyota's scientific method and gives the canonical machine-failure example. Foundational / practitioner. (Origin)
- Alan J. Card, "The problem with '5 whys'," *BMJ Quality & Safety* 26(8) (2017): 671-677. Argues the single-chain technique oversimplifies complex, multi-causal problems and recommends branching, systems-oriented causal/tree diagramming instead. The governing critique behind this library's flag. (Critical literature)
- John Allspaw, "The Infinite Hows (or, the Dangers of the Five Whys)" (kitchensoap.com / O'Reilly Radar, 2014), building on Sidney Dekker, Todd Conklin, and Nancy Leveson. Argues the linear "why" chain ignores socio-technical complexity and drifts toward blame ("Bad Apple"); proposes "how" questions to recover the multi-contributor narrative. (Critical literature)
- "Five whys," Wikipedia. Useful as a consolidated, sourced catalogue of the documented limitations - non-reproducibility across investigators, the tendency to isolate a single root cause, stopping at symptoms, and the inability to find unknown causes - and of the Toyoda/Ohno lineage. (Secondary / reference)

> No effect-size or success-rate figure is cited for Five Whys in this entry: the widely-circulated "fixes / prevents N%" framings trace to no nameable primary source and are excluded under the evidence rule. The reliable record here is the critical literature and the linear-failure niche, not a quantified outcome claim.
