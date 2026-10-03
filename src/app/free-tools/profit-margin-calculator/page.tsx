import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { PageHero } from "@/components/site/page-hero";
import { PageShell } from "@/components/site/page-shell";
import { ProfitMarginCalculator } from "@/components/tools/calculators";
import { RelatedTools } from "@/components/tools/related-tools";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, softwareApplicationSchema } from "@/lib/seo/schema";
import { buildMetadata } from "@/lib/seo/metadata";

const path = "/free-tools/profit-margin-calculator";

export const metadata: Metadata = buildMetadata({
  title: "Free eBay Profit Margin Calculator",
  description:
    "Estimate eBay dropshipping profit margin using selling price, supplier cost, shipping, tax and your marketplace fee assumption.",
  path,
});

export default function Page() {
  return (
    <PageShell darkHeader>
      <JsonLd
        data={[
          softwareApplicationSchema({
            name: "eBay Profit Margin Calculator",
            description:
              "A free calculator for estimating eBay selling margin from user-entered costs and fees.",
            path,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Free Tools", path: "/free-tools" },
            { name: "Profit Margin Calculator", path },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Free eBay tool"
        title="eBay Profit Margin Calculator"
        description="Estimate landed cost, marketplace fees, net profit, margin and ROI from your own assumptions before you list."
      />
      <section className="py-12 md:py-16">
        <div className="site-container">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Free Tools", href: "/free-tools" },
              { label: "Profit Margin Calculator" },
            ]}
          />
          <div className="mt-8">
            <ProfitMarginCalculator />
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <article className="feature-card">
              <p className="eyebrow">Formula</p>
              <h2 className="mt-3 text-2xl font-extrabold text-[var(--navy)]">
                What eCommPilot includes
              </h2>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                Landed supplier cost is product cost plus supplier shipping plus any
                purchase tax, GST or VAT you enter. eBay cost is calculated from your
                marketplace fee assumption and any mandatory fixed fee you include.
              </p>
            </article>
            <article className="feature-card">
              <p className="eyebrow">Important</p>
              <h2 className="mt-3 text-2xl font-extrabold text-[var(--navy)]">
                Advertising is not included by default
              </h2>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                Optional promoted-listing or ad spend is excluded from the V1 eCommPilot
                profit model. Add those costs separately when they apply to your own
                listing strategy.
              </p>
            </article>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
