import { createSlice } from "@reduxjs/toolkit";
import { getAllUser } from "./userApiSlice.js";

// create auth slice

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    error: null,
    message: null,
  },
  reducers: {
    setMessageEmpty: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // user
      .addCase(getAllUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.users = action.payload;
      });
  },
});

// export selectors

export const getAllCustomersData = (state) => state.user;

// export actions

export const { setMessageEmpty } = userSlice.actions;

// export default

export default userSlice.reducer;
