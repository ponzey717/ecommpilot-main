"use client";

import type { ReactNode } from "react";

export type Currency = "USD" | "GBP" | "AUD";

export const currencySymbol: Record<Currency, string> = { USD: "$", GBP: "£", AUD: "A$" };

export function formatMoney(currency: Currency, value: number) {
  return new Intl.NumberFormat(currency === "GBP" ? "en-GB" : currency === "AUD" ? "en-AU" : "en-US", {
    style: "currency",
    currency,
  }).format(value);
}

export function MarketSelector({ currency, onChange }: { currency: Currency; onChange: (value: Currency) => void }) {
  return <label className="tool-field">
    <span>Market &amp; currency</span>
    <select className="tool-control" value={currency} onChange={(event) => onChange(event.target.value as Currency)}>
      <option value="USD">US · USD</option>
      <option value="GBP">UK · GBP</option>
      <option value="AUD">AU · AUD</option>
    </select>
  </label>;
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

export function AdvancedSettings({ children }: { children: ReactNode }) {
  return <details className="tool-advanced">
    <summary><span>Advanced settings</span><small>Optional costs &amp; assumptions</small></summary>
    <div className="tool-advanced-grid">{children}</div>
  </details>;
}

export function ToolWorkspace({ inputTitle, inputDescription, inputs, actions, results, resultId = "tool-results" }: {
  inputTitle: string;
  inputDescription: string;
  inputs: ReactNode;
  actions: ReactNode;
  results: ReactNode;
  resultId?: string;
}) {
  return <div className="tool-workspace">
    <section className="tool-input-panel" aria-labelledby="tool-input-title">
      <div className="tool-panel-head">
        <div><p className="tool-panel-kicker">Your inputs</p><h2 id="tool-input-title">{inputTitle}</h2><p>{inputDescription}</p></div>
        <a href={`#${resultId}`} className="tool-see-results">See results ↓</a>
      </div>
      {inputs}
      <div className="tool-actions">{actions}</div>
    </section>
    <section id={resultId} className="tool-results-panel" aria-live="polite" aria-atomic="false">{results}</section>
  </div>;
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
