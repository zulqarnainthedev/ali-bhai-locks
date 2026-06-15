import { createFileRoute } from "@tanstack/react-router";
import {
  AboutHero, OfficeGallery, CompanyStory, AligarhMap, AboutValues,
  DualIdentity, Founder, Certifications, SupplyNetwork, Contact,
} from "@/lib/shop";
import { useToast } from "@/lib/shop";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Ali Bhai Hardware | Aligarh Lock Manufacturer" },
      { name: "description", content: "See inside our Aligarh manufacturing unit in Jamalpur and our Surat distribution hub. Meet the founder, view our facility, and visit us on Google Maps." },
      { property: "og:title", content: "About Ali Bhai Hardware — Inside the Aligarh Factory" },
      { property: "og:description", content: "Tour our manufacturing floor, meet Ali Bhai, and find us on the map in Jamalpur, Aligarh." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { showToast } = useToast();
  return (
    <>
      <AboutHero />
      <AboutValues />
      <OfficeGallery />
      <DualIdentity />
      <CompanyStory />
      <Founder />
      <AligarhMap />
      <SupplyNetwork />
      <Certifications />
      <Contact onSubmit={() => showToast("Enquiry sent! We'll contact you within 24 hours.")} />
    </>
  );
}
