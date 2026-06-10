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

  try {
    const res = await login(loginId, password);

    console.log("LOGIN RESPONSE =", res);

    if (res?.resultCode === "SUCCESS") {
      navigate("/");
      return;
    }

    // ★全部まとめる
    setError("ログインに失敗しました");

  } catch (e) {
    console.error(e);

    setError("ログインに失敗しました");
  }
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
        <button className={styles.loginButton} onClick={handleLogin}>
          ログイン
        </button>

        <button className={styles.registerButton} onClick={handleRegister}>
          新規登録
        </button>
        <p>{error}</p>
      </div>
    </div>
  );
}