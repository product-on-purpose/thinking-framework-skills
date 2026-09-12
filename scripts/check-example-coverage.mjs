#!/usr/bin/env node
// =============================================================================
// check-example-coverage.mjs - a ratchet so the example layer cannot fall behind the catalog.
//
// what-it-is:   the CLI for the example-coverage ratchet gate (scripts/check.mjs layer 8).
// what-it-does: for every shipped skill, checks whether its slug is referenced in any
//               site/src/content/docs/showcase/*.md (a framework link `frameworks/think-<slug>/`
//               or a `/think-<slug>` prompt invocation) or a future
//               site/src/content/docs/samples/ corpus. A shipped skill that is uncovered AND
//               not grandfathered in scripts/example-coverage-baseline.txt fails the gate;
//               `--update` rewrites the baseline to the current uncovered set instead of
//               failing, so the grandfathered set can only shrink over time.
// why:          docs/getting-started.md once drifted to a stale "31 frameworks" because
//               nothing tied the example layer to the catalog; this ratchet keeps a newly
//               shipped skill from merging with zero worked example, while grandfathering the
//               pre-existing gap so old skills don't retroactively red CI.
// used-by:      scripts/check.mjs (gate layer 8, via `npm run check`)
//
// Usage:  node scripts/check-example-coverage.mjs            (exit 1 if a new skill lacks an example)
//         node scripts/check-example-coverage.mjs --update   (rewrite the baseline to the current uncovered set)
// =============================================================================

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { extractReferencedSlugs, computeCoverage } from './lib/example-coverage-lib.mjs';

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
    for (const s of extractReferencedSlugs(text)) referenced.add(s);
  }
}
scan(SHOWCASE_DIR);
scan(SAMPLES_DIR);

const covered = (s) => referenced.has(s);
let uncovered = shipped.filter((s) => !covered(s));

if (UPDATE) {
  writeFileSync(BASELINE, uncovered.length ? uncovered.join('\n') + '\n' : '', 'utf8');
  console.log(`example-coverage: wrote ${uncovered.length} grandfathered (uncovered) skill(s) to ${BASELINE_REL}; ${shipped.length - uncovered.length}/${shipped.length} shipped skills have a worked example.`);
  process.exit(0);
}

const baseline = existsSync(BASELINE)
  ? new Set(readFileSync(BASELINE, 'utf8').split(/\r?\n/).map((s) => s.trim()).filter(Boolean))
  : new Set();

// Set arithmetic lives in scripts/lib/example-coverage-lib.mjs so the failure and advisory paths
// are unit-tested rather than only exercised by a real tree that happens to be clean.
const { missing, nowCovered, stale } = computeCoverage({ shipped, referenced, baseline });

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
