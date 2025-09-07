"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ROUTES } from "@/app/lib/constants";

interface RouteProtectionProps {
  children: React.ReactNode;
}

export default function RouteProtection({ children }: RouteProtectionProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
      const isLoginPage = pathname === ROUTES.CLIENT_ROUTES.adminlogin;

      if (isLoggedIn && isLoginPage) {
        // Logged in user trying to access login page
        router.push(ROUTES.ADMIN_ROUTES.dashboard);
        return;
      }

      if (!isLoggedIn && !isLoginPage) {
        // Not logged in user trying to access protected pages
        router.push(ROUTES.CLIENT_ROUTES.adminlogin);
        return;
      }

      setIsAuthenticated(isLoggedIn);
      setIsLoading(false);
    };

    checkAuth();
  }, [pathname, router]);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: "#f9fafb",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              border: "3px solid #e5e7eb",
              borderTop: "3px solid #fab12f",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          ></div>
          <p style={{ color: "#6b7280", margin: 0 }}>Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
