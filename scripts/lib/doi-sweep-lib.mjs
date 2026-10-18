// =============================================================================
// doi-sweep-lib.mjs - pure helpers behind the CrossRef retraction sweep.
//
// what-it-is:   the extraction and classification rules for scripts/sweep-crossref.mjs, kept
//               free of network and disk access so they are unit-tested directly.
// what-it-does: extractMentions finds every DOI-shaped string in a file's text and records how
//               it was cited (a doi.org link, a "doi:" prefix, a publisher URL, or bare text);
//               cleanDoi strips the URL and markdown debris a regex picks up; crossrefWorkUrl
//               builds the API request; classifyUpdates grades what CrossRef records against a
//               paper; classifyMissing says whether an unknown DOI is a broken reference or a
//               publisher page key; titleOverlap and yearMismatch are the two wrong-DOI checks.
// why:          the 2026-10-17 sweep found that a "no such DOI" answer means two different
//               things. A string cited as a DOI that has no record is a broken reference. A
//               DOI-shaped string inside a publisher URL is often only that publisher's page
//               key (Taylor and Francis serves its 1991 HCI papers at 10.1080/... keys that
//               were never registered), and the link can work. The rules here keep the two
//               apart so the next sweep does not reopen a link that is fine.
// used-by:      scripts/sweep-crossref.mjs; tests/doi-sweep-lib.test.mjs
// =============================================================================

// A DOI is "10." + a registrant code + "/" + a suffix. The suffix may hold almost anything,
// including the angle brackets of an old SICI DOI, so the match runs to the next whitespace,
// quote or backtick, and cleanDoi trims what does not belong.
export const DOI_RE = /10\.\d{4,9}\/[^\s"'`]+/g;

// The URL path segments that follow a DOI on publisher pages, not part of the DOI itself.
const VIEW_SUFFIX = /\/(?:full|abstract|abs|pdf|epdf|html|fulltext|meta)$/i;
// A book page on taylorfrancis.com appends a title slug: 10.4324/9781315237473/reflective-
// practitioner-donald-schon. Only a lowercase slug with two or more hyphens and a run of
// letters is cut, so an all-digit book DOI such as 10.1007/978-3-319-12345-6 is kept.
const TITLE_SLUG = /\/(?=[a-z0-9-]*[a-z]{3})[a-z0-9]+(?:-[a-z0-9]+){2,}$/;

// Cut a trailing piece only when a DOI suffix is left behind it ("10.x/suffix").
function cutTail(s, re) {
  const cut = s.replace(re, "");
  return /^10\.\d{4,9}\/./.test(cut) ? cut : s;
}

/** Strip the debris a DOI regex picks up from markdown and URLs. Returns the bare DOI. */
export function cleanDoi(raw) {
  let s = String(raw);
  try { s = decodeURIComponent(s); } catch { /* keep the raw form */ }
  for (;;) {
    const before = s;
    s = s.replace(/[.,;:*_\\]+$/, "");
    for (const [open, close] of [["(", ")"], ["[", "]"], ["<", ">"]]) {
      if (s.endsWith(close) && s.split(close).length > s.split(open).length) s = s.slice(0, -1);
    }
    s = cutTail(cutTail(cutTail(s, /\/+$/), VIEW_SUFFIX), TITLE_SLUG);
    if (s === before) break;
  }
  return s;
}

/**
 * How a DOI-shaped string was cited, judged from the text just before it.
 * "resolver": inside a doi.org or dx.doi.org link. "prefix": written as "doi:" or "DOI".
 * "publisher": inside some other URL (host is returned). "bare": none of these.
 */
export function citationKind(lineText, index) {
  const before = lineText.slice(0, index);
  if (/(?:^|\/\/|\s|\()(?:dx\.)?doi\.org\/$/i.test(before)) return { kind: "resolver", host: "doi.org" };
  if (/\bdoi:?\s*$/i.test(before)) return { kind: "prefix", host: null };
  const url = before.match(/https?:\/\/([^/\s"'`()<>]+)\/[^\s"'`<>]*$/i);
  if (url) return { kind: "publisher", host: url[1].toLowerCase() };
  return { kind: "bare", host: null };
}

/** Every DOI mention in one file's text: { doi, raw, line, kind, host, text }. */
export function extractMentions(text) {
  const out = [];
  String(text).split(/\r?\n/).forEach((lineText, i) => {
    for (const m of lineText.matchAll(DOI_RE)) {
      const { kind, host } = citationKind(lineText, m.index);
      out.push({ doi: cleanDoi(m[0]), raw: m[0], line: i + 1, kind, host, text: lineText.trim() });
    }
  });
  return out;
}

/**
 * The CrossRef works URL for a DOI. The whole DOI is percent-encoded, so a "/" becomes %2F
 * and an "&" (as in 10.1207/s15327051hci0603&4_2) becomes %26 rather than ending the path.
 */
export function crossrefWorkUrl(doi) {
  return `https://api.crossref.org/works/${encodeURIComponent(doi)}`;
}

export const SEVERE_TYPES = new Set(["retraction", "partial_retraction", "withdrawal", "removal", "expression_of_concern"]);
export const REVIEW_TYPES = new Set(["correction", "erratum", "corrigendum", "addendum", "clarification"]);

/** Grade the update records CrossRef lists against a paper: severe, review, info or none. */
export function classifyUpdates(updatedBy) {
  const types = (updatedBy || []).map((u) => String(u.type || "").toLowerCase());
  if (types.some((t) => SEVERE_TYPES.has(t))) return "severe";
  if (types.some((t) => REVIEW_TYPES.has(t))) return "review";
  return types.length ? "info" : "none";
}

/**
 * What a DOI that CrossRef does not know means, from how it was cited. If any mention cites
 * it as a DOI (a doi.org link, a "doi:" prefix, or bare text), the reference is broken. If
 * every mention sits inside a publisher URL, it is that publisher's page key: the link may
 * still work, and this sweep does not open links to find out.
 */
export function classifyMissing(mentions) {
  return mentions.every((m) => m.kind === "publisher") ? "page-key" : "broken";
}

const STOP = new Set("the and for from with that this into over under their when what does how are was were its about between within than through".split(" "));
function tokens(s) {
  return String(s || "").toLowerCase().replace(/<[^>]+>/g, " ").split(/[^a-z0-9]+/).filter((t) => t.length >= 4 && !STOP.has(t));
}

/**
 * The share of the CrossRef title's content words that appear on the citing lines, or null
 * when the title has none. A low share flags a DOI that may point at a different paper; it is
 * often only a line that cites by author and year without the title.
 */
export function titleOverlap(crossrefTitle, citingLines) {
  const title = [...new Set(tokens(crossrefTitle))];
  if (!title.length) return null;
  const ctx = new Set(tokens(citingLines.join(" ")));
  return title.filter((t) => ctx.has(t)).length / title.length;
}

/**
 * True when the citing lines carry a year and none is within one year of CrossRef's. Null
 * when no line carries a year. Online-first dates make one-year gaps routine, so a mismatch
 * is a prompt to look, not an error.
 */
export function yearMismatch(crossrefYear, citingLines) {
  if (!crossrefYear) return null;
  const years = citingLines.flatMap((t) => [...String(t).matchAll(/\b(1[89]\d\d|20[0-3]\d)\b/g)].map((m) => Number(m[1])));
  if (!years.length) return null;
  return !years.some((y) => Math.abs(y - crossrefYear) <= 1);
}
