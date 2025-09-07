import RouteProtection from "@/app/components/admin/RouteProtection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Admin Dashboard - Gadiyo",
    template: "%s | Gadiyo Admin",
  },
  description: "Admin dashboard for managing cars, bookings, and more",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RouteProtection>{children}</RouteProtection>;
}
