import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <div className="font-display text-7xl font-extrabold text-amber-600">404</div>
        <h1 className="mt-3 text-2xl font-bold text-slate-900">Page not found</h1>
        <p className="mt-2 text-slate-600">The page you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-lg bg-slate-900 px-6 py-3 text-sm font-bold text-white hover:bg-slate-800"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
