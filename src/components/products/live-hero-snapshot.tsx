import Link from "next/link";
import { getPublicProducts } from "@/lib/api/public-catalog";

function freshnessLabel(value: string | null | undefined) {
  if (!value) return null;
  return value.toLowerCase() === "fresh" ? "Fresh evidence" : "Evidence status";
}

function money(value: number | null | undefined, currency: string | null | undefined) {
  if (value == null || !currency) return "—";
  try {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(value / 100);
  } catch {
    return "—";
  }
}

export async function LiveHeroSnapshot() {
  const payload = await getPublicProducts({ sort: "most_sold", limit: 1 });
  const product = payload?.products?.[0];

  if (payload == null) {
    return (
      <div className="snapshot-card">
        <p className="eyebrow">Catalog status</p>
        <h2 className="mt-2 text-xl font-extrabold text-[var(--navy)]">Product data is temporarily unavailable.</h2>
        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
          Live figures are not shown until the catalog connection is restored.
        </p>
        <div className="mt-5 border-t border-[var(--border)] pt-4 text-xs font-bold text-[var(--muted)]">
          Demand · Supplier · Profit · Freshness
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="snapshot-card">
        <p className="eyebrow">The research layer</p>
        <h2 className="mt-2 text-xl font-extrabold text-[var(--navy)]">
          A clearer view of the opportunity.
        </h2>
        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
          Every published product is designed to bring the evidence together.
        </p>
        <div className="research-preview" aria-label="Product research fields">
          {["eBay demand", "Supplier & delivery", "Profit & ROI", "Evidence freshness"].map((label, index) => (
            <div className="research-preview-row" key={label}>
              <span className="research-preview-number">0{index + 1}</span>
              <span>{label}</span>
              <span className="research-preview-line" aria-hidden="true" />
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs leading-5 text-[var(--muted)]">
          No public product is published yet; this preview shows fields, not invented results.
        </p>
      </div>
    );
  }

  const href = product.category?.slug
    ? `/winning-products/${product.market.toLowerCase()}/${product.category.slug}/${product.slug}`
    : "/winning-products/" + product.market.toLowerCase();

  return (
    <div className="snapshot-card">
      <div className="hero-glow" />
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow">Live Winning Product</p>
            <h2 className="mt-2 text-2xl font-extrabold text-[var(--navy)]">
              {product.name}
            </h2>
          </div>
          <span className="badge badge-market">{product.market}</span>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="metric-box">
            <span className="metric-label">30-day SOLD</span>
            <strong>{product.ebay?.sales30d ?? "—"}</strong>
          </div>
          <div className="metric-box">
            <span className="metric-label">Est. net margin</span>
            <strong className="!text-emerald-700">
              {product.economics?.profitPercent != null
                ? product.economics.profitPercent.toFixed(1) + "%"
                : "—"}
            </strong>
          </div>
          <div className="metric-box">
            <span className="metric-label">Delivery</span>
            <strong className="!text-lg">
              {product.supplier?.deliveryMaxDays != null
                ? `${product.supplier.deliveryMinDays ?? product.supplier.deliveryMaxDays}–${product.supplier.deliveryMaxDays} days`
                : "—"}
            </strong>
          </div>
          <div className="metric-box">
            <span className="metric-label">Target price</span>
            <strong className="!text-lg">
              {money(
                product.economics?.recommendedSellingPriceMinor,
                product.economics?.currency,
              )}
            </strong>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {product.supplier?.choice ? (
            <span className="badge badge-choice">✓ AliExpress Choice</span>
          ) : null}
          {product.freshness?.status ? (
            <span className="badge badge-neutral">{freshnessLabel(product.freshness.status)}</span>
          ) : null}
          <Link href={href} className="ml-auto text-sm font-extrabold text-[var(--blue)]">
            View product →
          </Link>
        </div>
        <p className="mt-4 text-xs leading-5 text-[var(--muted)]">
          Live public values come from the allowlisted eCommPilot publication API. Missing evidence stays missing.
        </p>
      </div>
    </div>
  );
}
