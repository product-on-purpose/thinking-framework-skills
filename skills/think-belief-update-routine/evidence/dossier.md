# Evidence Dossier: Belief-Update Routine

> The single source of truth for the `belief-update-routine` skill. The `SKILL.md`, the sidecar
> (`skill.meta.yml`), and the eval cases all derive from this file. If a claim is not here, it does
> not belong in the skill.

| | |
|---|---|
| **Skill** | `thinking-framework-skills.belief-update-routine` (installable name `think-belief-update-routine`) |
| **Family** | meta-thinking-and-reflection |
| **Evidence tier** | **P** (practitioner - sound mechanism, but the move itself is barely tested directly; see "What the evidence shows") |
| **Confidence** | Moderate that under-updating is real and that incremental, evidence-weighted revision is the right correction; low that a periodic belief-review routine measurably improves outcomes outside scored-forecasting regimes |
| **Status** | draft (first authored 2026-06-03, from the multi-agent vetting round) |

---

## 1. The mechanism (what actually does the work)

A belief-update routine **re-scores a standing inventory of open beliefs against newly arrived
evidence, on a cadence**. For each tracked belief it records a prior confidence, the evidence accrued
since the last review, a revised confidence with an **explicit delta and direction**, a stated reason
for the *size* of the move, and a **next-review trigger**. The load-bearing move is the disciplined,
recurring **re-score of a portfolio over time** - not a one-time record, and not a post-mortem of a
finished event. It does three things:

1. **Counteracts conservatism (under-updating).** People systematically revise their beliefs *less*
   than the evidence warrants - the robust "conservatism" finding. Forcing an explicit confidence delta
   with a stated reason for its size makes under-updating visible and correctable, rather than letting a
   belief quietly stay sticky as evidence piles up against it.
2. **Turns a vague drift into a scored, checkable record.** A prior confidence, a dated evidence tally,
   and a revised confidence convert "I guess I feel a bit less sure now" into a delta that can be
   inspected and, over many cycles, calibrated. It is the recorded-revision half of a calibration loop.
3. **Keeps a belief portfolio honest over time.** Beliefs that should track reality (open forecasts,
   strategic bets, standing assumptions) are revisited on a schedule against new evidence, so a stale
   belief is caught by the cadence rather than by a crisis.

The mechanism is what we implement. "Belief-update routine" is descriptive packaging; the durable move
is the **cadenced, evidence-weighted re-score of an inventory of open beliefs, each with an explicit
confidence delta, a guard against under-updating, and a next-review trigger.**

## 2. Lineage

- **Normative belief updating** is Bayesian: a belief's probability should move in proportion to the
  likelihood ratio of new evidence. The routine is the practitioner operationalization of "update
  toward the evidence, by an amount that reflects how strong it is."
- **Conservatism in human updating** - the finding that people update too little relative to Bayes - is
  the classic counter-bias this routine targets: Edwards, W. (1968), "Conservatism in human information
  processing," in Kleinmuntz (ed.), *Formal Representation of Human Judgment*.
- **Incremental updating and forecasting accuracy:** Atanasov, P., Witkowski, J., Ungar, L., Mellers, B.,
  & Tetlock, P. (2020), "Small steps to accuracy: Incremental belief updaters are better forecasters,"
  *Organizational Behavior and Human Decision Processes* 160 - forecasters who update in frequent small
  increments are more accurate than those who update rarely in large jumps.
- **Analytic / actively open-minded thinking and belief revision:** Tappin, B. M., Pennycook, G., & Rand,
  D. G. (2020) and the AOT literature relate a disposition to revise beliefs on evidence to more
  normative updating - a dispositional cousin, not a test of a routine.
- The **practitioner routine** of periodically revisiting "what do I believe and has the evidence
  changed?" appears in forecasting practice (Tetlock's superforecasters keep updating), rationalist
  writing, and strategy review.

No trademark. "Belief-update routine" is a generic, descriptive term; no attribution is required and
none is claimed.

## 3. What the evidence shows, and what it does NOT show

This is the honest core of the dossier. The skill must not overclaim, and must not borrow the
forecasting literature's robustness for a move it does not test.

**What is reasonably supported:**
- **Under-updating (conservatism) is real and robust.** Edwards (1968) and the subsequent literature
  show people revise probabilities less than a Bayesian would given the same evidence. The routine's
  central guard - make the size of the update explicit and ask whether it is large enough - targets a
  genuine, well-documented bias.
- **In scored-forecasting regimes, incremental evidence-weighted updating tracks higher accuracy.**
  Atanasov et al. (2020) found incremental updaters outperform; the calibration literature (Tetlock)
  shows recorded predictions plus scoring improve calibration. So *where beliefs are forecasts that
  later resolve and get scored*, the move has real support.

**What is NOT shown (the caveat that keeps the skill honest):**
- **The routine itself is barely tested directly, and the most direct test was near-null.** O'Leary &
  Fletcher (2024, n=155) tested prompted reflection on counter-evidence leading to belief update and
  found a **near-null effect (p approximately .055)**. The leap from "under-updating is real and
  incremental updating helps forecasters" to "a periodic belief-review routine improves your beliefs"
  is **plausible but not established by controlled study of the routine.**
- **The forecasting evidence is regime-bound.** Atanasov et al. and the calibration results live in
  **scored, resolving** forecasting (a probability, a deadline, a Brier score). The routine's typical
  use - fuzzy, slow-moving, non-resolving beliefs (a strategy thesis, a standing assumption) with no
  score - sits **outside** that evidence. Do not advertise the forecasting effect sizes for it.
- **It only pays off when genuinely new evidence has arrived.** Re-scoring on a calendar when nothing
  has changed is reflection theater: it manufactures motion (or anchors you to the prior) without
  information. The benefit is contingent on real new evidence between reviews.

**Net grade: P (practitioner).** A genuinely useful discipline with a sound mechanistic rationale
(conservatism is real; incremental evidence-weighted updating helps where beliefs are scored) but
**limited and partly near-null direct evidence that the routine improves beliefs**, and a typical use
that sits outside the regime where the supporting evidence was gathered. The skill should claim the
under-updating-guard and the honest-record/calibration-enabling benefits, and must **not** advertise an
effect size or a guaranteed accuracy gain.

## 4. Transferred-evidence flag (required honesty for this library)

All of the evidence above comes from **human subjects** - lab studies of conservatism, forecasting
tournaments, and a human reflection RCT. There is **no direct study** of a belief-update routine run by,
or with, an AI agent, nor of whether an agent-produced belief ledger improves a human's later
calibration. The evidence is therefore **transferred from human contexts, not validated for AI-augmented
use.** This skill must say so. Treat the AI value as: the agent makes the recurring re-score cheap and
structured (the friction of "sit down and re-examine your standing beliefs" is what kills the practice
in humans), forces an explicit delta and a reason for its size (surfacing under-updating), and produces
a durable, reviewable ledger - benefits that do not depend on the unproven accuracy-improvement claim.

## 5. When it works / when it fails (drives the eval negative cases)

**Works best when:**
- There is a **standing inventory of open beliefs** (forecasts, strategic theses, key assumptions) that
  should track reality over time, and a cadence to revisit them.
- **Genuinely new evidence has arrived** since the last review, so there is something to update on.
- The beliefs are consequential and uncertain, and you want the under-updating guard and a scored record.

**Fails or misleads when (poor-fit / anti-patterns - the hard walls):**
- **Recording a single decision at the moment it is made** is `think-decision-journal`, which fixes one
  prediction in place *at commit time and forbids editing it afterward*. The belief-update routine is the
  opposite shape: it *deliberately re-scores* a *portfolio* of open beliefs *repeatedly over time*. Using
  belief-update to capture a one-off decision loses the journal's contemporaneous-lock; using the journal
  to track evolving beliefs violates its do-not-edit rule. (Key near-miss.)
- **Reviewing a finished episode against what was expected** is `think-after-action-review`, which needs a
  **resolved outcome** and emits sustain/change *process* actions. Belief-update operates on beliefs that
  are still **open** (not yet resolved) and emits revised confidences, not action items. (Key near-miss.)
- **Surfacing the conditions under which one contested claim would be the best choice** is
  `think-what-would-have-to-be-true`: it decomposes a single claim into its load-bearing conditions at one
  sitting. Belief-update re-scores a *portfolio* of beliefs *on a cadence* against accrued evidence; it is
  not a one-claim condition analysis. (Key near-miss.)
- **Reflection theater: re-scoring on a schedule when no new evidence has arrived.** With nothing new, the
  routine either invents motion or just re-anchors the prior - cost with no information. If nothing has
  changed, the honest entry is "no material new evidence; no update," not a manufactured delta.
- **Beliefs that never resolve and carry no real stakes** - re-scoring trivia delivers no calibration and
  no decision value; the overhead is unrecovered.

## 6. Output artifact

The skill must emit a **belief-update ledger**, not prose: a dated docket where each tracked belief
carries a one-line claim, a **prior confidence** (% or band), the **evidence accrued** since the last
review (a for/against tally with dates), a **revised confidence** with an **explicit delta and
direction**, the **reason for the size of the move** (naming the guard against under-updating - was the
update large enough given the evidence?), and a **next-review trigger** (a date or the specific signal
that forces a re-score). The artifact is the deliverable; a discursive "here's how my thinking has
evolved" essay is not. It is designed to be reopened on the next cadence and re-scored again.

## 7. Sources

1. Edwards, W. (1968), "Conservatism in human information processing," in B. Kleinmuntz (ed.), *Formal
   Representation of Human Judgment*, Wiley - establishes systematic under-updating relative to Bayes.
2. Atanasov, P., Witkowski, J., Ungar, L., Mellers, B., & Tetlock, P. (2020), "Small steps to accuracy:
   Incremental belief updaters are better forecasters," *Organizational Behavior and Human Decision
   Processes* 160:19-35 - incremental evidence-weighted updating tracks forecasting accuracy.
3. O'Leary, A., & Fletcher, G. (2024), reflection-on-counter-evidence belief-update RCT (n=155),
   near-null effect (p approximately .055) - the most direct test of the move; cited as the honest
   limit, not as support.
4. Tappin, B. M., Pennycook, G., & Rand, D. G. (2020), work relating analytic / actively open-minded
   thinking to more normative belief updating - a dispositional cousin.
5. Tetlock, P., & Gardner, D. (2015), *Superforecasting* - recorded probabilistic predictions plus
   scoring and frequent small updates as the basis for calibration (scored-regime evidence).

> **Verification status:** citations 1, 2, and 5 are standard and well-attested in the judgment-and-
> decision-making and forecasting literature. Citation 4 (Tappin/Pennycook/Rand) is a dispositional
> correlate, cited as lineage, not as a test of the routine. Citation 3 (O'Leary & Fletcher 2024) was
> surfaced during the 2026-06-03 vetting as the most direct test, reported near-null; the exact
> reference and statistic should be re-verified before any public-facing claim, and in the meantime the
> skill takes the conservative reading (the routine's direct evidence is weak), which only strengthens
> the honest "do not advertise an effect size" stance. The "outside the scored-forecasting regime, the
> evidence does not transfer" point is the load-bearing caveat and does not depend on citation 3.
