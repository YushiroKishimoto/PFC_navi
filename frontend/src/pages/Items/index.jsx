import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Items.module.css";

export default function Items() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    amount: "",
    unit: "g",
    kcal: "",
    protein: "",
    fat: "",
    carb: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name) newErrors.name = "食材名を入力してください";
    if (!form.amount) newErrors.amount = "標準量を入力してください";
    if (!form.kcal) newErrors.kcal = "カロリーを入力してください";
    if (!form.protein) newErrors.protein = "Pを入力してください";
    if (!form.fat) newErrors.fat = "Fを入力してください";
    if (!form.carb) newErrors.carb = "Cを入力してください";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    console.log("item register:", form);

    alert("登録完了（mock）");

    navigate("/");
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
        />
        {errors.name && <p className={styles.error}>{errors.name}</p>}

        {/* 標準量 */}
        <div className={styles.row}>
          <div>
            <label>標準量</label>
            <input
              name="amount"
              placeholder="100"
              className={styles.input}
              onChange={handleChange}
            />
            {errors.amount && <p className={styles.error}>{errors.amount}</p>}
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
            <input name="kcal" className={styles.input} onChange={handleChange} />
            {errors.kcal && <p className={styles.error}>{errors.kcal}</p>}
          </div>

          <div>
            <label>P</label>
            <input name="protein" className={styles.input} onChange={handleChange} />
            {errors.protein && <p className={styles.error}>{errors.protein}</p>}
          </div>

          <div>
            <label>F</label>
            <input name="fat" className={styles.input} onChange={handleChange} />
            {errors.fat && <p className={styles.error}>{errors.fat}</p>}
          </div>

          <div>
            <label>C</label>
            <input name="carb" className={styles.input} onChange={handleChange} />
            {errors.carb && <p className={styles.error}>{errors.carb}</p>}
          </div>
        </div>

        <button className={styles.button} onClick={handleSubmit}>
          登録
        </button>

      </div>
    </div>
  );
}