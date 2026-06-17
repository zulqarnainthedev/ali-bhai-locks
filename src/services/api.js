import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "",
  headers: { "Content-Type": "application/json" },
});

// Example methods — swap with your real backend later.
export const getProducts = () => api.get("/products").then((r) => r.data);
export const getProduct = (id) => api.get(`/products/${id}`).then((r) => r.data);
export const submitEnquiry = (payload) => api.post("/enquiries", payload).then((r) => r.data);

export default api;
