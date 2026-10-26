import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Menu, X, ShoppingCart, User, ChevronDown, LogOut } from "lucide-react";
import { toggleDrawer } from "../../store/store.js";
import { CATEGORIES } from "../../data/products.js";
import { removeToken } from "../../API/token.js";
import logo from "../../assets/logo.png"

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const count = useSelector((s) => s.enquiry.items.length);

  useEffect(() => {
    try {
      setUser(JSON.parse(localStorage.getItem("abh_user") || localStorage.getItem("user") || "null"));
    } catch {
      setUser(null);
    }
  }, [location.pathname]);

  const logout = () => {
    removeToken();
    localStorage.removeItem("abh_user");
    localStorage.removeItem("user");
    setUser(null);
    setAccountOpen(false);
    navigate("/");
  };

  const linkCls = ({ isActive }) =>
    `px-3 py-2 text-sm font-semibold transition ${
      isActive ? "text-amber-600" : "text-slate-700 hover:text-amber-600"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-600">
          <img src={logo} alt="" />
          </div>
          <div>
            <div className="font-display text-lg font-bold leading-none">Ali Bhai Hardware</div>
            <div className="text-[10px] font-medium text-slate-500">Aligarh • Since 2005</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <NavLink to="/" end className={linkCls}>Home</NavLink>
          <NavLink to="/products" className={linkCls}>All Products</NavLink>
          {/* {CATEGORIES.map((c) => (
            <NavLink key={c.slug} to={`/products/${c.slug}`} className={linkCls}>
              {c.name}
            </NavLink>
          ))} */}
          <NavLink to="/about" className={linkCls}>About</NavLink>
          <NavLink to="/my-orders" className={linkCls}>My Orders</NavLink>
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <div className="relative hidden sm:block">
              <button
                type="button"
                onClick={() => setAccountOpen((value) => !value)}
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-300 px-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                <User className="h-4 w-4 text-amber-600" />
                <span className="max-w-28 truncate">Hi, {user.name || "Account"}</span>
                <ChevronDown className={`h-4 w-4 transition ${accountOpen ? "rotate-180" : ""}`} />
              </button>
              {accountOpen && (
                <div className="absolute right-0 top-12 z-50 w-52 rounded-xl bg-white p-2 shadow-xl ring-1 ring-slate-200">
                  <Link to="/profile" onClick={() => setAccountOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                    My Profile
                  </Link>
                  <Link to="/my-orders" onClick={() => setAccountOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                    Track My Orders
                  </Link>
                  <button type="button" onClick={logout} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold text-red-600 hover:bg-red-50">
                    <LogOut className="h-4 w-4" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <NavLink
              to="/login"
              className="hidden sm:inline-flex h-10 items-center gap-2 rounded-lg border border-slate-300 px-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              <User className="h-4 w-4" /> Login / Sign Up
            </NavLink>
          )}
          <button
            onClick={() => dispatch(toggleDrawer())}
            className="relative flex h-10 items-center gap-2 rounded-lg bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-800"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Enquiry</span>
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-amber-500 px-1 text-[11px] font-bold text-white">
                {count}
              </span>
            )}
          </button>
          <button onClick={() => setOpen(!open)} className="md:hidden p-2">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="flex flex-col px-4 py-2">
            <NavLink to="/" end onClick={() => setOpen(false)} className={linkCls}>Home</NavLink>
            <NavLink to="/products" onClick={() => setOpen(false)} className={linkCls}>All Products</NavLink>
            {CATEGORIES.map((c) => (
              <NavLink key={c.slug} to={`/products/${c.slug}`} onClick={() => setOpen(false)} className={linkCls}>
                {c.name}
              </NavLink>
            ))}
            <NavLink to="/about" onClick={() => setOpen(false)} className={linkCls}>About</NavLink>
            <NavLink to="/my-orders" onClick={() => setOpen(false)} className={linkCls}>My Orders</NavLink>
            {user ? (
              <>
                <NavLink to="/profile" onClick={() => setOpen(false)} className={linkCls}>My Profile</NavLink>
                <NavLink to="/my-orders" onClick={() => setOpen(false)} className={linkCls}>Track My Orders</NavLink>
                <button type="button" onClick={() => { setOpen(false); logout(); }} className="px-3 py-2 text-left text-sm font-semibold text-red-600">Logout</button>
              </>
            ) : (
              <NavLink to="/login" onClick={() => setOpen(false)} className={linkCls}>Login / Sign Up</NavLink>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
