import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { PageShell } from "@/components/site/page-shell";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How eCommPilot collects, uses, stores and deletes data.",
  path: "/privacy",
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="feature-card">
      <h2 className="text-2xl font-extrabold text-[var(--navy)]">{title}</h2>
      <div className="mt-4 grid gap-4 text-sm leading-7 text-[var(--muted)]">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <PageShell darkHeader>
      <PageHero
        eyebrow="Legal & trust"
        title="Privacy Policy"
        description="How eCommPilot handles information when you use the service or connect third-party marketplace, supplier and AI services."
      />
      <section className="py-14 md:py-18">
        <div className="site-container max-w-4xl">
          <p className="mb-6 text-sm font-bold text-[var(--muted)]">Last updated: 14 September 2026</p>
          <div className="grid gap-5">
            <Section title="1. Information we process">
              <p>
                We may process account and workspace information such as your name, email address,
                role, authentication records and account-security events. We also process
                information that you choose to connect or import from third-party services,
                including marketplace seller identity, listings, orders, buyer identifiers,
                financial transactions, traffic analytics, supplier and product information,
                delivery estimates and related operational data.
              </p>
              <p>
                When AI features are enabled, prompts, instructions and relevant workspace context
                may be processed to provide the requested AI-assisted functionality. We also
                process technical information needed to operate and secure the service, such as
                timestamps, integration status, error logs, audit events and limited request metadata.
              </p>
            </Section>

            <Section title="2. Sources of information">
              <p>
                Information may come directly from you, from your workspace owner or administrator,
                from services you authorize eCommPilot to connect to, and from normal operation of
                the application. Connected services may include eBay, AliExpress and other services
                added by the workspace owner.
              </p>
            </Section>

            <Section title="3. How we use information">
              <p>
                We use information to authenticate users, operate workspaces, synchronize authorized
                marketplace and supplier data, calculate operational and financial metrics, support
                product research, detect integration problems, provide AI-assisted features, maintain
                audit records, protect the service, comply with platform requirements and respond to
                privacy or deletion requests.
              </p>
              <p>
                eCommPilot does not use connected marketplace credentials to perform marketplace
                write actions unless that functionality is explicitly enabled and authorized. The
                current Phase 1 eBay integration is designed for read-only synchronization.
              </p>
            </Section>

            <Section title="4. Third-party services and service providers">
              <p>
                eCommPilot relies on third-party services to provide parts of the product. These may
                include eBay and AliExpress for authorized marketplace or supplier data, OpenAI for
                AI-assisted features when configured, Hostinger for application hosting,
                Supabase/PostgreSQL for database services, and Upstash/Redis for queueing or caching.
                Each third party processes information under its own terms and privacy practices.
              </p>
              <p>
                We do not sell personal information. We share information only as needed to provide
                the service, follow your authorized integrations, protect the service, comply with law
                or meet contractual and platform obligations.
              </p>
            </Section>

            <Section title="5. eBay data and marketplace account deletion">
              <p>
                eCommPilot may store eBay data needed for authorized seller operations. eBay requires
                applications that store eBay user data to receive Marketplace Account
                Deletion/Closure notifications. When eCommPilot receives a valid signed deletion
                notification, it processes the request to delete or de-identify matching eBay user
                data from the service, except information that must be retained for a specific legal,
                accounting, fraud-prevention or dispute requirement.
              </p>
              <p>
                Connected eBay OAuth access and refresh tokens are stored encrypted. If a connected
                seller account is identified by a valid account-deletion notice, associated
                integration credentials and seller-linked synchronized data are removed from
                eCommPilot.
              </p>
            </Section>

            <Section title="6. Retention">
              <p>
                We keep information only for as long as reasonably needed for the purposes described
                above, to operate the workspace, maintain required financial or security records,
                resolve disputes and comply with legal or platform obligations. Data that is no longer
                needed is deleted or de-identified where practical.
              </p>
            </Section>

            <Section title="7. Security">
              <p>
                eCommPilot uses technical and organizational safeguards designed for the sensitivity
                of the information processed. These include hashed passwords, signed sessions,
                encrypted integration credentials, workspace-scoped access controls, restricted
                administrative capabilities and audit logging. No online system can guarantee
                absolute security.
              </p>
            </Section>

            <Section title="8. Cookies and browser storage">
              <p>
                eCommPilot currently uses essential authentication/session technology needed to keep
                signed-in users securely connected to their workspace. We do not currently use
                advertising cookies or sell cookie-derived data.
              </p>
            </Section>

            <Section title="9. International processing">
              <p>
                eCommPilot and its service providers may process information in countries different
                from your own. Where applicable, we use the service providers and contractual
                arrangements available to support lawful international processing.
              </p>
            </Section>

            <Section title="10. Your choices and privacy requests">
              <p>
                Depending on applicable law, you may have rights to request access, correction,
                deletion or restriction of personal information. Workspace users can also ask the
                workspace owner to remove or update their eCommPilot account. For instructions, visit
                the Data Deletion page or Support page.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/data-deletion" className="text-sm font-extrabold text-[var(--blue)]">
                  Data Deletion →
                </Link>
                <Link href="https://app.ecommpilot.net/support" className="text-sm font-extrabold text-[var(--blue)]">
                  Support Guidance →
                </Link>
              </div>
            </Section>

            <Section title="11. Children">
              <p>
                eCommPilot is a business operations service and is not intended for children under
                18. We do not knowingly offer accounts to children.
              </p>
            </Section>

            <Section title="12. Changes to this policy">
              <p>
                We may update this policy as the service, integrations or legal requirements change.
                The current version and its update date will remain available at this URL.
              </p>
            </Section>

            <Section title="13. Contact">
              <p>
                Privacy and data-protection requests can be submitted through the eCommPilot Support
                page or through the owner of the workspace that controls your account.
              </p>
            </Section>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
