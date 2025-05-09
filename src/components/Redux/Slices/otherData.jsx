// Slices/authSlice.js
"use client";
import { createSlice } from "@reduxjs/toolkit";

const otherData = createSlice({
  name: "authother",
  initialState: {
    user: null,
  },
  reducers: {
    setOtherData: (state, action) => {
      state.user = action.payload;
    },
    resetOtherData: (state) => {
      state.user = null;
    },
  },
});

// Export actions
export const { setOtherData, resetOtherData } = otherData.actions;

// Selector to get user data
export const SelectOtherData = (state) => state.authother.user;

// Export reducer
export default otherData.reducer;
