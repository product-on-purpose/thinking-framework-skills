# Thinking Plan - Worked Example

A completed run of `tfs-framework-advisor` on a real, messy situation. It shows the behavior that matters: diagnosing the thinking job by evidence (not by topic), prescribing the **fewest** frameworks that do the work, sequencing them, and explicitly declining the tempting-but-wrong tools - including the library's own marquee recipe. This is the quality bar a generated Thinking Plan should meet.

The scenario is **Northwind**, the shared B2B SaaS example used across this library (see `tfs-premortem`'s example for the downstream artifact this plan points to).

---

**The user pasted:**

> "We're planning to launch a self-serve free tier in 6 weeks to hit our Q3 board number - 3x signups. The growth PM is gung-ho, sales is quiet but I sense they're not thrilled, and honestly I'm nervous we're committing to this because it's the obvious move, not because we've thought it through. The deck assumes free users convert to paid like our trials do. Should we pull the trigger?"

---

## 0. Source ledger

| ID | Exact quote | Origin |
|---|---|---|
| S1 | "launch a self-serve free tier in 6 weeks to hit our Q3 board number - 3x signups" | pasted text |
| S2 | "sales is quiet but I sense they're not thrilled" | pasted text |
| S3 | "we're committing to this because it's the obvious move, not because we've thought it through" | pasted text |
| S4 | "The deck assumes free users convert to paid like our trials do" | pasted text |
| S5 | "Should we pull the trigger?" | pasted text |

## 1. Executive summary

You are about to commit to one specific, hard-to-reverse move (a public free tier) under board-deadline pressure, and you have told me the quiet part: it is the *obvious* move, not a *examined* one (S3). So the job here is not "go / no-go on the free tier" yet - it is to think it through cheaply before a one-way door closes. The dominant job is to **challenge the framing and the load-bearing assumption first, then stress-test**. Recommended sequence: **reframe -> test the key assumption -> premortem** (three frameworks, not the full gauntlet). Start with Step 1, a 20-minute problem restatement, because if "launch a free tier" is the wrong frame, everything downstream is wasted motion. Notably, I am **not** recommending an options comparison or the stress-test recipe yet - you have not generated real alternatives to compare (section 5).

## 2. Input mirror

- **What you told me:** You have a near-final plan to launch a self-serve free tier in 6 weeks to triple signups for a Q3 board target, the growth PM backs it, sales is quietly unenthused, and you are uneasy that the choice is reflexive rather than reasoned. The plan assumes free-to-paid conversion mirrors trial conversion.
- **What you appear to be trying to accomplish:** De-risk a consequential commitment before you make it - and really, to find out whether this is the right move at all, not just whether the plan is polished. *(confidence: High; `Source:` S3, S5)*
- **Adjacent intents I noticed but did not assume:** Resolving the sales tension (S2) may be its own problem; and "hit the Q3 number" (S1) may have solutions other than a free tier that you have not put on the table.

> Confirm or correct this before the plan carries weight.

## 3. Diagnosis

| Job | Present? | Evidence |
|---|---|---|
| Reframe the problem | **yes** | You framed it as "free tier yes/no," but the goal is the Q3 growth number (S1); the solution may be pre-narrowed (S3). |
| Challenge assumptions / beliefs | **yes** | The plan rests on "free converts like trials" (S4) - an untested load-bearing assumption. |
| Stress-test for risk / failure | yes | A hard-to-reverse plan with optimistic momentum (S1, S3). |
| Shift perspective | partial | Sales is unenthused (S2) - a perspective not yet surfaced. |
| Evaluate options / decide | **not yet** | There are no compared alternatives to decide among; "should we pull the trigger" (S5) is a single-option go/no-go, not a choice set. |

- **Dominant job (unblocks the most right now):** **Reframe + assumption-check.** You said the move is reflexive (S3) and it rests on one assumption (S4). If either is off, a polished risk plan on top of a wrong frame is wasted. Reframing is also the cheapest move, so it goes first.
- **Stakes x reversibility:** **One-way door** (a public free tier is hard to pull without trust damage) x **high stakes** (board number, S1).
- **Therefore plan heft:** the fuller end - but **three** frameworks, not six. High stakes justify rigor; it does not justify stacking every tool. Overall plan confidence: **Medium** (capped by the one-way-door, and because the sales tension and the conversion assumption are still unresolved).

## 4. The Thinking Plan

### Step 1 - `tfs-problem-restatement`  ·  single skill

- **The job it does here:** Reframe. Test whether "launch a free tier" is the right problem, or a pre-narrowed answer to "hit 3x growth by Q3" - and surface the adjacent options you have not named.
- **Why this one (not a near neighbor):** Over `tfs-abstraction-laddering` (also a reframe tool) because your issue is a *pre-committed solution*, which restatement attacks directly by rewriting the problem several ways; laddering is better when the altitude is wrong, not when the frame is prematurely fixed.
- **Evidence tier:** **M/P** - moderate-to-practitioner; reframing reliably changes the solution set, though "more frames = better decision" is not a hard finding. Honest, useful, low-cost.
- **Expected artifact:** A set of 4-6 alternative problem framings with the best one chosen, and the candidate options each frame implies.
- **Run it with:**
  > "Restate this problem several ways and pick the strongest frame: we want to hit a 3x signup target for the Q3 board review, and the current plan is to launch a self-serve free tier in 6 weeks. I suspect we narrowed to the free tier too fast. Surface framings and the options each one implies."
- **When to stop / done looks like:** You have a chosen frame and 2-3 genuine alternatives to the free tier on the table (even if you still prefer the free tier).
- **Feeds into:** Step 2 (which assumption to test depends on the frame you keep).

### Step 2 - `tfs-what-would-have-to-be-true`  ·  single skill

- **The job it does here:** Challenge the load-bearing assumption. Convert "free converts to paid like trials do" (S4) into the conditions that must hold, and name the one whose failure kills the plan.
- **Why this one (not a near neighbor):** Over `tfs-evidence-vs-inference-sort` (which would also expose the assumption) because you do not just need to *label* it as an assumption - you need it turned into a **testable condition** you can go check before launch. Over `tfs-natural-frequency-bayesian` because there is no conditional-probability confusion here to re-express; that is the wrong tool (see section 5).
- **Evidence tier:** **P** - practitioner; a disciplined way to make hidden conditions explicit and checkable.
- **Expected artifact:** A list of must-be-true conditions for the chosen plan, with the killer condition (load-bearing + uncertain) flagged.
- **Run it with:**
  > "For this plan - launch a free tier in 6 weeks to 3x signups - list what would have to be true for it to work, especially the assumption that free users convert to paid like our trial users do. Flag the conditions that are both load-bearing and uncertain."
- **When to stop / done looks like:** You can name the single assumption that, if false, sinks this - and a cheap way to test it before committing.
- **Feeds into:** Step 3 (the premortem stress-tests the plan you are left with).

### Step 3 - `tfs-premortem`  ·  single skill

- **The job it does here:** Stress-test for failure. With the frame chosen and the key assumption examined, imagine it is 6 months post-launch and the free tier failed; surface causes and convert each to a tripwire, mitigation, owner, and kill criterion - while you can still change course.
- **Why this one:** It is the right last gate before a one-way-door commit, and it is where the sales tension (S2) will surface as a concrete, ownable risk rather than a vague unease.
- **Evidence tier:** **S/M** (contested) - prospective hindsight reliably surfaces more and more-specific risks and reduces overconfidence; it is *not* proven to improve final outcomes, and the "30%" figure refers to reasons generated, not decision quality. See `tfs-premortem`'s dossier.
- **Expected artifact:** A ranked risk register with tripwires and kill criteria. (See `tfs-premortem`'s worked example - it runs this exact scenario.)
- **Run it with:**
  > "Run a premortem on launching our self-serve free tier in 6 weeks. It is 6 months later and it failed badly - surface the likely causes (include the sales-team dynamics and the free-to-paid conversion assumption), and give each a tripwire, mitigation, owner, and kill criterion."
- **When to stop / done looks like:** Every top risk has a pre-decided response, and you have at least one kill criterion you would actually honor.
- **Feeds into:** This is the whole plan. After it, you can commit with eyes open or decide not to.

## 5. What NOT to use, and why

- **Not `tfs-decision-option-review` (yet).** It compares options against weighted criteria - but right now you effectively have one option (S5). Comparing it against nothing is theater. It becomes the right tool *after* Step 1 surfaces real alternatives; if it does, run it before the premortem.
- **Not `tfs-natural-frequency-bayesian`.** Tempting because there is a "conversion rate," but you have no conditional-probability confusion (no base-rate-vs-test-accuracy trap). It would add ceremony, not insight.
- **Not the `tfs-stress-test-decision` recipe.** It is the library's flagship, and it ends in a premortem - but it *presumes you have already compared options and chosen one*. You have not. Running the full recipe now front-loads heavy rigor onto a frame you have not yet validated. We borrowed only its premortem step, in the right place.
- **Cut by the stakes calibrator:** high stakes tempt over-tooling. We are deliberately not adding `tfs-futures-wheel`, `tfs-red-team-light`, or `tfs-reference-class-forecasting` now. The first two are reasonable later adds; reference-class forecasting is genuinely worth it once you have a number to sanity-check (after Step 2), so hold it as a Step 2.5 only if the conversion assumption survives.

## 6. If this goes deeper (optional)

- Reframing (`tfs-problem-restatement`): catalog family 3, "Problem framing and reframing."
- Testable conditions (`tfs-what-would-have-to-be-true`): family 4, "Assumption and belief challenge."
- Premortem (`tfs-premortem`): family 5; see its dossier for the honest evidence read (S/M, contested).

## 7. Evidence and source map

| Claim / recommendation | Source ID | Exact quote |
|---|---|---|
| The choice is reflexive, so reframe first | S3 | "we're committing to this because it's the obvious move, not because we've thought it through" |
| A load-bearing assumption needs testing | S4 | "The deck assumes free users convert to paid like our trials do" |
| One-way door, high stakes -> fuller heft | S1 | "launch a self-serve free tier in 6 weeks to hit our Q3 board number - 3x signups" |
| No option set yet -> defer option-review | S5 | "Should we pull the trigger?" |

- **Inferred (Low confidence) claims:** that sales' quiet (S2) reflects substantive disagreement rather than disinterest - flagged, and not the sole basis for any recommendation.
- **Gaps:** you did not say whether the 3x target itself is negotiable. The one question that would most improve this plan: *is the Q3 board commitment the signup number, or the growth it is a proxy for?* If the latter, Step 1 may surface a faster, lower-risk path.

---

*Note the behavior worth copying: the dominant job was diagnosed from what the user said about their own reasoning (S3), not from the topic; the plan is three frameworks, not the whole catalog; each step names why it beats its nearest neighbor; and the library's own marquee recipe is explicitly declined because its precondition is not met. A Thinking Plan that recommends six frameworks "to be thorough" has failed.*
