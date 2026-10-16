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

Re-expressing the *identical* information as **natural frequencies over a concrete population** makes the correct answer almost visible: "Out of 1,000 people, 10 have the condition; of those, 9 test positive. Of the 990 without it, about 89 also test positive. So of ~98 positives, only 9 truly have it - about 9%." The format does the work: it preserves the base rate in the counts instead of hiding it in a rate. In the original study, the share of correct Bayesian answers rose from 16% to 46% when the same facts were presented as natural frequencies (Gigerenzer & Hoffrage, 1995).

## 2. Lineage

- Gigerenzer & Hoffrage (1995) on how natural-frequency formats improve Bayesian reasoning; Sedlmeier & Gigerenzer (2001) on teaching it; widely applied in medical decision-making and risk communication.

No trademark. Named descriptively.

## 3. What the evidence shows, and what it does NOT show

**Strongly supported (the S):** presenting conditional-probability information as natural frequencies substantially improves the accuracy of Bayesian inference, and the effect is replicated across studies and populations, including physicians.

- In the original study, correct Bayesian answers rose from 16% with probabilities to 46% with natural frequencies (Gigerenzer & Hoffrage, 1995, Study 1, standard menu).
- A meta-analysis puts the average across studies at about 4% with probabilities against 24% with natural frequencies (McDowell & Jacobs, 2017, as reported by Weber, Binder & Krauss, 2018).
- The gain is large, but most people still answer wrongly even with natural frequencies. The format helps; it does not guarantee a correct answer.

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

1. Gigerenzer, G., & Hoffrage, U. (1995). How to improve Bayesian reasoning without instruction: Frequency formats. *Psychological Review* 102(4): 684-704 - Study 1: 16% Bayesian answers with probabilities, 46% (standard menu) and 50% (short menu) with natural frequencies.
2. Sedlmeier, P., & Gigerenzer, G. (2001) - teaching Bayesian reasoning (accuracy gains).
3. McDowell, M., & Jacobs, P. (2017). Meta-analysis of the effect of natural frequencies on Bayesian reasoning. *Psychological Bulletin* 143: 1273-1312, doi:10.1037/bul0000126 - average accuracy about 24% with natural frequencies against 4% with probabilities.
4. Weber, P., Binder, K., & Krauss, S. (2018). Why can only 24% solve Bayesian reasoning problems in natural frequencies: Frequency phobia in spite of probability blindness. *Frontiers in Psychology* 9, doi:10.3389/fpsyg.2018.01833 - reports source 3's averages.

> **Verification status (corrected 2026-10-15):** until this date, the dossier, `SKILL.md` and `eval/cases.md` said accuracy rises "from roughly 10% to 50-90%". That overstated the effect. On 2026-10-15 the 16% and 46% figures were checked against the original paper. The 4% and 24% averages were checked against Weber, Binder & Krauss (2018), which reports them; the meta-analysis itself was not read. The tier is unchanged, because the direction of the effect is robust. The "must use real input rates" constraint is the honest core for AI use.
