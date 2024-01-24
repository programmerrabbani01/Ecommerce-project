import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get all tag

export const getAllTag = createAsyncThunk("tag/getAllTag", async () => {
  try {
    const response = await axios.get("http://localhost:5050/api/v1/tag", {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// create tag

export const createTag = createAsyncThunk("tag/createTag", async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:5050/api/v1/tag",
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

// single tag

export const getSingleTag = createAsyncThunk("tag/getSingleTag", async (id) => {
  try {
    const response = await axios.get(`http://localhost:5050/api/v1/tag/${id}`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// update tag

export const updateTagApi = createAsyncThunk("tag/updateTag", async (data) => {
  try {
    const response = await axios.patch(
      `http://localhost:5050/api/v1/tag/${data.id}`,
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

// delete tag

export const deleteTag = createAsyncThunk("tag/deleteTag", async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:5050/api/v1/tag/${id}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
