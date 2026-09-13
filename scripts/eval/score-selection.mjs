#!/usr/bin/env node
// =============================================================================
// score-selection.mjs - finalize a skill-selection run into committed scorecards.
//
// what-it-is:   the commit path for the SKILL-SELECTION eval, the sibling of finalize.mjs.
// what-it-does: scores a routed run, writes the paired .md + .json under
//               docs/internal/eval-results/, records provenance (model, corpus, sampling,
//               gate exclusions) and the guardrail-6 command-pick tally, and stamps ONLY
//               the skills the run actually measured.
// why:          it reuses finalize.buildArtifacts so the paired artifacts cannot drift - the exact
//               failure finalize.mjs was introduced to end - while owning what this eval adds.
//               The scoped stamping matters: finalize's default walks the 63 registry
//               frameworks, so finalizing a meta-skill run through it would re-date 63
//               sidecars the run never looked at.
// used-by:      run by hand after the skill-selection workflow; see scripts/eval/README.md
//
// The sibling of finalize.mjs for the roster corpus. It deliberately REUSES
// finalize.buildArtifacts (so the paired .md/.json can never drift - the exact failure
// finalize.mjs was introduced to end) and adds only what this eval owns:
//
//   - provenance: model, corpus, sampling, gate exclusions, roster counts. A number with
//     no model recorded can only ever be re-measured, not reproduced; gate layer 15
//     requires provenance.model + provenance.corpus for this eval kind.
//   - the guardrail-6 tally: how often an always-loaded COMMAND took the top pick away
//     from a skill. That question is why this instrument exists - the framework trigger
//     eval routes against recommendable.json, which the commands never touched, so it
//     cannot see command interference at all.
//   - stamping EXACTLY the skills this run measured. finalize's default walks the 63
//     registry frameworks, which this run never looked at.
//
// Usage:
//   node scripts/eval/score-selection.mjs <YYYY-MM-DD> <cases.json> <routed.json> \
//        --model <id> [--sampling <text>] [--stamp a,b,c | --no-stamp] [--note <text>] [--dry-run]
// =============================================================================

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildArtifacts } from './finalize.mjs';
import { stampMeta } from './stamp-meta.mjs';
import { buildRoster, tallyCommandPicks } from '../lib/selection-lib.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const META_SKILLS = ['framework-advisor', 'top3', 'random-frameworks', 'research-framework'];

const argv = process.argv.slice(2);
const flag = (name) => { const i = argv.indexOf(name); return i === -1 ? null : argv[i + 1]; };
const positional = argv.filter((a, i) => !a.startsWith('--') && !(i > 0 && argv[i - 1].startsWith('--')));
const [date, casesPath, routedPath] = positional;
const model = flag('--model');

if (!/^\d{4}-\d{2}-\d{2}$/.test(date || '') || !casesPath || !routedPath || !model) {
  console.error('Usage: node scripts/eval/score-selection.mjs <YYYY-MM-DD> <cases.json> <routed.json> --model <id> [--sampling <text>] [--stamp a,b,c | --no-stamp] [--note <text>] [--dry-run]');
  process.exit(2);
}

const readJson = (p) => JSON.parse(readFileSync(resolve(ROOT, p), 'utf8'));
const casesDoc = readJson(casesPath);
const cases = casesDoc.cases || casesDoc;
const routedRaw = readJson(routedPath);
const routes = routedRaw.routes || routedRaw;

const roster = buildRoster(JSON.parse(readFileSync(join(ROOT, 'manifest.generated.json'), 'utf8')));
const collisionSet = new Set(roster.collisions);
const picks = tallyCommandPicks(cases, routes, collisionSet);
const gateCases = cases.filter((c) => c.type === 'gate');

const provenance = {
  model,
  corpus: 'roster',
  rosterCounts: roster.counts,
  rosterCollisions: roster.collisions,
  sampling: flag('--sampling') || 'all cases supplied',
  casesSupplied: cases.length,
  gateExcluded: gateCases.length,
  commandPicks: { onTrigger: picks.onTrigger, onAnti: picks.onAnti, total: picks.total, collisionNormalized: picks.normalized },
};

// A scorecard that was re-scored from stored routes rather than produced by a fresh run has to
// say so ON ITS FACE, or the date at the top silently claims more than the artifact earned.
// Lands in the .json (so it is assertable) and at the TOP of the .md (so it is unmissable).
const note = flag('--note');
if (note) provenance.note = note;

const arts = buildArtifacts({
  date,
  prefix: 'skill-selection',
  trigger: { cases, routedRaw, generated: 'SKILL-SELECTION eval', title: 'Skill-selection eval', provenance },
});

// The two things a reader of this scorecard must not have to reconstruct: what the corpus
// was, and whether a command stole a pick. Both go in the .md, not only the .json.
// `null` means "omit this block"; '' is a real blank line and must survive.
const blocks = [
  note ? `> **Corrected scorecard.** ${note}` : null,
  '## What this scorecard measures (and what it does not)',
  `Corpus: the **installed roster** - ${roster.counts.skills} skills + ${roster.counts.commands} commands (\`manifest.generated.json\`), each presented to the router as name + description only, which is all an agent actually sees.`,
  'This is NOT the framework-routing eval. That one routes against `recommendable.json` (the 63 shipped frameworks) and answers "which framework fits this situation?". This one answers "which installed skill would an agent invoke?" - the question the meta-skills\' trigger contracts actually make, and the only one that can see command interference.',
  `Model: \`${model}\`. Sampling: ${provenance.sampling}. Cases supplied: ${cases.length}.`,
  `### Command interference (guardrail 6): ${picks.total} command pick(s)`,
  'The nine recipe commands plus `think-research-framework` are always-loaded description surface. Guardrail 6 asks whether adding them degraded skill selection; the framework trigger eval **cannot** answer that, because it routes against a corpus the commands never touched. Here they compete directly.',
  picks.total === 0
    ? '_No command took the top pick on any scored case. The added command surface did not steal a selection._'
    : [
        `- On trigger cases (a skill was the right answer): **${picks.onTrigger}**`,
        `- On anti cases: **${picks.onAnti}**`,
        '',
        ...picks.examples.map((e) => `- \`${e.id}\` (${e.type}) wanted \`${e.want}\`, got \`${e.got}\``),
      ].join('\n'),
  picks.normalized
    ? `${picks.normalized} pick(s) of \`command:research-framework\` were normalized to the skill \`research-framework\`: it ships as both a skill and a command, so the two are the same capability and counting them apart would manufacture a miss that did not happen.`
    : null,
  gateCases.length ? `### Excluded from every figure above: ${gateCases.length} gate case(s)` : null,
  gateCases.length ? gateCases.map((c) => `- \`${c.id}\` (${c.source}): "${c.prompt.slice(0, 90)}"`).join('\n') : null,
  gateCases.length
    ? 'A gate case is one where the authoring skill IS the right tool but its correct behavior is not a normal run (e.g. ask exactly one clarifying question). That is an output-level contract a routing eval cannot judge in either direction, so it is excluded rather than scored. Counting one as an anti-case would report correct behavior as a false fire.'
    : null,
];
const preamble = '\n' + blocks.filter((b) => b !== null).join('\n\n') + '\n\n';

// Splice the preamble in ABOVE the headline figures, so nobody reads "trigger accuracy"
// without first reading which corpus produced it.
for (const a of arts) {
  if (!a.path.endsWith('.md')) continue;
  const lines = a.content.split('\n');
  const cut = lines.findIndex((l) => l.startsWith('- **Trigger accuracy'));
  a.content = cut === -1
    ? a.content + preamble
    : lines.slice(0, cut).join('\n') + preamble + lines.slice(cut).join('\n');
}

const dry = argv.includes('--dry-run');
if (!dry) for (const a of arts) writeFileSync(resolve(ROOT, a.path), a.content, 'utf8');

let stampNote = 'skipped (--no-stamp)';
if (!argv.includes('--no-stamp')) {
  const slugs = (flag('--stamp') || META_SKILLS.join(',')).split(',').map((s) => s.trim()).filter(Boolean);
  if (dry) {
    stampNote = `would stamp ${slugs.length}: ${slugs.join(', ')}`;
  } else {
    const { stamped, skipped } = await stampMeta(date, 'trigger', ROOT, slugs);
    stampNote = `trigger_eval_status -> measured-${date} on ${stamped} skill(s) (skipped ${skipped}): ${slugs.join(', ')}`;
  }
}

console.log(`score-selection: ${dry ? '[dry run] would write' : 'wrote'}\n  ` + arts.map((a) => a.path).join('\n  '));
console.log(`score-selection: command picks ${picks.total} (trigger ${picks.onTrigger}, anti ${picks.onAnti}); gate excluded ${gateCases.length}`);
console.log(`score-selection: stamps ${stampNote}`);
