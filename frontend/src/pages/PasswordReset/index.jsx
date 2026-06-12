import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../api/auth";
import { SECURITY_QUESTION } from "../../constants/securityQuestion";
import styles from "../User/User.module.css";

export default function PasswordReset() {
  const [loginId, setLoginId] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleReset = async () => {
    setError("");
    setMessage("");

    if (newPassword !== confirmPassword) {
      setError("パスワードが一致しません");
      return;
    }

    try {
      const res = await resetPassword(loginId, securityAnswer, newPassword);
      setMessage(res.message);

      if (res?.message === "パスワードを再設定しました") {
        navigate("/login");
      }
    } catch (e) {
      const msg = e.response?.data?.error || "パスワードの再設定に失敗しました";
      setError(msg);
    }
  };

  return (
<div className={styles.container}>
<h2 className={styles.title}>パスワード再発行</h2>

      <div className={styles.form}>
<input
          className={styles.input}
          placeholder="loginId"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
        />

        <div style={{ fontSize: 12, color: "#757575" }}>
          {SECURITY_QUESTION}
</div>

        <input
          className={styles.input}
          placeholder="セキュリティ質問の回答"
          value={securityAnswer}
          onChange={(e) => setSecurityAnswer(e.target.value)}
        />

        <input
          className={styles.input}
          type="password"
          placeholder="新しいパスワード"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <input
          className={styles.input}
          type="password"
          placeholder="新しいパスワード（確認用）"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {error && (
<div style={{ color: "red", fontSize: 12 }}>
            {error}
</div>
        )}

        <button className={styles.buttonPrimary} onClick={handleReset}>
          再設定
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