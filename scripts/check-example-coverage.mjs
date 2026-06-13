#!/usr/bin/env node
// check-example-coverage.mjs - a ratchet so the example layer cannot fall behind the
// catalog the way docs/getting-started.md drifted to a stale "31 frameworks". Every NEW
// shipped skill must ship at least one worked example (a Showcase appearance or a sample).
//
// "Covered" = the skill's slug is referenced in any site/src/content/docs/showcase/*.md
// (as a framework link `frameworks/think-<slug>/` or a `/think-<slug>` prompt invocation),
// or appears under a future site/src/content/docs/samples/ corpus. The currently-uncovered
// shipped skills are grandfathered in scripts/example-coverage-baseline.txt. The gate FAILS
// only when a shipped skill is uncovered AND not in the baseline - i.e. a skill was added
// without an example. The uncovered set can only shrink: when a grandfathered skill gains
// an example, run --update to drop it from the baseline.
//
// Usage:  node scripts/check-example-coverage.mjs            (exit 1 if a new skill lacks an example)
//         node scripts/check-example-coverage.mjs --update   (rewrite the baseline to the current uncovered set)

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');
const UPDATE = process.argv.includes('--update');
const reg = (await import('file://' + join(ROOT, 'frameworks', 'registry.mjs').replace(/\\/g, '/'))).default;

const SHOWCASE_DIR = join(ROOT, 'site', 'src', 'content', 'docs', 'showcase');
const SAMPLES_DIR = join(ROOT, 'site', 'src', 'content', 'docs', 'samples'); // future corpus; may not exist yet
const BASELINE = join(ROOT, 'scripts', 'example-coverage-baseline.txt');
const BASELINE_REL = 'scripts/example-coverage-baseline.txt';

// Registry slugs are unprefixed (e.g. "premortem"); showcase references carry the think- prefix.
const shipped = reg.frameworks.filter((f) => f.status === 'shipped').map((f) => f.slug).sort();

// Collect every think-<slug> token referenced across the example corpus (links + prompts).
const referenced = new Set();
function scan(dir) {
  if (!existsSync(dir)) return;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) { scan(join(dir, e.name)); continue; }
    if (!e.name.endsWith('.md') && !e.name.endsWith('.mdx')) continue;
    const text = readFileSync(join(dir, e.name), 'utf8');
    for (const m of text.matchAll(/think-([a-z0-9-]+)/g)) referenced.add(m[1]);
  }
}
scan(SHOWCASE_DIR);
scan(SAMPLES_DIR);

const covered = (s) => referenced.has(s);
const uncovered = shipped.filter((s) => !covered(s));

if (UPDATE) {
  writeFileSync(BASELINE, uncovered.length ? uncovered.join('\n') + '\n' : '', 'utf8');
  console.log(`example-coverage: wrote ${uncovered.length} grandfathered (uncovered) skill(s) to ${BASELINE_REL}; ${shipped.length - uncovered.length}/${shipped.length} shipped skills have a worked example.`);
  process.exit(0);
}

const baseline = existsSync(BASELINE)
  ? new Set(readFileSync(BASELINE, 'utf8').split(/\r?\n/).map((s) => s.trim()).filter(Boolean))
  : new Set();

const shippedSet = new Set(shipped);
const missing = uncovered.filter((s) => !baseline.has(s));            // FAIL: new skill, no example, not grandfathered
const nowCovered = [...baseline].filter((s) => shippedSet.has(s) && covered(s)); // advisory: baseline can shrink
const stale = [...baseline].filter((s) => !shippedSet.has(s));        // advisory: baseline entry no longer shipped

if (nowCovered.length) console.log(`example-coverage: NOTE - ${nowCovered.length} grandfathered skill(s) now have an example (${nowCovered.join(', ')}); run --update to tighten the baseline.`);
if (stale.length) console.log(`example-coverage: NOTE - ${stale.length} baseline entr(ies) no longer shipped (${stale.join(', ')}); run --update to clean.`);

if (missing.length) {
  console.error(`example-coverage: ${missing.length} shipped skill(s) have NO worked example and are NOT grandfathered:\n`);
  for (const s of missing) console.error(`  - think-${s}`);
  console.error(`\nA new skill must ship at least one Showcase appearance (or a sample) so the example layer keeps pace with the catalog.`);
  console.error(`Add the skill to a Showcase page under site/src/content/docs/showcase/, or - only if intentionally deferring - run:`);
  console.error(`  node scripts/check-example-coverage.mjs --update   (and say why in the PR)`);
  process.exit(1);
}

console.log(`example-coverage: OK (${shipped.length - uncovered.length}/${shipped.length} shipped skills have a worked example; ${baseline.size} grandfathered, 0 new skills missing one).`);
process.exit(0);
