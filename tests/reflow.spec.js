import { test, expect } from "@playwright/test";

/* WCAG 1.4.10 reflow: content must work at a 320px CSS viewport without a
   second scroll axis. Nothing in this repo had ever rendered below 1240px, and
   the `visual` and `interaction` gates both pin that one width — so this was a
   suite that could only ever see one input.

   The bug it exists to catch is the reason it has to run in a browser: the
   charts' visually-hidden data table was `position: absolute; width: 1px;
   overflow: hidden`, the standard sr-only recipe. A TABLE box ignores a width
   below its min-content width, and `overflow` does not clip it, so it laid out
   at its natural ~390px and — being absolutely positioned — contributed all of
   it to the page's scrollable overflow. One chart on a 320px page made the
   document 389px wide: 69px of horizontal scroll caused by an element that
   paints nothing at all.

   No static rule could find that. The declaration is the correct, canonical
   sr-only idiom; only the box it lands on makes it wrong. */
test.use({ viewport: { width: 320, height: 720 } });

const CHARTS = [
  ["StackedBarChart", { data: [{ label: "Q1", search: 40, social: 20 }, { label: "Q2", search: 30, social: 10 }], keys: ["search", "social"] }],
  ["AreaChart", { points: [12, 18, 15, 24], labels: ["W1", "W2", "W3", "W4"] }],
  ["LineChart", { points: [12, 18, 15, 24], labels: ["W1", "W2", "W3", "W4"] }],
  ["ScatterChart", { points: [{ x: 20, y: 20, label: "A" }, { x: 80, y: 80, label: "B" }], xMax: 100, yMax: 100, xLabel: "Spend", yLabel: "ROAS" }],
  ["SankeyChart", { nodes: [{ id: "paid", label: "Paid", col: 0 }, { id: "won", label: "Won", col: 1 }], links: [{ source: "paid", target: "won", value: 120 }] }],
  ["DonutChart", { segments: [{ label: "Search", value: 60 }, { label: "Social", value: 40 }] }],
  ["GaugeChart", { value: 72, max: 100, label: "Pacing" }],
  ["WaterfallChart", { steps: [{ label: "Start", value: 100 }, { label: "Paid", value: -20 }] }],
  ["BulletChart", { items: [{ label: "Search", value: 80, target: 100, max: 120 }] }],
  ["Sparkline", { points: [12, 18, 15, 24] }],
];

/* Renders ONE component alone on an otherwise empty 320px page and reports the
   document's own overflow. Alone is the point: a shared page lets one wide
   sibling mask or manufacture a result. */
async function soloOverflow(page, name, props) {
  return page.evaluate(([n, p]) => {
    const ns = window.AlfredAIDesignSystem_1ce241;
    document.body.innerHTML = "<div id='solo'></div>";
    document.documentElement.style.margin = "0";
    document.body.style.margin = "0";
    ReactDOM.createRoot(document.getElementById("solo"))
      .render(React.createElement(ns[n], p));
    return new Promise((res) => setTimeout(() => {
      const de = document.documentElement;
      res({ scroll: de.scrollWidth, client: de.clientWidth });
    }, 350));
  }, [name, props]);
}

for (const [name, props] of CHARTS) {
  test(`${name} reflows to 320px without a second scroll axis`, async ({ page }) => {
    await page.goto("/tests/harness.html");
    await page.waitForSelector("body[data-ready='1']", { timeout: 15000 });
    const r = await soloOverflow(page, name, props);
    expect(r.scroll).toBeLessThanOrEqual(r.client);
  });
}

/* Worth being exact about what the ten tests above do and do not prove.
   Reverting the fix fails only TWO of them: a chart's hidden table is only wide
   enough to spill 320px when its data makes it so, and most of these fixtures
   are two-row. They are a real reflow gate for each chart, but they are NOT a
   reliable guard on THIS bug. The structural assertion below is. */
test("the hidden chart table is clipped by a block container, not by the table", async ({ page }) => {
  // the fix, asserted structurally as well as by its effect: reverting the
  // HIDDEN style back onto the <table> reinstates 69px of page scroll above
  await page.goto("/tests/harness.html");
  await page.waitForSelector("body[data-ready='1']", { timeout: 15000 });
  const shape = await page.evaluate(() => {
    const t = document.querySelector("[data-testid='cursor-line'] table");
    if (!t) return null;
    const wrap = t.parentElement;
    const cs = getComputedStyle(wrap);
    return { tag: wrap.tagName.toLowerCase(), width: cs.width, overflow: cs.overflow, position: cs.position };
  });
  expect(shape).not.toBeNull();
  expect(shape.tag).toBe("div");            // a block container, where width+overflow actually clip
  expect(shape.width).toBe("1px");
  expect(shape.position).toBe("absolute");
  expect(shape.overflow).toBe("hidden");
});
