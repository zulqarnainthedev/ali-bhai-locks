import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Factory, Truck, Award } from "lucide-react";
import { PRODUCTS, CATEGORIES } from "../data/products.js";
import ProductCard from "../components/common/ProductCard.jsx";
import ProductDetailsModal from "../components/common/ProductDetailsModal.jsx";
import EnquiryForm from "../components/common/EnquiryForm.jsx";

function useTitle(t, d) {
  useEffect(() => {
    document.title = t;
    const m = document.querySelector('meta[name="description"]');
    if (m && d) m.setAttribute("content", d);
  }, [t, d]);
}

export default function Home() {
  useTitle(
    "Ali Bhai Hardware — Aligarh Lock Manufacturer",
    "Premium padlocks and hardware manufactured in Aligarh since 1995. Pan-India bulk supply from Gujarat hub."
  );
  const [selected, setSelected] = useState(null);
  const featured = PRODUCTS.slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'url("https://source.unsplash.com/1600x900/?lock,factory,manufacturing")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-24 lg:px-8 lg:py-32">
          <span className="inline-block rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-300">
            Since 1995 • Aligarh, UP
          </span>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight md:text-6xl">
            Locks built in Aligarh.<br />Trusted across India.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-slate-300">
            Premium padlocks, safety locks & hardware — manufactured in our Aligarh facility,
            delivered nationwide from our Gujarat distribution hub.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/products" className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-6 py-3 text-sm font-bold hover:bg-amber-700">
              Explore Products <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/about" className="rounded-lg border border-white/30 px-6 py-3 text-sm font-bold hover:bg-white/10">
              About Us
            </Link>
          </div>
        </div>
      </section>

      {/* USP strip */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:grid-cols-3 lg:px-8">
          {[
            { Icon: Factory, t: "Aligarh Manufacturing", d: "In-house production, BIS-certified processes." },
            { Icon: Truck, t: "Pan-India Supply", d: "24-hr dispatch from Surat (Gujarat) hub." },
            { Icon: Award, t: "Trusted Since 1995", d: "30+ years serving hardware distributors." },
          ].map(({ Icon, t, d }) => (
            <div key={t} className="flex items-start gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
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

      {/* Categories */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Shop by Category</span>
            <h2 className="mt-2 font-display text-3xl font-bold text-slate-900">Our Product Categories</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
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
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Featured Range</span>
            <h2 className="mt-2 font-display text-3xl font-bold text-slate-900">Some of Our Best-Sellers</h2>
            <p className="mt-2 text-slate-600">A peek at the catalog — explore the full range for specs & variants.</p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} onOpen={setSelected} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/products" className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-6 py-3 text-sm font-bold text-white hover:bg-slate-800">
              Explore All Products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {selected && <ProductDetailsModal product={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
