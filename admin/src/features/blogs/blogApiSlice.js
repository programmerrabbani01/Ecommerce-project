import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../utils/baseUrl.js";

// get All blog
export const getAllBlog = createAsyncThunk("blog/getAllBlog", async () => {
  try {
    const response = await axios.get(`${baseUrl}/blog`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// get Single blog
export const getSIngleBlog = createAsyncThunk(
  "blog/getSIngleBlog",
  async (id) => {
    try {
      const response = await axios.get(`${baseUrl}/blog/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
