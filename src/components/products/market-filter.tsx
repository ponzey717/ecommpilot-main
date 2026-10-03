import Link from "next/link";
import {
  getPublicMarketsWithFallback,
  getPublicProfitBands,
  type PublicMarket,
} from "@/lib/api/public-catalog";

const fallbackBands = [10, 15, 20, 25, 30, 35, 40, 50];

function withProfitBand(path: string, band?: number) {
  if (band == null) return path;
  const query = new URLSearchParams({ minProfitBand: String(band) });
  return path + "?" + query.toString();
}

export async function MarketFilter({
  currentMarket,
  currentMinProfitBand,
  basePath = "/winning-products",
}: {
  currentMarket?: PublicMarket["code"];
  currentMinProfitBand?: number;
  basePath?: string;
}) {
  const [markets, apiBands] = await Promise.all([
    getPublicMarketsWithFallback(),
    getPublicProfitBands(),
  ]);
  const bands = (apiBands?.length
    ? apiBands.map((band) => band.minimumPercent)
    : fallbackBands
  ).filter((band, index, values) => values.indexOf(band) === index);

  return (
    <div className="filter-panel">
      <div className="flex flex-wrap items-center gap-2">
        <span className="filter-label">Market</span>
        <Link
          href={withProfitBand("/winning-products", currentMinProfitBand)}
          className={!currentMarket ? "filter-chip filter-chip-active" : "filter-chip"}
        >
          All
        </Link>
        {markets
          .filter((market) => market.active)
          .map((market) => (
            <Link
              key={market.code}
              href={withProfitBand(
                "/winning-products/" + market.slug,
                currentMinProfitBand,
              )}
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

      <div className="flex flex-wrap items-center gap-2">
        <span className="filter-label">Minimum profit</span>
        <Link
          href={basePath}
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
            href={withProfitBand(basePath, band)}
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
  );
}
