// Slices/authSlice.js
"use client";
import { createSlice } from "@reduxjs/toolkit";

const signUpData = createSlice({
  name: "signUp",
  initialState: {
    user: null,
  },
  reducers: {
    setData: (state, action) => {
      state.user = action.payload;
    },

    resetData: (state) => {
      state.user = null;
    },
  },
});

// Export actions
export const { setData, resetData } = signUpData.actions;

// Selector to get user data
export const SelectsignUpData = (state) => state.signUp.user;

// Export reducer
export default signUpData.reducer;
