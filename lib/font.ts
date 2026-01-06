import localFont from "next/font/local";

export const YekanBakh = localFont({
  fallback: ["YekanBakh", "YEKANBakh", "YEKANBAKH", "yekanBakh"],
  variable: "--font-yekan-bakh",
  display: "swap",
  src: [
    {
      path: "../public/fonts/YekanBakh/woff2/YekanBakhFaNum-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/YekanBakh/woff2/YekanBakhFaNum-SemiBold.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/YekanBakh/woff2/YekanBakhFaNum-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/YekanBakh/woff2/YekanBakhFaNum-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
});
