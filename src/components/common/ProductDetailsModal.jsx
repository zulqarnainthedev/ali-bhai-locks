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

  const images = product.gallery ?? [];
  const specs = product.specifications ?? {};
  const hasDiscount = product.newPrice != null && product.newPrice < product.price;
  const displayPrice = hasDiscount ? product.newPrice : product.price;

  const handleAdd = (variant) => {
    dispatch(
      addToEnquiry({
        id: variant.id,
        name: `${product.name} – ${variant.size}`,
        image: product.image,
        price: variant.price,
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
            <p className="text-xs text-slate-500">
              {product.category?.name} {specs["Material"] && `• ${specs["Material"]}`}
            </p>
          </div>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-slate-100" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-5 py-5">
          {/* Overview */}
          <div className="grid gap-6 sm:grid-cols-[280px_1fr]">
            <div className="space-y-2">
              <div
                className="overflow-hidden rounded-xl bg-slate-100 cursor-zoom-in"
                onClick={() =>
                  setLightbox({
                    images: images.length ? images : [product.image],
                    startIndex: 0,
                  })
                }
              >
                <img
                  src={product.image || "/placeholder-product.png"}
                  alt={product.name}
                  className="aspect-[3/4] w-full object-cover"
                />
              </div>

              {images.length > 0 && (
                <div className="grid grid-cols-4 gap-1">
                  {images.map((img, i) => (
                    <img
                      key={img}
                      src={img}
                      alt={`${product.name} view ${i + 1}`}
                      className="aspect-square w-full cursor-zoom-in rounded object-cover"
                      onClick={() => setLightbox({ images, startIndex: i })}
                    />
                  ))}
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-amber-700">
                Approx.{" "}
                <span className="inline-flex items-center">
                  <IndianRupee className="h-4 w-4" />
                  {displayPrice}
                </span>{" "}
                / Piece onwards
                {hasDiscount && (
                  <span className="text-xs text-slate-400 line-through">₹{product.price}</span>
                )}
              </div>

              <p className="mt-3 text-sm leading-relaxed text-slate-700">{product.description}</p>

              <dl className="mt-4 grid grid-cols-2 gap-y-2 text-xs">
                {specs["Material"] && (
                  <>
                    <dt className="font-semibold text-slate-500">Material</dt>
                    <dd className="text-slate-800">{specs["Material"]}</dd>
                  </>
                )}
                {product.category?.name && (
                  <>
                    <dt className="font-semibold text-slate-500">Category</dt>
                    <dd className="text-slate-800">{product.category.name}</dd>
                  </>
                )}
                <dt className="font-semibold text-slate-500">MOQ</dt>
                <dd className="text-slate-800">{product.moq}</dd>
                {specs["Keys Included"] && (
                  <>
                    <dt className="font-semibold text-slate-500">Keys</dt>
                    <dd className="text-slate-800">{specs["Keys Included"]}</dd>
                  </>
                )}
                <dt className="font-semibold text-slate-500">Variants</dt>
                <dd className="text-slate-800">{product.variants?.length ?? 0} sizes</dd>
              </dl>
            </div>
          </div>

          {/* Variants */}
          <div className="mt-8">
            <h3 className="font-display text-xl font-bold text-slate-900">Available Sizes</h3>
            <p className="text-sm text-slate-500">Choose a size to add it to your enquiry.</p>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {product.variants?.map((v) => (
                <div
                  key={v.id}
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div>
                    <p className="text-sm font-bold text-slate-900">{v.size}</p>
                    <div className="mt-1 inline-flex items-center text-lg font-bold text-amber-700">
                      <IndianRupee className="h-4 w-4" />
                      {v.discountPrice ?? v.price}
                    </div>
                    <p className="text-xs text-slate-500">/ Piece</p>
                    {v.stockStatus === "OUT_OF_STOCK" && (
                      <p className="text-xs font-semibold text-rose-600">Out of stock</p>
                    )}
                  </div>

                  <button
                    onClick={() => handleAdd(v)}
                    disabled={v.stockStatus === "OUT_OF_STOCK"}
                    className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-sm font-bold text-white hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Plus className="h-4 w-4" /> Add
                  </button>
                </div>
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