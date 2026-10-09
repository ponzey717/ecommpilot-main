import Link from "next/link";
import { Logo } from "./logo";
import { routes } from "@/config/routes";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] bg-white">
      <div className="site-container grid gap-10 py-12 md:grid-cols-[1.35fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-md text-sm leading-6 text-[var(--muted)]">
            Research-backed product opportunities, supplier context and listing-ready
            information for eBay dropshippers.
          </p>
        </div>
        <div>
          <p className="footer-heading">Platform</p>
          <div className="mt-4 grid gap-3 text-sm text-[var(--muted)]">
            <Link href={routes.winningProducts}>Winning Products</Link>
            <Link href={routes.trending}>What&apos;s Trending</Link>
            <Link href={routes.markets}>Markets</Link>
            <Link href={routes.categories}>Categories</Link>
            <Link href={routes.pricing}>Pricing</Link>
          </div>
        </div>
        <div>
          <p className="footer-heading">Resources</p>
          <div className="mt-4 grid gap-3 text-sm text-[var(--muted)]">
            <Link href={routes.freeTools}>Free eBay Tools</Link>
            <Link href={routes.learn}>Learn</Link>
            <Link href={routes.login}>Member Login</Link>
          </div>
        </div>
        <div>
          <p className="footer-heading">Company</p>
          <div className="mt-4 grid gap-3 text-sm text-[var(--muted)]">
            <Link href={routes.about}>About</Link>
            <Link href={routes.contact}>Contact</Link>
            <Link href={routes.privacy}>Privacy</Link>
            <Link href={routes.terms}>Terms</Link>
            <Link href={routes.dataDeletion}>Data Deletion</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--border)]">
        <div className="site-container flex flex-col gap-2 py-5 text-xs text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 eCommPilot. All rights reserved.</p>
          <p>Published metrics are shown from current verified evidence where available.</p>
        </div>
      </div>
    </footer>
  );
}
