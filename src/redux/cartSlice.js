import { createSlice } from "@reduxjs/toolkit";

const initialState = { cartCount: 0 };

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state) => { state.cartCount += 1; },
    removeFromCart: (state) => { state.cartCount = Math.max(state.cartCount - 1, 0); },
    clearCart: (state) => { state.cartCount = 0; },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
