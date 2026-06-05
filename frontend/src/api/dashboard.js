import client from "./client";

export const getDashboard = async (date) => {
  const res = await client.get(`/dashboard?date=${date}`);
  return res.data;
};