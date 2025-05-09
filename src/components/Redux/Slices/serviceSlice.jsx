import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  service: {},
};

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    setServiceData: (state, action) => {
      state.data = action.payload;
    },
    clearServiceData: (state) => {
      state.data = {};
    },
  },
});

export const { setServiceData, clearServiceData } = serviceSlice.actions;
export const selectService = (state) => state.service.data;
export default serviceSlice.reducer;
