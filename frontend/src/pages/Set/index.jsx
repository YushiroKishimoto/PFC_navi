import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Set.module.css";

export default function Set() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [setName, setSetName] = useState("");

  const [items] = useState([
    { id: 1, name: "鶏むね肉", kcal: 200, p: 30, f: 5, c: 0, amount: 100 },
    { id: 2, name: "白米", kcal: 250, p: 5, f: 1, c: 55, amount: 150 },
    { id: 3, name: "卵", kcal: 150, p: 12, f: 10, c: 1, amount: 1 },
  ]);

  const [selected, setSelected] = useState([]);

  // =========================
  // フィルタ
  // =========================
  const filteredItems = useMemo(() => {
    return items.filter((i) => i.name.includes(search));
  }, [search, items]);

  // =========================
  // 追加（安全更新）
  // =========================
  const addItem = (item) => {
    setSelected((prev) => {
      if (prev.some((i) => i.id === item.id)) return prev;
      return [...prev, { ...item }];
    });
  };

  // =========================
  // 更新（安全な関数型更新）
  // =========================
  const updateItem = (id, field, value) => {
    setSelected((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  // =========================
  // 合計（安全計算）
  // =========================
  const total = useMemo(() => {
    return selected.reduce(
      (acc, cur) => {
        const ratio = Number(cur.amount || 0) / 100;

        acc.kcal += (Number(cur.kcal) || 0) * ratio;
        acc.p += (Number(cur.p) || 0) * ratio;
        acc.f += (Number(cur.f) || 0) * ratio;
        acc.c += (Number(cur.c) || 0) * ratio;

        return acc;
      },
      { kcal: 0, p: 0, f: 0, c: 0 }
    );
  }, [selected]);

  // =========================
  // payload生成（分離）
  // =========================
  const createPayload = () => {
    return {
      setName,
      items: selected,
      total,
      createdAt: new Date().toISOString(),
    };
  };

  // =========================
  // 登録（安全遷移）
  // =========================
  const handleRegister = () => {
    if (!setName.trim() || selected.length === 0) {
      alert("セット名と食材を入力してください");
      return;
    }

    const payload = createPayload();

    console.log("SET_DB_REGISTER:", payload);

    alert("セット登録完了");

    // 安全遷移（戻れるなら戻る / 無理ならホーム）
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className={styles.container}>
      <h2>セット登録</h2>

      {/* セット名 */}
      <input
        className={styles.input}
        placeholder="セット名"
        value={setName}
        onChange={(e) => setSetName(e.target.value)}
      />

      {/* 検索 */}
      <input
        className={styles.input}
        placeholder="食材・料理検索"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 検索結果 */}
      <div className={styles.searchList}>
        {filteredItems.map((item) => (
          <div key={item.id} className={styles.searchItem}>
            <span>{item.name}</span>
            <button onClick={() => addItem(item)}>追加</button>
          </div>
        ))}
      </div>

      {/* 編集 */}
      <div className={styles.table}>
        {selected.map((item) => (
          <div key={item.id} className={styles.row}>
            <div>{item.name}</div>

            <input
              type="number"
              value={item.amount}
              onChange={(e) =>
                updateItem(item.id, "amount", Number(e.target.value))
              }
            />

            <input
              type="number"
              value={item.kcal}
              onChange={(e) =>
                updateItem(item.id, "kcal", Number(e.target.value))
              }
            />

            <input
              type="number"
              value={item.p}
              onChange={(e) =>
                updateItem(item.id, "p", Number(e.target.value))
              }
            />

            <input
              type="number"
              value={item.f}
              onChange={(e) =>
                updateItem(item.id, "f", Number(e.target.value))
              }
            />

            <input
              type="number"
              value={item.c}
              onChange={(e) =>
                updateItem(item.id, "c", Number(e.target.value))
              }
            />
          </div>
        ))}
      </div>

      {/* 合計 */}
      <div className={styles.total}>
        <h3>合計</h3>
        <div>{total.kcal.toFixed(0)} kcal</div>
        <div>
          P:{total.p.toFixed(1)} F:{total.f.toFixed(1)} C:{total.c.toFixed(1)}
        </div>
      </div>

      {/* 登録 */}
      <button className={styles.button} onClick={handleRegister}>
        セットを登録
      </button>
    </div>
  );
}