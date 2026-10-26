import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Download, FileText } from "lucide-react";
import { CATEGORIES } from "../../data/products.js";
import logo from "../../assets/logo.png";

// Put the PDFs in /public/catalogues/ and update the file names here
const CATALOGUES = [
  {
    label: "Padlocks",
    href: "/catalogues/padlocks-catalogue.pdf",
    file: "Ali-Bhai-Padlocks-Catalogue.pdf",
  },
  {
    label: "Furniture Locks",
    href: "/catalogues/furniture-locks-catalogue.pdf",
    file: "Ali-Bhai-Furniture-Locks-Catalogue.pdf",
  },
  {
    label: "All Items",
    href: "/catalogues/all-items-catalogue.pdf",
    file: "Ali-Bhai-All-Items-Catalogue.pdf",
  },
];

const PHONES = [
  { display: "75052 79565", href: "tel:+917505279565" },
  { display: "79837 57174", href: "tel:+917983757174" },
];

const EMAILS = [
  "alibhaihardwares@gmail.com",
  "zulqarnainthedev@gmail.com",
];

// Small reusable heading for footer columns
function ColumnTitle({ children }) {
  return (
    <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
      {children}
      <span className="mt-2 block h-0.5 w-8 rounded bg-amber-400" />
    </h4>
  );
}

// Icon tile used in the contact list
function IconTile({ children }) {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-400/10 text-amber-400">
      {children}
    </span>
  );
}

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 pt-12 lg:px-8">
        {/* Layer 1: Catalogue download band */}
        <div className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-slate-800/60 p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <IconTile>
              <FileText className="h-5 w-5" />
            </IconTile>
            <div>
              <h3 className="text-lg font-bold text-white">Download Our Catalogues</h3>
              <p className="text-sm text-slate-400">
                Free PDF catalogues with full product range for dealers and retailers.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:flex lg:gap-3">
            {CATALOGUES.map((c) => (
              <a
                key={c.label}
                href={c.href}
                download={c.file}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-amber-400/40 bg-amber-400/10 px-4 py-2.5 text-sm font-semibold text-amber-300 transition hover:bg-amber-400 hover:text-black"
              >
                <Download className="h-4 w-4" />
                {c.label}
              </a>
            ))}
          </div>
        </div>

        {/* Layer 2: Main links grid */}
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-4">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="Ali Bhai Hardware logo"
                className="h-14 w-14 rounded-lg bg-amber-600 object-cover"
              />
              <div className="text-xl font-bold text-white">Ali Bhai Hardware</div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              Aligarh's trusted lock wholesaler since 2005. Pan-India supply from our
              Gujarat hub.
            </p>
          </div>

          {/* Catalog links */}
          <div className="lg:col-span-2">
            <ColumnTitle>Catalog</ColumnTitle>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/products" className="transition hover:text-amber-400">
                  All Products
                </Link>
              </li>
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link
                    to={`/products/${c.slug}`}
                    className="transition hover:text-amber-400"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <ColumnTitle>Company</ColumnTitle>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="transition hover:text-amber-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/about" className="transition hover:text-amber-400">
                  Manufacturing
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="sm:col-span-2 lg:col-span-4">
            <ColumnTitle>Contact Us</ColumnTitle>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <IconTile>
                  <MapPin className="h-4 w-4" />
                </IconTile>
                <div>
                  <div className="font-medium text-white">Jamalpur, Aligarh, UP</div>
                  <div className="text-slate-400">Manufacturing unit · Gujarat hub</div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <IconTile>
                  <Phone className="h-4 w-4" />
                </IconTile>
                <div className="flex flex-col gap-1">
                  {PHONES.map((p) => (
                    <a
                      key={p.href}
                      href={p.href}
                      className="font-medium text-white transition hover:text-amber-400"
                    >
                      {p.display}
                    </a>
                  ))}
                </div>
              </li>

              <li className="flex items-start gap-3">
                <IconTile>
                  <Mail className="h-4 w-4" />
                </IconTile>
                <div className="flex min-w-0 flex-col gap-1">
                  {EMAILS.map((e) => (
                    <a
                      key={e}
                      href={`mailto:${e}`}
                      className="break-all transition hover:text-amber-400"
                    >
                      {e}
                    </a>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Layer 3: Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-slate-500 sm:flex-row lg:px-8">
          <span>© {new Date().getFullYear()} Ali Bhai Hardware. All rights reserved.</span>
          <span>Made in Aligarh · Supplied across India</span>
        </div>
      </div>
    </footer>
  );
}