import { useState } from "react";
import Sidebar from "./Sidebar";
import styles from "./Layout.module.css";

export default function Layout({ children }) {
  const [open, setOpen] = useState(true);

  return (
    <div className={styles.wrapper}>

      <div className={open ? styles.sidebarOpen : styles.sidebarClosed}>
        <Sidebar open={open} setOpen={setOpen} />
      </div>

      <div className={styles.main}>
        {children}
      </div>

    </div>
  );
}