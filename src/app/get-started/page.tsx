import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { PageShell } from "@/components/site/page-shell";
import { routes } from "@/config/routes";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({ title: "Get Started with eCommPilot", description: "Explore public Winning Products and free eBay seller tools. Check member access availability before registering.", path: "/get-started", noIndex: true });

const planNames = {
  free: "Free",
  pro: "Pro",
  premium: "Premium",
} as const;

type PlanId = keyof typeof planNames;

function selectedPlan(value: string | string[] | undefined): PlanId | null {
  const candidate = Array.isArray(value) ? value[0] : value;
  return candidate && candidate in planNames ? candidate as PlanId : null;
}

export default async function GetStartedPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string | string[] }>;
}) {
  const plan = selectedPlan((await searchParams).plan);
  const selection = plan ? `${planNames[plan]} membership` : "a membership";

  return <PageShell darkHeader><PageHero eyebrow="Get started" title={plan ? `You selected ${planNames[plan]}.` : "Explore eCommPilot for free."} description="Winning Products previews and ten practical eBay tools are open to browse without an account." /><section className="py-14"><div className="site-container grid gap-5 md:grid-cols-2"><article className="feature-card"><h2 className="text-2xl font-extrabold text-[var(--navy)]">Start with the public site</h2><p className="mt-4 text-sm leading-7 text-[var(--muted)]">Use the free calculators and listing helpers, then review the published Winning Products catalogue for your market.</p><div className="mt-6 flex flex-wrap gap-3"><Link href={routes.freeTools} className="button button-primary">Explore Free Tools</Link><Link href={routes.winningProducts} className="button button-secondary">Browse Products</Link></div></article><article className="feature-card"><p className="eyebrow">Selected plan</p><h2 className="mt-3 text-2xl font-extrabold text-[var(--navy)]">{plan ? planNames[plan] : "Member registration"}</h2><p className="mt-4 text-sm leading-7 text-[var(--muted)]">New account registration and password recovery are still subject to a separate application readiness check. We recorded no account or entitlement from this page, and selecting {selection} does not grant paid access. Existing members can sign in through the app.</p><div className="mt-6 flex flex-wrap gap-3"><Link href={routes.login} className="button button-secondary">Existing member login</Link><Link href={routes.pricing} className="button button-ghost">Compare plans</Link></div></article></div></section></PageShell>;
}
