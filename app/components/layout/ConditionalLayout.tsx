"use client";

import { usePathname } from "next/navigation";
import Header from "@/app/components/ui/Header";
import Footer from "@/app/components/ui/Footer";
import AdminLayout from "@/app/components/admin/layout/AdminLayout";
import { ROUTES } from "@/app/lib/constants";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({
  children,
}: ConditionalLayoutProps) {
  const pathname = usePathname();

  if (pathname === ROUTES.CLIENT_ROUTES.adminlogin) {
    return <>{children}</>; // Return children without any layout wrapper
  }

  // Check if current route is admin
  if (pathname?.startsWith("/admin")) {
    return <AdminLayout>{children}</AdminLayout>;
  }

  // Default client layout
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
