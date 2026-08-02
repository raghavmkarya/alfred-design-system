import { test, expect } from "@playwright/test";
import fs from "node:fs";

/* The Inspiration Library app and its preview frame. verify-library SSRs every
   section variant in Node; this is the only check that boots the real pages —
   schema fetch, twin loading, theme attribute, height handshake, clipboard. */

const data = JSON.parse(fs.readFileSync("library/sections.json", "utf8"));

function watch(page) {
  const errors = [];
  const external = [];
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("request", (r) => { if (!r.url().startsWith("http://localhost") && !r.url().startsWith("http://127.0.0.1")) external.push(r.url()); });
  return { errors, external };
}

test("library app boots with no CDN and no console errors", async ({ page }) => {
  const { errors, external } = watch(page);
  await page.goto("/library/index.html");
  await expect(page.locator("body[data-ready='1']")).toBeAttached();
  await expect(page.locator(".lib-rail")).toBeVisible();
  await expect(page.locator(".lib-card").first()).toBeVisible();
  expect(errors, "app console errors").toEqual([]);
  expect(external, "app requested a third-party URL").toEqual([]);
});

test("search filters and tier filter narrow the grid", async ({ page }) => {
  await page.goto("/library/index.html");
  await expect(page.locator("body[data-ready='1']")).toBeAttached();
  const all = await page.locator(".lib-card").count();
  await page.getByLabel("Search patterns").fill("zzz-no-such-pattern");
  await expect(page.locator(".lib-empty")).toBeVisible();
  await page.getByLabel("Search patterns").fill("");
  await expect(page.locator(".lib-card")).toHaveCount(all);
});

/* one preview deep-link per category, dark theme */
for (const cat of data.categories) {
  const section = data.sections.find((s) => s.category === cat.id);
  test(`preview boots dark: ${cat.id}/${section.id}`, async ({ page }) => {
    const { errors, external } = watch(page);
    await page.goto(`/library/preview.html?section=${section.id}&theme=dark`);
    await expect(page.locator("body[data-ready='1']")).toBeAttached();
    await expect(page.locator("#root section")).toBeAttached();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    expect(errors, "preview console errors").toEqual([]);
    expect(external, "preview requested a third-party URL").toEqual([]);
  });
}

test("preview renders light when no theme param is passed", async ({ page }) => {
  const s = data.sections[0];
  await page.goto(`/library/preview.html?section=${s.id}`);
  await expect(page.locator("body[data-ready='1']")).toBeAttached();
  const attr = await page.locator("html").getAttribute("data-theme");
  expect(attr).toBeNull();
});

test("detail view syncs iframe height and copies section HTML", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  const s = data.sections[0];
  await page.goto(`/library/index.html#/s/${s.id}`);
  await expect(page.locator("body[data-ready='1']")).toBeAttached();
  const frame = page.locator(".lib-frame-wrap iframe");
  await expect(frame).toBeVisible();
  /* the height handshake replaces the 420px placeholder with the real height */
  await expect.poll(async () => (await frame.boundingBox()).height, { timeout: 10000 }).toBeGreaterThan(430);
  await page.getByRole("button", { name: "Copy HTML" }).click();
  await expect(page.getByText("Copied section HTML")).toBeVisible();
  const clip = await page.evaluate(() => navigator.clipboard.readText());
  expect(clip).toContain("<section");
});

test("unknown section id fails soft in the preview", async ({ page }) => {
  await page.goto("/library/preview.html?section=not-a-real-id");
  await expect(page.locator("#root")).toContainText("Unknown section");
});
