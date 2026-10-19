import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const origin = process.env.TOOL_QA_ORIGIN ?? "http://localhost:3116";
const output = process.env.TOOL_QA_OUTPUT ?? "docs/visual-evidence/tool-premium-review/after";
const slugs = [
  "ebay-fee-estimator", "profit-margin-calculator", "title-length-checker",
  "ebay-break-even-calculator", "ebay-promoted-listings-calculator", "ebay-best-offer-calculator",
  "ebay-shipping-profit-calculator", "ebay-sell-through-rate-calculator",
  "ebay-image-resizer", "ebay-html-description-cleaner",
];
const browser = await chromium.launch({ headless: true });
const failures = [];
for (const width of [360, 390, 768, 1440]) {
  const context = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
  for (const slug of slugs) {
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    try {
      const response = await page.goto(`${origin}/free-tools/${slug}`, { waitUntil: "networkidle", timeout: 30000 });
      if (response?.status() !== 200) throw new Error(`HTTP ${response?.status()}`);
      const info = await page.evaluate(() => ({
        h1: document.querySelectorAll("h1").length,
        title: document.title,
        canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href"),
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        guide: !!document.querySelector(".tool-guide"),
        hasResultContext: !!document.querySelector(".result-context"),
      }));
      if (info.h1 !== 1 || !info.title || !info.canonical?.includes(`/free-tools/${slug}`) || !info.guide || info.overflow > 1 || errors.length) {
        throw new Error(JSON.stringify({ ...info, errors }));
      }
      const help = page.locator('button[aria-label^="Help:"]').first();
      if (await help.count()) {
        await help.click();
        const popover = page.locator('.field-help-panel[role="dialog"]');
        await popover.waitFor({ state: "visible" });
        const box = await popover.boundingBox();
        if (!box || box.x < -1 || box.x + box.width > width + 1) throw new Error(`Help popover clipped: ${JSON.stringify(box)}`);
        await help.press("Escape");
        if (await popover.count()) throw new Error("Escape did not close help");
      }
      if (width === 390 || width === 1440) {
        const dest = path.join(output, `${slug}-${width}.jpg`);
        await fs.mkdir(path.dirname(dest), { recursive: true });
        await page.screenshot({ path: dest, type: "jpeg", quality: 78, fullPage: true, animations: "disabled" });
      }
      console.log(`PASS ${slug} ${width}px`);
    } catch (error) {
      failures.push(`${slug} ${width}px: ${error.message}`);
      console.error(`FAIL ${slug} ${width}px: ${error.message}`);
    } finally { await page.close(); }
  }
  await context.close();
}
await browser.close();
if (failures.length) { console.error(failures.join("\n")); process.exitCode = 1; }
