import { createSlice } from "@reduxjs/toolkit";
import {
  createProductCategories,
  deleteProductCategory,
  getASingleProductCategory,
  getAllProductCategories,
  updateProductCategory,
} from "./pCategoryApiSlice.js";

// create auth slice

const productCategoriesSlice = createSlice({
  name: "productCategory",
  initialState: {
    productCategories: null,
    error: null,
    message: null,
    loader: false,
    singleProductCategory: null,
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
      .addCase(getAllProductCategories.pending, (state) => {
        state.loader = true;
      })
      .addCase(getAllProductCategories.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(getAllProductCategories.fulfilled, (state, action) => {
        state.productCategories = action.payload;
        state.loader = false;
      })
      .addCase(createProductCategories.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.productCategories = action.payload.productCategories;
        state.loader = false;
      })
      .addCase(getASingleProductCategory.pending, (state) => {
        state.loader = true;
        state.singleProductCategory = null;
      })
      .addCase(getASingleProductCategory.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
        state.singleProductCategory = null;
      })
      .addCase(getASingleProductCategory.fulfilled, (state, action) => {
        state.singleProductCategory = action.payload;
        state.loader = false;
      })
      .addCase(updateProductCategory.fulfilled, (state, action) => {
        state.loader = false;

        const updatedPCIndex = state.productCategories.findIndex(
          (item) => item._id === action.payload.productCategory?._id
        );

        if (updatedPCIndex !== -1) {
          state.productCategories[updatedPCIndex] =
            action.payload.productCategory;
        }

        state.message = action.payload.message;
      })
      .addCase(deleteProductCategory.fulfilled, (state, action) => {
        state.productCategories = state.productCategories.filter(
          (data) => data._id !== action.payload.productCategory._id
        );

        state.message = action.payload.message;
      });
  },
});

// export selectors

export const getAllProductCategoryData = (state) => state.productCategory;

// export actions

export const { setMessageEmpty } = productCategoriesSlice.actions;

// export default

export default productCategoriesSlice.reducer;
