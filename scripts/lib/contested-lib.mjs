// contested-lib.mjs - pure, zero-dependency validation of ONE contested-lens skill against the
// caveat-first CONTRACT (v0.11.0, resolves DS-01). A contested lens is a famous-but-weak
// framework shipped at its honest low tier where the deficiency must LEAD the SKILL.md and the
// artifact. Two postures:
//   - run_caveat_first: lead with the deficiency, then still produce the (weak) artifact.
//   - warn_redirect: a method tested and found harmful; own the famous name, lead with the
//     controlled-evidence caveat, route to an evidence-based alternative, and do NOT reproduce
//     the discredited artifact as if valid.
//
// Pure + side-effect-free (no fs, no process) so tests/contested-lib.test.mjs can negative-test
// BOTH postures with in-memory fixtures (a late caveat, and a warn-redirect that reproduces the
// harmful artifact, must each be reported). The CLI (scripts/check-contested.mjs) reads the real
// files + registry and calls checkContestedEntry per entry. Sibling to cases-lib.mjs and
// registry-entry-lib.mjs (the established shared-validator precedent).

// A caveat-section heading: the first SKILL.md H2 must match this (the deficiency leads).
const CAVEAT_HEADING = /caveat|before you run|read (this )?first|the evidence (caveat|shows|record)|limitation|what the evidence/i;
// A leading caveat block on the artifact surfaces (a blockquote or a Starlight admonition).
const CAVEAT_BLOCK = /caveat/i;
// A warn-redirect "use this instead" section heading.
const REDIRECT_HEADING = /instead|redirect|evidence-based|use this/i;
// A think-<slug> invocation token (used to confirm a warn-redirect names a real alternative).
const THINK_TOKEN = /\bthink-[a-z0-9-]+\b/g;

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
function firstH2(body) {
  for (const raw of (body || '').split(/\r?\n/)) {
    const m = raw.match(/^##\s+(.+?)\s*$/);
    if (m) return m[1];
  }
  return null;
}
// A caveat block must appear near the TOP of an artifact surface: a "> ...caveat..." blockquote
// or a ":::caution" admonition within the first `maxContentLines` non-title content lines.
function hasCaveatNearTop(text, maxContentLines = 14) {
  const lines = stripFrontmatter(text).split(/\r?\n/);
  let seen = 0;
  for (const raw of lines) {
    const l = raw.trim();
    if (!l) continue;
    if (/^#\s/.test(l)) continue; // the H1 title does not count
    seen++;
    if (seen > maxContentLines) break;
    if (/^:::caution/i.test(l)) return true;
    if (/^>/.test(l) && CAVEAT_BLOCK.test(l)) return true;
  }
  return false;
}
function outputChecksSection(cases) {
  const sec = (cases || '').split(/^##\s+/m).find((p) => /^Output checks/i.test(p));
  return sec || '';
}
function thinkTokensExcept(text, slug) {
  const self = `think-${slug}`;
  return [...new Set((text || '').match(THINK_TOKEN) || [])].filter((t) => t !== self);
}
// The distinctive owner token a branded artifact must carry (the mark itself, before any
// "(owner / ...)" detail): "Cynefin (The Cynefin Co. ...)" -> "Cynefin".
function trademarkToken(tm) {
  if (!tm) return '';
  return String(tm).split(/[(/]/)[0].trim();
}

// Validate ONE contested entry. `entry` carries { slug, posture, caveatFirst, recommendationPolicy,
// branded, trademark }. `files` carries { skillMd, template, example, cases, sidecar, sample } as
// strings (or null when absent). Returns string[] of problems ([] = the contract holds).
export function checkContestedEntry(entry, files) {
  const problems = [];
  const slug = entry.slug;
  const at = `contested ${slug}`;
  const fail = (m) => problems.push(`${at}: ${m}`);

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

  // 1. The caveat must LEAD: the first SKILL.md H2 is the evidence-caveat section.
  const h2 = firstH2(bodyAfterFrontmatter(skillMd));
  if (!h2 || !CAVEAT_HEADING.test(h2)) {
    fail(`SKILL.md first section ${JSON.stringify(h2 || '(none)')} must be the evidence caveat - the deficiency must lead, before "When to Use" / "Instructions".`);
  }

  // 2. The artifact surfaces open with the caveat.
  if (template && !hasCaveatNearTop(template)) fail('references/TEMPLATE.md must open with a caveat block (a "> ...caveat..." line near the top).');
  if (example && !hasCaveatNearTop(example)) fail('references/EXAMPLE.md must open with the caveat.');
  if (sample && !hasCaveatNearTop(sample)) fail('site sample must open with the caveat (a ":::caution" admonition or "> ...caveat..." near the top).');

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

  // 4. warn_redirect: route to an evidence-based shipped alternative; do not reproduce the artifact.
  if (posture === 'warn_redirect') {
    const body = bodyAfterFrontmatter(skillMd);
    const hasRedirectHeading = body.split(/\r?\n/).some((l) => { const m = l.match(/^##\s+(.+)/); return m && REDIRECT_HEADING.test(m[1]); });
    if (!hasRedirectHeading) fail('warn_redirect SKILL.md must have a redirect section (e.g. "## What to do instead").');
    if (thinkTokensExcept(body, slug).length === 0) fail('warn_redirect SKILL.md must name at least one evidence-based shipped alternative (a think-<slug> skill).');
    if (template && thinkTokensExcept(template, slug).length === 0) fail('warn_redirect references/TEMPLATE.md must route to an evidence-based alternative (a think-<slug> skill), not reproduce the discredited artifact.');
    if (example && thinkTokensExcept(example, slug).length === 0) fail('warn_redirect references/EXAMPLE.md must route to an evidence-based alternative (a think-<slug> skill).');
  }

  // 5. branded: the trademark attribution rides every user-facing surface, not just the registry.
  if (entry.branded === true) {
    const token = trademarkToken(entry.trademark);
    const surfaces = { 'SKILL.md': skillMd, 'references/TEMPLATE.md': template, 'references/EXAMPLE.md': example, 'site sample': sample };
    for (const [label, text] of Object.entries(surfaces)) {
      if (text && token && !text.includes(token)) {
        fail(`branded: ${label} must carry the trademark attribution (expected to mention ${JSON.stringify(token)}).`);
      }
    }
  }

  // 6. cross-marker consistency: registry <-> SKILL.md frontmatter <-> skill.meta.yml must agree,
  // so the generators (which read frontmatter / sidecar) cannot drift from the registry SSOT.
  const fm = frontmatter(skillMd);
  if (!/^\s*caveat-first:\s*true\s*$/m.test(fm)) fail('SKILL.md frontmatter metadata must set "caveat-first: true".');
  const fmPosture = (fm.match(/^\s*posture:\s*(\S+)/m) || [])[1];
  if (fmPosture !== posture) fail(`SKILL.md frontmatter posture ${JSON.stringify(fmPosture || null)} must equal the registry posture ${JSON.stringify(posture)}.`);
  const fmPolicy = (fm.match(/^\s*recommendation-policy:\s*(\S+)/m) || [])[1];
  if (fmPolicy !== 'explicit_request_only') fail(`SKILL.md frontmatter must set "recommendation-policy: explicit_request_only" (got ${JSON.stringify(fmPolicy || null)}).`);
  if (sidecar) {
    if (!/^\s*caveat_first:\s*true\s*$/m.test(sidecar)) fail('skill.meta.yml must set "caveat_first: true".');
    const scPosture = (sidecar.match(/^\s*posture:\s*(\S+)/m) || [])[1];
    if (scPosture !== posture) fail(`skill.meta.yml posture ${JSON.stringify(scPosture || null)} must equal the registry posture ${JSON.stringify(posture)}.`);
  }

  return problems;
}
