import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get all orders

export const getAllOrders = createAsyncThunk("order/getAllOrders", async () => {
  try {
    const response = await axios.get(
      "http://localhost:5050/api/v1/user/allOrders",
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

