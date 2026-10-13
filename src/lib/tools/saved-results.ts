export type SavedToolRecord = {
  id: string;
  createdAt: string;
  label: string;
  sku?: string;
  market?: string;
  currency?: string;
  summary: string;
  metrics: Record<string, string>;
  assumptions?: string;
};

export function safeSpreadsheetCell(value: string) {
  const normalized = value.replaceAll("\u0000", "");
  return /^[=+\-@\t\r]/.test(normalized) ? `'${normalized}` : normalized;
}

export function csvCell(value: string) {
  return `"${safeSpreadsheetCell(value).replaceAll('"', '""')}"`;
}

export function buildResultsCsv(records: SavedToolRecord[]) {
  const metricKeys = [...new Set(records.flatMap((record) => Object.keys(record.metrics)))];
  const headers = ["Item", "SKU", "Market", "Currency", "Result", ...metricKeys, "Assumptions", "Saved at"];
  const rows = records.map((record) => [record.label, record.sku ?? "", record.market ?? "", record.currency ?? "", record.summary, ...metricKeys.map((key) => record.metrics[key] ?? ""), record.assumptions ?? "", record.createdAt]);
  return "\uFEFF" + [headers, ...rows].map((row) => row.map((value) => csvCell(String(value))).join(",")).join("\r\n");
}

export function recordsAsTsv(records: SavedToolRecord[]) {
  return records.map((record) => [record.label, record.sku ?? "", record.market ?? "", record.summary, ...Object.entries(record.metrics).map(([key, value]) => `${key}: ${value}`)].map((value) => safeSpreadsheetCell(String(value)).replace(/[\t\r\n]+/g, " ")).join("\t")).join("\n");
}

export function buildResultsPdfTable(records: SavedToolRecord[], metricKeys: string[]) {
  const headers = ["Item", "Market", "Result", ...metricKeys].map((text) => ({
    text,
    bold: true,
    color: "#FFFFFF",
  }));
  const rows = records.map((record) => [
    record.label + (record.sku ? `\nSKU: ${record.sku}` : ""),
    [record.market, record.currency].filter(Boolean).join(" · "),
    record.summary,
    ...metricKeys.map((key) => record.metrics[key] ?? "—"),
  ]);
  return [headers, ...rows];
}
