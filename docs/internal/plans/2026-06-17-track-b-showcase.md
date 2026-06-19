# Plan: Track B Showcase (the cross-library, tfs -> pm-skills thread)

**Status:** proposed, build-ready (not started).
**Type:** content build (hand-authored narrative pages, same surface as the v0.8.0 Track A Showcase).
**One line:** nine Showcase pages - three companies, three decisions each - that each end by handing the reasoning artifact off to the pm-skills delivery artifact it feeds, so a reader follows one company from a messy situation to a shipped feature across both libraries.

## Why this, and what makes it different

Track A (shipped in v0.8.0: Mira / Daniel / Priya, 16 journeys) proves *a framework produces a good artifact*. Track B proves the thing only the product-on-purpose ecosystem can show: **tfs decides, pm-skills delivers.** Each page is a normal Showcase journey plus one new section - **the handoff** - that names the pm-skills artifact the reasoning feeds. It is the conversion-side asset that sells the whole marketplace, not tfs alone.

Sources of truth (already in the repo):
- The cast: `docs/internal/SCENARIO_PROFILES.md`, "Track B" section (Storevine, Brainshelf, Workbench, with profiles and prompt styles).
- The handoff map: `_local/content-plan/2026-06-12_content-plans_aggregated.md` section 3.5 (which tfs artifact feeds which pm-skills artifact).
- The page format + definition of done: `docs/internal/CONTENT-STYLE.md` and the exemplar `site/src/content/docs/showcase/mira-launch-premortem.md`.

## The model: a Track A page + a handoff section

Every Track B page follows the **established Showcase unit** (CONTENT-STYLE "Showcase page" DoD), then adds one section:

1. Blockquote intro: who, the decision, the prompting style.
2. `## The situation`
3. `## The prompt` - the verbatim prompt in the company's style, in a fenced block.
4. `## The output` - the **full** artifact, filling the skill's `references/TEMPLATE.md` (not a stub).
5. `## Why this prompt worked`
6. `## The handoff to pm-skills` - **NEW.** One short section naming the pm-skills delivery artifact this reasoning feeds, and what crosses the boundary (the decision, the constraints, the risks). See "Handoff rules" below.
7. `## Next in the thread` - link to the next Track B page for the same company (the last page links back to the Showcase index).

**All concrete facts - the numbers, the named people, the timeline, the constraints - come from the company's thread fact-sheet (the section below), not invented per page.** That shared, frozen context is what makes three independently-authored pages read as one real company making three decisions, rather than three unrelated runs. The pages do NOT have to feed one artifact into the next (these tools are not that linear); they have to sit in the same consistent world.

### Handoff rules (critical - keep the build green and the coupling honest)

- **The handoff is prose, never a hyperlink.** pm-skills is a separate library on a separate site; per `SCENARIO_PROFILES.md` the handoff is "a narrative reference, never a build-validated link." Name the pm-skills artifact in backticks as plain text (e.g. "feeds pm-skills' `define-problem-statement`"), do **not** link it. This is also what keeps `check-rendered-links.mjs` green (an external/non-existent route would fail the guard).
- **No technical coupling.** Content reuse only. Do not import, require, or cross-reference pm-skills files.
- Name the pm-skills artifact exactly as the handoff map (section 3.5) gives it.

## The page set (9 journeys + 1 index edit)

Three companies, each a three-page thread that mirrors a real product arc (frame -> decide -> de-risk), each page a distinct shipped skill (nine distinct skills total), each handing off per the map.

| # | File (`site/src/content/docs/showcase/`) | Company / style | tfs skill | pm-skills handoff |
|---|---|---|---|---|
| SB-1 | `storevine-restate-campaigns.md` | Storevine / organized | `think-problem-restatement` | `define-problem-statement` |
| SB-2 | `storevine-build-vs-buy.md` | Storevine / organized | `think-decision-option-review` | `develop-adr` / `develop-solution-brief` |
| SB-3 | `storevine-red-team-launch.md` | Storevine / organized | `think-red-team-light` | risks section of `deliver-prd` |
| BR-1 | `brainshelf-boundary-resurface.md` | Brainshelf / casual | `think-boundary-critique` | `define-problem-statement` / `define-hypothesis` |
| BR-2 | `brainshelf-forecast-adoption.md` | Brainshelf / casual | `think-reference-class-forecasting` | `foundation-okr-writer` |
| BR-3 | `brainshelf-premortem-digest.md` | Brainshelf / casual | `think-premortem` | `deliver-launch-checklist` |
| WB-1 | `workbench-stakeholder-matrix.md` | Workbench / enterprise | `think-ethical-matrix` | `discover-stakeholder-summary` + constraints in `deliver-acceptance-criteria` |
| WB-2 | `workbench-issue-tree-adoption.md` | Workbench / enterprise | `think-issue-tree` | structures `discover-competitive-analysis` |
| WB-3 | `workbench-gate-model-ev.md` | Workbench / enterprise | `think-expected-value-decision-tree` | `develop-adr` |

Note `think-stakeholder-lens-review` (named in the map) is **not a shipped skill** (cut for overlap); WB-1 uses `think-ethical-matrix`, which ships and produces the stakeholder-by-value grid the handoff needs.

## The thread fact-sheets (the carry-forward context)

The risk in authoring three pages per company with independent subagents is that each invents its own specifics - team size, metrics, names - so the thread ends up consistent in voice but contradictory in fact. The fix is **one frozen fact-sheet per company**, the shared world every page in that thread draws from. It extends the `SCENARIO_PROFILES.md` Track B profile (which fixes only identity and voice) with the concrete recurring detail the profile omits.

**These three fact-sheets are authoritative.** Every page-subagent for a company is primed with that company's fact-sheet; the numbers, names, and timeline below must be reused, not re-invented per page. Keep facts plausible for the company's stage; round numbers are fine. This is the carry-forward context - a shared consistent world, NOT artifacts feeding into each other.

### Storevine - fact-sheet
- **Company:** B2B ecommerce platform (merchants run storefronts on Storevine). Series A, 70 staff, ~$10M ARR, 15K active merchants (a long tail of SMBs plus a few hundred mid-market). Organized, process-led culture.
- **The feature:** "Campaigns" - native email/SMS so merchants reach buyers without leaving Storevine. Today ~40% of merchants export contact lists to a third-party ESP (Klaviyo / Mailchimp).
- **The cast:** Dana Okafor, Group PM for Growth (runs the frameworks; organized prompter). Sam Reyes, eng lead on the Growth pod. Leah Chen, infra / deliverability. The CEO's stated goal this year is merchant retention.
- **The pod + budget:** the Growth pod = Dana + 3 engineers + 1 designer; the budget under discussion is ~one quarter (~13 weeks) of that pod.
- **Where the thread sits:** Q3 planning. Campaigns is the candidate; build-vs-buy is open at the start; nothing is committed until the red-team (page 3).
- **Non-negotiables / live tensions:** deliverability is a hard requirement (a bad sender reputation would hurt every merchant); mid-market merchants care about data control; the running tension is time-to-value vs deliverability risk vs margin (an ESP integration carries a per-message cost).

### Brainshelf - fact-sheet
- **Company:** consumer personal-knowledge app (notes plus saved articles). Post-seed (~$3M raised), 20 staff, 22K monthly actives out of ~140K registered. Casual, founder-led, ships fast.
- **The feature:** "Resurface" - a morning digest that resurfaces old notes and saved items. The believed problem: people forget what they saved.
- **The cast:** Theo Almeida, founder / CEO (casual prompter; makes the calls himself). Nina Park, the engineer who would build it. No PM layer; Theo decides.
- **The team + budget:** the product trio = Theo + 2 engineers; ~1 month to a launchable Resurface.
- **Where the thread sits:** a next-quarter bet. Whether Resurface is even the right framing is open at the start (page 1); by page 3 it is being launched.
- **Recurring numbers:** ~8% of users currently keep notifications on; D30 retention is the metric Theo worries about; there is no comparable in-app digest yet, so adoption is a guess he refuses to fabricate.
- **Non-negotiables / live tensions:** the digest must feel valuable, not naggy; the core tension is engagement vs notification fatigue / churn, on a small team with little eng to spare.

### Workbench - fact-sheet
- **Company:** enterprise collaboration platform (shared workspaces, docs, workflows). Series B (~$40M raised), 200 staff, ~500 enterprise customers; ~30% are in regulated industries that need audit trails (SOC2, change-control).
- **The feature:** "Blueprints" - reusable templates that route through reviewers via approval gates before they publish.
- **The cast:** Priyanka Rao, Principal PM, Enterprise (detailed, accountable prompter). Marcus Hale, eng lead. Dr. Elena Voss, security & compliance lead. A customer advisory board of ~12 enterprise admins informs the work.
- **The pod + budget:** the Blueprints pod = Priyanka + 4 engineers + Elena (part-time); a half-year roadmap slot.
- **Where the thread sits:** Blueprints (the templates) is already shipping; **approval gates** is the contested addition this thread decides. Enterprise demand for strict governance is uncertain and varies by segment.
- **Non-negotiables / live tensions:** least-privilege and auditability are table stakes for the regulated ~30%; the live tensions are speed-of-authoring vs control, author autonomy vs least-privilege, and a configurable gate model's flexibility vs its maintenance cost.

## Per-page specs

Each spec below gives the agent everything needed to author the page with no further design decisions. Pull the concrete facts (numbers, named people, timeline, constraints) from the company's **thread fact-sheet above** - weave the named cast into the situation and the artifact (e.g. owners in a risk register, the PM in the framing); fill the named skill's `references/TEMPLATE.md` for the artifact.

### SB-1 - `storevine-restate-campaigns.md`
- **Frontmatter:** title "Storevine reframes a build request"; description "An ecommerce platform turns 'build native Campaigns' into the actual problem before committing a quarter of eng."; `sidebar.label: "Storevine -> restate"`.
- **Company / style:** Storevine (B2B ecommerce, 70 staff, 15K merchants, building "Campaigns" native email/SMS). Organized: a structured block (situation, constraints, what was considered).
- **Situation:** merchants keep exporting lists to a third-party ESP; the team's reflex is "build the feature they asked for." Before scoping, restate the problem.
- **Prompt (verbatim, organized):**
  ```
  /think-problem-restatement "Situation: merchants keep exporting contact lists to Mailchimp
  because we have no native email/SMS. Proposal on the table: build 'Campaigns' natively this
  quarter. Constraints: 70-person team, 15K merchants, ~one quarter of eng capacity, deliverability
  is a hard requirement. Considered so far: native build vs deep integration with an ESP. Before we
  scope, restate the problem so we aren't just defaulting to 'build the feature they named.'"
  ```
- **Artifact:** fill `think-problem-restatement` TEMPLATE - several reframings of the problem and the chosen restatement (e.g. "merchants need campaigns to reach buyers without leaving Storevine" -> "the job is owned reach + attribution, not an email tool").
- **Handoff:** the chosen restatement feeds pm-skills' `define-problem-statement` - the decision layer hands the framed problem to the delivery layer that writes the canonical statement.
- **Next in thread:** SB-2 (`storevine-build-vs-buy`).

### SB-2 - `storevine-build-vs-buy.md`
- **Frontmatter:** title "Storevine weighs build vs buy vs partner"; description "A weighted option matrix on Campaigns - native build, ESP integration, or partner - with an honest sensitivity note."; `sidebar.label: "Storevine -> build vs buy"`.
- **Situation:** with the problem restated (SB-1), three real options: build natively, integrate an ESP under the hood, or partner/white-label.
- **Prompt (organized):**
  ```
  /think-decision-option-review "Decision: how to deliver Campaigns. Options: (a) build native
  email/SMS, (b) integrate an ESP under our UI, (c) partner/white-label. Criteria that matter:
  time-to-value for merchants, deliverability risk, gross margin, eng load this quarter, and merchant
  trust/data control. Give me a weighted matrix and tell me how sensitive the pick is to the weights."
  ```
- **Artifact:** fill `think-decision-option-review` TEMPLATE - criteria, weights, scored options, the pick, and the sensitivity note.
- **Handoff:** the chosen option and its rationale feed pm-skills' `develop-adr` (the architecture decision record) and `develop-solution-brief`.
- **Next in thread:** SB-3.

### SB-3 - `storevine-red-team-launch.md`
- **Frontmatter:** title "Storevine red-teams the Campaigns launch"; description "Before committing the quarter, the strongest case against shipping Campaigns, ranked by damage."; `sidebar.label: "Storevine -> red-team"`.
- **Situation:** option chosen (SB-2); before the quarter is committed, stress the decision.
- **Prompt (organized):**
  ```
  /think-red-team-light "We've decided to build Campaigns natively this quarter. Before we commit,
  argue the strongest honest case against it - deliverability, support load, margin, merchant churn
  risk - and rank the objections by how much damage each does if true."
  ```
- **Artifact:** fill `think-red-team-light` TEMPLATE - thesis stated fairly, ranked steelmanned objections, the can-it-answer column, verdict.
- **Handoff:** the ranked objections feed the **risks section of pm-skills' `deliver-prd`** - the decision layer's red-team becomes the delivery doc's risk register.
- **Next in thread:** back to the Showcase index (thread complete).

### BR-1 - `brainshelf-boundary-resurface.md`
- **Frontmatter:** title "Brainshelf draws the boundary on a digest"; description "A consumer note app checks whether a morning digest is even the right problem before building it."; `sidebar.label: "Brainshelf -> boundary"`.
- **Company / style:** Brainshelf (consumer PKM, 20 staff, 22K MAU, building "Resurface" morning digest). Casual: a sentence or two, first person.
- **Prompt (casual):**
  ```
  /think-boundary-critique "thinking about a morning digest ('Resurface') that resurfaces old notes.
  but i'm not sure that's the real problem - people say they forget what they saved. help me draw
  the boundary on what this is and isn't before we build it."
  ```
- **Artifact:** fill `think-boundary-critique` TEMPLATE - what is in / out of the system, whose framing is privileged, what the "digest" frame excludes (e.g. search, surfacing-in-context).
- **Handoff:** the bounded problem feeds pm-skills' `define-problem-statement` and `define-hypothesis`.
- **Next in thread:** BR-2.

### BR-2 - `brainshelf-forecast-adoption.md`
- **Frontmatter:** title "Brainshelf forecasts digest adoption from the outside"; description "Before setting an OKR, the base rate for daily-digest open rates instead of a hoped-for number."; `sidebar.label: "Brainshelf -> forecast"`.
- **Prompt (casual):**
  ```
  /think-reference-class-forecasting "before we set a goal for Resurface i don't want to make up a
  number. of our 22k users, what share will actually open a daily digest? what do comparable
  digest / morning-summary / notification features actually get?"
  ```
- **Artifact:** fill `think-reference-class-forecasting` TEMPLATE - the reference class, the base rate (outside view), the case-specific adjustment, the forecast with its honesty caveat.
- **Handoff:** the realistic range feeds pm-skills' `foundation-okr-writer` - a target grounded in a base rate, not optimism.
- **Next in thread:** BR-3.

### BR-3 - `brainshelf-premortem-digest.md`
- **Frontmatter:** title "Brainshelf premortems the Resurface launch"; description "A casual one-line premortem yields a ranked risk register with tripwires for the digest launch."; `sidebar.label: "Brainshelf -> premortem"`.
- **Prompt (casual):**
  ```
  /think-premortem "we're shipping Resurface (the morning digest) in a month. nervous it just becomes
  notification spam people mute, or worse, makes the app feel naggy. what kills this?"
  ```
- **Artifact:** fill `think-premortem` TEMPLATE - the failure declared in past tense, ranked causes, each with a tripwire and kill criterion. (Carry the pre-printed evidence-caveat element.)
- **Handoff:** the risk register feeds pm-skills' `deliver-launch-checklist` - each tripwire becomes a launch gate.
- **Next in thread:** back to the Showcase index.

### WB-1 - `workbench-stakeholder-matrix.md`
- **Frontmatter:** title "Workbench maps stakeholders before approval gates"; description "An enterprise tool grids stakeholders against values before writing acceptance criteria for approval gates."; `sidebar.label: "Workbench -> stakeholders"`.
- **Company / style:** Workbench (enterprise collaboration, 200 staff, 500 customers, building "Blueprints" templates + approval gates). Enterprise: detailed, formal, names roles and accountability.
- **Prompt (detailed / enterprise):**
  ```
  /think-ethical-matrix "We're adding approval gates to Blueprints (templates that route through
  reviewers before publish). Stakeholders: template authors, approvers/admins, end users who consume
  published blueprints, and customer compliance/IT. Values in tension: speed of authoring, control
  and auditability, autonomy of authors, and least-privilege. Map stakeholders against these values
  before we write acceptance criteria, so we see whose interests the gate design trades off."
  ```
- **Artifact:** fill `think-ethical-matrix` TEMPLATE - the stakeholder-by-value grid, the conflicts surfaced, no single "right" answer manufactured.
- **Handoff:** the grid feeds pm-skills' `discover-stakeholder-summary`, and its tensions become constraints in `deliver-acceptance-criteria`.
- **Next in thread:** WB-2.

### WB-2 - `workbench-issue-tree-adoption.md`
- **Frontmatter:** title "Workbench structures the adoption question"; description "A MECE issue tree breaking 'will enterprises adopt Blueprints?' into what must be true."; `sidebar.label: "Workbench -> issue tree"`.
- **Prompt (enterprise):**
  ```
  /think-issue-tree "Question: will our enterprise customers adopt Blueprints with approval gates?
  Break it into a MECE tree of what must be true - admin demand for governance, fit with their
  compliance regimes, migration cost off their current process, and competitive parity - so we know
  what discovery to run."
  ```
- **Artifact:** fill `think-issue-tree` TEMPLATE - the MECE decomposition, the load-bearing branches flagged.
- **Handoff:** the tree structures pm-skills' `discover-competitive-analysis` (each branch becomes a discovery question).
- **Next in thread:** WB-3.

### WB-3 - `workbench-gate-model-ev.md`
- **Frontmatter:** title "Workbench prices the approval-gate model"; description "An expected-value decision tree on lightweight vs strict vs configurable approval gates under uncertain demand."; `sidebar.label: "Workbench -> EV tree"`.
- **Prompt (enterprise):**
  ```
  /think-expected-value-decision-tree "Decide the approval-gate model for Blueprints: (a) lightweight
  single-approver, (b) strict multi-stage, (c) configurable per-workspace. Enterprise demand for
  strictness is uncertain - some segments need SOC2-grade audit trails, some want speed. Model the
  chance nodes (high vs low governance demand) and roll back an expected value for each option."
  ```
- **Artifact:** fill `think-expected-value-decision-tree` TEMPLATE - decision and chance nodes, payoffs, probabilities that sum to one, the rolled-back EV, and the pick. (Flag any estimated inputs honestly.)
- **Handoff:** the chosen model and its rationale feed pm-skills' `develop-adr`.
- **Next in thread:** back to the Showcase index.

## The index edit - `site/src/content/docs/showcase/index.md`

Add a third browse section after "Browse by person", before "Browse by what you want to produce":

```
## Browse by company (cross-library: tfs decides, pm-skills delivers)

Three companies take one feature each from a raw idea to a launch decision, then hand off to the
delivery work in pm-skills. Follow a company down its thread to see the whole arc.

### Storevine - a native Campaigns feature (organized prompts)
- [Reframe the build request](./storevine-restate-campaigns/) -> pm-skills define-problem-statement
- [Build vs buy vs partner](./storevine-build-vs-buy/) -> pm-skills develop-adr
- [Red-team the launch](./storevine-red-team-launch/) -> the risks in pm-skills deliver-prd

### Brainshelf - a morning digest (casual prompts)
- [Draw the boundary](./brainshelf-boundary-resurface/) -> pm-skills define-problem-statement
- [Forecast adoption from the outside](./brainshelf-forecast-adoption/) -> pm-skills foundation-okr-writer
- [Premortem the launch](./brainshelf-premortem-digest/) -> pm-skills deliver-launch-checklist

### Workbench - approval gates (enterprise prompts)
- [Map stakeholders against values](./workbench-stakeholder-matrix/) -> pm-skills deliver-acceptance-criteria
- [Structure the adoption question](./workbench-issue-tree-adoption/) -> pm-skills discover-competitive-analysis
- [Price the gate model](./workbench-gate-model-ev/) -> pm-skills develop-adr
```

(The internal `./...` links are real Track B routes; the "-> pm-skills ..." names are plain text, not links.) Update the index `description` frontmatter to mention the cross-library track. Leave the Northwind anchor and the Track A sections untouched.

## Agentic execution - the authoring Workflow

Mirror the v0.8.0 Track A method (parallel subagents primed with a fixed context), batched to stay throttle-safe.

1. **Pre-flight (deterministic, no agents):** confirm the 9 skills are shipped (done: all but `stakeholder-lens-review`, already swapped to `ethical-matrix`). Read each target skill's `SKILL.md`, `references/TEMPLATE.md`, and `references/EXAMPLE.md` so the artifacts match the template. The three **thread fact-sheets are already drafted in this plan** (above) - no authoring step needed; they are the frozen shared context. (If a fact-sheet needs richer detail, expand it here ONCE, before fan-out, so all three of a company's pages see the same version.)
2. **Author pages - one subagent per page**, run as a `Workflow` over the 9 specs in serial groups of ~4 (the burst-throttle rule). Prime each subagent with, and only with:
   - the exemplar page `showcase/mira-launch-premortem.md` (the format),
   - this page's spec row + per-page section (above),
   - the protagonist's profile from `SCENARIO_PROFILES.md`,
   - **the company's thread fact-sheet (this plan)** - the authoritative numbers, names, timeline, and tensions to reuse,
   - the target skill's `SKILL.md` + `references/TEMPLATE.md` + `references/EXAMPLE.md` (so the artifact is correct and concrete),
   - `docs/internal/CONTENT-STYLE.md` (voice, the no-dash rule, the Showcase DoD, the link rules),
   - the **handoff rules** (prose not link; exact pm-skills artifact name).
   Each subagent writes exactly its own `site/src/content/docs/showcase/<file>.md` and returns nothing else.
3. **Assemble the index** centrally (one edit, above) - do not let the page subagents touch `index.md` (avoid a write race).
4. **Build + guard + fix loop** (below). Any page that fails the link guard or the DoD goes back to a single re-author subagent with the failure.

The subagents write prose only; no registry, manifest, or generator changes - so the conformance gate is untouched by the page content itself.

## Verification and definition of done

- **Per page (CONTENT-STYLE Showcase DoD):** the three-part unit + handoff + next; the artifact matches the skill's `TEMPLATE.md` and is concrete and self-consistent; the protagonist's established voice/style; scenario distinct from Northwind and from the Track A pages; frontmatter has `title`, `description`, `sidebar.label`; internal links real and trailing-slashed; **handoff is prose, not a link**; any cold-run skill ships its evidence caveat in the artifact.
- **Per thread (the carry-forward check):** the numbers, named people, timeline, and constraints across a company's three pages all match its thread fact-sheet - no contradictions (the same team size, the same cast, the same stage of the decision). Read the three pages of a thread together before sign-off; this is the check the fact-sheet exists to make pass.
- **Build + guards:** `npm --prefix site run build` (now ~216 pages: 207 + 9); `STRICT_ANCHORS=1 node scripts/check-rendered-links.mjs site/dist` = 0 broken; `node scripts/check-route-parity.mjs site/dist` PASS (new routes are additive; the guard only fails on *removed* baseline routes, so no `route-manifest.txt` edit is needed).
- **Gate:** `node scripts/check.mjs` 0/0 - unchanged, since no skills/registry/catalog changed. (Side effect to note, not required: a Showcase appearance counts for the example-coverage ratchet, so SB/BR/WB skills that were grandfathered may now have an example; the ratchet only *improves*.)
- `npm test` green.
- **No version bump / no marketplace re-pin** - site content only, the plugin (`skills/`) is unchanged.

## Scope and phasing

- **This plan = the core 9** (three full company threads). It is the complete, buildable Track B v1.
- **Optional later:** a fourth journey per company (the handoff map has more pairs - e.g. `think-after-action-review` -> `iterate-pivot-decision`, `think-theory-of-constraints` -> `iterate-retrospective`); a "browse by handoff" table in the index; deep-linking once pm-skills exposes stable public artifact URLs (today the handoff is deliberately prose).
- **Release:** ships as a docs/site update (a patch-style cut or folded into the next release PR), following `docs/internal/release-process.md`. No catalog count change.

## Sources

- `docs/internal/SCENARIO_PROFILES.md` (Track B cast).
- `_local/content-plan/2026-06-12_content-plans_aggregated.md` section 3.5 (the handoff map) and the five-things shortlist.
- `docs/internal/CONTENT-STYLE.md` (DoD) and `site/src/content/docs/showcase/mira-launch-premortem.md` (exemplar).
- `docs/internal/release-plans/plan_v0.8.0/README.md` (Track A as built; Track B listed as the deferred follow-on).
