# S2 Learning Layer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the hand-authored learning layer to the docs site (10 family intros, FAQ, philosophy set, guidance, 6 learning tracks) plus the one generator change that weaves family intros into the generated domain pages.

**Architecture:** Approach 1 (approved). The generator stays the single assembler: each family's intro is an authored source file (`site/intros/families/<family>.md`) that `gen-site.mjs` reads and weaves into the generated domain page, so the page is `intro (hand) + table (generated)`. Standalone pages (FAQ, about, learn) are ordinary committed Starlight pages under new `about/` and `learn/` dirs. The "no second store" invariant holds because the generator only ever reads the authored prose.

**Tech Stack:** Astro 6 + Starlight 0.39, `astro-mermaid`, Pagefind. Generator is dependency-free Node (UTF-8). Build: `cd site && npm run build`. Site validation is separate from plugin validation (`agent-skills-toolkit/scripts/evaluate.mjs`).

**Spec of record:** `docs/internal/specs/s2-learning-layer.md`. This plan implements it; section references below point into it.

---

## Conventions every task must follow

- **No em or en dashes** anywhere. A PreToolUse hook denies any Write/Edit containing those characters. Use " - " or restructure. (This applies to the verification snippets too: they build the dash-detecting regex from `String.fromCharCode(0x2013, 0x2014)`, so the plan file itself holds no literal glyphs.)
- **Voice and length:** match `site/src/content/docs/start/*.md` - active, honest, concrete, ~30-50 lines. Name the durable cognitive move first, the branded ritual as lineage.
- **File type:** pages using `<Card>`/`<CardGrid>` are `.mdx`; pure-prose pages are `.md`. Family intro **sources** are plain `.md` (they embed into a generated `.md` page; no JSX, HTML comments only, no H1 - the page title supplies the H1).
- **Internal link depth (load-bearing - wrong depth = broken link):**

  | Authoring location | URL shape | Path to a framework page |
  |---|---|---|
  | leaf page `about/x.md`, `learn/x.md` | `/about/x/` (depth 2) | `../../frameworks/think-y/` |
  | section index/hub `learn/index.mdx` | `/learn/` (depth 1) | `../frameworks/think-y/` |
  | family intro (embeds into `/families/<fam>/`, depth 2) | `/families/<fam>/` | `../../frameworks/think-y/` |

  Every internal link ends with a trailing slash (Starlight convention, matching existing pages).
- **Source-reference standard (spec section 11):** any empirical claim links to its grounding (the skill page, its dossier, or the bibliography) or is stated as practitioner framing. No laundered statistics.
- **Grounding for authored prose:** read the relevant skill's `skills/<name>/evidence/dossier.md` and `skills/<name>/SKILL.md` before writing about it. The family->skill mapping is spec section 5; do not invent claims.

---

## Task 1: Generator change - weave family intros and order domains

**Files:**
- Modify: `scripts/gen-site.mjs` (the family-page emit block, ~lines 182-207, and the families-index emit block, ~lines 255-276)
- Create: `site/intros/families/.gitkeep` (the new source dir; intro files arrive in Task 2)

- [ ] **Step 1: Replace the family-page emit block.** Find the block beginning `// --- emit: family (domain) pages` and ending at the close of its `for` loop, and replace it with:

```js
// --- emit: family (domain) pages -------------------------------------------
const INTROS = join(ROOT, 'site', 'intros', 'families');
function loadIntro(fam) {
  const p = join(INTROS, `${fam}.md`);
  if (!existsSync(p)) return null;
  const text = readFileSync(p, 'utf8');
  const fm = readFrontmatter(text);
  return {
    order: Number(fm.order) || 999,
    label: fm.label || null,
    tagline: fm.tagline || null,
    body: stripProvenance(bodyOf(text)).trim(),
  };
}
const byFamily = {};
for (const s of skills) (byFamily[s.family] ||= []).push(s);
const famEntries = Object.entries(byFamily).map(([fam, members]) => ({ fam, members, intro: loadIntro(fam) }));
famEntries.sort((a, b) => (a.intro?.order ?? 999) - (b.intro?.order ?? 999) || a.fam.localeCompare(b.fam));
for (const { fam, members, intro } of famEntries) {
  const label = intro?.label || FAMILY_LABEL(fam);
  const rows = members
    .map((s) => `| [${s.title}](../../frameworks/${s.name}/) | ${tierBadge(s.tier)} | ${firstSentence(s.description)} |`)
    .join('\n');
  const blurb = `The **${label}** domain. ${members.length} framework${members.length === 1 ? '' : 's'} in this family. Each is graded honestly; see [the evidence model](../../start/evidence-model/) for the tiers.`;
  const introBody = intro?.body ? `\n\n${intro.body}` : '';
  const page = `---
title: ${yaml(label)}
description: ${yaml(intro?.tagline || `The ${label} domain: the thinking frameworks in this family and when to reach for them.`)}
generated: true
family: ${yaml(fam)}
sidebar:
  order: ${intro?.order ?? 999}
---

<!-- GENERATED by scripts/gen-site.mjs - do not hand-edit. Intro woven from site/intros/families/${fam}.md -->

${blurb}${introBody}

| Framework | Evidence | What it does |
|---|---|---|
${rows}

> Not sure which of these fits your situation? The [Framework Advisor](../../frameworks/think-framework-advisor/) will diagnose the job and recommend a minimal sequence.
`;
  writeFileSync(join(OUT.families, `${fam}.md`), page, 'utf8');
}
```

- [ ] **Step 2: Update the families index to use the ordered entries.** Find `const famIndexRows = Object.entries(byFamily)` and replace that statement with:

```js
const famIndexRows = famEntries
  .map(({ fam, members, intro }) => `| [${intro?.label || FAMILY_LABEL(fam)}](./${fam}/) | ${members.length} | ${members.map((s) => s.title).join(', ')} |`)
  .join('\n');
```

  Then, in the `families/index.md` template literal immediately below it, add a `sidebar` block to the frontmatter so the index sits at the top of the Domains group. Change its frontmatter from:

```
generated: true
---
```
  to:
```
generated: true
sidebar:
  order: 0
---
```

- [ ] **Step 3: Create the source dir.** Create `site/intros/families/.gitkeep` (empty file) so the dir is tracked before the intro files land.

- [ ] **Step 4: Run the generator and verify graceful fallback (no intros yet).**

Run: `cd "E:/Projects/product-on-purpose/thinking-framework-skills" && node scripts/gen-site.mjs`
Expected: prints `Generated 31 framework pages, 10 domains, 4 recipes, ...`. Because no intro files exist yet, each family page shows the thin auto-blurb (fallback path), and `site/src/content/docs/families/problem-framing.md` now contains `sidebar:` with `order: 999`. Confirm the script does not throw.

- [ ] **Step 5: Commit.**

```bash
git add scripts/gen-site.mjs site/intros/families/.gitkeep
git commit -m "feat(site): weave family intros and order domains in gen-site"
```

---

## Task 2: Author the 10 family intros

**Files (all Create):** `site/intros/families/<family>.md` for each family in spec section 5.

Each file uses this exact frontmatter + body skeleton (no H1; H2 sections only). `order`, `label`, `tagline` come from the spec section 5 table.

```markdown
---
order: <N from spec 5>
label: <Display Name from spec 5>
tagline: <one sentence: what this domain is>
---

<1-2 sentences: the durable cognitive operation this family performs, and why it matters. Mechanism, not brand.>

## Reach for this family when

- <situation trigger>
- <situation trigger>
- <situation trigger>

## Which one to use

<The within-family chooser: how the members differ, drawn from each member's dossier overlap-boundary notes, so a reader picks the right one. Reference members by linked name, e.g. [Premortem](../../frameworks/think-premortem/). For the single-member family (perspective-and-multi-lens), this becomes "when to use it, and when a different lens fits better.">

## Composes with

<2-4 sentences linking the sibling families it feeds or is fed by. Link depth note below.>
```

  **Link-depth note for "Composes with":** a family page lives at `/families/<fam>/`. A sibling family page is `/families/<other>/`, reached as `../<other>/`. Framework pages are `../../frameworks/think-x/`. Use `../<other>/` for sibling families and `../../frameworks/think-x/` for frameworks.

- [ ] **Step 1: Author all 10 intros** per spec section 5, grounded in each member's `evidence/dossier.md`. Members per family (from spec 5):
  - `problem-framing` (order 1): Problem Restatement, Abstraction Laddering
  - `divergent-ideation` (order 2): SCAMPER, Question Burst, Assumption Reversal, Brainwriting, Far-Analogy Ideation
  - `perspective-and-multi-lens` (order 3): Parallel Perspectives Review
  - `systems-and-consequences` (order 4): Futures Wheel, Iceberg Model, Stocks and Flows Reasoning
  - `assumption-and-belief-challenge` (order 5): Ladder of Inference Check, Red Team Light, Authentic Dissent
  - `reasoning-clarity` (order 6): Evidence vs Inference Sort, Argument Mapping, Natural-Frequency Bayesian, Issue Tree
  - `decision-and-option-evaluation` (order 7): What Would Have to Be True, Decision Option Review, One-Way vs Two-Way Door, Linear-Model Aggregation
  - `risk-and-resilience` (order 8): Premortem, Reference Class Forecasting, WOOP, Backcasting
  - `synthesis` (order 9): Affinity Mapping, Pyramid Principle
  - `meta-thinking-and-reflection` (order 10): After Action Review, Decision Journal, Framework Advisor

- [ ] **Step 2: Regenerate and verify the weave + ordering.**

Run: `node scripts/gen-site.mjs`
Then verify: `site/src/content/docs/families/problem-framing.md` contains `sidebar:` / `order: 1` and the "Reach for this family when" heading from its intro, and the table still follows. Spot-check one more family file.

- [ ] **Step 3: Verify no em/en dashes in the new sources.**

Run: `node -e "const fs=require('fs');const re=new RegExp('['+String.fromCharCode(0x2013,0x2014)+']');let bad=0;for(const f of fs.readdirSync('site/intros/families')){if(!f.endsWith('.md'))continue;const t=fs.readFileSync('site/intros/families/'+f,'utf8');if(re.test(t)){console.log('DASH in',f);bad++;}}console.log(bad?('FAIL '+bad):'OK no dashes');"`
Expected: `OK no dashes`

- [ ] **Step 4: Commit.**

```bash
git add site/intros/families/*.md
git commit -m "feat(site): add 10 family domain intros"
```

---

## Task 3: Author FAQ, philosophy set, and guidance

**Files (all Create):**
- `site/src/content/docs/about/faq.md` (spec section 6)
- `site/src/content/docs/about/philosophy.md` (spec section 7)
- `site/src/content/docs/about/why-not.md` (spec section 7)
- `site/src/content/docs/about/contributing.md` (spec section 7)
- `site/src/content/docs/learn/composing.md` (spec section 8)

- [ ] **Step 1: Author `about/faq.md`.** Frontmatter `title: FAQ`. Each of the 11 questions (spec section 6) is an H2; answers are short and link out. Example skeleton (first two questions shown; author all 11):

```markdown
---
title: FAQ
description: The recurring questions about the library, answered honestly, with links to the detail.
---

## What is this, in one sentence?

A library of thinking frameworks rebuilt as skills an agent can run and a human can follow, each reduced to its working mechanism, graded honestly, and producing a concrete artifact. It differs from a list of mental models because [every skill carries graded evidence](../../start/evidence-model/) and produces a deliverable, not a definition.

## Do these frameworks actually work?

Mixed, and we say so. The [evidence model](../../start/evidence-model/) explains the tiers; a strong-evidence core anchors the library and the rest is labeled honestly around it.
```

- [ ] **Step 2: Author `about/philosophy.md`** - mechanism over ritual, the four commitments, honest grading as the product. Link to `../../start/evidence-model/`; do not duplicate it.

- [ ] **Step 3: Author `about/why-not.md`** - the exclusions (no Six Thinking Hats, SWOT, and similar), each with its reason (mechanism-over-ritual, the overlap ceiling, X-tier exclusions). This is the target of FAQ Q7.

- [ ] **Step 4: Author `about/contributing.md`** - the selection bar (four commitments + overlap ceiling) and how to propose a framework. Target of FAQ Q11.

- [ ] **Step 5: Author `learn/composing.md`** - how recipes work, the compressed-handoff composition pattern, picking depth on a page, a note on token budgets. Link to `../../recipes/` and `../../start/how-to-read-a-page/`; do not duplicate how-to-read-a-page.

- [ ] **Step 6: Verify no em/en dashes.**

Run: `node -e "const fs=require('fs');const re=new RegExp('['+String.fromCharCode(0x2013,0x2014)+']');const fg=['site/src/content/docs/about/faq.md','site/src/content/docs/about/philosophy.md','site/src/content/docs/about/why-not.md','site/src/content/docs/about/contributing.md','site/src/content/docs/learn/composing.md'];let bad=0;for(const f of fg){const t=fs.readFileSync(f,'utf8');if(re.test(t)){console.log('DASH in',f);bad++;}}console.log(bad?('FAIL '+bad):'OK no dashes');"`
Expected: `OK no dashes`

- [ ] **Step 7: Commit.**

```bash
git add site/src/content/docs/about site/src/content/docs/learn/composing.md
git commit -m "feat(site): add FAQ, philosophy set, and composing guidance"
```

---

## Task 4: Author the 6 learning tracks + hub

**Files (all Create):**
- `site/src/content/docs/learn/index.mdx` (the hub; uses `<CardGrid>` so `.mdx`)
- `site/src/content/docs/learn/think-better-in-30-minutes.md` (sidebar order 1)
- `site/src/content/docs/learn/decide-under-uncertainty.md` (order 2)
- `site/src/content/docs/learn/get-unstuck.md` (order 3)
- `site/src/content/docs/learn/audit-your-reasoning.md` (order 4)
- `site/src/content/docs/learn/evidence-behind-thinking-tools.md` (order 5)
- `site/src/content/docs/learn/build-with-the-library.md` (order 6)

  Note: `learn/composing.md` (Task 3) gets sidebar order 7 so it sits after the tracks.

- [ ] **Step 1: Author the hub `learn/index.mdx`.** Hub links use one `../` (depth-1 rule). Skeleton:

```mdx
---
title: Learning tracks
description: Curated paths through the library - by goal, by depth, and by role.
sidebar:
  order: 0
---

import { Card, CardGrid } from '@astrojs/starlight/components';

Six curated paths. Each is an ordered sequence of frameworks with the reasoning for the order.

<CardGrid>
  <Card title="Think better in 30 minutes" icon="rocket">
    A beginner sampler: one move each from framing, ideation, risk, and reflection. [Start](./think-better-in-30-minutes/)
  </Card>
  <Card title="Decide well under uncertainty" icon="approve-check">
    The decision and risk stack, end to end. [Start](./decide-under-uncertainty/)
  </Card>
  <Card title="Get unstuck" icon="puzzle">
    Reframe a stuck problem, then generate real options. [Start](./get-unstuck/)
  </Card>
  <Card title="Audit your reasoning" icon="magnifier">
    The epistemic stack: separate evidence from inference, map the argument, stress it. [Start](./audit-your-reasoning/)
  </Card>
  <Card title="The evidence behind thinking tools" icon="open-book">
    For the skeptic: trace any claim to its graded source. [Start](./evidence-behind-thinking-tools/)
  </Card>
  <Card title="Build with the library" icon="setting">
    For agent and plugin builders: install, invoke, compose. [Start](./build-with-the-library/)
  </Card>
</CardGrid>
```

- [ ] **Step 2: Author the 6 track pages** per spec section 9 sequences. Each leaf page uses the depth-2 rule (`../../frameworks/think-x/`). Skeleton:

```markdown
---
title: <Track name>
description: <one sentence>
sidebar:
  order: <N>
---

<who this is for; what you will be able to do by the end>

## The path

1. **[Framework Name](../../frameworks/think-x/)** - why this step, and what artifact it produces.
2. **[Framework Name](../../frameworks/think-y/)** - why it follows, and how the prior artifact feeds it.
3. ...

## What you will be able to do

<the concrete capability the sequence builds>
```

  Sequences (spec section 9, verbatim framework slugs):
  - **think-better-in-30-minutes:** think-problem-restatement, then think-question-burst, then think-premortem, then think-decision-journal
  - **decide-under-uncertainty:** think-what-would-have-to-be-true, then think-decision-option-review, then think-one-way-vs-two-way-door, then think-premortem, then think-reference-class-forecasting
  - **get-unstuck:** think-problem-restatement / think-abstraction-laddering, then think-question-burst, then think-assumption-reversal / think-scamper, then think-far-analogy-ideation
  - **audit-your-reasoning:** think-evidence-vs-inference-sort, then think-ladder-of-inference-check, then think-argument-mapping, then think-red-team-light / think-authentic-dissent, then think-natural-frequency-bayesian
  - **evidence-behind-thinking-tools:** start at `../../start/evidence-model/`, then `../../evidence/bibliography/`, then the S-tier core (think-brainwriting, think-far-analogy-ideation, think-stocks-and-flows-reasoning, think-authentic-dissent, think-argument-mapping, think-natural-frequency-bayesian, think-linear-model-aggregation, think-premortem, think-reference-class-forecasting, think-woop, think-after-action-review), then the honest debunks
  - **build-with-the-library:** `../../start/getting-started/`, then invoke one skill, then `../../recipes/`, then `../../frameworks/think-framework-advisor/`, then the sidecar schema and eval cases

- [ ] **Step 3: Verify no em/en dashes.**

Run: `node -e "const fs=require('fs');const re=new RegExp('['+String.fromCharCode(0x2013,0x2014)+']');let bad=0;for(const f of fs.readdirSync('site/src/content/docs/learn')){const t=fs.readFileSync('site/src/content/docs/learn/'+f,'utf8');if(re.test(t)){console.log('DASH in',f);bad++;}}console.log(bad?('FAIL '+bad):'OK no dashes');"`
Expected: `OK no dashes`

- [ ] **Step 4: Commit.**

```bash
git add site/src/content/docs/learn
git commit -m "feat(site): add 6 learning tracks and hub"
```

---

## Task 5: Sidebar - add Learn and About groups

**Files:**
- Modify: `site/astro.config.mjs` (the `sidebar` array)

- [ ] **Step 1: Insert the Learn group after "Start here" and the About group at the end.** The `sidebar` array becomes (Learn second, About last):

```js
      sidebar: [
        {
          label: 'Start here',
          items: [
            'start/getting-started',
            'start/evidence-model',
            'start/how-to-read-a-page',
          ],
        },
        {
          label: 'Learn',
          items: [{ autogenerate: { directory: 'learn' } }],
        },
        {
          label: 'Frameworks (by name)',
          items: [{ autogenerate: { directory: 'frameworks' } }],
        },
        {
          label: 'Domains',
          items: [{ autogenerate: { directory: 'families' } }],
        },
        {
          label: 'Recipes',
          items: [{ autogenerate: { directory: 'recipes' } }],
        },
        {
          label: 'Evidence',
          items: [{ autogenerate: { directory: 'evidence' } }],
        },
        {
          label: 'About',
          items: [{ autogenerate: { directory: 'about' } }],
        },
      ],
```

- [ ] **Step 2: Commit.**

```bash
git add site/astro.config.mjs
git commit -m "feat(site): add Learn and About sidebar groups"
```

---

## Task 6: Full regenerate, build, verify, and PR

**Files:** none new; verification + integration.

- [ ] **Step 1: Clean regenerate.**

Run: `node scripts/gen-site.mjs`
Expected: `Generated 31 framework pages, 10 domains, 4 recipes, + indexes & bibliography`.

- [ ] **Step 2: Build the site.**

Run: `cd site && npm install && npm run build`
Expected: build completes, Pagefind index builds, sitemap emits. Page count is ~67 (was 55; +12 standalone pages). Note the printed page count.

- [ ] **Step 3: Structural completeness check.**

Run from repo root:
```bash
node -e "
const fs=require('fs');
const must=[
 ...['problem-framing','divergent-ideation','perspective-and-multi-lens','systems-and-consequences','assumption-and-belief-challenge','reasoning-clarity','decision-and-option-evaluation','risk-and-resilience','synthesis','meta-thinking-and-reflection'].map(f=>'site/intros/families/'+f+'.md'),
 'site/src/content/docs/about/faq.md','site/src/content/docs/about/philosophy.md','site/src/content/docs/about/why-not.md','site/src/content/docs/about/contributing.md',
 'site/src/content/docs/learn/composing.md','site/src/content/docs/learn/index.mdx',
 ...['think-better-in-30-minutes','decide-under-uncertainty','get-unstuck','audit-your-reasoning','evidence-behind-thinking-tools','build-with-the-library'].map(t=>'site/src/content/docs/learn/'+t+'.md'),
];
let miss=0;for(const p of must){if(!fs.existsSync(p)){console.log('MISSING',p);miss++;}}
console.log(miss?('FAIL '+miss+' missing'):'OK all '+must.length+' present');
"
```
Expected: `OK all 22 present`.

- [ ] **Step 4: Link sanity on the flagship track (the S2 exit gate).** Open the built `site/dist/learn/think-better-in-30-minutes/index.html` (or grep its hrefs) and confirm each of the four framework links resolves to a real `frameworks/think-*/` page. Manually click-through in `npm run preview` if unsure. Expected: all four links resolve; a beginner can follow the track end to end.

- [ ] **Step 5: Confirm plugin validation is unaffected.**

Run: `node "E:/Projects/product-on-purpose/agent-skills-toolkit/scripts/evaluate.mjs" .`
Expected: `Tier: convergent` / `0 error(s), 0 warning(s)` (the site is outside the plugin surface).

- [ ] **Step 6: Adversarial verify pass.** Dispatch a review (subagent or workflow) against three lenses: (a) source-reference standard - any empirical claim links to grounding or is practitioner-framed, no laundered stats; (b) voice/length match to `start/*`; (c) link/claim accuracy - every framework named exists with the slug used, every tier stated matches `metadata.evidence-tier`. Fold in must-fixes; re-run Steps 1-2.

- [ ] **Step 7: Final commit and PR.**

```bash
git add -A
git commit -m "docs(site): S2 learning layer - intros, FAQ, philosophy, tracks"
git push -u origin docs/s2-learning-layer
```
  Then open the PR with `--body-file` (never a here-string - backticks mangle it). Poll `gh pr view <N> --json mergeable -q .mergeable` until `MERGEABLE` before merging.

---

## Self-Review (run before execution)

**Spec coverage:** spec section A (generator) -> Task 1; B (10 intros) -> Task 2; C (FAQ) -> Task 3 Step 1; D (philosophy set) -> Task 3 Steps 2-4; E (guidance) -> Task 3 Step 5; F (tracks + hub) -> Task 4; G (sidebar) -> Task 5; acceptance criteria 1-7 -> Task 6 Steps 1-5. No spec section is unimplemented.

**Placeholder scan:** the `<N>`, `<Display Name>`, `<situation trigger>` tokens are skeleton fields the executor fills from the cited spec section and dossiers - the content source is named in each case (spec section + the specific dossier files), so these are authoring targets, not unspecified gaps. All commands and code blocks are concrete.

**Type/name consistency:** `famEntries` is defined in Task 1 Step 1 and reused in Task 1 Step 2 (families index) - both in the same file, `famEntries` in scope for the later index block. `loadIntro`, `INTROS`, `byFamily` all defined before use. Framework slugs in Task 4 match the spec section 5 mapping (`think-` prefix, exact names). Sidebar `order` values: families 1-10 (Task 2), learn hub 0 / tracks 1-6 / composing 7 (Tasks 3-4), families index 0 (Task 1).

**Note on granularity:** content tasks (2, 3, 4) are larger than the 2-5 minute ideal because prose authoring grounded in dossiers is not mechanically decomposable; each is bounded by a concrete file list, a fixed skeleton, and a deterministic verification (dash check + build + structural check), which is the testable unit for content.
