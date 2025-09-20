import { createSlice } from "@reduxjs/toolkit";

// LocalStorage se cart items load karo agar available ho
const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = {
  cartItems: cartItemsFromStorage,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        // Agar already cart me ho, quantity increase
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? { ...x, qty: x.qty + 1 } : x
        );
      } else {
        state.cartItems.push({ ...item, qty: 1 });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    updateQty: (state, action) => {
      const { _id, qty } = action.payload;
      state.cartItems = state.cartItems.map((x) =>
        x._id === _id ? { ...x, qty } : x
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export const { addToCart, removeFromCart, updateQty } = cartSlice.actions;
export default cartSlice.reducer;
