import styles from "./Dashboard.module.css";
import { useState, useEffect } from "react";
import { getDashboard } from "../../api/dashboard";
import { getMealRecords } from "../../api/mealRecord";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const MEAL_TYPES = [
  { key: "breakfast", label: "朝食" },
  { key: "lunch", label: "昼食" },
  { key: "dinner", label: "夕食" },
];

const safe = (v) => (typeof v === "number" ? v : 0);

// ★追加：mealType揺れ対策
const normalize = (v) => String(v ?? "").trim().toLowerCase();

export default function Dashboard() {
  const navigate = useNavigate();

  const [date, setDate] = useState(new Date());
  const [dashboard, setDashboard] = useState({});
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, "0");
      const d = String(date.getDate()).padStart(2, "0");
      const formatted = `${y}-${m}-${d}`;

      try {
        const [dashRes, mealRes] = await Promise.all([
          getDashboard(formatted),
          getMealRecords(formatted),
        ]);

        if (ignore) return;

        setDashboard(dashRes?.data ?? dashRes ?? {});
        setMeals(mealRes?.data?.meals ?? mealRes?.meals ?? []);
      } catch (e) {
        console.error(e);
        if (!ignore) {
          setDashboard({});
          setMeals([]);
        }
      }
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, [date]);

  const handleChange = (newDate) => {
    setDate(newDate);

    const y = newDate.getFullYear();
    const m = String(newDate.getMonth() + 1).padStart(2, "0");
    const d = String(newDate.getDate()).padStart(2, "0");

    navigate(`/dashboard?date=${y}-${m}-${d}`);
  };

  const pfc = {
    target: {
      p: safe(dashboard?.targetPro),
      f: safe(dashboard?.targetFat),
      c: safe(dashboard?.targetCar),
    },
    intake: {
      p: safe(dashboard?.actualPro),
      f: safe(dashboard?.actualFat),
      c: safe(dashboard?.actualCar),
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

      {/* ヘッダー */}
      <div className={styles.header}>
        <div>
          {date.toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            weekday: "long",
          })}
        </div>

        <div className={styles.scoreBox}>
          達成率{" "}
          <span className={styles.score}>
            {safe(dashboard?.achievementRate)}%
          </span>
        </div>
      </div>

      {/* 上段 */}
      <div className={styles.topGrid}>

        {/* カレンダー */}
        <div className={styles.calendar}>
          <DatePicker selected={date} onChange={handleChange} inline />
        </div>

        {/* サマリー */}
        <div className={styles.summaryCard}>
          <div className={styles.summaryMini}>
            <span>総カロリー</span>
            <strong>{safe(dashboard?.actualCal)} kcal</strong>
          </div>

          <div className={styles.summaryMini}>
            <span>P</span>
            <strong>{pfc.intake.p} / {pfc.target.p}</strong>
          </div>

          <div className={styles.summaryMini}>
            <span>F</span>
            <strong>{pfc.intake.f} / {pfc.target.f}</strong>
          </div>

          <div className={styles.summaryMini}>
            <span>C</span>
            <strong>{pfc.intake.c} / {pfc.target.c}</strong>
          </div>
        </div>

        {/* 円＋棒グラフ */}
        <div className={styles.chartCard}>

          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={65}
                innerRadius={40}
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>

              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="14"
                fontWeight="bold"
              >
                PFC
              </text>
            </PieChart>
          </ResponsiveContainer>

          <ResponsiveContainer width="100%" height={180}>
            <BarChart
              data={barData}
              layout="vertical"
              margin={{ top: 10, right: 30, left: 30, bottom: 10 }}
            >
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" />
              <Tooltip />

              <Bar dataKey="target" fill="#e0e0e0" barSize={16} />
              <Bar dataKey="intake" fill="#82ca9d" barSize={16} />
            </BarChart>
          </ResponsiveContainer>

        </div>
      </div>

      {/* 食事 */}
      <div className={styles.bottomGrid}>
        {MEAL_TYPES.map(({ key, label }) => {

          const meal = meals.find(
            (m) => normalize(m?.mealType) === key
          );

          // ★追加：複数形式対応
          const items =
            meal?.items ??
            meal?.mealItems ??
            meal?.foods ??
            [];

          return (
            <div key={key} className={styles.mealCard}>
              <h4>{label}</h4>

              <div className={styles.foodList}>
                {items.length > 0 ? (
                  items.map((item) => (
                    <div key={item.id} className={styles.foodItem}>
                      <span>
                        {item.name ?? item.foodName ?? item.itemName ?? "名称未設定"}
                      </span>

                      <span>{safe(item.cal)} kcal</span>

                      <span>
                        P:{safe(item.pro)} F:{safe(item.fat)} C:{safe(item.car)}
                      </span>
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

                  navigate(`/${y}-${m}-${d}/meal/${key}`);
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