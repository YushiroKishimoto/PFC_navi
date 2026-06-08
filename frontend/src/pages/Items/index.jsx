import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Items.module.css";
import { createItem } from "../../api/item";

export default function Items() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    amount: "",
    pro: "",
    fat: "",
    car: "",
    cal: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "食材名を入力してください";
    }

    if (form.amount === "" || Number(form.amount) <= 0) {
      newErrors.amount = "標準量は1以上で入力してください";
    }

    if (form.cal === "" || Number(form.cal) < 0) {
      newErrors.cal = "カロリーは0以上で入力してください";
    }

    if (form.pro === "" || Number(form.pro) < 0) {
      newErrors.pro = "Pは0以上で入力してください";
    }

    if (form.fat === "" || Number(form.fat) < 0) {
      newErrors.fat = "Fは0以上で入力してください";
    }

    if (form.car === "" || Number(form.car) < 0) {
      newErrors.car = "Cは0以上で入力してください";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
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
        setMessage("登録しました");

        setForm({
          name: "",
          amount: "",
          pro: "",
          fat: "",
          car: "",
          cal: "",
        });

        // 登録後にホームへ戻したい場合だけ使う
        // navigate("/");
      } else {
        setMessage(res?.message || "登録に失敗しました");
      }
    } catch (e) {
      console.error(e);
      setMessage("登録に失敗しました");
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
        {errors.name && <p className={styles.error}>{errors.name}</p>}

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
            {errors.amount && <p className={styles.error}>{errors.amount}</p>}
          </div>

          <div>
            <label>単位</label>
            <input
              value="g"
              className={styles.input}
              disabled
              readOnly
            />
          </div>
        </div>

        <p className={styles.subText}>栄養情報</p>

        <div className={styles.grid}>
          <div>
            <label>カロリー</label>
            <input
              name="cal"
              type="number"
              className={styles.input}
              onChange={handleChange}
              value={form.cal}
            />
            {errors.cal && <p className={styles.error}>{errors.cal}</p>}
          </div>

          <div>
            <label>P</label>
            <input
              name="pro"
              type="number"
              className={styles.input}
              onChange={handleChange}
              value={form.pro}
            />
            {errors.pro && <p className={styles.error}>{errors.pro}</p>}
          </div>

          <div>
            <label>F</label>
            <input
              name="fat"
              type="number"
              className={styles.input}
              onChange={handleChange}
              value={form.fat}
            />
            {errors.fat && <p className={styles.error}>{errors.fat}</p>}
          </div>

          <div>
            <label>C</label>
            <input
              name="car"
              type="number"
              className={styles.input}
              onChange={handleChange}
              value={form.car}
            />
            {errors.car && <p className={styles.error}>{errors.car}</p>}
          </div>
        </div>

        <button className={styles.button} onClick={handleSubmit}>
          登録
        </button>

        {message && <p>{message}</p>}
      </div>
    </div>
  );
}