/* ============================================================
   Alfred — Corporate Deck, editable PPTX export.
   Native PowerPoint shapes + text (Google Fonts), brand-tinted icons,
   and the signature gradient backgrounds.
   Fonts: Bricolage Grotesque (display) + Plus Jakarta Sans (body) — both
   Google Fonts, so the deck is editable on any machine with them installed.
   ============================================================ */
const PptxGenJS = require("pptxgenjs");
const ICON = require("./icon-manifest.json");

const pptx = new PptxGenJS();
pptx.defineLayout({ name: "A16x9", width: 13.333, height: 7.5 });
pptx.layout = "A16x9";
pptx.author = "Alfred AI";
pptx.company = "Alfred AI";
pptx.title = "Alfred Corporate Deck";

// ---- unit helpers (design space is 1280x720 px) ----
const IN = (px) => +(px / 96).toFixed(4);     // px -> inches
const PT = (px) => +(px * 0.75).toFixed(2);    // px -> points

// ---- fonts ----
const DISPLAY = "Bricolage Grotesque";
const SANS = "Plus Jakarta Sans";

// ---- palette (hex, no #) ----
const C = {
  ink: "02021E", ink800: "1B1B33", ink700: "323232", ink600: "505050",
  ink500: "6B6B78", ink400: "9CA3AF",
  orange: "FF8431", orange600: "F26A1B", orange50: "FFF3EA",
  peri: "A7A7FC", peri500: "9797FF", peri600: "7B7BF5", peri200: "C9C9FF", peri50: "F3F3FF",
  white: "FFFFFF", gray150: "E6E6E6", gray100: "F1F1F1", canvas: "F9F9F9",
  green: "2FB67C", green100: "E3F6EE", greenText: "1E9466",
};

const BG = { cover: "assets/bg-cover.png", grad: "assets/bg-grad.png", ink: "assets/bg-ink.png", canvas: "assets/bg-canvas.png" };
const LOGO_COLOR = "assets/alfred-logo-color.png";
const LOGO_WHITE = "assets/alfred-logo-white.png";
const LOGO_AR = 1800 / 434;

const PADX = 110, PADT = 88, CW = 1280, CH = 720;
const CARD_SHADOW = { type: "outer", color: "9CA3AF", blur: 16, offset: 5, angle: 90, opacity: 0.16 };

// ---------- primitives ----------
function bg(slide, img) { slide.background = { path: img }; }

function text(slide, str, x, y, w, h, opts = {}) {
  slide.addText(str, {
    x: IN(x), y: IN(y), w: IN(w), h: IN(h),
    fontFace: opts.font || SANS, fontSize: opts.size || 13.5,
    color: opts.color || C.ink700, bold: !!opts.bold, italic: !!opts.italic,
    align: opts.align || "left", valign: opts.valign || "top",
    charSpacing: opts.charSpacing, lineSpacingMultiple: opts.lh,
    margin: 0, wrap: true, ...(opts.extra || {}),
  });
}

function eyebrow(slide, str, x, y, mode = "light") {
  const color = mode === "grad" ? "FFFFFF" : mode === "dark" ? C.peri200 : C.peri600;
  text(slide, str.toUpperCase(), x, y, 980, 22,
    { font: SANS, size: 11, bold: true, color, charSpacing: 1.6, valign: "middle" });
}

function rule(slide, x, y, sm = false) {
  slide.addShape("roundRect", { x: IN(x), y: IN(y), w: IN(sm ? 64 : 96), h: IN(4),
    fill: { color: C.orange }, line: { type: "none" }, rectRadius: IN(2) });
}

function card(slide, x, y, w, h, o = {}) {
  slide.addShape("roundRect", {
    x: IN(x), y: IN(y), w: IN(w), h: IN(h),
    fill: { color: o.fill || C.white },
    line: o.line === null ? { type: "none" } : { color: o.line || C.gray150, width: 1 },
    rectRadius: IN(o.radius || 24),
    shadow: o.shadow === false ? undefined : (o.shadow || CARD_SHADOW),
  });
}

function pageNum(slide, n, dark = false) {
  text(slide, n, CW - PADX - 60, CH - 96, 60, 24,
    { size: 11, bold: true, color: dark ? "8A8AA0" : C.ink400, align: "right", valign: "middle" });
}
function logoTR(slide, white = false) {
  const w = 132, h = w / LOGO_AR;
  slide.addImage({ path: white ? LOGO_WHITE : LOGO_COLOR, x: IN(CW - PADX - w), y: IN(80), w: IN(w), h: IN(h) });
}

function iconChip(slide, x, y, icon, tint, o = {}) {
  const size = o.size || 44, chipBg = o.bg || C.orange50, glyph = o.glyph || 22;
  slide.addShape("roundRect", { x: IN(x), y: IN(y), w: IN(size), h: IN(size),
    fill: { color: chipBg }, line: { type: "none" }, rectRadius: IN(12) });
  const m = ICON[icon], ar = m.w / m.h;
  let iw = glyph, ih = glyph;
  if (ar >= 1) ih = glyph / ar; else iw = glyph * ar;
  slide.addImage({ path: `assets/icons/${icon}-${tint}.png`,
    x: IN(x + (size - iw) / 2), y: IN(y + (size - ih) / 2), w: IN(iw), h: IN(ih) });
}

function pill(slide, x, y, w, label, bgc, fg) {
  const h = 26;
  slide.addShape("roundRect", { x: IN(x), y: IN(y), w: IN(w), h: IN(h),
    fill: { color: bgc }, line: { type: "none" }, rectRadius: IN(13) });
  text(slide, label, x, y - 1, w, h, { size: 10, bold: true, color: fg, align: "center", valign: "middle", charSpacing: 0.3 });
}

// ink stat card with one hero number
function inkStat(s, x, y, w, h, big, cap, src) {
  card(s, x, y, w, h, { fill: C.ink, line: null, radius: 24 });
  text(s, big, x + 30, y + 40, w - 60, 96, { font: DISPLAY, size: 64, bold: true, color: C.orange, charSpacing: -2, lh: 1 });
  text(s, cap, x + 30, y + 150, w - 60, h - 200, { size: 14, color: C.peri200, lh: 1.42 });
  if (src) text(s, src, x + 30, y + h - 46, w - 60, 24, { size: 12, bold: true, color: "8A8AA0" });
}

// metric tile
function metricTile(s, x, y, w, h, label, val, sub) {
  card(s, x, y, w, h, {});
  text(s, label, x + 24, y + 24, w - 40, 44, { size: 10.5, bold: true, color: C.ink500, lh: 1.2 });
  text(s, val, x + 24, y + 74, w - 40, 70, { font: DISPLAY, size: 44, bold: true, color: C.orange, charSpacing: -1 });
  text(s, sub, x + 24, y + h - 40, w - 40, 26, { size: 10, color: C.ink500 });
}

// horizontal numbered steps
function stepRow(s, steps, y, titleSize = 16) {
  const n = steps.length, gap = 24, colW = (1060 - (n - 1) * gap) / n;
  steps.forEach((st, i) => {
    const x = PADX + i * (colW + gap);
    if (i < n - 1) s.addShape("line", { x: IN(x + 54), y: IN(y + 19), w: IN(colW + gap - 44), h: 0, line: { color: C.gray150, width: 2 } });
  });
  steps.forEach((st, i) => {
    const x = PADX + i * (colW + gap);
    s.addShape("roundRect", { x: IN(x), y: IN(y), w: IN(40), h: IN(40), fill: { color: C.orange }, line: { type: "none" }, rectRadius: IN(12), shadow: { type: "outer", color: C.orange, blur: 10, offset: 3, angle: 90, opacity: 0.45 } });
    text(s, String(i + 1), x, y, 40, 40, { font: DISPLAY, size: 15, bold: true, color: C.white, align: "center", valign: "middle" });
    text(s, st[0], x, y + 58, colW - 10, 30, { font: DISPLAY, size: titleSize, bold: true, color: C.ink, charSpacing: -0.2 });
    text(s, st[1], x, y + 92, colW - 12, 140, { size: 11.5, color: C.ink600, lh: 1.32 });
  });
}

// ============================================================
//  SLIDE 01 — Cover
// ============================================================
(function () {
  const s = pptx.addSlide(); bg(s, BG.cover);
  eyebrow(s, "Decision intelligence platform", PADX, 196);
  text(s, "The AI memory for the whole organisation.", PADX, 230, 1010, 250,
    { font: DISPLAY, size: 52, bold: true, color: C.orange, lh: 0.99, charSpacing: -1 });
  rule(s, PADX, 474);
  text(s, "Decision intelligence for every leader, every function — one platform.",
    PADX, 506, 860, 70, { size: 16, color: C.ink600, lh: 1.4 });
  const lw = 150, lh = lw / LOGO_AR;
  s.addImage({ path: LOGO_COLOR, x: IN(PADX), y: IN(CH - 64 - lh), w: IN(lw), h: IN(lh) });
  pageNum(s, "01");
})();

// ============================================================
//  SLIDE 02 — The Problem
// ============================================================
(function () {
  const s = pptx.addSlide(); s.background = { color: C.white };
  eyebrow(s, "The problem", PADX, 92);
  text(s, "Every function is drowning in data and starving for insight.", PADX, 118, 600, 150,
    { font: DISPLAY, size: 29, bold: true, color: C.ink, lh: 1.06, charSpacing: -0.5 });
  text(s, "The marketing leader runs ten tools to measure ROI. The finance leader runs ten more to close the books. The sales leader is stitching together a CRM, a calendar, and a spreadsheet just to know what's actually happening in the pipeline.",
    PADX, 262, 600, 130, { size: 12.5, color: C.ink600, lh: 1.45 });
  text(s, "None of these systems talk to each other in plain language. Each one shows its own slice of the truth, and no one owns the full picture.",
    PADX, 392, 600, 90, { size: 12.5, color: C.ink600, lh: 1.45 });
  text(s, "This is what happens when every function builds its own stack in isolation.",
    PADX, 486, 600, 50, { size: 13, bold: true, color: C.ink, lh: 1.4 });
  inkStat(s, 754, 150, 416, 430, "92%",
    "of business leaders say the growing number of data sources is limiting their organisation's progress.", "Qlik");
  pageNum(s, "02");
})();

// ============================================================
//  SLIDE 03 — The Cost of the Problem
// ============================================================
(function () {
  const s = pptx.addSlide(); s.background = { color: C.canvas };
  eyebrow(s, "The cost", PADX, 92);
  text(s, "The cost shows up as delay.", PADX, 118, 600, 110,
    { font: DISPLAY, size: 31, bold: true, color: C.ink, lh: 1.05, charSpacing: -0.5 });
  text(s, "It's the budget reallocation that waits a week for an analyst to confirm what the leader already suspected. The board question nobody has a confident answer to. The judgment call made on gut feel because the data took too long to pull together.",
    PADX, 250, 600, 160, { size: 13, color: C.ink600, lh: 1.5 });
  text(s, "The damage shows up as the decisions that don't get made in time.",
    PADX, 442, 600, 60, { size: 14, bold: true, color: C.ink, lh: 1.4 });
  inkStat(s, 754, 150, 416, 430, "61%",
    "of C-suite leaders admit their decision-making is only slightly or rarely data-driven — despite running more tools than ever.", "Qlik");
  pageNum(s, "03");
})();

// ============================================================
//  SLIDE 04 — What Alfred Is
// ============================================================
(function () {
  const s = pptx.addSlide(); s.background = { color: C.white };
  eyebrow(s, "What Alfred is", PADX, 92);
  text(s, "The decision intelligence platform for the modern leadership team.", PADX, 116, 1010, 110,
    { font: DISPLAY, size: 33, bold: true, color: C.ink, lh: 1.04, charSpacing: -0.6 });
  text(s, "Alfred connects to your existing tools, builds a living memory of how your business actually works, and tells every leader what changed, why it changed, and what to do next.",
    PADX, 226, 940, 70, { size: 14, color: C.ink600, lh: 1.45 });
  stepRow(s, [
    ["Learn", "Connects to your stack — your existing tools, read-only."],
    ["Nudge", "Continuously reasons across everything it can see."],
    ["Recommend", "Surfaces what matters, in plain language."],
    ["Act", "Executes on command, inside your tools."],
  ], 360);
  pageNum(s, "04");
})();

// ============================================================
//  SLIDE 05 — The Architecture: Alfred Core + Modules
// ============================================================
(function () {
  const s = pptx.addSlide(); s.background = { color: C.white };
  eyebrow(s, "The architecture", PADX, 92);
  text(s, "One engine. Every function.", PADX, 116, 1010, 56, { font: DISPLAY, size: 36, bold: true, color: C.ink, charSpacing: -0.6 });
  text(s, "Alfred Core is the central decision intelligence engine behind every Alfred product. It orchestrates specialised agents across marketing, sales, finance, and operations, connects their signals, and delivers coordinated intelligence to every leader in real time. Five functional modules run on top — each built for a leader's domain, all sharing one engine, one memory, one operating model.",
    PADX, 178, 1010, 100, { size: 13, color: C.ink600, lh: 1.45 });
  // module chips
  const mods = ["Marketing", "Sales", "Finance", "Operations", "CEO / Founder"];
  const n = mods.length, g = 14, cw = (1060 - (n - 1) * g) / n, cy = 360, chh = 62;
  mods.forEach((m, i) => {
    const x = PADX + i * (cw + g);
    card(s, x, cy, cw, chh, { radius: 14, shadow: false });
    text(s, m, x, cy, cw, chh, { size: 12, bold: true, color: C.ink700, align: "center", valign: "middle" });
    s.addShape("line", { x: IN(x + cw / 2), y: IN(cy + chh), w: 0, h: IN(18), line: { color: C.gray150, width: 2 } });
  });
  // Alfred Core bar
  s.addShape("roundRect", { x: IN(PADX), y: IN(cy + chh + 18), w: IN(1060), h: IN(64), fill: { color: C.orange }, line: { type: "none" }, rectRadius: IN(16), shadow: { type: "outer", color: C.orange, blur: 16, offset: 4, angle: 90, opacity: 0.4 } });
  text(s, "Alfred Core  —  one engine, one memory, every function", PADX, cy + chh + 18, 1060, 64, { font: DISPLAY, size: 18, bold: true, color: C.white, align: "center", valign: "middle" });
  text(s, "Alfred Core doesn't replace your tools. It makes them work together.", PADX, cy + chh + 100, 1060, 30, { size: 12.5, color: C.ink500, align: "center" });
  pageNum(s, "05");
})();

// ============================================================
//  SLIDE 06 — The Modules (table)
// ============================================================
(function () {
  const s = pptx.addSlide(); s.background = { color: C.white };
  eyebrow(s, "The modules", PADX, 92);
  text(s, "Five modules. One engine, one memory.", PADX, 116, 1060, 56, { font: DISPLAY, size: 34, bold: true, color: C.ink, charSpacing: -0.6 });
  const th = (t) => ({ text: t, options: { bold: true, color: C.ink500, fontSize: 10, fontFace: SANS, valign: "middle", margin: [8, 12, 8, 12], charSpacing: 0.6 } });
  const md = (t) => ({ text: t, options: { bold: true, color: C.ink, fontSize: 13, fontFace: SANS, valign: "middle", margin: [10, 12, 10, 12] } });
  const fo = (t) => ({ text: t, options: { color: C.ink600, fontSize: 12.5, fontFace: SANS, valign: "middle", margin: [10, 12, 10, 12] } });
  const rows = [
    [th("MODULE"), th("INTELLIGENCE FOCUS")],
    [md("Alfred for Marketing"), fo("Spend optimisation, creative intelligence, brand visibility")],
    [md("Alfred for Sales"), fo("Pipeline health, deal patterns, coaching")],
    [md("Alfred for Finance"), fo("Spend efficiency, forecasting")],
    [md("Alfred for Operations"), fo("Process health, capacity planning")],
    [md("Alfred for CEO / Founder"), fo("Whole-business view, strategic alignment")],
  ];
  s.addTable(rows, {
    x: IN(PADX), y: IN(206), w: IN(1060), colW: [IN(380), IN(680)],
    rowH: [IN(38), IN(50), IN(50), IN(50), IN(50), IN(50)],
    border: [{ type: "none" }, { type: "none" }, { type: "solid", color: C.gray150, pt: 1 }, { type: "none" }],
    fill: { color: C.white }, valign: "middle", autoPage: false,
  });
  text(s, "Each module is a specialised agent network. Together, they give every leader the same depth of intelligence in their own domain.",
    PADX, 556, 1060, 40, { size: 12.5, color: C.ink500, lh: 1.35 });
  pageNum(s, "06");
})();

// ============================================================
//  SLIDE 07 — The Organisational Brain (Vision)
// ============================================================
(function () {
  const s = pptx.addSlide(); bg(s, BG.ink);
  eyebrow(s, "The organisational brain · vision", PADX, 88, "dark");
  text(s, "An organisation memory every function reads from and writes to.", PADX, 112, 1010, 100,
    { font: DISPLAY, size: 30, bold: true, color: C.white, lh: 1.06, charSpacing: -0.5 });
  const cards = [
    { icon: "audit-log", t: "Unified Institutional Memory", b: "Every outcome, every pattern, every decision — captured permanently and queried before every recommendation." },
    { icon: "web-stack-connected", t: "Cross-Module Signal Router", b: "Routes a signal from one function to every other function it affects — in real time." },
    { icon: "web-clarity", t: "Causal Reasoning Engine", b: "Traces not just what happened, but why — across functional boundaries." },
  ];
  const w = 337, gap = 24, y = 252, h = 250;
  cards.forEach((c, i) => {
    const x = PADX + i * (w + gap);
    card(s, x, y, w, h, { fill: "15152E", line: null, radius: 24, shadow: false });
    iconChip(s, x + 24, y + 24, c.icon, "white", { bg: "2A2A48" });
    text(s, c.t, x + 24, y + 82, w - 48, 50, { font: DISPLAY, size: 16, bold: true, color: C.white, lh: 1.05, charSpacing: -0.2 });
    text(s, c.b, x + 24, y + 132, w - 48, 110, { size: 11.5, color: C.peri200, lh: 1.36 });
  });
  text(s, "Marketing and Sales are live today. Finance, Operations and the Founder's module extend the same memory as they come online.",
    PADX, 538, 1010, 40, { size: 12.5, color: C.peri200, lh: 1.4 });
  logoTR(s, true);
  pageNum(s, "07", true);
})();

// ============================================================
//  SLIDE 08 — The Moat: Memory
// ============================================================
(function () {
  const s = pptx.addSlide(); s.background = { color: C.white };
  eyebrow(s, "The moat", PADX, 92);
  text(s, "It gets sharper every month.", PADX, 116, 600, 110,
    { font: DISPLAY, size: 32, bold: true, color: C.ink, lh: 1.04, charSpacing: -0.5 });
  text(s, "Alfred gets sharper every month — not because the model changes, but because the memory does. After six months, Alfred holds six months of an organisation's specific patterns, outcomes, and decisions.",
    PADX, 246, 600, 130, { size: 13, color: C.ink600, lh: 1.48 });
  text(s, "A competitor starting fresh cannot hand a business back the context it took six months to build. The institutional memory you accumulate stays — and grows with you.",
    PADX, 400, 600, 110, { size: 13, color: C.ink600, lh: 1.48 });
  // stat card
  const cx = 754, cy = 150, cw = 416, chh = 430;
  card(s, cx, cy, cw, chh, { fill: C.ink, line: null, radius: 32 });
  text(s, "6 mo", cx + 40, cy + 52, cw - 80, 110, { font: DISPLAY, size: 64, bold: true, color: C.orange, charSpacing: -2 });
  text(s, "of your organisation's patterns a competitor can't compress or copy", cx + 40, cy + 176, cw - 80, 70, { size: 15, bold: true, color: C.white, lh: 1.25 });
  text(s, "The switching cost isn't the product — it's the institutional memory accumulated inside it.", cx + 40, cy + 256, cw - 80, 120, { size: 12.5, color: C.peri200, lh: 1.42 });
  pageNum(s, "08");
})();

// ============================================================
//  SLIDE 09 — Proof, From the Live Module
// ============================================================
(function () {
  const s = pptx.addSlide(); s.background = { color: C.canvas };
  eyebrow(s, "Proof · from the live module", PADX, 92);
  text(s, "What changes with Alfred?", PADX, 116, 1060, 56, { font: DISPLAY, size: 36, bold: true, color: C.ink, charSpacing: -0.6 });
  const w = 250, gap = 20, y = 232, h = 200;
  metricTile(s, PADX + 0 * (w + gap), y, w, h, "Faster decision cycles", "70%", "time-to-decision");
  metricTile(s, PADX + 1 * (w + gap), y, w, h, "Reduction in wasted spend", "12%", "reclaimed by Alfred");
  metricTile(s, PADX + 2 * (w + gap), y, w, h, "Weekly hours reclaimed", "15+", "per leader");
  metricTile(s, PADX + 3 * (w + gap), y, w, h, "Answered without an analyst", "85%", "of questions, on demand");
  text(s, "From Alfred for Marketing, the first live module. Every additional module compounds on the same engine and the same memory.",
    PADX, 470, 1060, 50, { size: 12.5, color: C.ink500, lh: 1.4 });
  pageNum(s, "09");
})();

// ============================================================
//  SLIDE 10 — Why Alfred Wins (table)
// ============================================================
(function () {
  const s = pptx.addSlide(); s.background = { color: C.white };
  eyebrow(s, "Why Alfred wins", PADX, 92);
  text(s, "Built for leaders — and it remembers.", PADX, 116, 1060, 56, { font: DISPLAY, size: 34, bold: true, color: C.ink, charSpacing: -0.6 });
  const th = (t) => ({ text: t, options: { bold: true, color: C.ink500, fontSize: 10, fontFace: SANS, valign: "middle", margin: [6, 10, 6, 10], charSpacing: 0.6 } });
  const vs = (t) => ({ text: t, options: { bold: true, color: C.ink, fontSize: 12.5, fontFace: SANS, valign: "middle", margin: [9, 10, 9, 10] } });
  const cl = (t, c) => ({ text: t, options: { color: c || C.ink600, fontSize: 12, fontFace: SANS, valign: "middle", margin: [9, 10, 9, 10] } });
  const rows = [
    [th("VERSUS"), th("THE GAP"), th("ALFRED")],
    [vs("BI tools"), cl("Built for analysts, shows symptoms"), cl("Built for leaders, explains causes", C.ink)],
    [vs("Generic AI / copilots"), cl("Stateless, lives in your documents"), cl("Always-on, lives in your data, remembers", C.ink)],
    [vs("CRMs"), cl("Stores what happened"), cl("Tells you what's about to happen", C.ink)],
    [vs("Doing nothing"), cl("Budget compounds against you every hour"), cl("Closes the gap to under 2 hours", C.ink)],
  ];
  s.addTable(rows, {
    x: IN(PADX), y: IN(206), w: IN(1060), colW: [IN(230), IN(415), IN(415)],
    rowH: [IN(36), IN(52), IN(52), IN(52), IN(52)],
    border: [{ type: "none" }, { type: "none" }, { type: "solid", color: C.gray150, pt: 1 }, { type: "none" }],
    fill: { color: C.white }, valign: "middle", autoPage: false,
  });
  text(s, "Dashboards show. Copilots wait. Analysts leave. None of them remember. Alfred does.",
    PADX, 556, 1060, 40, { size: 13.5, bold: true, color: C.ink, lh: 1.35 });
  pageNum(s, "10");
})();

// ============================================================
//  SLIDE 11 — Integrations
// ============================================================
(function () {
  const s = pptx.addSlide(); s.background = { color: C.canvas };
  eyebrow(s, "Integrations", PADX, 92);
  text(s, "Connects to the stack you already run. No rip and replace.", PADX, 116, 1060, 56, { font: DISPLAY, size: 32, bold: true, color: C.ink, charSpacing: -0.5 });
  const tools = ["Google Ads", "Meta Ads", "LinkedIn Ads", "Amazon Ads", "Shopify Ads", "Google Analytics", "Search Console", "Slack", "MS Teams", "Outlook", "Google Calendar"];
  const cols = 4, g = 16, cw = (1060 - (cols - 1) * g) / cols, ch = 60, y0 = 226;
  tools.forEach((t, i) => {
    const c = i % cols, r = Math.floor(i / cols);
    const x = PADX + c * (cw + g), y = y0 + r * (ch + g);
    card(s, x, y, cw, ch, { radius: 14, shadow: false });
    text(s, t, x + 6, y, cw - 12, ch, { size: 11.5, bold: true, color: C.ink700, align: "center", valign: "middle" });
  });
  const ty = y0 + 3 * ch + 2 * g + 30;
  s.addText([{ text: "Read-only by default. ", options: { bold: true, color: C.ink } },
    { text: "Alfred only acts inside a connected tool when you explicitly approve it — and every action is logged in your audit trail.", options: { color: C.ink600 } }],
    { x: IN(PADX), y: IN(ty), w: IN(1060), h: IN(50), fontFace: SANS, fontSize: 13, lineSpacingMultiple: 1.4, valign: "top", margin: 0 });
  pageNum(s, "11");
})();

// ============================================================
//  SLIDE 12 — Roadmap
// ============================================================
(function () {
  const s = pptx.addSlide(); s.background = { color: C.white };
  eyebrow(s, "Roadmap", PADX, 92);
  text(s, "Live today. Building toward the full platform.", PADX, 116, 1060, 56, { font: DISPLAY, size: 34, bold: true, color: C.ink, charSpacing: -0.6 });
  const cols = [
    { tag: "LIVE", tw: 60, tb: C.green100, tf: C.greenText, items: ["Alfred for Marketing", "Alfred for Sales"] },
    { tag: "IN DEVELOPMENT", tw: 138, tb: C.peri50, tf: C.peri600, items: ["Alfred for Finance", "Alfred for Operations"] },
    { tag: "PLANNED", tw: 86, tb: C.gray100, tf: C.ink600, items: ["Alfred for CEO / Founder"] },
  ];
  const w = 337, gap = 24, y = 244, h = 226;
  cols.forEach((col, i) => {
    const x = PADX + i * (w + gap);
    card(s, x, y, w, h, {});
    pill(s, x + 26, y + 26, col.tw, col.tag, col.tb, col.tf);
    col.items.forEach((it, j) => {
      text(s, it, x + 26, y + 78 + j * 40, w - 52, 34, { font: DISPLAY, size: 17, bold: true, color: C.ink, charSpacing: -0.2 });
    });
  });
  text(s, "Every module added extends the same memory. The platform gets more valuable with every function it connects.",
    PADX, 512, 1060, 40, { size: 12.5, color: C.ink500, lh: 1.4 });
  pageNum(s, "12");
})();

// ============================================================
//  SLIDE 13 — Get Started
// ============================================================
(function () {
  const s = pptx.addSlide(); s.background = { color: C.white };
  eyebrow(s, "Get started", PADX, 92);
  text(s, "From signup to first brief in under a week.", PADX, 116, 1060, 60, { font: DISPLAY, size: 36, bold: true, color: C.ink, charSpacing: -0.6 });
  stepRow(s, [
    ["Week 1 — Connect", "Secure integrations. Historical data synced. Zero engineering required."],
    ["Weeks 1–2 — Calibrate", "KPIs, alert thresholds, and objectives configured to your business."],
    ["Week 2 — Brief", "First intelligence briefing delivered. Fully operational."],
  ], 300);
  pageNum(s, "13");
})();

// ============================================================
//  SLIDE 14 — Closing
// ============================================================
(function () {
  const s = pptx.addSlide(); bg(s, BG.ink);
  eyebrow(s, "Get started", PADX, 178, "dark");
  text(s, "See what your business looks like with one memory instead of five.", PADX, 212, 1000, 200,
    { font: DISPLAY, size: 40, bold: true, color: C.white, lh: 1.06, charSpacing: -0.8 });
  const chipW = 260, chipY = 444;
  s.addShape("roundRect", { x: IN(PADX), y: IN(chipY), w: IN(chipW), h: IN(50), fill: { color: C.orange }, line: { type: "none" }, rectRadius: IN(25), shadow: { type: "outer", color: C.orange, blur: 14, offset: 4, angle: 90, opacity: 0.5 } });
  text(s, "Book a working session  →", PADX, chipY, chipW, 50, { size: 13.5, bold: true, color: C.white, align: "center", valign: "middle" });
  text(s, "hello@seekalfred.ai  ·  seekalfred.ai", PADX, 536, 600, 26, { size: 13, color: "9A9AB0" });
  logoTR(s, true);
})();

// ---- write ----
const OUT = "Alfred Corporate Deck.pptx";
pptx.writeFile({ fileName: OUT }).then((f) => console.log("WROTE", f)).catch((e) => { console.error(e); process.exit(1); });
