import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get all color

export const getAllColors = createAsyncThunk("color/getAllColors", async () => {
  try {
    const response = await axios.get("http://localhost:5050/api/v1/color", {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// create color

export const createColors = createAsyncThunk(
  "color/createColors",
  async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5050/api/v1/color",
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

// get single color

export const getASingleColor = createAsyncThunk(
  "color/getASingleColor",
  async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5050/api/v1/color/${id}`,
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

// update a color

export const updateColor = createAsyncThunk(
  "color/updateColor",
  async (data) => {
    try {
      const response = await axios.patch(
        `http://localhost:5050/api/v1/color/${data.id}`,
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

// delete a color

export const deleteColor = createAsyncThunk(
  "color/deleteColor",
  async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5050/api/v1/color/${id}`,
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