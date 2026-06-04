import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Onboarding.module.css";

export default function Onboarding() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    age: "",
    gender: "",
    weight: "",
    targetWeight: "",
    height: "",
    period: "",
    activityCount: "",
    activityTime: "",
    goal: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log("onboarding:", form);
    alert("PFC計算完了（mock）");
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>3. ユーザー情報登録</h2>

      <div className={styles.form}>

        {/* 年齢 */}
        <input
          name="age"
          type="number"
          placeholder="年齢"
          className={styles.input}
          onChange={handleChange}
        />

        {/* 性別（選択式） */}
        <select
          name="gender"
          value={form.gender}
          className={styles.input}
          onChange={handleChange}
        >
          <option value="" disabled hidden>
            性別を選択
          </option>
          <option value="male">男</option>
          <option value="female">女</option>
        </select>

        {/* 現在体重 */}
        <input
          name="weight"
          type="number"
          placeholder="現在体重(kg)"
          className={styles.input}
          onChange={handleChange}
        />

        {/* 目標体重 */}
        <input
          name="targetWeight"
          type="number"
          placeholder="目標体重(kg)"
          className={styles.input}
          onChange={handleChange}
        />

        {/* 身長 */}
        <input
          name="height"
          type="number"
          placeholder="身長(cm)"
          className={styles.input}
          onChange={handleChange}
        />

        {/* 期間 */}
        <input
          name="period"
          type="number"
          placeholder="期間(日)"
          className={styles.input}
          onChange={handleChange}
        />

        {/* 活動回数（選択） */}
        <select
          name="activityCount"
          value={form.activityCount}
          className={styles.input}
          onChange={handleChange}
        >
          <option value="" disabled hidden>
            活動回数を選択
          </option>
          {[0,1,2,3,4,5,6,7].map((n) => (
            <option key={n} value={n}>
              {n}回/週
            </option>
          ))}
        </select>

        {/* 活動時間（選択） */}
        <select
          name="activityTime"
          value={form.activityTime}
          className={styles.input}
          onChange={handleChange}
        >
          <option value="" disabled hidden>
            活動時間を選択
          </option>
          {[10,20,30,40,50,60,90,120].map((n) => (
            <option key={n} value={n}>
              {n}分
            </option>
          ))}
        </select>

        {/* 目標 */}
        <select
          name="goal"
          value={form.goal}
          className={styles.input}
          onChange={handleChange}
        >
          <option value="" disabled hidden>
            目標コースを選択
          </option>
          <option value="cut">減量</option>
          <option value="maintain">維持</option>
          <option value="bulk">増量</option>
        </select>

        <button className={styles.buttonPrimary} onClick={handleSubmit}>
          登録
        </button>

      </div>
    </div>
  );
}