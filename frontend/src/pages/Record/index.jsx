import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Record.module.css";

import { createMealRecord } from "../../api/mealRecord";
import { searchItems } from "../../api/item";
import { getSetitem } from "../../api/set";
import { getRecommendations } from "../../api/recommendation";

export default function Record() {
  const navigate = useNavigate();
  const { date, mealType: mealTypeParam } = useParams();

  const currentDate = date ?? new Date().toISOString().split("T")[0];

  // =========================
  // state
  // =========================
  const [tab, setTab] = useState("foodMeal");

  const [mealType, setMealType] = useState(mealTypeParam ?? "breakfast");

  const [foodSearch, setFoodSearch] = useState("");
  const [setSearch, setSetSearch] = useState("");

  const [foodResults, setFoodResults] = useState([]);
  const [setResults, setSetResults] = useState([]);

  const [selected, setSelected] = useState([]);

  const [recommendations, setRecommendations] = useState([]);

  const [message, setMessage] = useState("");

  // =========================
  // レコメンド
  // =========================
  useEffect(() => {
    getRecommendations(currentDate)
      .then((data) => setRecommendations(data ?? []))
      .catch(() => setRecommendations([]));
  }, [currentDate]);

  // =========================
  // 食材検索
  // =========================
  const handleFoodSearch = async () => {
    if (!foodSearch.trim()) {
      setFoodResults([]);
      return;
    }

    try {
      const res = await searchItems(foodSearch);
      setFoodResults(res?.data?.items ?? []);
    } catch {
      setMessage("食材検索失敗");
    }
  };

  // =========================
  // セット検索
  // =========================
  const handleSetSearch = async () => {
    if (!setSearch.trim()) {
      setSetResults([]);
      return;
    }

    try {
      const res = await getSetitem(setSearch);
      setSetResults(res?.data?.sets ?? []);
    } catch {
      setMessage("セット検索失敗");
    }
  };

  // =========================
  // 追加処理
  // =========================
  const addFood = (item) => {
    setSelected((prev) => [
      ...prev,
      {
        key: `food-${item.id}-${Date.now()}`,
        source: "food",
        itemId: item.id,
        name: item.name,
        amount: item.amount,
        cal: item.cal,
        pro: item.pro,
        fat: item.fat,
        car: item.car,
      },
    ]);
  };

  const addSet = (set) => {
    setSelected((prev) => [
      ...prev,
      {
        key: `set-${set.id}-${Date.now()}`,
        source: "set",
        itemId: set.id,
        name: set.name,
        amount: 1,
        cal: set.totalCal,
        pro: set.totalPro,
        fat: set.totalFat,
        car: set.totalCar,
      },
    ]);
  };

  const addRecommendation = (rec) => {
    setSelected((prev) => [
      ...prev,
      {
        key: `rec-${rec.id}-${Date.now()}`,
        source: "food",
        itemId: rec.id,
        name: rec.name,
        amount: 1,
        cal: rec.totalCal,
        pro: rec.totalPro,
        fat: rec.totalFat,
        car: rec.totalCar,
      },
    ]);
  };

  const removeSelected = (key) => {
    setSelected((prev) => prev.filter((i) => i.key !== key));
  };

  // =========================
  // 合計
  // =========================
  const total = selected.reduce(
    (acc, cur) => {
      acc.cal += Number(cur.cal);
      acc.pro += Number(cur.pro);
      acc.fat += Number(cur.fat);
      acc.car += Number(cur.car);
      return acc;
    },
    { cal: 0, pro: 0, fat: 0, car: 0 }
  );

  // =========================
  // 保存
  // =========================
  const handleSave = async () => {
    if (selected.length === 0) {
      setMessage("追加してください");
      return;
    }

    try {
      const payload = {
        recordDate: currentDate,
        mealType,
        items: selected.map((i) => ({
          source: i.source,
          itemId: i.itemId,
          amount: i.amount,
        })),
      };

      const res = await createMealRecord(payload);

      if (res?.resultCode === "SUCCESS") {
        navigate(`/${currentDate}`);
      } else {
        setMessage(res?.message || "保存失敗");
      }
    } catch {
      setMessage("保存失敗");
    }
  };

  // =========================
  // UI
  // =========================
  return (
    <div className={styles.container}>

      {/* ヘッダー */}
      <div className={styles.header}>
        <h2>{currentDate} の記録</h2>

        <select
          value={mealType}
          onChange={(e) => setMealType(e.target.value)}
          className={styles.input}
        >
          <option value="breakfast">朝食</option>
          <option value="lunch">昼食</option>
          <option value="dinner">夕食</option>
        </select>
      </div>

      {/* タブ（2つだけ） */}
      <div className={styles.tabs}>
        <button
          onClick={() => setTab("foodMeal")}
          className={tab === "foodMeal" ? styles.activeTab : ""}
        >
          食材・食事
        </button>

        <button
          onClick={() => setTab("set")}
          className={tab === "set" ? styles.activeTab : ""}
        >
          セット
        </button>
      </div>

      {/* =========================
          食材・食事タブ
      ========================= */}
      {tab === "foodMeal" && (
        <div className={styles.grid}>

          {/* 左：食材 + レコメンド */}
          <div className={styles.left}>
            <h3>食材検索</h3>

            <input
              value={foodSearch}
              onChange={(e) => setFoodSearch(e.target.value)}
            />
            <button onClick={handleFoodSearch}>検索</button>

            <div className={styles.list}>
              {foodResults.map((item) => (
                <div key={item.id} className={styles.item}>
                  <span>{item.name}</span>
                  <button onClick={() => addFood(item)}>＋</button>
                </div>
              ))}
            </div>

            <h3>おすすめ</h3>
            <div className={styles.list}>
              {recommendations.map((rec) => (
                <div key={rec.id} className={styles.item}>
                  <span>{rec.name}</span>
                  <button onClick={() => addRecommendation(rec)}>＋</button>
                </div>
              ))}
            </div>
          </div>

          {/* 右：選択 */}
          <div className={styles.right}>
            <h3>選択中</h3>

            <div>
              {selected.map((i) => (
                <div key={i.key}>
                  {i.name}
                  <button onClick={() => removeSelected(i.key)}>削除</button>
                </div>
              ))}
            </div>

            <div>
              P:{total.pro} F:{total.fat} C:{total.car} / {total.cal}
            </div>
          </div>
        </div>
      )}

      {/* =========================
          セットタブ
      ========================= */}
      {tab === "set" && (
        <div className={styles.grid}>

          <div className={styles.left}>
            <h3>セット検索</h3>

            <input
              value={setSearch}
              onChange={(e) => setSetSearch(e.target.value)}
            />
            <button onClick={handleSetSearch}>検索</button>

            <div className={styles.list}>
              {setResults.map((set) => (
                <div key={set.id} className={styles.item}>
                  <span>{set.name}</span>
                  <button onClick={() => addSet(set)}>＋</button>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.right}>
            <h3>選択中</h3>

            <div>
              {selected.map((i) => (
                <div key={i.key}>
                  {i.name}
                  <button onClick={() => removeSelected(i.key)}>削除</button>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* フッター */}
      <div className={styles.footer}>
        <button className={styles.saveButton} onClick={handleSave}>
          保存
        </button>

        <button className={styles.primary} onClick={() => navigate("/items")}>
          食材登録
        </button>

        <button className={styles.secondary} onClick={() => navigate("/set")}>
          セット登録
        </button>
      </div>

      {message && <p>{message}</p>}
    </div>
  );
}