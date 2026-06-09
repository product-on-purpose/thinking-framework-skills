# Release notes

Curated, user-facing highlights per release. For the full technical history, see [`CHANGELOG.md`](CHANGELOG.md). For everything in the library, browse the [live docs site](https://product-on-purpose.github.io/thinking-framework-skills/).

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
