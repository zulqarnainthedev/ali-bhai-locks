import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Phone, Lock, Mail, Image as ImageIcon } from "lucide-react";

export default function Login() {
  const [mode, setMode] = useState("login"); // login | signup
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    photo: "",
  });
  const nav = useNavigate();

  useEffect(() => {
    document.title = mode === "login" ? "Login — Ali Bhai Hardware" : "Sign Up — Ali Bhai Hardware";
  }, [mode]);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm((f) => ({ ...f, photo: reader.result }));
    reader.readAsDataURL(file);
  };

  const submit = (e) => {
    e.preventDefault();
    if (!/^[6-9]\d{9}$/.test(form.mobile)) {
      alert("Enter a valid 10-digit Indian mobile number.");
      return;
    }
    // No API — store mock user locally. Hook your real API here later.
    const user = {
      name: form.name || "Guest User",
      mobile: form.mobile,
      email: form.email,
      photo: form.photo || "",
    };
    localStorage.setItem("abh_user", JSON.stringify(user));
    nav("/my-orders");
  };

  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-md px-4">
        <div className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-slate-200">
          <div className="mb-6 flex rounded-lg bg-slate-100 p-1">
            {["login", "signup"].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 rounded-md py-2 text-sm font-bold capitalize transition ${
                  mode === m ? "bg-amber-600 text-white" : "text-slate-600"
                }`}
              >
                {m === "login" ? "Login" : "Sign Up"}
              </button>
            ))}
          </div>

          <h1 className="font-display text-2xl font-bold text-slate-900">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            {mode === "login"
              ? "Login with your mobile number to track orders."
              : "Sign up to enquire faster and track your orders."}
          </p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            {mode === "signup" && (
              <>
                <Field icon={User} placeholder="Full name" value={form.name} onChange={set("name")} required />
                <Field icon={Mail} type="email" placeholder="Email (optional)" value={form.email} onChange={set("email")} />
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <ImageIcon className="h-4 w-4" /> Profile photo (optional)
                  </label>
                  <div className="flex items-center gap-3">
                    {form.photo ? (
                      <img src={form.photo} alt="preview" className="h-14 w-14 rounded-full object-cover ring-2 ring-amber-500" />
                    ) : (
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-200 text-slate-500">
                        <User className="h-6 w-6" />
                      </div>
                    )}
                    <input type="file" accept="image/*" onChange={handlePhoto} className="text-xs" />
                  </div>
                </div>
              </>
            )}
            <Field icon={Phone} type="tel" placeholder="Mobile number (10 digits)" value={form.mobile} onChange={set("mobile")} required />
            <Field icon={Lock} type="password" placeholder="Password" value={form.password} onChange={set("password")} required />

            <button className="w-full rounded-lg bg-amber-600 py-3 text-sm font-bold text-white hover:bg-amber-700">
              {mode === "login" ? "Login" : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-500">
            By continuing you agree to our terms.{" "}
            <Link to="/" className="font-semibold text-amber-700">Back to home</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

function Field({ icon: Icon, ...props }) {
  return (
    <div className="relative">
      <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        {...props}
        className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-3 text-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
      />
    </div>
  );
}
