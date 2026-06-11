import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css";

export default function Sidebar({ open, setOpen }) {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div className={`${styles.sidebar} ${open ? styles.open : styles.closed}`}>

      {/* トップ */}
      <div className={styles.top}>
        <button
          className={styles.hamburger}
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        {open && <div className={styles.title}>PFC App</div>}
      </div>

      {/* WORKSPACE */}
      <Link to="/" className={`${styles.item} ${isActive("/") ? styles.active : ""}`}>
        <span>🏠</span>
        {open && <span>ダッシュボード</span>}
      </Link>

      {/* FOOD */}
      <Link to="/items" className={`${styles.item} ${isActive("/items") ? styles.active : ""}`}>
        <span>🍱</span>
        {open && <span>食材・料理</span>}
      </Link>

      <Link to="/set" className={`${styles.item} ${isActive("/set") ? styles.active : ""}`}>
        <span>📦</span>
        {open && <span>セット登録</span>}
      </Link>

      {/* USER */}
      <Link to="/profile" className={`${styles.item} ${isActive("/profile") ? styles.active : ""}`}>
        <span>👤</span>
        {open && <span>プロフィール</span>}
      </Link>

      {/* DATA */}
      <Link to="/list" className={`${styles.item} ${isActive("/list") ? styles.active : ""}`}>
        <span>📚</span>
        {open && <span>登録一覧</span>}
      </Link>

      <Link
        to="/analysis"
        className={`${styles.item} ${isActive("/analysis") ? styles.active : ""}`}>
        <span>📊</span>
        {open && <span>分析</span>}
      </Link>



      {/* 下部：ログアウト */}
      <div className={styles.bottom}>
        <button
          className={styles.logoutButton}
          onClick={handleLogout}
        >
          {open && "ログアウト"}
        </button>
      </div>

    </div>
  );
}