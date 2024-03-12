import { createSlice } from "@reduxjs/toolkit";
import { getAllOrders, getAllUserOrdersById } from "./orderApiSlice.js";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    error: null,
    message: null,
    loader: false,
  },
  reducers: {
    setMessageEmpty: (state) => {
      state.message = null;
      state.error = null;
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
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
      })
      .addCase(getAllUserOrdersById.pending, (state) => {
        state.loader = true;
      })
      .addCase(getAllUserOrdersById.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(getAllUserOrdersById.fulfilled, (state, action) => {
        state.orders = action.payload.userOrder;
        state.loader = false;
      });
  },
});

export const getAllOrdersData = (state) => state.order;

export const { setMessageEmpty, setOrders } = orderSlice.actions;

export default orderSlice.reducer;
