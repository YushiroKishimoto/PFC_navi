import client from "./client";

export const getMealRecords = async (date) => {
  const res = await client.get(`/meal-records?date=${date}`);
  return res.data;
};

export const createMealRecord = async (data) => {
  const res = await client.post("/meal-records", data);
  return res.data;
};

export const deleteMealRecord = async (id) => {
  const res = await client.delete(`/meal-records/${id}`);
  return res.data;
};