import client from "./client";

export const searchSets = async (keyword) => {
  const response = await client.get("/api/sets/search", {
    params: { keyword },
  });

  return response.data;
};

export const getSetDetail = async (id) => {
  const response = await client.get(`/api/sets/${id}`);

  return response.data;
};