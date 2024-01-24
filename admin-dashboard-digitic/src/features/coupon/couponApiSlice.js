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
