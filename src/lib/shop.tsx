import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { configureStore, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";
import {
  Shield, Phone, Mail, MapPin, MessageCircle, Menu, X, ShoppingCart, Trash2,
  Factory, Truck, Award, Package, Wrench, IndianRupee, Star, Facebook, Linkedin,
  Youtube, CheckCircle2, ChevronRight, Search, Download, LayoutDashboard,
  ClipboardList, BarChart3, Network, Lock as LockIcon, Building2, Users, Target,
} from "lucide-react";

/* ---------------- Redux ---------------- */
type Product = {
  id: number; name: string; category: string; image: string;
  description: string; moq: string; price: string;
  specs: Record<string, string>; gallery: string[];
};

type EnquiryItem = Product & { qty: number };

const enquirySlice = createSlice({
  name: "enquiry",
  initialState: { items: [] as EnquiryItem[], contactForm: {} as Record<string, string>, submissions: [] as any[] },
  reducers: {
    addToEnquiry: (s, a: PayloadAction<Product>) => {
      const ex = s.items.find(i => i.id === a.payload.id);
      if (ex) ex.qty += 1; else s.items.push({ ...a.payload, qty: 100 });
    },
    removeFromEnquiry: (s, a: PayloadAction<number>) => {
      s.items = s.items.filter(i => i.id !== a.payload);
    },
    updateQuantity: (s, a: PayloadAction<{ id: number; qty: number }>) => {
      const it = s.items.find(i => i.id === a.payload.id);
      if (it) it.qty = Math.max(1, a.payload.qty);
    },
    clearEnquiry: (s) => { s.items = []; },
    saveContactForm: (s, a: PayloadAction<any>) => {
      s.contactForm = a.payload;
      s.submissions.push({ ...a.payload, date: new Date().toISOString() });
    },
  },
});

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isProductModalOpen: false,
    selectedProduct: null as Product | null,
    isEnquiryDrawerOpen: false,
    activeFilter: "All" as string,
  },
  reducers: {
    openProductModal: (s, a: PayloadAction<Product>) => {
      s.selectedProduct = a.payload; s.isProductModalOpen = true;
    },
    closeProductModal: (s) => { s.isProductModalOpen = false; s.selectedProduct = null; },
    toggleEnquiryDrawer: (s) => { s.isEnquiryDrawerOpen = !s.isEnquiryDrawerOpen; },
    setActiveFilter: (s, a: PayloadAction<string>) => { s.activeFilter = a.payload; },
  },
});

const store = configureStore({
  reducer: { enquiry: enquirySlice.reducer, ui: uiSlice.reducer },
});
type RootState = ReturnType<typeof store.getState>;
const { addToEnquiry, removeFromEnquiry, updateQuantity, clearEnquiry, saveContactForm } = enquirySlice.actions;
const { openProductModal, closeProductModal, toggleEnquiryDrawer, setActiveFilter } = uiSlice.actions;

/* ---------------- Data ---------------- */
const PRODUCTS: Product[] = [
  { id: 1, name: "Round Padlock", category: "Padlocks", image: "https://source.unsplash.com/400x300/?padlock",
    description: "Heavy-duty brass-finished round padlock, ideal for gates & shutters.",
    moq: "100 units", price: "₹85 – ₹220",
    specs: { Material: "Hardened Steel", "Size Options": "40/50/60/75mm", Finish: "Brass Plated", MOQ: "100 units", Weight: "180g", Certifications: "ISO 9001:2015, BIS", "Lead Time": "5-7 days" },
    gallery: ["https://source.unsplash.com/400x300/?padlock", "https://source.unsplash.com/400x300/?lock", "https://source.unsplash.com/400x300/?keylock"] },
  { id: 2, name: "Iron Padlock", category: "Padlocks", image: "https://source.unsplash.com/400x300/?iron+lock",
    description: "Industrial-grade iron padlock with double-locking mechanism.",
    moq: "100 units", price: "₹65 – ₹180",
    specs: { Material: "Cast Iron", "Size Options": "50/65/75mm", Finish: "Black Powder Coated", MOQ: "100 units", Weight: "220g", Certifications: "BIS Certified", "Lead Time": "5-7 days" },
    gallery: ["https://source.unsplash.com/400x300/?iron+lock", "https://source.unsplash.com/400x300/?metal+lock", "https://source.unsplash.com/400x300/?industrial+lock"] },
  { id: 3, name: "Safety Padlock", category: "Safety", image: "https://source.unsplash.com/400x300/?safety+lock",
    description: "Tamper-proof safety padlock for industrial lockout/tagout use.",
    moq: "50 units", price: "₹240 – ₹520",
    specs: { Material: "Reinforced Steel", "Size Options": "Standard", Finish: "Safety Red", MOQ: "50 units", Weight: "260g", Certifications: "ISO 9001:2015", "Lead Time": "7-10 days" },
    gallery: ["https://source.unsplash.com/400x300/?safety+lock", "https://source.unsplash.com/400x300/?red+lock", "https://source.unsplash.com/400x300/?industrial"] },
  { id: 4, name: "Disc Padlock", category: "Disc Locks", image: "https://source.unsplash.com/400x300/?disc+lock",
    description: "High-security disc detainer padlock, pick-resistant.",
    moq: "100 units", price: "₹180 – ₹450",
    specs: { Material: "Hardened Alloy", "Size Options": "60/70mm", Finish: "Chrome", MOQ: "100 units", Weight: "300g", Certifications: "BIS, ISO", "Lead Time": "5-7 days" },
    gallery: ["https://source.unsplash.com/400x300/?disc+lock", "https://source.unsplash.com/400x300/?chrome+lock", "https://source.unsplash.com/400x300/?security"] },
  { id: 5, name: "Shutter Lock", category: "Hardware", image: "https://source.unsplash.com/400x300/?shutter",
    description: "Robust shutter lock for shops, warehouses & garages.",
    moq: "100 units", price: "₹150 – ₹380",
    specs: { Material: "Mild Steel", "Size Options": "Standard", Finish: "Galvanized", MOQ: "100 units", Weight: "350g", Certifications: "BIS", "Lead Time": "5-7 days" },
    gallery: ["https://source.unsplash.com/400x300/?shutter", "https://source.unsplash.com/400x300/?warehouse+lock", "https://source.unsplash.com/400x300/?garage"] },
  { id: 6, name: "Cupboard Lock", category: "Hardware", image: "https://source.unsplash.com/400x300/?cupboard+lock",
    description: "Compact cupboard / drawer lock with smooth cam action.",
    moq: "200 units", price: "₹35 – ₹90",
    specs: { Material: "Brass + Steel", "Size Options": "16/20/25mm", Finish: "Nickel", MOQ: "200 units", Weight: "85g", Certifications: "ISO", "Lead Time": "4-6 days" },
    gallery: ["https://source.unsplash.com/400x300/?cupboard+lock", "https://source.unsplash.com/400x300/?drawer", "https://source.unsplash.com/400x300/?furniture+lock"] },
  { id: 7, name: "SS Padlock", category: "Padlocks", image: "https://source.unsplash.com/400x300/?stainless+steel",
    description: "Marine-grade stainless steel padlock, weather-proof.",
    moq: "100 units", price: "₹260 – ₹620",
    specs: { Material: "SS 304", "Size Options": "50/60/75mm", Finish: "Brushed Steel", MOQ: "100 units", Weight: "240g", Certifications: "ISO 9001:2015", "Lead Time": "7-10 days" },
    gallery: ["https://source.unsplash.com/400x300/?stainless+steel", "https://source.unsplash.com/400x300/?steel+lock", "https://source.unsplash.com/400x300/?marine"] },
  { id: 8, name: "Lockout Padlock", category: "Safety", image: "https://source.unsplash.com/400x300/?lockout",
    description: "OSHA-compliant lockout padlock for electrical safety.",
    moq: "50 units", price: "₹320 – ₹680",
    specs: { Material: "Reinforced Nylon", "Size Options": "Standard", Finish: "Multi-color", MOQ: "50 units", Weight: "150g", Certifications: "ISO, OSHA equivalent", "Lead Time": "7-10 days" },
    gallery: ["https://source.unsplash.com/400x300/?lockout", "https://source.unsplash.com/400x300/?electrical+lock", "https://source.unsplash.com/400x300/?safety"] },
  { id: 9, name: "Butterfly Lock", category: "Padlocks", image: "https://source.unsplash.com/400x300/?butterfly+lock",
    description: "Classic butterfly-style padlock with dual key system.",
    moq: "100 units", price: "₹95 – ₹230",
    specs: { Material: "Iron + Brass", "Size Options": "50/65mm", Finish: "Brass Polished", MOQ: "100 units", Weight: "200g", Certifications: "BIS", "Lead Time": "5-7 days" },
    gallery: ["https://source.unsplash.com/400x300/?butterfly+lock", "https://source.unsplash.com/400x300/?vintage+lock", "https://source.unsplash.com/400x300/?brass"] },
  { id: 10, name: "Tower Bolt", category: "Hardware", image: "https://source.unsplash.com/400x300/?bolt+hardware",
    description: "Heavy tower bolt for doors & gates, smooth slide action.",
    moq: "200 units", price: "₹45 – ₹160",
    specs: { Material: "Brass / SS", "Size Options": "4/6/8/12 inch", Finish: "Polished", MOQ: "200 units", Weight: "180g", Certifications: "ISO", "Lead Time": "4-6 days" },
    gallery: ["https://source.unsplash.com/400x300/?bolt+hardware", "https://source.unsplash.com/400x300/?door+bolt", "https://source.unsplash.com/400x300/?brass+hardware"] },
  { id: 11, name: "Brass Padlock", category: "Padlocks", image: "https://source.unsplash.com/400x300/?brass+lock",
    description: "Solid brass padlock — premium finish, rust-proof.",
    moq: "100 units", price: "₹140 – ₹420",
    specs: { Material: "Solid Brass", "Size Options": "30/40/50mm", Finish: "Brass Polished", MOQ: "100 units", Weight: "160g", Certifications: "BIS, ISO", "Lead Time": "5-7 days" },
    gallery: ["https://source.unsplash.com/400x300/?brass+lock", "https://source.unsplash.com/400x300/?gold+lock", "https://source.unsplash.com/400x300/?premium+lock"] },
  { id: 12, name: "Combination Lock", category: "Disc Locks", image: "https://source.unsplash.com/400x300/?combination+lock",
    description: "4-digit combination padlock, keyless convenience.",
    moq: "100 units", price: "₹180 – ₹390",
    specs: { Material: "Zinc Alloy", "Size Options": "Standard", Finish: "Black/Silver", MOQ: "100 units", Weight: "140g", Certifications: "ISO", "Lead Time": "6-8 days" },
    gallery: ["https://source.unsplash.com/400x300/?combination+lock", "https://source.unsplash.com/400x300/?number+lock", "https://source.unsplash.com/400x300/?keyless"] },
];

const FILTERS = ["All", "Padlocks", "Safety", "Disc Locks", "Hardware"];

const INDIAN_STATES = ["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal"];

const DUMMY_ENQUIRIES = [
  { id: 1, name: "Rajesh Sharma", company: "Sharma Hardware Mart", state: "Maharashtra", phone: "+91 98201 12345", products: "Round Padlock, Brass Padlock", qty: 2000, date: "2025-06-10", status: "New" },
  { id: 2, name: "Priya Mehta", company: "Mehta Trading Co.", state: "Gujarat", phone: "+91 99099 87654", products: "Disc Padlock", qty: 5000, date: "2025-06-09", status: "Converted" },
  { id: 3, name: "Ahmed Khan", company: "Khan Industries", state: "Uttar Pradesh", phone: "+91 95551 22233", products: "Safety Padlock, Lockout", qty: 800, date: "2025-06-08", status: "Contacted" },
  { id: 4, name: "Suresh Reddy", company: "Reddy Steel Works", state: "Telangana", phone: "+91 98480 11122", products: "SS Padlock", qty: 1500, date: "2025-06-07", status: "New" },
  { id: 5, name: "Karthik Iyer", company: "Iyer & Sons", state: "Tamil Nadu", phone: "+91 99440 55667", products: "Shutter Lock, Tower Bolt", qty: 3000, date: "2025-06-06", status: "Converted" },
  { id: 6, name: "Manish Gupta", company: "Gupta Hardware", state: "Delhi", phone: "+91 98101 33445", products: "Iron Padlock", qty: 4000, date: "2025-06-05", status: "Contacted" },
  { id: 7, name: "Vikram Singh", company: "Singh Enterprises", state: "Punjab", phone: "+91 98140 99887", products: "Brass Padlock, Cupboard", qty: 1200, date: "2025-06-04", status: "Converted" },
  { id: 8, name: "Anita Desai", company: "Desai Distributors", state: "Karnataka", phone: "+91 99000 22334", products: "Combination Lock", qty: 600, date: "2025-06-03", status: "New" },
  { id: 9, name: "Ravi Patel", company: "Patel Lockworks", state: "Gujarat", phone: "+91 99250 77889", products: "Round Padlock, SS Padlock", qty: 8000, date: "2025-06-02", status: "Converted" },
  { id: 10, name: "Sanjay Verma", company: "Verma Trading", state: "Rajasthan", phone: "+91 94140 66554", products: "Butterfly Lock", qty: 2500, date: "2025-06-01", status: "Pending" },
];

/* ---------------- Helpers ---------------- */
function useCountUp(target: number, ref: React.RefObject<HTMLElement | null>) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0;
        const dur = 1600, t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / dur);
          setVal(Math.floor(start + (target - start) * p));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, ref]);
  return val;
}

function Toast({ msg, onClose }: { msg: string; onClose: () => void }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className="fixed top-24 right-6 z-[100] flex items-center gap-3 rounded-lg bg-amber-600 px-5 py-3 text-white shadow-2xl">
      <CheckCircle2 className="h-5 w-5" /> <span className="font-medium">{msg}</span>
    </div>
  );
}

/* ---------------- App ---------------- */
function Page() {
  return (
    <Provider store={store}>
      <AppShell />
    </Provider>
  );
}

function AppShell() {
  const [toast, setToast] = useState("");
  const [adminGate, setAdminGate] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === "A" || e.key === "a")) {
        e.preventDefault(); setAdminGate(true);
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <AnnouncementBar />
      <Navbar />
      <Hero />
      <Stats />
      <DualIdentity />
      <Products />
      <SupplyNetwork />
      <WhyUs />
      <Founder />
      <Certifications />
      <Testimonials />
      <Contact onSubmit={() => setToast("Enquiry sent! We'll contact you within 24 hours.")} />
      <Footer />
      <ProductModal />
      <EnquiryDrawer onSubmit={() => setToast("Enquiry sent via WhatsApp!")} />
      <FloatingButtons />
      {toast && <Toast msg={toast} onClose={() => setToast("")} />}
      {adminGate && <AdminGate onPass={() => { setAdminGate(false); setAdminOpen(true); }} onClose={() => setAdminGate(false)} />}
      {adminOpen && <AdminPanel onClose={() => setAdminOpen(false)} />}
    </div>
  );
}

/* ---------------- Sections ---------------- */
function AnnouncementBar() {
  const text = "🏆 ISO 9001:2015 Certified  •  Pan-India Delivery Available  •  Bulk Orders Welcome  •  Gujarat Hub: Fast Dispatch within 24hrs  •  Call: +91 79425 63317";
  return (
    <div className="overflow-hidden bg-amber-600 py-2 text-sm font-medium text-slate-900">
      <div className="flex whitespace-nowrap animate-marquee">
        <span className="px-8">{text}</span><span className="px-8">{text}</span>
      </div>
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h);
  }, []);
  const links = [
    ["Home", "#home"], ["Products", "#products"], ["About Us", "#about"],
    ["Manufacturing", "#manufacturing"], ["Supply Network", "#supply"], ["Contact", "#contact"],
  ];
  return (
    <header className={`sticky top-0 z-50 transition-all ${scrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <a href="#home" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-amber-500"><Shield className="h-6 w-6" /></div>
          <div>
            <div className="text-base font-bold leading-none text-slate-900">Ali Bhai Hardware</div>
            <div className="text-[10px] font-medium text-amber-600 tracking-widest">SINCE 1995 • ALIGARH</div>
          </div>
        </a>
        <nav className="hidden lg:flex items-center gap-7">
          {links.map(([l, h]) => (
            <a key={l} href={h} className="text-sm font-medium text-slate-700 hover:text-amber-600 transition">{l}</a>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-3">
          <a href="https://wa.me/917942563317" target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white hover:bg-green-600 transition">
            <MessageCircle className="h-5 w-5" />
          </a>
          <a href="#contact" className="rounded-lg bg-amber-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-amber-600/30 hover:bg-amber-700 transition">Get Bulk Quote</a>
        </div>
        <button className="lg:hidden" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <div className="lg:hidden border-t bg-white px-4 py-4">
          {links.map(([l, h]) => (
            <a key={l} href={h} onClick={() => setOpen(false)} className="block py-2 text-slate-700">{l}</a>
          ))}
          <a href="#contact" className="mt-2 block rounded-lg bg-amber-600 px-4 py-2.5 text-center text-sm font-semibold text-white">Get Bulk Quote</a>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="hero-pattern relative overflow-hidden">
      <div className="geo-pattern absolute inset-0 opacity-30" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
        <div className="text-white">
          <span className="inline-block rounded-full border border-amber-500/50 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400">
            Aligarh's Most Trusted Lock Manufacturer
          </span>
          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] lg:text-6xl">
            Security That <span className="text-amber-500">India Relies</span> On
          </h1>
          <p className="mt-6 max-w-xl text-lg text-slate-300">
            From our factory in Aligarh to your doorstep anywhere in India — premium padlocks, safety locks & hardware since 1995. Gujarat distribution hub ensures 24hr pan-India dispatch.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#products" className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-6 py-3.5 font-semibold text-white shadow-xl shadow-amber-600/30 hover:bg-amber-700 transition">
              Explore Products <ChevronRight className="h-4 w-4" />
            </a>
            <a href="https://wa.me/917942563317" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-6 py-3.5 font-semibold text-white backdrop-blur hover:bg-white/20 transition">
              <MessageCircle className="h-4 w-4" /> WhatsApp Ali Bhai
            </a>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300">
            {["ISO Certified", "25+ Years", "50K+ Monthly Units", "Gujarat Hub"].map(t => (
              <span key={t} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-amber-500" /> {t}</span>
            ))}
          </div>
        </div>
        <div className="lg:flex lg:items-center lg:justify-end">
          <div className="rounded-2xl border border-white/10 bg-white/95 p-6 shadow-2xl backdrop-blur w-full max-w-sm">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" /></span>
              Today's Dispatch Status
            </div>
            <div className="mt-4 text-2xl font-bold text-slate-900">Gujarat Hub: Active</div>
            <div className="mt-1 text-sm text-slate-600">Next dispatch window</div>
            <div className="mt-1 text-3xl font-bold text-amber-600">4:00 PM</div>
            <div className="mt-5 grid grid-cols-2 gap-3 border-t pt-4 text-center">
              <div><div className="text-2xl font-bold text-slate-900">1,240</div><div className="text-xs text-slate-500">Units today</div></div>
              <div><div className="text-2xl font-bold text-slate-900">18</div><div className="text-xs text-slate-500">States shipped</div></div>
            </div>
            <a href="#contact" className="mt-5 block rounded-lg bg-slate-900 py-3 text-center text-sm font-semibold text-white hover:bg-slate-800 transition">Track Order</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatItem({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const v = useCountUp(target, ref);
  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl font-bold text-slate-900 lg:text-5xl">{v.toLocaleString("en-IN")}{suffix}</div>
      <div className="mt-2 text-sm font-medium text-slate-800">{label}</div>
    </div>
  );
}

function Stats() {
  return (
    <section className="bg-amber-500 py-12">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 lg:grid-cols-4 lg:px-8">
        <StatItem target={25} suffix="+" label="Years in Business" />
        <StatItem target={50000} suffix="+" label="Locks Per Month" />
        <StatItem target={28} suffix="" label="States Supplied" />
        <StatItem target={200} suffix="+" label="Bulk Clients" />
      </div>
    </section>
  );
}

function DualIdentity() {
  return (
    <section id="manufacturing" className="py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Manufacturer + Supplier</span>
          <h2 className="mt-2 font-display text-4xl font-bold text-slate-900">Two Strengths, One Promise</h2>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl bg-slate-900 text-white">
            <img src="https://source.unsplash.com/600x300/?factory" alt="Factory" className="h-56 w-full object-cover opacity-80" />
            <div className="p-8">
              <div className="flex items-center gap-3"><Factory className="h-8 w-8 text-amber-500" /><h3 className="font-display text-3xl font-bold">We Manufacture</h3></div>
              <p className="mt-3 text-slate-300">Aligarh factory with full in-house production lines.</p>
              <ul className="mt-5 space-y-2.5">
                {["In-house production lines","Every batch quality tested","Custom branding & OEM","BIS certified processes"].map(p => (
                  <li key={p} className="flex items-start gap-2 text-sm"><CheckCircle2 className="mt-0.5 h-4 w-4 text-amber-500" /> {p}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl bg-amber-500 text-slate-900">
            <img src="https://source.unsplash.com/600x300/?warehouse+india" alt="Warehouse" className="h-56 w-full object-cover" />
            <div className="p-8">
              <div className="flex items-center gap-3"><Truck className="h-8 w-8 text-slate-900" /><h3 className="font-display text-3xl font-bold">We Supply</h3></div>
              <p className="mt-3 text-slate-800">Surat hub dispatches across India in 24 hours.</p>
              <ul className="mt-5 space-y-2.5">
                {["Pan-India delivery in all 28 states","Gujarat hub fast dispatch","Wholesale & bulk pricing","Same-day order processing"].map(p => (
                  <li key={p} className="flex items-start gap-2 text-sm font-medium"><CheckCircle2 className="mt-0.5 h-4 w-4 text-slate-900" /> {p}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Products() {
  const dispatch = useDispatch();
  const filter = useSelector((s: RootState) => s.ui.activeFilter);
  const list = useMemo(() => filter === "All" ? PRODUCTS : PRODUCTS.filter(p => p.category === filter), [filter]);
  return (
    <section id="products" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Catalog</span>
          <h2 className="mt-2 font-display text-4xl font-bold text-slate-900">Our Product Range</h2>
          <p className="mt-2 text-slate-600">Manufactured in Aligarh • Supplied across India</p>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {FILTERS.map(f => (
            <button key={f} onClick={() => dispatch(setActiveFilter(f))}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${filter === f ? "bg-slate-900 text-white" : "bg-white text-slate-700 hover:bg-slate-200"}`}>
              {f}
            </button>
          ))}
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map(p => (
            <div key={p.id} className="group overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-xl">
              <div className="relative overflow-hidden">
                <img src={p.image} alt={p.name} className="h-56 w-full object-cover transition group-hover:scale-105" />
                <span className="absolute left-3 top-3 rounded-full bg-slate-900/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-400">{p.category}</span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-slate-900">{p.name}</h3>
                <p className="mt-1 text-sm text-slate-600 line-clamp-2">{p.description}</p>
                <div className="mt-3 flex items-center justify-between text-xs font-medium">
                  <span className="text-slate-500">MOQ: {p.moq}</span>
                  <span className="flex items-center text-amber-600"><IndianRupee className="h-3 w-3" />{p.price.replace("₹","")}</span>
                </div>
                <div className="mt-4 flex gap-2">
                  <button onClick={() => dispatch(openProductModal(p))} className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition">View Details</button>
                  <button onClick={() => dispatch(addToEnquiry(p))} className="flex-1 rounded-lg bg-amber-600 px-3 py-2 text-xs font-semibold text-white hover:bg-amber-700 transition">+ Enquiry</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductModal() {
  const dispatch = useDispatch();
  const { isProductModalOpen, selectedProduct: p } = useSelector((s: RootState) => s.ui);
  if (!isProductModalOpen || !p) return null;
  const related = PRODUCTS.filter(x => x.id !== p.id && x.category === p.category).slice(0, 3);
  const supplyStates = ["Maharashtra","Gujarat","Delhi","Karnataka","Tamil Nadu","UP","Telangana","Punjab","Rajasthan","Kerala","WB","Haryana"];
  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm">
      <div className="relative my-8 w-full max-w-5xl rounded-2xl bg-white shadow-2xl">
        <button onClick={() => dispatch(closeProductModal())} className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-white hover:bg-slate-700"><X className="h-4 w-4" /></button>
        <div className="grid gap-6 p-6 lg:grid-cols-2 lg:p-8">
          <div>
            <img src={p.gallery[0]} alt={p.name} className="aspect-square w-full rounded-xl object-cover" />
            <div className="mt-3 grid grid-cols-3 gap-3">
              {p.gallery.map((g, i) => <img key={i} src={g} alt="" className="aspect-square w-full rounded-lg object-cover" />)}
            </div>
          </div>
          <div>
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-700">{p.category}</span>
            <h3 className="mt-3 font-display text-3xl font-bold text-slate-900">{p.name}</h3>
            <p className="mt-2 text-slate-600">{p.description}</p>
            <div className="mt-4 text-2xl font-bold text-amber-600">{p.price}</div>
            <table className="mt-5 w-full text-sm">
              <tbody>
                {Object.entries(p.specs).map(([k, v]) => (
                  <tr key={k} className="border-b"><td className="py-2 font-medium text-slate-500">{k}</td><td className="py-2 text-right font-semibold text-slate-900">{v}</td></tr>
                ))}
              </tbody>
            </table>
            <div className="mt-5 flex gap-2">
              <button onClick={() => { dispatch(addToEnquiry(p)); dispatch(closeProductModal()); dispatch(toggleEnquiryDrawer()); }} className="flex-1 rounded-lg bg-amber-600 py-3 font-semibold text-white hover:bg-amber-700">Add to Enquiry</button>
              <a href={`https://wa.me/917942563317?text=${encodeURIComponent(`Hi, I'm interested in ${p.name}. Please share details.`)}`} target="_blank" rel="noreferrer" className="flex-1 rounded-lg bg-green-500 py-3 text-center font-semibold text-white hover:bg-green-600">WhatsApp Enquire</a>
            </div>
          </div>
        </div>
        <div className="border-t bg-slate-50 p-6 lg:p-8">
          <h4 className="font-bold text-slate-900">Available across India</h4>
          <div className="mt-3 flex flex-wrap gap-2">
            {supplyStates.map(s => <span key={s} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm">📍 {s}</span>)}
          </div>
          <h4 className="mt-6 font-bold text-slate-900">Related Products</h4>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {related.map(r => (
              <button key={r.id} onClick={() => dispatch(openProductModal(r))} className="flex items-center gap-3 rounded-lg bg-white p-3 text-left shadow-sm hover:shadow-md transition">
                <img src={r.image} alt="" className="h-14 w-14 rounded-md object-cover" />
                <div><div className="text-sm font-semibold text-slate-900">{r.name}</div><div className="text-xs text-slate-500">{r.price}</div></div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SupplyNetwork() {
  return (
    <section id="supply" className="bg-slate-900 py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-500">Logistics</span>
          <h2 className="mt-2 font-display text-4xl font-bold">Our All-India Supply Network</h2>
        </div>
        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative">
            <svg viewBox="0 0 400 450" className="w-full">
              <path d="M120 60 Q90 90 100 140 Q80 170 90 210 Q70 240 100 290 Q120 340 170 380 Q210 410 250 390 Q300 380 320 340 Q350 300 340 250 Q360 200 330 160 Q320 110 280 80 Q230 50 180 55 Z"
                    fill="#1e293b" stroke="#d97706" strokeWidth="2" />
              {[
                { x: 180, y: 130, label: "Aligarh (HQ)", color: "#d97706", size: 8 },
                { x: 150, y: 260, label: "Surat (Hub)", color: "#d97706", size: 8 },
                { x: 195, y: 110, label: "Delhi", color: "#10b981", size: 5 },
                { x: 165, y: 220, label: "Mumbai", color: "#10b981", size: 5 },
                { x: 230, y: 350, label: "Chennai", color: "#10b981", size: 5 },
                { x: 290, y: 220, label: "Kolkata", color: "#10b981", size: 5 },
                { x: 210, y: 290, label: "Hyderabad", color: "#10b981", size: 5 },
                { x: 195, y: 340, label: "Bangalore", color: "#10b981", size: 5 },
              ].map((d, i) => (
                <g key={i}>
                  <circle cx={d.x} cy={d.y} r={d.size} fill={d.color}>
                    <animate attributeName="r" values={`${d.size};${d.size + 3};${d.size}`} dur="2s" repeatCount="indefinite" />
                  </circle>
                  <text x={d.x + 12} y={d.y + 4} fill="#fff" fontSize="11" fontWeight="600">{d.label}</text>
                </g>
              ))}
              <line x1="180" y1="130" x2="150" y2="260" stroke="#d97706" strokeWidth="1.5" strokeDasharray="4,3" />
            </svg>
          </div>
          <div className="space-y-5">
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-6">
              <div className="flex items-center gap-3"><Factory className="h-7 w-7 text-amber-500" /><div><div className="font-bold text-lg">Manufacturing HQ</div><div className="text-sm text-amber-400">Aligarh, Uttar Pradesh</div></div></div>
              <p className="mt-3 text-sm text-slate-300">Full-scale production unit with 50K+ units monthly capacity.</p>
            </div>
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-6">
              <div className="flex items-center gap-3"><Truck className="h-7 w-7 text-amber-500" /><div><div className="font-bold text-lg">Gujarat Distribution Hub</div><div className="text-sm text-amber-400">Surat, Gujarat</div></div></div>
              <p className="mt-3 text-sm text-slate-300">24hr dispatch. Fastest route to South & West India.</p>
            </div>
            <div className="rounded-2xl bg-white/5 p-6">
              <div className="font-bold">Delivery Timelines</div>
              <div className="mt-3 space-y-2 text-sm text-slate-300">
                <div className="flex justify-between"><span>North India</span><span className="font-semibold text-amber-400">2–3 days</span></div>
                <div className="flex justify-between"><span>South & West</span><span className="font-semibold text-amber-400">3–4 days</span></div>
                <div className="flex justify-between"><span>Northeast</span><span className="font-semibold text-amber-400">5–6 days</span></div>
              </div>
              <div className="mt-4 text-xs text-slate-400">Serving all 28 states across India.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const items = [
    { icon: Factory, t: "In-House Manufacturing", d: "Full control over quality at our Aligarh unit." },
    { icon: Truck, t: "Gujarat Hub Advantage", d: "Fastest pan-India dispatch from Surat." },
    { icon: Package, t: "Bulk Order Experts", d: "MOQ from just 100 units. Scale as you need." },
    { icon: Award, t: "ISO 9001:2015", d: "Certified quality processes end-to-end." },
    { icon: Wrench, t: "Custom Branding", d: "OEM available on request for your brand." },
    { icon: IndianRupee, t: "Competitive Pricing", d: "Factory-direct rates with no middleman." },
  ];
  return (
    <section id="about" className="py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Why Choose Us</span>
          <h2 className="mt-2 font-display text-4xl font-bold text-slate-900">Built on Trust, Backed by Quality</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, t, d }) => (
            <div key={t} className="group rounded-2xl border border-slate-200 bg-white p-7 transition hover:border-amber-500 hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-amber-500 transition group-hover:bg-amber-600 group-hover:text-white"><Icon className="h-6 w-6" /></div>
              <h3 className="mt-5 text-lg font-bold text-slate-900">{t}</h3>
              <p className="mt-2 text-sm text-slate-600">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Founder() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-4xl px-4 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Leadership</span>
          <h2 className="mt-2 font-display text-4xl font-bold text-slate-900">Meet the Founder</h2>
        </div>
        <div className="mt-12 overflow-hidden rounded-3xl bg-white shadow-xl lg:flex">
          <img src="https://source.unsplash.com/400x400/?businessman+india" alt="Ali Bhai" className="h-72 w-full object-cover lg:h-auto lg:w-72" />
          <div className="p-8 lg:p-10">
            <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">25+ Years in Hardware Industry</span>
            <h3 className="mt-4 font-display text-3xl font-bold text-slate-900">Ali Bhai</h3>
            <div className="text-sm font-medium text-amber-600">Co-Founder & Managing Director</div>
            <blockquote className="mt-5 border-l-4 border-amber-500 pl-5 text-lg italic text-slate-700">
              "We built this company on one principle — every lock we make must protect something that matters."
            </blockquote>
            <div className="mt-6 flex gap-3">
              <a href="https://wa.me/917942563317" target="_blank" rel="noreferrer" className="rounded-lg bg-green-500 px-4 py-2 text-sm font-semibold text-white hover:bg-green-600">WhatsApp Direct</a>
              <a href="#contact" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">Contact Office</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Certifications() {
  const clients = ["Reliance Industries", "L&T", "Tata Projects", "Godrej", "Havells", "Adani Group", "ONGC", "Indian Railways"];
  return (
    <section className="bg-slate-100 py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Trust</span>
          <h2 className="mt-2 font-display text-4xl font-bold text-slate-900">Certified. Verified. Trusted.</h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { t: "ISO 9001:2015", d: "Quality Management System certified" },
            { t: "BIS Certified", d: "Bureau of Indian Standards mark" },
            { t: "IndiaMART Verified", d: "Trusted seller since 2008" },
          ].map(c => (
            <div key={c.t} className="rounded-2xl bg-white p-8 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100"><Award className="h-8 w-8 text-amber-600" /></div>
              <h3 className="mt-4 text-xl font-bold text-slate-900">{c.t}</h3>
              <p className="mt-1 text-sm text-slate-600">{c.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-14 text-center">
          <div className="text-sm font-semibold uppercase tracking-wider text-slate-500">Trusted by 200+ businesses across India</div>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {clients.map(c => <span key={c} className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700">{c}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const t = [
    { n: "Ramesh Patel", c: "Patel Hardware Pvt Ltd", city: "Ahmedabad", q: "Gujarat hub delivery is unmatched. Got 5000 locks in 18 hours." },
    { n: "Suresh Kumar", c: "Kumar Trading Co.", city: "Delhi", q: "Been sourcing from Ali Bhai for 8 years. Quality never drops." },
    { n: "Mohammed Iqbal", c: "Iqbal Enterprises", city: "Mumbai", q: "Custom branding on padlocks done perfectly. Highly recommend." },
  ];
  return (
    <section className="bg-slate-900 py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-500">Testimonials</span>
          <h2 className="mt-2 font-display text-4xl font-bold">What Our Clients Say</h2>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {t.map(x => (
            <div key={x.n} className="rounded-2xl border border-white/10 bg-white/5 p-7">
              <div className="flex gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
              </div>
              <p className="mt-5 text-lg italic text-slate-200">"{x.q}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-600 font-bold text-white">{x.n[0]}</div>
                <div>
                  <div className="font-semibold">{x.n}</div>
                  <div className="text-xs text-slate-400">{x.c} • {x.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact({ onSubmit }: { onSubmit: () => void }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name: "", company: "", state: "", phone: "", email: "", category: "", qty: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const update = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    ["name","phone","email","state"].forEach(k => { if (!(form as any)[k]) er[k] = "Required"; });
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) er.email = "Invalid email";
    setErrors(er);
    if (Object.keys(er).length) return;
    dispatch(saveContactForm(form));
    onSubmit();
    setForm({ name: "", company: "", state: "", phone: "", email: "", category: "", qty: "", message: "" });
  };
  const inp = (k: string) => `mt-1 w-full rounded-lg border bg-white px-4 py-2.5 text-sm transition focus:outline-none focus:ring-2 focus:ring-amber-500 ${errors[k] ? "border-red-500" : "border-slate-300"}`;
  return (
    <section id="contact" className="py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Contact</span>
          <h2 className="mt-2 font-display text-4xl font-bold text-slate-900">Let's Talk Business</h2>
        </div>
        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div className="space-y-5">
            <div className="rounded-2xl bg-slate-900 p-6 text-white">
              <div className="flex items-start gap-3"><MapPin className="mt-1 h-5 w-5 text-amber-500" /><div><div className="font-bold">Manufacturing HQ</div><div className="text-sm text-slate-300">Mumta Lodge, Ada Colony, Shahjamal,<br />Aligarh - 202001, Uttar Pradesh</div></div></div>
              <div className="mt-5 flex items-start gap-3 border-t border-white/10 pt-5"><Truck className="mt-1 h-5 w-5 text-amber-500" /><div><div className="font-bold">Gujarat Distribution Hub</div><div className="text-sm text-slate-300">Plot 42, GIDC, Surat - 395010, Gujarat</div></div></div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <a href="tel:+917942563317" className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 hover:border-amber-500 transition"><Phone className="h-5 w-5 text-amber-600" /><div><div className="text-xs text-slate-500">Call us</div><div className="text-sm font-semibold">+91 79425 63317</div></div></a>
              <a href="mailto:info@alibhaihardware.com" className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 hover:border-amber-500 transition"><Mail className="h-5 w-5 text-amber-600" /><div><div className="text-xs text-slate-500">Email</div><div className="text-sm font-semibold">info@alibhaihardware.com</div></div></a>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm">
              <div className="flex justify-between"><span className="text-slate-500">GST No</span><span className="font-mono font-semibold">09AGZPK8960E1ZL</span></div>
              <div className="mt-2 flex justify-between"><span className="text-slate-500">Hours</span><span className="font-semibold">Mon–Sat • 9:30 AM – 7:00 PM</span></div>
            </div>
            <div className="flex h-48 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 text-white">
              <div className="text-center">
                <MapPin className="mx-auto h-10 w-10 text-amber-500" />
                <div className="mt-2 font-semibold">Find us on Google Maps</div>
                <a href="https://maps.google.com/?q=Aligarh+Uttar+Pradesh" target="_blank" rel="noreferrer" className="mt-3 inline-block rounded-lg bg-amber-600 px-4 py-2 text-xs font-semibold">View on Google Maps</a>
              </div>
            </div>
          </div>
          <form onSubmit={submit} className="rounded-2xl border border-slate-200 bg-white p-6 lg:p-8">
            <h3 className="text-xl font-bold text-slate-900">Request Bulk Quote</h3>
            <p className="mt-1 text-sm text-slate-500">We respond within 24 hours.</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div><label className="text-xs font-semibold text-slate-600">Name *</label><input className={inp("name")} value={form.name} onChange={e => update("name", e.target.value)} />{errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}</div>
              <div><label className="text-xs font-semibold text-slate-600">Company</label><input className={inp("company")} value={form.company} onChange={e => update("company", e.target.value)} /></div>
              <div><label className="text-xs font-semibold text-slate-600">State *</label>
                <select className={inp("state")} value={form.state} onChange={e => update("state", e.target.value)}>
                  <option value="">Select state</option>
                  {INDIAN_STATES.map(s => <option key={s}>{s}</option>)}
                </select>{errors.state && <p className="mt-1 text-xs text-red-500">{errors.state}</p>}
              </div>
              <div><label className="text-xs font-semibold text-slate-600">Phone *</label><input className={inp("phone")} value={form.phone} onChange={e => update("phone", e.target.value)} />{errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}</div>
              <div className="sm:col-span-2"><label className="text-xs font-semibold text-slate-600">Email *</label><input type="email" className={inp("email")} value={form.email} onChange={e => update("email", e.target.value)} />{errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}</div>
              <div><label className="text-xs font-semibold text-slate-600">Product Category</label>
                <select className={inp("category")} value={form.category} onChange={e => update("category", e.target.value)}>
                  <option value="">Select category</option>
                  {FILTERS.filter(f => f !== "All").map(f => <option key={f}>{f}</option>)}
                </select>
              </div>
              <div><label className="text-xs font-semibold text-slate-600">Quantity Required</label><input className={inp("qty")} value={form.qty} onChange={e => update("qty", e.target.value)} placeholder="e.g. 1000 units" /></div>
              <div className="sm:col-span-2"><label className="text-xs font-semibold text-slate-600">Message</label><textarea rows={3} className={inp("message")} value={form.message} onChange={e => update("message", e.target.value)} /></div>
            </div>
            <button type="submit" className="mt-5 w-full rounded-lg bg-amber-600 py-3.5 font-semibold text-white shadow-lg shadow-amber-600/30 hover:bg-amber-700 transition">Send Enquiry</button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-950 pt-16 pb-6 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-600"><Shield className="h-6 w-6 text-white" /></div><div className="text-lg font-bold text-white">Ali Bhai Hardware</div></div>
            <p className="mt-4 text-sm">Manufactured in Aligarh. Trusted across India. Premium locks & hardware since 1995.</p>
          </div>
          <div>
            <h4 className="font-bold text-white">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-sm">
              {["Home","Products","About Us","Supply Network","Contact"].map(l => <li key={l}><a href="#" className="hover:text-amber-500">{l}</a></li>)}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white">Product Categories</h4>
            <ul className="mt-4 space-y-2 text-sm">
              {FILTERS.filter(f => f !== "All").map(l => <li key={l}><a href="#products" className="hover:text-amber-500">{l}</a></li>)}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white">Contact</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-amber-500" /> Aligarh, UP • Surat, GJ</li>
              <li className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4 text-amber-500" /> +91 79425 63317</li>
              <li className="flex items-start gap-2"><Mail className="mt-0.5 h-4 w-4 text-amber-500" /> info@alibhaihardware.com</li>
            </ul>
            <div className="mt-4 flex gap-3">
              {[Facebook, Linkedin, MessageCircle, Youtube].map((I, i) => (
                <a key={i} href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 hover:bg-amber-600 hover:text-white transition"><I className="h-4 w-4" /></a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs">
          <span>GST: 09AGZPK8960E1ZL</span>
          <span>© 2025 Ali Bhai Hardware. All rights reserved.</span>
          <span>Made with ❤️ in Aligarh</span>
        </div>
      </div>
    </footer>
  );
}

function EnquiryDrawer({ onSubmit }: { onSubmit: () => void }) {
  const dispatch = useDispatch();
  const { items } = useSelector((s: RootState) => s.enquiry);
  const open = useSelector((s: RootState) => s.ui.isEnquiryDrawerOpen);
  const [form, setForm] = useState({ name: "", company: "", phone: "", email: "", state: "", message: "" });
  if (!open) return null;
  const sendWhatsApp = () => {
    if (!form.name || !form.phone) { alert("Name and phone required"); return; }
    const lines = items.map(i => `• ${i.name} × ${i.qty}`).join("\n");
    const msg = `*Bulk Enquiry — Ali Bhai Hardware*\n\nName: ${form.name}\nCompany: ${form.company}\nPhone: ${form.phone}\nEmail: ${form.email}\nState: ${form.state}\n\n*Products:*\n${lines}\n\nNotes: ${form.message}`;
    window.open(`https://wa.me/917942563317?text=${encodeURIComponent(msg)}`, "_blank");
    onSubmit();
    dispatch(clearEnquiry());
    dispatch(toggleEnquiryDrawer());
  };
  return (
    <div className="fixed inset-0 z-[70]">
      <div className="absolute inset-0 bg-black/50" onClick={() => dispatch(toggleEnquiryDrawer())} />
      <div className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b p-4">
          <div><div className="font-bold text-slate-900">Your Enquiry</div><div className="text-xs text-slate-500">{items.length} product{items.length !== 1 ? "s" : ""}</div></div>
          <button onClick={() => dispatch(toggleEnquiryDrawer())} className="rounded-full p-2 hover:bg-slate-100"><X className="h-4 w-4" /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 && <div className="py-16 text-center text-sm text-slate-500"><ShoppingCart className="mx-auto h-12 w-12 opacity-30" /><div className="mt-3">No products added yet</div></div>}
          {items.map(it => (
            <div key={it.id} className="flex gap-3 rounded-lg border border-slate-200 p-3">
              <img src={it.image} alt="" className="h-16 w-16 rounded object-cover" />
              <div className="flex-1">
                <div className="text-sm font-semibold text-slate-900">{it.name}</div>
                <div className="text-xs text-slate-500">{it.price}</div>
                <div className="mt-2 flex items-center gap-2">
                  <input type="number" min={1} value={it.qty} onChange={e => dispatch(updateQuantity({ id: it.id, qty: Number(e.target.value) }))} className="w-20 rounded border border-slate-300 px-2 py-1 text-xs" />
                  <button onClick={() => dispatch(removeFromEnquiry(it.id))} className="text-red-500"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
            </div>
          ))}
          {items.length > 0 && (
            <div className="mt-4 space-y-2 border-t pt-4">
              {[["name","Name*"],["company","Company"],["phone","Phone*"],["email","Email"],["state","State"]].map(([k,l]) => (
                <input key={k} placeholder={l} value={(form as any)[k]} onChange={e => setForm(p => ({ ...p, [k]: e.target.value }))} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
              ))}
              <textarea placeholder="Message" rows={2} value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            </div>
          )}
        </div>
        {items.length > 0 && (
          <div className="border-t bg-slate-50 p-4 space-y-2">
            <button onClick={sendWhatsApp} className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-500 py-3 font-semibold text-white hover:bg-green-600"><MessageCircle className="h-4 w-4" /> Send via WhatsApp</button>
            <button onClick={() => dispatch(clearEnquiry())} className="w-full rounded-lg border border-slate-300 py-2 text-sm font-medium text-slate-600 hover:bg-white">Clear All</button>
          </div>
        )}
      </div>
    </div>
  );
}

function FloatingButtons() {
  const dispatch = useDispatch();
  const count = useSelector((s: RootState) => s.enquiry.items.length);
  return (
    <>
      <button onClick={() => dispatch(toggleEnquiryDrawer())} className="fixed bottom-6 right-6 z-[60] flex h-14 items-center gap-2 rounded-full bg-amber-600 px-5 text-white shadow-2xl hover:bg-amber-700 transition">
        <ShoppingCart className="h-5 w-5" />
        <span className="font-semibold">Enquiry</span>
        {count > 0 && <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-white px-1.5 text-xs font-bold text-amber-700">{count}</span>}
      </button>
      <a href="https://wa.me/917942563317" target="_blank" rel="noreferrer" className="fixed bottom-24 right-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-2xl hover:bg-green-600 transition">
        <MessageCircle className="h-6 w-6" />
      </a>
    </>
  );
}

/* ---------------- Admin ---------------- */
function AdminGate({ onPass, onClose }: { onPass: () => void; onClose: () => void }) {
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState("");
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6">
        <div className="flex items-center gap-2"><LockIcon className="h-5 w-5 text-amber-600" /><h3 className="text-lg font-bold">Admin Access</h3></div>
        <p className="mt-2 text-sm text-slate-500">Enter password to continue.</p>
        <input type="password" autoFocus value={pwd} onChange={e => setPwd(e.target.value)}
          onKeyDown={e => e.key === "Enter" && (pwd === "alibhai2025" ? onPass() : setErr("Wrong password"))}
          className="mt-4 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
        {err && <p className="mt-2 text-xs text-red-500">{err}</p>}
        <div className="mt-4 flex gap-2">
          <button onClick={onClose} className="flex-1 rounded-lg border border-slate-300 py-2 text-sm font-medium">Cancel</button>
          <button onClick={() => pwd === "alibhai2025" ? onPass() : setErr("Wrong password")} className="flex-1 rounded-lg bg-slate-900 py-2 text-sm font-semibold text-white">Unlock</button>
        </div>
      </div>
    </div>
  );
}

function AdminPanel({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState("dash");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [detail, setDetail] = useState<any>(null);

  const filtered = DUMMY_ENQUIRIES.filter(e =>
    (statusFilter === "All" || e.status === statusFilter) &&
    (search === "" || [e.name, e.state, e.products, e.company].join(" ").toLowerCase().includes(search.toLowerCase()))
  );

  const exportCSV = () => {
    const header = "Name,Company,State,Phone,Products,Qty,Date,Status";
    const rows = filtered.map(e => [e.name, e.company, e.state, e.phone, e.products, e.qty, e.date, e.status].map(v => `"${v}"`).join(","));
    const blob = new Blob([header + "\n" + rows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "enquiries.csv"; a.click();
  };

  const nav = [
    { id: "dash", l: "Dashboard", icon: LayoutDashboard },
    { id: "enq", l: "All Enquiries", icon: ClipboardList },
    { id: "prod", l: "Product Analytics", icon: BarChart3 },
    { id: "net", l: "Supply Network", icon: Network },
  ];

  return (
    <div className="fixed inset-0 z-[150] flex bg-slate-100">
      <aside className="hidden w-64 flex-shrink-0 flex-col bg-slate-900 text-white lg:flex">
        <div className="border-b border-white/10 p-5">
          <div className="flex items-center gap-2"><div className="flex h-9 w-9 items-center justify-center rounded bg-amber-600"><Shield className="h-5 w-5" /></div><div><div className="text-sm font-bold">Admin Panel</div><div className="text-[10px] text-slate-400">Ali Bhai Hardware</div></div></div>
        </div>
        <nav className="flex-1 p-3">
          {nav.map(n => (
            <button key={n.id} onClick={() => setTab(n.id)} className={`mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${tab === n.id ? "bg-amber-600 text-white" : "text-slate-300 hover:bg-white/5"}`}>
              <n.icon className="h-4 w-4" /> {n.l}
            </button>
          ))}
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <header className="flex items-center justify-between border-b bg-white px-6 py-4">
          <div>
            <div className="text-xs text-slate-500">Admin / {nav.find(n => n.id === tab)?.l}</div>
            <h2 className="text-xl font-bold text-slate-900">{nav.find(n => n.id === tab)?.l}</h2>
          </div>
          <button onClick={onClose} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700">Close Admin</button>
        </header>

        {tab === "dash" && (
          <div className="p-6 space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { l: "Total Enquiries", v: "47", c: "bg-slate-900 text-white" },
                { l: "This Month", v: "12", c: "bg-amber-600 text-white" },
                { l: "Pending", v: "8", c: "bg-white text-slate-900" },
                { l: "Converted", v: "31", c: "bg-green-600 text-white" },
              ].map(m => (
                <div key={m.l} className={`rounded-2xl p-5 shadow-sm ${m.c}`}>
                  <div className="text-xs font-medium opacity-80">{m.l}</div>
                  <div className="mt-2 text-3xl font-bold">{m.v}</div>
                </div>
              ))}
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="font-bold">Enquiries — Last 6 Months</h3>
              <div className="mt-5 flex h-48 items-end gap-3">
                {[
                  { m: "Jan", v: 32 }, { m: "Feb", v: 41 }, { m: "Mar", v: 28 },
                  { m: "Apr", v: 55 }, { m: "May", v: 47 }, { m: "Jun", v: 38 },
                ].map(b => (
                  <div key={b.m} className="flex flex-1 flex-col items-center gap-2">
                    <div className="flex w-full flex-1 items-end"><div className="w-full rounded-t bg-amber-500 transition hover:bg-amber-600" style={{ height: `${(b.v / 60) * 100}%` }} /></div>
                    <div className="text-xs font-medium text-slate-600">{b.m}</div>
                    <div className="text-xs font-bold text-slate-900">{b.v}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="font-bold">Top 5 Enquired Products</h3>
              <ol className="mt-4 space-y-2">
                {["Round Padlock","Disc Padlock","Brass Padlock","SS Padlock","Safety Padlock"].map((p, i) => (
                  <li key={p} className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-2.5">
                    <span className="text-sm font-medium"><span className="mr-2 text-amber-600">#{i+1}</span>{p}</span>
                    <span className="text-xs font-bold text-slate-500">{45 - i * 6} enquiries</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}

        {tab === "enq" && (
          <div className="p-6">
            <div className="flex flex-wrap gap-3">
              <div className="relative flex-1 min-w-60">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name, state, product…" className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-sm" />
              </div>
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="rounded-lg border border-slate-300 bg-white px-3 text-sm">
                {["All","New","Contacted","Converted","Pending"].map(s => <option key={s}>{s}</option>)}
              </select>
              <button onClick={exportCSV} className="flex items-center gap-2 rounded-lg bg-amber-600 px-4 text-sm font-semibold text-white hover:bg-amber-700"><Download className="h-4 w-4" /> Export CSV</button>
            </div>
            <div className="mt-5 overflow-x-auto rounded-2xl bg-white shadow-sm">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
                  <tr>{["#","Name","Company","State","Phone","Products","Qty","Date","Status"].map(h => <th key={h} className="px-4 py-3">{h}</th>)}</tr>
                </thead>
                <tbody>
                  {filtered.map(e => (
                    <tr key={e.id} onClick={() => setDetail(e)} className="cursor-pointer border-t hover:bg-slate-50">
                      <td className="px-4 py-3 font-mono text-xs text-slate-400">#{e.id.toString().padStart(3,"0")}</td>
                      <td className="px-4 py-3 font-medium">{e.name}</td>
                      <td className="px-4 py-3 text-slate-600">{e.company}</td>
                      <td className="px-4 py-3 text-slate-600">{e.state}</td>
                      <td className="px-4 py-3 text-slate-600">{e.phone}</td>
                      <td className="px-4 py-3 text-slate-600">{e.products}</td>
                      <td className="px-4 py-3 font-semibold">{e.qty}</td>
                      <td className="px-4 py-3 text-slate-500">{e.date}</td>
                      <td className="px-4 py-3"><span className={`rounded-full px-2 py-1 text-xs font-bold ${e.status==="Converted"?"bg-green-100 text-green-700":e.status==="New"?"bg-blue-100 text-blue-700":e.status==="Contacted"?"bg-amber-100 text-amber-700":"bg-slate-100 text-slate-700"}`}>{e.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {detail && (
              <div className="fixed inset-0 z-[160] flex justify-end bg-black/40" onClick={() => setDetail(null)}>
                <div onClick={e => e.stopPropagation()} className="h-full w-full max-w-md overflow-y-auto bg-white p-6">
                  <div className="flex items-center justify-between"><h3 className="text-lg font-bold">Enquiry #{detail.id.toString().padStart(3,"0")}</h3><button onClick={() => setDetail(null)}><X className="h-5 w-5" /></button></div>
                  <div className="mt-4 space-y-3 text-sm">
                    {Object.entries(detail).map(([k, v]) => <div key={k} className="flex justify-between border-b py-2"><span className="font-medium text-slate-500 capitalize">{k}</span><span className="font-semibold text-slate-900">{String(v)}</span></div>)}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {tab === "prod" && (
          <div className="p-6 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="font-bold">Most Enquired Products</h3>
              <div className="mt-4 space-y-3">
                {[["Round Padlock",92],["Disc Padlock",78],["Brass Padlock",65],["SS Padlock",54],["Safety Padlock",40]].map(([n,v]) => (
                  <div key={n as string}>
                    <div className="flex justify-between text-sm"><span className="font-medium">{n}</span><span className="font-bold text-amber-600">{v}%</span></div>
                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full bg-amber-500" style={{ width: `${v}%` }} /></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="font-bold">Category Breakdown</h3>
              <div className="mt-5 flex items-center gap-6">
                <div className="h-40 w-40 rounded-full" style={{ background: "conic-gradient(#d97706 0% 40%, #0f172a 40% 65%, #10b981 65% 85%, #6366f1 85% 100%)" }} />
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2"><span className="h-3 w-3 rounded bg-amber-600" /> Padlocks 40%</li>
                  <li className="flex items-center gap-2"><span className="h-3 w-3 rounded bg-slate-900" /> Hardware 25%</li>
                  <li className="flex items-center gap-2"><span className="h-3 w-3 rounded bg-green-600" /> Safety 20%</li>
                  <li className="flex items-center gap-2"><span className="h-3 w-3 rounded bg-indigo-500" /> Disc Locks 15%</li>
                </ul>
              </div>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm lg:col-span-2">
              <h3 className="font-bold">State-wise Demand (Top 8)</h3>
              <div className="mt-4 space-y-3">
                {[["Maharashtra",88],["Gujarat",82],["Delhi",76],["Tamil Nadu",65],["Karnataka",60],["UP",55],["Telangana",48],["Punjab",42]].map(([n,v]) => (
                  <div key={n as string} className="flex items-center gap-3">
                    <span className="w-28 text-sm font-medium">{n}</span>
                    <div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-100"><div className="h-full bg-slate-900" style={{ width: `${v}%` }} /></div>
                    <span className="w-10 text-right text-xs font-bold">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "net" && (
          <div className="p-6 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl bg-amber-600 p-6 text-white shadow-sm">
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider"><Truck className="h-5 w-5" /> Gujarat Hub</div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div><div className="text-3xl font-bold">428</div><div className="text-xs">Dispatches this month</div></div>
                <div><div className="text-3xl font-bold">18 hrs</div><div className="text-xs">Avg dispatch time</div></div>
              </div>
            </div>
            <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-sm">
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider"><Factory className="h-5 w-5 text-amber-500" /> Aligarh Unit</div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div><div className="text-3xl font-bold">65K</div><div className="text-xs">Monthly capacity</div></div>
                <div><div className="text-3xl font-bold">52,840</div><div className="text-xs">Units this month</div></div>
              </div>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm lg:col-span-2">
              <h3 className="font-bold">Delivery Performance by Region</h3>
              <div className="mt-4 space-y-3">
                {[["North India",94],["West India",97],["South India",91],["East India",85],["Northeast",78]].map(([n,v]) => (
                  <div key={n as string} className="flex items-center gap-3">
                    <span className="w-32 text-sm font-medium">{n}</span>
                    <div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-100"><div className="h-full bg-green-500" style={{ width: `${v}%` }} /></div>
                    <span className="w-12 text-right text-xs font-bold">{v}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
