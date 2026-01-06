"use client";
import { useState } from "react";
import Modal from "@/components/ui/modal";

import { Github, Smartphone, Apple, Monitor, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [isIosModalOpen, setIsIosModalOpen] = useState(false);

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
    <>
      {/* Hero Section */}
      <section
        id="hero"
        className="flex flex-col items-center text-center mb-10 md:mb-16 scroll-mt-10"
      >
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
          <a
            href="#email-section"
            className="bg-accent text-black px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-accent/90 transition-all btn-glow text-sm cursor-pointer"
          >
            دریافت کانفیگ‌ VPN
          </a>
          <a
            href="https://github.com/iranspro"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-accent/40 bg-accent/5 backdrop-blur-md px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-accent/10 transition-all text-sm cursor-pointer text-accent"
          >
            <Github size={18} />
            گیت هاب
          </a>
        </div>
      </section>

      {/* Download Section - Grid Layout */}
      <section
        id="download"
        className="w-full mb-8 md:mb-12 card-glow p-6 rounded-3xl scroll-mt-10"
      >
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
            <button
              onClick={() => setIsIosModalOpen(true)}
              className="w-full bg-accent text-black py-1.5 md:py-2 rounded-lg font-bold hover:bg-accent/90 transition-all text-[10px] cursor-pointer md:text-sm"
            >
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
          بدون ردیابی • بدون نیاز به ثبت نام • امن • متن‌باز
        </p>
      </section>

      {/* Email Subscription - Single Card like image */}
      <section
        id="email-section"
        className="w-full mb-8 md:mb-12 card-glow p-6 rounded-3xl scroll-mt-10"
      >
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
      </section>

      {/* Open Source Transparency - Single Card like image */}
      <section
        id="open-source"
        className="w-full mb-8 md:mb-12 card-glow p-6 rounded-3xl text-center scroll-mt-10"
      >
        <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
          <h2 className="text-sm font-black md:text-lg">
            ۱۰۰٪ متن‌باز — بدون پروژه مخفی
          </h2>
          <Github size={18} className="text-accent md:w-6 md:h-6" />
        </div>
        <a
          href="https://github.com/iranspro"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-white/5 text-gray-300 py-2.5 rounded-xl font-bold hover:bg-white/10 transition-all border border-white/10 text-xs cursor-pointer md:text-sm md:max-w-xs md:mx-auto block"
        >
          بررسی کد منبع
        </a>
      </section>

      <Modal
        isOpen={isIosModalOpen}
        onClose={() => setIsIosModalOpen(false)}
        title="نسخه iOS"
      >
        <div className="flex flex-col items-center gap-4 py-2">
          <div className="bg-accent/10 p-4 rounded-full text-accent shadow-[0_0_20px_rgba(74,222,128,0.1)]">
            <Apple size={40} />
          </div>
          <div className="text-center">
            <p className="text-2xl font-black text-white mb-2">بزودی...</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              نسخه اختصاصی iOS ممکن است در آینده منتشر شود.
            </p>
          </div>

          <div className="w-full mt-4 p-4 bg-white/[0.03] border border-white/5 rounded-2xl">
            <p className="text-xs font-bold text-gray-400 mb-3 text-center">
              راهنمای اتصال و برنامه‌های پیشنهادی:
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2 p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold">برنامه V2Box</span>
                  <a
                    href="https://apps.apple.com/us/app/v2box-v2ray-client/id6446814690"
                    target="_blank"
                    className="text-accent text-[10px] underline"
                  >
                    لینک اپ استور
                  </a>
                </div>
                <Link
                  href="/guide/v2box"
                  className="w-full bg-accent/10 text-accent py-2 rounded-lg text-xs font-bold text-center border border-accent/20"
                >
                  مشاهده آموزش قدم به قدم
                </Link>
              </div>

              <div className="flex flex-col gap-2 p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold">برنامه Streisand</span>
                  <a
                    href="https://apps.apple.com/us/app/streisand/id6450534064"
                    target="_blank"
                    className="text-accent text-[10px] underline"
                  >
                    لینک اپ استور
                  </a>
                </div>
                <Link
                  href="/guide/streisand"
                  className="w-full bg-accent/10 text-accent py-2 rounded-lg text-xs font-bold text-center border border-accent/20"
                >
                  مشاهده آموزش قدم به قدم
                </Link>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsIosModalOpen(false)}
            className="w-full bg-accent text-black py-3 rounded-xl font-bold hover:bg-accent/90 transition-all cursor-pointer mt-2"
          >
            متوجه شدم
          </button>
        </div>
      </Modal>
    </>
  );
}
