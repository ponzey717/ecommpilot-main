import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { PageShell } from "@/components/site/page-shell";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Privacy",
  description: "eCommPilot public website privacy information and links to account privacy controls.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <PageShell darkHeader>
      <PageHero
        eyebrow="Privacy"
        title="Public website privacy"
        description="The public website is separated from the authenticated eCommPilot app and consumes only an allowlisted public catalog API."
      />
      <section className="py-14 md:py-18">
        <div className="site-container max-w-4xl space-y-5">
          <article className="feature-card">
            <h2 className="text-2xl font-extrabold text-[var(--navy)]">Public catalog data</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
              Public Winning Product pages receive only fields approved for public display. Private supplier URLs, protected cost breakdowns, internal evidence notes, member data and workspace data are not part of the public API response.
            </p>
          </article>
          <article className="feature-card">
            <h2 className="text-2xl font-extrabold text-[var(--navy)]">Accounts and authentication</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
              Account creation, login and member activity occur on app.ecommpilot.net. The authenticated app maintains its own privacy and account controls.
            </p>
            <Link href="https://app.ecommpilot.net/privacy" className="mt-5 inline-block text-sm font-extrabold text-[var(--blue)]">
              Open app privacy information →
            </Link>
          </article>
          <article className="feature-card">
            <h2 className="text-2xl font-extrabold text-[var(--navy)]">Analytics and cookies</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
              The production analytics/consent implementation will be documented here before non-essential tracking is enabled. This page does not claim tracking tools that are not yet configured.
            </p>
          </article>
        </div>
      </section>
    </PageShell>
  );
}
