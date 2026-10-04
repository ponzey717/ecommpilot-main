import Link from "next/link";
import { ProductGrid } from "@/components/products/product-grid";
import { PublicProductCard } from "@/components/products/public-product-card";
import {
  getPublicProducts,
  type PublicMarket,
} from "@/lib/api/public-catalog";

function nextPageHref({
  basePath,
  cursor,
  minProfitBand,
  minSales30d,
  maxDeliveryDays,
  supplier,
  freshnessHours,
}: {
  basePath: string;
  cursor: string;
  minProfitBand?: number;
  minSales30d?: number;
  maxDeliveryDays?: number;
  supplier?: string;
  freshnessHours?: number;
}) {
  const query = new URLSearchParams({ cursor });
  if (minProfitBand != null) query.set("minProfitBand", String(minProfitBand));
  if (minSales30d != null) query.set("minSales30d", String(minSales30d));
  if (maxDeliveryDays != null) query.set("maxDeliveryDays", String(maxDeliveryDays));
  if (supplier) query.set("supplier", supplier);
  if (freshnessHours != null) query.set("freshnessHours", String(freshnessHours));
  return basePath + "?" + query.toString();
}

export async function CatalogProductGrid({
  market,
  category,
  minProfitBand,
  minSales30d,
  maxDeliveryDays,
  supplier,
  freshnessHours,
  cursor,
  basePath = "/winning-products",
  limit = 12,
}: {
  market?: PublicMarket["code"];
  category?: string;
  minProfitBand?: number;
  minSales30d?: number;
  maxDeliveryDays?: number;
  supplier?: string;
  freshnessHours?: number;
  cursor?: string;
  basePath?: string;
  limit?: number;
}) {
  const payload = await getPublicProducts({
    ...(market ? { market } : {}),
    ...(category ? { category } : {}),
    ...(minProfitBand != null ? { minProfitBand } : {}),
    ...(minSales30d != null ? { minSales30d } : {}),
    ...(maxDeliveryDays != null ? { maxDeliveryDays } : {}),
    ...(supplier ? { supplier } : {}),
    ...(freshnessHours != null ? { freshnessHours } : {}),
    ...(cursor ? { cursor } : {}),
    limit,
  });

  if (payload?.products?.length) {
    return (
      <div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {payload.products.map((product) => (
            <PublicProductCard key={product.id} product={product} />
          ))}
        </div>

        {payload.nextCursor ? (
          <div className="mt-8 flex justify-center">
            <Link
              href={nextPageHref({
                basePath,
                cursor: payload.nextCursor,
                minProfitBand,
                minSales30d,
                maxDeliveryDays,
                supplier,
                freshnessHours,
              })}
              className="button button-secondary"
              rel="next"
            >
              View more products
            </Link>
          </div>
        ) : null}
      </div>
    );
  }

  if (!payload) {
    if (process.env.NODE_ENV !== "production") {
      return (
        <div>
          <ProductGrid />
          <p className="mt-5 text-xs leading-5 text-[var(--muted)]">
            Development fallback only. These sample cards are automatically replaced by
            verified API products when the public catalog endpoint is available.
          </p>
        </div>
      );
    }

    return (
      <div className="rounded-[22px] border border-[var(--border)] bg-white p-8 text-center">
        <p className="eyebrow">Catalog status</p>
        <h3 className="mt-3 text-2xl font-extrabold text-[var(--navy)]">
          The product catalog is temporarily unavailable.
        </h3>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">
          eCommPilot could not retrieve the verified public catalog right now. No
          product evidence is being substituted or guessed.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-[22px] border border-[var(--border)] bg-white p-8 text-center">
      <p className="eyebrow">Catalog</p>
      <h3 className="mt-3 text-2xl font-extrabold text-[var(--navy)]">
        No verified products are published in this view yet.
      </h3>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">
        eCommPilot only publishes opportunities after the required market, supplier and
        economics evidence is ready.
      </p>
    </div>
  );
}
