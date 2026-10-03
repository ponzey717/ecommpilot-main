import { demoProducts } from "@/data/demo-products";
import { ProductCard } from "./product-card";

export function ProductGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {demoProducts.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}
