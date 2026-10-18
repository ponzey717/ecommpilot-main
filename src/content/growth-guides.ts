export type GrowthGuide = {
  slug: string;
  title: string;
  description: string;
  primaryKeyword: string;
  region: string;
  status: "draft" | "published";
  datePublished?: string;
  dateModified: string;
  lead: string;
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[];
  tools: { label: string; href: string }[];
  sources: { label: string; url: string }[];
};

// Editing workflow: add a unique entry, keep status=draft until facts,
// screenshots, citations and internal links pass editorial review.
// Only published entries appear in the sitemap or on the Learn hub.
export const growthGuides: GrowthGuide[] = [
  {
    slug: "how-to-calculate-ebay-profit",
    title: "How to Calculate eBay Profit: Costs Most Sellers Forget",
    description: "Learn to calculate eBay profit after marketplace fees, supplier costs, shipping and advertising, with a transparent worked example.",
    primaryKeyword: "ebay profit calculator",
    region: "US, UK and AU (with region-specific fee caveats)",
    status: "draft",
    dateModified: "2026-10-18",
    lead: "A selling price is not net profit. This guide walks through product cost, supplier delivery, eBay fees, advertising and expenses so you can make better listing decisions.",
    sections: [
      {
        heading: "Start with revenue and the complete cost list",
        paragraphs: [
          "Record item selling price separately from buyer-paid shipping and marketplace-collected tax. A marketplace-collected tax is not automatically seller revenue, even when the fee calculation may use the buyer's total payment.",
          "Use exact supplier variant pricing and actual fulfilment location. Add product cost, shipping, packaging, applicable marketplace fees, advertising and other per-order costs. If exchange rates or return costs are estimates, label them rather than creating false precision."
        ],
        bullets: [
          "Item sale revenue and buyer-paid shipping",
          "Exact product and supplier delivery cost",
          "Packaging and any additional per-order fulfilment expenses",
          "Marketplace fees using the correct market, category and seller type",
          "Advertising costs or clearly labeled advertising scenarios",
          "Return or replacement reserve based on genuine history, if available"
        ]
      },
      {
        heading: "Why fee base and fixed charges matter",
        paragraphs: [
          "Under US eBay selling rules, the final value fee commonly combines a percentage with a fixed per-order fee, and the relevant fee base can include shipping charges and sales tax. There are category, seller and shipping exceptions. Check current official rules rather than treating one percentage as universal.",
          "For a tiered category the marginal fee rate may change after a monetary threshold. That makes a simple one-rate formula unreliable for some orders. An accurate fee calculation uses the specific schedule and rounds the resulting charge consistently."
        ]
      },
      {
        heading: "Worked example: a $35 item with free shipping",
        paragraphs: [
          "Illustrative assumptions only, not an official category quote: item sale price $35.00; marketplace-collected buyer tax $2.10; fee base $37.10; example fee 13% of the fee base plus a $0.40 per-order charge. This yields a fee of $5.22 after rounding.",
          "Suppose the exact supplier item costs $14.00, delivery $4.50, packaging $0.60, advertising $2.00 and other per-order costs $0.50. Order contribution profit is $35.00 minus $5.22, $14.00, $4.50, $0.60, $2.00 and $0.50, equalling $8.18. The margin on $35.00 selling revenue is about 23.37%.",
          "If your actual advertising cost rises to $5.00, the same illustrative order contributes only $5.18. If supplier delivery becomes $8.50 instead of $4.50, it contributes $4.18. Run realistic sensitivity scenarios before relying on a calculated margin."
        ]
      },
      {
        heading: "Net margin, markup and ROI are different",
        paragraphs: [
          "Margin normally divides a profit amount by selling revenue. Markup divides a price difference by cost. If an item costs $20 and sells for $30 before fees, markup is 50% while gross margin is 33.33%. Neither equals net order profit once fees and shipping are included.",
          "Return on investment is useful only when its denominator is disclosed. A seller may divide order profit by landed stock cost while another includes advertising and overhead. Keep the definitions visible in your calculator and spreadsheet."
        ]
      },
      {
        heading: "Check both shipping models and your target price",
        paragraphs: [
          "Free shipping is not free to fulfil. Buyer-paid shipping contributes to revenue but must be compared with the actual carrier or supplier charge, and marketplace fees can apply to shipping amounts. Check packaging, dimensional-weight charges and remote destinations.",
          "For a target-profit calculation, find the smallest market-currency increment where recalculated net profit actually reaches the goal. Rounding, fixed fees and tier thresholds can make algebra-only inversions off by a cent. Test one cent lower to verify the boundary.",
          "If the product variation, shipping cost or applicable seller fee is not verified, call the outcome a provisional estimate. Never imply that high demand alone makes a listing profitable."
        ]
      },
      {
        heading: "A pre-listing profit checklist",
        paragraphs: [
          "Before listing, confirm the item variation, supplier, source price, delivery date and marketplace category. Compare profit without ads and with a defensible ad scenario. After actual orders arrive, reconcile your calculator with eBay transaction statements and update the fee or cost assumptions when necessary."
        ],
        bullets: [
          "Verify exact product, warehouse and shipping destination.",
          "Check the official marketplace/category/seller fee source.",
          "Include every real fulfilment cost once, and only once.",
          "Test three realistic price and advertising scenarios.",
          "Reconcile the first actual transactions with the estimate."
        ]
      }
    ],
    tools: [
      { label: "eBay Profit Calculator", href: "/free-tools/profit-margin-calculator" },
      { label: "eBay Fee Estimator", href: "/free-tools/ebay-fee-estimator" },
      { label: "Break-Even Calculator", href: "/free-tools/ebay-break-even-calculator" },
      { label: "Shipping Profit Calculator", href: "/free-tools/ebay-shipping-profit-calculator" }
    ],
    sources: [
      { label: "eBay official US selling fees", url: "https://www.ebay.com/help/selling/fees-credits-invoices/x?id=4822" },
      { label: "eBay Promoted Listings overview", url: "https://www.ebay.com/help/selling/promoted-listings/promoted-listings-standard?id=5295" }
    ]
  },
  {
    slug: "ebay-dropshipping-guide",
    title: "eBay Dropshipping: A Practical Sourcing and Fulfilment Guide",
    description: "Understand wholesale supplier fulfilment on eBay, seller responsibilities, product checks and the real costs of shipping delays or returns.",
    primaryKeyword: "ebay dropshipping",
    region: "General; check the policy and country-specific rules",
    status: "draft",
    dateModified: "2026-10-18",
    lead: "Product research is only useful when the sourcing and fulfilment workflow is allowed, reliable and profitable. Build the operating process around eBay's policy and real customer expectations.",
    sections: [
      {
        heading: "Begin with the actual eBay dropshipping rule",
        paragraphs: [
          "eBay's official dropshipping policy allows fulfilment directly from a wholesale supplier. It does not allow listing an item and, after it sells, purchasing it from another retailer or marketplace to ship directly to the buyer. That distinction is important for evaluating proposed supplier workflows.",
          "The seller remains responsible for safe delivery within the listing's promised timeframe and for the buyer experience. A supplier's estimate does not remove that obligation."
        ],
        bullets: [
          "Confirm the supplier relationship and whether it meets eBay policy.",
          "Check exact product variant, item quality, packaging and return arrangements.",
          "Confirm inventory and the actual delivery service before promising handling times.",
          "Keep supplier costs, postage, taxes and refund risk in the profit calculation."
        ]
      },
      {
        heading: "Research demand without inventing sold evidence",
        paragraphs: [
          "First identify a specific product and intended category. Investigate comparable completed transactions only from evidence you are entitled to use. Record the exact period, item variant and source. Active listings show competition, not how many units sold.",
          "A product with many sales may still be a poor opportunity if competitive prices leave too little profit after shipping and fees. Demand, supplier match and economics are separate decisions."
        ]
      },
      {
        heading: "Verify the exact item and supplier",
        paragraphs: [
          "For color, size, model and pack-count variants, compare the actual supplier SKU with what is pictured and described on eBay. A low supplier thumbnail price might represent a different variation. Check available stock, order quantity and shipping region.",
          "A backup approved supplier and a documented replacement/refund process may reduce interruption when stock changes. Avoid promises that your supplier has not confirmed."
        ]
      },
      {
        heading: "Calculate the order economics",
        paragraphs: [
          "Use the market-appropriate seller fee schedule and include item cost, supplier shipping, currency conversion, packing and any ad spend. Measure a realistic worst-case shipping destination and return-cost scenario. Do not call an order profitable solely because selling price exceeds the supplier price.",
          "If any key evidence is missing, postpone qualification and mark the item Needs Review. A conservative sourcing decision is better than an incorrect published product opportunity."
        ]
      },
      {
        heading: "Prevent avoidable buyer problems",
        paragraphs: [
          "Keep the delivery promise realistic, supply accurate tracking when available and communicate early when a real delay is identified. Do not assure buyers of dispatch or delivery that has not been confirmed.",
          "Maintain records of the order, supplier fulfilment and buyer communication. If the item arrives incorrectly or damaged, follow the relevant returns and buyer-protection process rather than shifting the responsibility to the supplier."
        ]
      },
      {
        heading: "Review products after they are listed",
        paragraphs: [
          "Supplier stock, fee rates, exchange rates and delivery times can change. A listing profitable on Monday can become unprofitable or unfulfillable later. Recheck the source regularly and respond to real changes before accepting more orders.",
          "Start with a small validated catalog. Prefer sustainable order fulfilment and verified product data to publishing hundreds of speculative listings."
        ]
      }
    ],
    tools: [
      { label: "Profit Calculator", href: "/free-tools/profit-margin-calculator" },
      { label: "Fee Estimator", href: "/free-tools/ebay-fee-estimator" },
      { label: "Sell-Through Rate Calculator", href: "/free-tools/ebay-sell-through-rate-calculator" },
      { label: "Shipping Profit Calculator", href: "/free-tools/ebay-shipping-profit-calculator" }
    ],
    sources: [
      { label: "eBay official dropshipping policy", url: "https://www.ebay.com/help/selling/listings/dropshipping?id=4176" },
      { label: "eBay official selling fees", url: "https://www.ebay.com/help/selling/fees-credits-invoices/x?id=4822" }
    ]
  }
];

export function getGrowthGuide(slug: string): GrowthGuide | undefined {
  return growthGuides.find((guide) => guide.slug === slug);
}
export function publishedGrowthGuides(): GrowthGuide[] {
  return growthGuides.filter((guide) => guide.status === "published" && Boolean(guide.datePublished));
}
