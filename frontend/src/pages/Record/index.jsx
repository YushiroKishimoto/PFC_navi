import { useState, useMemo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Record.module.css";
import { createMealRecord } from "../../api/mealRecord";
import { getRecommendations } from "../../api/recommendation";

export default function Record() {
  const navigate = useNavigate();
  const { date, mealType } = useParams(); // ← mealType追加

  const currentDate = date ?? new Date().toISOString().split("T")[0];

  // =========================
  // 仮DB（食材・セット検索API完成後に置き換え）
  // =========================
  const foodDB = [
    { id: 1, name: "卵", kcal: 90, p: 7, f: 6, c: 1 },
    { id: 2, name: "鶏むね肉", kcal: 200, p: 30, f: 5, c: 0 },
    { id: 3, name: "白米", kcal: 250, p: 5, f: 1, c: 55 },
  ];

  const setDB = [
    {
      id: 1,
      name: "朝食セット",
      items: [
        { name: "卵", kcal: 90, p: 7, f: 6, c: 1 },
        { name: "白米", kcal: 250, p: 5, f: 1, c: 55 },
      ],
    },
  ];

  // =========================
  // state
  // =========================
  const [foodSearch, setFoodSearch] = useState("");
  const [setSearch, setSetSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  // =========================
  // レコメンド取得
  // =========================
  useEffect(() => {
    getRecommendations(currentDate)
      .then((data) => setRecommendations(data))
      .catch(() => setRecommendations([]));
  }, [currentDate]);

  // =========================
  // filter
  // =========================
  const filteredFoods = useMemo(() => {
    return foodDB.filter((i) => i.name.includes(foodSearch));
  }, [foodSearch]);

  const filteredSets = useMemo(() => {
    return setDB.filter((i) => i.name.includes(setSearch));
  }, [setSearch]);

  // =========================
  // add
  // =========================
  const addFood = (item) => {
    setSelected([...selected, { ...item, id: Date.now() }]);
  };

  const addSet = (set) => {
    const expanded = set.items.map((i) => ({
      ...i,
      id: Date.now() + Math.random(),
    }));
    setSelected([...selected, ...expanded]);
  };

  // バックエンドのフィールド名（totalPro等）をローカル形式（p等）にマッピング
  const addRecommendation = (rec) => {
    setSelected([...selected, {
      id: Date.now(),
      name: rec.name,
      kcal: rec.totalCal,
      p: rec.totalPro,
      f: rec.totalFat,
      c: rec.totalCar,
    }]);
  };

  // =========================
  // total
  // =========================
  const total = selected.reduce(
    (acc, cur) => {
      acc.kcal += cur.kcal;
      acc.p += cur.p;
      acc.f += cur.f;
      acc.c += cur.c;
      return acc;
    },
    { kcal: 0, p: 0, f: 0, c: 0 }
  );

  // =========================
  // recent
  // =========================
  const recent = [
    { name: "卵焼き", qty: "2個" },
    { name: "ごはん", qty: "150g" },
  ];

  // =========================
  // 保存
  // =========================
  const handleSave = async () => {
    const payload = {
      recordDate: currentDate,
      mealType: mealType,
      items: selected.map((i) => ({
        name: i.name,
        cal: i.kcal,
        pro: i.p,
        fat: i.f,
        car: i.c,
      })),
      totalCal: total.kcal,
      totalPro: total.p,
      totalFat: total.f,
      totalCar: total.c,
    };

    try {
      await createMealRecord(payload);
      navigate(`/${currentDate}`);
    } catch (e) {
      console.error("保存失敗:", e);
    }
  };

  // =========================
  // mealTypeの日本語ラベル
  // =========================
  const mealLabel = { breakfast: "朝食", lunch: "昼食", dinner: "夕食" };

  return (
    <div className={styles.container}>

      <div className={styles.header}>
        <h2>{currentDate} {mealLabel[mealType] ?? ""} の記録</h2>
      </div>

      <div className={styles.grid}>

        {/* 左 */}
        <div className={styles.left}>
          <h3>食材検索</h3>
          <input
            value={foodSearch}
            onChange={(e) => setFoodSearch(e.target.value)}
          />
          <div className={styles.list}>
            {filteredFoods.map((item) => (
              <div key={item.id} className={styles.item}>
                <span>{item.name}</span>
                <button onClick={() => addFood(item)}>＋</button>
              </div>
            ))}
          </div>

          <div className={styles.selectedBox}>
            {selected.map((i) => (
              <div key={i.id}>
                {i.name} {i.kcal}kcal
              </div>
            ))}
          </div>

          <div className={styles.total}>
            合計 P:{total.p} F:{total.f} C:{total.c}
          </div>

          <div className={styles.recent}>
            <h4>最近の食事</h4>
            {recent.map((r, i) => (
              <div key={i}>{r.name} {r.qty}</div>
            ))}
          </div>
        </div>

        {/* 右 */}
        <div className={styles.right}>
          <h3>セット検索</h3>
          <input
            value={setSearch}
            onChange={(e) => setSetSearch(e.target.value)}
          />
          <div className={styles.setList}>
            {filteredSets.map((set) => (
              <div key={set.id} className={styles.setCard}>
                <div>{set.name}</div>
                <button onClick={() => addSet(set)}>追加</button>
              </div>
            ))}
          </div>

          {/* レコメンド */}
          <h3>おすすめセット</h3>
          <div className={styles.setList}>
            {recommendations.length === 0 ? (
              <div>おすすめはありません</div>
            ) : (
              recommendations.map((rec) => (
                <div key={rec.id} className={styles.setCard}>
                  <div>{rec.name}</div>
                  <div>P:{rec.totalPro} F:{rec.totalFat} C:{rec.totalCar}</div>
                  <button onClick={() => addRecommendation(rec)}>追加</button>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      <div className={styles.footer}>
        <button className={styles.primary} onClick={() => navigate("/items")}>
          食材登録
        </button>
        <button className={styles.secondary} onClick={() => navigate("/set")}>
          セット登録
        </button>
        <button className={styles.saveButton} onClick={handleSave}>
          保存
        </button>
      </div>

    </div>
  );
}