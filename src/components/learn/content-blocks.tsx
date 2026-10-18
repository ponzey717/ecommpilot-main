import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

export function Callout({ kind = "info", title, children }: { kind?: "info" | "warning" | "tip" | "pro"; title: string; children: ReactNode }) {
  const symbols = { info: "i", warning: "!", tip: "✓", pro: "↗" };
  return <aside className={`content-callout content-callout-${kind}`}><span className="content-callout-symbol" aria-hidden="true">{symbols[kind]}</span><div><strong>{title}</strong><div className="mt-2">{children}</div></div></aside>;
}
export function Steps({ items }: { items: readonly { title: string; body: string }[] }) {
  return <ol className="grid gap-3">{items.map((item, index) => <li className="feature-card" key={item.title}><span className="feature-number">{String(index + 1).padStart(2, "0")}</span><h3 className="mt-3 font-bold text-[var(--navy)]">{item.title}</h3><p className="mt-2 text-[var(--muted)]">{item.body}</p></li>)}</ol>;
}
export function Checklist({ items }: { items: readonly string[] }) {
  return <ul className="grid gap-2">{items.map((item) => <li key={item} className="flex gap-3"><span aria-hidden="true" className="text-[var(--blue)]">✓</span>{item}</li>)}</ul>;
}
export function ComparisonTable({ caption, headers, rows }: { caption?: string; headers: readonly string[]; rows: readonly (readonly string[])[] }) {
  return <div className="article-table-shell" role="region" aria-label={caption ?? "Comparison table"} tabIndex={0}><table className="article-table"><caption className="sr-only">{caption ?? "Comparison table"}</caption><thead><tr>{headers.map((header) => <th scope="col" key={header}>{header}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => <td data-label={headers[cellIndex]} key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div>;
}
export function Faq({ items }: { items: readonly { question: string; answer: string }[] }) {
  return <div className="grid gap-2">{items.map((item) => <details className="feature-card" key={item.question}><summary className="cursor-pointer font-bold">{item.question}</summary><p className="mt-3 text-[var(--muted)]">{item.answer}</p></details>)}</div>;
}
export function ScreenshotFrame({ caption, alt, src }: { caption: string; alt: string; src?: string }) {
  return <figure className="article-evidence-frame">{src ? <Image src={src} alt={alt} width={1200} height={675} className="h-auto w-full rounded-2xl" /> : <div className="article-evidence-pending"><span aria-hidden="true" className="article-evidence-icon">▧</span><strong>Source capture pending</strong><p>A genuine, redacted marketplace screenshot is required before publication.</p></div>}<figcaption>{caption}</figcaption></figure>;
}
export function RelatedLinks({ title, links }: { title: string; links: readonly { label: string; href: string }[] }) {
  return <aside className="feature-card"><h2 className="text-xl font-bold text-[var(--navy)]">{title}</h2><ul className="mt-3 grid gap-2">{links.map((link) => <li key={link.href}><Link href={link.href} className="font-semibold text-[var(--blue)] hover:underline">{link.label} →</Link></li>)}</ul></aside>;
}
export function ProcessFlow({ title, stages }: { title: string; stages: readonly string[] }) {
  return <figure className="article-process"><div className="article-process-head"><span className="article-kicker">THE METHOD</span><figcaption>{title}</figcaption><p>Follow the evidence from the original item to a decision you can explain.</p></div><ol className="article-process-grid">{stages.map((stage, index) => <li key={stage}><span className="article-process-index">{String(index + 1).padStart(2, "0")}</span><strong>{stage}</strong><span className="article-process-arrow" aria-hidden="true">↗</span></li>)}</ol></figure>;
}
export function ArticleVisual({ topic }: { topic: "Research" | "Suppliers" | "Economics" }) {
  const supplier = topic === "Suppliers";
  const nodes = supplier
    ? [{ icon: "◈", title: "Exact item", detail: "Design, model, pack" }, { icon: "▦", title: "Selected SKU", detail: "Image + attributes" }, { icon: "⌁", title: "Buyer destination", detail: "Freight + ETA" }]
    : [{ icon: "◉", title: "Sold evidence", detail: "Market + period" }, { icon: "◇", title: "Comparable item", detail: "Condition + design" }, { icon: "✓", title: "Demand decision", detail: "Scope + confidence" }];
  return <figure className="article-visual" aria-label={supplier ? "Supplier variation verification map" : "Sold demand evidence map"}>
    <div className="article-visual-top"><span>ECOMMPILOT FIELD GUIDE</span><span>{supplier ? "SUPPLIER VERIFICATION" : "DEMAND VALIDATION"}</span></div>
    <div className="article-visual-grid">{nodes.map((node, index) => <div className="article-visual-node" key={node.title}><span className="article-visual-icon" aria-hidden="true">{node.icon}</span><span className="article-visual-count">0{index + 1}</span><strong>{node.title}</strong><small>{node.detail}</small></div>)}</div>
    <figcaption>{supplier ? "A parent supplier page is only a starting point. The selected SKU and destination finish the match." : "A sold result becomes useful only after market, product identity and count meaning are checked."}</figcaption>
  </figure>;
}
