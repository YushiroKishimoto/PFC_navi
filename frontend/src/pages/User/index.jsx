import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../api/auth";
import { SECURITY_QUESTION } from "../../constants/securityQuestion";
import styles from "./User.module.css";

export default function Register() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("パスワードが一致しません");
      return;
    }

    try {
      const res = await register(loginId, password, securityAnswer);
      setMessage(res.message);

      if (res?.message === "ユーザー登録が完了しました") {
        navigate("/login");
      }
    } catch (e) {
      const msg = e.response?.data?.error || "登録失敗";
      setError(msg);
    }
  };

  return (
<div className={styles.container}>
<h2 className={styles.title}>ユーザー登録</h2>

      <div className={styles.form}>
<input
          className={styles.input}
          placeholder="loginId"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
        />

        <input
          className={styles.input}
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          className={styles.input}
          type="password"
          placeholder="password（確認用）"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <div style={{ fontSize: 12, color: "#666" }}>
          {SECURITY_QUESTION}
</div>

        <input
          className={styles.input}
          placeholder="セキュリティ質問の回答"
          value={securityAnswer}
          onChange={(e) => setSecurityAnswer(e.target.value)}
        />

        {error && (
<div style={{ color: "red", fontSize: 12 }}>
            {error}
</div>
        )}

        <button className={styles.buttonPrimary} onClick={handleRegister}>
          登録
</button>
               <button
                 className={styles.backButton}
                 onClick={() => {navigate(`/login`);
                 }}
               >
                 ログイン画面に戻る
               </button>
</div>
<p>{message}</p>
</div>
  );
}