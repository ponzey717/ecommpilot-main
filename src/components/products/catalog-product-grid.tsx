import Link from "next/link";
import { PublicProductCard } from "@/components/products/public-product-card";
import {
  getPublicProducts,
  type PublicMarket,
} from "@/lib/api/public-catalog";

export async function CatalogProductGrid({
  market,
  category,
  minimumProfitBand,
  limit = 24,
  sort,
  minimumSales30d,
  maximumDeliveryDays,
  search,
  freshnessHours,
  supplier,
  cursor,
  path,
}: {
  market?: PublicMarket["code"];
  category?: string;
  minimumProfitBand?: number;
  minimumSales30d?: number;
  maximumDeliveryDays?: number;
  search?: string;
  freshnessHours?: number;
  supplier?: string;
  cursor?: string;
  path?: string;
  sort?: "published" | "most_sold" | "highest_profit" | "freshest" | "fastest_delivery";
  limit?: number;
}) {
  const payload = await getPublicProducts({
    ...(market ? { market } : {}),
    ...(category ? { category } : {}),
    ...(minimumProfitBand != null ? { minimumProfitBand } : {}),
    ...(minimumSales30d != null ? { minimumSales30d } : {}),
    ...(maximumDeliveryDays != null ? { maximumDeliveryDays } : {}),
    ...(search ? { search } : {}),
    ...(freshnessHours != null ? { freshnessHours } : {}),
    ...(supplier ? { supplier } : {}),
    ...(sort ? { sort } : {}),
    ...(cursor && (!sort || sort === "published") ? { cursor } : {}),
    limit,
  });

  if (payload?.products?.length) {
    const nextQuery = new URLSearchParams();
    if (category) nextQuery.set("category", category);
    if (search) nextQuery.set("search", search);
    if (minimumProfitBand != null) nextQuery.set("profit", String(minimumProfitBand));
    if (minimumSales30d != null) nextQuery.set("sales", String(minimumSales30d));
    if (maximumDeliveryDays != null) nextQuery.set("delivery", String(maximumDeliveryDays));
    if (freshnessHours != null) nextQuery.set("freshness", String(freshnessHours));
    if (supplier) nextQuery.set("supplier", supplier);
    if (sort && sort !== "published") nextQuery.set("sort", sort);
    if (payload.nextCursor) nextQuery.set("cursor", payload.nextCursor);
    const basePath = path ?? (market ? `/winning-products/${market.toLowerCase()}` : "/winning-products");

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
              className="button button-secondary"
              href={basePath + "?" + nextQuery.toString()}
            >
              Next products →
            </Link>
          </div>
        ) : null}
      </div>
    );
  }

  if (payload == null) {
    return (
      <div className="rounded-[22px] border border-amber-200 bg-amber-50 p-8 text-center">
        <p className="eyebrow !text-amber-700">Catalog temporarily unavailable</p>
        <h3 className="mt-3 text-2xl font-extrabold text-[var(--navy)]">
          Published product data could not be loaded.
        </h3>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">
          eCommPilot is not substituting invented products or stale values. Please try this catalog view again shortly.
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
