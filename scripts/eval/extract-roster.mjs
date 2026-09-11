#!/usr/bin/env node
// extract-roster.mjs - emit the roster an agent actually sees, for the SKILL-SELECTION eval.
//
// Source of truth is manifest.generated.json (what an installer loads), NOT skills/*/SKILL.md
// frontmatter (what authors write). The gate keeps the two in agreement; deriving from the
// manifest is what makes this the installed surface rather than the authored one.
//
// Each entry carries ONLY `id` + `description` in the emitted router corpus: that is the
// whole of what an agent weighs when choosing a tool. Commands are kind-qualified
// (`command:<slug>`) so a command pick is a distinct string from a skill pick - the
// property that makes command interference (guardrail 6) measurable at scoring time.
//
// Usage:
//   node scripts/eval/extract-roster.mjs            # full roster JSON (with metadata) to stdout
//   node scripts/eval/extract-roster.mjs --corpus   # just the {id, kind, description} array
// Exit: 0 clean; 1 if the manifest has entries an agent could not act on.

import { readFileSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildRoster } from '../lib/selection-lib.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..', '..');

const manifest = JSON.parse(readFileSync(join(ROOT, 'manifest.generated.json'), 'utf8'));
const { entries, collisions, counts, problems } = buildRoster(manifest);

if (problems.length) {
  console.error(`extract-roster: ${problems.length} problem(s):`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}

const corpus = entries.map((e) => ({ id: e.id, kind: e.kind, description: e.description }));

if (process.argv.includes('--corpus')) {
  process.stdout.write(JSON.stringify(corpus, null, 2) + '\n');
} else {
  process.stdout.write(JSON.stringify({ counts, collisions, corpus }, null, 2) + '\n');
}
