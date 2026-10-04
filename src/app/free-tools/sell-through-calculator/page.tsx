import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { PageHero } from "@/components/site/page-hero";
import { PageShell } from "@/components/site/page-shell";
import { SellThroughCalculator } from "@/components/tools/calculators";
import { RelatedTools } from "@/components/tools/related-tools";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, softwareApplicationSchema } from "@/lib/seo/schema";

const path = "/free-tools/sell-through-calculator";

export const metadata: Metadata = buildMetadata({
  title: "Free eBay Sell-Through Calculator",
  description:
    "Calculate observed eBay sell-through from your own sold and active listing counts without inventing marketplace evidence.",
  path,
});

export default function Page() {
  return (
    <PageShell darkHeader>
      <JsonLd
        data={[
          softwareApplicationSchema({
            name: "eBay Sell-Through Calculator",
            description:
              "A free user-input calculator for estimating observed eBay sell-through from sold and active listing counts.",
            path,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Free Tools", path: "/free-tools" },
            { name: "Sell-Through Calculator", path },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Free eBay tool"
        title="eBay Sell-Through Calculator"
        description="Use your own sold and active listing counts to measure one demand signal before you compare suppliers, delivery and profit."
      />
      <section className="py-12 md:py-16">
        <div className="site-container">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Free Tools", href: "/free-tools" },
              { label: "Sell-Through Calculator" },
            ]}
          />

          <div className="mt-8">
            <SellThroughCalculator />
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <article className="feature-card">
              <p className="eyebrow">Formula</p>
              <h2 className="mt-3 text-2xl font-extrabold text-[var(--navy)]">
                How the observed rate is calculated
              </h2>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                This tool uses sold ÷ (sold + active listings) × 100. Use sold and
                active counts gathered for the same product scope, marketplace and
                evidence window so the comparison remains meaningful.
              </p>
            </article>

            <article className="feature-card">
              <p className="eyebrow">Evidence rule</p>
              <h2 className="mt-3 text-2xl font-extrabold text-[var(--navy)]">
                eCommPilot does not invent sold history
              </h2>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                Enter counts from evidence you legitimately have. A sell-through rate
                is only one demand indicator and does not replace supplier, delivery,
                competition or profit validation.
              </p>
            </article>
          </div>

          <RelatedTools currentPath={path} />
        </div>
      </section>
    </PageShell>
  );
}
