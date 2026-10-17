import { test } from 'node:test';
import assert from 'node:assert/strict';
import { findConfirmNotes, checkReviewedRow, compareToBaseline } from '../scripts/lib/confirm-notes-lib.mjs';

// Pure-function tests with in-memory fixtures, negative-first like the other lib tests.

test('findConfirmNotes: a standing usage rule is not a pending note', () => {
  // The defect this would cause: counting permanent caveats as pending work inflates the
  // baseline with notes that can never be "resolved", so the ratchet stops meaning anything.
  const md = [
    '> **Verification status:** Treat effectiveness as practitioner-reported; do not attach a quantified effect in public-facing text.',
    '> The 2025 study reports a conditional effect; confirm the exact conditions from the source before quoting a number - none is quoted here.',
  ].join('\n');
  assert.deepEqual(findConfirmNotes(md), []);
});

test('findConfirmNotes: a resolved, dated note no longer counts', () => {
  const md = '> On 2026-10-15 the claim was checked against the abstract and rewritten; it is safe for public use.';
  assert.deepEqual(findConfirmNotes(md), []);
});

test('findConfirmNotes: the real pending phrasings each count once, with their line', () => {
  const md = [
    '# Evidence Dossier: X',
    '- A claim. (To be primary-source verified before any public claim; cited here as a humility prompt.)',
    '> **Verification status:** citations were drawn from a secondary synthesis and should be confirmed against the primary papers before they appear in any public-facing README.',
    '> It should be re-checked before any public-facing claim.',
  ].join('\n');
  const notes = findConfirmNotes(md);
  assert.deepEqual(notes.map((n) => n.line), [2, 3, 4]);
});

test('checkReviewedRow: absent is fine; a malformed, impossible or future date is a problem', () => {
  assert.equal(checkReviewedRow('| **Skill** | x |', '2026-10-17'), null);
  assert.equal(checkReviewedRow('| **Reviewed** | 2026-10-17 |', '2026-10-17'), null);
  assert.match(checkReviewedRow('| **Reviewed** | Oct 2026 |', '2026-10-17'), /not a YYYY-MM-DD date/);
  assert.match(checkReviewedRow('| **Reviewed** | 2026-02-30 |', '2026-10-17'), /not a real date/);
  assert.match(checkReviewedRow('| **Reviewed** | 2026-11-01 |', '2026-10-17'), /after today/);
});

test('compareToBaseline: a rise fails, an unrecorded fall fails, equality passes', () => {
  assert.equal(compareToBaseline(11, 11, 'f.txt').length, 0);
  assert.match(compareToBaseline(12, 11, 'f.txt')[0], /above the baseline of 11/);
  assert.match(compareToBaseline(10, 11, 'f.txt')[0], /Lower f\.txt to 10/);
  assert.match(compareToBaseline(10, NaN, 'f.txt')[0], /one integer/);
});
