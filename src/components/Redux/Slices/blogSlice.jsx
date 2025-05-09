// Slices/blogSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {}, // Example object state
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlogData: (state, action) => {
      state.data = action.payload;
    },
    clearBlogData: (state) => {
      state.data = {};
    },
  },
});

export const { setBlogData, clearBlogData } = blogSlice.actions;
export const selectblog = (state) => state.blog.data;
export default blogSlice.reducer;
