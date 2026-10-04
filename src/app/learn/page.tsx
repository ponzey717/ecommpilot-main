import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { PageHero } from "@/components/site/page-hero";
import { PageShell } from "@/components/site/page-shell";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, itemListSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata({
  title: "Learn eBay Product Research",
  description:
    "Practical eCommPilot guides for eBay product research, supplier validation and transparent profit analysis.",
  path: "/learn",
});

const guides = [
  {
    title: "How to Evaluate an eBay Dropshipping Product",
    description:
      "Use an evidence-first framework for demand, competition, suppliers, operational fit, economics and freshness.",
    href: "/learn/evaluate-ebay-dropshipping-product",
  },
  {
    title: "Profit Margin vs ROI for eBay Product Research",
    description:
      "Understand what margin and ROI measure, how landed cost is built and why the two percentages should stay separate.",
    href: "/learn/profit-margin-vs-roi",
  },
  {
    title: "Why a Standby Supplier Matters in Dropshipping",
    description:
      "See how a verified backup supplier creates a safer recovery path when Primary supplier evidence changes.",
    href: "/learn/why-standby-supplier-matters",
  },
] as const;

export default function LearnPage() {
  return (
    <PageShell darkHeader>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Learn", path: "/learn" },
          ]),
          itemListSchema(
            "eCommPilot product research guides",
            guides.map((guide) => ({ name: guide.title, path: guide.href })),
          ),
        ]}
      />
      <PageHero
        eyebrow="Learn"
        title="Practical research guidance for eBay sellers."
        description="Evergreen guides built around evidence, supplier validation and transparent economics rather than hype."
      />
      <section className="py-14 md:py-18">
        <div className="site-container">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Learn" },
            ]}
          />

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {guides.map((guide, index) => (
              <Link key={guide.href} href={guide.href} className="feature-card group">
                <span className="feature-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-5 text-xl font-extrabold text-[var(--navy)] group-hover:text-[var(--blue)]">
                  {guide.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                  {guide.description}
                </p>
                <p className="mt-5 text-sm font-extrabold text-[var(--blue)]">
                  Read guide →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
