import Link from "next/link";
import { getPublicProducts } from "@/lib/api/public-catalog";

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
        <div className="hero-glow" />
        <div className="relative z-10">
          <p className="eyebrow">Live catalog connection</p>
          <h2 className="mt-2 text-2xl font-extrabold text-[var(--navy)]">
            Product data is temporarily unavailable.
          </h2>
          <p className="mt-5 text-sm leading-6 text-[var(--muted)]">
            eCommPilot will not replace an unavailable live catalog with invented sales, supplier or profit figures.
          </p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="snapshot-card">
        <div className="hero-glow" />
        <div className="relative z-10">
          <p className="eyebrow">Winning Product snapshot</p>
          <h2 className="mt-2 text-2xl font-extrabold text-[var(--navy)]">
            Published only when the evidence is ready.
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {["30-day SOLD demand", "Supplier & delivery", "Profit & ROI", "Freshness"].map((label) => (
              <div className="metric-box" key={label}>
                <span className="metric-label">{label}</span>
                <strong className="!text-base">Verified before publish</strong>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm leading-6 text-[var(--muted)]">
            No public product is available in this view yet. eCommPilot does not fill an empty catalog with invented sales, supplier or profit figures.
          </p>
        </div>
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
            <span className="metric-label">Sales / 30 days</span>
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
            <span className="badge badge-neutral">{product.freshness.status}</span>
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
