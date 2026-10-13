import assert from "node:assert/strict";
import test from "node:test";
import { ebayMarkets } from "../src/config/ebay-markets.ts";
import { calculateOfficialEbayFees, solveMinimumItemPrice } from "../src/lib/tools/ebay-fees.ts";
import { buildResultsCsv, recordsAsTsv } from "../src/lib/tools/saved-results.ts";

const base = { itemPrice: 100, buyerShipping: 10, buyerTax: 0, international: false, sellerPerformance: "standard" };

test("18 marketplaces are unique and only source-verified markets advertise presets", () => {
  assert.equal(ebayMarkets.length, 18);
  assert.equal(new Set(ebayMarkets.map(({ code }) => code)).size, 18);
  assert.deepEqual(ebayMarkets.filter(({ automaticFeeStatus }) => automaticFeeStatus === "verified").map(({ code }) => code), ["US", "UK", "AU"]);
});

test("US non-Store fee base, threshold, order fee and surcharges match the published model", () => {
  const common = calculateOfficialEbayFees({ ...base, market: "US", persona: "standard", category: "most" });
  assert.equal(common.feeBase, 110);
  assert.equal(common.total, 15.36);
  const small = calculateOfficialEbayFees({ ...base, market: "US", persona: "standard", category: "most", itemPrice: 9, buyerShipping: 0 });
  assert.equal(small.total, 1.52);
  const surcharged = calculateOfficialEbayFees({ ...base, market: "US", persona: "standard", category: "most", international: true, sellerPerformance: "below-standard" });
  assert.equal(surcharged.lines.find(({ key }) => key === "international")?.amount, 1.82);
  assert.equal(surcharged.lines.find(({ key }) => key === "performance")?.amount, 6.6);
});

test("UK private and business calculations keep VAT and regulatory charges explicit", () => {
  const privateDomestic = calculateOfficialEbayFees({ ...base, market: "UK", persona: "uk-private", category: "everything" });
  assert.equal(privateDomestic.total, 0);
  const business = calculateOfficialEbayFees({ ...base, itemPrice: 100, buyerShipping: 0, market: "UK", persona: "uk-business", category: "antiques", ukFeeVatRate: 20 });
  assert.equal(business.lines.find(({ key }) => key === "regulatory")?.amount, .35);
  assert.equal(business.lines.find(({ key }) => key === "fee-vat")?.amount, 2.33);
  assert.equal(business.total, 13.98);
});

test("AU non-Pro and Pro examples include published GST treatment and plan tiers", () => {
  const domestic = calculateOfficialEbayFees({ ...base, market: "AU", persona: "au-non-pro", category: "tier2" });
  assert.equal(domestic.total, 0);
  const overseas = calculateOfficialEbayFees({ ...base, itemPrice: 100, buyerShipping: 0, market: "AU", persona: "au-non-pro", category: "tier2", international: true });
  assert.equal(overseas.total, 3);
  const starter = calculateOfficialEbayFees({ ...base, itemPrice: 20, buyerShipping: 0, market: "AU", persona: "au-pro-starter", category: "tier2" });
  assert.equal(starter.total, 2.98);
  const anchor = calculateOfficialEbayFees({ ...base, itemPrice: 5200, buyerShipping: 0, market: "AU", persona: "au-pro-anchor", category: "tier4" });
  assert.equal(anchor.total, 477.73);
});

test("inverse solver returns the first cent that reaches the target", () => {
  const input = { market: "US", persona: "standard", category: "most", buyerShipping: 0, buyerTax: 0, international: false, sellerPerformance: "standard" };
  const price = solveMinimumItemPrice(input, 50, 10);
  assert.equal(price, 69.91);
  const fees = calculateOfficialEbayFees({ ...input, itemPrice: price });
  assert.ok(price - fees.total - 50 >= 10);
  const previousFees = calculateOfficialEbayFees({ ...input, itemPrice: price - .01 });
  assert.ok(price - .01 - previousFees.total - 50 < 10);
});

test("CSV and clipboard exports neutralize spreadsheet formula injection", () => {
  const row = { id: "1", createdAt: "2026-10-13T00:00:00.000Z", label: "=2+2", sku: "+CMD", market: "US", currency: "USD", summary: "@risk", metrics: { Profit: "-1+1" }, assumptions: "safe" };
  const csv = buildResultsCsv([row]);
  const tsv = recordsAsTsv([row]);
  for (const unsafe of ["'=2+2", "'+CMD", "'@risk", "'-1+1"]) assert.ok(csv.includes(unsafe));
  for (const unsafe of ["'=2+2", "'+CMD", "'@risk"]) assert.ok(tsv.includes(unsafe));
  assert.ok(tsv.includes("Profit: -1+1"));
});
