import client from "../api/client";

export const isAuthenticated = async () => {
  try {
    await client.get("/auth/me"); // ← サーバーに確認
    return true;
  } catch {
    return false;
  }
};