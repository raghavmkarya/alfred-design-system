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

/* Files where raw ramp tokens are a legitimate, reviewed brand device — gradient <stop>s that
   render the brand gradient in SVG, the sequential heat scale, and the fake dark DashboardMock
   device frame (must NOT re-theme with the host page). Everywhere else in components/ the
   raw-ramp-token rule requires a theme-aware semantic token; individual legit lines outside these
   files carry an inline `raw-ramp-ok` marker (see components/core/Avatar.jsx, Button.jsx). */
const RAW_RAMP_ALLOW_FILES = new Set([
  "components/charts/GaugeChart.jsx",
  "components/charts/Heatmap.jsx",
  "components/charts/LineChart.jsx",
  "components/charts/Sparkline.jsx",
  "components/data/ProgressRing.jsx",
  "components/marketing/DashboardMock.jsx",
]);

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
    re: /(?:z-index|zIndex):\s*["']?9{3,}\b/ },   // CSS z-index and the JSX camelCase zIndex form
  { id: "outline-none-no-focus", why: "removing the outline needs a visible focus replacement (:focus-visible, a --shadow-focus/--border-focus ring, or usePress/isFocusVisible)",
    // catches both CSS `outline: none` and the JSX quoted form `outline: "none"` / `outlineStyle: "none"`
    re: /(?:outline|outline-style|outlineStyle):\s*["']?(?:none|0)\b/,
    suppressIf: (t) => /:focus(?:-visible|-within)?\b|--shadow-focus|--border-focus|isFocusVisible|usePress|focusVisible/.test(t) },
  { id: "emoji-in-source", why: "no emoji in Alfred surfaces — use the custom single-color SVG icon set (assets/icons/)",
    re: /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{1F1E6}-\u{1F1FF}]/u },
  { id: "raw-ramp-token", why: "use a theme-aware semantic token (--accent / --accent-soft / --border-focus / --text-link / --info-500 / --surface-* / --text-on-tint-*) — raw ramps don't re-theme across light / dark / app-dark",
    re: /var\(\s*--(?:gray|orange|periwinkle|ink)-\d/,
    // component .jsx source only (not the .card.html preview pages); skip the reviewed gradient/mock
    // files; individual legit lines carry a `raw-ramp-ok` marker
    skipFile: (r) => !(r.startsWith("components/") && r.endsWith(".jsx")) || RAW_RAMP_ALLOW_FILES.has(r),
    skipLine: (line) => { const t = line.trim(); return t.startsWith("//") || t.startsWith("*") || t.startsWith("/*") || /raw-ramp-ok/.test(line); } },
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
      if (rule.skipLine && rule.skipLine(line)) return;
      if (rule.re.test(line)) findings.push({ rule: rule.id, why: rule.why, file: rel, line: i + 1, snippet: line.trim().slice(0, 100) });
    });
  }
}

/* one positive contract the motion guideline relies on */
const baseCss = fs.readFileSync(path.join(ROOT, "tokens/base.css"), "utf8");
if (!/prefers-reduced-motion/.test(baseCss)) {
  findings.push({ rule: "reduced-motion-contract", why: "tokens/base.css must ship a global `prefers-reduced-motion` block", file: "tokens/base.css", line: 0, snippet: "(missing)" });
}

/* the forced-colors (Windows High Contrast) baseline must ship — box-shadows/backgrounds are
   stripped in HCM, so focus rings and floating-surface boundaries need a restored fallback. */
const stylesCss = fs.readFileSync(path.join(ROOT, "styles.css"), "utf8");
let fcCss = "";
try { fcCss = fs.readFileSync(path.join(ROOT, "tokens/forced-colors.css"), "utf8"); } catch { /* file missing → fail below */ }
const fcOk = /@import\s+["']tokens\/forced-colors\.css["']/.test(stylesCss)
  && /@media\s*\(\s*forced-colors:\s*active\s*\)/.test(fcCss)
  && /:focus-visible/.test(fcCss)
  && /\[role="dialog"\]/.test(fcCss);
if (!fcOk) {
  findings.push({ rule: "forced-colors-contract", why: "styles.css must @import tokens/forced-colors.css, which must ship a `@media (forced-colors: active)` block restoring :focus-visible + floating-surface (role) borders", file: "tokens/forced-colors.css", line: 0, snippet: "(missing or incomplete)" });
}

/* report */
if (findings.length === 0) {
  for (const r of RULES) console.log(`OK   ${r.id}`);
  console.log(`OK   reduced-motion-contract`);
  console.log(`OK   forced-colors-contract`);
  console.log(`\nALL CRAFT CHECKS PASS (${files.length} files, ${RULES.length + 2} rules)`);
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
