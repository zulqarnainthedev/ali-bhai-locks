import { useEffect, useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";

export default function Lightbox({ images, startIndex = 0, onClose }) {
  const [i, setI] = useState(startIndex);
  const [zoom, setZoom] = useState(1);

  const next = useCallback(() => {
    setI((v) => (v + 1) % images.length);
    setZoom(1);
  }, [images.length]);
  const prev = useCallback(() => {
    setI((v) => (v - 1 + images.length) % images.length);
    setZoom(1);
  }, [images.length]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [next, prev, onClose]);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95">
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
        aria-label="Close"
      >
        <X className="h-6 w-6" />
      </button>

      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <button
          onClick={() => setZoom((z) => Math.min(z + 0.25, 3))}
          className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
          aria-label="Zoom in"
        >
          <ZoomIn className="h-5 w-5" />
        </button>
        <button
          onClick={() => setZoom((z) => Math.max(z - 0.25, 1))}
          className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
          aria-label="Zoom out"
        >
          <ZoomOut className="h-5 w-5" />
        </button>
        <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-white">
          {i + 1} / {images.length}
        </span>
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
            aria-label="Previous"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
            aria-label="Next"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      <div className="max-h-screen max-w-[90vw] overflow-auto p-8">
        <img
          src={images[i]}
          alt=""
          className="mx-auto select-none transition-transform"
          style={{ transform: `scale(${zoom})`, maxHeight: "85vh" }}
          onClick={() => setZoom((z) => (z === 1 ? 2 : 1))}
        />
      </div>
    </div>
  );
}
