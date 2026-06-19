import { useState } from "react";
import { Send } from "lucide-react";

export default function EnquiryForm() {
  const [form, setForm] = useState({ name: "", mobile: "", city: "", product: "Padlocks", qty: "100", message: "" });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!/^[6-9]\d{9}$/.test(form.mobile)) {
      alert("Enter a valid 10-digit mobile number.");
      return;
    }
    // No API — replace with your backend later.
    console.log("Enquiry:", form);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="rounded-2xl bg-green-50 p-8 text-center ring-1 ring-green-200">
        <h3 className="font-display text-xl font-bold text-green-800">Thank you!</h3>
        <p className="mt-2 text-sm text-green-700">Our team will call you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-3 rounded-2xl bg-white p-6 shadow-xl ring-1 ring-slate-200 sm:grid-cols-2">
      <h3 className="sm:col-span-2 font-display text-xl font-bold text-slate-900">Get a Bulk Quote</h3>
      <input required placeholder="Your name" value={form.name} onChange={set("name")} className={inputCls} />
      <input required placeholder="Mobile (10 digits)" value={form.mobile} onChange={set("mobile")} className={inputCls} />
      <input required placeholder="City" value={form.city} onChange={set("city")} className={inputCls} />
      <select value={form.product} onChange={set("product")} className={inputCls}>
        <option>Padlocks</option>
        <option>Safety / Disc Locks</option>
        <option>Hardware</option>
        <option>Other</option>
      </select>
      <input type="number" min="10" placeholder="Quantity" value={form.qty} onChange={set("qty")} className={`${inputCls} sm:col-span-2`} />
      <textarea rows="3" placeholder="Any specific requirements?" value={form.message} onChange={set("message")} className={`${inputCls} sm:col-span-2`} />
      <button className="sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-lg bg-amber-600 py-3 text-sm font-bold text-white hover:bg-amber-700">
        <Send className="h-4 w-4" /> Send Enquiry
      </button>
    </form>
  );
}

const inputCls =
  "rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30";
