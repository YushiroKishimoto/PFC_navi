import styles from "./Today.module.css";
import { useNavigate } from "react-router-dom";
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

export default function Today() {
  const navigate = useNavigate();

  const today = new Date();

  const formattedDate = new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "long",
  }).format(today);

  const score = 100;

  const pfc = {
    target: { p: 120, f: 60, c: 200 },
    intake: { p: 90, f: 50, c: 180 },
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

  const meals = {
    breakfast: {
      title: "朝食",
      items: [
        { name: "オートミール", kcal: 300, p: 15, f: 8, c: 40 },
      ],
    },
    lunch: {
      title: "昼食",
      items: [
        { name: "鶏むね肉", kcal: 400, p: 35, f: 10, c: 20 },
      ],
    },
    dinner: {
      title: "夕食",
      items: [
        { name: "魚", kcal: 350, p: 25, f: 15, c: 5 },
      ],
    },
  };

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

  return (
    <div className={styles.container}>

      <div className={styles.header}>
        <h2>{formattedDate}</h2>
        <div className={styles.score}>今日の得点 {score}点</div>
      </div>

      <div className={styles.topGrid}>
        <div className={styles.card}>
          <h3>カレンダー</h3>
          <div className={styles.calendarMock}>
            {Array.from({ length: 30 }).map((_, i) => (
              <div key={i} className={styles.dayBox}>
                {i + 1}
              </div>
            ))}
          </div>
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

            {/* 追加ボタン */}
            <button
              className={styles.addButton}
              onClick={() => navigate("/items")}
            >
              ＋ 追加
            </button>

          </div>
        ))}
      </div>

    </div>
  );
}