"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { routes } from "@/config/routes";

type Session = { authenticated: true; accountType: "member" | "staff"; dashboardPath: "/member" | "/"; displayName: string | null; plan?: "free" | "pro" | "premium"; canManageEditorial?: boolean };
type State = { kind: "loading" } | { kind: "guest" } | { kind: "error" } | { kind: "signed-in"; session: Session };
type Stats = { products: number; listed: number; alerts: number };

function validSession(value: unknown): Session | undefined {
  if (!value || typeof value !== "object") return undefined;
  const item = value as Partial<Session>;
  if (item.authenticated !== true || (item.accountType !== "member" && item.accountType !== "staff")) return undefined;
  if (item.dashboardPath !== (item.accountType === "member" ? "/member" : "/")) return undefined;
  if (item.displayName !== null && typeof item.displayName !== "string") return undefined;
  if (item.accountType === "member" && !["free", "pro", "premium"].includes(item.plan ?? "")) return undefined;
  return item as Session;
}

function initials(name: string | null): string {
  if (!name) return "•";
  return name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "").join("") || "•";
}

function appPath(path: string) { return `${siteConfig.appUrl}${path}`; }

export function AccountControl() {
  const [state, setState] = useState<State>({ kind: "loading" });
  const [open, setOpen] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [signingOut, setSigningOut] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const firstAction = useRef<HTMLAnchorElement>(null);

  const refresh = useCallback(async () => {
    try {
      const response = await fetch(appPath("/api/public/session-status"), { credentials: "include", cache: "no-store", signal: AbortSignal.timeout(8000) });
      if (!response.ok) throw new Error("Session status unavailable");
      const payload: unknown = await response.json();
      if (payload && typeof payload === "object" && (payload as { authenticated?: unknown }).authenticated === false) {
        setState({ kind: "guest" }); setStats(null); setOpen(false); return;
      }
      const session = validSession(payload);
      if (!session) throw new Error("Invalid session status");
      setState({ kind: "signed-in", session });
    } catch { setState({ kind: "error" }); setStats(null); setOpen(false); }
  }, []);

  useEffect(() => {
    const start = window.setTimeout(() => void refresh(), 0);
    const onReturn = () => { if (document.visibilityState === "visible") void refresh(); };
    window.addEventListener("pageshow", onReturn);
    window.addEventListener("focus", onReturn);
    document.addEventListener("visibilitychange", onReturn);
    return () => { window.clearTimeout(start); window.removeEventListener("pageshow", onReturn); window.removeEventListener("focus", onReturn); document.removeEventListener("visibilitychange", onReturn); };
  }, [refresh]);

  useEffect(() => {
    if (!open || state.kind !== "signed-in" || state.session.accountType !== "member") return;
    let active = true;
    fetch(appPath("/api/public/session-stats"), { credentials: "include", cache: "no-store", signal: AbortSignal.timeout(8000) })
      .then((response) => response.ok ? response.json() : null)
      .then((value: unknown) => {
        if (!active || !value || typeof value !== "object") return;
        const item = value as Partial<Stats>;
        if ([item.products, item.listed, item.alerts].every((number) => Number.isSafeInteger(number) && Number(number) >= 0)) setStats(item as Stats);
      }).catch(() => { if (active) setStats(null); });
    return () => { active = false; };
  }, [open, state]);

  useEffect(() => {
    if (!open) return;
    firstAction.current?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") { setOpen(false); trigger.current?.focus(); }
    }
    function outside(event: PointerEvent) { if (!root.current?.contains(event.target as Node)) setOpen(false); }
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", outside);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("pointerdown", outside); };
  }, [open]);

  async function signOut() {
    setSigningOut(true);
    try {
      const response = await fetch(appPath("/api/public/session-sign-out"), { method: "POST", credentials: "include", cache: "no-store" });
      if (!response.ok) throw new Error("Sign-out unavailable");
      setOpen(false); setStats(null); setState({ kind: "guest" }); setSigningOut(false);
      trigger.current?.focus();
    } catch { setSigningOut(false); await refresh(); }
  }

  if (state.kind === "loading") return <div className="account-loading" role="status" aria-label="Checking account status"><span className="account-loading-dot"/><span className="account-loading-line"/></div>;
  if (state.kind === "guest") return <div className="account-guest"><Link href={routes.login} className="button button-ghost header-login">Login</Link><Link href={routes.join} className="button button-cyan header-cta">Get Started Free</Link></div>;
  if (state.kind === "error") return <div className="account-error"><a href={appPath("/")} className="button button-ghost" title="Account status is temporarily unavailable; open the app to continue">Open App</a></div>;
  const session = state.session;
  const dashboard = appPath(session.dashboardPath);
  const member = session.accountType === "member";
  const name = session.displayName?.trim() || (member ? "My Account" : "Staff Account");
  const plan = member && session.plan ? session.plan.charAt(0).toUpperCase() + session.plan.slice(1) : null;
  const links = member ? [
    ["Inventory", "/member/winning-products"], ["Selected", "/member/my-products?state=selected"],
    ["Listed", "/member/listed"], ["Downloads", "/member/downloads"], ["Alerts", "/member/alerts"],
    ["Orders & Profit", "/member/orders"], ["Account & Settings", "/member/account"],
    ["Membership", "/member/account#membership"],
  ] : [["Account & Settings", "/profile"], ["Help / Support", "/support"]];
  return <div className="account-control" ref={root}>
    <Link href={dashboard} className="button button-cyan account-dashboard">Dashboard</Link>
    <button ref={trigger} className="account-trigger" type="button" aria-haspopup="dialog" aria-expanded={open} aria-controls="account-panel" onClick={() => setOpen((current) => !current)}><span className="account-avatar" aria-hidden="true">{initials(session.displayName)}</span><span className="account-trigger-name">{name}</span><span aria-hidden="true">⌄</span><span className="sr-only">Open account menu</span></button>
    {open && <div id="account-panel" className="account-panel" role="dialog" aria-label="Account menu" onKeyDown={(event) => {
      if (event.key !== "Tab") return;
      const focusable = [...event.currentTarget.querySelectorAll<HTMLElement>('a[href],button:not([disabled])')];
      const first = focusable[0]; const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }}>
      <div className="account-panel-head"><span className="account-avatar large" aria-hidden="true">{initials(session.displayName)}</span><div><small>{member ? "Welcome back" : "Your workspace"}</small><strong>{name}</strong>{plan && <span className="account-plan">{plan} member</span>}</div></div>
      {member && stats && <div className="account-stats" aria-label="Account overview"><div><strong>{stats.products}</strong><span>My Products</span></div><div><strong>{stats.listed}</strong><span>Listed</span></div><div><strong>{stats.alerts}</strong><span>Open Alerts</span></div></div>}
      <Link ref={firstAction} href={dashboard} className="account-open-dashboard">Open Dashboard <span aria-hidden="true">↗</span></Link>
      <div className="account-panel-links"><small>{member ? "WORKSPACE" : "STAFF"}</small>{member ? links.slice(0, 6).map(([label,path]) => <a key={path} href={appPath(path)}>{label}<span aria-hidden="true">↗</span></a>) : <>{session.canManageEditorial && <a href={appPath("/admin/editorial")}>Editorial Desk <span aria-hidden="true">↗</span></a>}{links.map(([label,path]) => <a key={path} href={appPath(path)}>{label}<span aria-hidden="true">↗</span></a>)}</>}</div>
      {member && <div className="account-panel-links secondary"><small>ACCOUNT</small>{links.slice(6).map(([label,path]) => <a key={path} href={appPath(path)}>{label}<span aria-hidden="true">↗</span></a>)}<a href={routes.support}>Help / Support <span aria-hidden="true">↗</span></a></div>}
      <div className="account-panel-foot"><button type="button" onClick={() => void signOut()} disabled={signingOut}>{signingOut ? "Signing out…" : "Sign out"}</button></div>
    </div>}
  </div>;
}
