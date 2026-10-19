import assert from "node:assert/strict";
import { chromium } from "playwright";

const origin = process.env.TOOL_QA_ORIGIN ?? "http://localhost:3116";
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const visit = (slug) => page.goto(`${origin}/free-tools/${slug}`, { waitUntil: "networkidle" });

try {
  await visit("ebay-fee-estimator");
  const marketHelp = page.getByRole("button", { name: "Help: eBay marketplace" });
  await marketHelp.focus();
  await marketHelp.press("Enter");
  assert.equal(await marketHelp.getAttribute("aria-expanded"), "true");
  await marketHelp.press("Escape");
  assert.equal(await marketHelp.getAttribute("aria-expanded"), "false");
  assert.equal(await marketHelp.evaluate((node) => document.activeElement === node), true);
  await page.getByRole("radio", { name: /United Kingdom/ }).click();
  await page.locator(".tool-advanced summary").click();
  const profileHelp = page.getByRole("button", { name: "Help: Seller profile" });
  await profileHelp.click();
  assert.match(await page.locator(".field-help-panel").innerText(), /UK private or business/);
  await page.getByRole("button", { name: "Seller profile", exact: true }).click();
  assert.equal(await page.locator(".field-help-panel").count(), 0);
  assert.ok(await page.getByRole("listbox", { name: "Seller profile" }).count());
  await page.getByRole("option", { name: /UK business seller/ }).click();
  await page.getByRole("button", { name: /Try official example/ }).click();
  assert.equal(await page.locator(".result-empty").count(), 0);
  await page.getByRole("radio", { name: /Australia/ }).click();
  await profileHelp.click();
  assert.match(await page.locator(".field-help-panel").innerText(), /AU non-Pro/);
  console.log("PASS fee calculator, keyboard help and UK/AU guidance");

  await visit("profit-margin-calculator");
  await page.getByRole("button", { name: /Try official example/ }).click();
  assert.equal(await page.locator(".result-empty").count(), 0);
  await page.getByRole("button", { name: "Price from target profit" }).click();
  await page.getByRole("spinbutton", { name: "Desired net profit" }).fill("5");
  assert.ok(await page.getByText("Minimum price for target profit").count());
  console.log("PASS profit calculator and target mode");

  for (const slug of ["ebay-break-even-calculator", "ebay-promoted-listings-calculator", "ebay-best-offer-calculator", "ebay-shipping-profit-calculator", "ebay-sell-through-rate-calculator"]) {
    await visit(slug);
    await page.getByRole("button", { name: "Try example" }).click();
    assert.equal(await page.locator(".result-empty").count(), 0, slug);
    assert.ok(await page.locator(".tool-results-panel").innerText(), slug);
    console.log(`PASS ${slug} example`);
  }

  await visit("title-length-checker");
  await page.getByRole("textbox", { name: "eBay listing title" }).fill("USB-C Cable 1 m Black 2-Pack");
  assert.match(await page.locator(".title-result").innerText(), /28\/80/);
  console.log("PASS title live count");

  await visit("ebay-html-description-cleaner");
  await page.getByRole("textbox", { name: /Uncleaned HTML/ }).fill('<p style="color:red">Clear title</p><script>alert(1)</script>');
  await page.getByRole("button", { name: "Clean & sanitize" }).click();
  const cleaned = await page.getByRole("textbox", { name: "Cleaned HTML", exact: true }).inputValue();
  assert.match(cleaned, /Clear title/);
  assert.doesNotMatch(cleaned, /<script|style=/);
  console.log("PASS HTML sanitizer interaction");

  await visit("ebay-image-resizer");
  const png = Buffer.from(await page.evaluate(() => {
    const canvas = document.createElement("canvas"); canvas.width = 2; canvas.height = 2;
    const context = canvas.getContext("2d"); context.fillStyle = "#146cff"; context.fillRect(0, 0, 2, 2);
    return canvas.toDataURL("image/png").split(",")[1];
  }), "base64");
  await page.locator('input[type="file"]').setInputFiles({ name: "sample.png", mimeType: "image/png", buffer: png });
  await page.getByRole("button", { name: "Resize image" }).click();
  await page.getByRole("link", { name: /Download converted image/ }).waitFor({ timeout: 10000 });
  assert.equal(await page.locator('.tool-input-panel [role="alert"]').count(), 0);
  console.log("PASS image resize interaction");
} finally {
  await page.close();
  await browser.close();
}
