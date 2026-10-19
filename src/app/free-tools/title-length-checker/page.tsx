import type { Metadata } from "next";
import { PageShell } from "@/components/site/page-shell";
import { TitleLengthChecker } from "@/components/tools/ep11-calculators";
import { ToolGuide } from "@/components/tools/tool-guide";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, softwareApplicationSchema } from "@/lib/seo/schema";
import { buildMetadata } from "@/lib/seo/metadata";
import { ToolPageIntro } from "@/components/tools/tool-page-intro";
import { toolSeo } from "@/config/tool-seo";

const path = "/free-tools/title-length-checker";

export const metadata: Metadata = buildMetadata({ title: toolSeo["title-length-checker"].title, description: toolSeo["title-length-checker"].description, path });

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
      <ToolPageIntro title="eBay Title Length Checker" description="Draft your listing title and check the standard 80-character limit as you type." />
      <section className="tool-page-body">
        <div className="site-container">
          <TitleLengthChecker />
          <ToolGuide slug="title-length-checker" />
        </div>
      </section>
    </PageShell>
  );
}
