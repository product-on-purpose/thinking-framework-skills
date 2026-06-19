# plan_v0.10.0 - Measure, then decide (the next work line)

**Status:** SHIPPED as v0.10.0 on 2026-06-19. The scope grew beyond this plan's original "measure then decide" framing; see the reconciliation note.

**Shipped reconciliation (kept honest).** Plan vs reality: (1) the **eval re-run + trust-page refresh** (this plan's primary move) shipped as planned. (2) The **naming caveat below was exactly right** - the site work shipped no-bump, and the first plugin-affecting change (the `red-team-light` evidence-tier re-grade) is what triggered the actual v0.10.0 cut. (3) The line then **grew well past "measure then decide"**: rather than sit idle waiting for the GA4 signal, the run also shipped the discoverability activation (`llms.txt` linked + `llms-full.txt`), the Track B cross-library Showcase, the full samples corpus (example coverage 56/56), a 44-page quality pass, and the re-grade. (4) The **GA4-gated content-vs-acquisition decision (step 2 below) is still deferred** - GA4 data is not yet meaningful, so that genuine fork is carried forward, not resolved here.
**Theme:** the catalog and Framework Library are complete and now discoverable by agents (v0.9.0). The next moves are **measurement-gated**: refresh the trust numbers, let the live signal accrue, and let it - not a guess - choose between a content push and an acquisition push.

**Naming caveat (kept honest):** the immediate next move (the eval re-run + trust-page refresh) is a site-content refresh that likely carries **no plugin version bump** (the same call as the v0.9.0-era custom-domain change: `skills/` is unchanged, so consumers are unaffected). So `v0.10.0` marks the next *plugin-affecting* release this line eventually produces, not the eval refresh itself. If the first thing that ships here is site-only, it ships as a no-bump deploy and this folder keeps tracking the line until a real version cut lands.

## Context

This plan captures a prioritization made at the end of the 2026-06-16 session (custom-domain cutover + GA4 live) that, until now, lived only in the session transcript and a gitignored session log. The decision's two ingredients were already documented - the **signal-reading mechanism** in [`docs/internal/MEASUREMENT.md`](../../MEASUREMENT.md) (section 1 + the section-5 table) and the **regret risk** in the content-plan premortem (`_local/content-plan/`) - but the prioritization itself was not. This folder is its durable home.

Two infrastructure items from that session are **done** and are not part of this plan: the docs site is live at the custom-domain root (PR #67), and GA4 is on via the `PUBLIC_GA_ID` repo variable, so the measurement loop is collecting.

## The order, and why (ceiling vs regret)

The options at the end of v0.9.0 were: **(A)** the full-catalog eval re-run + trust-page refresh; **(B)** content Wave 0 (the recurring cast / sample schema / generation jobs that unblock the content plan); **(C)** turning GA on; **(D)** the `red-team-light` P->M catalog re-grade. The call turns on one distinction: **ceiling vs regret.**

1. **Eval re-run + trust-page refresh (A) - DO FIRST. Highest value, zero regret.** It pays off identically on *every* downstream branch (content or acquisition), is cheap and reproducible, and refreshes the trust page the whole positioning leans on (`start/does-this-work` still shows the 47-skill numbers from 2026-06-10; the catalog is 56). Nothing about the eventual content-vs-acquisition decision makes this work wasted.
2. **Read the signal, then decide content vs acquisition.** Let GA4 accrue and read it against [`MEASUREMENT.md`](../../MEASUREMENT.md): low non-referral traffic = acquisition is the bottleneck (distribution, `llms.txt`, sharing); traffic that arrives but bounces on the Showcase/eval pages = conversion (more/better content). This is the gated decision the whole content plan waits on.
3. **Wave 0 content (B) - DEFERRED until there is a signal. Highest ceiling, but real regret.** Wave 0 is the keystone that unblocks the entire content plan, so its ceiling is the highest of any option. But the recurring cast is needed *only on the content path*. Building it before the signal exists is a bet placed before the data - precisely the content-plan premortem's #1 rollout risk ("building on guesses with no feedback loop") and exactly what "do not immediately build more content" means.
4. **GA activation (C) - DONE 2026-06-16.** Its core had the highest *leverage* in the system (it unblocks the largest downstream decision), but it was a 30-second user action, not work - so the right treatment was always "do it in parallel," not "pick it and wait." That parallel action has now been taken; the loop is live, which is what makes step 1 unambiguously next.
5. **`red-team-light` P->M re-grade (D) - optional side-quest.** A real but small catalog-quality item, not the headline. It must go through `think-research-framework` NAME mode (a tier moves via the engine, never by hand).

## Step 1 detail - the eval re-run

- Use the existing harness in `scripts/eval/`. Run **both** evals across all 56 shipped skills:
  - **Trigger:** `extract-cases` (blind answer key) -> `route.workflow` (blind router agents route each situation against the advisor `recommendable.json`, never seeing the authoring skill) -> `score.mjs` -> `stamp-meta`.
  - **Output:** `output.workflow.mjs` (a producer runs each skill -> artifact; a separate judge grades it vs the eval-cases "Output checks") -> `score-output.mjs` -> `stamp-meta [output]`.
- **Throttle lesson:** a >20-way Opus fan-out trips a server-side burst throttle; batch into serial groups of ~4. `resumeFromRunId` recovers stragglers from cache. Workflow `args` can arrive stringified - parse defensively.
- Write dated results to `docs/internal/eval-results/`; stamp `trigger_eval_status` / `output_eval_status` to `measured-<date>` on all 56.
- Refresh `site/src/content/docs/start/does-this-work.mdx` from the fresh JSON - the body prose **and** the `description:` frontmatter (it bakes in 561 / 315 / 99%). Then `cd site && npm run build` and run the guards.
- This run doubles as a quality probe on the 9 skills added since 2026-06-10 (the C-tier + ethics-family additions never went through a full eval). Flag any that score below the existing bar (trigger 99% top-1 / 0 false-fires; output 99% checks). The evals are model-executed and non-deterministic - a measurement, not a gate.

## Deferred (after a signal)

- **Wave 0 foundation:** `SCENARIO_PROFILES.md` recurring cast, the sample-file frontmatter schema, the generation jobs, `CONTENT-STYLE.md`. The no-regret content foundation - but only once the signal says "content."
- **Track B Showcase:** the pm-skills cross-library handoff (Brainshelf / Storevine / Workbench). The highest-value content follow-on.
- **Discovery polish (optional):** link `llms.txt` from `robots.txt` / the site `<head>`; consider `llms-full.txt`.

## Sources

- 2026-06-16 session log (gitignored local artifact): `_agent-context/session-log/2026-06-16_18-55_claude_custom-domain-cutover-ga-live.md`.
- [`docs/internal/MEASUREMENT.md`](../../MEASUREMENT.md) - the signal-reading loop this plan is gated on.
- The aggregated content plan: `_local/content-plan/2026-06-12_content-plans_aggregated.md` (and its premortem).
