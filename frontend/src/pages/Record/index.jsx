import { useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Record.module.css";

export default function Record() {
  const navigate = useNavigate();
  const { date } = useParams();

  // =========================
  // 日付（URL優先）
  // =========================
  const currentDate = date ?? new Date().toISOString().split("T")[0];

  // =========================
  // 仮DB
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
  // 保存（追加）
  // =========================
  const handleSave = () => {
    const payload = {
      date: currentDate,
      items: selected,
      total,
    };

    console.log("SAVE:", payload);

    // TODO: API保存に置き換え
    // await api.post("/records", payload);

    // ダッシュボードへ戻る
    navigate(`/${currentDate}`);
  };

  return (
    <div className={styles.container}>

      {/* ヘッダー */}
      <div className={styles.header}>
        <h2>{currentDate} の記録</h2>
      </div>

      {/* メイン */}
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
        </div>

      </div>

      {/* フッター */}
      <div className={styles.footer}>

        <button className={styles.primary}
          onClick={() => navigate("/items")}
        >
          食材登録
        </button>

        <button className={styles.secondary}
          onClick={() => navigate("/set")}
        >
          セット登録
        </button>

        {/* 保存ボタン追加 */}
        <button
          className={styles.saveButton}
          onClick={handleSave}
        >
          保存
        </button>

      </div>

    </div>
  );
}