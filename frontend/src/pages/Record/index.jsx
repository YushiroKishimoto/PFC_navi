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
        key: `${item.source}-${item.id}-${Date.now()}`,
        source: item.source,
        itemId: item.id,
        name: item.name,
        amount: item.amount,
        baseAmount: item.amount,
        baseCal: item.cal,
        basePro: item.pro,
        baseFat: item.fat,
        baseCar: item.car,
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
        baseAmount: 1,
        baseCal: set.totalCal,
        basePro: set.totalPro,
        baseFat: set.totalFat,
        baseCar: set.totalCar,
      },
    ]);
  };

  const addRecommendation = (rec) => {
    setSelected((prev) => [
      ...prev,
      {
        key: `set-${rec.id}-${Date.now()}`,
        source: "set",
        itemId: rec.id,
        name: rec.name,
        amount: 1,
        baseAmount: 1,
        baseCal: rec.totalCal,
        basePro: rec.totalPro,
        baseFat: rec.totalFat,
        baseCar: rec.totalCar,
      },
    ]);
  };

  const removeSelected = (key) => {
    setSelected((prev) => prev.filter((i) => i.key !== key));
  };

  // 数量変更（基準量に対する比率でPFCを再計算）
  const updateAmount = (key, value) => {
    const newAmount = Number(value);
    if (Number.isNaN(newAmount) || newAmount < 0) return;

    setSelected((prev) =>
      prev.map((i) => (i.key === key ? { ...i, amount: newAmount } : i))
    );
  };

  // 表示用のスケーリング計算
  const scaled = (item) => {
    const ratio = item.baseAmount > 0 ? item.amount / item.baseAmount : 0;
    return {
      cal: Math.round(item.baseCal * ratio),
      pro: Math.round(item.basePro * ratio),
      fat: Math.round(item.baseFat * ratio),
      car: Math.round(item.baseCar * ratio),
    };
  };

  // =========================
  // 合計
  // =========================
  const total = selected.reduce(
    (acc, cur) => {
      const s = scaled(cur);
      acc.cal += s.cal;
      acc.pro += s.pro;
      acc.fat += s.fat;
      acc.car += s.car;
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

      console.log("保存payload", payload);

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
        <h2 className={styles.headerTitle}>{currentDate} の記録</h2>

        <select
          value={mealType}
          onChange={(e) => setMealType(e.target.value)}
          className={styles.mealSelect}
        >
          <option value="breakfast">朝食</option>
          <option value="lunch">昼食</option>
          <option value="dinner">夕食</option>
        </select>
      </div>

      {/* メイン2カラム */}
      <div className={styles.grid}>

        {/* 左：検索（タブで食材/セット切替） */}
        <div className={styles.left}>
          <div className={styles.tabs}>
            <button
              onClick={() => setTab("foodMeal")}
              className={tab === "foodMeal" ? styles.activeTab : styles.tabButton}
            >
              食材・食事
            </button>

            <button
              onClick={() => setTab("set")}
              className={tab === "set" ? styles.activeTab : styles.tabButton}
            >
              セット
            </button>
          </div>

          {tab === "foodMeal" && (
            <>
              <div className={styles.searchRow}>
                <input
                  className={styles.searchInput}
                  value={foodSearch}
                  placeholder="食材名で検索"
                  onChange={(e) => setFoodSearch(e.target.value)}
                />
                <button className={styles.searchButton} onClick={handleFoodSearch}>
                  検索
                </button>
              </div>

              <div className={styles.list}>
                {foodResults.map((item) => (
                  <div key={item.id} className={styles.item}>
                    <div className={styles.itemInfo}>
                      <span className={styles.itemName}>{item.name}</span>
                      <span className={styles.itemPfc}>
                        P:{item.pro} F:{item.fat} C:{item.car}　{item.cal}kcal
                      </span>
                    </div>
                    <button className={styles.addButton} onClick={() => addFood(item)}>
                      ＋
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {tab === "set" && (
            <>
              <div className={styles.searchRow}>
                <input
                  className={styles.searchInput}
                  value={setSearch}
                  placeholder="セット名で検索"
                  onChange={(e) => setSetSearch(e.target.value)}
                />
                <button className={styles.searchButton} onClick={handleSetSearch}>
                  検索
                </button>
              </div>

              <div className={styles.list}>
                {setResults.map((set) => (
                  <div key={set.id} className={styles.item}>
                    <div className={styles.itemInfo}>
                      <span className={styles.itemName}>{set.name}</span>
                      <span className={styles.itemPfc}>
                        P:{set.totalPro} F:{set.totalFat} C:{set.totalCar}　{set.totalCal}kcal
                      </span>
                    </div>
                    <button className={styles.addButton} onClick={() => addSet(set)}>
                      ＋
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* 右：上下分割 */}
        <div className={styles.rightColumn}>

          {/* 右上：おすすめ */}
          <div className={styles.rightTop}>
            <h3 className={styles.sectionTitle}>おすすめ</h3>

            <div className={styles.list}>
              {recommendations.length === 0 && (
                <p className={styles.empty}>おすすめはまだありません</p>
              )}

              {recommendations.map((rec) => (
                <div key={rec.id} className={styles.item}>
                  <div className={styles.itemInfo}>
                    <span className={styles.itemName}>{rec.name}</span>
                    <span className={styles.itemPfc}>
                      P:{rec.totalPro} F:{rec.totalFat} C:{rec.totalCar}　{rec.totalCal}kcal
                    </span>
                  </div>
                  <button className={styles.addButton} onClick={() => addRecommendation(rec)}>
                    ＋
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 右下：選択中 */}
          <div className={styles.rightBottom}>
            <h3 className={styles.sectionTitle}>選択中</h3>

            <div className={styles.selectedBox}>
              {selected.length === 0 && (
                <p className={styles.empty}>食材やセットを追加してください</p>
              )}

              {selected.map((i) => {
                const s = scaled(i);
                return (
                  <div key={i.key} className={styles.selectedItem}>
                    <div className={styles.selectedHeader}>
                      <span className={styles.itemName}>{i.name}</span>
                      <button
                        className={styles.removeButton}
                        onClick={() => removeSelected(i.key)}
                      >
                        削除
                      </button>
                    </div>

                    <div className={styles.selectedBody}>
                      <div className={styles.amountControl}>
                        <span className={styles.amountLabel}>数量</span>
                        <input
                          type="number"
                          min="0"
                          className={styles.amountInput}
                          value={i.amount}
                          onChange={(e) => updateAmount(i.key, e.target.value)}
                        />
                      </div>

                      <span className={styles.itemPfc}>
                        P:{s.pro} F:{s.fat} C:{s.car}　{s.cal}kcal
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 合計カード */}
            <div className={styles.totalCard}>
              <div className={styles.totalTitle}>合計</div>
              <div className={styles.totalRow}>
                <span>P: {total.pro}g</span>
                <span>F: {total.fat}g</span>
                <span>C: {total.car}g</span>
                <span className={styles.totalCal}>{total.cal} kcal</span>
              </div>
            </div>
          </div>
        </div>
      </div>

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

      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}