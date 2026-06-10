#!/usr/bin/env node
// extract-output.mjs - the input for the behavioral OUTPUT eval (artifact quality).
// For each skill, pulls one triggering prompt (the first "Should trigger" case) and the
// skill's own "Output checks" checklist from eval/cases.md. The output-eval workflow then
// runs the skill on the prompt to produce its artifact, and a separate judge scores that
// artifact against these checks. See scripts/eval/README.md.
//
// Usage:
//   node scripts/eval/extract-output.mjs                 # all shipped skills
//   node scripts/eval/extract-output.mjs slugA slugB     # a subset (the pilot)
// Prints { summary, cases:[{skill, prompt, checks:[...]}] } to stdout.

import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const reg = (await import('file://' + join(ROOT, 'frameworks', 'registry.mjs').replace(/\\/g, '/'))).default;

const shipped = reg.frameworks.filter((f) => f.status === 'shipped').map((f) => f.slug);
const want = process.argv.slice(2);
const slugs = want.length ? want : shipped;

function section(md, nameRe) {
  const lines = md.split(/\r?\n/);
  const start = lines.findIndex((l) => /^## /.test(l) && nameRe.test(l));
  if (start === -1) return [];
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) if (/^## /.test(lines[i])) { end = i; break; }
  return lines.slice(start + 1, end);
}
const firstQuoted = (s) => { const m = s.match(/"([^"]+)"/); return m ? m[1].trim() : null; };

const cases = [];
for (const slug of slugs) {
  const p = join(ROOT, 'skills', 'think-' + slug, 'eval', 'cases.md');
  if (!existsSync(p)) { console.error(`(skip ${slug}: no eval/cases.md)`); continue; }
  const md = readFileSync(p, 'utf8');
  const trig = section(md, /Should trigger/i).filter((l) => /^\s*-\s+/.test(l));
  const prompt = trig.length ? firstQuoted(trig[0]) : null;
  const checks = section(md, /Output checks/i)
    .filter((l) => /^\s*-\s+/.test(l))
    .map((l) => l.replace(/^\s*-\s+(\[[ xX]\]\s*)?/, '').trim())
    .filter(Boolean);
  if (!prompt) { console.error(`(skip ${slug}: no trigger prompt)`); continue; }
  if (!checks.length) { console.error(`(skip ${slug}: no output checks)`); continue; }
  cases.push({ skill: slug, prompt, checks });
}

const summary = {
  skills: cases.length,
  totalChecks: cases.reduce((a, c) => a + c.checks.length, 0),
  perSkill: Object.fromEntries(cases.map((c) => [c.skill, c.checks.length])),
};
process.stdout.write(JSON.stringify({ summary, cases }, null, 2) + '\n');
