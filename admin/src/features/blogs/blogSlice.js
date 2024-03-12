import { createSlice } from "@reduxjs/toolkit";
import { getAllBlog, getSIngleBlog } from "./blogApiSlice.js";

// create initialState
const initialState = {
  blogs: [],
  singleBlog: null,
  message: null,
  error: null,
  loader: false,
};

// create a new slice
const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setMessageEmpty: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // get all blog
    builder
      .addCase(getAllBlog.pending, (state) => {
        state.loader = true;
      })
      .addCase(getAllBlog.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
        state.blogs = [];
      })
      .addCase(getAllBlog.fulfilled, (state, action) => {
        state.loader = false;
        state.error = null;
        state.blogs = action.payload;
      })
      //get single color
      .addCase(getSIngleBlog.pending, (state) => {
        state.loader = true;
        state.singleBlog = null;
      })
      .addCase(getSIngleBlog.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
        state.singleBlog = null;
      })
      .addCase(getSIngleBlog.fulfilled, (state, action) => {
        state.loader = false;
        state.error = null;
        state.singleBlog = action.payload.blog;
      });
  },
});

// Actions
export const { setMessageEmpty } = blogSlice.actions;

//selector for blog state
export const getBlogData = (state) => state.blog;

//reducer
export default blogSlice.reducer;
