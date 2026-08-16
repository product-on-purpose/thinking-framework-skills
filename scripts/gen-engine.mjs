#!/usr/bin/env node
// gen-engine.mjs - the shared applicator engine has ONE authored source
// (skills/think-top3/references/engine.md). think-random-frameworks ships a byte-identical
// copy so each skill is self-contained. This copies it and, with --check, fails if the copy is
// stale (a drift guard, wired into scripts/check.mjs). Reads/writes UTF-8 explicitly.
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
