import apiConnector from "../utils/apiConnector";

export const analyzeNews = async (text) => {
  const newsText = text?.trim();

  if (!newsText) {
    throw new Error("News text is required");
  }

  const response = await apiConnector(
    "POST",
    "/api/analyze",
    {
      text: newsText,
    }
  );

  return response.data;
};