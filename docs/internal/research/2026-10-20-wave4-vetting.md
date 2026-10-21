# Wave-4 vetting: the three build candidates (2026-10-20)

> **Status: vetted, not admitted.** The three build candidates that wave 4 admitted on 2026-10-19 were each vetted with the `think-research-framework` engine and then adversarially verified. Every verdict below is a proposal. Nothing here was written to `frameworks/registry.mjs`, and each candidate's registry row still ends "Preliminary; pending deep-research vetting." Admission and tiers are the maintainer's decisions. The wave-4 synthesis these candidates came from is [`2026-10-19-wave4-external-research.md`](2026-10-19-wave4-external-research.md).

## Outcome at a glance

**All three candidates survived as Build.** The 2026-10-20 roadmap expected about two of three to survive, because about two thirds of earlier candidates folded, became recipes or were rejected. Each verifier agreed with its engine's verdict, and one verifier disagreed with its tier.

| Candidate | Row on 2026-10-19 | Engine verdict and tier | Verifier on the verdict | Verifier on the tier |
|---|---|---|---|---|
| `causal-dag-adjustment-check` | cand, build, P | Build, P | Agrees | Agrees, and calls it the closest call in the dossier |
| `objectives-first-alternative-generation` | cand, build, M | Build, M (narrow) | Agrees | **Disagrees: recommends P (narrow)** |
| `draft-blind-verification` | cand, build, C | Build, C (the agent line is M, narrow) | Agrees | Agrees, under the rule as written |

Each candidate is staged at `frameworks/_proposed/<slug>/`, the engine's own staging path, which `check-registry.mjs` exempts from the orphan-dossier check. Each folder holds three files:

- `dossier.md`, the engine's dossier with the verifier's factual corrections applied;
- `proposed-entry.json`, the replacement registry row, which passes `check-proposed-entry.mjs`;
- `verify.md`, the verifier's report, unedited, so its findings refer to the files as they were before the corrections.

## How the vetting ran

1. **One engine run per candidate, on Opus.** Each run followed `agents/think-research-framework.md` in NAME mode. The engine's procedure was given to a general-purpose agent rather than invoked as the registered subagent type. Those agents had no page-fetch tool, so the engine's figures came from search-result text. Each dossier says which figures it saw first-hand.
2. **One adversarial verifier per candidate, on Sonnet, read-only.** Each verifier re-checked the cited sources first-hand through OpenAlex, CrossRef, arXiv and publisher pages, and read the nearest shipped skills to test the distinctness claims.
3. **Corrections applied here are factual only.** A correction was applied when a verifier confirmed it against a source. No tier was changed, and no quotation was re-quoted from the verifier's report without a first-hand check: a misquote was replaced by a paraphrase instead.

## Per candidate

### `causal-dag-adjustment-check` (Build, P)

The move is to draw the assumed causal graph behind an observational comparison, give each variable its structural role, and derive what the comparison must adjust for and what it must not. Confounders go in, while mediators, colliders and a sample selected on a collider stay out. No shipped skill carries the collider or mediator rule. The verifier confirmed that by reading the four nearest skills.

- **Tier.** P follows the library's precedent for `process-tracing`, `qualitative-comparative-analysis` and `causal-loop-diagrams`. The method is widely used and formally correct, but no controlled outcome study exists. The verifier notes one asymmetry: Ellison (2021) shows that trained students misclassify mediators and competing exposures at high rates. The dossier names that as a P pattern ("tested in use and error-prone in one identifiable half") and answers it with a hard wall: every named mediator or collider must carry its path.
- **Corrections applied.** The `dossierPath` field was removed, because it named a file that does not exist and would fail `check-registry.mjs`. The sibling candidate rows carry no `dossierPath` either. Two source titles gained their volume and pages: Digitale, Martin and Glymour (2022), *Journal of Clinical Epidemiology* 142: 264-267, and Rehder and Waldmann (2017), *Memory & Cognition* 45(2): 245-260.
- **Not applied.** The verifier suggests naming Aziz and Brookhart's (2025) specific finding, a systematic omission of race from every generated graph, instead of the looser "omitted variables". Ellison's 2020 medRxiv before-and-after figures could not be re-fetched, because the site returned HTTP 403. The dossier already discounts them to their floor.

### `objectives-first-alternative-generation` (Build, M or P)

The move is a completeness challenge on a decision's objectives before any option exists, followed by using each fundamental objective alone as a generator of alternatives. The engine replaced the 2026-10-19 row's argument against a fold, which was about scope, with a mechanism argument. The verifier confirmed it first-hand: `think-decision-option-review` says in its own "When NOT to Use" that it "compares options that already exist".

- **The tier is the open disagreement.** The dossier names its own demotion trigger: the grade drops to P if Siebert and Keeney's (2015) quality ratings were participants' self-ratings. Neither the engine nor the verifier could find out who rated quality. The research engine's rule is that a split read takes the conservative half. On that rule the verifier recommends **P, narrow**, until someone reads the paper's methods section. The engine held M on the precedent of `think-consider-the-unknowns`.
- **Recommendation: P, narrow.** The rule leaves no room for holding the higher grade while its own demotion condition is open. If the methods section shows independent judges, the row can return to M with the evidence named.
- **Corrections applied.** The Selart and Johansen (2011) source now cites its DOI, because the SSOAR handle was blocked and could not be confirmed. The Haag, Zürcher and Lienert (2019) sentence now says that the abstract implies, without stating, that category cues did not help. The entry's sentence "the dossier is staged at `frameworks/_proposed/...`" is now true, because this commit stages it there.

### `draft-blind-verification` (Build, C)

The move is to write verification questions about a draft's claims and answer them in a fresh context that never sees the draft. The engine kept the 2026-10-19 verdict with three corrections. First, only one study tests the move itself: Chain-of-Verification (Dhuliawala et al., 2024). Second, much of that study's gain comes from claim-level questions, not from blindness alone. Third, wave-4 decision D7, the fresh-context rule, cannot deliver the move, because no shipped skill verifies claims.

- **Tier.** C governs, because no study tests a person checking claims blind to their own draft. The agent line is M, narrow. Under the split rule the agent line cannot raise the governing grade.
- **Correction applied (the verifier's Major 1).** The dossier and the entry generalized "the joint variant captured most of the gain" from the Wikidata task alone. On the biography task the pattern reverses: joint moved the score from 55.9 to 60.8, out of a total move to 71.4. Both texts now say the two tasks split and that neither ingredient is dispensable.
- **Correction applied (a misquote).** The dossier quoted "consistently outperforming the joint approach", which is not the paper's wording. It now paraphrases without quotation marks.
- **For the backlog (the verifier's Major 2).** This is the library's first candidate whose stronger evidence is native to agents. The split rule was written for the usual direction, where human evidence is capped for lack of AI validation. Here a controlled agent ablation at M is capped by a human form at C. The result is correct under the current rule, but it sets a precedent for future agent-native methods.

## Decisions for the maintainer

1. **Replace each preliminary registry row with its vetted entry, or keep the preliminary row.** A replacement pastes `proposed-entry.json` into `frameworks/registry.mjs`, moves `dossier.md` to `frameworks/<slug>/dossier.md` and adds `dossierPath`. The replacement also clears the row's "Preliminary" sentence, which is the marker that PR #196 (marking preliminary rows) formalizes.
2. **Choose the tier for `objectives-first-alternative-generation`: M as the engine proposes, or P as the verifier proposes.** The recommendation is P, narrow, as above.
3. **Decide whether the split rule needs a clause for agent-native methods.** The recommendation is no change now. Ship `draft-blind-verification` at C with the agent line stated, and revisit the rule if a second agent-native candidate arrives.
4. **Building a skill is a separate decision from admission.** The 2026-10-20 roadmap's build order is `causal-dag-adjustment-check` first, because its verdict and tier are both uncontested, then `objectives-first-alternative-generation`, then `draft-blind-verification`.

## What this vetting does not establish

- No skill was built and no eval measured any of the three. The grades describe the evidence for each move, not how well a built skill would perform.
- The engine runs had no page-fetch tool. The verifiers re-checked the load-bearing figures first-hand, but they could not reach two sources: Ellison's 2020 preprint, and the methods section of Siebert and Keeney (2015).
- The two documentation candidates from wave 4, Tree of Thoughts and Immunity to Change, were not vetted in this round.
