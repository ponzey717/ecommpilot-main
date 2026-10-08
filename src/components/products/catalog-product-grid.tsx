import { ProductGrid } from "@/components/products/product-grid";
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
}: {
  market?: PublicMarket["code"];
  category?: string;
  minimumProfitBand?: number;
  minimumSales30d?: number;
  sort?: "published" | "most_sold" | "highest_profit" | "freshest" | "fastest_delivery";
  limit?: number;
}) {
  const payload = await getPublicProducts({
    ...(market ? { market } : {}),
    ...(category ? { category } : {}),
    ...(minimumProfitBand != null ? { minimumProfitBand } : {}),
    ...(minimumSales30d != null ? { minimumSales30d } : {}),
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
