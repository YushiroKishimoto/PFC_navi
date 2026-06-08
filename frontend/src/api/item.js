import client from "./client";

// 食材・料理検索
// default_foods + custom_foods を横断検索
export const searchItems = async (keyword) => {
  const response = await client.get("/items/search", {
    params: { keyword },
  });

  return response.data;
};

// 自前DB検索
// custom_foods のみ検索
export const searchCustomItems = async (keyword) => {
  const response = await client.get("/items/custom/search", {
    params: { keyword },
  });

  return response.data;
};

// 自前DB登録
// POST /api/items/register
export const createItem = async (itemData) => {
  const response = await client.post("/items/register", itemData);

  return response.data;
};

// 自前DB編集
// PUT /api/items/{id}
export const updateItem = async (id, itemData) => {
  const response = await client.put(`/items/${id}`, itemData);

  return response.data;
};

// 自前DB削除
// DELETE /api/items/{id}
export const deleteItem = async (id) => {
  const response = await client.delete(`/items/${id}`);

  return response.data;
};

// 既存画面で createCustomItem などを使っている場合用の別名
export const createCustomItem = createItem;
export const updateCustomItem = updateItem;
export const deleteCustomItem = deleteItem;