import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get all brand

export const getAllBrands = createAsyncThunk("brand/getAllBrands", async () => {
  try {
    const response = await axios.get("http://localhost:5050/api/v1/brand", {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// create brand

export const createBrands = createAsyncThunk(
  "brand/createBrands",
  async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5050/api/v1/brand",
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

// create brand

export const getASingleBrand = createAsyncThunk(
  "brand/getASingleBrand",
  async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5050/api/v1/brand/${id}`,
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

// update brand

export const updateBrand = createAsyncThunk(
  "brand/updateBrand",
  async (data) => {
    try {
      const response = await axios.patch(
        `http://localhost:5050/api/v1/brand/${data.id}`,
        data.form_data,
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

// delete brand

export const deleteBrands = createAsyncThunk(
  "brand/deleteBrands",
  async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5050/api/v1/brand/${id}`,
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
