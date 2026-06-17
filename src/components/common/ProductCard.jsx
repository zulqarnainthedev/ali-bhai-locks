import { useDispatch } from "react-redux";
import { addToEnquiry } from "../../store/store.js";
import { useToast } from "../../context/ToastContext.jsx";
import { IndianRupee } from "lucide-react";

export default function ProductCard({ product, onOpen }) {
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const handleAdd = (e) => {
    e.stopPropagation();
    dispatch(
      addToEnquiry({
        id: product.id,
        name: product.name,
        image: product.image,
        startingPrice: product.startingPrice,
      })
    );
    showToast(`${product.name} added to enquiry`);
  };

  return (
    <div
      onClick={() => onOpen(product)}
      className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-slate-900/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-400">
          {product.qualityGrade}
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-slate-900">{product.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-slate-600">{product.shortDescription}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center text-amber-600">
            <span className="text-xs text-slate-500 mr-1">Starting</span>
            <IndianRupee className="h-4 w-4" />
            <span className="text-lg font-bold">{product.startingPrice}</span>
          </div>
          <button
            onClick={handleAdd}
            className="rounded-lg bg-amber-600 px-3 py-2 text-xs font-bold text-white hover:bg-amber-700"
          >
            + Enquiry
          </button>
        </div>
      </div>
    </div>
  );
}
