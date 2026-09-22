import { useEffect } from "react";
import { MapPin, Factory, Award, Users, TrendingUp, Quote } from "lucide-react";
import owner from "../assets/founder.jpeg";

const STATS = [
  { Icon: Factory, n: "20+", l: "Years in Manufacturing" },
  { Icon: Users, n: "1400+", l: "Distributors Pan-India" },
  { Icon: TrendingUp, n: "Since 2005", l: "Trusted & Growing" },
  { Icon: MapPin, n: "All 28 States", l: "Supply Reach" },
];

const MILESTONES = [
  { y: "2005", t: "Founded in Aligarh", d: "Started as a small workshop in Jamalpur, Aligarh." },
  { y: "2008", t: "BIS Certification", d: "Padlock range certified by Bureau of Indian Standards." },
  { y: "2012", t: "Gujarat Hub Opened", d: "Surat distribution hub enabling 24-hr pan-India dispatch." },
  { y: "2024", t: "21 Years Strong", d: "Serving 1400+ distributors and retailers across India." },
];

export default function About() {
  useEffect(() => {
    document.title = "About Us — Ali Bhai Hardware";
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-900 py-14 sm:py-20 text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-300">
            About Ali Bhai Hardware
          </span>
          <h1 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight max-w-3xl">
            Two decades of craftsmanship, from Aligarh to all of India.
          </h1>
          <p className="mt-4 max-w-2xl text-slate-300 text-base sm:text-lg leading-relaxed">
            Founded by Ali Bhai in 2005, our Aligarh facility produces lakhs of locks every
            month — supplied across India through our Gujarat distribution hub.
          </p>

          {/* Quick stat strip inside hero */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl">
            {STATS.map(({ Icon, n, l }) => (
              <div key={l} className="rounded-xl bg-white/5 ring-1 ring-white/10 backdrop-blur px-3 py-4 sm:px-4">
                <Icon className="h-5 w-5 text-amber-400 mb-2" />
                <p className="text-lg sm:text-xl font-extrabold text-white leading-none">{n}</p>
                <p className="mt-1 text-[11px] sm:text-xs text-slate-400">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Owner section */}
      <section className="bg-slate-50 py-14 sm:py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-8 sm:gap-10 px-4 md:grid-cols-2 lg:px-8">
          <div className="relative mx-auto w-full max-w-md order-1 md:order-none">
            <div className="absolute -inset-3 rounded-2xl bg-amber-500/10 blur-2xl pointer-events-none" />
            <img
              src={owner}
              alt="Ali Bhai — Founder"
              className="relative w-full aspect-[4/5] rounded-2xl object-cover shadow-xl ring-1 ring-slate-200"
            />
          </div>
          <div className="text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Meet the Founder</span>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-slate-900">Ali Bhai</h2>
            <p className="mt-1 text-sm font-semibold text-slate-500">Founder & Master Craftsman • Since 2005</p>

            <div className="relative mt-5">
              <Quote className="absolute -left-1 -top-2 h-6 w-6 text-amber-300 hidden md:block" />
              <p className="text-slate-700 leading-relaxed md:pl-8">
                "When we started in Jamalpur two decades ago, the goal was simple — make locks
                that families and businesses can trust for years. Today, with our Porbandar hub,
                we proudly serve every state in India while staying true to the craftsmanship
                that built our name."
              </p>
            </div>
            <p className="mt-3 text-slate-700 leading-relaxed md:pl-8">
              Every product carries the same quality promise — built in Aligarh, delivered with care.
            </p>
          </div>
        </div>
      </section>

      {/* Journey / Timeline */}
      <section className="bg-slate-50 py-16 sm:py-20 border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-10 sm:mb-12 text-center">
            <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-700">
              Our Journey
            </span>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl font-bold text-slate-900 md:text-4xl">
              Two Decades of Manufacturing Excellence
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500">
              Since 2005, we have been committed to quality, reliability, and building
              lasting partnerships across India.
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-2">
            {/* Timeline */}
            <ul className="space-y-8 border-l-2 border-amber-200 pl-6">
              {MILESTONES.map((m) => (
                <li key={m.y} className="relative">
                  <span className="absolute -left-[31px] top-1 h-4 w-4 rounded-full border-2 border-amber-500 bg-white" />
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                    <div className="flex h-9 sm:h-11 w-fit sm:w-16 shrink-0 items-center justify-center rounded-lg bg-amber-600 px-3 sm:px-0 text-sm font-bold text-white shadow-sm">
                      {m.y}
                    </div>
                    <div className="sm:pt-1">
                      <div className="font-semibold text-slate-900">{m.t}</div>
                      <p className="mt-0.5 text-sm leading-relaxed text-slate-600">{m.d}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 self-start">
              {STATS.map(({ Icon, n, l }) => (
                <div
                  key={l}
                  className="group rounded-2xl bg-white p-4 sm:p-6 shadow-sm ring-1 ring-slate-200 transition-shadow duration-200 hover:shadow-md hover:ring-amber-300"
                >
                  <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-amber-50 group-hover:bg-amber-100 transition-colors duration-200">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />
                  </div>
                  <div className="mt-3 sm:mt-4 font-display text-xl sm:text-2xl font-extrabold text-slate-900 lg:text-3xl">
                    {n}
                  </div>
                  <div className="mt-1 text-xs sm:text-sm text-slate-500">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-slate-900 py-14 sm:py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
          <Award className="mx-auto h-9 w-9 text-amber-400" />
          <h2 className="mt-4 font-display text-2xl sm:text-3xl font-bold">
            Ready to partner with a trusted manufacturer?
          </h2>
          <p className="mt-3 text-slate-300 max-w-xl mx-auto">
            Join 1400+ distributors and retailers already sourcing from Ali Bhai Hardware.
          </p>
          
           <a href="/contact"
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-amber-500 px-6 py-3 text-sm font-bold text-slate-900 hover:bg-amber-400 transition"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </>
  );
}