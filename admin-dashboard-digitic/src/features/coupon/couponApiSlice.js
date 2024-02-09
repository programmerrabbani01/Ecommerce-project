import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get all coupons

export const getAllCoupons = createAsyncThunk(
  "coupon/getAllCoupons",
  async () => {
    try {
      const response = await axios.get("http://localhost:5050/api/v1/coupon", {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// create coupon

export const createCoupons = createAsyncThunk(
  "coupon/createCoupons",
  async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5050/api/v1/coupon",
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

// get a single coupon

export const getASingleCoupon = createAsyncThunk(
  "coupon/getASingleCoupon",
  async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5050/api/v1/coupon/${id}`,
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


// update coupon

export const updateCoupon = createAsyncThunk(
  "coupon/updateCoupon",
  async (data) => {
    try {
      const response = await axios.patch(
        `http://localhost:5050/api/v1/coupon/${data.id}`,
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

// delete coupon

export const deleteCoupon = createAsyncThunk(
  "coupon/deleteCoupon",
  async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5050/api/v1/coupon/${id}`,
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