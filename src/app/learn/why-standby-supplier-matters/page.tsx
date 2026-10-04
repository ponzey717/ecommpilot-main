import type { Metadata } from "next";
import { GuideArticle } from "@/components/learn/guide-article";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { PageHero } from "@/components/site/page-hero";
import { PageShell } from "@/components/site/page-shell";
import { buildMetadata } from "@/lib/seo/metadata";
import { articleSchema, breadcrumbSchema } from "@/lib/seo/schema";

const path = "/learn/why-standby-supplier-matters";
const title = "Why a Standby Supplier Matters in Dropshipping";
const description =
  "Learn why a verified standby supplier can reduce fulfillment risk and why switching suppliers should trigger fresh economics and qualification checks.";

export const metadata: Metadata = buildMetadata({ title, description, path });

const sections = [
  {
    heading: "A supplier is a dependency, not a permanent fact",
    paragraphs: [
      "Stock, price, shipping cost, delivery range and listing availability can change after a product has been researched. Treating one supplier as permanent creates unnecessary operational risk.",
      "A standby supplier gives the workflow another verified option when the Primary supplier becomes unsuitable.",
    ],
  },
  {
    heading: "Standby does not mean any similar listing",
    paragraphs: [
      "A backup is useful only when it has been matched and checked closely enough to support the product you intend to sell. A visually similar offer can still differ in variation, specification, shipping origin, delivery or total cost.",
      "The standby relationship should therefore point to a specific supplier offer and keep its own verification and quote history.",
    ],
    points: [
      "Use a distinct supplier offer from the Primary.",
      "Confirm product or variant fit.",
      "Check stock, shipping and delivery.",
      "Keep the checked timestamp and quote expiry.",
    ],
  },
  {
    heading: "Do not silently replace supplier history",
    paragraphs: [
      "When a Primary supplier fails, simply overwriting it destroys useful audit history. A better workflow records the change, preserves the old relationship and makes the new supplier role explicit.",
      "This matters when you later need to understand why economics or qualification changed.",
    ],
  },
  {
    heading: "Promotion should trigger fresh economics",
    paragraphs: [
      "The Standby supplier may have a different product cost, freight cost, delivery window or tax basis. Promoting it to Primary should therefore invalidate dependent economics rather than carrying old profit numbers forward.",
      "After promotion, calculate the economics again using the new supplier quote and then rerun qualification.",
    ],
  },
  {
    heading: "Standby can be required, preferred or optional",
    paragraphs: [
      "Not every business process needs the same rule. eCommPilot keeps the Standby policy configurable so a market profile can require it, flag its absence for review or treat it as optional.",
      "That policy affects qualification workflow, not the factual supplier evidence itself.",
    ],
  },
  {
    heading: "The goal is controlled recovery",
    paragraphs: [
      "The value of a standby supplier is not that switching becomes automatic. The value is that recovery starts from a previously reviewed alternative instead of from zero.",
      "A safe workflow still validates the Standby at the time of promotion, recalculates economics and confirms the product remains suitable before returning it to published status.",
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
        eyebrow="Supplier guide"
        title={title}
        description="A verified Standby supplier gives the workflow a controlled recovery path when Primary supplier evidence changes."
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
              intro="Supplier redundancy is useful only when it is explicit, verified and tied back to fresh economics. The goal is not automatic switching. The goal is safer recovery."
              sections={sections}
            />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
