import whatsapp from "../../assets/whatsapp.png";

export default function WhatsAppButton({
  phone = "917505279565", // Country code (91 for India) included, no '+' or leading zero
  message = "Hi Ali Bhai Hardware, I'd like a bulk enquiry.",
}) {
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
   <div className="animate-bounc">
     <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="animate-bounce fixed bottom-6 right-6 z-40 flex  items-center justify-center rounded-full bg-white shadow-2xl transition-transform hover:scale-105"
    >
      <img className="size-16 " src={whatsapp} alt="WhatsApp chat icon" />
    </a>
   </div>
  );
}