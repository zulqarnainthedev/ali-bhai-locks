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
          <div className="mt-10 text-center">
            <Link to="/products/padlocks" className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-6 py-3 text-sm font-bold text-white hover:bg-slate-800">
              Explore All {catagory} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
      
      </>)
}

export default ProductFeatures;