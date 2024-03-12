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

// update product

export const updateProducts = createAsyncThunk(
  "product/updateProducts",
  async (data) => {
    try {
      const response = await axios.put(
        `http://localhost:5050/api/v1/product/${data.id}`,
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

// single product

export const getASingleProduct = createAsyncThunk(
  "product/getASingleProduct",
  async (id) => {
    try {
      const response = await axios.get(
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

// Update a single Product
export const updateSingleProductImage = createAsyncThunk(
  "product/updateSingleProductImage",
  async ({ id, imageId }) => {
    try {
      const response = await axios.put(
        `http://localhost:5050/api/v1/product/photos/${id}`,
        { imageId: imageId },
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
