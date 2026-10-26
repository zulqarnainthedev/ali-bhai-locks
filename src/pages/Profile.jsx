import { useEffect, useMemo } from "react";
import { Link, Navigate } from "react-router-dom";
import { ArrowRight, Mail, MapPin, Package, Phone, User } from "lucide-react";

export default function Profile() {
  useEffect(() => {
    document.title = "My Profile - Ali Bhai Hardware";
  }, []);

  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("abh_user") || localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  }, []);

  if (!user) return <Navigate to="/login" replace />;

  const name = user.name || "Hardware buyer";
  const address = [user.address, user.city, user.state, user.pincode, user.country]
    .filter(Boolean)
    .join(", ");

  return (
    <main className="min-h-[calc(100vh-80px)] bg-slate-50 py-10 sm:py-14">
      <div className="mx-auto max-w-5xl px-4 lg:px-8">
        <section className="overflow-hidden rounded-2xl bg-slate-900 text-white shadow-lg">
          <div className="flex flex-col gap-5 px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-amber-500 text-slate-900">
                <User className="h-8 w-8" />
              </div>
              <div>
                <p className="text-sm font-semibold text-amber-300">My account</p>
                <h1 className="mt-1 font-display text-2xl font-bold">{name}</h1>
                <p className="mt-1 text-sm text-slate-300">Manage your details and track every order.</p>
              </div>
            </div>
            <Link
              to="/my-orders"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-3 text-sm font-bold text-slate-900 hover:bg-amber-400"
            >
              Track orders <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <section className="mt-6 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="font-display text-xl font-bold text-slate-900">Contact details</h2>
            <div className="mt-5 space-y-4 text-sm text-slate-600">
              <Detail icon={Mail} label="Email" value={user.email} />
              <Detail icon={Phone} label="Phone" value={user.phone || user.mobile} />
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="font-display text-xl font-bold text-slate-900">Shop destination</h2>
            <div className="mt-5 space-y-4 text-sm text-slate-600">
              <Detail icon={MapPin} label="Delivery address" value={address} />
              <Detail icon={Package} label="Delivery promise" value="Usually reaches your shop within 7 days" />
            </div>
          </div>
        </section>

        <Link
          to="/my-orders"
          className="mt-6 flex items-center justify-between rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 hover:ring-amber-400"
        >
          <div>
            <h2 className="font-display text-xl font-bold text-slate-900">Orders & delivery tracking</h2>
            <p className="mt-1 text-sm text-slate-600">See packed, shipped and delivered order updates.</p>
          </div>
          <ArrowRight className="h-5 w-5 text-amber-600" />
        </Link>
      </div>
    </main>
  );
}

function Detail({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
        <p className="mt-1 font-medium text-slate-700">{value || "Not provided"}</p>
      </div>
    </div>
  );
}
