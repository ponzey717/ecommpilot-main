import type { Metadata } from "next";
import { PageShell } from "@/components/site/page-shell";
import { ProfitMarginCalculator } from "@/components/tools/ep11-calculators";
import { ToolGuide } from "@/components/tools/tool-guide";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, softwareApplicationSchema } from "@/lib/seo/schema";
import { buildMetadata } from "@/lib/seo/metadata";
import { ToolPageIntro } from "@/components/tools/tool-page-intro";
import { toolSeo } from "@/config/tool-seo";

const path = "/free-tools/profit-margin-calculator";

export const metadata: Metadata = buildMetadata({ title: toolSeo["profit-margin-calculator"].title, description: toolSeo["profit-margin-calculator"].description, path });

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
          <ToolGuide slug="profit-margin-calculator" />
        </div>
      </section>
    </PageShell>
  );
}
