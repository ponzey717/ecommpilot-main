import Link from "next/link";
import {
  getPublicMarketsWithFallback,
  getPublicProfitBands,
  type PublicMarket,
} from "@/lib/api/public-catalog";

const fallbackBands = [10, 15, 20, 25, 30, 35, 40, 50];

type PreservedCatalogFilters = {
  minSales30d?: number;
  maxDeliveryDays?: number;
  supplier?: string;
  freshnessHours?: number;
};

function withFilters(
  path: string,
  input: PreservedCatalogFilters & { minProfitBand?: number },
) {
  const query = new URLSearchParams();
  if (input.minProfitBand != null) {
    query.set("minProfitBand", String(input.minProfitBand));
  }
  if (input.minSales30d != null) {
    query.set("minSales30d", String(input.minSales30d));
  }
  if (input.maxDeliveryDays != null) {
    query.set("maxDeliveryDays", String(input.maxDeliveryDays));
  }
  if (input.supplier) query.set("supplier", input.supplier);
  if (input.freshnessHours != null) {
    query.set("freshnessHours", String(input.freshnessHours));
  }

  const suffix = query.toString();
  return suffix ? path + "?" + suffix : path;
}

export async function MarketFilter({
  currentMarket,
  currentMinProfitBand,
  minSales30d,
  maxDeliveryDays,
  supplier,
  freshnessHours,
  basePath = "/winning-products",
}: {
  currentMarket?: PublicMarket["code"];
  currentMinProfitBand?: number;
  minSales30d?: number;
  maxDeliveryDays?: number;
  supplier?: string;
  freshnessHours?: number;
  basePath?: string;
}) {
  const [markets, apiBands] = await Promise.all([
    getPublicMarketsWithFallback(),
    getPublicProfitBands(),
  ]);
  const bands = (apiBands?.length
    ? apiBands.map((band) => band.minimumPercent)
    : fallbackBands
  )
    .filter((band, index, values) => values.indexOf(band) === index)
    .sort((a, b) => a - b);

  const preserved = {
    ...(minSales30d != null ? { minSales30d } : {}),
    ...(maxDeliveryDays != null ? { maxDeliveryDays } : {}),
    ...(supplier ? { supplier } : {}),
    ...(freshnessHours != null ? { freshnessHours } : {}),
  };

  return (
    <div className="filter-panel">
      <div className="filter-row">
        <span className="filter-label">Market</span>
        <div className="filter-options">
          <Link
            href={withFilters("/winning-products", {
              ...preserved,
              ...(currentMinProfitBand != null
                ? { minProfitBand: currentMinProfitBand }
                : {}),
            })}
            className={!currentMarket ? "filter-chip filter-chip-active" : "filter-chip"}
          >
            All
          </Link>
          {markets
            .filter((market) => market.active)
            .map((market) => (
              <Link
                key={market.code}
                href={withFilters("/winning-products/" + market.slug, {
                  ...preserved,
                  ...(currentMinProfitBand != null
                    ? { minProfitBand: currentMinProfitBand }
                    : {}),
                })}
                className={
                  currentMarket === market.code
                    ? "filter-chip filter-chip-active"
                    : "filter-chip"
                }
              >
                {market.code}
              </Link>
            ))}
        </div>
      </div>

      <div className="filter-row">
        <span className="filter-label">Minimum profit</span>
        <div className="filter-options">
          <Link
            href={withFilters(basePath, preserved)}
            className={
              currentMinProfitBand == null
                ? "filter-chip filter-chip-active"
                : "filter-chip"
            }
          >
            All
          </Link>
          {bands.map((band) => (
            <Link
              key={band}
              href={withFilters(basePath, {
                ...preserved,
                minProfitBand: band,
              })}
              className={
                currentMinProfitBand === band
                  ? "filter-chip filter-chip-active"
                  : "filter-chip"
              }
            >
              {band}%+
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
