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
          {open && <span>Home</span>}
        </Link>

        <Link to="/items" className={styles.item}>
          <span>🍱</span>
          {open && <span>Items</span>}
        </Link>

        <Link to="/set" className={styles.item}>
          <span>📦</span>
          {open && <span>Sets</span>}
        </Link>

        <Link to="/profile" className={styles.item}>
          <span>👤</span>
          {open && <span>profile</span>}
        </Link>        

      </div>

    </div>
  );
}