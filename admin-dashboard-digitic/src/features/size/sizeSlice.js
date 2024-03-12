import { createSlice } from "@reduxjs/toolkit";
import {
  createSize,
  deleteSize,
  getAllSize,
  getSingleSize,
  updateSize,
} from "./sizeApiSlice.js";

// create auth slice

const sizeSlice = createSlice({
  name: "size",
  initialState: {
    sizes: [],
    error: null,
    message: null,
    loader: false,
    singleSize: null,
  },
  reducers: {
    setMessageEmpty: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // size
      .addCase(getAllSize.pending, (state) => {
        state.loader = true;
      })
      .addCase(getAllSize.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(getAllSize.fulfilled, (state, action) => {
        state.sizes = action.payload;
        state.loader = false;
      })
      .addCase(createSize.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.sizes = action.payload.size;
        state.loader = false;
      })
      .addCase(getSingleSize.pending, (state) => {
        state.loader = true;
        state.singleSize = null;
      })
      .addCase(getSingleSize.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
        state.singleSize = null;
      })
      .addCase(getSingleSize.fulfilled, (state, action) => {
        state.singleSize = action.payload;
        state.loader = false;
      })
      .addCase(updateSize.fulfilled, (state, action) => {
        state.loader = false;

        const updatedSizeIndex = state.sizes.findIndex(
          (item) => item._id === action.payload.size?._id
        );

        if (updatedSizeIndex !== -1) {
          state.sizes[updatedSizeIndex] = action.payload.size;
        }

        state.message = action.payload.message;
      })
      .addCase(deleteSize.fulfilled, (state, action) => {
        state.sizes = state.sizes.filter(
          (data) => data._id !== action.payload.size._id
        );

        state.message = action.payload.message;
      });
  },
});

// export selectors

export const getAllSizesData = (state) => state.size;

// export actions

export const { setMessageEmpty } = sizeSlice.actions;

// export default

export default sizeSlice.reducer;
