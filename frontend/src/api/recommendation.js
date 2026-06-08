import client from "./client";

export const getRecommendations = async (date, limit = 5) => {
  const res = await client.get(`/recommendations?date=${date}&limit=${limit}`);
  return res.data;
};