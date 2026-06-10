import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../api/auth";
import styles from "./User.module.css";
 
export default function Register() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
 
  const navigate = useNavigate();
 
  const handleRegister = async () => {
    try {
      const res = await register(loginId, password);
      setMessage(res.message);
 
      if (res?.message === "ユーザー登録が完了しました") {
        navigate("/login");
      }
    } catch (e) {
      setMessage("登録失敗");
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
 
        <button className={styles.buttonPrimary} onClick={handleRegister}>
          登録
</button>
 
        <p>{message}</p>
</div>
</div>
  );
}