import type { Metadata } from "next";
import { PageShell } from "@/components/site/page-shell";
import { ProfitMarginCalculator } from "@/components/tools/calculators";
import { JsonLd } from "@/components/seo/json-ld";
import { softwareApplicationSchema } from "@/lib/seo/schema";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Free eBay Profit Margin Calculator",
  description: "Estimate eBay dropshipping profit margin using selling price, supplier cost, shipping, tax and your marketplace fee assumption.",
  path: "/free-tools/profit-margin-calculator",
});

export default function Page() {
  return (
    <PageShell>
      <JsonLd data={softwareApplicationSchema({
        name: "eBay Profit Margin Calculator",
        description: "A free calculator for estimating eBay selling margin from user-entered costs and fees.",
        path: "/free-tools/profit-margin-calculator",
      })} />
      <section className="bg-white py-14">
        <div className="site-container">
          <p className="eyebrow">Free tool</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-extrabold tracking-[-.04em] text-[var(--navy)] md:text-6xl">eBay Profit Margin Calculator</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--muted)]">Estimate landed cost, marketplace fee, net profit, margin and ROI from your own assumptions.</p>
          <div className="mt-10"><ProfitMarginCalculator /></div>
        </div>
      </section>
    </PageShell>
  );
}
