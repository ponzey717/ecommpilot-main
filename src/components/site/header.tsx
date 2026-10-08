import Link from "next/link";
import { Logo } from "./logo";
import { routes } from "@/config/routes";

const nav = [
  ["Winning Products", routes.winningProducts],
  ["What's Trending", routes.trending],
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
      <div className="site-container flex min-h-[72px] items-center justify-between gap-5">
        <Logo light={dark} priority />
        <nav className="hidden items-center gap-5 xl:flex" aria-label="Primary navigation">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className={"text-sm font-bold transition " + textClass}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href={routes.login}
            className={dark ? "button button-dark-ghost hidden sm:inline-flex" : "button button-ghost hidden sm:inline-flex"}
          >
            Login
          </Link>
          <Link href={routes.join} className="button button-cyan">
            Get Started
          </Link>
          <details className="relative xl:hidden">
            <summary
              className={dark ? "menu-button menu-button-dark" : "menu-button"}
              aria-label="Navigation menu"
            >
              <span></span><span></span><span></span>
            </summary>
            <div className="mobile-menu">
              {nav.map(([label, href]) => (
                <Link key={href} href={href} className="mobile-menu-link">
                  {label}
                </Link>
              ))}
              <Link href={routes.login} className="mobile-menu-link">
                Login
              </Link>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
