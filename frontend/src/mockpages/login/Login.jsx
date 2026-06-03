import { useState } from "react";
import { login } from "../../api/auth";
import { isSuccess, getMessage } from "../../utils/response";

export default function Login() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    try {
      const res = await login(loginId, password);

      console.log("login response:", res); // ★デバッグ用

      if (isSuccess(res)) {
        // 成功 → dashboardへ
        window.location.href = "/dashboard";
        return;
      }

      // 失敗
      setError(getMessage(res));
    } catch (err) {
      console.error(err);
      setError("通信エラーが発生しました");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>

      <div>
        <input
          placeholder="loginId"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
        />
      </div>

      <div>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button onClick={handleLogin}>Login</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}