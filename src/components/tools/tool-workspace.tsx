"use client";

import { useCallback, useEffect, useState, type KeyboardEvent, type ReactNode } from "react";
import { ebayMarkets, getEbayMarket, type CurrencyCode, type EbayMarketCode } from "@/config/ebay-markets";
import { SavedResults } from "./saved-results";
import type { SavedToolRecord } from "@/lib/tools/saved-results";

export type Currency = CurrencyCode;

export const currencySymbol: Record<Currency, string> = { USD: "$", GBP: "£", EUR: "€", CAD: "C$", AUD: "A$", CHF: "CHF", PLN: "zł", HKD: "HK$", SGD: "S$", MYR: "RM", PHP: "₱" };

export function formatMoney(currency: Currency, value: number) {
  const market = ebayMarkets.find((item) => item.currency === currency);
  return new Intl.NumberFormat(market?.locale ?? "en-US", {
    style: "currency",
    currency,
  }).format(value);
}

export function useMarketSelection(initial: EbayMarketCode = "US") {
  const [market, setMarketState] = useState<EbayMarketCode>(initial);
  useEffect(() => {
    const saved = window.localStorage.getItem("ecommpilot-market");
    if (saved && ebayMarkets.some((item) => item.code === saved)) queueMicrotask(() => setMarketState(saved as EbayMarketCode));
  }, []);
  const setMarket = useCallback((value: EbayMarketCode) => {
    setMarketState(value);
    window.localStorage.setItem("ecommpilot-market", value);
  }, []);
  return [market, setMarket, getEbayMarket(market)] as const;
}

export function MarketSelector({ market, onChange }: { market: EbayMarketCode; onChange: (value: EbayMarketCode) => void }) {
  const move = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? 0 : event.key === "End" ? ebayMarkets.length - 1 : (index + (event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : -1) + ebayMarkets.length) % ebayMarkets.length;
    onChange(ebayMarkets[next].code);
    const buttons = event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>("button[role=radio]");
    buttons?.[next]?.focus();
  };
  return <fieldset className="market-selector">
    <legend>eBay marketplace</legend>
    <p>Choose the listing site. Seller registration and buyer destination are separate fee inputs.</p>
    <div className="market-grid" role="radiogroup" aria-label="eBay marketplace">
      {ebayMarkets.map((item, index) => <button key={item.code} type="button" role="radio" aria-label={`${item.name} · ${item.site}`} aria-checked={market === item.code} tabIndex={market === item.code ? 0 : -1} className={market === item.code ? "market-option is-selected" : "market-option"} onClick={() => onChange(item.code)} onKeyDown={(event) => move(event, index)} title={`${item.name} · ${item.site}`}>
        <span className={`fi fi-${item.flag} market-flag`} aria-hidden="true" />
        <span className="market-radio" aria-hidden="true"><i /></span>
        <b>{item.code}</b>
      </button>)}
    </div>
  </fieldset>;
}

export function NumberField({ label, value, onChange, currency, percent, count, hint, required }: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  currency?: Currency;
  percent?: boolean;
  count?: boolean;
  hint?: string;
  required?: boolean;
}) {
  return <label className="tool-field">
    <span>{label}{required ? <b aria-hidden="true"> *</b> : null}</span>
    <span className="tool-number-wrap">
      {currency ? <span aria-hidden="true">{currencySymbol[currency]}</span> : null}
      <input
        className="tool-number"
        type="number"
        inputMode={count ? "numeric" : "decimal"}
        min="0"
        max={percent ? 100 : undefined}
        step={count ? 1 : 0.01}
        value={value}
        placeholder="0"
        aria-required={required}
        onChange={(event) => onChange(event.target.value)}
      />
      {percent ? <span aria-hidden="true">%</span> : null}
    </span>
    {hint ? <small>{hint}</small> : null}
  </label>;
}

export type FeeInputValue = { mode: "percent" | "fixed"; value: string; basis: "item" | "buyer-total" | "supplier-cost" };

export function FeeInput({ label, value, onChange, currency, hint }: { label: string; value: FeeInputValue; onChange: (value: FeeInputValue) => void; currency: Currency; hint?: string }) {
  return <div className="tool-field fee-input">
    <span>{label}</span>
    <div className="fee-mode" role="group" aria-label={`${label} input mode`}><button type="button" className={value.mode === "percent" ? "is-selected" : ""} aria-pressed={value.mode === "percent"} onClick={() => onChange({ ...value, mode: "percent" })}>%</button><button type="button" className={value.mode === "fixed" ? "is-selected" : ""} aria-pressed={value.mode === "fixed"} onClick={() => onChange({ ...value, mode: "fixed" })}>{currencySymbol[currency]}</button></div>
    <span className="tool-number-wrap">{value.mode === "fixed" ? <span aria-hidden="true">{currencySymbol[currency]}</span> : null}<input className="tool-number" type="number" inputMode="decimal" min="0" max={value.mode === "percent" ? 100 : undefined} step="0.01" placeholder="0" value={value.value} onChange={(event) => onChange({ ...value, value: event.target.value })} />{value.mode === "percent" ? <span aria-hidden="true">%</span> : null}</span>
    {value.mode === "percent" ? <select className="tool-control fee-basis" aria-label={`${label} percentage basis`} value={value.basis} onChange={(event) => onChange({ ...value, basis: event.target.value as FeeInputValue["basis"] })}><option value="item">of item price</option><option value="buyer-total">of buyer total</option><option value="supplier-cost">of supplier cost</option></select> : null}
    {hint ? <small>{hint}</small> : null}
  </div>;
}

export function feeInputAmount(input: FeeInputValue, bases: { item: number; "buyer-total": number; "supplier-cost": number }) {
  const amount = Number(input.value || 0);
  if (!Number.isFinite(amount) || amount < 0 || (input.mode === "percent" && amount > 100)) return NaN;
  return input.mode === "fixed" ? amount : bases[input.basis] * amount / 100;
}

export function AdvancedSettings({ children }: { children: ReactNode }) {
  return <details className="tool-advanced">
    <summary><span>Advanced settings</span><small>Optional costs &amp; assumptions</small></summary>
    <div className="tool-advanced-grid">{children}</div>
  </details>;
}

export function ToolWorkspace({ inputTitle, inputDescription, inputs, actions, results, resultId = "tool-results", saved }: {
  inputTitle: string;
  inputDescription: string;
  inputs: ReactNode;
  actions: ReactNode;
  results: ReactNode;
  resultId?: string;
  saved?: { toolSlug: string; toolName: string; snapshot: Omit<SavedToolRecord, "id" | "createdAt"> | null };
}) {
  return <><div className="tool-workspace">
    <section className="tool-input-panel" aria-labelledby="tool-input-title">
      <div className="tool-panel-head">
        <div><p className="tool-panel-kicker">Your inputs</p><h2 id="tool-input-title">{inputTitle}</h2><p>{inputDescription}</p></div>
        <a href={`#${resultId}`} className="tool-see-results">See results ↓</a>
      </div>
      {inputs}
      <div className="tool-actions">{actions}</div>
    </section>
    <section id={resultId} className="tool-results-panel" aria-live="polite" aria-atomic="false">{results}</section>
  </div>{saved ? <SavedResults {...saved} /> : null}</>;
}

export function ResultHero({ eyebrow, value, description, tone = "default" }: {
  eyebrow: string;
  value: string;
  description: string;
  tone?: "default" | "positive" | "negative";
}) {
  return <div className={`result-hero result-hero-${tone}`}>
    <p>{eyebrow}</p><strong>{value}</strong><span>{description}</span>
  </div>;
}

export function ResultRow({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return <div className={`result-row${strong ? " result-row-strong" : ""}`}><span>{label}</span><b>{value}</b></div>;
}

export function DonutChart({ segments, centerLabel, centerValue }: {
  segments: { label: string; value: number; color: string }[];
  centerLabel: string;
  centerValue: string;
}) {
  const total = segments.reduce((sum, item) => sum + Math.max(0, item.value), 0);
  let offset = 0;
  const gradient = total > 0 ? segments.map((segment) => {
    const start = offset;
    offset += Math.max(0, segment.value) / total * 100;
    return `${segment.color} ${start}% ${offset}%`;
  }).join(",") : "#dfe7f1 0 100%";
  return <div className="result-chart-block">
    <div className="donut-chart" role="img" aria-label={segments.map((item) => `${item.label}: ${item.value.toFixed(2)}`).join(", ")} style={{ background: `conic-gradient(${gradient})` }}>
      <div><small>{centerLabel}</small><b>{centerValue}</b></div>
    </div>
    <div className="chart-legend">{segments.map((item) => <div key={item.label}><i style={{ background: item.color }} /><span>{item.label}</span><b>{total ? `${(item.value / total * 100).toFixed(1)}%` : "0%"}</b></div>)}</div>
  </div>;
}

export function ComparisonBars({ items, currency }: { items: { label: string; value: number; color?: string }[]; currency: Currency }) {
  const max = Math.max(0.01, ...items.map((item) => Math.max(0, item.value)));
  return <div className="comparison-bars" role="img" aria-label={items.map((item) => `${item.label}: ${formatMoney(currency, item.value)}`).join(", ")}>
    {items.map((item) => <div key={item.label}><span>{item.label}</span><div><i style={{ width: `${Math.max(0, item.value) / max * 100}%`, background: item.color }} /></div><b>{formatMoney(currency, item.value)}</b></div>)}
  </div>;
}

export function EmptyResult({ children = "Enter the required values to see your estimate instantly." }: { children?: ReactNode }) {
  return <div className="result-empty"><span aria-hidden="true">↗</span><h2>Your result will appear here</h2><p>{children}</p></div>;
}

export function ErrorResult({ message }: { message: string }) {
  return <div className="result-error" role="alert"><b>Check your inputs</b><p>{message}</p></div>;
}
