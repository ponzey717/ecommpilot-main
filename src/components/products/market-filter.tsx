import Link from "next/link";

const markets = ["US", "UK", "AU"] as const;
const profitBands = [10, 15, 20, 25, 30, 35, 40, 50] as const;

function productsPath(market?: string, profit?: number) {
  const path = market ? `/winning-products/${market.toLowerCase()}` : "/winning-products";
  return profit ? `${path}?profit=${profit}` : path;
}

export function MarketFilter({
  market,
  minimumProfitBand,
}: {
  market?: (typeof markets)[number];
  minimumProfitBand?: number;
}) {
  return (
    <div className="filter-panel">
      <div className="flex flex-wrap items-center gap-2">
        <span className="filter-label">Market</span>
        <Link
          href={productsPath(undefined, minimumProfitBand)}
          className={!market ? "filter-chip filter-chip-active" : "filter-chip"}
        >
          All
        </Link>
        {markets.map((item) => (
          <Link
            key={item}
            href={productsPath(item, minimumProfitBand)}
            className={market === item ? "filter-chip filter-chip-active" : "filter-chip"}
          >
            {item}
          </Link>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="filter-label">Minimum profit</span>
        <Link
          href={productsPath(market)}
          className={minimumProfitBand == null ? "filter-chip filter-chip-active" : "filter-chip"}
        >
          All
        </Link>
        {profitBands.map((band) => (
          <Link
            key={band}
            href={productsPath(market, band)}
            className={minimumProfitBand === band ? "filter-chip filter-chip-active" : "filter-chip"}
          >
            {band}%+
          </Link>
        ))}
      </div>
    </div>
  );
}
