import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { PageShell } from "@/components/site/page-shell";
import { routes } from "@/config/routes";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Data Deletion",
  description: "How to request deletion of eCommPilot and connected-service data.",
  path: "/data-deletion",
});

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="feature-card">
      <h2 className="text-2xl font-extrabold text-[var(--navy)]">{title}</h2>
      <div className="mt-4 grid gap-4 text-sm leading-7 text-[var(--muted)]">{children}</div>
    </section>
  );
}

export default function DataDeletionPage() {
  return (
    <PageShell darkHeader>
      <PageHero
        eyebrow="Legal & trust"
        title="Data Deletion"
        description="How account and personal-data deletion is handled in eCommPilot, including deletion requests received from connected marketplaces such as eBay."
      />
      <section className="py-14 md:py-18">
        <div className="site-container max-w-4xl">
          <p className="mb-6 text-sm font-bold text-[var(--muted)]">Last updated: 14 September 2026</p>
          <div className="grid gap-5">
            <Section title="eCommPilot workspace users">
              <p>
                If you are an approved eCommPilot user and want your user account removed, ask the
                owner of your workspace to remove your access and submit a deletion request for
                personal information associated with your account. If you cannot contact the
                workspace owner, use the Support page.
              </p>
            </Section>

            <Section title="Connected marketplace or supplier data">
              <p>
                Workspace owners can request disconnection of a third-party integration and deletion
                of synchronized data associated with that connected account. Some financial, tax,
                fraud-prevention, security or dispute records may need to be retained where law or a
                binding platform obligation requires it; where possible, personal information in
                retained records is minimized or de-identified.
              </p>
            </Section>

            <Section title="eBay Marketplace Account Deletion/Closure">
              <p>
                eCommPilot subscribes to eBay Marketplace Account Deletion/Closure notifications
                when production eBay access is enabled. eBay sends signed deletion notifications to
                eCommPilot for eBay users who request account closure and deletion. The service
                verifies the notification and deletes or de-identifies matching eBay user data held
                by eCommPilot.
              </p>
              <p>
                For a valid eBay deletion notice, eCommPilot removes the matching eBay user
                identifiers and associated personal payloads from active storage and removes a
                matching connected eBay seller account and its stored OAuth credentials. The
                operational record kept for compliance contains the notification identifier,
                processing time and aggregate match counts, not the deleted user's identifiers.
              </p>
              <p>
                This automated process is separate from an eCommPilot workspace-user deletion
                request. You do not need to contact eCommPilot separately when eBay has sent a valid
                Marketplace Account Deletion/Closure notification.
              </p>
            </Section>

            <Section title="What to include in a manual request">
              <p>
                To help us identify the correct records without exposing unnecessary information,
                provide the eCommPilot workspace name, your account email, the connected service
                involved, and a short description of the request. Do not send API secrets,
                passwords, OAuth tokens or payment credentials.
              </p>
            </Section>

            <Section title="Identity and authorization checks">
              <p>
                We may need to verify that the requester is the account holder, workspace owner,
                authorized administrator or otherwise legally entitled to make the request before
                deleting records.
              </p>
            </Section>

            <Section title="Completion">
              <p>
                We aim to process verified deletion requests without unnecessary delay and in
                accordance with applicable law and third-party platform requirements. For eBay
                Marketplace Account Deletion/Closure requests, deleted eBay user data must not be
                restored or reintroduced from backups. Other deletion requests follow applicable
                legal and retention requirements.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={routes.support}
                  className="text-sm font-extrabold text-[var(--blue)]"
                >
                  Support Guidance →
                </Link>
                <Link href="/privacy" className="text-sm font-extrabold text-[var(--blue)]">
                  Privacy Policy →
                </Link>
              </div>
            </Section>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
