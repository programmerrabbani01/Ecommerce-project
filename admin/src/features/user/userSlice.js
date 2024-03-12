import { createSlice } from "@reduxjs/toolkit";
import {
  addWIshList,
  forgotPasswordMail,
  getAllWishlist,
  resetPassword,
  userLogin,
  userRegistration,
} from "./userApiSlice.js";

// create user slice

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    wishlist: [],
    message: null,
    error: null,
    loader: false,
  },
  reducers: {
    setMessageEmpty: (state) => {
      state.message = null;
      state.error = null;
    },
    setLogOut: (state) => {
      state.message = null;
      state.error = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegistration.pending, (state) => {
        state.loader = true;
      })
      .addCase(userRegistration.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(userRegistration.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.message = action.payload.message;
        state.error = null;
        state.loader = false;
      })
      .addCase(userLogin.pending, (state) => {
        state.loader = true;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.message = action.payload.message;
        state.error = null;
        state.loader = false;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      }) //Add product wishlist
      .addCase(addWIshList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addWIshList.rejected, (state) => {
        state.isLoading = false;
        //action.error.message
        state.error = "You Cannot Add Wishlist Without Login";
      })
      .addCase(addWIshList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.wishlist = action.payload.wishList;
        state.message = action.payload.message;
      })
      //get all product wishlist
      .addCase(getAllWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getAllWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.wishlist = action.payload.wishList;
      })
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

export const getUserAuthData = (state) => state.userAuth;

// export actions

export const { setMessageEmpty, setLogOut } = userAuthSlice.actions;

// export reducer

export default userAuthSlice.reducer;
