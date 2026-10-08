import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { PageShell } from "@/components/site/page-shell";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: "Get help with eCommPilot membership, Winning Products or the eCommPilot app.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <PageShell darkHeader>
      <PageHero
        eyebrow="Contact"
        title="Need help with eCommPilot?"
        description="Use the current support guidance for account, sign-in, integration, privacy and platform-compliance questions."
      />
      <section className="py-14 md:py-18">
        <div className="site-container grid gap-5 md:grid-cols-2">
          <article className="feature-card">
            <p className="eyebrow">Support guidance</p>
            <h2 className="mt-3 text-2xl font-extrabold text-[var(--navy)]">Account and integration help</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
              The app support page explains account access, sign-in, integration, privacy and platform-compliance support paths. It is guidance, not a public message inbox.
            </p>
            <Link href="https://app.ecommpilot.net/support" className="button button-primary mt-6">
              Read App Support Guidance
            </Link>
          </article>
          <article className="feature-card">
            <p className="eyebrow">New to eCommPilot</p>
            <h2 className="mt-3 text-2xl font-extrabold text-[var(--navy)]">Start with a free account</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
              Create a free account to explore the member experience. For account, integration or privacy support, use the current app support guidance and never send passwords, API keys or OAuth tokens in ordinary support messages.
            </p>
            <Link href="https://app.ecommpilot.net/register" className="button button-secondary mt-6">
              Get Started Free
            </Link>
          </article>
        </div>
      </section>
    </PageShell>
  );
}
