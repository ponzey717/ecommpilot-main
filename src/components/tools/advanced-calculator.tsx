"use client";

import { useMemo, useState } from "react";
import { calculate, type CalculatorSlug, type Result } from "@/lib/tools/calculations";
import { AdvancedSettings, ComparisonBars, EmptyResult, ErrorResult, FeeInput, feeInputAmount, formatMoney, MarketSelector, NumberField, ResultHero, ResultRow, TextField, ToolWorkspace, useMarketSelection, type Currency, type FeeInputValue } from "./tool-workspace";

type Field = { key: string; label: string; percent?: boolean; count?: boolean; hint?: string };
const definitions: Record<CalculatorSlug, { basic: Field[]; advanced: Field[]; required: string[]; examples: Record<string, string> }> = {
  "ebay-break-even-calculator": {
    basic: [{ key: "productCost", label: "Product cost" }, { key: "feeRate", label: "eBay selling fee rate", percent: true }, { key: "fixedFee", label: "Fixed transaction fee" }, { key: "desiredProfit", label: "Target profit" }],
    advanced: [{ key: "salePrice", label: "Price to test" }, { key: "supplierShipping", label: "Supplier shipping" }, { key: "postage", label: "Seller-paid postage" }, { key: "tax", label: "Purchase tax / GST / VAT" }],
    required: ["productCost", "feeRate"], examples: { productCost: "20", feeRate: "10", fixedFee: "0.30", desiredProfit: "5", salePrice: "30" },
  },
  "ebay-promoted-listings-calculator": {
    basic: [{ key: "salePrice", label: "Selling price" }, { key: "productCost", label: "Product cost" }, { key: "feeRate", label: "eBay selling fee rate", percent: true }, { key: "adRate", label: "Advertising rate", percent: true }],
    advanced: [{ key: "buyerShipping", label: "Buyer-paid shipping" }, { key: "fixedFee", label: "Fixed transaction fee" }, { key: "adFixed", label: "Fixed advertising cost" }, { key: "supplierShipping", label: "Supplier shipping" }, { key: "postage", label: "Seller-paid postage" }, { key: "tax", label: "Purchase tax" }],
    required: ["salePrice", "productCost", "feeRate"], examples: { salePrice: "40", productCost: "20", feeRate: "10", fixedFee: "0.30", adRate: "5" },
  },
  "ebay-best-offer-calculator": {
    basic: [{ key: "listingPrice", label: "Original listing price" }, { key: "offer", label: "Buyer offer" }, { key: "productCost", label: "Product cost" }, { key: "desiredProfit", label: "Desired minimum profit" }, { key: "feeRate", label: "eBay selling fee rate", percent: true }],
    advanced: [{ key: "buyerShipping", label: "Buyer-paid shipping" }, { key: "fixedFee", label: "Fixed transaction fee" }, { key: "supplierShipping", label: "Supplier shipping" }, { key: "postage", label: "Seller-paid postage" }, { key: "tax", label: "Purchase tax" }],
    required: ["listingPrice", "offer", "productCost", "feeRate"], examples: { listingPrice: "40", offer: "30", productCost: "20", desiredProfit: "5", feeRate: "10", fixedFee: "0.30" },
  },
  "ebay-shipping-profit-calculator": {
    basic: [{ key: "salePrice", label: "Item selling price" }, { key: "buyerShipping", label: "Shipping charged to buyer" }, { key: "postage", label: "Your postage expense" }, { key: "productCost", label: "Product cost" }, { key: "feeRate", label: "eBay selling fee rate", percent: true }],
    advanced: [{ key: "fixedFee", label: "Fixed transaction fee" }, { key: "supplierShipping", label: "Supplier shipping" }, { key: "tax", label: "Purchase tax" }],
    required: ["salePrice", "productCost", "feeRate"], examples: { salePrice: "40", buyerShipping: "5", postage: "5", productCost: "20", feeRate: "10" },
  },
  "ebay-sell-through-rate-calculator": {
    basic: [{ key: "sold", label: "Items sold", count: true }, { key: "active", label: "Active listings", count: true }], advanced: [], required: ["sold", "active"], examples: { sold: "30", active: "70" },
  },
};

const valueOf = (results: Result[], label: string) => results.find((result) => result.label === label)?.value ?? null;

export function AdvancedCalculator({ slug }: { slug: CalculatorSlug }) {
  const config = definitions[slug];
  const [market, setMarket, marketInfo] = useMarketSelection();
  const currency = marketInfo.currency;
  const [period, setPeriod] = useState("30 days");
  const [values, setValues] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [extraExpense, setExtraExpense] = useState<FeeInputValue>({ mode: "fixed", value: "", basis: "supplier-cost" });
  const parsed = useMemo(() => {
    const base = Object.fromEntries([...config.basic, ...config.advanced].map(({ key }) => [key, values[key] === undefined || values[key] === "" ? 0 : Number(values[key])])) as Record<string, number>;
    base.other = feeInputAmount(extraExpense, { item: base.salePrice || base.offer || base.listingPrice || 0, "buyer-total": (base.salePrice || base.offer || base.listingPrice || 0) + (base.buyerShipping || 0), "supplier-cost": (base.productCost || 0) + (base.supplierShipping || 0) + (base.tax || 0) });
    return base;
  }, [config, values, extraExpense]);
  const error = [...config.basic, ...config.advanced].some(({ key }) => values[key] !== undefined && values[key] !== "" && (!Number.isFinite(parsed[key]) || parsed[key] < 0))
    ? "Enter non-negative numbers in every field."
    : slug === "ebay-best-offer-calculator" && parsed.offer > parsed.listingPrice ? "The offer cannot exceed the listing price." : null;
  const ready = config.required.every((key) => values[key] !== undefined && values[key] !== "");
  const outcome = useMemo(() => {
    if (error || !ready) return { error, results: [] as Result[] };
    try { return { error: null, results: calculate(slug, parsed) }; }
    catch (cause) { return { error: cause instanceof Error ? cause.message : "Check your inputs.", results: [] as Result[] }; }
  }, [error, ready, slug, parsed]);
  const set = (key: string, value: string) => { setValues((current) => ({ ...current, [key]: value })); setMessage(""); };
  const money = (value: number | null) => value === null ? "—" : formatMoney(currency, value);
  const percent = (value: number | null) => value === null ? "—" : `${value.toFixed(1)}%`;
  const reset = () => { setValues({}); setPeriod("30 days"); setMarket("US"); setExtraExpense({ mode: "fixed", value: "", basis: "supplier-cost" }); setMessage(""); };
  const copy = async () => {
    const text = outcome.results.map((result) => `${result.label}: ${result.unit === "money" ? money(result.value) : result.unit === "percent" ? percent(result.value) : result.unit === "boolean" ? result.value ? "Yes" : "No" : result.value ?? "—"}`).join("\n");
    try { await navigator.clipboard.writeText(text); setMessage("Results copied."); } catch { setMessage("Copy failed. Select and copy the results manually."); }
  };
  const field = (item: Field) => <NumberField key={item.key} label={item.label} value={values[item.key] ?? ""} onChange={(value) => set(item.key, value)} currency={item.percent || item.count ? undefined : currency} percent={item.percent} count={item.count} hint={item.hint} required={config.required.includes(item.key)} />;

  const results = outcome.error ? <ErrorResult message={outcome.error} /> : !ready ? <EmptyResult /> : renderResults(slug, outcome.results, parsed, currency, period);
  const primary = outcome.results[0];
  const snapshot = ready && !outcome.error && primary ? { label: values.itemLabel?.trim() || `Product ${recordsLabel(slug)}`, market: `${market} · ${marketInfo.site}`, currency, summary: primary.unit === "money" ? money(primary.value) : primary.unit === "percent" ? percent(primary.value) : String(primary.value ?? "—"), metrics: Object.fromEntries(outcome.results.slice(0, 5).map((item) => [item.label, item.unit === "money" ? money(item.value) : item.unit === "percent" ? percent(item.value) : item.unit === "boolean" ? item.value ? "Yes" : "No" : String(item.value ?? "—")])), assumptions: `Manual fee inputs · ${marketInfo.site} · saved ${new Date().toISOString()}` } : null;
  return <><MarketSelector market={market} onChange={setMarket} /><ToolWorkspace
    inputTitle={inputTitle(slug)} inputDescription={inputDescription(slug)} resultHelpKey={slug}
    inputs={<><div className="tool-field-grid"><TextField label={slug === "ebay-sell-through-rate-calculator" ? "Item or search label" : "Item name"} value={values.itemLabel ?? ""} maxLength={120} placeholder="Optional label" onChange={(value) => set("itemLabel", value)} />{slug === "ebay-sell-through-rate-calculator" ? <TextField label="Observation period" value={period} maxLength={40} onChange={setPeriod} /> : null}{config.basic.map(field)}</div>{config.advanced.length || slug !== "ebay-sell-through-rate-calculator" ? <AdvancedSettings>{config.advanced.map(field)}{slug !== "ebay-sell-through-rate-calculator" ? <FeeInput label="Other expense" value={extraExpense} onChange={setExtraExpense} currency={currency} hint="Use a fixed amount or choose an explicit percentage basis." /> : null}</AdvancedSettings> : null}</>}
    actions={<><button type="button" className="button button-primary" onClick={() => setValues(config.examples)}>Try example</button><button type="button" className="button button-secondary" onClick={reset}>Reset</button>{ready && !outcome.error ? <button type="button" className="button button-ghost" onClick={copy}>Copy results</button> : null}{message ? <span role="status">{message}</span> : null}</>}
    results={results}
    saved={{ toolSlug: slug, toolName: recordsLabel(slug), snapshot }}
  /></>;
}

function recordsLabel(slug: CalculatorSlug) { return ({ "ebay-break-even-calculator": "eBay Break-Even Price Calculator", "ebay-promoted-listings-calculator": "eBay Promoted Listings Profit Calculator", "ebay-best-offer-calculator": "eBay Best Offer Calculator", "ebay-shipping-profit-calculator": "eBay Shipping Profit Calculator", "ebay-sell-through-rate-calculator": "eBay Sell-Through Rate Calculator" } as const)[slug]; }

function inputTitle(slug: CalculatorSlug) {
  return ({ "ebay-break-even-calculator": "Set your cost floor", "ebay-promoted-listings-calculator": "Compare ad impact", "ebay-best-offer-calculator": "Evaluate the offer", "ebay-shipping-profit-calculator": "Compare shipping strategies", "ebay-sell-through-rate-calculator": "Enter observed listing counts" } as const)[slug];
}
function inputDescription(slug: CalculatorSlug) {
  return ({ "ebay-break-even-calculator": "Find the minimum price that covers every entered cost.", "ebay-promoted-listings-calculator": "See the difference between profit before and after advertising.", "ebay-best-offer-calculator": "Set your target, then check a buyer's offer against it.", "ebay-shipping-profit-calculator": "Use the same product and postage costs for a fair comparison.", "ebay-sell-through-rate-calculator": "Use counts from one consistent observation period." } as const)[slug];
}

function renderResults(slug: CalculatorSlug, results: Result[], values: Record<string, number>, currency: Currency, period: string) {
  const money = (label: string) => formatMoney(currency, valueOf(results, label) ?? 0);
  if (slug === "ebay-break-even-calculator") {
    const breakEven = valueOf(results, "Break-even sale price") ?? 0;
    const target = valueOf(results, "Price for desired profit") ?? 0;
    const chosen = values.salePrice ?? 0;
    const max = Math.max(breakEven, target, chosen, 1);
    return <><ResultHero eyebrow="Minimum break-even selling price" value={formatMoney(currency, breakEven)} description="The lowest item price that covers the costs and fee rate entered." /><div className="threshold-chart"><div><i style={{ width: `${breakEven / max * 100}%` }} /><span>Break-even {formatMoney(currency, breakEven)}</span></div><div><i style={{ width: `${target / max * 100}%` }} /><span>Target-profit price {formatMoney(currency, target)}</span></div>{chosen ? <div><i style={{ width: `${chosen / max * 100}%` }} /><span>Price tested {formatMoney(currency, chosen)}</span></div> : null}</div><div className="result-list"><ResultRow label="Total entered costs" value={money("Total fixed costs")} /><ResultRow label="Entered selling fee" value={`${values.feeRate.toFixed(2)}%`} /><ResultRow label="Target profit" value={formatMoney(currency, values.desiredProfit)} /><ResultRow label="Required price for target" value={formatMoney(currency, target)} strong /></div><p className="result-note">Below the break-even point is a loss. At the threshold costs are covered; above it is profit before unentered costs.</p></>;
  }
  if (slug === "ebay-promoted-listings-calculator") {
    const before = valueOf(results, "Profit before advertising") ?? 0;
    const after = valueOf(results, "Profit after advertising") ?? 0;
    const revenue = values.salePrice + values.buyerShipping;
    const beforeMargin = revenue ? before / revenue * 100 : 0;
    const afterMargin = revenue ? after / revenue * 100 : 0;
    const landed = values.productCost + values.supplierShipping + values.tax;
    return <><ResultHero eyebrow="Profit after advertising" value={formatMoney(currency, after)} description="Promotion reduces the pre-ad estimate by the entered advertising charge." tone={after < 0 ? "negative" : "positive"} /><ComparisonBars currency={currency} items={[{ label: "Without promotion", value: before, color: "#071a3d" }, { label: "With promotion", value: after, color: "#146cff" }]} /><div className="result-list"><ResultRow label="Profit before advertising" value={formatMoney(currency, before)} /><ResultRow label="Advertising charge" value={money("Advertising cost")} /><ResultRow label="Margin change" value={`${beforeMargin.toFixed(1)}% → ${afterMargin.toFixed(1)}%`} /><ResultRow label="ROI after advertising" value={landed ? `${(after / landed * 100).toFixed(1)}%` : "—"} strong /></div><p className="result-note">This compares costs only. Advertising does not guarantee additional sales.</p></>;
  }
  if (slug === "ebay-best-offer-calculator") {
    const meets = valueOf(results, "Meets profit target") === 1;
    const offerProfit = valueOf(results, "Estimated offer profit") ?? 0;
    const costs = values.productCost + values.supplierShipping + values.postage + values.tax + values.other + values.fixedFee;
    const listingProfit = (values.listingPrice + values.buyerShipping) * (1 - values.feeRate / 100) - costs;
    return <><ResultHero eyebrow="Minimum acceptable offer" value={money("Minimum acceptable offer")} description="The lowest estimated offer that reaches your entered profit target." /><div className={`offer-verdict ${meets ? "offer-verdict-good" : "offer-verdict-bad"}`}><b>{meets ? "Offer meets target" : "Below target"}</b><span>{meets ? "This offer reaches your minimum profit assumption." : `This offer is ${formatMoney(currency, Math.abs(values.desiredProfit - offerProfit))} short of your target.`}</span></div><div className="result-list"><ResultRow label="Profit at original price" value={formatMoney(currency, listingProfit)} /><ResultRow label="Profit at offer price" value={formatMoney(currency, offerProfit)} /><ResultRow label="Desired minimum profit" value={formatMoney(currency, values.desiredProfit)} /><ResultRow label="Difference from target" value={formatMoney(currency, offerProfit - values.desiredProfit)} strong /></div><p className="result-note">This tool never accepts an offer. Make the final decision in eBay after checking actual fees and tax.</p></>;
  }
  if (slug === "ebay-shipping-profit-calculator") {
    const free = valueOf(results, "Profit: free shipping") ?? 0;
    const paid = valueOf(results, "Profit: buyer-paid shipping") ?? 0;
    const paidWins = paid >= free;
    return <><ResultHero eyebrow="Which shipping strategy leaves more profit?" value={paidWins ? "Buyer-paid shipping" : "Free shipping"} description={`${formatMoney(currency, Math.abs(paid - free))} estimated profit difference with your inputs.`} /><ComparisonBars currency={currency} items={[{ label: "Free shipping", value: free, color: "#071a3d" }, { label: "Buyer-paid", value: paid, color: "#16a5e1" }]} /><div className="shipping-cards"><div><span>Free shipping</span><b>{formatMoney(currency, free)}</b><small>Buyer pays {formatMoney(currency, values.salePrice)}</small></div><div><span>Buyer-paid shipping</span><b>{formatMoney(currency, paid)}</b><small>Buyer pays {formatMoney(currency, values.salePrice + values.buyerShipping)}</small></div></div><div className="result-list"><ResultRow label="Postage expense" value={formatMoney(currency, values.postage)} /><ResultRow label="Profit difference" value={money("Profit difference")} strong /></div><p className="result-note">This is a profit comparison, not a conversion forecast. Neither strategy always increases sales.</p></>;
  }
  const ratio = valueOf(results, "Sell-through ratio");
  const ringValue = ratio ?? 0;
  return <><ResultHero eyebrow="Estimated sell-through ratio" value={ratio === null ? "—" : `${ratio.toFixed(1)}%`} description={`Based on the counts entered for ${period || "your selected period"}.`} /><div className="progress-ring" role="img" aria-label={`Sell-through ratio ${ringValue.toFixed(1)} percent`} style={{ background: `conic-gradient(#146cff ${Math.min(100, ringValue)}%, #e5edf6 0)` }}><div><b>{ringValue.toFixed(1)}%</b><span>sold share</span></div></div><div className="result-list"><ResultRow label="Sold count" value={values.sold.toLocaleString()} /><ResultRow label="Active listing count" value={values.active.toLocaleString()} /><ResultRow label="Observation period" value={period || "Not specified"} strong /></div><p className="result-note">Formula used: Sold ÷ (Sold + Active) × 100. Another common definition is Sold ÷ Active, so always state which method you use. No live eBay data is fetched.</p></>;
}
