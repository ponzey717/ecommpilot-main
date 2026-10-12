"use client";

import { useMemo, useState } from "react";
import { calculate, type CalculatorSlug } from "@/lib/tools/calculations";

type Field = { key: string; label: string; percent?: boolean; count?: boolean };
const common: Field[] = [
  { key: "productCost", label: "Product cost" },
  { key: "supplierShipping", label: "Supplier shipping" },
  { key: "postage", label: "Seller-paid postage" },
  { key: "tax", label: "Purchase tax / GST / VAT" },
  { key: "feeRate", label: "eBay selling fee rate", percent: true },
  { key: "fixedFee", label: "Fixed transaction fee" },
  { key: "other", label: "Other costs" },
];
const sale: Field = { key: "salePrice", label: "Item selling price" };
const grossSale: Field = { key: "salePrice", label: "Chosen gross buyer payment" };
const shipping: Field = { key: "buyerShipping", label: "Shipping charged to buyer" };
const fields: Record<CalculatorSlug, Field[]> = {
  "ebay-break-even-calculator": [...common, grossSale, { key: "desiredProfit", label: "Desired profit" }],
  "ebay-promoted-listings-calculator": [sale, shipping, ...common, { key: "adRate", label: "Advertising rate", percent: true }, { key: "adFixed", label: "Fixed advertising cost" }],
  "ebay-best-offer-calculator": [{ key: "listingPrice", label: "Original listing price" }, { key: "offer", label: "Buyer offer" }, shipping, ...common, { key: "desiredProfit", label: "Minimum desired profit" }],
  "ebay-shipping-profit-calculator": [sale, shipping, ...common],
  "ebay-sell-through-rate-calculator": [{ key: "sold", label: "Items sold in selected period", count: true }, { key: "active", label: "Currently active listings", count: true }],
};
const symbols = { USD: "$", GBP: "£", AUD: "A$" } as const;
const required: Record<CalculatorSlug, string[]> = {
  "ebay-break-even-calculator": ["productCost", "feeRate"],
  "ebay-promoted-listings-calculator": ["salePrice", "productCost", "feeRate"],
  "ebay-best-offer-calculator": ["listingPrice", "offer", "productCost", "feeRate"],
  "ebay-shipping-profit-calculator": ["salePrice", "productCost", "feeRate"],
  "ebay-sell-through-rate-calculator": ["sold", "active"],
};
type Currency = keyof typeof symbols;

export function AdvancedCalculator({ slug }: { slug: CalculatorSlug }) {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [period, setPeriod] = useState("30 days");
  const [values, setValues] = useState<Record<string, string>>({});
  const parsed = useMemo(() => {
    const entries = fields[slug].map(({ key }) => [key, values[key] === undefined || values[key] === "" ? 0 : Number(values[key])]);
    return Object.fromEntries(entries) as Record<string, number>;
  }, [slug, values]);
  const error = fields[slug].some(({ key }) => values[key] !== undefined && values[key] !== "" && (!Number.isFinite(parsed[key]) || parsed[key] < 0))
    ? "Enter non-negative numbers in every field."
    : slug === "ebay-best-offer-calculator" && parsed.offer > parsed.listingPrice
      ? "The offer cannot exceed the listing price."
      : null;
  const ready = required[slug].every((key) => values[key] !== undefined && values[key] !== "");
  const outcome = useMemo(() => {
    if (error) return { error, results: [] };
    if (!ready) return { error: null, results: [] };
    try { return { error: null, results: calculate(slug, parsed) }; }
    catch (cause) { return { error: cause instanceof Error ? cause.message : "Check your inputs.", results: [] }; }
  }, [error, ready, slug, parsed]);
  const format = (value: number | null, unit: "money" | "percent" | "number" | "boolean") => {
    if (value === null) return "—";
    if (unit === "boolean") return value ? "Yes" : "No";
    if (unit === "percent") return `${value.toFixed(1)}%`;
    if (unit === "number") return value.toLocaleString();
    return new Intl.NumberFormat(currency === "GBP" ? "en-GB" : currency === "AUD" ? "en-AU" : "en-US", { style: "currency", currency }).format(value);
  };

  return <div className="grid min-w-0 gap-6 lg:grid-cols-[1.1fr_.9fr]">
    <div className="feature-card min-w-0">
      <div className="grid gap-4 sm:grid-cols-2">
        {slug === "ebay-sell-through-rate-calculator" ? <label className="grid gap-2 text-sm font-bold text-[var(--navy)]">Observation period<input className="catalog-input" value={period} maxLength={40} onChange={(event) => setPeriod(event.target.value)} /></label> : <label className="grid gap-2 text-sm font-bold text-[var(--navy)]">eBay market and currency<select className="catalog-input" value={currency} onChange={(event) => setCurrency(event.target.value as Currency)}><option value="USD">US · USD</option><option value="GBP">UK · GBP</option><option value="AUD">AU · AUD</option></select></label>}
        {fields[slug].map((field) => <label key={field.key} className="grid gap-2 text-sm font-bold text-[var(--navy)]">{field.label}{required[slug].includes(field.key) ? " *" : ""}<span className="flex min-w-0 items-center rounded-xl border border-[var(--border)] bg-white px-3 focus-within:border-[var(--blue)]">{!field.percent && !field.count ? <span className="mr-2 text-[var(--muted)]">{symbols[currency]}</span> : null}<input className="min-w-0 flex-1 bg-transparent py-3 outline-none" type="number" inputMode={field.count ? "numeric" : "decimal"} min="0" max={field.percent ? "100" : undefined} step={field.count ? "1" : "0.01"} aria-required={required[slug].includes(field.key)} placeholder="0" value={values[field.key] ?? ""} onChange={(event) => setValues((current) => ({ ...current, [field.key]: event.target.value }))} />{field.percent ? <span className="ml-2 text-[var(--muted)]">%</span> : null}</span></label>)}
      </div>
      <button type="button" className="button button-secondary mt-5" onClick={() => { setValues({}); setPeriod("30 days"); }}>Reset inputs</button>
    </div>
    <div className="snapshot-card self-start" aria-live="polite">
      <p className="eyebrow">Your estimate</p>
      {outcome.error ? <p role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">{outcome.error}</p> : !ready ? <p className="mt-5 text-sm text-[var(--muted)]">Enter the required values to see your estimate. Optional costs can stay blank.</p> : <div className="mt-5 grid gap-3 sm:grid-cols-2">{outcome.results.map((result) => <div key={result.label} className="metric-box"><span className="metric-label">{result.label}</span><strong className="!text-lg">{format(result.value, result.unit)}</strong>{result.note ? <small className="text-[var(--muted)]">{result.note}</small> : null}</div>)}</div>}
      {slug === "ebay-sell-through-rate-calculator" ? <p className="mt-5 text-sm text-[var(--muted)]">Period: {period || "not specified"}. Formula: sold ÷ (sold + active) × 100. Enter observed sold counts yourself.</p> : <p className="mt-5 text-xs leading-5 text-[var(--muted)]">Amounts are estimates in {currency}. Enter the actual costs and fee rate for your marketplace, category and account. Percentage selling fees are applied to the total buyer payment.</p>}
    </div>
  </div>;
}
