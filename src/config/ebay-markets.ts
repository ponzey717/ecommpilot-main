export type CurrencyCode = "USD" | "GBP" | "EUR" | "CAD" | "AUD" | "CHF" | "PLN" | "HKD" | "SGD" | "MYR" | "PHP";
export type EbayMarketCode = "US" | "UK" | "DE" | "CA" | "AU" | "FR" | "IT" | "ES" | "IE" | "NL" | "BE" | "AT" | "CH" | "PL" | "HK" | "SG" | "MY" | "PH";

export type EbayMarket = {
  code: EbayMarketCode;
  name: string;
  site: string;
  flag: string;
  currency: CurrencyCode;
  locale: string;
  automaticFeeStatus: "verified" | "manual";
};

export const ebayMarkets: EbayMarket[] = [
  { code: "US", name: "United States", site: "ebay.com", flag: "us", currency: "USD", locale: "en-US", automaticFeeStatus: "verified" },
  { code: "UK", name: "United Kingdom", site: "ebay.co.uk", flag: "gb", currency: "GBP", locale: "en-GB", automaticFeeStatus: "verified" },
  { code: "DE", name: "Germany", site: "ebay.de", flag: "de", currency: "EUR", locale: "de-DE", automaticFeeStatus: "manual" },
  { code: "CA", name: "Canada", site: "ebay.ca", flag: "ca", currency: "CAD", locale: "en-CA", automaticFeeStatus: "manual" },
  { code: "AU", name: "Australia", site: "ebay.com.au", flag: "au", currency: "AUD", locale: "en-AU", automaticFeeStatus: "verified" },
  { code: "FR", name: "France", site: "ebay.fr", flag: "fr", currency: "EUR", locale: "fr-FR", automaticFeeStatus: "manual" },
  { code: "IT", name: "Italy", site: "ebay.it", flag: "it", currency: "EUR", locale: "it-IT", automaticFeeStatus: "manual" },
  { code: "ES", name: "Spain", site: "ebay.es", flag: "es", currency: "EUR", locale: "es-ES", automaticFeeStatus: "manual" },
  { code: "IE", name: "Ireland", site: "ebay.ie", flag: "ie", currency: "EUR", locale: "en-IE", automaticFeeStatus: "manual" },
  { code: "NL", name: "Netherlands", site: "ebay.nl", flag: "nl", currency: "EUR", locale: "nl-NL", automaticFeeStatus: "manual" },
  { code: "BE", name: "Belgium", site: "ebay.be", flag: "be", currency: "EUR", locale: "nl-BE", automaticFeeStatus: "manual" },
  { code: "AT", name: "Austria", site: "ebay.at", flag: "at", currency: "EUR", locale: "de-AT", automaticFeeStatus: "manual" },
  { code: "CH", name: "Switzerland", site: "ebay.ch", flag: "ch", currency: "CHF", locale: "de-CH", automaticFeeStatus: "manual" },
  { code: "PL", name: "Poland", site: "ebay.pl", flag: "pl", currency: "PLN", locale: "pl-PL", automaticFeeStatus: "manual" },
  { code: "HK", name: "Hong Kong", site: "ebay.com.hk", flag: "hk", currency: "HKD", locale: "en-HK", automaticFeeStatus: "manual" },
  { code: "SG", name: "Singapore", site: "ebay.com.sg", flag: "sg", currency: "SGD", locale: "en-SG", automaticFeeStatus: "manual" },
  { code: "MY", name: "Malaysia", site: "ebay.com.my", flag: "my", currency: "MYR", locale: "en-MY", automaticFeeStatus: "manual" },
  { code: "PH", name: "Philippines", site: "ebay.ph", flag: "ph", currency: "PHP", locale: "en-PH", automaticFeeStatus: "manual" },
];

export function getEbayMarket(code: EbayMarketCode) {
  return ebayMarkets.find((market) => market.code === code) ?? ebayMarkets[0];
}
