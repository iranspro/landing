"use client";
import { useState, Suspense } from "react";
import dynamic from "next/dynamic";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
});

import {
  Github,
  Download,
  Smartphone,
  Apple,
  Monitor,
  Mail,
  ShieldCheck,
  Info,
  Server,
  Settings,
  Copy,
  ExternalLink,
  HelpCircle,
  Lock,
  Share2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    // جایگزین کنید با اطلاعات خودتان
    const BOT_TOKEN = "8555568494:AAEZSVrEqS_g1OJUkCoUOzvJWk7zLwB2FrQ";
    const CHAT_ID = "-1003616532531";
    const text = `🔔 <b>ایمیل جدید ثبت شد!</b>\n\n📧 ایمیل: <code>${email}</code>\n🌐 دامنه: irans.pro`;

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: text,
            parse_mode: "HTML",
          }),
        }
      );

      if (response.ok) {
        setStatus("success");
        setEmail("");
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div
      className="min-h-screen bg-[#0a0f1a] text-white font-sans selection:bg-accent/30"
      dir="rtl"
    >
      {/* Background Spline */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <Suspense fallback={<div className="bg-[#0a0f1a] w-full h-full" />}>
          {/* <Spline scene="https://prod.spline.design/RCrQLFcf-RaPVYbO/scene.splinecode" /> */}
          <Spline scene="https://prod.spline.design/DmoWFKEKpfDgzqay/scene.splinecode" />
        </Suspense>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[#0a0f1a]/90" />
        {/* <div className="absolute inset-0 bg-black/80" /> */}
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-4 md:py-8 flex flex-col items-center">
        {/* Header - Justify between for logo and guide link */}
        <header className="w-full flex justify-between items-center mb-8 md:mb-12">
          <Link
            href="#"
            className="text-smtext-gray-400 hover:text-white transition-colors font-medium flex items-center gap-2 text-sm md:text-base border border-white/5 bg-white/[0.02] px-4 py-1.5 rounded-xl hover:bg-white/[0.05]"
          >
            <HelpCircle size={16} className="text-accent" />
            راهنما
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-white">
              Irans Pro
            </span>
            <div className="text-accent">
              <Image
                src="/logo.png"
                alt="Irans Pro Logo"
                width={40}
                height={40}
                className="w-10 h-10 opacity-90 drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]"
              />
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="flex flex-col items-center text-center mb-10 md:mb-16">
          <div className="mb-4 md:mb-6 text-accent hidden md:block">
            <Image
              src="/logo.png"
              alt="Irans Pro Logo"
              width={200}
              height={200}
              className="size-32 opacity-90 drop-shadow-[0_0_15px_rgba(74,222,128,0.4)]"
            />
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight tracking-tight bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
            اینترنت آزاد، متن‌باز برای ایران
          </h1>
          <p className="text-gray-400 text-sm md:text-base mb-6 md:mb-10 font-medium max-w-lg leading-relaxed">
            ابزارهای دسترسی آزاد برای مبارزه با سانسور اینترنت
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button className="bg-accent text-black px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-accent/90 transition-all btn-glow text-sm cursor-pointer">
              دریافت کانفیگ‌ها
            </button>
            <button className="border border-accent/40 bg-accent/5 backdrop-blur-md px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-accent/10 transition-all text-sm cursor-pointer text-accent">
              <Github size={18} />
              مشاهده در گیت‌هاب
            </button>
          </div>
        </section>

        {/* Download Section - Grid Layout */}
        <section className="w-full mb-8 md:mb-12 card-glow p-6 rounded-3xl">
          <h2 className="text-lg font-black mb-8 text-center md:text-2xl">
            دانلود اپلیکیشن Irans Pro
          </h2>
          <div className="grid grid-cols-3 gap-2 md:gap-4">
            <div className="flex flex-col gap-2 group bg-white/[0.02] p-3 md:p-4 rounded-2xl border border-white/5 hover:bg-white/[0.05] transition-all">
              <div className="flex items-center flex-col gap-2 md:gap-3">
                <div className="p-1.5 md:p-2 bg-accent/10 rounded-lg text-accent shrink-0">
                  <Smartphone size={18} className="md:w-6 md:h-6" />
                </div>
                <span className="text-[10px] font-bold text-gray-400 md:text-sm">
                  Android
                </span>
              </div>
              <button className="w-full bg-accent text-black py-1.5 md:py-2 rounded-lg font-bold hover:bg-accent/90 transition-all text-[10px] cursor-pointer md:text-sm">
                دانلود
              </button>
            </div>

            <div className="flex flex-col gap-2 group bg-white/[0.02] p-3 md:p-4 rounded-2xl border border-white/5 hover:bg-white/[0.05] transition-all">
              <div className="flex items-center flex-col gap-2 md:gap-3">
                <div className="p-1.5 md:p-2 bg-accent/10 rounded-lg text-accent shrink-0">
                  <Apple size={18} className="md:w-6 md:h-6" />
                </div>
                <span className="text-[10px] font-bold text-gray-400 md:text-sm">
                  iOS
                </span>
              </div>
              <button className="w-full bg-accent text-black py-1.5 md:py-2 rounded-lg font-bold hover:bg-accent/90 transition-all text-[10px] cursor-pointer md:text-sm">
                دانلود
              </button>
            </div>

            <div className="flex flex-col gap-2 group bg-white/[0.02] p-3 md:p-4 rounded-2xl border border-white/5 hover:bg-white/[0.05] transition-all">
              <div className="flex items-center flex-col gap-2 md:gap-3">
                <div className="p-1.5 md:p-2 bg-accent/10 rounded-lg text-accent shrink-0">
                  <Monitor size={18} className="md:w-6 md:h-6" />
                </div>
                <span className="text-[10px] font-bold text-gray-400 md:text-sm">
                  Desktop
                </span>
              </div>
              <button className="w-full bg-accent text-black py-1.5 md:py-2 rounded-lg font-bold hover:bg-accent/90 transition-all text-[10px] cursor-pointer md:text-sm">
                دانلود
              </button>
            </div>
          </div>
          <p className="text-center text-gray-400 text-xs mt-8 font-medium md:text-xs">
            بدون نیاز به ثبت‌نام • امن • متن‌باز
          </p>
        </section>

        {/* Email Subscription - Single Card like image */}
        <section className="w-full mb-8 md:mb-12 card-glow p-6 rounded-3xl">
          <div className="flex flex-col items-center mb-4 md:mb-6">
            <div className="p-2 bg-accent/10 rounded-lg mb-3 md:mb-4">
              <Lock size={20} className="text-accent md:w-6 md:h-6" />
            </div>
            <h2 className="text-base font-black md:text-xl">
              Email Subscription
            </h2>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 bg-white/[0.02] border border-white/10 rounded-xl p-1.5 md:p-3 md:max-w-xl md:mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              dir="rtl"
              placeholder="ایمیل خود را برای دریافت آپدیت‌ها وارد کنید"
              className="flex-1 bg-transparent border-none text-right focus:outline-none text-xs text-gray-300 px-2 md:text-base"
            />
            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="bg-accent text-black px-4 py-2 rounded-lg font-bold hover:bg-accent/90 transition-all text-xs disabled:opacity-50 cursor-pointer min-w-[80px] md:text-sm md:px-6 md:py-3"
            >
              {status === "loading"
                ? "..."
                : status === "success"
                ? "ثبت شد"
                : "آگاه‌سازی"}
            </button>
          </form>
          <p className="text-center text-gray-400 text-xs mt-4 font-medium md:text-xs">
            بدون ردیابی • بدون اسپم
          </p>
        </section>

        {/* Open Source Transparency - Single Card like image */}
        <section className="w-full mb-8 md:mb-12 card-glow p-6 rounded-3xl text-center">
          <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
            <h2 className="text-sm font-black md:text-lg">
              ۱۰۰٪ متن‌باز — بدون پروژه مخفی
            </h2>
            <Github size={18} className="text-accent md:w-6 md:h-6" />
          </div>
          <button className="w-full bg-white/5 text-gray-300 py-2.5 rounded-xl font-bold hover:bg-white/10 transition-all border border-white/10 text-xs cursor-pointer md:text-sm md:max-w-xs md:mx-auto">
            بررسی کد منبع
          </button>
        </section>

        {/* Configs & Services - Grid like image */}
        {/* <section className="w-full mb-12 md:mb-24">
          <div className="grid grid-cols-3 gap-3 md:gap-6">
            <div className="card-glow p-4 rounded-2xl flex flex-col items-center text-center bg-white/[0.03] border border-white/10 md:p-8">
              <div className="p-2 bg-accent/10 rounded-lg text-accent mb-3 md:mb-6">
                <HelpCircle size={20} className="md:w-8 md:h-8" />
              </div>
              <h3 className="text-[10px] font-black mb-4 md:text-lg">راهنما</h3>
              <button className="w-full border border-white/10 py-1.5 rounded-lg text-[9px] font-bold hover:bg-accent hover:text-black hover:border-accent transition-all cursor-pointer md:text-sm md:py-3">
                شروع سریع
              </button>
            </div>

            <div className="card-glow p-4 rounded-2xl flex flex-col items-center text-center bg-white/[0.03] border border-white/10 md:p-8">
              <div className="p-2 bg-accent/10 rounded-lg text-accent mb-3 md:mb-6">
                <Server size={20} className="md:w-8 md:h-8" />
              </div>
              <h3 className="text-[10px] font-black mb-4 md:text-lg">
                سرویس‌ها
              </h3>
              <div className="flex gap-1.5 w-full md:gap-3">
                <button className="flex-1 border border-white/10 py-1.5 rounded-lg text-[9px] font-bold hover:bg-accent hover:text-black hover:border-accent transition-all cursor-pointer md:text-sm md:py-3">
                  وضعیت
                </button>
                <button className="flex-1 border border-white/10 py-1.5 rounded-lg text-[9px] font-bold hover:bg-accent hover:text-black hover:border-accent transition-all cursor-pointer md:text-sm md:py-3">
                  راه‌اندازی
                </button>
              </div>
            </div>

            <div className="card-glow p-4 rounded-2xl flex flex-col items-center text-center bg-white/[0.03] border border-white/10 md:p-8">
              <div className="p-2 bg-accent/10 rounded-lg text-accent mb-3 md:mb-6">
                <Share2 size={20} className="md:w-8 md:h-8" />
              </div>
              <h3 className="text-[10px] font-black mb-4 md:text-lg">
                کانفیگ‌ها
              </h3>
              <div className="flex gap-1.5 w-full md:gap-3">
                <button className="flex-1 border border-white/10 py-1.5 rounded-lg text-[9px] font-bold hover:bg-accent hover:text-black hover:border-accent transition-all cursor-pointer md:text-sm md:py-3">
                  کپی
                </button>
                <button className="flex-1 border border-white/10 py-1.5 rounded-lg text-[9px] font-bold hover:bg-accent hover:text-black hover:border-accent transition-all cursor-pointer md:text-sm md:py-3">
                  دانلود
                </button>
              </div>
            </div>
          </div>
        </section> */}

        {/* Footer */}
        <footer className="w-full text-center py-8 md:py-16">
          <p className="text-white text-lg font-medium mb-4 md:mb-6">
            Irans Pro ©
          </p>
          <div className="flex justify-center gap-4 text-xs md:text-sm text-gray-300 mb-6 md:mb-8">
            <a
              href="#"
              className="hover:text-accent transition-colors cursor-pointer"
            >
              گیت‌هاب
            </a>
            <span>•</span>
            <a
              href="#"
              className="hover:text-accent transition-colors cursor-pointer"
            >
              مستندات
            </a>
            <span>•</span>
            <a
              href="#"
              className="hover:text-accent transition-colors cursor-pointer"
            >
              امنیت
            </a>
          </div>
          <p className="text-xs md:text-sm lg:text-base text-gray-300 font-semibold">
            توسعه‌یافته توسط{" "}
            <Link
              href="https://t.me/POUYAM_APPBOT/start"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Pouyam World
            </Link>{" "}
            برای آزادی دیجیتال
          </p>
        </footer>
      </div>
    </div>
  );
}
