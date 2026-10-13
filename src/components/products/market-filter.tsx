import Link from "next/link";
import {
  catalogFilterQuery,
  publicDeliveryThresholds,
  publicFreshnessThresholds,
  publicProfitBands,
  publicSalesThresholds,
  publicSorts,
  type PublicCatalogFilterState,
} from "@/lib/catalog-filters";

const markets = ["US", "UK", "AU"] as const;

function basePath(market?: string) {
  return market ? `/winning-products/${market.toLowerCase()}` : "/winning-products";
}

function href(
  market: string | undefined,
  filters: PublicCatalogFilterState,
  overrides: Partial<PublicCatalogFilterState>,
) {
  return basePath(market) + catalogFilterQuery(filters, overrides);
}

function chip(active: boolean) {
  return active ? "filter-chip filter-chip-active" : "filter-chip";
}

export function MarketFilter({
  market,
  filters = {},
}: {
  market?: (typeof markets)[number];
  filters?: PublicCatalogFilterState;
}) {
  const activeCount = [filters.profit, filters.sales, filters.delivery, filters.supplier, filters.freshness].filter((value) => value != null).length;
  return (
    <section className="filter-panel" aria-label="Product filters">
      <div className="filter-panel-head">
        <div className="filter-panel-title"><span aria-hidden="true">⌁</span><div><b>Refine products</b><small>Use verified research signals to narrow the catalogue.</small></div></div>
        <Link href={basePath(market)} className="filter-reset">Reset filters</Link>
      </div>
      <div className="filter-market-row">
          <span className="filter-label">Marketplace</span>
          <div className="filter-market-tabs">
          <Link
            href={href(undefined, filters, { category: undefined })}
            className={market ? "filter-market-tab" : "filter-market-tab is-active"}
          >
            <span aria-hidden="true">◎</span> All markets
          </Link>
          {markets.map((item) => (
            <Link
              key={item}
              href={href(item, filters, item === market ? {} : { category: undefined })}
              className={market === item ? "filter-market-tab is-active" : "filter-market-tab"}
            >
              <span className={`fi fi-${item === "UK" ? "gb" : item.toLowerCase()}`} aria-hidden="true" /> {item}
            </Link>
          ))}
          </div>
        </div>

        <details className="catalog-more-filters" open>
          <summary><span className="filter-summary-copy">Advanced filters {activeCount ? <b>{activeCount} active</b> : null}</span><span className="filter-summary-chevron" aria-hidden="true">⌄</span></summary>
          <div className="catalog-more-filters-content">
        <div className="filter-group">
          <span className="filter-label"><i aria-hidden="true">%</i> Minimum profit</span>
          <div className="filter-options">
          <Link
            href={href(market, filters, { profit: undefined })}
            className={chip(filters.profit == null)}
          >
            All
          </Link>
          {publicProfitBands.map((band) => (
            <Link
              key={band}
              href={href(market, filters, { profit: band })}
              className={chip(filters.profit === band)}
            >
              {band}%+
            </Link>
          ))}
          </div>
        </div>

        <div className="filter-group">
          <span className="filter-label"><i aria-hidden="true">↗</i> 30-day SOLD</span>
          <div className="filter-options">
          <Link
            href={href(market, filters, { sales: undefined })}
            className={chip(filters.sales == null)}
          >
            All
          </Link>
          {publicSalesThresholds.map((sales) => (
            <Link
              key={sales}
              href={href(market, filters, { sales })}
              className={chip(filters.sales === sales)}
            >
              {sales}+
            </Link>
          ))}
          </div>
        </div>

        <div className="filter-group">
          <span className="filter-label"><i aria-hidden="true">⇢</i> Max delivery</span>
          <div className="filter-options">
          <Link
            href={href(market, filters, { delivery: undefined })}
            className={chip(filters.delivery == null)}
          >
            Any
          </Link>
          {publicDeliveryThresholds.map((days) => (
            <Link
              key={days}
              href={href(market, filters, { delivery: days })}
              className={chip(filters.delivery === days)}
            >
              {days} days
            </Link>
          ))}
          </div>
        </div>

        <div className="filter-group">
          <span className="filter-label"><i aria-hidden="true">◇</i> Supplier</span>
          <div className="filter-options">
          <Link
            href={href(market, filters, { supplier: undefined })}
            className={chip(filters.supplier == null)}
          >
            All
          </Link>
          <Link
            href={href(market, filters, { supplier: "aliexpress" })}
            className={chip(filters.supplier === "aliexpress")}
          >
            AliExpress
          </Link>
          </div>
        </div>

        <div className="filter-group">
          <span className="filter-label"><i aria-hidden="true">◷</i> Freshness</span>
          <div className="filter-options">
          <Link
            href={href(market, filters, { freshness: undefined })}
            className={chip(filters.freshness == null)}
          >
            Any
          </Link>
          {publicFreshnessThresholds.map((hours) => (
            <Link
              key={hours}
              href={href(market, filters, { freshness: hours })}
              className={chip(filters.freshness === hours)}
            >
              {hours === 24 ? "24h" : hours === 72 ? "3 days" : "7 days"}
            </Link>
          ))}
          </div>
        </div>
          </div>
        </details>

        <div className="filter-sort-row">
          <span className="filter-label">Sort results</span>
          <div className="filter-sort-options">
          {publicSorts.map(([value, label]) => (
            <Link
              key={value}
              href={href(market, filters, {
                sort: value === "published" ? undefined : value,
              })}
              className={chip((filters.sort ?? "published") === value)}
            >
              {label}
            </Link>
          ))}
          </div>
        </div>
    </section>
  );
}
