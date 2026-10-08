import type { Metadata } from "next";
import Link from "next/link";
import { CatalogProductGrid } from "@/components/products/catalog-product-grid";
import { PageHero } from "@/components/site/page-hero";
import { PageShell } from "@/components/site/page-shell";
import { SectionHeading } from "@/components/ui/section-heading";
import { routes } from "@/config/routes";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "What's Trending on eBay | eCommPilot",
  description:
    "See currently published eCommPilot product opportunities ranked by verified 30-day eBay sold demand across the US, UK and Australia.",
  path: "/whats-trending",
});

export default function WhatsTrendingPage() {
  return (
    <PageShell darkHeader>
      <PageHero
        eyebrow="What's Trending"
        badge="30-day sold demand"
        title="Products moving now, ranked by verified eBay sales."
        description="A demand-first view of published Winning Products. Ranking uses current 30-day SOLD evidence—not active listing counts, search volume or a hidden trend score."
        actions={
          <Link href={routes.winningProducts} className="button button-cyan">
            Browse all Winning Products
          </Link>
        }
      />
      <section className="py-12 md:py-16">
        <div className="site-container">
          <SectionHeading
            eyebrow="Demand-first discovery"
            title="Most sold in the last 30 days"
            description="Only products that already passed eCommPilot publication gates can appear here. Missing or stale evidence is never filled with estimates."
          />
          <div className="mt-8">
            <CatalogProductGrid sort="most_sold" minimumSales30d={1} limit={24} />
          </div>
          <div className="mt-10 rounded-[22px] border border-[var(--border)] bg-white p-6 text-sm leading-7 text-[var(--muted)]">
            <strong className="text-[var(--navy)]">How this differs from Winning Products:</strong>{" "}
            Winning Products is the full published catalog. What&apos;s Trending is the same catalog viewed through recent sold demand first. It does not create a second product database or substitute active listings for sold evidence.
          </div>
        </div>
      </section>
    </PageShell>
  );
}
