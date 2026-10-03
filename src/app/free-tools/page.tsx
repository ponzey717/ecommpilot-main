import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { PageHero } from "@/components/site/page-hero";
import { PageShell } from "@/components/site/page-shell";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata({
  title: "Free eBay Seller Tools",
  description:
    "Use free eCommPilot tools for eBay profit calculations, fee estimates and listing title checks.",
  path: "/free-tools",
});

const tools = [
  ["Profit Margin Calculator", "Calculate margin from your real costs and fee assumptions.", "/free-tools/profit-margin-calculator", "%"],
  ["eBay Fee Estimator", "Estimate marketplace fees using the percentage relevant to your market/category.", "/free-tools/ebay-fee-estimator", "F"],
  ["Title Length Checker", "Draft and check an eBay listing title against the 80-character limit.", "/free-tools/title-length-checker", "80"],
  ["Sell-Through Calculator", "Calculate observed sell-through from your own sold and active listing counts.", "/free-tools/sell-through-calculator", "ST"],
];

export default function FreeToolsPage() {
  return (
    <PageShell darkHeader>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Free Tools", path: "/free-tools" },
        ])}
      />
      <PageHero
        eyebrow="Free eBay tools"
        title="Useful tools for everyday eBay decisions."
        description="Public tools are part of eCommPilot’s SEO and seller-acquisition strategy, but every tool should also be useful on its own."
      />
      <section className="py-14 md:py-18">
        <div className="site-container">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Free Tools" },
            ]}
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {tools.map(([title, text, href, icon]) => (
              <Link key={href} href={href} className="tool-card">
                <span className="tool-icon">{icon}</span>
                <h2 className="mt-5 text-xl font-extrabold text-[var(--navy)]">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{text}</p>
                <p className="mt-5 text-sm font-extrabold text-[var(--blue)]">Open tool →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
