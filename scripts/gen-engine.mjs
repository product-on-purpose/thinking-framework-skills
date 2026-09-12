#!/usr/bin/env node
// =============================================================================
// gen-engine.mjs - copy the shared applicator engine to its second skill.
//
// what-it-is:   the drift guard and copier for the shared applicator engine document.
// what-it-does: copies skills/think-top3/references/engine.md (the one authored source) to
//               skills/think-random-frameworks/references/engine.md; with --check, byte-
//               compares instead of writing (a missing destination counts as drift) and
//               exits 1 on mismatch, logging the byte count compared either way. Reads and
//               writes UTF-8 explicitly.
// why:          each skill must stand alone for installers, so the engine ships as a copy
//               rather than a cross-skill reference; a copy with no guard would let the two
//               skills' applicator instructions silently fork apart (CHANGELOG 0.4.0,
//               SP7/SP8, #42).
// used-by:      scripts/check.mjs (--check); run by hand via `node scripts/gen-engine.mjs`
//               (no npm script); its byte-identical-copy contract is asserted by
//               tests/engine-no-hardcoded-count.test.mjs
// =============================================================================
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = resolve(ROOT, 'skills/think-top3/references/engine.md');
const DST = resolve(ROOT, 'skills/think-random-frameworks/references/engine.md');
const src = readFileSync(SRC, 'utf8');
const check = process.argv.includes('--check');

if (check) {
  let cur = '';
  try { cur = readFileSync(DST, 'utf8'); } catch { /* missing = drift */ }
  if (cur !== src) {
    console.error('gen-engine: skills/think-random-frameworks/references/engine.md is stale - run `node scripts/gen-engine.mjs`.');
    process.exit(1);
  }
  // Tally, not just OK (audit D-06). A byte-identical copy of an EMPTY source would also be
  // "in sync", so report the size actually compared.
  console.log(`gen-engine: OK (engine copy in sync; ${src.length} bytes compared).`);
  process.exit(0);
}

writeFileSync(DST, src, 'utf8');
console.log('gen-engine: wrote skills/think-random-frameworks/references/engine.md');
