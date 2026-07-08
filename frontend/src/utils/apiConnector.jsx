import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const apiConnector = async (
  method,
  url,
  data,
  headers = {},
  params = {}
) => {
  try {
    const response = await axiosInstance({
      method,
      url,
      data,
      params,
      headers,
    });

    return response;
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";

    throw new Error(message);
  }
};

export default apiConnector;