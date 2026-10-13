"use client";

import { useState } from "react";
import {
  AdvancedSettings, DonutChart, EmptyResult, ErrorResult, formatMoney, MarketSelector,
  NumberField, ResultHero, ResultRow, ToolWorkspace, type Currency,
} from "./tool-workspace";
import { calculateTransaction } from "@/lib/tools/calculations";

const number = (value: string | undefined) => value === undefined || value === "" ? 0 : Number(value);
const valid = (values: Record<string, string>) => Object.values(values).every((value) => value === "" || (Number.isFinite(Number(value)) && Number(value) >= 0));

function Calculator({ kind }: { kind: "fee" | "profit" }) {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [values, setValues] = useState<Record<string, string>>({});
  const [copyMessage, setCopyMessage] = useState("");
  const get = (key: string) => number(values[key]);
  const set = (key: string, value: string) => { setValues((current) => ({ ...current, [key]: value })); setCopyMessage(""); };
  const error = !valid(values) || get("feeRate") > 100 || get("adRate") > 100 ? "Enter non-negative values and percentages from 0 to 100." : null;
  const ready = !error && values.selling !== undefined && values.selling !== "" && values.feeRate !== undefined && values.feeRate !== "";
  const estimate = calculateTransaction({ selling: get("selling"), buyerShipping: get("buyerShipping"), buyerTax: get("buyerTax"), cost: get("cost"), supplierShipping: get("supplierShipping"), purchaseTax: get("purchaseTax"), postage: get("postage"), other: get("other"), feeRate: get("feeRate"), fixedFee: get("fixedFee"), otherFees: get("otherFees"), adRate: get("adRate"), adFixed: get("adFixed") });
  const { revenue, variableFee, additionalFees, fees, landed, advertising, fulfilment, profit, breakEven } = estimate;
  const margin = estimate.margin ?? 0;
  const roi = estimate.roi ?? 0;

  const example = () => setValues(kind === "fee"
    ? { selling: "40", buyerShipping: "0", buyerTax: "0", feeRate: "10", fixedFee: "0.30", otherFees: "0" }
    : { selling: "40", cost: "20", feeRate: "10", fixedFee: "0.30" });
  const reset = () => { setValues({}); setCurrency("USD"); setCopyMessage(""); };
  const copy = async () => {
    const text = kind === "fee"
      ? `eBay fee estimate: ${formatMoney(currency, fees)} total fees; ${formatMoney(currency, revenue - fees)} estimated payout.`
      : `eBay profit estimate: ${formatMoney(currency, profit)} net profit; ${margin.toFixed(2)}% margin; ${roi.toFixed(2)}% ROI.`;
    try { await navigator.clipboard.writeText(text); setCopyMessage("Results copied."); }
    catch { setCopyMessage("Copy failed. Select the figures and copy them manually."); }
  };

  const basic = kind === "fee" ? <>
    <MarketSelector currency={currency} onChange={setCurrency} />
    <NumberField label="Selling price" value={values.selling ?? ""} onChange={(value) => set("selling", value)} currency={currency} required />
    <NumberField label="eBay selling fee rate" value={values.feeRate ?? ""} onChange={(value) => set("feeRate", value)} percent required hint="Use the rate for your market and category." />
    <NumberField label="Fixed transaction fee" value={values.fixedFee ?? ""} onChange={(value) => set("fixedFee", value)} currency={currency} />
  </> : <>
    <MarketSelector currency={currency} onChange={setCurrency} />
    <NumberField label="Selling price" value={values.selling ?? ""} onChange={(value) => set("selling", value)} currency={currency} required />
    <NumberField label="Product cost" value={values.cost ?? ""} onChange={(value) => set("cost", value)} currency={currency} required />
    <NumberField label="eBay selling fee rate" value={values.feeRate ?? ""} onChange={(value) => set("feeRate", value)} percent required />
    <NumberField label="Fixed transaction fee" value={values.fixedFee ?? ""} onChange={(value) => set("fixedFee", value)} currency={currency} />
  </>;

  const advanced = kind === "fee" ? <>
    <NumberField label="Buyer-paid shipping" value={values.buyerShipping ?? ""} onChange={(value) => set("buyerShipping", value)} currency={currency} />
    <NumberField label="Buyer-collected sales tax" value={values.buyerTax ?? ""} onChange={(value) => set("buyerTax", value)} currency={currency} hint="Included only in the fee base." />
    <NumberField label="Additional entered fees" value={values.otherFees ?? ""} onChange={(value) => set("otherFees", value)} currency={currency} />
  </> : <>
    <NumberField label="Buyer-paid shipping" value={values.buyerShipping ?? ""} onChange={(value) => set("buyerShipping", value)} currency={currency} />
    <NumberField label="Buyer-collected sales tax" value={values.buyerTax ?? ""} onChange={(value) => set("buyerTax", value)} currency={currency} hint="Affects the fee base, not seller revenue." />
    <NumberField label="Supplier shipping" value={values.supplierShipping ?? ""} onChange={(value) => set("supplierShipping", value)} currency={currency} />
    <NumberField label="Seller-paid postage" value={values.postage ?? ""} onChange={(value) => set("postage", value)} currency={currency} />
    <NumberField label="Purchase tax / GST / VAT" value={values.purchaseTax ?? ""} onChange={(value) => set("purchaseTax", value)} currency={currency} />
    <NumberField label="Advertising rate" value={values.adRate ?? ""} onChange={(value) => set("adRate", value)} percent />
    <NumberField label="Optional advertising cost" value={values.adFixed ?? ""} onChange={(value) => set("adFixed", value)} currency={currency} />
    <NumberField label="Other fulfilment costs" value={values.other ?? ""} onChange={(value) => set("other", value)} currency={currency} />
  </>;

  let results;
  if (error) results = <ErrorResult message={error} />;
  else if (!ready) results = <EmptyResult>Enter a selling price and your fee rate. Optional costs can stay blank.</EmptyResult>;
  else if (kind === "fee") results = <>
    <ResultHero eyebrow="Estimated total eBay fees" value={formatMoney(currency, fees)} description="Based only on the fee assumptions you entered." />
    <DonutChart centerLabel="Effective fee" centerValue={revenue ? `${(fees / revenue * 100).toFixed(1)}%` : "—"} segments={[
      { label: "Percentage fee", value: variableFee, color: "#146cff" },
      { label: "Fixed & additional", value: additionalFees, color: "#16d9e3" },
      { label: "Estimated payout", value: Math.max(0, revenue - fees), color: "#dfe7f1" },
    ]} />
    <div className="result-list"><ResultRow label="Percentage selling fee" value={formatMoney(currency, variableFee)} /><ResultRow label="Fixed transaction fee" value={formatMoney(currency, get("fixedFee"))} /><ResultRow label="Additional entered fees" value={formatMoney(currency, get("otherFees"))} /><ResultRow label="Estimated seller payout" value={formatMoney(currency, revenue - fees)} strong /></div>
    <p className="result-note">Buyer-collected sales tax is included in the fee base when entered, but is not counted as seller revenue.</p>
  </>;
  else results = <>
    <ResultHero eyebrow={profit < 0 ? "Estimated net loss" : "Estimated net profit"} value={formatMoney(currency, profit)} description={profit < 0 ? "Entered costs exceed revenue. Review price or costs before listing." : "What remains after all entered costs and fees."} tone={profit < 0 ? "negative" : "positive"} />
    {profit >= 0 ? <DonutChart centerLabel="Margin" centerValue={`${margin.toFixed(2)}%`} segments={[
      { label: "Product & supply", value: landed, color: "#071a3d" }, { label: "eBay fees", value: fees, color: "#146cff" },
      { label: "Ads & fulfilment", value: advertising + fulfilment, color: "#16d9e3" }, { label: "Net profit", value: profit, color: "#31b57b" },
    ]} /> : <div className="loss-breakdown"><b>Loss breakdown</b><p>Total entered costs are {formatMoney(currency, Math.abs(profit))} above sale revenue. Negative values are never shown as a pie slice.</p></div>}
    <div className="result-stat-grid"><div><span>Profit margin</span><b>{margin.toFixed(2)}%</b></div><div><span>ROI on landed cost</span><b>{landed ? `${roi.toFixed(2)}%` : "—"}</b></div><div><span>Break-even item price</span><b>{breakEven === null ? "Not possible" : formatMoney(currency, breakEven)}</b></div></div>
    <div className="result-list"><ResultRow label="Sale revenue" value={formatMoney(currency, revenue)} /><ResultRow label="Product & supplier cost" value={formatMoney(currency, landed)} /><ResultRow label="Selling fees" value={formatMoney(currency, fees)} /><ResultRow label="Advertising costs" value={formatMoney(currency, advertising)} /><ResultRow label="Other fulfilment costs" value={formatMoney(currency, fulfilment)} /></div>
    <p className="result-note">Advertising is excluded unless you enter it. All rates are illustrative assumptions, not verified current eBay rates.</p>
  </>;

  return <ToolWorkspace inputTitle={kind === "fee" ? "Transaction details" : "Calculate your profit"} inputDescription={kind === "fee" ? "Start with the order value and the fee assumptions that apply to you." : "Use four essentials first, then add optional costs when needed."} inputs={<><div className="tool-field-grid">{basic}</div><AdvancedSettings>{advanced}</AdvancedSettings></>} actions={<><button type="button" className="button button-primary" onClick={example}>Try example</button><button type="button" className="button button-secondary" onClick={reset}>Reset</button>{ready ? <button type="button" className="button button-ghost" onClick={copy}>Copy results</button> : null}{copyMessage ? <span role="status">{copyMessage}</span> : null}</>} results={results} />;
}

export function EbayFeeEstimator() { return <Calculator kind="fee" />; }
export function ProfitMarginCalculator() { return <Calculator kind="profit" />; }

export function TitleLengthChecker() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const length = Array.from(title).length;
  const percent = Math.min(100, length / 80 * 100);
  return <ToolWorkspace inputTitle="Draft your listing title" inputDescription="Type or paste a title. The count updates instantly." inputs={<label className="tool-field"><span>eBay listing title</span><textarea value={title} onChange={(event) => { setTitle(event.target.value); setMessage(""); }} rows={7} className="tool-control tool-textarea" placeholder="Brand, product type, key attributes…" /></label>} actions={<><button type="button" className="button button-primary" disabled={!title} onClick={async () => { try { await navigator.clipboard.writeText(title); setMessage("Title copied."); } catch { setMessage("Copy failed. Select the title and copy it manually."); } }}>Copy title</button><button type="button" className="button button-secondary" onClick={() => { setTitle(""); setMessage(""); }}>Clear</button>{message ? <span role="status">{message}</span> : null}</>} results={<div className="title-result"><p className="tool-panel-kicker">Live character count</p><strong className={length > 80 ? "is-over" : ""}>{length}/80</strong><p>{length <= 80 ? `${80 - length} characters remaining` : `${length - 80} characters over the standard limit`}</p><div className="title-progress" role="progressbar" aria-valuemin={0} aria-valuemax={80} aria-valuenow={length}><i className={length > 80 ? "is-over" : ""} style={{ width: `${percent}%` }} /></div><div className={`title-status ${length > 80 ? "title-status-error" : ""}`}>{length > 80 ? "Shorten this title before using it in a standard 80-character field." : length === 0 ? "Start typing to check your title." : "Your title is within the standard limit."}</div><p className="result-note">This counts Unicode code points. It does not predict ranking or validate listing policy.</p></div>} />;
}
