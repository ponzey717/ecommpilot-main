import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { PageShell } from "@/components/site/page-shell";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "eBay Product Categories",
  description: "Browse eCommPilot Winning Products by eBay category and market.",
  path: "/categories",
});

const categories = [
  ["Electronics", "Audio, accessories and compact consumer products."],
  ["Home & Garden", "Practical household products with dropshipping-friendly profiles."],
  ["Automotive", "Compact car accessories and everyday vehicle products."],
  ["Office & Accessories", "Desk, organization and work-from-home products."],
  ["Pet Supplies", "Practical pet accessories and non-fragile everyday items."],
  ["Sports & Outdoors", "Portable accessories and lightweight activity products."],
];

export default function CategoriesPage() {
  return (
    <PageShell darkHeader>
      <PageHero
        eyebrow="eBay category structure"
        title="Browse opportunities by category."
        description="Production categories will follow the official eBay taxonomy for each marketplace instead of relying on one universal category tree."
      />
      <section className="py-14 md:py-18">
        <div className="site-container">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {categories.map(([name,text]) => (
              <article key={name} className="feature-card">
                <span className="tool-icon">↗</span>
                <h2 className="mt-5 text-xl font-extrabold text-[var(--navy)]">{name}</h2>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{text}</p>
                <p className="mt-5 text-xs font-bold text-[var(--muted)]">Market-specific taxonomy will replace this development list.</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
