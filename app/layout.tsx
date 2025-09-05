import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/app/components/ui/Header";
import Footer from "@/app/components/ui/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "MobileApp - Revolutionary Mobile Experience",
    template: "%s | MobileApp",
  },
  description:
    "Transform your mobile experience with our innovative app. Download now for iOS and Android.",
  keywords: ["mobile app", "iOS", "Android", "productivity", "lifestyle"],
  authors: [{ name: "MobileApp Team" }],
  creator: "MobileApp",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourdomain.com",
    title: "MobileApp - Revolutionary Mobile Experience",
    description: "Transform your mobile experience with our innovative app.",
    siteName: "MobileApp",
  },
  twitter: {
    card: "summary_large_image",
    title: "MobileApp - Revolutionary Mobile Experience",
    description: "Transform your mobile experience with our innovative app.",
    creator: "@yourtwitterhandle",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased" suppressHydrationWarning={true}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
