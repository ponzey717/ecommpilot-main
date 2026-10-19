import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { PageShell } from "@/components/site/page-shell";
import { buildMetadata } from "@/lib/seo/metadata";
import { tools, toolPath, type ToolCategory } from "@/config/tools";

export const metadata: Metadata = buildMetadata({
  title: "Free eBay Seller Tools",
  description: "Ten free eBay seller tools for fees, profit, pricing, shipping, sell-through, images and listing descriptions. No account required.",
  path: "/free-tools",
});

const categories: ToolCategory[] = ["Profit & Fees", "Pricing & Offers", "Shipping", "Product Demand", "Listings & Images"];

export default function FreeToolsPage() {
  return (
    <PageShell darkHeader>
      <PageHero
        eyebrow="Free eBay tools"
        title="Free eBay seller tools for clearer decisions."
        description="Calculate costs, compare pricing choices and prepare listings. All ten tools are free, instant and usable without registration."
      />
      <section className="py-14 md:py-18">
        <div className="site-container">
          {categories.map((category) => <section key={category} className="mb-12"><h2 className="text-2xl font-extrabold text-[var(--navy)]">{category}</h2><div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{tools.filter((tool) => tool.category === category).map((tool) => <Link key={tool.slug} href={toolPath(tool.slug)} className="tool-card"><span className="tool-icon" aria-hidden="true">{tool.icon}</span><h3 className="mt-5 text-xl font-extrabold text-[var(--navy)]">{tool.title}</h3><p className="mt-3 text-sm leading-6 text-[var(--muted)]">{tool.summary}</p><p className="mt-5 text-sm font-extrabold text-[var(--blue)]">Open tool →</p></Link>)}</div></section>)}
          <div className="rounded-[24px] bg-[var(--navy)] p-7 text-white md:p-10"><h2 className="text-2xl font-extrabold">Ready to research products?</h2><p className="mt-3 max-w-2xl text-sm leading-7 text-white/75">Use the tools with your own numbers, then explore currently published Winning Products for the US, UK and AU.</p><Link href="/winning-products" className="button button-cyan mt-6">Browse Winning Products</Link></div>
        </div>
      </section>
    </PageShell>
  );
}
