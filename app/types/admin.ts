export interface SidebarProps {
  isOpen: boolean;
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface NavbarProps {
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface NavItem {
  id: number;
  name: string;
  icon: any;
  url: string;
}

export interface AdminLayoutProps {
  children: React.ReactNode;
}