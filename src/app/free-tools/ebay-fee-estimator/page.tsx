import type { Metadata } from "next";
import { PageShell } from "@/components/site/page-shell";
import { EbayFeeEstimator } from "@/components/tools/ep11-calculators";
import { ToolGuide } from "@/components/tools/tool-guide";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, softwareApplicationSchema } from "@/lib/seo/schema";
import { buildMetadata } from "@/lib/seo/metadata";
import { ToolPageIntro } from "@/components/tools/tool-page-intro";
import { toolSeo } from "@/config/tool-seo";

const path = "/free-tools/ebay-fee-estimator";

export const metadata: Metadata = buildMetadata({ title: toolSeo["ebay-fee-estimator"].title, description: toolSeo["ebay-fee-estimator"].description, path });

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
      <ToolPageIntro title="eBay Fee Calculator" description="Estimate marketplace fees and seller payout using the assumptions for your market, category and account." />
      <section className="tool-page-body">
        <div className="site-container">
          <EbayFeeEstimator />
          <ToolGuide slug="ebay-fee-estimator" />
        </div>
      </section>
    </PageShell>
  );
}
