# Evidence Dossier: Premortem

> The single source of truth for the `premortem` skill. The `SKILL.md`, the sidecar
> (`skill.meta.yml`), and the eval cases all derive from this file. If a claim is not
> here, it does not belong in the skill.

| | |
|---|---|
| **Skill** | `thinking-framework-skills.premortem` (installable name `tfs-premortem`) |
| **Family** | risk-and-resilience |
| **Evidence tier** | **S/M** (contested - see "What the evidence shows" below) |
| **Confidence** | Moderate-high that the mechanism helps; low that the published effect sizes mean what they are usually quoted to mean |
| **Status** | draft (first authored 2026-05-31, against discovery corpus) |

---

## 1. The mechanism (what actually does the work)

A premortem is a deliberate act of **prospective hindsight**: instead of asking "what could go wrong?", you assert that the plan *has already failed* and reason backward to explain why. The shift from a conditional ("might fail") to a definite past ("has failed") is the load-bearing move. It does three things:

1. **Licenses dissent.** Once failure is assumed, naming a reason is no longer disloyalty or pessimism; it is the assigned task. This is why a premortem surfaces concerns that normal risk review and optimistic planning suppress.
2. **Recruits memory and imagination differently.** Explaining a concrete past event is a richer retrieval cue than forecasting an abstract future one, so people generate more, and more specific, causes.
3. **Converts vague worry into pre-committed action.** The output is not a feeling of caution but named causes, each paired with a mitigation, a leading signal (tripwire), and a kill criterion decided *before* sunk cost and momentum distort judgment.

The mechanism is what we implement. The branded "premortem" ritual is the packaging; the durable move is prospective hindsight plus structured conversion to mitigations.

## 2. Lineage

- **Prospective hindsight** as a cognitive effect: Mitchell, D. J., Russo, J. E., & Pennington, N. (1989). "Back to the future: Temporal perspective in the explanation of events." *Journal of Behavioral Decision Making*, 2(1), 25-38.
- **The "premortem" technique** as a management practice: Klein, G. (2007). "Performing a Project Premortem." *Harvard Business Review*, 85(9). Popularized further in Kahneman, *Thinking, Fast and Slow* (2011).
- **Direct evaluation:** Veinott, B., Klein, G., & Wiggins, S. (2010). "Evaluating the Effectiveness of the PreMortem Technique on Plan Confidence." *Proceedings of ISCRAM 2010*.

No trademark. "Premortem" is a generic descriptive term in common use; no attribution is required and none is claimed. We name the skill descriptively and cite the lineage here rather than branding it.

## 3. What the evidence shows, and what it does NOT show

This is the honest core of the dossier. The skill must not overclaim.

**What is reasonably supported (the S part):**
- Prospective hindsight (assuming an outcome and explaining it) **increases the number and specificity of causes people generate** relative to ordinary forecasting. Mitchell et al. (1989) reported roughly a **30% increase in the number of reasons** correctly identified for a future outcome under the "has happened" framing.
- The technique **reduces overconfidence** in a plan. Veinott et al. (2010) found participants who ran a premortem were better calibrated about their plans than those who did not.

**What is NOT shown (the caveat that keeps the skill honest):**
- The widely-quoted "**premortems make decisions ~30% better**" claim is **a misreading**. The 30% figure measures the **number of reasons identified**, not any improvement in decision quality, outcome, or accuracy. Generating more reasons is not the same as deciding better.
- There is **no strong evidence** that premortems improve final outcomes (project success rates, ROI, fewer failures). The mechanism is plausible and the calibration effect is real, but the chain from "more reasons surfaced" to "better real-world result" is not established by controlled study.
- General "thinking tools improve thinking" claims are weak: a 2024 meta-analysis in the problem-solving-pedagogy literature found no significant difference in some downstream measures between instruction that uses thinking tools and instruction that does not. (To be primary-source verified before any public claim; cited here as a humility prompt, not a settled fact.)

**Net grade: S/M.** The reason-generation and overconfidence-reduction effects are well-supported (S-leaning); the decision-quality improvement that the technique is usually sold on is not (M/contested). The skill should claim the former and explicitly disclaim the latter.

## 4. Transferred-evidence flag (required honesty for this library)

All of the evidence above comes from **human subjects** in workshop, lab, and team settings. There is **no direct study** of premortems run by, or with, an AI agent, and none of whether an AGENT-produced premortem improves a human's decision. The evidence supporting this skill is therefore **transferred from human contexts, not validated for AI-augmented use.** This skill must say so. Treat the AI value as: the agent makes the mechanism cheap to run, enforces the structure, and produces a durable artifact - benefits that do not depend on the contested decision-quality claim.

## 5. When it works / when it fails (drives the eval negative cases)

**Works best when:**
- The decision is real, consequential, and not yet committed (you can still change course).
- There is genuine uncertainty and the plan has optimistic momentum behind it.
- Causes can be turned into observable signals and pre-decided responses.

**Fails or misleads when (poor-fit / anti-patterns):**
- **Run after the fact** - that is a postmortem, a different tool. (Anti-trigger.)
- **Run as ritual** - rote "imagine it failed, list five risks, done" with no conversion to tripwires/kill criteria produces cargo-cult comfort, not better risk handling. The skill must force the conversion step.
- **Trivial or fully reversible decisions** - the ceremony is not worth it; a two-way door does not need a premortem.
- **Used to launder a decision already made** - if mitigations are never acted on, the premortem becomes theater.
- **Substituted for ideation or for option comparison** - it is a risk tool, not a way to generate options (use SCAMPER/Question Burst) or to choose among them (use Decision Option Review).

## 6. Output artifact

The skill must emit a **risk register**, not prose: a ranked table of causes with likelihood, impact, a leading signal/tripwire, a mitigation, an owner, and a kill criterion, preceded by a short "top risks and what we will do" summary. The artifact is the deliverable; the conversation is not.

## 7. Sources

1. Mitchell, Russo & Pennington (1989), *J. Behavioral Decision Making* 2(1):25-38 - prospective hindsight; the ~30%-more-reasons finding.
2. Klein (2007), *Harvard Business Review* 85(9) - "Performing a Project Premortem."
3. Veinott, Klein & Wiggins (2010), *ISCRAM 2010* - premortem reduces overconfidence / improves plan calibration.
4. Kahneman (2011), *Thinking, Fast and Slow* - popularization; ties premortem to overcoming optimism bias and groupthink.

> **Verification status:** citations 1-4 are standard and well-attested in the discovery corpus, but the exact effect-size phrasings and the 2024 meta-analysis claim in section 3 were drawn from a secondary research synthesis and should be confirmed against the primary papers before they appear in any public-facing README. They are safe to use *inside this dossier* because the dossier's job is to be honest about exactly this uncertainty.
