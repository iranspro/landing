"use client";
import { useState } from "react";
import { Github, Download, Smartphone, Apple, Monitor, Mail, ShieldCheck, Info, Server, Settings, Copy, ExternalLink, HelpCircle, Lock, Share2, CheckCircle2, AlertCircle } from "lucide-react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    // جایگزین کنید با اطلاعات خودتان
    const BOT_TOKEN = "8555568494:AAEZSVrEqS_g1OJUkCoUOzvJWk7zLwB2FrQ"; 
    const CHAT_ID = "-1003616532531";
    const text = `🔔 <b>ایمیل جدید ثبت شد!</b>\n\n📧 ایمیل: <code>${email}</code>\n🌐 دامنه: irans.pro`;

    try {
      const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: text,
          parse_mode: "HTML",
        }),
      });

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
    <div className="min-h-screen bg-[#0a0f1a] text-white font-sans selection:bg-accent/30 bg-pattern" dir="rtl">
      {/* Background Glows & Patterns */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-accent/5 rounded-full blur-[120px]" />
        <div className="absolute top-[10%] -right-[5%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[100px]" />
        
        {/* Circuit Pattern Simulation */}
        <svg className="absolute top-0 right-0 w-full h-full opacity-[0.03]" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M800 100H700V200H600V300H500" stroke="currentColor" strokeWidth="1" />
          <path d="M800 200H750V300H650V400H550" stroke="currentColor" strokeWidth="1" />
          <path d="M800 400H720V500H620V600" stroke="currentColor" strokeWidth="1" />
          <circle cx="500" cy="300" r="4" fill="currentColor" />
          <circle cx="550" cy="400" r="4" fill="currentColor" />
          <circle cx="620" cy="600" r="4" fill="currentColor" />
          
          <path d="M0 150H100V250H200V350" stroke="currentColor" strokeWidth="1" />
          <path d="M0 300H80V400H180V500" stroke="currentColor" strokeWidth="1" />
          <circle cx="200" cy="350" r="4" fill="currentColor" />
          <circle cx="180" cy="500" r="4" fill="currentColor" />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-10 flex flex-col items-center">
        {/* Header */}
        <header className="w-full flex justify-end mb-10 md:mb-14">
          <span className="text-xl md:text-2xl font-bold tracking-tight">İrans Pro</span>
        </header>

        {/* Hero Section */}
        <section className="flex flex-col items-center text-center mb-16 md:20">
          <div className="mb-6 md:mb-8 text-accent">
            {/* Lion Logo (Shir-o-Khorshid style) */}
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-[150px] md:h-[150px] opacity-90 drop-shadow-[0_0_20px_rgba(74,222,128,0.5)]">
              <path d="M15 75C15 75 22 68 30 68C38 68 45 75 50 75C55 75 62 68 70 68C78 68 85 75 85 75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M30 68C30 50 40 38 50 38C60 38 70 50 70 68" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M45 38L50 15L55 38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="50" cy="55" r="10" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M38 22C38 22 44 18 50 18C56 18 62 22 62 22" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
              {/* Sword */}
              <path d="M30 48L70 48" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M35 44V52" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              {/* Sun Rays */}
              <path d="M50 10V14" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
              <path d="M65 15L62 18" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
              <path d="M35 15L38 18" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
            </svg>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 md:mb-5 leading-tight tracking-tight">
            اینترنت آزاد، متن‌باز برای ایران
          </h1>
          <p className="text-gray-400 text-base md:text-lg mb-10 md:mb-12 font-medium max-w-lg">
            ابزارهای دسترسی آزاد برای مبارزه با سانسور اینترنت
          </p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-5">
            <button className="bg-accent text-black px-6 py-3 md:px-10 md:py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-accent/90 transition-all btn-glow text-base md:text-lg">
              دریافت کانفیگ‌ها
            </button>
            <button className="border border-accent/30 bg-accent/5 px-6 py-3 md:px-10 md:py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-accent/10 transition-all text-base md:text-lg">
              <Github size={20} className="md:w-5 md:h-5" />
              مشاهده در گیت‌هاب
            </button>
          </div>
        </section>

        {/* Download Section */}
        <section className="w-full max-w-2xl mb-16 md:20">
          <h2 className="text-xl md:text-2xl font-bold mb-8 md:mb-10 text-center">دانلود اپلیکیشن Irans Pro</h2>
          <div className="space-y-3 md:space-y-4">
            <div className="bg-[#111827]/80 backdrop-blur-md border border-white/5 p-4 md:p-5 rounded-2xl flex items-center justify-between group hover:border-accent/30 transition-all card-glow">
              <div className="flex items-center gap-3 md:gap-5">
                <div className="p-2 md:p-3 bg-accent/10 rounded-xl text-accent">
                  <Smartphone size={24} className="md:w-7 md:h-7" />
                </div>
                <span className="text-base md:text-lg font-bold text-gray-200">اندروید (APK)</span>
              </div>
              <button className="bg-accent/20 text-accent px-5 md:px-8 py-2 md:py-2.5 rounded-xl font-bold hover:bg-accent hover:text-black transition-all text-sm md:text-base">
                دانلود
              </button>
            </div>

            <div className="bg-[#111827]/80 backdrop-blur-md border border-white/5 p-4 md:p-5 rounded-2xl flex items-center justify-between group hover:border-accent/30 transition-all card-glow">
              <div className="flex items-center gap-3 md:gap-5">
                <div className="p-2 md:p-3 bg-accent/10 rounded-xl text-accent">
                  <Apple size={24} className="md:w-7 md:h-7" />
                </div>
                <span className="text-base md:text-lg font-bold text-gray-200">آی‌اواس (TestFlight)</span>
              </div>
              <button className="bg-accent/20 text-accent px-5 md:px-8 py-2 md:py-2.5 rounded-xl font-bold hover:bg-accent hover:text-black transition-all text-sm md:text-base">
                دریافت
              </button>
            </div>

            <div className="bg-[#111827]/40 border border-white/5 p-4 md:p-5 rounded-2xl flex items-center justify-between group opacity-60">
              <div className="flex items-center gap-3 md:gap-5">
                <div className="p-2 md:p-3 bg-accent/10 rounded-xl text-accent">
                  <Monitor size={24} className="md:w-7 md:h-7" />
                </div>
                <span className="text-base md:text-lg font-bold text-gray-200">دسکتاپ</span>
              </div>
              <div className="text-[10px] md:text-xs font-bold bg-white/10 px-3 md:px-4 py-1 md:py-1.5 rounded-full">به زودی</div>
            </div>
          </div>
          <p className="text-center text-gray-500 text-xs md:text-sm mt-6 md:mt-8 font-medium">بدون نیاز به ثبت‌نام • امن • متن‌باز</p>
        </section>

        {/* Email Subscription */}
        <section className="w-full max-w-2xl mb-16 md:20">
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-6 md:mb-8">
            <h2 className="text-xl md:text-2xl font-bold">Email Subscription</h2>
            <Lock size={20} className="text-accent md:w-6 md:h-6" />
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 md:gap-4">
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              dir="ltr"
              placeholder="your@email.com" 
              className="flex-1 bg-[#111827]/80 border border-white/10 rounded-2xl px-5 md:px-6 py-3.5 md:py-4 text-left focus:outline-none focus:border-accent/50 transition-all backdrop-blur-md input-focus text-sm md:text-base"
            />
            <button 
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="bg-accent text-black px-8 md:px-10 py-3.5 md:py-4 rounded-2xl font-bold hover:bg-accent/90 transition-all btn-glow text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[140px]"
            >
              {status === "loading" ? (
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : status === "success" ? (
                <>
                  <CheckCircle2 size={18} />
                  ثبت شد
                </>
              ) : status === "error" ? (
                <>
                  <AlertCircle size={18} />
                  خطا
                </>
              ) : (
                "اطلاع بده"
              )}
            </button>
          </form>
          <p className="text-center text-gray-500 text-xs md:text-sm mt-4 md:mt-5 font-medium">بدون ردیابی • بدون اسپم</p>
        </section>

        {/* Open Source Transparency */}
        <section className="w-full max-w-2xl mb-16 md:20 text-center">
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-4 md:mb-6">
            <h2 className="text-xl md:text-2xl font-bold">Open Source Transparency</h2>
            <Github size={22} className="text-accent md:w-6 md:h-6" />
          </div>
          <p className="text-gray-400 text-base md:text-lg mb-8 md:10 font-medium">۱۰۰٪ متن‌باز — بدون پروژه مخفی</p>
          <button className="bg-accent/10 text-accent px-8 md:px-12 py-3.5 md:py-4 rounded-2xl font-bold hover:bg-accent hover:text-black transition-all border border-accent/30 text-base md:text-lg">
            بررسی کد منبع
          </button>
        </section>

        {/* Configs & Services */}
        <section className="w-full max-w-4xl mb-20 md:24">
          <h2 className="text-xl md:text-2xl font-bold mb-10 md:mb-12 text-center">Configs & Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Help Card */}
            <div className="bg-[#111827]/60 backdrop-blur-md border border-accent/20 p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] flex flex-col items-center text-center card-glow">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-accent/10 rounded-2xl md:rounded-3xl flex items-center justify-center text-accent mb-6 md:mb-8">
                <HelpCircle size={32} className="md:w-10 md:h-10" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-6 md:mb-10">راهنما</h3>
              <button className="w-full border border-accent/30 py-2.5 md:py-3 rounded-xl md:rounded-2xl font-bold hover:bg-accent/10 transition-all text-sm md:text-base">
                شروع سریع
              </button>
            </div>

            {/* Services Card */}
            <div className="bg-[#111827]/60 backdrop-blur-md border border-accent/20 p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] flex flex-col items-center text-center card-glow">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-accent/10 rounded-2xl md:rounded-3xl flex items-center justify-center text-accent mb-6 md:mb-8">
                <Server size={32} className="md:w-10 md:h-10" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-6 md:mb-10">سرویس‌ها</h3>
              <div className="flex gap-3 md:gap-4 w-full">
                <button className="flex-1 border border-accent/30 py-2.5 md:py-3 rounded-xl md:rounded-2xl font-bold hover:bg-accent/10 transition-all text-sm md:text-base">وضعیت</button>
                <button className="flex-1 border border-accent/30 py-2.5 md:py-3 rounded-xl md:rounded-2xl font-bold hover:bg-accent/10 transition-all text-sm md:text-base">راه‌اندازی</button>
              </div>
            </div>

            {/* Configs Card */}
            <div className="bg-[#111827]/60 backdrop-blur-md border border-accent/20 p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] flex flex-col items-center text-center card-glow sm:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-accent/10 rounded-2xl md:rounded-3xl flex items-center justify-center text-accent mb-6 md:mb-8">
                <Share2 size={32} className="md:w-10 md:h-10" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-6 md:mb-10">کانفیگ‌ها</h3>
              <div className="flex gap-3 md:gap-4 w-full">
                <button className="flex-1 border border-accent/30 py-2.5 md:py-3 rounded-xl md:rounded-2xl font-bold hover:bg-accent/10 transition-all flex items-center justify-center gap-2 text-sm md:text-base">
                  <Download size={16} className="md:w-5 md:h-5" />
                  دانلود
                </button>
                <button className="flex-1 border border-accent/30 py-2.5 md:py-3 rounded-xl md:rounded-2xl font-bold hover:bg-accent/10 transition-all flex items-center justify-center gap-2 text-sm md:text-base">
                  <Copy size={16} className="md:w-5 md:h-5" />
                  کپی
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full text-center border-t border-white/5 pt-16 pb-12">
          <p className="text-gray-200 text-lg md:text-xl font-bold mb-6 md:mb-8">İrans Pro ©</p>
          <div className="flex justify-center gap-4 md:gap-8 text-sm md:text-base text-gray-500 mb-8 md:10 font-medium">
            <a href="#" className="hover:text-accent transition-colors">گیت‌هاب</a>
            <span>•</span>
            <a href="#" className="hover:text-accent transition-colors">مستندات</a>
            <span>•</span>
            <a href="#" className="hover:text-accent transition-colors">امنیت</a>
          </div>
          <p className="text-[10px] md:text-sm text-gray-600 font-medium">ساخته شده برای آزادی دیجیتال</p>
        </footer>
      </div>
    </div>
  );
}



