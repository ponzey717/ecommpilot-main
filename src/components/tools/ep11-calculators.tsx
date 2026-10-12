"use client";

import { useState } from "react";

type Currency = "USD" | "GBP" | "AUD";
const symbols = { USD: "$", GBP: "£", AUD: "A$" } as const;
const number = (value: string) => value === "" ? 0 : Number(value);
const money = (currency: Currency, value: number) => new Intl.NumberFormat(currency === "GBP" ? "en-GB" : currency === "AUD" ? "en-AU" : "en-US", { style: "currency", currency }).format(value);
const valid = (values: Record<string, string>) => Object.values(values).every((value) => value === "" || (Number.isFinite(Number(value)) && Number(value) >= 0));

function Field({ label, value, onChange, symbol, percent = false }: { label: string; value: string; onChange: (value: string) => void; symbol?: string; percent?: boolean }) {
  return <label className="grid gap-2 text-sm font-bold text-[var(--navy)]">{label}<span className="flex min-w-0 items-center rounded-xl border border-[var(--border)] bg-white px-3 focus-within:border-[var(--blue)]">{symbol && <span className="mr-2 text-[var(--muted)]">{symbol}</span>}<input type="number" inputMode="decimal" min="0" max={percent ? 100 : undefined} step="0.01" className="min-w-0 flex-1 bg-transparent py-3 outline-none" placeholder="0" value={value} onChange={(event) => onChange(event.target.value)} />{percent && <span className="ml-2 text-[var(--muted)]">%</span>}</span></label>;
}
function Market({ currency, onChange }: { currency: Currency; onChange: (currency: Currency) => void }) { return <label className="grid gap-2 text-sm font-bold text-[var(--navy)]">eBay market and currency<select className="catalog-input" value={currency} onChange={(event) => onChange(event.target.value as Currency)}><option value="USD">US · USD</option><option value="GBP">UK · GBP</option><option value="AUD">AU · AUD</option></select></label>; }
function Metric({ label, value }: { label: string; value: string }) { return <div className="metric-box"><span className="metric-label">{label}</span><strong className="!text-lg">{value}</strong></div>; }

function Estimate({ kind }: { kind: "fee" | "profit" }) {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [values, setValues] = useState<Record<string, string>>({});
  const get = (key: string) => number(values[key] ?? "");
  const feeFields = [["selling", "Item selling price"], ["buyerShipping", "Buyer-paid shipping"], ["buyerTax", "Buyer-paid sales tax (fee base only)"], ["feeRate", "eBay selling fee rate"], ["fixedFee", "Fixed transaction fee"], ["otherFees", "Other applicable fees"]] as const;
  const profitFields = [["selling", "Item selling price"], ["buyerShipping", "Buyer-paid shipping"], ["buyerTax", "Buyer-paid sales tax (fee base only)"], ["cost", "Product cost"], ["supplierShipping", "Supplier shipping"], ["postage", "Seller-paid postage"], ["tax", "Purchase tax / GST / VAT"], ["feeRate", "eBay selling fee rate"], ["fixedFee", "Fixed transaction fee"], ["ad", "Optional advertising cost"], ["other", "Other costs"]] as const;
  const fields = kind === "fee" ? feeFields : profitFields;
  const error = !valid(values) || get("feeRate") > 100 ? "Enter non-negative values and a fee percentage from 0 to 100." : null;
  const ready = !error && values.selling !== undefined && values.selling !== "" && values.feeRate !== undefined && values.feeRate !== "";
  const revenue = get("selling") + get("buyerShipping");
  const variableFee = (revenue + get("buyerTax")) * get("feeRate") / 100;
  const fees = variableFee + get("fixedFee") + get("otherFees");
  const landed = get("cost") + get("supplierShipping") + get("tax");
  const total = landed + fees + get("postage") + get("ad") + get("other");
  const profit = revenue - total;
  const output = kind === "fee" ? [
    ["Percentage fee", money(currency, variableFee)], ["Fixed and other fees", money(currency, get("fixedFee") + get("otherFees"))], ["Total estimated fees", money(currency, fees)], ["Amount remaining", money(currency, revenue - fees)],
  ] : [
    ["Total revenue", money(currency, revenue)], ["Landed supplier cost", money(currency, landed)], ["eBay selling fees", money(currency, fees)], ["Total costs", money(currency, total)], ["Estimated net profit", money(currency, profit)], ["Profit margin", revenue ? `${(profit / revenue * 100).toFixed(1)}%` : "—"], ["ROI on landed cost", landed ? `${(profit / landed * 100).toFixed(1)}%` : "—"],
  ];
  return <div className="grid min-w-0 gap-6 lg:grid-cols-[1.1fr_.9fr]"><div className="feature-card grid min-w-0 gap-4 sm:grid-cols-2"><Market currency={currency} onChange={setCurrency} />{fields.map(([key, label]) => <Field key={key} label={label} value={values[key] ?? ""} onChange={(value) => setValues((current) => ({ ...current, [key]: value }))} symbol={key === "feeRate" ? undefined : symbols[currency]} percent={key === "feeRate"} />)}<button type="button" className="button button-secondary sm:col-span-2" onClick={() => setValues({})}>Reset inputs</button></div><div className="snapshot-card self-start" aria-live="polite"><p className="eyebrow">{kind === "fee" ? "Estimated order fees" : "Profit estimate"}</p>{error ? <p role="alert" className="mt-5 text-sm text-red-700">{error}</p> : !ready ? <p className="mt-5 text-sm text-[var(--muted)]">Enter an item price and your applicable eBay fee rate.</p> : <div className="mt-5 grid gap-3 sm:grid-cols-2">{output.map(([label, value]) => <Metric key={label} label={label} value={value} />)}</div>}<p className="mt-5 text-xs leading-5 text-[var(--muted)]">The percentage fee applies to item price, buyer-paid shipping and any buyer-paid sales tax you enter. Buyer tax affects the fee estimate but is not treated as seller revenue. Check the actual fee base for your market and account. {kind === "profit" ? "Optional ad spend is included only when entered; the public catalogue uses its separate V1 profit basis." : "Actual marketplace fees may differ."}</p></div></div>;
}
export function EbayFeeEstimator() { return <Estimate kind="fee" />; }
export function ProfitMarginCalculator() { return <Estimate kind="profit" />; }

export function TitleLengthChecker() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const length = Array.from(title).length;
  return <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]"><div className="feature-card"><label className="grid gap-3 text-sm font-bold text-[var(--navy)]">eBay listing title<textarea value={title} onChange={(event) => { setTitle(event.target.value); setMessage(""); }} rows={5} className="w-full resize-y rounded-xl border border-[var(--border)] bg-white p-4 text-base leading-7 outline-none focus:border-[var(--blue)]" placeholder="Brand, product type, key attributes…" /></label><div className="mt-5 flex flex-wrap gap-3"><button type="button" className="button button-primary" disabled={!title} onClick={async () => { try { await navigator.clipboard.writeText(title); setMessage("Title copied."); } catch { setMessage("Copy failed. Select the title and copy it manually."); } }}>Copy title</button><button type="button" className="button button-secondary" onClick={() => { setTitle(""); setMessage(""); }}>Clear</button></div>{message && <p role="status" className="mt-3 text-sm text-[var(--muted)]">{message}</p>}</div><div className="snapshot-card" aria-live="polite"><p className="eyebrow">Title length</p><p className={`mt-4 text-5xl font-extrabold ${length > 80 ? "text-red-700" : "text-[var(--navy)]"}`}>{length}/80</p><p className="mt-4 text-sm text-[var(--muted)]">{length <= 80 ? `${80 - length} characters remaining.` : `${length - 80} characters over the standard limit.`}</p><p className="mt-5 text-xs leading-5 text-[var(--muted)]">Counts Unicode code points. Use accurate product terms and check the applicable limit in your listing editor. This does not predict search ranking.</p></div></div>;
}
