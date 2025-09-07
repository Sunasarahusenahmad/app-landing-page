import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard - Gadiyo",
  description: "Admin dashboard for managing cars, bookings, and more",
};

export default function AdminDashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome to the admin panel</p>
    </div>
  );
}
