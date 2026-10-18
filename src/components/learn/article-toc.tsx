"use client";

import { useEffect, useRef, useState } from "react";

type Entry = { id: string; label: string };

export function ArticleToc({ entries }: { entries: readonly Entry[] }) {
  const [active, setActive] = useState(entries[0]?.id ?? "");
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const drawer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (items) => {
        const visible = items.filter((item) => item.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-100px 0px -65% 0px" },
    );
    for (const entry of entries) {
      const target = document.getElementById(entry.id);
      if (target) observer.observe(target);
    }
    return () => observer.disconnect();
  }, [entries]);

  useEffect(() => {
    if (!open) return;
    drawer.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); button.current?.focus(); }
      if (event.key === "Tab" && drawer.current) {
        const links = [...drawer.current.querySelectorAll<HTMLElement>("a, button")];
        const first = links[0];
        const last = links.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const links = entries.map((entry) => (
    <a key={entry.id} href={`#${entry.id}`} aria-current={active === entry.id ? "location" : undefined}
      className={`toc-link ${active === entry.id ? "toc-link-active" : ""}`}
      onClick={() => setOpen(false)}>{entry.label}</a>
  ));

  return <>
    <nav aria-label="Article contents" className="article-toc-desktop">
      <p className="eyebrow mb-4">On this page</p>{links}
    </nav>
    <button ref={button} type="button" className="article-toc-trigger" aria-label="Open article contents" aria-expanded={open} aria-controls="article-toc-drawer" onClick={() => setOpen(true)}>☰ <span>Contents</span></button>
    {open && <div className="article-toc-overlay" onClick={() => { setOpen(false); button.current?.focus(); }}>
      <div ref={drawer} id="article-toc-drawer" role="dialog" aria-modal="true" aria-label="Article contents" className="article-toc-drawer" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between gap-4"><strong>On this page</strong><button type="button" aria-label="Close article contents" onClick={() => { setOpen(false); button.current?.focus(); }}>✕</button></div>
        <nav aria-label="Mobile article contents" className="mt-6 grid gap-1">{links}</nav>
      </div>
    </div>}
  </>;
}
