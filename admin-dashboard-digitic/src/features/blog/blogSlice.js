import { createSlice } from "@reduxjs/toolkit";
import {
  createBlogs,
  deleteBlogs,
  getASingleBlog,
  getAllBlogs,
  updateBlog,
} from "./blogApiSlice.js";

// create auth slice

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogs: [],
    error: null,
    message: null,
    loader: false,
    singleBlog: null,
  },
  reducers: {
    setMessageEmpty: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // get all blogs
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
      // create a new blog
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
      })
      // delete a blog

      .addCase(deleteBlogs.pending, (state) => {
        state.loader = true;
      })
      .addCase(deleteBlogs.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(deleteBlogs.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter(
          (data) => data._id !== action.payload.blog._id
        );

        state.message = action.payload.message;
      })
      // single blog
      .addCase(getASingleBlog.pending, (state) => {
        state.loader = true;
        state.singleBlog = null;
      })
      .addCase(getASingleBlog.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
        state.singleBlog = null;
      })
      .addCase(getASingleBlog.fulfilled, (state, action) => {
        state.singleBlog = action.payload;
        state.loader = false;
      })
      // update blog
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.loader = false;

        const updatedBlogIndex = state.blogs.findIndex(
          (item) => item._id === action.payload.blog?._id
        );

        if (updatedBlogIndex !== -1) {
          state.blogs[updatedBlogIndex] = action.payload.blog;
        }

        state.message = action.payload.message;
      });
  },
});

// export selectors

export const getAllBlogsData = (state) => state.blog;

// export actions

export const { setMessageEmpty } = blogSlice.actions;

// export default

export default blogSlice.reducer;
