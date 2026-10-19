"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Guide = { title: string; description: string; href: string; topic: string; readingMinutes?: number; publishedAt?: string };
export function LearnLibrary({ guides }: { guides: readonly Guide[] }) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("All");
  const [limit, setLimit] = useState(9);
  const topics = ["All", ...new Set(guides.map((guide) => guide.topic))];
  const filtered = useMemo(() => guides.filter((guide) => (topic === "All" || guide.topic === topic) && `${guide.title} ${guide.description}`.toLowerCase().includes(query.trim().toLowerCase())), [guides, topic, query]);
  return <>
    {guides[0] && <Link href={guides[0].href} className="mt-7 block overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--navy)] p-7 text-white shadow-lg md:p-10"><span className="text-xs font-extrabold uppercase tracking-[0.22em] text-[var(--cyan)]">Featured Field Guide · {guides[0].topic}</span><h2 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight md:text-4xl">{guides[0].title}</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200">{guides[0].description}</p><span className="mt-6 inline-block text-sm font-bold text-[var(--cyan)]">Read the guide →</span></Link>}
    <div className="mt-8 flex flex-wrap items-end justify-between gap-5">
      <label className="grid w-full max-w-md gap-2 text-sm font-semibold text-[var(--navy)]">Search guides<input type="search" value={query} onChange={(event) => { setQuery(event.target.value); setLimit(9); }} placeholder="Search research, suppliers, profit…" className="rounded-xl border border-[var(--border)] bg-white px-4 py-3 font-normal" /></label>
      <div role="group" aria-label="Filter guides by topic" className="flex flex-wrap gap-2">{topics.map((item) => <button type="button" key={item} aria-pressed={topic === item} onClick={() => { setTopic(item); setLimit(9); }} className={`rounded-full border px-4 py-2 text-sm font-semibold ${topic === item ? "border-[var(--blue)] bg-[var(--blue)] text-white" : "border-[var(--border)] bg-white text-[var(--navy)]"}`}>{item}</button>)}</div>
    </div>
    <p role="status" className="mt-5 text-sm text-[var(--muted)]">{filtered.length} {filtered.length === 1 ? "guide" : "guides"} found</p>
    {filtered.length ? <><div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{filtered.slice(0, limit).map((guide) => <Link key={guide.href} href={guide.href} className="feature-card group"><span className="eyebrow">{guide.topic}</span><h2 className="mt-5 text-xl font-extrabold text-[var(--navy)] group-hover:text-[var(--blue)]">{guide.title}</h2><p className="mt-3 text-sm leading-6 text-[var(--muted)]">{guide.description}</p><p className="mt-4 text-xs text-[var(--muted)]">{guide.readingMinutes ? `${guide.readingMinutes} min read` : "Practical guide"}{guide.publishedAt ? ` · ${guide.publishedAt}` : ""}</p><p className="mt-5 text-sm font-extrabold text-[var(--blue)]">Read guide →</p></Link>)}</div>{filtered.length > limit && <button type="button" onClick={() => setLimit((value) => value + 9)} className="button button-secondary mt-7">Show more guides</button>}</> : <div className="feature-card mt-8"><h2 className="text-xl font-bold">No guides match your search</h2><p className="mt-2 text-sm text-[var(--muted)]">Try another phrase or select All topics.</p></div>}
  </>;
}
