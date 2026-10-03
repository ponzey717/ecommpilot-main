"use client";

import { useMemo, useState } from "react";

function NumberField({
  label,
  value,
  onChange,
  prefix,
  suffix,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-[var(--navy)]">
      {label}
      <div className="flex min-h-12 items-center rounded-xl border border-[var(--border)] bg-white px-3 focus-within:border-[var(--blue)]">
        {prefix && <span className="mr-2 text-[var(--muted)]">{prefix}</span>}
        <input
          inputMode="decimal"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="min-w-0 flex-1 bg-transparent py-3 outline-none"
        />
        {suffix && <span className="ml-2 text-[var(--muted)]">{suffix}</span>}
      </div>
    </label>
  );
}

function n(value: string) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function ProfitMarginCalculator() {
  const [selling, setSelling] = useState("34.99");
  const [cost, setCost] = useState("14.20");
  const [shipping, setShipping] = useState("0");
  const [tax, setTax] = useState("1.42");
  const [feeRate, setFeeRate] = useState("13.25");

  const result = useMemo(() => {
    const sale = n(selling);
    const landed = n(cost) + n(shipping) + n(tax);
    const fee = sale * (n(feeRate) / 100);
    const profit = sale - landed - fee;
    const margin = sale > 0 ? (profit / sale) * 100 : 0;
    const roi = landed > 0 ? (profit / landed) * 100 : 0;
    return { landed, fee, profit, margin, roi };
  }, [selling, cost, shipping, tax, feeRate]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
      <div className="feature-card grid gap-4 sm:grid-cols-2">
        <NumberField label="Selling price" value={selling} onChange={setSelling} prefix="$" />
        <NumberField label="Product cost" value={cost} onChange={setCost} prefix="$" />
        <NumberField label="Supplier shipping" value={shipping} onChange={setShipping} prefix="$" />
        <NumberField label="Purchase tax / GST / VAT" value={tax} onChange={setTax} prefix="$" />
        <NumberField label="eBay fee rate" value={feeRate} onChange={setFeeRate} suffix="%" />
      </div>
      <div className="snapshot-card">
        <p className="eyebrow">Estimate</p>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="metric-box"><span className="metric-label">Landed cost</span><strong>${result.landed.toFixed(2)}</strong></div>
          <div className="metric-box"><span className="metric-label">eBay fee</span><strong>${result.fee.toFixed(2)}</strong></div>
          <div className="metric-box"><span className="metric-label">Net profit</span><strong>${result.profit.toFixed(2)}</strong></div>
          <div className="metric-box"><span className="metric-label">Profit margin</span><strong>{result.margin.toFixed(1)}%</strong></div>
        </div>
        <p className="mt-4 text-sm text-[var(--muted)]">ROI on landed cost: <strong>{result.roi.toFixed(1)}%</strong></p>
        <p className="mt-4 text-xs leading-5 text-[var(--muted)]">
          Estimate only. Enter the fee and tax assumptions that apply to your actual marketplace and category.
          Optional promoted listing or ad spend is not included unless you add it to your costs.
        </p>
      </div>
    </div>
  );
}

export function EbayFeeEstimator() {
  const [selling, setSelling] = useState("34.99");
  const [feeRate, setFeeRate] = useState("13.25");
  const [fixedFee, setFixedFee] = useState("0");

  const fee = useMemo(
    () => n(selling) * (n(feeRate) / 100) + n(fixedFee),
    [selling, feeRate, fixedFee],
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
      <div className="feature-card grid gap-4">
        <NumberField label="Selling price" value={selling} onChange={setSelling} prefix="$" />
        <NumberField label="Marketplace fee rate" value={feeRate} onChange={setFeeRate} suffix="%" />
        <NumberField label="Fixed transaction fee (if any)" value={fixedFee} onChange={setFixedFee} prefix="$" />
      </div>
      <div className="snapshot-card">
        <p className="eyebrow">Estimated marketplace fee</p>
        <p className="mt-4 text-5xl font-extrabold tracking-[-.04em] text-[var(--navy)]">${fee.toFixed(2)}</p>
        <p className="mt-5 text-xs leading-5 text-[var(--muted)]">
          eBay fees vary by marketplace, category, seller status and other factors.
          This tool intentionally uses the rate you enter rather than hardcoding one universal fee.
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


export function SellThroughCalculator() {
  const [activeListings, setActiveListings] = useState("120");
  const [soldCount, setSoldCount] = useState("45");

  const result = useMemo(() => {
    const active = Math.max(0, n(activeListings));
    const sold = Math.max(0, n(soldCount));
    const observed = active + sold;
    const sellThrough = observed > 0 ? (sold / observed) * 100 : 0;

    const interpretation =
      observed > 0
        ? sold.toFixed(0) +
          " sold out of an observed pool of " +
          observed.toFixed(0) +
          " listings using the stated formula."
        : "Enter your active and sold counts to calculate the observed rate.";

    return { active, sold, observed, sellThrough, interpretation };
  }, [activeListings, soldCount]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
      <div className="feature-card grid gap-4">
        <NumberField
          label="Active listings"
          value={activeListings}
          onChange={setActiveListings}
        />
        <NumberField
          label="Sold count"
          value={soldCount}
          onChange={setSoldCount}
        />
        <p className="text-xs leading-5 text-[var(--muted)]">
          Use counts from the same market, product scope and evidence window. This tool
          does not fetch or infer eBay sold history for you.
        </p>
      </div>

      <div className="snapshot-card">
        <p className="eyebrow">Observed sell-through</p>
        <p className="mt-4 text-5xl font-extrabold tracking-[-.04em] text-[var(--navy)]">
          {result.sellThrough.toFixed(1)}%
        </p>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="metric-box">
            <span className="metric-label">Sold</span>
            <strong>{result.sold.toFixed(0)}</strong>
          </div>
          <div className="metric-box">
            <span className="metric-label">Observed pool</span>
            <strong>{result.observed.toFixed(0)}</strong>
          </div>
        </div>
        <p className="mt-5 text-sm leading-6 text-[var(--muted)]">
          {result.interpretation}
        </p>
        <p className="mt-4 text-xs leading-5 text-[var(--muted)]">
          Formula: sold ÷ (sold + active listings) × 100. Treat this as one demand
          indicator, not a guarantee that a product will sell.
        </p>
      </div>
    </div>
  );
}
