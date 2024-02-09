import { createSlice } from "@reduxjs/toolkit";
import {
  createCoupons,
  deleteCoupon,
  getASingleCoupon,
  getAllCoupons,
  updateCoupon,
} from "./couponApiSlice.js";

// create auth slice

const couponSlice = createSlice({
  name: "coupon",
  initialState: {
    coupons: [],
    error: null,
    message: null,
    loader: false,
    singleCoupon: null,
  },
  reducers: {
    setMessageEmpty: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // coupon
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
      })
      .addCase(getASingleCoupon.pending, (state) => {
        state.loader = true;
        state.singleCoupon = null;
      })
      .addCase(getASingleCoupon.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
        state.singleCoupon = null;
      })
      .addCase(getASingleCoupon.fulfilled, (state, action) => {
        state.singleCoupon = action.payload;
        state.loader = false;
      })
      .addCase(updateCoupon.fulfilled, (state, action) => {
        state.loader = false;

        const updatedCouponIndex = state.coupons.findIndex(
          (item) => item._id === action.payload.coupon?._id
        );

        if (updatedCouponIndex !== -1) {
          state.coupons[updatedCouponIndex] = action.payload.coupon;
        }

        state.message = action.payload.message;
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.coupons = state.coupons.filter(
          (data) => data._id !== action.payload.coupon._id
        );

        state.message = action.payload.message;
      });
  },
});

// export selectors

export const getAllCouponsData = (state) => state.coupon;

// export actions

export const { setMessageEmpty } = couponSlice.actions;

// export default

export default couponSlice.reducer;
