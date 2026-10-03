import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { PageShell } from "@/components/site/page-shell";
import { routes } from "@/config/routes";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Memberships",
  description: "Compare Free, Pro and Premium access for eCommPilot Winning Products and research features.",
  path: "/pricing",
});

const plans = [
  ["Free", "Preview the platform and use the public tools.", ["Winning Product previews", "US, UK & AU browsing", "Free eBay tools"]],
  ["Pro", "Unlock deeper research for a consistent product workflow.", ["Deeper product access", "Supplier & delivery insights", "Profit filters and member tools"]],
  ["Premium", "Access the deepest research and highest-value product bands.", ["Everything in Pro", "Advanced product evidence", "Premium research collections"]],
];

export default function PricingPage() {
  return (
    <PageShell darkHeader>
      <PageHero
        eyebrow="Membership"
        title="Start free. Unlock more research when you need it."
        description="Free, Pro and Premium are the membership structure. Final commercial pricing, credits and usage limits remain configurable before launch."
      />
      <section className="py-14 md:py-18">
        <div className="site-container">
          <div className="grid gap-5 md:grid-cols-3">
            {plans.map(([name,description,items],index) => (
              <article key={name as string} className={index === 1 ? "plan-card plan-card-featured" : "plan-card"}>
                <p className={name === "Premium" ? "eyebrow !text-[var(--premium)]" : "eyebrow"}>{name as string}</p>
                <h2 className="mt-4 text-xl font-extrabold text-[var(--navy)]">{description as string}</h2>
                <ul className="mt-6 grid gap-3 text-sm text-[var(--muted)]">
                  {(items as string[]).map((item) => <li key={item}>✓ {item}</li>)}
                </ul>
              </article>
            ))}
          </div>
          <div className="mt-8"><Link href={routes.join} className="button button-primary">Join Free</Link></div>
        </div>
      </section>
    </PageShell>
  );
}
