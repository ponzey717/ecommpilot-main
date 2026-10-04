import type { Metadata } from "next";
import { CatalogAdvancedFilters } from "@/components/products/catalog-advanced-filters";
import { CatalogProductGrid } from "@/components/products/catalog-product-grid";
import { MarketFilter } from "@/components/products/market-filter";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { PageHero } from "@/components/site/page-hero";
import { PageShell } from "@/components/site/page-shell";
import { parseCatalogCursor, parseCatalogInteger, parseMinProfitBand, parseSupplierProvider } from "@/lib/catalog-filters";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata({
  title: "Winning Products for eBay Dropshippers",
  description:
    "Browse eCommPilot Winning Products across the US, UK and Australia with sales, supplier, delivery and profit context.",
  path: "/winning-products",
});

type PageProps = {
  searchParams: Promise<{ minProfitBand?: string | string[]; minSales30d?: string | string[]; maxDeliveryDays?: string | string[]; supplier?: string | string[]; freshnessHours?: string | string[]; cursor?: string | string[] }>;
};

export default async function WinningProductsPage({ searchParams }: PageProps) {
  const query = await searchParams;
  const minProfitBand = parseMinProfitBand(query.minProfitBand);
  const minSales30d = parseCatalogInteger(query.minSales30d, 100000);
  const maxDeliveryDays = parseCatalogInteger(query.maxDeliveryDays, 365);
  const supplier = parseSupplierProvider(query.supplier);
  const freshnessHours = parseCatalogInteger(query.freshnessHours, 8760);
  const cursor = parseCatalogCursor(query.cursor);

  return (
    <PageShell darkHeader>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Winning Products", path: "/winning-products" },
        ])}
      />
      <PageHero
        eyebrow="Winning Products"
        badge="US · UK · AU"
        title="Browse product opportunities with the research layer already attached."
        description="Marketplace-style discovery for eBay dropshippers, with supplier, delivery and economics context designed to reduce guesswork."
      />
      <section className="py-12 md:py-16">
        <div className="site-container">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Winning Products" },
            ]}
          />
          <div className="mt-8">
            <MarketFilter
              currentMinProfitBand={minProfitBand}
              minSales30d={minSales30d}
              maxDeliveryDays={maxDeliveryDays}
              supplier={supplier}
              freshnessHours={freshnessHours}
              basePath="/winning-products"
            />
            <CatalogAdvancedFilters
              basePath="/winning-products"
              minProfitBand={minProfitBand}
              minSales30d={minSales30d}
              maxDeliveryDays={maxDeliveryDays}
              supplier={supplier}
              freshnessHours={freshnessHours}
            />
          </div>
          <div className="mt-6">
            <CatalogProductGrid
              minProfitBand={minProfitBand}
              minSales30d={minSales30d}
              maxDeliveryDays={maxDeliveryDays}
              supplier={supplier}
              freshnessHours={freshnessHours}
              cursor={cursor}
              basePath="/winning-products"
            />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
