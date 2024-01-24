import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get all categories

export const getAllProductCategories = createAsyncThunk(
  "productCategory/getAllProductCategories",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:5050/api/v1/productCategory",
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

// create categories

export const createProductCategories = createAsyncThunk(
  "productCategory/createProductCategories",
  async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5050/api/v1/productCategory",
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

// get a single category

export const getASingleProductCategory = createAsyncThunk(
  "productCategory/getASingleProductCategory",
  async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5050/api/v1/productCategory/${id}`,
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

// update category

export const updateProductCategory = createAsyncThunk(
  "productCategory/updateProductCategory",
  async (data) => {
    try {
      const response = await axios.patch(
        `http://localhost:5050/api/v1/productCategory/${data.id}`,
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

// update category

export const deleteProductCategory = createAsyncThunk(
  "productCategory/deleteProductCategory",
  async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5050/api/v1/productCategory/${id}`,
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
