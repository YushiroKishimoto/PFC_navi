import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Items.module.css";
import {
  createItem,
} from "../../api/item";

export default function Items() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    amount: "",
    // unit: "g",
    pro: "",
    fat: "",
    car: "",
    cal: "",
  });

  const [error, setError] = useState({});
  // const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // const validate = () => {
  //   const newErrors = {};

  //   if (!form.name) newErrors.name = "食材名を入力してください";
  //   if (!form.amount) newErrors.amount = "標準量を入力してください";
  //   if (!form.cal) newErrors.cal = "カロリーを入力してください";
  //   if (!form.pro) newErrors.pro = "Pを入力してください";
  //   if (!form.fat) newErrors.fat = "Fを入力してください";
  //   if (!form.car) newErrors.car = "Cを入力してください";

  //   setErrors(newErrors);

  //   return Object.keys(newErrors).length === 0;
  // };

  const handleSubmit = async () => {
      try {
        const payload = {
          name: form.name,
          amount: form.amount === "" ? null : Number(form.amount),
          pro: form.pro === "" ? null : Number(form.pro),
          fat: form.fat === "" ? null : Number(form.fat),
          car: form.car === "" ? null : Number(form.car),
          cal: form.cal === "" ? null : Number(form.cal),
        };
  
        const res = await createItem(payload);
        console.log("register response:", res)

        if (res?.message === "自前食材・料理を登録しました。") {
          navigate("/");
        }
        setMessage(res.message);

      } catch (e) {
        setMessage("登録に失敗しました");
      }
    };

  return (
    <div className={styles.container}>

      <h2 className={styles.title}>食材・料理登録</h2>

      <div className={styles.card}>

        {/* 食材名 */}
        <label>食材情報</label>
        <input
          name="name"
          placeholder="例：鶏むね肉"
          className={styles.input}
          onChange={handleChange}
          value={form.name}
        />
        {/* {errors.name && <p className={styles.error}>{errors.name}</p>} */}

        {/* 標準量 */}
        <div className={styles.row}>
          <div>
            <label>標準量</label>
            <input
              name="amount"
              placeholder="100"
              className={styles.input}
              onChange={handleChange}
              value={form.amount}
            />
            {/* {errors.amount && <p className={styles.error}>{errors.amount}</p>} */}
          </div>

          <div>
            <label>単位</label>
            <select
              name="unit"
              value={form.unit}
              className={styles.input}
              onChange={handleChange}
            >
              <option value="g">g</option>
              <option value="ml">ml</option>
              <option value="piece">個</option>
            </select>
          </div>
        </div>

        {/* 栄養 */}
        <p className={styles.subText}>栄養情報（100gあたり）</p>

        <div className={styles.grid}>
          <div>
            <label>カロリー</label>
            <input
              name="cal"
              className={styles.input}
              onChange={handleChange}
              value={form.cal}
            />
            {/* {errors.cal && <p className={styles.error}>{errors.cal}</p>} */}
          </div>

          <div>
            <label>P</label>
            <input
              name="pro"
              className={styles.input}
              onChange={handleChange}
              value={form.pro}
            />
            {/* {errors.pro && <p className={styles.error}>{errors.pro}</p>} */}
          </div>

          <div>
            <label>F</label>
            <input
              name="fat"
              className={styles.input}
              onChange={handleChange}
              value={form.fat}
            />
            {/* {errors.fat && <p className={styles.error}>{errors.fat}</p>} */}
          </div>

          <div>
            <label>C</label>
            <input
              name="car"
              className={styles.input}
              onChange={handleChange}
              value={form.car}
            />
            {/* {errors.car && <p className={styles.error}>{errors.car}</p>} */}
          </div>
        </div>

        <button className={styles.button} onClick={handleSubmit}>
          登録
        </button>

        <p>{message}</p>
      </div>
    </div>
  );
}