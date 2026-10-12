import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const base = process.env.EP11_QA_BASE_URL || "http://localhost:3000";
const output = process.env.EP11_QA_OUTPUT || "/tmp/ecommpilot-ep11-qa";
const sizes = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
];
const core = ["/", "/winning-products", "/free-tools", "/pricing", "/learn"];
const tools = [
  "ebay-fee-estimator", "profit-margin-calculator", "title-length-checker",
  "ebay-break-even-calculator", "ebay-promoted-listings-calculator",
  "ebay-best-offer-calculator", "ebay-shipping-profit-calculator",
  "ebay-sell-through-rate-calculator", "ebay-image-resizer",
  "ebay-html-description-cleaner",
];
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const failures = [];
for (const size of sizes) {
  const context = await browser.newContext({ viewport: { width: size.width, height: size.height } });
  const page = await context.newPage();
  const paths = size.name === "mobile" ? [...core, ...tools.map((slug) => `/free-tools/${slug}`)] : core;
  for (const path of paths) {
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    const response = await page.goto(base + path, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.locator("h1").first().waitFor({ timeout: 10000 });
    try { await page.locator('img[alt="eCommPilot"]').first().evaluate((image) => image.decode()); }
    catch { failures.push(`${size.name} ${path}: original logo failed to load`); }
    if (size.name === "desktop" && path === "/free-tools" && await page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "Free Tools" }).getAttribute("aria-current") !== "page") failures.push("Active navigation state missing on Free Tools");
    const width = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, viewport: window.innerWidth }));
    if (response?.status() !== 200) failures.push(`${size.name} ${path}: HTTP ${response?.status()}`);
    if (width.scroll > width.viewport + 2) failures.push(`${size.name} ${path}: horizontal overflow ${width.scroll} > ${width.viewport}`);
    if (errors.length) failures.push(`${size.name} ${path}: ${errors.join("; ")}`);
    const name = (path === "/" ? "home" : path.slice(1).replaceAll("/", "-"));
    await page.screenshot({ path: `${output}/${size.name}-${name}.png`, fullPage: size.name !== "mobile" });
    page.removeAllListeners("pageerror");
  }
  if (size.name === "mobile") {
    await page.goto(base, { waitUntil: "domcontentloaded" });
    await page.locator('summary[aria-label="Navigation menu"]').click();
    if (!(await page.getByRole("navigation", { name: "Mobile navigation" }).isVisible())) failures.push("Mobile menu did not open");
    await page.goto(base + "/free-tools/ebay-html-description-cleaner", { waitUntil: "domcontentloaded" });
    await page.getByLabel("Paste listing HTML").fill('<p onclick="alert(1)">Safe <a href="javascript:alert(1)">link</a></p><script>alert(1)</script>');
    await page.getByRole("button", { name: "Clean HTML" }).click();
    const cleaned = await page.getByLabel("Cleaned HTML").inputValue();
    if (/onclick|javascript:|<script/i.test(cleaned) || !cleaned.includes("Safe")) failures.push("HTML sanitizer allowed an unsafe payload or removed safe text");
    await page.goto(base + "/free-tools/ebay-break-even-calculator", { waitUntil: "domcontentloaded" });
    await page.getByLabel(/Product cost/).fill("20");
    await page.getByLabel(/eBay selling fee rate/).fill("10");
    await page.getByLabel(/Fixed transaction fee/).fill("0.30");
    if (!(await page.getByText("$22.56", { exact: true }).first().isVisible())) failures.push("Break-even calculator did not update to the expected value");
    await page.goto(base + "/free-tools/ebay-fee-estimator", { waitUntil: "domcontentloaded" });
    await page.getByLabel("Item selling price").fill("40");
    await page.getByLabel(/Buyer-paid sales tax/).fill("5");
    await page.getByLabel("eBay selling fee rate").fill("10");
    await page.getByLabel("Fixed transaction fee").fill("0.30");
    if (!(await page.getByText("$4.80", { exact: true }).isVisible())) failures.push("Fee calculator did not include entered buyer tax in the fee base");
    await page.goto(base + "/free-tools/ebay-image-resizer", { waitUntil: "domcontentloaded" });
    const png = await page.evaluate(() => { const canvas = document.createElement("canvas"); canvas.width = 10; canvas.height = 10; canvas.getContext("2d").fillRect(0, 0, 10, 10); return canvas.toDataURL("image/png").split(",")[1]; });
    await page.getByLabel("Choose a local image").setInputFiles({ name: "sample.png", mimeType: "image/png", buffer: Buffer.from(png, "base64") });
    await page.getByRole("button", { name: "Resize image" }).click();
    await page.getByRole("link", { name: "Download resized image" }).waitFor({ timeout: 10000 });
  }
  await context.close();
}
await browser.close();
console.log(`Screenshots: ${output}`);
if (failures.length) { console.error(failures.join("\n")); process.exitCode = 1; }
else console.log("Visual smoke checks passed: HTTP status, page errors, overflow, mobile menu, calculators, image export and HTML sanitization.");
