import { createSlice } from "@reduxjs/toolkit";
import { adminLogin, logOutUser, loggedInUser } from "./authApiSlice.js";

// create auth slice

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    message: null,
    error: null,
  },
  reducers: {
    setMessageEmpty: (state) => {
      state.message = null;
      state.error = null;
    },
    setLogout: (state) => {
      state.message = null;
      state.error = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    // log in
    builder
      .addCase(adminLogin.pending, (state) => {
        state.loader = true;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
        state.user = action.payload.user;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loggedInUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.user = null;
      })
      .addCase(loggedInUser.fulfilled, (state, action) => {
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      }).addCase(logOutUser.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.user = null;
        localStorage.removeItem("user");
      });
  },
});

// export selectors

export const getAuthData = (state) => state.auth;

// export actions

export const { setMessageEmpty } = authSlice.actions;

// export auth slice

export default authSlice.reducer;
