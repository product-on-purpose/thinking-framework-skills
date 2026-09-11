#!/usr/bin/env node
// =============================================================================
// extract-roster.mjs - emit the tool roster an agent actually sees.
//
// what-it-is:   the CLI that turns manifest.generated.json into the router corpus for the
//               skill-selection eval.
// what-it-does: prints every installed skill and command as {id, kind, description}; with
//               --corpus, just that array. Exits 1 if any entry lacks a description.
// why:          the roster must be the INSTALLED surface (what an installer loads), not SKILL.md
//               frontmatter (what authors write), and must carry name + description ONLY -
//               the whole of what an agent weighs. Leaking the advisor's enriched fields
//               would quietly turn this back into the framework-routing eval.
// used-by:      scripts/eval/skill-selection.workflow.mjs (reads the emitted corpus);
//               scripts/eval/score-selection.mjs
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
// =============================================================================

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
