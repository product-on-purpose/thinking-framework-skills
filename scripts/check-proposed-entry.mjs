#!/usr/bin/env node
// =============================================================================
// check-proposed-entry.mjs - validate ONE proposed framework-registry entry before review.
//
// what-it-is:   the CLI for SP5 C3, the proposed-entry pre-validator used by the
//               think-research-framework research subagent.
// what-it-does: validates a single proposed frameworks/registry.mjs entry (a JSON file path,
//               or `-` for stdin) against frameworks/registry.schema.json, reusing the same
//               schema-driven single-entry logic as the full CI pass
//               (scripts/lib/registry-entry-lib.mjs). Cross-entry and filesystem invariants
//               (slug uniqueness, foldInto resolving to a shipped slug, family membership,
//               dossier/skill existence, source-url shape) are out of scope here and are
//               enforced later by scripts/check-registry.mjs once the entry is pasted in.
// why:          the research subagent proposes entries but never writes frameworks/registry.mjs
//               itself (a human pastes it in); this lets the subagent catch a malformed
//               proposal itself, before it is ever shown to the human who has to review it.
// used-by:      agents/think-research-framework.md (the research subagent's one allowed bash
//               command, run against a scratch JSON file)
//
// Usage:
//   node scripts/check-proposed-entry.mjs path/to/entry.json
//   cat entry.json | node scripts/check-proposed-entry.mjs -
// =============================================================================

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
console.log('Proposed entry: OK (single-entry schema-valid; the stricter source-url http shape, cross-entry, and filesystem invariants are enforced later by check-registry.mjs).');
process.exit(0);
