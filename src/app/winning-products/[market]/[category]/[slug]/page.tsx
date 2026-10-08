import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { routes } from "@/config/routes";
import { PageHero } from "@/components/site/page-hero";
import { PageShell } from "@/components/site/page-shell";
import { JsonLd } from "@/components/seo/json-ld";
import {
  getPublicProductState,
  type PublicProductDetail,
} from "@/lib/api/public-catalog";
import { approvedPublicImageUrl } from "@/lib/public-image";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";

type PageProps = {
  params: Promise<{ market: string; category: string; slug: string }>;
};

function matchesRoute(
  product: PublicProductDetail,
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
  const state = await getPublicProductState(slug);
  const product = state.product;

  if (state.unavailable || !product || !matchesRoute(product, market, category)) {
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
    image: approvedPublicImageUrl(product.image?.url) ?? undefined,
  });
}

function supplierLabel(value: string | null | undefined) {
  if (!value) return "Not available";
  return value.toLowerCase() === "aliexpress" ? "AliExpress" : value;
}

function value(value: string | number | null | undefined, fallback = "Not available") {
  return value == null || value === "" ? fallback : String(value);
}

function money(value: number | null | undefined, currency: string | null | undefined) {
  if (value == null || !currency) return "Not available";
  try {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(value / 100);
  } catch {
    return "Not available";
  }
}


export default async function ProductPage({ params }: PageProps) {
  const { market, category, slug } = await params;
  const state = await getPublicProductState(slug);
  const product = state.product;
  if (state.unavailable) {
    return (
      <PageShell darkHeader>
        <PageHero
          eyebrow="Winning Product"
          title="Product data is temporarily unavailable."
          description="eCommPilot could not load the current public product projection, so this page is not substituting cached private data or a fabricated product result."
        />
        <section className="py-12 md:py-16">
          <div className="site-container">
            <div className="rounded-[22px] border border-amber-200 bg-amber-50 p-8 text-center text-sm leading-6 text-[var(--muted)]">
              Please try this product again shortly.
            </div>
          </div>
        </section>
      </PageShell>
    );
  }
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

          {approvedPublicImageUrl(product.image?.url) ? (
            <div className="mt-8 overflow-hidden rounded-[24px] border border-[var(--border)] bg-white">
              <Image
                src={approvedPublicImageUrl(product.image?.url)!}
                alt={product.image?.alt ?? product.name}
                width={product.image?.width ?? 1200}
                height={product.image?.height ?? 800}
                className="max-h-[520px] w-full object-contain bg-[var(--surface-soft)]"
                priority
              />
            </div>
          ) : null}

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
            <article className="feature-card">
              <p className="eyebrow">Demand & economics</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                <div className="metric-box">
                  <span className="metric-label">30-day SOLD</span>
                  <strong>{value(product.ebay?.sales30d, "—")}</strong>
                </div>
                <div className="metric-box">
                  <span className="metric-label">Active listings</span>
                  <strong>{value(product.ebay?.activeListings, "—")}</strong>
                </div>
                <div className="metric-box">
                  <span className="metric-label">Target price</span>
                  <strong className="!text-lg">
                    {money(
                      product.economics?.recommendedSellingPriceMinor,
                      product.economics?.currency,
                    )}
                  </strong>
                </div>
                <div className="metric-box">
                  <span className="metric-label">Est. net profit</span>
                  <strong className="!text-lg !text-emerald-700">
                    {money(product.economics?.netProfitMinor, product.economics?.currency)}
                  </strong>
                </div>
                <div className="metric-box">
                  <span className="metric-label">Est. margin</span>
                  <strong className="!text-emerald-700">
                    {product.economics?.profitPercent != null
                      ? product.economics.profitPercent.toFixed(1) + "%"
                      : "—"}
                  </strong>
                </div>
                <div className="metric-box">
                  <span className="metric-label">ROI</span>
                  <strong>
                    {product.economics?.roiPercent != null
                      ? product.economics.roiPercent.toFixed(1) + "%"
                      : "—"}
                  </strong>
                </div>
              </div>
              <p className="mt-5 text-xs leading-5 text-[var(--muted)]">
                Public values are shown only when the allowlisted publication API supplies current evidence. Optional advertising is excluded from the V1 profit model unless explicitly stated.
              </p>
            </article>

            <aside className="snapshot-card">
              <p className="eyebrow">Supplier snapshot</p>
              <div className="mt-5 grid gap-4">
                <div>
                  <span className="metric-label">Provider</span>
                  <p className="mt-1 font-extrabold text-[var(--navy)]">
                    {supplierLabel(product.supplier?.provider)}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="metric-label">Rating</span>
                    <p className="mt-1 font-extrabold text-[var(--navy)]">
                      {product.supplier?.rating != null ? product.supplier.rating.toFixed(1) : "—"}
                    </p>
                  </div>
                  <div>
                    <span className="metric-label">Supplier orders</span>
                    <p className="mt-1 font-extrabold text-[var(--navy)]">
                      {value(product.supplier?.orderCount, "—")}
                    </p>
                  </div>
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
                <div className="flex flex-wrap gap-2">
                  {product.supplier?.choice ? (
                    <span className="badge badge-choice">✓ AliExpress Choice</span>
                  ) : null}
                  {product.supplier?.inStock === true ? (
                    <span className="badge badge-neutral">In stock</span>
                  ) : null}
                  {product.standbySupplier?.available ? (
                    <span className="badge badge-neutral">Standby supplier available</span>
                  ) : null}
                  {product.freshness?.status ? (
                    <span className="badge badge-neutral">{product.freshness.status}</span>
                  ) : null}
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-[var(--border)] bg-white p-4">
                <p className="text-sm font-extrabold text-[var(--navy)]">
                  Want the exact supplier and listing-ready workflow?
                </p>
                <p className="mt-2 text-xs leading-5 text-[var(--muted)]">
                  Member access is filtered server-side. Private supplier URLs, protected costs, competitor links and internal evidence are never exposed by the public page.
                </p>
                <Link
                  href={routes.join}
                  className="button button-primary mt-4"
                >
                  Get Started Free
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
