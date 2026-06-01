# Evidence Dossier: Linear-Model Aggregation (Mechanical Combination)

> Single source of truth for the `linear-model-aggregation` skill. The SKILL.md, sidecar, and evals derive from this. A strong-evidence anchor (named empirical core).

| | |
|---|---|
| **Skill** | `thinking-framework-skills.linear-model-aggregation` (installable name `think-linear-model-aggregation`) |
| **Family** | decision-and-option-evaluation |
| **Evidence tier** | **S** (one of the most replicated findings in judgment research) |
| **Confidence** | High that simple consistent rules match or beat holistic judgment for repeated predictions |
| **Status** | draft (authored 2026-05-31 from the discovery corpus) |

## 1. The mechanism (what actually does the work)

For a **repeated** predictive or evaluative judgment - screening candidates, scoring leads, triaging tickets, rating applications - holistic expert intuition is unreliable mainly because it is **inconsistent**: the same expert, given the same case on different days, reaches different conclusions (noise), and weights cues differently each time. A simple **mechanical rule** removes that inconsistency: pick a few predictive cues, assign weights (even equal weights work), score each case on each cue, combine by a fixed formula, and apply it the same way every time.

The counterintuitive, robust result: such rules - including "improper" ones with equal or roughly-guessed weights - reliably **match or beat** holistic expert judgment, because consistency beats brilliance-applied-erratically. The skill's value is producing that rule and committing to applying it consistently.

Two honest constraints are built in: (1) the model is only as good as its cues - garbage cues give a confident garbage model; (2) this is for *repeated* judgments of the same kind, not unique strategic one-offs.

## 2. Lineage

- Paul Meehl, *Clinical versus Statistical Prediction* (1954) - actuarial beats clinical. Robyn Dawes, "The robust beauty of improper linear models in decision making" (1979) - even equal-weight models beat experts. Grove & Meehl (1996) and Grove et al. (2000) meta-analysis. Kahneman, *Noise* (2021) - inconsistency (noise) as the mechanism.

No trademark. Named descriptively.

## 3. What the evidence shows, and what it does NOT show

**Strongly supported (the S):** across decades and many domains (clinical, hiring, lending, academic admission, parole), mechanical/actuarial combination of cues equals or outperforms holistic expert judgment in the large majority of studies (Grove et al. 2000 meta-analysis). Improper linear models (equal/unit weights) capture most of the benefit (Dawes 1979). The driver is reduced inconsistency.

**What it does NOT show / boundaries (honest):**
- It applies to **repeated** judgments where outcomes are (eventually) measurable, not to genuinely unique strategic one-offs. For a one-time choice among a few options, use a decision-option review, not a predictive model.
- The model is only as good as its **cues**: cue selection requires real predictive validity; a tidy formula on bad cues is worse than honest uncertainty.
- Mechanical scoring of individual people (hiring, lending, justice) carries fairness, legal, and ethical considerations the skill must flag, not ignore.

## 4. Transferred-evidence flag

The evidence is from human expert judgment vs statistical models. Transferred to AI use; an LLM is itself prone to inconsistent holistic gestalt across cases. The AI value: forcing an explicit, fixed, few-cue rule applied identically across cases removes that inconsistency and makes the judgment inspectable and auditable - the model produces and then *follows* the rule rather than re-deciding holistically each time.

## 5. When it works / when it fails

**Works best when:** the same kind of evaluative judgment recurs (screening candidates, scoring leads/deals, triaging, prioritizing a queue); gut calls are inconsistent or overconfident; a few cues with real predictive signal exist.

**Fails or misleads when (poor-fit / anti-patterns):**
- A genuinely **one-off** decision (use decision-option-review).
- **No predictive cues / data** - inventing cues and weights produces false precision (the central failure).
- Over-engineering the weights (the evidence says equal/simple weights are fine; do not fake precision).
- Applying the model inconsistently or overriding it case-by-case on a hunch (which reintroduces the noise it removes).
- High-stakes judgments about individuals where mechanical scoring raises fairness/legal/ethical issues - flag these, do not silently automate.

## 6. Output artifact

A **scoring model**: the judgment it is for; the few predictive cues (with why each is plausibly predictive); the weights (equal-weight as the honest default unless data justifies otherwise); the per-cue scoring rubric; the combination formula; a threshold/decision rule; and an explicit "apply consistently" note plus the cue-validity and fairness caveats.

## 7. Sources

1. Meehl, P. (1954). *Clinical versus Statistical Prediction*.
2. Dawes, R. (1979). "The robust beauty of improper linear models in decision making." *American Psychologist*.
3. Grove, W. et al. (2000). Meta-analysis of clinical vs mechanical prediction.
4. Kahneman, D., Sibony, O., & Sunstein, C. (2021). *Noise* - inconsistency as the mechanism.

> **Verification status:** the Meehl/Dawes/Grove results are well-attested and frequently replicated; confirm the Grove 2000 meta-analytic specifics before a public quantified claim. The "only as good as its cues" and fairness caveats are mandatory honest framing.
