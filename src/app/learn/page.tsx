import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { PageShell } from "@/components/site/page-shell";
import { routes } from "@/config/routes";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Learn eBay Dropshipping & Product Research",
  description:
    "Practical eCommPilot learning paths for eBay product research, supplier validation, fees, profit, listings and product monitoring.",
  path: "/learn",
});

const tracks = [
  {
    title: "Product Research",
    text: "Learn how to separate real SOLD demand from active listings, compare competition and decide whether a product deserves deeper supplier work.",
    action: "Browse Winning Products",
    href: routes.winningProducts,
  },
  {
    title: "Supplier Validation",
    text: "Understand exact-product matching, variants, stock signals, delivery, supplier quality and why a backup supplier can matter.",
    action: "See How It Works",
    href: routes.howItWorks,
  },
  {
    title: "Fees & Profit",
    text: "Work through landed supplier cost, eBay costs, net profit, margin, ROI and break-even thinking without assuming one universal fee rate.",
    action: "Use Profit Calculator",
    href: "/free-tools/profit-margin-calculator",
  },
  {
    title: "Listings & SEO",
    text: "Prepare clearer titles and listing information from verified product facts without copying competitor content or inventing specifications.",
    action: "Check Title Length",
    href: "/free-tools/title-length-checker",
  },
  {
    title: "Delivery & Product Risk",
    text: "See how delivery time, variation complexity, fragile products, brand/IP risk and changing supplier conditions affect a product decision.",
    action: "Explore Categories",
    href: routes.categories,
  },
  {
    title: "Monitoring After Listing",
    text: "Learn what to recheck after a product is selected: supplier availability, shipping, economics, research freshness and alert states.",
    action: "Explore the Platform",
    href: routes.pricing,
  },
] as const;

export default function LearnPage() {
  return (
    <PageShell darkHeader>
      <PageHero
        eyebrow="Learn"
        title="Practical eBay dropshipping guidance built around the real workflow."
        description="Start with product demand, validate the supplier, understand the economics, prepare the listing and keep watching what changes."
      />
      <section className="py-14 md:py-18">
        <div className="site-container">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {tracks.map((track,index) => (
              <article key={track.title} className="feature-card flex flex-col">
                <span className="feature-number">{String(index + 1).padStart(2,"0")}</span>
                <h2 className="mt-5 text-xl font-extrabold text-[var(--navy)]">{track.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-7 text-[var(--muted)]">{track.text}</p>
                <Link href={track.href} className="mt-6 text-sm font-extrabold text-[var(--blue)]">
                  {track.action} →
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-[24px] border border-[var(--border)] bg-white p-6 md:p-8">
            <p className="eyebrow">Learning principle</p>
            <h2 className="mt-3 text-2xl font-extrabold text-[var(--navy)]">
              Learn the evidence behind the product decision.
            </h2>
            <p className="mt-4 max-w-4xl text-sm leading-7 text-[var(--muted)]">
              eCommPilot learning content focuses on practical seller decisions: what a metric means, what evidence supports it, what can change, and what should be checked before acting. Marketplace facts are not replaced with invented numbers.
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
