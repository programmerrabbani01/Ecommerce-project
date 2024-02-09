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

// update blog

export const updateBlog = createAsyncThunk("blog/updateBlog", async (data) => {
  try {
    const response = await axios.patch(
      `http://localhost:5050/api/v1/blog/${data.id}`,
      data.form_data,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// delete blogs

export const deleteBlogs = createAsyncThunk("blog/deleteBlogs", async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:5050/api/v1/blog/${id}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// get single blog

export const getASingleBlog = createAsyncThunk(
  "blog/getASingleBlog",
  async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5050/api/v1/blog/${id}`,
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
