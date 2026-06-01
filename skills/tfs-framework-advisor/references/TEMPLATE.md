# Thinking Plan - Template

Fill this in. The deliverable is the structured plan, not prose. Keep the recommended sequence short: 1-4 frameworks, governed by the stakes x reversibility read in section 3. Naming rule: name a skill or recipe ONLY if it appears in `references/recommendable.json`; otherwise describe the step in plain language.

---

## 0. Source ledger

Exact quotes from what the user gave you, built before any analysis. Every `Source:` reference below points to one of these IDs. If a needed fact is not here, mark the claim `Inferred (Low confidence)`.

| ID | Exact quote | Origin |
|---|---|---|
| S1 | "[exact substring of the input]" | pasted text |
| S2 | "[...]" | pasted text / file path |

## 1. Executive summary

[120-180 words. The fast-skim layer. State, in plain language: the situation in one line; the dominant thinking job you diagnosed; the recommended sequence named (e.g. "reframe -> diverge -> stress-test"); and the single most important move to make first. A reader who stops here should know what to do next and why.]

## 2. Input mirror

- **What you told me:** [restate the situation concisely]
- **What you appear to be trying to accomplish:** [inferred intent] *(confidence: High / Medium / Low; `Source:` S#)*
- **Adjacent intents I noticed but did not assume:** [things that may be in scope but you did not say]

> Confirm or correct this before the plan carries weight.

## 3. Diagnosis

**Cognitive job(s) present** (classify by the thinking move needed, not the topic):

| Job | Present? | Evidence | 
|---|---|---|
| Reframe the problem | [y/n] | `Source:` S# |
| Expand options / diverge | | |
| Shift perspective | | |
| Challenge assumptions / beliefs | | |
| Stress-test for risk / failure | | |
| Reason about the system | | |
| Evaluate options / decide | | |
| Synthesize / clarify reasoning | | |
| Reflect / learn | | |

- **Dominant job (unblocks the most right now):** [name it] - because [reason, `Source:` S#].
- **Stakes x reversibility:** [two-way door / one-way door] x [low / high stakes]. *(`Source:` S# or `Inferred`.)*
- **Therefore plan heft:** [1 framework, fast | 1-2 | 2-4, the fuller gauntlet]. Overall plan confidence: [High / Medium / Low], capped by the above and demoted one notch if the dominant-job call rests on inference.

## 4. The Thinking Plan

The prioritized sequence. One block per recommendation (1-4 total). Step 1 is the move that unblocks the most.

### Step 1 - `[exact skill or recipe name]`  ·  [single skill / recipe]

- **The job it does here:** [which cognitive job from section 3, in this situation]
- **Why this one (not a near neighbor):** [the overlap logic - why this skill over the closest alternative]
- **Evidence tier:** [S/M/P/V/A/C/X, carried from `recommendable.json`] - [one honest line on what that tier means here]
- **Expected artifact:** [what running it produces - the risk register, the option matrix, the reframed problem set]
- **Run it with:** 
  > [a ready-to-paste prompt with the user's actual situation filled in - not a placeholder]
- **When to stop / done looks like:** [the signal that this step is complete; do not over-run it]
- **Feeds into:** [Step 2, or "this is the whole plan"]

### Step 2 - `[...]`  ·  [...]

[same fields; shorter is fine]

*(Add Step 3-4 only if the heft in section 3 warrants them.)*

## 5. What NOT to use, and why

2-4 explicit non-recommendations. Include any tempting framework a naive reading would suggest, and anything the stakes calibrator cut. Deferring is half the value.

- **Not `[name or method]`** - [why it does not fit here / why it is overkill for this stakes level].
- **Not now:** [framework that might fit later, with the trigger that would make it worth it].

## 6. If this goes deeper (optional)

[For the user who wants to learn, not just execute: a one-line pointer per recommended framework to where they can read more - the catalog row or, once live, the docs-site page. Omit if the user only wants to act.]

## 7. Evidence and source map

| Claim / recommendation | Source ID | Exact quote |
|---|---|---|
| [dominant-job diagnosis] | S# | "[...]" |
| [step-1 recommendation] | S# | "[...]" |

- **Inferred (Low confidence) claims:** [list any; confirm none of them is the sole basis for the dominant job or Step 1].
- **Gaps:** [what you could not determine from the input, and the one question that would most improve this plan].
