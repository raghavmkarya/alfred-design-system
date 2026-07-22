/* Craft check — static "skill checks" distilled from guidelines/motion-and-animation.md,
   anti-slop.md and craft-checklist.md. Scans the design system's own source (.html / .css
   / .jsx) for the MECHANICALLY-checkable craft violations and fails on any hit, so a future
   edit can't silently reintroduce one. The fourth verifier alongside verify-render (bundle
   render), verify-components (state completeness) and verify-a11y (ARIA contracts).

   Scope: unambiguous, regex-detectable rules only. The subjective rules — eyebrow-per-section,
   layout sameness, copy quality, the "does it look AI-made" test — are deliberately NOT here;
   the guidelines assign those to the human / five-critic / impeccable-critique pass.

   Intentionally NOT flagged: `background-clip: text` with `--gradient-brand`. Gradient-fill on
   short display/emphasis text is a committed Alfred brand device (~30 deliberate uses), not a
   slop tell — see anti-slop.md / craft-checklist.md.

   Run: node scripts/verify-craft.mjs */
import fs from "node:fs";
import path from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const SKIP_DIRS = new Set(["scripts", "uploads", "node_modules", ".git", ".design-sync", ".design_sync", "mocks"]);
const EXTS = new Set([".html", ".css", ".jsx"]);

/* gather source files */
function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name.startsWith(".") && name !== ".") continue;          // skip dotfiles/dirs
    const full = path.join(dir, name);
    const rel = path.relative(ROOT, full);
    const top = rel.split(path.sep)[0];
    if (fs.statSync(full).isDirectory()) {
      if (SKIP_DIRS.has(name) || SKIP_DIRS.has(top)) continue;
      walk(full, out);
    } else if (EXTS.has(path.extname(name))) {
      out.push(rel);
    }
  }
  return out;
}

/* Each rule: id, why (short fix), a per-line `re`, and optional guards:
   skipFile(rel) — don't run the rule in these files;
   suppressIf(text) — skip the rule for a whole file when it matches (e.g. a custom focus style). */
const RULES = [
  { id: "transition-all", why: "name the properties, e.g. `transition: transform var(--dur-base) var(--ease-standard)`",
    re: /transition(?:-property)?:\s*["']?\s*all\b/ },   // tolerates the JSX inline-style form: transition: "all …"
  { id: "ease-in-ui", why: "`ease-in` feels sluggish on UI — use `var(--ease-standard)` (ease-out)",
    re: /(?<![-\w])ease-in\b(?!-out)/ },
  { id: "scale-zero-entry", why: "nothing appears from nothing — start from `scale(0.95)` + `opacity: 0`",
    re: /\bscale(?:3d|X|Y)?\(\s*0\s*[,)]/ },
  { id: "hardcoded-easing", why: "use the motion tokens `var(--ease-standard)` / `var(--ease-emphasized)`, not raw curves",
    re: /cubic-bezier\(/, skipFile: (r) => r.startsWith("tokens/") },
  { id: "arbitrary-z-index", why: "use a semantic z-index (`--z-*`), never 999 / 9999",
    re: /z-index:\s*9{3,}\b/ },
  { id: "outline-none-no-focus", why: "removing the outline needs a visible focus replacement (:focus / :focus-visible / :focus-within with a ring or border)",
    re: /outline:\s*(?:none|0)\b/, suppressIf: (t) => /:focus(?:-visible|-within)?\b/.test(t) },
  { id: "emoji-in-source", why: "no emoji in Alfred surfaces — use the custom single-color SVG icon set (assets/icons/)",
    re: /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{1F1E6}-\u{1F1FF}]/u },
];

const files = walk(ROOT);
const findings = [];

for (const rel of files) {
  const text = fs.readFileSync(path.join(ROOT, rel), "utf8");
  const lines = text.split("\n");
  for (const rule of RULES) {
    if (rule.skipFile && rule.skipFile(rel)) continue;
    if (rule.suppressIf && rule.suppressIf(text)) continue;
    lines.forEach((line, i) => {
      if (rule.re.test(line)) findings.push({ rule: rule.id, why: rule.why, file: rel, line: i + 1, snippet: line.trim().slice(0, 100) });
    });
  }
}

/* one positive contract the motion guideline relies on */
const baseCss = fs.readFileSync(path.join(ROOT, "tokens/base.css"), "utf8");
if (!/prefers-reduced-motion/.test(baseCss)) {
  findings.push({ rule: "reduced-motion-contract", why: "tokens/base.css must ship a global `prefers-reduced-motion` block", file: "tokens/base.css", line: 0, snippet: "(missing)" });
}

/* report */
if (findings.length === 0) {
  for (const r of RULES) console.log(`OK   ${r.id}`);
  console.log(`OK   reduced-motion-contract`);
  console.log(`\nALL CRAFT CHECKS PASS (${files.length} files, ${RULES.length + 1} rules)`);
  process.exit(0);
}

const byRule = {};
for (const f of findings) (byRule[f.rule] ||= []).push(f);
for (const [id, list] of Object.entries(byRule)) {
  console.log(`\nFAIL ${id} — ${list[0].why}`);
  for (const f of list) console.log(`     ${f.file}:${f.line}  ${f.snippet}`);
}
console.log(`\n${findings.length} CRAFT VIOLATION(S) across ${Object.keys(byRule).length} rule(s)`);
process.exit(1);
