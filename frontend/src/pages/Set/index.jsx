import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Set.module.css";
import { createSetitem } from "../../api/set";
import { searchItems } from "../../api/item";

export default function Set() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [setName, setSetName] = useState("");
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState([]);

  // =========================
  // API検索
  // =========================
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await searchItems(search);
        setItems(res?.data?.items ?? []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchItems();
  }, [search]);

  // =========================
  // フィルタ
  // =========================
  const filteredItems = useMemo(() => {
    return items.filter((i) => i.name.includes(search));
  }, [search, items]);

  // =========================
  // 追加
  // =========================
  const addItem = (item) => {
    setSelected((prev) => {
      if (prev.some((i) => i.id === item.id)) return prev;
      return [...prev, { ...item }];
    });
  };

  // =========================
  // 更新
  // =========================
  const updateItem = (id, field, value) => {
    setSelected((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  // =========================
  // 合計
  // =========================
  const total = useMemo(() => {
    return selected.reduce(
      (acc, cur) => {
        const ratio = Number(cur.amount || 0) / 100;

        acc.cal += (Number(cur.cal) || 0) * ratio;
        acc.pro += (Number(cur.pro) || 0) * ratio;
        acc.fat += (Number(cur.fat) || 0) * ratio;
        acc.car += (Number(cur.car) || 0) * ratio;

        return acc;
      },
      { cal: 0, pro: 0, fat: 0, car: 0 }
    );
  }, [selected]);

    const createPayload = () => {
    return {
      name: setName,
      items: selected.map(({ name, cal, pro, fat, car, id, ...rest }) => ({
        itemId: id,
        ...rest
      }))
    };
  };
  // =========================
  // 登録
  // =========================
  const handleRegister = async () => {
    if (!setName.trim() || selected.length === 0) {
      alert("セット名と食材を入力してください");
      return;
    }

    const payload = createPayload();

    const res = await createSetitem(payload);
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

      {/* =========================
          左
      ========================= */}
      <div className={styles.left}>

        <h2>セット登録</h2>

        <input
          className={styles.input}
          placeholder="セット名"
          value={setName}
          onChange={(e) => setSetName(e.target.value)}
        />

        <input
          className={styles.input}
          placeholder="食材検索"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* =========================
            検索結果（スクロール）
        ========================= */}
        <div className={styles.searchList}>
          {filteredItems.map((item) => (
            <div key={item.id} className={styles.card}>

              <div className={styles.cardHeader}>
                <div className={styles.name}>
                  {item.name}
                </div>

                <button
                  className={styles.addButton}
                  onClick={() => addItem(item)}
                >
                  追加
                </button>
              </div>

              <div className={styles.nutritionRow}>
                <div className={styles.col}>Cal: {item.cal}</div>
                <div className={styles.col}>P: {item.pro}</div>
                <div className={styles.col}>F: {item.fat}</div>
                <div className={styles.col}>C: {item.car}</div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* =========================
          右
      ========================= */}
      <div className={styles.right}>

        <h3>選択済み</h3>

        <div className={styles.table}>
          {selected.map((item) => (
            <div key={item.id} className={styles.card}>

              <div className={styles.name}>
                {item.name}
              </div>

              <div className={styles.nutritionRow}>

                <div className={styles.col}>
                  <span>量</span>
                  <input
                    type="number"
                    value={item.amount || 0}
                    onChange={(e) =>
                      updateItem(item.id, "amount", Number(e.target.value))
                    }
                  />
                </div>

                <div className={styles.col}>
                  <span>Cal</span>
                  <input
                    type="number"
                    value={item.cal || 0}
                    onChange={(e) =>
                      updateItem(item.id, "cal", Number(e.target.value))
                    }
                  />
                </div>

                <div className={styles.col}>
                  <span>P</span>
                  <input
                    type="number"
                    value={item.pro || 0}
                    onChange={(e) =>
                      updateItem(item.id, "pro", Number(e.target.value))
                    }
                  />
                </div>

                <div className={styles.col}>
                  <span>F</span>
                  <input
                    type="number"
                    value={item.fat || 0}
                    onChange={(e) =>
                      updateItem(item.id, "fat", Number(e.target.value))
                    }
                  />
                </div>

                <div className={styles.col}>
                  <span>C</span>
                  <input
                    type="number"
                    value={item.car || 0}
                    onChange={(e) =>
                      updateItem(item.id, "car", Number(e.target.value))
                    }
                  />
                </div>

              </div>

            </div>
          ))}
        </div>

        <div className={styles.total}>
          P:{total.pro.toFixed(1)} F:{total.fat.toFixed(1)} C:{total.car.toFixed(1)}
        </div>

        <button className={styles.Button} onClick={handleRegister}>
          セットを登録
        </button>

      </div>
    </div>
  );
}