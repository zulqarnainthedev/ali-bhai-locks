import { createFileRoute } from "@tanstack/react-router";
import { Products } from "@/lib/shop";
import { useMemo } from "react";

export const Route = createFileRoute("/products/safety-disc-locks")({
  head: () => ({
    meta: [
      { title: "Safety & Disc Locks — Ali Bhai Hardware | Lockout, Disc Padlocks" },
      { name: "description", content: "Industrial safety padlocks, lockout-tagout & disc locks for warehouses, factories & shutters. Manufactured in Aligarh." },
      { property: "og:title", content: "Safety & Disc Locks — Ali Bhai Hardware" },
      { property: "og:description", content: "Lockout/tagout, safety padlocks, disc & combination locks for industrial use." },
    ],
  }),
  component: SafetyDiscPage,
});

function SafetyDiscPage() {
  // Render both Safety and Disc Locks under one route
  return (
    <>
      <Products
        category="Safety"
        showFilters={false}
        eyebrow="Category"
        heading="Safety & Disc Locks"
        subhead="Industrial safety padlocks, lockout-tagout, disc & combination locks."
      />
      <Products
        category="Disc Locks"
        showFilters={false}
        eyebrow=""
        heading="Disc Locks"
        subhead="Tamper-resistant disc & combination locks."
      />
    </>
  );
}
