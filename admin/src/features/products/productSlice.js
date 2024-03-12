import { createSlice } from "@reduxjs/toolkit";
import { getAllProducts } from "./productsApiSlice.js";

// create user slice

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    message: null,
    error: null,
    loader: false,
  },
  reducers: {
    setMessageEmpty: (state) => {
      state.message = null;
      state.error = null;
    }
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
        state.error = null;
        state.loader = false;
      });
  },
});

// export selectors

export const getProductsData = (state) => state.product;

// export actions

export const { setMessageEmpty, setLogOut } = productSlice.actions;

// export reducer

export default productSlice.reducer;
