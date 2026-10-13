import type { Metadata } from "next";
import { PageShell } from "@/components/site/page-shell";
import { TitleLengthChecker } from "@/components/tools/ep11-calculators";
import { ToolEditorial } from "@/components/tools/tool-editorial";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, softwareApplicationSchema } from "@/lib/seo/schema";
import { buildMetadata } from "@/lib/seo/metadata";
import { ToolPageIntro } from "@/components/tools/tool-page-intro";

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
      <ToolPageIntro title="eBay Title Character Counter" description="Draft your listing title and check the standard 80-character limit as you type." />
      <section className="tool-page-body">
        <div className="site-container">
          <TitleLengthChecker />
          <ToolEditorial slug="title-length-checker" />
        </div>
      </section>
    </PageShell>
  );
}
