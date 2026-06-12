# Known-Unknowns Ledger - Worked Example

A completed run of the `consider-the-unknowns` skill on a real, consequential judgment. This is the quality bar a generated ledger should meet.

> Uses the shared recurring scenario (Northwind, a B2B SaaS weighing a self-serve free-tier launch) so examples across skills read as one coherent product. Here the move is applied to a thin-evidence COMPETITIVE READ that the free-tier strategy quietly rests on - the kind of one-off judgment with no clean base-rate class where omission neglect inflates confidence. Where `think-red-team-light` would generate the strongest KNOWN case against the read, and `think-what-would-have-to-be-true` would test the conditions a favored option needs, this skill enumerates the relevant evidence Northwind does NOT have and re-rates the confidence against that gap. See `docs/internal/AUTHORING.md`.

---

## Judgment under consideration

- **Judgment:** "Wedge, the AI-native competitor that just announced a free tier, is not a real threat to our self-serve launch - they will run out of funding before they convert enough free users to matter, so we should proceed with our launch plan unchanged."
- **Original confidence:** High (the exec team put it around 80%).
- **Why an unknowns audit fits here:** This is a one-off competitive read built from a thin, coherent slice of evidence - one funding rumor, a slick launch page, and the team's prior that AI-native startups burn fast. There is no clean reference class for "will THIS specific competitor's free tier beat ours," the call is consequential (it sets whether Northwind's launch plan changes), and the 80% feels driven as much by a tidy story as by evidence actually held. Classic omission-neglect setup.

## Wall check (confirmed before building the ledger)

- [x] No genuine reference class exists - "this named competitor's free-tier outcome" is a single case, not a base-rate class. (A reference-class read of "free-tier B2B startups that survive 24 months" would be a useful SEPARATE input, but it does not answer the specific threat read.)
- [x] Not an interval-width task - this is a discrete competitive judgment, not a numeric estimate with a stated range.
- [x] The unknowns are NOT all cheap to resolve - some (Wedge's runway, their conversion curve) are partly obtainable; the decisive ones are not.
- [x] The judge is plausibly OVERconfident, not underconfident - 80% on a story-driven read is the target case.
- [x] Consequential and not trivially reversible - changing or not changing the launch plan is a real bet.

## The unknowns

The relevant variables that bear on the "Wedge is not a real threat" judgment but are not in hand.

| Unknown variable | Bearing (how much it would move the call) | Obtainability (resolvable, at what cost / unobservable) | Resolve before committing? |
|---|---|---|---|
| Wedge's actual runway and burn rate | High - the entire judgment rests on "they run out of funding first" | Partly resolvable - approximate via headcount, recent raise filings, hiring pace; exact numbers are private | Yes - this is the load-bearing assumption and it is partly knowable |
| Wedge's free-to-paid conversion rate and activation curve | High - a high conversion rate flips "won't convert enough to matter" | Mostly unobservable - private; only inferable later from public traction signals | No (cannot resolve now) - becomes an irreducible unknown the confidence must absorb |
| Whether Wedge's AI-native product does a job our workflow does NOT | High - if it solves a different, larger job, funding math is the wrong lens entirely | Resolvable - hands-on trial of their free tier, win/loss notes, customer interviews | Yes - cheap and decisive |
| Our own free-tier conversion rate at launch (unlaunched, so unknown) | High - "they won't convert enough" implicitly assumes WE will; we have no data either | Resolvable only by launching or by a small pilot; not knowable pre-launch | Partial - run a limited pilot rather than assume |
| Whether a well-funded incumbent backs or acquires Wedge | High - removes the funding constraint the whole read depends on | Unobservable - depends on third-party intent | No - irreducible |
| Switching costs and lock-in for buyers choosing between us and Wedge | Medium - shapes how fast either free tier compounds | Resolvable - customer and prospect interviews | Yes - feeds the read and is cheap |
| Wedge's geographic / segment focus vs ours | Medium - they may not contest our core segment at all | Resolvable - their site, job posts, customer logos | Yes - cheap |
| Macro funding climate over the next 12 months | Low-medium - shifts the base rate of "startups run out of money" | Partly resolvable - public market signals; coarse | No - too coarse to move this specific read |

- **Resolve-before-committing list (high bearing AND resolvable):** (1) Triangulate Wedge's runway from headcount, filings, and hiring pace; (2) actually trial Wedge's free tier and run win/loss interviews to learn whether it does a DIFFERENT job; (3) run a limited free-tier pilot of our own to get a real conversion signal rather than assuming one; (4) interview prospects on switching costs and segment overlap. These four are obtainable in days-to-weeks and each could move the call.
- **Irreducible unknowns (high bearing but unobservable):** Wedge's private conversion curve, and whether a deep-pocketed incumbent backs or buys them. No amount of work closes these now; they are the uncertainty the confidence has to honestly carry.

## Re-rated confidence

- **Re-rated confidence:** Medium - roughly 50-55%, pending the four resolve-first items.
- **Delta from original:** Down from ~80% to ~50-55% (a large drop).
- **Reason the delta is this size:** The original 80% rested almost entirely on ONE unknown treated as known - "they will run out of funding first" - while three other high-bearing variables (whether Wedge does a different job, what their conversion curve is, what OUR conversion will actually be) were never in the frame at all. The drop is large precisely because so much of the confidence was the comfort of a coherent story rather than evidence held. Note the selectivity: the parts of the read that ARE well-grounded (Northwind's existing distribution and brand in its core segment) are not discounted - the audit cuts the confidence that came from omission, not the confidence that came from evidence. If the four resolve-first items come back favorable, confidence can rise again on a firmer basis; if they come back unfavorable, the launch plan should change, which is exactly the decision this ledger protects.

---

## Evidence caveat (ships with every ledger)

> This ledger is a calibration aid, not a measured improvement in the decision's outcome. Its evidence tier is **M (moderate)**: the move that listing relevant unknowns before stating confidence reduces overconfidence selectively (where the judge is overconfident) has direct controlled support (Walters, Fernbach, Fox and Sloman, 2017) plus an independent mechanism line (omission neglect; Kardes et al., 2006). It is M and not S because the exact prompt rests on a single research line with no named independent replication, on student and online-panel populations. All of that evidence is **transferred from human studies and has not been validated on AI agents**. The move does NOT repair the width of a numeric interval (Ferretti, Montibeller and von Winterfeldt, 2023), and it is no substitute for a real reference class when one exists. Treat the re-rated ~50-55% as a more honest confidence, not a proven-more-accurate one.

---

*Note how this differs from its neighbors on the same Northwind question. `think-red-team-light` would build the strongest KNOWN argument that Wedge IS a threat - working from evidence and arguments already available. `think-what-would-have-to-be-true` would take the favored option (proceed unchanged) and test the conditions it needs to hold. `think-evidence-vs-inference-sort` would classify the claims already on the table into evidence, inference, and assumption. This skill does none of those: it enumerates the relevant evidence Northwind does NOT have, rates each gap by bearing and obtainability, and lets the size and resolvability of the gap - not a stronger argument - re-rate the confidence. The deliverable is a mapped absence and an honest confidence, not a counter-case and not a sorted set of present claims.*
