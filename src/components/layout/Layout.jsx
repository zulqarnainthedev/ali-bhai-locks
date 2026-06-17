import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import EnquiryDrawer from "../common/EnquiryDrawer.jsx";
import WhatsAppButton from "../common/WhatsAppButton.jsx";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <EnquiryDrawer />
      <WhatsAppButton />
    </div>
  );
}
