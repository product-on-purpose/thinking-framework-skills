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

export function stampField(yamlText, field, date) {
  const re = new RegExp(`^([ \\t]*${field}:[ \\t]*)[^\\n\\r]*`, 'm');
  return re.test(yamlText) ? yamlText.replace(re, `$1measured-${date}`) : yamlText;
}

// Which skills a run is entitled to stamp. An ABSENT list means "every shipped
// framework" (the framework-routing eval's scope). An explicit list means exactly those,
// which is how the skill-selection eval stamps the 4 meta-skills - none of which is a
// registry entry - without touching the 63 frameworks it never measured. An explicit
// EMPTY list stamps nothing: fail-safe, so a miscomputed target set cannot fall back to all.
export function resolveStampTargets(frameworks, slugs) {
  if (slugs === undefined || slugs === null) {
    return (frameworks || []).filter((e) => e.status === 'shipped').map((e) => e.slug);
  }
  return [...slugs];
}

export async function stampMeta(date, which, root, slugs) {
  const field = which + '_eval_status';
  const reg = (await import('file://' + join(root, 'frameworks', 'registry.mjs').replace(/\\/g, '/'))).default;
  let stamped = 0, skipped = 0;
  for (const slug of resolveStampTargets(reg.frameworks, slugs)) {
    const p = join(root, 'skills', 'think-' + slug, 'skill.meta.yml');
    if (!existsSync(p)) { skipped++; continue; }
    const s = readFileSync(p, 'utf8');
    const next = stampField(s, field, date);
    if (next !== s) { writeFileSync(p, next, 'utf8'); stamped++; } else skipped++;
  }
  return { stamped, skipped };
}

// CLI main-guard: only run when invoked directly, never on import (review m4).
// Platform-aware comparison: on Windows the drive letter can differ in case between
// process.argv[1] and import.meta.url, so a strict === would silently return false.
const samePath = (a, b) => (process.platform === 'win32' ? a.toLowerCase() === b.toLowerCase() : a === b);
const invokedDirectly = !!process.argv[1] && samePath(resolve(process.argv[1]), fileURLToPath(import.meta.url));
if (invokedDirectly) {
  const date = process.argv[2];
  const which = process.argv[3] || 'trigger';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date || '') || !['trigger', 'output'].includes(which)) {
    console.error('Usage: node scripts/eval/stamp-meta.mjs <YYYY-MM-DD> [trigger|output]'); process.exit(2);
  }
  const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
  const { stamped, skipped } = await stampMeta(date, which, ROOT);
  console.log(`stamp-meta: ${which}_eval_status -> measured-${date} on ${stamped} skill(s) (skipped ${skipped}).`);
}
