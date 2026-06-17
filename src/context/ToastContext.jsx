import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";

const ToastContext = createContext({ showToast: () => {} });
export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }) {
  const [msg, setMsg] = useState("");

  const showToast = useCallback((m) => setMsg(m), []);

  useEffect(() => {
    if (!msg) return;
    const t = setTimeout(() => setMsg(""), 3000);
    return () => clearTimeout(t);
  }, [msg]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {msg && (
        <div className="fixed top-24 right-6 z-[100] flex items-center gap-3 rounded-lg bg-amber-600 px-5 py-3 text-white shadow-2xl">
          <CheckCircle2 className="h-5 w-5" />
          <span className="font-medium">{msg}</span>
        </div>
      )}
    </ToastContext.Provider>
  );
}
