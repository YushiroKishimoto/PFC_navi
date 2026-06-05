import client from "./client";

// 新規登録
export const createItem = async (data) => {
  const res = await client.post("/items/register", data);
  return res.data;
};
// 食材・料理検索
// default_foods + custom_foods を横断検索
export const searchItems = async (keyword) => {
  const response = await client.get("/api/items/search", {
    params: { keyword },
  });

  return response.data;
};

// 自前DB検索
// custom_foods のみ検索
export const searchCustomItems = async (keyword) => {
  const response = await client.get("/api/items/custom/search", {
    params: { keyword },
  });

  return response.data;
};

// 自前DB登録
export const createCustomItem = async (itemData) => {
  const response = await client.post("/api/items", itemData);

  return response.data;
};

// 自前DB編集
export const updateCustomItem = async (id, itemData) => {
  const response = await client.put(`/api/items/${id}`, itemData);

  return response.data;
};

// 自前DB削除
export const deleteCustomItem = async (id) => {
  const response = await client.delete(`/api/items/${id}`);

  return response.data;
};

// 更新
// export const updateMyUserInfo = async (data) => {
//   const res = await client.put("/users/me", data);
//   return res.data;
// };

// 取得
// export const getMyUserInfo = async () => {
//   const res = await client.get("/users/me");
//   return res.data;
// };