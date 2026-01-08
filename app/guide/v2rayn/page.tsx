"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ArrowLeft, Info, ExternalLink, Monitor } from "lucide-react";

// Importing images from assets
import step1 from "@/assets/v2rayn/step-1.jpg";
import step2 from "@/assets/v2rayn/step-2.jpg";
import step3 from "@/assets/v2rayn/step-3.jpg";

export default function V2RayNGuide() {
  return (
    <div className="w-full">
      <div className="mb-8 flex items-center justify-between">
        <Link
          href="/guide"
          className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors text-sm"
        >
          <ChevronRight size={20} />
          بازگشت به راهنما
        </Link>
        <h1 className="text-xl md:text-2xl font-black">
          راهنمای اتصال v2rayN
        </h1>
      </div>

      <section className="mb-10 card-glow p-6 rounded-3xl">
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
          <div className="bg-[#6366f1]/10 p-4 rounded-3xl">
            <Monitor size={60} className="text-[#6366f1]" />
          </div>
          <div className="text-center md:text-right flex-1">
            <h2 className="text-lg font-bold mb-2">
              دریافت اپلیکیشن v2rayN
            </h2>
            <p className="text-gray-400 text-sm mb-4">
              برنامه v2rayN برای ویندوز، مک و لینوکس قابل استفاده است.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <a
                href="https://en.v2rayn.org/download/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#6366f1] text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-[#6366f1]/90 transition-all"
              >
                <ExternalLink size={16} />
                سایت رسمی
              </a>
              <a
                href="https://github.com/2dust/v2rayN/releases"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-white/20 transition-all border border-white/10"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                دانلود از GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex gap-3 items-start mb-8">
          <Info size={18} className="text-accent shrink-0 mt-0.5" />
          <div className="text-xs text-gray-400 space-y-1">
            <p>• اگر سایت رسمی فیلتر بود، از لینک GitHub استفاده کنید.</p>
            <p>• این برنامه کراس‌پلتفرم است و روی ویندوز، مک و لینوکس کار می‌کند.</p>
            <p>• برنامه رایگان و متن‌باز است.</p>
          </div>
        </div>

        <div className="space-y-12">
          {/* Step 1 */}
          <div className="relative">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-accent text-black w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">
                ۱
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">
                  کپی کردن کانفیگ و وارد کردن به برنامه
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  ابتدا کانفیگی که از طریق ایمیل دریافت کرده‌اید را کپی کنید.
                  سپس برنامه v2rayN را باز کنید، از منوی بالا روی{" "}
                  <span className="text-white font-bold">Servers</span>{" "}
                  کلیک کرده و گزینه{" "}
                  <span className="text-accent font-bold">Import bulk URL from clipboard</span>{" "}
                  را انتخاب کنید.
                </p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl mx-auto">
              <Image
                src={step1}
                alt="v2rayN Step 1"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-accent text-black w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">
                ۲
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">
                  فعال‌سازی کانفیگ
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  پس از اضافه شدن کانفیگ‌ها به لیست، روی کانفیگ مورد نظر{" "}
                  <span className="text-white font-bold">کلیک راست</span>{" "}
                  کرده و گزینه{" "}
                  <span className="text-accent font-bold">Set as active server</span>{" "}
                  را بزنید تا این کانفیگ به عنوان سرور فعال انتخاب شود.
                </p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl mx-auto">
              <Image
                src={step2}
                alt="v2rayN Step 2"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-accent text-black w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">
                ۳
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">
                  فعال کردن System Proxy
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  در پایین پنجره برنامه، روی دکمه{" "}
                  <span className="text-white font-bold">System Proxy</span>{" "}
                  کلیک کنید تا فعال شود. با فعال شدن این گزینه، کل ترافیک
                  اینترنت سیستم شما از طریق VPN عبور خواهد کرد.
                </p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl mx-auto">
              <Image
                src={step3}
                alt="v2rayN Step 3"
                className="w-full h-auto"
              />
            </div>
            <div className="mt-6 bg-green-500/10 border border-green-500/20 rounded-2xl p-4 flex gap-3 items-center">
              <div className="bg-green-500 w-2 h-2 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
              <p className="text-xs text-green-400 font-bold">
                وقتی System Proxy فعال شد و آیکون برنامه در System Tray سبز شد، VPN شما آماده استفاده است!
              </p>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h4 className="font-bold mb-4 text-accent">💡 نکات کاربردی</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex gap-2">
                <span className="text-accent">•</span>
                <span>
                  برای تست سرعت سرورها، همه کانفیگ‌ها را انتخاب کرده و از منوی{" "}
                  <span className="text-white">Servers</span>{" "}
                  گزینه{" "}
                  <span className="text-white">Real delay all servers</span>{" "}
                  را بزنید.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent">•</span>
                <span>
                  سروری که کمترین پینگ (تاخیر) را دارد، سریع‌ترین گزینه برای شماست.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent">•</span>
                <span>
                  برنامه در System Tray (کنار ساعت) اجرا می‌شود. برای خروج کامل، روی آیکون راست‌کلیک کرده و Exit را بزنید.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent">•</span>
                <span>
                  اگر اتصال برقرار نشد، سرور دیگری را به عنوان Active انتخاب کنید.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="text-center pb-8">
        <Link
          href="/guide"
          className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl font-bold hover:bg-white/10 transition-all text-sm"
        >
          <ArrowLeft size={18} />
          بازگشت به مرکز راهنما
        </Link>
      </footer>
    </div>
  );
}
