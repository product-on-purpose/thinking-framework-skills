# Eval-harness orchestration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Collapse the behavioral eval harness from a 7-command manual flow into a single deterministic `finalize` step that writes BOTH scorecard artifacts (`.md` + `.json`) into the canonical directory, add a hard gate layer that makes a missing/malformed scorecard impossible (13 -> 14 layers), and retro-fix the one missing contested-output `.json` through the harness.

**Architecture:** The model-executed middle (routing, produce/judge via the Workflow tool) is left untouched - a `node` script cannot invoke the Workflow tool, so full push-button is impossible by design. Only the deterministic spine changes: extract the scorers into pure functions, add `finalize` to emit artifacts atomically into `docs/internal/eval-results/`, and add a `check.mjs` layer that asserts every scorecard is a paired `.md`+`.json` with a valid contract.

**Tech Stack:** Node.js ESM (`.mjs`), zero runtime deps, `node --test` (the repo's existing test runner via `npm test`), the conformance gate `scripts/check.mjs` (a flat `spawnSync` layer-runner).

**Source spec:** `docs/internal/specs/2026-06-23-eval-harness-orchestration.md` (decisions resolved 2026-06-23; adversarially reviewed 2026-06-24, review at `_agent-context/2026-06-24-eval-orchestration-spec-codex-review.md`).

## Global Constraints

- **No em-dashes (U+2014) or en-dashes (U+2013) anywhere** - chat, code, comments, commit messages, docs. Use " - " or restructure. (Hook-enforced on Edit/Write.)
- **Reference IDs carry a human-readable handle** on first use (e.g. "#95 (the missing contested-output `.json` sidecar)").
- **Windows + cp1252 host:** every new file write uses explicit `'utf8'` and LF (`\n`) newlines. Node `writeFileSync` does NOT translate `\n` to `\r\n`, so building strings with `\n` and writing them is correct; do not introduce `os.EOL`.
- **Branch before committing** (never commit on `main`). Commit/push only the work each task describes; add the standard commit trailers per CLAUDE.md at commit time.
- **The eval is non-deterministic in producing results, but SCORING is a pure function of its input** - that is the whole basis for the golden-fixture tests below.
- **PR shape (from the spec's Sequencing section):** PR A = Tasks 1-4 (WS1: refactor + finalize); PR B = Tasks 5-7 (WS3 + WS2 + ripple, co-sequenced because the guard reds CI on the pre-existing #95 gap unless the `.json` lands with it); PR C = Task 8 (optional WS4). All land under `CHANGELOG.md [Unreleased]`; no version bump (it rides the next cut).

---

## File Structure

**New files:**
- `scripts/eval/score-lib.mjs` - pure `scoreTrigger(cases, routedRaw) -> {md, json}` and `scoreOutput(rawResults) -> {md, json}`. The scoring logic, moved verbatim out of the two CLIs.
- `scripts/eval/finalize.mjs` - the one-command finalize: pure `buildArtifacts(opts) -> [{path, content}]` + a thin `main` that writes them (utf8/LF) and calls `stampMeta`.
- `scripts/eval/reconstruct-contested-output.mjs` - one-shot retro-fix for #95: rebuild the scorer input from the committed `.md`, re-emit the `.json`, verify the body matches.
- `scripts/lib/eval-results-lib.mjs` - pure `checkEvalResults(entries) -> problems[]` (pairing + shape).
- `scripts/check-eval-results.mjs` - the gate runner: read the dir, call the lib, exit non-zero on problems.
- `tests/score-lib.test.mjs` - golden-fixture characterization tests for both scorers.
- `tests/finalize.test.mjs` - `buildArtifacts` produces correctly-named, correctly-bodied artifact pairs.
- `tests/check-eval-results.test.mjs` - pairing + shape behaviour, incl. the advisor-routing exclusion.
- `tests/fixtures/eval/` - tiny committed inputs + their captured golden outputs.
- `docs/internal/eval-results/2026-06-19-contested-output-eval.json` - the retro-fixed sidecar (output of Task 5).

**Modified files:**
- `scripts/eval/score.mjs`, `scripts/eval/score-output.mjs` - become thin wrappers calling `score-lib.mjs` (behaviour preserved).
- `scripts/eval/stamp-meta.mjs` - extract pure `stampField` + `stampMeta`; add a CLI main-guard so import has no side effect.
- `scripts/check.mjs` - add the 14th layer `spawnSync` block AND the exit-status term; header 13 -> 14.
- `docs/architecture.md`, `docs/conformance.md`, `docs/contributing.md` - count ripple 13 -> 14.
- `scripts/eval/README.md` - document `finalize` + the new flow + the guard.
- `CHANGELOG.md` - `[Unreleased]` entry.
- (Task 8, optional) `scripts/eval/eval.workflow.mjs` (new), README flow -> 3 commands.

---

# PR A - Workstream 1 (score-core refactor + finalize)

## Task 1: Extract the scorers into a pure `score-lib.mjs` (behaviour-preserving)

**Files:**
- Create: `scripts/eval/score-lib.mjs`
- Create: `tests/fixtures/eval/trigger.cases.json`, `tests/fixtures/eval/trigger.routed.json`, `tests/fixtures/eval/output.results.json`
- Create: `tests/fixtures/eval/trigger.golden.md`, `trigger.golden.json`, `output.golden.md`, `output.golden.json` (captured from the CURRENT code before refactor)
- Create: `tests/score-lib.test.mjs`
- Modify: `scripts/eval/score.mjs`, `scripts/eval/score-output.mjs` (become thin wrappers)

**Interfaces:**
- Produces: `scoreTrigger(cases: object[], routedRaw: object) -> { md: string, json: object }` and `scoreOutput(rawResults: object|object[]) -> { md: string, json: object }`, both pure (no fs, no globals). `cases` is the `.cases` array from `extract-cases`; `routedRaw` is `{routes:[{id,top1,top3}]}` or the bare array; `rawResults` is `{results:[{skill,artifactChars,perCheck:[{check,pass,reason}],passed,total}]}` or the bare array.
- Consumes: nothing from other tasks.

- [ ] **Step 1: Create the fixture inputs**

`tests/fixtures/eval/trigger.cases.json`:
```json
{ "cases": [
  { "id": "t1", "prompt": "a clear premortem situation", "expected": "premortem", "type": "trigger", "source": "premortem" },
  { "id": "a1", "prompt": "a generic no-tool prompt", "expected": "none", "type": "anti", "source": "premortem" },
  { "id": "a2", "prompt": "names a specific alternative", "expected": "swot", "type": "anti", "source": "premortem" }
] }
```

`tests/fixtures/eval/trigger.routed.json`:
```json
{ "routes": [
  { "id": "t1", "top1": "premortem", "top3": ["premortem", "red-team-light", "swot"] },
  { "id": "a1", "top1": "none", "top3": ["none"] },
  { "id": "a2", "top1": "swot", "top3": ["swot", "premortem"] }
] }
```

`tests/fixtures/eval/output.results.json`:
```json
{ "results": [
  { "skill": "premortem", "artifactChars": 1234, "passed": 2, "total": 2, "perCheck": [{ "check": "c1", "pass": true }, { "check": "c2", "pass": true }] },
  { "skill": "swot", "artifactChars": 999, "passed": 1, "total": 2, "perCheck": [{ "check": "d1", "pass": true }, { "check": "d2", "pass": false, "reason": "missing caveat" }] }
] }
```

- [ ] **Step 2: Capture the golden output from the CURRENT (un-refactored) code**

This pins existing behaviour before any change. Run:
```bash
cd "E:/Projects/product-on-purpose/thinking-framework-skills"
node scripts/eval/score.mjs tests/fixtures/eval/trigger.cases.json tests/fixtures/eval/trigger.routed.json > tests/fixtures/eval/trigger.golden.md
# the current CLI writes the json next to the routed file as *scorecard.json*:
mv tests/fixtures/eval/trigger.scorecard.json tests/fixtures/eval/trigger.golden.json
node scripts/eval/score-output.mjs tests/fixtures/eval/output.results.json > tests/fixtures/eval/output.golden.md
mv tests/fixtures/eval/output.output-scorecard.json tests/fixtures/eval/output.golden.json
```
Expected: four golden files created. (If the `mv` source name differs, list the dir and move the generated `*scorecard.json`.) These goldens are the contract the refactor must reproduce exactly.

- [ ] **Step 3: Write the failing test**

`tests/score-lib.test.mjs`:
```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { scoreTrigger, scoreOutput } from '../scripts/eval/score-lib.mjs';

const FX = join(dirname(fileURLToPath(import.meta.url)), 'fixtures', 'eval');
const read = (f) => readFileSync(join(FX, f), 'utf8');
const readJson = (f) => JSON.parse(read(f));

test('scoreTrigger reproduces the golden scorecard', () => {
  const { md, json } = scoreTrigger(readJson('trigger.cases.json').cases, readJson('trigger.routed.json'));
  assert.equal(md, read('trigger.golden.md'));
  assert.deepEqual(json, readJson('trigger.golden.json'));
});

test('scoreOutput reproduces the golden scorecard', () => {
  const { md, json } = scoreOutput(readJson('output.results.json'));
  assert.equal(md, read('output.golden.md'));
  assert.deepEqual(json, readJson('output.golden.json'));
});
```

- [ ] **Step 4: Run the test to verify it fails**

Run: `node --test tests/score-lib.test.mjs`
Expected: FAIL - cannot import `scoreTrigger`/`scoreOutput` from a non-existent module.

- [ ] **Step 5: Create `scripts/eval/score-lib.mjs` by moving the logic verbatim**

```js
// score-lib.mjs - pure scoring of behavioral eval runs. Both functions are a pure
// function of their input (no fs, no randomness): the non-determinism lives in PRODUCING
// the routed/results inputs, not in scoring them. The score.mjs / score-output.mjs CLIs
// and finalize.mjs are the only callers. See scripts/eval/README.md.

export function scoreTrigger(cases, routedRaw) {
  const routes = routedRaw.routes || routedRaw;
  const byId = new Map(routes.map((r) => [r.id, r]));
  const per = {};
  const ensure = (s) => (per[s] ||= { trig: 0, trigHit: 0, trigSoft: 0, anti: 0, antiNoFire: 0, antiNamed: 0, antiNamedHit: 0, miss: [], fire: [] });
  let unrouted = 0;
  for (const c of cases) {
    const r = byId.get(c.id);
    const top1 = r ? r.top1 : undefined;
    const top3 = (r && r.top3) || [];
    if (!r) unrouted++;
    const p = ensure(c.source);
    if (c.type === 'trigger') {
      p.trig++;
      if (top1 === c.expected) p.trigHit++;
      else p.miss.push({ kind: 'trigger', id: c.id, want: c.expected, got: top1 ?? '(unrouted)', prompt: c.prompt.slice(0, 72) });
      if (top3.includes(c.expected)) p.trigSoft++;
    } else {
      p.anti++;
      const noFire = top1 !== c.source;
      if (noFire) p.antiNoFire++; else p.fire.push({ id: c.id, got: top1, prompt: c.prompt.slice(0, 72) });
      if (c.expected !== 'none') {
        p.antiNamed++;
        if (top1 === c.expected) p.antiNamedHit++;
        else p.miss.push({ kind: noFire ? 'anti-soft' : 'anti-fire', id: c.id, want: c.expected, got: top1 ?? '(unrouted)', prompt: c.prompt.slice(0, 72) });
      }
    }
  }
  const skills = Object.keys(per).sort();
  const sum = (k) => skills.reduce((a, s) => a + per[s][k], 0);
  const tTrig = sum('trig'), tTrigHit = sum('trigHit'), tTrigSoft = sum('trigSoft');
  const tAnti = sum('anti'), tNoFire = sum('antiNoFire'), tNamed = sum('antiNamed'), tNamedHit = sum('antiNamedHit');
  const pct = (n, d) => d ? (100 * n / d).toFixed(0) + '%' : 'n/a';

  let md = `# Trigger eval scorecard\n\n`;
  md += `Cases: ${cases.length} (${tTrig} trigger, ${tAnti} anti; ${tNamed} of the anti cases name a specific alternative) across ${skills.length} skills. Unrouted: ${unrouted}.\n\n`;
  md += `- **Trigger accuracy (top1): ${pct(tTrigHit, tTrig)}** (${tTrigHit}/${tTrig}); soft (in top3): ${pct(tTrigSoft, tTrig)}.\n`;
  md += `- **Anti no-false-fire: ${pct(tNoFire, tAnti)}** (${tNoFire}/${tAnti}) - the skill did NOT grab a wrong-tool / no-tool situation. This is the metric that matters.\n`;
  md += `- Anti right-alternative: ${pct(tNamedHit, tNamed)} (${tNamedHit}/${tNamed}) - of the anti cases naming a specific alternative, how many routed there (the rest mostly answered "none" on a genuinely trivial prompt, still not a false-fire).\n\n`;
  md += `| Skill | trigger top1 | top3 | anti no-fire | anti right-alt |\n|---|---|---|---|---|\n`;
  for (const s of skills) {
    const p = per[s];
    md += `| ${s} | ${pct(p.trigHit, p.trig)} (${p.trigHit}/${p.trig}) | ${pct(p.trigSoft, p.trig)} | ${pct(p.antiNoFire, p.anti)} | ${p.antiNamed ? pct(p.antiNamedHit, p.antiNamed) + ' (' + p.antiNamedHit + '/' + p.antiNamed + ')' : 'n/a'} |\n`;
  }
  const fires = skills.flatMap((s) => per[s].fire.map((f) => ({ s, ...f })));
  md += `\n## False-fires (a skill grabbed a wrong-tool situation - the real failure mode): ${fires.length}\n\n`;
  for (const f of fires) md += `- **${f.s}** grabbed \`${f.id}\` (got \`${f.got}\`) - "${f.prompt}"\n`;
  if (!fires.length) md += `_None. No skill triggered on a situation meant for another tool or no tool._\n`;
  md += `\n## Other misses (trigger top1 wrong, or anti routed to "none"/another instead of the named alternative)\n\n`;
  for (const s of skills) {
    const ms = per[s].miss.filter((m) => m.kind !== 'anti-fire');
    if (!ms.length) continue;
    md += `**${s}**\n`;
    for (const m of ms) md += `- (${m.kind}) want \`${m.want}\`, got \`${m.got}\` - "${m.prompt}"\n`;
    md += `\n`;
  }

  const json = {
    generated: 'TRIGGER eval', cases: cases.length,
    totals: { trigger: tTrig, anti: tAnti, antiNamed: tNamed, unrouted,
      triggerTop1: tTrigHit, triggerTop3: tTrigSoft, antiNoFire: tNoFire, antiRightAlt: tNamedHit,
      triggerTop1Pct: tTrig ? +(100 * tTrigHit / tTrig).toFixed(1) : null,
      antiNoFirePct: tAnti ? +(100 * tNoFire / tAnti).toFixed(1) : null,
      antiRightAltPct: tNamed ? +(100 * tNamedHit / tNamed).toFixed(1) : null,
      falseFires: fires.length },
    perSkill: Object.fromEntries(skills.map((s) => [s, per[s]])),
  };
  return { md, json };
}

export function scoreOutput(rawResults) {
  const results = (rawResults.results || rawResults).slice().sort((a, b) => a.skill.localeCompare(b.skill));
  const tPassed = results.reduce((a, r) => a + r.passed, 0);
  const tTotal = results.reduce((a, r) => a + r.total, 0);
  const perfect = results.filter((r) => r.passed === r.total).length;
  const pct = (n, d) => d ? (100 * n / d).toFixed(0) + '%' : 'n/a';

  let md = `# Output eval scorecard\n\n`;
  md += `Skills evaluated: ${results.length}. Output checks: ${tTotal}.\n\n`;
  md += `**Overall: ${pct(tPassed, tTotal)} of checks passed** (${tPassed}/${tTotal}). Skills passing every check: ${perfect}/${results.length}.\n\n`;
  md += `| Skill | checks passed | artifact chars |\n|---|---|---|\n`;
  for (const r of results) md += `| ${r.skill} | ${pct(r.passed, r.total)} (${r.passed}/${r.total}) | ${r.artifactChars ?? '?'} |\n`;
  const fails = results.flatMap((r) => (r.perCheck || []).filter((c) => !c.pass).map((c) => ({ skill: r.skill, ...c })));
  md += `\n## Failed checks (${fails.length})\n\n`;
  if (!fails.length) md += `_None. Every artifact satisfied every one of its skill's output checks._\n`;
  for (const r of results) {
    const fs = (r.perCheck || []).filter((c) => !c.pass);
    if (!fs.length) continue;
    md += `**${r.skill}** (${r.passed}/${r.total})\n`;
    for (const c of fs) md += `- FAIL: "${c.check.slice(0, 90)}" - ${c.reason}\n`;
    md += `\n`;
  }

  const json = {
    generated: 'OUTPUT eval', skills: results.length,
    totals: { checks: tTotal, passed: tPassed, passPct: tTotal ? +(100 * tPassed / tTotal).toFixed(1) : null, perfectSkills: perfect, failedChecks: fails.length },
    perSkill: Object.fromEntries(results.map((r) => [r.skill, { passed: r.passed, total: r.total, fails: (r.perCheck || []).filter((c) => !c.pass).map((c) => c.check) }])),
  };
  return { md, json };
}
```

- [ ] **Step 6: Make the two CLIs thin wrappers (preserve current output exactly)**

Replace the body of `scripts/eval/score.mjs` (keep the shebang + the usage header comment) with:
```js
import { readFileSync, writeFileSync } from 'node:fs';
import { scoreTrigger } from './score-lib.mjs';

const [casesFile, routedFile] = process.argv.slice(2);
if (!casesFile || !routedFile) { console.error('Usage: node scripts/eval/score.mjs <cases.json> <routed.json>'); process.exit(2); }
const cases = JSON.parse(readFileSync(casesFile, 'utf8')).cases;
const routedRaw = JSON.parse(readFileSync(routedFile, 'utf8'));
const { md, json } = scoreTrigger(cases, routedRaw);
process.stdout.write(md);
process.stderr.write('[json] ' + JSON.stringify(json.totals) + '\n');
writeFileSync(routedFile.replace(/routed.*\.json$/, 'scorecard.json'), JSON.stringify(json, null, 2));
```

Replace the body of `scripts/eval/score-output.mjs` similarly:
```js
import { readFileSync, writeFileSync } from 'node:fs';
import { scoreOutput } from './score-lib.mjs';

const file = process.argv[2];
if (!file) { console.error('Usage: node scripts/eval/score-output.mjs <results.json>'); process.exit(2); }
const data = JSON.parse(readFileSync(file, 'utf8'));
const { md, json } = scoreOutput(data);
process.stdout.write(md);
process.stderr.write('[json] ' + JSON.stringify(json.totals) + '\n');
writeFileSync(file.replace(/results.*\.json$|\.json$/, 'output-scorecard.json'), JSON.stringify(json, null, 2));
```

- [ ] **Step 7: Run the test to verify it passes**

Run: `node --test tests/score-lib.test.mjs`
Expected: PASS (2 tests). The refactor reproduces the captured golden output byte-for-byte.

- [ ] **Step 8: Sanity-check the CLIs still match the goldens**

Run:
```bash
node scripts/eval/score.mjs tests/fixtures/eval/trigger.cases.json tests/fixtures/eval/trigger.routed.json | diff - tests/fixtures/eval/trigger.golden.md && echo "trigger CLI unchanged"
node scripts/eval/score-output.mjs tests/fixtures/eval/output.results.json | diff - tests/fixtures/eval/output.golden.md && echo "output CLI unchanged"
```
Expected: both print "... unchanged" with no diff.

- [ ] **Step 9: Commit**

```bash
git checkout -b feat/eval-orchestration
git add scripts/eval/score-lib.mjs scripts/eval/score.mjs scripts/eval/score-output.mjs tests/score-lib.test.mjs tests/fixtures/eval/
git commit -m "refactor(eval): extract scoreTrigger/scoreOutput into pure score-lib (behaviour-preserving, golden-tested)"
```
(+ standard commit trailers per CLAUDE.md.)

---

## Task 2: Extract `stampMeta` + add a CLI main-guard to `stamp-meta.mjs`

**Files:**
- Modify: `scripts/eval/stamp-meta.mjs`
- Create: `tests/stamp-meta.test.mjs`

**Interfaces:**
- Produces: `stampField(yamlText: string, field: string, date: string) -> string` (pure string replace) and `stampMeta(date: string, which: 'trigger'|'output', root: string) -> { stamped: number, skipped: number }`. Importing `stamp-meta.mjs` must have NO side effect (review m4).
- Consumes: nothing.

- [ ] **Step 1: Write the failing test**

`tests/stamp-meta.test.mjs`:
```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { stampField } from '../scripts/eval/stamp-meta.mjs';

test('stampField rewrites only the target field, preserving the rest', () => {
  const yaml = 'quality:\n  trigger_eval_status: not-run\n  output_eval_status: not-run\n';
  const out = stampField(yaml, 'trigger_eval_status', '2026-06-24');
  assert.match(out, /trigger_eval_status: measured-2026-06-24/);
  assert.match(out, /output_eval_status: not-run/); // untouched
});

test('stampField is a no-op when the field is absent', () => {
  const yaml = 'name: x\n';
  assert.equal(stampField(yaml, 'trigger_eval_status', '2026-06-24'), yaml);
});

test('importing stamp-meta.mjs has no side effect (no throw, no argv parse)', async () => {
  // If the module ran its CLI on import it would call process.exit(2) on bad argv.
  const mod = await import('../scripts/eval/stamp-meta.mjs');
  assert.equal(typeof mod.stampMeta, 'function');
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/stamp-meta.test.mjs`
Expected: FAIL - `stampField` is not exported (and the current module runs its CLI on import, which would `process.exit(2)` under the test's argv).

- [ ] **Step 3: Refactor `scripts/eval/stamp-meta.mjs`**

Replace its body (keep the shebang + usage comment) with:
```js
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export function stampField(yamlText, field, date) {
  const re = new RegExp(`(${field}:[ \\t]*)[^\\n\\r]*`);
  return re.test(yamlText) ? yamlText.replace(re, `$1measured-${date}`) : yamlText;
}

export async function stampMeta(date, which, root) {
  const field = which + '_eval_status';
  const reg = (await import('file://' + join(root, 'frameworks', 'registry.mjs').replace(/\\/g, '/'))).default;
  let stamped = 0, skipped = 0;
  for (const f of reg.frameworks.filter((e) => e.status === 'shipped')) {
    const p = join(root, 'skills', 'think-' + f.slug, 'skill.meta.yml');
    if (!existsSync(p)) { skipped++; continue; }
    const s = readFileSync(p, 'utf8');
    const next = stampField(s, field, date);
    if (next !== s) { writeFileSync(p, next, 'utf8'); stamped++; } else skipped++;
  }
  return { stamped, skipped };
}

// CLI main-guard: only run when invoked directly, never on import (review m4).
const invokedDirectly = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  const date = process.argv[2];
  const which = process.argv[3] || 'trigger';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date || '') || !['trigger', 'output'].includes(which)) {
    console.error('Usage: node scripts/eval/stamp-meta.mjs <YYYY-MM-DD> [trigger|output]'); process.exit(2);
  }
  const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
  const { stamped, skipped } = await stampMeta(date, which, ROOT);
  console.log(`stamp-meta: ${which}_eval_status -> measured-${date} on ${stamped} skill(s) (skipped ${skipped}).`);
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `node --test tests/stamp-meta.test.mjs`
Expected: PASS (3 tests).

- [ ] **Step 5: Verify the CLI still works unchanged (dry sanity, no real stamp wanted)**

Run: `node scripts/eval/stamp-meta.mjs bad-date`
Expected: prints the Usage line and exits 2 (the main-guard path still works). Do NOT run it with a real date here (that would stamp real `skill.meta.yml` files).

- [ ] **Step 6: Commit**

```bash
git add scripts/eval/stamp-meta.mjs tests/stamp-meta.test.mjs
git commit -m "refactor(eval): extract pure stampMeta/stampField + add CLI main-guard so import is side-effect-free"
```

---

## Task 3: Build `finalize.mjs`

**Files:**
- Create: `scripts/eval/finalize.mjs`
- Create: `tests/finalize.test.mjs`

**Interfaces:**
- Consumes: `scoreTrigger`, `scoreOutput` (Task 1); `stampMeta` (Task 2).
- Produces: `buildArtifacts({ date, prefix?, trigger?: {cases, routedRaw}, output?: {rawResults} }) -> [{ path: string, content: string }]` (pure; `path` is relative to repo root, ending `<date>[-<prefix>]-<kind>-eval.{md,json}`). A thin `main` parses argv, reads inputs, writes artifacts with utf8/LF, calls `stampMeta` per supplied kind, and prints a manifest.

- [ ] **Step 1: Write the failing test**

`tests/finalize.test.mjs`:
```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { buildArtifacts } from '../scripts/eval/finalize.mjs';

const FX = join(dirname(fileURLToPath(import.meta.url)), 'fixtures', 'eval');
const readJson = (f) => JSON.parse(readFileSync(join(FX, f), 'utf8'));

test('buildArtifacts emits a paired md+json per supplied kind, with canonical paths', () => {
  const arts = buildArtifacts({
    date: '2026-06-24',
    trigger: { cases: readJson('trigger.cases.json').cases, routedRaw: readJson('trigger.routed.json') },
    output: { rawResults: readJson('output.results.json') },
  });
  const paths = arts.map((a) => a.path).sort();
  assert.deepEqual(paths, [
    'docs/internal/eval-results/2026-06-24-output-eval.json',
    'docs/internal/eval-results/2026-06-24-output-eval.md',
    'docs/internal/eval-results/2026-06-24-trigger-eval.json',
    'docs/internal/eval-results/2026-06-24-trigger-eval.md',
  ]);
  const md = arts.find((a) => a.path.endsWith('trigger-eval.md')).content;
  assert.match(md, /# Trigger eval scorecard/);
  // json content parses and carries the contract
  const json = JSON.parse(arts.find((a) => a.path.endsWith('output-eval.json')).content);
  assert.equal(json.generated, 'OUTPUT eval');
  assert.ok('passPct' in json.totals);
});

test('prefix produces the cohort filename', () => {
  const arts = buildArtifacts({ date: '2026-06-19', prefix: 'contested', output: { rawResults: readJson('output.results.json') } });
  assert.deepEqual(arts.map((a) => a.path).sort(), [
    'docs/internal/eval-results/2026-06-19-contested-output-eval.json',
    'docs/internal/eval-results/2026-06-19-contested-output-eval.md',
  ]);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/finalize.test.mjs`
Expected: FAIL - cannot import `buildArtifacts`.

- [ ] **Step 3: Create `scripts/eval/finalize.mjs`**

```js
#!/usr/bin/env node
// finalize.mjs - the one deterministic step that turns raw eval run outputs into the
// committed scorecards. Writes BOTH the .md and the .json for each kind directly into
// docs/internal/eval-results/ (no scratch sibling, no manual copy: the file that used to
// get dropped is never produced as a loose intermediate), then stamps skill.meta.yml.
//
// Usage:
//   node scripts/eval/finalize.mjs <YYYY-MM-DD> [--prefix <name>] \
//        [--trigger <routed.json> <cases.json>] [--output <results.json>]
// At least one of --trigger / --output is required. Explicit paths only (no auto-discovery).

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { scoreTrigger, scoreOutput } from './score-lib.mjs';
import { stampMeta } from './stamp-meta.mjs';

const OUT_DIR = 'docs/internal/eval-results';

export function buildArtifacts({ date, prefix, trigger, output }) {
  const base = (kind) => `${OUT_DIR}/${date}${prefix ? '-' + prefix : ''}-${kind}-eval`;
  const arts = [];
  if (trigger) {
    const { md, json } = scoreTrigger(trigger.cases, trigger.routedRaw);
    arts.push({ path: `${base('trigger')}.md`, content: md });
    arts.push({ path: `${base('trigger')}.json`, content: JSON.stringify(json, null, 2) + '\n' });
  }
  if (output) {
    const { md, json } = scoreOutput(output.rawResults);
    arts.push({ path: `${base('output')}.md`, content: md });
    arts.push({ path: `${base('output')}.json`, content: JSON.stringify(json, null, 2) + '\n' });
  }
  return arts;
}

const invokedDirectly = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
  const argv = process.argv.slice(2);
  const date = argv[0];
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date || '')) { console.error('Usage: node scripts/eval/finalize.mjs <YYYY-MM-DD> [--prefix <name>] [--trigger <routed> <cases>] [--output <results>]'); process.exit(2); }
  const flag = (name) => { const i = argv.indexOf(name); return i === -1 ? null : argv.slice(i + 1); };
  const prefix = (flag('--prefix') || [])[0];
  const readJson = (p) => JSON.parse(readFileSync(resolve(ROOT, p), 'utf8'));

  const opts = { date, prefix };
  const trig = flag('--trigger');
  if (trig) { const [routed, cases] = trig; opts.trigger = { routedRaw: readJson(routed), cases: readJson(cases).cases }; }
  const out = flag('--output');
  if (out) opts.output = { rawResults: readJson(out[0]) };
  if (!opts.trigger && !opts.output) { console.error('finalize: supply --trigger and/or --output'); process.exit(2); }

  const arts = buildArtifacts(opts);
  for (const a of arts) writeFileSync(resolve(ROOT, a.path), a.content, 'utf8');
  if (opts.trigger) await stampMeta(date, 'trigger', ROOT);
  if (opts.output) await stampMeta(date, 'output', ROOT);
  console.log('finalize: wrote\n  ' + arts.map((a) => a.path).join('\n  '));
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `node --test tests/finalize.test.mjs`
Expected: PASS (2 tests).

- [ ] **Step 5: Run the whole suite to confirm nothing regressed**

Run: `npm test`
Expected: all tests pass (the existing suites + the three new files).

- [ ] **Step 6: Commit**

```bash
git add scripts/eval/finalize.mjs tests/finalize.test.mjs
git commit -m "feat(eval): add finalize.mjs - one step writes both scorecard artifacts into the canonical dir and stamps meta"
```

---

## Task 4: Update `scripts/eval/README.md` to the new post-run flow

**Files:**
- Modify: `scripts/eval/README.md`

(Doc-only; no test. This is the WS1 deliverable's documentation and closes PR A.)

- [ ] **Step 1: Rewrite the two "Running it" / "Running the output eval" closing steps**

In each three-step block, replace the final manual "Score / commit" step with a pointer to `finalize`. After both blocks, add a short section:
```markdown
## Finalizing a run (one command, guaranteed paired artifacts)

`score.mjs` / `score-output.mjs` still print a scorecard for ad-hoc inspection, but to COMMIT a run use `finalize.mjs` - it writes BOTH the `.md` and the `.json` straight into `docs/internal/eval-results/` (so the `.json` sidecar can never be dropped) and stamps each shipped skill's `skill.meta.yml`:

    node scripts/eval/finalize.mjs <YYYY-MM-DD> \
      --trigger <routed.json> <cases.json> \
      --output <results.json>

Add `--prefix contested` for a cohort run (writes `<date>-contested-<kind>-eval.*`). A full run is now: extract -> the route + output Workflows -> `finalize` (4 commands; 3 once the combined run Workflow lands). The committed scorecards are guarded: `scripts/check-eval-results.mjs` (a `check.mjs` layer) reds CI if any scorecard is missing its `.md`/`.json` twin or malformed.
```

- [ ] **Step 2: Update the Status / roadmap section**

Change the roadmap to note the harness is now finalize-driven and the pairing is gate-enforced.

- [ ] **Step 3: Commit and open PR A**

```bash
git add scripts/eval/README.md
git commit -m "docs(eval): document finalize.mjs and the gate-enforced scorecard pairing"
git push -u origin feat/eval-orchestration
gh pr create --title "feat(eval): finalize.mjs + pure score-lib (WS1)" --body "Workstream 1 of the eval-harness orchestration spec. Pure score-lib (golden-tested, behaviour-preserving), side-effect-free stampMeta, and finalize.mjs that emits paired scorecards into the canonical dir. Lands under [Unreleased]; no version bump. Spec: docs/internal/specs/2026-06-23-eval-harness-orchestration.md"
```
Verify CI green (the 13-layer gate is unchanged in PR A; guard-tests includes the new suites). Merge when green.

---

# PR B - Workstream 3 + Workstream 2 + count ripple (co-sequenced per review M2)

> The guard (Task 6) reds CI on the pre-existing #95 gap, so the retro-fixed `.json` (Task 5) MUST land in the same PR, before the guard in sequence.

## Task 5: Retro-fix #95 - regenerate the contested-output `.json` through the harness

**Files:**
- Create: `scripts/eval/reconstruct-contested-output.mjs`
- Create: `docs/internal/eval-results/2026-06-19-contested-output-eval.json` (output of running the script)

**Interfaces:**
- Consumes: `scoreOutput` (Task 1).
- Produces: the committed `.json`. The reconstruction is verified by comparing the scorer body against the committed `.md` (cohort-comment stripped, newlines normalized) - review M1.

- [ ] **Step 1: Create the reconstruction + verification script**

`scripts/eval/reconstruct-contested-output.mjs`:
```js
#!/usr/bin/env node
// One-shot retro-fix for #95 (the missing contested-output .json sidecar). The raw run
// results were scratch and are gone, but the committed .md has zero failed checks for all
// 7 skills, so the scorer INPUT is information-complete: rebuild it from the .md table,
// re-emit the .json via the real scorer, and VERIFY the regenerated body matches the
// committed .md (after stripping its hand-added cohort HTML comment and normalizing
// newlines - review M1). Writes the .json next to the .md. Run once, commit the .json.

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { scoreOutput } from './score-lib.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const mdPath = join(ROOT, 'docs/internal/eval-results/2026-06-19-contested-output-eval.md');
const jsonPath = mdPath.replace(/\.md$/, '.json');

const committed = readFileSync(mdPath, 'utf8');
// Strip a leading HTML comment block (the hand-added cohort note) + following blank line.
const body = committed.replace(/^<!--[\s\S]*?-->\s*\n/, '');
const norm = (s) => s.replace(/\r\n/g, '\n').replace(/\s+$/, '');

// Parse the table rows: | <skill> | <pct>% (<passed>/<total>) | <chars> |
const rows = [...body.matchAll(/^\|\s*([a-z0-9-]+)\s*\|\s*\d+%\s*\((\d+)\/(\d+)\)\s*\|\s*(\d+|\?)\s*\|$/gm)];
if (rows.length === 0) { console.error('reconstruct: no skill rows parsed - aborting'); process.exit(1); }

const results = rows.map(([, skill, passed, total, chars]) => ({
  skill,
  passed: +passed,
  total: +total,
  artifactChars: chars === '?' ? undefined : +chars,
  perCheck: Array.from({ length: +total }, (_, i) => ({ check: `c${i}`, pass: true })), // 0 fails => check text never surfaces
}));

const { md, json } = scoreOutput({ results });

if (norm(md) !== norm(body)) {
  console.error('reconstruct: regenerated body does NOT match the committed .md after normalization. Aborting (do not commit a divergent artifact).');
  console.error('--- expected (committed body) ---\n' + norm(body));
  console.error('--- got (regenerated) ---\n' + norm(md));
  process.exit(1);
}

writeFileSync(jsonPath, JSON.stringify(json, null, 2) + '\n', 'utf8');
console.log(`reconstruct: verified body match; wrote ${jsonPath} (skills ${json.skills}, ${json.totals.passed}/${json.totals.checks} checks).`);
```

- [ ] **Step 2: Run it**

Run: `node scripts/eval/reconstruct-contested-output.mjs`
Expected: `reconstruct: verified body match; wrote .../2026-06-19-contested-output-eval.json (skills 7, 40/40 checks).` If it prints a mismatch and aborts, STOP - the parser or the committed `.md` diverges from the assumption; reassess before continuing.

- [ ] **Step 3: Spot-check the emitted `.json`**

Open `docs/internal/eval-results/2026-06-19-contested-output-eval.json`. Expected: `generated: "OUTPUT eval"`, `skills: 7`, `totals.passed === totals.checks === 40`, `totals.failedChecks === 0`, all 7 contested skills in `perSkill` with `fails: []`. No cohort marker (matches the contested-trigger `.json`).

- [ ] **Step 4: Commit**

```bash
git checkout -b feat/eval-results-guard
git add scripts/eval/reconstruct-contested-output.mjs docs/internal/eval-results/2026-06-19-contested-output-eval.json
git commit -m "fix(eval): regenerate the missing 2026-06-19 contested-output .json through the scorer (closes #95)"
```

---

## Task 6: The pairing + shape guard, wired as the 14th gate layer

**Files:**
- Create: `scripts/lib/eval-results-lib.mjs`
- Create: `scripts/check-eval-results.mjs`
- Create: `tests/check-eval-results.test.mjs`
- Modify: `scripts/check.mjs`

**Interfaces:**
- Produces: `checkEvalResults(entries: {name: string, parsed?: object|null}[]) -> string[]`. `entries` is one record per file in the dir; for `.json` files, `parsed` is the parsed object or `null` if it failed to parse. Returns a list of human-readable problem strings (empty = clean).
- Consumes: nothing.

- [ ] **Step 1: Write the failing test**

`tests/check-eval-results.test.mjs`:
```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkEvalResults } from '../scripts/lib/eval-results-lib.mjs';

const ok = (entries) => assert.deepEqual(checkEvalResults(entries), []);
const hasProblem = (entries, re) => assert.ok(checkEvalResults(entries).some((p) => re.test(p)), `expected a problem matching ${re}`);

test('a valid paired output scorecard passes', () => {
  ok([
    { name: '2026-06-17-output-eval.md' },
    { name: '2026-06-17-output-eval.json', parsed: { generated: 'OUTPUT eval', totals: { passPct: 99, failedChecks: 3 } } },
  ]);
});

test('a .md with no .json sibling reds', () => {
  hasProblem([{ name: '2026-06-19-contested-output-eval.md' }], /no matching \.json/);
});

test('a .json with no .md sibling reds', () => {
  hasProblem([{ name: 'x-eval.json', parsed: { generated: 'OUTPUT eval', totals: { passPct: 1, failedChecks: 0 } } }], /no matching \.md/);
});

test('a malformed .json reds', () => {
  hasProblem([{ name: 'x-eval.md' }, { name: 'x-eval.json', parsed: null }], /does not parse/);
});

test('an output scorecard missing a totals key reds', () => {
  hasProblem([{ name: 'x-eval.md' }, { name: 'x-eval.json', parsed: { generated: 'OUTPUT eval', totals: { passPct: 1 } } }], /missing totals\.failedChecks/);
});

test('an advisor-routing json (no `generated`) is paired-checked but NOT shape-checked', () => {
  ok([
    { name: '2026-06-03-advisor-routing.md' },
    { name: '2026-06-03-advisor-routing.json', parsed: { eval: 'advisor-routing', routing_accuracy: { pct: 0.58 } } },
  ]);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/check-eval-results.test.mjs`
Expected: FAIL - cannot import `checkEvalResults`.

- [ ] **Step 3: Create `scripts/lib/eval-results-lib.mjs`**

```js
// eval-results-lib.mjs - pure checks over docs/internal/eval-results/. Two scopes
// (review M3): (1) PAIRING over every .md/.json (schema-agnostic, so the older
// advisor-routing files pass); (2) SHAPE/contract ONLY over .json that carry a
// `generated` eval-kind field (auto-excludes advisor-routing, whose schema differs).

const REQUIRED_TOTALS = {
  'TRIGGER eval': ['triggerTop1Pct', 'falseFires'],
  'OUTPUT eval': ['passPct', 'failedChecks'],
};

export function checkEvalResults(entries) {
  const problems = [];
  const byBase = new Map();
  for (const e of entries) {
    const m = e.name.match(/^(.*)\.(md|json)$/i);
    if (!m) continue;
    const base = m[1];
    const ext = m[2].toLowerCase();
    const rec = byBase.get(base) || {};
    rec[ext] = e;
    byBase.set(base, rec);
  }
  for (const [base, rec] of [...byBase].sort((a, b) => a[0].localeCompare(b[0]))) {
    if (rec.md && !rec.json) problems.push(`${base}.md has no matching .json sibling`);
    if (rec.json && !rec.md) problems.push(`${base}.json has no matching .md sibling`);
    if (rec.json) {
      const p = rec.json.parsed;
      if (p == null || typeof p !== 'object') { problems.push(`${base}.json does not parse as JSON`); continue; }
      const required = REQUIRED_TOTALS[p.generated]; // only eval scorecards have `generated`
      if (required) {
        for (const k of required) {
          if (!p.totals || !(k in p.totals)) problems.push(`${base}.json (${p.generated}) missing totals.${k}`);
        }
      }
    }
  }
  return problems;
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `node --test tests/check-eval-results.test.mjs`
Expected: PASS (6 tests).

- [ ] **Step 5: Create the runner `scripts/check-eval-results.mjs`**

```js
#!/usr/bin/env node
// check-eval-results.mjs - gate layer 14. Asserts every behavioral-eval scorecard under
// docs/internal/eval-results/ is a paired .md + .json, and every trigger/output scorecard
// JSON carries its totals contract. See scripts/lib/eval-results-lib.mjs.
//
// Usage: node scripts/check-eval-results.mjs [rootDir]   (default: repo root)
// Exit: 0 = clean; 1 = one or more problems.

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { checkEvalResults } from './lib/eval-results-lib.mjs';

const argRoot = process.argv.slice(2).find((a) => !a.startsWith('--'));
const ROOT = resolve(argRoot || resolve(dirname(fileURLToPath(import.meta.url)), '..'));
const dir = join(ROOT, 'docs', 'internal', 'eval-results');
if (!existsSync(dir)) { console.error(`check-eval-results: no directory at ${dir}`); process.exit(1); }

const entries = readdirSync(dir)
  .filter((n) => /\.(md|json)$/i.test(n))
  .map((name) => {
    if (!name.toLowerCase().endsWith('.json')) return { name };
    let parsed = null;
    try { parsed = JSON.parse(readFileSync(join(dir, name), 'utf8')); } catch { parsed = null; }
    return { name, parsed };
  });

const problems = checkEvalResults(entries);
if (problems.length) {
  console.error(`check-eval-results: ${problems.length} problem(s):`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
console.log(`check-eval-results: ${entries.length} file(s) - all scorecards paired and well-formed.`);
process.exit(0);
```

- [ ] **Step 6: Run the runner against the real tree**

Run: `node scripts/check-eval-results.mjs`
Expected: PASS - "all scorecards paired and well-formed." (This only passes because Task 5 already added the contested-output `.json`. If it reds on that file, Task 5 was not completed first - fix the sequencing.)

- [ ] **Step 7: Wire the 14th layer into `scripts/check.mjs`**

After the changelog block (around line 130), add:
```js
console.log('\nRunning eval-results pairing + shape check (scripts/check-eval-results.mjs)\n');
const evalResults = spawnSync('node', [resolve(ROOT, 'scripts', 'check-eval-results.mjs'), ROOT], { stdio: 'inherit' });
```
Then append `|| (evalResults.status ?? 1)` to the final `process.exit(...)` OR-chain (review m6 - without this term, layer-14 failures are silently ignored).

In the header comment, change "It runs thirteen layers" to "It runs fourteen layers" and add:
```
//  14. the eval-results pairing + shape check (scripts/check-eval-results.mjs): every
//      behavioral-eval scorecard under docs/internal/eval-results/ is committed as a paired
//      .md + .json, and each trigger/output scorecard JSON carries its totals contract, so a
//      dropped sidecar (e.g. the 2026-06-19 contested-output gap) cannot recur.
```

- [ ] **Step 8: Run the full gate**

Run: `node scripts/check.mjs`
Expected: runs 14 layers, 0 errors (pre-existing description-score warnings from layer 1 are fine).

- [ ] **Step 9: Commit**

```bash
git add scripts/lib/eval-results-lib.mjs scripts/check-eval-results.mjs tests/check-eval-results.test.mjs scripts/check.mjs
git commit -m "feat(gate): add eval-results pairing + shape guard as the 14th layer"
```

---

## Task 7: Count ripple (13 -> 14) + CHANGELOG + trust-page check

**Files:**
- Modify: `docs/architecture.md`, `docs/conformance.md`, `docs/contributing.md`
- Modify: `CHANGELOG.md`
- Verify (likely no edit): `site/src/content/docs/start/does-this-work.mdx`

- [ ] **Step 1: `docs/architecture.md`**

At the gate description ("It runs thirteen layers in order"), change "thirteen" to "fourteen" and append a 14th numbered list item:
```
14. the eval-results pairing + shape check (`scripts/check-eval-results.mjs`): every behavioral-eval scorecard under `docs/internal/eval-results/` is a paired `.md` + `.json` with a valid totals contract.
```
Do NOT change the "three build-time guards run after `astro build`" line (review n8 - that is the SITE post-build set, unaffected).

- [ ] **Step 2: `docs/conformance.md`**

Change the heading "## The check.mjs gate: thirteen layers" to "fourteen layers" and the intro "Its thirteen layers are:" to "fourteen", and append the same 14th item to the enumerated list.

- [ ] **Step 3: `docs/contributing.md`**

Change "the 13-layer gate" to "the 14-layer gate".

- [ ] **Step 4: `CHANGELOG.md` `[Unreleased]`**

Under `## [Unreleased]`, add (creating an `### Added` / `### Fixed` grouping consistent with the file's style):
```markdown
### Added
- Eval-harness orchestration: `scripts/eval/finalize.mjs` writes both scorecard artifacts (`.md` + `.json`) into `docs/internal/eval-results/` in one step and stamps `skill.meta.yml`; scoring extracted into a pure, golden-tested `scripts/eval/score-lib.mjs`.
- Conformance gate layer 14: `scripts/check-eval-results.mjs` asserts every behavioral-eval scorecard is a paired `.md` + `.json` with a valid totals contract (gate 13 -> 14 layers).

### Fixed
- Regenerated the missing 2026-06-19 contested-output eval `.json` sidecar through the scorer (was committed `.md`-only), so every scorecard now pairs.
```

- [ ] **Step 5: Verify the trust page is now accurate**

`site/src/content/docs/start/does-this-work.mdx` already links the contested scorecards as `2026-06-19-contested-output-eval.*` (a glob). Now that the `.json` exists, that link resolves to both files - the wording is correct. Confirm there is no remaining sentence claiming the contested-output is `.md`-only or "scorecard file" where it should say the pair. Edit ONLY if such an inaccuracy exists; otherwise no change.

- [ ] **Step 6: Full verification**

Run:
```bash
npm test
node scripts/check.mjs
cd site && npm run build && cd ..
```
Expected: all tests pass; gate 14 layers, 0 errors; site builds.

- [ ] **Step 7: Commit and open PR B**

```bash
git add docs/architecture.md docs/conformance.md docs/contributing.md CHANGELOG.md site/src/content/docs/start/does-this-work.mdx
git commit -m "docs(gate): reconcile the 13 -> 14 layer count + CHANGELOG; trust-page contested link now symmetric"
git push -u origin feat/eval-results-guard
gh pr create --title "feat(eval): scorecard pairing guard + retro-fix #95 (WS2 + WS3)" --body "Workstreams 2 and 3, co-sequenced (the guard reds CI on the pre-existing #95 gap, so the regenerated .json lands with it). Gate 13 -> 14 layers. Closes #95. Lands under [Unreleased]. Spec: docs/internal/specs/2026-06-23-eval-harness-orchestration.md"
```
Verify CI green; merge.

---

# PR C - Workstream 4 (OPTIONAL, lowest priority, droppable)

## Task 8: Combined run Workflow

**Files:**
- Create: `scripts/eval/eval.workflow.mjs`
- Modify: `scripts/eval/README.md` (flow -> 3 commands), `CHANGELOG.md`

**Interfaces:**
- A Workflow script (run via the Workflow tool, `scriptPath: scripts/eval/eval.workflow.mjs`, `args = {blindPath, casesPath, skills, count, batchSize}`) that runs BOTH the routing pass and the produce/judge pass and returns `{ routed: {routes:[...]}, results: {results:[...]} }`. It composes the existing `route.workflow.mjs` and `output.workflow.mjs` logic; the two sub-Workflows remain for pilots / single-kind runs.

- [ ] **Step 1: Author `scripts/eval/eval.workflow.mjs`**

Model it on the existing `route.workflow.mjs` + `output.workflow.mjs` (read both first to match their `meta`, phase, and agent-fan-out patterns). It must:
- `phase('Route')` then run the blind routing fan-out (reuse the route workflow's batching), producing `routed`.
- `phase('Produce/Judge')` then run the produce -> judge fan-out (reuse the output workflow's per-skill produce + separate-judge), producing `results`.
- `return { routed, results }`.

Because a Workflow script cannot write files, the operator pipes its returned `routed`/`results` to disk and then runs `finalize`. Document that the returned object is saved to `routed.json` / `results.json` for `finalize --trigger`/`--output`.

- [ ] **Step 2: Smoke-test on a 1-skill pilot**

Run the Workflow via the Workflow tool with `args` scoped to a single skill (a pilot). Expected: it returns `{routed, results}` with one skill's worth of data; no exceptions.

- [ ] **Step 3: Update the README flow to 3 commands**

In `scripts/eval/README.md`, change the "full run is now ... 4 commands; 3 once the combined run Workflow lands" note to state the 3-command flow (`extract` -> `eval.workflow.mjs` -> `finalize`), keeping the sub-Workflows documented for pilots.

- [ ] **Step 4: CHANGELOG + commit + PR C**

Add a `[Unreleased]` bullet for the combined Workflow. Commit, push, open PR C, merge when green.

---

## Self-Review (completed during authoring)

**Spec coverage:** WS1 -> Tasks 1-4; WS2 -> Task 6 + Task 7 ripple; WS3 -> Task 5; WS4 -> Task 8. The three Major review fixes are each pinned: M1 (byte-match) -> Task 5 Step 1 normalization + abort-on-mismatch; M2 (sequencing) -> PR B co-locates Tasks 5+6 with Task 5 first; M3 (shape scope) -> Task 6 lib `REQUIRED_TOTALS` keyed on `generated`, with the advisor-routing exclusion test. Minors: m4 (main-guard) -> Task 2; m5 (utf8/LF + normalized compare) -> Tasks 3+5; m6 (exit-status term) -> Task 6 Step 7. Nits n7 (no CI yaml) / n8 (don't touch build-time-guards line) -> noted in Task 6/Task 7.

**Placeholder scan:** every code step carries complete, runnable code; doc edits give exact target text and the find/replace word.

**Type consistency:** `scoreTrigger(cases, routedRaw)` / `scoreOutput(rawResults)` (Task 1) are consumed with those exact signatures by `buildArtifacts` (Task 3) and `reconstruct-contested-output` (Task 5); `stampMeta(date, which, root)` (Task 2) is called with those args by `finalize` (Task 3); `checkEvalResults(entries)` with `{name, parsed}` records (Task 6) matches the runner's construction.

---

## Execution Handoff

Plan complete and saved to `docs/internal/plans/2026-06-24-eval-harness-orchestration.md`. Two execution options:

1. **Subagent-Driven (recommended)** - a fresh subagent per task, two-stage review between tasks, fast iteration. Matches how the v0.12.0 effort was built.
2. **Inline Execution** - execute tasks in this session with checkpoints.

Which approach?
