# EP-13 marketplace fees and saved results

Implemented 13 October 2026 for the public website only.

## Fee-rule boundary

Automatic presets are enabled only for source-backed combinations in the US, UK and Australia. The other 15 selectable marketplaces always require the seller to enter the rates shown in their own eBay account. A seller-registration mismatch also forces manual mode.

The rules engine lives in `src/lib/tools/ebay-fees.ts`. Every verified result carries a source URL, review date and revision identifier. Supported inputs include category, seller profile, Store/Shop/Pro tier where applicable, buyer-collected tax in the fee base, international fees, seller-performance surcharges, UK VAT on eBay fees, and separately entered listing upgrades. Optional seller fees and fulfilment expenses accept either a fixed amount or a percentage with an explicit basis.

Official references:

- US selling fees: <https://www.ebay.com/help/selling/fees-credits-invoices/x?id=4822>
- UK business selling fees: <https://www.ebay.co.uk/help/selling/fees-credits-invoices/store-selling-fees?id=4809>
- UK private selling fees: <https://ocs.ebay.co.uk/help/selling-fees/selling/selling-fees?id=4822>
- AU non-Pro selling fees: <https://www.ebay.com.au/help/selling/fees-credits-invoices/fees-private-sellers?id=4822>
- AU Pro selling fees: <https://www.ebay.com.au/help/selling/fees-credits-invoices/pro-selling-fees?id=4809>

Unsupported categories, account-specific exceptions, Motors, authenticity programs and unverified international destinations remain manual. Rates must not be extended by analogy.

## Saved-result boundary

Each of the ten public tools can save immutable calculation snapshots in browser `localStorage`, with a 250-row limit per tool. Raw images and raw HTML are never stored. Mixed currencies remain labelled and are never totalled.

CSV and clipboard exports neutralize spreadsheet formula prefixes. PDF exports use the original transparent eCommPilot logo, repeat branded headers and page numbers, and link to the canonical live tool URL. The feature does not write to the member/admin database or expose private product data.
