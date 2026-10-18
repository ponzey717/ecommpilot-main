import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/site/page-shell";
import { PageHero } from "@/components/site/page-hero";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, articleSchema } from "@/lib/seo/schema";
import { buildMetadata } from "@/lib/seo/metadata";
import { getGrowthGuide, publishedGrowthGuides } from "@/content/growth-guides";
import { ArticleToc } from "@/components/learn/article-toc";
import { Callout, ComparisonTable, ProcessFlow, ScreenshotFrame } from "@/components/learn/content-blocks";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return publishedGrowthGuides().map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGrowthGuide(slug);
  if (!guide || guide.status !== "published") return buildMetadata({ title: "Article unavailable", path: `/learn/${slug}`, noIndex: true });
  return buildMetadata({
    title: guide.title,
    description: guide.description,
    path: `/learn/${slug}`,
    noIndex: guide.status !== "published",
  });
}

export default async function GrowthGuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGrowthGuide(slug);
  if (!guide || guide.status !== "published" || !guide.datePublished) notFound();
  const path = `/learn/${guide.slug}`;
  const related = publishedGrowthGuides().filter((item) => item.slug !== guide.slug).slice(0, 3);
  return (
    <PageShell darkHeader>
      {guide.status === "published" && guide.datePublished ? (
        <JsonLd data={[
          articleSchema({
            headline: guide.title,
            description: guide.description,
            path,
            datePublished: guide.datePublished,
            dateModified: guide.dateModified,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Learn", path: "/learn" },
            { name: guide.title, path },
          ]),
        ]} />
      ) : null}
      <PageHero
        eyebrow="Seller Guide"
        title={guide.title}
        description={guide.lead}
      />
      <article className="py-12 md:py-16">
        <div className="site-container">
          <Breadcrumbs items={[{label:"Home",href:"/"},{label:"Learn",href:"/learn"},{label:guide.title}]} />
          <div className="mb-8 mt-8 flex flex-wrap gap-4 text-sm text-[var(--muted)]">
            <span>Updated {guide.dateModified}</span>
            <span>{guide.region}</span>
            <span>{guide.readingMinutes} min read</span>
            <span>Published {guide.datePublished}</span>
          </div>
          <div className="article-layout">
          <ArticleToc entries={guide.sections.flatMap((section, index) => [{ id: `section-${index + 1}`, label: section.heading, level: 2 as const }, ...(section.subsections ?? []).map((subsection, subIndex) => ({ id: `section-${index + 1}-${subIndex + 1}`, label: subsection.heading, level: 3 as const }))])} />
          <div className="article-content min-w-0">
          {guide.sections.map((section, index) => (
            <section id={`section-${index + 1}`} key={section.heading} className="mb-10">
              <h2 className="mb-4 text-2xl font-extrabold text-[var(--navy)]">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mb-4 text-base leading-8 text-[var(--muted)]">{paragraph}</p>
              ))}
              {section.subsections?.map((subsection, subIndex) => <div key={subsection.heading} className="mt-6"><h3 id={`section-${index + 1}-${subIndex + 1}`} className="mb-3 scroll-mt-24 text-xl font-bold text-[var(--navy)]">{subsection.heading}</h3>{subsection.paragraphs.map((paragraph) => <p key={paragraph} className="mb-4 text-base leading-8 text-[var(--muted)]">{paragraph}</p>)}</div>)}
              {section.table ? <figure className="mb-6"><figcaption className="mb-3 text-sm font-semibold text-[var(--navy)]">{section.table.caption}</figcaption><ComparisonTable headers={section.table.headers} rows={section.table.rows} /></figure> : null}
              {section.bullets ? (
                <ul className="mb-5 list-disc space-y-2 pl-6 text-base leading-7 text-[var(--muted)]">
                  {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              ) : null}
            </section>
          ))}
          <ProcessFlow title={guide.topic === "Suppliers" ? "Supplier verification flow" : "Research decision flow"} stages={guide.processFlow} />
          <div className="mt-6"><Callout kind="warning" title="Recheck changing evidence">Prices, stock, delivery quotes and marketplace research results can change. Keep the source and capture date with your decision.</Callout></div>
          <section className="mt-9">
            <h2 className="text-xl font-bold text-[var(--navy)]">Visual evidence</h2>
            {guide.screenshotRequirements.map((requirement) => <ScreenshotFrame key={requirement} alt={requirement} caption={requirement} />)}
          </section>
          <section className="mt-9 rounded-2xl border border-[var(--border)] bg-white p-6">
            <h2 className="text-xl font-bold text-[var(--navy)]">Try the related eBay tools</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {guide.tools.map((tool) => (
                <li key={tool.href}>
                  <Link href={tool.href} className="font-semibold text-[var(--blue)] underline-offset-4 hover:underline">{tool.label} →</Link>
                </li>
              ))}
            </ul>
          </section>
          <section className="mt-9">
            <h2 className="text-xl font-bold text-[var(--navy)]">Sources and verification</h2>
            <ul className="mt-3 space-y-2">
              {guide.sources.map((source) => (
                <li key={source.url}>
                  <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-[var(--blue)] underline underline-offset-4">{source.label}</a> <span className="text-xs text-[var(--muted)]">Checked {source.checkedAt}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
              The examples are educational. Fee schedules, shipping costs and marketplace policies can change. Check the rules for your own marketplace and seller account before acting.
            </p>
          </section>
          {related.length > 0 ? <section className="mt-8 rounded-2xl border border-[var(--border)] bg-white p-6"><h2 className="text-xl font-bold text-[var(--navy)]">Related guides</h2><ul className="mt-3 grid gap-2">{related.map((item) => <li key={item.slug}><Link href={`/learn/${item.slug}`} className="font-semibold text-[var(--blue)] hover:underline">{item.title} →</Link></li>)}</ul></section> : null}
          <div className="mt-8 flex flex-wrap gap-3"><Link href="/winning-products" className="button button-primary">Browse Winning Products</Link><Link href="/learn" className="button button-secondary">More seller guidance</Link></div>
          </div>
          </div>
        </div>
      </article>
    </PageShell>
  );
}
