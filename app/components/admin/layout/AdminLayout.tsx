"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import styles from "@/app/styles/admin/layout.module.css";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      {/* Header */}
      <header>
        <Navbar setOpenSidebar={setIsSidebarOpen} />
      </header>

      <div className={styles.content}>
        {/* Sidebar */}
        <aside>
          <Sidebar isOpen={isSidebarOpen} setOpenSidebar={setIsSidebarOpen} />
        </aside>

        {/* Main Content */}
        <main className={styles.main}>{children}</main>
      </div>

      {/* Footer */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default AdminLayout;
