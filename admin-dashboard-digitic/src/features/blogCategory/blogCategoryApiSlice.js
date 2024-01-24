import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get all blog category

export const getAllBlogCategory = createAsyncThunk(
  "blogCategory/getAllBlogCategory",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:5050/api/v1/blogCategory",
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

// create blog category

export const createBlogCategory = createAsyncThunk(
  "blogCategory/createBlogCategory",
  async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5050/api/v1/blogCategory",
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
