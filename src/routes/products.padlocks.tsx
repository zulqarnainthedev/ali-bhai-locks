import { createFileRoute } from "@tanstack/react-router";
import { Products } from "@/lib/shop";

export const Route = createFileRoute("/products/padlocks")({
  head: () => ({
    meta: [
      { title: "Padlocks — Ali Bhai Hardware | Brass, Iron, SS & Round Padlocks" },
      { name: "description", content: "Brass, iron, stainless steel & round padlocks manufactured in Aligarh. Bulk MOQ, BIS-certified. Pan-India supply from Surat hub." },
      { property: "og:title", content: "Padlocks — Ali Bhai Hardware" },
      { property: "og:description", content: "Full padlock range — brass, iron, SS, round, butterfly. Bulk pricing & MOQ." },
    ],
  }),
  component: () => (
    <Products
      category="Padlocks"
      showFilters={false}
      eyebrow="Category"
      heading="Padlocks"
      subhead="Brass • Iron • Stainless Steel • Round • Butterfly — built in Aligarh."
    />
  ),
});
