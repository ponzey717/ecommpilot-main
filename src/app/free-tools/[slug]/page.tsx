import { ToolLearning } from "@/components/tools/tool-learning";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdvancedCalculator } from "@/components/tools/advanced-calculator";
import { HtmlCleaner } from "@/components/tools/html-cleaner";
import { ImageResizer } from "@/components/tools/image-resizer";
import { PageShell } from "@/components/site/page-shell";
import { ToolPageIntro } from "@/components/tools/tool-page-intro";
import { ToolEditorial } from "@/components/tools/tool-editorial";
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
    <ToolPageIntro title={tool.title} description={tool.summary} />
    <section className="tool-page-body"><div className="site-container">
      {slug === "ebay-image-resizer" ? <ImageResizer /> : slug === "ebay-html-description-cleaner" ? <HtmlCleaner /> : <AdvancedCalculator slug={slug as Parameters<typeof AdvancedCalculator>[0]["slug"]} />}
      <ToolEditorial slug={slug} />
      <ToolLearning slug={slug} />
      <div className="mt-10 grid gap-6 rounded-[24px] border border-[var(--border)] bg-white p-6 md:grid-cols-2 md:p-8"><div><h2 className="text-2xl font-extrabold text-[var(--navy)]">Related free tools</h2><div className="mt-4 flex flex-col gap-3">{tool.related.map((related) => { const item = getTool(related); return item ? <Link key={related} href={toolPath(related)} className="font-bold text-[var(--blue)] hover:underline">{item.title} →</Link> : null; })}</div></div><div><h2 className="text-2xl font-extrabold text-[var(--navy)]">Take the next step</h2><p className="mt-3 text-sm leading-7 text-[var(--muted)]">Explore seller guidance and published Winning Products for your market. Product availability reflects the live public catalogue.</p><div className="mt-5 flex flex-wrap gap-3"><Link href="/winning-products" className="button button-primary">Browse Winning Products</Link><Link href="/learn" className="button button-secondary">Seller guides</Link></div></div></div>
    </div></section>
  </PageShell>;
}
