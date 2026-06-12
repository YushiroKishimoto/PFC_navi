import { useEffect, useState } from "react";
import styles from "./Analysis.module.css";
import { getWeeklyAnalysis } from "../../api/analysis";

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

  const fetchAnalysis = async (targetEndDate) => {
    try {
      setMessage("");

      const res = await getWeeklyAnalysis(targetEndDate);

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
          days: chartData,
          targetCal: res?.data?.targetCal ?? 0,
        });
      } else {
        setMessage(res?.message || "週間分析の取得に失敗しました");
        setAnalysis({
          startDate: "",
          endDate: "",
          recordDays: 0,
          achievementRate: 0,
          averageCal: 0,
          days: [],
          targetCal: 0,
        });
      }
    } catch (e) {
      console.error(e);
      setMessage("週間分析の取得に失敗しました");
      setAnalysis({
        startDate: "",
        endDate: "",
        days: [],
      });
    }
  };

  useEffect(() => {
    fetchAnalysis(endDate);
  }, []);

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setEndDate(selectedDate);
    fetchAnalysis(selectedDate);
  };


  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2>週間分析</h2>
          <p>
            {analysis.startDate && analysis.endDate
              ? `${analysis.startDate} ～ ${analysis.endDate}`
              : "1週間の記録を確認できます"}
          </p>
        </div>

        <div className={styles.dateSearch}>
          <label>終了日</label>
          <input
            type="date"
            value={endDate}
            onChange={handleDateChange}
            className={styles.dateInput}
          />
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
        <h3>1週間のPFC記録</h3>

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
        <h3>1週間の総カロリー</h3>

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