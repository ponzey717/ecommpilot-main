import type { Metadata } from "next";
import { PageShell } from "@/components/site/page-shell";
import { EbayFeeEstimator } from "@/components/tools/calculators";
import { JsonLd } from "@/components/seo/json-ld";
import { softwareApplicationSchema } from "@/lib/seo/schema";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Free eBay Fee Estimator",
  description: "Estimate eBay marketplace fees using your actual selling price, fee percentage and fixed transaction fee assumptions.",
  path: "/free-tools/ebay-fee-estimator",
});

export default function Page() {
  return (
    <PageShell>
      <JsonLd data={softwareApplicationSchema({
        name: "eBay Fee Estimator",
        description: "A free user-input tool for estimating eBay marketplace fees.",
        path: "/free-tools/ebay-fee-estimator",
      })} />
      <section className="bg-white py-14">
        <div className="site-container">
          <p className="eyebrow">Free tool</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-extrabold tracking-[-.04em] text-[var(--navy)] md:text-6xl">eBay Fee Estimator</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--muted)]">Use the fee rate relevant to your marketplace and category rather than relying on one hardcoded percentage.</p>
          <div className="mt-10"><EbayFeeEstimator /></div>
        </div>
      </section>
    </PageShell>
  );
}
