import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PRODUCTS, CATEGORIES } from "../data/products.js";
import ProductCard from "../components/common/ProductCard.jsx";
import ProductDetailsModal from "../components/common/ProductDetailsModal.jsx";

const FILTERS = [{ slug: "all", name: "All" }, ...CATEGORIES];

export default function Products() {
  useEffect(() => {
    document.title = "All Products — Ali Bhai Hardware";
  }, []);
  const [active, setActive] = useState("all");
  const [selected, setSelected] = useState(null);

  const list = useMemo(
    () => (active === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.categorySlug === active)),
    [active]
  );

  return (
    <section className="bg-slate-50 py-12">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Full Catalog</span>
          <h1 className="mt-2 font-display text-4xl font-bold text-slate-900">All Products</h1>
          <p className="mt-2 text-slate-600">Filter by category. Click any product for sizes, specs & variants.</p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {FILTERS.map((f) =>
            f.slug === "all" ? (
              <button
                key={f.slug}
                onClick={() => setActive("all")}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                  active === "all" ? "bg-slate-900 text-white" : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100"
                }`}
              >
                {f.name}
              </button>
            ) : (
              <Link
                key={f.slug}
                to={`/products/${f.slug}`}
                className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-100"
              >
                {f.name}
              </Link>
            )
          )}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} onOpen={setSelected} />
          ))}
        </div>
      </div>

      {selected && <ProductDetailsModal product={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
