import { useState, useMemo } from "react";
import styles from "./List.module.css";

import {
  searchCustomItems,
  updateItem as updateCustomItem,
  deleteItem as deleteCustomItem,
} from "../../api/item";

import {
  getSetitem,
  updateSetitem,
  deleteSetitem,
} from "../../api/set";

export default function List() {
  const [tab, setTab] = useState("item");
  const [search, setSearch] = useState("");

  const [items, setItems] = useState([]);
  const [sets, setSets] = useState([]);

  const [editItemId, setEditItemId] = useState(null);
  const [editSetId, setEditSetId] = useState(null);

  const [message, setMessage] = useState("");

  const filteredItems = useMemo(() => {
    return items.filter((i) => {
      if (!search.trim()) return true;
      return String(i.name ?? "").includes(search);
    });
  }, [items, search]);

  const filteredSets = useMemo(() => {
    return sets.filter((s) => {
      if (!search.trim()) return true;
      return String(s.name ?? "").includes(search);
    });
  }, [sets, search]);

  const handleSearch = async () => {
    setMessage("");
    setEditItemId(null);
    setEditSetId(null);

    if (!search.trim()) {
      setMessage("検索キーワードを入力してください");
      return;
    }

    if (tab === "item") {
      try {
        const res = await searchCustomItems(search);
        const resultItems = res?.data?.items ?? [];

        setItems(resultItems);

        if (resultItems.length === 0) {
          setMessage("該当する食材・料理がありません");
        }
      } catch (e) {
        console.error(e);
        setMessage("食材・料理の検索に失敗しました");
      }
    }

    if (tab === "set") {
      try {
        const res = await getSetitem(search);
        const resultSets = res?.data?.sets ?? [];

        setSets(resultSets);

        if (resultSets.length === 0) {
          setMessage("該当するセットがありません");
        }
      } catch (e) {
        console.error(e);
        setMessage("セット検索に失敗しました");
      }
    }
  };

  const updateItem = (id, field, value) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === id
          ? {
              ...i,
              [field]: value,
            }
          : i
      )
    );
  };

  const updateSet = (id, field, value) => {
    setSets((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              [field]: value,
            }
          : s
      )
    );
  };

  const updateSetItem = (setId, itemRowId, field, value) => {
    setSets((prev) =>
      prev.map((s) =>
        s.id === setId
          ? {
              ...s,
              items: (s.items ?? []).map((i) =>
                i.id === itemRowId
                  ? {
                      ...i,
                      [field]: value,
                    }
                  : i
              ),
            }
          : s
      )
    );
  };

  const handleSaveItem = async (item) => {
    try {
      const payload = {
        name: item.name,
        amount: Number(item.amount),
        pro: Number(item.pro ?? item.p ?? 0),
        fat: Number(item.fat ?? item.f ?? 0),
        car: Number(item.car ?? item.c ?? 0),
        cal: Number(item.cal ?? item.kcal ?? 0),
      };

      const res = await updateCustomItem(item.id, payload);

      if (res?.resultCode === "SUCCESS") {
        setMessage("食材・料理を更新しました");
        setEditItemId(null);
      } else {
        setMessage(res?.message || "食材・料理の更新に失敗しました");
      }
    } catch (e) {
      console.error(e);
      setMessage("食材・料理の更新に失敗しました");
    }
  };

  const handleDeleteItem = async (id) => {
    if (!window.confirm("この食材・料理を削除しますか？")) {
      return;
    }

    try {
      const res = await deleteCustomItem(id);

      if (res?.resultCode === "SUCCESS") {
        setItems((prev) => prev.filter((i) => i.id !== id));
        setEditItemId(null);
        setMessage("食材・料理を削除しました");
      } else {
        setMessage(res?.message || "食材・料理の削除に失敗しました");
      }
    } catch (e) {
      console.error(e);
      setMessage("食材・料理の削除に失敗しました");
    }
  };

  const handleSaveSet = async (set) => {
    try {
      const payload = {
        name: set.name,
        items: (set.items ?? []).map((item) => ({
          source: item.itemType,
          itemId: item.itemId,
          amount: Number(item.amount),
        })),
      };

      const res = await updateSetitem(set.id, payload);

      if (res?.resultCode === "SUCCESS") {
        setMessage("セットを更新しました");
        setEditSetId(null);
      } else {
        setMessage(res?.message || "セットの更新に失敗しました");
      }
    } catch (e) {
      console.error(e);
      setMessage("セットの更新に失敗しました");
    }
  };

  const handleDeleteSet = async (id) => {
    if (!window.confirm("このセットを削除しますか？")) {
      return;
    }

    try {
      const res = await deleteSetitem(id);

      if (res?.resultCode === "SUCCESS") {
        setSets((prev) => prev.filter((s) => s.id !== id));
        setEditSetId(null);
        setMessage("セットを削除しました");
      } else {
        setMessage(res?.message || "セットの削除に失敗しました");
      }
    } catch (e) {
      console.error(e);
      setMessage("セットの削除に失敗しました");
    }
  };

  const deleteSetItem = (setId, itemRowId) => {
    setSets((prev) =>
      prev.map((s) =>
        s.id === setId
          ? {
              ...s,
              items: (s.items ?? []).filter((i) => i.id !== itemRowId),
            }
          : s
      )
    );
  };

  return (
    <div className={styles.container}>
      <h2>一覧・編集</h2>

      {message && <p className={styles.message}>{message}</p>}

      <div className={styles.tabs}>
        <button
          type="button"
          className={tab === "item" ? styles.activeTab : styles.tab}
          onClick={() => {
            setTab("item");
            setSearch("");
            setMessage("");
            setEditItemId(null);
            setEditSetId(null);
          }}
        >
          食材・料理
        </button>

        <button
          type="button"
          className={tab === "set" ? styles.activeTab : styles.tab}
          onClick={() => {
            setTab("set");
            setSearch("");
            setMessage("");
            setEditItemId(null);
            setEditSetId(null);
          }}
        >
          セット
        </button>
      </div>

      <div className={styles.searchRow}>
        <input
          className={styles.input}
          placeholder="検索"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          type="button"
          className={styles.searchButton}
          onClick={handleSearch}
        >
          検索
        </button>
      </div>

      {tab === "item" && (
        <div className={styles.listScroll}>
          {filteredItems.map((item) => (
            <div key={item.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <strong>{item.name}</strong>

                <div className={styles.buttonGroup}>
                  {editItemId === item.id ? (
                    <button
                      type="button"
                      className={styles.saveBtn}
                      onClick={() => handleSaveItem(item)}
                    >
                      保存
                    </button>
                  ) : (
                    <button
                      type="button"
                      className={styles.editBtn}
                      onClick={() => setEditItemId(item.id)}
                    >
                      編集
                    </button>
                  )}

                  <button
                    type="button"
                    className={styles.deleteBtn}
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    削除
                  </button>
                </div>
              </div>

              <div className={styles.itemEditArea}>
                <div className={styles.inputWithUnit}>
                  <input
                    disabled={editItemId !== item.id}
                    className={styles.nutrientInput}
                    value={item.cal ?? item.kcal ?? ""}
                    onChange={(e) =>
                      updateItem(item.id, "cal", Number(e.target.value))
                    }
                  />
                  <span className={styles.unit}>kcal</span>
                </div>

                <div className={styles.inputWithUnit}>
                  <input
                    disabled={editItemId !== item.id}
                    className={styles.nutrientInput}
                    value={item.pro ?? item.p ?? ""}
                    onChange={(e) =>
                      updateItem(item.id, "pro", Number(e.target.value))
                    }
                  />
                  <span className={styles.unit}>g(P)</span>
                </div>

                <div className={styles.inputWithUnit}>
                  <input
                    disabled={editItemId !== item.id}
                    className={styles.nutrientInput}
                    value={item.fat ?? item.f ?? ""}
                    onChange={(e) =>
                      updateItem(item.id, "fat", Number(e.target.value))
                    }
                  />
                  <span className={styles.unit}>g(F)</span>
                </div>

                <div className={styles.inputWithUnit}>
                  <input
                    disabled={editItemId !== item.id}
                    className={styles.nutrientInput}
                    value={item.car ?? item.c ?? ""}
                    onChange={(e) =>
                      updateItem(item.id, "car", Number(e.target.value))
                    }
                  />
                  <span className={styles.unit}>g(C)</span>
                </div>

                <div className={styles.inputWithUnit}>
                  <input
                    disabled={editItemId !== item.id}
                    className={styles.amountInput}
                    value={item.amount ?? ""}
                    onChange={(e) =>
                      updateItem(item.id, "amount", Number(e.target.value))
                    }
                  />
                  <span className={styles.unit}>g</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "set" && (
        <div className={styles.listScroll}>
          {filteredSets.map((set) => (
            <div key={set.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <input
                  disabled={editSetId !== set.id}
                  className={styles.setNameInput}
                  value={set.name ?? ""}
                  onChange={(e) => updateSet(set.id, "name", e.target.value)}
                />

                <div className={styles.buttonGroup}>
                  {editSetId === set.id ? (
                    <button
                      type="button"
                      className={styles.saveBtn}
                      onClick={() => handleSaveSet(set)}
                    >
                      保存
                    </button>
                  ) : (
                    <button
                      type="button"
                      className={styles.editBtn}
                      onClick={() => setEditSetId(set.id)}
                    >
                      編集
                    </button>
                  )}

                  <button
                    type="button"
                    className={styles.deleteBtn}
                    onClick={() => handleDeleteSet(set.id)}
                  >
                    セット削除
                  </button>
                </div>
              </div>

              <div className={styles.totalRow}>
                <span>合計 kcal：{set.totalCal ?? 0}</span>
                <span>P：{set.totalPro ?? 0}</span>
                <span>F：{set.totalFat ?? 0}</span>
                <span>C：{set.totalCar ?? 0}</span>
              </div>

              <div className={styles.setItemList}>
                {(set.items ?? []).map((item) => (
                  <div key={item.id} className={styles.setItemRow}>
                    <div className={styles.foodNameCell}>
                      {item.name}
                    </div>

                    <div className={styles.inputWithUnit}>
                      <input
                        disabled={editSetId !== set.id}
                        className={styles.nutrientInput}
                        value={item.cal ?? item.kcal ?? ""}
                        onChange={(e) =>
                          updateSetItem(
                            set.id,
                            item.id,
                            "cal",
                            Number(e.target.value)
                          )
                        }
                      />
                      <span className={styles.unit}>kcal</span>
                    </div>

                    <div className={styles.inputWithUnit}>
                      <input
                        disabled={editSetId !== set.id}
                        className={styles.nutrientInput}
                        value={item.pro ?? item.p ?? ""}
                        onChange={(e) =>
                          updateSetItem(
                            set.id,
                            item.id,
                            "pro",
                            Number(e.target.value)
                          )
                        }
                      />
                      <span className={styles.unit}>g(P)</span>
                    </div>

                    <div className={styles.inputWithUnit}>
                      <input
                        disabled={editSetId !== set.id}
                        className={styles.nutrientInput}
                        value={item.fat ?? item.f ?? ""}
                        onChange={(e) =>
                          updateSetItem(
                            set.id,
                            item.id,
                            "fat",
                            Number(e.target.value)
                          )
                        }
                      />
                      <span className={styles.unit}>g(F)</span>
                    </div>

                    <div className={styles.inputWithUnit}>
                      <input
                        disabled={editSetId !== set.id}
                        className={styles.nutrientInput}
                        value={item.car ?? item.c ?? ""}
                        onChange={(e) =>
                          updateSetItem(
                            set.id,
                            item.id,
                            "car",
                            Number(e.target.value)
                          )
                        }
                      />
                      <span className={styles.unit}>g(C)</span>
                    </div>

                    <div className={styles.inputWithUnit}>
                      <input
                        disabled={editSetId !== set.id}
                        className={styles.amountInput}
                        value={item.amount ?? ""}
                        onChange={(e) =>
                          updateSetItem(
                            set.id,
                            item.id,
                            "amount",
                            Number(e.target.value)
                          )
                        }
                      />
                      <span className={styles.unit}>g</span>
                    </div>

                    <button
                      type="button"
                      className={styles.deleteSmallBtn}
                      disabled={editSetId !== set.id}
                      onClick={() => deleteSetItem(set.id, item.id)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}