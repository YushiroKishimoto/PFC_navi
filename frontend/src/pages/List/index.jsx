import { useState, useMemo } from "react";
import styles from "./List.module.css";

export default function List() {
  const [tab, setTab] = useState("item");
  const [search, setSearch] = useState("");

  // mock DB（本来はAPI）
  const [items, setItems] = useState([
    { id: 1, name: "鶏むね肉", kcal: 200, p: 30, f: 5, c: 0 },
    { id: 2, name: "白米", kcal: 250, p: 5, f: 1, c: 55 },
  ]);

  const [sets, setSets] = useState([
    {
      id: 1,
      name: "減量セット",
      items: ["鶏むね肉", "白米"],
      kcal: 450,
      p: 35,
      f: 6,
      c: 55,
    },
  ]);

  // 検索フィルタ
  const filteredItems = useMemo(() => {
    return items.filter((i) => i.name.includes(search));
  }, [items, search]);

  const filteredSets = useMemo(() => {
    return sets.filter((s) => s.name.includes(search));
  }, [sets, search]);

  // 編集（食材）
  const updateItem = (id, field, value) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, [field]: value } : i))
    );
  };

  // 編集（セット）
  const updateSet = (id, field, value) => {
    setSets((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  return (
    <div className={styles.container}>
      <h2>一覧・編集</h2>

      {/* 検索 */}
      <input
        className={styles.input}
        placeholder="検索"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* タブ */}
      <div className={styles.tabs}>
        <button onClick={() => setTab("item")}>食材・料理</button>
        <button onClick={() => setTab("set")}>セット</button>
      </div>

      {/* 食材一覧 */}
      {tab === "item" && (
        <div className={styles.list}>
          {filteredItems.map((item) => (
            <div key={item.id} className={styles.card}>
              <input
                value={item.name}
                onChange={(e) =>
                  updateItem(item.id, "name", e.target.value)
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
      )}

      {/* セット一覧 */}
      {tab === "set" && (
        <div className={styles.list}>
          {filteredSets.map((set) => (
            <div key={set.id} className={styles.card}>
              <input
                value={set.name}
                onChange={(e) =>
                  updateSet(set.id, "name", e.target.value)
                }
              />

              <div className={styles.row}>
                <span>kcal</span>
                <input
                  type="number"
                  value={set.kcal}
                  onChange={(e) =>
                    updateSet(set.id, "kcal", Number(e.target.value))
                  }
                />
              </div>

              <div className={styles.row}>
                <span>P</span>
                <input
                  type="number"
                  value={set.p}
                  onChange={(e) =>
                    updateSet(set.id, "p", Number(e.target.value))
                  }
                />
              </div>

              <div className={styles.row}>
                <span>F</span>
                <input
                  type="number"
                  value={set.f}
                  onChange={(e) =>
                    updateSet(set.id, "f", Number(e.target.value))
                  }
                />
              </div>

              <div className={styles.row}>
                <span>C</span>
                <input
                  type="number"
                  value={set.c}
                  onChange={(e) =>
                    updateSet(set.id, "c", Number(e.target.value))
                  }
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}