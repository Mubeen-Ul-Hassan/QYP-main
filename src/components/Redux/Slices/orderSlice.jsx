// Slices/orderSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {}, // Example object state
};

const orderSlice = createSlice({
  name: "orderData",
  initialState,
  reducers: {
    setOrderData: (state, action) => {
      state.data = action.payload;
    },
    clearOrderData: (state) => {
      state.data = {};
    },
  },
});

export const { setOrderData, clearOrderData } = orderSlice.actions;
export const selectOrderData = (state) => state.orderData.data;
export default orderSlice.reducer;
