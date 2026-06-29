/* ============================================================
   Alfred AI — Solutions / Seed deck, recreated in the Alfred design system.
   Native editable PowerPoint. Fonts: Bricolage Grotesque + Plus Jakarta Sans.
   Content reproduced VERBATIM from Alfred_AI_Solutions_Deck.pptx (E902 AI Labs).
   Light surfaces only — no dark backgrounds. Product-view slides recreate the
   app UI in the style of ui_kits/app.
   ============================================================ */
const PptxGenJS = require("pptxgenjs");
const pptx = new PptxGenJS();
pptx.defineLayout({ name: "A16x9", width: 13.333, height: 7.5 });
pptx.layout = "A16x9";
pptx.author = "E902 AI Labs";
pptx.company = "E902 AI Labs Private Limited";
pptx.title = "Alfred AI — Solutions Deck";

const IN = (px) => +(px / 96).toFixed(4);
const DISPLAY = "Bricolage Grotesque";
const SANS = "Plus Jakarta Sans";
const C = {
  ink: "02021E", ink800: "1B1B33", ink700: "323232", ink600: "505050", ink500: "6B6B78", ink400: "9CA3AF",
  orange: "FF8431", orange600: "F26A1B", orange50: "FFF3EA",
  peri: "A7A7FC", peri500: "9797FF", peri600: "7B7BF5", peri200: "C9C9FF", peri50: "F3F3FF",
  white: "FFFFFF", gray150: "E6E6E6", gray100: "F1F1F1", canvas: "F9F9F9",
  green: "2FB67C", green100: "E3F6EE", greenText: "1E9466", danger: "E5484D", danger100: "FCE8E9",
};
const BG = { cover: "assets/bg-cover.png", canvas: "assets/bg-canvas.png" };
const LOGO_COLOR = "assets/alfred-logo-color.png", LOGO_AR = 1800 / 434;
const PADX = 110, CW = 1280, CH = 720;
const CARD_SHADOW = { type: "outer", color: "9CA3AF", blur: 16, offset: 5, angle: 90, opacity: 0.16 };

function bg(s, img) { s.background = { path: img }; }
function text(s, str, x, y, w, h, o = {}) {
  s.addText(str, { x: IN(x), y: IN(y), w: IN(w), h: IN(h), fontFace: o.font || SANS, fontSize: o.size || 13.5,
    color: o.color || C.ink700, bold: !!o.bold, italic: !!o.italic, align: o.align || "left", valign: o.valign || "top",
    charSpacing: o.charSpacing, lineSpacingMultiple: o.lh, margin: 0, wrap: true, ...(o.extra || {}) });
}
function eyebrow(s, str, x, y) { text(s, str.toUpperCase(), x, y, 1000, 22, { font: SANS, size: 11, bold: true, color: C.peri600, charSpacing: 1.6, valign: "middle" }); }
function rule(s, x, y) { s.addShape("roundRect", { x: IN(x), y: IN(y), w: IN(96), h: IN(4), fill: { color: C.orange }, line: { type: "none" }, rectRadius: IN(2) }); }
function card(s, x, y, w, h, o = {}) {
  s.addShape("roundRect", { x: IN(x), y: IN(y), w: IN(w), h: IN(h), fill: { color: o.fill || C.white },
    line: o.line === null ? { type: "none" } : { color: o.line || C.gray150, width: 1 }, rectRadius: IN(o.radius || 24),
    shadow: o.shadow === false ? undefined : (o.shadow || CARD_SHADOW) });
}
function pill(s, x, y, w, label, bgc, fg) {
  s.addShape("roundRect", { x: IN(x), y: IN(y), w: IN(w), h: IN(26), fill: { color: bgc }, line: { type: "none" }, rectRadius: IN(13) });
  text(s, label, x, y - 1, w, 26, { size: 10, bold: true, color: fg, align: "center", valign: "middle", charSpacing: 0.4 });
}
function pageNum(s, n) { text(s, n, CW - PADX - 60, CH - 92, 60, 22, { size: 11, bold: true, color: C.ink400, align: "right", valign: "middle" }); }
function footer(s) { text(s, "Alfred AI · One memory. The whole organisation. · E902 AI Labs · Seed · Confidential 2026", PADX, CH - 92, 980, 22, { size: 8.5, color: C.ink400, valign: "middle", charSpacing: 0.2 }); }
function logoBL(s) { const w = 150, h = w / LOGO_AR; s.addImage({ path: LOGO_COLOR, x: IN(PADX), y: IN(CH - 60 - h), w: IN(w), h: IN(h) }); return h; }

const STATUS = { LIVE: ["● LIVE", C.green100, C.greenText, 64], DEV: ["IN DEV", C.peri50, C.peri600, 64], PLAN: ["PLANNED", C.gray100, C.ink600, 84] };
const DELTA = { g: C.greenText, r: C.danger, n: C.ink500 };

// capability card
function capCard(s, x, y, w, h, title, body) {
  card(s, x, y, w, h, { fill: C.canvas, line: null, radius: 16, shadow: false });
  s.addShape("roundRect", { x: IN(x + 20), y: IN(y + 20), w: IN(4), h: IN(18), fill: { color: C.orange }, line: { type: "none" }, rectRadius: IN(2) });
  text(s, title, x + 32, y + 15, w - 50, 22, { font: DISPLAY, size: 12.5, bold: true, color: C.ink, charSpacing: -0.1 });
  text(s, body, x + 20, y + 44, w - 38, h - 54, { size: 9.5, color: C.ink600, lh: 1.28 });
}
function proofRow(s, y, stats) {
  eyebrow(s, "Proof of value", PADX, y - 22);
  const n = stats.length, colW = 1060 / n;
  stats.forEach((st, i) => {
    const x = PADX + i * colW;
    text(s, st[0], x, y, colW - 10, 34, { font: DISPLAY, size: 22, bold: true, color: C.orange, charSpacing: -0.5 });
    text(s, st[1], x, y + 32, colW - 16, 36, { size: 9.5, color: C.ink500, lh: 1.2 });
  });
}
function moduleDeepDive(s, cfg) {
  s.background = { color: C.white };
  eyebrow(s, "Product deep dive", PADX, 60);
  const st = STATUS[cfg.status];
  pill(s, CW - PADX - st[3], 58, st[3], st[0], st[1], st[2]);
  text(s, cfg.name, PADX, 82, 800, 44, { font: DISPLAY, size: 30, bold: true, color: C.ink, charSpacing: -0.6 });
  text(s, cfg.tagline, PADX, 138, 1000, 26, { size: 15, bold: true, color: C.ink, lh: 1.2 });
  text(s, cfg.subline, PADX, 168, 1000, 22, { size: 11, color: C.ink500, lh: 1.3 });
  const w = 342, gx = 17, hC = 128, y0 = 192;
  cfg.caps.forEach((cap, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    capCard(s, PADX + col * (w + gx), y0 + row * (hC + 10), w, hC, cap[0], cap[1]);
  });
  proofRow(s, 502, cfg.proof);
  footer(s); pageNum(s, cfg.page);
}

// ---- product app mock (styled like ui_kits/app) ----
function appScreen(s, x, y, w, h, cfg) {
  card(s, x, y, w, h, { fill: C.white, line: C.gray150, radius: 16, shadow: CARD_SHADOW });
  const chrome = 30;
  [C.orange, C.peri, "D9D9E2"].forEach((c, i) => s.addShape("ellipse", { x: IN(x + 20 + i * 16), y: IN(y + 11), w: IN(9), h: IN(9), fill: { color: c }, line: { type: "none" } }));
  text(s, "app.seekalfred.ai", x + 80, y + 5, w - 160, 20, { size: 8.5, color: C.ink400, align: "center", valign: "middle" });
  s.addShape("line", { x: IN(x), y: IN(y + chrome), w: IN(w), h: 0, line: { color: C.gray150, width: 1 } });
  const ay = y + chrome, ah = h - chrome, sbW = 170;
  s.addShape("line", { x: IN(x + sbW), y: IN(ay), w: 0, h: IN(ah), line: { color: C.gray150, width: 1 } });
  const lw = 74, lh = lw / LOGO_AR;
  s.addImage({ path: LOGO_COLOR, x: IN(x + 18), y: IN(ay + 16), w: IN(lw), h: IN(lh) });
  cfg.nav.forEach((n, i) => {
    const ny = ay + 52 + i * 32;
    if (n.active) s.addShape("roundRect", { x: IN(x + 12), y: IN(ny), w: IN(sbW - 24), h: IN(26), fill: { color: C.orange50 }, line: { type: "none" }, rectRadius: IN(8) });
    s.addShape("roundRect", { x: IN(x + 20), y: IN(ny + 7), w: IN(12), h: IN(12), fill: { color: n.active ? C.orange : "C7C7D2" }, line: { type: "none" }, rectRadius: IN(3) });
    text(s, n.label, x + 40, ny, sbW - 50, 26, { size: 9.5, bold: !!n.active, color: n.active ? C.orange600 : C.ink600, valign: "middle" });
  });
  const pf = ay + ah - 66;
  s.addShape("roundRect", { x: IN(x + 14), y: IN(pf), w: IN(sbW - 28), h: IN(28), fill: { color: C.orange }, line: { type: "none" }, rectRadius: IN(8) });
  text(s, "Alfred Pro", x + 24, pf, sbW - 40, 28, { size: 9, bold: true, color: C.white, valign: "middle" });
  s.addShape("ellipse", { x: IN(x + 16), y: IN(pf + 36), w: IN(20), h: IN(20), fill: { color: C.peri }, line: { type: "none" } });
  text(s, cfg.user, x + 42, pf + 36, sbW - 50, 20, { size: 8.5, bold: true, color: C.ink700, valign: "middle" });
  const mx = x + sbW, mw = w - sbW, pad = 16, hh = 44;
  s.addShape("line", { x: IN(mx), y: IN(ay + hh), w: IN(mw), h: 0, line: { color: C.gray150, width: 1 } });
  text(s, cfg.screenTitle, mx + pad, ay, mw - 200, hh, { font: DISPLAY, size: 14, bold: true, color: C.ink, valign: "middle" });
  s.addShape("roundRect", { x: IN(mx + mw - pad - 158), y: IN(ay + 9), w: IN(158), h: IN(26), fill: { color: C.canvas }, line: { color: C.gray150, width: 1 }, rectRadius: IN(13) });
  text(s, "Ask or search…", mx + mw - pad - 142, ay + 9, 142, 26, { size: 9, color: C.ink400, valign: "middle" });
  const cx0 = mx + pad, cw = mw - 2 * pad, cy0 = ay + hh + pad;
  const kn = cfg.kpis.length, kg = 12, kw = (cw - (kn - 1) * kg) / kn, khh = 76;
  cfg.kpis.forEach((k, i) => {
    const kx = cx0 + i * (kw + kg);
    card(s, kx, cy0, kw, khh, { fill: C.canvas, line: null, radius: 12, shadow: false });
    text(s, k[0], kx + 14, cy0 + 12, kw - 24, 16, { size: 8, bold: true, color: C.ink500 });
    text(s, k[1], kx + 14, cy0 + 28, kw - 24, 36, { font: DISPLAY, size: 22, bold: true, color: C.ink, charSpacing: -0.5 });
    text(s, k[2], kx + kw - 64, cy0 + 13, 50, 16, { size: 8.5, bold: true, color: DELTA[k[3]] || C.ink500, align: "right" });
  });
  const lowY = cy0 + khh + 14, lowH = (ay + ah) - lowY - pad, chartW = Math.round(cw * 0.56), listW = cw - chartW - 14;
  card(s, cx0, lowY, chartW, lowH, { fill: C.white, line: C.gray150, radius: 12, shadow: false });
  text(s, cfg.chartTitle, cx0 + 16, lowY + 12, chartW - 32, 18, { size: 9, bold: true, color: C.ink700 });
  s.addChart(pptx.ChartType.bar, [{ name: "v", labels: cfg.chart.map((_, i) => "" + (i + 1)), values: cfg.chart }], {
    x: IN(cx0 + 12), y: IN(lowY + 32), w: IN(chartW - 24), h: IN(lowH - 44), barDir: "col",
    chartColors: ["FF8431"], showLegend: false, showTitle: false, showCatAxis: false, showValAxis: false,
    catAxisHidden: true, valAxisHidden: true, valGridLine: { style: "none" }, catGridLine: { style: "none" }, barGapWidthPct: 45,
  });
  const lx = cx0 + chartW + 14;
  card(s, lx, lowY, listW, lowH, { fill: C.canvas, line: null, radius: 12, shadow: false });
  text(s, cfg.listTitle, lx + 14, lowY + 12, listW - 28, 18, { size: 9, bold: true, color: C.ink700 });
  cfg.listItems.forEach((it, i) => {
    const iy = lowY + 38 + i * 32;
    s.addShape("ellipse", { x: IN(lx + 14), y: IN(iy + 3), w: IN(6), h: IN(6), fill: { color: i === 0 ? C.orange : C.peri }, line: { type: "none" } });
    text(s, it, lx + 26, iy, listW - 40, 30, { size: 8, color: C.ink600, lh: 1.18 });
  });
}
function moduleProductView(s, cfg) {
  s.background = { color: C.white };
  eyebrow(s, "Product · " + cfg.name, PADX, 58);
  text(s, cfg.headline, PADX, 80, 1030, 62, { font: DISPLAY, size: 23, bold: true, color: C.ink, lh: 1.08, charSpacing: -0.4 });
  appScreen(s, PADX, 150, 1060, 462, cfg.screen);
  footer(s); pageNum(s, cfg.page);
}

// ---- module data (verbatim copy) ----
const MARKETING = {
  name: "Alfred for Marketing", status: "LIVE", page: "06",
  tagline: "Alfred knows what happened — and why.",
  subline: "Every conversation is stored as organisational memory. Nothing is lost.",
  caps: [
    ["Daily CMO Brief", "Overnight monitoring of all channels, ranked by business impact. The CMO sees what moved, why, and what needs a decision — before the first meeting."],
    ["Spend Mix Analysis", "Monitors marginal return per channel continuously. Flags diminishing returns before budget overshoots. Independent view of agency performance."],
    ["Creative Fatigue & Gen", "Tracks CTR decay and frequency. Triggers rotation before CPL is impacted. Generates briefs and copy from your own highest-performing history."],
    ["AI Visibility Score", "Measures brand citation in ChatGPT, Perplexity, Gemini, Copilot. Builds a prioritised content action list to close the AI citation gap."],
    ["Anomaly Alerts", "Detects broken pixels, ad account issues, ROAS collapse, email deliverability degradation — before the team wastes a day optimising on corrupted data."],
    ["KPI Dashboard", "Live spend-to-pipeline connection. Tracks MQL funnel, CAC payback, marketing-sourced ARR — without requiring Marketing Ops to build the report."],
  ],
  proof: [["70%", "Faster decision-making latency"], ["10–12%", "Reduction in ad spend waste"], ["10+", "Hours saved weekly on reporting"], ["5–10%", "ROI improvement per campaign"]],
};
const SALES = {
  name: "Alfred for Sales", status: "DEV", page: "08",
  tagline: "Alfred knows every deal — and why each one moves or stalls.",
  subline: "Deal history, relationship map, and pattern memory — all compounding.",
  caps: [
    ["AI Prospecting", "Monitors website visits, LinkedIn engagement, and content downloads. Routes high-intent triggers to the right rep within minutes — with a drafted first message."],
    ["Pre-Meeting Intelligence", "Before every call, generates a brief per attendee: role context, likely pain, risk flags, competitive intel, and the questions most likely to move the deal."],
    ["Pipeline Intelligence", "Generates the complete weekly pipeline review before the CSO opens their laptop. Signal-based forecast — not what reps say they'll close."],
    ["Deal Deviation Alerts", "Detects dark deals and stalled opportunities automatically. Flags delivery constraint risks and quarter-end commit gaps before it's too late to act."],
    ["Rep Coaching", "When a rep underperforms, generates a signal-based root cause with a specific coaching plan grounded in your own historical win/loss patterns."],
    ["Seek Alfred — CSO", "Answers any pipeline or deal question in plain language — which deals are most at risk, why a deal was really lost — with specific names and recommended actions."],
  ],
  proof: [["Signal-based", "Forecast — not rep self-reporting"], ["Day 1", "Onboarding intelligence for new reps"], ["1–2 wks", "Earlier pipeline shortfall warnings"], ["100%", "Deal context preserved across handovers"]],
};
const FINANCE = {
  name: "Alfred for Finance", status: "DEV", page: "10",
  tagline: "Alfred knows the numbers — and the story behind them.",
  subline: "Every financial pattern stored. Every decision traceable.",
  caps: [
    ["Revenue Forecast", "Confidence-weighted forecast from CRM signals, historical conversion rates, and rep bias correction — not from what reps report. Three-scenario models from real data."],
    ["Budget & Spend Control", "Flags department overruns before month-end with the specific cost centre, line item, and full-year projection. Sequences cuts by revenue risk, not percentage."],
    ["Cash Flow & Runway", "Continuously updated 30-day cash position from confirmed collections, contracted payables, and pipeline-weighted revenue. Covenant breach risk surfaces before the threshold is crossed."],
    ["Margin & Profitability", "Calculates gross margin by customer including cost-to-serve, support, and discount. Identifies the specific driver of margin compression — delivery cost, discount depth, or product mix."],
    ["Working Capital Intel", "Routes AR distress signals to CSO and CMO before commercial exposure deepens. Detects duplicate payment risks, early AP patterns, and unbilled revenue gaps."],
    ["Funding & Capital", "Generates a funding readiness brief before a raise. Benchmarks metrics against funded peers. Scores investors by thesis alignment, portfolio conflicts, and fund cycle position."],
  ],
  proof: [["Live", "30-day cash position, continuously updated"], ["0", "Surprises — AR distress flagged before invoice is missed"], ["Board-ready", "Financial narrative generated from live data"]],
};
const OPS = {
  name: "Alfred for Operations", status: "PLAN", page: "12",
  tagline: "Alfred knows the operation — and what's about to break.",
  subline: "Supply chain patterns, OTIF risk, and production deviations — all remembered.",
  caps: [
    ["Demand & Supply Planning", "Surfaces demand-supply gaps at 30-, 60-, and 90-day horizons. Flags systematic forecast bias before it drives inventory decisions in the wrong direction."],
    ["Inventory & Stock Intel", "Predicts stockout risk by SKU and site 14–30 days ahead. Identifies excess and slow-moving stock with a specific recommended action per category."],
    ["Production Planning", "Tracks actual output against the production plan daily — identifying deviations before they accumulate into a period-end shortfall. Monitors OEE by asset and plant."],
    ["Procurement & Supplier", "Monitors all open POs against expected delivery with production impact. Detects GRN discrepancies and quality rejections. Tracks supplier OTIF by material category."],
    ["OTIF & Fulfilment", "Predicts which specific orders are at risk of being late or short — before the delivery window closes. Identifies root cause and routes the fix to the correct function."],
    ["Operational Memory", "Every process change, its rationale, and its measured outcome — stored. Never respond to the same disruption from scratch again."],
  ],
  proof: [["14–30d", "Stockout prediction ahead of the inventory gap"], ["Order-level", "OTIF risk detected before delivery window closes"], ["Daily", "Production deviation flagged — not at month-end"], ["9", "Sub-modules across the full operations cycle"]],
};
const CEO = {
  name: "Alfred for CEO", status: "PLAN", page: "14",
  tagline: "Alfred synthesises the whole business into what needs your attention.",
  subline: "Cross-functional signals, strategic context, institutional memory — in one brief.",
  caps: [
    ["CEO Daily Brief", "Every morning: a ranked view of the most significant signals across every function — ordered by business impact. Filters relentlessly — the CEO only sees what genuinely requires a decision."],
    ["Strategic Intelligence", "Generates market entry, M&A, and annual strategy briefs grounded in company-specific operational and financial data — not generic market research."],
    ["Whole-Business Risk", "Traces margin compression to its source across all functions. Translates OTIF failures and stockout predictions into revenue at risk and customer retention risk."],
    ["Board & Investor Intel", "Generates the complete board narrative — performance, risks, key decisions, forward scenarios — from live company data. Tracks every investor commitment against delivery."],
    ["Organisational Memory", "Retrieves the full context of any past strategic decision — what was known, what alternatives were considered, what the outcome was. A new leader gets a complete brief from day one."],
    ["Cross-Function Synthesis", "Connects signals no single module can see: a supply shortfall that becomes a revenue forecast risk; AR distress that should pause a sales expansion conversation."],
  ],
  proof: [["218", "Use cases — the broadest Alfred module"], ["Day 1", "Complete intelligence brief for any new leader"], ["Minutes", "Board pack generated from live data, not spreadsheets"], ["Zero", "Cross-functional risks that compound unseen"]],
};
const SCREENS = {
  marketing: { user: "Priya · CMO", screenTitle: "KPI Cockpit", chartTitle: "Blended ROAS · last 8 weeks", chart: [3.1, 3.4, 3.2, 3.8, 4.0, 3.7, 4.5, 4.8],
    nav: [{ label: "Home" }, { label: "KPI Cockpit", active: true }, { label: "Spend & ROI" }, { label: "Decision Alerts" }, { label: "Creative" }],
    kpis: [["Blended ROAS", "4.8x", "+12.4%", "g"], ["Marketing Spend", "$312K", "+6.1%", "n"], ["Blended CAC", "$184", "−8.0%", "g"]],
    listTitle: "Daily CMO brief", listItems: ["Meta CPL up 18% — creative fatigue, 25–34", "Reallocate $40K Search → LinkedIn", "AI visibility flat vs two competitors"] },
  sales: { user: "Rahul · CSO", screenTitle: "Pipeline Intelligence", chartTitle: "Pipeline coverage · 8 weeks", chart: [2.8, 3.1, 3.4, 3.2, 3.6, 3.9, 4.0, 4.2],
    nav: [{ label: "Home" }, { label: "Pipeline", active: true }, { label: "Deals" }, { label: "Coaching" }, { label: "Seek Alfred" }],
    kpis: [["Weighted Pipeline", "$4.2M", "+9%", "g"], ["Signal Forecast", "$1.8M", "+5%", "g"], ["At-risk Deals", "7", "−2", "g"]],
    listTitle: "Deal deviation alerts", listItems: ["Acme renewal stalled 14d — exec dark", "Globex commit gap $220K vs quota", "Initech: delivery risk flagged by Ops"] },
  finance: { user: "Anita · CFO", screenTitle: "Cash & Forecast", chartTitle: "Cash position · 30 days", chart: [2.1, 2.3, 2.2, 2.4, 2.5, 2.5, 2.6, 2.6],
    nav: [{ label: "Home" }, { label: "Forecast", active: true }, { label: "Cash & Runway" }, { label: "Margins" }, { label: "Seek Alfred" }],
    kpis: [["30-day Cash", "$2.6M", "+4%", "g"], ["Runway", "14 mo", "+1mo", "g"], ["Gross Margin", "61%", "−2%", "r"]],
    listTitle: "Finance signals", listItems: ["AR distress: Northwind 38d overdue", "Dept overrun: Eng +12% vs plan", "Covenant headroom tightening"] },
  ops: { user: "Sameer · COO", screenTitle: "Operations Control", chartTitle: "OTIF · last 8 weeks", chart: [88, 90, 89, 91, 92, 93, 93, 94],
    nav: [{ label: "Home" }, { label: "Planning", active: true }, { label: "Inventory" }, { label: "OTIF" }, { label: "Suppliers" }],
    kpis: [["OTIF", "94%", "+3%", "g"], ["Stockout Risk", "6 SKUs", "−4", "g"], ["OEE", "82%", "+1%", "g"]],
    listTitle: "Operational alerts", listItems: ["SKU-2290 stockout risk in 18 days", "PO-4471 late — production impact", "Supplier OTIF dropped to 88%"] },
  ceo: { user: "Founder · CEO", screenTitle: "CEO Daily Brief", chartTitle: "Business momentum · 8 weeks", chart: [4.2, 4.5, 4.6, 4.7, 4.8, 4.9, 5.0, 5.1],
    nav: [{ label: "Daily Brief", active: true }, { label: "Strategy" }, { label: "Risk" }, { label: "Board" }, { label: "Seek Alfred" }],
    kpis: [["Revenue QTD", "$5.1M", "+8%", "g"], ["Risk Signals", "3", "−1", "g"], ["Cash Runway", "14 mo", "flat", "n"]],
    listTitle: "What needs you today", listItems: ["Supply shortfall → Q3 revenue risk", "AR distress should pause Acme expansion", "Board pack ready — 2 decisions to review"] },
};

// ============================================================
//  01 — Cover
// ============================================================
(function () {
  const s = pptx.addSlide(); bg(s, BG.cover);
  eyebrow(s, "Alfred AI", PADX, 196);
  text(s, "The organisational memory layer.", PADX, 230, 1010, 180, { font: DISPLAY, size: 50, bold: true, color: C.orange, lh: 1.0, charSpacing: -1 });
  rule(s, PADX, 446);
  text(s, "Alfred AI is the organisational memory layer — connecting every function's data into a single continuously updated intelligence that watches, warns, recommends, and acts.",
    PADX, 478, 900, 90, { size: 15, color: C.ink600, lh: 1.45 });
  const h = logoBL(s);
  text(s, "Seed · 2026 · Confidential   ·   E902 AI Labs Private Limited", CW - PADX - 560, CH - 60 - h + (h - 22) / 2, 560, 22, { size: 11, color: C.ink500, align: "right", valign: "middle" });
})();

// ============================================================
//  02 — The Problem: two jobs
// ============================================================
(function () {
  const s = pptx.addSlide(); s.background = { color: C.white };
  eyebrow(s, "The problem", PADX, 92);
  text(s, "The C-Suite has two important jobs.", PADX, 116, 1060, 56, { font: DISPLAY, size: 34, bold: true, color: C.ink, charSpacing: -0.6 });
  // should be doing
  card(s, PADX, 200, 500, 300, { fill: C.canvas, line: null, shadow: false });
  text(s, "Should be doing", PADX + 28, 224, 444, 22, { size: 11, bold: true, color: C.greenText, charSpacing: 0.4 });
  [["Create value for their customers", "Direction, customer insight, what to build next."],
   ["Get more customers", "GTM strategy, key relationships, the narrative that wins deals."]].forEach((it, i) => {
    const y = 262 + i * 100;
    text(s, it[0], PADX + 28, y, 444, 26, { font: DISPLAY, size: 18, bold: true, color: C.ink });
    text(s, it[1], PADX + 28, y + 32, 444, 50, { size: 12.5, color: C.ink600, lh: 1.35 });
  });
  // actually doing
  card(s, 660, 200, 510, 300, { fill: C.white, line: C.gray150 });
  text(s, "Actually doing", 688, 224, 454, 22, { size: 11, bold: true, color: C.orange600, charSpacing: 0.4 });
  [["CEO", "Discovering in the room that every function brought a different version of the same business."],
   ["CFO", "Losing days to board prep, chasing four teams for numbers that never reconcile."],
   ["COO", "Finding out mid-delivery that sales over-committed, blind to what ops could actually deliver."]].forEach((it, i) => {
    const y = 258 + i * 74;
    pill(s, 688, y, 54, it[0], C.orange50, C.orange600);
    text(s, it[1], 754, y - 2, 392, 64, { size: 11.5, color: C.ink600, lh: 1.3 });
  });
  text(s, "The org has no memory, so its sharpest people spend their days rebuilding context instead of creating value.",
    PADX, 528, 1060, 40, { size: 14, bold: true, color: C.ink, lh: 1.35 });
  footer(s); pageNum(s, "02");
})();

// ============================================================
//  03 — The Problem (deep)
// ============================================================
(function () {
  const s = pptx.addSlide(); s.background = { color: C.white };
  eyebrow(s, "The problem", PADX, 92);
  text(s, "Every function has a brilliant mind. The org has no memory.", PADX, 116, 1060, 56, { font: DISPLAY, size: 32, bold: true, color: C.ink, charSpacing: -0.6 });
  const cards = [
    ["Every function thinks alone", "Marketing knows its campaigns. Finance knows its numbers. Ops knows its patterns. Each is capable but none of it connects into one picture."],
    ["Same Mistakes Recur", "You're in the board meeting. Someone asks about pipeline velocity. Your best answer is last quarter's number. The real answer is buried in four spreadsheets nobody's reconciled."],
    ["History disappears in motion", "A decision gets made. Six months later nobody can trace whether it worked, why it worked, or whether to do it again. The context behind it disappears."],
  ];
  const w = 337, gap = 24, y = 210, h = 250;
  cards.forEach((c, i) => {
    const x = PADX + i * (w + gap);
    card(s, x, y, w, h, {});
    s.addShape("roundRect", { x: IN(x + 26), y: IN(y + 26), w: IN(34), h: IN(6), fill: { color: C.orange }, line: { type: "none" }, rectRadius: IN(3) });
    text(s, c[0], x + 26, y + 48, w - 52, 56, { font: DISPLAY, size: 18, bold: true, color: C.ink, lh: 1.05, charSpacing: -0.2 });
    text(s, c[1], x + 26, y + 116, w - 52, 120, { size: 11.5, color: C.ink600, lh: 1.4 });
  });
  text(s, "The right data is never in the right place at the right time. By the time you find it, the decision is already made.",
    PADX, 500, 1060, 40, { size: 13.5, bold: true, color: C.ink, lh: 1.35 });
  footer(s); pageNum(s, "03");
})();

// ============================================================
//  04 — How it works
// ============================================================
(function () {
  const s = pptx.addSlide(); s.background = { color: C.white };
  eyebrow(s, "How it works", PADX, 92);
  text(s, "Just connect your tools, Alfred does the rest.", PADX, 116, 1060, 56, { font: DISPLAY, size: 34, bold: true, color: C.ink, charSpacing: -0.6 });
  const steps = [
    ["Connect Everything", "CRM, ERP, Email, Meetings, Campaigns, Documents, Slack. One integration layer."],
    ["Remember Forever", "Persistent memory across all sessions, all functions, all decisions."],
    ["Act with Approval", "Agentic execution with human approval for every consequential action. Audit trail on."],
  ];
  const colW = 333, gap = 30, y = 252;
  steps.forEach((st, i) => { const x = PADX + i * (colW + gap); if (i < 2) s.addShape("line", { x: IN(x + 54), y: IN(y + 19), w: IN(colW + gap - 44), h: 0, line: { color: C.gray150, width: 2 } }); });
  steps.forEach((st, i) => {
    const x = PADX + i * (colW + gap);
    s.addShape("roundRect", { x: IN(x), y: IN(y), w: IN(40), h: IN(40), fill: { color: C.orange }, line: { type: "none" }, rectRadius: IN(12), shadow: { type: "outer", color: C.orange, blur: 10, offset: 3, angle: 90, opacity: 0.45 } });
    text(s, String(i + 1), x, y, 40, 40, { font: DISPLAY, size: 15, bold: true, color: C.white, align: "center", valign: "middle" });
    text(s, st[0], x, y + 58, colW - 12, 28, { font: DISPLAY, size: 17, bold: true, color: C.ink, charSpacing: -0.2 });
    text(s, st[1], x, y + 92, colW - 12, 120, { size: 12, color: C.ink600, lh: 1.35 });
  });
  ["Persistent", "Cross-functional", "Compounding", "Human-in-the-loop"].forEach((t, i) => {
    pill(s, PADX + i * (200 + 20), 500, 200, t, C.orange50, C.orange600);
  });
  footer(s); pageNum(s, "04");
})();

// ============================================================
//  05 — The Platform: five modules
// ============================================================
(function () {
  const s = pptx.addSlide(); s.background = { color: C.white };
  eyebrow(s, "Alfred platform", PADX, 84);
  text(s, "Five Modules. One Memory.", PADX, 108, 760, 52, { font: DISPLAY, size: 34, bold: true, color: C.ink, charSpacing: -0.6 });
  text(s, "Each new module adds cross-functional depth to Alfred's shared memory.", PADX, 168, 1000, 24, { size: 12.5, color: C.ink500 });
  const cols = [
    { role: "CMO", st: STATUS.LIVE, items: ["Spend Mix Optimizer", "Creative Fatigue Intelligence", "Creative Generation", "AI Visibility (AEO)", "Unified KPI Cockpit", "Daily CMO Bulletin"] },
    { role: "CFO", st: STATUS.DEV, items: ["P&L Intelligence", "AP & AR Intelligence", "Financial Health optimization", "Forecast Engine", "Board Pack Automation", "Daily CFO Bulletin"] },
    { role: "CSO", st: STATUS.DEV, items: ["Sales Play", "Deal Deviation", "Revenue Signal", "Coaching Intelligence", "Daily CSO Bulletin"] },
    { role: "COO", st: STATUS.PLAN, items: ["Supply Chain", "Demand Signals", "Vendor Memory", "Daily COO Bulletin"] },
    { role: "CEO", st: STATUS.PLAN, items: ["Cross Functional Intelligence", "Board Prep", "Daily CEO Bulletin"] },
  ];
  const n = 5, gap = 14, w = (1060 - (n - 1) * gap) / n, y = 212, h = 322;
  cols.forEach((col, i) => {
    const x = PADX + i * (w + gap);
    card(s, x, y, w, h, { radius: 18 });
    text(s, col.role, x + 18, y + 20, w - 36, 26, { font: DISPLAY, size: 18, bold: true, color: C.ink });
    pill(s, x + 18, y + 50, Math.min(col.st[3], w - 36), col.st[0], col.st[1], col.st[2]);
    col.items.forEach((it, j) => {
      const iy = y + 92 + j * 32;
      s.addShape("ellipse", { x: IN(x + 18), y: IN(iy + 11), w: IN(5), h: IN(5), fill: { color: C.orange }, line: { type: "none" } });
      text(s, it, x + 30, iy, w - 44, 28, { size: 9.5, color: C.ink700, lh: 1.05, valign: "middle" });
    });
  });
  footer(s); pageNum(s, "05");
})();

// ============================================================
//  06–15 — module deep-dives + product views
// ============================================================
moduleDeepDive(pptx.addSlide(), MARKETING);
moduleProductView(pptx.addSlide(), { name: "Alfred for Marketing", page: "07", headline: "Alfred knows what happened — and why.", screen: SCREENS.marketing });
moduleDeepDive(pptx.addSlide(), SALES);
moduleProductView(pptx.addSlide(), { name: "Alfred for Sales", page: "09", headline: "Alfred knows every deal — and why each one moves or stalls.", screen: SCREENS.sales });
moduleDeepDive(pptx.addSlide(), FINANCE);
moduleProductView(pptx.addSlide(), { name: "Alfred for Finance", page: "11", headline: "Alfred knows the numbers — and the story behind them.", screen: SCREENS.finance });
moduleDeepDive(pptx.addSlide(), OPS);
moduleProductView(pptx.addSlide(), { name: "Alfred for Operations", page: "13", headline: "Alfred knows what the line can deliver, before sales makes the commitment.", screen: SCREENS.ops });
moduleDeepDive(pptx.addSlide(), CEO);
moduleProductView(pptx.addSlide(), { name: "Alfred for CEO", page: "15", headline: "Alfred synthesises the whole business into what needs your attention.", screen: SCREENS.ceo });

// ============================================================
//  16 — Category statement
// ============================================================
(function () {
  const s = pptx.addSlide(); s.background = { color: C.canvas };
  eyebrow(s, "The landscape", PADX, 100);
  text(s, "Each category leads on something different.", PADX, 126, 1010, 70, { font: DISPLAY, size: 38, bold: true, color: C.ink, charSpacing: -0.7 });
  card(s, PADX, 226, 1060, 360, { fill: C.white, line: C.gray150, radius: 16 });
  [C.orange, C.peri, "D9D9E2"].forEach((c, i) => s.addShape("ellipse", { x: IN(PADX + 22 + i * 16), y: IN(238), w: IN(9), h: IN(9), fill: { color: c }, line: { type: "none" } }));
  s.addShape("line", { x: IN(PADX), y: IN(256), w: IN(1060), h: 0, line: { color: C.gray150, width: 1 } });
  text(s, "Competitive landscape — drop the category map here", PADX, 226 + 360 / 2, 1060, 24, { size: 12, color: C.ink400, align: "center", valign: "middle" });
  footer(s); pageNum(s, "16");
})();

// ============================================================
//  17 — Why now
// ============================================================
(function () {
  const s = pptx.addSlide(); s.background = { color: C.white };
  eyebrow(s, "Why now", PADX, 92);
  text(s, "The bottleneck just moved to memory.", PADX, 116, 1060, 56, { font: DISPLAY, size: 34, bold: true, color: C.ink, charSpacing: -0.6 });
  text(s, "Every enterprise wants AI in its operations, and most don't know how.", PADX, 178, 1000, 24, { size: 12.5, color: C.ink500 });
  const cards = [
    ["The Demand", "The mandate is universal. Companies are pouring budget into embedding AI — and the spending isn't slowing, even as pilots fail."],
    ["The Verdict", "Memory-less AI doesn't pay back. MIT named the cause the “learning gap” — tools that never learn the organisation."],
    ["The Blind Spot", "The budget is there — but most leaders don't know which AI use cases are relevant to them. Spend without direction is why the pilots stall."],
    ["The Unlock", "The context layer used to be built by hand — analysts curating semantic models and knowledge graphs over months. In 2026, AI builds and maintains it automatically. The work is finally automatable — and that's Alfred."],
  ];
  const w = 250, gap = 20, y = 224, h = 256;
  cards.forEach((c, i) => {
    const x = PADX + i * (w + gap);
    card(s, x, y, w, h, { fill: C.canvas, line: null, shadow: false });
    text(s, c[0].toUpperCase(), x + 22, y + 22, w - 40, 20, { size: 10, bold: true, color: C.peri600, charSpacing: 0.6 });
    text(s, c[1], x + 22, y + 54, w - 40, h - 74, { size: 11, color: C.ink700, lh: 1.36 });
  });
  footer(s); pageNum(s, "17");
})();

// ============================================================
//  18 — Closing: the memory clock
// ============================================================
(function () {
  const s = pptx.addSlide(); bg(s, BG.cover);
  eyebrow(s, "The memory clock is already running", PADX, 168);
  text(s, "Every day without Alfred, the org resets.\nEvery day with Alfred, it compounds.", PADX, 200, 1010, 170,
    { font: DISPLAY, size: 38, bold: true, color: C.ink, lh: 1.08, charSpacing: -0.7 });
  text(s, "The gap between those two trajectories is the opportunity. The C-Suite has two jobs. Alfred AI handles everything else.",
    PADX, 372, 760, 70, { size: 15, color: C.ink600, lh: 1.45 });
  const chipW = 320, chipY = 462;
  s.addShape("roundRect", { x: IN(PADX), y: IN(chipY), w: IN(chipW), h: IN(50), fill: { color: C.orange }, line: { type: "none" }, rectRadius: IN(25), shadow: { type: "outer", color: C.orange, blur: 14, offset: 4, angle: 90, opacity: 0.5 } });
  text(s, "shitanshu@e902.ai   ·   anand@e902.ai", PADX, chipY, chipW, 50, { size: 13, bold: true, color: C.white, align: "center", valign: "middle" });
  text(s, "E902 AI Labs Private Limited · Confidential 2026", PADX, 540, 600, 24, { size: 12, color: C.ink500 });
})();

// ---- write ----
const OUT = "Alfred AI Solutions Deck.pptx";
pptx.writeFile({ fileName: OUT }).then((f) => console.log("WROTE", f)).catch((e) => { console.error(e); process.exit(1); });
