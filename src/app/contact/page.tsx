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
        description="Use the authenticated support area for account-specific questions so private membership or product information stays inside the app."
      />
      <section className="py-14 md:py-18">
        <div className="site-container grid gap-5 md:grid-cols-2">
          <article className="feature-card">
            <p className="eyebrow">Existing member</p>
            <h2 className="mt-3 text-2xl font-extrabold text-[var(--navy)]">Open Support in the app</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
              Sign in before discussing account, membership or protected product details.
            </p>
            <Link href="https://app.ecommpilot.net/support" className="button button-primary mt-6">
              Open App Support
            </Link>
          </article>
          <article className="feature-card">
            <p className="eyebrow">New to eCommPilot</p>
            <h2 className="mt-3 text-2xl font-extrabold text-[var(--navy)]">Start with a free account</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
              Public contact email/form delivery is not configured yet, so the site does not display a made-up address. Create a free account to access the supported contact path.
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
