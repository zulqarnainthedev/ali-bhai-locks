import { useDispatch, useSelector } from "react-redux";
import { X, Trash2 } from "lucide-react";
import { removeFromEnquiry, updateQuantity, clearEnquiry, setDrawer } from "../../store/store.js";
import { useToast } from "../../context/ToastContext.jsx";

export default function EnquiryDrawer() {
  const dispatch = useDispatch();
  const { items, drawerOpen } = useSelector((s) => s.enquiry);
  const { showToast } = useToast();

  const close = () => dispatch(setDrawer(false));
  const submit = () => {
    showToast("Enquiry sent! We'll contact you within 24 hours.");
    dispatch(clearEnquiry());
    close();
  };

  if (!drawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={close} />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h3 className="text-lg font-bold">Your Enquiry ({items.length})</h3>
          <button onClick={close}><X className="h-5 w-5" /></button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <p className="text-center text-sm text-slate-500 mt-10">No items yet. Add products to enquire in bulk.</p>
          ) : (
            <ul className="space-y-3">
              {items.map((it) => (
                <li key={it.id} className="flex gap-3 rounded-lg border border-slate-200 p-3">
                  <img src={it.image} alt={it.name} className="h-16 w-16 rounded object-cover" />
                  <div className="flex-1">
                    <div className="text-sm font-semibold">{it.name}</div>
                    <div className="text-xs text-slate-500">₹{it.startingPrice}+</div>
                    <div className="mt-2 flex items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        value={it.qty}
                        onChange={(e) => dispatch(updateQuantity({ id: it.id, qty: +e.target.value }))}
                        className="w-20 rounded border border-slate-300 px-2 py-1 text-xs"
                      />
                      <span className="text-xs text-slate-500">qty</span>
                    </div>
                  </div>
                  <button onClick={() => dispatch(removeFromEnquiry(it.id))} className="text-slate-400 hover:text-red-500">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-slate-200 p-5">
            <button
              onClick={submit}
              className="w-full rounded-lg bg-amber-600 py-3 text-sm font-bold text-white hover:bg-amber-700"
            >
              Submit Bulk Enquiry
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
