import assert from "node:assert/strict";
import test from "node:test";
import { projectPublicProduct } from "./public-catalog.ts";

const privateFields = {
  supplier_url: "https://supplier.invalid/private",
  supplierUrl: "https://supplier.invalid/private-camel",
  supplierProductId: "private-product-camel",
  supplier_product_id: "private-product-snake",
  variant_id: "private-variant",
  supplier_variant_id: "private-supplier-variant",
  item_cost_minor: 123,
  shipping_cost_minor: 45,
  confirmed_quote_id: "private-quote",
  supplier_pool_id: "private-pool",
  workspace_id: "private-workspace",
  evidence_id: "private-evidence",
  raw_payload: { secret: "private-raw-payload" },
  integration_account_id: "private-integration-account",
  admin_state: "private-admin-state",
};

function hostileProduct(overrides = {}) {
  return {
    id: "public-id",
    slug: "safe-product",
    name: "Safe Product",
    market: "AU",
    marketplace: "EBAY_AU",
    summary: "Public summary",
    category: {
      id: "category-id",
      name: "Category",
      slug: "category",
      ...privateFields,
    },
    image: {
      url: "https://media.ecommpilot.net/safe.jpg",
      alt: "Safe product",
      width: 1200,
      height: 1200,
      ...privateFields,
    },
    ebay: {
      sales30d: 42,
      activeListings: 8,
      checkedAt: "2026-10-05T00:00:00.000Z",
      ...privateFields,
    },
    supplier: {
      provider: "aliexpress",
      choice: true,
      rating: 4.8,
      orderCount: 200,
      deliveryMinDays: 7,
      deliveryMaxDays: 12,
      inStock: true,
      checkedAt: "2026-10-05T00:00:00.000Z",
      ...privateFields,
    },
    economics: {
      currency: "AUD",
      recommendedSellingPriceMinor: 4999,
      netProfitMinor: 1600,
      profitPercent: 32,
      roiPercent: 55,
      profitBand: "30-plus",
      checkedAt: "2026-10-05T00:00:00.000Z",
      adCostIncluded: false,
      ...privateFields,
    },
    freshness: {
      status: "fresh",
      checkedAt: "2026-10-05T00:00:00.000Z",
      ...privateFields,
    },
    access: {
      details: "preview",
      requiredTier: "free",
      ...privateFields,
    },
    standbySupplier: {
      available: true,
      provider: "aliexpress",
      ...privateFields,
    },
    methodology: {
      profit: "Public methodology",
      optionalAdvertisingExcluded: true,
      ...privateFields,
    },
    ...privateFields,
    ...overrides,
  };
}

function assertNoPrivateData(value) {
  const serialized = JSON.stringify(value);
  for (const [field, privateValue] of Object.entries(privateFields)) {
    assert.equal(Object.hasOwn(value ?? {}, field), false, `root must not expose ${field}`);
    assert.equal(serialized.includes(field), false, `payload must not expose key ${field}`);
    if (typeof privateValue === "string") {
      assert.equal(serialized.includes(privateValue), false, `payload must not expose value for ${field}`);
    }
  }
  assert.equal(serialized.includes("private-raw-payload"), false);
}

test("list projection keeps an explicit public allowlist under a hostile provider payload", () => {
  const projected = projectPublicProduct(hostileProduct());
  assert.ok(projected);
  assert.deepEqual(Object.keys(projected).sort(), [
    "access",
    "category",
    "ebay",
    "economics",
    "freshness",
    "id",
    "image",
    "market",
    "marketplace",
    "name",
    "slug",
    "supplier",
  ]);
  assert.equal("summary" in projected, false, "list projection must omit detail-only summary");
  assertNoPrivateData(projected);
});

test("detail and related-product projections recursively discard private fields", () => {
  const projected = projectPublicProduct(
    hostileProduct({
      relatedProducts: [hostileProduct({ id: "related-id", slug: "related-product" })],
    }),
    true,
  );
  assert.ok(projected);
  assert.equal(projected.summary, "Public summary");
  assert.equal(projected.standbySupplier?.available, true);
  assert.equal(projected.relatedProducts?.[0]?.id, "related-id");
  assert.equal("summary" in projected.relatedProducts[0], false);
  assertNoPrivateData(projected);
});

test("malformed required identity is rejected instead of partially projected", () => {
  assert.equal(projectPublicProduct(hostileProduct({ marketplace: "EBAY_DE" })), null);
  assert.equal(projectPublicProduct(hostileProduct({ name: null })), null);
  assert.equal(projectPublicProduct([hostileProduct()]), null);
});
