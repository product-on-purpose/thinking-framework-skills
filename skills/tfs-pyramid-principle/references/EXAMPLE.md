# Pyramid - Worked Example

A completed run of the `pyramid-principle` skill on a real recommendation. This is the quality bar a generated pyramid should meet.

> Use the shared recurring scenario (Northwind, a B2B SaaS weighing a self-serve free-tier launch) so examples across skills read as one coherent product. See `docs/internal/AUTHORING.md`.

---

## Subject

- **Recommendation being communicated:** Northwind has finished its analysis and decided to launch the self-serve free tier, but only behind explicit guardrails. The exec team now needs that recommendation written up as a decision memo. (The decision is made; this is the write-up, not the analysis.)
- **Reader:** Northwind's exec team and the board sponsor for the Q3 growth target - busy readers who want the recommendation first and the option to descend for detail.
- **Ordering logic for the key arguments:** Importance. The reader's first question is "should we do this at all?", so the arguments run growth case, then the conditions that make it safe, then the cost of waiting.

## Governing thought (top of the pyramid)

**Launch the self-serve free tier in Q3, but only behind three pre-committed guardrails (paid-feature gating, a usage cap with a cost tripwire, and a redesigned sales comp model); without them, hold.**

## Optional SCQA intro

- **Situation:** Northwind's growth is sales-led and predictable, and the Q3 board target assumes a step-change in top-of-funnel volume.
- **Complication:** The sales-led motion cannot deliver that step-change on its own in one quarter, and competitors now offer a free entry point that is capturing the developers who later choose tooling.
- **Question:** Should Northwind launch a self-serve free tier this quarter, and if so, on what terms?
- **Answer:** Yes - launch in Q3, but only behind the three guardrails (= the governing thought).

## The pyramid

```
GOVERNING THOUGHT: Launch the self-serve free tier in Q3, but only behind three pre-committed
                   guardrails; without them, hold.

  KEY ARGUMENT 1: The free tier is the only lever that can hit the Q3 top-of-funnel target.
    - support: Sales-led sign-ups have grown ~12% per quarter; the board target needs ~3x volume, which the current motion cannot reach in one quarter.
    - support: Two direct competitors launched free tiers in the last year and are now first to reach developers who later pick the team's tooling.
    - support: A self-serve path removes the sales-touch bottleneck that currently caps how many small accounts can even enter the funnel.

  KEY ARGUMENT 2: It is only safe if three risks are pre-committed against, so the launch must carry guardrails as conditions, not hopes.
    - support: Cannibalization - without gating the top value features behind paid, existing customers can downgrade to free; guardrail = gate the top three features and instrument the free-to-paid funnel before launch.
    - support: Cost runaway - unqualified free users can swamp support and infra; guardrail = a hard usage cap plus a cost-per-free-user tripwire set before launch.
    - support: Sales conflict - reps will undercut the motion if comp and lead-routing are unchanged; guardrail = a redesigned comp model agreed with sales leadership before any announcement.

  KEY ARGUMENT 3: Waiting a quarter costs more than a guarded launch risks.
    - support: Each quarter of delay cedes the developer-entry point to the two competitors, who compound their lead.
    - support: The guardrails make the downside bounded and reversible-on-signal (caps, tripwires, kill criteria), whereas a missed Q3 target is a fixed, public miss against the board.
    - support: The build cost of the guarded thin-slice launch is small relative to the pipeline it is forecast to open.
```

## Structure check

- **Vertical:** each key argument answers "why launch in Q3 behind guardrails?" - because it is the only lever that hits the target (1), because it is safe only if guarded (2), and because waiting costs more than guarding (3). Each support backs its own key line.
- **Horizontal (MECE):** the three key lines do not overlap (the growth case, the safety conditions, and the cost of delay are distinct). Together they cover the reader's three real questions - is it worth doing, is it safe, and why now - leaving no material gap before a launch decision.
- **Sum:** the three key arguments justify exactly the governing thought, including its "without them, hold" condition (argument 2 is what makes the guardrails non-negotiable). They do not over-claim a guaranteed outcome.

---

*Note how the value is in the inversion: the recommendation and its single hard condition ("only behind three guardrails; without them, hold") land in the first line, and the reader can stop there or descend exactly as far as their trust requires - whereas the same content told discovery-first would bury the decision under three paragraphs of market context. The pyramid makes the case clearer to follow; it does not, on its own, prove the decision is right.*
