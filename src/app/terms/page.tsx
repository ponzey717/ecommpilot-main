import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { PageShell } from "@/components/site/page-shell";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Use",
  description: "Terms governing access to and use of eCommPilot.",
  path: "/terms",
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="feature-card">
      <h2 className="text-2xl font-extrabold text-[var(--navy)]">{title}</h2>
      <div className="mt-4 grid gap-4 text-sm leading-7 text-[var(--muted)]">{children}</div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <PageShell darkHeader>
      <PageHero
        eyebrow="Legal & trust"
        title="Terms of Use"
        description="These Terms govern access to and use of eCommPilot."
      />
      <section className="py-14 md:py-18">
        <div className="site-container max-w-4xl">
          <p className="mb-6 text-sm font-bold text-[var(--muted)]">Last updated: 14 September 2026</p>
          <div className="grid gap-5">
            <Section title="1. Service purpose">
              <p>
                eCommPilot is a commerce research and operations platform. It can organize
                marketplace, supplier, operational and AI-assisted workflows for authorized
                workspaces. Features may change as the service develops.
              </p>
            </Section>

            <Section title="2. Accounts and access">
              <p>
                Workspace access is limited to approved users. You are responsible for keeping your
                password and connected-service credentials confidential and for activity performed
                through your account. Workspace owners and administrators may control roles and
                access within their workspace.
              </p>
            </Section>

            <Section title="3. Connected services">
              <p>
                You may connect third-party services such as eBay, AliExpress and AI providers. You
                must have authority to connect each account and must comply with the terms, policies
                and API rules of each provider. eCommPilot does not grant rights to third-party data
                beyond the rights provided by those services.
              </p>
            </Section>

            <Section title="4. Commerce actions and approvals">
              <p>
                Some eCommPilot features may recommend or prepare commercial actions. Where approval
                controls are enabled, the responsible user must review the action before it is
                executed. You remain responsible for marketplace listings, prices, orders,
                fulfilment, refunds, cancellations, taxes, legal compliance and supplier decisions
                made through your business accounts.
              </p>
            </Section>

            <Section title="5. Acceptable use">
              <p>
                You may not use eCommPilot to violate law, platform rules, intellectual-property
                rights, privacy rights, sanctions, export restrictions or security controls. You may
                not attempt to bypass access controls, obtain data you are not authorized to access,
                or use the service to deceive buyers, sellers or platform operators.
              </p>
            </Section>

            <Section title="6. AI-assisted features">
              <p>
                AI-generated suggestions can be incomplete or incorrect. They are assistance, not a
                substitute for business, legal, tax, compliance or financial judgment. Users should
                review material recommendations before acting on them.
              </p>
            </Section>

            <Section title="7. Data and privacy">
              <p>
                Our handling of personal and connected-service data is described in the Privacy
                Policy and Data Deletion pages. You are responsible for having any notices, consents
                or legal basis required for data you submit or connect to the service.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/privacy" className="text-sm font-extrabold text-[var(--blue)]">
                  Privacy Policy →
                </Link>
                <Link href="/data-deletion" className="text-sm font-extrabold text-[var(--blue)]">
                  Data Deletion →
                </Link>
              </div>
            </Section>

            <Section title="8. Availability and changes">
              <p>
                We aim to keep the service reliable, but availability is not guaranteed.
                Third-party APIs, hosting providers and marketplace rules can change without notice
                and may affect features. We may modify or discontinue features when necessary for
                security, compliance, reliability or product development.
              </p>
            </Section>

            <Section title="9. Disclaimer and limitation">
              <p>
                To the extent permitted by applicable law, eCommPilot is provided on an “as
                available” basis. We do not guarantee marketplace sales, supplier performance,
                ranking results, uninterrupted third-party access or the accuracy of third-party
                data. Liability is limited to the extent permitted by applicable law.
              </p>
            </Section>

            <Section title="10. Suspension or termination">
              <p>
                Access may be suspended or terminated where necessary to protect the service, comply
                with law or third-party platform requirements, respond to security risks, or address
                material misuse.
              </p>
            </Section>

            <Section title="11. Contact">
              <p>
                Questions about these terms can be submitted through the eCommPilot Support page or
                through the owner of the workspace that controls your account.
              </p>
              <Link
                href="https://app.ecommpilot.net/support"
                className="text-sm font-extrabold text-[var(--blue)]"
              >
                Support Guidance →
              </Link>
            </Section>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
