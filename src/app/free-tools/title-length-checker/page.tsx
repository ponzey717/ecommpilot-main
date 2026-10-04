import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { PageHero } from "@/components/site/page-hero";
import { PageShell } from "@/components/site/page-shell";
import { TitleLengthChecker } from "@/components/tools/calculators";
import { RelatedTools } from "@/components/tools/related-tools";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, softwareApplicationSchema } from "@/lib/seo/schema";
import { buildMetadata } from "@/lib/seo/metadata";

const path = "/free-tools/title-length-checker";

export const metadata: Metadata = buildMetadata({
  title: "Free eBay Title Length Checker",
  description:
    "Draft an eBay listing title and instantly check its length against the 80-character title limit.",
  path,
});

export default function Page() {
  return (
    <PageShell darkHeader>
      <JsonLd
        data={[
          softwareApplicationSchema({
            name: "eBay Title Length Checker",
            description: "A free title character-count tool for eBay listing drafts.",
            path,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Free Tools", path: "/free-tools" },
            { name: "Title Length Checker", path },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Free eBay tool"
        title="eBay Title Length Checker"
        description="Draft your eBay title and check its character count instantly before moving into the listing editor."
      />
      <section className="py-12 md:py-16">
        <div className="site-container">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Free Tools", href: "/free-tools" },
              { label: "Title Length Checker" },
            ]}
          />
          <div className="mt-8">
            <TitleLengthChecker />
          </div>
          <article className="feature-card mt-10">
            <p className="eyebrow">Scope</p>
            <h2 className="mt-3 text-2xl font-extrabold text-[var(--navy)]">
              Character count is only one part of a good title.
            </h2>
            <p className="mt-4 max-w-4xl text-sm leading-7 text-[var(--muted)]">
              eBay currently states that listing titles can use up to 80 characters.
              The checker does not claim that a title will rank or convert. Product
              accuracy, relevant search terms, item specifics and eBay policy still
              matter when you prepare the final listing.
            </p>
            <a
              href="https://www.ebay.com/sellercenter/listings/create-listings"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block text-sm font-extrabold text-[var(--blue)]"
            >
              Verify the current title guidance on eBay →
            </a>
          </article>
          <RelatedTools currentPath={path} />
        </div>
      </section>
    </PageShell>
  );
}
