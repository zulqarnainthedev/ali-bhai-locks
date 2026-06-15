import { createFileRoute } from "@tanstack/react-router";
import { Products } from "@/lib/shop";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — Ali Bhai Hardware | Padlocks, Safety, Hardware" },
      { name: "description", content: "Browse our full catalog of padlocks, safety locks, disc locks & hardware. Categorized, with specs, MOQ & bulk pricing. Manufactured in Aligarh." },
      { property: "og:title", content: "Product Catalog — Ali Bhai Hardware" },
      { property: "og:description", content: "Full lock & hardware catalog with categories, specs & bulk pricing." },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  return (
    <>
      <Products
        eyebrow="Full Catalog"
        heading="Our Complete Product Range"
        subhead="Filter by category. Tap any product for specs, MOQ & lead time."
      />
    </>
  );
}
