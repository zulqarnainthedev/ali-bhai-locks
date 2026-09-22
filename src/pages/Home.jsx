import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ArrowRight, Factory, Truck, Award, Shield, MapPin, Star, Lock } from "lucide-react";
import { PRODUCTS, CATEGORIES } from "../data/products.js";
import ProductCard from "../components/common/ProductCard.jsx";
import ProductDetailsModal from "../components/common/ProductDetailsModal.jsx";
import EnquiryForm from "../components/common/EnquiryForm.jsx";
import ProductFeatures from "../components/common/ProductFeatured.jsx";
import { getProducts } from "../API/products/productAPIs.js";

function useTitle(t, d) {
  useEffect(() => {
    document.title = t;
    const m = document.querySelector('meta[name="description"]');
    if (m && d) m.setAttribute("content", d);
  }, [t, d]);
}

export default function Home() {
  const fetchProducts = async () => {
    const response = await getProducts();
    const fetchedProducts = response?.content || [];

    localStorage.setItem("all_products", JSON.stringify(fetchedProducts));
    return fetchedProducts;
  };


const {
  data: products = [],
  isLoading,
  isError,
  error,
} = useQuery({
  queryKey: ["products"],
  queryFn: fetchProducts,
});


  useTitle(
    "Ali Bhai Hardware — Aligarh Lock Manufacturer",
    "Premium padlocks and hardware manufactured in Aligarh since 2005. Pan-India bulk supply from Gujarat hub."
  );

  const [selected, setSelected] = useState(null);
  const featured = PRODUCTS.filter((_, index) => index !== 3).slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-900" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Trust ticker */}
        {/* <div className="relative pt-4 sm:pt-6 px-2">
          <div className="mx-auto w-[min(900px,95vw)]">
            <div
              className="
                rounded-full bg-white/5 ring-1 ring-white/10 backdrop-blur
                px-3 sm:px-4 py-1.5 sm:py-2
                text-[10px] xs:text-xs sm:text-sm
                text-slate-200
                flex flex-nowrap sm:flex-wrap items-center justify-start sm:justify-center
                gap-x-2 sm:gap-x-4 gap-y-1.5 sm:gap-y-2
                overflow-x-auto sm:overflow-visible
                whitespace-nowrap sm:whitespace-normal
                [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
              "
            >
              <span className="font-semibold text-amber-300 shrink-0">Cheapest bulk prices</span>
              <span className="opacity-90 shrink-0 hidden sm:inline">•</span>
              <span className="shrink-0">Free delivery to your door</span>
              <span className="opacity-90 shrink-0 hidden sm:inline">•</span>
              <span className="shrink-0">Best quality, guaranteed</span>
              <span className="opacity-90 shrink-0 hidden sm:inline">•</span>
              <span className="shrink-0">More than shopkeepers—connected suppliers in Gujarat</span>
            </div>
          </div>
        </div> */}

        {/* Main content */}
        <div className="relative mx-auto max-w-5xl px-4 py-12 sm:py-16 lg:py-24 lg:px-8">
          <div className="flex flex-col items-center text-center gap-6 sm:gap-8">
            {/* Icon badge */}
            {/* <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-amber-500/15 ring-1 ring-amber-400/30">
              <Lock className="h-7 w-7 sm:h-8 sm:w-8 text-amber-400" />
            </div> */}

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight max-w-3xl">
              Locks Manufactured in{" "}
              <span className="text-amber-400">Aligarh.</span>{" "}
              Trusted Across{" "}
              <span className="text-amber-400">India.</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Premium padlocks, safety locks & hardware — manufactured in our Aligarh
              facility, delivered nationwide from our Gujarat distribution hub.{" "}
              <span className="text-white font-semibold">
                Cheapest price across India, free delivery to your door, guaranteed
                best quality.
              </span>
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto pt-2">
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-6 py-3 text-sm font-bold text-slate-900 hover:bg-amber-400 transition"
              >
                Explore Products <ArrowRight className="h-4 w-4" />
              </Link>

              <a
                href="#enquiry"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white/10 ring-1 ring-white/20 px-6 py-3 text-sm font-bold text-white hover:bg-white/15 transition backdrop-blur"
              >
                Get Bulk Quote
              </a>
            </div>

            {/* Trust badges row */}
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs sm:text-sm text-slate-400 pt-2">
              <div className="flex items-center gap-1.5">
                <Star className="h-4 w-4 text-amber-400 shrink-0" />
                <span>4.8★ Rated</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="h-4 w-4 text-amber-400 shrink-0" />
                <span>Free delivery</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="h-4 w-4 text-amber-400 shrink-0" />
                <span>COD Available</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Factory className="h-4 w-4 text-amber-400 shrink-0" />
                <span>Head office in Gujarat</span>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-6 border-t border-white/10 mt-2 w-full max-w-md">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white">20+</p>
                <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">Years Experience</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white">50+</p>
                <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">Products</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white">2K+</p>
                <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">Happy Clients</p>
              </div>
            </div>
          </div>

          {/* Review cards */}
          <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <div className="rounded-xl bg-white/5 ring-1 ring-white/10 backdrop-blur px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-amber-500/20 p-2 shrink-0">
                  <Star className="h-4 w-4 text-amber-300" />
                </div>
                <div>
                  <p className="text-xs text-slate-300">What customers say</p>
                  <p className="text-sm font-bold text-white">Trusted by retailers & distributors</p>
                </div>
              </div>
              <p className="mt-2 text-xs text-slate-300">
                "On-time dispatch, fair pricing, and consistent quality."
              </p>
              <p className="mt-1 text-[11px] text-slate-400">— Verified wholesale buyers</p>
            </div>

            <div className="rounded-xl bg-white/5 ring-1 ring-white/10 backdrop-blur px-4 py-3">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-amber-500/20 p-2 shrink-0">
                  <Truck className="h-4 w-4 text-amber-300" />
                </div>
                <div>
                  <p className="text-xs text-slate-300">Delivery & support</p>
                  <p className="text-sm font-bold text-white">Free delivery to your door step in India.</p>
                  <p className="mt-2 text-xs text-slate-300">
                    Customer support within 30 minutes during business hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* features products to show on home page  */}

      {featured && <ProductFeatures features={featured} setSelected={setSelected} catagory="Padlocks" />}
     

      {/* Categories */}
      <section className="bg-slate-50 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Shop by Category</span>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-slate-900">Our Product Categories</h2>
          </div>
          <div className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                to={`/products/${c.slug}`}
                className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:shadow-xl"
              >
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-700">{c.name}</h3>
                <p className="mt-2 text-sm text-slate-600">{c.description}</p>
                <span className="mt-4 inline-flex items-center text-sm font-bold text-amber-700">
                  View {c.name} <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>

          {/* explore all products button  */}
          ```tsx
<div className="mt-12 flex justify-center">
  <div className="group relative">
    {/* Outer glow */}
    <div
      className="
        absolute -inset-2 rounded-2xl
        bg-amber-400/30
        blur-xl
        opacity-50
        transition-all duration-500
        group-hover:opacity-90
        group-hover:bg-orange-400/40
      "
    />

    <Link
      to="/products/padlocks"
      className="
        relative inline-flex items-center gap-4
        overflow-hidden rounded-2xl
        border border-amber-300/30
        bg-gradient-to-r
        from-amber-500
        via-orange-500
        to-amber-600
        px-8 py-4
        text-sm font-bold text-white
        shadow-[0_12px_30px_rgba(245,158,11,0.30)]
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-[0_18px_45px_rgba(245,158,11,0.45)]
        active:translate-y-0
      "
    >
      {/* Shine effect */}
      <span
        className="
          absolute inset-0
          -translate-x-full
          bg-gradient-to-r
          from-transparent
          via-white/30
          to-transparent
          transition-transform duration-700
          group-hover:translate-x-full
        "
      />

      {/* Text */}
      <span className="relative tracking-wide">
        Explore All Products
      </span>

      {/* Arrow */}
      <span
        className="
          relative flex h-9 w-9 items-center justify-center
          rounded-xl
          bg-white/20
          ring-1 ring-white/20
          backdrop-blur-sm
          transition-all duration-300
          group-hover:translate-x-1
          group-hover:bg-white/30
        "
      >
        <ArrowRight
          className="
            h-4 w-4
            transition-transform duration-300
            group-hover:translate-x-0.5
          "
        />
      </span>
    </Link>
  </div>
</div>
```

        </div>
      </section>

       {/* USP strip */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:grid-cols-3 lg:px-8">
          {[
            { Icon: Factory, t: "Aligarh Manufacturing", d: "In-house production, Quality testing processes" },
            { Icon: Truck, t: "Pan-India Supply", d: "24-hr dispatch from Surat & Porbandar (Gujarat) hub." },
            { Icon: Award, t: "Trusted Since 2005", d: "20+ years serving hardware distributors." },
          ].map(({ Icon, t, d }) => (
            <div key={t} className="flex items-start gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <div className="font-bold text-slate-900">{t}</div>
                <p className="text-sm text-slate-600">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
{/* 
      {featured && <ProductFeatures features={featured} setSelected={setSelected} catagory="Padlocks" />} */}

      {/* Reviews */}
      <section className="bg-slate-50 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Customer Reviews</span>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-slate-900">What customers say about us</h2>
            <p className="mt-2 text-slate-600">Real feedback from retailers, distributors & bulk buyers.</p>
          </div>

          <div className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {[
              { quote: "Fast dispatch, fair rates and locks that actually last. Our customers are happy.", name: "Retailer, Aligarh", stars: 5 },
              { quote: "Quality is consistent batch-to-batch. Packaging is neat and delivery is on time.", name: "Distributor, UP", stars: 5 },
              { quote: "Great communication and support. COD and bulk pricing make it easy to scale.", name: "Wholesale buyer, Gujarat", stars: 5 },
            ].map((r) => (
              <div key={r.name} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <div className="flex items-center gap-2 text-amber-600">
                  {Array.from({ length: r.stars }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-500" />
                  ))}
                </div>
                <p className="mt-4 text-sm text-slate-600 leading-relaxed">"{r.quote}"</p>
                <p className="mt-4 text-xs font-bold text-slate-900">— {r.name}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl bg-slate-900 p-6 sm:p-8 text-white flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-center md:text-left">
            <div>
              <p className="text-amber-300 text-xs font-bold uppercase tracking-widest">Trusted by buyers</p>
              <p className="mt-2 text-xl sm:text-2xl font-extrabold">4.8★ average rating</p>
              <p className="mt-2 text-slate-300 text-sm">On-time delivery • strong quality control • responsive support</p>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center justify-center rounded-lg bg-amber-500 px-5 py-3 text-sm font-bold text-slate-900 hover:bg-amber-400 shrink-0"
            >
              Shop Best-Sellers
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">FAQs</span>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-slate-900">Questions? We've got answers</h2>
            <p className="mt-2 text-slate-600">Everything you need to know about bulk supply and ordering.</p>
          </div>

          <div className="mt-10 mx-auto max-w-3xl space-y-3">
            {[
              { q: "Do you supply in bulk?", a: "Yes. We serve retailers, distributors and wholesale buyers with bulk pricing and consistent quality." },
              { q: "How fast do you dispatch orders?", a: "Dispatch depends on availability, typically within 6 working days. For urgent requirements, contact us for confirmation." },
              { q: "Do you offer COD and delivery support?", a: "COD is available (where applicable). We also coordinate safe packaging and delivery to your location." },
              { q: "Do you provide OEM/custom branding?", a: "Yes. OEM/custom branding is available for qualifying bulk orders. Share your requirement with our team." },
            ].map((item, idx) => (
              <details
                key={item.q}
                className="group rounded-xl bg-slate-50 px-4 sm:px-5 py-4 ring-1 ring-slate-200"
                open={idx === 0}
              >
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4">
                  <span className="text-sm font-bold text-slate-900">{item.q}</span>
                  <span className="text-amber-600 font-extrabold group-open:rotate-45 transition-transform shrink-0">+</span>
                </summary>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>

          <div className="mt-10 flex flex-col md:flex-row gap-4 md:items-center md:justify-center text-center">
            <p className="text-sm text-slate-600">Still have questions?</p>
            <Link
              to="/about"
              className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800"
            >
              Talk to our team
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Enquiry */}
      <section id="enquiry" className="bg-slate-900 py-12 sm:py-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-2 lg:px-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">Bulk Enquiry</span>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold">Request a wholesale quote</h2>
            <p className="mt-3 max-w-md text-slate-300">
              Tell us what you need. Our team responds within 24 hours with pricing, MOQ and dispatch timeline (default 6 working days).
            </p>
            <ul className="mt-6 space-y-2 text-sm text-slate-300">
              <li>• Pan-India dispatch from Surat hub</li>
              <li>• OEM / custom branding available</li>
              <li>• 15+ years manufacturing experience</li>
            </ul>
          </div>
          <EnquiryForm />
        </div>
      </section>

      {/* Address section */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Find Us</span>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold">Manufacturing Unit — Jamalpur, Aligarh</h2>
            <p className="mt-2 text-slate-600">Visit our factory in the heart of India's lock-making city.</p>
          </div>
          <div className="mt-8 aspect-[4/3] sm:aspect-video w-full overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-200">
            <iframe
              title="Ali Bhai Hardware — Jamalpur, Aligarh"
              src="https://www.google.com/maps?q=Jamalpur,+Aligarh,+Uttar+Pradesh&output=embed"
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0 }}
            />
          </div>

          <div className="mt-12 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Distribution Hub</span>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold">Gujarat Office — Porbandar</h2>
            <p className="mt-2 text-slate-600">Our pan-India dispatch hub on the coast of Gujarat.</p>
          </div>
          <div className="mt-8 aspect-[4/3] sm:aspect-video w-full overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-200">
            <iframe
              title="Ali Bhai Hardware — Porbandar, Gujarat"
              src="https://www.google.com/maps?q=Porbandar,+Gujarat&output=embed"
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0 }}
            />
          </div>
        </div>
      </section>

      {selected && <ProductDetailsModal product={selected} onClose={() => setSelected(null)} />}
    </>
  );
}