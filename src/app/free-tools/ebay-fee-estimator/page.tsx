import { ComparisonTable, Faq, Steps } from "@/components/learn/content-blocks";
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
          <div className="mt-10 grid min-w-0 grid-cols-[minmax(0,1fr)] gap-6">
            <section className="feature-card min-w-0"><h2 className="text-2xl font-extrabold text-[var(--navy)]">How to check your eBay selling fees</h2><p className="mt-3 text-sm leading-7 text-[var(--muted)]">The calculator uses the inputs you enter. It cannot identify every account, category, tax, upgrade, regulatory charge or discount automatically.</p><div className="mt-5"><Steps items={[{title:"Find your current marketplace terms",body:"Open the official fee page for the eBay site and seller account you use."},{title:"Enter the matching assumptions",body:"Use the relevant category rate, fixed charge and transaction amounts in one currency."},{title:"Compare the breakdown",body:"Check the estimate against an actual transaction statement before relying on it for a listing decision."}]} /></div></section>
            <section className="feature-card min-w-0"><h2 className="text-2xl font-extrabold text-[var(--navy)]">Marketplace fee references</h2><div className="mt-4"><ComparisonTable headers={["Market","Official page","Check before using a rate"]} rows={[["US","eBay selling fees","Category, Store status, order charge"],["UK","eBay business seller fees","Seller type, category, regulatory and international terms"],["AU","eBay selling fees","Eligibility, Pro plan and optional charges"],["Other eBay sites","Local eBay Help fee page","Local account and category terms"]]} /></div><ul className="mt-4 grid gap-2 text-sm text-[var(--blue)]"><li><a href="https://www.ebay.com/help/selling-fees/selling/selling-fees?id=4822">US fee terms ↗</a></li><li><a href="https://www.ebay.co.uk/help/selling/fees-credits-invoices/selling-fees?id=4809">UK business fee terms ↗</a></li><li><a href="https://www.ebay.com.au/help/selling/fees-credits-invoices/selling-fees?id=4822">AU fee terms ↗</a></li></ul><p className="mt-3 text-xs text-[var(--muted)]">Official pages checked 18 October 2026. Recheck current terms before each decision.</p></section>
            <section className="feature-card min-w-0"><h2 className="text-2xl font-extrabold text-[var(--navy)]">Common questions</h2><div className="mt-4"><Faq items={[{question:"Does this include every eBay charge?",answer:"No. The estimate depends on the selected market and your entered assumptions. Optional or account-specific charges can still apply."},{question:"Is one rate correct for every eBay country?",answer:"No. Use the current local marketplace and seller terms."}]} /></div></section>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
