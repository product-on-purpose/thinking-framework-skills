// score-lib.mjs - pure scoring of behavioral eval runs. Both functions are a pure
// function of their input (no fs, no randomness): the non-determinism lives in PRODUCING
// the routed/results inputs, not in scoring them. The score.mjs / score-output.mjs CLIs
// and finalize.mjs are the only callers. See scripts/eval/README.md.

export function scoreTrigger(cases, routedRaw) {
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
  return { md, json };
}

export function scoreOutput(rawResults) {
  const results = (rawResults.results || rawResults).slice().sort((a, b) => a.skill.localeCompare(b.skill));
  const tPassed = results.reduce((a, r) => a + r.passed, 0);
  const tTotal = results.reduce((a, r) => a + r.total, 0);
  const perfect = results.filter((r) => r.passed === r.total).length;
  const pct = (n, d) => d ? (100 * n / d).toFixed(0) + '%' : 'n/a';

  let md = `# Output eval scorecard\n\n`;
  md += `Skills evaluated: ${results.length}. Output checks: ${tTotal}.\n\n`;
  md += `**Overall: ${pct(tPassed, tTotal)} of checks passed** (${tPassed}/${tTotal}). Skills passing every check: ${perfect}/${results.length}.\n\n`;
  md += `| Skill | checks passed | artifact chars |\n|---|---|---|\n`;
  for (const r of results) md += `| ${r.skill} | ${pct(r.passed, r.total)} (${r.passed}/${r.total}) | ${r.artifactChars ?? '?'} |\n`;
  const fails = results.flatMap((r) => (r.perCheck || []).filter((c) => !c.pass).map((c) => ({ skill: r.skill, ...c })));
  md += `\n## Failed checks (${fails.length})\n\n`;
  if (!fails.length) md += `_None. Every artifact satisfied every one of its skill's output checks._\n`;
  for (const r of results) {
    const fs = (r.perCheck || []).filter((c) => !c.pass);
    if (!fs.length) continue;
    md += `**${r.skill}** (${r.passed}/${r.total})\n`;
    for (const c of fs) md += `- FAIL: "${c.check.slice(0, 90)}" - ${c.reason}\n`;
    md += `\n`;
  }

  const json = {
    generated: 'OUTPUT eval', skills: results.length,
    totals: { checks: tTotal, passed: tPassed, passPct: tTotal ? +(100 * tPassed / tTotal).toFixed(1) : null, perfectSkills: perfect, failedChecks: fails.length },
    perSkill: Object.fromEntries(results.map((r) => [r.skill, { passed: r.passed, total: r.total, fails: (r.perCheck || []).filter((c) => !c.pass).map((c) => c.check) }])),
  };
  return { md, json };
}
