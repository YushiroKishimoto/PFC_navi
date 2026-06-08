import { useState } from "react";
import styles from "./List.module.css";
import {
  searchCustomItems,
  updateItem,
  deleteItem,
} from "../../api/item";
import {
  searchSets,
  updateSet,
  deleteSet,
} from "../../api/set";

export default function List() {
  const [itemSearch, setItemSearch] = useState("");
  const [setSearch, setSetSearch] = useState("");

  const [items, setItems] = useState([]);
  const [sets, setSets] = useState([]);

  const [selectedItemId, setSelectedItemId] = useState("");
  const [selectedSetId, setSelectedSetId] = useState("");

  const [message, setMessage] = useState("");

  const selectedItem = items.find(
    (item) => String(item.id) === String(selectedItemId)
  );

  const selectedSet = sets.find(
    (set) => String(set.id) === String(selectedSetId)
  );

  const handleItemSearch = async () => {
    setMessage("");
    setSelectedItemId("");

    if (!itemSearch.trim()) {
      setMessage("自前DBの検索キーワードを入力してください");
      return;
    }

    try {
      const res = await searchCustomItems(itemSearch);
      const resultItems = res?.data?.items ?? [];

      setItems(resultItems.slice(0, 5));

      if (resultItems.length === 0) {
        setMessage("該当する自前DBがありません");
      }
    } catch (e) {
      console.error(e);
      setMessage("自前DB検索に失敗しました");
    }
  };

  const handleSetSearch = async () => {
    setMessage("");
    setSelectedSetId("");

    if (!setSearch.trim()) {
      setMessage("セットの検索キーワードを入力してください");
      return;
    }

    try {
      const res = await searchSets(setSearch);
      const resultSets = res?.data?.sets ?? [];

      setSets(resultSets.slice(0, 5));

      if (resultSets.length === 0) {
        setMessage("該当するセットがありません");
      }
    } catch (e) {
      console.error(e);
      setMessage("セット検索に失敗しました");
    }
  };

  const handleChangeItem = (id, field, value) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );
  };

  const handleChangeSet = (id, field, value) => {
    setSets((prev) =>
      prev.map((set) =>
        set.id === id
          ? {
              ...set,
              [field]: value,
            }
          : set
      )
    );
  };

  const handleChangeSetItemAmount = (setId, itemRowId, value) => {
    setSets((prev) =>
      prev.map((set) => {
        if (set.id !== setId) {
          return set;
        }

        return {
          ...set,
          items: (set.items ?? []).map((item) =>
            item.id === itemRowId
              ? {
                  ...item,
                  amount: value,
                }
              : item
          ),
        };
      })
    );
  };

  const handleUpdateItem = async (item) => {
    try {
      const payload = {
        name: item.name,
        amount: Number(item.amount),
        pro: Number(item.pro),
        fat: Number(item.fat),
        car: Number(item.car),
        cal: Number(item.cal),
      };

      const res = await updateItem(item.id, payload);

      if (res?.resultCode === "SUCCESS") {
        setMessage("自前DBを更新しました");
      } else {
        setMessage(res?.message || "自前DBの更新に失敗しました");
      }
    } catch (e) {
      console.error(e);
      setMessage("自前DBの更新に失敗しました");
    }
  };

  const handleDeleteItem = async (id) => {
    if (!window.confirm("この自前DBを削除しますか？")) {
      return;
    }

    try {
      const res = await deleteItem(id);

      if (res?.resultCode === "SUCCESS") {
        setItems((prev) => prev.filter((item) => item.id !== id));
        setSelectedItemId("");
        setMessage("自前DBを削除しました");
      } else {
        setMessage(res?.message || "自前DBの削除に失敗しました");
      }
    } catch (e) {
      console.error(e);
      setMessage("自前DBの削除に失敗しました");
    }
  };

  const handleUpdateSet = async (set) => {
    try {
      const payload = {
        name: set.name,
        items: (set.items ?? []).map((item) => ({
          source: item.itemType,
          itemId: item.itemId,
          amount: Number(item.amount),
        })),
      };

      const res = await updateSet(set.id, payload);

      if (res?.resultCode === "SUCCESS") {
        setMessage("セットを更新しました");
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
      const res = await deleteSet(id);

      if (res?.resultCode === "SUCCESS") {
        setSets((prev) => prev.filter((set) => set.id !== id));
        setSelectedSetId("");
        setMessage("セットを削除しました");
      } else {
        setMessage(res?.message || "セットの削除に失敗しました");
      }
    } catch (e) {
      console.error(e);
      setMessage("セットの削除に失敗しました");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>登録一覧表示</h2>

      {message && <p className={styles.message}>{message}</p>}

      <div className={styles.searchArea}>
        {/* 左：自前DB */}
        <div className={styles.searchColumn}>
          <h3 className={styles.sectionTitle}>食材・食事</h3>
          <p className={styles.labelText}>キーワードから探す</p>

          <div className={styles.searchRow}>
            <input
              className={styles.input}
              placeholder="けんさく"
              value={itemSearch}
              onChange={(e) => setItemSearch(e.target.value)}
            />

            <button
              type="button"
              className={styles.searchButton}
              onClick={handleItemSearch}
            >
              検索
            </button>
          </div>

          {items.length > 0 && (
            <div className={styles.resultList}>
              {items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={
                    String(selectedItemId) === String(item.id)
                      ? styles.resultButtonActive
                      : styles.resultButton
                  }
                  onClick={() => setSelectedItemId(String(item.id))}
                >
                  {item.name} / {item.amount}g / {item.cal}kcal
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 右：セット */}
        <div className={styles.searchColumn}>
          <h3 className={styles.sectionTitle}>セット</h3>
          <p className={styles.labelText}>キーワードから探す</p>

          <div className={styles.searchRow}>
            <input
              className={styles.input}
              placeholder="けんさく"
              value={setSearch}
              onChange={(e) => setSetSearch(e.target.value)}
            />

            <button
              type="button"
              className={styles.searchButton}
              onClick={handleSetSearch}
            >
              検索
            </button>
          </div>

          {sets.length > 0 && (
            <div className={styles.resultList}>
              {sets.map((set) => (
                <button
                  key={set.id}
                  type="button"
                  className={
                    String(selectedSetId) === String(set.id)
                      ? styles.resultButtonActive
                      : styles.resultButton
                  }
                  onClick={() => setSelectedSetId(String(set.id))}
                >
                  {set.name} / {set.totalCal}kcal
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.editArea}>
        {selectedItem && (
          <div className={styles.card}>
            <h3>{selectedItem.name}</h3>

            <label>食材・料理名</label>
            <input
              className={styles.input}
              value={selectedItem.name ?? ""}
              onChange={(e) =>
                handleChangeItem(selectedItem.id, "name", e.target.value)
              }
            />

            <label>標準量</label>
            <input
              className={styles.input}
              type="number"
              value={selectedItem.amount ?? ""}
              onChange={(e) =>
                handleChangeItem(selectedItem.id, "amount", e.target.value)
              }
            />

            <label>カロリー</label>
            <input
              className={styles.input}
              type="number"
              value={selectedItem.cal ?? ""}
              onChange={(e) =>
                handleChangeItem(selectedItem.id, "cal", e.target.value)
              }
            />

            <label>P</label>
            <input
              className={styles.input}
              type="number"
              value={selectedItem.pro ?? ""}
              onChange={(e) =>
                handleChangeItem(selectedItem.id, "pro", e.target.value)
              }
            />

            <label>F</label>
            <input
              className={styles.input}
              type="number"
              value={selectedItem.fat ?? ""}
              onChange={(e) =>
                handleChangeItem(selectedItem.id, "fat", e.target.value)
              }
            />

            <label>C</label>
            <input
              className={styles.input}
              type="number"
              value={selectedItem.car ?? ""}
              onChange={(e) =>
                handleChangeItem(selectedItem.id, "car", e.target.value)
              }
            />

            <div className={styles.row}>
              <button
                type="button"
                className={styles.deleteButton}
                onClick={() => handleDeleteItem(selectedItem.id)}
              >
                削除
              </button>

              <button
                type="button"
                className={styles.saveButton}
                onClick={() => handleUpdateItem(selectedItem)}
              >
                保存
              </button>
            </div>
          </div>
        )}

        {selectedSet && (
          <div className={styles.card}>
            <h3>{selectedSet.name}</h3>

            <label>セット名</label>
            <input
              className={styles.input}
              value={selectedSet.name ?? ""}
              onChange={(e) =>
                handleChangeSet(selectedSet.id, "name", e.target.value)
              }
            />

            <div className={styles.row}>
              <span>合計 kcal</span>
              <span>{selectedSet.totalCal}</span>
            </div>

            <div className={styles.row}>
              <span>合計 P</span>
              <span>{selectedSet.totalPro}</span>
            </div>

            <div className={styles.row}>
              <span>合計 F</span>
              <span>{selectedSet.totalFat}</span>
            </div>

            <div className={styles.row}>
              <span>合計 C</span>
              <span>{selectedSet.totalCar}</span>
            </div>

            <h4>セット内食材</h4>

            {(selectedSet.items ?? []).map((item) => (
              <div key={item.id} className={styles.row}>
                <span>
                  {item.name} / {item.itemType}
                </span>

                <input
                  className={styles.amountInput}
                  type="number"
                  value={item.amount ?? ""}
                  onChange={(e) =>
                    handleChangeSetItemAmount(
                      selectedSet.id,
                      item.id,
                      e.target.value
                    )
                  }
                />

                <span>g</span>
              </div>
            ))}

            <div className={styles.row}>
              <button
                type="button"
                className={styles.deleteButton}
                onClick={() => handleDeleteSet(selectedSet.id)}
              >
                削除
              </button>

              <button
                type="button"
                className={styles.saveButton}
                onClick={() => handleUpdateSet(selectedSet)}
              >
                保存
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
