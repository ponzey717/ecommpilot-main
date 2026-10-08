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
  return (
    <div className="filter-panel !items-start">
      <div className="grid w-full gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="filter-label">Market</span>
          <Link href={href(undefined, filters, {})} className={chip(!market)}>
            All
          </Link>
          {markets.map((item) => (
            <Link
              key={item}
              href={href(item, filters, item === market ? {} : { category: undefined })}
              className={chip(market === item)}
            >
              {item}
            </Link>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="filter-label">Minimum profit</span>
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

        <div className="flex flex-wrap items-center gap-2">
          <span className="filter-label">30-day SOLD</span>
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

        <div className="flex flex-wrap items-center gap-2">
          <span className="filter-label">Max delivery</span>
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

        <div className="flex flex-wrap items-center gap-2">
          <span className="filter-label">Freshness</span>
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

        <div className="flex flex-wrap items-center gap-2">
          <span className="filter-label">Sort</span>
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
    </div>
  );
}
