"use client";

import { useState } from "react";
import DOMPurify from "dompurify";

const allowedTags = ["p", "br", "strong", "em", "b", "i", "u", "ul", "ol", "li", "h2", "h3", "h4", "blockquote", "a", "table", "thead", "tbody", "tr", "th", "td"];

export function HtmlCleaner() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [message, setMessage] = useState("");
  const clean = () => {
    const sanitized = DOMPurify.sanitize(input, {
      ALLOWED_TAGS: allowedTags,
      ALLOWED_ATTR: ["href", "title"],
      ALLOW_DATA_ATTR: false,
      ALLOWED_URI_REGEXP: /^(?:https?:\/\/|\/(?!\/)|#)/i,
    });
    setOutput(sanitized); setMessage("HTML cleaned. Review the result before using it in a listing.");
  };
  const copy = async () => {
    try { await navigator.clipboard.writeText(output); setMessage("Cleaned HTML copied."); }
    catch { setMessage("Copy failed. Select the cleaned HTML and copy it manually."); }
  };
  return <div className="grid min-w-0 gap-6 lg:grid-cols-2">
    <div className="feature-card min-w-0"><label className="grid gap-2 text-sm font-bold text-[var(--navy)]">Paste listing HTML<textarea className="catalog-input min-h-64 w-full font-mono text-sm" value={input} maxLength={100000} onChange={(event) => { setInput(event.target.value); setOutput(""); setMessage(""); }} placeholder="<p>Product description...</p>" /></label><div className="mt-5 flex flex-wrap gap-3"><button type="button" className="button button-primary" onClick={clean} disabled={!input.trim()}>Clean HTML</button><button type="button" className="button button-secondary" onClick={() => { setInput(""); setOutput(""); setMessage(""); }}>Clear</button></div><p className="mt-4 text-xs text-[var(--muted)]">Processing stays in your browser. Scripts, embeds, forms, event handlers and styling are removed.</p></div>
    <div className="snapshot-card min-w-0"><p className="eyebrow">Cleaned HTML</p><textarea readOnly aria-label="Cleaned HTML" className="catalog-input mt-5 min-h-44 w-full font-mono text-sm" value={output} placeholder="Your cleaned HTML will appear here." /><button type="button" className="button button-cyan mt-4" disabled={!output} onClick={copy}>Copy cleaned HTML</button>{message ? <p role="status" className="mt-3 text-sm text-[var(--muted)]">{message}</p> : null}<p className="mt-6 text-sm font-bold text-[var(--navy)]">Safe preview</p><iframe title="Sanitized description preview" sandbox="" srcDoc={output} className="mt-2 min-h-40 w-full rounded-xl border border-[var(--border)] bg-white" /></div>
  </div>;
}
