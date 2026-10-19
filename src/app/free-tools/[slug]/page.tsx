import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdvancedCalculator } from "@/components/tools/advanced-calculator";
import { HtmlCleaner } from "@/components/tools/html-cleaner";
import { ImageResizer } from "@/components/tools/image-resizer";
import { PageShell } from "@/components/site/page-shell";
import { ToolPageIntro } from "@/components/tools/tool-page-intro";
import { ToolGuide } from "@/components/tools/tool-guide";
import { JsonLd } from "@/components/seo/json-ld";
import { getTool, newToolSlugs, toolPath } from "@/config/tools";
import { toolSeo } from "@/config/tool-seo";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, softwareApplicationSchema } from "@/lib/seo/schema";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return newToolSlugs.map((slug) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool || !newToolSlugs.includes(slug)) return {};
  return buildMetadata({ title: toolSeo[slug].title, description: toolSeo[slug].description, path: toolPath(slug) });
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
      <ToolGuide slug={slug} />
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-[20px] bg-[#0b2a5c] p-6 text-white"><p className="max-w-2xl text-sm leading-6">Use the tool with your own evidence, then explore current Winning Products for your market.</p><Link href="/winning-products" className="button button-primary">Browse Winning Products</Link></div>
    </div></section>
  </PageShell>;
}
