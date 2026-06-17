import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Products from "../pages/Products.jsx";
import CategoryPage from "../pages/CategoryPage.jsx";
import About from "../pages/About.jsx";
import NotFound from "../pages/NotFound.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:categorySlug" element={<CategoryPage />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
