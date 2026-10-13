"use client";

import { useState } from "react";
import type { EbayMarketCode } from "@/config/ebay-markets";
import { calculateOfficialEbayFees, feeCategories, type FeePersona, type SellerPerformance } from "@/lib/tools/ebay-fees";
import {
  AdvancedSettings, DonutChart, EmptyResult, ErrorResult, FeeInput, feeInputAmount, formatMoney, MarketSelector,
  NumberField, ResultHero, ResultRow, SmartSelect, ToolWorkspace, useMarketSelection, type FeeInputValue, type SmartSelectOption,
} from "./tool-workspace";

const number = (value: string | undefined) => value === undefined || value === "" ? 0 : Number(value);
const valid = (values: Record<string, string>) => Object.entries(values).every(([key, value]) => ["itemLabel", "sku"].includes(key) || value === "" || (Number.isFinite(Number(value)) && Number(value) >= 0));
const blankFee: FeeInputValue = { mode: "fixed", value: "", basis: "buyer-total" };

function Calculator({ kind }: { kind: "fee" | "profit" }) {
  const [market, setMarket, marketInfo] = useMarketSelection();
  const currency = marketInfo.currency;
  const [values, setValues] = useState<Record<string, string>>({});
  const [feeMode, setFeeMode] = useState<"official" | "manual">("official");
  const [persona, setPersona] = useState<FeePersona>("standard");
  const [category, setCategory] = useState("most");
  const [storeTier, setStoreTier] = useState("none");
  const [performance, setPerformance] = useState<SellerPerformance>("standard");
  const [international, setInternational] = useState(false);
  const [registrationMatches, setRegistrationMatches] = useState(true);
  const [priceMode, setPriceMode] = useState<"price" | "target">("price");
  const [extraFee, setExtraFee] = useState<FeeInputValue>(blankFee);
  const [otherExpense, setOtherExpense] = useState<FeeInputValue>({ ...blankFee, basis: "item" });
  const [copyMessage, setCopyMessage] = useState("");
  const get = (key: string) => number(values[key]);
  const set = (key: string, value: string) => { setValues((current) => ({ ...current, [key]: value })); setCopyMessage(""); };
  const changeMarket = (next: EbayMarketCode) => {
    setMarket(next); setCopyMessage("");
    if (next === "US") { setPersona("standard"); setCategory("most"); }
    else if (next === "UK") { setPersona("uk-business"); setCategory("antiques"); }
    else if (next === "AU") { setPersona("au-non-pro"); setCategory("tier2"); }
    else { setPersona("standard"); setCategory(""); setFeeMode("manual"); }
  };
  const officialEligible = ["US", "UK", "AU"].includes(market) && registrationMatches && !(market === "US" && storeTier !== "none");

  const estimateAt = (selling: number) => {
    const buyerShipping = get("buyerShipping"); const buyerTax = get("buyerTax"); const revenue = selling + buyerShipping;
    const official = calculateOfficialEbayFees({ market, persona, category, itemPrice: selling, buyerShipping, buyerTax, international, sellerPerformance: performance, ukFeeVatRate: market === "UK" && persona === "uk-business" && values.ukFeeVatRate === undefined ? 20 : get("ukFeeVatRate") });
    const useOfficial = feeMode === "official" && officialEligible && official.status === "verified";
    const manualVariable = (revenue + buyerTax) * get("feeRate") / 100;
    const nativeFees = useOfficial ? official.total : manualVariable + get("fixedFee");
    const bases = { item: selling, "buyer-total": revenue + buyerTax, "supplier-cost": get("cost") + get("supplierShipping") + get("purchaseTax") };
    const addedFee = feeInputAmount(extraFee, bases); const extraExpense = feeInputAmount(otherExpense, bases);
    const listingUpgrades = get("listingUpgrade");
    const fees = nativeFees + addedFee + listingUpgrades;
    const landed = get("cost") + get("supplierShipping") + get("purchaseTax");
    const advertising = revenue * get("adRate") / 100 + get("adFixed");
    const fulfilment = get("postage") + extraExpense;
    const profit = revenue - landed - fees - advertising - fulfilment;
    return { official, useOfficial, revenue, manualVariable, nativeFees, addedFee, listingUpgrades, fees, landed, advertising, fulfilment, profit, margin: revenue ? profit / revenue * 100 : null, roi: landed ? profit / landed * 100 : null };
  };
  const targetPrice = (target: number) => {
    const low = 0; let high = Math.max(1, get("cost") + target);
    while (estimateAt(high).profit < target && high < 10_000_000) high *= 2;
    if (high >= 10_000_000 && estimateAt(high).profit < target) return null;
    let lowCents = Math.floor(low * 100); let highCents = Math.ceil(high * 100);
    while (lowCents < highCents) { const mid = Math.floor((lowCents + highCents) / 2); if (estimateAt(mid / 100).profit >= target) highCents = mid; else lowCents = mid + 1; }
    return lowCents / 100;
  };
  const selling = kind === "profit" && priceMode === "target" ? (targetPrice(get("desiredProfit")) ?? 0) : get("selling");
  const estimate = estimateAt(selling);
  const manualRequired = !estimate.useOfficial;
  const feePercentInvalid = get("feeRate") > 100 || get("adRate") > 100 || Number(extraFee.value || 0) > (extraFee.mode === "percent" ? 100 : Infinity) || Number(otherExpense.value || 0) > (otherExpense.mode === "percent" ? 100 : Infinity);
  const error = !valid(values) || feePercentInvalid || !Number.isFinite(estimate.addedFee) || !Number.isFinite(estimate.fulfilment) ? "Enter non-negative values and percentages from 0 to 100." : null;
  const requiredPrice = priceMode === "price" ? values.selling !== undefined && values.selling !== "" : values.desiredProfit !== undefined && values.desiredProfit !== "";
  const ready = !error && requiredPrice && (!manualRequired || (values.feeRate !== undefined && values.feeRate !== "")) && (kind === "fee" || (values.cost !== undefined && values.cost !== ""));

  const example = () => { setMarket("US"); setPersona("standard"); setCategory("most"); setFeeMode("official"); setPriceMode("price"); setExtraFee(blankFee); setOtherExpense(blankFee); setValues(kind === "fee" ? { selling: "100", buyerShipping: "10", buyerTax: "0" } : { selling: "100", buyerShipping: "10", cost: "40", postage: "6" }); };
  const reset = () => { setValues({}); setMarket("US"); setPersona("standard"); setCategory("most"); setFeeMode("official"); setPriceMode("price"); setExtraFee(blankFee); setOtherExpense(blankFee); setCopyMessage(""); };
  const copy = async () => {
    const text = kind === "fee" ? `eBay fee estimate: ${formatMoney(currency, estimate.fees)} total fees; ${formatMoney(currency, estimate.revenue - estimate.fees)} estimated payout.` : `eBay profit estimate: ${formatMoney(currency, estimate.profit)} net profit; ${(estimate.margin ?? 0).toFixed(2)}% margin; ${(estimate.roi ?? 0).toFixed(2)}% ROI.`;
    try { await navigator.clipboard.writeText(text); setCopyMessage("Results copied."); } catch { setCopyMessage("Copy failed. Select the figures and copy them manually."); }
  };

  const feeSetup = <div className="fee-setup">
    <div className="mode-tabs" role="group" aria-label="Fee calculation mode"><button type="button" className={feeMode === "official" ? "is-selected" : ""} onClick={() => setFeeMode("official")} disabled={!officialEligible}>Official-rate estimate</button><button type="button" className={feeMode === "manual" || !officialEligible ? "is-selected" : ""} onClick={() => setFeeMode("manual")}>Manual fee estimate</button></div>
    <p className={estimate.useOfficial ? "fee-status verified" : "fee-status manual"}><b>{estimate.useOfficial ? "Verified ruleset" : "Manual rate required"}</b> {estimate.useOfficial ? estimate.official.note : estimate.official.note || "Enter the rates shown in your own eBay account."}</p>
  </div>;

  const personaOptions: SmartSelectOption<FeePersona>[] = market === "US"
    ? [{ value: "standard", label: "US seller · no Store preset", description: "Official non-Store fee schedule", icon: "US" }]
    : market === "UK"
      ? [{ value: "uk-private", label: "Eligible UK private seller", description: "Private seller fee rules", icon: "UK" }, { value: "uk-business", label: "UK business seller", description: "Business seller fee rules", icon: "UK" }]
      : market === "AU"
        ? [{ value: "au-non-pro", label: "Eligible AU non-Pro", description: "Standard marketplace account", icon: "AU" }, { value: "au-pro-starter", label: "AU Pro Starter", description: "Starter subscription", icon: "S" }, { value: "au-pro-basic", label: "AU Pro Basic", description: "Basic subscription", icon: "B" }, { value: "au-pro-featured", label: "AU Pro Featured", description: "Featured subscription", icon: "F" }, { value: "au-pro-anchor", label: "AU Pro Anchor", description: "Anchor subscription", icon: "A" }]
        : [{ value: "standard", label: "Enter fees manually", description: "Use rates from your seller account", icon: "✎" }];
  const storeOptions: SmartSelectOption[] = market === "UK"
    ? [{ value: "none", label: "No Shop", icon: "—" }, { value: "basic", label: "Basic Shop", description: "Listing allowance plan", icon: "B" }, { value: "featured", label: "Featured Shop", description: "Listing allowance plan", icon: "F" }, { value: "anchor", label: "Anchor Shop", description: "Listing allowance plan", icon: "A" }]
    : [{ value: "none", label: "No Store", description: "Official non-Store preset", icon: "—" }, { value: "starter", label: "Starter", description: "Manual rates required", icon: "S" }, { value: "basic", label: "Basic", description: "Manual rates required", icon: "B" }, { value: "premium", label: "Premium", description: "Manual rates required", icon: "P" }, { value: "anchor", label: "Anchor", description: "Manual rates required", icon: "A" }];
  const performanceOptions: SmartSelectOption<SellerPerformance>[] = [{ value: "standard", label: "Above Standard / Top Rated", description: "No performance surcharge", icon: "✓" }, { value: "below-standard", label: "Below Standard", description: "Apply the published surcharge", icon: "!" }, { value: "below-standard-long-term", label: "Below Standard 4+ months", description: "Apply the long-term surcharge", icon: "!!" }];

  const configuration = <>
    <SmartSelect label="Seller profile" value={persona} onChange={setPersona} options={personaOptions} />
    {market === "US" ? <SmartSelect label="eBay Store tier" value={storeTier} onChange={setStoreTier} options={storeOptions} /> : null}
    {market === "UK" ? <SmartSelect label="Shop tier" value={storeTier} onChange={setStoreTier} options={storeOptions} hint="Shop changes listing allowances; it does not automatically lower the selected FVF." /> : null}
    {(["US", "UK", "AU"] as string[]).includes(market) ? <SmartSelect label="Official fee category" value={category} onChange={setCategory} options={feeCategories[market as "US" | "UK" | "AU"].map((item) => ({ value: item.id, label: item.label, icon: "%" }))} /> : null}
    <label className="check-field"><input type="checkbox" checked={registrationMatches} onChange={(event) => setRegistrationMatches(event.target.checked)} /><span>Seller registration country matches selected marketplace</span></label>
    <label className="check-field"><input type="checkbox" checked={international} onChange={(event) => setInternational(event.target.checked)} /><span>Buyer delivery is international</span></label>
    <SmartSelect label="Seller performance" value={performance} onChange={setPerformance} options={performanceOptions} />
    {market === "UK" && persona === "uk-business" ? <NumberField label="VAT on eBay fees" value={values.ukFeeVatRate ?? "20"} onChange={(value) => set("ukFeeVatRate", value)} percent hint="Official UK business tables exclude VAT. Enter 0 only when it is not charged." /> : null}
  </>;

  const basic = <>
    {kind === "profit" ? <div className="mode-tabs price-mode" role="group" aria-label="Profit calculation mode"><button type="button" className={priceMode === "price" ? "is-selected" : ""} onClick={() => setPriceMode("price")}>I know my selling price</button><button type="button" className={priceMode === "target" ? "is-selected" : ""} onClick={() => setPriceMode("target")}>Price from target profit</button></div> : null}
    <div className="tool-field-grid">
      {priceMode === "target" && kind === "profit" ? <NumberField label="Desired net profit" value={values.desiredProfit ?? ""} onChange={(value) => set("desiredProfit", value)} currency={currency} required /> : <NumberField label="Selling price" value={values.selling ?? ""} onChange={(value) => set("selling", value)} currency={currency} required />}
      {kind === "profit" ? <NumberField label="Product cost" value={values.cost ?? ""} onChange={(value) => set("cost", value)} currency={currency} required /> : null}
      {manualRequired ? <><NumberField label="eBay selling fee rate" value={values.feeRate ?? ""} onChange={(value) => set("feeRate", value)} percent required hint="Use the exact rate shown for your account and category." /><NumberField label="Fixed transaction fee" value={values.fixedFee ?? ""} onChange={(value) => set("fixedFee", value)} currency={currency} /></> : null}
    </div>
  </>;

  const advanced = <>
    {configuration}
    <NumberField label="Buyer-paid shipping" value={values.buyerShipping ?? ""} onChange={(value) => set("buyerShipping", value)} currency={currency} />
    <NumberField label="Buyer-collected sales tax" value={values.buyerTax ?? ""} onChange={(value) => set("buyerTax", value)} currency={currency} hint="Can affect the fee base; never counted as seller revenue." />
    {kind === "profit" ? <><NumberField label="Supplier shipping" value={values.supplierShipping ?? ""} onChange={(value) => set("supplierShipping", value)} currency={currency} /><NumberField label="Seller-paid postage" value={values.postage ?? ""} onChange={(value) => set("postage", value)} currency={currency} /><NumberField label="Purchase tax / GST / VAT" value={values.purchaseTax ?? ""} onChange={(value) => set("purchaseTax", value)} currency={currency} /><NumberField label="Promoted Listings General rate" value={values.adRate ?? ""} onChange={(value) => set("adRate", value)} percent hint="Attributed-sale percentage only. Priority CPC should be entered as a fixed ad cost." /><NumberField label="Priority CPC / fixed advertising cost" value={values.adFixed ?? ""} onChange={(value) => set("adFixed", value)} currency={currency} /><FeeInput label="Other fulfilment expense" value={otherExpense} onChange={setOtherExpense} currency={currency} /></> : null}
    <FeeInput label="Additional seller fee" value={extraFee} onChange={setExtraFee} currency={currency} hint="Choose a percentage basis or enter a fixed amount." />
    <NumberField label="Insertion & listing upgrade charges" value={values.listingUpgrade ?? ""} onChange={(value) => set("listingUpgrade", value)} currency={currency} hint="Enter only charges that actually apply to this listing." />
  </>;

  let results;
  if (error) results = <ErrorResult message={error} />;
  else if (!ready) results = <EmptyResult>{manualRequired ? "Enter a selling price and the applicable manual fee rate. Optional costs can stay blank." : "Enter the required values to use the selected verified ruleset."}</EmptyResult>;
  else if (kind === "fee") results = <>
    <ResultHero eyebrow="Estimated total eBay fees" value={formatMoney(currency, estimate.fees)} description={estimate.useOfficial ? `Official-rate estimate · ${estimate.official.revision}` : "Manual fee estimate based on your entered rate."} />
    <DonutChart centerLabel="Effective fee" centerValue={estimate.revenue ? `${(estimate.fees / estimate.revenue * 100).toFixed(1)}%` : "—"} segments={[{ label: "eBay fees", value: estimate.nativeFees, color: "#146cff" }, { label: "Additional charges", value: estimate.addedFee + estimate.listingUpgrades, color: "#16d9e3" }, { label: "Estimated payout", value: Math.max(0, estimate.revenue - estimate.fees), color: "#dfe7f1" }]} />
    <div className="result-list">{estimate.useOfficial ? estimate.official.lines.map((item) => <ResultRow key={item.key} label={item.label} value={formatMoney(currency, item.amount)} />) : <><ResultRow label="Percentage selling fee" value={formatMoney(currency, estimate.manualVariable)} /><ResultRow label="Fixed transaction fee" value={formatMoney(currency, get("fixedFee"))} /></>}<ResultRow label="Additional & listing charges" value={formatMoney(currency, estimate.addedFee + estimate.listingUpgrades)} /><ResultRow label="Estimated seller payout" value={formatMoney(currency, estimate.revenue - estimate.fees)} strong /></div>
    <p className="result-note">Buyer-collected tax can be in the fee base but is not seller revenue. {estimate.useOfficial ? <a href={estimate.official.sourceUrl} target="_blank" rel="noreferrer">Official eBay source · reviewed {estimate.official.lastReviewedAt}</a> : "Confirm all manual assumptions in your eBay account."}</p>
  </>;
  else results = <>
    <ResultHero eyebrow={priceMode === "target" ? "Minimum price for target profit" : estimate.profit < 0 ? "Estimated net loss" : "Estimated net profit"} value={priceMode === "target" ? formatMoney(currency, selling) : formatMoney(currency, estimate.profit)} description={priceMode === "target" ? `Minimum cent that reaches ${formatMoney(currency, get("desiredProfit"))} using the selected fee rules.` : estimate.profit < 0 ? "Entered costs exceed revenue. Review price or costs before listing." : "What remains after all entered costs and fees."} tone={estimate.profit < 0 ? "negative" : "positive"} />
    {estimate.profit >= 0 ? <DonutChart centerLabel="Margin" centerValue={`${(estimate.margin ?? 0).toFixed(2)}%`} segments={[{ label: "Product & supply", value: estimate.landed, color: "#071a3d" }, { label: "eBay fees", value: estimate.fees, color: "#146cff" }, { label: "Ads & fulfilment", value: estimate.advertising + estimate.fulfilment, color: "#16d9e3" }, { label: "Net profit", value: estimate.profit, color: "#31b57b" }]} /> : <div className="loss-breakdown"><b>Loss breakdown</b><p>Total entered costs are {formatMoney(currency, Math.abs(estimate.profit))} above sale revenue. Negative values are never shown as a pie slice.</p></div>}
    <div className="result-stat-grid"><div><span>Profit margin</span><b>{(estimate.margin ?? 0).toFixed(2)}%</b></div><div><span>ROI on landed cost</span><b>{estimate.roi === null ? "—" : `${estimate.roi.toFixed(2)}%`}</b></div><div><span>eBay payout before product costs</span><b>{formatMoney(currency, estimate.revenue - estimate.fees)}</b></div></div>
    <div className="result-list"><ResultRow label="Sale revenue" value={formatMoney(currency, estimate.revenue)} /><ResultRow label="Product & supplier cost" value={formatMoney(currency, estimate.landed)} /><ResultRow label="eBay and added fees" value={formatMoney(currency, estimate.fees)} /><ResultRow label="Advertising costs" value={formatMoney(currency, estimate.advertising)} /><ResultRow label="Other fulfilment costs" value={formatMoney(currency, estimate.fulfilment)} /></div>
    <p className="result-note">General ads use an attributed-sale percentage; Priority CPC is treated as a fixed entered amount. {estimate.useOfficial ? <a href={estimate.official.sourceUrl} target="_blank" rel="noreferrer">Official eBay source · reviewed {estimate.official.lastReviewedAt}</a> : "Manual rates are user assumptions."}</p>
  </>;

  const snapshotMetrics: Record<string, string> = kind === "fee"
    ? { "Selling price": formatMoney(currency, selling), Payout: formatMoney(currency, estimate.revenue - estimate.fees), "Effective fee": `${(estimate.fees / Math.max(estimate.revenue, .01) * 100).toFixed(2)}%` }
    : { "Selling price": formatMoney(currency, selling), Fees: formatMoney(currency, estimate.fees), Margin: `${(estimate.margin ?? 0).toFixed(2)}%`, ROI: estimate.roi === null ? "—" : `${estimate.roi.toFixed(2)}%` };
  const snapshot = ready ? { label: values.itemLabel?.trim() || `Product ${new Date().toLocaleTimeString()}`, sku: values.sku?.trim(), market: `${market} · ${marketInfo.site}`, currency, summary: kind === "fee" ? `${formatMoney(currency, estimate.fees)} fees` : `${formatMoney(currency, estimate.profit)} net profit`, metrics: snapshotMetrics, assumptions: `${estimate.useOfficial ? estimate.official.revision : `manual rate ${get("feeRate")}%`} · ${estimate.useOfficial ? estimate.official.note : "User-entered manual fee assumptions"}` } : null;

  return <><MarketSelector market={market} onChange={changeMarket} />{feeSetup}<ToolWorkspace inputTitle={kind === "fee" ? "Transaction details" : "Calculate your profit"} inputDescription={kind === "fee" ? "Start with the order value, then confirm seller and category settings." : "Choose a selling-price or target-profit workflow, then add real costs."} inputs={<><div className="tool-field-grid item-identity"><label className="tool-field"><span>Item name</span><input className="tool-control" value={values.itemLabel ?? ""} maxLength={120} placeholder="Product name" onChange={(event) => set("itemLabel", event.target.value)} /></label><label className="tool-field"><span>SKU (optional)</span><input className="tool-control" value={values.sku ?? ""} maxLength={80} placeholder="Your SKU" onChange={(event) => set("sku", event.target.value)} /></label></div>{basic}<AdvancedSettings>{advanced}</AdvancedSettings></>} actions={<><button type="button" className="button button-primary" onClick={example}>Try official example</button><button type="button" className="button button-secondary" onClick={reset}>Reset</button>{ready ? <button type="button" className="button button-ghost" onClick={copy}>Copy results</button> : null}{copyMessage ? <span role="status">{copyMessage}</span> : null}</>} results={results} saved={{ toolSlug: kind === "fee" ? "ebay-fee-estimator" : "profit-margin-calculator", toolName: kind === "fee" ? "eBay Fee Calculator" : "eBay Profit Calculator", snapshot }} /></>;
}

export function EbayFeeEstimator() { return <Calculator kind="fee" />; }
export function ProfitMarginCalculator() { return <Calculator kind="profit" />; }

export function TitleLengthChecker() {
  const [title, setTitle] = useState(""); const [message, setMessage] = useState(""); const length = Array.from(title).length; const percent = Math.min(100, length / 80 * 100);
  const snapshot = title.trim() ? { label: title.trim(), summary: `${length}/80 characters`, metrics: { Used: String(length), Remaining: String(Math.max(0, 80 - length)), Status: length <= 80 ? "Within limit" : "Over limit" }, assumptions: "Unicode code-point count against the standard 80-character title field." } : null;
  return <ToolWorkspace inputTitle="Draft your listing title" inputDescription="Type or paste a title. The count updates instantly." inputs={<label className="tool-field"><span>eBay listing title</span><textarea value={title} onChange={(event) => { setTitle(event.target.value); setMessage(""); }} rows={7} className="tool-control tool-textarea" placeholder="Brand, product type, key attributes…" /></label>} actions={<><button type="button" className="button button-primary" disabled={!title} onClick={async () => { try { await navigator.clipboard.writeText(title); setMessage("Title copied."); } catch { setMessage("Copy failed. Select the title and copy it manually."); } }}>Copy title</button><button type="button" className="button button-secondary" onClick={() => { setTitle(""); setMessage(""); }}>Clear</button>{message ? <span role="status">{message}</span> : null}</>} results={<div className="title-result"><p className="tool-panel-kicker">Live character count</p><strong className={length > 80 ? "is-over" : ""}>{length}/80</strong><p>{length <= 80 ? `${80 - length} characters remaining` : `${length - 80} characters over the standard limit`}</p><div className="title-progress" role="progressbar" aria-valuemin={0} aria-valuemax={80} aria-valuenow={length}><i className={length > 80 ? "is-over" : ""} style={{ width: `${percent}%` }} /></div><div className={`title-status ${length > 80 ? "title-status-error" : ""}`}>{length > 80 ? "Shorten this title before using it in a standard 80-character field." : length === 0 ? "Start typing to check your title." : "Your title is within the standard limit."}</div><p className="result-note">This counts Unicode code points. It does not predict ranking or validate listing policy.</p></div>} saved={{ toolSlug: "title-length-checker", toolName: "eBay Title Character Counter", snapshot }} />;
}
