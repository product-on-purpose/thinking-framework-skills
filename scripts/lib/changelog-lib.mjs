// changelog-lib.mjs - Pure transforms for the generated site changelog pages (Workstream A).
// Zero-dependency, UTF-8, LF. Consumed by scripts/gen-site.mjs; tested in
// tests/changelog-lib.test.mjs. The repo-root CHANGELOG.md / RELEASE-NOTES.md
// are the source of truth; these helpers only re-point their links for the site.

const EXTERNAL = /^(https?:|mailto:|tel:|ftp:|\/\/|#)/i;

// Decide a target's replacement, or null to leave it unchanged.
function classifyTarget(rawTarget, { selfLinks, repoBlobBase }) {
  if (EXTERNAL.test(rawTarget)) return null;        // external or pure #anchor
  const hashIdx = rawTarget.indexOf('#');
  const path = hashIdx === -1 ? rawTarget : rawTarget.slice(0, hashIdx);
  const frag = hashIdx === -1 ? '' : rawTarget.slice(hashIdx); // keeps leading '#'
  if (path === '') return null;                     // bare fragment
  const norm = path.replace(/^\.\//, '');           // drop a leading ./
  if (norm === 'RELEASE-NOTES.md') return selfLinks.whatsNew + frag;
  if (norm === 'CHANGELOG.md') return selfLinks.full + frag;
  return repoBlobBase + norm + frag;
}

export function rewriteLinks(md, opts) {
  let inFence = false;
  let fenceChar = '';
  return md.split('\n').map((line) => {
    const fence = line.match(/^\s*(```+|~~~+)/);
    if (fence) {
      const ch = fence[1][0];
      if (!inFence) { inFence = true; fenceChar = ch; }
      else if (ch === fenceChar) { inFence = false; fenceChar = ''; }
      return line;                                   // never touch the fence line
    }
    if (inFence) return line;                         // inside code: untouched

    const refDef = line.match(/^(\s*\[[^\]]+\]:\s*)(\S+)(.*)$/);
    if (refDef) {
      const repl = classifyTarget(refDef[2], opts);
      return repl == null ? line : refDef[1] + repl + refDef[3];
    }

    return line.replace(/(!?)\[([^\]]*)\]\(([^)\s]+)\)/g, (m, bang, text, target) => {
      if (bang === '!') return m;                     // image: leave
      const repl = classifyTarget(target, opts);
      return repl == null ? m : `[${text}](${repl})`;
    });
  }).join('\n');
}
