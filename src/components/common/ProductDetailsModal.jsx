import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { X, IndianRupee, Plus } from "lucide-react";
import Lightbox from "./Lightbox.jsx";
import { addToEnquiry } from "../../store/store.js";
import { useToast } from "../../context/ToastContext.jsx";

export default function ProductDetailsModal({ product, onClose }) {
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const [lightbox, setLightbox] = useState(null); // { images, startIndex }

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (!product) return null;

  const handleAdd = (variant) => {
    dispatch(
      addToEnquiry({
        id: `${product.id}-${variant.size}`,
        name: `${product.name} – ${variant.size}`,
        image: variant.image,
        startingPrice: variant.price,
      })
    );
    showToast(`${product.name} ${variant.size} added to enquiry`);
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-start justify-center overflow-y-auto bg-black/70 p-0 sm:p-6">
      <div className="relative w-full max-w-5xl bg-white shadow-2xl sm:rounded-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-3 sm:rounded-t-2xl">
          <div>
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl">{product.name}</h2>
            <p className="text-xs text-slate-500">{product.qualityGrade} • {product.material}</p>
          </div>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-slate-100" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-5 py-5">
          {/* Overview */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div
              className="overflow-hidden rounded-xl bg-slate-100 cursor-zoom-in"
              onClick={() => setLightbox({ images: product.variants.flatMap((v) => v.gallery), startIndex: 0 })}
            >
              <img src={product.image} alt={product.name} className="aspect-[4/3] w-full object-cover" />
            </div>
            <div>
              <div className="text-sm font-semibold text-amber-700">
                Approx. <span className="inline-flex items-center"><IndianRupee className="h-4 w-4" />{product.startingPrice}</span> / Piece onwards
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">{product.description}</p>
              <dl className="mt-4 grid grid-cols-2 gap-y-2 text-xs">
                <dt className="font-semibold text-slate-500">Material</dt>
                <dd className="text-slate-800">{product.material}</dd>
                <dt className="font-semibold text-slate-500">Quality Grade</dt>
                <dd className="text-slate-800">{product.qualityGrade}</dd>
                <dt className="font-semibold text-slate-500">Variants</dt>
                <dd className="text-slate-800">{product.variants.length} sizes</dd>
              </dl>
            </div>
          </div>

          {/* Variants */}
          <div className="mt-8">
            <h3 className="font-display text-xl font-bold text-slate-900">Available Sizes & Variants</h3>
            <p className="text-sm text-slate-500">Scroll to view all variant specifications.</p>

            <div className="mt-4 space-y-6">
              {product.variants.map((v, idx) => (
                <article
                  key={idx}
                  className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
                >
                  <div className="grid gap-4 sm:grid-cols-[280px_1fr]">
                    <div
                      className="cursor-zoom-in bg-slate-100"
                      onClick={() => setLightbox({ images: v.gallery, startIndex: 0 })}
                    >
                      <img src={v.image} alt={`${product.name} ${v.size}`} className="aspect-[4/3] w-full object-cover" />
                      <div className="grid grid-cols-3 gap-1 p-1">
                        {v.gallery.slice(0, 3).map((g, gi) => (
                          <img
                            key={gi}
                            src={g}
                            alt=""
                            className="aspect-square w-full cursor-zoom-in object-cover"
                            onClick={(e) => {
                              e.stopPropagation();
                              setLightbox({ images: v.gallery, startIndex: gi });
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="p-4 sm:py-4 sm:pr-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="text-lg font-bold text-slate-900">{product.name} — {v.size}</h4>
                          <p className="mt-1 text-xs text-slate-500">MOQ: {v.moq}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-slate-500">Approx.</div>
                          <div className="inline-flex items-center text-2xl font-bold text-amber-700">
                            <IndianRupee className="h-5 w-5" />{v.price}
                          </div>
                          <div className="text-xs text-slate-500">/ Piece</div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500">Product Specifications</h5>
                        <dl className="mt-2 grid grid-cols-1 gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
                          {Object.entries(v.specs).map(([k, val]) => (
                            <div key={k} className="flex justify-between border-b border-dashed border-slate-200 py-1">
                              <dt className="text-slate-500">{k}</dt>
                              <dd className="font-medium text-slate-800">{val}</dd>
                            </div>
                          ))}
                        </dl>
                      </div>

                      <button
                        onClick={() => handleAdd(v)}
                        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-sm font-bold text-white hover:bg-amber-700"
                      >
                        <Plus className="h-4 w-4" /> Add this variant to enquiry
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      {lightbox && (
        <Lightbox
          images={lightbox.images}
          startIndex={lightbox.startIndex}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  );
}
