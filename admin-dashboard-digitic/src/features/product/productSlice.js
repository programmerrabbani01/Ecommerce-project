import { createSlice } from "@reduxjs/toolkit";
import {
  createProducts,
  deleteProducts,
  getAllProducts,
} from "./productApiSlice.js";

// create auth slice

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: null,
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
      .addCase(getAllProducts.pending, (state) => {
        state.loader = true;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loader = false;
      })
      .addCase(createProducts.pending, (state) => {
        state.loader = true;
      })
      .addCase(createProducts.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(createProducts.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.products = action.payload.products;
        state.loader = false;
      })
      .addCase(deleteProducts.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (data) => data._id !== action.payload.product._id
        );

        state.message = action.payload.message;
      });
  },
});

// export selectors

export const getAllProductsData = (state) => state.product;

// export actions

export const { setMessageEmpty } = productSlice.actions;

// export default

export default productSlice.reducer;
