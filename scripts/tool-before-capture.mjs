import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

// Run against a read-only checkout of the pre-change commit.
const origin = process.env.TOOL_QA_ORIGIN ?? "http://localhost:3117";
const output = process.env.TOOL_QA_OUTPUT ?? "docs/visual-evidence/tool-premium-review/before";
const slugs = ["ebay-fee-estimator", "profit-margin-calculator", "title-length-checker", "ebay-break-even-calculator", "ebay-promoted-listings-calculator", "ebay-best-offer-calculator", "ebay-shipping-profit-calculator", "ebay-sell-through-rate-calculator", "ebay-image-resizer", "ebay-html-description-cleaner"];
const browser = await chromium.launch({ headless: true });
for (const width of [390, 1440]) {
  const context = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
  for (const slug of slugs) {
    const page = await context.newPage();
    const response = await page.goto(`${origin}/free-tools/${slug}`, { waitUntil: "networkidle", timeout: 60000 });
    if (response?.status() !== 200) throw new Error(`${slug}: HTTP ${response?.status()}`);
    const dest = path.join(output, `${slug}-${width}.jpg`);
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await page.screenshot({ path: dest, type: "jpeg", quality: 78, fullPage: true, animations: "disabled" });
    console.log(`BEFORE ${slug} ${width}px`);
    await page.close();
  }
  await context.close();
}
await browser.close();
