import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { PageShell } from "@/components/site/page-shell";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Terms",
  description: "Important terms and limitations for using eCommPilot public product research information.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <PageShell darkHeader>
      <PageHero
        eyebrow="Terms"
        title="Important use terms"
        description="eCommPilot provides research, supplier, economics and workflow information to support seller decisions. It does not guarantee marketplace results."
      />
      <section className="py-14 md:py-18">
        <div className="site-container max-w-4xl space-y-5">
          <article className="feature-card">
            <h2 className="text-2xl font-extrabold text-[var(--navy)]">Research changes over time</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
              Demand, supplier availability, shipping, costs, fees and marketplace conditions may change after a product is researched. Evidence timestamps and freshness states should be reviewed before acting.
            </p>
          </article>
          <article className="feature-card">
            <h2 className="text-2xl font-extrabold text-[var(--navy)]">Seller responsibility</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
              Sellers are responsible for their eBay account, listing decisions, prices, policies, legal/tax obligations and compliance with marketplace rules. eCommPilot is not the merchant of record for products shown in the research catalog.
            </p>
          </article>
          <article className="feature-card">
            <h2 className="text-2xl font-extrabold text-[var(--navy)]">Account terms</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
              Authenticated account and membership terms are maintained in the eCommPilot app.
            </p>
            <Link href="https://app.ecommpilot.net/terms" className="mt-5 inline-block text-sm font-extrabold text-[var(--blue)]">
              Open app terms →
            </Link>
          </article>
        </div>
      </section>
    </PageShell>
  );
}
