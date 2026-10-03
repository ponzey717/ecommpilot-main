import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { PageHero } from "@/components/site/page-hero";
import { PageShell } from "@/components/site/page-shell";
import { EbayFeeEstimator } from "@/components/tools/calculators";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, softwareApplicationSchema } from "@/lib/seo/schema";
import { buildMetadata } from "@/lib/seo/metadata";

const path = "/free-tools/ebay-fee-estimator";

export const metadata: Metadata = buildMetadata({
  title: "Free eBay Fee Estimator",
  description:
    "Estimate eBay marketplace fees using your actual selling price, fee percentage and fixed transaction fee assumptions.",
  path,
});

export default function Page() {
  return (
    <PageShell darkHeader>
      <JsonLd
        data={[
          softwareApplicationSchema({
            name: "eBay Fee Estimator",
            description:
              "A free user-input tool for estimating eBay marketplace fees.",
            path,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Free Tools", path: "/free-tools" },
            { name: "eBay Fee Estimator", path },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Free eBay tool"
        title="eBay Fee Estimator"
        description="Estimate marketplace fees using the rate and fixed transaction assumptions that apply to your own market and category."
      />
      <section className="py-12 md:py-16">
        <div className="site-container">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Free Tools", href: "/free-tools" },
              { label: "eBay Fee Estimator" },
            ]}
          />
          <div className="mt-8">
            <EbayFeeEstimator />
          </div>
          <article className="feature-card mt-10">
            <p className="eyebrow">Why the rate is editable</p>
            <h2 className="mt-3 text-2xl font-extrabold text-[var(--navy)]">
              eBay fees are not one universal percentage.
            </h2>
            <p className="mt-4 max-w-4xl text-sm leading-7 text-[var(--muted)]">
              Marketplace, category, seller status and other account conditions can
              change the applicable fee. This calculator deliberately lets you enter
              the rate you want to test instead of presenting one hardcoded number as
              correct for every seller.
            </p>
          </article>
        </div>
      </section>
    </PageShell>
  );
}
