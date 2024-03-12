import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get all size

export const getAllSize = createAsyncThunk("size/getAllSize", async () => {
  try {
    const response = await axios.get("http://localhost:5050/api/v1/size", {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// create size

export const createSize = createAsyncThunk("size/createSize", async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:5050/api/v1/size",
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

// single size

export const getSingleSize = createAsyncThunk(
  "size/getSingleSize",
  async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5050/api/v1/size/${id}`,
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

// update size

export const updateSize = createAsyncThunk("size/updateSize", async (data) => {
  try {
    const response = await axios.patch(
      `http://localhost:5050/api/v1/size/${data.id}`,
      data.values,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// delete size

export const deleteSize = createAsyncThunk("size/deleteSize", async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:5050/api/v1/size/${id}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
