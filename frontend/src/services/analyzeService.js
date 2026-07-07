import apiConnector from "../utils/apiConnector";

export const analyzeNews = async (text) => {
  const response = await apiConnector(
    "POST",
    "/api/analyze",
    { text }
  );

  return response.data;
};