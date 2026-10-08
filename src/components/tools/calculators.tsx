"use client";

import { useMemo, useState } from "react";

type Currency = "USD" | "GBP" | "AUD";

function NumberField({
  label,
  value,
  onChange,
  prefix,
  suffix,
  placeholder,
  max,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  prefix?: string;
  suffix?: string;
  placeholder?: string;
  max?: number;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-[var(--navy)]">
      {label}
      <div className="flex min-h-12 items-center rounded-xl border border-[var(--border)] bg-white px-3 focus-within:border-[var(--blue)]">
        {prefix && <span className="mr-2 text-[var(--muted)]">{prefix}</span>}
        <input
          type="number"
          inputMode="decimal"
          min="0"
          max={max}
          step="0.01"
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className="min-w-0 flex-1 bg-transparent py-3 outline-none"
        />
        {suffix && <span className="ml-2 text-[var(--muted)]">{suffix}</span>}
      </div>
    </label>
  );
}

function amount(value: string) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

function percentage(value: string) {
  return Math.min(100, amount(value));
}

function currencySymbol(currency: Currency) {
  if (currency === "GBP") return "£";
  if (currency === "AUD") return "A$";
  return "$";
}

function money(currency: Currency, value: number) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}

function CurrencyField({
  value,
  onChange,
}: {
  value: Currency;
  onChange: (value: Currency) => void;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-[var(--navy)]">
      Currency
      <select
        className="catalog-input"
        value={value}
        onChange={(event) => onChange(event.target.value as Currency)}
      >
        <option value="USD">USD · US dollar</option>
        <option value="GBP">GBP · British pound</option>
        <option value="AUD">AUD · Australian dollar</option>
      </select>
    </label>
  );
}

export function ProfitMarginCalculator() {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [selling, setSelling] = useState("34.99");
  const [cost, setCost] = useState("14.20");
  const [shipping, setShipping] = useState("0");
  const [tax, setTax] = useState("0");
  const [feeRate, setFeeRate] = useState("");
  const [fixedFee, setFixedFee] = useState("0");

  const feeReady = feeRate.trim() !== "";
  const result = useMemo(() => {
    const sale = amount(selling);
    const landed = amount(cost) + amount(shipping) + amount(tax);
    if (!feeReady) return { landed, marketplaceFee: null, profit: null, margin: null, roi: null };
    const marketplaceFee = sale * (percentage(feeRate) / 100) + amount(fixedFee);
    const profit = sale - landed - marketplaceFee;
    const margin = sale > 0 ? (profit / sale) * 100 : 0;
    const roi = landed > 0 ? (profit / landed) * 100 : 0;
    return { landed, marketplaceFee, profit, margin, roi };
  }, [selling, cost, shipping, tax, feeRate, fixedFee, feeReady]);

  const symbol = currencySymbol(currency);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
      <div className="feature-card grid gap-4 sm:grid-cols-2">
        <CurrencyField value={currency} onChange={setCurrency} />
        <NumberField label="Selling price" value={selling} onChange={setSelling} prefix={symbol} />
        <NumberField label="Product cost" value={cost} onChange={setCost} prefix={symbol} />
        <NumberField label="Supplier shipping" value={shipping} onChange={setShipping} prefix={symbol} />
        <NumberField label="Purchase tax / GST / VAT" value={tax} onChange={setTax} prefix={symbol} />
        <NumberField
          label="eBay fee rate"
          value={feeRate}
          onChange={setFeeRate}
          suffix="%"
          placeholder="Enter your rate"
          max={100}
        />
        <NumberField
          label="Mandatory fixed transaction fees"
          value={fixedFee}
          onChange={setFixedFee}
          prefix={symbol}
        />
      </div>
      <div className="snapshot-card">
        <p className="eyebrow">Estimate</p>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="metric-box"><span className="metric-label">Landed cost</span><strong>{money(currency, result.landed)}</strong></div>
          <div className="metric-box"><span className="metric-label">eBay cost</span><strong>{result.marketplaceFee == null ? "—" : money(currency, result.marketplaceFee)}</strong></div>
          <div className="metric-box"><span className="metric-label">Net profit</span><strong>{result.profit == null ? "—" : money(currency, result.profit)}</strong></div>
          <div className="metric-box"><span className="metric-label">Profit margin</span><strong>{result.margin == null ? "—" : result.margin.toFixed(1) + "%"}</strong></div>
        </div>
        <p className="mt-4 text-sm text-[var(--muted)]">
          ROI on landed cost: <strong>{result.roi == null ? "—" : result.roi.toFixed(1) + "%"}</strong>
        </p>
        {!feeReady ? (
          <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs font-bold leading-5 text-amber-800">
            Enter the eBay fee rate that applies to your marketplace/category before treating the profit estimate as complete.
          </p>
        ) : null}
        <p className="mt-4 text-xs leading-5 text-[var(--muted)]">
          Estimate only. Enter the fee, fixed transaction fee and tax assumptions that apply to your actual marketplace, category and account.
          Optional promoted-listing or ad spend is not included.
        </p>
      </div>
    </div>
  );
}

export function EbayFeeEstimator() {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [selling, setSelling] = useState("34.99");
  const [feeRate, setFeeRate] = useState("");
  const [fixedFee, setFixedFee] = useState("0");

  const feeReady = feeRate.trim() !== "";
  const fee = useMemo(
    () => feeReady ? amount(selling) * (percentage(feeRate) / 100) + amount(fixedFee) : null,
    [selling, feeRate, fixedFee, feeReady],
  );

  const symbol = currencySymbol(currency);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
      <div className="feature-card grid gap-4">
        <CurrencyField value={currency} onChange={setCurrency} />
        <NumberField label="Selling price" value={selling} onChange={setSelling} prefix={symbol} />
        <NumberField
          label="Marketplace fee rate"
          value={feeRate}
          onChange={setFeeRate}
          suffix="%"
          placeholder="Enter your rate"
          max={100}
        />
        <NumberField label="Fixed transaction fee (if any)" value={fixedFee} onChange={setFixedFee} prefix={symbol} />
      </div>
      <div className="snapshot-card">
        <p className="eyebrow">Estimated marketplace fee</p>
        <p className="mt-4 text-5xl font-extrabold tracking-[-.04em] text-[var(--navy)]">
          {fee == null ? "—" : money(currency, fee)}
        </p>
        {!feeReady ? (
          <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs font-bold leading-5 text-amber-800">
            Enter the marketplace fee rate that applies to your account/category to calculate an estimate.
          </p>
        ) : null}
        <p className="mt-5 text-xs leading-5 text-[var(--muted)]">
          eBay fees vary by marketplace, category, seller status and other account conditions.
          This tool intentionally starts with no percentage assumption and uses the rate you enter.
        </p>
      </div>
    </div>
  );
}

export function TitleLengthChecker() {
  const [title, setTitle] = useState("Portable adjustable desktop phone stand");
  const remaining = 80 - title.length;
  const okay = remaining >= 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
      <div className="feature-card">
        <label className="grid gap-3 text-sm font-bold text-[var(--navy)]">
          eBay listing title
          <textarea
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            rows={5}
            className="w-full resize-y rounded-xl border border-[var(--border)] bg-white p-4 text-base leading-7 outline-none focus:border-[var(--blue)]"
          />
        </label>
      </div>
      <div className="snapshot-card">
        <p className="eyebrow">Title length</p>
        <p className={"mt-4 text-5xl font-extrabold tracking-[-.04em] " + (okay ? "text-[var(--navy)]" : "text-red-600")}>
          {title.length}/80
        </p>
        <p className="mt-4 text-sm text-[var(--muted)]">
          {okay ? remaining + " characters remaining." : Math.abs(remaining) + " characters over the limit."}
        </p>
        <p className="mt-5 text-xs leading-5 text-[var(--muted)]">
          This checks character count only. It does not guarantee ranking, compliance or product accuracy.
        </p>
      </div>
    </div>
  );
}
