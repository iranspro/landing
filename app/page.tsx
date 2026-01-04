import { Github, Download, Smartphone, Apple, Monitor, Mail, ShieldCheck, Info, Server, Settings, Copy, ExternalLink, HelpCircle, Lock, Share2 } from "lucide-react";

export default function Home() {
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

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-10 flex flex-col items-center">
        {/* Header */}
        <header className="w-full flex justify-end mb-14">
          <span className="text-2xl font-bold tracking-tight">İrans Pro</span>
        </header>

        {/* Hero Section */}
        <section className="flex flex-col items-center text-center mb-20">
          <div className="mb-8 text-accent">
            {/* Lion Logo (Shir-o-Khorshid style) */}
            <svg width="150" height="150" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-90 drop-shadow-[0_0_20px_rgba(74,222,128,0.5)]">
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
          <h1 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight tracking-tight">
            اینترنت آزاد، متن‌باز برای ایران
          </h1>
          <p className="text-gray-400 text-lg mb-12 font-medium max-w-lg">
            ابزارهای دسترسی آزاد برای مبارزه با سانسور اینترنت
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <button className="bg-accent text-black px-10 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-accent/90 transition-all btn-glow text-lg">
              دریافت کانفیگ‌ها
            </button>
            <button className="border border-accent/30 bg-accent/5 px-10 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-accent/10 transition-all text-lg">
              <Github size={22} />
              مشاهده در گیت‌هاب
            </button>
          </div>
        </section>

        {/* Download Section */}
        <section className="w-full mb-20">
          <h2 className="text-2xl font-bold mb-10 text-center">دانلود اپلیکیشن Irans Pro</h2>
          <div className="space-y-4">
            <div className="bg-[#111827]/80 backdrop-blur-md border border-white/5 p-5 rounded-2xl flex items-center justify-between group hover:border-accent/30 transition-all card-glow">
              <div className="flex items-center gap-5">
                <div className="p-3 bg-accent/10 rounded-xl text-accent">
                  <Smartphone size={28} />
                </div>
                <span className="text-lg font-bold text-gray-200">اندروید (APK)</span>
              </div>
              <button className="bg-accent/20 text-accent px-8 py-2.5 rounded-xl font-bold hover:bg-accent hover:text-black transition-all">
                دانلود
              </button>
            </div>

            <div className="bg-[#111827]/80 backdrop-blur-md border border-white/5 p-5 rounded-2xl flex items-center justify-between group hover:border-accent/30 transition-all card-glow">
              <div className="flex items-center gap-5">
                <div className="p-3 bg-accent/10 rounded-xl text-accent">
                  <Apple size={28} />
                </div>
                <span className="text-lg font-bold text-gray-200">آی‌اواس (TestFlight)</span>
              </div>
              <button className="bg-accent/20 text-accent px-8 py-2.5 rounded-xl font-bold hover:bg-accent hover:text-black transition-all">
                دریافت
              </button>
            </div>

            <div className="bg-[#111827]/40 border border-white/5 p-5 rounded-2xl flex items-center justify-between group opacity-60">
              <div className="flex items-center gap-5">
                <div className="p-3 bg-accent/10 rounded-xl text-accent">
                  <Monitor size={28} />
                </div>
                <span className="text-lg font-bold text-gray-200">دسکتاپ (ویندوز / مک‌اواس / لینوکس)</span>
              </div>
              <div className="text-xs font-bold bg-white/10 px-4 py-1.5 rounded-full">به زودی</div>
            </div>
          </div>
          <p className="text-center text-gray-500 text-sm mt-8 font-medium">بدون نیاز به ثبت‌نام • امن • متن‌باز</p>
        </section>

        {/* Email Subscription */}
        <section className="w-full mb-20">
          <div className="flex items-center justify-center gap-3 mb-8">
            <h2 className="text-2xl font-bold">Email Subscription</h2>
            <Lock size={24} className="text-accent" />
          </div>
          <div className="flex gap-4">
            <input 
              type="email" 
              placeholder="برای دریافت به‌روزرسانی‌ها ایمیل خود را وارد کنید" 
              className="flex-1 bg-[#111827]/80 border border-white/10 rounded-2xl px-6 py-4 text-right focus:outline-none focus:border-accent/50 transition-all backdrop-blur-md input-focus"
            />
            <button className="bg-accent text-black px-10 py-4 rounded-2xl font-bold hover:bg-accent/90 transition-all btn-glow">
              اطلاع بده
            </button>
          </div>
          <p className="text-center text-gray-500 text-sm mt-5 font-medium">بدون ردیابی • بدون اسپم</p>
        </section>

        {/* Open Source Transparency */}
        <section className="w-full mb-20 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <h2 className="text-2xl font-bold">Open Source Transparency</h2>
            <Github size={26} className="text-accent" />
          </div>
          <p className="text-gray-400 text-lg mb-10 font-medium">۱۰۰٪ متن‌باز — بدون پروژه مخفی</p>
          <button className="bg-accent/10 text-accent px-12 py-4 rounded-2xl font-bold hover:bg-accent hover:text-black transition-all border border-accent/30 text-lg">
            بررسی کد منبع
          </button>
        </section>

        {/* Configs & Services */}
        <section className="w-full mb-24">
          <h2 className="text-2xl font-bold mb-12 text-center">Configs & Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Help Card */}
            <div className="bg-[#111827]/60 backdrop-blur-md border border-accent/20 p-10 rounded-[2.5rem] flex flex-col items-center text-center card-glow">
              <div className="w-20 h-20 bg-accent/10 rounded-3xl flex items-center justify-center text-accent mb-8">
                <HelpCircle size={40} />
              </div>
              <h3 className="text-xl font-bold mb-10">راهنما</h3>
              <button className="w-full border border-accent/30 py-3 rounded-2xl font-bold hover:bg-accent/10 transition-all">
                شروع سریع
              </button>
            </div>

            {/* Services Card */}
            <div className="bg-[#111827]/60 backdrop-blur-md border border-accent/20 p-10 rounded-[2.5rem] flex flex-col items-center text-center card-glow">
              <div className="w-20 h-20 bg-accent/10 rounded-3xl flex items-center justify-center text-accent mb-8">
                <Server size={40} />
              </div>
              <h3 className="text-xl font-bold mb-10">سرویس‌ها</h3>
              <div className="flex gap-4 w-full">
                <button className="flex-1 border border-accent/30 py-3 rounded-2xl font-bold hover:bg-accent/10 transition-all">وضعیت</button>
                <button className="flex-1 border border-accent/30 py-3 rounded-2xl font-bold hover:bg-accent/10 transition-all">راه‌اندازی</button>
              </div>
            </div>

            {/* Configs Card */}
            <div className="bg-[#111827]/60 backdrop-blur-md border border-accent/20 p-10 rounded-[2.5rem] flex flex-col items-center text-center card-glow">
              <div className="w-20 h-20 bg-accent/10 rounded-3xl flex items-center justify-center text-accent mb-8">
                <Share2 size={40} />
              </div>
              <h3 className="text-xl font-bold mb-10">کانفیگ‌ها</h3>
              <div className="flex gap-4 w-full">
                <button className="flex-1 border border-accent/30 py-3 rounded-2xl font-bold hover:bg-accent/10 transition-all flex items-center justify-center gap-2">
                  <Download size={20} />
                  دانلود
                </button>
                <button className="flex-1 border border-accent/30 py-3 rounded-2xl font-bold hover:bg-accent/10 transition-all flex items-center justify-center gap-2">
                  <Copy size={20} />
                  کپی
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full text-center border-t border-white/5 pt-20 pb-16">
          <p className="text-gray-200 text-xl font-bold mb-8">İrans Pro ©</p>
          <div className="flex justify-center gap-8 text-base text-gray-500 mb-10 font-medium">
            <a href="#" className="hover:text-accent transition-colors">گیت‌هاب</a>
            <span>•</span>
            <a href="#" className="hover:text-accent transition-colors">مستندات</a>
            <span>•</span>
            <a href="#" className="hover:text-accent transition-colors">امنیت</a>
          </div>
          <p className="text-sm text-gray-600 font-medium">ساخته شده برای آزادی دیجیتال</p>
        </footer>
      </div>
    </div>
  );
}



