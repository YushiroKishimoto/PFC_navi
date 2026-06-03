import client from "./client";

// export const login = async (loginId, password) => {
//   const res = await client.post(
//     "/auth/login",
//     {
//       loginId,
//       password,
//     },
//     {
//       withCredentials: true, // ★重要（Cookie認証）
//     }
//   );

//   return res.data;
// };

// MOCK
export const login = async (loginId, password) => {
  console.log("mock login request:", loginId, password);

  // ここで入力確認できる
  if (loginId === "test" && password === "1234") {
    return {
      resultCode: "SUCCESS",
      message: "ログイン成功",
      data: {
        userId: 1,
      },
    };
  }

  return {
    resultCode: "VALIDATION_ERROR",
    message: "ログイン失敗（ID or パスワード違い）",
    data: null,
  };
};