import Link from "next/link";
import type { PublicCategory } from "@/lib/api/public-catalog";
import {
  catalogFilterQuery,
  type PublicCatalogFilterState,
} from "@/lib/catalog-filters";

function basePath(market?: string) {
  return market ? `/winning-products/${market.toLowerCase()}` : "/winning-products";
}

export function CatalogQueryForm({
  market,
  categories,
  filters,
  categoriesUnavailable = false,
}: {
  market?: "US" | "UK" | "AU";
  categories: readonly PublicCategory[];
  filters: PublicCatalogFilterState;
  categoriesUnavailable?: boolean;
}) {
  const clearQuery = catalogFilterQuery(filters, {
    category: undefined,
    search: undefined,
  });
  const categoryDisabled = !market || categoriesUnavailable;

  return (
    <form
      method="get"
      action={basePath(market)}
      className="catalog-search-panel"
    >
      {filters.profit != null ? <input type="hidden" name="profit" value={filters.profit} /> : null}
      {filters.sales != null ? <input type="hidden" name="sales" value={filters.sales} /> : null}
      {filters.delivery != null ? <input type="hidden" name="delivery" value={filters.delivery} /> : null}
      {filters.freshness != null ? <input type="hidden" name="freshness" value={filters.freshness} /> : null}
      {filters.supplier ? <input type="hidden" name="supplier" value={filters.supplier} /> : null}
      {filters.sort && filters.sort !== "published" ? (
        <input type="hidden" name="sort" value={filters.sort} />
      ) : null}
      {categoriesUnavailable && filters.category ? (
        <input type="hidden" name="category" value={filters.category} />
      ) : null}

      <label className="catalog-search-field">
        <span>Category</span>
        <select
          name="category"
          defaultValue={filters.category ?? ""}
          className="catalog-input"
          disabled={categoryDisabled}
        >
          <option value="">
            {!market
              ? "Choose a market first"
              : categoriesUnavailable
                ? "Categories temporarily unavailable"
                : "All categories"}
          </option>
          {categories.map((category) => (
            <option
              key={`${category.market}:${category.id}`}
              value={category.slug}
            >
              {category.name}
            </option>
          ))}
        </select>
      </label>

      <label className="catalog-search-field catalog-search-main">
        <span>Search product title</span>
        <span className="catalog-search-input"><i aria-hidden="true">⌕</i><input
            type="search"
            name="search"
            maxLength={100}
            defaultValue={filters.search ?? ""}
            placeholder="Search products, niches or keywords…"
          /></span>
      </label>

      <div className="catalog-search-actions">
        <button className="button button-primary" type="submit">
          Search
        </button>
        <Link
          className="button button-secondary"
          href={basePath(market) + clearQuery}
        >
          Clear
        </Link>
      </div>
    </form>
  );
}
