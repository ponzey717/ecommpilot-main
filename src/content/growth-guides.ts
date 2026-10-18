export type GrowthGuide = {
  slug: string;
  title: string;
  description: string;
  primaryKeyword: string;
  region: string;
  status: "draft" | "review" | "approved" | "published";
  datePublished?: string;
  dateModified: string;
  lead: string;
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[];
  tools: { label: string; href: string }[];
  sources: { label: string; url: string; checkedAt: string }[];
  screenshotRequirements: string[];
  topic: "Research" | "Suppliers" | "Economics";
  readingMinutes: number;
};

// Only owner-approved guides with a genuine publication date may be published.
export const growthGuides: GrowthGuide[] = [
  {
    slug: "research-ebay-sold-products",
    title: "How to Research eBay Sold Products and Validate Demand",
    description: "A practical evidence trail for sold results, comparable variations and demand checks in the eBay marketplace where you sell.",
    primaryKeyword: "eBay sold product research", region: "All applicable eBay marketplaces", status: "review", dateModified: "2026-10-18", topic: "Research", readingMinutes: 6,
    lead: "Demand needs evidence of actual transactions. Active listings describe competing offers, not sales. Keep the two observations separate.",
    sections: [
      { heading: "Start with one exact product scope", paragraphs: ["Choose one marketplace, category, condition and defining variation. A broad product family can mix incompatible designs and prices. Record the query, filters, date range and observation time so another reviewer can reproduce the comparison."] },
      { heading: "Use sold evidence", paragraphs: ["Inspect sold results in Seller Hub Product Research. eBay says this tool can report sales trends, sold price ranges and sell-through for recent searches. Its completed listings search covers a shorter period and may differ from Product Research. An ended unsold listing is not a sale."] },
      { heading: "Compare exact variations", paragraphs: ["A parent listing can contain different colors, sizes or designs. Attribute sales to the intended variant only where evidence permits it. If the exact variant cannot be resolved, mark the demand result uncertain."] },
      { heading: "Separate demand from competition", paragraphs: ["Active offers can help evaluate competition, price and delivery. They cannot supply a sold count. Compare the same market, product identity and condition."] },
      { heading: "Make a decision with missing evidence visible", paragraphs: ["Record the sold count or range, period, source, observation time and confidence. When trustworthy sold evidence is unavailable, leave the demand check incomplete. Do not replace it with active listing volume or an AI estimate."], bullets: ["Fix the target market and exact variant.", "Save the filters and observed date.", "Inspect comparable sold results.", "Record uncertainty and exclusions.", "Review active offers separately.", "Recheck before listing."] },
    ],
    tools: [{ label: "Sell-through calculator", href: "/free-tools/ebay-sell-through-rate-calculator" }],
    sources: [{ label: "eBay Product Research", url: "https://www.ebay.com/help/selling/selling-tools/product-research?id=4853", checkedAt: "2026-10-18" }, { label: "eBay sold items guidance", url: "https://www.ebay.com/help/selling/listings/live-listings-sold-items?id=4108", checkedAt: "2026-10-18" }],
    screenshotRequirements: ["Genuine Seller Hub Product Research view showing market, period, filters and comparable sold results, with account and buyer details removed."],
  },
  {
    slug: "verify-aliexpress-supplier-variations",
    title: "How to Verify a Supplier and Match Product Variations for eBay",
    description: "Check exact variant identity, destination-specific shipping and eBay sourcing policy before relying on a supplier offer.",
    primaryKeyword: "match AliExpress product variations for eBay", region: "All applicable eBay marketplaces", status: "review", dateModified: "2026-10-18", topic: "Suppliers", readingMinutes: 7,
    lead: "A supplier offer is useful only when it matches the item researched and can be fulfilled under the seller's stated terms. Similar titles and thumbnails are weak evidence.",
    sections: [
      { heading: "Define the exact item first", paragraphs: ["Record size, material, design, pack quantity and defining item specifics from the eBay-side research. A parent listing may group distinct products; a supplier page may also contain several variants."] },
      { heading: "Build a variation match table", paragraphs: ["Compare the researched item with the supplier variant selector, image, attributes, price and SKU where shown. Flag every mismatch. A different pack count or design can change listing accuracy and economics."] },
      { heading: "Check destination-specific fulfillment", paragraphs: ["Select the buyer destination and exact variant before recording item cost, shipping charge and delivery estimate. Save the observed time. A quote for one country or variant must not be copied to another."] },
      { heading: "Review supplier reliability", paragraphs: ["Examine store history, feedback, product reviews and order evidence in context. Reviews can refer to another variation. Missing evidence remains missing. Verify a standby supplier independently."] },
      { heading: "Check eBay's sourcing policy", paragraphs: ["eBay's dropshipping policy allows fulfillment from a wholesale supplier but says buying from another retailer or marketplace to ship directly to an eBay buyer is not allowed. A product match alone does not establish policy compliance. Review the actual sourcing relationship before listing."] },
      { heading: "Recheck before publishing", paragraphs: ["Reconfirm exact variant availability, destination, shipping, delivery and policy fit. Record the source URLs, observation times and unresolved questions."], bullets: ["Capture exact item and variation specifics.", "Match selector, image, attributes and SKU.", "Confirm destination-specific quote.", "Review the sourcing relationship against policy.", "Recheck after material changes."] },
    ],
    tools: [{ label: "Profit calculator", href: "/free-tools/profit-margin-calculator" }],
    sources: [{ label: "eBay dropshipping policy", url: "https://www.ebay.com/help/selling/listings/dropshipping?id=4176", checkedAt: "2026-10-18" }, { label: "eBay selling practices policy", url: "https://www.ebay.com/help/policies/selling-policies/selling-practices-policy?id=4346", checkedAt: "2026-10-18" }],
    screenshotRequirements: ["Genuine supplier selector and exact variation comparison, with account and personal data removed; show selected variant, buyer destination and shipping quote."],
  },
];

export function getGrowthGuide(slug: string): GrowthGuide | undefined { return growthGuides.find((guide) => guide.slug === slug); }
export function publishedGrowthGuides(): GrowthGuide[] { return growthGuides.filter((guide) => guide.status === "published" && Boolean(guide.datePublished)); }
