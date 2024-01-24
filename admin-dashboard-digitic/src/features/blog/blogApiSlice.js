import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get all blogs

export const getAllBlogs = createAsyncThunk("blog/getAllBlogs", async () => {
  try {
    const response = await axios.get("http://localhost:5050/api/v1/blog", {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// create blogs

export const createBlogs = createAsyncThunk(
  "blog/createBlogs",
  async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5050/api/v1/blog",
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
