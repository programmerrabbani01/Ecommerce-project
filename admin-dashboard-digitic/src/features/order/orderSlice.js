import { createSlice } from "@reduxjs/toolkit";
import { getAllOrders } from "./orderApiSlice.js";

// create auth slice

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: null,
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
      .addCase(getAllOrders.pending, (state) => {
        state.loader = true;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loader = false;
      });
  },
});

// export selectors

export const getAllOrdersData = (state) => state.order;

// export actions

export const { setMessageEmpty } = orderSlice.actions;

// export default

export default orderSlice.reducer;
