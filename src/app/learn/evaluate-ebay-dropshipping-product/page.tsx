import type { Metadata } from "next";
import { GuideArticle } from "@/components/learn/guide-article";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { PageHero } from "@/components/site/page-hero";
import { PageShell } from "@/components/site/page-shell";
import { buildMetadata } from "@/lib/seo/metadata";
import { articleSchema, breadcrumbSchema } from "@/lib/seo/schema";

const path = "/learn/evaluate-ebay-dropshipping-product";
const title = "How to Evaluate an eBay Dropshipping Product";
const description =
  "A practical evidence-first framework for evaluating demand, competition, suppliers, delivery, risk and profit before listing an eBay dropshipping product.";

export const metadata: Metadata = buildMetadata({ title, description, path });

const sections = [
  {
    heading: "Start with demand, not the supplier",
    paragraphs: [
      "A cheap supplier item is not automatically a product opportunity. Begin with evidence that buyers are already purchasing the type of product in the market you plan to sell in.",
      "Treat demand evidence and supplier evidence as separate questions. Demand asks whether buyers are active. Supplier evidence asks whether you can fulfill that demand reliably and profitably.",
    ],
    points: [
      "Use one marketplace and one comparable product scope at a time.",
      "Prefer recent evidence over old lifetime totals.",
      "Keep sold evidence separate from active-listing competition.",
    ],
  },
  {
    heading: "Check competition in the same context",
    paragraphs: [
      "A product with sales can still be difficult if the active competition is crowded, unusually cheap or dominated by offers you cannot match. Compare the same market, product type and evidence window wherever possible.",
      "Competition is not a single pass/fail number. It is context for pricing, positioning, delivery and how much room exists for another seller.",
    ],
  },
  {
    heading: "Validate the Primary supplier",
    paragraphs: [
      "The supplier should match the product you researched, not merely look similar in a thumbnail. Confirm the offer, relevant variant, stock, destination, shipping cost and delivery range before relying on it.",
      "For eCommPilot, supplier facts remain time-sensitive evidence. A product can stop being publishable when the supplier, quote or delivery evidence becomes stale.",
    ],
    points: [
      "Confirm the exact or equivalent offer you intend to use.",
      "Check current stock and destination-specific delivery.",
      "Record when the supplier evidence was checked.",
      "Keep supplier cost and shipping separate for economics.",
    ],
  },
  {
    heading: "Look for operational fit",
    paragraphs: [
      "Products that are easier to ship, less fragile and simpler in variation structure are usually easier to operate. This does not guarantee success, but it reduces avoidable fulfillment and listing complexity.",
      "Do not guess these facts from the product title. If an operational criterion matters to your process, record it as explicit evidence.",
    ],
  },
  {
    heading: "Calculate profit from landed cost",
    paragraphs: [
      "Profit should be calculated after supplier cost, supplier shipping, purchase tax where applicable, marketplace selling fees and mandatory transaction fees. Optional advertising can be evaluated separately instead of hiding it inside the base product economics.",
      "Use both margin and ROI. Margin tells you how much of the selling price remains as profit. ROI tells you how efficiently the landed supplier cost is being used.",
    ],
  },
  {
    heading: "Finish with a recheck question",
    paragraphs: [
      "A product can qualify today and become unsuitable later. Before listing, ask whether the demand, supplier, delivery and economics evidence is still current enough for the decision you are about to make.",
      "The strongest workflow is not a one-time score. It is a repeatable evidence process that can move a product into review again when important facts change.",
    ],
  },
] as const;

export default function Page() {
  return (
    <PageShell darkHeader>
      <JsonLd
        data={[
          articleSchema({
            headline: title,
            description,
            path,
            datePublished: "2026-10-04",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Learn", path: "/learn" },
            { name: title, path },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Product research guide"
        title={title}
        description="Use an evidence-first sequence: demand, competition, supplier, operational fit, economics and freshness."
      />
      <section className="py-12 md:py-16">
        <div className="site-container">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Learn", href: "/learn" },
              { label: title },
            ]}
          />
          <div className="mt-8">
            <GuideArticle
              intro="The goal is not to find a product that looks exciting. The goal is to decide whether a specific product opportunity has enough current evidence to justify the next step."
              sections={sections}
            />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
