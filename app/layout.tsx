import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ConditionalLayout from "@/app/components/layout/ConditionalLayout";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "JeepDial - Car Rental Service",
    template: "%s | JeepDial",
  },
  description: "Transform your travel experience with our car rental service.",
  keywords: ["car rental", "jeep", "travel", "booking", "vehicles"],
  authors: [{ name: "JeepDial Team" }],
  creator: "JeepDial",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourdomain.com",
    title: "JeepDial - Car Rental Service",
    description:
      "Transform your travel experience with our car rental service.",
    siteName: "JeepDial",
  },
  twitter: {
    card: "summary_large_image",
    title: "JeepDial - Car Rental Service",
    description:
      "Transform your travel experience with our car rental service.",
    creator: "@jeepdial",
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
      <body
        className={`${geist.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
