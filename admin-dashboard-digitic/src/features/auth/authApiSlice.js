import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../utils/baseUrl.js";

// log in

export const adminLogin = createAsyncThunk("auth/adminLogin", async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:5050/api/v1/auth/admin",
      data,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

//  loggedIn

export const loggedInUser = createAsyncThunk("auth/loggedInUser", async () => {
  try {
    const response = await axios.get("http://localhost:5050/api/v1/auth/me", {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// logOut

export const logOutUser = createAsyncThunk("auth/logOutUser", async () => {
  try {
    const response = await axios.post(
      "http://localhost:5050/api/v1/auth/logOut",
      "",
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

//profileUpdate
export const ProfileUpdate = createAsyncThunk(
  "auth/ProfileUpdate",
  async ({ id, formData }) => {
    try {
      const response = await axios.patch(
        `http://localhost:5050/api/v1/user/${id}`,
        formData,
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

//forgot password
export const userForgotPassword = createAsyncThunk(
  "auth/userForgotPassword",
  async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:5050/api/v1/auth/user/forgetPassword`,
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
  "auth/forgotPasswordMail",
  async (mail) => {
    try {
      const response = await axios.post(
        `http://localhost:5050/api/v1/auth/user/forgetPassword`,
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
  "auth/resetPassword",
  async ({ password, token }) => {
    try {
      const response = await axios.post(
        `${baseUrl}/auth/user/resetPassword/${token}`,
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
