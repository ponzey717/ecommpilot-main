import { PublicProductCard } from "@/components/products/public-product-card";
import {
  getPublicProducts,
  type PublicMarket,
} from "@/lib/api/public-catalog";

export async function CatalogProductGrid({
  market,
  category,
  minimumProfitBand,
  limit = 12,
  sort,
  minimumSales30d,
  maximumDeliveryDays,
}: {
  market?: PublicMarket["code"];
  category?: string;
  minimumProfitBand?: number;
  minimumSales30d?: number;
  maximumDeliveryDays?: number;
  sort?: "published" | "most_sold" | "highest_profit" | "freshest" | "fastest_delivery";
  limit?: number;
}) {
  const payload = await getPublicProducts({
    ...(market ? { market } : {}),
    ...(category ? { category } : {}),
    ...(minimumProfitBand != null ? { minimumProfitBand } : {}),
    ...(minimumSales30d != null ? { minimumSales30d } : {}),
    ...(maximumDeliveryDays != null ? { maximumDeliveryDays } : {}),
    ...(sort ? { sort } : {}),
    limit,
  });

  if (payload?.products?.length) {
    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {payload.products.map((product) => (
          <PublicProductCard key={product.id} product={product} />
        ))}
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
