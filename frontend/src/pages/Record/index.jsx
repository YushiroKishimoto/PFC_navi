import { useState } from "react";
import styles from "./Record.module.css";

export default function Record() {

  const [mealType, setMealType] = useState("");
  const [name, setName] = useState("");
  const [kcal, setKcal] = useState("");
  const [p, setP] = useState("");
  const [f, setF] = useState("");
  const [c, setC] = useState("");

  const [items, setItems] = useState([]);

  const handleAdd = () => {
    if (!mealType || !name) return;

    const newItem = {
      id: Date.now(),
      mealType,
      name,
      kcal: Number(kcal),
      p: Number(p),
      f: Number(f),
      c: Number(c),
    };

    setItems([...items, newItem]);

    setName("");
    setKcal("");
    setP("");
    setF("");
    setC("");
  };

  return (
    <div className={styles.container}>

      <h2>食事記録</h2>

      {/* ■ 入力 */}
      <div className={styles.form}>

        <select value={mealType} onChange={(e) => setMealType(e.target.value)}>
          <option value="">食事を選択</option>
          <option value="朝">朝</option>
          <option value="昼">昼</option>
          <option value="夜">夜</option>
        </select>

        <input placeholder="食べたもの" value={name}
          onChange={(e) => setName(e.target.value)} />

        <input placeholder="kcal" value={kcal}
          onChange={(e) => setKcal(e.target.value)} />

        <input placeholder="P" value={p}
          onChange={(e) => setP(e.target.value)} />

        <input placeholder="F" value={f}
          onChange={(e) => setF(e.target.value)} />

        <input placeholder="C" value={c}
          onChange={(e) => setC(e.target.value)} />

        <button onClick={handleAdd}>追加</button>

      </div>

      {/* ■ 一覧 */}
      <div className={styles.list}>

        {items.map((item) => (
          <div key={item.id} className={styles.card}>
            <div>{item.mealType}</div>
            <div>{item.name}</div>
            <div>{item.kcal} kcal</div>
            <div>P:{item.p} F:{item.f} C:{item.c}</div>
          </div>
        ))}

      </div>

    </div>
  );
}