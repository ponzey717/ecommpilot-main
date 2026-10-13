import assert from "node:assert/strict";
import test from "node:test";
import { calculate, calculateTransaction } from "../src/lib/tools/calculations.ts";

const value = (results, label) => results.find((result) => result.label === label)?.value;

test("break-even rounds upward and rejects an impossible fee rate", () => {
  const results = calculate("ebay-break-even-calculator", { productCost: 20, fixedFee: 0.3, feeRate: 10, salePrice: 30, desiredProfit: 5 });
  assert.equal(value(results, "Break-even sale price"), 22.56);
  assert.equal(value(results, "Price for desired profit"), 28.12);
  assert.equal(value(results, "Profit at chosen price"), 6.7);
  assert.throws(() => calculate("ebay-break-even-calculator", { feeRate: 100 }), /below 100%/);
});

test("promoted listing spend reduces profit by the entered amount", () => {
  const results = calculate("ebay-promoted-listings-calculator", { salePrice: 40, productCost: 20, feeRate: 10, fixedFee: 0.3, adRate: 5 });
  assert.equal(value(results, "Profit before advertising"), 15.7);
  assert.equal(value(results, "Advertising cost"), 2);
  assert.equal(value(results, "Profit after advertising"), 13.7);
});

test("minimum offer meets the entered target after selling fees", () => {
  const results = calculate("ebay-best-offer-calculator", { listingPrice: 40, offer: 30, productCost: 20, fixedFee: 0.3, feeRate: 10, desiredProfit: 5 });
  assert.equal(value(results, "Minimum acceptable offer"), 28.12);
  assert.equal(value(results, "Meets profit target"), 1);
  assert.equal(value(results, "Discount from list price"), 25);
});

test("shipping comparison applies percentage fees to buyer-paid shipping", () => {
  const results = calculate("ebay-shipping-profit-calculator", { salePrice: 40, buyerShipping: 5, productCost: 20, postage: 5, feeRate: 10 });
  assert.equal(value(results, "Profit: free shipping"), 11);
  assert.equal(value(results, "Profit: buyer-paid shipping"), 15.5);
  assert.equal(value(results, "Profit difference"), 4.5);
});

test("sell-through uses sold over sold plus active and handles zero denominator", () => {
  assert.equal(value(calculate("ebay-sell-through-rate-calculator", { sold: 30, active: 70 }), "Sell-through ratio"), 30);
  assert.equal(value(calculate("ebay-sell-through-rate-calculator", { sold: 0, active: 0 }), "Sell-through ratio"), null);
  assert.throws(() => calculate("ebay-sell-through-rate-calculator", { sold: 1.5, active: 3 }), /whole numbers/);
  assert.throws(() => calculate("ebay-sell-through-rate-calculator", { sold: -1, active: 3 }), /non-negative/);
});

test("profit example matches the approved illustrative assumptions", () => {
  const result = calculateTransaction({ selling: 40, cost: 20, feeRate: 10, fixedFee: 0.3 });
  assert.equal(result.fees, 4.3);
  assert.equal(result.profit, 15.7);
  assert.equal(result.margin, 39.25);
  assert.equal(Number(result.breakEven.toFixed(2)), 22.56);
});

test("sales tax affects the fee base without becoming seller revenue", () => {
  const result = calculateTransaction({ selling: 40, buyerShipping: 5, buyerTax: 4, feeRate: 10, fixedFee: 0.3 });
  assert.equal(result.revenue, 45);
  assert.equal(result.variableFee, 4.9);
  assert.equal(result.fees, 5.2);
});

test("transaction calculation reports losses and impossible ad-plus-fee break-even safely", () => {
  const loss = calculateTransaction({ selling: 10, cost: 20, feeRate: 10 });
  assert.equal(loss.profit, -11);
  assert.equal(calculateTransaction({ selling: 10, cost: 2, feeRate: 60, adRate: 40 }).breakEven, null);
  assert.throws(() => calculateTransaction({ selling: 10, feeRate: 101 }), /cannot exceed 100%/);
});
