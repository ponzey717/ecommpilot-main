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
      className="mt-4 grid gap-3 rounded-[18px] border border-[var(--border)] bg-white p-4 lg:grid-cols-[minmax(220px,.8fr)_minmax(280px,1.3fr)_auto] lg:items-end"
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

      <label className="grid gap-2 text-sm font-extrabold text-[var(--navy)]">
        Category
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

      <label className="grid gap-2 text-sm font-extrabold text-[var(--navy)]">
        Search product title
        <input
          className="catalog-input"
          type="search"
          name="search"
          maxLength={120}
          defaultValue={filters.search ?? ""}
          placeholder="e.g. magnetic phone holder"
        />
      </label>

      <div className="flex flex-wrap gap-2">
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
