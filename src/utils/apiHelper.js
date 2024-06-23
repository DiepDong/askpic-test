// apiHelper.js
import axios from "axios";
import { baseUrl } from "./constants";

export const apiHelper = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  }
});

export const post = async (url, data, config = {}) => {
  try {
    const response = await apiHelper.post(url, data, config);
    return response;
  } catch (error) {
    console.error("API Error:", error);
    return error.response || error;
  }
};





