import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { PageShell } from "@/components/site/page-shell";
import { routes } from "@/config/routes";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "eCommPilot Memberships",
  description:
    "Compare how Free, Pro and Premium eCommPilot memberships can control Winning Product, supplier, monitoring and advanced-tool access.",
  path: "/pricing",
});

const plans = [
  {
    name: "Free",
    headline: "Explore eCommPilot before you pay.",
    points: [
      "Public and member Winning Product access according to the Free entitlement",
      "US, UK and AU marketplace browsing",
      "Core public eBay tools",
      "A starting member workflow for evaluating the platform",
    ],
  },
  {
    name: "Pro",
    headline: "For sellers building a repeatable product workflow.",
    points: [
      "Broader Winning Product access",
      "Deeper supplier and listing information where entitled",
      "More saved/listed workflow capacity",
      "Higher monitoring and What's Trending access where configured",
    ],
  },
  {
    name: "Premium",
    headline: "For the deepest product and research access.",
    points: [
      "Highest configured Winning Product access",
      "Advanced research and supplier evidence where available",
      "Highest configured workflow and monitoring allowances",
      "Future Premium-only exploration/AI features when released",
    ],
  },
] as const;

const dimensions = [
  "Winning Product access",
  "Product allowance",
  "Exact supplier access",
  "Product Watcher frequency",
  "Saved / Listed capacity",
  "What's Trending limits",
  "Advanced tools",
] as const;

export default function PricingPage() {
  return (
    <PageShell darkHeader>
      <PageHero
        eyebrow="Membership"
        title="Start free. Upgrade when you need deeper product access."
        description="Free, Pro and Premium are the membership structure. Exact commercial prices, product limits and recurring allowances remain configurable until the launch package is approved."
      />
      <section className="py-14 md:py-18">
        <div className="site-container">
          <div className="grid gap-5 md:grid-cols-3">
            {plans.map((plan,index) => (
              <article key={plan.name} className={index === 1 ? "plan-card plan-card-featured" : "plan-card"}>
                <div className="flex items-center justify-between gap-3">
                  <p className={plan.name === "Premium" ? "eyebrow !text-[var(--premium)]" : "eyebrow"}>
                    {plan.name}
                  </p>
                  {plan.name === "Pro" ? <span className="badge badge-market">Middle tier</span> : null}
                </div>
                <h2 className="mt-4 text-xl font-extrabold text-[var(--navy)]">{plan.headline}</h2>
                <ul className="mt-6 grid gap-3 text-sm leading-6 text-[var(--muted)]">
                  {plan.points.map((item) => <li key={item}>✓ {item}</li>)}
                </ul>
              </article>
            ))}
          </div>

          <section className="mt-10 rounded-[24px] border border-[var(--border)] bg-white p-6 md:p-8">
            <p className="eyebrow">What membership controls</p>
            <h2 className="mt-3 text-2xl font-extrabold text-[var(--navy)]">
              One product workflow, different access levels.
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--muted)]">
              Membership tiers change access, frequency and allowances. They do not create separate research engines or separate product databases.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {dimensions.map((dimension) => (
                <div key={dimension} className="metric-box">
                  <span className="metric-label">Configurable by plan</span>
                  <strong className="!text-base">{dimension}</strong>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href={routes.join} className="button button-primary">Get Started Free</Link>
            <Link href={routes.winningProducts} className="button button-secondary">Browse Winning Products</Link>
          </div>
          <p className="mt-4 text-xs leading-5 text-[var(--muted)]">
            Paid prices and exact plan limits will be displayed before paid memberships are enabled. No placeholder dollar prices are presented as final pricing.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
