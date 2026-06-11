import client from "./client";

export const getMealRecords = async (date) => {
  const res = await client.get(`/records?date=${date}`);
  return res.data;
};

export const createMealRecord = async (data) => {
  const res = await client.post("/records", data);
  return res.data;
};

export const deleteMealRecord = async (id) => {
  const res = await client.delete(`/records/${id}`);
  return res.data;
};

export const deleteMealRecordItem = async (itemId) => {
  const response = await client.delete(`/records/items/${itemId}`);
  return response.data;
};