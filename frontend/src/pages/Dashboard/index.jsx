import styles from "./Dashboard.module.css";
import { useState, useEffect } from "react";
import { getDashboard } from "../../api/dashboard";
import { getMealRecords } from "../../api/mealRecord";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

const MEAL_TYPES = [
  { key: "breakfast", label: "朝食" },
  { key: "lunch", label: "昼食" },
  { key: "dinner", label: "夕食" },
];

export default function Dashboard() {
  const navigate = useNavigate();

  const [date, setDate] = useState(new Date());
  const [dashboard, setDashboard] = useState(null);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    const formatted = `${y}-${m}-${d}`;

    getDashboard(formatted).then((data) => setDashboard(data));
    getMealRecords(formatted).then((data) => setMeals(data.meals ?? []));
  }, [date]);

  const handleChange = (newDate) => {
    setDate(newDate);
    const y = newDate.getFullYear();
    const m = String(newDate.getMonth() + 1).padStart(2, "0");
    const d = String(newDate.getDate()).padStart(2, "0");
    navigate(`/${y}-${m}-${d}`);
  };

  const score = dashboard?.achievementRate ?? 0;

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

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

  return (
    <div className={styles.container}>

      <div className={styles.header}>
        <div className={styles.dateText}>
          {date.toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            weekday: "long",
          })}
        </div>
        <div className={styles.scoreBox}>
          <span>スコア</span>
          <span className={styles.score}>{score}%</span>
        </div>
      </div>

      <div className={styles.summaryBox}>
        <div className={styles.summaryRow}>
          <div className={styles.summaryItem}>
            <span>総カロリー</span>
            <strong>{dashboard?.actualCal ?? 0} kcal</strong>
          </div>
          <div className={styles.summaryItem}>
            <span>P</span>
            <strong>{pfc.intake.p} / {pfc.target.p}</strong>
          </div>
          <div className={styles.summaryItem}>
            <span>F</span>
            <strong>{pfc.intake.f} / {pfc.target.f}</strong>
          </div>
          <div className={styles.summaryItem}>
            <span>C</span>
            <strong>{pfc.intake.c} / {pfc.target.c}</strong>
          </div>
        </div>
      </div>

      <div className={styles.topGrid}>
        <div className={styles.calendar}>
          <DatePicker selected={date} onChange={handleChange} inline />
        </div>
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

      <div className={styles.bottomGrid}>
        {MEAL_TYPES.map(({ key, label }) => {
          const meal = meals.find((m) => m.mealType === key);
          return (
            <div key={key} className={styles.mealCard}>
              <h4>{label}</h4>
              <div className={styles.foodList}>
                {meal ? (
                  meal.items.map((item) => (
                    <div key={item.id} className={styles.foodItem}>
                      <span>{item.name}</span>
                      <span>{item.cal} kcal</span>
                      <span>P:{item.pro} F:{item.fat} C:{item.car}</span>
                    </div>
                  ))
                ) : (
                  <div className={styles.empty}>記録なし</div>
                )}
              </div>
              <button
                className={styles.addButton}
                onClick={() => {
                  const y = date.getFullYear();
                  const m = String(date.getMonth() + 1).padStart(2, "0");
                  const d = String(date.getDate()).padStart(2, "0");
                  navigate(`/${y}-${m}-${d}/meal/${key}`); // ← ここを修正
                }}
              >
                ＋ 追加
              </button>
            </div>
          );
        })}
      </div>

    </div>
  );
}
