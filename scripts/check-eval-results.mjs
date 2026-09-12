#!/usr/bin/env node
// =============================================================================
// check-eval-results.mjs - CLI for the eval-results scorecard pairing + shape gate.
//
// what-it-is:   the CLI for gate layer 15, the eval-results pairing + shape check.
// what-it-does: walks docs/internal/eval-results/ and asserts every scorecard is a paired
//               .md + .json (neither committed alone), and that every trigger/output
//               scorecard JSON carries its totals contract; the rules themselves live in
//               scripts/lib/eval-results-lib.mjs so they stay unit-testable without spawning
//               this CLI.
// why:          a scorecard has shipped without its sidecar before (the 2026-06-19
//               contested-output gap), silently losing half the eval's evidence; this gate
//               turns a dropped sidecar or malformed totals block into a CI failure instead
//               of a merged silence.
// used-by:      scripts/check.mjs (gate layer 15, run via `npm run check`)
//
// Usage: node scripts/check-eval-results.mjs [rootDir]   (default: repo root)
// Exit: 0 = clean; 1 = one or more problems.
// =============================================================================

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
