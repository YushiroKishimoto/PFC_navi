import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { login } from "../../api/auth"; // ← パスは環境に合わせて調整

export default function Login() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");

    const res = await login(loginId, password);

    console.log("login response:", res);

    if (res?.message === "ログインに成功しました") {
      navigate("/");
      return;
    }

    setError(res.message);
  };

  const handleRegister = () => {
    navigate("/user");
  };

  return (
    <div className={styles.container}>
      <h2>1.ログイン</h2>

      <div className={styles.form}>

        <input
          className={styles.input}
          type="text"
          placeholder="ユーザーID"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
        />

        <input
          className={styles.input}
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* エラー表示 */}
        {error && (
          <div style={{ color: "red", fontSize: 12 }}>
            {error}
          </div>
        )}

        <button className={styles.loginButton} onClick={handleLogin}>
          ログイン
        </button>

        <button className={styles.registerButton} onClick={handleRegister}>
          新規登録
        </button>

      </div>
    </div>
  );
}