import { Link } from "react-router-dom";
import { Shield, Phone, Mail, MapPin } from "lucide-react";
import { CATEGORIES } from "../../data/products.js";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-600">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div className="text-lg font-bold text-white">Ali Bhai Hardware</div>
          </div>
          <p className="mt-4 text-sm">
            Aligarh's trusted lock manufacturer since 1995. Pan-India supply from our Gujarat hub.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-white">Catalog</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/products" className="hover:text-amber-400">All Products</Link></li>
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link to={`/products/${c.slug}`} className="hover:text-amber-400">{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-white">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-amber-400">About Us</Link></li>
            <li><Link to="/about" className="hover:text-amber-400">Manufacturing</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-white">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Jamalpur, Aligarh, UP</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +91 98XXX XXXXX</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> info@alibhaihardware.in</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 py-4 text-center text-xs">
        © {new Date().getFullYear()} Ali Bhai Hardware. All rights reserved.
      </div>
    </footer>
  );
}
