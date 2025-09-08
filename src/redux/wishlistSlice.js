import { createSlice } from "@reduxjs/toolkit";

const initialState = { wishlistCount: 0 };

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state) => { state.wishlistCount += 1; },
    removeFromWishlist: (state) => { state.wishlistCount = Math.max(state.wishlistCount - 1, 0); },
    clearWishlist: (state) => { state.wishlistCount = 0; },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
