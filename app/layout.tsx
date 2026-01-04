import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { YekanBakh } from "@/lib/font";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "İrans Pro - اینترنت آزاد برای ایران",
  description: "ابزارهای دسترسی آزاد برای مبارزه با سانسور اینترنت",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${YekanBakh.variable} ${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0f1a] text-white font-yekan`}
      >
        {children}
      </body>
    </html>
  );
}
