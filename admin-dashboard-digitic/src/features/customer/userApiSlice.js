import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get all user

export const getAllUser = createAsyncThunk("user/getAllUser", async () => {
  try {
    const response = await axios.get("http://localhost:5050/api/v1/user", {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// create user

export const createUser = createAsyncThunk("user/createUser", async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:5050/api/v1/user",
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

// delete user

export const deleteUser = createAsyncThunk("user/deleteUser", async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:5050/api/v1/user/${id}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

//  user status update

export const updateUserStatus = createAsyncThunk(
  "user/updateUserStatus",
  async ({ status, id }) => {
    try {
      const response = await axios.patch(
        `http://localhost:5050/api/v1/user/status/${id}`,
        { status },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);


