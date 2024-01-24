import { createSlice } from "@reduxjs/toolkit";
import { createBlogs, getAllBlogs } from "./blogApiSlice.js";

// create auth slice

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogs: null,
    error: null,
    message: null,
    loader: false,
  },
  reducers: {
    setMessageEmpty: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // brand
      .addCase(getAllBlogs.pending, (state) => {
        state.loader = true;
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.blogs = action.payload;
        state.loader = false;
      })
      .addCase(createBlogs.pending, (state) => {
        state.loader = true;
      })
      .addCase(createBlogs.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(createBlogs.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.blogs = action.payload.blogs;
        state.loader = false;
      });
  },
});

// export selectors

export const getAllBlogsData = (state) => state.blog;

// export actions

export const { setMessageEmpty } = blogSlice.actions;

// export default

export default blogSlice.reducer;
