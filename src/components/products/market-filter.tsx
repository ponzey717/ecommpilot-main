const markets = ["US", "UK", "AU"] as const;
const margins = ["10%+", "20%+", "30%+", "40%+", "50%+"] as const;

export function MarketFilter() {
  return (
    <div className="filter-panel">
      <div className="flex flex-wrap items-center gap-2">
        <span className="filter-label">Market</span>
        {markets.map((market, index) => (
          <button
            key={market}
            type="button"
            className={index === 0 ? "filter-chip filter-chip-active" : "filter-chip"}
          >
            {market}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="filter-label">Minimum profit</span>
        {margins.map((margin, index) => (
          <button
            key={margin}
            type="button"
            className={index === 0 ? "filter-chip filter-chip-active" : "filter-chip"}
          >
            {margin}
          </button>
        ))}
      </div>
    </div>
  );
}
