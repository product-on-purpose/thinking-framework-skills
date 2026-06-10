#!/usr/bin/env node
// score.mjs - score a TRIGGER eval run. Joins the blind router output against the answer
// key from extract-cases.mjs and reports per-skill + overall accuracy.
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

import { readFileSync } from 'node:fs';

const [casesFile, routedFile] = process.argv.slice(2);
if (!casesFile || !routedFile) { console.error('Usage: node scripts/eval/score.mjs <cases.json> <routed.json>'); process.exit(2); }

const cases = JSON.parse(readFileSync(casesFile, 'utf8')).cases;
const routedRaw = JSON.parse(readFileSync(routedFile, 'utf8'));
const routes = routedRaw.routes || routedRaw;
const byId = new Map(routes.map((r) => [r.id, r]));

const per = {};
const ensure = (s) => (per[s] ||= { trig: 0, trigHit: 0, trigSoft: 0, anti: 0, antiNoFire: 0, antiNamed: 0, antiNamedHit: 0, miss: [], fire: [] });
let unrouted = 0;

for (const c of cases) {
  const r = byId.get(c.id);
  const top1 = r ? r.top1 : undefined;
  const top3 = (r && r.top3) || [];
  if (!r) unrouted++;
  const p = ensure(c.source);
  if (c.type === 'trigger') {
    p.trig++;
    if (top1 === c.expected) p.trigHit++;
    else p.miss.push({ kind: 'trigger', id: c.id, want: c.expected, got: top1 ?? '(unrouted)', prompt: c.prompt.slice(0, 72) });
    if (top3.includes(c.expected)) p.trigSoft++;
  } else {
    p.anti++;
    const noFire = top1 !== c.source;
    if (noFire) p.antiNoFire++; else p.fire.push({ id: c.id, got: top1, prompt: c.prompt.slice(0, 72) });
    if (c.expected !== 'none') {
      p.antiNamed++;
      if (top1 === c.expected) p.antiNamedHit++;
      else p.miss.push({ kind: noFire ? 'anti-soft' : 'anti-fire', id: c.id, want: c.expected, got: top1 ?? '(unrouted)', prompt: c.prompt.slice(0, 72) });
    }
  }
}

const skills = Object.keys(per).sort();
const sum = (k) => skills.reduce((a, s) => a + per[s][k], 0);
const tTrig = sum('trig'), tTrigHit = sum('trigHit'), tTrigSoft = sum('trigSoft');
const tAnti = sum('anti'), tNoFire = sum('antiNoFire'), tNamed = sum('antiNamed'), tNamedHit = sum('antiNamedHit');
const pct = (n, d) => d ? (100 * n / d).toFixed(0) + '%' : 'n/a';

let md = `# Trigger eval scorecard\n\n`;
md += `Cases: ${cases.length} (${tTrig} trigger, ${tAnti} anti; ${tNamed} of the anti cases name a specific alternative) across ${skills.length} skills. Unrouted: ${unrouted}.\n\n`;
md += `- **Trigger accuracy (top1): ${pct(tTrigHit, tTrig)}** (${tTrigHit}/${tTrig}); soft (in top3): ${pct(tTrigSoft, tTrig)}.\n`;
md += `- **Anti no-false-fire: ${pct(tNoFire, tAnti)}** (${tNoFire}/${tAnti}) - the skill did NOT grab a wrong-tool / no-tool situation. This is the metric that matters.\n`;
md += `- Anti right-alternative: ${pct(tNamedHit, tNamed)} (${tNamedHit}/${tNamed}) - of the anti cases naming a specific alternative, how many routed there (the rest mostly answered "none" on a genuinely trivial prompt, still not a false-fire).\n\n`;
md += `| Skill | trigger top1 | top3 | anti no-fire | anti right-alt |\n|---|---|---|---|---|\n`;
for (const s of skills) {
  const p = per[s];
  md += `| ${s} | ${pct(p.trigHit, p.trig)} (${p.trigHit}/${p.trig}) | ${pct(p.trigSoft, p.trig)} | ${pct(p.antiNoFire, p.anti)} | ${p.antiNamed ? pct(p.antiNamedHit, p.antiNamed) + ' (' + p.antiNamedHit + '/' + p.antiNamed + ')' : 'n/a'} |\n`;
}
const fires = skills.flatMap((s) => per[s].fire.map((f) => ({ s, ...f })));
md += `\n## False-fires (a skill grabbed a wrong-tool situation - the real failure mode): ${fires.length}\n\n`;
for (const f of fires) md += `- **${f.s}** grabbed \`${f.id}\` (got \`${f.got}\`) - "${f.prompt}"\n`;
if (!fires.length) md += `_None. No skill triggered on a situation meant for another tool or no tool._\n`;
md += `\n## Other misses (trigger top1 wrong, or anti routed to "none"/another instead of the named alternative)\n\n`;
for (const s of skills) {
  const ms = per[s].miss.filter((m) => m.kind !== 'anti-fire');
  if (!ms.length) continue;
  md += `**${s}**\n`;
  for (const m of ms) md += `- (${m.kind}) want \`${m.want}\`, got \`${m.got}\` - "${m.prompt}"\n`;
  md += `\n`;
}

const json = {
  generated: 'TRIGGER eval', cases: cases.length,
  totals: { trigger: tTrig, anti: tAnti, antiNamed: tNamed, unrouted,
    triggerTop1: tTrigHit, triggerTop3: tTrigSoft, antiNoFire: tNoFire, antiRightAlt: tNamedHit,
    triggerTop1Pct: tTrig ? +(100 * tTrigHit / tTrig).toFixed(1) : null,
    antiNoFirePct: tAnti ? +(100 * tNoFire / tAnti).toFixed(1) : null,
    antiRightAltPct: tNamed ? +(100 * tNamedHit / tNamed).toFixed(1) : null,
    falseFires: fires.length },
  perSkill: Object.fromEntries(skills.map((s) => [s, per[s]])),
};

process.stdout.write(md);
process.stderr.write('[json] ' + JSON.stringify(json.totals) + '\n');
import('node:fs').then(({ writeFileSync }) => writeFileSync(routedFile.replace(/routed.*\.json$/, 'scorecard.json'), JSON.stringify(json, null, 2)));
