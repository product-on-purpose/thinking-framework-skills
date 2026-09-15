// =============================================================================
// score-lib.mjs - pure scoring of behavioral eval runs.
//
// what-it-is:   the scoring core shared by both behavioral evals (trigger routing and
//               output quality).
// what-it-does: exports scoreTrigger (joins routed picks against the trigger/anti-case
//               answer key from extract-cases.mjs) and scoreOutput (aggregates per-skill
//               judge results from output.workflow.mjs), each rendering a markdown
//               scorecard plus a companion JSON summary.
// why:          both functions are a pure function of their input (no fs, no randomness) -
//               the eval's non-determinism lives in PRODUCING the routed/results inputs,
//               not in scoring them - so factoring scoring out here is what makes a
//               golden-file regression test possible and keeps score.mjs, score-output.mjs,
//               and finalize.mjs from re-implementing the same math three ways.
// used-by:      scripts/eval/finalize.mjs; scripts/eval/reconstruct-contested-output.mjs;
//               scripts/eval/score-output.mjs; scripts/eval/score.mjs;
//               tests/score-lib.test.mjs
//
// See scripts/eval/README.md for the full harness flow.
// =============================================================================

/**
 * Format a pass ratio as a percentage that NEVER overstates.
 *
 * `100%` is reserved for n === d. Anything short of that FLOORS to one decimal, so 399/400 reads
 * 99.7% and never 100%.
 *
 * This existed as `(100*n/d).toFixed(0)` in two places and rounded any ratio at or above 99.5% up
 * to a flat `100%`. It put "Overall: 100% of checks passed (428/429)" into the committed
 * 2026-06-25 output scorecard and "Anti no-false-fire: 100% (399/400)" into the 2026-09-10
 * skill-selection scorecard - and from the first of those, onto the public trust page, where it
 * read "100% of checks passed" two cards above the card admitting the miss. That is the one
 * rounding direction a library whose entire pitch is honest measurement cannot take, and a
 * generator that takes it will re-introduce the claim on every future run.
 *
 * Floor rather than round, deliberately: for a pass rate, rounding down understates and rounding
 * up overstates, and only one of those is a lie in the direction that matters here.
 */
export function formatPct(n, d) {
  if (!d) return 'n/a';
  if (n === d) return '100%';
  // Floor to one decimal, then drop a trailing `.0` so a clean ratio still reads `75%` rather than
  // `75.0%`. The decimal appears exactly when there is one to report, which is also the only case
  // where dropping it could have overstated.
  const floored = Math.floor((100 * n / d) * 10) / 10;
  return Number.isInteger(floored) ? `${floored}%` : `${floored.toFixed(1)}%`;
}

export function scoreTrigger(cases, routedRaw, opts = {}) {
  // `gate` cases are excluded from scoring in BOTH directions: the authoring skill is the
  // right tool, only its behavior differs (e.g. ask one clarifying question), which is an
  // OUTPUT contract a routing eval cannot judge. Counting one as an anti-case would report
  // correct behavior as a false fire. The caller reports how many were excluded.
  const scored = (cases || []).filter((c) => c.type !== 'gate');
  const routes = routedRaw.routes || routedRaw;
  const byId = new Map(routes.map((r) => [r.id, r]));
  const per = {};
  const ensure = (s) => (per[s] ||= { trig: 0, trigHit: 0, trigSoft: 0, anti: 0, antiNoFire: 0, antiNamed: 0, antiNamedHit: 0, miss: [], fire: [] });
  let unrouted = 0;
  for (const c of scored) {
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
  const pct = formatPct;

  let md = `# ${opts.title || 'Trigger eval'} scorecard\n\n`;
  md += `Cases: ${scored.length} (${tTrig} trigger, ${tAnti} anti; ${tNamed} of the anti cases name a specific alternative) across ${skills.length} skills. Unrouted: ${unrouted}.\n\n`;
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
    generated: opts.generated || 'TRIGGER eval', cases: scored.length,
    totals: { trigger: tTrig, anti: tAnti, antiNamed: tNamed, unrouted,
      triggerTop1: tTrigHit, triggerTop3: tTrigSoft, antiNoFire: tNoFire, antiRightAlt: tNamedHit,
      triggerTop1Pct: tTrig ? +(100 * tTrigHit / tTrig).toFixed(1) : null,
      antiNoFirePct: tAnti ? +(100 * tNoFire / tAnti).toFixed(1) : null,
      antiRightAltPct: tNamed ? +(100 * tNamedHit / tNamed).toFixed(1) : null,
      falseFires: fires.length },
    perSkill: Object.fromEntries(skills.map((s) => [s, per[s]])),
  };
  if (opts.provenance) json.provenance = opts.provenance;
  return { md, json };
}

export function scoreOutput(rawResults, opts = {}) {
  const results = (rawResults.results || rawResults).slice().sort((a, b) => a.skill.localeCompare(b.skill));
  const tPassed = results.reduce((a, r) => a + r.passed, 0);
  const tTotal = results.reduce((a, r) => a + r.total, 0);
  const perfect = results.filter((r) => r.passed === r.total).length;
  const pct = formatPct;

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
    // artifactChars is carried through deliberately. The harness measures it on every run and the
    // .md has always printed it, but the .json dropped it - so the one machine-readable record of
    // how big each skill's deliverable actually is existed only as a rendered table. It is the
    // signal the subagent-suitability question needs (a subagent earns its keep when the caller
    // wants the deliverable without the derivation), and a measurement taken and then discarded is
    // the cheapest kind of waste.
    perSkill: Object.fromEntries(results.map((r) => [r.skill, {
      passed: r.passed,
      total: r.total,
      ...(r.artifactChars == null ? {} : { artifactChars: r.artifactChars }),
      fails: (r.perCheck || []).filter((c) => !c.pass).map((c) => c.check),
    }])),
  };
  if (opts.provenance) json.provenance = opts.provenance;
  return { md, json };
}
