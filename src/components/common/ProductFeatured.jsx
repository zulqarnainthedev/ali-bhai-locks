import { ArrowRight } from "lucide-react";
import { PRODUCTS } from "../../data/products";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

function ProductFeatures({features,setSelected, catagory}){
    return (<>
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Featured Range</span>
            <h2 className="mt-2 font-display text-3xl font-bold text-slate-900">Some of Our Best-Sellers</h2>
            <p className="mt-2 text-slate-600">A peek at the catalog — explore the full range for specs & variants.</p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {features.map((p) => (
              <ProductCard key={p.id} product={p} onOpen={setSelected} />
            ))}
          </div>

          
         <div className="relative animate-bounce mt-12 flex justify-center">
  <div className="absolute -inset-2 rounded-2xl bg-slate-400/20 blur-xl transition-all duration-500 group-hover:bg-slate-400/30" />

  <Link
    to="/products/padlocks"
    className="group relative inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-slate-950 to-slate-800 px-7 py-3.5 text-sm font-bold text-white shadow-xl transition-all duration-300 hover:-translate-y-1"
  >
    <span>Explore All {catagory} & Products</span>

    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </span>
  </Link>
</div>
        </div>
      </section>
      
      </>)
}

export default ProductFeatures;