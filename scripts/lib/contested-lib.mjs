// contested-lib.mjs - pure, zero-dependency validation of ONE contested-lens skill against the
// caveat-first CONTRACT (v0.11.0, resolves DS-01). A contested lens is a famous-but-weak
// framework shipped at its honest low tier where the deficiency must LEAD the SKILL.md and the
// artifact. Two postures:
//   - run_caveat_first: lead with the deficiency, then still produce the (weak) artifact.
//   - warn_redirect: a method tested and found harmful; own the famous name, lead with the
//     controlled-evidence caveat, route to an evidence-based alternative, and do NOT reproduce
//     the discredited artifact as if valid.
//
// SCOPE NOTE (read this): this is a STRUCTURAL gate. It enforces that the caveat LEADS and is
// evidence-bearing (not a bare keyword, not an endorsement, not a decoy hidden in a code fence),
// that a warn_redirect routes to a REAL shipped non-contested skill and ships no tabular artifact,
// and that the marker agrees across registry / frontmatter / sidecar. It deliberately raises the
// bar well above "contains the word caveat", but it cannot judge semantic honesty itself - that is
// the job of the mandated adversarial evidence-honesty pass (spec "Definition of done"). The two
// layers are complementary: structure here, meaning there.
//
// Pure + side-effect-free (no fs, no process) so tests/contested-lib.test.mjs can negative-test
// both postures and the bypass classes. The CLI (scripts/check-contested.mjs) reads the real files
// + registry and calls checkContestedEntry per entry. Sibling to cases-lib.mjs / registry-entry-lib.mjs.

// A caveat-section heading: the first SKILL.md H2 must match this (the deficiency leads).
const CAVEAT_HEADING = /caveat|before you run|read (this )?first|the evidence (caveat|shows|record)|limitation|what the evidence/i;
// A leading caveat block on the artifact surfaces (a blockquote or a Starlight admonition).
const CAVEAT_BLOCK = /caveat/i;
// A warn-redirect "use this instead" section heading.
const REDIRECT_HEADING = /instead|redirect|evidence-based|use this/i;
// A think-<slug> invocation token (used to confirm a warn-redirect names a real alternative).
const THINK_TOKEN = /\bthink-[a-z0-9-]+\b/g;
// An evidence signal a real caveat carries: a citation year, an explicit tier, or study language.
// "We ran out of caveats, enjoy the grid" and a one-word "ok" both lack this and are rejected.
const EVIDENCE_TOKEN = /\b(19|20)\d{2}\b|\btier\b|\b(controlled|randomi[sz]ed|trial|trials|study|studies|evidence|undertested|untested|cargo[- ]cult)\b/i;
// Endorsement / dismissal language a caveat must NOT contain (it would invert the caveat's purpose).
const DISHONEST = /\breliably improves\b|\bbest[- ]in[- ]class\b|\bgold[- ]standard\b|\bproven\b|\bno caveats?\b|\bcaveat[- ]free\b|nothing to worry|none worth|not affiliated/i;

function frontmatter(md) {
  const m = (md || '').match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return m ? m[1] : '';
}
function bodyAfterFrontmatter(md) {
  const m = (md || '').match(/^---\r?\n[\s\S]*?\r?\n---\r?\n([\s\S]*)$/);
  return m ? m[1] : (md || '');
}
function stripFrontmatter(text) {
  const lines = (text || '').split(/\r?\n/);
  if (lines[0] && lines[0].trim() === '---') {
    const end = lines.indexOf('---', 1);
    if (end > 0) return lines.slice(end + 1).join('\n');
  }
  return text || '';
}
// Blank out fenced code blocks and HTML comments so a decoy heading/section planted inside one
// cannot satisfy a "leads with..." check (a fence/comment never renders as a real section).
function stripFencesAndComments(text) {
  const lines = (text || '').split(/\r?\n/);
  const out = [];
  let inFence = false, fenceTok = '', inComment = false;
  for (const raw of lines) {
    const t = raw.trim();
    if (inComment) { if (t.includes('-->')) inComment = false; out.push(''); continue; }
    if (/^<!--/.test(t)) { if (!t.includes('-->')) inComment = true; out.push(''); continue; }
    const fm = t.match(/^(```+|~~~+)/);
    if (inFence) { if (fm && t.startsWith(fenceTok)) { inFence = false; fenceTok = ''; } out.push(''); continue; }
    if (fm) { inFence = true; fenceTok = fm[1]; out.push(''); continue; }
    out.push(raw);
  }
  return out.join('\n');
}
function firstH2(body) {
  for (const raw of stripFencesAndComments(body).split(/\r?\n/)) {
    const m = raw.match(/^##\s+(.+?)\s*$/);
    if (m) return m[1];
  }
  return null;
}
// Where the caveat heading sits relative to the body's leading prose: is the FIRST H2 the caveat,
// how many non-title content lines precede it (a long promotional preamble buries the caveat), and
// what that preamble says (it must not itself be an endorsement). Fence/comment-aware.
function caveatHeadingInfo(body) {
  const lines = stripFencesAndComments(body).split(/\r?\n/);
  let content = 0;
  const pre = [];
  for (const l of lines) {
    const h = l.match(/^##\s+(.+?)\s*$/);
    if (h) {
      if (CAVEAT_HEADING.test(h[1])) return { found: true, contentLines: content, preText: pre.join('\n'), heading: h[1] };
      return { found: false, heading: h[1] };
    }
    if (l.trim() && !/^#\s/.test(l)) { content++; pre.push(l); }
  }
  return { found: false, heading: null };
}
// The body of the leading caveat section: from the first caveat H2 to the next H2 (fence-aware).
function leadingCaveatSection(body) {
  const lines = stripFencesAndComments(body).split(/\r?\n/);
  let i = 0;
  for (; i < lines.length; i++) { const m = lines[i].match(/^##\s+(.+)/); if (m && CAVEAT_HEADING.test(m[1])) break; }
  if (i >= lines.length) return null; // no caveat heading at all
  const out = [];
  for (let j = i + 1; j < lines.length; j++) { if (/^##\s+/.test(lines[j])) break; out.push(lines[j]); }
  return out.join('\n').trim();
}
function hasRedirectHeading(body) {
  return stripFencesAndComments(body).split(/\r?\n/).some((l) => { const m = l.match(/^##\s+(.+)/); return m && REDIRECT_HEADING.test(m[1]); });
}
// Return the text of the leading caveat block on an artifact surface (the near-top "> ..." blockquote
// or ":::caution" admonition), or null. Used to require it carries an evidence signal, not just the word.
function leadingCaveatBlock(text, maxContentLines = 14) {
  const lines = stripFrontmatter(text).split(/\r?\n/);
  let seen = 0;
  for (let k = 0; k < lines.length && seen <= maxContentLines; k++) {
    const l = lines[k].trim();
    if (!l) continue;
    if (/^#\s/.test(l)) continue; // the H1 title does not count
    seen++;
    if (/^:::caution/i.test(l)) {
      // gather until the closing :::
      const block = [l];
      for (let j = k + 1; j < lines.length; j++) { block.push(lines[j]); if (lines[j].trim() === ':::') break; }
      return block.join('\n');
    }
    if (/^>/.test(l) && CAVEAT_BLOCK.test(l)) {
      // gather contiguous blockquote lines
      const block = [l];
      for (let j = k + 1; j < lines.length; j++) { if (/^\s*>/.test(lines[j])) block.push(lines[j]); else break; }
      return block.join('\n');
    }
  }
  return null;
}
function outputChecksSection(cases) {
  const sec = (cases || '').split(/^##\s+/m).find((p) => /^Output checks/i.test(p));
  return sec || '';
}
function thinkTokensExcept(text, slug) {
  const self = `think-${slug}`;
  return [...new Set((text || '').match(THINK_TOKEN) || [])].filter((t) => t !== self);
}
function hasMarkdownTable(text) {
  // a header row of pipes immediately followed by a separator row ( |---|---| )
  return /^\s*\|.*\|\s*$\r?\n\s*\|?[\s:|-]*-[\s:|-]*\|?\s*$/m.test(text || '');
}
// The distinctive owner token a branded artifact must carry (the mark itself, before any
// "(owner / ...)" detail): "Cynefin (The Cynefin Co. ...)" -> "Cynefin".
function trademarkToken(tm) {
  if (!tm) return '';
  return String(tm).split(/[(/]/)[0].trim();
}
// Read a flat scalar key from frontmatter/sidecar, tolerant of quotes and a trailing comment.
function scalar(text, key) {
  const m = (text || '').match(new RegExp(`^\\s*${key}:\\s*(.+?)\\s*$`, 'm'));
  if (!m) return null;
  return m[1].replace(/\s+#.*$/, '').replace(/^['"]|['"]$/g, '').trim();
}

// Validate ONE contested entry. `entry` carries { slug, posture, caveatFirst, recommendationPolicy,
// branded, trademark }. `files` carries { skillMd, template, example, cases, sidecar, sample } as
// strings (or null when absent). `opts.validAlternatives` is the Set of think-<slug> invocations
// that may serve as a warn_redirect's evidence-based alternative (shipped AND not contested AND not
// self); when omitted, the redirect-target-is-real check is skipped (e.g. in unit fixtures that do
// not exercise it). Returns string[] of problems ([] = the contract holds).
export function checkContestedEntry(entry, files, opts = {}) {
  const problems = [];
  const slug = entry.slug;
  const at = `contested ${slug}`;
  const fail = (m) => problems.push(`${at}: ${m}`);
  const validAlternatives = opts.validAlternatives || null;

  const posture = entry.posture;
  if (posture !== 'run_caveat_first' && posture !== 'warn_redirect') {
    fail(`registry posture must be run_caveat_first or warn_redirect (got ${JSON.stringify(posture)}).`);
    return problems;
  }
  if (entry.recommendationPolicy !== 'explicit_request_only') {
    fail(`registry recommendationPolicy must be explicit_request_only (got ${JSON.stringify(entry.recommendationPolicy)}).`);
  }

  const { skillMd, template, example, cases, sidecar, sample } = files || {};
  if (!skillMd) { fail('missing skills/think-' + slug + '/SKILL.md.'); return problems; }
  if (!template) fail('missing references/TEMPLATE.md.');
  if (!example) fail('missing references/EXAMPLE.md.');
  if (!cases) fail('missing eval/cases.md.');
  if (!sidecar) fail('missing skill.meta.yml.');
  if (!sample) fail(`missing site sample (site/src/content/docs/samples/${slug}.md).`);

  const body = bodyAfterFrontmatter(skillMd);

  // 1. The caveat must LEAD: the first SKILL.md H2 (outside fences/comments) is the caveat section,
  //    it is not buried under a long preamble, the preamble is not itself an endorsement, and the
  //    section is evidence-bearing and not an endorsement.
  const info = caveatHeadingInfo(body);
  if (!info.found) {
    fail(`SKILL.md first section ${JSON.stringify(info.heading || '(none)')} must be the evidence caveat - the deficiency must lead, before "When to Use" / "Instructions".`);
  } else {
    if (info.contentLines > 6) fail(`SKILL.md buries the caveat under a ${info.contentLines}-line preamble - the deficiency must lead (keep any framing under the caveat to a short intro).`);
    if (DISHONEST.test(info.preText || '')) fail('SKILL.md preamble before the caveat contains endorsement/dismissal language - the framing must not sell the method before the caveat lands.');
    const sec = leadingCaveatSection(body) || '';
    if (sec.length < 80) fail('SKILL.md leading caveat section is too thin to be a real caveat (under 80 chars).');
    if (!EVIDENCE_TOKEN.test(sec)) fail('SKILL.md leading caveat must carry an evidence signal (a citation year, the tier, or study/evidence language), not just the word "caveat".');
    if (DISHONEST.test(sec)) fail('SKILL.md leading caveat contains endorsement/dismissal language (e.g. "reliably improves", "proven", "no caveats") - the deficiency must lead honestly.');
  }

  // 2. The artifact surfaces open with an evidence-bearing caveat block (not a negating weasel block).
  for (const [label, text] of [['references/TEMPLATE.md', template], ['references/EXAMPLE.md', example], ['site sample', sample]]) {
    if (!text) continue;
    const block = leadingCaveatBlock(text);
    if (!block) { fail(`${label} must open with a caveat block (a "> ...caveat..." line or ":::caution" near the top).`); continue; }
    if (!EVIDENCE_TOKEN.test(block)) fail(`${label} caveat block must carry an evidence signal (a citation year, the tier, or study language), not just the word "caveat".`);
    if (DISHONEST.test(block)) fail(`${label} caveat block contains endorsement/dismissal language - it must lead with the real deficiency.`);
  }

  // 3. eval/cases.md Output checks carry the posture's required item.
  const checks = outputChecksSection(cases);
  if (posture === 'run_caveat_first') {
    if (!(/(lead|open|start)s?\b[\s\S]*caveat/i.test(checks) || /caveat[\s\S]*(lead|first)/i.test(checks) || /does not overclaim/i.test(checks))) {
      fail('eval/cases.md Output checks must include a "leads with the caveat, does not overclaim" item.');
    }
  } else {
    if (!(/does not (produce|reproduce|present)[\s\S]*(discredited|matrix|artifact|valid)/i.test(checks) || /redirect/i.test(checks) || /evidence-based alternative/i.test(checks))) {
      fail('eval/cases.md Output checks must include a "does not reproduce the discredited artifact, redirects honestly" item.');
    }
  }

  // 4. warn_redirect: route to a REAL shipped non-contested alternative, and ship NO tabular artifact
  //    (the discredited forms - the ACH disconfirmation matrix, the QCA truth table - are tables; the
  //    honest deliverable is a prose redirect brief).
  if (posture === 'warn_redirect') {
    if (!hasRedirectHeading(body)) fail('warn_redirect SKILL.md must have a redirect section (e.g. "## What to do instead").');
    const named = thinkTokensExcept(body, slug);
    if (named.length === 0) fail('warn_redirect SKILL.md must name at least one evidence-based shipped alternative (a think-<slug> skill).');
    else if (validAlternatives && !named.some((t) => validAlternatives.has(t))) {
      fail(`warn_redirect SKILL.md routes to ${named.join(', ')}, none of which is a shipped, non-contested skill - the redirect must point to a real evidence-based alternative.`);
    }
    if (template && thinkTokensExcept(template, slug).length === 0) fail('warn_redirect references/TEMPLATE.md must route to an evidence-based alternative (a think-<slug> skill), not reproduce the discredited artifact.');
    if (example && thinkTokensExcept(example, slug).length === 0) fail('warn_redirect references/EXAMPLE.md must route to an evidence-based alternative (a think-<slug> skill).');
    for (const [label, text] of [['references/TEMPLATE.md', template], ['references/EXAMPLE.md', example], ['site sample', sample]]) {
      if (text && hasMarkdownTable(text)) fail(`warn_redirect ${label} contains a markdown table - a warn-redirect skill must not reproduce the discredited tabular artifact; its deliverable is the prose redirect brief.`);
    }
  }

  // 5. branded: the trademark attribution must ride the LEADING caveat (the spec's IP posture), not
  //    merely appear somewhere in the file, and not be a denial.
  if (entry.branded === true) {
    const token = trademarkToken(entry.trademark);
    const skillCaveat = leadingCaveatSection(body) || '';
    const surfaces = [['SKILL.md leading caveat', skillCaveat], ['references/TEMPLATE.md caveat block', leadingCaveatBlock(template) || ''], ['references/EXAMPLE.md caveat block', leadingCaveatBlock(example) || ''], ['site sample caveat block', leadingCaveatBlock(sample) || '']];
    for (const [label, text] of surfaces) {
      if (token && !text.includes(token)) fail(`branded: ${label} must carry the trademark attribution (expected to mention ${JSON.stringify(token)} in the leading caveat).`);
    }
  }

  // 6. cross-marker consistency: registry <-> SKILL.md frontmatter <-> skill.meta.yml must agree
  // (tolerant of quotes and a trailing comment), so the generators cannot drift from the registry SSOT.
  const fm = frontmatter(skillMd);
  if (scalar(fm, 'caveat-first') !== 'true') fail('SKILL.md frontmatter metadata must set "caveat-first: true".');
  const fmPosture = scalar(fm, 'posture');
  if (fmPosture !== posture) fail(`SKILL.md frontmatter posture ${JSON.stringify(fmPosture)} must equal the registry posture ${JSON.stringify(posture)}.`);
  const fmPolicy = scalar(fm, 'recommendation-policy');
  if (fmPolicy !== 'explicit_request_only') fail(`SKILL.md frontmatter must set "recommendation-policy: explicit_request_only" (got ${JSON.stringify(fmPolicy)}).`);
  if (sidecar) {
    if (scalar(sidecar, 'caveat_first') !== 'true') fail('skill.meta.yml must set "caveat_first: true".');
    const scPosture = scalar(sidecar, 'posture');
    if (scPosture !== posture) fail(`skill.meta.yml posture ${JSON.stringify(scPosture)} must equal the registry posture ${JSON.stringify(posture)}.`);
  }

  return problems;
}
