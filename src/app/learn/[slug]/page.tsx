import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/site/page-shell";
import { PageHero } from "@/components/site/page-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, articleSchema } from "@/lib/seo/schema";
import { buildMetadata } from "@/lib/seo/metadata";
import { growthGuides, getGrowthGuide } from "@/content/growth-guides";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return growthGuides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGrowthGuide(slug);
  if (!guide) return {};
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
  if (!guide) notFound();
  const path = `/learn/${guide.slug}`;
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
        eyebrow={guide.status === "published" ? "Seller Guide" : "Editorial Preview — not published"}
        title={guide.title}
        description={guide.lead}
      />
      <article className="py-12 md:py-16">
        <div className="site-container max-w-4xl">
          <div className="mb-8 flex flex-wrap gap-4 text-sm text-[var(--muted)]">
            <span>Updated {guide.dateModified}</span>
            <span>{guide.region}</span>
            <span>Reviewed sources linked below</span>
          </div>
          {guide.sections.map((section) => (
            <section key={section.heading} className="mb-10">
              <h2 className="mb-4 text-2xl font-extrabold text-[var(--navy)]">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mb-4 text-base leading-8 text-[var(--muted)]">{paragraph}</p>
              ))}
              {section.bullets ? (
                <ul className="mb-5 list-disc space-y-2 pl-6 text-base leading-7 text-[var(--muted)]">
                  {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              ) : null}
            </section>
          ))}
          <section className="rounded-2xl border border-[var(--border)] bg-white p-6">
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
                  <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-[var(--blue)] underline underline-offset-4">{source.label}</a>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
              The examples are educational. Fee schedules, shipping costs and marketplace policies can change. Check the rules for your own marketplace and seller account before acting.
            </p>
          </section>
        </div>
      </article>
    </PageShell>
  );
}
