import client from "./client";

// セット登録
// POST /api/sets/register
export const createSet = async (setData) => {
  const response = await client.post("/sets/register", setData);
  return response.data;
};

// セット検索
// GET /api/sets/search?keyword=xxx
export const searchSets = async (keyword) => {
  const response = await client.get("/sets/search", {
    params: { keyword },
  });

  return response.data;
};

// セット詳細取得
// GET /api/sets/{id}
export const getSetDetail = async (id) => {
  const response = await client.get(`/sets/${id}`);
  return response.data;
};

// セット編集
// PUT /api/sets/{id}
export const updateSet = async (id, setData) => {
  const response = await client.put(`/sets/${id}`, setData);
  return response.data;
};

// セット削除
// DELETE /api/sets/{id}
export const deleteSet = async (id) => {
  const response = await client.delete(`/sets/${id}`);
  return response.data;
};