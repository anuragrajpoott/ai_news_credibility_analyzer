// src/utils/apiConnector.js

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const apiConnector = async (
  method,
  url,
  data = {},
  headers = {},
  params = {}
) => {
  const response = await axiosInstance({
    method,
    url,
    data,
    headers,
    params,
  });

  return response;
};

export default apiConnector;