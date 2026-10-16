# Evidence Dossier: After Action Review

> Single source of truth for the `after-action-review` skill. The SKILL.md, sidecar, and evals derive from this. A strong-evidence anchor and the library's first reflection-family skill.

| | |
|---|---|
| **Skill** | `thinking-framework-skills.after-action-review` (installable name `think-after-action-review`) |
| **Family** | meta-thinking-and-reflection |
| **Evidence tier** | **S** (strong meta-analytic support for structured debriefs) |
| **Confidence** | High that *structured* debriefs improve performance; unstructured retros do not |
| **Status** | draft (authored 2026-05-31 from the discovery corpus) |

## 1. The mechanism (what actually does the work)

Most retrospectives are an unstructured "how did it go?" that produces venting and vague lessons. The After Action Review imposes a structure that is the source of the effect: compare **what was expected** to **what actually happened**, diagnose **why** the gaps occurred (in both directions - what went better than expected, too), and convert that into **what to sustain** and **what to change**, specifically and with owners. The "expected vs actual" comparison is the load-bearing move: without a recorded expectation, there is nothing to learn against, only hindsight narrative.

It must be blameless to work: the moment it becomes about fault, people stop surfacing the real causes.

## 2. Lineage

- Originated in the US Army (TC 25-20, "A Leader's Guide to After-Action Reviews"). The broader research base is the team-debrief literature.

No trademark. Named descriptively.

## 3. What the evidence shows, and what it does NOT show

**Strongly supported (the S):** two meta-analyses find that debriefs improve performance substantially. Tannenbaum & Cerasoli (2013), pooling team and individual debriefs, found an improvement of about 25% over control groups (d = 0.67). Keiser & Arthur (2021), on the after-action review specifically, found an overall d of 0.79 across 61 studies. The effect depends on structure (intent, comparison to expectations, specific behavioral takeaways), not on simply holding a meeting.

**What it does NOT show:** that an unstructured retro helps (it largely does not), or that an AAR fixes anything if its "lessons" are vague and never change behavior. The brand "AAR" is practitioner packaging; the *mechanism* (structured, expectation-anchored, blameless debrief) is what carries the evidence.

## 4. Transferred-evidence flag

The evidence is from human teams debriefing real events, not AI-augmented use. Transferred, not AI-validated. The AI value: a model asked "how did it go?" produces a tidy summary; this skill forces the expected-vs-actual comparison, the why, and specific owned sustain/change items - the structure the evidence says is the active ingredient - and produces a durable artifact.

## 5. When it works / when it fails

**Works best when:** a project, launch, sprint, experiment, or incident has finished and there was a real expectation to compare against; a team wants to actually learn and is willing to be blameless.

**Fails or misleads when (poor-fit / anti-patterns):**
- **No recorded expectation** to compare actual against (the central failure - you get hindsight narrative, not learning). Reconstruct the expectation honestly if it was not written down.
- It turns into blame, so people stop surfacing real causes.
- "Lessons" stay vague and unowned, changing no future behavior.
- Capturing only failures and skipping what to **sustain**.
- Run *before* the event (that is a premortem) or as a status update (wrong tool).

## 6. Output artifact

An **after-action review**: what was expected, what actually happened, why the gaps occurred (both better and worse than expected), what to sustain, and what to change - each change specific and owned. Blameless throughout.

## 7. Sources

1. US Army, TC 25-20 - the original After-Action Review guide.
2. Tannenbaum, S. I., & Cerasoli, C. P. (2013). Do team and individual debriefs enhance performance? A meta-analysis. *Human Factors* (PubMed 23516804) - d = 0.67, about 25% over control groups.
3. Keiser, N. L., & Arthur, W., Jr. (2021). A meta-analysis of the effectiveness of the after-action review (or debrief) and factors that influence its effectiveness. *Journal of Applied Psychology* 106(7): 1007-1032, doi:10.1037/apl0000821 - d = 0.79 across 61 studies.

> **Verification status (corrected 2026-10-15):** until this date, the dossier and `SKILL.md` attributed "effect size ~0.79" to Tannenbaum & Cerasoli (2013). That paper reports d = 0.67. The 0.79 belongs to Keiser & Arthur (2021), a later meta-analysis of the after-action review specifically. Both figures were re-checked on 2026-10-15: Tannenbaum & Cerasoli against its PubMed abstract, Keiser & Arthur against published summaries of its results. The tier is unchanged, because both meta-analyses support it. The "structure is the active ingredient" point is the honest core.
