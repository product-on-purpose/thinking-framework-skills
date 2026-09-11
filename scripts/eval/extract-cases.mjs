#!/usr/bin/env node
// extract-cases.mjs - the deterministic answer-key for the behavioral TRIGGER eval.
// Parses each skill's eval/cases.md into pooled routing cases so that router agents can
// judge them BLIND (without seeing which skill authored a case, removing the bias of an
// agent "defending" its own skill). The harness scores routed-vs-expected afterward.
//
// A "## Should trigger" bullet  -> expected route = the authoring skill.
// A "## Should NOT trigger" bullet names the correct tool as `think-<slug>` in its
//   explanation (or says "unrelated") -> expected route = that named slug, or "none".
// A bullet tagged `[gate]` before its quoted prompt -> type "gate": the authoring skill
//   SHOULD fire, but its correct behavior is something other than a normal run (e.g. ask
//   one clarifying question). That is an OUTPUT-level contract, not a routing one, so a
//   trigger eval cannot score it either way; it is emitted, excluded from scoring, and
//   counted in the scorecard rather than silently dropped or mis-scored as a false fire.
//
// TWO CORPORA (the distinction this file is built around):
//   default      - the 63 shipped FRAMEWORKS (registry). Answers "which framework fits?"
//   --roster     - the INSTALLED surface from manifest.generated.json: 67 skills + 10
//                  commands. Answers "which skill does an agent invoke?" This is the only
//                  mode in which the four meta-skills are scoreable at all, because they
//                  are deliberately absent from the advisor's own recommendable corpus.
//
// Usage:
//   node scripts/eval/extract-cases.mjs                        # all shipped frameworks
//   node scripts/eval/extract-cases.mjs slugA slugB ...        # a subset (the pilot)
//   node scripts/eval/extract-cases.mjs --roster               # every skill, roster corpus
//   node scripts/eval/extract-cases.mjs --roster slugA slugB   # a subset, roster corpus
// Prints a JSON object { cases: [...], summary } to stdout.

import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildRoster, resolveExpected } from '../lib/selection-lib.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..', '..');
const reg = (await import('file://' + join(ROOT, 'frameworks', 'registry.mjs').replace(/\\/g, '/'))).default;

const argv = process.argv.slice(2);
const useRoster = argv.includes('--roster');
const want = argv.filter((a) => !a.startsWith('--'));

const shippedSlugs = reg.frameworks.filter((f) => f.status === 'shipped').map((f) => f.slug);

// The corpus an anti-case's named alternative must exist in to be a scoreable expectation,
// and the default set of skills whose cases.md we read.
let corpus, defaultSlugs, rosterMeta = null;
if (useRoster) {
  const manifest = JSON.parse(readFileSync(join(ROOT, 'manifest.generated.json'), 'utf8'));
  const roster = buildRoster(manifest);
  corpus = roster.slugs;
  defaultSlugs = roster.entries.filter((e) => e.kind === 'skill').map((e) => e.slug);
  rosterMeta = { counts: roster.counts, collisions: roster.collisions };
} else {
  corpus = new Set(shippedSlugs);
  defaultSlugs = shippedSlugs;
}
const slugs = want.length ? want : defaultSlugs;

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
// The tag sits BEFORE the quoted prompt, so neither firstQuoted nor the `after` slice below
// is affected by its presence.
const isGate = (b) => /^\s*-\s+\**\[gate\]/i.test(b);

const cases = [];
let id = 0;
const perSkill = {};
for (const slug of slugs) {
  const p = join(ROOT, 'skills', 'think-' + slug, 'eval', 'cases.md');
  if (!existsSync(p)) { console.error(`(skip ${slug}: no eval/cases.md)`); continue; }
  const md = readFileSync(p, 'utf8');
  perSkill[slug] = { trigger: 0, anti: 0, gate: 0 };

  // A bullet with no quoted prompt is silently unusable as a case. Say so (audit D-06): dropping
  // it quietly shrinks the corpus a published accuracy number is computed over, and the run still
  // reports success. extract-output.mjs already logs its equivalent skips; this matches it.
  for (const b of bullets(section(md, /Should trigger/i))) {
    const prompt = firstQuoted(b);
    if (!prompt) { console.error(`(skip ${slug}: a "Should trigger" bullet has no quoted prompt)`); continue; }
    cases.push({ id: `c${++id}`, prompt, expected: slug, type: 'trigger', source: slug });
    perSkill[slug].trigger++;
  }
  for (const b of bullets(section(md, /Should NOT trigger/i))) {
    const prompt = firstQuoted(b);
    if (!prompt) { console.error(`(skip ${slug}: a "Should NOT trigger" bullet has no quoted prompt)`); continue; }
    if (isGate(b)) {
      // The skill is the right tool here; only its behavior differs. Not routable either way.
      cases.push({ id: `c${++id}`, prompt, expected: slug, type: 'gate', source: slug });
      perSkill[slug].gate++;
      continue;
    }
    // strip the prompt span before looking for the named tool, so a think- inside the prompt is not mistaken for the answer
    const after = b.slice(b.indexOf(`"${prompt}"`) + prompt.length + 2);
    const expected = resolveExpected(namedSkill(after), slug, corpus);
    cases.push({ id: `c${++id}`, prompt, expected, type: 'anti', source: slug });
    perSkill[slug].anti++;
  }
}

const summary = {
  corpus: useRoster ? 'roster' : 'frameworks',
  skills: Object.keys(perSkill).length,
  cases: cases.length,
  trigger: cases.filter((c) => c.type === 'trigger').length,
  anti: cases.filter((c) => c.type === 'anti').length,
  gate: cases.filter((c) => c.type === 'gate').length,
  antiNamed: cases.filter((c) => c.type === 'anti' && c.expected !== 'none').length,
  antiDecline: cases.filter((c) => c.type === 'anti' && c.expected === 'none').length,
  perSkill,
};
if (rosterMeta) summary.roster = rosterMeta;
process.stdout.write(JSON.stringify({ summary, cases }, null, 2) + '\n');
