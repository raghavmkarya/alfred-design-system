import { test, expect } from "@playwright/test";

/* WCAG 2.5.8 Target Size (Minimum) — AA in WCAG 2.2. A pointer target must be
   at least 24×24 CSS px.

   The icon-only dismiss and remove buttons here draw a 14–16px glyph, which is
   a deliberate visual choice and not the thing to change: a control can be
   small to look at and large to hit. `HitArea` gives each of them a transparent
   absolutely-positioned child that overhangs the button, so the target grows
   and not one rendered pixel moves. That is why this measures the UNION of the
   button and its descendants rather than the button's own box — measuring the
   button alone would report every one of these as still broken.

   Deliberately NOT asserted, and worth writing down so the next person does not
   "fix" them:

   - **Text links and text buttons.** `IntegrationCard`, `ModuleStatusCard` and
     `Callout` have targets 14–18px tall because that is a line of text. 2.5.8
     exempts targets in a sentence or block of text, and padding them to 24px
     would put visible gaps in prose.
   - **`DataTable`'s column sort buttons** are the header text itself, same
     exemption.
   - **`Tabs` at 11px wide is a fixture artifact.** The playground generates
     single-character tab labels; a real label makes the tab far wider. Sweeping
     generated defaults measures the fixtures, not the component.
   - **`Slider` / `ScenarioSimulator` range inputs** report a 6px-tall box, but
     the target is the thumb, which the UA hit-tests with its own slop. Native
     range inputs are their own problem and not this one. */

/* Handlers are named, not passed: a function cannot be serialized into
   page.evaluate, and each of these controls only renders when its callback is
   present. They are attached as no-ops inside the page. */
const CASES = [
  ["Chip", { children: "Search" }, ["onRemove"], "[aria-label='Remove']"],
  ["Toast", { title: "Saved" }, ["onClose"], "[aria-label='Dismiss']"],
  ["Banner", { tone: "info", title: "Heads up" }, ["onDismiss"], "[aria-label='Dismiss']"],
  ["Drawer", { open: true, title: "Filters", children: "x" }, ["onClose"], "[aria-label='Close']"],
];

for (const [name, props, handlers, sel] of CASES) {
  test(`${name}: its icon-only control is a 24x24 target`, async ({ page }) => {
    await page.goto("/tests/harness.html");
    await page.waitForSelector("body[data-ready='1']", { timeout: 15000 });
    const box = await page.evaluate(([n, p, hs, s]) => {
      const ns = window.AlfredAIDesignSystem_1ce241;
      document.body.innerHTML = "<div id='box'></div>";
      const withHandlers = { ...p };
      for (const h of hs) withHandlers[h] = () => {};
      ReactDOM.createRoot(document.getElementById("box"))
        .render(React.createElement(ns[n], withHandlers));
      return new Promise((res) => setTimeout(() => {
        const el = document.querySelector(s);
        if (!el) return res(null);
        // the effective target: the button's box unioned with anything inside it
        let { left, top, right, bottom } = el.getBoundingClientRect();
        for (const k of el.querySelectorAll("*")) {
          const r = k.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) continue;
          left = Math.min(left, r.left); top = Math.min(top, r.top);
          right = Math.max(right, r.right); bottom = Math.max(bottom, r.bottom);
        }
        res({ w: Math.round(right - left), h: Math.round(bottom - top) });
      }, 300));
    }, [name, props, handlers, sel]);
    expect(box).not.toBeNull();
    expect(box.w).toBeGreaterThanOrEqual(24);
    expect(box.h).toBeGreaterThanOrEqual(24);
  });
}

test("the hit area costs no layout: a chip is the same size with and without one", async ({ page }) => {
  // the whole justification for the overhang approach. If HitArea ever starts
  // taking part in layout, this catches it before a visual baseline does.
  await page.goto("/tests/harness.html");
  await page.waitForSelector("body[data-ready='1']", { timeout: 15000 });
  const sizes = await page.evaluate(() => {
    const ns = window.AlfredAIDesignSystem_1ce241;
    document.body.innerHTML = "<div id='a'></div><div id='b'></div>";
    ReactDOM.createRoot(document.getElementById("a"))
      .render(React.createElement(ns.Chip, { children: "Search" }));
    ReactDOM.createRoot(document.getElementById("b"))
      .render(React.createElement(ns.Chip, { children: "Search", onRemove: () => {} }));
    return new Promise((res) => setTimeout(() => {
      const h = (id) => Math.round(document.querySelector(`#${id} > *`).getBoundingClientRect().height);
      res({ plain: h("a"), removable: h("b") });
    }, 300));
  });
  // the remove button adds width, never height — the overhang is out of flow
  expect(sizes.removable).toBe(sizes.plain);
});
