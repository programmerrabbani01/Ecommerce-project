import { createSlice } from "@reduxjs/toolkit";
import {
  ProfileUpdate,
  adminLogin,
  forgotPasswordMail,
  logOutUser,
  loggedInUser,
  resetPassword,
} from "./authApiSlice.js";

// create auth slice

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    message: null,
    error: null,
    loader: false,
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
      // loggedIn
      .addCase(loggedInUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.user = null;
      })
      .addCase(loggedInUser.fulfilled, (state, action) => {
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      // logOut
      .addCase(logOutUser.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.user = null;
        localStorage.removeItem("user");
      })
      // update profile
      .addCase(ProfileUpdate.pending, (state) => {
        state.loader = true;
      })
      .addCase(ProfileUpdate.rejected, (state, action) => {
        state.error = action.error.message;
        state.message = null;
        state.loader = false;
      })
      .addCase(ProfileUpdate.fulfilled, (state, action) => {
        state.error = null;
        state.message = action.payload.message;
        state.loader = false;
        state.user = action.payload.user;
        if (action.payload.user) {
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        }
      }) 
      //forgot password mail send
      .addCase(forgotPasswordMail.pending, (state) => {
        state.loader = true;
      })
      .addCase(forgotPasswordMail.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(forgotPasswordMail.fulfilled, (state, action) => {
        state.error = null;
        state.message = action.payload.message;
        state.loader = false;

      })
      //Reset new password
      .addCase(resetPassword.pending, (state) => {
        state.loader = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.error = null;
        state.message = action.payload.message;
        state.loader = false;
      });
  },
});

// export selectors

export const getAuthData = (state) => state.auth;

// export actions

export const { setMessageEmpty } = authSlice.actions;

// export auth slice

export default authSlice.reducer;
