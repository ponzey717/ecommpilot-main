import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

export function Callout({ kind = "info", title, children }: { kind?: "info" | "warning" | "tip" | "pro"; title: string; children: ReactNode }) {
  return <aside className={`content-callout content-callout-${kind}`}><strong>{title}</strong><div className="mt-2">{children}</div></aside>;
}
export function Steps({ items }: { items: readonly { title: string; body: string }[] }) {
  return <ol className="grid gap-3">{items.map((item, index) => <li className="feature-card" key={item.title}><span className="feature-number">{String(index + 1).padStart(2, "0")}</span><h3 className="mt-3 font-bold text-[var(--navy)]">{item.title}</h3><p className="mt-2 text-[var(--muted)]">{item.body}</p></li>)}</ol>;
}
export function Checklist({ items }: { items: readonly string[] }) {
  return <ul className="grid gap-2">{items.map((item) => <li key={item} className="flex gap-3"><span aria-hidden="true" className="text-[var(--blue)]">✓</span>{item}</li>)}</ul>;
}
export function ComparisonTable({ headers, rows }: { headers: readonly string[]; rows: readonly (readonly string[])[] }) {
  return <div className="overflow-x-auto rounded-xl border border-[var(--border)]"><table className="w-full min-w-[500px] text-left text-sm"><thead className="bg-[var(--surface-soft)]"><tr>{headers.map((header) => <th className="p-3" scope="col" key={header}>{header}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr className="border-t border-[var(--border)]" key={index}>{row.map((cell, cellIndex) => <td className="p-3" key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div>;
}
export function Faq({ items }: { items: readonly { question: string; answer: string }[] }) {
  return <div className="grid gap-2">{items.map((item) => <details className="feature-card" key={item.question}><summary className="cursor-pointer font-bold">{item.question}</summary><p className="mt-3 text-[var(--muted)]">{item.answer}</p></details>)}</div>;
}
export function ScreenshotFrame({ caption, alt, src }: { caption: string; alt: string; src?: string }) {
  return <figure className="rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] p-4">{src ? <Image src={src} alt={alt} width={1200} height={675} className="h-auto w-full rounded-lg" /> : <div role="img" aria-label={alt} className="grid min-h-40 place-items-center rounded-lg border border-dashed border-[var(--border)] text-center text-sm text-[var(--muted)]">Editorial screenshot required before publication</div>}<figcaption className="mt-3 text-sm text-[var(--muted)]">{caption}</figcaption></figure>;
}
export function RelatedLinks({ title, links }: { title: string; links: readonly { label: string; href: string }[] }) {
  return <aside className="feature-card"><h2 className="text-xl font-bold text-[var(--navy)]">{title}</h2><ul className="mt-3 grid gap-2">{links.map((link) => <li key={link.href}><Link href={link.href} className="font-semibold text-[var(--blue)] hover:underline">{link.label} →</Link></li>)}</ul></aside>;
}
