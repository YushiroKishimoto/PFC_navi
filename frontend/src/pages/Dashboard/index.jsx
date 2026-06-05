import styles from "./Dashboard.module.css";
import { useState, useEffect } from "react";
import { getDashboard } from "../../api/dashboard";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

export default function Dashboard() {
  const navigate = useNavigate();

  const [date, setDate] = useState(new Date());
  const [dashboard, setDashboard] = useState(null);

  // =========================
  // API取得
  // =========================
  useEffect(() => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    const formatted = `${y}-${m}-${d}`;

    getDashboard(formatted).then((data) => setDashboard(data));
  }, [date]);

  // =========================
  // 日付変更
  // =========================
  const handleChange = (newDate) => {
    setDate(newDate);

    const y = newDate.getFullYear();
    const m = String(newDate.getMonth() + 1).padStart(2, "0");
    const d = String(newDate.getDate()).padStart(2, "0");

    const formatted = `${y}-${m}-${d}`;

    navigate(`/${formatted}`);
  };

  // =========================
  // スコア
  // =========================
  const score = dashboard?.achievementRate ?? 0;

  // =========================
  // PFC
  // =========================
  const pfc = {
    target: {
      p: dashboard?.targetPro ?? 0,
      f: dashboard?.targetFat ?? 0,
      c: dashboard?.targetCar ?? 0,
    },
    intake: {
      p: dashboard?.actualPro ?? 0,
      f: dashboard?.actualFat ?? 0,
      c: dashboard?.actualCar ?? 0,
    },
  };

  const pieData = [
    { name: "P", value: pfc.intake.p },
    { name: "F", value: pfc.intake.f },
    { name: "C", value: pfc.intake.c },
  ];

  const barData = [
    { name: "P", target: pfc.target.p, intake: pfc.intake.p },
    { name: "F", target: pfc.target.f, intake: pfc.intake.f },
    { name: "C", target: pfc.target.c, intake: pfc.intake.c },
  ];

  // =========================
  // 仮食事
  // =========================
  const meals = {
    breakfast: {
      title: "朝食",
      items: [{ name: "オートミール", kcal: 300, p: 15, f: 8, c: 40 }],
    },
    lunch: {
      title: "昼食",
      items: [{ name: "鶏むね肉", kcal: 400, p: 35, f: 10, c: 20 }],
    },
    dinner: {
      title: "夕食",
      items: [{ name: "魚", kcal: 350, p: 25, f: 15, c: 5 }],
    },
  };

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

  return (
    <div className={styles.container}>

      {/* =========================
          スコア
      ========================= */}
      <div className={styles.score}>
        今日の得点 {score}点
      </div>

      {/* =========================
          カレンダー
      ========================= */}
      <div className={styles.calendar}>
        <DatePicker
          selected={date}
          onChange={handleChange}
          inline
        />
      </div>

      {/* =========================
          上段グラフ
      ========================= */}
      <div className={styles.topGrid}>

        <div className={styles.card}>
          <h3>PFC比率</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} dataKey="value" outerRadius={80}>
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.card}>
          <h3>PFC比較</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="target" />
              <Bar dataKey="intake" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* =========================
          食事リスト
      ========================= */}
      <div className={styles.bottomGrid}>

        {Object.entries(meals).map(([key, meal]) => (
          <div key={key} className={styles.mealCard}>
            <h4>{meal.title}</h4>

            <div className={styles.foodList}>
              {meal.items.map((item, i) => (
                <div key={i} className={styles.foodItem}>
                  <span>{item.name}</span>
                  <span>{item.kcal} kcal</span>
                  <span>P:{item.p} F:{item.f} C:{item.c}</span>
                </div>
              ))}
            </div>

            <button
              className={styles.addButton}
              onClick={() => {
                const y = date.getFullYear();
                const m = String(date.getMonth() + 1).padStart(2, "0");
                const d = String(date.getDate()).padStart(2, "0");

                const formatted = `${y}-${m}-${d}`;

                navigate(`/${formatted}/meal`);
              }}
            >
              ＋ 追加
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}