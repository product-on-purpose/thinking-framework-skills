# Evidence Dossier: Red Team Light

> Single source of truth for the `red-team-light` skill. The SKILL.md, sidecar, and evals derive from this.

| | |
|---|---|
| **Skill** | `thinking-framework-skills.red-team-light` (installable name `think-red-team-light`) |
| **Family** | assumption-and-belief-challenge |
| **Evidence tier** | **M (transferred)** (flag: role-played dissent underperforms genuine dissent) |
| **Confidence** | High that surfacing the strongest counter-case is useful; honest that constructed dissent is weaker than authentic dissent |
| **Status** | draft (authored 2026-05-31 from the discovery corpus) |

## 1. The mechanism (what actually does the work)

Plans that reach easy consensus go untested. Red Team Light deliberately suspends the cooperative, agreeable stance and constructs the **strongest case against** a single proposal or thesis - the best objections an intelligent, motivated adversary would raise (steelman, not strawman) - then judges which objections actually land and what would rebut them. The work is done by forcing a genuinely adversarial pass that an obliging model (or a harmonious team) skips, and by ranking objections so the decisive ones are not lost among the weak.

It is distinct from neighbors: premortem maps *failure causes over time*; parallel perspectives gives a *rounded* view; red team builds the *single strongest opposing case*.

## 2. Lineage and the honest caveat

- Red teaming comes from military, intelligence, and security practice (an adversarial team attacks a plan). It is related to devil's advocacy.
- **Important honesty (drives the flag):** Nemeth et al. (2001) found that **role-played** devil's advocacy does **not** replicate the reasoning gains of **authentic** dissent (a genuine minority that really disagrees). An AI red team is constructed, role-played dissent. So treat its output as "the strongest objections we could articulate," which is useful for surfacing blind spots, not as a substitute for a real dissenter who actually believes the counter-case.

No trademark. Named descriptively.

## 3. What the evidence shows, and what it does NOT show

**Supported (M, transferred):** red-team-light's core operation - suspend the first agreeable framing and construct the strongest contrary case - is the "consider the opposite" move shown in controlled human debiasing studies to reduce biased assimilation, anchoring, and overconfidence (Lord, Lepper & Preston 1984; Mussweiler, Strack & Pfeiffer 2000; Hirt & Markman 1995). Under the anti-laundering test this is the SAME cognitive operation the skill performs - the steelman / rank-by-force / rebuttal-test / verdict structure is artifact craft layered on the evidenced move, not a different untested operation - so the M-tier debiasing evidence is red-team-light's own, not a cousin's. Re-graded P -> M (transferred) 2026-06-19 via think-research-framework (engine verdict).

**NOT shown / the honesty flag:** that constructed / role-played dissent improves decisions as much as GENUINE dissent (Nemeth, Brown & Rogers 2001). That result is a group minority-dissent paradigm - a different reference class from self-administered debiasing - so it does NOT cap the consider-the-opposite grade or this one, but it remains the load-bearing flag: present red-team-light as a blind-spot finder, and where stakes are high, recommend seeking a real dissenting view, not just the model's. Capped at M, not S, because all evidence is human-subject, not AI-validated.

## 4. Transferred-evidence flag

Evidence is from human group-reasoning and security contexts, not AI-augmented use. Transferred, not AI-validated. The AI value: a model is strongly biased toward agreeing and completing the user's framing; explicitly instructing it to build the best opposing case is a direct counter to that sycophancy, with the Nemeth caveat that this is constructed, not authentic, dissent.

## 5. When it works / when it fails

**Works best when:** a plan has too-easy consensus; before committing to a strong thesis; to pressure-test the agent's own confident recommendation.

**Fails or misleads when (poor-fit / anti-patterns):**
- Producing a weak strawman instead of the strongest objections.
- Performative contrarianism (objecting for its own sake) without judging which objections land.
- Treating the constructed critique as equivalent to genuine dissent (the central honesty failure).
- When the team needs alignment and buy-in more than another critique.
- When you need failure causes over time (premortem) or a rounded view (parallel perspectives).

## 6. Output artifact

An **adversarial critique**: the thesis stated fairly, then the strongest objections ranked by force, each with how it would have to be answered, a verdict on which objections are decisive, and a one-line note on whether a real (not constructed) dissenting view should be sought given the stakes.

## 7. Sources

1. Red teaming practice (military / intelligence / security).
2. Nemeth, C., Brown, K. & Rogers, J. (2001) - authentic dissent vs role-played devil's advocacy (role-play does not replicate the gains; the load-bearing honesty flag).
3. Lord, C., Lepper, M. & Preston, E. (1984) - "consider the opposite" reduces biased assimilation (controlled, self-administered debiasing).
4. Mussweiler, T., Strack, F. & Pfeiffer, T. (2000) - consider-the-opposite reduces anchoring.
5. Hirt, E. & Markman, K. (1995) - consider-an-alternative / multiple-explanation improves calibration.

> **Verification status:** the Nemeth finding is well-attested and is deliberately surfaced as the honesty flag. Do not present an AI red team as equivalent to genuine dissent.
