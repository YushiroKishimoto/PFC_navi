import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../api/auth";

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
        return;
      }

    } catch (e) {
      setMessage("登録失敗");
    }
  };

  return (
    <div>
      <h2>ユーザー登録</h2>

      <input
        placeholder="loginId"
        value={loginId}
        onChange={(e) => setLoginId(e.target.value)}
      />

      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleRegister}>登録</button>

      <p>{message}</p>
    </div>
  );
}

// export default function User() {
//   return <div>2.新規登録</div>;
// }