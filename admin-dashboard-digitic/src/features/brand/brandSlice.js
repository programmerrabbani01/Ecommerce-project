import { createSlice } from "@reduxjs/toolkit";
import {
  createBrands,
  deleteBrands,
  getASingleBrand,
  getAllBrands,
  updateBrand,
} from "./brandApiSlice.js";

// create auth slice

const brandSlice = createSlice({
  name: "brand",
  initialState: {
    brands: [],
    error: null,
    message: null,
    loader: false,
    singleBrand: null,
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
      .addCase(getAllBrands.pending, (state) => {
        state.loader = true;
      })
      .addCase(getAllBrands.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(getAllBrands.fulfilled, (state, action) => {
        state.brands = action.payload;
        state.loader = false;
      })
      .addCase(createBrands.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.brands.push(action.payload.brand);
        state.loader = false;
      })
      .addCase(deleteBrands.fulfilled, (state, action) => {
        state.brands = state.brands.filter(
          (data) => data._id !== action.payload.brand._id
        );

        state.message = action.payload.message;
      })
      .addCase(updateBrand.pending, (state) => {
        state.loader = true;
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.loader = false;

        const updatedBrandIndex = state.brands.findIndex(
          (item) => item._id === action.payload.brand?._id
        );

        if (updatedBrandIndex !== -1) {
          state.brands[updatedBrandIndex] = action.payload.brand;
        }

        state.message = action.payload.message;
      })
      .addCase(getASingleBrand.pending, (state) => {
        state.loader = true;
        state.singleBrand = null;
      })
      .addCase(getASingleBrand.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
        state.singleBrand = null;
      })
      .addCase(getASingleBrand.fulfilled, (state, action) => {
        state.singleBrand = action.payload;
        state.loader = false;
      });
  },
});

// export selectors

export const getAllBrandsData = (state) => state.brand;

// export actions

export const { setMessageEmpty } = brandSlice.actions;

// export default

export default brandSlice.reducer;
