"use client";

import { useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { getFieldGuidance } from "@/config/tool-field-help";

export function FieldHelp({ helpKey, market }: { helpKey: string; market?: string }) {
  const guidance = getFieldGuidance(helpKey, market);
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 300 });
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const id = useId();

  useLayoutEffect(() => {
    if (!open) return;
    const place = () => {
      const bounds = trigger.current?.getBoundingClientRect();
      if (!bounds) return;
      const width = Math.min(330, window.innerWidth - 24);
      const left = Math.max(12, Math.min(bounds.left, window.innerWidth - width - 12));
      const height = panel.current?.offsetHeight ?? 190;
      const top = bounds.bottom + height + 12 <= window.innerHeight ? bounds.bottom + 9 : Math.max(12, bounds.top - height - 9);
      setPosition({ top, left, width });
    };
    const onPointer = (event: PointerEvent) => {
      if (!trigger.current?.contains(event.target as Node) && !panel.current?.contains(event.target as Node)) setOpen(false);
    };
    const onFocus = (event: FocusEvent) => {
      if (!trigger.current?.contains(event.target as Node) && !panel.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); trigger.current?.focus(); }
    };
    place();
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, true);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("focusin", onFocus);
    document.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place, true);
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("focusin", onFocus);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!guidance) return null;
  return <>
    <button ref={trigger} type="button" className="field-help-trigger" aria-label={`Help: ${helpKey}`} aria-expanded={open} aria-controls={open ? id : undefined} onClick={() => setOpen((value) => !value)}><span aria-hidden="true">i</span></button>
    {open ? createPortal(<div ref={panel} id={id} role="dialog" aria-modal="false" aria-label={`${helpKey} guidance`} className="field-help-panel" style={position}>
      <div className="field-help-head"><strong>{helpKey}</strong><button type="button" aria-label={`Close ${helpKey} guidance`} onClick={() => { setOpen(false); trigger.current?.focus(); }}>×</button></div>
      <p>{guidance.text}</p>{guidance.example ? <div className="field-help-example"><b>Example</b><span>{guidance.example}</span></div> : null}
    </div>, document.body) : null}
  </>;
}
