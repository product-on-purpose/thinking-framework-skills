import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  cleanDoi, citationKind, extractMentions, crossrefWorkUrl, classifyUpdates, classifyMissing,
  titleOverlap, yearMismatch,
} from '../scripts/lib/doi-sweep-lib.mjs';

// Pure-function tests with in-memory fixtures. The cleanDoi fixtures are the three strings the
// first sweep (2026-10-17) sent to CrossRef with URL debris attached, so each one came back
// "not found" although the DOI is real.

test('cleanDoi: URL debris from the first sweep is stripped', () => {
  assert.equal(cleanDoi('10.1016/j.jesp.2012.02.002/'), '10.1016/j.jesp.2012.02.002');
  assert.equal(cleanDoi('10.3389/fpsyg.2014.00786/full'), '10.3389/fpsyg.2014.00786');
  assert.equal(cleanDoi('10.4324/9781315237473/reflective-practitioner-donald-schon'), '10.4324/9781315237473');
});

test('cleanDoi: markdown punctuation and unbalanced closers go, balanced ones stay', () => {
  assert.equal(cleanDoi('10.1037/a0020319).'), '10.1037/a0020319');
  assert.equal(cleanDoi('10.1177/0956797620930211**,'), '10.1177/0956797620930211');
  assert.equal(cleanDoi('10.1002/(SICI)1099-0771(199706)10:2<95::AID-BDM255>3.0.CO;2-K'),
    '10.1002/(SICI)1099-0771(199706)10:2<95::AID-BDM255>3.0.CO;2-K');
});

test('cleanDoi: a DOI that only looks like debris is kept whole', () => {
  // An all-digit book DOI has hyphens but no title words; cutting it would leave "10.1007".
  assert.equal(cleanDoi('10.1007/978-3-319-12345-6'), '10.1007/978-3-319-12345-6');
  // A suffix that is itself slug-shaped is never cut down to the bare prefix.
  assert.equal(cleanDoi('10.5555/some-title-like-suffix'), '10.5555/some-title-like-suffix');
});

test('cleanDoi: a percent-encoded ampersand decodes, and the request URL re-encodes it', () => {
  // The defect this guards: an "&" left raw in the path ends the DOI at "hci0603", so a real
  // DOI comes back "not found" and a fixed link gets reopened.
  const doi = cleanDoi('10.1207/s15327051hci0603%264_2');
  assert.equal(doi, '10.1207/s15327051hci0603&4_2');
  assert.equal(crossrefWorkUrl(doi), 'https://api.crossref.org/works/10.1207%2Fs15327051hci0603%264_2');
});

test('citationKind: a doi.org link, a doi: prefix, a publisher URL and bare text', () => {
  const at = (line, doi) => citationKind(line, line.indexOf(doi));
  assert.deepEqual(at('url: "https://doi.org/10.1136/x"', '10.1136'), { kind: 'resolver', host: 'doi.org' });
  assert.deepEqual(at('see https://dx.doi.org/10.1136/x', '10.1136'), { kind: 'resolver', host: 'doi.org' });
  assert.deepEqual(at('(doi:10.1037/a0020319)', '10.1037'), { kind: 'prefix', host: null });
  assert.deepEqual(at('DOI 10.1037/a0020319', '10.1037'), { kind: 'prefix', host: null });
  assert.deepEqual(at('url: "https://www.tandfonline.com/doi/abs/10.1080/07370024.1991.9667172"', '10.1080'),
    { kind: 'publisher', host: 'www.tandfonline.com' });
  assert.deepEqual(at('Smith (2020), 10.1037/a0020319', '10.1037'), { kind: 'bare', host: null });
});

test('extractMentions: finds each DOI with its line, kind and cleaned form', () => {
  const text = [
    '# Dossier',
    '- Paper A (2021). https://doi.org/10.1136/postgradmedj-2019-137484.',
    '- Paper B: https://www.frontiersin.org/articles/10.3389/fpsyg.2014.00786/full and doi:10.1037/a0020319',
  ].join('\n');
  const got = extractMentions(text).map(({ doi, line, kind }) => ({ doi, line, kind }));
  assert.deepEqual(got, [
    { doi: '10.1136/postgradmedj-2019-137484', line: 2, kind: 'resolver' },
    { doi: '10.3389/fpsyg.2014.00786', line: 3, kind: 'publisher' },
    { doi: '10.1037/a0020319', line: 3, kind: 'prefix' },
  ]);
});

test('classifyMissing: a string cited as a DOI is broken; one only inside publisher URLs is a page key', () => {
  // RED case first: the first sweep reported the working Conklin and Yakemovic link as a wrong
  // DOI, because it had no rule that told these two apart.
  assert.equal(classifyMissing([{ kind: 'resolver' }]), 'broken');
  assert.equal(classifyMissing([{ kind: 'publisher' }, { kind: 'prefix' }]), 'broken');
  assert.equal(classifyMissing([{ kind: 'bare' }]), 'broken');
  assert.equal(classifyMissing([{ kind: 'publisher' }]), 'page-key');
  assert.equal(classifyMissing([{ kind: 'publisher' }, { kind: 'publisher' }]), 'page-key');
});

test('classifyUpdates: retraction outranks correction outranks other records', () => {
  assert.equal(classifyUpdates([]), 'none');
  assert.equal(classifyUpdates(undefined), 'none');
  assert.equal(classifyUpdates([{ type: 'new_version' }]), 'info');
  assert.equal(classifyUpdates([{ type: 'corrigendum' }]), 'review');
  assert.equal(classifyUpdates([{ type: 'correction' }, { type: 'retraction' }]), 'severe');
  assert.equal(classifyUpdates([{ type: 'expression_of_concern' }]), 'severe');
});

test('titleOverlap: the FMEA wrong-DOI case scores low, a matching line scores high', () => {
  const line = 'Anjalee, Rutter and Samaranayake (2021) - Application of FMEA to improve medication safety: a systematic review';
  assert.ok(titleOverlap('Diabetes support in schools: a letter', [line]) < 0.34);
  assert.ok(titleOverlap('Application of Failure Mode and Effect Analysis (FMEA) to improve medication safety: a systematic review', [line]) > 0.6);
  assert.equal(titleOverlap('', [line]), null);
});

test('yearMismatch: null without a year, false within one year, true beyond', () => {
  assert.equal(yearMismatch(2017, ['Baumgartner and Thiem, cited by author only']), null);
  assert.equal(yearMismatch(2020, ['Anjalee et al. (2021)']), false);
  assert.equal(yearMismatch(2017, ['Baumgartner and Thiem (2020)']), true);
  assert.equal(yearMismatch(null, ['(2020)']), null);
});
