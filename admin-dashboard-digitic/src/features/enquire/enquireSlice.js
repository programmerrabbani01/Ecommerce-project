import { createSlice } from "@reduxjs/toolkit";
import {
  deleteEnquire,
  getAllEnquires,
  getSingleEnquiry,
  updateEnquiryStatus,
} from "./enquireApiSlice.js";

// create auth slice

const enquireSlice = createSlice({
  name: "enquire",
  initialState: {
    enquires: [],
    error: null,
    message: null,
    loader: false,
    singleEnquiry: null,
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
      })
      .addCase(getSingleEnquiry.pending, (state) => {
        state.loader = true;
        state.singleEnquiry = null;
      })
      .addCase(getSingleEnquiry.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
        state.singleEnquiry = null;
      })
      .addCase(getSingleEnquiry.fulfilled, (state, action) => {
        state.singleEnquiry = action.payload;
        state.loader = false;
      })
      .addCase(updateEnquiryStatus.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateEnquiryStatus.fulfilled, (state, action) => {
        state.enquires[
          state.enquires.findIndex(
            (data) => data._id == action.payload.enquiry._id
          )
        ] = action.payload.enquiry;
        state.message = action.payload.message;
      })
      .addCase(deleteEnquire.fulfilled, (state, action) => {
        state.enquires = state.enquires.filter(
          (data) => data._id !== action.payload.enquire._id
        );

        state.message = action.payload.message;
      });
  },
});

// export selectors

export const getAllEnquiresData = (state) => state.enquire;

// export actions

export const { setMessageEmpty } = enquireSlice.actions;

// export default

export default enquireSlice.reducer;
