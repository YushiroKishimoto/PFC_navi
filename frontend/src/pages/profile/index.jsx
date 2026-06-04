import { useState } from "react";
import styles from "./Profile.module.css";

export default function Profile() {
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
    console.log("profile update:", form);
    alert("更新完了（mock）");
  };

  return (
    <div className={styles.container}>

      <h2 className={styles.title}>4. ユーザー情報</h2>

      <div className={styles.card}>

        <div className={styles.form}>

          <input name="age" type="number" placeholder="年齢" className={styles.input} onChange={handleChange} />

          <select name="gender" value={form.gender} className={styles.input} onChange={handleChange}>
            <option value="">性別を選択</option>
            <option value="male">男</option>
            <option value="female">女</option>
          </select>

          <input name="weight" type="number" placeholder="現在体重(kg)" className={styles.input} onChange={handleChange} />

          <input name="targetWeight" type="number" placeholder="目標体重(kg)" className={styles.input} onChange={handleChange} />

          <input name="height" type="number" placeholder="身長(cm)" className={styles.input} onChange={handleChange} />

          <input name="period" type="number" placeholder="期間(日)" className={styles.input} onChange={handleChange} />

          <select name="activityCount" value={form.activityCount} className={styles.input} onChange={handleChange}>
            <option value="">活動回数</option>
            {[0,1,2,3,4,5,6,7].map((n) => (
              <option key={n} value={n}>{n}回/週</option>
            ))}
          </select>

          <select name="activityTime" value={form.activityTime} className={styles.input} onChange={handleChange}>
            <option value="">活動時間</option>
            {[10,20,30,40,50,60,90,120].map((n) => (
              <option key={n} value={n}>{n}分</option>
            ))}
          </select>

          <select name="goal" value={form.goal} className={styles.input} onChange={handleChange}>
            <option value="">目標</option>
            <option value="cut">減量</option>
            <option value="maintain">維持</option>
            <option value="bulk">増量</option>
          </select>

          <button className={styles.buttonPrimary} onClick={handleSubmit}>
            更新
          </button>

        </div>
      </div>
    </div>
  );
}