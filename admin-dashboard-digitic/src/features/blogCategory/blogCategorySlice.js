import { createSlice } from "@reduxjs/toolkit";
import { createBlogCategory, getAllBlogCategory } from "./blogCategoryApiSlice.js";

// create auth slice

const blogCategorySlice = createSlice({
  name: "blogCategory",
  initialState: {
    blogCategories: null,
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
      }).addCase(createBlogCategory.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.blogCategories = action.payload.blogCategories;
        state.loader = false;
      });
  },
});

// export selectors

export const getAllBlogsCategoryData = (state) => state.blogCategory;

// export actions

export const { setMessageEmpty } = blogCategorySlice.actions;

// export default

export default blogCategorySlice.reducer;
