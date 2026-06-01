# Evidence Dossier: Authentic Dissent

> Single source of truth for the `authentic-dissent` skill. The SKILL.md, sidecar, and evals derive from this. One of the library's strong-evidence anchors - and one whose evidence constrains what an AI can honestly claim to do.

| | |
|---|---|
| **Skill** | `thinking-framework-skills.authentic-dissent` (installable name `tfs-authentic-dissent`) |
| **Family** | assumption-and-belief-challenge |
| **Evidence tier** | **S** (strong, and pointed: it tells us role-play does NOT work) |
| **Confidence** | High that genuine dissent helps and role-played dissent does not replicate it |
| **Status** | draft (authored 2026-05-31 from the discovery corpus) |

## 1. The mechanism (what actually does the work)

Genuine minority dissent improves a group's reasoning: exposure to someone who *truly* holds a contrary view makes the majority search more broadly, consider more options, and think more divergently - and this happens even when the dissenter turns out to be wrong. The benefit comes from the authenticity of the disagreement, not from the content being correct.

Crucially, **role-played devil's advocacy does not replicate this.** When dissent is assigned ("you argue against"), the group discounts it as a performance and the divergence gains largely disappear. So the active ingredient is hard to manufacture: it requires a person who genuinely disagrees and is heard.

This is what makes the skill unusual, and honest: **an AI cannot be authentic dissent** - anything a model generates against a plan is, by definition, constructed/role-played, the weaker kind. So this skill does not pretend to *be* the dissenter. Its job is to engineer the *conditions* for real dissent: detect whether genuine dissent exists, surface who actually holds a minority view, protect it from suppression, and - for high-stakes calls - prompt seeking a real dissenter rather than relying on the model's simulated one.

## 2. Lineage

- Charlan Nemeth's program on minority influence and dissent (e.g., Nemeth et al. 2001; *In Defense of Troublemakers*, 2018): authentic dissent improves decision quality; role-played devil's advocacy does not match it.

No trademark. Named descriptively.

## 3. What the evidence shows, and what it does NOT show

**Strongly supported (the S):** authentic minority dissent reliably increases divergent thought and the breadth of options a group considers (Nemeth's experiments). And the negative result is equally well-established and load-bearing here: **role-played/assigned dissent does not produce the same gains.**

**What it does NOT show / cannot do:** it does not show that *simulated* dissent (an AI or an assigned advocate) carries the benefit - the evidence says the opposite. So an honest version of this skill is meta: it works on the social conditions for dissent, and explicitly does not claim the model's own contrarian output is a substitute for a real dissenter.

## 4. Transferred-evidence flag

The evidence is from human groups. More than transferred - it actively bounds the AI use: the model cannot supply the authentic dissent the evidence is about. The AI value is in the meta-work (detecting, eliciting, protecting genuine dissent; flagging constructed dissent as constructed), not in being the dissenter. Pair with `red-team-light` for the constructed-critique job, which is honest about being constructed.

## 5. When it works / when it fails

**Works best when:** a group decision shows suspiciously smooth consensus; you can influence how challenge is gathered (anonymous input, who speaks, outside reviewers); before a high-stakes call where you want real, not performed, challenge.

**Fails or misleads when (poor-fit / anti-patterns):**
- **Treating role-played or AI-generated dissent as authentic** - the central failure the evidence warns against.
- Assigning a devil's advocate and assuming that delivers the benefit.
- Punishing, sidelining, or "managing" the real dissenter (which destroys the effect).
- A purely solo setting with no access to other people: you cannot manufacture authentic dissent from yourself or the model - use `red-team-light` and be honest it is constructed.
- When genuine dissent already exists and is being heard (no intervention needed).

## 6. Output artifact

A **dissent audit and plan**: whether genuine dissent exists on this decision; who (if anyone) actually holds a minority view and whether it is being heard or suppressed; concrete ways to elicit and protect real dissent (anonymous pre-reads, asking the quietest first, an outside reviewer who genuinely disagrees, separating idea-generation from evaluation); and an explicit label of any dissent currently in play as authentic vs constructed.

## 7. Sources

1. Nemeth, C. et al. (2001) - dissent and decision quality; role-played devil's advocacy does not replicate authentic dissent.
2. Nemeth, C. (2018) - *In Defense of Troublemakers: The Power of Dissent in Life and Business*.

> **Verification status:** the authentic-vs-role-played finding is well-attested and is the load-bearing, honesty-defining result for this skill. Do not let the skill present the model's own contrarian output as authentic dissent.
