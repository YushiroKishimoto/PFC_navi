import { useEffect, useState } from "react";
import styles from "./Analysis.module.css";
import { getWeeklyAnalysis, getMonthlyAnalysis } from "../../api/analysis";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ReferenceLine,
} from "recharts";

const formatDate = (targetDate) => {
  const y = targetDate.getFullYear();
  const m = String(targetDate.getMonth() + 1).padStart(2, "0");
  const d = String(targetDate.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const formatDisplayDate = (dateText) => {
  const date = new Date(dateText);
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${m}/${d}`;
};

const safe = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

export default function Analysis() {
  const [endDate, setEndDate] = useState(formatDate(new Date()));
  const [analysis, setAnalysis] = useState({
    startDate: "",
    endDate: "",
    recordDays: 0,
    achievementRate: 0,
    averageCal: 0,
    days: [],
    targetCal: 0,
  });
  const [message, setMessage] = useState("");

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setEndDate(selectedDate);
    fetchAnalysis(selectedDate);
  };

  const formatMonth = (targetDate) => {
    const y = targetDate.getFullYear();
    const m = String(targetDate.getMonth() + 1).padStart(2, "0");
    return `${y}-${m}`;
  };

  const [mode, setMode] = useState("weekly");
  const [targetMonth, setTargetMonth] = useState(formatMonth(new Date()));

  const fetchAnalysis = async () => {
    try {
      setMessage("");

      const res =
        mode === "weekly"
          ? await getWeeklyAnalysis(endDate)
          : await getMonthlyAnalysis(targetMonth);

      if (res?.resultCode === "SUCCESS") {
        const days = res?.data?.days ?? [];

        const chartData = days.map((day) => ({
          date: day.date,
          displayDate: formatDisplayDate(day.date),
          totalCal: safe(day.totalCal),
          totalPro: safe(day.totalPro),
          totalFat: safe(day.totalFat),
          totalCar: safe(day.totalCar),
        }));

        setAnalysis({
          startDate: res?.data?.startDate ?? "",
          endDate: res?.data?.endDate ?? "",
          recordDays: res?.data?.recordDays ?? 0,
          achievementRate: res?.data?.achievementRate ?? 0,
          averageCal: res?.data?.averageCal ?? 0,
          targetCal: res?.data?.targetCal ?? 0,
          days: chartData,
        });
      } else {
        setMessage(res?.message || "分析の取得に失敗しました");
        setAnalysis({
          startDate: "",
          endDate: "",
          recordDays: 0,
          achievementRate: 0,
          averageCal: 0,
          targetCal: 0,
          days: [],
        });
      }
    } catch (e) {
      console.error(e);
      setMessage("分析の取得に失敗しました");
      setAnalysis({
        startDate: "",
        endDate: "",
        recordDays: 0,
        achievementRate: 0,
        averageCal: 0,
        targetCal: 0,
        days: [],
      });
    }
  };

  useEffect(() => {
    fetchAnalysis();
  }, [mode, endDate, targetMonth]);


  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <div className={styles.modeTabs}>
          <button
            type="button"
            className={mode === "weekly" ? styles.activeMode : styles.modeButton}
            onClick={() => setMode("weekly")}
          >
            <h2>週間分析</h2>
          </button>

          <button
            type="button"
            className={mode === "monthly" ? styles.activeMode : styles.modeButton}
            onClick={() => setMode("monthly")}
          >
            <h2>月間分析</h2>
          </button>
        </div>
          <p>
            {analysis.startDate && analysis.endDate
              ? `${analysis.startDate} ～ ${analysis.endDate}`
              : "1週間の記録を確認できます"}
          </p>
        </div>
              
        

        <div className={styles.dateSearch}>
        {mode === "weekly" ? (
          <>
            <label>終了日</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className={styles.dateInput}
            />
          </>
  ) : (
    <>
      <label>対象月</label>
      <input
        type="month"
        value={targetMonth}
        onChange={(e) => setTargetMonth(e.target.value)}
        className={styles.dateInput}
      />
    </>
  )}
</div>
      </div>

      {message && <p className={styles.message}>{message}</p>}

      <div className={styles.summaryGrid}>
        <div className={styles.summaryCard}>
          <span>記録日数</span>
          <strong>{analysis.recordDays ?? 0} / 7日</strong>
        </div>

        <div className={styles.summaryCard}>
          <span>週間達成率</span>
          <strong>{analysis.achievementRate ?? 0}%</strong>
        </div>

        <div className={styles.summaryCard}>
          <span>平均カロリー</span>
          <strong>{analysis.averageCal ?? 0} kcal</strong>
        </div>
      </div>

      <div className={styles.card}>
        <h3>{mode === "weekly" ? "1週間のPFC記録" : "1か月のPFC記録"}</h3>

        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={analysis.days}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="displayDate" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalPro" name="P" fill="#8884d8" />
            <Bar dataKey="totalFat" name="F" fill="#82ca9d" />
            <Bar dataKey="totalCar" name="C" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.card}>
       <h3>{mode === "weekly" ? "1週間の総カロリー" : "1か月の総カロリー"}</h3>

        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={analysis.days}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="displayDate" />
            <YAxis />
            <Tooltip />
            <Legend />

            {analysis.targetCal > 0 && (
              <ReferenceLine
                y={analysis.targetCal}
                stroke="#e74c3c"
                strokeDasharray="5 5"
                label={`目標 ${analysis.targetCal}kcal`}
              />
            )}

            <Bar dataKey="totalCal" name="総カロリー" fill="#ff8042" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}