# Adversarial verification: draft-blind-verification (C, build, cand)

Verifier: Sonnet, read-only, 2026-10-20. Scope: the engine's dossier at `_local/research/2026-10-20-wave4-vetting/draft-blind-verification/dossier.md` and its proposed registry entry at `_local/research/2026-10-20-wave4-vetting/draft-blind-verification/proposed-entry.json`.

## Agreement

**Verdict (Build, cand, agent line M narrow): AGREE.** Every load-bearing figure in the Chain-of-Verification ablation checks out against the paper, and the qualitative distinctness argument survives scrutiny: the joint (draft-visible) CoVe variant does write and answer claim-level verification questions, which `think-red-team-light` never does, so the claim-verification move is real and not reducible to blindness alone. The one correction I would make (below, under Majors) narrows the "most of the gain is non-blind" claim rather than reversing it, and if anything strengthens the case for shipping the move, because the longform-generation task (the one closer to what an agent actually drafts) shows blindness-plus-revision carrying the larger share of the improvement.

**Tier (C, governing): AGREE, under the rule as written.** `agents/think-research-framework.md` states the rule without qualification: "When the honest read is split... the tier you emit MUST be the CONSERVATIVE (lower) grade, never the optimistic half." `docs/contributing.md` fixes the ordinal scale explicitly: "S strong research, M moderate, P practitioner, V vendor/commercial, A anecdotal, C conceptually plausible but under-tested, X poor or contradictory." On that scale C sits below M, so a C/M split governs at C exactly as the dossier computed. The rule carries no carve-out for "but the skill will mostly be run by an agent, so grade the agent population." Taken literally and mechanically, C is correct. See the flag below for the one place I think this deserves a maintainer decision rather than silent acceptance.

## Majors

**1. The "joint captured most of the gain" claim is true only for Wikidata; the biography task shows the opposite pattern, and the dossier's generalizing sentence does not disclose that.**

Confirmed figures (Dhuliawala et al. 2024, Table 1 and Table 3, Llama 65B):
- Wikidata precision: baseline 0.17, joint 0.29, factored 0.32, two-step 0.36.
- Biography FActScore: baseline 55.9, joint 60.8, factored 63.7, factor-and-revise 71.4.

Wikidata: joint's share of the total move to two-step = (0.29-0.17)/(0.36-0.17) = 0.12/0.19 = 63%. The dossier's claim that "the draft-visible joint variant already captured most of the Wikidata gain" (dossier.md line 44) is correct and is correctly scoped to Wikidata only.

Biography: joint's share of the total move to factor-and-revise = (60.8-55.9)/(71.4-55.9) = 4.9/15.5 = 32%. The blind steps (factored plus the explicit revise step) deliver 68% of the gain, the reverse of the Wikidata pattern. Revision is not a bolt-on separate from "blindness" here: the skill's own "What it is" section defines the move as list claims, ask blind, then "where the two disagree, it revises the draft or marks the claim as unverified" (dossier.md line 12), so factor-and-revise is the correct full measure of the biography-task move, not an inflated comparison point.

The dossier's next sentence generalizes beyond the scoped claim: "Most of the measured benefit comes from asking claim-level questions, and blindness adds the increment" (dossier.md line 44, repeated near-verbatim in `proposed-entry.json`'s `reasoning` field: "Most of the measured effect comes from claim-level verification questions, and blindness adds the increment"). As written this reads as a conclusion from the whole ablation, including the biography figures stated two sentences earlier in the same paragraph, but only the Wikidata figure supports it. This is the kind of selective-evidence-presentation the library's honesty standard exists to catch, even though no individual number is fabricated.

This does not flip the Build verdict: red-team-light still never writes or answers verification questions, so the claim-verification move is distinct regardless of which task the gain concentrates in. If anything, correcting this makes the case for the method stronger on the task that matters most to an agent checking its own draft (long-form generation), and weaker only on a narrow list-recall task. Recommend fixing the generalizing sentence before it ships in the registry's `reasoning` field (see Corrected figures).

**2. The tier rule has no stated answer for an agent-first skill whose stronger evidence is the agent line - flag for the maintainer, not a defect in this run.**

This is, by the dossier's own account and by `docs/internal/backlog.md` line 128, the library's first candidate whose strongest evidence is native to language models rather than transferred from human studies. Every existing M/P-split precedent I checked (`think-red-team-light`, `think-dialectical-bootstrapping`) runs the usual direction: solid human-subjects evidence for the move, independently capped because it is not AI-validated, and the single tier describes that human evidence. Here the asymmetry is reversed and sharper: the agent line has a real controlled ablation (M, narrow); the human line is not merely unvalidated but close to unexecutable solo ("a person cannot un-see a draft," dossier.md line 19). Mechanically applying "always take the lower tier" produces a C grade for a method whose own dossier concludes a solo human form barely exists, while the agent form - the library's actual primary user per `AGENTS.md`'s "for AI agents and the humans who work with them" - has real M-tier support. The rule as written does not instruct the engine to weight by which population the skill primarily serves, so I am not marking this a misapplication. I am flagging it because the current rule, read literally, will keep producing C-capped grades for any future agent-native method regardless of how strong the agent evidence gets, which is a policy choice the maintainer should make deliberately (a backlog line, not a silent default) rather than let ride on this one entry's precedent.

## Minors

**Misquote: "consistently outperforming the joint approach" is not a verbatim quote.** Dossier.md line 40 presents this in quotation marks as if lifted from the paper. The paper's actual sentences (Section 4.3) are: "We observe a consistent performance improvement across all tasks from applying the factored CoVe approach" and, separately, "the 2-step approach also outperforms the joint approach." The dossier's phrase blends both into a form that reads as a direct quote but is not one. The substance is accurate (the paper does report factored and 2-step both beating joint); only the quotation-mark framing is wrong. Replace with either an unquoted paraphrase or the two real quotes.

**No issue found, confirmed clean:** the Daneman and Stainton (1993) citation the brief asked me to check (the dossier was unsure of its link). The DOI 10.1007/BF01027393, reached via the Springer URL cited in the prior wave-4 research doc, resolves via OpenAlex to the correct record: "The generation effect in reading and proofreading," Daneman and Stainton, *Reading and Writing* 5(3): 297-313, 1993. Matches the dossier's citation exactly. This one did not need a fix.

## Evidence-honesty flags

- **Quotation not verbatim in its source:** the "consistently outperforming the joint approach" phrase, above. Low severity (the substance is correct), but it is exactly the kind of thing the gate's confirm-note / quotation-fidelity discipline exists to catch, and it is presented with quotation marks.
- **Selective figure use without disclosure:** the "most of the gain is non-blind" generalization, Major 1 above. This is not grade laundering (the governing tier is still capped at C, correctly) and it does not misstate any individual number, but it builds a narrative claim from one of two reported metrics in the same ablation without naming that the other metric in the same table points the other way.
- **No fabricated or unsourced figures found.** Every numeric claim I checked against a primary source matched exactly (see table below). The one excluded item (the anonymous Urdu preprint) is correctly excluded under the library's own rule, and the George and Stuhlmüller source is correctly left ungraded rather than guessed at.

## Source table

| Source | URL fetched | Confirmed |
|---|---|---|
| Dhuliawala et al. 2024, Chain-of-Verification | `https://ar5iv.labs.arxiv.org/html/2309.11495`, `https://aclanthology.org/2024.findings-acl.212`, `https://doi.org/10.18653/v1/2024.findings-acl.212` | All four Wikidata figures (0.17/0.29/0.32/0.36) and all four biography FActScore figures (55.9/60.8/63.7/71.4) match Tables 1 and 3 exactly. The hallucination-repetition sentence is verbatim. The "consistently outperforming" phrase is not verbatim (see Minors). Metric name is FActScore (table header "FactScore"). DOI resolves to the correct ACL Anthology record, title and 7-author list match. |
| Weston and Sukhbaatar 2023, System 2 Attention | `https://ar5iv.labs.arxiv.org/html/2311.11829` | 62.8% / 80.3% / 71.7% all confirmed exactly, on a modified TriviaQA-from-SycophancyEval task with LLaMA-2-70B-chat; oracle is 82.0%. |
| Wilf, Lee, Liang, Morency 2024, SimToM | `https://ar5iv.labs.arxiv.org/html/2311.10227`, `https://aclanthology.org/2024.acl-long.451` | 81.0 (SimToM), 58.75 (single-prompt ablation), and 67.25 (0-shot baseline, the figure the dossier reports) all confirmed on ToMI with GPT-3.5. URL resolves to the correct title and 4-author list. |
| Huang et al. 2024, self-correct | `https://arxiv.org/html/2310.01798v2` | 75.8 to 41.8 confirmed (Table 3, gpt-3.5-turbo-0613, CommonSenseQA, intrinsic self-correction, round 2). |
| Stechly, Valmeekam, Kambhampati 2025 | `https://arxiv.org/abs/2402.08115` | Direction confirmed: "significant performance collapse with self-critique," "significant performance gains with sound external verification," across Game of 24, graph coloring, STRIPS planning. |
| Kamoi et al. 2024, TACL | `https://aclanthology.org/2024.tacl-1.78/` | "except for studies in tasks that are exceptionally suited for self-correction" confirmed verbatim. |
| Manakul, Liusie, Gales 2023, SelfCheckGPT | `https://api.openalex.org/works/doi:10.18653/v1/2023.emnlp-main.557`, `https://arxiv.org/abs/2303.08896` | Title, authors (Manakul, Liusie, Gales J.F.), EMNLP 2023, WikiBio/GPT-3, zero-resource sampling-consistency detection, all confirmed. |
| Koyama et al. 2020 | `https://api.openalex.org/works/doi:10.1136/bmjqs-2019-009552` | 13 studies, 3 high quality, 1 high-quality study showing fewer errors confirmed (the other two showed no association or reported adherence only - a minor nuance the dossier's one-line summary compresses but does not misstate). |
| Westbrook et al. 2021 | `https://api.openalex.org/works/doi:10.1136/bmjqs-2020-011473` | 298 nurses, 5,140 doses confirmed exactly. |
| Steblay et al. 2006 | `https://api.openalex.org/works/doi:10.1007/s10979-006-9039-7` | 48 studies, 175 hypothesis tests, 8,474 participants confirmed exactly (verbatim in the abstract). |
| Daneman and Stainton 1993 | `https://api.openalex.org/works/doi:10.1007/BF01027393` | Title, authors, journal, volume, pages all confirmed; this was the one the engine flagged as unsure, and it checks out. |

Not fetched (out of the ~25-fetch budget and not load-bearing for the verdict): Panickssery, Bowman and Feng 2024 (explicitly "no weight in the grade" per the dossier); Vul and Pashler 2008 and van Dolder and van den Assem 2018 (carried unchanged from the shipped dialectical-bootstrapping dossier, not re-derived here); Burgoyne et al. 2022 and Eyal, Steffel and Epley 2018 (secondary human evidence, not load-bearing for the C tier, which is already the floor).

## Corrected figures

Replace dossier.md line 44 (and the parallel sentence in `proposed-entry.json`'s `reasoning` field):

> Most of the measured benefit comes from asking claim-level questions, and blindness adds the increment.

with:

> On the Wikidata list task, the draft-visible joint variant captured most of the gain (63%, 0.17 to 0.29 of 0.17 to 0.36), and blindness added the rest. On the biography task, the pattern reverses: joint captured only 32% of the gain to factor-and-revise (55.9 to 60.8 of 55.9 to 71.4), and the blind steps, including the revise step, delivered the majority. The claim-level-questions ingredient and the blindness ingredient trade off which one dominates by task; neither is dispensable.

Replace dossier.md line 40's quoted phrase:

> The paper reports the factored and two-step variants "consistently outperforming the joint approach".

with:

> The paper reports "a consistent performance improvement across all tasks from applying the factored CoVe approach" and that "the 2-step approach also outperforms the joint approach."
