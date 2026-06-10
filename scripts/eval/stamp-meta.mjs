#!/usr/bin/env node
// stamp-meta.mjs - after an eval run, stamp each shipped skill's skill.meta.yml
// `quality.<which>_eval_status` from "not-run" to "measured-<date>", so the per-skill
// placeholder reflects reality and points at the dated scorecard under
// docs/internal/eval-results/<date>-<which>-eval.{md,json}.
//
// Usage: node scripts/eval/stamp-meta.mjs <YYYY-MM-DD> [trigger|output]   (default trigger)

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const date = process.argv[2];
const which = process.argv[3] || 'trigger';
if (!/^\d{4}-\d{2}-\d{2}$/.test(date || '') || !['trigger', 'output'].includes(which)) {
  console.error('Usage: node scripts/eval/stamp-meta.mjs <YYYY-MM-DD> [trigger|output]'); process.exit(2);
}
const field = which + '_eval_status';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const reg = (await import('file://' + join(ROOT, 'frameworks', 'registry.mjs').replace(/\\/g, '/'))).default;

let stamped = 0, skipped = 0;
const re = new RegExp(`(${field}:[ \\t]*)[^\\n\\r]*`);
for (const f of reg.frameworks.filter((e) => e.status === 'shipped')) {
  const p = join(ROOT, 'skills', 'think-' + f.slug, 'skill.meta.yml');
  if (!existsSync(p)) { skipped++; continue; }
  const s = readFileSync(p, 'utf8');
  if (!re.test(s)) { skipped++; continue; }
  const next = s.replace(re, `$1measured-${date}`);
  if (next !== s) { writeFileSync(p, next); stamped++; } else skipped++;
}
console.log(`stamp-meta: ${field} -> measured-${date} on ${stamped} skill(s) (skipped ${skipped}).`);
