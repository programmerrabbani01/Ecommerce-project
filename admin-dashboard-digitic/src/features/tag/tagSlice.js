import { createSlice } from "@reduxjs/toolkit";
import {
  createTag,
  deleteTag,
  getAllTag,
  getSingleTag,
  updateTagApi,
} from "./tagApiSlice.js";

// create auth slice

const tagSlice = createSlice({
  name: "tag",
  initialState: {
    tags: [],
    error: null,
    message: null,
    loader: false,
    singleTag: null,
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
      .addCase(getAllTag.pending, (state) => {
        state.loader = true;
      })
      .addCase(getAllTag.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(getAllTag.fulfilled, (state, action) => {
        state.tags = action.payload;
        state.loader = false;
      })
      .addCase(createTag.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.tags = action.payload.tags;
        state.loader = false;
      })
      .addCase(getSingleTag.pending, (state) => {
        state.loader = true;
        state.singleTag = null;
      })
      .addCase(getSingleTag.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
        state.singleTag = null;
      })
      .addCase(getSingleTag.fulfilled, (state, action) => {
        state.singleTag = action.payload;
        state.loader = false;
      })
      .addCase(updateTagApi.fulfilled, (state, action) => {
        state.loader = false;

        const updatedRagIndex = state.tags.findIndex(
          (item) => item._id === action.payload.tag?._id
        );

        if (updatedRagIndex !== -1) {
          state.tags[updatedRagIndex] = action.payload.tag;
        }

        state.message = action.payload.message;
      })
      .addCase(deleteTag.fulfilled, (state, action) => {
        state.tags = state.tags.filter(
          (data) => data._id !== action.payload.tag._id
        );

        state.message = action.payload.message;
      });
  },
});

// export selectors

export const getAllTagsData = (state) => state.tag;

// export actions

export const { setMessageEmpty } = tagSlice.actions;

// export default

export default tagSlice.reducer;
