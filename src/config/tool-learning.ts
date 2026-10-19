export type ToolLearning = {
  steps: readonly string[];
  mistake: string;
  faq: readonly { question: string; answer: string }[];
  source: { label: string; href: string };
};

const feeSource = { label: "eBay US selling fees", href: "https://www.ebay.com/help/selling-fees/selling/selling-fees?id=4822" };
const listingSource = { label: "eBay listing guidance", href: "https://www.ebay.com/help/selling/listings" };

export const toolLearning: Record<string, ToolLearning> = {
  "ebay-fee-estimator": {
    steps: ["Choose the listing marketplace and the seller profile that matches your account.", "Confirm the category and any Store, Shop, Pro, international or performance conditions; use manual mode when the preset is not eligible.", "Compare the fee lines and estimated payout with a current transaction or official fee table."],
    mistake: "A published percentage is rarely the whole charge. Fixed order fees, buyer-paid shipping, tax in a fee base and account-specific extras can change the total.",
    faq: [{ question: "Is the seller payout my profit?", answer: "No. Payout is revenue after the estimated eBay fees; supplier cost, postage and other expenses still need to be subtracted." }, { question: "Why did the tool switch to manual fees?", answer: "The selected account or marketplace combination is outside the reviewed preset. Enter the rates that apply to your account rather than assuming a universal fee." }],
    source: feeSource,
  },
  "profit-margin-calculator": {
    steps: ["Enter the actual listing price and one consistent currency.", "Add the exact supplier variant cost, destination shipping, applicable tax, fees and optional advertising assumptions.", "Read profit, margin and ROI separately; compare the estimate with actual order statements later."],
    mistake: "Supplier shipping, buyer-paid shipping, fees on the full transaction and returns reserves are often omitted. Label any estimated input.",
    faq: [{ question: "Is margin the same as ROI?", answer: "No. Margin divides profit by revenue; ROI divides profit by the chosen investment denominator. This tool uses landed supplier cost." }, { question: "Does the tool verify my fee rate?", answer: "No. Confirm your marketplace, category and seller terms before relying on the result." }], source: feeSource,
  },
  "title-length-checker": {
    steps: ["Draft a truthful title for the exact product and variation.", "Check the displayed character count and remove repetition or vague words.", "Review brand, condition and item specifics against the item before listing."],
    mistake: "A title can fit the character limit while still containing unsupported claims or the wrong variation.",
    faq: [{ question: "Will a valid length improve ranking?", answer: "No. This tool only counts characters; it does not predict search placement." }, { question: "Does it verify listing policy?", answer: "No. Review the current rules in your eBay listing flow." }], source: listingSource,
  },
  "ebay-break-even-calculator": {
    steps: ["Enter the exact product and fulfillment costs in one currency.", "Add the applicable percentage and fixed fee assumptions.", "Check the first currency increment that covers costs; add a separate profit target if you need one."],
    mistake: "Break-even is not a recommended selling price. Advertising, refunds, returns and fee tiers can move the real threshold.",
    faq: [{ question: "Does break-even include a profit target?", answer: "No. It identifies the entered-cost threshold. Choose a separate target profit." }, { question: "Why can the result be unavailable?", answer: "A 100% or greater entered fee rate cannot leave a finite positive amount after percentage fees." }], source: feeSource,
  },
  "ebay-promoted-listings-calculator": {
    steps: ["Calculate the base order profit first.", "Enter an ad percentage or a known fixed advertising cost for the scenario.", "Compare before-ad and after-ad results; reconcile against real eBay advertising charges."],
    mistake: "Different eBay ad products can use different charging and attribution rules. A hypothetical ad rate is not a forecast of traffic or sales.",
    faq: [{ question: "Does this predict campaign results?", answer: "No. It shows the arithmetic effect of the ad-cost assumption you enter." }, { question: "Can an accepted Best Offer still incur an ad fee?", answer: "It can under applicable attribution rules. Check your current campaign terms." }], source: { label: "eBay Promoted Listings overview", href: "https://www.ebay.com/help/selling/promoted-listings/promoted-listings-standard?id=5295" },
  },
  "ebay-best-offer-calculator": {
    steps: ["Enter the current listing price and the buyer's offer.", "Add costs, the applicable fee assumptions and the minimum profit you need.", "Compare the offer to the calculated floor before deciding in eBay."],
    mistake: "A minimum acceptable offer is a financial threshold, not an automatic acceptance rule. Shipping, tax and ad fees may alter the result.",
    faq: [{ question: "Will this accept or decline offers in eBay?", answer: "No. It is an independent planning tool." }, { question: "Can I counteroffer?", answer: "eBay's Best Offer flow may allow a counteroffer, subject to its current terms." }], source: { label: "eBay Best Offer guidance", href: "https://www.ebay.com/help/selling/listings/listing-basics?id=4144" },
  },
  "ebay-shipping-profit-calculator": {
    steps: ["Use the same product price and fulfillment cost in both scenarios.", "Enter buyer-paid shipping only in the charged-shipping scenario.", "Compare net profit after any fee effect on the amount the buyer pays."],
    mistake: "Charging shipping adds revenue but can also increase a percentage fee. Supplier freight and the postage paid to fulfill the order are costs in either scenario.",
    faq: [{ question: "Is free shipping cost-free?", answer: "No. The seller still needs to fund the actual delivery cost." }, { question: "Does eBay charge fees on buyer-paid shipping?", answer: "Fee bases vary by market and category. Check the current local fee terms." }], source: feeSource,
  },
  "ebay-sell-through-rate-calculator": {
    steps: ["Define the exact product, variation, marketplace and evidence period.", "Enter legitimately observed sold results and a comparable active count.", "Interpret the resulting ratio as one demand indicator, with source and observation date recorded separately."],
    mistake: "Active listings are not sold units. Mixing variants or periods makes the comparison unreliable.",
    faq: [{ question: "Does this fetch sold data?", answer: "No. It computes a ratio from counts you supply." }, { question: "Is this eBay's official sell-through metric?", answer: "No. It uses the stated sold divided by sold plus active definition; other tools may use another definition." }], source: { label: "eBay Product Research", href: "https://www.ebay.com/help/selling/selling-tools/product-research?id=4853" },
  },
  "ebay-image-resizer": {
    steps: ["Choose an image you have permission to use.", "Set dimensions and format while preserving the product's truthful appearance.", "Download and inspect the result in the actual eBay listing editor."],
    mistake: "Compression can blur labels or remove metadata, and JPEG cannot preserve transparency. Resizing does not grant image rights.",
    faq: [{ question: "Are uploads sent to eCommPilot?", answer: "This tool processes the selected image in your browser." }, { question: "Does the tool guarantee eBay compliance?", answer: "No. Check the current image requirements and the final listing preview." }], source: { label: "eBay picture guidance", href: "https://www.ebay.com/help/selling/listings/creating-managing-listings/x?id=4148" },
  },
  "ebay-html-description-cleaner": {
    steps: ["Paste a description draft you are permitted to use.", "Review the cleaned markup and visible text before copying it.", "Paste into eBay's editor and inspect the published preview for accuracy and accessibility."],
    mistake: "Sanitized HTML can still contain incorrect claims or missing product details. It is not a policy or compliance checker.",
    faq: [{ question: "Does this preserve scripts and embeds?", answer: "No. The tool removes unsafe or unsupported markup using an allowlist." }, { question: "Does this publish a listing?", answer: "No. It only prepares text for manual review and use." }], source: listingSource,
  },
};
