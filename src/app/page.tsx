import Link from "next/link";
import { MarketFilter } from "@/components/products/market-filter";
import { CatalogProductGrid } from "@/components/products/catalog-product-grid";
import { PageShell } from "@/components/site/page-shell";
import { SectionHeading } from "@/components/ui/section-heading";
import { routes } from "@/config/routes";

const steps = [
  ["01", "Discover demand", "Start with current eBay market activity and category-specific opportunities instead of random product lists."],
  ["02", "Validate the supplier", "Review source quality, delivery, stock, cost and a standby supplier before treating an opportunity as ready."],
  ["03", "Check the economics", "See landed cost, marketplace fees and estimated margin with clear timestamps and assumptions."],
];

const tools = [
  ["%", "Profit Margin Calculator", "Estimate net margin from selling price, supplier cost, shipping, tax and marketplace fees.", "/free-tools/profit-margin-calculator"],
  ["F", "eBay Fee Estimator", "Model marketplace fees with a user-entered rate for your market and category.", "/free-tools/ebay-fee-estimator"],
  ["80", "Title Length Checker", "Draft and check an eBay title against the 80-character title limit.", "/free-tools/title-length-checker"],
];

export default function Home() {
  return (
    <PageShell darkHeader>
      <section className="hero-dark">
        <div className="site-container hero-grid py-16 md:py-24">
          <div>
            <span className="hero-kicker">Product research for eBay sellers</span>
            <h1 className="hero-title mt-6">Winning products for eBay dropshippers.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68 md:text-xl">
              Discover demand, check supplier delivery and understand the economics
              behind an opportunity before you build the listing.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={routes.winningProducts} className="button button-cyan">
                Browse Winning Products
              </Link>
              <Link href={routes.freeTools} className="button button-dark-ghost">
                Explore Free Tools
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-white/55">
              <span>US, UK & AU markets</span>
              <span>Supplier insights</span>
              <span>Profit-first research</span>
            </div>
          </div>

          <div className="snapshot-card">
            <div className="hero-glow"></div>
            <div className="relative z-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="eyebrow">Opportunity snapshot</p>
                  <h2 className="mt-2 text-2xl font-extrabold text-[var(--navy)]">
                    See the product and the numbers together.
                  </h2>
                </div>
                <span className="badge badge-neutral">Illustrative</span>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="metric-box"><span className="metric-label">Sales / 30 days</span><strong>428</strong></div>
                <div className="metric-box"><span className="metric-label">Est. net margin</span><strong className="!text-emerald-700">38%</strong></div>
                <div className="metric-box"><span className="metric-label">Delivery</span><strong className="!text-lg">7–12 days</strong></div>
                <div className="metric-box"><span className="metric-label">Supplier rating</span><strong className="!text-lg">★ 4.8</strong></div>
              </div>
              <div className="mt-5 rounded-2xl border border-[#cde9ee] bg-[#f6fffa] p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-extrabold text-[var(--navy)]">Wireless over-ear headphones</p>
                    <p className="mt-1 text-xs font-semibold text-[var(--muted)]">AliExpress · sample product</p>
                  </div>
                  <span className="badge badge-choice">✓ AliExpress Choice</span>
                </div>
              </div>
              <p className="mt-4 text-xs leading-5 text-[var(--muted)]">
                Sample data demonstrates the interface only. Live evidence will be verified
                and time-stamped before publication.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="py-16 md:py-20">
        <div className="site-container">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Discover / validate / list"
              title="Winning Products"
              description="Marketplace-style browsing with the research layer an eBay dropshipper actually needs."
            />
            <Link href={routes.winningProducts} className="text-sm font-extrabold text-[var(--blue)]">Browse all products →</Link>
          </div>
          <div className="mt-8"><MarketFilter /></div>
          <div className="mt-6"><CatalogProductGrid limit={6} /></div>
        </div>
      </section>

      <section className="soft-section py-16 md:py-20">
        <div className="site-container">
          <SectionHeading
            eyebrow="How eCommPilot works"
            title="Research without the noise."
            description="The public experience stays simple. Behind each published product is a structured research and supplier workflow."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {steps.map(([number,title,text]) => (
              <article key={number} className="feature-card">
                <span className="feature-number">{number}</span>
                <h3 className="mt-6 text-xl font-extrabold text-[var(--navy)]">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="tools" className="bg-white py-16 md:py-20">
        <div className="site-container">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Free eBay tools"
              title="Useful before you ever become a member."
              description="Public tools stay important for sellers, organic search and introducing people to eCommPilot."
            />
            <Link href={routes.freeTools} className="text-sm font-extrabold text-[var(--blue)]">View all tools →</Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {tools.map(([icon,title,text,href]) => (
              <Link key={href} href={href} className="tool-card group">
                <span className="tool-icon">{icon}</span>
                <h3 className="mt-5 text-lg font-extrabold text-[var(--navy)] group-hover:text-[var(--blue)]">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-16 md:py-20">
        <div className="site-container">
          <SectionHeading
            eyebrow="Membership"
            title="Start free. Unlock more research when you need it."
            description="Free, Pro and Premium are the membership structure. Final commercial pricing remains configurable."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <article className="plan-card">
              <p className="eyebrow !text-[var(--muted)]">Free</p>
              <h3 className="mt-3 text-2xl font-extrabold text-[var(--navy)]">Explore the platform</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">Preview products, browse markets and use core public tools.</p>
            </article>
            <article className="plan-card plan-card-featured">
              <div className="flex items-center justify-between gap-3"><p className="eyebrow">Pro</p><span className="badge badge-market">Popular</span></div>
              <h3 className="mt-3 text-2xl font-extrabold text-[var(--navy)]">Build a research routine</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">Unlock deeper product, supplier, delivery and economics information.</p>
            </article>
            <article className="plan-card">
              <p className="eyebrow !text-[var(--premium)]">Premium</p>
              <h3 className="mt-3 text-2xl font-extrabold text-[var(--navy)]">Go deeper on every opportunity</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">Access the highest-value research bands and advanced evidence features.</p>
            </article>
          </div>
          <div className="mt-8"><Link href={routes.pricing} className="button button-secondary">Compare memberships</Link></div>
        </div>
      </section>

      <section className="bg-[var(--navy)] py-16 text-white md:py-20">
        <div className="site-container flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[.12em] text-[var(--sky)]">Better research. More informed decisions.</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-[-.03em] md:text-5xl">Build your next eBay listing from evidence, not guesswork.</h2>
          </div>
          <Link href={routes.join} className="button bg-white text-[var(--navy)]">Join eCommPilot Free</Link>
        </div>
      </section>
    </PageShell>
  );
}
