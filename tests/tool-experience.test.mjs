import assert from "node:assert/strict";
import { test } from "node:test";
import { tools } from "../src/config/tools.ts";
import { toolSeo } from "../src/config/tool-seo.ts";
import { toolDepth } from "../src/config/tool-depth.ts";
import { toolLearning } from "../src/config/tool-learning.ts";
import { toolResultHelp } from "../src/config/tool-result-help.ts";
import { getFieldGuidance } from "../src/config/tool-field-help.ts";

test("all ten tools own distinct search intent, result copy and crawlable guide content", () => {
  assert.equal(tools.length, 10);
  assert.deepEqual(Object.keys(toolSeo).sort(), tools.map((tool) => tool.slug).sort());
  assert.deepEqual(Object.keys(toolDepth).sort(), tools.map((tool) => tool.slug).sort());
  const primaryKeywords = new Set();
  const titles = new Set();
  for (const tool of tools) {
    const seo = toolSeo[tool.slug];
    const depth = toolDepth[tool.slug];
    const learning = toolLearning[tool.slug];
    assert.ok(seo.primary && seo.secondary.length >= 2 && seo.description.length >= 90, tool.slug);
    assert.ok(!primaryKeywords.has(seo.primary.toLowerCase()), `Repeated primary keyword: ${seo.primary}`);
    assert.ok(!titles.has(seo.title.toLowerCase()), `Repeated title: ${seo.title}`);
    primaryKeywords.add(seo.primary.toLowerCase());
    titles.add(seo.title.toLowerCase());
    assert.equal(depth.context.length, 2);
    assert.ok(depth.context.every((paragraph) => paragraph.length > 250), tool.slug);
    assert.ok(depth.formula && depth.decision && toolResultHelp[tool.slug], tool.slug);
    assert.equal(learning.steps.length, 3);
    assert.ok(learning.faq.length >= 2, tool.slug);
    assert.ok(learning.source.href.startsWith("https://www.ebay."), tool.slug);
  }
});

test("every supported tool form control and important result has contextual help", () => {
  const keys = [
    "eBay marketplace", "Item name", "SKU (optional)", "Item or search label", "Observation period",
    "Selling price", "Item selling price", "Original listing price", "Buyer offer", "Product cost",
    "eBay selling fee rate", "Fixed transaction fee", "Desired net profit", "Target profit",
    "Desired minimum profit", "Price to test", "Supplier shipping", "Seller-paid postage",
    "Your postage expense", "Buyer-paid shipping", "Shipping charged to buyer", "Buyer-collected sales tax",
    "Purchase tax / GST / VAT", "Purchase tax", "Advertising rate", "Promoted Listings General rate",
    "Fixed advertising cost", "Priority CPC / fixed advertising cost", "Items sold", "Active listings",
    "Seller profile", "eBay Store tier", "Shop tier", "Official fee category",
    "Seller registration country matches selected marketplace", "Buyer delivery is international",
    "Seller performance", "VAT on eBay fees", "Official-rate estimate", "Manual fee estimate",
    "I know my selling price", "Price from target profit", "Other expense", "Other fulfilment expense",
    "Additional seller fee", "Insertion & listing upgrade charges", "Amount mode", "Percentage basis",
    "eBay listing title", "Image file", "Target width (px)", "Target height (px)", "Export format",
    "Quality", "Protect original aspect ratio", "Uncleaned HTML", "Cleaned HTML",
    "metric:Estimated total eBay fees", "metric:Estimated seller payout", "metric:Estimated net profit",
    "metric:Profit margin", "metric:ROI on landed cost", "metric:Effective fee", "metric:Sell-through ratio",
  ];
  for (const key of keys) assert.ok(getFieldGuidance(key)?.text.length > 35, key);
  for (const market of ["US", "UK", "AU"]) assert.ok(getFieldGuidance("Seller profile", market)?.text.includes(market));
  assert.ok(getFieldGuidance("Additional seller fee percentage basis")?.text.includes("buyer total"));
});
