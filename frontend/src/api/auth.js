import client from "./client";

// ログイン
export const login = async (loginId, password) => {
  const res = await client.post("/auth/login", {
    loginId,
    password,
  });

  return res.data;
};

// ログアウト
export const logout = async () => {
  const res = await client.post("/auth/logout");
  return res.data;
};

// ユーザー登録
export const register = async (loginId, password, securityAnswer) => {
  const res = await client.post("/users/register", {
    loginId,
    password,
    securityAnswer,
  });

  return res.data;
};

// パスワード再発行
export const resetPassword = async (loginId, securityAnswer, newPassword) => {
  const res = await client.post("/password-reset", {
    loginId,
    securityAnswer,
    newPassword,
  });

  return res.data;
};