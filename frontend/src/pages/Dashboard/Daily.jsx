import styles from "./Daily.module.css";
import { useNavigate } from "react-router-dom";

export default function Daily() {
  const navigate = useNavigate();

  const meals = {
    breakfast: {
      title: "朝食",
      items: [
        { name: "オートミール", kcal: 300, p: 15, f: 8, c: 40 },
      ],
    },
    lunch: {
      title: "昼食",
      items: [
        { name: "鶏むね肉", kcal: 400, p: 35, f: 10, c: 20 },
      ],
    },
    dinner: {
      title: "夕食",
      items: [
        { name: "魚", kcal: 350, p: 25, f: 15, c: 5 },
      ],
    },
  };

  return (
    <div className={styles.container}>

      <h2>Daily</h2>

      <div className={styles.bottomGrid}>
        {Object.entries(meals).map(([key, meal]) => (
          <div key={key} className={styles.mealCard}>

            <h4>{meal.title}</h4>

            <div className={styles.foodList}>
              {meal.items.map((item, i) => (
                <div key={i} className={styles.foodItem}>
                  <span>{item.name}</span>
                  <span>{item.kcal} kcal</span>
                  <span>P:{item.p} F:{item.f} C:{item.c}</span>
                </div>
              ))}
            </div>

            {/* ★追加ボタン */}
            <button
              className={styles.addButton}
              onClick={() => navigate("/items")}
            >
              ＋ 追加
            </button>

          </div>
        ))}
      </div>

    </div>
  );
}