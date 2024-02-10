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

// single enquiry

export const getSingleEnquiry = createAsyncThunk(
  "enquire/getSingleEnquiry",
  async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5050/api/v1/enq/${id}`,
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

// update enquiry

export const updateEnquiryStatus = createAsyncThunk(
  "enquire/updateEnquiry",
  async ({ status, id }) => {
    try {
      const response = await axios.patch(
        `http://localhost:5050/api/v1/enq/status/${id}`,
        { status },
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

// delete enquiry

export const deleteEnquire = createAsyncThunk(
  "enquire/deleteEnquire",
  async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5050/api/v1/enq/${id}`,
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
