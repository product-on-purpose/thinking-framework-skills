# Evidence Dossier: Decision Journal

> The single source of truth for the `decision-journal` skill. The `SKILL.md`, the sidecar
> (`skill.meta.yml`), and the eval cases all derive from this file. If a claim is not
> here, it does not belong in the skill.

| | |
|---|---|
| **Skill** | `thinking-framework-skills.decision-journal` (installable name `tfs-decision-journal`) |
| **Family** | meta-thinking-and-reflection |
| **Evidence tier** | **P** (practitioner - useful method, limited controlled evidence; see "What the evidence shows") |
| **Confidence** | Moderate that recording-at-decision-time defeats hindsight distortion; low that journaling alone improves decision outcomes |
| **Status** | draft (first authored 2026-05-31, against discovery corpus) |

---

## 1. The mechanism (what actually does the work)

A decision journal **records a decision at the moment it is made** - the decision itself, the rationale, the expected outcome, the confidence, and the assumptions it rests on - so that the decision can be reviewed later against what actually happened. The load-bearing move is **timing**: the record is written *before* the outcome is known, while the reasoning and the felt confidence are still intact and uncontaminated by the result. It does three things:

1. **Defeats hindsight bias by pre-committing the prediction.** Once an outcome is known, memory silently rewrites what "we knew all along." A contemporaneous record fixes the prediction in place so the later review compares against what was actually expected, not a back-fitted version of it. This is the durable cognitive move; the notebook is just the means.
2. **Makes confidence and assumptions explicit and checkable.** Forcing a stated confidence level and a list of named assumptions turns a vague feeling ("I'm pretty sure") into something that can later be scored, which is the raw material for calibration over many decisions.
3. **Separates decision quality from outcome quality.** Because the rationale is recorded independent of the result, a later review can ask "was this a good decision given what was knowable then?" rather than only "did it work out?" - guarding against outcome bias (judging a good process by a bad roll of the dice, or vice versa).

The mechanism is what we implement. "Decision journal" is the descriptive packaging; the durable move is contemporaneous capture of decision, rationale, predicted outcome, confidence, and assumptions, structured for honest later review.

## 2. Lineage

- **Decision journaling as a calibration practice** is most associated with poker player and decision researcher Annie Duke, *Thinking in Bets* (2018), and with investor/practitioner writing (e.g. Shane Parrish / Farnam Street's "decision journal" templates, drawing on Daniel Kahneman's advice to record reasoning at decision time).
- **The cognitive bias it counters - hindsight bias** ("I knew it all along") is well-established in the psychology literature: Fischhoff, B. (1975), "Hindsight is not equal to foresight," *Journal of Experimental Psychology: Human Perception and Performance*, 1(3), 288-299; Roese, N. J., & Vihari, K. (2012), "Hindsight bias," *Perspectives on Psychological Science*, 7(5), 411-426.
- **Calibration of subjective probability** through recorded prediction and feedback draws on the forecasting and calibration literature: Lichtenstein, Fischhoff & Phillips (1982); and the practice of scored forecasting (Tetlock & Gardner, *Superforecasting*, 2015), where writing down a probability and later scoring it is what makes calibration possible.

No trademark. "Decision journal" is a generic, descriptive term in common practitioner use; no attribution is required and none is claimed. We name the skill descriptively and cite the lineage here.

## 3. What the evidence shows, and what it does NOT show

This is the honest core of the dossier. The skill must not overclaim.

**What is reasonably supported:**
- **Hindsight bias is real, robust, and hard to suppress by willpower.** Fischhoff (1975) and the subsequent literature show that once people know an outcome, they systematically misremember their prior predictions as closer to the truth. A contemporaneous record is one of the few reliable defenses, because it removes the need to remember the prediction at all.
- **Calibration improves with recorded predictions and feedback.** The forecasting literature (Tetlock; Lichtenstein et al.) shows that people who record probabilistic predictions and then score them against outcomes can become measurably better calibrated over time. A decision journal supplies exactly the recorded-prediction half of that loop.

**What is NOT shown (the caveat that keeps the skill honest):**
- There is **no strong controlled evidence that keeping a decision journal improves decision outcomes.** The supported claims are about (a) the existence of hindsight bias and (b) calibration improving under recorded-prediction-plus-feedback regimes. The leap from "journaling defeats hindsight bias and enables calibration" to "journaling makes your decisions turn out better" is **plausible but not established by controlled study.** The journal's value is in making later review *honest* and calibration *possible*, not in guaranteeing better results.
- Much of the practitioner enthusiasm (Duke, Parrish, investor blogs) is **experience-based, not experimental.** It is credible and internally consistent, but it is testimony, not a trial. Grade it as practitioner evidence, not strong evidence.
- A journal **only pays off if it is actually reviewed later.** A drawer full of unreviewed entries delivers none of the calibration benefit; it is a cost with no return. The evidence for benefit is contingent on the review half of the loop happening.

**Net grade: P (practitioner).** A genuinely useful method with a sound mechanistic rationale (hindsight bias is real; recorded predictions enable calibration) but **limited controlled evidence that the practice itself improves outcomes.** The skill should claim the honest-review and calibration-enabling benefits and explicitly disclaim a guaranteed-better-outcome benefit.

## 4. Transferred-evidence flag (required honesty for this library)

All of the evidence above comes from **human subjects and human practitioners** - lab studies of hindsight bias, forecasting tournaments, and the experience of human decision-makers keeping journals. There is **no direct study** of decision journals authored by, or with, an AI agent, and none of whether an AGENT-produced journal entry improves a human's later calibration. The evidence supporting this skill is therefore **transferred from human contexts, not validated for AI-augmented use.** This skill must say so. Treat the AI value as: the agent makes the capture cheap and immediate (the moment-of-decision friction is what kills the practice in humans), enforces the full structure (decision, rationale, predicted outcome, confidence, assumptions), and produces a durable, reviewable artifact - benefits that do not depend on the unproven outcome-improvement claim.

## 5. When it works / when it fails (drives the eval negative cases)

**Works best when:**
- The decision is consequential and *not yet resolved*, so a genuine prediction can still be recorded before the outcome is known.
- An honest expectation, confidence level, and set of assumptions can actually be stated (there is real uncertainty and a real basis for a prediction).
- There is an intention to review the entry later, against the actual outcome (it pairs with an after-action review).

**Fails or misleads when (poor-fit / anti-patterns):**
- **Reviewing a decision after the outcome is already known** - that is an after-action review (`tfs-after-action-review`), which compares expected-vs-actual *after the fact*. The decision journal records the expectation *at decision time* precisely so that the later AAR has something honest to compare against. Writing a "journal entry" after you know the result is back-fitting, the exact distortion the method exists to prevent. (Anti-trigger and the key near-miss.)
- **Trivial or fully reversible (two-way-door) decisions** - the capture overhead is not worth it for a choice you can cheaply undo or that has no meaningful uncertainty.
- **When no expectation can be honestly stated** - if there is no real prediction, confidence, or assumption to record (the outcome is already determined, or the "decision" is a formality), there is nothing to calibrate against and the entry is theater.
- **Surfacing the conditions that must hold for a choice to be right** is a different tool (`tfs-what-would-have-to-be-true`); the journal captures the *whole* decision plus a *predicted outcome and confidence* for later calibration, not just the load-bearing conditions.
- **As a substitute for actually reviewing entries** - a journal nobody revisits delivers no calibration. If there is no intent to review, the cost is unrecovered.

## 6. Output artifact

The skill must emit a **decision journal entry**, not prose: a dated, structured record with the decision, the situation/context, the rationale, the options considered and not taken, the **predicted outcome**, an explicit **confidence** (a percentage or band), the named **assumptions** the decision rests on, and a **review date** with the expected signals to check then. The artifact is the deliverable; a discursive write-up is not. It is designed to be reopened later (by an after-action review) and scored against reality.

## 7. Sources

1. Fischhoff, B. (1975), "Hindsight is not equal to foresight," *J. Experimental Psychology: Human Perception and Performance* 1(3):288-299 - establishes hindsight bias.
2. Roese, N. J., & Vihari, K. (2012), "Hindsight bias," *Perspectives on Psychological Science* 7(5):411-426 - review of the robustness of the effect.
3. Duke, A. (2018), *Thinking in Bets* - decision journaling, separating decision quality from outcome quality, practitioner source.
4. Tetlock, P., & Gardner, D. (2015), *Superforecasting* - recorded probabilistic predictions plus scoring as the basis for calibration.
5. Lichtenstein, S., Fischhoff, B., & Phillips, L. D. (1982), "Calibration of probabilities," in Kahneman, Slovic & Tversky (eds.), *Judgment under Uncertainty* - calibration literature.

> **Verification status:** citations 1-2 and 4-5 are standard and well-attested. Citation 3 (Duke) and the Parrish/Farnam Street decision-journal templates are practitioner sources, credible but experience-based; they are cited as lineage and as the origin of the practice, not as controlled evidence of outcome improvement. The "no strong controlled evidence that journaling improves outcomes" statement in section 3 reflects the absence of such a study in the discovery corpus as of authoring; it should be re-checked before any public-facing claim, but the honest default is to not claim outcome improvement.
