import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { PageShell } from "@/components/site/page-shell";
import { routes } from "@/config/routes";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "About eCommPilot",
  description:
    "Learn how eCommPilot helps eBay dropshippers evaluate products, suppliers, economics and listing readiness with evidence-first workflows.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <PageShell darkHeader>
      <PageHero
        eyebrow="About eCommPilot"
        title="Built to reduce the product work behind an eBay listing."
        description="eCommPilot is an eBay dropshipping operating platform focused on Winning Products, supplier validation, profitability, listing preparation and ongoing monitoring."
      />
      <section className="py-14 md:py-18">
        <div className="site-container grid gap-6 lg:grid-cols-2">
          <article className="feature-card">
            <p className="eyebrow">What we do</p>
            <h2 className="mt-3 text-2xl font-extrabold text-[var(--navy)]">
              You bring the eBay account. eCommPilot brings the product workflow.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
              Published Winning Products combine marketplace SOLD evidence, supplier and delivery checks, explicit economics and listing-ready information. After selection, the member workflow keeps products, listings, orders, profit and alerts in one place.
            </p>
          </article>
          <article className="feature-card">
            <p className="eyebrow">What we do not promise</p>
            <h2 className="mt-3 text-2xl font-extrabold text-[var(--navy)]">
              No guaranteed winners. No guaranteed profit.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
              Marketplace demand, supplier conditions, fees and selling results change. eCommPilot presents current evidence and assumptions so sellers can make better-informed decisions. Final listing, pricing and business decisions remain with the seller.
            </p>
          </article>
        </div>
        <div className="site-container mt-8">
          <Link href={routes.winningProducts} className="button button-primary">
            Browse Winning Products
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
