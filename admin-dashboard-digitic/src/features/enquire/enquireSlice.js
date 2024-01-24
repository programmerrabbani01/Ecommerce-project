import { createSlice } from "@reduxjs/toolkit";
import { getAllEnquires } from "./enquireApiSlice.js";

// create auth slice

const enquireSlice = createSlice({
  name: "enquire",
  initialState: {
    enquires: null,
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
      .addCase(getAllEnquires.pending, (state) => {
        state.loader = true;
      })
      .addCase(getAllEnquires.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(getAllEnquires.fulfilled, (state, action) => {
        state.enquires = action.payload;
        state.loader = false;
      });
  },
});

// export selectors

export const getAllEnquiresData = (state) => state.enquire;

// export actions

export const { setMessageEmpty } = enquireSlice.actions;

// export default

export default enquireSlice.reducer;
