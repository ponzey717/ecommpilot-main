import Link from "next/link";
import Image from "next/image";
import type { PublicProductSummary } from "@/lib/api/public-catalog";

function moneyFromMinor(value: number | null | undefined, currency: string | null | undefined) {
  if (value == null || !currency) return null;
  try {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(value / 100);
  } catch {
    return null;
  }
}

function tierLabel(tier: string | null | undefined) {
  if (tier === "premium") return "Premium";
  if (tier === "pro") return "Pro";
  return null;
}

export function PublicProductCard({ product }: { product: PublicProductSummary }) {
  const detailHref = product.category?.slug
    ? "/winning-products/" + product.market.toLowerCase() + "/" + product.category.slug + "/" + product.slug
    : "/winning-products/" + product.market.toLowerCase();
  const price = moneyFromMinor(
    product.economics?.recommendedSellingPriceMinor,
    product.economics?.currency,
  );
  const requiredTier = tierLabel(product.access?.requiredTier);
  const localImage = product.image?.url?.startsWith("/") ? product.image : null;
  const remoteImage =
    product.image?.url?.startsWith("https://") ? product.image : null;

  return (
    <article className="product-card">
      <div className="relative overflow-hidden rounded-[18px] bg-[var(--surface-soft)]">
        {localImage ? (
          <Image
            src={localImage.url}
            alt={localImage.alt}
            width={localImage.width ?? 600}
            height={localImage.height ?? 420}
            className="aspect-[10/7] w-full object-cover"
          />
        ) : remoteImage ? (
          <img
            src={remoteImage.url}
            alt={remoteImage.alt}
            width={remoteImage.width ?? 600}
            height={remoteImage.height ?? 420}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="aspect-[10/7] w-full object-cover"
          />
        ) : (
          <div className="flex aspect-[10/7] w-full items-center justify-center bg-[linear-gradient(135deg,#edf7ff,#eafcff)] p-8 text-center">
            <div>
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-xl font-black text-[var(--blue)] shadow-sm">
                ↗
              </span>
              <p className="mt-4 text-sm font-extrabold text-[var(--navy)]">
                {product.category?.name ?? "Winning Product"}
              </p>
            </div>
          </div>
        )}
        <span className="absolute left-3 top-3 badge badge-market">{product.market}</span>
        {requiredTier ? (
          <span className="absolute right-3 top-3 badge bg-white/95 text-[var(--premium)]">
            {requiredTier}
          </span>
        ) : null}
      </div>

      <div className="mt-5 flex items-start justify-between gap-3">
        <div>
          <p className="eyebrow">{product.category?.name ?? "eBay opportunity"}</p>
          <h3 className="mt-1 text-lg font-extrabold tracking-[-0.02em] text-[var(--navy)]">
            {product.name}
          </h3>
        </div>
        {product.supplier?.rating != null ? (
          <span className="whitespace-nowrap text-sm font-bold text-amber-600">
            ★ {product.supplier.rating.toFixed(1)}
          </span>
        ) : null}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {product.supplier?.choice ? (
          <span className="badge badge-choice">✓ AliExpress Choice</span>
        ) : null}
        {product.supplier?.deliveryMaxDays != null ? (
          <span className="badge badge-neutral">
            {product.supplier.deliveryMinDays ?? product.supplier.deliveryMaxDays}–
            {product.supplier.deliveryMaxDays} days
          </span>
        ) : null}
        {product.freshness?.status ? (
          <span className="badge badge-neutral">{product.freshness.status}</span>
        ) : null}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="metric-box">
          <span className="metric-label">30-day sales</span>
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
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-[var(--border)] pt-4">
        <div>
          <span className="metric-label">Target price</span>
          <p className="font-extrabold text-[var(--navy)]">{price ?? "—"}</p>
        </div>
        <Link href={detailHref} className="text-sm font-extrabold text-[var(--blue)]">
          View product →
        </Link>
      </div>
    </article>
  );
}
