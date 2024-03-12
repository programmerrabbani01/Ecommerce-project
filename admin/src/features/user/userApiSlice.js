import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../utils/baseUrl.js";

// user registration

export const userRegistration = createAsyncThunk(
  "user/userRegistration",
  async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:5050/api/v1/auth/register`,
        data,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
// user login

export const userLogin = createAsyncThunk("user/userLogin", async (data) => {
  try {
    const response = await axios.post(`${baseUrl}/auth/login`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

//  loggedIn

export const loggedInUser = createAsyncThunk("user/loggedInUser", async () => {
  try {
    const response = await axios.get("http://localhost:5050/api/v1/auth/me", {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// add products wishlist
export const addWIshList = createAsyncThunk("user/addWIshList", async (id) => {
  try {
    const response = await axios.put(
      `${baseUrl}/user/wishlist`,
      {
        productId: id,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// get all wishlist
export const getAllWishlist = createAsyncThunk(
  "user/getAllWishlist",
  async () => {
    try {
      const response = await axios.get(`${baseUrl}/user/wishlist`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

//forgot password
export const userForgotPassword = createAsyncThunk(
  "user/userForgotPassword",
  async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:5050/api/v1/user/forgetPassword`,
        data,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// forgot password mail send
export const forgotPasswordMail = createAsyncThunk(
  "user/forgotPasswordMail",
  async (mail) => {
    try {
      const response = await axios.post(
        `http://localhost:5050/api/v1/user/forgetPassword`,
        mail,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// reset password mail set
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ password, token }) => {
    try {
      const response = await axios.post(
        `http://localhost:5050/api/v1/user/resetPassword/${token}`,
        { password },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
