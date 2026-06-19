import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Package, Truck, CheckCircle, MessageCircle, Star, ChevronDown, User } from "lucide-react";

const MOCK_ORDERS = [
  {
    id: "ABH-10293",
    placedOn: "2026-06-12",
    items: [
      { name: "Heavy Brass Padlock 65mm", qty: 100, price: 185, image: "https://source.unsplash.com/300x300/?padlock" },
      { name: "Disc Lock 70mm", qty: 50, price: 240, image: "https://source.unsplash.com/300x300/?lock" },
    ],
    status: "Shipped",
  },
  {
    id: "ABH-10241",
    placedOn: "2026-06-04",
    items: [{ name: "Hardware Hinges 4inch", qty: 200, price: 45, image: "https://source.unsplash.com/300x300/?hinge" }],
    status: "Delivered",
  },
];

const FAQS = [
  { q: "How long does delivery take?", a: "Default delivery is 6 working days from order confirmation. Dispatch happens within 24 hrs from our Gujarat hub." },
  { q: "Minimum order quantity?", a: "Most padlock SKUs start at 50 pcs. Hardware items start at 100 pcs." },
  { q: "Do you ship pan-India?", a: "Yes — we deliver to all 28 states from our Surat distribution hub." },
  { q: "Can I get a custom logo on locks?", a: "Yes, OEM branding is available for orders above 1000 pcs. Contact us on WhatsApp." },
];

const REVIEWS = [
  { name: "Ravi Sharma", city: "Delhi", rating: 5, text: "Quality is top-notch. Been buying for 4 years now." },
  { name: "Mehul Patel", city: "Surat", rating: 5, text: "Quick dispatch and packaging is solid. Highly recommend." },
  { name: "Anil Kumar", city: "Lucknow", rating: 4, text: "Good locks, reasonable price for bulk orders." },
];

const WHATSAPP_NUMBER = "919999999999";

function addDays(dateStr, days) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function orderToWhatsApp(order) {
  const lines = [
    `Hello Ali Bhai Hardware,`,
    `I want to confirm/reorder my order ${order.id}.`,
    ``,
    `Items:`,
    ...order.items.map((it, i) => `${i + 1}. ${it.name} — Qty ${it.qty} @ ₹${it.price}`),
    ``,
    `Expected delivery: ${addDays(order.placedOn, 6)} (6 days default)`,
  ];
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export default function MyOrders() {
  useEffect(() => {
    document.title = "My Orders — Ali Bhai Hardware";
  }, []);

  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("abh_user") || "null");
    } catch {
      return null;
    }
  }, []);

  const [openFaq, setOpenFaq] = useState(0);

  if (!user) {
    return (
      <section className="mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="font-display text-2xl font-bold">Please login first</h1>
        <p className="mt-2 text-sm text-slate-600">Login to view and track your orders.</p>
        <Link to="/login" className="mt-6 inline-block rounded-lg bg-amber-600 px-6 py-3 text-sm font-bold text-white">
          Go to Login
        </Link>
      </section>
    );
  }

  return (
    <>
      {/* Profile header */}
      <section className="bg-slate-900 py-10 text-white">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 lg:px-8">
          {user.photo ? (
            <img src={user.photo} alt={user.name} className="h-16 w-16 rounded-full object-cover ring-2 ring-amber-500" />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-700">
              <User className="h-7 w-7" />
            </div>
          )}
          <div>
            <h1 className="font-display text-2xl font-bold">{user.name}</h1>
            <p className="text-sm text-slate-300">2005 {user.mobile} {user.email && `• ${user.email}`}</p>
          </div>
        </div>
      </section>

      {/* Orders */}
      <section className="bg-slate-50 py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="font-display text-2xl font-bold">Your Orders</h2>
          <p className="mt-1 text-sm text-slate-600">Default delivery within 6 days. Re-order with one tap on WhatsApp.</p>

          <div className="mt-6 space-y-5">
            {MOCK_ORDERS.map((o) => (
              <article key={o.id} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <div className="text-sm font-bold text-slate-900">Order {o.id}</div>
                    <div className="text-xs text-slate-500">
                      Placed {new Date(o.placedOn).toLocaleDateString("en-IN")} • Expected by {addDays(o.placedOn, 6)}
                    </div>
                  </div>
                  <StatusBadge status={o.status} />
                </header>

                <ul className="mt-4 space-y-3">
                  {o.items.map((it) => (
                    <li key={it.name} className="flex items-center gap-3">
                      <img src={it.image} alt={it.name} className="h-14 w-14 rounded-lg object-cover" />
                      <div className="flex-1">
                        <div className="text-sm font-semibold">{it.name}</div>
                        <div className="text-xs text-slate-500">Qty {it.qty} • ₹{it.price}/pc</div>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Tracker */}
                <Tracker status={o.status} />

                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href={orderToWhatsApp(o)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-sm font-bold text-white hover:bg-green-600"
                  >
                    <MessageCircle className="h-4 w-4" /> Reorder on WhatsApp
                  </a>
                  <Link to="/products" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100">
                    Order More
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="font-display text-2xl font-bold">What Customers Say</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {REVIEWS.map((r) => (
              <div key={r.name} className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
                <div className="flex gap-1 text-amber-500">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-3 text-sm text-slate-700">"{r.text}"</p>
                <div className="mt-3 text-xs font-bold text-slate-900">{r.name} <span className="font-normal text-slate-500">• {r.city}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-slate-50 py-12">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <h2 className="text-center font-display text-2xl font-bold">Frequently Asked Questions</h2>
          <div className="mt-6 space-y-3">
            {FAQS.map((f, i) => (
              <div key={f.q} className="rounded-xl bg-white ring-1 ring-slate-200">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                >
                  <span className="text-sm font-bold text-slate-900">{f.q}</span>
                  <ChevronDown className={`h-4 w-4 transition ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && <div className="border-t border-slate-100 px-5 py-3 text-sm text-slate-600">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function StatusBadge({ status }) {
  const colors = {
    Placed: "bg-slate-100 text-slate-700",
    Shipped: "bg-amber-100 text-amber-800",
    Delivered: "bg-green-100 text-green-800",
  };
  return <span className={`rounded-full px-3 py-1 text-xs font-bold ${colors[status]}`}>{status}</span>;
}

function Tracker({ status }) {
  const steps = [
    { key: "Placed", Icon: Package },
    { key: "Shipped", Icon: Truck },
    { key: "Delivered", Icon: CheckCircle },
  ];
  const activeIdx = steps.findIndex((s) => s.key === status);
  return (
    <div className="mt-5 flex items-center gap-2">
      {steps.map((s, i) => {
        const done = i <= activeIdx;
        return (
          <div key={s.key} className="flex flex-1 items-center gap-2">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full ${done ? "bg-amber-600 text-white" : "bg-slate-200 text-slate-500"}`}>
              <s.Icon className="h-4 w-4" />
            </div>
            <span className={`text-xs font-semibold ${done ? "text-slate-900" : "text-slate-400"}`}>{s.key}</span>
            {i < steps.length - 1 && <div className={`h-0.5 flex-1 ${i < activeIdx ? "bg-amber-600" : "bg-slate-200"}`} />}
          </div>
        );
      })}
    </div>
  );
}
