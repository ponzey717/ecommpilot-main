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
    setOutput(sanitized); setMessage(sanitized === input ? "No unsafe or unsupported markup was found." : "HTML cleaned. Review the result before using it in a listing.");
  };
  const copy = async () => {
    try { await navigator.clipboard.writeText(output); setMessage("Cleaned HTML copied."); }
    catch { setMessage("Copy failed. Select the cleaned HTML and copy it manually."); }
  };
  return <div className="tool-workspace html-workspace">
    <section className="tool-input-panel"><div className="tool-panel-head"><div><p className="tool-panel-kicker">Source HTML</p><h2>Paste your description</h2><p>Scripts, embeds, forms, event handlers and styling will be removed.</p></div></div><label className="code-editor"><span>Uncleaned HTML <small>{input.length.toLocaleString()} / 100,000</small></span><textarea value={input} maxLength={100000} onChange={(event) => { setInput(event.target.value); setOutput(""); setMessage(""); }} placeholder="<p>Product description...</p>" spellCheck={false} /></label><div className="tool-actions"><button type="button" className="button button-primary" onClick={clean} disabled={!input.trim()}>Clean &amp; sanitize</button><button type="button" className="button button-secondary" onClick={() => { setInput(""); setOutput(""); setMessage(""); }}>Clear</button></div><p className="browser-local-note"><span aria-hidden="true">✓</span> Private browser-local processing. Nothing is uploaded.</p></section>
    <section className="tool-results-panel"><div className="tool-panel-head"><div><p className="tool-panel-kicker">Safe output</p><h2>Cleaned HTML &amp; preview</h2><p>Review both views before adding the result to a listing.</p></div></div><div className="html-output-tabs"><span>Cleaned HTML</span><span>Safe preview</span></div><textarea readOnly aria-label="Cleaned HTML" className="code-output" value={output} placeholder="Your cleaned HTML will appear here." /><div className="safe-preview"><span>Visual preview</span><iframe title="Sanitized description preview" sandbox="" srcDoc={output} /></div><div className="tool-actions"><button type="button" className="button button-cyan" disabled={!output} onClick={copy}>Copy cleaned HTML</button></div>{message ? <p role="status" className="clean-status"><span aria-hidden="true">✓</span>{message}</p> : <p className="result-note">Only a conservative allowlist of common text, link, list and table markup is retained.</p>}</section>
  </div>;
}
