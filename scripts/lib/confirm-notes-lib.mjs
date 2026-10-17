// =============================================================================
// confirm-notes-lib.mjs - find unresolved "confirm before a public claim" notes in dossiers.
//
// what-it-is:   pure helpers behind check-registry.mjs section 12 (the confirm-note ratchet).
// what-it-does: findConfirmNotes counts the notes in one dossier that defer a check until
//               "before any public claim"; checkReviewedRow validates the optional
//               `| **Reviewed** | YYYY-MM-DD |` row of a dossier's metadata table;
//               compareToBaseline turns the library-wide count into gate problems.
// why:          the dossiers carried "should be confirmed ... before any public-facing claim"
//               notes for months, and nothing made anyone act on them. Two figure audits on
//               2026-10-15 cut them from seventeen to ten dossiers by hand. A ratchet keeps the
//               count from growing again and makes every resolution explicit.
// used-by:      scripts/check-registry.mjs (section 12); tests/confirm-notes-lib.test.mjs
// =============================================================================

// A note is unresolved when one sentence carries a verification verb, then "before", then
// "public": "should be confirmed against the primary papers before they appear in any
// public-facing README", "To be primary-source verified before any public claim".
//
// Deliberately narrow. A standing rule such as "do not attach a quantified effect in
// public-facing text" asks for no check, so it is not a pending note. A note is resolved by
// rewriting it as a dated check ("checked against the abstract on 2026-10-17"), which no
// longer matches, and by adding or updating the dossier's Reviewed row in the same edit.
const NOTE = /\b(?:confirm(?:ed)?|re-?check(?:ed)?|verif(?:y|ied))\b[^.]{0,160}?\bbefore\b[^.]{0,60}?\bpublic\b/gi;

/** Every unresolved note in one dossier, as { line, text } (1-based line numbers). */
export function findConfirmNotes(markdown) {
  const out = [];
  String(markdown).split(/\r?\n/).forEach((line, i) => {
    for (const m of line.matchAll(NOTE)) out.push({ line: i + 1, text: m[0] });
  });
  return out;
}

const REVIEWED_ROW = /^\|\s*\*\*Reviewed\*\*\s*\|\s*([^|]*?)\s*\|/m;

/**
 * Validate the optional Reviewed row. Returns a problem string, or null when the row is
 * absent or holds a real ISO date that is not in the future. `today` is YYYY-MM-DD.
 */
export function checkReviewedRow(markdown, today) {
  const m = String(markdown).match(REVIEWED_ROW);
  if (!m) return null;
  const value = m[1];
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return `Reviewed row holds "${value}", not a YYYY-MM-DD date`;
  const d = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(d.getTime()) || d.toISOString().slice(0, 10) !== value) return `Reviewed row holds "${value}", which is not a real date`;
  if (value > today) return `Reviewed row holds ${value}, which is after today (${today})`;
  return null;
}

/**
 * Compare the library-wide note count with the committed baseline. Like the gate's warning
 * count, the baseline is asserted, not copied: a rise fails, and so does a fall that was not
 * written down, so each resolved note lowers the bar for good.
 */
export function compareToBaseline(count, baseline, baselinePath) {
  if (!Number.isInteger(baseline)) return [`confirm notes: ${baselinePath} must hold one integer.`];
  if (count > baseline) {
    return [`confirm notes: ${count} unresolved "confirm before a public claim" note(s), above the baseline of ${baseline} in ${baselinePath}. Resolve the new note with a dated check instead of deferring it.`];
  }
  if (count < baseline) {
    return [`confirm notes: ${count} unresolved note(s), below the baseline of ${baseline}. Lower ${baselinePath} to ${count} so the ratchet keeps the gain.`];
  }
  return [];
}
