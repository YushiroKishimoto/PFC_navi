import client from "./client";

export const getWeeklyAnalysis = async (endDate) => {
  const response = await client.get("/analysis/weekly", {
    params: { endDate },
  });

  return response.data;
};

export const getMonthlyAnalysis = async (targetMonth) => {
  const response = await client.get("/analysis/monthly", {
    params: { targetMonth },
  });

  return response.data;
};