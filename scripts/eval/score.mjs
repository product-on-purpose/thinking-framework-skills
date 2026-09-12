#!/usr/bin/env node
// =============================================================================
// score.mjs - CLI: score one TRIGGER eval run into a scorecard.
//
// what-it-is:   the ad-hoc CLI wrapper around scoreTrigger, for inspecting a run before
//               committing it.
// what-it-does: joins the blind router's output (routed.json) against the answer key
//               (cases.json from extract-cases.mjs), prints the markdown scorecard to
//               stdout and the totals to stderr, and writes the companion .json to a
//               scratch sibling of the routed file.
// why:          lets an operator eyeball a run's per-skill accuracy without going through
//               finalize.mjs, the canonical commit path (writes both artifacts straight
//               into docs/internal/eval-results/ and stamps skill.meta.yml); this CLI
//               predates finalize and is kept only for that ad-hoc inspection.
// used-by:      run by hand per scripts/eval/README.md; not imported by other scripts.
// =============================================================================
//
// Metrics (top1 = the router's single best-fit pick):
//   TRIGGER (expected = the authoring skill): top1 == expected (soft: expected in top3).
//   ANTI - two distinct questions, reported separately because they mean different things:
//     - no-false-fire: top1 != the authoring skill. This is the one that matters - did the
//       skill avoid grabbing a wrong-tool / no-tool situation?
//     - right-alternative: for anti cases that NAME a specific alternative slug, top1 == it
//       (a stricter positive-routing check; cases that name no alternative only test no-false-fire).
//   A miss where the router answered "none" but the case named an alternative is NOT a
//   false-fire (the skill still declined); it is flagged separately from a true false-fire.
//
// Usage: node scripts/eval/score.mjs <cases.json> <routed.json>

import { readFileSync, writeFileSync } from 'node:fs';
import { scoreTrigger } from './score-lib.mjs';

const [casesFile, routedFile] = process.argv.slice(2);
if (!casesFile || !routedFile) { console.error('Usage: node scripts/eval/score.mjs <cases.json> <routed.json>'); process.exit(2); }
const cases = JSON.parse(readFileSync(casesFile, 'utf8')).cases;
const routedRaw = JSON.parse(readFileSync(routedFile, 'utf8'));
const { md, json } = scoreTrigger(cases, routedRaw);
process.stdout.write(md);
process.stderr.write('[json] ' + JSON.stringify(json.totals) + '\n');
writeFileSync(routedFile.replace(/routed.*\.json$/, 'scorecard.json'), JSON.stringify(json, null, 2));
