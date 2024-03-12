import { createSlice } from "@reduxjs/toolkit";
import {
  createProducts,
  deleteProducts,
  getASingleProduct,
  getAllProducts,
  updateProducts,
  updateSingleProductImage,
} from "./productApiSlice.js";

// create auth slice

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    error: null,
    message: null,
    loader: false,
    singleProduct: null,
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
      })
      .addCase(getASingleProduct.pending, (state) => {
        state.loader = true;
        state.singleProduct = null;
      })
      .addCase(getASingleProduct.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
        state.singleProduct = null;
      })
      .addCase(getASingleProduct.fulfilled, (state, action) => {
        state.singleProduct = action.payload;
        state.loader = false;
      })
      .addCase(updateProducts.fulfilled, (state, action) => {
        state.loader = false;

        const updatedProductIndex = state.products.findIndex(
          (item) => item._id === action.payload.product?._id
        );

        if (updatedProductIndex !== -1) {
          state.products[updatedProductIndex] = action.payload.product;
        }

        state.message = action.payload.message;
      })
      .addCase(updateSingleProductImage.pending, (state) => {
        state.loader = true;
      })
      .addCase(updateSingleProductImage.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      .addCase(updateSingleProductImage.fulfilled, (state, action) => {
        state.loader = false;
        state.error = null;
        state.message = action.payload.message;
        state.singleProduct.photos = state.singleProduct.photos?.filter(
          (img) => {
            return img.public_id !== action.payload.imageId;
          }
        );
      });
  },
});

// export selectors

export const getAllProductsData = (state) => state.product;

// export actions

export const { setMessageEmpty } = productSlice.actions;

// export default

export default productSlice.reducer;
