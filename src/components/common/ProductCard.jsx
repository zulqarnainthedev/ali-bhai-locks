import { useDispatch } from "react-redux";
import { addToEnquiry } from "../../store/store.js";
import { useToast } from "../../context/ToastContext.jsx";
import { Phone, ImageOff } from "lucide-react";

const FALLBACK_IMAGE = "/placeholder-product.png"; // apne project ke hisaab se path adjust kar lijiye

export default function ProductCard({ product, onOpen }) {
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const hasDiscount = product.newPrice != null && product.newPrice < product.price;
  const displayImage = product.image?.trim() ? product.image : null;

  const handleAdd = (e) => {
    e.stopPropagation();
    dispatch(
      addToEnquiry({
        id: product.id,
        name: product.name,
        image: displayImage,
        price: hasDiscount ? product.newPrice : product.price,
      })
    );
    showToast(`${product.name} added to enquiry`);
  };

  return (
    <div
      onClick={() => onOpen(product)}
      className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:shadow-xl"
    >
      <div className="relative aspect-[1] overflow-hidden bg-slate-100">
        {displayImage ? (
          <img
            src={displayImage}
            alt={product.name}
            className="h-full w-full object-cover transition group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-300">
            <ImageOff className="h-10 w-10" />
          </div>
        )}

        {product.category?.name && (
          <span className="absolute left-3 top-3 rounded-full bg-slate-900/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-400">
            {product.category.name}
          </span>
        )}

        {hasDiscount && (
          <span className="absolute right-3 top-3 rounded-full bg-emerald-600 px-2 py-1 text-[10px] font-bold text-white">
            Sale
          </span>
        )}
      </div>

      <div className="p-2">
        <h3 className="font-semibold text-slate-900">{product.name}</h3>
        <p className="line-clamp-2 text-xs text-slate-600">{product.shortDescription}</p>

        <div className="mt-1 flex items-center justify-end">
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-1 rounded-lg bg-amber-600 px-2 py-2 text-xs font-bold text-white hover:bg-amber-700"
          >
            <Phone className="h-3.5 w-3.5" /> Get best price
          </button>
        </div>
      </div>
    </div>
  );
}