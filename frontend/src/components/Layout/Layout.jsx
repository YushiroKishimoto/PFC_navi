import { useState } from "react";
import Sidebar from "./Sidebar";
import styles from "./Layout.module.css";

export default function Layout({ children }) {
  const [open, setOpen] = useState(true);

  return (
    <div className={styles.wrapper}>

      {/* サイドバー */}
      <aside className={open ? styles.sidebarOpen : styles.sidebarClosed}>
        <Sidebar open={open} setOpen={setOpen} />
      </aside>

      {/* メイン */}
      <main className={styles.main}>
        {children}
      </main>

    </div>
  );
}