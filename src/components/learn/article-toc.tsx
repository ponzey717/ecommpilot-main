"use client";

import { useEffect, useRef, useState } from "react";

type Entry = { id: string; label: string; level?: 2 | 3 };

export function ArticleToc({ entries }: { entries: readonly Entry[] }) {
  const chapters = entries.filter((entry) => entry.level !== 3);
  const [active, setActive] = useState(chapters[0]?.id ?? "");
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const drawer = useRef<HTMLDivElement>(null);
  const chapterIndex = Math.max(0, chapters.findIndex((chapter) => active === chapter.id || active.startsWith(`${chapter.id}-`)));

  useEffect(() => {
    const observer = new IntersectionObserver((items) => {
      const visible = items.filter((item) => item.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: "-110px 0px -65% 0px" });
    for (const entry of entries) {
      const target = document.getElementById(entry.id);
      if (target) observer.observe(target);
    }
    const updateProgress = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? Math.min(100, Math.round((window.scrollY / height) * 100)) : 100);
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener("scroll", updateProgress); };
  }, [entries]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
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
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", onKey); };
  }, [open]);

  function links(mobile = false) {
    return chapters.map((chapter, index) => {
      const selected = chapterIndex === index;
      const children = entries.filter((entry) => entry.level === 3 && entry.id.startsWith(`${chapter.id}-`));
      return <div className={`guide-nav-group ${selected ? "is-active" : ""}`} key={chapter.id}>
        <a href={`#${chapter.id}`} aria-current={selected ? "location" : undefined} className="guide-nav-chapter" onClick={() => mobile && setOpen(false)}>
          <span className="guide-nav-number">{String(index + 1).padStart(2, "0")}</span><span>{chapter.label.replace(/^\d+\.\s*/, "")}</span><span aria-hidden="true" className="guide-nav-arrow">↗</span>
        </a>
        {selected && children.length > 0 ? <div className="guide-nav-subsections">{children.map((child) => <a key={child.id} href={`#${child.id}`} className={active === child.id ? "is-current" : ""} onClick={() => mobile && setOpen(false)}>{child.label}</a>)}</div> : null}
      </div>;
    });
  }

  return <>
    <aside aria-label="Article contents" className="article-toc-desktop">
      <div className="guide-nav-head"><span className="guide-nav-kicker">YOUR READING PATH</span><strong>In this guide</strong><p>{chapters.length} practical chapters</p></div>
      <div className="guide-progress" role="progressbar" aria-label="Reading progress" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}><span style={{ width: `${progress}%` }} /></div>
      <nav aria-label="Article chapters" className="guide-nav-list">{links()}</nav>
      <a className="guide-nav-back" href="#article-top">↑ Back to top</a>
    </aside>
    <button ref={button} type="button" className="article-toc-trigger" aria-label="Open article contents" aria-expanded={open} aria-controls="article-toc-drawer" onClick={() => setOpen(true)}><span aria-hidden="true">☷</span><span>Chapters</span><span className="toc-trigger-progress">{progress}%</span></button>
    {open && <div className="article-toc-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) { setOpen(false); button.current?.focus(); } }}>
      <div ref={drawer} id="article-toc-drawer" role="dialog" aria-modal="true" aria-label="Article contents" className="article-toc-drawer">
        <div className="guide-drawer-head"><div><span className="guide-nav-kicker">YOUR READING PATH</span><strong>In this guide</strong></div><button type="button" aria-label="Close article contents" onClick={() => { setOpen(false); button.current?.focus(); }}>✕</button></div>
        <div className="guide-progress" role="progressbar" aria-label="Reading progress" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}><span style={{ width: `${progress}%` }} /></div>
        <nav aria-label="Mobile article chapters" className="guide-nav-list">{links(true)}</nav>
      </div>
    </div>}
  </>;
}
