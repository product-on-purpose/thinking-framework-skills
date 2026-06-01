# Evidence Dossier: Natural-Frequency Bayesian Framing

> Single source of truth for the `natural-frequency-bayesian` skill. The SKILL.md, sidecar, and evals derive from this. A strong-evidence anchor.

| | |
|---|---|
| **Skill** | `thinking-framework-skills.natural-frequency-bayesian` (installable name `think-natural-frequency-bayesian`) |
| **Family** | reasoning-clarity |
| **Evidence tier** | **S** (well-replicated) |
| **Confidence** | High - the format effect is one of the most robust findings in judgment research |
| **Status** | draft (authored 2026-05-31 from the discovery corpus) |

## 1. The mechanism (what actually does the work)

People - including experts - reason badly about conditional probabilities when they are stated as percentages or probabilities. Given "the test is 90% sensitive, the condition affects 1%, the false-positive rate is 9%," most people (including doctors) wildly overestimate the chance that a positive result means the condition is present, because they neglect the base rate.

Re-expressing the *identical* information as **natural frequencies over a concrete population** makes the correct answer almost visible: "Out of 1,000 people, 10 have the condition; of those, 9 test positive. Of the 990 without it, about 89 also test positive. So of ~98 positives, only 9 truly have it - about 9%." The format does the work: it preserves the base rate in the counts instead of hiding it in a rate. Accuracy on these problems jumps from roughly 10% to 50-90% when the same facts are presented as natural frequencies.

## 2. Lineage

- Gigerenzer & Hoffrage (1995) on how natural-frequency formats improve Bayesian reasoning; Sedlmeier & Gigerenzer (2001) on teaching it; widely applied in medical decision-making and risk communication.

No trademark. Named descriptively.

## 3. What the evidence shows, and what it does NOT show

**Strongly supported (the S):** presenting conditional-probability information as natural frequencies substantially improves the accuracy of Bayesian inference (the ~10% to ~50-90% jump is well-replicated across studies and populations, including physicians).

**What it does NOT do:** it does not invent the inputs. The base rate, the true-positive rate, and the false-positive rate must be real; the format makes correct reasoning *from* those numbers tractable, it does not supply them. And it applies only where there is genuine conditional-probability structure - it is not a general forecasting tool (that is reference-class forecasting).

## 4. Transferred-evidence flag

The evidence is from human reasoners. Transferred to AI use; the model can do the arithmetic, but the value is the same as for humans plus communication: it forces the base rate to be used (countering base-rate neglect in the model's own answers and in how it explains risk), and it produces an inspectable frequency breakdown rather than a bare percentage. It still must refuse to fabricate the input rates.

## 5. When it works / when it fails

**Works best when:** interpreting a test or screening result (medical, fraud, security, lead-scoring, A/B); any "given a positive signal, what is the real probability" question; communicating risk to others.

**Fails or misleads when (poor-fit / anti-patterns):**
- **No real input rates** - inventing the base rate or hit rate is worse than admitting they are unknown (the central failure for an AI).
- Ignoring the base rate (base-rate neglect) - the very error the method exists to fix.
- Confusing P(positive | condition) with P(condition | positive) - state which is which.
- No conditional-probability structure (then this is the wrong tool).
- General project forecasting (use reference-class forecasting).

## 6. Output artifact

A **natural-frequency breakdown**: the question; the inputs (base rate, true-positive rate, false-positive rate) with sources or an explicit missing-data flag; a frequency tree over a concrete population (e.g., 1,000); the computed posterior; and a plain-language statement of what it means plus the common wrong intuition it corrects.

## 7. Sources

1. Gigerenzer, G., & Hoffrage, U. (1995) - improving Bayesian reasoning with natural-frequency formats.
2. Sedlmeier, P., & Gigerenzer, G. (2001) - teaching Bayesian reasoning (accuracy gains).

> **Verification status:** the natural-frequency format effect and the rough 10%->50-90% accuracy gain are well-attested; confirm exact figures against the papers before a public quantified claim. The "must use real input rates" constraint is the honest core for AI use.
