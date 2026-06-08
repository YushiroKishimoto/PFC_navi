import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Record.module.css";
import { createMealRecord } from "../../api/mealRecord";
import { searchItems } from "../../api/item";
import { searchSets } from "../../api/set";

export default function Record() {
  const navigate = useNavigate();
  const { date, mealType } = useParams(); // ← mealType追加

  const currentDate = date ?? new Date().toISOString().split("T")[0];

  const [mealType, setMealType] = useState("breakfast");

  const [foodSearch, setFoodSearch] = useState("");
  const [setSearch, setSetSearch] = useState("");

  const [foodResults, setFoodResults] = useState([]);
  const [setResults, setSetResults] = useState([]);

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

  const [message, setMessage] = useState("");

  const handleFoodSearch = async () => {
    console.log("食材検索ボタン押下:", foodSearch);

    if (!foodSearch.trim()) {
      setFoodResults([]);
      return;
    }

    try {
      const res = await searchItems(foodSearch);
      console.log("食材検索結果:", res);

      setFoodResults(res?.data?.items ?? []);
    } catch (e) {
      console.error("食材検索エラー:", e);
      setMessage("食材検索に失敗しました");
    }
  };

  const handleSetSearch = async () => {
    if (!setSearch.trim()) {
      setSetResults([]);
      return;
    }

    try {
      const res = await searchSets(setSearch);
      setSetResults(res?.data?.sets ?? []);
    } catch (e) {
      console.error(e);
      setMessage("セット検索に失敗しました");
    }
  };

  const addFood = (item) => {
    setSelected([
      ...selected,
      {
        key: `${item.source}-${item.id}-${Date.now()}`,
        source: item.source,
        itemId: item.id,
        name: item.name,
        amount: item.amount,
        baseAmount: item.amount,
        cal: item.cal,
        pro: item.pro,
        fat: item.fat,
        car: item.car,
      },
    ]);
  };

  const addSet = (set) => {
    setSelected([
      ...selected,
      {
        key: `set-${set.id}-${Date.now()}`,
        source: "set",
        itemId: set.id,
        name: set.name,
        amount: 1,
        baseAmount: 1,
        cal: set.totalCal,
        pro: set.totalPro,
        fat: set.totalFat,
        car: set.totalCar,
      },
    ]);
  };

  const removeSelected = (key) => {
    setSelected(selected.filter((item) => item.key !== key));
  };

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

  const handleSave = async () => {
    if (selected.length === 0) {
      setMessage("記録する食材またはセットを追加してください");
      return;
    }

    try {
      const payload = {
        recordDate: currentDate,
        mealType: mealType,
        items: selected.map((item) => ({
          source: item.source,
          itemId: item.itemId,
          amount: item.amount,
        })),
      };

      const res = await createMealRecord(payload);
      console.log("record response:", res);

      if (res?.resultCode === "SUCCESS") {
        navigate(`/${currentDate}`);
      } else {
        setMessage(res?.message || "保存に失敗しました");
      }
    } catch (e) {
      console.error(e);
      setMessage("保存に失敗しました");
    }
  };

  // =========================
  // mealTypeの日本語ラベル
  // =========================
  const mealLabel = { breakfast: "朝食", lunch: "昼食", dinner: "夕食" };

  return (
    <div className={styles.container}>
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

      <div className={styles.grid}>
        <div className={styles.left}>
          <h3>食材検索</h3>
          <input
            value={foodSearch}
            onChange={(e) => setFoodSearch(e.target.value)}
            placeholder="食材名を入力"
          />

          <button onClick={handleFoodSearch}>検索</button>

          <div className={styles.list}>
            {foodResults.map((item) => (
              <div key={`${item.source}-${item.id}`} className={styles.item}>
                <div>
                  <span>{item.name}</span>
                  <div>
                    {item.source} / {item.amount}g / {item.cal}kcal
                  </div>
                  <div>
                    P:{item.pro} F:{item.fat} C:{item.car}
                  </div>
                </div>

                <button onClick={() => addFood(item)}>＋</button>
              </div>
            ))}
          </div>

          <div className={styles.selectedBox}>
            <h4>追加した内容</h4>

            {selected.map((item) => (
              <div key={item.key}>
                {item.name} / {item.amount}
                {item.source === "set" ? "セット" : "g"} / {item.cal}kcal
                <button onClick={() => removeSelected(item.key)}>削除</button>
              </div>
            ))}
          </div>

          <div className={styles.total}>
            合計 P:{total.pro} F:{total.fat} C:{total.car} / {total.cal}kcal
          </div>
        </div>

        <div className={styles.right}>
          <h3>セット検索</h3>
          <input
            value={setSearch}
            onChange={(e) => setSetSearch(e.target.value)}
            placeholder="セット名を入力"
          />

          <button onClick={handleSetSearch}>検索</button>

          <div className={styles.setList}>
            {setResults.map((set) => (
              <div key={set.id} className={styles.setCard}>
                <div>{set.name}</div>
                <div>{set.totalCal}kcal</div>
                <div>
                  P:{set.totalPro} F:{set.totalFat} C:{set.totalCar}
                </div>

                {set.items && set.items.length > 0 && (
                  <div>
                    {set.items.map((item) => (
                      <div key={item.id}>
                        ・{item.name} {item.amount}g
                      </div>
                    ))}
                  </div>
                )}

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

      {message && <p>{message}</p>}
    </div>
  );
}