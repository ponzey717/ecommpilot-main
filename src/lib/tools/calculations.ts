export type CalculatorSlug =
  | "ebay-break-even-calculator"
  | "ebay-promoted-listings-calculator"
  | "ebay-best-offer-calculator"
  | "ebay-shipping-profit-calculator"
  | "ebay-sell-through-rate-calculator";

export type CalculatorValues = Record<string, number>;
export type Result = { label: string; value: number | null; unit: "money" | "percent" | "number" | "boolean"; note?: string };

const round = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;
const ceilCent = (value: number) => Math.ceil((value - Number.EPSILON) * 100) / 100;

export type TransactionInput = {
  selling: number;
  buyerShipping?: number;
  buyerTax?: number;
  cost?: number;
  supplierShipping?: number;
  purchaseTax?: number;
  postage?: number;
  other?: number;
  feeRate: number;
  fixedFee?: number;
  otherFees?: number;
  adRate?: number;
  adFixed?: number;
};

export function calculateTransaction(input: TransactionInput) {
  for (const [name, value] of Object.entries(input)) {
    if (!Number.isFinite(value) || value < 0) throw new Error(`${name} must be a non-negative number.`);
  }
  if (input.feeRate > 100 || (input.adRate ?? 0) > 100) throw new Error("A percentage cannot exceed 100%.");
  const buyerShipping = input.buyerShipping ?? 0;
  const revenue = input.selling + buyerShipping;
  const rate = input.feeRate / 100;
  const adRate = (input.adRate ?? 0) / 100;
  const variableFee = (revenue + (input.buyerTax ?? 0)) * rate;
  const additionalFees = (input.fixedFee ?? 0) + (input.otherFees ?? 0);
  const fees = variableFee + additionalFees;
  const landed = (input.cost ?? 0) + (input.supplierShipping ?? 0) + (input.purchaseTax ?? 0);
  const advertising = revenue * adRate + (input.adFixed ?? 0);
  const fulfilment = (input.postage ?? 0) + (input.other ?? 0);
  const totalCosts = landed + fees + advertising + fulfilment;
  const profit = revenue - totalCosts;
  const denominator = 1 - rate - adRate;
  const breakEven = denominator > 0 ? Math.max(0, (landed + fulfilment + additionalFees + (input.adFixed ?? 0) + (input.buyerTax ?? 0) * rate - buyerShipping * denominator) / denominator) : null;
  return {
    revenue: round(revenue), variableFee: round(variableFee), additionalFees: round(additionalFees), fees: round(fees),
    landed: round(landed), advertising: round(advertising), fulfilment: round(fulfilment), totalCosts: round(totalCosts), profit: round(profit),
    margin: revenue ? round(profit / revenue * 100) : null,
    roi: landed ? round(profit / landed * 100) : null,
    breakEven: breakEven === null ? null : ceilCent(breakEven),
  };
}

export function calculate(slug: CalculatorSlug, values: CalculatorValues): Result[] {
  for (const [name, value] of Object.entries(values)) {
    if (!Number.isFinite(value) || value < 0) throw new Error(`${name} must be a non-negative number.`);
  }
  const get = (name: string) => values[name] ?? 0;
  const rate = get("feeRate") / 100;
  if (get("feeRate") > 100 || get("adRate") > 100) throw new Error("A percentage cannot exceed 100%.");

  if (slug === "ebay-break-even-calculator") {
    if (rate >= 1) throw new Error("The selling fee rate must be below 100% for a finite minimum price.");
    const fixed = get("productCost") + get("supplierShipping") + get("postage") + get("tax") + get("other") + get("fixedFee");
    const breakEven = ceilCent(fixed / (1 - rate));
    const targetPrice = ceilCent((fixed + get("desiredProfit")) / (1 - rate));
    const chosenProfit = get("salePrice") - fixed - get("salePrice") * rate;
    return [
      { label: "Total fixed costs", value: round(fixed), unit: "money" },
      { label: "Break-even sale price", value: breakEven, unit: "money" },
      { label: "Profit at chosen price", value: round(chosenProfit), unit: "money" },
      { label: "Price for desired profit", value: targetPrice, unit: "money" },
    ];
  }
  if (slug === "ebay-promoted-listings-calculator") {
    const revenue = get("salePrice") + get("buyerShipping");
    const baseProfit = revenue * (1 - rate) - get("fixedFee") - get("productCost") - get("supplierShipping") - get("postage") - get("tax") - get("other");
    const adCost = revenue * get("adRate") / 100 + get("adFixed");
    return [
      { label: "Profit before advertising", value: round(baseProfit), unit: "money" },
      { label: "Advertising cost", value: round(adCost), unit: "money" },
      { label: "Profit after advertising", value: round(baseProfit - adCost), unit: "money" },
      { label: "Break-even ad allowance", value: round(Math.max(0, baseProfit)), unit: "money", note: baseProfit < 0 ? "Already below break-even before ads." : undefined },
    ];
  }
  if (slug === "ebay-best-offer-calculator") {
    if (rate >= 1) throw new Error("The selling fee rate must be below 100% for a finite minimum offer.");
    const offer = get("offer");
    const listing = get("listingPrice");
    const shipping = get("buyerShipping");
    const costs = get("productCost") + get("supplierShipping") + get("postage") + get("tax") + get("other") + get("fixedFee");
    const revenue = offer + shipping;
    const profit = revenue * (1 - rate) - costs;
    const minimumOffer = Math.max(0, ceilCent((costs + get("desiredProfit")) / (1 - rate) - shipping));
    return [
      { label: "Discount amount", value: round(listing - offer), unit: "money" },
      { label: "Discount from list price", value: listing ? round((listing - offer) / listing * 100) : null, unit: "percent" },
      { label: "Estimated offer profit", value: round(profit), unit: "money" },
      { label: "Profit margin", value: revenue ? round(profit / revenue * 100) : null, unit: "percent" },
      { label: "Minimum acceptable offer", value: minimumOffer, unit: "money" },
      { label: "Meets profit target", value: profit + 0.000001 >= get("desiredProfit") ? 1 : 0, unit: "boolean" },
    ];
  }
  if (slug === "ebay-shipping-profit-calculator") {
    const item = get("salePrice");
    const charged = get("buyerShipping");
    const costs = get("productCost") + get("supplierShipping") + get("postage") + get("tax") + get("other") + get("fixedFee");
    const freeProfit = item * (1 - rate) - costs;
    const paidProfit = (item + charged) * (1 - rate) - costs;
    return [
      { label: "Profit: free shipping", value: round(freeProfit), unit: "money" },
      { label: "Margin: free shipping", value: item ? round(freeProfit / item * 100) : null, unit: "percent" },
      { label: "Profit: buyer-paid shipping", value: round(paidProfit), unit: "money" },
      { label: "Margin: buyer-paid shipping", value: item + charged ? round(paidProfit / (item + charged) * 100) : null, unit: "percent" },
      { label: "Profit difference", value: round(paidProfit - freeProfit), unit: "money" },
    ];
  }
  const sold = get("sold");
  const active = get("active");
  if (!Number.isInteger(sold) || !Number.isInteger(active)) throw new Error("Listing counts must be whole numbers.");
  return [
    { label: "Sell-through ratio", value: sold + active ? round(sold / (sold + active) * 100) : null, unit: "percent" },
    { label: "Sold in selected period", value: sold, unit: "number" },
    { label: "Active at observation", value: active, unit: "number" },
  ];
}
