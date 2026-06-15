import { createFileRoute } from "@tanstack/react-router";
import {
  Hero, Stats, DualIdentity, Products, SupplyNetwork, Testimonials, Contact,
} from "@/lib/shop";
import { useToast } from "@/lib/shop";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ali Bhai Hardware — Aligarh's Trusted Lock Manufacturer" },
      { name: "description", content: "Premium padlocks & hardware manufactured in Aligarh since 1995. Pan-India supply with 24hr Gujarat hub dispatch." },
      { property: "og:title", content: "Ali Bhai Hardware — Lock Manufacturer, Aligarh" },
      { property: "og:description", content: "Premium padlocks & hardware. Manufactured in Aligarh, supplied across India from Surat hub." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { showToast } = useToast();
  return (
    <>
      <Hero />
      <Stats />
      <DualIdentity />
      <Products
        limit={6}
        showFilters={false}
        showExploreCta
        eyebrow="Featured Range"
        heading="Some of Our Best-Sellers"
        subhead="A peek at the catalog — explore the full range for category filters & specs."
      />
      <SupplyNetwork />
      <Testimonials />
      <Contact onSubmit={() => showToast("Enquiry sent! We'll contact you within 24 hours.")} />
    </>
  );
}
