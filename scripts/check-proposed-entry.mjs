#!/usr/bin/env node
// check-proposed-entry.mjs - SP5 C3. Validate ONE proposed framework registry entry against
// frameworks/registry.schema.json BEFORE it is shown to a human, so a malformed proposal can
// never be pasted into frameworks/registry.mjs. Zero-dependency; reuses the same schema-driven
// single-entry logic as the full CI pass via scripts/lib/registry-entry-lib.mjs.
//
// Usage:
//   node scripts/check-proposed-entry.mjs path/to/entry.json
//   cat entry.json | node scripts/check-proposed-entry.mjs -
//
// The input is a single JSON object (the proposed entry). Cross-entry and filesystem invariants
// (slug uniqueness, foldInto resolves to a shipped slug, family in the list, dossier/skill
// existence, source-url shape) are out of scope here and are enforced by scripts/check-registry.mjs
// once the entry is pasted in.

import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateEntry } from './lib/registry-entry-lib.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..'); // scripts/ -> repo root; cwd-independent

function readInput() {
  const arg = process.argv[2];
  if (!arg) {
    console.error('Usage: node scripts/check-proposed-entry.mjs <entry.json | ->');
    process.exit(2);
  }
  if (arg === '-') return readFileSync(0, 'utf8'); // stdin
  return readFileSync(arg, 'utf8');
}

const schema = JSON.parse(readFileSync(resolve(ROOT, 'frameworks', 'registry.schema.json'), 'utf8'));

let entry;
try {
  entry = JSON.parse(readInput());
} catch (err) {
  console.error(`Proposed entry: input is not valid JSON (${err.message}).`);
  process.exit(1);
}

const problems = validateEntry(entry, schema);
if (problems.length) {
  console.error(`Proposed entry: ${problems.length} problem(s):\n`);
  for (const p of problems) console.error(`  - ${p}`);
  console.error('\nFix the proposed entry and re-run before showing it to a human.');
  process.exit(1);
}
console.log('Proposed entry: OK (schema-valid; cross-entry and filesystem invariants enforced later by check-registry.mjs).');
process.exit(0);
