import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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