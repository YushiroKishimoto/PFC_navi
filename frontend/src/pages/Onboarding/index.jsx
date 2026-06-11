import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Onboarding.module.css";
import {
  getMyUserInfo,
  createMyUserInfo,
  updateMyUserInfo,
} from "../../api/user";

export default function Onboarding() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    age: "",
    sex: "",
    height: "",
    weight: "",
    burnCal: "",
    // targetCal: "",
    pfcCourse: "",
  });
  const ACTIVITY_OPTIONS = [
    { value: 1, label: "ほとんど運動しない（週1回以下）" },
    { value: 2, label: "軽い運動（週1〜2回）" },
    { value: 3, label: "適度な運動（週3〜4回）" },
    { value: 4, label: "活発な運動（週5〜6回）" },
    { value: 5, label: "かなり活発（ほぼ毎日）" },
  ];

  const [isExist, setIsExist] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMyUserInfo();

        setForm(data);
        setIsExist(true);
      } catch (e) {
        // 404なら未登録
        setIsExist(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        age: Number(form.age),
        sex: form.sex,
        height: Number(form.height),
        weight: Number(form.weight),
        burnCal: Number(form.burnCal),
        // targetCal: Number(form.targetCal),
        pfcCourse: Number(form.pfcCourse),
      };

      if (isExist) {
        await updateMyUserInfo(payload);
        setMessage("更新しました");
        navigate("/");
      } else {
        await createMyUserInfo(payload);
        setMessage("登録しました");
        navigate("/");
      }
    } catch (e) {
      setMessage("エラーが発生しました");
    }
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
          value={form.age}
        />

        {/* 性別（選択式） */}
        <select
          name="sex"
          className={styles.input}
          onChange={handleChange}
          value={form.sex}
        >
          <option value="" disabled hidden>
            性別を選択
          </option>
          <option value="male">男</option>
          <option value="female">女</option>
        </select>

        {/* 身長 */}
        <input
          name="height"
          type="number"
          placeholder="身長(cm)"
          className={styles.input}
          onChange={handleChange}
          value={form.height}
        />

        {/* 現在体重 */}
        <input
          name="weight"
          type="number"
          placeholder="現在体重(kg)"
          className={styles.input}
          onChange={handleChange}
          value={form.weight}
        />

        {/* 活動レベル（選択） */}
        <select
          name="burnCal"
          className={styles.input}
          onChange={handleChange}
          value={form.burnCal}
        >
          <option value="" disabled hidden>
            活動レベルを選択
          </option>
          {ACTIVITY_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        {/* PFCコース */}
        <select
          name="pfcCourse"
          className={styles.input}
          onChange={handleChange}
          value={form.pfcCourse}
        >
          <option value="" disabled hidden>
            目標コースを選択
          </option>
          <option value="1">減量</option>
          <option value="2">維持</option>
          <option value="3">増量</option>
        </select>

        <button className={styles.buttonPrimary} onClick={handleSubmit}>
          登録
        </button>

        <p>{message}</p>
      </div>
    </div>
  );
}