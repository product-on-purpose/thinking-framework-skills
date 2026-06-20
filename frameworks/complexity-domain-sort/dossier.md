---
title: Cynefin
slug: complexity-domain-sort
generated_status: true
---

> **Update (v0.11.0):** now shipped as a contested lens, caveat-first and explicit-request-only - see `think-complexity-domain-sort`. The evidence grade and the caveats below are unchanged; they are exactly why it ships caveat-first rather than as a default skill. Any "documented, not shipped" / "reject" wording below predates this decision.

<!-- STATUS:GENERATED (gen-site.mjs from frameworks/registry.mjs) - do not edit between these markers -->
<!-- /STATUS:GENERATED -->

## What it is

Cynefin (pronounced "kuh-NEV-in," a Welsh word for habitat or the place we belong) is a sense-making framework that sorts a situation into one of several decision contexts before you decide how to act. The durable cognitive move underneath the brand is **match your response to the type of problem you are facing**: do not run a complex, novel, emergent situation as if it were a known, repeatable one, and do not over-engineer a routine task as if it were uncharted. The framework gives that move a fixed set of buckets and a recommended action signature for each.

In its current packaging there are five domains. **Clear** (formerly "simple" or "obvious"): cause and effect are evident, best practice applies, so you sense, categorize, and respond. **Complicated**: cause and effect exist but require expertise to see, so you sense, analyze, and respond - this is the realm of good practice and expert diagnosis. **Complex**: cause and effect are only coherent in hindsight, so you probe with safe-to-fail experiments, sense the result, and respond - practice emerges, it cannot be specified in advance. **Chaotic**: no perceivable cause and effect, so you act first to establish stability, then sense, then respond. And a central fifth domain, **confusion** (formerly "disorder"): you do not yet know which of the other four you are in, which is the most dangerous place to make decisions because people default to whichever domain they are most comfortable with.

It helps to separate two things the popular write-ups blur. The real, transferable move is **context-before-response triage** - classifying a problem by how knowable its causal structure is, and choosing an ordered-versus-emergent management style to fit. The branded packaging is a specific five-box taxonomy, a specific vocabulary (sense / categorize / analyze / probe / act), the warning about "complacent" overconfidence at the cliff edge between clear and chaotic, and an associated facilitation method ("four points contextualization") for placing items in the domains. The buckets are a memory aid and a conversation starter; the work is done by the underlying triage, not by the five-box picture.

## When it helps / when it misleads

It helps when a team is **applying the wrong management style to the problem type** - running an emergent, ambiguous initiative on a rigid best-practice playbook (treating complex as complicated), or smothering a routine task in deliberation it does not need. As a discussion prompt it is genuinely useful for naming that mismatch out loud, for legitimizing safe-to-fail experimentation in the complex domain rather than demanding an upfront plan, and for flagging the "confusion" trap where people decide before they have classified.

It misleads, or is simply a poor fit, when:

- **The sort is treated as an objective measurement.** Which domain a problem "is in" is a judgment call that different people make differently, and the same problem can shift domains or span several at once. Presenting the placement as a found fact rather than a contested framing is the most common misuse, and it manufactures false confidence.
- **The label becomes the deliverable.** Saying "this is complex" is not a decision. The framework names the kind of problem; it does not tell you which experiment to run, which expert to consult, or which option to pick. Stopping at the label is the cargo-cult failure: the vocabulary gets performed without changing what anyone does.
- **The five buckets fight the problem.** Real situations have parts in different domains at once, and forcing a whole initiative into one box flattens that. The framework itself has shifted its own boundaries and names over the years (obvious became clear, disorder became confusion), which is a fair signal that the partition is a useful lens, not a fixed law of nature.
- **A sharper tool already fits.** If the job is to enumerate the causes of one effect, that is cause decomposition; if it is to hold several uncertain futures in parallel, that is scenario work; if it is to choose among options under stated criteria, that is an explicit option comparison. Cynefin classifies the terrain; it does not do any of those downstream jobs, and reaching for it when you need one of them yields a label instead of an answer.

## What the evidence says

The honest grade is **C (conceptual)**: a coherent, widely taught conceptual framework with a clear intellectual lineage, but without controlled evidence that using it produces better decisions than not using it.

**What the record supports.** Cynefin is a real, named, influential framework. The 2007 Harvard Business Review article that popularized it won the Academy of Management's Outstanding Practitioner-Oriented Publication award in organizational behavior in 2008, so its standing as a practitioner contribution is genuine and recognized. It is taught across knowledge management, software and agile practice, healthcare, and policy. That is the extent of the directly supported claim: it is an established, well-regarded sense-making heuristic.

**What the record does NOT support.** There is no controlled or comparative study I can locate showing that classifying a problem with Cynefin improves decision quality versus not classifying it, or versus any alternative triage. The applied literature is descriptive: papers show people *using* Cynefin to frame clinical complexity or biomedical research, not trials measuring its effect. The PMC review applying Cynefin to diagnostic reasoning in internal medicine (2021) states the point plainly: the framework "is now widely used for teaching and as a simple heuristic; however, scientific proof of its validity has yet to be provided." Academic critics go further. The framework has been criticized as conceptually confusing, as needing a more rigorous foundation, and as relying on ambiguous terms (known, knowable, sense, categorize). Tom Graves has questioned whether it functions as pseudoscience or even a cult of personality, and at least one critique calls it "essentially yet another a-theoretical framework in the complex world of complexity," not burdened with epistemological or ontological reflection. None of that means the move is worthless; it means the move is unproven, which is exactly what a C grade records.

**No laundered statistics.** Cynefin is mercifully free of a viral fake number, and this entry adds none. There is no traceable controlled effect size to quote, so none is quoted; any "Cynefin improves outcomes by N%" framing should be treated as unsourced and excluded.

**Transfer caveat (required).** All of the supporting context is from human managers, clinicians, and facilitators in organizational and field settings. None of it studies Cynefin used by or with an AI agent. The evidence, such as it is, is transferred from human contexts and is not validated for AI-augmented use, which holds the grade at C rather than higher.

## Why it is / is not a skill here

Verdict: **Flag - documented with its trademark and weak-evidence caveats, not shipped as a skill.**

The IP gate is open, so a famous branded framework is documented here with full attribution rather than omitted. But documentation is not shipping, and two things keep Cynefin out of the catalog as a standalone skill.

First, **evidence and cargo-cult risk**. The brand-specific evidence is conceptual only (C), and a skill in this library has to clear an evidence-and-distinctness bar that an unproven sorting taxonomy does not. Worse, Cynefin is unusually prone to the failure this library is built to avoid: the vocabulary is satisfying to recite ("ah, this is *complex*, we should *probe*"), which makes it easy to perform the ritual without changing any decision. Shipping a skill whose most likely output is a confident label rather than a sharper choice would be shipping the cargo cult, not the capability.

Second, **the trademark**. "Cynefin" and the associated method are held by The Cynefin Co. (formerly Cognitive Edge / Dave Snowden), so the framework is named and attributed descriptively here; it is not re-packaged as a product skill, and its branded facilitation methods are not reproduced.

The durable move - triage a problem by how knowable its causal structure is, then match an ordered-versus-emergent response - is real and worth knowing. But the catalog ships distinct, evidenced cognitive moves, not branded taxonomies, and the parts of Cynefin's move that *are* actionable are already reachable through shipped skills: enumerating causes is cause decomposition, holding divergent external futures is scenario work, and choosing among options under stated criteria is an explicit option comparison. Cynefin's distinctive contribution on top of those is the unproven five-box classification and its vocabulary, which is precisely the part that is under-evidenced and cargo-cult-prone. So the decision is to keep Cynefin documented with its caveats, credit its lineage, and not ship a branded sorting heuristic whose evidence is conceptual and whose dominant failure mode is the label-as-answer.

The learning value of this NO: fame, an HBR award, and wide teaching are not evidence of decision-quality improvement, and a vocabulary that is pleasant to speak is not the same as a move that changes what you do. Cynefin earns a place in the library as a documented, attributed, caveated framework - not as a skill.

## Lineage and who to read

- Origin: **Dave Snowden, 1999**, while at IBM Global Services, where he began the model to help manage intellectual capital and knowledge. He developed it further as European director of IBM's Institute of Knowledge Management and as founder of the IBM Cynefin Centre for Organizational Complexity (established 2002). The name is the Welsh word *cynefin*, habitat or "the place where we belong," chosen to evoke the many unconscious influences of context on how we make sense of a situation.
- First detailed publication: **Cynthia F. Kurtz and David J. Snowden**, "The new dynamics of strategy: Sense-making in a complex and complicated world," *IBM Systems Journal* 42(3) (2003): 462-483. Frames Cynefin as a sense-making device built from action research on narrative and complexity theory, and challenges the universal assumptions of order, rational choice, and intent. The foundational scholarly statement.
- Popularization: **David J. Snowden and Mary E. Boone**, "A Leader's Framework for Decision Making," *Harvard Business Review* 85(11) (2007): 68-76. The widely cited management article that brought Cynefin to a general leadership audience; won the Academy of Management's Outstanding Practitioner-Oriented Publication in Organizational Behavior award (2008).
- For the critical and applied read: the PMC review applying Cynefin to **diagnostic reasoning in internal medicine** (2021), which both endorses it as a conceptual lens and states that "scientific proof of its validity has yet to be provided"; and **Tom Graves'** critique questioning whether the framework operates as pseudoscience or a cult of personality. Pair the HBR article with these rather than taking its claims at face value, and treat the descriptive applications (healthcare, biomedical research, projects) as demonstrations of use, not of effect.
- Trademark: "Cynefin" and the associated framework are held by **The Cynefin Co.** (formerly Cognitive Edge, founded by Dave Snowden). The framework is named and attributed here descriptively; the branded method is not reproduced as a product, and the brand's framing is not relied on as evidence.

### Named sources

- Cynthia F. Kurtz and David J. Snowden, "The new dynamics of strategy: Sense-making in a complex and complicated world," *IBM Systems Journal* 42(3) (2003): 462-483. The foundational framework paper. Conceptual / action-research. (C)
- David J. Snowden and Mary E. Boone, "A Leader's Framework for Decision Making," *Harvard Business Review* 85(11) (2007): 68-76. The popularizing article; award-winning practitioner publication, not an effectiveness study. (C, practitioner)
- "Diagnostic Reasoning in Internal Medicine: Cynefin Framework Makes Sense of Clinical Complexity," PMC8100038 (2021). Applies Cynefin to clinical reasoning and states explicitly that scientific proof of the framework's validity has yet to be provided. A conceptual application, not a controlled trial. (C, critical)
- Tom Graves, critique questioning whether Cynefin functions as pseudoscience or a cult of personality, and the related characterization of it as an "a-theoretical framework" not burdened with epistemological or ontological reflection. The critical view of the framework's rigor. (Critical literature)

> No statistic is excluded here because none is in circulation as a primary-source effect: Cynefin carries no traceable controlled effect size, so no number is quoted toward the grade, and any "Cynefin improves outcomes by N%" framing should be treated as unsourced.
