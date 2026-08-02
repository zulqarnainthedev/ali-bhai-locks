import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Phone, Lock, Mail, MapPin } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { registerUser, loginUser } from "../API/authAPICalls/authAPICalls";
import { setToken } from "../API/token"; // path apne project structure ke hisaab se adjust kar lijiye

export default function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });

  useEffect(() => {
    document.title =
      mode === "login" ? "Login - Ali Bhai Hardware" : "Sign Up - Ali Bhai Hardware";
  }, [mode]);

  const { mutate: register, isPending: isRegistering } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      if (data?.accessToken) setToken(data.accessToken,data?.refreshToken);
    
      if (data?.user) localStorage.setItem("user", JSON.stringify(data.user));
      alert("Registration Successful");
      navigate("/");
    },
    onError: (error) => {
      alert(error?.response?.data?.message || "Something went wrong");
    },
  });

  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (data?.accessToken) setToken(data.token);
      if (data?.user) localStorage.setItem("user", JSON.stringify(data.user));
      alert("Login Successful");
      navigate("/");
    },
    onError: (error) => {
      alert(error?.response?.data?.message || "Something went wrong");
    },
  });

  const set = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const submit = (e) => {
    e.preventDefault();
register(form);
    // if (mode === "signup") {
    //   register(form);
    // } else {
    //   login({ email: form.email, password: form.password });
    // }
  };

  const isSubmitting = isRegistering || isLoggingIn;

  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-md px-4">
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <div className="mb-6 flex rounded-lg bg-slate-100 p-1">
            {["login", "signup"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setMode(item)}
                className={`flex-1 rounded-md py-2 font-semibold capitalize transition ${
                  mode === item ? "bg-amber-600 text-white" : "text-slate-700"
                }`}
              >
                {item === "login" ? "Login" : "Sign Up"}
              </button>
            ))}
          </div>

          <h1 className="text-2xl font-bold">
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {mode === "login" ? "Login to continue." : "Create your account."}
          </p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            {mode === "signup" && (
              <>
                <Field icon={User} placeholder="Full Name" value={form.name} onChange={set("name")} required />
                <Field icon={Phone} placeholder="Phone Number" value={form.phone} onChange={set("phone")} required />
                <Field icon={MapPin} placeholder="Address" value={form.address} onChange={set("address")} />
                <Field icon={MapPin} placeholder="City" value={form.city} onChange={set("city")} />
                <Field icon={MapPin} placeholder="State" value={form.state} onChange={set("state")} />
                <Field icon={MapPin} placeholder="Country" value={form.country} onChange={set("country")} />
                <Field icon={MapPin} placeholder="Pincode" value={form.pincode} onChange={set("pincode")} />
              </>
            )}

            <Field icon={Mail} type="email" placeholder="Email" value={form.email} onChange={set("email")} required />
            <Field icon={Lock} type="password" placeholder="Password" value={form.password} onChange={set("password")} required />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-amber-600 py-3 font-semibold text-white hover:bg-amber-700 disabled:opacity-60"
            >
              {isSubmitting ? "Please wait..." : mode === "login" ? "Login" : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            <Link to="/" className="font-semibold text-amber-600">
              Back to Home
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

function Field({ icon: Icon, ...props }) {
  return (
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
      <input
        {...props}
        className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-4 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
      />
    </div>
  );
}