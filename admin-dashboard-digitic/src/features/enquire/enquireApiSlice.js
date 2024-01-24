import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get all brand

export const getAllEnquires = createAsyncThunk(
  "enquire/getAllEnquires",
  async () => {
    try {
      const response = await axios.get("http://localhost:5050/api/v1/enq", {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
