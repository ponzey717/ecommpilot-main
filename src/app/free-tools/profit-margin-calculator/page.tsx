import type { Metadata } from "next";
import { PageShell } from "@/components/site/page-shell";
import { ProfitMarginCalculator } from "@/components/tools/ep11-calculators";
import { ToolEditorial } from "@/components/tools/tool-editorial";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, softwareApplicationSchema } from "@/lib/seo/schema";
import { buildMetadata } from "@/lib/seo/metadata";
import { ToolPageIntro } from "@/components/tools/tool-page-intro";

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
      <ToolPageIntro title="eBay Profit Calculator" description="Estimate net profit, margin, ROI and break-even price from your own costs and fee assumptions." />
      <section className="tool-page-body">
        <div className="site-container">
          <ProfitMarginCalculator />
          <ToolEditorial slug="profit-margin-calculator" />
        </div>
      </section>
    </PageShell>
  );
}
