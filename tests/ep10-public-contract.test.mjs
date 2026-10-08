import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function source(path) {
  return readFile(new URL("../" + path, import.meta.url), "utf8");
}

test("locked primary navigation and homepage positioning remain present", async () => {
  const [header, home] = await Promise.all([
    source("src/components/site/header.tsx"),
    source("src/app/page.tsx"),
  ]);
  for (const label of [
    "Winning Products",
    "What's Trending",
    "How It Works",
    "Pricing",
    "Learn",
  ]) assert.ok(header.includes(label), label);
  assert.ok(header.includes("Login"));
  assert.ok(header.includes("Get Started"));
  assert.ok(home.includes("Stop Searching. Start Listing Winning eBay Products."));
  assert.ok(home.includes("You only need your eBay account. We handle the product work."));
  assert.ok(home.includes("Your eBay account is ready. Your products should be too."));
  assert.ok(home.includes("See How It Works"));
  const shell = await source("src/components/site/page-shell.tsx");
  assert.ok(shell.includes('href="#main-content"'));
  assert.ok(shell.includes('id="main-content"'));
});

test("public catalog adapter matches app query names and never sends bearer credentials", async () => {
  const api = await source("src/lib/api/public-catalog.ts");
  for (const name of [
    "minimumProfitBand",
    "maximumDeliveryDays",
    "minimumSales30d",
    "freshnessHours",
    "sort",
    "search",
  ]) assert.ok(api.includes(name), name);
  assert.equal(api.includes("Authorization"), false);
  assert.equal(api.includes("ECOMMPILOT_API_TOKEN"), false);
  assert.ok(api.includes("public-v1"));
});

test("final catalog has no demo fallback and Trending uses real sold-demand sort", async () => {
  const [grid, trending] = await Promise.all([
    source("src/components/products/catalog-product-grid.tsx"),
    source("src/app/whats-trending/page.tsx"),
  ]);
  assert.equal(grid.includes('from "@/components/products/product-grid"'), false);
  assert.equal(grid.includes("demo-products"), false);
  assert.ok(trending.includes('sort="most_sold"'));
  assert.ok(trending.includes("30-day"));
  assert.ok(trending.includes("SOLD evidence"));
  assert.ok(trending.includes("hidden trend score"));
});

test("catalog filters are URL-driven and include market supplier profit sold delivery freshness and sort", async () => {
  const [filters, parser] = await Promise.all([
    source("src/components/products/market-filter.tsx"),
    source("src/lib/catalog-filters.ts"),
  ]);
  for (const label of ["Market", "Supplier", "Minimum profit", "30-day SOLD", "Max delivery", "Freshness", "Sort"]) {
    assert.ok(filters.includes(label), label);
  }
  assert.ok(parser.includes("publicProfitBands"));
  assert.ok(parser.includes("publicSalesThresholds"));
  assert.ok(parser.includes("publicDeliveryThresholds"));
  assert.ok(parser.includes("publicFreshnessThresholds"));
  assert.ok(parser.includes("[30, 50, 100, 250, 500]"));
  assert.equal(parser.includes("[20, 30, 50, 100, 250, 500]"), false);
  assert.ok(parser.includes('"aliexpress" as const'));
  assert.ok(parser.includes('query.set("supplier", value.supplier)'));
  assert.ok(parser.includes("most_sold"));
  assert.ok(parser.includes("highest_profit"));
});

test("public product page keeps protected sourcing data behind the app boundary", async () => {
  const detail = await source("src/app/winning-products/[market]/[category]/[slug]/page.tsx");
  assert.ok(detail.includes("Private supplier URLs"));
  assert.ok(detail.includes("protected costs"));
  assert.equal(detail.includes("supplier.productUrl"), false);
  assert.equal(detail.includes("supplier.storeUrl"), false);
  assert.equal(detail.includes("supplier.variantId"), false);
});

test("remote product imagery uses an explicit HTTPS host allowlist", async () => {
  const [config, helper, card] = await Promise.all([
    source("next.config.ts"),
    source("src/lib/public-image.ts"),
    source("src/components/products/public-product-card.tsx"),
  ]);
  assert.ok(config.includes("ECOMMPILOT_PUBLIC_IMAGE_HOSTS"));
  assert.ok(config.includes("media.ecommpilot.net"));
  assert.ok(helper.includes('parsed.protocol !== "https:"'));
  assert.ok(helper.includes("configuredHosts().includes"));
  assert.ok(card.includes("approvedPublicImageUrl"));
  assert.equal(card.includes('parsed.hostname === "media.ecommpilot.net"'), false);
});

test("sitemap derives category and product routes from the public catalog", async () => {
  const sitemap = await source("src/app/sitemap.ts");
  assert.ok(sitemap.includes("getPublicCategories"));
  assert.ok(sitemap.includes("getPublicProducts"));
  assert.ok(sitemap.includes("nextCursor"));
  assert.ok(sitemap.includes("whats-trending"));
  assert.ok(sitemap.includes("privacy"));
  assert.ok(sitemap.includes("terms"));
  assert.ok(sitemap.includes("data-deletion"));
});


test("catalog outage stays distinct from empty and product not-found states", async () => {
  const [api, grid, categories, categoryPage, productPage] = await Promise.all([
    source("src/lib/api/public-catalog.ts"),
    source("src/components/products/catalog-product-grid.tsx"),
    source("src/app/categories/page.tsx"),
    source("src/app/winning-products/[market]/[category]/page.tsx"),
    source("src/app/winning-products/[market]/[category]/[slug]/page.tsx"),
  ]);
  assert.ok(api.includes("getPublicProductState"));
  assert.ok(api.includes("result.status !== 404"));
  assert.ok(grid.includes("Catalog temporarily unavailable"));
  assert.ok(categories.includes("Categories temporarily unavailable"));
  assert.ok(categoryPage.includes('kind: "unavailable"'));
  assert.ok(productPage.includes("state.unavailable"));
  assert.ok(productPage.includes("Product data is temporarily unavailable."));
});


test("Winning Products category search and supplier preserve the active server filters", async () => {
  const [form, grid, hub, market] = await Promise.all([
    source("src/components/products/catalog-query-form.tsx"),
    source("src/components/products/catalog-product-grid.tsx"),
    source("src/app/winning-products/page.tsx"),
    source("src/app/winning-products/[market]/page.tsx"),
  ]);
  assert.ok(form.includes('name="category"'));
  assert.ok(form.includes('name="search"'));
  assert.ok(form.includes('name="supplier"'));
  assert.ok(form.includes('name="freshness"'));
  assert.ok(form.includes('name="sort"'));
  assert.ok(form.includes("categoriesUnavailable && filters.category"));
  assert.ok(form.includes("Choose a market first"));
  assert.equal(hub.includes("getPublicCategories()"), false);
  assert.ok(hub.includes("const filters = { ...parsedFilters, category: undefined }"));
  assert.equal(hub.includes("category={filters.category}"), false);
  assert.ok(hub.includes("search={filters.search}"));
  assert.ok(hub.includes("supplier={filters.supplier}"));
  assert.ok(hub.includes("freshnessHours={filters.freshness}"));
  assert.ok(market.includes("category={filters.category}"));
  assert.ok(market.includes("search={filters.search}"));
  assert.ok(market.includes("supplier={filters.supplier}"));
  assert.ok(market.includes("freshnessHours={filters.freshness}"));
  assert.ok(grid.includes('nextQuery.set("supplier", supplier)'));
  assert.ok(grid.includes('nextQuery.set("category", category)'));
  assert.ok(grid.includes('nextQuery.set("search", search)'));
});


test("public calculators are US UK AU aware and do not hardcode a universal fee rate", async () => {
  const calculators = await source("src/components/tools/calculators.tsx");
  for (const currency of ["USD", "GBP", "AUD"]) {
    assert.ok(calculators.includes(currency), currency);
  }
  assert.ok(calculators.includes("Mandatory fixed transaction fees"));
  assert.ok(calculators.includes("Fixed transaction fee (if any)"));
  assert.ok(calculators.includes('useState("")'));
  assert.equal(calculators.includes('useState("13.25")'), false);
  assert.ok(calculators.includes("Optional promoted-listing or ad spend is not included."));
  assert.ok(calculators.includes('max={100}'));
});


test("legacy WordPress URLs are preserved or permanently redirected", async () => {
  const [config, footer, deletion] = await Promise.all([
    source("next.config.ts"),
    source("src/components/site/footer.tsx"),
    source("src/app/data-deletion/page.tsx"),
  ]);
  for (const legacy of [
    "/wp-sitemap.xml",
    "/wp-sitemap-posts-page-1.xml",
    "/wp-sitemap-users-1.xml",
    "/author/amzee459/:path*",
  ]) assert.ok(config.includes(legacy), legacy);
  assert.ok(config.includes('destination: "/sitemap.xml"'));
  assert.ok(config.includes('destination: "/about"'));
  assert.ok(config.includes("permanent: true"));
  assert.ok(footer.includes("Data Deletion"));
  assert.ok(deletion.includes("app.ecommpilot.net/data-deletion"));
});


test("public legal pages preserve the current policy substance", async () => {
  const [privacy, terms, deletion] = await Promise.all([
    source("src/app/privacy/page.tsx"),
    source("src/app/terms/page.tsx"),
    source("src/app/data-deletion/page.tsx"),
  ]);

  for (const page of [privacy, terms, deletion]) {
    assert.ok(page.includes("Last updated: 14 September 2026"));
    assert.ok(page.includes('import type { ReactNode } from "react"'));
    assert.equal(page.includes("React.ReactNode"), false);
  }

  assert.ok(privacy.includes("eBay data and marketplace account deletion"));
  assert.ok(privacy.includes("We do not sell personal information"));
  assert.ok(privacy.includes("Cookies and browser storage"));

  assert.ok(terms.includes("Acceptable use"));
  assert.ok(terms.includes("AI-assisted features"));
  assert.ok(terms.includes("Disclaimer and limitation"));

  assert.ok(deletion.includes("eBay Marketplace Account Deletion/Closure"));
  assert.ok(deletion.includes("must not be"));
  assert.ok(deletion.includes("restored or reintroduced from backups"));
  assert.ok(deletion.includes("Identity and authorization checks"));
});


test("public indexing fails closed until production approval", async () => {
  const [indexing, root, metadata, robots] = await Promise.all([
    source("src/lib/public-indexing.ts"),
    source("src/app/layout.tsx"),
    source("src/lib/seo/metadata.ts"),
    source("src/app/robots.ts"),
  ]);
  assert.ok(indexing.includes('ECOMMPILOT_PUBLIC_INDEXING_ENABLED === "true"'));
  assert.ok(root.includes("publicIndexingEnabled"));
  assert.ok(metadata.includes("publicIndexingEnabled"));
  assert.ok(metadata.includes("const canIndex = publicIndexingEnabled() && !noIndex"));
  assert.ok(robots.includes('disallow: "/"'));
  assert.ok(robots.includes('allow: "/"'));
});


test("public catalog search length matches the app DB contract", async () => {
  const [filters, form, trending, contract] = await Promise.all([
    source("src/lib/catalog-filters.ts"),
    source("src/components/products/catalog-query-form.tsx"),
    source("src/app/whats-trending/page.tsx"),
    source("docs/PUBLIC_API_CONTRACT.md"),
  ]);
  assert.ok(filters.includes("normalized.length <= 100"));
  assert.ok(form.includes("maxLength={100}"));
  assert.ok(trending.includes("maxLength={100}"));
  assert.ok(contract.includes("maximum 100 characters"));
  assert.equal(filters.includes("normalized.length <= 120"), false);
});
