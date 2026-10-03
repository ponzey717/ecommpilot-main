import Image from "next/image";
import type { DemoProduct } from "@/data/demo-products";

export function ProductCard({ product }: { product: DemoProduct }) {
  return (
    <article className="product-card">
      <div className="relative overflow-hidden rounded-[18px] bg-[var(--surface-soft)]">
        <Image
          src={product.image}
          alt=""
          width={600}
          height={420}
          className="aspect-[10/7] w-full object-cover"
        />
        <span className="absolute left-3 top-3 badge badge-market">{product.market}</span>
        <span className="absolute right-3 top-3 badge bg-white/90 text-[var(--muted)]">
          Sample
        </span>
      </div>
      <div className="mt-5 flex items-start justify-between gap-3">
        <div>
          <p className="eyebrow">{product.category}</p>
          <h3 className="mt-1 text-lg font-extrabold tracking-[-0.02em] text-[var(--navy)]">
            {product.name}
          </h3>
        </div>
        <span className="whitespace-nowrap text-sm font-bold text-amber-600">
          ★ {product.rating}
        </span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {product.choice && <span className="badge badge-choice">✓ AliExpress Choice</span>}
        <span className="badge badge-neutral">{product.delivery}</span>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="metric-box">
          <span className="metric-label">30-day sales</span>
          <strong>{product.sales30d}</strong>
        </div>
        <div className="metric-box">
          <span className="metric-label">Est. net margin</span>
          <strong className="!text-emerald-700">{product.margin}%</strong>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-[var(--border)] pt-4">
        <div>
          <span className="metric-label">Target price</span>
          <p className="font-extrabold text-[var(--navy)]">{product.targetPrice}</p>
        </div>
        <span className="text-sm font-extrabold text-[var(--blue)]">View product →</span>
      </div>
    </article>
  );
}
