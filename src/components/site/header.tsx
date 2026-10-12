import Link from "next/link";
import { Logo } from "./logo";
import { routes } from "@/config/routes";
import { NavLink } from "./nav-link";

const nav = [
  ["Winning Products", routes.winningProducts],
  ["Free Tools", routes.freeTools],
  ["How It Works", routes.howItWorks],
  ["Pricing", routes.pricing],
  ["Learn", routes.learn],
] as const;

export function SiteHeader({ dark = false }: { dark?: boolean }) {
  const textClass = dark
    ? "text-white/75 hover:text-white"
    : "text-slate-600 hover:text-[var(--blue)]";

  return (
    <header className={dark ? "header-dark" : "header-light"}>
      <div className="site-container flex min-h-[72px] items-center justify-between gap-2 sm:gap-5">
        <Logo light={dark} priority />
        <nav className="hidden items-center gap-5 xl:flex" aria-label="Primary navigation">
          {nav.map(([label, href]) => (
            <NavLink key={href} href={href} className={"text-sm font-bold transition " + textClass} activeClassName={dark ? "!text-[var(--sky)]" : "!text-[var(--blue)]"}>
              {label}
            </NavLink>
          ))}
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
              {nav.map(([label, href]) => (
                <NavLink key={href} href={href} className="mobile-menu-link" activeClassName="bg-[var(--surface-soft)] !text-[var(--blue)]">
                  {label}
                </NavLink>
              ))}
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
