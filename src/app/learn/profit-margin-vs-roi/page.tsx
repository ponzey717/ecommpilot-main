import type { Metadata } from "next";
import { GuideArticle } from "@/components/learn/guide-article";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { PageHero } from "@/components/site/page-hero";
import { PageShell } from "@/components/site/page-shell";
import { buildMetadata } from "@/lib/seo/metadata";
import { articleSchema, breadcrumbSchema } from "@/lib/seo/schema";

const path = "/learn/profit-margin-vs-roi";
const title = "Profit Margin vs ROI for eBay Product Research";
const description =
  "Understand the difference between net profit margin and ROI when comparing eBay product opportunities and supplier economics.";

export const metadata: Metadata = buildMetadata({ title, description, path });

const sections = [
  {
    heading: "Margin and ROI answer different questions",
    paragraphs: [
      "Net profit margin measures profit as a percentage of the selling price. ROI measures profit as a percentage of the landed supplier cost. A product can look attractive on one measure and less attractive on the other.",
      "Using both prevents a single percentage from hiding how much capital or supplier cost is required to create the profit.",
    ],
  },
  {
    heading: "Build landed supplier cost first",
    paragraphs: [
      "Before calculating either percentage, build the cost base carefully. For the eCommPilot V1 economics model, landed supplier cost is product cost plus supplier shipping plus purchase tax, GST or VAT where applicable.",
      "Marketplace cost is kept separate and includes the selling fee plus mandatory transaction fees. Optional promoted-listing or advertising spend is not included in the base V1 figure.",
    ],
    points: [
      "Landed supplier cost = product cost + supplier shipping + applicable purchase tax.",
      "Marketplace cost = selling fee + mandatory transaction fees.",
      "Net profit = selling price - landed supplier cost - marketplace cost.",
    ],
  },
  {
    heading: "Net profit margin",
    paragraphs: [
      "Profit margin is net profit divided by selling price, multiplied by 100. It tells you how much of each unit of revenue remains after the included costs.",
      "Margin is useful when comparing products at different selling prices because it normalizes profit against revenue.",
    ],
  },
  {
    heading: "Return on investment",
    paragraphs: [
      "ROI is net profit divided by landed supplier cost, multiplied by 100. It tells you how much profit is being generated relative to the supplier-side money committed to the sale.",
      "A high ROI does not automatically make a product better. Delivery, demand, competition, returns risk and supplier reliability still matter.",
    ],
  },
  {
    heading: "Why exact thresholds should stay configurable",
    paragraphs: [
      "Different markets, categories and operating strategies may justify different minimums. A platform should therefore keep qualification thresholds configurable instead of treating one global percentage as permanent truth.",
      "Display bands such as 10%+, 15%+ or 30%+ are useful for browsing, but they are not the same thing as a business rule that decides whether a product is publishable.",
    ],
  },
  {
    heading: "Use percentages with fresh inputs",
    paragraphs: [
      "A precise formula cannot rescue stale inputs. Supplier price, shipping, tax assumptions, marketplace fees and selling price all need a known basis and checked time.",
      "When a supplier quote changes, calculate a new economics run rather than silently overwriting the old one. That keeps the decision auditable.",
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
        eyebrow="Economics guide"
        title={title}
        description="Use margin to understand profit against revenue and ROI to understand profit against landed supplier cost."
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
              intro="Margin and ROI are related, but they are not interchangeable. Keeping both visible makes product comparisons more transparent."
              sections={sections}
              primaryHref="/free-tools/profit-margin-calculator"
              primaryLabel="Open Profit Calculator"
              secondaryHref="/winning-products"
              secondaryLabel="Browse Winning Products"
            />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
