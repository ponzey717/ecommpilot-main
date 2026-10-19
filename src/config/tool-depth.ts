export type ToolDepth = {
  style: "ledger" | "decision" | "comparison" | "utility";
  heading: string;
  context: readonly [string, string];
  formulaLabel: string;
  formula: string;
  decision: string;
  workedExample?: string;
};

export const toolDepth: Record<string, ToolDepth> = {
  "ebay-fee-estimator": {
    style: "ledger",
    heading: "Understand the fee before you price the item",
    context: [
      "An eBay selling fee can depend on the marketplace, seller type, category, subscription, performance and the amount the buyer pays. Start by selecting the listing site, then choose the seller profile and category that actually apply. This calculator has reviewed official schedules for supported US, UK and AU combinations. Other markets and unsupported account combinations need the rates from your own current fee statement.",
      "The amount used to calculate a percentage fee can include buyer-paid shipping and, under some schedules, buyer-collected tax. Tax collected for the buyer is not your sale revenue here. The result separates native marketplace fees from optional charges you enter and shows estimated payout before product or delivery costs. If your real transaction has a different fee base, use manual mode and record the reason. Store and Shop plans should match your account rather than an attractive-looking preset.",
    ],
    formulaLabel: "Manual-rate model",
    formula: "Estimated fee = applicable percentage × entered fee base + fixed charge + additional entered charges.",
    workedExample: "Hypothetical manual-rate example: a $40 item with $5 buyer-paid shipping creates $45 of buyer revenue. At an entered 10% fee on that amount plus a $0.30 fixed charge, the estimate is $4.80 in fees and $40.20 in seller payout. Product cost, delivery and returns still need to come out of that payout. If buyer-collected tax is part of your real fee base, the percentage charge could be higher even though that tax is not seller revenue. This example illustrates arithmetic, not a published rate for any category or marketplace; use your current account schedule for a real listing.",
    decision: "Compare the line items with a recent eBay transaction in the same marketplace and category. A payout estimate is not profit; open the Profit Calculator to subtract sourcing and fulfilment costs.",
  },
  "profit-margin-calculator": {
    style: "ledger",
    heading: "See what stays after the order is fulfilled",
    context: [
      "Revenue is the item price plus any shipping paid by the buyer. Landed supplier cost combines the selected product, supplier freight and applicable purchase tax you enter. The calculator then subtracts marketplace charges, advertising assumptions and other fulfilment expense. Keep the same currency throughout, and avoid entering the same freight or tax twice. A supplier parent-page starting price is not the cost of a selected variation.",
      "Margin and ROI answer different questions. Margin compares net profit with buyer revenue; ROI compares it with landed supplier cost. A strong ROI can coexist with a modest margin if the denominator is small. In target-profit mode, the tool searches for the lowest cent of item price that meets your chosen net amount under the selected fee rules. That price is a calculation, not proof that a buyer will accept it. Revisit the estimate when fees, destination shipping or supplier cost changes.",
    ],
    formulaLabel: "Profit bridge",
    formula: "Revenue − landed supplier cost − eBay fees − ads − fulfilment expense = estimated net profit.",
    workedExample: "Consider a hypothetical $40 item with $5 buyer-paid shipping: revenue is $45. Suppose the exact product costs $18, supplier freight is $3, seller postage is $5, marketplace charges are $5 and an attributed ad charge is $2. Estimated net profit is $12. Margin is $12 ÷ $45, or 26.7%; ROI on the $21 landed supplier cost is 57.1%. Neither percentage includes a cost you leave blank. If purchase tax is already in the $18 product figure, adding it again would make the estimate too low; if the supplier changes its freight by destination, the same listing price can produce a different result.",
    decision: "If the outcome changes sharply when you add postage, ads or purchase tax, keep those assumptions visible in the saved comparison. Check an actual order later to see which estimate was too low.",
  },
  "title-length-checker": {
    style: "utility",
    heading: "Fit a truthful product description into the title",
    context: [
      "eBay's standard title field allows 80 characters. This counter updates while you type and counts Unicode code points, which is more useful than counting bytes. The title should identify the actual item first: product type, brand when verified, model, and a few defining attributes such as size, color or pack count. The buyer should recognize the selected variation from the words you use.",
      "Space is scarce, so replace vague promotion words with product facts. An illustrative before-and-after: ‘Amazing Fast Charging Cable Best Deal’ tells little about the item, while ‘USB-C to USB-C Cable 1 m Black 2-Pack’ identifies a hypothetical product more clearly. Use only attributes you can verify; the example is not a real listing. A title that fits the counter can still be inaccurate, misleading or out of step with the listing's item specifics.",
    ],
    formulaLabel: "Live title check",
    formula: "Remaining characters = 80 − the Unicode characters in your draft title.",
    decision: "Read the title beside the product photo and variation selector. Remove repetition before removing a model number or pack quantity that helps buyers distinguish the item.",
  },
  "ebay-break-even-calculator": {
    style: "decision",
    heading: "Know the cost floor before choosing a price",
    context: [
      "Break-even means the item price that covers the costs and manual selling fee assumptions entered in this form. Product cost, supplier shipping, seller postage, purchase tax, other expense and a fixed transaction charge all contribute to the fixed-cost side. A percentage selling fee takes a share of the sale price, so the price must cover both the fixed total and that variable fee. The tool rounds the threshold up to the next cent.",
      "A cost floor is not a selling-price recommendation. It leaves no planned profit and may omit returns, advertising or other charges that you have not entered. The optional target-profit field shows a second price that includes your chosen net amount, while ‘Price to test’ lets you inspect a candidate price against the floor. If the fee percentage reaches 100%, no finite positive price can cover the same percentage-based charge.",
    ],
    formulaLabel: "Cost floor",
    formula: "Break-even item price = entered fixed costs ÷ (1 − entered selling-fee rate).",
    decision: "Compare the calculated floor with genuinely comparable sold prices, then test room for profit and uncertainty. Do not treat break-even as evidence of market demand.",
  },
  "ebay-promoted-listings-calculator": {
    style: "comparison",
    heading: "See how an ad charge changes one sale",
    context: [
      "This calculator compares the same order before and after an advertising charge. Enter an assumed General ad percentage or a known fixed advertising amount, along with your selling price, product cost and manual selling fee. The percentage is applied to the entered sale revenue in this model; a fixed amount can represent a cost you assign to the order. It does not fetch campaign data or model clicks.",
      "eBay has different campaign strategies and charging rules. General campaigns charge on attributed sales under current terms, while Priority campaigns can charge per click. A campaign report is the source for what was actually charged. The displayed break-even ad allowance is simply the profit available before ads under your inputs; it is not a safe suggested ad rate or a forecast of additional sales. Keep attribution and fee-base differences in mind when comparing with a live campaign.",
    ],
    formulaLabel: "Ad impact",
    formula: "Profit after advertising = profit before advertising − entered ad percentage cost − entered fixed ad cost.",
    decision: "Try a higher-cost scenario before changing campaign settings. A sale can remain profitable in this arithmetic while the campaign as a whole performs differently.",
  },
  "ebay-best-offer-calculator": {
    style: "decision",
    heading: "Set an offer floor from your own costs",
    context: [
      "A buyer's offer changes the item-price revenue, but most product and fulfilment costs remain. Enter the current listing price, offered item price, any buyer-paid shipping, your costs and a manual selling fee. The calculator shows the offered discount, estimated profit and the smallest offer that reaches your chosen minimum profit under those assumptions. It does not send an offer or set automatic responses in eBay.",
      "Compare the floor with the actual offer before deciding whether to accept, decline or counter. A counteroffer may need room for further negotiation, but the arithmetic cannot tell you the buyer's willingness to pay. Recheck the selected supplier variation and postage for the buyer's destination; a small cost change can move the floor. If an advertising charge or tax applies to the accepted offer, include it in your wider profit check rather than assuming this simpler tool accounts for it.",
    ],
    formulaLabel: "Offer floor",
    formula: "Minimum offer solves for entered costs + desired profit after the manual percentage fee and buyer-paid shipping.",
    decision: "Use the result as a private decision aid. eBay's Best Offer controls and any automatic acceptance settings remain separate from this page.",
  },
  "ebay-shipping-profit-calculator": {
    style: "comparison",
    heading: "Compare two delivery prices on equal terms",
    context: [
      "The free-shipping scenario and the buyer-paid scenario use the same item price, product cost and postage expense. Only the amount charged to the buyer for shipping changes. That extra amount adds revenue, while the entered percentage selling fee also applies to the increased buyer payment in this model. Supplier freight remains a sourcing cost; seller-paid postage remains a fulfilment cost in both scenarios.",
      "For an illustrative $40 item with $5 charged shipping, the paid-shipping scenario adds $5 to the buyer's payment, but a percentage fee can absorb part of the increase. The difference in displayed profit is not a conversion forecast. Buyers may respond differently to a $40 free-shipping listing and a $40 plus $5 shipping listing, and this tool does not estimate that behavior. Use the same destination and fulfilment method when entering costs for a fair comparison.",
    ],
    formulaLabel: "Scenario difference",
    formula: "Buyer-paid profit − free-shipping profit = entered shipping charge after its assumed percentage-fee effect.",
    decision: "Check the total amount a buyer sees as well as your estimated profit. If your postage varies by postcode, repeat the comparison for the destinations you serve.",
  },
  "ebay-sell-through-rate-calculator": {
    style: "comparison",
    heading: "Keep the sold count tied to its evidence",
    context: [
      "Enter legitimately observed sold units for one product definition and time window, then enter a comparable active-listing count from the same eBay marketplace. The tool uses sold divided by sold plus active. Another common ratio uses sold divided by active, so write down the formula when sharing the result. The calculator does not fetch eBay data and cannot tell whether a count belongs to the exact color, size or pack you plan to sell.",
      "A parent listing's lifetime sold badge should not be relabeled as 30-day sales of one child variation. Save the search query, exclusions, marketplace, period and observation time outside this calculator. If the sold set mixes used items, accessories or other pack sizes, refine the evidence before interpreting the percentage. Product Research can provide a separate eBay metric; do not present this manually calculated ratio as that official figure.",
    ],
    formulaLabel: "This tool's definition",
    formula: "Sell-through ratio = sold count ÷ (sold count + active-listing count) × 100.",
    decision: "Use the percentage as a screening signal alongside price, competition and exact-variation proof. If the source counts are uncertain, the precise-looking output is uncertain too.",
  },
  "ebay-image-resizer": {
    style: "utility",
    heading: "Keep the product clear while changing the file",
    context: [
      "Choose a JPEG, PNG or WebP image you may use, then set target pixel dimensions. With aspect lock enabled, changing one dimension updates the other in the original proportions. This avoids stretching the item. The quality slider affects JPEG and WebP export; PNG ignores it. JPEG fills transparent areas white in this browser tool. Preview the actual product after each change, especially labels, texture and included accessories.",
      "A 2400 × 1600 source resized with its proportions protected to 1200 pixels wide becomes 1200 × 800. That is an illustrative dimension calculation, not a quality guarantee. Enlarging a small source cannot recover detail that was never captured. eBay's picture guidance asks for clear, high-resolution images; check the current marketplace requirements and the file accepted by the listing editor. Resizing does not grant image rights or make a misleading photo accurate.",
    ],
    formulaLabel: "Proportion check",
    formula: "With aspect lock on, output height follows output width × original height ÷ original width.",
    decision: "Download only after the before-and-after preview shows the same item clearly. Check the final eBay listing preview for crop, background and resolution before publishing.",
  },
  "ebay-html-description-cleaner": {
    style: "utility",
    heading: "Keep readable content; remove risky markup",
    context: [
      "Paste an HTML description draft you are permitted to use. The browser sanitizer keeps a conservative set of paragraphs, headings, emphasis, lists, links and tables while removing scripts, forms, embeds, inline handlers and styling. This reduces clutter from copied editor output and helps you inspect the text that remains. It does not connect to eBay, publish a listing or evaluate whether product claims are true.",
      "A simple before-and-after example is a paragraph with an inline color style and a script tag: the cleaned result can keep the paragraph's wording while removing the styling and script content. Inspect both the markup and the safe visual preview because a stripped table style may change readability. Links that remain should still be reviewed for destination and marketplace rules. Paste the result into eBay's own editor and confirm headings, lists, images and spacing there before use.",
    ],
    formulaLabel: "Cleaning boundary",
    formula: "Allowed readable tags remain; unsupported tags and attributes are removed by the browser sanitizer.",
    decision: "Treat the output as a draft. Correct product details and check the final buyer-facing preview before copying it into a live listing.",
  },
};
