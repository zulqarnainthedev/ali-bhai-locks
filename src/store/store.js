import { configureStore, createSlice } from "@reduxjs/toolkit";

const enquirySlice = createSlice({
  name: "enquiry",
  initialState: { items: [], drawerOpen: false },
  reducers: {
    addToEnquiry: (s, a) => {
      const ex = s.items.find((i) => i.id === a.payload.id);
      if (ex) ex.qty += 1;
      else s.items.push({ ...a.payload, qty: 100 });
    },
    removeFromEnquiry: (s, a) => {
      s.items = s.items.filter((i) => i.id !== a.payload);
    },
    updateQuantity: (s, a) => {
      const it = s.items.find((i) => i.id === a.payload.id);
      if (it) it.qty = Math.max(1, a.payload.qty);
    },
    clearEnquiry: (s) => {
      s.items = [];
    },
    toggleDrawer: (s) => {
      s.drawerOpen = !s.drawerOpen;
    },
    setDrawer: (s, a) => {
      s.drawerOpen = a.payload;
    },
  },
});

export const {
  addToEnquiry,
  removeFromEnquiry,
  updateQuantity,
  clearEnquiry,
  toggleDrawer,
  setDrawer,
} = enquirySlice.actions;

export const store = configureStore({
  reducer: { enquiry: enquirySlice.reducer },
});
