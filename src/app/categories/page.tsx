import type { Metadata } from "next";
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
    <PageShell>
      <section className="bg-white py-16">
        <div className="site-container">
          <p className="eyebrow">eBay category structure</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-[-.04em] text-[var(--navy)] md:text-6xl">Browse opportunities by category.</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--muted)]">
            Production categories will follow the official eBay taxonomy for each marketplace instead of relying on one universal category tree.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {categories.map(([name,text]) => (
              <article key={name} className="feature-card">
                <span className="tool-icon">↗</span>
                <h2 className="mt-5 text-xl font-extrabold text-[var(--navy)]">{name}</h2>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
