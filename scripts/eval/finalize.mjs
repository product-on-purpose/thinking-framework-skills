#!/usr/bin/env node
// finalize.mjs - the one deterministic step that turns raw eval run outputs into the
// committed scorecards. Writes BOTH the .md and the .json for each kind directly into
// docs/internal/eval-results/ (no scratch sibling, no manual copy: the file that used to
// get dropped is never produced as a loose intermediate), then stamps skill.meta.yml.
//
// Usage:
//   node scripts/eval/finalize.mjs <YYYY-MM-DD> [--prefix <name>] \
//        [--trigger <routed.json> <cases.json>] [--output <results.json>]
// At least one of --trigger / --output is required. Explicit paths only (no auto-discovery).

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { scoreTrigger, scoreOutput } from './score-lib.mjs';
import { stampMeta } from './stamp-meta.mjs';

const OUT_DIR = 'docs/internal/eval-results';

export function buildArtifacts({ date, prefix, trigger, output }) {
  const base = (kind) => `${OUT_DIR}/${date}${prefix ? '-' + prefix : ''}-${kind}-eval`;
  const arts = [];
  if (trigger) {
    const { md, json } = scoreTrigger(trigger.cases, trigger.routedRaw);
    arts.push({ path: `${base('trigger')}.md`, content: md });
    arts.push({ path: `${base('trigger')}.json`, content: JSON.stringify(json, null, 2) + '\n' });
  }
  if (output) {
    const { md, json } = scoreOutput(output.rawResults);
    arts.push({ path: `${base('output')}.md`, content: md });
    arts.push({ path: `${base('output')}.json`, content: JSON.stringify(json, null, 2) + '\n' });
  }
  return arts;
}

// CLI main-guard: only run when invoked directly, never on import.
// Platform-aware comparison: on Windows the drive letter can differ in case between
// process.argv[1] and import.meta.url, so a strict === would silently return false.
const samePath = (a, b) => (process.platform === 'win32' ? a.toLowerCase() === b.toLowerCase() : a === b);
const invokedDirectly = !!process.argv[1] && samePath(resolve(process.argv[1]), fileURLToPath(import.meta.url));
if (invokedDirectly) {
  const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
  const argv = process.argv.slice(2);
  const date = argv[0];
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date || '')) {
    console.error('Usage: node scripts/eval/finalize.mjs <YYYY-MM-DD> [--prefix <name>] [--trigger <routed> <cases>] [--output <results>]');
    process.exit(2);
  }
  const flag = (name) => { const i = argv.indexOf(name); return i === -1 ? null : argv.slice(i + 1); };
  const prefix = (flag('--prefix') || [])[0];
  const readJson = (p) => JSON.parse(readFileSync(resolve(ROOT, p), 'utf8'));

  const opts = { date, prefix };
  const trig = flag('--trigger');
  if (trig) { const [routed, cases] = trig; opts.trigger = { routedRaw: readJson(routed), cases: readJson(cases).cases }; }
  const out = flag('--output');
  if (out) opts.output = { rawResults: readJson(out[0]) };
  if (!opts.trigger && !opts.output) { console.error('finalize: supply --trigger and/or --output'); process.exit(2); }

  const arts = buildArtifacts(opts);
  for (const a of arts) writeFileSync(resolve(ROOT, a.path), a.content, 'utf8');
  if (opts.trigger) await stampMeta(date, 'trigger', ROOT);
  if (opts.output) await stampMeta(date, 'output', ROOT);
  console.log('finalize: wrote\n  ' + arts.map((a) => a.path).join('\n  '));
}
