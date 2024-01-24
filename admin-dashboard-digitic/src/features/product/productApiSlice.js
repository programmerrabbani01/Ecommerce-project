import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get all products

export const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  async () => {
    try {
      const response = await axios.get("http://localhost:5050/api/v1/product", {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// create product

export const createProducts = createAsyncThunk(
  "product/createProducts",
  async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5050/api/v1/product",
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

// delete product

export const deleteProducts = createAsyncThunk(
  "product/deleteProducts",
  async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5050/api/v1/product/${id}`,
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
