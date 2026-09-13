// =============================================================================
// cases-lib.mjs - deterministic parsing + validation of eval/cases.md and SKILL.md sections.
//
// what-it-is:   the shared markdown-section parser and validator for skills/*/eval/cases.md and
//               skills/*/SKILL.md.
// what-it-does: extracts named `## ...` section bodies, parses their top-level `- ` bullets,
//               derives the anti-triggers / not-use / overlaps signals the advisor corpus needs,
//               and validates that a cases.md carries the required sections with minimum bullet
//               counts and no placeholder (TODO/TBD/FIXME) text.
// why:          eval/cases.md and SKILL.md are hand-authored prose, not structured data, but three
//               separate scripts need to read them the same way; a shared parser keeps the
//               required-section rules and extraction logic in one place instead of each caller
//               re-implementing its own and silently drifting from what the docs actually promise.
// used-by:      scripts/eval-cases.mjs (run by scripts/check.mjs / npm run check);
//               scripts/gen-recommendable.mjs (npm run gen:recommendable);
//               scripts/check-registry.mjs (npm run check:registry); tests/cases-lib.test.mjs
// =============================================================================
//
// Section-based markdown parsing matched to the authored shape of skills/*/eval/cases.md
// (Should trigger / Should NOT trigger / Output checks / Value vs ...) and skills/*/SKILL.md
// (When NOT to Use). No dependencies; callers pass UTF-8 text.

// Return the lines beneath the first `## <heading...>` (case-insensitive prefix match) up to the
// next h1/h2, trimmed. "" if the heading is absent. Prefix match tolerates trailing parentheticals
// like "Should NOT trigger (wrong tool / near-miss)".
export function extractSectionBody(md, heading) {
  const lines = String(md).split(/\r?\n/);
  const want = heading.trim().toLowerCase();
  let start = -1;
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^##\s+(.*)$/);
    if (m && m[1].trim().toLowerCase().startsWith(want)) {
      start = i + 1;
      break;
    }
  }
  if (start === -1) return "";
  const out = [];
  for (let i = start; i < lines.length; i++) {
    if (/^#{1,2}\s/.test(lines[i])) break; // next h1/h2 ends the section
    out.push(lines[i]);
  }
  return out.join("\n").trim();
}

// Top-level `- ` bullets only (ignores nested/indented and non-bullet lines). Strips the marker,
// an optional `[ ]`/`[x]` checkbox, bold `**` markers, and collapses whitespace. Drops empties.
export function parseBullets(sectionBody) {
  const out = [];
  for (const raw of String(sectionBody).split(/\r?\n/)) {
    const m = raw.match(/^\s{0,1}-\s+(?:\[[ xX]\]\s+)?(.*)$/);
    if (!m) continue;
    const text = m[1].replace(/\*\*/g, "").replace(/\s+/g, " ").trim();
    if (text) out.push(text);
  }
  return out;
}

// Negative-signal extractors (registry-shaped fields the SP3 registry will also own).
export function deriveAntiTriggers(casesMd) {
  return parseBullets(extractSectionBody(casesMd, "Should NOT trigger"));
}

export function deriveNotUse(skillMd) {
  return parseBullets(extractSectionBody(skillMd, "When NOT to Use"));
}

// The recommendable skill names that a skill's own "When NOT to Use" section points at - the
// best-effort nearest-neighbor/overlap signal. Empty when the section names no sibling by name.
export function deriveOverlaps(skillMd, knownNames) {
  const body = extractSectionBody(skillMd, "When NOT to Use");
  const names = knownNames instanceof Set ? [...knownNames] : knownNames;
  return [...new Set(names.filter((n) => body.includes(n)))].sort();
}

// Static validator: a list of problem strings ([] = well-formed). Enforces the four authored
// sections' presence + minimum bullet counts, and bans placeholder text.
export function validateCasesDoc(casesMd) {
  const problems = [];
  const required = [
    ["Should trigger", 3],
    ["Should NOT trigger", 3],
    ["Output checks", 1],
  ];
  for (const [name, min] of required) {
    const body = extractSectionBody(casesMd, name);
    if (!body) {
      problems.push(`missing section: "${name}"`);
      continue;
    }
    const n = parseBullets(body).length;
    if (n < min) problems.push(`section "${name}" has ${n} bullet(s), needs >= ${min}`);
  }
  if (/\bTODO\b|\bTBD\b|\bFIXME\b/.test(casesMd)) {
    problems.push("contains a placeholder (TODO/TBD/FIXME)");
  }
  return problems;
}

// Name-safety: think-* tokens in `text` that are not in the known set (unique, order preserved).
export function findUnknownThinkNames(text, knownNames) {
  const known = knownNames instanceof Set ? knownNames : new Set(knownNames);
  const matches = String(text).match(/\bthink-[a-z0-9-]+/g) || [];
  return [...new Set(matches.filter((m) => !known.has(m)))];
}

// The mirror of findUnknownThinkNames. That one mechanizes "never invent a framework name";
// this one mechanizes "never name the real one WITHOUT its slug".
//
// The defect it exists to prevent shipped, silently, for months. An anti-case bullet is
// `- "<prompt>" (<why it is the wrong tool, and what the right one is>)`, and the parenthetical
// is the ANSWER KEY: extract-cases.mjs reads it with `/`?think-([a-z0-9-]+)`?/`, so a redirect
// written in prose - "use premortem", "that is within-case process tracing" - matches nothing and
// resolveExpected falls through to 'none'. The key then asserts that NO tool is right about a
// situation a shipped skill handles, and the eval scores the router against that. Sixteen cases
// across thirteen skills were in this state; re-scoring the stored 2026-09-10 routes against a
// corrected key showed the blind router had already picked the right redirect in 16 of 16, so the
// defect was purely destroying credit (antiRightAlt read 126/141 when it was 142/157).
//
// Two ways an author legitimately clears this, both of which the failure message names:
//   1. redirecting -> write the slug (`think-premortem`), which is what makes it the answer key;
//   2. NOT redirecting -> say the method is `declined`, the library's own word for a method it
//      names in order to refuse (a contested lens under explicit_request_only, which must not
//      fire on a prompt that only describes it). Then 'none' is correct and stays correct.
//
// A bullet naming its OWN skill is never flagged: resolveExpected returns 'none' for
// `named === source` by design, so the prose cannot mislead the key there.
export function findProseNamedRedirects(casesMd, sourceSkillName, knownNames) {
  const known = knownNames instanceof Set ? knownNames : new Set(knownNames);
  const source = String(sourceSkillName || '');
  const out = [];

  for (const bullet of parseBullets(extractSectionBody(String(casesMd), 'Should NOT trigger'))) {
    // An explicit slug anywhere in the bullet means the author has already been unambiguous.
    if (/\bthink-[a-z0-9-]+/.test(bullet)) continue;
    const open = bullet.indexOf('(');
    if (open === -1) continue;
    const why = bullet.slice(open);
    if (/\bdeclined\b/i.test(why)) continue; // named in order to refuse it, not to redirect to it

    for (const name of known) {
      if (name === source) continue;                  // self-mention cannot mislead the key
      const prose = name.replace(/^think-/, '').replace(/-/g, ' ');
      if (prose.length < 7) continue;                 // too short to match as prose without noise
      if (new RegExp(`\\b${prose.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(why)) {
        out.push({ bullet, named: name, prose });
        break;
      }
    }
  }
  return out;
}
