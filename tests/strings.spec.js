import { test, expect } from "@playwright/test";

/* Long strings. Every fixture in this repo is short English; real copy is not.
   German UI text runs about 35% longer, and a single unbreakable token — a
   compound noun, a URL, an account ID, a file name — has no break opportunity
   at all.

   The failure mode is NOT overflow, which is the thing worth understanding.
   A flex item's automatic minimum size is its MIN-CONTENT size, so a component
   holding an unbreakable word does not overflow its box: the box grows, taking
   the whole row with it. That is why a global `overflow-wrap: break-word`
   (which this system now has, and should) fixed exactly none of these on its
   own — nothing was overflowing. The container has to be allowed to shrink
   first, and only then does breaking or truncating have anything to act on.

   Rendered in a plain 360px BLOCK container, deliberately. The playground's
   canvas is a flex container, and a flex item's `min-width: auto` floor beats
   its `max-width: 100%`, so sweeping there reports failures that no ordinary
   page would ever see: PageHeader, DateRangePicker, AlfredMessage and
   ReasoningState all looked broken there and are all completely fine here. */

const LONG = "Kundenzufriedenheitsumfrageergebnisauswertungsverfahren Bericht";

const CASES = [
  ["BillingPlanCard", { plan: LONG, price: "$49", period: LONG, renewal: LONG }],
  ["PageHeader", { title: LONG, subtitle: LONG }],
  ["FilterBar", { filters: [{ id: "a", label: LONG, options: [{ value: "x", label: LONG }] }] }],
  ["AuditLogRow", { actor: LONG, action: LONG, target: LONG, time: "2m", detail: LONG }],
  ["SyncStatusBadge", { status: "fresh", label: LONG }],
  ["UsageMeter", { label: LONG, used: 8400, limit: 10000, unit: LONG }],
  ["DateRangePicker", { label: LONG }],
  ["AlfredMessage", { text: LONG }],
  ["ReasoningState", { label: LONG }],
  ["NumberInput", { label: LONG }],
  ["DonutChart", { segments: [{ label: LONG, value: 60 }, { label: "Social", value: 40 }] }],
];

for (const [name, props] of CASES) {
  test(`${name} keeps a 55-character unbreakable word inside its box`, async ({ page }) => {
    await page.goto("/tests/harness.html");
    await page.waitForSelector("body[data-ready='1']", { timeout: 15000 });
    const worst = await page.evaluate(([n, p]) => {
      const ns = window.AlfredAIDesignSystem_1ce241;
      document.body.innerHTML = "<div id='box' style='width:360px'></div>";
      document.body.style.margin = "0";
      const box = document.getElementById("box");
      ReactDOM.createRoot(box).render(React.createElement(ns[n], p));
      return new Promise((res) => setTimeout(() => {
        const bb = box.getBoundingClientRect();
        let worst = 0;
        const walk = (el) => {
          // a spill inside a clipping or scrolling ancestor is contained, which
          // is what those containers are for — including the charts' own hidden
          // data table, which is deliberately far wider than its 1px wrapper
          let clipped = false;
          for (let a = el.parentElement; a && a !== box.parentElement; a = a.parentElement) {
            const ox = getComputedStyle(a).overflowX;
            if (ox === "auto" || ox === "scroll" || ox === "hidden" || ox === "clip") { clipped = true; break; }
          }
          const b = el.getBoundingClientRect();
          if (!clipped && b.width > 0) worst = Math.max(worst, Math.round(b.right - bb.right));
          [...el.children].forEach(walk);
        };
        [...box.children].forEach(walk);
        res(worst);
      }, 300));
    }, [name, props]);
    // 1px of tolerance for subpixel rounding, not for a real spill
    expect(worst).toBeLessThanOrEqual(1);
  });
}
