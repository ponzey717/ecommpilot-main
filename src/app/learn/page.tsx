import { LearnLibrary } from "@/components/learn/learn-library";
import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { PageShell } from "@/components/site/page-shell";
import { routes } from "@/config/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { tools, toolPath } from "@/config/tools";
import { publishedGrowthGuides } from "@/content/growth-guides";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "eCommPilot Seller Academy | Practical eBay Seller Guides",
  description:
    "Practical eBay seller guides, product research and sourcing lessons from eCommPilot Seller Academy.",
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
  const publishedGuides = publishedGrowthGuides();
  return (
    <PageShell darkHeader>
      <PageHero
        eyebrow="The eCommPilot Field Guides"
        title="eCommPilot Seller Academy"
        description="Practical eBay seller guides, product research and sourcing lessons. Start with demand, verify each exact product and supplier, then make the listing and economics decisions with evidence you can revisit."
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

          <section className="mt-10 rounded-[24px] border border-[var(--border)] bg-white p-6 md:p-8">
            <p className="eyebrow">Practice with your own inputs</p>
            <h2 className="mt-3 text-2xl font-extrabold text-[var(--navy)]">Free tools for each seller decision</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{tools.map((tool) => <Link key={tool.slug} href={toolPath(tool.slug)} className="rounded-xl border border-[var(--border)] p-4 text-sm font-bold text-[var(--blue)] hover:bg-[var(--surface-soft)]">{tool.title} →</Link>)}</div>
          </section>

          <section className="mt-10 rounded-[24px] border border-[var(--border)] bg-white p-6 md:p-8">
            <p className="eyebrow">Practical seller guides</p>
            <h2 className="mt-3 text-2xl font-extrabold text-[var(--navy)]">Explore the Field Guides</h2>
            {publishedGuides.length > 0 ? <LearnLibrary guides={publishedGuides.map((guide) => ({ title: guide.title, description: guide.description, href: `/learn/${guide.slug}`, topic: guide.topic, readingMinutes: guide.readingMinutes, publishedAt: guide.datePublished }))} /> : <p className="mt-4 text-sm leading-7 text-[var(--muted)]">Our first guides are in editorial review. Explore the learning tracks and free tools above while we verify sources and visuals.</p>}
          </section>

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
