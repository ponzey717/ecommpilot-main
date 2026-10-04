import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { PageHero } from "@/components/site/page-hero";
import { PageShell } from "@/components/site/page-shell";
import { JsonLd } from "@/components/seo/json-ld";
import { getPublicProduct } from "@/lib/api/public-catalog";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";

type PageProps = {
  params: Promise<{ market: string; category: string; slug: string }>;
};

function matchesRoute(
  product: NonNullable<Awaited<ReturnType<typeof getPublicProduct>>>,
  market: string,
  category: string,
) {
  return (
    product.market.toLowerCase() === market &&
    product.category?.slug === category
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { market, category, slug } = await params;
  const product = await getPublicProduct(slug);

  if (!product || !matchesRoute(product, market, category)) {
    return {
      title: "Winning Product",
      robots: { index: false, follow: true },
    };
  }

  return buildMetadata({
    title: product.name + " | eBay " + product.market + " Product Research",
    description:
      product.summary ??
      "View verified market, supplier, delivery and profit context for " +
        product.name +
        " on eCommPilot.",
    path:
      "/winning-products/" +
      market +
      "/" +
      category +
      "/" +
      product.slug,
    image: product.image?.url ?? undefined,
  });
}

function value(value: string | number | null | undefined, fallback = "Not available") {
  return value == null || value === "" ? fallback : String(value);
}

export default async function ProductPage({ params }: PageProps) {
  const { market, category, slug } = await params;
  const product = await getPublicProduct(slug);
  if (!product || !matchesRoute(product, market, category)) notFound();

  const productPath =
    "/winning-products/" + market + "/" + category + "/" + product.slug;
  const categoryPath = "/winning-products/" + market + "/" + category;

  return (
    <PageShell darkHeader>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Winning Products", path: "/winning-products" },
          { name: product.market, path: "/winning-products/" + market },
          { name: product.category?.name ?? category, path: categoryPath },
          { name: product.name, path: productPath },
        ])}
      />
      <PageHero
        eyebrow={"eBay " + product.market + " product research"}
        badge={product.economics?.profitBand ?? undefined}
        title={product.name}
        description={
          product.summary ??
          "Verified public product research with current market, supplier, delivery and economics context."
        }
      />
      <section className="py-12 md:py-16">
        <div className="site-container">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Winning Products", href: "/winning-products" },
              { label: product.market, href: "/winning-products/" + market },
              {
                label: product.category?.name ?? category,
                href: categoryPath,
              },
              { label: product.name },
            ]}
          />

          {product.image?.url &&
          (product.image.url.startsWith("/") ||
            product.image.url.startsWith("https://")) ? (
            <div className="mb-6 overflow-hidden rounded-[24px] border border-[var(--border)] bg-white">
              <img
                src={product.image.url}
                alt={product.image.alt}
                width={product.image.width ?? 1200}
                height={product.image.height ?? 840}
                referrerPolicy="no-referrer"
                className="max-h-[560px] w-full object-cover"
              />
            </div>
          ) : null}

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
            <article className="feature-card">
              <p className="eyebrow">Market evidence</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="metric-box">
                  <span className="metric-label">30-day sales</span>
                  <strong>{value(product.ebay?.sales30d, "—")}</strong>
                </div>
                <div className="metric-box">
                  <span className="metric-label">Active listings</span>
                  <strong>{value(product.ebay?.activeListings, "—")}</strong>
                </div>
                <div className="metric-box">
                  <span className="metric-label">Supplier rating</span>
                  <strong>{value(product.supplier?.rating, "—")}</strong>
                </div>
                <div className="metric-box">
                  <span className="metric-label">Est. net margin</span>
                  <strong className="!text-emerald-700">
                    {product.economics?.profitPercent != null
                      ? product.economics.profitPercent.toFixed(1) + "%"
                      : "—"}
                  </strong>
                </div>
              </div>
              <p className="mt-5 text-xs leading-5 text-[var(--muted)]">
                Market and economics values are shown only when the public API supplies
                verified evidence. Missing evidence is not estimated or fabricated.
              </p>
            </article>

            <aside className="snapshot-card">
              <p className="eyebrow">Supplier snapshot</p>
              <div className="mt-5 grid gap-4">
                <div>
                  <span className="metric-label">Provider</span>
                  <p className="mt-1 font-extrabold text-[var(--navy)]">
                    {value(product.supplier?.provider)}
                  </p>
                </div>
                <div>
                  <span className="metric-label">Delivery</span>
                  <p className="mt-1 font-extrabold text-[var(--navy)]">
                    {product.supplier?.deliveryMaxDays != null
                      ? (product.supplier.deliveryMinDays ??
                          product.supplier.deliveryMaxDays) +
                        "–" +
                        product.supplier.deliveryMaxDays +
                        " days"
                      : "Not available"}
                  </p>
                </div>
                <div>
                  <span className="metric-label">Standby supplier</span>
                  <p className="mt-1 font-extrabold text-[var(--navy)]">
                    {product.standbySupplier?.available
                      ? value(product.standbySupplier.provider, "Available")
                      : "Not currently available"}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.supplier?.choice ? (
                    <span className="badge badge-choice">✓ AliExpress Choice</span>
                  ) : null}
                  {product.freshness?.status ? (
                    <span className="badge badge-neutral">
                      {product.freshness.status}
                    </span>
                  ) : null}
                </div>
              </div>

              {product.access?.details === "locked" ? (
                <div className="mt-6 rounded-2xl border border-[var(--border)] bg-white p-4">
                  <p className="text-sm font-extrabold text-[var(--navy)]">
                    More supplier and listing detail is available to members.
                  </p>
                  <Link
                    href="https://app.ecommpilot.net/register"
                    className="button button-primary mt-4"
                  >
                    Join Free
                  </Link>
                </div>
              ) : null}
            </aside>
          </div>

          {product.methodology?.profit ? (
            <article className="feature-card mt-6">
              <p className="eyebrow">Methodology</p>
              <h2 className="mt-3 text-2xl font-extrabold text-[var(--navy)]">
                How the public profit figure is presented
              </h2>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                {product.methodology.profit}
              </p>
              {product.methodology.optionalAdvertisingExcluded ? (
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                  Optional promoted-listing or advertising spend is excluded from this V1 figure.
                </p>
              ) : null}
            </article>
          ) : null}
        </div>
      </section>
    </PageShell>
  );
}
