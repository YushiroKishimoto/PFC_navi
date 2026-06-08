import client from "./client";

// 新規登録
export const createSetitem = async (data) => {
  const res = await client.post("/sets/register", data);
  return res.data;
};

// 一覧取得
export const getSetitem = async (keyword) => {
  const res = await client.get("/sets/search", {
    params: {
      keyword
    }
  });
  return res.data;
};

// 詳細取得
export const getDetailsetitem = async (id) => {
  const res = await client.get(`/sets/${id}`);
  return res.data;
};

// 更新
// 必要データ例:
// const payload = {
//     name: "朝食セット12",
//     items: [
//       {
//         source: "default",
//         itemId: 3,
//         amount: 150
//       },
//       {
//         source: "custom",
//         itemId: 1,
//         amount: 100
//       }
//     ]
//   };
export const updateSetitem = async (id, data) => {
  const res = await client.put(`/sets/${id}`, data);
  return res.data;
};

// 削除
export const deleteSetitem = async (id) => {
  const res = await client.delete(`/sets/${id}`);
  return res.data;
};