import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Set.module.css";
import { createSetitem } from "../../api/set";

export default function Set() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [setName, setSetName] = useState("");

  const [items] = useState([
    { id: 1, name: "鶏むね肉", cal: 200, pro: 30, fat: 5, car: 0, amount: 100 },
    { id: 2, name: "白米", cal: 250, pro: 5, fat: 1, car: 55, amount: 150 },
    { id: 3, name: "卵", cal: 150, pro: 12, fat: 10, car: 1, amount: 1 },
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

        acc.cal += (Number(cur.cal) || 0) * ratio;
        acc.pro += (Number(cur.pro) || 0) * ratio;
        acc.fat += (Number(cur.fat) || 0) * ratio;
        acc.car += (Number(cur.car) || 0) * ratio;

        return acc;
      },
      { cal: 0, pro: 0, fat: 0, car: 0 }
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
              value={item.cal}
              onChange={(e) =>
                updateItem(item.id, "cal", Number(e.target.value))
              }
            />

            <input
              type="number"
              value={item.pro}
              onChange={(e) =>
                updateItem(item.id, "pro", Number(e.target.value))
              }
            />

            <input
              type="number"
              value={item.fat}
              onChange={(e) =>
                updateItem(item.id, "fat", Number(e.target.value))
              }
            />

            <input
              type="number"
              value={item.car}
              onChange={(e) =>
                updateItem(item.id, "car", Number(e.target.value))
              }
            />
          </div>
        ))}
      </div>

      {/* 合計 */}
      <div className={styles.total}>
        <h3>合計</h3>
        <div>{total.cal.toFixed(0)} cal</div>
        <div>
          P:{total.pro.toFixed(1)} F:{total.fat.toFixed(1)} C:{total.car.toFixed(1)}
        </div>
      </div>

      {/* 登録 */}
      <button className={styles.button} onClick={handleRegister}>
        セットを登録
      </button>
    </div>
  );
}


// MOCK
// import { useEffect, useState } from "react";
// import { createSetitem } from "../../api/set";

// export default function TestPage() {
//   const testRegisterFood = async () => {
//     const payload = {
//       name: "朝食セット2",
//       items: [
//         {
//           source: "default",
//           itemId: 1,
//           amount: 150
//         },
//         {
//           source: "custom",
//           itemId: 1,
//           amount: 100
//         }
//       ]
//     };

//     try {
//       const res = await createSetitem(payload);
//       console.log("成功:", res.data);
//       return res.data;
//     } catch (err) {
//       console.error("失敗:", err);
//     }
//   };

//   const handleClick = async () => {
//     await testRegisterFood();
//   };

//   return (
//     <div>
//       <button onClick={handleClick}>
//         食品セット登録テスト
//       </button>
//     </div>
//   );
// }