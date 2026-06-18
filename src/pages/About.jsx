import { useEffect } from "react";
import { MapPin, Factory, Award, Users } from "lucide-react";

const OFFICE_IMAGES = [
  { src: "https://source.unsplash.com/800x600/?factory,manufacturing", caption: "Aligarh Manufacturing Unit" },
  { src: "https://source.unsplash.com/800x600/?warehouse,industrial", caption: "Gujarat Distribution Hub" },
  { src: "https://source.unsplash.com/800x600/?quality,inspection", caption: "Quality Control Lab" },
  { src: "https://source.unsplash.com/800x600/?team,workers", caption: "Our Skilled Team" },
];

const MILESTONES = [
  { y: "1995", t: "Founded in Aligarh", d: "Started as a small workshop in Jamalpur, Aligarh." },
  { y: "2004", t: "BIS Certification", d: "Padlock range certified by Bureau of Indian Standards." },
  { y: "2012", t: "Gujarat Hub Opened", d: "Surat distribution hub enabling 24-hr pan-India dispatch." },
  { y: "2024", t: "30 Years Strong", d: "Serving 2000+ distributors across India." },
];

export default function About() {
  useEffect(() => {
    document.title = "About Us — Ali Bhai Hardware";
  }, []);

  return (
    <>
      <section className="bg-slate-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-300">
            About Ali Bhai Hardware
          </span>
          <h1 className="mt-4 font-display text-4xl font-extrabold md:text-5xl">
            Three decades of craftsmanship,<br />from Aligarh to all of India.
          </h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            Co-founded by Ali Bhai in 1995, our Aligarh facility produces lakhs of locks every month —
            supplied across India through our Gujarat distribution hub.
          </p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Inside Our Facility</span>
            <h2 className="mt-2 font-display text-3xl font-bold">A Look at Our Operations</h2>
            <p className="mt-2 text-slate-600">Real photos from our Aligarh factory and Gujarat hub.</p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {OFFICE_IMAGES.map((o) => (
              <figure key={o.caption} className="overflow-hidden rounded-2xl bg-slate-100 shadow-sm">
                <img src={o.src} alt={o.caption} className="aspect-[4/3] w-full object-cover" />
                <figcaption className="px-4 py-3 text-sm font-semibold text-slate-700">{o.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Our Journey</span>
              <h2 className="mt-2 font-display text-3xl font-bold">Milestones since 1995</h2>
              <ul className="mt-6 space-y-5">
                {MILESTONES.map((m) => (
                  <li key={m.y} className="flex gap-4">
                    <div className="flex h-12 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-amber-600 font-bold text-white">
                      {m.y}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{m.t}</div>
                      <p className="text-sm text-slate-600">{m.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4 self-start">
              {[
                { Icon: Factory, n: "30+", l: "Years Manufacturing" },
                { Icon: Users, n: "2000+", l: "Distributors Pan-India" },
                { Icon: Award, n: "BIS", l: "Certified Products" },
                { Icon: MapPin, n: "All 28 States", l: "Supply Reach" },
              ].map(({ Icon, n, l }) => (
                <div key={l} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                  <Icon className="h-7 w-7 text-amber-600" />
                  <div className="mt-3 font-display text-3xl font-extrabold text-slate-900">{n}</div>
                  <div className="text-sm text-slate-600">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Find Us</span>
            <h2 className="mt-2 font-display text-3xl font-bold">Manufacturing Unit — Jamalpur, Aligarh</h2>
            <p className="mt-2 text-slate-600">Visit our factory in the heart of India's lock-making city.</p>
          </div>
          <div className="mt-8 overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-200">
            <iframe
              title="Ali Bhai Hardware — Jamalpur, Aligarh"
              src="https://www.google.com/maps?q=Jamalpur,+Aligarh,+Uttar+Pradesh&output=embed"
              width="100%"
              height="450"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0 }}
            />
          </div>

          <div className="mt-12 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Distribution Hub</span>
            <h2 className="mt-2 font-display text-3xl font-bold">Gujarat Office — Porbandar</h2>
            <p className="mt-2 text-slate-600">Our pan-India dispatch hub on the coast of Gujarat.</p>
          </div>
          <div className="mt-8 overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-200">
            <iframe
              title="Ali Bhai Hardware — Porbandar, Gujarat"
              src="https://www.google.com/maps?q=Porbandar,+Gujarat&output=embed"
              width="100%"
              height="450"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0 }}
            />
          </div>
        </div>
      </section>

      {/* Owner section */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 md:grid-cols-2 lg:px-8">
          <img
            src="https://source.unsplash.com/600x700/?indian,businessman,portrait"
            alt="Ali Bhai — Founder"
            className="mx-auto h-[420px] w-full max-w-md rounded-2xl object-cover shadow-xl ring-1 ring-slate-200"
          />
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Meet the Founder</span>
            <h2 className="mt-2 font-display text-3xl font-bold">Ali Bhai</h2>
            <p className="mt-1 text-sm font-semibold text-slate-500">Founder & Master Craftsman • Since 1995</p>
            <p className="mt-4 text-slate-700">
              "When we started in Jamalpur thirty years ago, the goal was simple — make locks that families and businesses
              can trust for decades. Today, with our Porbandar hub, we proudly serve every state in India while staying
              true to the craftsmanship that built our name."
            </p>
            <p className="mt-3 text-slate-700">
              Every product carries the same quality promise — built in Aligarh, delivered with care.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
