"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { NavbarProps } from "@/app/types/admin";
import Icons from "@/app/components/shared/Icons";
import ConfirmModal from "@/app/components/admin/ui/ConfirmModal";
import styles from "@/app/styles/admin/navbar.module.css";
import { ROUTES } from "@/app/lib/constants";

const Navbar: React.FC<NavbarProps> = ({ setOpenSidebar }) => {
  const [isLogoutModal, setIsLogoutModal] = useState<boolean>(false);
  const router = useRouter();

  const toggleMenu = (): void => {
    setOpenSidebar((prev: boolean) => !prev);
  };

  const handleOpenLogout = (): void => {
    setIsLogoutModal(true);
  };

  const handleLogout = (): void => {
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("adminUser");
    router.push(ROUTES.CLIENT_ROUTES.adminlogin);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <button
          className={styles.menu_toggle}
          onClick={toggleMenu}
          aria-label="Toggle sidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        <div className={styles.navbar_right}>
          <button
            className={`rounded-md bg-primary flex items-center py-[10px] px-[30px] text-base font-medium text-white hover:bg-opacity-90 ${styles.logoutButton}`}
            onClick={handleOpenLogout}
          >
            <span>Logout</span>
            <span className="pl-3">
              <Icons
                name="LogOut"
                size={16}
                color="
#ffffff"
              />
            </span>
          </button>
        </div>
      </nav>

      <ConfirmModal
        isOpen={isLogoutModal}
        type="logout"
        onCancel={() => setIsLogoutModal(false)}
        onConfirm={() => {
          handleLogout();
          setIsLogoutModal(false);
        }}
      />
    </>
  );
};

export default Navbar;
