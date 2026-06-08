import { useState, useMemo } from "react";
import styles from "./List.module.css";

export default function List() {
  const [tab, setTab] = useState("item");
  const [search, setSearch] = useState("");

  const [items, setItems] = useState([
    { id: 1, name: "鶏むね肉", kcal: 200, p: 30, f: 5, c: 0, amount: 100 },
    { id: 2, name: "白米", kcal: 250, p: 5, f: 1, c: 55, amount: 150 },
  ]);

  const [sets, setSets] = useState([
    {
      id: 1,
      name: "減量セット",
      items: [
        { id: 1, name: "鶏むね肉", kcal: 200, p: 30, f: 5, c: 0, amount: 100 },
        { id: 2, name: "白米", kcal: 250, p: 5, f: 1, c: 55, amount: 150 },
      ],
    },
  ]);

  const [editItemId, setEditItemId] = useState(null);
  const [editSetId, setEditSetId] = useState(null);

  // =====================
  // filter
  // =====================
  const filteredItems = useMemo(() => {
    return items.filter((i) => i.name.includes(search));
  }, [items, search]);

  const filteredSets = useMemo(() => {
    return sets.filter((s) => s.name.includes(search));
  }, [sets, search]);

  // =====================
  // update item
  // =====================
  const updateItem = (id, field, value) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, [field]: value } : i))
    );
  };

  // =====================
  // update set item
  // =====================
  const updateSetItem = (setId, itemId, field, value) => {
    setSets((prev) =>
      prev.map((s) =>
        s.id === setId
          ? {
              ...s,
              items: s.items.map((i) =>
                i.id === itemId ? { ...i, [field]: value } : i
              ),
            }
          : s
      )
    );
  };

  // =====================
  // delete item
  // =====================
  const deleteItem = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  // =====================
  // delete set
  // =====================
  const deleteSet = (id) => {
    setSets((prev) => prev.filter((s) => s.id !== id));
  };

  // =====================
  // delete item in set（残す）
  // =====================
  const deleteSetItem = (setId, itemId) => {
    setSets((prev) =>
      prev.map((s) =>
        s.id === setId
          ? {
              ...s,
              items: s.items.filter((i) => i.id !== itemId),
            }
          : s
      )
    );
  };

  return (
    <div className={styles.container}>
      <h2>一覧・編集</h2>

      {/* tabs */}
      <div className={styles.tabs}>
        <button
          className={tab === "item" ? styles.activeTab : styles.tab}
          onClick={() => setTab("item")}
        >
          食材・料理
        </button>

        <button
          className={tab === "set" ? styles.activeTab : styles.tab}
          onClick={() => setTab("set")}
        >
          セット
        </button>
      </div>

      {/* search */}
      <input
        className={styles.input}
        placeholder="検索"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* ===================== ITEM ===================== */}
      {tab === "item" && (
        <div className={styles.listScroll}>
          {filteredItems.map((item) => (
            <div key={item.id} className={styles.card}>
              <div className={styles.row}>
                <strong>{item.name}</strong>

                <div className={styles.buttonGroup}>
                  {editItemId === item.id ? (
                    <button
                      className={styles.saveBtn}
                      onClick={() => setEditItemId(null)}
                    >
                      保存
                    </button>
                  ) : (
                    <button
                      className={styles.editBtn}
                      onClick={() => setEditItemId(item.id)}
                    >
                      編集
                    </button>
                  )}

                  <button
                    className={styles.deleteBtn}
                    onClick={() => deleteItem(item.id)}
                  >
                    削除
                  </button>
                </div>
              </div>

              <div className={styles.editArea}>
                <input
                  disabled={editItemId !== item.id}
                  value={item.kcal}
                  onChange={(e) =>
                    updateItem(item.id, "kcal", Number(e.target.value))
                  }
                />
                <span className={styles.unit}>kcal</span>

                <input
                  disabled={editItemId !== item.id}
                  value={item.p}
                  onChange={(e) =>
                    updateItem(item.id, "p", Number(e.target.value))
                  }
                />
                <span className={styles.unit}>g(P)</span>

                <input
                  disabled={editItemId !== item.id}
                  value={item.f}
                  onChange={(e) =>
                    updateItem(item.id, "f", Number(e.target.value))
                  }
                />
                <span className={styles.unit}>g(F)</span>

                <input
                  disabled={editItemId !== item.id}
                  value={item.c}
                  onChange={(e) =>
                    updateItem(item.id, "c", Number(e.target.value))
                  }
                />
                <span className={styles.unit}>g(C)</span>

                <input
                  disabled={editItemId !== item.id}
                  value={item.amount}
                  onChange={(e) =>
                    updateItem(item.id, "amount", Number(e.target.value))
                  }
                />
                <span className={styles.unit}>g</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ===================== SET ===================== */}
      {tab === "set" && (
        <div className={styles.listScroll}>
          {filteredSets.map((set) => (
            <div key={set.id} className={styles.card}>
              <div className={styles.row}>
                <strong>{set.name}</strong>

                <div className={styles.buttonGroup}>
                  {editSetId === set.id ? (
                    <button
                      className={styles.saveBtn}
                      onClick={() => setEditSetId(null)}
                    >
                      保存
                    </button>
                  ) : (
                    <button
                      className={styles.editBtn}
                      onClick={() => setEditSetId(set.id)}
                    >
                      編集
                    </button>
                  )}

                  <button
                    className={styles.deleteBtn}
                    onClick={() => deleteSet(set.id)}
                  >
                    セット削除
                  </button>
                </div>
              </div>

              {set.items.map((item) => (
                <div key={item.id} className={styles.editArea}>
                  <span>{item.name}</span>

                  <input
                    disabled={editSetId !== set.id}
                    value={item.kcal}
                    onChange={(e) =>
                      updateSetItem(set.id, item.id, "kcal", Number(e.target.value))
                    }
                  />
                  <span className={styles.unit}>kcal</span>

                  <input
                    disabled={editSetId !== set.id}
                    value={item.p}
                    onChange={(e) =>
                      updateSetItem(set.id, item.id, "p", Number(e.target.value))
                    }
                  />
                  <span className={styles.unit}>g(P)</span>

                  <input
                    disabled={editSetId !== set.id}
                    value={item.f}
                    onChange={(e) =>
                      updateSetItem(set.id, item.id, "f", Number(e.target.value))
                    }
                  />
                  <span className={styles.unit}>g(F)</span>

                  <input
                    disabled={editSetId !== set.id}
                    value={item.c}
                    onChange={(e) =>
                      updateSetItem(set.id, item.id, "c", Number(e.target.value))
                    }
                  />
                  <span className={styles.unit}>g(C)</span>

                  <input
                    disabled={editSetId !== set.id}
                    value={item.amount}
                    onChange={(e) =>
                      updateSetItem(set.id, item.id, "amount", Number(e.target.value))
                    }
                  />
                  <span className={styles.unit}>g</span>

                  {/* セット内削除は残す */}
                  <button
                    className={styles.deleteBtn}
                    onClick={() => deleteSetItem(set.id, item.id)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}