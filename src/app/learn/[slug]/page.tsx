import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/site/page-shell";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, articleSchema } from "@/lib/seo/schema";
import { buildMetadata } from "@/lib/seo/metadata";
import { getPreviewAcademyGuide, getPublishedAcademyGuide, getPublishedAcademyGuides } from "@/lib/api/seller-academy";
import { ArticleToc } from "@/components/learn/article-toc";
import { ArticleDecisionCheck } from "@/components/learn/article-decision-check";
import { ArticleVisual, Callout, ComparisonTable, Faq, ProcessFlow, ScreenshotFrame } from "@/components/learn/content-blocks";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ preview?: string }> };
export const dynamic = "force-dynamic";

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params;
  const token = (await searchParams).preview;
  if (token) {
    const preview = await getPreviewAcademyGuide(slug, token);
    return buildMetadata({ title: preview?.title ?? "Article unavailable", path: `/learn/${slug}`, noIndex: true });
  }
  const guide = await getPublishedAcademyGuide(slug);
  if (!guide) return buildMetadata({ title: "Article unavailable", path: `/learn/${slug}`, noIndex: true });
  return buildMetadata({ title: guide.title, description: guide.description, path: `/learn/${slug}` });
}

export default async function GrowthGuidePage({ params, searchParams }: Props) {
  const { slug } = await params;
  const token = (await searchParams).preview;
  const guide = token ? await getPreviewAcademyGuide(slug, token) : await getPublishedAcademyGuide(slug);
  if (!guide) notFound();
  const path = `/learn/${guide.slug}`;
  const related = (await getPublishedAcademyGuides()).filter((item) => item.slug !== guide.slug).slice(0, 3);
  const entries = guide.sections.flatMap((section, index) => [{ id: `section-${index + 1}`, label: section.heading, level: 2 as const }, ...(section.subsections ?? []).map((subsection, subIndex) => ({ id: `section-${index + 1}-${subIndex + 1}`, label: subsection.heading, level: 3 as const }))]);
  return <PageShell darkHeader>
    {!token && <JsonLd data={[articleSchema({ headline: guide.title, description: guide.description, path, datePublished: guide.publicationAt ?? guide.datePublished ?? "", dateModified: guide.dateModified }), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Seller Academy", path: "/learn" }, { name: guide.title, path }])]} />}
    <article id="article-top" className="guide-article">
      {token && <p className="site-container rounded-xl border border-amber-500 bg-amber-50 p-4 font-bold text-amber-950">Private editorial preview · This article is not public.</p>}
      <header className="guide-hero">
        <div className="site-container guide-hero-grid">
          <div className="guide-hero-copy">
            <nav aria-label="Breadcrumb" className="guide-breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/learn">Seller Academy</Link><span aria-hidden="true">/</span><span>{guide.topic} guide</span></nav>
            <div className="guide-hero-label"><span className="guide-hero-label-mark" aria-hidden="true">✦</span> THE ECOMMPILOT FIELD GUIDE <span className="guide-hero-label-divider" aria-hidden="true" /> {guide.topic.toUpperCase()}</div>
            <h1>{guide.title}</h1>
            <p className="guide-hero-lead">{guide.lead}</p>
            <div className="guide-hero-meta"><span>{guide.readingMinutes} MIN READ</span><span aria-hidden="true" className="guide-meta-dot" /><span>UPDATED {guide.dateModified}</span><span aria-hidden="true" className="guide-meta-dot" /><span>{guide.region}</span></div>
            <a className="guide-hero-jump" href="#guide-start">Start reading <span aria-hidden="true">↓</span></a>
          </div>
          <ArticleVisual topic={guide.topic} stages={guide.processFlow} />
        </div>
      </header>
      <div className="guide-content-shell">
        <div className="site-container">
          <div className="guide-intro" id="guide-start"><div><span className="article-kicker">THE SHORT VERSION</span><h2>{guide.introTitle ?? guide.title}</h2></div><p>{guide.introSummary ?? guide.lead}</p></div>
          <div className="article-layout">
            <ArticleToc entries={entries} />
            <div className="article-content min-w-0">
              {guide.sections.map((section, index) => <Fragment key={section.heading}><section id={`section-${index + 1}`} className="guide-chapter">
                <div className="guide-chapter-head"><span className="guide-chapter-number">{String(index + 1).padStart(2, "0")}</span><div><span className="article-kicker">CHAPTER {String(index + 1).padStart(2, "0")}</span><h2>{section.heading.replace(/^\d+\.\s*/, "")}</h2></div></div>
                <div className="guide-chapter-body">
                  {/frequently asked questions/i.test(section.heading) ? <Faq items={section.paragraphs.map((paragraph) => {
                    const at = paragraph.indexOf("?");
                    return at > 0 ? { question: paragraph.slice(0, at + 1), answer: paragraph.slice(at + 1).trim() } : { question: paragraph, answer: "Review the source notes and the preceding chapters for the relevant evidence." };
                  })} /> : section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.subsections?.map((subsection, subIndex) => <div key={subsection.heading} className="guide-subsection"><h3 id={`section-${index + 1}-${subIndex + 1}`}>{subsection.heading}</h3>{subsection.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>)}
                  {section.table ? <figure className="guide-table-figure"><figcaption><span className="article-kicker">COMPARE THE EVIDENCE</span><strong>{section.table.caption}</strong></figcaption><ComparisonTable caption={section.table.caption} headers={section.table.headers} rows={section.table.rows} /></figure> : null}
                  {section.bullets ? <div className="guide-checklist"><strong>Before you move on</strong><ul>{section.bullets.map((bullet) => <li key={bullet}><span aria-hidden="true">✓</span>{bullet}</li>)}</ul></div> : null}
                </div>
              </section>{index === 2 ? <ArticleDecisionCheck topic={guide.topic} title={guide.decisionCheckTitle} checks={guide.decisionChecks} /> : null}</Fragment>)}
              <ProcessFlow title={guide.processFlowTitle ?? `${guide.topic} decision flow`} stages={guide.processFlow} />
              <div className="guide-afterword"><Callout kind="warning" title="Evidence has a shelf life">Prices, stock, delivery quotes and marketplace research results can change. Keep the source and capture date with your decision.</Callout></div>
              {guide.screenshotRequirements.length > 0 && <section className="guide-resource-section"><div className="guide-section-heading"><span className="article-kicker">EDITORIAL EVIDENCE</span><h2>See the source, not a reconstruction</h2><p>Source captures for this manuscript are being verified.</p></div>{guide.screenshotRequirements.map((requirement) => <ScreenshotFrame key={requirement} alt={requirement} caption={requirement} />)}</section>}
              <section className="guide-resource-section"><div className="guide-section-heading"><span className="article-kicker">PUT IT TO WORK</span><h2>Use the right tool for the next decision</h2><p>These tools calculate from your inputs. They do not supply missing marketplace or supplier evidence.</p></div><div className="guide-tool-grid">{guide.tools.map((tool) => <Link href={tool.href} key={tool.href}><span aria-hidden="true">↗</span><strong>{tool.label}</strong><small>Open free tool</small></Link>)}</div></section>
              <section className="guide-resource-section guide-sources"><div className="guide-section-heading"><span className="article-kicker">SOURCE NOTES</span><h2>Sources and verification</h2></div><ul>{guide.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label} <span aria-hidden="true">↗</span></a><small>Checked {source.checkedAt}</small></li>)}</ul><p>Examples are educational. Verify changing marketplace facts and supplier terms for your own account and buyer destination.</p></section>
              {related.length > 0 ? <section className="guide-resource-section guide-related"><div className="guide-section-heading"><span className="article-kicker">CONTINUE LEARNING</span><h2>Related guides</h2></div><div className="guide-tool-grid">{related.map((item) => <Link href={`/learn/${item.slug}`} key={item.slug}><span aria-hidden="true">↗</span><strong>{item.title}</strong><small>{item.readingMinutes} min read</small></Link>)}</div></section> : null}
              <div className="guide-final-cta"><div><span className="article-kicker">THE NEXT STEP</span><strong>Turn better research into a better product decision.</strong></div><Link href="/winning-products" className="button button-primary">Browse Winning Products</Link><Link href="/learn" className="button button-secondary">More seller guidance</Link></div>
            </div>
          </div>
        </div>
      </div>
    </article>
  </PageShell>;
}
