// cases-lib.mjs - deterministic parsing + validation of eval/cases.md and SKILL.md sections.
//
// Shared by scripts/eval-cases.mjs (the static eval-case validator wired into the conformance
// gate) and scripts/gen-recommendable.mjs (the advisor corpus enrichment: anti_triggers /
// not_use / overlaps). Section-based markdown parsing matched to the authored shape of
// skills/*/eval/cases.md (Should trigger / Should NOT trigger / Output checks / Value vs ...)
// and skills/*/SKILL.md (When NOT to Use). No dependencies; callers pass UTF-8 text.

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
