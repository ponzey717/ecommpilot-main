import Link from "next/link";
import { CatalogProductGrid } from "@/components/products/catalog-product-grid";
import { LiveHeroSnapshot } from "@/components/products/live-hero-snapshot";
import { PageShell } from "@/components/site/page-shell";
import { routes } from "@/config/routes";
import { tools, toolPath } from "@/config/tools";

const steps = [
  ["01", "Find a product", "Browse published opportunities for your eBay market."],
  ["02", "Check the evidence", "Review demand, supplier, delivery and profit context."],
  ["03", "Prepare your listing", "Use the listing information available to your plan."],
  ["04", "Keep it in view", "Watch for changes after choosing a product."],
] as const;

const featuredTools = ["profit-margin-calculator", "ebay-fee-estimator", "title-length-checker"] as const;

const plans = [
  ["Free", "Explore the public catalog and tools", "Start with the essentials."],
  ["Pro", "Go deeper into product research", "More supplier and workflow access."],
  ["Premium", "For advanced research workflows", "The broadest configured access."],
] as const;

export default function Home() {
  return (
    <PageShell darkHeader>
      <section className="home-hero">
        <div className="site-container home-hero-grid">
          <div className="home-hero-copy">
            <p className="home-overline">Product research for eBay sellers</p>
            <h1>Stop Searching. <span>Start Listing Winning eBay Products.</span></h1>
            <p className="home-hero-description">
              Discover published opportunities with demand, supplier and profit context in one place. Make your next listing decision with clearer evidence.
            </p>
            <div className="home-hero-actions">
              <Link href={routes.winningProducts} className="button button-cyan">Browse winning products</Link>
              <Link href={routes.pricing} className="button button-dark-ghost">Compare memberships</Link>
            </div>
            <p className="home-hero-note">US, UK &amp; AU markets · Supplier evidence · Profit tools</p>
          </div>
          <LiveHeroSnapshot />
        </div>
      </section>

      <section id="products" className="home-section home-catalog">
        <div className="site-container">
          <div className="home-section-head">
            <div>
              <p className="eyebrow">Discover &amp; evaluate</p>
              <h2>Winning Products</h2>
              <p>Only published opportunities appear here. Browse by marketplace when product evidence is available.</p>
            </div>
            <Link href={routes.winningProducts} className="home-text-link">View the catalog <span aria-hidden="true">↗</span></Link>
          </div>
          <nav aria-label="Browse by marketplace" className="home-market-tabs">
            <Link href={routes.winningProducts}><span className="home-market-all" aria-hidden="true">◎</span>All markets</Link>
            <Link href="/winning-products/us"><span className="fi fi-us" aria-hidden="true" />US</Link>
            <Link href="/winning-products/uk"><span className="fi fi-gb" aria-hidden="true" />UK</Link>
            <Link href="/winning-products/au"><span className="fi fi-au" aria-hidden="true" />AU</Link>
          </nav>
          <CatalogProductGrid sort="most_sold" limit={3} />
        </div>
      </section>

      <section id="how-it-works" className="home-section home-workflow scroll-mt-24">
        <div className="site-container">
          <div className="home-section-head">
            <div>
              <p className="eyebrow">How it works</p>
              <h2>From discovery to decision.</h2>
              <p>A simple path through the product work that matters.</p>
            </div>
          </div>
          <div className="home-steps">
            {steps.map(([number, title, description]) => (
              <div className="home-step" key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section home-tools">
        <div className="site-container">
          <div className="home-section-head">
            <div>
              <p className="eyebrow">Free seller tools</p>
              <h2>Check the numbers yourself.</h2>
              <p>Useful calculations and listing checks, with your own inputs and no sign-in required.</p>
            </div>
            <Link href={routes.freeTools} className="home-text-link">All free tools <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="home-tool-grid">
            {featuredTools.map((slug) => {
              const tool = tools.find((item) => item.slug === slug);
              if (!tool) return null;
              return <Link key={slug} href={toolPath(slug)} className="home-tool-card">
                <span className="home-tool-symbol" aria-hidden="true">{tool.icon}</span>
                <h3>{tool.title}</h3>
                <p>{tool.summary}</p>
                <span className="home-tool-arrow" aria-hidden="true">↗</span>
              </Link>;
            })}
          </div>
        </div>
      </section>

      <section id="pricing" className="home-section home-pricing scroll-mt-24">
        <div className="site-container">
          <div className="home-section-head">
            <div>
              <p className="eyebrow">Your next step</p>
              <h2>Research at your pace.</h2>
              <p>Start exploring for free. Compare access levels before choosing a membership.</p>
            </div>
            <Link href={routes.pricing} className="home-text-link">Compare memberships <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="home-plan-grid">
            {plans.map(([name, title, description], index) => (
              <article className={index === 1 ? "home-plan home-plan-featured" : "home-plan"} key={name}>
                <p className="eyebrow">{name}</p>
                <h3>{title}</h3>
                <p>{description}</p>
                <Link href={`${routes.join}?plan=${name.toLowerCase()}`} className={index === 1 ? "button button-primary" : "button button-secondary"}>
                  {name === "Free" ? "Explore free" : `Explore ${name}`}
                </Link>
              </article>
            ))}
          </div>
          <p className="home-pricing-note">Paid prices and exact allowances will be shown before subscriptions are offered.</p>
        </div>
      </section>
    </PageShell>
  );
}
