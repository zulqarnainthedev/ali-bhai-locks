import { PhoneCall } from "lucide-react";
import whatsapp from "../../assets/whatsapp.png";

export default function ContactButtons({
  phone = "917505279565",
  message = "Hi Ali Bhai Hardware, I'd like a bulk enquiry.",
}) {
  const whatsappHref = `https://wa.me/${phone}?text=${encodeURIComponent(
    message
  )}`;

  const callHref = `tel:+${phone}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      {/* Call Button */}
      <a
        href={callHref}
        aria-label="Call"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-2xl transition-transform hover:scale-105"
      >
        <PhoneCall size={36} />
      </a>

      {/* WhatsApp Button */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="transition-transform hover:scale-105"
      >
        <img
          className="h-16 w-16"
          src={whatsapp}
          alt="WhatsApp"
        />
      </a>
    </div>
  );
}