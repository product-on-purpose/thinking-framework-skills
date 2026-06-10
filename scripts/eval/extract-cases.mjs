#!/usr/bin/env node
// extract-cases.mjs - the deterministic answer-key for the behavioral TRIGGER eval.
// Parses each skill's eval/cases.md into pooled routing cases so that router agents can
// judge them BLIND (without seeing which skill authored a case, removing the bias of an
// agent "defending" its own skill). The harness scores routed-vs-expected afterward.
//
// A "## Should trigger" bullet  -> expected route = the authoring skill.
// A "## Should NOT trigger" bullet names the correct tool as `think-<slug>` in its
//   explanation (or says "unrelated") -> expected route = that named slug, or "none".
//
// Usage:
//   node scripts/eval/extract-cases.mjs                 # all shipped skills
//   node scripts/eval/extract-cases.mjs slugA slugB ... # a subset (the pilot)
// Prints a JSON object { cases: [...], summary } to stdout.

import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..', '..');
const reg = (await import('file://' + join(ROOT, 'frameworks', 'registry.mjs').replace(/\\/g, '/'))).default;

const shippedSlugs = reg.frameworks.filter((f) => f.status === 'shipped').map((f) => f.slug);
const want = process.argv.slice(2);
const slugs = want.length ? want : shippedSlugs;

// section between a "## <name>" heading and the next "## " heading
function section(md, nameRe) {
  const lines = md.split(/\r?\n/);
  const start = lines.findIndex((l) => /^## /.test(l) && nameRe.test(l));
  if (start === -1) return [];
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) if (/^## /.test(lines[i])) { end = i; break; }
  return lines.slice(start + 1, end);
}
const bullets = (ls) => ls.filter((l) => /^\s*-\s+/.test(l));
const firstQuoted = (s) => { const m = s.match(/"([^"]+)"/); return m ? m[1].trim() : null; };
const namedSkill = (s) => { const m = s.match(/`?think-([a-z0-9-]+)`?/); return m ? m[1] : null; };

const cases = [];
let id = 0;
const perSkill = {};
for (const slug of slugs) {
  const p = join(ROOT, 'skills', 'think-' + slug, 'eval', 'cases.md');
  if (!existsSync(p)) { console.error(`(skip ${slug}: no eval/cases.md)`); continue; }
  const md = readFileSync(p, 'utf8');
  perSkill[slug] = { trigger: 0, anti: 0 };

  for (const b of bullets(section(md, /Should trigger/i))) {
    const prompt = firstQuoted(b);
    if (!prompt) continue;
    cases.push({ id: `c${++id}`, prompt, expected: slug, type: 'trigger', source: slug });
    perSkill[slug].trigger++;
  }
  for (const b of bullets(section(md, /Should NOT trigger/i))) {
    const prompt = firstQuoted(b);
    if (!prompt) continue;
    // strip the prompt span before looking for the named tool, so a think- inside the prompt is not mistaken for the answer
    const after = b.slice(b.indexOf(`"${prompt}"`) + prompt.length + 2);
    const named = namedSkill(after);
    const expected = named && named !== slug && shippedSlugs.includes(named) ? named : 'none';
    cases.push({ id: `c${++id}`, prompt, expected, type: 'anti', source: slug });
    perSkill[slug].anti++;
  }
}

const summary = {
  skills: Object.keys(perSkill).length,
  cases: cases.length,
  trigger: cases.filter((c) => c.type === 'trigger').length,
  anti: cases.filter((c) => c.type === 'anti').length,
  antiNamed: cases.filter((c) => c.type === 'anti' && c.expected !== 'none').length,
  antiDecline: cases.filter((c) => c.type === 'anti' && c.expected === 'none').length,
  perSkill,
};
process.stdout.write(JSON.stringify({ summary, cases }, null, 2) + '\n');
