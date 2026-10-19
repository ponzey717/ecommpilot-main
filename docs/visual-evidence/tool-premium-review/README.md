# Free tools premium content and UX review — 19 October 2026

This folder records the ten-tool pass on `growth/content-foundation-20261018`. `before` was captured from `34dcba3a6bda0ecb105e02143f4d5ec23818d353`; `after` was captured from the working branch. Both sets use the same browser, 390 px mobile and 1440 px desktop viewports, and full-page JPEG capture. The additional 360 px and 768 px views were checked for overflow and interaction.

| Tool | Visible supporting words* | Main content improvement | Mobile before / after | Desktop before / after |
| --- | ---: | --- | --- | --- |
| [Fee Calculator](/free-tools/ebay-fee-estimator) | ~553 | Fee base, account and category assumptions, payout distinction and worked manual-rate example | [Before](before/ebay-fee-estimator-390.jpg) / [After](after/ebay-fee-estimator-390.jpg) | [Before](before/ebay-fee-estimator-1440.jpg) / [After](after/ebay-fee-estimator-1440.jpg) |
| [Profit Calculator](/free-tools/profit-margin-calculator) | ~550 | Cost bridge, margin versus ROI, target mode limits and worked order example | [Before](before/profit-margin-calculator-390.jpg) / [After](after/profit-margin-calculator-390.jpg) | [Before](before/profit-margin-calculator-1440.jpg) / [After](after/profit-margin-calculator-1440.jpg) |
| [Title Checker](/free-tools/title-length-checker) | ~396 | Accurate product identity, Unicode count and a before/after title example | [Before](before/title-length-checker-390.jpg) / [After](after/title-length-checker-390.jpg) | [Before](before/title-length-checker-1440.jpg) / [After](after/title-length-checker-1440.jpg) |
| [Break-Even Calculator](/free-tools/ebay-break-even-calculator) | ~420 | Cost floor formula, target-price distinction and unentered-cost caveat | [Before](before/ebay-break-even-calculator-390.jpg) / [After](after/ebay-break-even-calculator-390.jpg) | [Before](before/ebay-break-even-calculator-1440.jpg) / [After](after/ebay-break-even-calculator-1440.jpg) |
| [Promoted Listings Calculator](/free-tools/ebay-promoted-listings-calculator) | ~416 | Before/after ad cost, General versus fixed cost and attribution caveats | [Before](before/ebay-promoted-listings-calculator-390.jpg) / [After](after/ebay-promoted-listings-calculator-390.jpg) | [Before](before/ebay-promoted-listings-calculator-1440.jpg) / [After](after/ebay-promoted-listings-calculator-1440.jpg) |
| [Best Offer Calculator](/free-tools/ebay-best-offer-calculator) | ~417 | Offer floor, original-price comparison and counteroffer context | [Before](before/ebay-best-offer-calculator-390.jpg) / [After](after/ebay-best-offer-calculator-390.jpg) | [Before](before/ebay-best-offer-calculator-1440.jpg) / [After](after/ebay-best-offer-calculator-1440.jpg) |
| [Shipping Profit Calculator](/free-tools/ebay-shipping-profit-calculator) | ~409 | Buyer charge versus seller postage and a two-scenario example | [Before](before/ebay-shipping-profit-calculator-390.jpg) / [After](after/ebay-shipping-profit-calculator-390.jpg) | [Before](before/ebay-shipping-profit-calculator-1440.jpg) / [After](after/ebay-shipping-profit-calculator-1440.jpg) |
| [Sell-Through Calculator](/free-tools/ebay-sell-through-rate-calculator) | ~405 | Explicit formula, period and variation provenance, official-metric distinction | [Before](before/ebay-sell-through-rate-calculator-390.jpg) / [After](after/ebay-sell-through-rate-calculator-390.jpg) | [Before](before/ebay-sell-through-rate-calculator-1440.jpg) / [After](after/ebay-sell-through-rate-calculator-1440.jpg) |
| [Image Resizer](/free-tools/ebay-image-resizer) | ~398 | Aspect ratio, transparency, format and quality tradeoffs, practical example | [Before](before/ebay-image-resizer-390.jpg) / [After](after/ebay-image-resizer-390.jpg) | [Before](before/ebay-image-resizer-1440.jpg) / [After](after/ebay-image-resizer-1440.jpg) |
| [HTML Cleaner](/free-tools/ebay-html-description-cleaner) | ~399 | Sanitization boundary, removed markup, safe preview and editor checks | [Before](before/ebay-html-description-cleaner-390.jpg) / [After](after/ebay-html-description-cleaner-390.jpg) | [Before](before/ebay-html-description-cleaner-1440.jpg) / [After](after/ebay-html-description-cleaner-1440.jpg) |

*Approximate visible words in the hero description, result explanation and below-tool guide. This excludes form labels, navigation, FAQ answers while collapsed and hidden UI. The complex fee and profit guides exceed 600 words when their crawlable FAQ answers are included. Length follows the tool's intent rather than an exact quota.

## Search intent and source review

`src/config/tool-seo.ts` owns unique primary and secondary keywords, titles and descriptions. The corresponding ten `TOOL` rows in `docs/KEYWORD_MASTER_MAP.csv` use the same ownership. Fee calculation and profit calculation have separate primary targets; title length and listing guidance remain separate; sell-through arithmetic is described as manually entered evidence. The Learn manuscripts remain in review.

| Tool | Primary keyword | Secondary intent | Metadata change |
| --- | --- | --- | --- |
| Fee | eBay fee calculator | selling fees; final value fee estimate | US/UK/AU supported schedules or entered rates |
| Profit | eBay profit calculator | margin; ROI | net profit and target-profit mode |
| Title | eBay title length checker | character counter; 80-character title | live count and accurate listing title |
| Break-even | eBay break-even calculator | sale price floor; cost floor | first price covering entered costs |
| Promoted Listings | eBay Promoted Listings calculator | ad cost; promoted-sale profit | profit before and after ad assumptions |
| Best Offer | eBay Best Offer calculator | minimum offer; counteroffer planning | offer against costs and desired profit |
| Shipping | eBay shipping profit calculator | free shipping; buyer-paid shipping | matched-scenario delivery comparison |
| Sell-through | eBay sell-through rate calculator | sold/active ratio; demand ratio | manually entered counts and evidence scope |
| Image | eBay image resizer | listing photo resize; image compression | browser-local format and ratio controls |
| HTML | eBay HTML description cleaner | cleaning listing HTML; sanitizing description | browser-local markup cleanup and preview |

Each page has a unique title tag and natural description in `src/config/tool-seo.ts`, while retaining its existing canonical URL, one H1, `SoftwareApplication` and `BreadcrumbList` schema. FAQ rich-result markup was not added.

Current search-result checks showed fee and profit competitors often combine marketplace presets with a net-payout answer, while sell-through tools vary in formula definition. This pass makes the fee assumptions, denominators and evidence limits explicit at the result. It does not import any competitor text or claim a ranking/volume figure. Spot-checked comparable pages: [Doba fee and profit tool](https://www.doba.com/free-tools/ebay-fees-calculator), [3Dsellers US fee calculator](https://www.3dsellers.com/fee-calculators/us-ebay-fee-calculator), and [FlowLister sell-through calculator](https://flowlister.com/tools/sell-through-rate-calculator/).

Official rule links are placed on the relevant tool pages. The core checks used [US selling fees](https://www.ebay.com/help/selling-fees/selling/selling-fees?id=4822), [UK business seller fees](https://www.ebay.co.uk/help/selling/fees-credits-invoices/selling-fees?id=4809), [AU selling fees](https://www.ebay.com.au/help/selling/fees-credits-invoices/selling-fees?id=4822), and the tool-specific eBay source stored in `src/config/tool-learning.ts`. The calculators retain their existing formulas and fee schedules; the written examples are labeled hypothetical.

## Field help coverage

`src/config/tool-field-help.ts` holds guidance for the 18-market selector, item/SKU/period labels, all numeric inputs, fee mode and profit mode, category and account selectors, registration and international switches, performance/VAT, percentage bases, title draft, image file/dimensions/format/quality/aspect ratio, HTML input/output and key result metrics. Seller-profile text responds to US, UK and AU selections. Every help icon opens a real popover by click, tap or keyboard; Escape closes it and returns focus. Short essential hints stay visible near relevant controls. Output values that are already self-explanatory, action buttons, file previews and navigation do not get redundant icons.

`scripts/tool-premium-qa.mjs` checks all ten pages at 360, 390, 768 and 1440 px, including one help popover per page, H1, canonical and horizontal overflow. `scripts/tool-interaction-qa.mjs` exercises calculator examples, fee market switching, target-profit mode, title count, HTML cleaning and image resizing. Screenshots were captured from the initial tool state to make layouts comparable.
