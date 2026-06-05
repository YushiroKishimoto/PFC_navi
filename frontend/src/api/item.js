import client from "./client";

// 新規登録
export const createItem = async (data) => {
  const res = await client.post("/items/register", data);
  return res.data;
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