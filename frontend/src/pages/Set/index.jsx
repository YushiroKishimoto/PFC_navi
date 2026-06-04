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

  const filteredItems = useMemo(() => {
    return items.filter((i) => i.name.includes(search));
  }, [search, items]);

  const addItem = (item) => {
    if (selected.find((i) => i.id === item.id)) return;
    setSelected([...selected, { ...item }]);
  };

  const updateItem = (id, field, value) => {
    setSelected((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  // 合計計算
  const total = useMemo(() => {
    return selected.reduce(
      (acc, cur) => {
        const ratio = cur.amount / 100;

        acc.kcal += cur.kcal * ratio;
        acc.p += cur.p * ratio;
        acc.f += cur.f * ratio;
        acc.c += cur.c * ratio;

        return acc;
      },
      { kcal: 0, p: 0, f: 0, c: 0 }
    );
  }, [selected]);

  // ✅ 登録処理（将来API化ポイント）
  const handleRegister = () => {
    if (!setName || selected.length === 0) {
      alert("セット名と食材を入力してください");
      return;
    }

    const payload = {
      setName,
      items: selected,
      total,
      createdAt: new Date().toISOString(),
    };

    // ★ここが将来APIになる
    console.log("SET_DB_REGISTER:", payload);

    // mock成功後遷移
    alert("セット登録完了");
    navigate("/");
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
        placeholder="食材検索"
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

      {/* ✅ 登録ボタン */}
      <button className={styles.button} onClick={handleRegister}>
        セットを登録
      </button>
    </div>
  );
}