// Slices/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cartData",
  initialState: {
    cart: [],
  },
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    addToCart: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item?.product === action.payload?.product
      );
      if (!existingItem) {
        state.cart.push(action.payload);
      }
    },
    
   removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (item) => item?.product !== action.payload
      );
    },

    
    clearCart: (state) => {
      state.cart = [];
    },
    
    updateProductQuantity: (state, action) => {
      const { productId, availableStock } = action.payload;
      const item = state.cart.find((item) => item.product === productId);

      if (item) {
        // Update actualQuantity with availableStock
        item.actualQuantity = availableStock;

        // If quantity exceeds availableStock, set it to availableStock
        if (item.quantity > availableStock) {
          item.quantity = availableStock;
        }
      }
    },
    
    incrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.product === action.payload);
      if (item && item.quantity < item.actualQuantity) {
        item.quantity += 1;
        item.totalPrice = item.quantity * item.price; // Update totalPrice
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.product === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        item.totalPrice = item.quantity * item.price; // Update totalPrice
      }
    },
  },
});

export const {
  setCart,
  addToCart,
  removeFromCart,
  clearCart,
  updateProductQuantity,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export const selectCart = (state) => state.cart.cart;

export default cartSlice.reducer;
