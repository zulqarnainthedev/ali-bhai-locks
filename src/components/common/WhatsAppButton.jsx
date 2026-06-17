import { MessageCircle } from "lucide-react";

export default function WhatsAppButton({ phone = "919999999999" }) {
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(
    "Hi Ali Bhai Hardware, I'd like a bulk enquiry."
  )}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-2xl hover:bg-green-600"
      aria-label="WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
