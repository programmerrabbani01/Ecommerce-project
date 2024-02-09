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

// get single blog category

export const getSingleBlogCategory = createAsyncThunk(
  "blogCategory/getSingleBlogCategory",
  async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5050/api/v1/blogCategory/${id}`,
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

// update blog category

export const updateBlogCategory = createAsyncThunk(
  "blogCategory/updateBlogCategory",
  async (data) => {
    try {
      const response = await axios.patch(
        `http://localhost:5050/api/v1/blogCategory/${data.id}`,
        data.values,
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

// delete blog category

export const deleteBlogCategory = createAsyncThunk(
  "blogCategory/deleteBlogCategory",
  async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5050/api/v1/blogCategory/${id}`,
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