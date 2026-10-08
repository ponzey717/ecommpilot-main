import Link from "next/link";
import { CatalogProductGrid } from "@/components/products/catalog-product-grid";
import { LiveHeroSnapshot } from "@/components/products/live-hero-snapshot";
import { PageShell } from "@/components/site/page-shell";
import { SectionHeading } from "@/components/ui/section-heading";
import { routes } from "@/config/routes";

const painPoints = [
  {
    problem: "Hours spent searching",
    solution: "Start from published products that already have current eBay SOLD evidence attached.",
  },
  {
    problem: "Supplier guesswork",
    solution: "Review supplier quality, stock, delivery and exact product/SKU evidence before listing.",
  },
  {
    problem: "Unknown real profit",
    solution: "See landed supplier cost, eBay costs, estimated profit, margin and ROI from explicit assumptions.",
  },
  {
    problem: "Listings go stale",
    solution: "Product Watcher keeps supplier, delivery, economics and evidence freshness visible after selection.",
  },
] as const;

const howItWorks = [
  ["01", "Choose a Winning Product", "Browse published opportunities for your eBay market and category using current SOLD demand and profit context."],
  ["02", "Get the supplier and listing information", "Members unlock the exact supplier and the listing-ready product information available for their access level."],
  ["03", "List it on your eBay account", "You remain in control of your seller account and listing decisions. eCommPilot prepares the product work around them."],
  ["04", "Let eCommPilot watch it", "Monitor supplier availability, delivery, economics and freshness so problems are visible instead of hidden."],
] as const;

const productValue = [
  ["Demand", "30-day SOLD evidence and current active-listing context."],
  ["Supplier", "Exact-match supplier status, delivery, stock and quality evidence."],
  ["Economics", "Selling price, landed cost, eBay costs, net profit, margin and ROI where evidence is complete."],
  ["Listing", "Optimized title, item specifics, description and listing-ready information when approved."],
  ["Monitoring", "Freshness and change states after a product moves into your workflow."],
] as const;

const businessFlow = [
  ["My Products", "Save the opportunities you actually want to work with."],
  ["Listed", "Mark products you have listed and separate research from active selling."],
  ["Orders", "Record actual selling price and supplier costs for realized results."],
  ["Profit", "Track order-level profit without mixing USD, GBP and AUD."],
  ["Alerts", "Surface supplier, delivery, economics and freshness changes that need attention."],
] as const;

const plans = [
  ["Free", "Explore Winning Products, markets and useful public tools."],
  ["Pro", "Unlock deeper product, supplier, listing and workflow access."],
  ["Premium", "Use the highest-access research and advanced product evidence available to the plan."],
] as const;

export default function Home() {
  return (
    <PageShell darkHeader>
      <section className="hero-dark">
        <div className="site-container hero-grid py-16 md:py-24">
          <div>
            <span className="hero-kicker">Winning Products for eBay Dropshippers</span>
            <h1 className="hero-title mt-6">Stop Searching. Start Listing Winning eBay Products.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72 md:text-xl">
              Ready-to-list eBay dropshipping products with verified suppliers,
              calculated profits, optimized listings and ongoing supplier monitoring.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={routes.winningProducts} className="button button-cyan">
                Browse Winning Products
              </Link>
              <Link href={routes.join} className="button button-dark-ghost">
                Get Started Free
              </Link>
            </div>
            <p className="mt-8 text-sm font-semibold text-white/60">
              You only need your eBay account. We handle the product work.
            </p>
          </div>
          <LiveHeroSnapshot />
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="site-container">
          <SectionHeading
            eyebrow="From problem to product"
            title="Less searching. More products you can actually evaluate."
            description="eCommPilot is built around the work that slows down an eBay dropshipper before and after a listing goes live."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {painPoints.map((item) => (
              <article className="feature-card" key={item.problem}>
                <p className="text-sm font-extrabold text-rose-700">{item.problem}</p>
                <div className="mt-4 flex gap-3">
                  <span className="feature-number !h-9 !w-9 !min-w-9">→</span>
                  <p className="text-sm leading-7 text-[var(--muted)]">{item.solution}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="py-16 md:py-20">
        <div className="site-container">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Winning Products"
              title="Start with products that already passed the publication gates."
              description="Browse current eBay product opportunities with SOLD demand, supplier, delivery and economics context attached."
            />
            <Link href={routes.winningProducts} className="text-sm font-extrabold text-[var(--blue)]">
              Browse all products →
            </Link>
          </div>
          <div className="mt-8">
            <CatalogProductGrid sort="most_sold" limit={6} />
          </div>
        </div>
      </section>

      <section id="how-it-works" className="soft-section scroll-mt-24 py-16 md:py-20">
        <div className="site-container">
          <SectionHeading
            eyebrow="How It Works"
            title="Choose. Prepare. List. Watch."
            description="The member workflow stays simple even though the evidence and supplier checks behind it are structured."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {howItWorks.map(([number, title, text]) => (
              <article key={number} className="feature-card">
                <span className="feature-number">{number}</span>
                <h3 className="mt-6 text-xl font-extrabold text-[var(--navy)]">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="site-container">
          <SectionHeading
            eyebrow="Inside a Winning Product"
            title="The product page is more than a picture and a sales count."
            description="Published products expose only the safe public preview. Members can unlock deeper product information according to their access."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {productValue.map(([title, text]) => (
              <article key={title} className="feature-card">
                <span className="tool-icon">{title.charAt(0)}</span>
                <h3 className="mt-5 text-lg font-extrabold text-[var(--navy)]">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{text}</p>
              </article>
            ))}
          </div>
          <div className="mt-8">
            <Link href={routes.winningProducts} className="button button-primary">
              Explore Winning Products
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="site-container">
          <SectionHeading
            eyebrow="Manage Your eBay Business"
            title="Research is only the beginning."
            description="Move a product from discovery into your own selling workflow without turning eCommPilot into a second eBay account."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {businessFlow.map(([title, text], index) => (
              <article key={title} className="feature-card">
                <span className="feature-number">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-5 text-lg font-extrabold text-[var(--navy)]">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--navy)] py-16 text-white md:py-20">
        <div className="site-container grid gap-8 lg:grid-cols-[1fr_.8fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[.12em] text-[var(--sky)]">Product Watcher</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-[-.03em] md:text-5xl">
              A good product can change after you find it.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-white/68">
              Product Watcher keeps supplier availability, shipping, economics and research freshness visible. Provider failures stay separate from confirmed stock problems so one failed check does not become a false out-of-stock alert.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {["Fresh", "Price Changed", "Shipping Changed", "Supplier Missing", "Profit Below Criteria", "Needs Review"].map((state) => (
              <div key={state} className="rounded-2xl border border-white/12 bg-white/6 px-4 py-4 text-sm font-extrabold text-white/85">
                {state}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="site-container">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="What's Trending"
              title="See published products through recent SOLD demand first."
              description="Trending is a secondary demand-first lens over the same Winning Products catalog—not a second source of truth."
            />
            <Link href={routes.trending} className="text-sm font-extrabold text-[var(--blue)]">
              Open What&apos;s Trending →
            </Link>
          </div>
          <div className="mt-8">
            <CatalogProductGrid sort="most_sold" minimumSales30d={1} limit={3} />
          </div>
        </div>
      </section>

      <section className="soft-section py-16 md:py-20">
        <div className="site-container grid gap-8 lg:grid-cols-[1fr_.8fr] lg:items-center">
          <div>
            <p className="eyebrow">Free eBay Profit Calculator</p>
            <h2 className="section-title mt-3">Know the numbers before the listing goes live.</h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--muted)]">
              Enter your own selling price, supplier cost, shipping, marketplace fees and other assumptions to calculate profit, margin and ROI. Nothing is guessed for you.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/free-tools/profit-margin-calculator" className="button button-primary">
                Calculate eBay Profit
              </Link>
              <Link href={routes.freeTools} className="button button-secondary">
                View Free Tools
              </Link>
            </div>
          </div>
          <div className="snapshot-card">
            <p className="eyebrow">Your inputs</p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {["Selling price", "Supplier cost", "Shipping", "eBay fees", "Advertising", "Other costs"].map((label) => (
                <div className="metric-box" key={label}>
                  <span className="metric-label">{label}</span>
                  <strong className="!text-base">Enter your value</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="scroll-mt-24 bg-white py-16 md:py-20">
        <div className="site-container">
          <SectionHeading
            eyebrow="Membership"
            title="Start free. Unlock more when your workflow needs it."
            description="Free, Pro and Premium are the membership structure. Commercial pricing remains configurable until the launch package is approved."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {plans.map(([name, text], index) => (
              <article
                key={name}
                className={index === 1 ? "plan-card plan-card-featured" : "plan-card"}
              >
                <p className={name === "Premium" ? "eyebrow !text-[var(--premium)]" : "eyebrow"}>
                  {name}
                </p>
                <h3 className="mt-4 text-2xl font-extrabold text-[var(--navy)]">{text}</h3>
              </article>
            ))}
          </div>
          <div className="mt-8">
            <Link href={routes.pricing} className="button button-secondary">
              Compare Memberships
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[var(--navy)] py-16 text-white md:py-20">
        <div className="site-container flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[.12em] text-[var(--sky)]">Ready when you are</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-[-.03em] md:text-5xl">
              Your eBay account is ready. Your products should be too.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={routes.join} className="button bg-white text-[var(--navy)]">
              Get Started Free
            </Link>
            <Link href={routes.winningProducts} className="button button-dark-ghost">
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
