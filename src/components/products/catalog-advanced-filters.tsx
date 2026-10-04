import Link from "next/link";

function clearHref(basePath: string, minProfitBand?: number) {
  if (minProfitBand == null) return basePath;
  const query = new URLSearchParams({ minProfitBand: String(minProfitBand) });
  return basePath + "?" + query.toString();
}

export function CatalogAdvancedFilters({
  basePath,
  minProfitBand,
  minSales30d,
  maxDeliveryDays,
  supplier,
  freshnessHours,
}: {
  basePath: string;
  minProfitBand?: number;
  minSales30d?: number;
  maxDeliveryDays?: number;
  supplier?: string;
  freshnessHours?: number;
}) {
  return (
    <form
      method="get"
      action={basePath}
      className="mt-4 rounded-[18px] border border-[var(--border)] bg-white p-4"
    >
      {minProfitBand != null ? (
        <input type="hidden" name="minProfitBand" value={minProfitBand} />
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <label className="grid gap-2 text-xs font-extrabold text-[var(--navy)]">
          Minimum 30-day sales
          <input
            type="number"
            name="minSales30d"
            min="0"
            max="100000"
            step="1"
            defaultValue={minSales30d}
            placeholder="Any"
            className="min-h-11 rounded-xl border border-[var(--border)] bg-white px-3 text-sm font-semibold text-[var(--text)] outline-none focus:border-[var(--blue)]"
          />
        </label>

        <label className="grid gap-2 text-xs font-extrabold text-[var(--navy)]">
          Maximum delivery days
          <input
            type="number"
            name="maxDeliveryDays"
            min="0"
            max="365"
            step="1"
            defaultValue={maxDeliveryDays}
            placeholder="Any"
            className="min-h-11 rounded-xl border border-[var(--border)] bg-white px-3 text-sm font-semibold text-[var(--text)] outline-none focus:border-[var(--blue)]"
          />
        </label>

        <label className="grid gap-2 text-xs font-extrabold text-[var(--navy)]">
          Supplier
          <select
            name="supplier"
            defaultValue={supplier ?? ""}
            className="min-h-11 rounded-xl border border-[var(--border)] bg-white px-3 text-sm font-semibold text-[var(--text)] outline-none focus:border-[var(--blue)]"
          >
            <option value="">Any supplier</option>
            <option value="aliexpress">AliExpress</option>
          </select>
        </label>

        <label className="grid gap-2 text-xs font-extrabold text-[var(--navy)]">
          Evidence freshness
          <select
            name="freshnessHours"
            defaultValue={freshnessHours?.toString() ?? ""}
            className="min-h-11 rounded-xl border border-[var(--border)] bg-white px-3 text-sm font-semibold text-[var(--text)] outline-none focus:border-[var(--blue)]"
          >
            <option value="">Any current published evidence</option>
            <option value="24">Checked within 24 hours</option>
            <option value="72">Checked within 72 hours</option>
            <option value="168">Checked within 7 days</option>
          </select>
        </label>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button type="submit" className="button button-primary">
          Apply filters
        </button>
        <Link href={clearHref(basePath, minProfitBand)} className="button button-secondary">
          Clear advanced
        </Link>
      </div>
    </form>
  );
}
