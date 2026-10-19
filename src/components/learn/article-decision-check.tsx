"use client";

import { useState } from "react";

export function ArticleDecisionCheck({ topic, title, checks: customChecks }: { topic: "Research" | "Suppliers" | "Economics" | "Listings"; title?: string; checks?: string[] }) {
  const supplier = topic === "Suppliers";
  const listings = topic === "Listings";
  const economics = topic === "Economics";
  const checks = customChecks?.length === 3 ? customChecks : (supplier
    ? ["The selected supplier SKU matches the researched item's design and attributes.", "Stock and item cost refer to that selected SKU.", "Freight and delivery estimate are for the intended buyer destination."]
    : listings
      ? ["The marketplace and category match the exact product.", "Every material item-specific value has a source for the selected variation.", "Title, photos, variation choices and description agree with the field map."]
      : economics
        ? ["I recorded the actual selling price and currency for this scenario.", "Supplier, shipping, marketplace and advertising costs come from labeled inputs.", "I checked the resulting profit and margin under a realistic downside case."]
        : ["I have a sold result for the intended marketplace and recorded date range.", "The item, condition and pack are comparable to my target.", "The source identifies sales of the exact variation, or I have labeled the count as listing-level only."]);
  const [checked, setChecked] = useState([false, false, false]);
  const completed = checked.filter(Boolean).length;
  return <aside className="guide-decision-check" aria-labelledby="guide-decision-heading">
    <div className="guide-decision-top"><div><span className="article-kicker">QUICK SELF-CHECK</span><h3 id="guide-decision-heading">{title ?? (supplier ? "Can this supplier offer move to review?" : listings ? "Can these item specifics move to review?" : economics ? "Does this margin survive a cost check?" : "What does your sold evidence support?")}</h3><p>Use this as a review prompt. Your selections are not stored or treated as verified evidence.</p></div><span className="guide-decision-score" aria-live="polite">{completed}<small>/ 3 checked</small></span></div>
    <div className="guide-decision-meter" role="progressbar" aria-label="Self-check progress" aria-valuemin={0} aria-valuemax={3} aria-valuenow={completed}><span style={{ width: `${completed / 3 * 100}%` }} /></div>
    <fieldset><legend className="sr-only">Evidence checks</legend>{checks.map((label, index) => <label className="guide-decision-option" key={label}><input type="checkbox" checked={checked[index]} onChange={(event) => setChecked((previous) => previous.map((value, i) => i === index ? event.target.checked : value))} /><span className="guide-decision-checkbox" aria-hidden="true">✓</span><span>{label}</span></label>)}</fieldset>
    <p className="guide-decision-result" aria-live="polite">{completed === checks.length ? "Ready for human review. Save the source links, captures and observation times before making a product decision." : `Next to check: ${checks[checked.findIndex((value) => !value)]}`}</p>
  </aside>;
}
