import { useState } from "react";
import styles from "./Login.module.css";

export default function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log({ userId, password });
  };

  const handleRegister = () => {
    console.log("register");
  };

  return (
    <div className={styles.container}>
      <h2>1.ログイン</h2>

      <div className={styles.form}>
        <input
          className={styles.input}
          type="text"
          placeholder="ユーザーID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
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
      </div>
    </div>
  );
}