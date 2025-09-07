"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { SidebarProps, NavItem } from "@/app/types/admin";
import { ROUTES } from "@/app/lib/constants";
import Icons from "@/app/components/shared/Icons";
import Each from "@/app/components/shared/Each";
import styles from "@/app/styles/admin/sidebar.module.css";
import { Gadiyo } from "@/app/assets/images";

const navs: NavItem[] = [
  {
    id: 1,
    name: "Dashboard",
    icon: "LayoutDashboard",
    url: ROUTES.ADMIN_ROUTES.dashboard,
  },
  {
    id: 2,
    name: "Contacts",
    icon: "Contact",
    url: ROUTES.ADMIN_ROUTES.contacts,
  },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setOpenSidebar }) => {
  const pathname = usePathname();

  return (
    <>
      {isOpen && (
        <div className={styles.overlay} onClick={() => setOpenSidebar(false)} />
      )}

      <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div className="d-flex align-items-center">
          <Image
            src={Gadiyo}
            alt="Gadiyo Logo"
            width={150}
            height={40}
            priority
          />
          <button
            className={styles.close_btn}
            onClick={() => setOpenSidebar(false)}
            aria-label="Close sidebar"
          >
            <Icons name="X" size={24} color="black" />
          </button>
        </div>

        <nav className={styles.nav_list}>
          <Each
            of={navs.filter((nav) => nav.name !== "Logout")}
            render={(nav: NavItem) => (
              <Link
                key={nav.id}
                href={nav.url}
                className={pathname === nav.url ? styles.active : ""}
                onClick={() => setOpenSidebar(false)}
              >
                <Icons
                  name={nav.icon}
                  color={pathname === nav.url ? "black" : "#57595f"}
                  size={18}
                />
                <span>{nav.name}</span>
              </Link>
            )}
          />
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
