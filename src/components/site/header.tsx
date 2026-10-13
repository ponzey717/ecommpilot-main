import Link from "next/link";
import { Logo } from "./logo";
import { routes } from "@/config/routes";
import { NavLink } from "./nav-link";

const nav = [["How It Works", routes.howItWorks], ["Pricing", routes.pricing]] as const;

export function SiteHeader({ dark = false }: { dark?: boolean }) {
  const textClass = dark
    ? "text-white/75 hover:text-white"
    : "text-slate-600 hover:text-[var(--blue)]";

  return (
    <header className={dark ? "header-dark" : "header-light"}>
      <div className="site-container flex min-h-[72px] items-center justify-between gap-2 sm:gap-5">
        <Logo light={dark} priority />
        <nav className="hidden items-center gap-5 xl:flex" aria-label="Primary navigation">
          <details className="nav-dropdown"><summary className={textClass}>Winning Products <span aria-hidden="true">⌄</span></summary><div className="nav-popover nav-popover-wide"><div><p>Product discovery</p><NavLink href={routes.winningProducts} className="nav-popover-link" activeClassName="is-active"><b>Browse Winning Products</b><span>Published opportunities with demand and profit context.</span></NavLink><NavLink href={routes.trending} className="nav-popover-link" activeClassName="is-active"><b>What&apos;s Trending</b><span>View current published products by recent SOLD evidence.</span></NavLink></div><div><p>Browse by</p><NavLink href={routes.markets} className="nav-popover-link" activeClassName="is-active"><b>Markets</b><span>US, UK and AU product research.</span></NavLink><NavLink href={routes.categories} className="nav-popover-link" activeClassName="is-active"><b>Categories</b><span>Explore the public catalog by category.</span></NavLink></div></div></details>
          <details className="nav-dropdown"><summary className={textClass}>Free Tools <span aria-hidden="true">⌄</span></summary><div className="nav-popover"><p>Seller toolkit</p><NavLink href={routes.freeTools} className="nav-popover-link" activeClassName="is-active"><b>All Free Tools</b><span>Ten calculators and listing utilities.</span></NavLink><NavLink href="/free-tools/profit-margin-calculator" className="nav-popover-link" activeClassName="is-active"><b>Profit Calculator</b><span>Profit, margin, ROI and break-even.</span></NavLink><NavLink href="/free-tools/ebay-fee-estimator" className="nav-popover-link" activeClassName="is-active"><b>Fee Calculator</b><span>Estimate fees and seller payout.</span></NavLink></div></details>
          {nav.map(([label, href]) => (
            <NavLink key={href} href={href} className={"text-sm font-bold transition " + textClass} activeClassName={dark ? "!text-[var(--sky)]" : "!text-[var(--blue)]"}>
              {label}
            </NavLink>
          ))}
          <details className="nav-dropdown"><summary className={textClass}>Learn <span aria-hidden="true">⌄</span></summary><div className="nav-popover nav-popover-right"><p>Resources</p><NavLink href={routes.learn} className="nav-popover-link" activeClassName="is-active"><b>Seller Guides</b><span>Practical product and profit guidance.</span></NavLink><NavLink href={routes.about} className="nav-popover-link" activeClassName="is-active"><b>About eCommPilot</b><span>How the public research platform works.</span></NavLink><NavLink href={routes.contact} className="nav-popover-link" activeClassName="is-active"><b>Contact</b><span>Support and account routes.</span></NavLink></div></details>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href={routes.login}
            className={dark ? "button button-dark-ghost header-login" : "button button-ghost header-login"}
          >
            Login
          </Link>
          <Link href={routes.join} className="button button-cyan header-cta">
            Get Started Free
          </Link>
          <details className="relative xl:hidden">
            <summary
              className={dark ? "menu-button menu-button-dark" : "menu-button"}
              aria-label="Navigation menu"
            >
              <span></span><span></span><span></span>
            </summary>
            <nav className="mobile-menu" aria-label="Mobile navigation">
              <NavLink href={routes.winningProducts} className="mobile-menu-link" activeClassName="bg-[var(--surface-soft)] !text-[var(--blue)]">Winning Products</NavLink>
              <NavLink href={routes.freeTools} className="mobile-menu-link" activeClassName="bg-[var(--surface-soft)] !text-[var(--blue)]">Free Tools</NavLink>
              {nav.map(([label, href]) => (
                <NavLink key={href} href={href} className="mobile-menu-link" activeClassName="bg-[var(--surface-soft)] !text-[var(--blue)]">
                  {label}
                </NavLink>
              ))}
              <NavLink href={routes.learn} className="mobile-menu-link" activeClassName="bg-[var(--surface-soft)] !text-[var(--blue)]">Learn</NavLink>
              <Link href={routes.trending} className="mobile-menu-link">What&apos;s Trending</Link>
              <Link href={routes.login} className="mobile-menu-link">
                Login
              </Link>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
