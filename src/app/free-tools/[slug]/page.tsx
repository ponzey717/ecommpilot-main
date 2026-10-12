import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdvancedCalculator } from "@/components/tools/advanced-calculator";
import { HtmlCleaner } from "@/components/tools/html-cleaner";
import { ImageResizer } from "@/components/tools/image-resizer";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { PageHero } from "@/components/site/page-hero";
import { PageShell } from "@/components/site/page-shell";
import { JsonLd } from "@/components/seo/json-ld";
import { getTool, newToolSlugs, toolPath } from "@/config/tools";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, softwareApplicationSchema } from "@/lib/seo/schema";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return newToolSlugs.map((slug) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool || !newToolSlugs.includes(slug)) return {};
  return buildMetadata({ title: `${tool.title} | Free eBay Seller Tool`, description: `${tool.summary} Free, instant and no sign-up required. See the method, a worked example and limitations.`, path: toolPath(slug) });
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool || !newToolSlugs.includes(slug)) notFound();
  const path = toolPath(slug);
  return <PageShell darkHeader>
    <JsonLd data={[softwareApplicationSchema({ name: tool.title, description: tool.summary, path }), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Free Tools", path: "/free-tools" }, { name: tool.title, path }])]} />
    <PageHero eyebrow={`Free eBay tool · ${tool.category}`} title={tool.title} description={`${tool.summary} No account required.`} />
    <section className="py-12 md:py-16"><div className="site-container">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Free Tools", href: "/free-tools" }, { label: tool.title }]} />
      <div className="mt-8">{slug === "ebay-image-resizer" ? <ImageResizer /> : slug === "ebay-html-description-cleaner" ? <HtmlCleaner /> : <AdvancedCalculator slug={slug as Parameters<typeof AdvancedCalculator>[0]["slug"]} />}</div>
      <div className="mt-10 grid gap-5 md:grid-cols-2"><article className="feature-card"><p className="eyebrow">How it works</p><h2 className="mt-3 text-2xl font-extrabold text-[var(--navy)]">Method and assumptions</h2><p className="mt-4 text-sm leading-7 text-[var(--muted)]">{tool.how}</p></article><article className="feature-card"><p className="eyebrow">Worked example</p><h2 className="mt-3 text-2xl font-extrabold text-[var(--navy)]">Try it with your own numbers</h2><p className="mt-4 text-sm leading-7 text-[var(--muted)]">{tool.example}</p></article></div>
      <article className="feature-card mt-5"><p className="eyebrow">Important limitations</p><h2 className="mt-3 text-2xl font-extrabold text-[var(--navy)]">Check the final listing decision</h2><p className="mt-4 text-sm leading-7 text-[var(--muted)]">{tool.limitation}</p></article>
      <div className="mt-10 grid gap-6 rounded-[24px] border border-[var(--border)] bg-white p-6 md:grid-cols-2 md:p-8"><div><h2 className="text-2xl font-extrabold text-[var(--navy)]">Related free tools</h2><div className="mt-4 flex flex-col gap-3">{tool.related.map((related) => { const item = getTool(related); return item ? <Link key={related} href={toolPath(related)} className="font-bold text-[var(--blue)] hover:underline">{item.title} →</Link> : null; })}</div></div><div><h2 className="text-2xl font-extrabold text-[var(--navy)]">Take the next step</h2><p className="mt-3 text-sm leading-7 text-[var(--muted)]">Explore seller guidance and published Winning Products for your market. Product availability reflects the live public catalogue.</p><div className="mt-5 flex flex-wrap gap-3"><Link href="/winning-products" className="button button-primary">Browse Winning Products</Link><Link href="/learn" className="button button-secondary">Seller guides</Link></div></div></div>
    </div></section>
  </PageShell>;
}
