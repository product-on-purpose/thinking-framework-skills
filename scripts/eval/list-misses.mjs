#!/usr/bin/env node
// =============================================================================
// list-misses.mjs - every miss in a committed scorecard, one row each: the input to closing the loop.
//
// what-it-is:   step (a) of the "Close the loop" review in scripts/eval/README.md (roadmap C2-2,
//               SPEC-04 item 5).
// what-it-does: reads one or more scorecard JSONs from docs/internal/eval-results/ and prints every
//               miss: for a trigger or skill-selection scorecard, each false fire, top-1 trigger miss
//               and anti-case that went to the wrong place; for an output scorecard, each failed
//               output check. Exports listMisses() so a test can assert on rows without a file.
// why:          the eval found routing seams for months and nothing turned them into a decision.
//               Each row printed here must end in one of two places: a write-back to the skill's
//               documented boundary (its "When NOT to Use" section), or a classified entry in the
//               README's known-ambiguities note. Never a new "Should NOT trigger" case written to
//               fix a miss: those bullets are published to the router as anti_triggers, so a case
//               added to cure a miss prints its own answer into the catalog it is scored against.
// used-by:      run manually per scripts/eval/README.md; tests/list-misses.test.mjs
// =============================================================================
//
// Usage: node scripts/eval/list-misses.mjs <scorecard.json> [<scorecard.json> ...]

import { readFileSync } from 'node:fs';
import { resolve, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

/** Every miss in one parsed scorecard, as flat rows sorted by skill. */
export function listMisses(card) {
  const rows = [];
  for (const [skill, p] of Object.entries(card?.perSkill || {}).sort(([a], [b]) => a.localeCompare(b))) {
    for (const f of p.fire || []) rows.push({ skill, kind: 'false-fire', want: 'not ' + skill, got: f.got, text: f.prompt });
    for (const m of p.miss || []) rows.push({ skill, kind: m.kind, want: m.want, got: m.got, text: m.prompt });
    for (const check of p.fails || []) rows.push({ skill, kind: 'output-check', want: null, got: null, text: check });
  }
  return rows;
}

const samePath = (a, b) => (process.platform === 'win32' ? a.toLowerCase() === b.toLowerCase() : a === b);
if (process.argv[1] && samePath(resolve(process.argv[1]), fileURLToPath(import.meta.url))) {
  const files = process.argv.slice(2);
  if (!files.length) {
    console.error('Usage: node scripts/eval/list-misses.mjs <scorecard.json> [<scorecard.json> ...]');
    process.exit(2);
  }
  for (const f of files) {
    const card = JSON.parse(readFileSync(resolve(f), 'utf8'));
    const rows = listMisses(card);
    console.log(`\n${basename(f)} (${card.generated || 'unknown kind'}): ${rows.length} miss(es)`);
    for (const r of rows) {
      console.log(r.kind === 'output-check'
        ? `  - ${r.skill} [output-check] failed: ${r.text}`
        : `  - ${r.skill} [${r.kind}] want ${r.want}, got ${r.got}: "${r.text}"`);
    }
  }
}
