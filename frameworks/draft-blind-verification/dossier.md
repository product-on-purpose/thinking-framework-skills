---
title: Draft-blind verification
slug: draft-blind-verification
generated_status: true
---

<!-- STATUS:GENERATED (gen-site.mjs from frameworks/registry.mjs) - do not edit between these markers -->
<!-- /STATUS:GENERATED -->

## What it is

Draft-blind verification checks a draft's factual claims by re-asking them, not by re-reading them. The reasoner lists the draft's checkable claims. It turns each claim into an open verification question that does not carry the draft's answer, such as "In what year did the company file for bankruptcy?" rather than "Did it file in 2009?". It answers each question in a fresh context that cannot see the draft. Then it compares each answer with the claim it came from. Where the two disagree, it revises the draft or marks the claim as unverified.

The move has two working parts, and the evidence treats them differently.

1. **Claim-level questioning.** A short, targeted question is often answered more accurately than the same fact embedded in long-form text. This part works even when the checker can see the draft.
2. **Blindness to the draft.** The answering pass never sees the draft, so it cannot copy the draft's errors. The Chain-of-Verification authors describe the failure that blindness prevents: models "that attend to existing hallucinations in the context from their own generations tend to repeat the hallucinations".

The second part is a structural constraint, not a mental act. A language-model agent meets it by handing only the questions to a subagent or a new conversation. A person cannot meet it alone, because a person cannot un-see a draft. The human form needs a second reader who has not seen the draft, or a delay long enough for the draft to fade.

The artifact is a **claim verification ledger**. Each row holds a claim, its verification question, the blind answer, a verdict of agree, conflict or cannot answer, and the action taken on the draft.

## When it helps / when it misleads

It helps when a draft makes many discrete, checkable factual claims: names, dates, counts, attributions, list members or quoted figures. It helps most when the agent that wrote the draft is also the one checking it. The evidence is strongest for closed-book factual recall, such as list-style questions and short biographies. It fits the moment before an agent hands a factual summary, briefing or research note to a person who will act on it.

It misleads or wastes effort when:

- **The model does not know the fact.** Blinding adds no knowledge the model lacks. A belief the model holds consistently will come back the same way in the blind pass, and the ledger will show a false agreement. The move catches inconsistent errors, not confident ones. Where a source can be consulted, checking against the source is the stronger move. Lateral source check, a lead held for wave 5, is the human version of that move.
- **The claims are reasoning steps, judgments or plans, not facts.** Self-critique without new information can make reasoning worse (Huang et al. 2024; Stechly, Valmeekam and Kambhampati 2025). The move is not shown for arithmetic, logic, planning or opinion, so it must not be offered as a general accuracy check.
- **No fresh context is available.** If the questions are answered in the same context as the draft, the skill becomes the weaker joint variant. That variant still helped in Chain-of-Verification, but it loses the ingredient that makes this method distinct. The output must say which variant ran rather than claim the blind result.
- **The verification questions leak the draft.** A question such as "Is it true that X founded Y in 1998?" carries the draft's answer into the blind pass. The questions must be open, and the ledger records them so a reader can check for leaks.
- **The draft is short or the stakes are low.** Factoring a three-sentence answer into a ledger costs more than the check is worth.
- **A person runs it alone.** An instruction to ignore what you have seen does not fully remove its influence (Steblay et al. 2006, the closest human evidence). Without a second reader or a delay, a solo human check is a re-read, which this method is not.

## What the evidence says

The honest governing grade is **C (conceptually plausible but under-tested), and it describes people**. The agent line is **M, narrow**. Under this library's split rule, the agent line cannot raise the governing grade. The evidence here runs the opposite way from most of the library: it is native to language models and has not been tested on people.

**The agent line has one direct test of the move.** Only one study compares a verifier that sees the draft with one that does not. Dhuliawala et al. (2024, Findings of ACL) ran Chain-of-Verification on Llama 65B. On list questions built from Wikidata, precision was 0.17 for the few-shot baseline and 0.29 for the joint variant, whose verifier sees the draft. It was 0.32 for the factored variant and 0.36 for the two-step variant, whose answering steps do not see it. On longform biographies, scored for factual precision, the baseline reached 55.9, joint 60.8, factored 63.7 and factor-and-revise 71.4. In the paper's tables, the variants whose answering steps do not see the draft outperformed the joint variant on both tasks.

Two features of these numbers matter for the grade.

- The two tasks split on which ingredient matters more. On the Wikidata lists, the draft-visible joint variant already captured most of the gain: it moved precision from 0.17 to 0.29, out of a total move to 0.36. On the biographies the pattern reverses. Joint moved the score from 55.9 to 60.8, out of a total move to 71.4, so the blind and revise steps delivered about two thirds of it. Claim-level questions and blindness both carry part of the effect, and neither is dispensable.
- This run found no independent replication of the joint-versus-blind comparison. The one counter-signal found was an anonymous, unreviewed preprint on Urdu models that reports factored Chain-of-Verification below its baseline. It has no nameable authors, so it is excluded from the grade.

**An independent group converges on detection.** Manakul, Liusie and Gales (2023, EMNLP), at Cambridge, built SelfCheckGPT. It compares each sentence of a draft with answers sampled independently of that draft, and it flags the sentences those samples contradict. On GPT-3 passages about people from WikiBio, it detected hallucinated sentences without an external database. It tests detection, not revision, and it has no draft-visible comparison arm. So it supports the re-derive-and-compare half of the move, not the blindness increment.

**One source was not assessed in this run.** The wave-4 first-hand check confirmed the record and abstract of George and Stuhlmüller (2023, WIESP), a factored-verification evaluation on HaluEval from authors affiliated with Elicit, a company that sells research tools. It carries a vendor flag. This run had no search budget left to read it, so it is neither graded nor counted here.

**Transferred evidence shows that a separate pass beats an instruction to ignore.** Two studies test the same structural ingredient on input context rather than on a draft. In System 2 Attention, a separate pass rewrote the prompt to remove distracting material, and accuracy rose from 62.8% to 80.3%. An instruction to ignore the distraction reached 71.7% (Weston and Sukhbaatar 2023, arXiv preprint). Weston is also a Chain-of-Verification author, so this is the same research group. In SimToM, a separate pass filtered a story down to what one character knows, and GPT-3.5 on the ToMI benchmark rose from 67.25 to 81.0. A single combined prompt reached 58.75 (Wilf, Lee, Liang and Morency 2024, ACL). Neither study verifies a draft. They are the direct evidence for the library-wide fresh-context rule queued as decision D7, and they transfer to this method only as support for its blindness ingredient.

**Three other groups bound the move.**

- Huang et al. (2024, ICLR) found that intrinsic self-correction, without external feedback, can lower reasoning accuracy. GPT-3.5 on CommonSenseQA fell from 75.8 to 41.8 after self-correction.
- Stechly, Valmeekam and Kambhampati (2025, ICLR) tested GPT-4 on Game of 24, graph coloring and STRIPS planning. Self-critique sharply lowered performance, while a sound external verifier raised it.
- Kamoi et al. (2024, TACL) surveyed the field. They found no work that shows successful self-correction with feedback from prompted models, "except for studies in tasks that are exceptionally suited for self-correction". Self-correction worked well when reliable external feedback was available.

Read together, these results place draft-blind verification in a narrow class: decomposable, closed-book factual claims, where a short question is easier than the long-form generation. They do not license it as a general check on reasoning.

**A mechanism note carries no weight in the grade.** Panickssery, Bowman and Feng (2024, NeurIPS) found that models recognize their own text. Self-recognition correlated linearly with self-preference when the models evaluated summaries. That is a plausible reason a checker that sees its own draft goes easy on it. It measures evaluation, not verification, so it does not move the grade.

**The human line is C.** No study found in this run, or by the two wave-4 research runs that proposed the method, tests a person who checks claims while blind to their own draft. The nearest human evidence is weak or null, and none of it is negative.

- *Independent double checking in medication safety.* Koyama et al. (2020, BMJ Quality and Safety) reviewed 13 hospital studies, three of them high quality. Only one high-quality study showed fewer errors with a double check, and the review found insufficient evidence that double checking beats single checking. Westbrook et al. (2021, BMJ Quality and Safety) observed 298 nurses giving 5,140 doses. Checks were rarely independent and primed checks were common. Mandated double checking was not significantly associated with fewer errors. This is a second person checking, not self-blinding, and the practice seldom achieved independence. So the null does not test the move, but it does show that blindness is hard to achieve in practice. Both papers appear on Macquarie University's research portal and likely come from one research program, so they count as one group's work, not two.
- *Proofreading one's own text.* Daneman and Stainton (1993, Reading and Writing) are reported to have found that people catch fewer errors in their own essays than in unfamiliar ones, and they attributed it to familiarity. This run saw that finding only as reported by later papers. Burgoyne et al. (2022, Psychological Research) did not find a reliable self-generation effect in two eye-tracking experiments. The human premise that seeing your own draft hides its errors is therefore unsettled.
- *Instructions to disregard.* Steblay, Hosch, Culhane and McWethy (2006, Law and Human Behavior) pooled 175 hypothesis tests from 48 studies, with 8,474 participants. Inadmissible evidence shifted verdicts, and an instruction to disregard it did not fully remove that effect. This supports the claim that a person cannot blind themselves by instruction. It does not show that structural blinding improves checking.
- *Independent second estimates.* The shipped dialectical-bootstrapping dossier records that averaging two of one's own estimates helps more when the second comes after a delay (Vul and Pashler 2008; van Dolder and van den Assem 2018). That is the nearest human evidence that independence from a first answer adds value. It concerns numeric estimates and averaging, not claim verification, so it is transferred and does not raise the grade.

**Transfer flag (required).** The evidence is agent-native. It comes from Llama 65B, GPT-3, GPT-3.5 and GPT-4 on narrow tasks, and none of it is validated on people. None of it tests current frontier models, and the blindness increment rests on one ablation in one paper. If the method is built, it should present itself as an M-narrow agent technique inside a C-graded method.

**Excluded under the evidence rule.** The anonymous Urdu preprint is excluded, as stated above. A figure for the share of independent checks in Westbrook et al. (2021) appeared only in a search-result summary that misattributed the paper, so it is not used.

## Why it is / is not a skill here

Verdict: **Build, as a candidate (`cand`), governed at C.** This keeps the verdict and tier of the wave-4 admission, decision D3 (admit draft-blind verification), recorded in `docs/internal/research/2026-10-19-wave4-external-research.md`. It corrects the admission's reasoning in three places.

**Correction 1: the move has one direct test, not three.** The admission said that three ablations from two research groups isolate the ingredient. Only Chain-of-Verification verifies a draft. System 2 Attention, from the same group, and SimToM remove input context in a separate pass. They support the blindness ingredient by transfer, and they are the direct evidence for decision D7.

**Correction 2: distinctness does not rest on blindness alone.** The admission drew the boundary between blind and draft-visible checking, and it placed the draft-visible check in red-team-light as the Structured Self-Critique fold. But the joint variant's verifier sees the draft and still writes and answers claim-level verification questions, which red-team-light never does. The method adds a claim-verification move the library lacks. Blindness is the constraint that makes that move work best.

**Correction 3: the D7 rule cannot deliver this move.** Decision D7 (the library-wide fresh-context rule, queued in `docs/internal/backlog.md`) hands set-aside material to a fresh context wherever a skill already tells an agent to set something aside. It modifies steps that already exist. No shipped skill verifies claims, so the rule has no step to modify. Delivered only as the rule, the library would gain blindness and still have no claim-verification move. The two are complementary. D7 is the execution constraint, and this method is the one place where that constraint is the core rather than a guard. The built skill should cite the D7 rule for its blind step rather than restate it, so the rule is written once.

**The distinctness proof.** The single durable move is this: check a draft by re-asking each of its claims as an open question, answer each question apart from the draft, then reconcile. Against each neighbor:

- **Evidence vs Inference Sort (closest; medium overlap).** It shares the claim-listing step, which is about a fifth of the mechanism and sits at the ceiling. Its own When NOT to use excludes fact-checking: "It labels what *kind* of claim something is, not whether it is true." A fold would change that skill's scope. The same wall kept objectives-first alternative generation out of decision-option-review in wave 4. The two chain cleanly instead: the sort's Evidence rows become the claims this method verifies. The built skill must take that ledger as input rather than re-implement claim typing, or the overlap will cross the ceiling.
- **Red-team-light (medium on use case, low on mechanism).** Both pressure-test an agent's own output. Red-team-light builds the strongest objections against a thesis it must see. It writes no verification questions and answers nothing independently. Draft-visible self-critique stays its fold.
- **Dialectical bootstrapping (low).** Both draw a second answer from the same mind. Dialectical bootstrapping builds its second estimate from the first by design, works on one number, and averages the two. This method keeps the second pass blind, works on many discrete claims, and compares rather than averages.
- **Consider the unknowns (low).** It lists evidence that is absent. This method checks claims that are present.
- **Authentic dissent (low).** It engineers real dissent in human groups. It shares one lesson, that a check by the same mind is weaker than an independent one. It is also the precedent for a skill whose human form needs another person.
- **Brainwriting (low).** It already uses blindness as a constraint inside its generation step, which asks for streams "generated as if blind to the others". That confirms that blindness is usually an execution constraint in this library, which is D7's framing.

No sequence of shipped skills produces the move, because no shipped skill answers verification questions, so it is not a recipe. Confidence in distinctness is medium. It is high that no shipped skill verifies claims. It is medium that the overlap with Evidence vs Inference Sort stays under the ceiling once the skill is written.

**Why not Reject.** The strongest case for rejection is that this is a hallucination-mitigation technique for agents rather than a thinking method, and that its human line is C. But the library is built for agents and the humans who work with them, and it already ships C-graded skills. It also has a named gap here: its own claim sorter calls truth-checking "a separate, fact-checking job". A C grade lowers the tier, not the verdict.

**What a build owes.** The When NOT to use must say that blinding adds no knowledge the model lacks. It must say that the move is shown only for closed-book factual claims, and that without a fresh context it degrades to the joint variant. The artifact must record each verification question, so a reader can see whether a question leaked the draft's answer. The human form must name a second reader or a delay, never an instruction to ignore. The current name foregrounds the constraint rather than the move. "Draft-blind claim verification", the name the wave-4 record mapped the leads to, would say both; that choice belongs to the maintainer.

## Lineage and who to read

The blind form of the move comes from research on language-model hallucination. The claim-level half has an older practitioner relative: editorial fact-checking, in which a checker who did not write the piece verifies it claim by claim. That checker sees the draft, so it is the un-blinded form, and it carries no controlled evidence here. Two other human relatives are closer to the blind form. One is the independent double check in medication safety, in which a second nurse works out a dose without seeing the first nurse's working. The other is the classroom habit of checking an answer by re-solving rather than re-reading. Neither has controlled evidence that it works, and this run found no controlled study of the re-solving habit.

Dhuliawala et al., at Meta AI and ETH Zurich, introduced Chain-of-Verification; Jason Weston is a co-author. Jason Weston and Sainbayar Sukhbaatar's System 2 Attention, and Alex Wilf, Sihyun Lee, Paul Pu Liang and Louis-Philippe Morency's SimToM, show the same separate-pass ingredient on input context. Potsawee Manakul, Adian Liusie and Mark Gales's SelfCheckGPT is the detection analog from an independent group. For the limits, read Huang et al. (2024), Stechly, Valmeekam and Kambhampati (2025), and the survey by Kamoi et al. (2024). Chain-of-Verification, System 2 Attention, SimToM and SelfCheckGPT are paper names, not trademarks. The method is documented under a generic descriptive name and is not branded.

### Named sources

1. Dhuliawala et al. (2024), "Chain-of-Verification Reduces Hallucination in Large Language Models", Findings of ACL 2024. The only direct test: a verifier blind to the draft beat one that sees it on Wikidata lists and biographies, on Llama 65B. One paper and one lab; no independent replication found. (M, narrow, agent)
2. Manakul, Liusie and Gales (2023), "SelfCheckGPT: Zero-Resource Black-Box Hallucination Detection for Generative Large Language Models", EMNLP 2023. An independent group: draft sentences compared with independently sampled answers detect hallucinations. Detection only, with no draft-visible arm. (M, narrow, agent; supports re-derive-and-compare, not the blindness increment)
3. Weston and Sukhbaatar (2023), "System 2 Attention (is something you might need too)", arXiv preprint 2311.11829. A separate rewrite pass beat an instruction to ignore, on input context rather than a draft. Same group as source 1. (Transferred, agent; D7's evidence)
4. Wilf, Lee, Liang and Morency (2024), "Think Twice: Perspective-Taking Improves Large Language Models' Theory-of-Mind Capabilities", ACL 2024. A separate perspective-filter pass beat a single combined prompt, on input context rather than a draft. (Transferred, agent; D7's evidence)
5. Huang et al. (2024), "Large Language Models Cannot Self-Correct Reasoning Yet", ICLR 2024. Intrinsic self-correction can lower reasoning accuracy. (Bound, agent)
6. Stechly, Valmeekam and Kambhampati (2025), "On the Self-Verification Limitations of Large Language Models on Reasoning and Planning Tasks", ICLR 2025. Self-critique lowered and a sound external verifier raised GPT-4's performance on reasoning and planning tasks. (Bound, agent)
7. Kamoi et al. (2024), "When Can LLMs Actually Correct Their Own Mistakes? A Critical Survey of Self-Correction of LLMs", TACL 12: 1417-1440. Prompted self-correction is shown only on tasks exceptionally suited to it. (Bound, review)
8. Panickssery, Bowman and Feng (2024), "LLM Evaluators Recognize and Favor Their Own Generations", NeurIPS 2024. Self-recognition correlates with self-preference in evaluation. (Mechanism note; measures evaluation, not verification; no weight in the grade)
9. Koyama et al. (2020), "Effectiveness of double checking to reduce medication administration errors: a systematic review", BMJ Quality and Safety 29(7): 595-603. Insufficient evidence that double checking beats single checking. (Nearest human analog; null)
10. Westbrook et al. (2021), "Associations between double-checking and medication administration errors: a direct observational study of paediatric inpatients", BMJ Quality and Safety 30(4): 320-330. Checks were rarely independent, and mandated double checking was not significantly associated with fewer errors. (Nearest human analog; null)
11. Steblay, Hosch, Culhane and McWethy (2006), "The Impact on Juror Verdicts of Judicial Instruction to Disregard Inadmissible Evidence: A Meta-Analysis", Law and Human Behavior 30(4): 469-492. An instruction to disregard does not fully remove evidence's influence. (Human evidence that self-blinding by instruction fails; not evidence that structural blinding helps)
12. Burgoyne et al. (2022), "Revisiting the self-generation effect in proofreading", Psychological Research. No reliable self-generation effect in two eye-tracking experiments. (Human premise; null)
13. Daneman and Stainton (1993), "The generation effect in reading and proofreading", Reading and Writing 5: 297-313. Fewer errors caught in one's own text, attributed to familiarity. Seen only as reported by later papers. (Human premise; secondary only)
14. Vul and Pashler (2008), Psychological Science 19(7); van Dolder and van den Assem (2018), Nature Human Behaviour 2. A delayed second estimate adds more to an average. Carried from the shipped dialectical-bootstrapping dossier and not re-checked here. (Transferred human analog)

> Figure provenance for this dossier. The Chain-of-Verification joint, factored and biography figures, the System 2 Attention and SimToM figures, and the Huang et al. figure were checked first-hand against the papers' tables on 2026-10-19, as recorded in the wave-4 synthesis. This run did not re-see those tables. It re-saw the 0.17 and 0.36 Wikidata figures and the "consistently outperforming" phrase quoted from the Chain-of-Verification text, and it saw every other source at abstract level on 2026-10-20.
