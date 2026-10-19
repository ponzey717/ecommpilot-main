"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Logo } from "./logo";
import { routes } from "@/config/routes";
import { toolPath, tools } from "@/config/tools";
import { NavLink } from "./nav-link";

const nav = [["How It Works", routes.howItWorks], ["Pricing", routes.pricing]] as const;
type MenuName = "products" | "tools" | "learn";

export function SiteHeader({ dark = false }: { dark?: boolean }) {
  const [openMenu, setOpenMenu] = useState<MenuName | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const textClass = "text-slate-600 hover:text-[var(--blue)]";

  useEffect(() => {
    function closeFromOutside(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) setOpenMenu(null);
    }

    function closeFromEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenMenu(null);
    }

    document.addEventListener("pointerdown", closeFromOutside);
    document.addEventListener("keydown", closeFromEscape);
    return () => {
      document.removeEventListener("pointerdown", closeFromOutside);
      document.removeEventListener("keydown", closeFromEscape);
    };
  }, []);

  function toggleMenu(menu: MenuName) {
    setOpenMenu((current) => current === menu ? null : menu);
  }

  return (
    <header ref={headerRef} className="header-light" data-page-hero={dark ? "dark" : "light"}>
      <div className="site-container flex min-h-[72px] items-center justify-between gap-2 sm:gap-5">
        <Logo priority />
        <nav className="hidden items-center gap-5 xl:flex" aria-label="Primary navigation">
          <div className={`nav-dropdown ${openMenu === "products" ? "is-open" : ""}`}>
            <button type="button" className={`nav-trigger ${textClass}`} aria-expanded={openMenu === "products"} aria-controls="products-menu" onClick={() => toggleMenu("products")}>
              Winning Products <span aria-hidden="true">⌄</span>
            </button>
            {openMenu === "products" && (
              <div id="products-menu" className="nav-popover nav-popover-wide" onClickCapture={() => setOpenMenu(null)}>
                <div>
                  <p>Product discovery</p>
                  <NavLink href={routes.winningProducts} className="nav-popover-link" activeClassName="is-active"><b>Browse Winning Products</b><span>Published opportunities with demand and profit context.</span></NavLink>
                  <NavLink href={routes.trending} className="nav-popover-link" activeClassName="is-active"><b>What&apos;s Trending</b><span>View current published products by recent SOLD evidence.</span></NavLink>
                </div>
                <div>
                  <p>Browse by</p>
                  <NavLink href={routes.markets} className="nav-popover-link" activeClassName="is-active"><b>Markets</b><span>US, UK and AU product research.</span></NavLink>
                  <NavLink href={routes.categories} className="nav-popover-link" activeClassName="is-active"><b>Categories</b><span>Explore the public catalog by category.</span></NavLink>
                </div>
              </div>
            )}
          </div>

          <div className={`nav-dropdown ${openMenu === "tools" ? "is-open" : ""}`}>
            <button type="button" className={`nav-trigger ${textClass}`} aria-expanded={openMenu === "tools"} aria-controls="tools-menu" onClick={() => toggleMenu("tools")}>
              Free Tools <span aria-hidden="true">⌄</span>
            </button>
            {openMenu === "tools" && (
              <div id="tools-menu" className="nav-popover nav-tools-popover" onClickCapture={() => setOpenMenu(null)}>
                <div className="nav-tools-head">
                  <div><p>Seller toolkit</p><strong>Free tools for smarter eBay decisions</strong></div>
                  <NavLink href={routes.freeTools} className="nav-tools-all" activeClassName="is-active">View all tools <span aria-hidden="true">→</span></NavLink>
                </div>
                <div className="nav-tools-grid">
                  {tools.map((tool) => (
                    <NavLink key={tool.slug} href={toolPath(tool.slug)} className="nav-tool-link" activeClassName="is-active">
                      <span className="nav-tool-icon" aria-hidden="true">{tool.icon}</span>
                      <span className="nav-tool-copy"><b>{tool.title}</b><small>{tool.category}</small></span>
                    </NavLink>
                  ))}
                </div>
              </div>
            )}
          </div>

          {nav.map(([label, href]) => (
            <NavLink key={href} href={href} className={"text-sm font-bold transition " + textClass} activeClassName="!text-[var(--blue)]">{label}</NavLink>
          ))}

          <div className={`nav-dropdown ${openMenu === "learn" ? "is-open" : ""}`}>
            <button type="button" className={`nav-trigger ${textClass}`} aria-expanded={openMenu === "learn"} aria-controls="learn-menu" onClick={() => toggleMenu("learn")}>
              Seller Academy <span aria-hidden="true">⌄</span>
            </button>
            {openMenu === "learn" && (
              <div id="learn-menu" className="nav-popover nav-popover-right" onClickCapture={() => setOpenMenu(null)}>
                <p>Resources</p>
                <NavLink href={routes.learn} className="nav-popover-link" activeClassName="is-active"><b>Seller Academy</b><span>Practical product and profit guidance.</span></NavLink>
                <NavLink href={routes.about} className="nav-popover-link" activeClassName="is-active"><b>About eCommPilot</b><span>How the public research platform works.</span></NavLink>
                <NavLink href={routes.contact} className="nav-popover-link" activeClassName="is-active"><b>Contact</b><span>Support and account routes.</span></NavLink>
              </div>
            )}
          </div>
        </nav>
        <div className="flex items-center gap-2">
          <Link href={routes.login} className="button button-ghost header-login">Login</Link>
          <Link href={routes.join} className="button button-cyan header-cta">Get Started Free</Link>
          <details className="relative xl:hidden">
            <summary className="menu-button" aria-label="Navigation menu"><span></span><span></span><span></span></summary>
            <nav className="mobile-menu" aria-label="Mobile navigation">
              <NavLink href={routes.winningProducts} className="mobile-menu-link" activeClassName="bg-[var(--surface-soft)] !text-[var(--blue)]">Winning Products</NavLink>
              <NavLink href={routes.freeTools} className="mobile-menu-link" activeClassName="bg-[var(--surface-soft)] !text-[var(--blue)]">Free Tools</NavLink>
              {nav.map(([label, href]) => (
                <NavLink key={href} href={href} className="mobile-menu-link" activeClassName="bg-[var(--surface-soft)] !text-[var(--blue)]">{label}</NavLink>
              ))}
              <NavLink href={routes.learn} className="mobile-menu-link" activeClassName="bg-[var(--surface-soft)] !text-[var(--blue)]">Seller Academy</NavLink>
              <Link href={routes.trending} className="mobile-menu-link">What&apos;s Trending</Link>
              <Link href={routes.login} className="mobile-menu-link">Login</Link>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
