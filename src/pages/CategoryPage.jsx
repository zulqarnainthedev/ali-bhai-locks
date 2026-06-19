import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCategoryBySlug, getProductsByCategory, CATEGORIES } from "../data/products.js";
import ProductCard from "../components/common/ProductCard.jsx";
import ProductDetailsModal from "../components/common/ProductDetailsModal.jsx";
import NotFound from "./NotFound.jsx";

export default function CategoryPage() {
  const { categorySlug } = useParams();
  const category = getCategoryBySlug(categorySlug);
  const products = getProductsByCategory(categorySlug);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (category) document.title = `${category.name} — Ali Bhai Hardware`;
  }, [category]);

  if (!category) return <NotFound />;

  return (
    <section className="bg-slate-50 py-12">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <nav className="mb-6 text-xs text-slate-500">
          <Link to="/" className="hover:text-amber-600">Home</Link> ›{" "}
          <Link to="/products" className="hover:text-amber-600">Products</Link> ›{" "}
          <span className="text-slate-700">{category.name}</span>
        </nav>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Category</span>
          <h1 className="mt-1 font-display text-4xl font-bold text-slate-900">{category.name}</h1>
          <p className="mt-2 text-slate-600">{category.description}</p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              to={`/products/${c.slug}`}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                c.slug === category.slug
                  ? "bg-slate-900 text-white"
                  : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100"
              }`}
            >
              {c.name}
            </Link>
          ))}
        </div>

        {products.length === 0 ? (
          <p className="mt-12 text-center text-slate-500">No products in this category yet.</p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} onOpen={setSelected} />
            ))}
          </div>
        )}
      </div>

      {selected && <ProductDetailsModal product={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
