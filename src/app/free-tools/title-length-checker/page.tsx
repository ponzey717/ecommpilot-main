import type { Metadata } from "next";
import { PageShell } from "@/components/site/page-shell";
import { TitleLengthChecker } from "@/components/tools/calculators";
import { JsonLd } from "@/components/seo/json-ld";
import { softwareApplicationSchema } from "@/lib/seo/schema";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Free eBay Title Length Checker",
  description: "Draft an eBay listing title and instantly check its length against the 80-character title limit.",
  path: "/free-tools/title-length-checker",
});

export default function Page() {
  return (
    <PageShell>
      <JsonLd data={softwareApplicationSchema({
        name: "eBay Title Length Checker",
        description: "A free title character-count tool for eBay listing drafts.",
        path: "/free-tools/title-length-checker",
      })} />
      <section className="bg-white py-14">
        <div className="site-container">
          <p className="eyebrow">Free tool</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-extrabold tracking-[-.04em] text-[var(--navy)] md:text-6xl">eBay Title Length Checker</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--muted)]">Check title length while you draft. This tool evaluates character count only, not listing quality or policy compliance.</p>
          <div className="mt-10"><TitleLengthChecker /></div>
        </div>
      </section>
    </PageShell>
  );
}
