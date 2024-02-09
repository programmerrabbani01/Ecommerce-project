import { createSlice } from "@reduxjs/toolkit";
import {
  createColors,
  deleteColor,
  getASingleColor,
  getAllColors,
  updateColor,
} from "./colorApiSlice.js";

// create auth slice

const colorSlice = createSlice({
  name: "color",
  initialState: {
    colors: [],
    error: null,
    message: null,
    loader: false,
    singleColor: null,
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
      .addCase(getAllColors.pending, (state) => {
        state.loader = true;
      })
      .addCase(getAllColors.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(getAllColors.fulfilled, (state, action) => {
        state.colors = action.payload;
        state.loader = false;
      })
      .addCase(createColors.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.colors = action.payload.colors;
        state.loader = false;
      })
      .addCase(getASingleColor.pending, (state) => {
        state.loader = true;
        state.singleColor = null;
      })
      .addCase(getASingleColor.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
        state.singleColor = null;
      })
      .addCase(getASingleColor.fulfilled, (state, action) => {
        state.singleColor = action.payload;
        state.loader = false;
      })
      .addCase(updateColor.fulfilled, (state, action) => {
        state.loader = false;

        const updatedColorIndex = state.colors.findIndex(
          (item) => item._id === action.payload.color?._id
        );

        if (updatedColorIndex !== -1) {
          state.colors[updatedColorIndex] = action.payload.color;
        }

        state.message = action.payload.message;
      })
      .addCase(deleteColor.fulfilled, (state, action) => {
        state.colors = state.colors.filter(
          (data) => data._id !== action.payload.color?._id
        );

        console.log(action.payload);

        state.message = action.payload.message;
      });
  },
});

// export selectors

export const getAllColorsData = (state) => state.color;

// export actions

export const { setMessageEmpty } = colorSlice.actions;

// export default

export default colorSlice.reducer;
