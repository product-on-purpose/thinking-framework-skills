#!/usr/bin/env node
// stamp-meta.mjs - after a trigger-eval run, stamp each shipped skill's
// skill.meta.yml `quality.trigger_eval_status` from "not-run" to "measured-<date>",
// so the per-skill placeholder reflects reality and points at the dated scorecard
// under docs/internal/eval-results/<date>-trigger-eval.{md,json}.
//
// Usage: node scripts/eval/stamp-meta.mjs <YYYY-MM-DD>

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const date = process.argv[2];
if (!/^\d{4}-\d{2}-\d{2}$/.test(date || '')) { console.error('Usage: node scripts/eval/stamp-meta.mjs <YYYY-MM-DD>'); process.exit(2); }

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const reg = (await import('file://' + join(ROOT, 'frameworks', 'registry.mjs').replace(/\\/g, '/'))).default;

let stamped = 0, skipped = 0;
for (const f of reg.frameworks.filter((e) => e.status === 'shipped')) {
  const p = join(ROOT, 'skills', 'think-' + f.slug, 'skill.meta.yml');
  if (!existsSync(p)) { skipped++; continue; }
  const s = readFileSync(p, 'utf8');
  if (!/trigger_eval_status:/.test(s)) { skipped++; continue; }
  const next = s.replace(/(trigger_eval_status:[ \t]*)[^\n\r]*/, `$1measured-${date}`);
  if (next !== s) { writeFileSync(p, next); stamped++; } else skipped++;
}
console.log(`stamp-meta: trigger_eval_status -> measured-${date} on ${stamped} skill(s) (skipped ${skipped}).`);
