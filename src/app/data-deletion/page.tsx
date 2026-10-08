import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { PageShell } from "@/components/site/page-shell";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Data Deletion",
  description:
    "How to request deletion of eCommPilot account, personal and connected-service data.",
  path: "/data-deletion",
});

export default function DataDeletionPage() {
  return (
    <PageShell darkHeader>
      <PageHero
        eyebrow="Privacy"
        title="Data Deletion"
        description="This page preserves eCommPilot's public deletion-policy URL and points account-specific requests to the current app policy and support process."
      />
      <section className="py-14 md:py-18">
        <div className="site-container max-w-4xl space-y-5">
          <article className="feature-card">
            <h2 className="text-2xl font-extrabold text-[var(--navy)]">
              eCommPilot workspace users
            </h2>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
              If you want an eCommPilot user account or associated personal information removed,
              follow the current Data Deletion policy in the app. Identity or authorization may
              need to be verified before records are deleted.
            </p>
          </article>

          <article className="feature-card">
            <h2 className="text-2xl font-extrabold text-[var(--navy)]">
              Connected marketplace or supplier data
            </h2>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
              Workspace owners may request disconnection of a third-party integration and
              deletion of synchronized data associated with that connected account. Some
              records may need to be retained where law, security, fraud-prevention, tax,
              dispute or binding platform obligations require it.
            </p>
          </article>

          <article className="feature-card">
            <h2 className="text-2xl font-extrabold text-[var(--navy)]">
              eBay account-deletion notifications
            </h2>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
              When production eBay access is enabled, eCommPilot handles valid eBay Marketplace
              Account Deletion/Closure notifications according to the current app policy. This
              automated platform process is separate from a normal eCommPilot workspace-user
              deletion request.
            </p>
          </article>

          <article className="feature-card">
            <h2 className="text-2xl font-extrabold text-[var(--navy)]">
              Current policy and support
            </h2>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
              The app policy is the current operational reference for what to include in a
              request, identity checks, connected-service handling and completion.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="https://app.ecommpilot.net/data-deletion"
                className="button button-primary"
              >
                Read Current Data Deletion Policy
              </Link>
              <Link
                href="https://app.ecommpilot.net/support"
                className="button button-secondary"
              >
                Support Guidance
              </Link>
            </div>
          </article>
        </div>
      </section>
    </PageShell>
  );
}
