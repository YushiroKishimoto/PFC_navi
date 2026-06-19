import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Items.module.css";
import { createItem } from "../../api/item";

export default function Items() {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    name: "",
    amount: "",
    pro: "",
    fat: "",
    car: "",
    cal: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    if (!form.name.trim()) {
      alert("内容に不備があります");
      return false;
    }

    const isAmountInvalid = form.amount === "" || Number(form.amount) <= 0;
    const isCalInvalid = form.cal === "" || Number(form.cal) < 0;
    const isProInvalid = form.pro === "" || Number(form.pro) < 0;
    const isFatInvalid = form.fat === "" || Number(form.fat) < 0;
    const isCarInvalid = form.car === "" || Number(form.car) < 0;

    if (isAmountInvalid || isCalInvalid || isProInvalid || isFatInvalid || isCarInvalid) {
      alert("数値は0以上（標準量は1以上）で入力してください");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    setMessage("");

    if (!validate()) {
      return;
    }

    try {
      const payload = {
        name: form.name.trim(),
        amount: Number(form.amount),
        pro: Number(form.pro),
        fat: Number(form.fat),
        car: Number(form.car),
        cal: Number(form.cal),
      };

      const res = await createItem(payload);
      console.log("register response:", res);

      if (res?.resultCode === "SUCCESS") {
        alert("登録に成功しました");

        // フォームをクリアする共通処理
        const clearForm = () => {
          setForm({
            name: "",
            amount: "",
            pro: "",
            fat: "",
            car: "",
            cal: "",
          });
        };

        if (location.state?.from) {
          navigate(location.state.from, { replace: true });
        } else {
          // 👈 Record以外からの場合はフォームをクリアして画面にとどまる
          clearForm();
        }
      } else {
        alert(res?.message || "登録に失敗しました");
      }
    } catch (e) {
      console.error(e);
      alert("通信エラーにより登録に失敗しました");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>食材・料理登録</h2>

      <div className={styles.card}>
        <label>食材名</label>
        <input
          name="name"
          placeholder="例：鶏むね肉"
          className={styles.input}
          onChange={handleChange}
          value={form.name}
        />

        <div className={styles.row}>
          <div>
            <label>標準量（ｇ）</label>
            <input
              name="amount"
              type="number"
              placeholder="100"
              className={styles.input}
              onChange={handleChange}
              value={form.amount}
            />
          </div>

          <div>
            <label>単位</label>
            <input value="g" className={styles.input} disabled readOnly />
          </div>
        </div>

        <p className={styles.subText}>栄養情報</p>

        <div className={styles.grid}>
          <div>
            <label>カロリー</label>
            <input name="cal" type="number" className={styles.input} onChange={handleChange} value={form.cal} />
          </div>
          <div>
            <label>P</label>
            <input name="pro" type="number" className={styles.input} onChange={handleChange} value={form.pro} />
          </div>
          <div>
            <label>F</label>
            <input name="fat" type="number" className={styles.input} onChange={handleChange} value={form.fat} />
          </div>
          <div>
            <label>C</label>
            <input name="car" type="number" className={styles.input} onChange={handleChange} value={form.car} />
          </div>
        </div>

        <button className={styles.button} onClick={handleSubmit}>登録</button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}