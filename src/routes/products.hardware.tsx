import { createFileRoute } from "@tanstack/react-router";
import { Products } from "@/lib/shop";

export const Route = createFileRoute("/products/hardware")({
  head: () => ({
    meta: [
      { title: "Hardware — Ali Bhai Hardware | Shutter Locks, Tower Bolts, Cupboard" },
      { name: "description", content: "Shutter locks, tower bolts, cupboard locks & general building hardware. Bulk supply across India from Aligarh." },
      { property: "og:title", content: "Hardware — Ali Bhai Hardware" },
      { property: "og:description", content: "Shutter locks, tower bolts, cupboard locks & building hardware in bulk." },
    ],
  }),
  component: () => (
    <Products
      category="Hardware"
      showFilters={false}
      eyebrow="Category"
      heading="Hardware"
      subhead="Shutter locks, tower bolts, cupboard locks & building hardware."
    />
  ),
});
