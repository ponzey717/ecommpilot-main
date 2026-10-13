import type { Metadata } from "next";
import { PageShell } from "@/components/site/page-shell";
import { EbayFeeEstimator } from "@/components/tools/ep11-calculators";
import { ToolEditorial } from "@/components/tools/tool-editorial";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, softwareApplicationSchema } from "@/lib/seo/schema";
import { buildMetadata } from "@/lib/seo/metadata";
import { ToolPageIntro } from "@/components/tools/tool-page-intro";

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
      <ToolPageIntro title="eBay Fee Calculator" description="Estimate marketplace fees and seller payout using the assumptions for your market, category and account." />
      <section className="tool-page-body">
        <div className="site-container">
          <EbayFeeEstimator />
          <ToolEditorial slug="ebay-fee-estimator" />
        </div>
      </section>
    </PageShell>
  );
}
