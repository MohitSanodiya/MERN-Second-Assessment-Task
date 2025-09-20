import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchProducts = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/api/products`);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Network Error");
  }
};
