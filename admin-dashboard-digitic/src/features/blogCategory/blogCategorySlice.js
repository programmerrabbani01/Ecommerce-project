import { createSlice } from "@reduxjs/toolkit";
import {
  createBlogCategory,
  deleteBlogCategory,
  getAllBlogCategory,
  getSingleBlogCategory,
  updateBlogCategory,
} from "./blogCategoryApiSlice.js";

// create auth slice

const blogCategorySlice = createSlice({
  name: "blogCategory",
  initialState: {
    blogCategories: [],
    error: null,
    message: null,
    loader: false,
    singleBlogCategory: null,
  },
  reducers: {
    setMessageEmpty: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // blog
      .addCase(getAllBlogCategory.pending, (state) => {
        state.loader = true;
      })
      .addCase(getAllBlogCategory.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(getAllBlogCategory.fulfilled, (state, action) => {
        state.blogCategories = action.payload;
        state.loader = false;
      })
      .addCase(createBlogCategory.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.blogCategories = action.payload.blogCategories;
        state.loader = false;
      })
      .addCase(getSingleBlogCategory.pending, (state) => {
        state.loader = true;
        state.singleBlogCategory = null;
      })
      .addCase(getSingleBlogCategory.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
        state.singleBlogCategory = null;
      })
      .addCase(getSingleBlogCategory.fulfilled, (state, action) => {
        state.singleBlogCategory = action.payload;
        state.loader = false;
      })
      .addCase(updateBlogCategory.fulfilled, (state, action) => {
        state.loader = false;

        const updatedBCIndex = state.blogCategories.findIndex(
          (item) => item._id === action.payload.blogCategory?._id
        );

        if (updatedBCIndex !== -1) {
          state.blogCategories[updatedBCIndex] = action.payload.blogCategory;
        }

        state.message = action.payload.message;
      })
      .addCase(deleteBlogCategory.fulfilled, (state, action) => {
        state.blogCategories = state.blogCategories.filter(
          (data) => data._id !== action.payload.blogCategory._id
        );

        state.message = action.payload.message;
      });
  },
});

// export selectors

export const getAllBlogsCategoryData = (state) => state.blogCategory;

// export actions

export const { setMessageEmpty } = blogCategorySlice.actions;

// export default

export default blogCategorySlice.reducer;
