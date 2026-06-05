import styles from "./Sidebar.module.css";
import { Link } from "react-router-dom";

export default function Sidebar({ open, setOpen }) {
  return (
    <div className={styles.sidebar}>

      {/* 上部 */}
      <div className={styles.top}>
        <button
          className={styles.hamburger}
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        {open && <span className={styles.title}>MENU</span>}
      </div>


      {/* メニュー */}
      <div className={styles.menu}>

        <Link to="/" className={styles.item}>
          <span>🏠</span>
          {open && <span>ダッシュボード</span>}
        </Link>

        <Link to="/items" className={styles.item}>
          <span>🍱</span>
          {open && <span>食材・料理の登録</span>}
        </Link>

        <Link to="/set" className={styles.item}>
          <span>📦</span>
          {open && <span>セット登録</span>}
        </Link>

        <Link to="/profile" className={styles.item}>
          <span>👤</span>
          {open && <span>プロフィール</span>}
        </Link>        

        <Link to="/list" className={styles.item}>
          <span>📚</span>
          {open && <span>登録一覧</span>}
        </Link>        
      </div>

    </div>
  );
}