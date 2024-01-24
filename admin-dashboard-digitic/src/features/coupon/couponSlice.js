import { createSlice } from "@reduxjs/toolkit";
import { createCoupons, getAllCoupons } from "./couponApiSlice.js";

// create auth slice

const couponSlice = createSlice({
  name: "coupon",
  initialState: {
    coupons: [],
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
      .addCase(getAllCoupons.pending, (state) => {
        state.loader = true;
      })
      .addCase(getAllCoupons.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(getAllCoupons.fulfilled, (state, action) => {
        state.coupons = action.payload;
        state.loader = false;
      })
      .addCase(createCoupons.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.coupons.push(action.payload.coupon);
        state.loader = false;
      });
  },
});

// export selectors

export const getAllCouponsData = (state) => state.coupon;

// export actions

export const { setMessageEmpty } = couponSlice.actions;

// export default

export default couponSlice.reducer;
