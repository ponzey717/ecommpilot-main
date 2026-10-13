import type { EbayMarketCode } from "@/config/ebay-markets";

export type FeePersona = "standard" | "uk-private" | "uk-business" | "au-non-pro" | "au-pro-starter" | "au-pro-basic" | "au-pro-featured" | "au-pro-anchor";
export type SellerPerformance = "standard" | "below-standard" | "below-standard-long-term";
export type FeeCategory = { id: string; label: string; sourceCategoryId: string };
export type FeeLine = { key: string; label: string; amount: number; basis: string };

export type OfficialFeeInput = {
  market: EbayMarketCode;
  persona: FeePersona;
  category: string;
  itemPrice: number;
  buyerShipping: number;
  buyerTax: number;
  international: boolean;
  sellerPerformance: SellerPerformance;
  ukFeeVatRate?: number;
};

export type OfficialFeeResult = {
  status: "verified" | "manual";
  lines: FeeLine[];
  total: number;
  feeBase: number;
  sourceUrl?: string;
  sourceLabel?: string;
  effectiveFrom?: string;
  lastReviewedAt: string;
  revision: string;
  note: string;
};

const round = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;
const tranche = (amount: number, threshold: number, firstRate: number, excessRate: number) => Math.min(amount, threshold) * firstRate / 100 + Math.max(0, amount - threshold) * excessRate / 100;

export const feeCategories: Record<"US" | "UK" | "AU", FeeCategory[]> = {
  US: [
    { id: "most", label: "Most categories", sourceCategoryId: "most" },
    { id: "books", label: "Books, movies & music", sourceCategoryId: "267/11232/11233" },
    { id: "cards", label: "Trading cards & collectible card games", sourceCategoryId: "2536/183454" },
    { id: "guitars", label: "Guitars & basses", sourceCategoryId: "3858" },
    { id: "watches", label: "Watches, parts & accessories", sourceCategoryId: "260325" },
  ],
  UK: [
    { id: "antiques", label: "Antiques", sourceCategoryId: "20081" },
    { id: "books", label: "Books, comics & magazines", sourceCategoryId: "267" },
    { id: "business", label: "Business, office & industrial", sourceCategoryId: "12576" },
    { id: "clothing", label: "Clothes, shoes & accessories", sourceCategoryId: "11450" },
    { id: "computers", label: "Computers, tablets & networking", sourceCategoryId: "58058" },
    { id: "home", label: "Home, furniture & DIY", sourceCategoryId: "11700" },
    { id: "jewellery", label: "Jewellery & watches", sourceCategoryId: "281" },
    { id: "phones", label: "Mobile phones & communication", sourceCategoryId: "15032" },
    { id: "sporting", label: "Sporting goods", sourceCategoryId: "888" },
    { id: "everything", label: "Everything else", sourceCategoryId: "99" },
  ],
  AU: [
    { id: "tier1", label: "Tier 1 · appliances & technology devices", sourceCategoryId: "20710 + documented technology IDs" },
    { id: "tier2", label: "Tier 2 · general categories", sourceCategoryId: "official Tier 2" },
    { id: "tier3", label: "Tier 3 · vehicle parts & accessories", sourceCategoryId: "131090" },
    { id: "tier4", label: "Tier 4 · fashion, media, sporting & selected categories", sourceCategoryId: "official Tier 4" },
  ],
};

const SOURCES = {
  US: "https://www.ebay.com/help/selling/fees-credits-invoices/x?id=4822",
  UK: "https://www.ebay.co.uk/help/selling/fees-credits-invoices/store-selling-fees?id=4809",
  UK_PRIVATE: "https://ocs.ebay.co.uk/help/selling-fees/selling/selling-fees?id=4822",
  AU_FREE: "https://www.ebay.com.au/help/selling/fees-credits-invoices/fees-private-sellers?id=4822",
  AU_PRO: "https://www.ebay.com.au/help/selling/fees-credits-invoices/pro-selling-fees?id=4809",
} as const;

function manual(note: string): OfficialFeeResult {
  return { status: "manual", lines: [], total: 0, feeBase: 0, lastReviewedAt: "2026-10-13", revision: "manual-v1", note };
}

function line(key: string, label: string, amount: number, basis: string): FeeLine {
  return { key, label, amount: round(amount), basis };
}

export function calculateOfficialEbayFees(input: OfficialFeeInput): OfficialFeeResult {
  const values = [input.itemPrice, input.buyerShipping, input.buyerTax, input.ukFeeVatRate ?? 0];
  if (values.some((value) => !Number.isFinite(value) || value < 0)) throw new Error("Fee inputs must be non-negative numbers.");
  const feeBase = round(input.itemPrice + input.buyerShipping + input.buyerTax);
  const lines: FeeLine[] = [];

  if (input.market === "US" && input.persona === "standard") {
    let variable = 0;
    if (input.category === "most") variable = tranche(feeBase, 7500, 13.6, 2.35);
    else if (input.category === "books") variable = tranche(feeBase, 7500, 15.3, 2.35);
    else if (input.category === "cards") variable = tranche(feeBase, 7500, 13.25, 2.35);
    else if (input.category === "guitars") variable = tranche(feeBase, 7500, 6.7, 2.35);
    else if (input.category === "watches") variable = Math.min(feeBase, 1000) * .15 + Math.min(Math.max(0, feeBase - 1000), 6500) * .065 + Math.max(0, feeBase - 7500) * .03;
    else return manual("This US category is not in the verified ruleset. Enter the rate shown in your eBay account.");
    lines.push(line("fvf", "Final value fee", variable, `Category ${input.category}; fee base includes item, buyer shipping and buyer sales tax`));
    lines.push(line("order", "Per-order fee", feeBase <= 10 ? .3 : .4, feeBase <= 10 ? "Order total $10.00 or less" : "Order total above $10.00"));
    if (input.sellerPerformance !== "standard") lines.push(line("performance", "Seller performance surcharge", feeBase * (input.sellerPerformance === "below-standard-long-term" ? .07 : .06), `${input.sellerPerformance === "below-standard-long-term" ? "7%" : "6%"} of total sale amount`));
    if (input.international) lines.push(line("international", "International fee", feeBase * .0165, "1.65% for eligible US-registered seller sale outside the US; excludes eBay International Shipping"));
    return finish(lines, feeBase, SOURCES.US, "US non-Store selling fees", "2026-10-14", "us-non-store-2026-10-14", "Official-rate estimate for the selected supported category. Store, Motors, Authenticity Guarantee and other exceptions require manual review.");
  }

  if (input.market === "UK" && input.persona === "uk-private") {
    if (input.international) return manual("Eligible UK-private domestic selling can be fee-free, but overseas delivery needs destination-specific review.");
    return finish([], feeBase, SOURCES.UK_PRIVATE, "UK eligible private domestic selling", "2026-10-01", "uk-private-domestic-2026-10", "Eligible UK-registered private seller domestic estimate: no final value or regulatory operating fee. Listing upgrades, Motors and eligibility exceptions are not included.");
  }

  if (input.market === "UK" && input.persona === "uk-business") {
    const rate: Record<string, number> = { antiques: 10.9, books: 9.9, business: 12.5, clothing: 11.9, computers: 9.9, home: 11.9, jewellery: 14.9, phones: 9.9, sporting: 10.9, everything: 12.9 };
    if (rate[input.category] === undefined) return manual("This UK business category is not in the verified ruleset.");
    const variable = feeBase * rate[input.category] / 100;
    const orderFee = feeBase <= 10 ? .3 : .4;
    const regulatory = feeBase * .0035;
    lines.push(line("fvf", "Final value fee", variable, `${rate[input.category]}% for official category ID ${feeCategories.UK.find((item) => item.id === input.category)?.sourceCategoryId}`));
    lines.push(line("order", "Per-order fee", orderFee, feeBase <= 10 ? "Order total £10.00 or less" : "Order total above £10.00"));
    lines.push(line("regulatory", "Regulatory operating fee", regulatory, "0.35% of item, postage and applicable taxes"));
    if (input.sellerPerformance !== "standard") lines.push(line("performance", "Seller performance surcharge", feeBase * (input.sellerPerformance === "below-standard-long-term" ? .07 : .06), `${input.sellerPerformance === "below-standard-long-term" ? "7" : "6"} percentage points`));
    if (input.international) lines.push(line("international", "International fee", feeBase * .02, "2.0% all-other-country assumption; choose manual mode for Eurozone/Northern Europe or US/Canada"));
    const subtotal = lines.reduce((sum, item) => sum + item.amount, 0);
    if ((input.ukFeeVatRate ?? 0) > 0) lines.push(line("fee-vat", "VAT on eBay fees", subtotal * (input.ukFeeVatRate ?? 0) / 100, `${input.ukFeeVatRate}% applied to eBay fee subtotal; official UK tables exclude VAT`));
    return finish(lines, feeBase, SOURCES.UK, "UK business selling fees", "2026-09-30", "uk-business-2026-09-30", "Official-rate estimate for supported categories. Shop tier changes listing allowances and insertion fees; it does not automatically replace the selected final value fee here.");
  }

  if (input.market === "AU" && input.persona === "au-non-pro") {
    if (input.international) lines.push(line("international", "International sales fee", feeBase * .03, "3% including GST for Australia-registered non-Pro seller"));
    if (input.sellerPerformance !== "standard") lines.push(line("performance", "Seller performance fee", feeBase * (input.sellerPerformance === "below-standard-long-term" ? .066 : .055), `${input.sellerPerformance === "below-standard-long-term" ? "6.6%" : "5.5%"} including GST`));
    return finish(lines, feeBase, SOURCES.AU_FREE, "AU eligible non-Pro selling fees", "2026-10-09", "au-non-pro-2026-10-09", "Assumes an Australia-registered non-Pro seller with no more than A$25,000 sales in the preceding 12 full months. Domestic final value fee is zero; optional upgrades and postage labels are excluded.");
  }

  if (input.market === "AU" && input.persona.startsWith("au-pro")) {
    const planIndex = ({ "au-pro-starter": 0, "au-pro-basic": 1, "au-pro-featured": 2, "au-pro-anchor": 3 } as const)[input.persona as "au-pro-starter" | "au-pro-basic" | "au-pro-featured" | "au-pro-anchor"];
    const rates: Record<string, number[]> = { tier1: [13.4, 8.03, 7.26, 6.82], tier2: [13.4, 11.44, 10.34, 9.68], tier3: [13.4, 12.43, 11.22, 10.56], tier4: [13.4, 13.09, 11.77, 11.11] };
    if (!rates[input.category]) return manual("This AU Pro category is not in the verified four-tier ruleset.");
    const variable = tranche(feeBase, 4000, rates[input.category][planIndex], planIndex === 0 ? 2.5 : 2.75);
    lines.push(line("fvf", "Final value fee", variable, `${rates[input.category][planIndex]}% to A$4,000, then ${planIndex === 0 ? "2.5%" : "2.75%"}; GST inclusive`));
    lines.push(line("order", "Fixed order fee", planIndex === 0 ? .3 : .33, planIndex === 0 ? "Pro Starter" : "Pro Basic, Featured or Anchor"));
    if (input.international) lines.push(line("international", "International sales fee", feeBase * .011, "1.1% including GST for Australia-registered Pro seller"));
    if (input.sellerPerformance !== "standard") lines.push(line("performance", "Seller performance fee", feeBase * (input.sellerPerformance === "below-standard-long-term" ? .066 : .055), `${input.sellerPerformance === "below-standard-long-term" ? "6.6%" : "5.5%"} including GST`));
    return finish(lines, feeBase, SOURCES.AU_PRO, "AU Pro selling fees", "2026-10-09", "au-pro-2026-10-09", "Official-rate estimate for the supported Pro plan and category tier. Published rates already include Australian GST; no extra 10% is added.");
  }

  return manual("No complete official preset is enabled for this market and seller profile. Use manual mode with the rate shown in your eBay account.");
}

function finish(lines: FeeLine[], feeBase: number, sourceUrl: string, sourceLabel: string, effectiveFrom: string, revision: string, note: string): OfficialFeeResult {
  return { status: "verified", lines, total: round(lines.reduce((sum, item) => sum + item.amount, 0)), feeBase, sourceUrl, sourceLabel, effectiveFrom, lastReviewedAt: "2026-10-13", revision, note };
}

export function solveMinimumItemPrice(input: Omit<OfficialFeeInput, "itemPrice">, fixedCosts: number, targetProfit: number) {
  if (fixedCosts < 0 || targetProfit < 0) throw new Error("Costs and target profit must be non-negative.");
  const profitAt = (price: number) => {
    const fees = calculateOfficialEbayFees({ ...input, itemPrice: price });
    if (fees.status !== "verified") return null;
    return price + input.buyerShipping - fees.total - fixedCosts;
  };
  if (profitAt(0) === null) return null;
  let high = Math.max(1, fixedCosts + targetProfit);
  while ((profitAt(high) ?? -Infinity) < targetProfit && high < 10_000_000) high *= 2;
  if (high >= 10_000_000 && (profitAt(high) ?? -Infinity) < targetProfit) return null;
  let lowCents = 0;
  let highCents = Math.ceil(high * 100);
  while (lowCents < highCents) {
    const mid = Math.floor((lowCents + highCents) / 2);
    if ((profitAt(mid / 100) ?? -Infinity) >= targetProfit) highCents = mid;
    else lowCents = mid + 1;
  }
  return lowCents / 100;
}
