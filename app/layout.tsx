import type { Metadata } from "next";
import { YekanBakh } from "@/lib/font";
import "./globals.css";
import SplineBackground from "@/components/layout/spline-background";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Irans Pro - اینترنت آزاد برای ایران",
  description: "ابزارهای دسترسی آزاد برای مبارزه با سانسور اینترنت",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={YekanBakh.variable}>
      <body className="antialiased bg-[#0a0f1a] text-white font-yekan">
        <div className="relative z-10 max-w-2xl mx-auto px-4 py-4 md:py-8 flex flex-col items-center">
          <Header />
          <main className="w-full">{children}</main>
          <Footer />
        </div>
        <Suspense>
          <SplineBackground />
        </Suspense>
      </body>
    </html>
  );
}
