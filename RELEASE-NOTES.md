# Release notes

Curated, user-facing highlights per release. For the full technical history, see [`CHANGELOG.md`](CHANGELOG.md). For everything in the library, browse the [live docs site](https://thinking-framework-skills.productonpurpose.com/).

## v0.15.0

**We re-measured everything, and one number went down.** No new frameworks; the catalog stays 56 evidence-graded core skills plus 7 contested lenses. What changed is that the library stopped taking its own word for things. Four measurement runs closed the last gaps in what it can see about itself - and they turned up four defects that no previous number had caught, including a false claim on the trust page and a skill telling you to hand-roll a method this library ships. All of it is published, including the figure that got worse.

### For everyone

- **The trust page answers a third question: does the front door even get found?** Routing and artifact quality both assume you have already arrived. Neither could tell you whether an agent with 77 tools installed reaches for this library at all - and a catalog that routes perfectly is worthless if nothing ever opens it. That is now measured: **16 of 17** for the four entry-point tools, with **zero false fires** among them. It is reported [as its own question](https://thinking-framework-skills.productonpurpose.com/start/does-this-work/), never blended into the other two, because it is a different corpus asking a different thing.
- **The artifact-quality figure went from 428/429 to 424 of 429, and the page explains why rather than smoothing it.** The grader was rewritten to stop believing artifacts. It now opens the file behind any claim an artifact makes about another skill and fails the check if the claim is false. Two things moved at once - the skills and the grader - so the drop cannot be pinned on either, and the page says so plainly instead of drawing a trend line between two numbers that different instruments produced.
- **One of those new failures was real, and user-facing.** Asked for QCA on a single case, the library told you that process tracing "is a method, not a shipped skill here; run it by hand" - while shipping `think-process-tracing`. Wrong for three months. Fixed.
- **A skill had been publishing the wrong evidence tier since June.** `think-red-team-light` showed tier **P** on its page while its own dossier, metadata and registry entry all said **M**, recording the upgrade. The prose was simply missed in that re-grade. Corrected, with the honest caveat it always carried intact.
- **The page no longer claims 100% of anything it did not fully pass.** It said "100% of checks passed" above the words "428 of 429". The cause was not a typo but the score generator, which rounded anything at or above 99.5% up to a flat `100%`. It now reserves `100%` for an exact pass and rounds *down* everywhere else, because on a pass rate only one of those directions is a lie.

### For builders and contributors

- **One command sets up a fresh clone.** `npm run setup` reads the pinned validator commit out of CI, puts the toolkit on disk at exactly that commit, installs it, and tells you to run `npm run check`. It refuses rather than clobbers if something unexpected is already at that path, and it never re-types the pin - so it cannot drift from what CI grades against.
- **Issue and pull-request templates.** The framework proposal form asks for the things the selection bar actually turns on: the single durable move, the closest shipped skill and why this is not a fold into it, a conservative tier with sources named by author and year, and when *not* to use it.
- **The gate stopped copying its own numbers.** The `G9` source-docblock debt is paid off in full - all 39 files - taking the run from 129 warnings to **90**, with the tier unchanged at Gold and errors at zero. More usefully, the three figures published *beside* that count are now asserted too, in both directions: a requirement family appearing is drift, and a family *disappearing* is drift as well, which is the direction that actually happened here.
- **The last unmeasured tool is measured.** `think-research-framework` dispatches to a subagent and its own instructions forbid running research inline, so the generic harness could only ever have graded it breaking its own procedure. It got a purpose-built harness that runs the real subagent with live web search, and one of its six checks is decided by running a schema validator rather than by asking a model. All four entry-point tools now read `maturity: measured`.
- **The catalog's enrichment fields were put on trial, and the verdict is narrower than expected.** A controlled A/B - one variable, same cases, same day - found they make **no difference at all** to whether the right skill fires (376/376 either way), and a real difference to routing *away* from the wrong one. They also make the router slightly more eager to name something when the honest answer is "no tool". Useful, and not in the way anyone assumed.

## v0.14.0

**Nine recipes you can actually run.** The library has advertised nine skill chains since v0.11.0 - stress-test a decision, expand your options, audit a piece of reasoning - and until now "running" one meant opening a markdown file and executing its skills by hand, two to four of them depending on the recipe, carrying the artifact between them yourself. Each is now a single command. No new frameworks; the catalog stays 56 evidence-graded core skills plus 7 contested lenses.

### For everyone

- **`/think-stress-test-decision`, and eight more.** Every [recipe](https://thinking-framework-skills.productonpurpose.com/recipes/) now runs as one invocation, executing the whole chain with its documented handoff so the compressed artifact moves between steps for you instead of via your clipboard.
- **A troubleshooting page, in the words you would actually see.** The plugin installed but the command does not appear; the skill fired but gave you prose instead of an artifact; the recommendation felt wrong. There is now [a page for that](https://thinking-framework-skills.productonpurpose.com/start/troubleshooting/), and every entry opens with the **verbatim output**, harvested from the tools rather than paraphrased, so you can search for the string in front of you.
- **Both quickstarts show what success looks like.** A real (truncated) risk register from the premortem, so you can tell a good run from a vague one - which is also what made "I got an essay" hard to self-diagnose.
- **The seven contested lenses are reachable by name.** They all existed and none was linked from the samples index, so browsing for SWOT dead-ended. A library that only demonstrates its strongest methods is showing a highlight reel.

### For builders and contributors

- **The recipe commands are generated, never authored.** A new conformance-gate layer regenerates all nine and fails on any byte of drift, so a hand-edited command cannot claim to run a chain it no longer matches. The recipe body is carried verbatim, because the numbered handoff lines *are* the authored value. The gate goes 14 -> 15 layers.
- **The library's description of itself is true now.** All 67 skill sidecars described a shipped, active skill as an unshipped draft, and described the 63 that carry two eval stamps as unmeasured. (The other four are the meta-skills, which sit outside the behavioral eval run by design and say so.) Both copies of the applicator engine also told the model the catalog held 34 skills when it holds 63. Both are now gate-asserted rather than hand-maintained, so neither can drift back.
- **Five reproduced contested-guard bypasses are closed.** The caveat-first contract is this library's flagship claim; an adversarial pass found five structural ways around the code enforcing it. All five are closed or named as documented residuals, verified red before the fix, with **all seven shipped lenses passing unchanged** - the criterion that guards against over-tightening.
- **The guards now guard themselves.** The three gate layers with no tests of their own gained 38, and every generator reports a tally instead of a bare "OK", so a run that processed zero files stops reading as success. The suite goes 137 to 235.
- **Security and supply chain.** The Framework Advisor no longer tells the model that pasted text is authoritative - it is evidence to analyse, not instructions to follow. On dependencies, the honest position rather than the flattering one: `site/` vulnerabilities were taken from 10 to 6 without a breaking change in August, and **as of this release `npm audit` reports 10 again (1 critical, 4 high)** - new advisories against the same pinned versions, including a critical Astro XSS. Nothing in `site/` changed; the advisories did. These are build-time dependencies of the docs site, so the exposure is a developer machine and CI rather than anyone who installs the plugin, and the fix gets its own PR rather than riding along inside a release cut.
- **The conformance claim names its Standard version**, and the numbers behind it are now stated once with their provenance rather than copied onto six pages, where they twice went stale. The pin and the declared Standard are documented as two separate dials, because conflating them is the easy mistake.

## v0.13.0

**The eval harness now guarantees its own honesty record.** No new skills - this release hardens the machinery behind the "Does this actually work?" trust numbers, so the published scorecards cannot silently drift. The catalog stays 56 evidence-graded core skills plus 7 contested lenses.

### For builders and contributors

- **Committing an eval run is now one step.** `scripts/eval/finalize.mjs` writes both the human-readable (`.md`) and machine-readable (`.json`) scorecard into `docs/internal/eval-results/` and stamps each skill's eval status, so the machine-readable sidecar that backs the trust page can no longer be dropped by hand.
- **A new conformance-gate layer enforces it** (the gate goes from 13 to 14 layers): every behavioral-eval scorecard must be a paired `.md` + `.json` with a valid contract. This closes the one gap where a contested-cohort scorecard had shipped `.md`-only.
- **The CI-guard hardening from v0.12.0 lands too**: a shared directory-walk helper behind the source-scanning guards, the canonical-link guard extended to `.astro` components and intro sources, and edge-case robustness in the mermaid and repo-link guards.

## v0.12.0

**A changelog on the site, clearer docs, and a gate that keeps them that way.** No new skills - this release makes the library easier to read and keeps it honest as it grows. The catalog stays 56 evidence-graded core skills plus 7 contested lenses.

### For everyone

- **A changelog on the site.** A new [What's new](https://thinking-framework-skills.productonpurpose.com/changelog/whats-new/) page gives the curated highlights for each release, opening with a visual release timeline, and a full [Changelog](https://thinking-framework-skills.productonpurpose.com/changelog/full/) page carries the complete history. Both are generated from the source files, so they never drift.
- **More accurate docs.** The "Does this actually work?" trust page now reflects the full 63-skill catalog (the 56 evidence-graded core skills plus the 7 contested lenses, reported as separate cohorts). A new FAQ explains why famous-but-weak methods like SWOT and Five Whys now ship as contested lenses, and the evidence model now defines the compound grades (like M/P) you see across the catalog.
- **Eight diagrams that make the dense parts visual.** The blind eval harness (how "nothing grades itself"), the recipe handoff, the decision stack, the conformance gate, and the evidence-tier landscape are now diagrams, not just prose.

### For builders and contributors

- **Four new CI guards keep the docs correct as the library grows** (the conformance gate goes from 9 to 13 layers): broken or unrenderable mermaid diagrams, internal links that lean on a compatibility redirect, broken relative links in the repo docs, and release-version drift are now all caught automatically.
- **The machine-readable discovery surfaces are linked for builders**: `llms.txt`, `llms-full.txt`, `catalog.json`, and `evaluated.json`.

## v0.11.0

**Contested lenses: we now run the famous-but-weak frameworks, and tell you the truth about them.** The library is built on honest evidence grading, so for years it refused to ship famous methods the research does not support (SWOT, Five Whys, ACH, and friends) and instead published a why-not dossier. People kept asking for them by name. v0.11.0 adds a better answer than a flat "no": **56 evidence-graded core skills, plus 7 contested lenses we grade honestly and hand you caveat-first.**

### For everyone

- **Seven famous frameworks, run honestly.** SWOT, Five Whys, Eisenhower / MoSCoW / Pareto, a descriptively-named Cynefin sort, Reflective Equilibrium, Analysis of Competing Hypotheses, and QCA now run when you ask for them by name. Each one **leads with its weak evidence**, then either produces the artifact with the discipline it usually lacks (a SWOT that prunes, tags, and matches into options; a Five Whys that stops honestly when the problem is multi-cause) or, for the methods testing found actively harmful (ACH, QCA), warns you and routes you to a better-grounded move instead of reproducing the discredited artifact.
- **They never get in the way.** A contested lens is **explicit-request-only**: the Framework Advisor will never reach for one on a generic prompt. A trigger eval confirms it - 0 false-fires, every generic prompt routed to the stronger core skill.
- **Honest framing, not catalog padding.** The headline is still the 56 evidence-graded core skills. The 7 contested lenses are counted and reported as their own cohort, clearly marked, so "honest grading" stays honest.

### For contributors

- A new conformance-gate layer (`check-contested.mjs`, the 9th) makes "caveat-first" a **checked contract**, not an authoring style: the deficiency must lead the skill and every artifact, a branded lens must carry its trademark attribution, and tier X may now ship *only* as a contested lens.
- `Cynefin` ships under a descriptive name (`think-complexity-domain-sort`) to keep the trademark out of the invocation; the old `/library/cynefin/` URL redirects.

## v0.10.0

**Find it by example, and let agents find it at all.** A worked example for every framework, a cross-library Showcase that hands off to pm-skills, the agent-discovery index switched on, and the behavioral-eval numbers refreshed across the full 56-skill catalog. No new frameworks; the catalog stays 56.

### For everyone

- **A quick worked example for every framework.** The new [Samples](https://thinking-framework-skills.productonpurpose.com/samples/) shelf gives each of the 56 skills one compact, end-to-end example - a real situation, the prompt, and the full artifact - so you can scan the whole library by example. Example coverage is now 56 of 56.
- **A cross-library Showcase: tfs decides, pm-skills delivers.** Three companies (Storevine, Brainshelf, Workbench) each take one feature from a raw decision to a launch call, then hand the reasoning artifact off to the matching pm-skills delivery artifact - so you can follow one company across both libraries. See the "Browse by company" section of the [Showcase](https://thinking-framework-skills.productonpurpose.com/showcase/).
- **The trust page is current.** Both behavioral evals were re-run across all 56 skills (routing: 99% top-1, 0 false-fires across 673 cases; artifact quality: 99% of 389 checks, 53 of 56 skills perfect), and the [Does this actually work?](https://thinking-framework-skills.productonpurpose.com/start/does-this-work/) page now reflects the full catalog, not the earlier 47-skill run.

### For builders

- **The agent-discovery index is switched on.** v0.9.0 published a machine-readable catalog; this release makes it discoverable - `llms.txt` is now linked from `robots.txt` and every page, and a new `llms-full.txt` inlines the whole catalog (every component plus the 79 not-shipped methods) so an agent can ingest it in one fetch.
- **`red-team-light` re-graded P -> M (transferred).** Its core move - construct the strongest contrary case - is the well-studied "consider the opposite" debiasing technique (Lord, Lepper & Preston 1984; Mussweiler et al. 2000; Hirt & Markman 1995), so its grade rises a notch, with the honest caveats kept: group-dissent research does not transfer, and the evidence is human-subject, not AI-validated.

## v0.9.0

**Discoverable by agents: the library now publishes a machine-readable index other AI agents can read to find and route to the right thinking skill.**

This release makes the library legible to other software, not just people. An agent (or a crawler) can fetch a single index and learn every skill, what each produces, when to use it, and how to chain it - no scraping, no guessing. It also folds in the measurement loop and the example-coverage gate that landed after v0.8.0. No new frameworks; the catalog stays at 56.

### For everyone

- **An `llms.txt` index at the site root.** Following the [llmstxt.org](https://llmstxt.org) convention, the site now serves a clean, linked index of every skill, tool, and recipe, grouped by cognitive job, plus the key getting-started pages. Point an AI assistant at it and it can discover and route to the library on its own.
- **A "Was this page helpful?" prompt on every docs page.** A lightweight feedback widget (no tracking by default, no backend) that offers a one-click signal or a pre-filled GitHub issue, so the docs improve from real use.

### For builders

- **Two machine-readable catalogs.** `catalog.json` lists the 69 invokable components (56 skills + 4 tools + 9 recipes) with the fields an agent needs to route and chain - mechanism, when-to-use, the artifact each produces, evidence tier, recipe membership, likely companions, and a live URL. `evaluated.json` projects all 135 graded methods, so the 79 the library evaluated and chose not to ship are available in context, each linking to its dossier. Both are generated from the existing sources of truth and validated against the live route set, so every link resolves.
- **Drift-gated like everything else.** A new 8th conformance-gate layer regenerates the three artifacts and reds CI if the committed copies are stale, so the catalog can never silently fall behind the registry. The manifest diff for this release is version-only.
- **Example-coverage ratchet.** Every shipped skill must now have a worked example (a Showcase appearance or a sample) or be explicitly grandfathered; a new skill with no example reds the build.

## v0.8.0

**Learn by example: watch the frameworks work on real decisions, and see the numbers behind the claims.**

This release adds the part a newcomer most wants - proof. You can now watch real decisions worked end to end, see real prompts in the styles people actually type, and read the measured evidence that the library routes and produces what it promises. No new frameworks; the catalog stays at 56. This is a documentation and trust release.

### For everyone

- **A Showcase of real decisions, prompt to finished artifact.** Three people work hard problems start to finish: a founder deciding fast, an engineer making an architectural call, and a policy analyst deliberating on paper. Each page shows the exact prompt typed and the full artifact it produced - a ranked risk register, a weighted option matrix, an argument map, a stakeholder trade-off grid - so you can judge the quality before you run anything. Sixteen worked journeys, including full recipe chains and runs done entirely by hand.
- **"Does this actually work?" - we measured it.** A new page publishes the behavioral-eval results: the catalog routes the right framework for a situation 99% of the time with zero false-fires across 561 cases, and the artifacts meet their own quality bar on 99% of 315 checks. It also says plainly what the numbers do not prove. Most thinking-tool collections ask for faith; this one shows the scorecard.
- **A prompt gallery, so your messy prompt is fine.** Real prompts in three styles: a one-line casual ask, a structured block, or just describing the mess to the advisor. The lesson - a sparse prompt produces the same complete artifact as a polished one, because the framework does the structuring.
- **An operating guide.** "Using the frameworks" takes you from running one framework to chaining several like a power user.

### For builders

- **The example surfaces are hand-authored pages** wired into the existing Astro Starlight site; nothing about the install surface, the skills, or the manifests changed (the manifest diff is version-only).
- **The behavioral-eval harness is reproducible and runs without an API key** ([`scripts/eval/`](https://github.com/product-on-purpose/thinking-framework-skills/tree/main/scripts/eval)); every number on the new trust page traces to a committed JSON you can audit.
- **Catalog-count drift is now a hard CI failure.** The count gate (`scripts/check-counts.mjs`) was extended to the repo-facing docs and the README prose counts, closing the gap that let a stale "31 frameworks" linger in the getting-started doc for six releases.

## v0.7.1

**The Framework Library is now complete: every method we evaluated and chose not to ship has an honest, browsable page.**

- **+30 documented "no"s (the library now holds 75 dossiers).** The famous methods the library considered and did not ship as standalone skills - because they fold into something already shipped, carry a trademark or weak-evidence caveat, or do not survive on the merits - each now has a sourced page explaining the call. Among them: **SWOT**, **Five Whys**, **Cynefin**, **Wardley Mapping**, **Jobs-to-be-Done**, **Porter's Five Forces**, **Blue Ocean**, **OODA**, **MECE**, **Multi-Criteria Decision Analysis**, **Key Assumptions Check**, **Double-Crux**, **Devil's Advocacy**, **How Might We**, and more. "We considered it and said no, and here is exactly why" is now the rule, not the exception - documentation only, with no method's verdict changed.

## v0.7.0

**The library now measures its own behavior, and ships its largest catalog jump yet (now 56) with a new ethics family.**

- **+9 frameworks (now 56), including a new family: Ethics & Values Deliberation.** Three new methods take a moral trade-off as the input and reason to a defensible position across everyone affected: **Veil-of-Ignorance Reasoning** (decide as if you had an equal chance of being any affected party), the **Ethical Matrix** (grid the stakeholders against wellbeing, autonomy, and fairness), and **Speculative Harms & Anti-Goals** (assume your success and name who it harms). The other six: **Dialectical Bootstrapping** (improve an estimate by disagreeing with yourself and averaging), **Interval Calibration Check** (test whether your confidence intervals are really as wide as your certainty), **Consider the Unknowns** (weigh what you cannot see before you commit), **Process Tracing** (test rival causes of a single case by the diagnostic weight of each clue), **Argumentation Schemes** (name the argument pattern, then ask its standard critical questions), and **Interest-Based Negotiation** (the library's first method for a decision with a counterparty).
- **The library now measures its own behavior.** Two evals run across every skill: a **trigger eval** (does the right skill fire for a situation - 561 cases, zero false-fires, 99% top-1) and an **output eval** (does a skill, once run, produce an artifact that meets its own bar - 99% of checks passed). They are model-executed and reproducible. The four skills the output eval flagged were tightened so the evidence caveat now ships with the artifact by construction, and re-scored 100%.
- **Twenty new documented "no"s, including the famous personality tests.** The candidates that did not clear the bar are each published in the [Framework Library](https://product-on-purpose.github.io/thinking-framework-skills/library/) with their reasoning - among them honest, sourced "why we do not ship this" pages for **MBTI**, **CliftonStrengths**, **DISC**, the **Enneagram**, and **learning styles**, graded on what the psychometric evidence actually shows.
- **Honesty held at scale.** Of 30 candidates researched and adversarially re-checked, 9 became skills (a 70% fold/recipe/reject rate); independent research and verification agreed on all 30, with three grades knocked down to stop an adjacent claim's evidence from inflating the method's own. One new skill ships at an openly anecdotal grade, and says so on its face.

## v0.6.0

**Catalog expansion, phase 2: seven new methods (now 47), and the rest of the candidate field honestly resolved.**

- **+7 frameworks (now 47).** Four practitioner-grade: **Role-Storming** (generate ideas as someone else, to get past your own self-censorship), **Morphological Analysis** (lay a solution's choices out as a grid and recombine them), **Pairwise Comparison** (rank options head-to-head when you cannot score them on a scale), and **Minimax Regret** (choose under deep uncertainty by minimizing your worst-case regret). Three honest C-tier methods (conceptually strong, not yet study-backed): **Three Horizons**, **Causal Layered Analysis**, and **Contradiction / Tension Mapping**.
- **Two recipes.** **Kepner-Tregoe** and **PDCA / A3** ship as workflow chains of existing skills rather than as new methods, because that is honestly what they are.
- **Seventeen documented "no"s.** The candidates that did not clear the bar - folded into a method that already covers them, or rejected on the merits - are each published in the [Framework Library](https://product-on-purpose.github.io/thinking-framework-skills/library/) with their reasoning. The Library now holds 25 such dossiers, so "we considered it and said no" stays browsable.
- **Honesty held at scale.** Of 26 candidates researched and adversarially re-checked, only 7 became skills (a 73% fold/reject rate). Breadth never trumped the grade - the rejections are as much the product as the additions.

## v0.5.0

**Catalog expansion: six new thinking methods, a new family, and four documented "no"s you can actually read.**

- **+6 frameworks (now 40).** Three are problem-framing methods the research engine discovered, graded, and the library built end to end: **Contradiction Resolution** (dissolve a trade-off instead of splitting the difference), **Boundary Critique** (audit who a frame includes and excludes), and **Frame Creation** (reframe the problem by analogy). Three come from the latest shortlist: **Theory of Constraints** (find and exploit the single binding bottleneck), the **Expected-Value Decision Tree** (price the uncertainty and see what would flip the call), and **Scenario Planning** (stress-test a strategy against a set of divergent futures).
- **A new family: Strategy & Opportunity.** Scenario Planning opens the library's 11th cognitive-operation family.
- **Four honest "no"s, each with a full dossier.** Inversion and FMEA-lite fold into Premortem; a generic cognitive-bias checklist and the PR-FAQ decision memo are rejected on the merits. Every one is published in the [Framework Library](https://product-on-purpose.github.io/thinking-framework-skills/library/) with its sources and the reasoning, so "we considered it and said no" is browsable, not buried.
- **Honest grading, visibly enforced.** Two methods that arrived looking like "moderate evidence" were downgraded to "practitioner" once the research was read closely - the strong studies measured an adjacent claim, not the move itself. The library would rather under-claim than launder a grade.

## v0.4.0

**The Framework Library platform: a trustworthy catalog you can browse, plus tools that put it to work.**

- **A published Framework Library.** Every thinking method the library has evaluated now lives in one honest catalog, with per-method learning dossiers - what the evidence does and does not show, with graded sources - browsable by family on the site.
- **Tools, kept honestly separate from the methods.** The Framework Advisor, Top-3, and Random-Frameworks now live in their own [Tools](https://product-on-purpose.github.io/thinking-framework-skills/tools/) section: they help you choose or apply the frameworks rather than masquerading as graded methods, so they no longer carry an evidence badge a router has no business showing.
- **A research engine that grades honestly.** A new `think-research-framework` tool researches a candidate method, grades its evidence conservatively on a seven-tier model, checks it for overlap with what already ships, and proposes a catalog entry for review - it never auto-adds. It is how the catalog grows without diluting the honesty bar.
- **A more trustworthy advisor.** The advisor's gate for thin requests was rewritten and re-measured so it stops over-asking and never names an answer and then asks a clarifying question anyway. Its routing sub-grade stays an honest C (the C in its `M/C` grade).
- **Clearer evidence badges.** A method's library badge now shows its full grade (for example `S/M`) to match its dossier, instead of a single letter that could read as overstating the evidence.
- **Refreshed documentation** for readers and contributors alike: a new architecture overview, a repeatable release process, and a plain-language explainer of frameworks vs tools vs recipes.

## v0.3.0

**The advisor gets more trustworthy, plus a new reflection skill and recipe.**

- **The Framework Advisor now knows what NOT to recommend.** Each framework in the advisor's set now carries its own anti-triggers, when-not-to-use notes, and nearest-neighbor overlaps, so the advisor's "what to avoid, and use instead" guidance rests on real per-skill signal instead of improvisation. It is derived automatically from each skill's own pages, so it stays in sync.
- **The behavioral test cases are now enforced.** Every skill ships trigger / anti-trigger / output-check cases; a new validator runs in CI to guarantee each is well-formed and never names a framework that does not exist. The conformance gate also now runs cleanly from a git worktree.
- **+1 framework (now 35):** [Belief-Update Routine](https://product-on-purpose.github.io/thinking-framework-skills/frameworks/think-belief-update-routine/) - re-score your standing beliefs against new evidence on a cadence, with an explicit update size and a next-review trigger. Graded P, with its thin evidence stated plainly.
- **+1 recipe (now 6):** an idea-quality audit that scores a batch of ideas, then pressure-tests the strongest few.

## v0.2.1

**Docs-site link and route integrity, and the family site-standard convergence.** A maintenance release: no catalog changes, but the live site is now guarded and a batch of pre-existing broken links is fixed.

- **43 broken links fixed.** A new build-aware link checker found 43 internal links that were silently 404ing on the live site (most from a single generator bug on the bibliography page) - all fixed, and now guarded so they cannot come back.
- **The docs site is link- and route-guarded in CI.** Every pull request and every deploy runs a rendered-link check (including `#anchors`) and a route-parity check against a committed route manifest, so a browser-broken internal link or a silently dropped page fails the build (family Astro site standard, clause 14.11).
- **"Edit" links on generated pages resolve.** Each generated page now points its Edit link at its true source (a framework page to its skill's `SKILL.md`) instead of a gitignored build path that 404s.
- **Site-standard convergence.** The docs site CI/deploy aligned to the Product on Purpose family Astro standard: the GitHub Pages artifact flow, `.nvmrc`-pinned Node across every job, a single-sourced base path, and no per-file config sidecars.

## v0.2.0

**Three new skills and a recipe, a more visual docs site, and a self-validating repo.**

- **+3 frameworks (now 34):** [Concept Mapping](https://product-on-purpose.github.io/thinking-framework-skills/frameworks/think-concept-mapping/), [Causal Loop Diagrams](https://product-on-purpose.github.io/thinking-framework-skills/frameworks/think-causal-loop-diagrams/), and [Fermi Estimation](https://product-on-purpose.github.io/thinking-framework-skills/frameworks/think-fermi-estimation/) - each graded M/P with an honest transferred-evidence flag, each clear about which existing skill to use instead. They were vetted against the catalog first; three other candidates were rejected for overlapping shipped skills.
- **+1 recipe (now 5):** a first-principles recipe that chains decomposition and assumption-stripping (the honest home for a move with no separable mechanism of its own).
- **A more visual docs site:** the README and the all-frameworks map are now legible (no more squished horizontal diagrams); six hard-to-grasp methods gained beginner concept diagrams (a frequency tree for Bayesian reasoning, inside/outside view for reference-class forecasting, example feedback loops, and more); getting-started and how-to-read-a-page are now interactive.
- **A self-validating repo:** every pull request now runs the agent-skills-toolkit conformance gate in CI, and the repo ships a generated `INDEX.md` and these release notes (the Gold-tier hardening).

## v0.1.0

**First public release.** An evidence-graded library of 31 agent-executable thinking-method skills plus 4 composable recipes.

- Every skill is reduced to its working mechanism, graded honestly on how strong its evidence is (S/M/P/V/A/C/X), and produces a concrete artifact rather than prose.
- The [Framework Advisor](https://product-on-purpose.github.io/thinking-framework-skills/frameworks/think-framework-advisor/) is the front door: describe a situation, get a prioritized Thinking Plan.
- A full Astro Starlight docs site with per-framework pages, learning tracks, five exploration lenses, an interactive chooser, and a graded bibliography.
- Installable via the Product on Purpose marketplace: `/plugin install thinking-framework-skills@product-on-purpose`. Apache-2.0.
